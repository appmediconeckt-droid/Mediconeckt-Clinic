import React, { useState, useEffect } from 'react';
import './MaintenanceManagement.css';
import {
  FaTools,
  FaWrench,
  FaHammer,
  FaPaintRoller,
  FaBolt,
  FaTint,
  FaSnowflake,
  FaPlug,
  FaLightbulb,
  FaDoorClosed,
  FaWindowMaximize,
  FaToilet,
  FaShower,
  FaBed,
  FaChair,
  FaTv,
  FaWifi,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaTimesCircle,
  FaTruck,
  FaHardHat,
  FaClipboardCheck,
  FaChartLine,
  FaMoneyBillWave,
  FaHistory,
  FaStar,
  FaMapMarkerAlt,
  FaBuilding,
  FaHome,
  FaHospital
} from 'react-icons/fa';

const MaintenanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Maintenance Requests Data
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { 
      id: 1, 
      ticketNo: 'HK-MNT-2024-001', 
      title: 'AC Not Cooling - ICU 101', 
      description: 'Air conditioner not maintaining temperature, blowing warm air',
      roomNo: 'ICU-101',
      department: 'ICU',
      maintenanceType: 'HVAC',
      subType: 'Air Conditioning',
      priority: 'Critical',
      status: 'In Progress',
      reportedBy: 'Nurse Station',
      reportedDate: '2024-01-20',
      reportedTime: '08:30 AM',
      assignedTo: 'HVAC Team',
      assignedDate: '2024-01-20',
      estimatedCompletion: '2024-01-21',
      actualCompletion: null,
      costEstimate: 15000,
      actualCost: null,
      materialsUsed: ['Refrigerant Gas', 'Compressor Oil', 'Filter'],
      workHours: 4,
      vendor: 'CoolTech HVAC Services',
      vendorContact: '9876543210',
      technician: 'Rajesh Kumar',
      notes: 'Patient room - urgent attention required',
      followUpRequired: true,
      followUpDate: '2024-01-25',
      attachments: 2,
      impact: 'Patient discomfort, risk of infection spread'
    },
    { 
      id: 2, 
      ticketNo: 'HK-MNT-2024-002', 
      title: 'Leaking Pipe - Ward 205 Bathroom', 
      description: 'Continuous water leak from overhead pipe in bathroom',
      roomNo: 'WARD-205',
      department: 'General Ward',
      maintenanceType: 'Plumbing',
      subType: 'Water Leak',
      priority: 'High',
      status: 'Pending',
      reportedBy: 'Patient Attendant',
      reportedDate: '2024-01-20',
      reportedTime: '10:15 AM',
      assignedTo: 'Plumbing Team',
      assignedDate: null,
      estimatedCompletion: null,
      actualCompletion: null,
      costEstimate: 8000,
      actualCost: null,
      materialsUsed: [],
      workHours: 3,
      vendor: 'AquaFlow Plumbers',
      vendorContact: '8765432109',
      technician: null,
      notes: 'Water damage to ceiling tiles, mold risk',
      followUpRequired: true,
      followUpDate: null,
      attachments: 3,
      impact: 'Water wastage, electrical hazard, patient inconvenience'
    },
    { 
      id: 3, 
      ticketNo: 'HK-MNT-2024-003', 
      title: 'Broken Bed Mechanism - Room 112', 
      description: 'Hospital bed height adjustment not working',
      roomNo: 'GEN-112',
      department: 'General Ward',
      maintenanceType: 'Furniture',
      subType: 'Bed Repair',
      priority: 'Medium',
      status: 'Completed',
      reportedBy: 'Dr. Mehta',
      reportedDate: '2024-01-19',
      reportedTime: '02:45 PM',
      assignedTo: 'Biomedical Team',
      assignedDate: '2024-01-19',
      estimatedCompletion: '2024-01-19',
      actualCompletion: '2024-01-19',
      costEstimate: 5000,
      actualCost: 4500,
      materialsUsed: ['Hydraulic Pump', 'Control Panel', 'Bolts'],
      workHours: 2,
      vendor: 'MediEquip Services',
      vendorContact: '7654321098',
      technician: 'Amit Singh',
      notes: 'Patient transferred to another bed',
      followUpRequired: false,
      followUpDate: null,
      attachments: 1,
      impact: 'Patient mobility issues'
    },
    { 
      id: 4, 
      ticketNo: 'HK-MNT-2024-004', 
      title: 'Flickering Lights - OPD Waiting Area', 
      description: 'Multiple tube lights flickering in waiting area',
      roomNo: 'OPD-01',
      department: 'OPD',
      maintenanceType: 'Electrical',
      subType: 'Lighting',
      priority: 'Medium',
      status: 'In Progress',
      reportedBy: 'Reception Staff',
      reportedDate: '2024-01-20',
      reportedTime: '09:00 AM',
      assignedTo: 'Electrical Team',
      assignedDate: '2024-01-20',
      estimatedCompletion: '2024-01-20',
      actualCompletion: null,
      costEstimate: 3000,
      actualCost: null,
      materialsUsed: ['Tube Lights', 'Chokes', 'Starters'],
      workHours: 2,
      vendor: 'PowerGrid Electricians',
      vendorContact: '6543210987',
      technician: 'Vikram Patel',
      notes: 'High traffic area, complete during off hours',
      followUpRequired: false,
      followUpDate: null,
      attachments: 0,
      impact: 'Poor visibility, patient discomfort'
    },
    { 
      id: 5, 
      ticketNo: 'HK-MNT-2024-005', 
      title: 'Damaged Floor Tiles - Emergency Corridor', 
      description: 'Cracked and broken tiles creating tripping hazard',
      roomNo: 'EMERG-CORR',
      department: 'Emergency',
      maintenanceType: 'Civil',
      subType: 'Flooring',
      priority: 'High',
      status: 'Scheduled',
      reportedBy: 'Head Nurse',
      reportedDate: '2024-01-18',
      reportedTime: '04:30 PM',
      assignedTo: 'Civil Team',
      assignedDate: '2024-01-21',
      estimatedCompletion: '2024-01-22',
      actualCompletion: null,
      costEstimate: 25000,
      actualCost: null,
      materialsUsed: ['Ceramic Tiles', 'Adhesive', 'Grout'],
      workHours: 8,
      vendor: 'BuildRight Contractors',
      vendorContact: '5432109876',
      technician: null,
      notes: 'Schedule during low patient hours',
      followUpRequired: true,
      followUpDate: '2024-01-23',
      attachments: 4,
      impact: 'Safety hazard for staff and patients'
    },
    { 
      id: 6, 
      ticketNo: 'HK-MNT-2024-006', 
      title: 'OT Sterilizer Malfunction', 
      description: 'Autoclave not reaching required temperature',
      roomNo: 'OT-01',
      department: 'Operation Theater',
      maintenanceType: 'Medical Equipment',
      subType: 'Sterilization',
      priority: 'Critical',
      status: 'In Progress',
      reportedBy: 'OT Incharge',
      reportedDate: '2024-01-20',
      reportedTime: '07:00 AM',
      assignedTo: 'Biomedical Team',
      assignedDate: '2024-01-20',
      estimatedCompletion: '2024-01-20',
      actualCompletion: null,
      costEstimate: 35000,
      actualCost: null,
      materialsUsed: ['Heating Element', 'Temperature Sensor', 'Seals'],
      workHours: 6,
      vendor: 'MediTech Solutions',
      vendorContact: '4321098765',
      technician: 'Sanjay Mehta',
      notes: 'Critical equipment - emergency surgery scheduled',
      followUpRequired: true,
      followUpDate: '2024-01-21',
      attachments: 2,
      impact: 'Surgery delays, infection control risk'
    },
    { 
      id: 7, 
      ticketNo: 'HK-MNT-2024-007', 
      title: 'Blocked Toilet - Ward 305', 
      description: 'Complete blockage, water overflowing',
      roomNo: 'WARD-305',
      department: 'General Ward',
      maintenanceType: 'Plumbing',
      subType: 'Drainage',
      priority: 'High',
      status: 'Completed',
      reportedBy: 'Housekeeping Staff',
      reportedDate: '2024-01-19',
      reportedTime: '11:20 AM',
      assignedTo: 'Plumbing Team',
      assignedDate: '2024-01-19',
      estimatedCompletion: '2024-01-19',
      actualCompletion: '2024-01-19',
      costEstimate: 4000,
      actualCost: 3800,
      materialsUsed: ['Plunger', 'Drain Snake', 'PVC Pipe'],
      workHours: 1.5,
      vendor: 'AquaFlow Plumbers',
      vendorContact: '8765432109',
      technician: 'Mohammed Khan',
      notes: 'Cleared blockage, sanitized area',
      followUpRequired: false,
      followUpDate: null,
      attachments: 0,
      impact: 'Unusable facility, hygiene issue'
    },
    { 
      id: 8, 
      ticketNo: 'HK-MNT-2024-008', 
      title: 'Window Seal Broken - ICU 102', 
      description: 'Window not closing properly, air leakage',
      roomNo: 'ICU-102',
      department: 'ICU',
      maintenanceType: 'Carpentry',
      subType: 'Windows',
      priority: 'Medium',
      status: 'Pending',
      reportedBy: 'ICU Staff',
      reportedDate: '2024-01-20',
      reportedTime: '03:15 PM',
      assignedTo: 'Carpentry Team',
      assignedDate: null,
      estimatedCompletion: null,
      actualCompletion: null,
      costEstimate: 6000,
      actualCost: null,
      materialsUsed: [],
      workHours: 3,
      vendor: 'WoodWorks Carpenters',
      vendorContact: '3210987654',
      technician: null,
      notes: 'Affects temperature control in ICU',
      followUpRequired: true,
      followUpDate: null,
      attachments: 1,
      impact: 'Temperature fluctuations, energy loss'
    },
    { 
      id: 9, 
      ticketNo: 'HK-MNT-2024-009', 
      title: 'Generator Fuel Leak', 
      description: 'Diesel leak from backup generator',
      roomNo: 'GENERATOR',
      department: 'Hospital Services',
      maintenanceType: 'Mechanical',
      subType: 'Generator',
      priority: 'Critical',
      status: 'In Progress',
      reportedBy: 'Security Staff',
      reportedDate: '2024-01-20',
      reportedTime: '06:00 AM',
      assignedTo: 'Mechanical Team',
      assignedDate: '2024-01-20',
      estimatedCompletion: '2024-01-21',
      actualCompletion: null,
      costEstimate: 45000,
      actualCost: null,
      materialsUsed: ['Fuel Line', 'Gaskets', 'Sealant'],
      workHours: 8,
      vendor: 'PowerGen Engineers',
      vendorContact: '2109876543',
      technician: 'Anil Sharma',
      notes: 'Fire hazard, emergency repair required',
      followUpRequired: true,
      followUpDate: '2024-01-22',
      attachments: 3,
      impact: 'Power backup risk, fire safety concern'
    },
    { 
      id: 10, 
      ticketNo: 'HK-MNT-2024-010', 
      title: 'Fire Alarm Panel Fault', 
      description: 'False alarms from panel in main building',
      roomNo: 'MAIN-LOBBY',
      department: 'Hospital Services',
      maintenanceType: 'Fire Safety',
      subType: 'Alarm System',
      priority: 'Critical',
      status: 'Scheduled',
      reportedBy: 'Hospital Administrator',
      reportedDate: '2024-01-19',
      reportedTime: '05:30 PM',
      assignedTo: 'Fire Safety Team',
      assignedDate: '2024-01-22',
      estimatedCompletion: '2024-01-23',
      actualCompletion: null,
      costEstimate: 28000,
      actualCost: null,
      materialsUsed: ['Control Panel', 'Sensors', 'Wiring'],
      workHours: 6,
      vendor: 'SafetyFirst Systems',
      vendorContact: '1098765432',
      technician: null,
      notes: 'Schedule testing after repair',
      followUpRequired: true,
      followUpDate: '2024-01-24',
      attachments: 2,
      impact: 'Safety compliance issue, disturbance'
    },
  ]);

  // Maintenance Teams
  const [teams, setTeams] = useState([
    { id: 1, name: 'HVAC Team', lead: 'Rajesh Kumar', contact: '9876543210', activeRequests: 3, rating: '4.7' },
    { id: 2, name: 'Plumbing Team', lead: 'Mohammed Khan', contact: '8765432109', activeRequests: 2, rating: '4.5' },
    { id: 3, name: 'Electrical Team', lead: 'Vikram Patel', contact: '7654321098', activeRequests: 1, rating: '4.8' },
    { id: 4, name: 'Biomedical Team', lead: 'Amit Singh', contact: '6543210987', activeRequests: 2, rating: '4.9' },
    { id: 5, name: 'Civil Team', lead: 'Ravi Verma', contact: '5432109876', activeRequests: 1, rating: '4.6' },
    { id: 6, name: 'Carpentry Team', lead: 'Suresh Kumar', contact: '4321098765', activeRequests: 1, rating: '4.4' },
  ]);

  // Maintenance Statistics
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    scheduled: 0,
    critical: 0,
    avgResolutionTime: '0 hours',
    totalCost: 0
  });

  // Preventive Maintenance Schedule
  const [preventiveSchedule, setPreventiveSchedule] = useState([
    { id: 1, equipment: 'AC Units', frequency: 'Monthly', lastDone: '2024-01-15', nextDue: '2024-02-15', team: 'HVAC Team', status: 'Scheduled' },
    { id: 2, equipment: 'Water Heaters', frequency: 'Quarterly', lastDone: '2024-01-10', nextDue: '2024-04-10', team: 'Plumbing Team', status: 'Scheduled' },
    { id: 3, equipment: 'Fire Extinguishers', frequency: 'Monthly', lastDone: '2024-01-05', nextDue: '2024-02-05', team: 'Fire Safety', status: 'Overdue' },
    { id: 4, equipment: 'Emergency Lights', frequency: 'Monthly', lastDone: '2024-01-18', nextDue: '2024-02-18', team: 'Electrical Team', status: 'Scheduled' },
    { id: 5, equipment: 'Medical Gas Lines', frequency: 'Weekly', lastDone: '2024-01-19', nextDue: '2024-01-26', team: 'Biomedical', status: 'Due Soon' },
    { id: 6, equipment: 'Elevators', frequency: 'Monthly', lastDone: '2024-01-12', nextDue: '2024-02-12', team: 'Mechanical Team', status: 'Scheduled' },
  ]);

  // Update request status
  const updateRequestStatus = (id, newStatus) => {
    setMaintenanceRequests(requests =>
      requests.map(request => {
        if (request.id === id) {
          const updatedRequest = { ...request, status: newStatus };
          
          if (newStatus === 'Completed') {
            updatedRequest.actualCompletion = new Date().toISOString().split('T')[0];
          }
          
          if (newStatus === 'In Progress' && !request.assignedDate) {
            updatedRequest.assignedDate = new Date().toISOString().split('T')[0];
          }
          
          return updatedRequest;
        }
        return request;
      })
    );
  };

  // Assign technician
  const assignTechnician = (id, technicianName) => {
    setMaintenanceRequests(requests =>
      requests.map(request => 
        request.id === id ? { 
          ...request, 
          technician: technicianName,
          assignedDate: new Date().toISOString().split('T')[0]
        } : request
      )
    );
  };

  // Add new request
  const addNewRequest = () => {
    const newRequest = {
      id: maintenanceRequests.length + 1,
      ticketNo: `HK-MNT-2024-${(maintenanceRequests.length + 1).toString().padStart(3, '0')}`,
      title: 'New Maintenance Request',
      description: 'Description of the issue',
      roomNo: 'NEW',
      department: 'General Ward',
      maintenanceType: 'Electrical',
      subType: 'Lighting',
      priority: 'Medium',
      status: 'Pending',
      reportedBy: 'Staff',
      reportedDate: new Date().toISOString().split('T')[0],
      reportedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      assignedTo: null,
      assignedDate: null,
      estimatedCompletion: null,
      actualCompletion: null,
      costEstimate: 0,
      actualCost: null,
      materialsUsed: [],
      workHours: 0,
      vendor: 'Select Vendor',
      vendorContact: '',
      technician: null,
      notes: 'New request - update details',
      followUpRequired: false,
      followUpDate: null,
      attachments: 0,
      impact: 'To be assessed'
    };
    
    setMaintenanceRequests([...maintenanceRequests, newRequest]);
  };

  // Mark as completed
  const markAsCompleted = (id) => {
    const request = maintenanceRequests.find(r => r.id === id);
    if (!request) return;

    setMaintenanceRequests(requests =>
      requests.map(req => 
        req.id === id ? { 
          ...req, 
          status: 'Completed',
          actualCompletion: new Date().toISOString().split('T')[0],
          actualCost: req.costEstimate
        } : req
      )
    );
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'hk-maintenance-priority-critical';
      case 'High': return 'hk-maintenance-priority-high';
      case 'Medium': return 'hk-maintenance-priority-medium';
      case 'Low': return 'hk-maintenance-priority-low';
      default: return 'hk-maintenance-priority-default';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'hk-maintenance-status-completed';
      case 'In Progress': return 'hk-maintenance-status-inprogress';
      case 'Pending': return 'hk-maintenance-status-pending';
      case 'Scheduled': return 'hk-maintenance-status-scheduled';
      default: return 'hk-maintenance-status-default';
    }
  };

  // Get maintenance type icon
  const getTypeIcon = (type) => {
    switch(type) {
      case 'HVAC': return <FaSnowflake />;
      case 'Plumbing': return <FaTint />;
      case 'Electrical': return <FaBolt />;
      case 'Furniture': return <FaBed />;
      case 'Civil': return <FaBuilding />;
      case 'Medical Equipment': return <FaHospital />;
      case 'Carpentry': return <FaDoorClosed />;
      case 'Mechanical': return <FaTools />;
      case 'Fire Safety': return <FaExclamationTriangle />;
      default: return <FaWrench />;
    }
  };

  // Calculate resolution time
  const getResolutionTime = (request) => {
    if (request.status !== 'Completed' || !request.actualCompletion) return 'N/A';
    
    const reported = new Date(request.reportedDate);
    const completed = new Date(request.actualCompletion);
    const diffHours = Math.floor((completed - reported) / (1000 * 60 * 60));
    
    return diffHours < 24 ? `${diffHours} hours` : `${Math.floor(diffHours / 24)} days`;
  };

  // Filter requests
  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.roomNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || request.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    const matchesType = selectedType === 'all' || request.maintenanceType === selectedType;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority && matchesType;
  });

  // Update statistics
  useEffect(() => {
    const totalRequests = maintenanceRequests.length;
    const pending = maintenanceRequests.filter(r => r.status === 'Pending').length;
    const inProgress = maintenanceRequests.filter(r => r.status === 'In Progress').length;
    const completed = maintenanceRequests.filter(r => r.status === 'Completed').length;
    const scheduled = maintenanceRequests.filter(r => r.status === 'Scheduled').length;
    const critical = maintenanceRequests.filter(r => r.priority === 'Critical').length;
    
    // Calculate average resolution time for completed requests
    const completedRequests = maintenanceRequests.filter(r => r.status === 'Completed');
    const totalHours = completedRequests.reduce((sum, req) => {
      if (req.reportedDate && req.actualCompletion) {
        const reported = new Date(req.reportedDate);
        const completed = new Date(req.actualCompletion);
        return sum + Math.floor((completed - reported) / (1000 * 60 * 60));
      }
      return sum;
    }, 0);
    
    const avgResolutionTime = completedRequests.length > 0 
      ? `${Math.floor(totalHours / completedRequests.length)} hours`
      : '0 hours';
    
    // Calculate total cost
    const totalCost = maintenanceRequests.reduce((sum, req) => {
      return sum + (req.actualCost || req.costEstimate || 0);
    }, 0);

    setStats({
      totalRequests,
      pending,
      inProgress,
      completed,
      scheduled,
      critical,
      avgResolutionTime,
      totalCost
    });
  }, [maintenanceRequests]);

  return (
    <div className="hk-maintenance-container">
      {/* Header */}
      <div className="hk-maintenance-header">
        <div className="hk-maintenance-title-section">
          <h1 className="hk-maintenance-title">
            <FaTools className="hk-maintenance-title-icon" />
            Maintenance Management
          </h1>
          <p className="hk-maintenance-subtitle">
            Track, assign, and manage all maintenance requests and preventive maintenance schedules
          </p>
        </div>
        <div className="hk-maintenance-header-actions">
          <button className="hk-maintenance-btn-primary" onClick={addNewRequest}>
            <FaPlus /> New Request
          </button>
          <button className="hk-maintenance-btn-secondary">
            <FaPrint /> Print Report
          </button>
          <button className="hk-maintenance-btn-refresh">
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="hk-maintenance-stats-section">
        <h2 className="hk-maintenance-section-title">
          <FaChartLine /> Maintenance Overview
        </h2>
        <div className="hk-maintenance-stats-grid">
          <div className="hk-maintenance-stat-card hk-maintenance-stat-total">
            <div className="hk-maintenance-stat-icon">
              <FaClipboardCheck />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>{stats.totalRequests}</h3>
              <p>Total Requests</p>
            </div>
            <div className="hk-maintenance-stat-trend">
              <span className="hk-maintenance-trend-up">↑ 15%</span>
            </div>
          </div>

          <div className="hk-maintenance-stat-card hk-maintenance-stat-critical">
            <div className="hk-maintenance-stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>{stats.critical}</h3>
              <p>Critical Issues</p>
            </div>
            <div className="hk-maintenance-stat-trend">
              <span className="hk-maintenance-trend-up">↑ 8%</span>
            </div>
          </div>

          <div className="hk-maintenance-stat-card hk-maintenance-stat-progress">
            <div className="hk-maintenance-stat-icon">
              <FaHourglassHalf />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>{stats.inProgress}</h3>
              <p>In Progress</p>
            </div>
            <div className="hk-maintenance-stat-detail">
              {stats.avgResolutionTime} avg
            </div>
          </div>

          <div className="hk-maintenance-stat-card hk-maintenance-stat-pending">
            <div className="hk-maintenance-stat-icon">
              <FaClock />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
            <div className="hk-maintenance-stat-trend">
              <span className="hk-maintenance-trend-down">↓ 12%</span>
            </div>
          </div>

          <div className="hk-maintenance-stat-card hk-maintenance-stat-completed">
            <div className="hk-maintenance-stat-icon">
              <FaCheckCircle />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
            <div className="hk-maintenance-stat-detail">
              {Math.round((stats.completed / stats.totalRequests) * 100)}% rate
            </div>
          </div>

          <div className="hk-maintenance-stat-card hk-maintenance-stat-cost">
            <div className="hk-maintenance-stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="hk-maintenance-stat-content">
              <h3>₹{stats.totalCost.toLocaleString()}</h3>
              <p>Total Cost</p>
            </div>
            <div className="hk-maintenance-stat-trend">
              <span className="hk-maintenance-trend-neutral">→ 0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Teams */}
      <div className="hk-maintenance-teams-section">
        <h2 className="hk-maintenance-section-title">
          <FaHardHat /> Maintenance Teams
        </h2>
        <div className="hk-maintenance-teams-grid">
          {teams.map(team => (
            <div key={team.id} className="hk-maintenance-team-card">
              <div className="hk-maintenance-team-header">
                <div className="hk-maintenance-team-avatar">
                  {team.name.charAt(0)}
                </div>
                <div className="hk-maintenance-team-info">
                  <h3>{team.name}</h3>
                  <div className="hk-maintenance-team-lead">
                    <FaUser /> {team.lead}
                  </div>
                </div>
                <div className="hk-maintenance-team-rating">
                  <span className="hk-maintenance-rating-badge">{team.rating}</span>
                </div>
              </div>
              
              <div className="hk-maintenance-team-details">
                <div className="hk-maintenance-team-contact">
                  <FaPhone /> {team.contact}
                </div>
                <div className="hk-maintenance-team-workload">
                  <div className="hk-maintenance-workload-label">Active Tasks:</div>
                  <div className="hk-maintenance-workload-value">{team.activeRequests}</div>
                </div>
              </div>
              
              <div className="hk-maintenance-team-progress">
                <div 
                  className="hk-maintenance-team-progress-bar"
                  style={{ width: `${Math.min(100, (team.activeRequests / 5) * 100)}%` }}
                ></div>
              </div>
              
              <div className="hk-maintenance-team-actions">
                <button className="hk-maintenance-team-action-btn">
                  <FaPhone /> Call
                </button>
                <button className="hk-maintenance-team-action-btn">
                  <FaEnvelope /> Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preventive Maintenance */}
      <div className="hk-maintenance-preventive-section">
        <div className="hk-maintenance-preventive-header">
          <h2 className="hk-maintenance-section-title">
            <FaCalendarAlt /> Preventive Maintenance Schedule
          </h2>
          <button className="hk-maintenance-btn-secondary">
            <FaPlus /> Add Schedule
          </button>
        </div>
        
        <div className="hk-maintenance-preventive-grid">
          {preventiveSchedule.map(schedule => (
            <div key={schedule.id} className="hk-maintenance-preventive-card">
              <div className="hk-maintenance-preventive-header">
                <div className="hk-maintenance-preventive-icon">
                  {getTypeIcon(schedule.team.includes('HVAC') ? 'HVAC' : 'Electrical')}
                </div>
                <div className="hk-maintenance-preventive-info">
                  <h3>{schedule.equipment}</h3>
                  <div className="hk-maintenance-preventive-frequency">
                    {schedule.frequency}
                  </div>
                </div>
                <span className={`hk-maintenance-preventive-status hk-maintenance-preventive-${schedule.status.toLowerCase().replace(' ', '')}`}>
                  {schedule.status}
                </span>
              </div>
              
              <div className="hk-maintenance-preventive-dates">
                <div className="hk-maintenance-preventive-date">
                  <div className="hk-maintenance-date-label">Last Done:</div>
                  <div className="hk-maintenance-date-value">{schedule.lastDone}</div>
                </div>
                <div className="hk-maintenance-preventive-date">
                  <div className="hk-maintenance-date-label">Next Due:</div>
                  <div className={`hk-maintenance-date-value ${schedule.status === 'Overdue' ? 'hk-maintenance-date-overdue' : ''}`}>
                    {schedule.nextDue}
                  </div>
                </div>
              </div>
              
              <div className="hk-maintenance-preventive-assigned">
                <FaUser /> Assigned to: {schedule.team}
              </div>
              
              <div className="hk-maintenance-preventive-actions">
                <button className="hk-maintenance-preventive-action-btn">
                  <FaClipboardCheck /> Mark Done
                </button>
                <button className="hk-maintenance-preventive-action-btn">
                  <FaEdit /> Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="hk-maintenance-filters-section">
        <div className="hk-maintenance-search-container">
          <FaSearch className="hk-maintenance-search-icon" />
          <input
            type="text"
            placeholder="Search by ticket number, room, or issue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hk-maintenance-search-input"
          />
        </div>

        <div className="hk-maintenance-filter-group">
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="hk-maintenance-filter-select"
          >
            <option value="all">All Departments</option>
            <option value="ICU">ICU</option>
            <option value="General Ward">General Ward</option>
            <option value="OPD">OPD</option>
            <option value="Operation Theater">Operation Theater</option>
            <option value="Emergency">Emergency</option>
            <option value="Hospital Services">Hospital Services</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Maternity">Maternity</option>
          </select>

          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="hk-maintenance-filter-select"
          >
            <option value="all">All Types</option>
            <option value="HVAC">HVAC</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Furniture">Furniture</option>
            <option value="Civil">Civil</option>
            <option value="Medical Equipment">Medical Equipment</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Fire Safety">Fire Safety</option>
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="hk-maintenance-filter-select"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
          </select>

          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="hk-maintenance-filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button className="hk-maintenance-filter-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="hk-maintenance-reset-btn">
            <FaSync /> Reset
          </button>
          <button className="hk-maintenance-export-btn">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Main Maintenance Table */}
      <div className="hk-maintenance-table-section">
        <div className="hk-maintenance-table-header">
          <h2 className="hk-maintenance-section-title">
            <FaTools /> Maintenance Requests
          </h2>
          <div className="hk-maintenance-table-info">
            <span className="hk-maintenance-table-count">
              Showing {filteredRequests.length} of {maintenanceRequests.length} requests
            </span>
            <button className="hk-maintenance-btn-print">
              <FaPrint /> Print Report
            </button>
          </div>
        </div>

        <div className="hk-maintenance-table-container">
          <table className="hk-maintenance-table">
            <thead>
              <tr>
                <th className="hk-maintenance-th-ticket">Ticket Details</th>
                <th className="hk-maintenance-th-location">Location & Impact</th>
                <th className="hk-maintenance-th-assignment">Assignment</th>
                <th className="hk-maintenance-th-cost">Cost & Timeline</th>
                <th className="hk-maintenance-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hk-maintenance-table-row">
                  {/* Ticket Details Column */}
                  <td className="hk-maintenance-td-ticket">
                    <div className="hk-maintenance-ticket-details">
                      <div className="hk-maintenance-ticket-header">
                        <div className="hk-maintenance-ticket-number">
                          <FaClipboardCheck /> {request.ticketNo}
                        </div>
                        <div className="hk-maintenance-ticket-status">
                          <span className={`hk-maintenance-status-badge ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-ticket-title">
                        {request.title}
                      </div>
                      
                      <div className="hk-maintenance-ticket-description">
                        {request.description}
                      </div>
                      
                      <div className="hk-maintenance-ticket-meta">
                        <div className="hk-maintenance-ticket-type">
                          {getTypeIcon(request.maintenanceType)}
                          <span>{request.maintenanceType} - {request.subType}</span>
                        </div>
                        <div className="hk-maintenance-ticket-priority">
                          <span className={`hk-maintenance-priority-badge ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-reported-info">
                        <div className="hk-maintenance-reported-by">
                          <FaUser /> Reported by: {request.reportedBy}
                        </div>
                        <div className="hk-maintenance-reported-time">
                          <FaCalendarAlt /> {request.reportedDate} {request.reportedTime}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Location & Impact Column */}
                  <td className="hk-maintenance-td-location">
                    <div className="hk-maintenance-location-info">
                      <div className="hk-maintenance-room-details">
                        <div className="hk-maintenance-room-header">
                          <FaMapMarkerAlt className="hk-maintenance-room-icon" />
                          <div>
                            <div className="hk-maintenance-room-number">{request.roomNo}</div>
                            <div className="hk-maintenance-room-department">{request.department}</div>
                          </div>
                        </div>
                        
                        <div className="hk-maintenance-attachments">
                          {request.attachments > 0 && (
                            <div className="hk-maintenance-attachments-count">
                              <FaEye /> {request.attachments} photo(s)
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-impact-assessment">
                        <div className="hk-maintenance-impact-title">
                          <FaExclamationTriangle /> Impact Assessment
                        </div>
                        <div className="hk-maintenance-impact-description">
                          {request.impact}
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-notes">
                        <div className="hk-maintenance-notes-title">
                          Notes:
                        </div>
                        <div className="hk-maintenance-notes-content">
                          {request.notes}
                        </div>
                        {request.followUpRequired && (
                          <div className="hk-maintenance-followup">
                            <FaClock /> Follow-up required
                            {request.followUpDate && (
                              <span className="hk-maintenance-followup-date">
                                by {request.followUpDate}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Assignment Column */}
                  <td className="hk-maintenance-td-assignment">
                    <div className="hk-maintenance-assignment-info">
                      <div className="hk-maintenance-assignment-status">
                        {request.assignedTo ? (
                          <div className="hk-maintenance-assigned">
                            <div className="hk-maintenance-assigned-to">
                              <FaHardHat /> Assigned to: {request.assignedTo}
                            </div>
                            {request.assignedDate && (
                              <div className="hk-maintenance-assigned-date">
                                On: {request.assignedDate}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="hk-maintenance-unassigned">
                            <div className="hk-maintenance-unassigned-alert">
                              <FaExclamationTriangle /> Not Assigned
                            </div>
                            <select 
                              className="hk-maintenance-team-select"
                              onChange={(e) => assignTechnician(request.id, e.target.value)}
                              value={request.assignedTo || ''}
                            >
                              <option value="">Select Team</option>
                              {teams.map(team => (
                                <option key={team.id} value={team.name}>{team.name}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                      
                      <div className="hk-maintenance-technician">
                        {request.technician ? (
                          <div className="hk-maintenance-technician-assigned">
                            <div className="hk-maintenance-technician-info">
                              <FaUser /> Technician: {request.technician}
                            </div>
                            <div className="hk-maintenance-technician-rating">
                              <FaStar /> 4.5/5
                            </div>
                          </div>
                        ) : (
                          <div className="hk-maintenance-technician-select">
                            <select 
                              className="hk-maintenance-tech-select"
                              onChange={(e) => assignTechnician(request.id, e.target.value)}
                              value={request.technician || ''}
                            >
                              <option value="">Select Technician</option>
                              <option value="Rajesh Kumar">Rajesh Kumar</option>
                              <option value="Mohammed Khan">Mohammed Khan</option>
                              <option value="Vikram Patel">Vikram Patel</option>
                              <option value="Amit Singh">Amit Singh</option>
                              <option value="Sanjay Mehta">Sanjay Mehta</option>
                            </select>
                          </div>
                        )}
                      </div>
                      
                      <div className="hk-maintenance-vendor-info">
                        <div className="hk-maintenance-vendor-header">
                          <FaTruck /> Vendor: {request.vendor}
                        </div>
                        <div className="hk-maintenance-vendor-contact">
                          <FaPhone /> {request.vendorContact}
                        </div>
                        <div className="hk-maintenance-vendor-rating">
                          <FaStar /> 4.7/5
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-materials">
                        <div className="hk-maintenance-materials-title">
                          Materials Required:
                        </div>
                        <div className="hk-maintenance-materials-list">
                          {request.materialsUsed.length > 0 ? (
                            request.materialsUsed.map((material, index) => (
                              <span key={index} className="hk-maintenance-material-badge">
                                {material}
                              </span>
                            ))
                          ) : (
                            <span className="hk-maintenance-no-materials">
                              No materials listed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Cost & Timeline Column */}
                  <td className="hk-maintenance-td-cost">
                    <div className="hk-maintenance-cost-timeline">
                      <div className="hk-maintenance-cost-info">
                        <div className="hk-maintenance-cost-estimate">
                          <div className="hk-maintenance-cost-label">Estimate:</div>
                          <div className="hk-maintenance-cost-value">₹{request.costEstimate.toLocaleString()}</div>
                        </div>
                        
                        <div className="hk-maintenance-cost-actual">
                          <div className="hk-maintenance-cost-label">Actual Cost:</div>
                          <div className="hk-maintenance-cost-value">
                            {request.actualCost ? (
                              <>₹{request.actualCost.toLocaleString()}</>
                            ) : (
                              <span className="hk-maintenance-cost-pending">Pending</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="hk-maintenance-cost-difference">
                          {request.actualCost && (
                            <div className={`hk-maintenance-cost-diff ${
                              request.actualCost > request.costEstimate ? 'hk-maintenance-cost-over' : 'hk-maintenance-cost-under'
                            }`}>
                              {request.actualCost > request.costEstimate ? 'Over' : 'Under'} budget: 
                              ₹{Math.abs(request.actualCost - request.costEstimate).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-timeline-info">
                        <div className="hk-maintenance-timeline-item">
                          <div className="hk-maintenance-timeline-label">Work Hours:</div>
                          <div className="hk-maintenance-timeline-value">{request.workHours} hours</div>
                        </div>
                        
                        <div className="hk-maintenance-timeline-item">
                          <div className="hk-maintenance-timeline-label">Est. Completion:</div>
                          <div className="hk-maintenance-timeline-value">
                            {request.estimatedCompletion || 'Not set'}
                          </div>
                        </div>
                        
                        <div className="hk-maintenance-timeline-item">
                          <div className="hk-maintenance-timeline-label">Actual Completion:</div>
                          <div className="hk-maintenance-timeline-value">
                            {request.actualCompletion || 'Pending'}
                          </div>
                        </div>
                        
                        {request.status === 'Completed' && (
                          <div className="hk-maintenance-resolution-time">
                            <div className="hk-maintenance-resolution-label">
                              Resolution Time:
                            </div>
                            <div className="hk-maintenance-resolution-value">
                              {getResolutionTime(request)}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="hk-maintenance-progress-tracker">
                        <div className="hk-maintenance-progress-stages">
                          <div className={`hk-maintenance-progress-stage ${request.status === 'Pending' ? 'active' : 'completed'}`}>
                            <span className="hk-maintenance-progress-dot"></span>
                            Reported
                          </div>
                          <div className={`hk-maintenance-progress-stage ${request.status === 'In Progress' ? 'active' : request.status === 'Completed' ? 'completed' : ''}`}>
                            <span className="hk-maintenance-progress-dot"></span>
                            Assigned
                          </div>
                          <div className={`hk-maintenance-progress-stage ${request.status === 'In Progress' ? 'active' : ''}`}>
                            <span className="hk-maintenance-progress-dot"></span>
                            In Progress
                          </div>
                          <div className={`hk-maintenance-progress-stage ${request.status === 'Completed' ? 'active completed' : ''}`}>
                            <span className="hk-maintenance-progress-dot"></span>
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="hk-maintenance-td-actions">
                    <div className="hk-maintenance-action-buttons">
                      <button 
                        className="hk-maintenance-action-btn hk-maintenance-action-view"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="hk-maintenance-action-btn hk-maintenance-action-edit"
                        title="Edit Request"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="hk-maintenance-action-btn hk-maintenance-action-assign"
                        title="Assign Technician"
                      >
                        <FaUser />
                      </button>
                      <button 
                        className="hk-maintenance-action-btn hk-maintenance-action-update"
                        title="Update Status"
                      >
                        <FaSync />
                      </button>
                    </div>
                    
                    <div className="hk-maintenance-status-controls">
                      <select 
                        className="hk-maintenance-status-select"
                        value={request.status}
                        onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                      
                      {request.status !== 'Completed' && (
                        <button 
                          className="hk-maintenance-complete-btn"
                          onClick={() => markAsCompleted(request.id)}
                        >
                          <FaCheckCircle /> Complete
                        </button>
                      )}
                    </div>
                    
                    <div className="hk-maintenance-quick-info">
                      <div className="hk-maintenance-quick-stats">
                        <div className="hk-maintenance-quick-stat">
                          <FaClock /> {request.workHours}h
                        </div>
                        <div className="hk-maintenance-quick-stat">
                          <FaMoneyBillWave /> ₹{request.costEstimate.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="hk-maintenance-attachment-btn">
                        {request.attachments > 0 ? (
                          <button className="hk-maintenance-attachments-btn">
                            <FaEye /> View ({request.attachments})
                          </button>
                        ) : (
                          <button className="hk-maintenance-add-attachment">
                            <FaPlus /> Add Photo
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="hk-maintenance-history-link">
                      <button className="hk-maintenance-history-btn">
                        <FaHistory /> View History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredRequests.length === 0 && (
          <div className="hk-maintenance-no-results">
            <FaTools className="hk-maintenance-no-results-icon" />
            <h3>No maintenance requests found</h3>
            <p>Try adjusting your filters or add a new request</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="hk-maintenance-table-footer">
          <div className="hk-maintenance-pagination">
            <button className="hk-maintenance-page-btn">← Previous</button>
            <span className="hk-maintenance-page-info">Page 1 of 3</span>
            <button className="hk-maintenance-page-btn">Next →</button>
          </div>
          
          <div className="hk-maintenance-summary">
            <div className="hk-maintenance-summary-stats">
              <span className="hk-maintenance-summary-item">
                <span className="hk-maintenance-summary-dot hk-maintenance-summary-pending"></span>
                Pending: {stats.pending}
              </span>
              <span className="hk-maintenance-summary-item">
                <span className="hk-maintenance-summary-dot hk-maintenance-summary-inprogress"></span>
                In Progress: {stats.inProgress}
              </span>
              <span className="hk-maintenance-summary-item">
                <span className="hk-maintenance-summary-dot hk-maintenance-summary-completed"></span>
                Completed: {stats.completed}
              </span>
              <span className="hk-maintenance-summary-item">
                <span className="hk-maintenance-summary-dot hk-maintenance-summary-critical"></span>
                Critical: {stats.critical}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Reports */}
      <div className="hk-maintenance-reports-section">
        <h2 className="hk-maintenance-section-title">
          <FaChartLine /> Maintenance Reports
        </h2>
        <div className="hk-maintenance-reports-grid">
          <div className="hk-maintenance-report-card">
            <h3>Monthly Breakdown</h3>
            <div className="hk-maintenance-report-stats">
              <div className="hk-maintenance-report-stat">
                <div className="hk-maintenance-report-label">Requests:</div>
                <div className="hk-maintenance-report-value">{stats.totalRequests}</div>
              </div>
              <div className="hk-maintenance-report-stat">
                <div className="hk-maintenance-report-label">Cost:</div>
                <div className="hk-maintenance-report-value">₹{stats.totalCost.toLocaleString()}</div>
              </div>
              <div className="hk-maintenance-report-stat">
                <div className="hk-maintenance-report-label">Avg Time:</div>
                <div className="hk-maintenance-report-value">{stats.avgResolutionTime}</div>
              </div>
            </div>
            <button className="hk-maintenance-report-btn">
              <FaDownload /> Download Report
            </button>
          </div>
          
          <div className="hk-maintenance-report-card">
            <h3>Department Analysis</h3>
            <div className="hk-maintenance-department-stats">
              <div className="hk-maintenance-department-stat">
                <span className="hk-maintenance-department-name">ICU:</span>
                <span className="hk-maintenance-department-value">
                  {maintenanceRequests.filter(r => r.department === 'ICU').length} requests
                </span>
              </div>
              <div className="hk-maintenance-department-stat">
                <span className="hk-maintenance-department-name">General Ward:</span>
                <span className="hk-maintenance-department-value">
                  {maintenanceRequests.filter(r => r.department === 'General Ward').length} requests
                </span>
              </div>
              <div className="hk-maintenance-department-stat">
                <span className="hk-maintenance-department-name">Emergency:</span>
                <span className="hk-maintenance-department-value">
                  {maintenanceRequests.filter(r => r.department === 'Emergency').length} requests
                </span>
              </div>
            </div>
            <button className="hk-maintenance-report-btn">
              <FaDownload /> Department Report
            </button>
          </div>
          
          <div className="hk-maintenance-report-card">
            <h3>Vendor Performance</h3>
            <div className="hk-maintenance-vendor-performance">
              <div className="hk-maintenance-vendor-stat">
                <span className="hk-maintenance-vendor-name">CoolTech HVAC:</span>
                <span className="hk-maintenance-vendor-rating">4.7/5</span>
              </div>
              <div className="hk-maintenance-vendor-stat">
                <span className="hk-maintenance-vendor-name">AquaFlow Plumbers:</span>
                <span className="hk-maintenance-vendor-rating">4.5/5</span>
              </div>
              <div className="hk-maintenance-vendor-stat">
                <span className="hk-maintenance-vendor-name">MediTech Solutions:</span>
                <span className="hk-maintenance-vendor-rating">4.9/5</span>
              </div>
            </div>
            <button className="hk-maintenance-report-btn">
              <FaDownload /> Vendor Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hk-maintenance-quick-actions-section">
        <h2 className="hk-maintenance-section-title">
          <FaWrench /> Quick Actions
        </h2>
        <div className="hk-maintenance-quick-grid">
          <button className="hk-maintenance-quick-action hk-maintenance-action-request">
            <FaPlus /> New  Request
          </button>
          <button className="hk-maintenance-quick-action hk-maintenance-action-schedule">
            <FaCalendarAlt /> Schedule PM
          </button>
          <button className="hk-maintenance-quick-action hk-maintenance-action-report">
            <FaChartLine /> Generate Report
          </button>
          <button className="hk-maintenance-quick-action hk-maintenance-action-alert">
            <FaExclamationTriangle /> Critical Alerts
          </button>
          <button className="hk-maintenance-quick-action hk-maintenance-action-audit">
            <FaClipboardCheck /> Maintenance Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceManagement;