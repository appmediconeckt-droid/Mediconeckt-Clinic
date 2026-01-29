import React, { useState, useEffect } from 'react';
import './MaintenanceMenu.css';

const MaintenanceMenu = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Sample maintenance tasks data
  const sampleMaintenanceTasks = [
    {
      id: 'MT20231015001',
      equipmentId: 'EQ-001',
      equipmentName: 'Centrifuge Machine',
      category: 'Laboratory Equipment',
      location: 'Lab Room 101',
      description: 'Monthly calibration and cleaning',
      status: 'pending',
      priority: 'high',
      assignedTo: 'John Doe',
      assignedBy: 'Lab Supervisor',
      createdDate: '2023-10-15',
      dueDate: '2023-10-20',
      completedDate: '',
      estimatedTime: '2 hours',
      actualTime: '',
      costEstimate: '₹1,500',
      actualCost: '',
      checklist: [
        'Clean rotor chamber',
        'Check balance',
        'Calibrate speed',
        'Lubricate bearings'
      ],
      spareParts: ['Bearings', 'Oil'],
      safetyRequirements: 'Wear gloves and safety glasses',
      attachments: ['manual.pdf', 'calibration_certificate.pdf'],
      notes: 'Machine making unusual noise',
      history: [
        {
          date: '2023-09-15',
          action: 'Monthly maintenance',
          technician: 'John Doe',
          notes: 'All checks passed'
        }
      ]
    },
    {
      id: 'MT20231014002',
      equipmentId: 'EQ-002',
      equipmentName: 'Autoclave Sterilizer',
      category: 'Sterilization Equipment',
      location: 'Surgical Ward',
      description: 'Weekly sterilization cycle check',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Sarah Wilson',
      assignedBy: 'Nursing Head',
      createdDate: '2023-10-14',
      dueDate: '2023-10-16',
      completedDate: '',
      estimatedTime: '1.5 hours',
      actualTime: '',
      costEstimate: '₹800',
      actualCost: '',
      checklist: [
        'Check pressure gauge',
        'Verify temperature',
        'Clean chamber',
        'Test safety valve'
      ],
      spareParts: ['Gasket'],
      safetyRequirements: 'High pressure equipment - handle with care',
      attachments: ['pressure_chart.png'],
      notes: 'Pressure gauge needs replacement',
      history: [
        {
          date: '2023-10-07',
          action: 'Weekly check',
          technician: 'Sarah Wilson',
          notes: 'All systems normal'
        }
      ]
    },
    {
      id: 'MT20231013003',
      equipmentId: 'EQ-003',
      equipmentName: 'Blood Analyzer',
      category: 'Diagnostic Equipment',
      location: 'Pathology Lab',
      description: 'Quarterly comprehensive maintenance',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Robert Kim',
      assignedBy: 'Pathology Head',
      createdDate: '2023-10-13',
      dueDate: '2023-10-15',
      completedDate: '2023-10-15',
      estimatedTime: '4 hours',
      actualTime: '3.5 hours',
      costEstimate: '₹5,000',
      actualCost: '₹4,800',
      checklist: [
        'Clean optical sensors',
        'Calibrate reagents',
        'Update software',
        'Test sample throughput'
      ],
      spareParts: ['Optical lens', 'Calibration kit'],
      safetyRequirements: 'Follow biohazard protocols',
      attachments: ['service_report.pdf', 'calibration_data.xlsx'],
      notes: 'Software update required',
      history: [
        {
          date: '2023-10-15',
          action: 'Quarterly maintenance completed',
          technician: 'Robert Kim',
          notes: 'All systems optimal'
        },
        {
          date: '2023-07-15',
          action: 'Previous maintenance',
          technician: 'Robert Kim',
          notes: 'Minor adjustments made'
        }
      ]
    },
    {
      id: 'MT20231012004',
      equipmentId: 'EQ-004',
      equipmentName: 'Oxygen Concentrator',
      category: 'Respiratory Equipment',
      location: 'ICU Room 3',
      description: 'Filter replacement and performance check',
      status: 'pending',
      priority: 'urgent',
      assignedTo: 'Mike Chen',
      assignedBy: 'ICU In-charge',
      createdDate: '2023-10-12',
      dueDate: '2023-10-13',
      completedDate: '',
      estimatedTime: '45 minutes',
      actualTime: '',
      costEstimate: '₹2,000',
      actualCost: '',
      checklist: [
        'Replace HEPA filter',
        'Check oxygen purity',
        'Test flow rate',
        'Clean intake vents'
      ],
      spareParts: ['HEPA Filter'],
      safetyRequirements: 'Ensure oxygen supply backup',
      attachments: ['filter_specs.pdf'],
      notes: 'Patient critical - urgent attention required',
      history: [
        {
          date: '2023-10-05',
          action: 'Routine check',
          technician: 'Mike Chen',
          notes: 'Filter nearing replacement'
        }
      ]
    },
    {
      id: 'MT20231011005',
      equipmentId: 'EQ-005',
      equipmentName: 'Defibrillator',
      category: 'Emergency Equipment',
      location: 'Emergency Room',
      description: 'Monthly battery and pad check',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Lisa Park',
      assignedBy: 'ER Doctor',
      createdDate: '2023-10-11',
      dueDate: '2023-10-12',
      completedDate: '2023-10-12',
      estimatedTime: '30 minutes',
      actualTime: '25 minutes',
      costEstimate: '₹1,200',
      actualCost: '₹1,200',
      checklist: [
        'Check battery charge',
        'Test pads',
        'Verify shock delivery',
        'Clean unit'
      ],
      spareParts: ['Battery pack', 'Pads'],
      safetyRequirements: 'Follow defibrillator safety protocols',
      attachments: ['test_report.pdf'],
      notes: 'All parameters within normal range',
      history: [
        {
          date: '2023-10-12',
          action: 'Monthly check completed',
          technician: 'Lisa Park',
          notes: 'Equipment ready for use'
        }
      ]
    },
    {
      id: 'MT20231010006',
      equipmentId: 'EQ-006',
      equipmentName: 'Patient Monitor',
      category: 'Monitoring Equipment',
      location: 'Ward 2A',
      description: 'Screen calibration and sensor check',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'David Miller',
      assignedBy: 'Ward Sister',
      createdDate: '2023-10-10',
      dueDate: '2023-10-14',
      completedDate: '',
      estimatedTime: '1 hour',
      actualTime: '',
      costEstimate: '₹900',
      actualCost: '',
      checklist: [
        'Calibrate screen',
        'Test ECG leads',
        'Check SpO2 sensor',
        'Verify BP readings'
      ],
      spareParts: ['ECG cable'],
      safetyRequirements: 'Follow electrical safety',
      attachments: ['calibration_sheet.pdf'],
      notes: 'Screen flickering issue',
      history: [
        {
          date: '2023-09-10',
          action: 'Previous maintenance',
          technician: 'David Miller',
          notes: 'Minor screen adjustment'
        }
      ]
    },
    {
      id: 'MT20231009007',
      equipmentId: 'EQ-007',
      equipmentName: 'Refrigerator (Vaccine)',
      category: 'Storage Equipment',
      location: 'Pharmacy Store',
      description: 'Temperature calibration and defrosting',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Amanda Lee',
      assignedBy: 'Pharmacy Head',
      createdDate: '2023-10-09',
      dueDate: '2023-10-16',
      completedDate: '',
      estimatedTime: '2.5 hours',
      actualTime: '',
      costEstimate: '₹1,800',
      actualCost: '',
      checklist: [
        'Defrost freezer',
        'Calibrate thermostat',
        'Clean condenser',
        'Check door seal'
      ],
      spareParts: ['Thermostat'],
      safetyRequirements: 'Transfer vaccines to backup unit',
      attachments: ['temperature_log.xlsx'],
      notes: 'Temperature fluctuation observed',
      history: [
        {
          date: '2023-09-09',
          action: 'Monthly maintenance',
          technician: 'Amanda Lee',
          notes: 'All parameters stable'
        }
      ]
    },
    {
      id: 'MT20231008008',
      equipmentId: 'EQ-008',
      equipmentName: 'X-Ray Machine',
      category: 'Imaging Equipment',
      location: 'Radiology Department',
      description: 'Annual preventive maintenance',
      status: 'completed',
      priority: 'high',
      assignedTo: 'James Wilson',
      assignedBy: 'Radiology Head',
      createdDate: '2023-10-08',
      dueDate: '2023-10-10',
      completedDate: '2023-10-10',
      estimatedTime: '6 hours',
      actualTime: '5.5 hours',
      costEstimate: '₹15,000',
      actualCost: '₹14,500',
      checklist: [
        'Clean X-ray tube',
        'Calibrate detector',
        'Test radiation safety',
        'Update software'
      ],
      spareParts: ['X-ray tube', 'Cooling fan'],
      safetyRequirements: 'Radiation safety protocols mandatory',
      attachments: ['safety_certificate.pdf', 'service_report.pdf'],
      notes: 'Excellent condition, minor adjustments made',
      history: [
        {
          date: '2023-10-10',
          action: 'Annual maintenance completed',
          technician: 'James Wilson',
          notes: 'All systems functioning optimally'
        },
        {
          date: '2022-10-10',
          action: 'Previous annual maintenance',
          technician: 'James Wilson',
          notes: 'Tube replaced'
        }
      ]
    }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchMaintenanceTasks = async () => {
      setLoading(true);
      setTimeout(() => {
        setMaintenanceTasks(sampleMaintenanceTasks);
        setFilteredTasks(sampleMaintenanceTasks);
        setLoading(false);
      }, 1000);
    };

    fetchMaintenanceTasks();
  }, []);

  // Filter maintenance tasks
  useEffect(() => {
    let filtered = [...maintenanceTasks];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    if (selectedDate) {
      filtered = filtered.filter(task => task.dueDate === selectedDate);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.equipmentName.toLowerCase().includes(query) ||
        task.equipmentId.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task.location.toLowerCase().includes(query) ||
        task.assignedTo.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(filtered);
  }, [statusFilter, priorityFilter, categoryFilter, selectedDate, searchQuery, maintenanceTasks]);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = maintenanceTasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        if (newStatus === 'completed') {
          updatedTask.completedDate = new Date().toISOString().split('T')[0];
          updatedTask.actualTime = task.estimatedTime;
          updatedTask.actualCost = task.costEstimate;
        }
        return updatedTask;
      }
      return task;
    });
    
    setMaintenanceTasks(updatedTasks);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleAddNewTask = () => {
    setShowNewTaskModal(true);
  };

  const handleCreateTask = (newTask) => {
    const task = {
      id: `MT${new Date().getFullYear()}${String(maintenanceTasks.length + 1).padStart(5, '0')}`,
      equipmentId: `EQ-${String(maintenanceTasks.length + 100).padStart(3, '0')}`,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      completedDate: '',
      actualTime: '',
      actualCost: '',
      history: [],
      attachments: [],
      ...newTask
    };
    
    setMaintenanceTasks([task, ...maintenanceTasks]);
    setShowNewTaskModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'maint-status-badge--pending';
      case 'in-progress': return 'maint-status-badge--in-progress';
      case 'completed': return 'maint-status-badge--completed';
      case 'cancelled': return 'maint-status-badge--cancelled';
      default: return 'maint-status-badge--default';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'urgent': return 'maint-priority-badge--urgent';
      case 'high': return 'maint-priority-badge--high';
      case 'medium': return 'maint-priority-badge--medium';
      case 'low': return 'maint-priority-badge--low';
      default: return 'maint-priority-badge--default';
    }
  };

  const getStatusCount = (status) => {
    return maintenanceTasks.filter(task => task.status === status).length;
  };

  const getPriorityCount = (priority) => {
    return maintenanceTasks.filter(task => task.priority === priority).length;
  };

  const handlePrintReport = (taskId) => {
    alert(`Printing maintenance report for ${taskId}`);
  };

  const handleExportSchedule = () => {
    alert(`Exporting maintenance schedule for ${filteredTasks.length} tasks`);
  };

  // New Task Modal Component
  const NewTaskModal = () => {
    const [formData, setFormData] = useState({
      equipmentName: '',
      category: 'Laboratory Equipment',
      location: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      estimatedTime: '',
      costEstimate: '',
      checklist: [''],
      spareParts: [''],
      safetyRequirements: '',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateTask(formData);
    };

    const handleChecklistChange = (index, value) => {
      const newChecklist = [...formData.checklist];
      newChecklist[index] = value;
      setFormData({ ...formData, checklist: newChecklist });
    };

    const addChecklistItem = () => {
      setFormData({ ...formData, checklist: [...formData.checklist, ''] });
    };

    const removeChecklistItem = (index) => {
      const newChecklist = formData.checklist.filter((_, i) => i !== index);
      setFormData({ ...formData, checklist: newChecklist });
    };

    const handleSparePartsChange = (index, value) => {
      const newSpareParts = [...formData.spareParts];
      newSpareParts[index] = value;
      setFormData({ ...formData, spareParts: newSpareParts });
    };

    const addSparePart = () => {
      setFormData({ ...formData, spareParts: [...formData.spareParts, ''] });
    };

    const removeSparePart = (index) => {
      const newSpareParts = formData.spareParts.filter((_, i) => i !== index);
      setFormData({ ...formData, spareParts: newSpareParts });
    };

    return (
      <div className="maint-newtask-modal-overlay tech-maint-modal-overlay">
        <div className="maint-newtask-modal tech-maint-newtask-modal">
          <div className="maint-newtask-modal-header tech-maint-newtask-modal-header">
            <h2 className="maint-newtask-modal-title tech-maint-newtask-modal-title">
              Create New Maintenance Task
            </h2>
            <button 
              className="maint-newtask-modal-close tech-maint-newtask-modal-close"
              onClick={() => setShowNewTaskModal(false)}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="maint-newtask-form tech-maint-newtask-form">
            <div className="maint-newtask-form-grid tech-maint-newtask-form-grid">
              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Equipment Name *</label>
                <input
                  type="text"
                  className="maint-form-input tech-maint-form-input"
                  value={formData.equipmentName}
                  onChange={(e) => setFormData({...formData, equipmentName: e.target.value})}
                  required
                />
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Category *</label>
                <select 
                  className="maint-form-select tech-maint-form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="Laboratory Equipment">Laboratory Equipment</option>
                  <option value="Diagnostic Equipment">Diagnostic Equipment</option>
                  <option value="Imaging Equipment">Imaging Equipment</option>
                  <option value="Emergency Equipment">Emergency Equipment</option>
                  <option value="Monitoring Equipment">Monitoring Equipment</option>
                  <option value="Respiratory Equipment">Respiratory Equipment</option>
                  <option value="Sterilization Equipment">Sterilization Equipment</option>
                  <option value="Storage Equipment">Storage Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Location *</label>
                <input
                  type="text"
                  className="maint-form-input tech-maint-form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Priority *</label>
                <select 
                  className="maint-form-select tech-maint-form-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Assigned To *</label>
                <input
                  type="text"
                  className="maint-form-input tech-maint-form-input"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  required
                />
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Estimated Time</label>
                <input
                  type="text"
                  className="maint-form-input tech-maint-form-input"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                  placeholder="e.g., 2 hours"
                />
              </div>

              <div className="maint-form-group tech-maint-form-group">
                <label className="maint-form-label tech-maint-form-label">Cost Estimate</label>
                <input
                  type="text"
                  className="maint-form-input tech-maint-form-input"
                  value={formData.costEstimate}
                  onChange={(e) => setFormData({...formData, costEstimate: e.target.value})}
                  placeholder="e.g., ₹1,500"
                />
              </div>
            </div>

            <div className="maint-form-group tech-maint-form-group">
              <label className="maint-form-label tech-maint-form-label">Description *</label>
              <textarea
                className="maint-form-textarea tech-maint-form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
                placeholder="Describe the maintenance task..."
              />
            </div>

            <div className="maint-form-group tech-maint-form-group">
              <div className="maint-form-group-header tech-maint-form-group-header">
                <label className="maint-form-label tech-maint-form-label">Maintenance Checklist</label>
                <button 
                  type="button"
                  className="maint-form-add-btn tech-maint-form-add-btn"
                  onClick={addChecklistItem}
                >
                  + Add Item
                </button>
              </div>
              <div className="maint-checklist-items tech-maint-checklist-items">
                {formData.checklist.map((item, index) => (
                  <div key={index} className="maint-checklist-item tech-maint-checklist-item">
                    <input
                      type="text"
                      className="maint-checklist-input tech-maint-checklist-input"
                      value={item}
                      onChange={(e) => handleChecklistChange(index, e.target.value)}
                      placeholder={`Checklist item ${index + 1}`}
                    />
                    {formData.checklist.length > 1 && (
                      <button 
                        type="button"
                        className="maint-checklist-remove tech-maint-checklist-remove"
                        onClick={() => removeChecklistItem(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="maint-form-group tech-maint-form-group">
              <div className="maint-form-group-header tech-maint-form-group-header">
                <label className="maint-form-label tech-maint-form-label">Required Spare Parts</label>
                <button 
                  type="button"
                  className="maint-form-add-btn tech-maint-form-add-btn"
                  onClick={addSparePart}
                >
                  + Add Part
                </button>
              </div>
              <div className="maint-spareparts-items tech-maint-spareparts-items">
                {formData.spareParts.map((part, index) => (
                  <div key={index} className="maint-sparepart-item tech-maint-sparepart-item">
                    <input
                      type="text"
                      className="maint-sparepart-input tech-maint-sparepart-input"
                      value={part}
                      onChange={(e) => handleSparePartsChange(index, e.target.value)}
                      placeholder={`Spare part ${index + 1}`}
                    />
                    {formData.spareParts.length > 1 && (
                      <button 
                        type="button"
                        className="maint-sparepart-remove tech-maint-sparepart-remove"
                        onClick={() => removeSparePart(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="maint-form-group tech-maint-form-group">
              <label className="maint-form-label tech-maint-form-label">Safety Requirements</label>
              <textarea
                className="maint-form-textarea tech-maint-form-textarea"
                value={formData.safetyRequirements}
                onChange={(e) => setFormData({...formData, safetyRequirements: e.target.value})}
                rows="2"
                placeholder="Safety precautions to follow..."
              />
            </div>

            <div className="maint-form-group tech-maint-form-group">
              <label className="maint-form-label tech-maint-form-label">Notes</label>
              <textarea
                className="maint-form-textarea tech-maint-form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="2"
                placeholder="Additional notes or observations..."
              />
            </div>

            <div className="maint-form-actions tech-maint-form-actions">
              <button 
                type="button"
                className="maint-form-btn maint-form-btn-cancel tech-maint-form-btn tech-maint-form-btn-cancel"
                onClick={() => setShowNewTaskModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="maint-form-btn maint-form-btn-submit tech-maint-form-btn tech-maint-form-btn-submit"
              >
                Create Maintenance Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="maint-container tech-maint-container">
      <header className="maint-header tech-maint-header">
        <div className="maint-header-content tech-maint-header-content">
          <h1 className="maint-title tech-maint-title">AAB Technician - Equipment Maintenance</h1>
          <p className="maint-subtitle tech-maint-subtitle">Schedule, track, and manage equipment maintenance tasks</p>
        </div>
        <div className="maint-header-actions tech-maint-header-actions">
          <button 
            className="maint-header-btn maint-header-btn-schedule tech-maint-header-btn tech-maint-header-btn-schedule"
            onClick={handleExportSchedule}
          >
            Export Schedule
          </button>
          <button 
            className="maint-header-btn maint-header-btn-report tech-maint-header-btn tech-maint-header-btn-report"
            onClick={() => alert('Generating monthly report...')}
          >
            Monthly Report
          </button>
        </div>
      </header>

      <div className="maint-dashboard tech-maint-dashboard">
        <div className="maint-stats-grid tech-maint-stats-grid">
          <div className="maint-stat-card tech-maint-stat-card maint-stat-card-total tech-maint-stat-card-total">
            <div className="maint-stat-icon tech-maint-stat-icon">🔧</div>
            <div className="maint-stat-info tech-maint-stat-info">
              <h3>Total Tasks</h3>
              <p className="maint-stat-number tech-maint-stat-number">{maintenanceTasks.length}</p>
            </div>
          </div>
          
          <div className="maint-stat-card tech-maint-stat-card maint-stat-card-pending tech-maint-stat-card-pending">
            <div className="maint-stat-icon tech-maint-stat-icon">⏳</div>
            <div className="maint-stat-info tech-maint-stat-info">
              <h3>Pending</h3>
              <p className="maint-stat-number tech-maint-stat-number">{getStatusCount('pending')}</p>
            </div>
          </div>
          
          <div className="maint-stat-card tech-maint-stat-card maint-stat-card-progress tech-maint-stat-card-progress">
            <div className="maint-stat-icon tech-maint-stat-icon">⚙️</div>
            <div className="maint-stat-info tech-maint-stat-info">
              <h3>In Progress</h3>
              <p className="maint-stat-number tech-maint-stat-number">{getStatusCount('in-progress')}</p>
            </div>
          </div>
          
          <div className="maint-stat-card tech-maint-stat-card maint-stat-card-urgent tech-maint-stat-card-urgent">
            <div className="maint-stat-icon tech-maint-stat-icon">🚨</div>
            <div className="maint-stat-info tech-maint-stat-info">
              <h3>Urgent</h3>
              <p className="maint-stat-number tech-maint-stat-number">{getPriorityCount('urgent')}</p>
            </div>
          </div>
        </div>

        <div className="maint-controls-section tech-maint-controls-section">
          <div className="maint-search-filters tech-maint-search-filters">
            <div className="maint-search-box tech-maint-search-box">
              <input
                type="text"
                className="maint-search-input tech-maint-search-input"
                placeholder="Search equipment, location, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="maint-search-icon tech-maint-search-icon">🔍</span>
            </div>

            <div className="maint-filter-group tech-maint-filter-group">
              <label className="maint-filter-label tech-maint-filter-label">Status:</label>
              <select 
                className="maint-filter-select tech-maint-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="maint-filter-group tech-maint-filter-group">
              <label className="maint-filter-label tech-maint-filter-label">Priority:</label>
              <select 
                className="maint-filter-select tech-maint-filter-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="maint-filter-group tech-maint-filter-group">
              <label className="maint-filter-label tech-maint-filter-label">Category:</label>
              <select 
                className="maint-filter-select tech-maint-filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Laboratory Equipment">Laboratory Equipment</option>
                <option value="Diagnostic Equipment">Diagnostic Equipment</option>
                <option value="Imaging Equipment">Imaging Equipment</option>
                <option value="Emergency Equipment">Emergency Equipment</option>
                <option value="Monitoring Equipment">Monitoring Equipment</option>
                <option value="Respiratory Equipment">Respiratory Equipment</option>
                <option value="Sterilization Equipment">Sterilization Equipment</option>
                <option value="Storage Equipment">Storage Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="maint-filter-group tech-maint-filter-group">
              <label className="maint-filter-label tech-maint-filter-label">Due Date:</label>
              <input
                type="date"
                className="maint-date-input tech-maint-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div className="maint-action-buttons tech-maint-action-buttons">
            <button 
              className="maint-action-btn maint-action-btn-primary tech-maint-action-btn tech-maint-action-btn-primary"
              onClick={handleAddNewTask}
            >
              <span className="maint-btn-icon tech-maint-btn-icon">+</span>
              New Maintenance Task
            </button>
            <button 
              className="maint-action-btn maint-action-btn-secondary tech-maint-action-btn tech-maint-action-btn-secondary"
              onClick={() => alert('Opening calendar view...')}
            >
              <span className="maint-btn-icon tech-maint-btn-icon">📅</span>
              Calendar View
            </button>
            <button 
              className="maint-action-btn maint-action-btn-tertiary tech-maint-action-btn tech-maint-action-btn-tertiary"
              onClick={() => {
                setStatusFilter('all');
                setPriorityFilter('all');
                setCategoryFilter('all');
                setSelectedDate('');
                setSearchQuery('');
              }}
            >
              <span className="maint-btn-icon tech-maint-btn-icon">🔄</span>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="maint-main-content tech-maint-main-content">
        {loading ? (
          <div className="maint-loading-state tech-maint-loading-state">
            <div className="maint-loading-spinner tech-maint-loading-spinner"></div>
            <p className="maint-loading-text tech-maint-loading-text">Loading maintenance tasks...</p>
          </div>
        ) : (
          <>
            <div className="maint-results-header tech-maint-results-header">
              <h2 className="maint-results-title tech-maint-results-title">
                Maintenance Tasks <span className="maint-results-count tech-maint-results-count">({filteredTasks.length})</span>
              </h2>
              <div className="maint-view-options tech-maint-view-options">
                <button className="maint-view-btn maint-view-btn-active tech-maint-view-btn tech-maint-view-btn-active">
                  <span className="maint-view-icon tech-maint-view-icon">📋</span>
                  Task List
                </button>
                <button className="maint-view-btn tech-maint-view-btn">
                  <span className="maint-view-icon tech-maint-view-icon">📊</span>
                  Dashboard
                </button>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="maint-empty-state tech-maint-empty-state">
                <div className="maint-empty-icon tech-maint-empty-icon">🔧</div>
                <h3 className="maint-empty-title tech-maint-empty-title">No Maintenance Tasks Found</h3>
                <p className="maint-empty-text tech-maint-empty-text">Try adjusting your filters or create a new task.</p>
              </div>
            ) : (
              <div className="maint-tasks-grid tech-maint-tasks-grid">
                {filteredTasks.map(task => (
                  <div key={task.id} className="maint-task-card tech-maint-task-card">
                    <div className="maint-task-card-header tech-maint-task-card-header">
                      <div className="maint-task-card-id tech-maint-task-card-id">
                        <span className="maint-task-id tech-maint-task-id">{task.id}</span>
                        <span className="maint-equipment-id tech-maint-equipment-id">{task.equipmentId}</span>
                      </div>
                      <div className="maint-task-card-status tech-maint-task-card-status">
                        <span className={`maint-status-badge ${getStatusBadgeClass(task.status)} tech-maint-status-badge tech-maint-status-badge--${task.status}`}>
                          {task.status}
                        </span>
                        <span className={`maint-priority-badge ${getPriorityBadgeClass(task.priority)} tech-maint-priority-badge tech-maint-priority-badge--${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    <div className="maint-equipment-info tech-maint-equipment-info">
                      <h3 className="maint-equipment-name tech-maint-equipment-name">{task.equipmentName}</h3>
                      <div className="maint-equipment-details tech-maint-equipment-details">
                        <span className="maint-equipment-category tech-maint-equipment-category">{task.category}</span>
                        <span className="maint-equipment-location tech-maint-equipment-location">{task.location}</span>
                      </div>
                    </div>

                    <div className="maint-task-description tech-maint-task-description">
                      <p>{task.description}</p>
                    </div>

                    <div className="maint-assignment-info tech-maint-assignment-info">
                      <div className="maint-assigned-to tech-maint-assigned-to">
                        <span className="maint-assigned-label tech-maint-assigned-label">Assigned To:</span>
                        <span className="maint-assigned-value tech-maint-assigned-value">{task.assignedTo}</span>
                      </div>
                      <div className="maint-assigned-by tech-maint-assigned-by">
                        <span className="maint-assignedby-label tech-maint-assignedby-label">By:</span>
                        <span className="maint-assignedby-value tech-maint-assignedby-value">{task.assignedBy}</span>
                      </div>
                    </div>

                    <div className="maint-dates-section tech-maint-dates-section">
                      <div className="maint-date-item tech-maint-date-item">
                        <span className="maint-date-label tech-maint-date-label">Created:</span>
                        <span className="maint-date-value tech-maint-date-value">{task.createdDate}</span>
                      </div>
                      <div className="maint-date-item tech-maint-date-item">
                        <span className="maint-date-label tech-maint-date-label">Due:</span>
                        <span className="maint-date-value tech-maint-date-value">{task.dueDate}</span>
                      </div>
                      {task.completedDate && (
                        <div className="maint-date-item tech-maint-date-item">
                          <span className="maint-date-label tech-maint-date-label">Completed:</span>
                          <span className="maint-date-value tech-maint-date-value">{task.completedDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="maint-time-cost-section tech-maint-time-cost-section">
                      <div className="maint-time-estimate tech-maint-time-estimate">
                        <span className="maint-time-label tech-maint-time-label">Estimated Time:</span>
                        <span className="maint-time-value tech-maint-time-value">{task.estimatedTime}</span>
                      </div>
                      <div className="maint-cost-estimate tech-maint-cost-estimate">
                        <span className="maint-cost-label tech-maint-cost-label">Cost Estimate:</span>
                        <span className="maint-cost-value tech-maint-cost-value">{task.costEstimate}</span>
                      </div>
                      {task.actualTime && (
                        <div className="maint-actual-time tech-maint-actual-time">
                          <span className="maint-actual-label tech-maint-actual-label">Actual Time:</span>
                          <span className="maint-actual-value tech-maint-actual-value">{task.actualTime}</span>
                        </div>
                      )}
                      {task.actualCost && (
                        <div className="maint-actual-cost tech-maint-actual-cost">
                          <span className="maint-actual-label tech-maint-actual-label">Actual Cost:</span>
                          <span className="maint-actual-value tech-maint-actual-value">{task.actualCost}</span>
                        </div>
                      )}
                    </div>

                    <div className="maint-checklist-preview tech-maint-checklist-preview">
                      <h4 className="maint-checklist-title tech-maint-checklist-title">Checklist Items:</h4>
                      <div className="maint-checklist-items-preview tech-maint-checklist-items-preview">
                        {task.checklist.slice(0, 3).map((item, index) => (
                          <div key={index} className="maint-checklist-item-preview tech-maint-checklist-item-preview">
                            <span className="maint-checklist-icon tech-maint-checklist-icon">✓</span>
                            <span className="maint-checklist-text tech-maint-checklist-text">{item}</span>
                          </div>
                        ))}
                        {task.checklist.length > 3 && (
                          <div className="maint-checklist-more tech-maint-checklist-more">
                            +{task.checklist.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="maint-spareparts-preview tech-maint-spareparts-preview">
                      <h4 className="maint-spareparts-title tech-maint-spareparts-title">Spare Parts:</h4>
                      <div className="maint-spareparts-tags tech-maint-spareparts-tags">
                        {task.spareParts.map((part, index) => (
                          <span key={index} className="maint-sparepart-tag tech-maint-sparepart-tag">{part}</span>
                        ))}
                      </div>
                    </div>

                    <div className="maint-task-card-footer tech-maint-task-card-footer">
                      <div className="maint-task-notes tech-maint-task-notes">
                        <span className="maint-notes-label tech-maint-notes-label">Notes:</span>
                        <span className="maint-notes-value tech-maint-notes-value">{task.notes || 'No notes'}</span>
                      </div>
                      
                      <div className="maint-task-card-actions tech-maint-task-card-actions">
                        <button 
                          className="maint-action-btn-sm maint-action-btn-view tech-maint-action-btn-sm tech-maint-action-btn-view"
                          onClick={() => handleViewTask(task)}
                        >
                          View Details
                        </button>
                        <button 
                          className="maint-action-btn-sm maint-action-btn-print tech-maint-action-btn-sm tech-maint-action-btn-print"
                          onClick={() => handlePrintReport(task.id)}
                        >
                          Print Report
                        </button>
                        <select 
                          className="maint-status-select-sm tech-maint-status-select-sm"
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                          <option value="pending">Update Status</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <div className="maint-task-modal-overlay tech-maint-modal-overlay">
          <div className="maint-task-modal tech-maint-task-modal">
            <div className="maint-task-modal-header tech-maint-task-modal-header">
              <h2 className="maint-task-modal-title tech-maint-task-modal-title">Maintenance Task Details</h2>
              <button 
                className="maint-task-modal-close tech-maint-task-modal-close"
                onClick={() => setShowTaskModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="maint-task-modal-content tech-maint-task-modal-content">
              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Task Information</h3>
                <div className="maint-modal-task-grid tech-maint-modal-task-grid">
                  <div className="maint-modal-task-item tech-maint-modal-task-item">
                    <span className="maint-modal-task-label tech-maint-modal-task-label">Task ID:</span>
                    <span className="maint-modal-task-value tech-maint-modal-task-value">{selectedTask.id}</span>
                  </div>
                  <div className="maint-modal-task-item tech-maint-modal-task-item">
                    <span className="maint-modal-task-label tech-maint-modal-task-label">Equipment ID:</span>
                    <span className="maint-modal-task-value tech-maint-modal-task-value">{selectedTask.equipmentId}</span>
                  </div>
                  <div className="maint-modal-task-item tech-maint-modal-task-item">
                    <span className="maint-modal-task-label tech-maint-modal-task-label">Status:</span>
                    <span className={`maint-modal-task-value maint-status-badge ${getStatusBadgeClass(selectedTask.status)} tech-maint-modal-task-value tech-maint-status-badge tech-maint-status-badge--${selectedTask.status}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                  <div className="maint-modal-task-item tech-maint-modal-task-item">
                    <span className="maint-modal-task-label tech-maint-modal-task-label">Priority:</span>
                    <span className={`maint-modal-task-value maint-priority-badge ${getPriorityBadgeClass(selectedTask.priority)} tech-maint-modal-task-value tech-maint-priority-badge tech-maint-priority-badge--${selectedTask.priority}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Equipment Details</h3>
                <div className="maint-modal-equipment-grid tech-maint-modal-equipment-grid">
                  <div className="maint-modal-equipment-item tech-maint-modal-equipment-item">
                    <span className="maint-modal-equipment-label tech-maint-modal-equipment-label">Name:</span>
                    <span className="maint-modal-equipment-value tech-maint-modal-equipment-value">{selectedTask.equipmentName}</span>
                  </div>
                  <div className="maint-modal-equipment-item tech-maint-modal-equipment-item">
                    <span className="maint-modal-equipment-label tech-maint-modal-equipment-label">Category:</span>
                    <span className="maint-modal-equipment-value tech-maint-modal-equipment-value">{selectedTask.category}</span>
                  </div>
                  <div className="maint-modal-equipment-item tech-maint-modal-equipment-item">
                    <span className="maint-modal-equipment-label tech-maint-modal-equipment-label">Location:</span>
                    <span className="maint-modal-equipment-value tech-maint-modal-equipment-value">{selectedTask.location}</span>
                  </div>
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Task Description</h3>
                <div className="maint-modal-description tech-maint-modal-description">
                  <p>{selectedTask.description}</p>
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Assignment Details</h3>
                <div className="maint-modal-assignment-grid tech-maint-modal-assignment-grid">
                  <div className="maint-modal-assignment-item tech-maint-modal-assignment-item">
                    <span className="maint-modal-assignment-label tech-maint-modal-assignment-label">Assigned To:</span>
                    <span className="maint-modal-assignment-value tech-maint-modal-assignment-value">{selectedTask.assignedTo}</span>
                  </div>
                  <div className="maint-modal-assignment-item tech-maint-modal-assignment-item">
                    <span className="maint-modal-assignment-label tech-maint-modal-assignment-label">Assigned By:</span>
                    <span className="maint-modal-assignment-value tech-maint-modal-assignment-value">{selectedTask.assignedBy}</span>
                  </div>
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Timeline</h3>
                <div className="maint-modal-timeline-grid tech-maint-modal-timeline-grid">
                  <div className="maint-modal-timeline-item tech-maint-modal-timeline-item">
                    <span className="maint-modal-timeline-label tech-maint-modal-timeline-label">Created:</span>
                    <span className="maint-modal-timeline-value tech-maint-modal-timeline-value">{selectedTask.createdDate}</span>
                  </div>
                  <div className="maint-modal-timeline-item tech-maint-modal-timeline-item">
                    <span className="maint-modal-timeline-label tech-maint-modal-timeline-label">Due Date:</span>
                    <span className="maint-modal-timeline-value tech-maint-modal-timeline-value">{selectedTask.dueDate}</span>
                  </div>
                  {selectedTask.completedDate && (
                    <div className="maint-modal-timeline-item tech-maint-modal-timeline-item">
                      <span className="maint-modal-timeline-label tech-maint-modal-timeline-label">Completed:</span>
                      <span className="maint-modal-timeline-value tech-maint-modal-timeline-value">{selectedTask.completedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Time & Cost</h3>
                <div className="maint-modal-cost-grid tech-maint-modal-cost-grid">
                  <div className="maint-modal-cost-item tech-maint-modal-cost-item">
                    <span className="maint-modal-cost-label tech-maint-modal-cost-label">Estimated Time:</span>
                    <span className="maint-modal-cost-value tech-maint-modal-cost-value">{selectedTask.estimatedTime}</span>
                  </div>
                  <div className="maint-modal-cost-item tech-maint-modal-cost-item">
                    <span className="maint-modal-cost-label tech-maint-modal-cost-label">Cost Estimate:</span>
                    <span className="maint-modal-cost-value tech-maint-modal-cost-value">{selectedTask.costEstimate}</span>
                  </div>
                  {selectedTask.actualTime && (
                    <div className="maint-modal-cost-item tech-maint-modal-cost-item">
                      <span className="maint-modal-cost-label tech-maint-modal-cost-label">Actual Time:</span>
                      <span className="maint-modal-cost-value tech-maint-modal-cost-value">{selectedTask.actualTime}</span>
                    </div>
                  )}
                  {selectedTask.actualCost && (
                    <div className="maint-modal-cost-item tech-maint-modal-cost-item">
                      <span className="maint-modal-cost-label tech-maint-modal-cost-label">Actual Cost:</span>
                      <span className="maint-modal-cost-value tech-maint-modal-cost-value">{selectedTask.actualCost}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Maintenance Checklist</h3>
                <div className="maint-modal-checklist tech-maint-modal-checklist">
                  {selectedTask.checklist.map((item, index) => (
                    <div key={index} className="maint-modal-checklist-item tech-maint-modal-checklist-item">
                      <span className="maint-modal-checklist-icon tech-maint-modal-checklist-icon">✓</span>
                      <span className="maint-modal-checklist-text tech-maint-modal-checklist-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Required Spare Parts</h3>
                <div className="maint-modal-spareparts tech-maint-modal-spareparts">
                  {selectedTask.spareParts.map((part, index) => (
                    <span key={index} className="maint-modal-sparepart-tag tech-maint-modal-sparepart-tag">{part}</span>
                  ))}
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Safety Requirements</h3>
                <div className="maint-modal-safety tech-maint-modal-safety">
                  <p>{selectedTask.safetyRequirements}</p>
                </div>
              </div>

              <div className="maint-modal-section tech-maint-modal-section">
                <h3 className="maint-modal-section-title tech-maint-modal-section-title">Notes</h3>
                <div className="maint-modal-notes tech-maint-modal-notes">
                  <p>{selectedTask.notes || 'No notes provided'}</p>
                </div>
              </div>

              {selectedTask.history && selectedTask.history.length > 0 && (
                <div className="maint-modal-section tech-maint-modal-section">
                  <h3 className="maint-modal-section-title tech-maint-modal-section-title">Maintenance History</h3>
                  <div className="maint-modal-history tech-maint-modal-history">
                    {selectedTask.history.map((record, index) => (
                      <div key={index} className="maint-modal-history-item tech-maint-modal-history-item">
                        <div className="maint-modal-history-date tech-maint-modal-history-date">{record.date}</div>
                        <div className="maint-modal-history-action tech-maint-modal-history-action">{record.action}</div>
                        <div className="maint-modal-history-technician tech-maint-modal-history-technician">{record.technician}</div>
                        <div className="maint-modal-history-notes tech-maint-modal-history-notes">{record.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div className="maint-modal-section tech-maint-modal-section">
                  <h3 className="maint-modal-section-title tech-maint-modal-section-title">Attachments</h3>
                  <div className="maint-modal-attachments tech-maint-modal-attachments">
                    {selectedTask.attachments.map((attachment, index) => (
                      <div key={index} className="maint-modal-attachment-item tech-maint-modal-attachment-item">
                        <span className="maint-modal-attachment-icon tech-maint-modal-attachment-icon">📎</span>
                        <span className="maint-modal-attachment-name tech-maint-modal-attachment-name">{attachment}</span>
                        <button className="maint-modal-attachment-btn tech-maint-modal-attachment-btn">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="maint-task-modal-footer tech-maint-task-modal-footer">
              <button 
                className="maint-modal-btn maint-modal-btn-secondary tech-maint-modal-btn tech-maint-modal-btn-secondary"
                onClick={() => setShowTaskModal(false)}
              >
                Close
              </button>
              <button 
                className="maint-modal-btn maint-modal-btn-primary tech-maint-modal-btn tech-maint-modal-btn-primary"
                onClick={() => handlePrintReport(selectedTask.id)}
              >
                Print Report
              </button>
              <select 
                className="maint-modal-status-select tech-maint-modal-status-select"
                value={selectedTask.status}
                onChange={(e) => handleStatusChange(selectedTask.id, e.target.value)}
              >
                <option value="pending">Update Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && <NewTaskModal />}

      <footer className="maint-footer tech-maint-footer">
        <div className="maint-footer-content tech-maint-footer-content">
          <p className="maint-footer-text tech-maint-footer-text">
            AAB Technician Portal • Equipment Maintenance System • Version 4.0.1
          </p>
          <p className="maint-footer-copyright tech-maint-footer-copyright">
            © {new Date().getFullYear()} AAB Medical Equipment Maintenance Department. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MaintenanceMenu;