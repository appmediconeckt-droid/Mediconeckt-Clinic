import React, { useState, useEffect } from 'react';
import './AllocationManagement.css';

const AllocationManagement = () => {
  const [allocationData, setAllocationData] = useState({
    resources: [],
    allocations: [],
    departments: [],
    rooms: [],
    equipment: [],
    staff: [],
    loading: true,
    viewMode: 'resources', // resources, allocations, calendar, analytics
    filterDepartment: 'all',
    filterStatus: 'all',
    filterDate: new Date().toISOString().split('T')[0]
  });

  const [selectedResource, setSelectedResource] = useState(null);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Resources Data
  const resourcesList = [
    {
      id: 1,
      type: "Operation Theater",
      name: "OT-1",
      department: "Surgery",
      status: "occupied",
      currentAllocation: "Dr. Rajesh Sharma",
      nextAvailable: "2024-01-15 14:00",
      capacity: "1 Surgeon, 2 Assistants",
      equipment: ["Anesthesia Machine", "Surgical Lights", "Monitor"],
      maintenanceDue: "2024-02-10",
      utilization: 85
    },
    {
      id: 2,
      type: "ICU Bed",
      name: "ICU-BED-05",
      department: "ICU",
      status: "available",
      currentAllocation: "Vacant",
      nextAvailable: "Immediate",
      capacity: "1 Patient",
      equipment: ["Ventilator", "Monitor", "IV Pump"],
      maintenanceDue: "2024-01-25",
      utilization: 65
    },
    {
      id: 3,
      type: "MRI Machine",
      name: "MRI-03",
      department: "Radiology",
      status: "maintenance",
      currentAllocation: "Under Maintenance",
      nextAvailable: "2024-01-16 10:00",
      capacity: "1 Patient/hour",
      equipment: ["Scanner", "Console", "Cooling System"],
      maintenanceDue: "2024-01-15",
      utilization: 92
    },
    {
      id: 4,
      type: "General Ward",
      name: "WARD-3",
      department: "General Medicine",
      status: "partially-occupied",
      currentAllocation: "8/12 Beds Occupied",
      nextAvailable: "2 beds available",
      capacity: "12 Patients",
      equipment: ["Beds", "Monitors", "Oxygen"],
      maintenanceDue: "2024-03-01",
      utilization: 67
    },
    {
      id: 5,
      type: "Emergency Bay",
      name: "ER-BAY-2",
      department: "Emergency",
      status: "occupied",
      currentAllocation: "Critical Patient",
      nextAvailable: "2024-01-15 12:00",
      capacity: "1 Critical Patient",
      equipment: ["Defibrillator", "Ventilator", "Crash Cart"],
      maintenanceDue: "2024-01-20",
      utilization: 95
    },
    {
      id: 6,
      type: "Delivery Room",
      name: "DR-02",
      department: "Obstetrics",
      status: "available",
      currentAllocation: "Ready for use",
      nextAvailable: "Immediate",
      capacity: "1 Patient",
      equipment: ["Fetal Monitor", "Delivery Table", "Warming Unit"],
      maintenanceDue: "2024-02-05",
      utilization: 45
    },
    {
      id: 7,
      type: "Isolation Room",
      name: "ISO-01",
      department: "Infectious Diseases",
      status: "occupied",
      currentAllocation: "COVID-19 Patient",
      nextAvailable: "2024-01-18",
      capacity: "1 Patient",
      equipment: ["Negative Pressure", "PPE Station", "Monitor"],
      maintenanceDue: "2024-01-30",
      utilization: 88
    },
    {
      id: 8,
      type: "Consultation Room",
      name: "CONS-12",
      department: "OPD",
      status: "available",
      currentAllocation: "Available",
      nextAvailable: "Immediate",
      capacity: "Doctor + 2 Staff",
      equipment: ["Examination Table", "Computer", "Instruments"],
      maintenanceDue: "2024-02-15",
      utilization: 60
    }
  ];

  // Current Allocations
  const currentAllocations = [
    {
      id: 101,
      resourceId: 1,
      resourceName: "OT-1",
      resourceType: "Operation Theater",
      allocatedTo: "Dr. Rajesh Sharma",
      department: "Cardiology",
      patient: "Mr. Sharma (ID: P-1234)",
      startTime: "2024-01-15 08:00",
      endTime: "2024-01-15 12:00",
      duration: "4 hours",
      purpose: "Angioplasty Surgery",
      status: "active",
      priority: "high"
    },
    {
      id: 102,
      resourceId: 5,
      resourceName: "ER-BAY-2",
      resourceType: "Emergency Bay",
      allocatedTo: "Emergency Team",
      department: "Emergency",
      patient: "Trauma Patient (ID: P-1235)",
      startTime: "2024-01-15 06:30",
      endTime: "2024-01-15 10:30",
      duration: "4 hours",
      purpose: "Emergency Trauma Care",
      status: "active",
      priority: "critical"
    },
    {
      id: 103,
      resourceId: 7,
      resourceName: "ISO-01",
      resourceType: "Isolation Room",
      allocatedTo: "Dr. Priya Patel",
      department: "Infectious Diseases",
      patient: "COVID-19 Patient (ID: P-1236)",
      startTime: "2024-01-14 14:00",
      endTime: "2024-01-18 14:00",
      duration: "4 days",
      purpose: "Isolation Treatment",
      status: "active",
      priority: "high"
    },
    {
      id: 104,
      resourceId: 3,
      resourceName: "MRI-03",
      resourceType: "MRI Machine",
      allocatedTo: "Radiology Department",
      department: "Radiology",
      patient: "Scheduled Patients (5)",
      startTime: "2024-01-15 09:00",
      endTime: "2024-01-15 17:00",
      duration: "8 hours",
      purpose: "Daily Scans",
      status: "scheduled",
      priority: "medium"
    },
    {
      id: 105,
      resourceId: 4,
      resourceName: "WARD-3",
      resourceType: "General Ward",
      allocatedTo: "Multiple Patients",
      department: "General Medicine",
      patient: "8 Patients",
      startTime: "2024-01-10",
      endTime: "Ongoing",
      duration: "5+ days",
      purpose: "In-patient Care",
      status: "active",
      priority: "medium"
    },
    {
      id: 106,
      resourceId: 2,
      resourceName: "ICU-BED-05",
      resourceType: "ICU Bed",
      allocatedTo: "Dr. Amit Verma",
      department: "ICU",
      patient: "Post-op Patient (ID: P-1237)",
      startTime: "2024-01-14 16:00",
      endTime: "2024-01-16 16:00",
      duration: "2 days",
      purpose: "Post-operative Monitoring",
      status: "ending-soon",
      priority: "high"
    }
  ];

  // Departments with Resource Needs
  const departmentsData = [
    {
      id: 1,
      name: "Emergency",
      resourceRequests: 5,
      allocatedResources: 12,
      waitingList: 2,
      priorityScore: 95,
      color: "#F44336"
    },
    {
      id: 2,
      name: "ICU",
      resourceRequests: 3,
      allocatedResources: 8,
      waitingList: 1,
      priorityScore: 90,
      color: "#2196F3"
    },
    {
      id: 3,
      name: "Surgery",
      resourceRequests: 4,
      allocatedResources: 6,
      waitingList: 3,
      priorityScore: 85,
      color: "#4CAF50"
    },
    {
      id: 4,
      name: "Radiology",
      resourceRequests: 2,
      allocatedResources: 4,
      waitingList: 0,
      priorityScore: 75,
      color: "#FF9800"
    },
    {
      id: 5,
      name: "Cardiology",
      resourceRequests: 3,
      allocatedResources: 5,
      waitingList: 2,
      priorityScore: 80,
      color: "#9C27B0"
    },
    {
      id: 6,
      name: "Pediatrics",
      resourceRequests: 2,
      allocatedResources: 3,
      waitingList: 1,
      priorityScore: 70,
      color: "#00BCD4"
    }
  ];

  // Equipment Pool
  const equipmentPool = [
    { id: 1, name: "Ventilators", total: 25, allocated: 20, available: 5, condition: "good" },
    { id: 2, name: "ICU Monitors", total: 40, allocated: 35, available: 5, condition: "good" },
    { id: 3, name: "Infusion Pumps", total: 60, allocated: 45, available: 15, condition: "good" },
    { id: 4, name: "Defibrillators", total: 15, allocated: 12, available: 3, condition: "needs-service" },
    { id: 5, name: "Portable X-Ray", total: 8, allocated: 6, available: 2, condition: "good" },
    { id: 6, name: "Anesthesia Machines", total: 12, allocated: 10, available: 2, condition: "maintenance" },
    { id: 7, name: "Patient Beds", total: 200, allocated: 180, available: 20, condition: "good" },
    { id: 8, name: "Wheelchairs", total: 50, allocated: 35, available: 15, condition: "good" }
  ];

  // Staff Availability
  const staffAvailability = [
    { id: 1, name: "Dr. Rajesh Sharma", department: "Cardiology", status: "in-surgery", availableFrom: "14:00" },
    { id: 2, name: "Dr. Priya Patel", department: "Neurology", status: "available", availableFrom: "Now" },
    { id: 3, name: "Nurse Anjali Singh", department: "Emergency", status: "on-break", availableFrom: "11:30" },
    { id: 4, name: "Dr. Amit Verma", department: "Orthopedics", status: "in-consultation", availableFrom: "12:00" },
    { id: 5, name: "Lab Technician Rohit", department: "Pathology", status: "available", availableFrom: "Now" },
    { id: 6, name: "Dr. Sneha Reddy", department: "Pediatrics", status: "in-rounds", availableFrom: "10:30" }
  ];

  // Allocation Statistics
  const allocationStats = {
    totalResources: 145,
    allocatedResources: 112,
    availableResources: 33,
    utilizationRate: "77%",
    pendingRequests: 8,
    avgAllocationTime: "15 mins",
    peakUtilization: "89%",
    emergencyAllocations: 5
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllocationData(prev => ({
        ...prev,
        resources: resourcesList,
        allocations: currentAllocations,
        departments: departmentsData,
        equipment: equipmentPool,
        staff: staffAvailability,
        loading: false
      }));
    }, 1500);
  }, []);

  // Handle View Mode Change
  const handleViewModeChange = (mode) => {
    setAllocationData(prev => ({ ...prev, viewMode: mode }));
  };

  // Handle Filter Changes
  const handleFilterChange = (filterType, value) => {
    setAllocationData(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle Resource Allocation
  const handleAllocateResource = (resourceId, allocationData) => {
    console.log(`Allocating resource ${resourceId}:`, allocationData);
    // Add API call here
    setShowAllocationModal(false);
  };

  // Handle Resource Transfer
  const handleTransferResource = (resourceId, transferData) => {
    console.log(`Transferring resource ${resourceId}:`, transferData);
    // Add API call here
    setShowTransferModal(false);
  };

  // Handle Quick Actions
  const handleQuickAction = (action, data) => {
    console.log(`${action}:`, data);
    // Add API call here
  };

  // Calculate availability percentage
  const calculateAvailability = (resource) => {
    if (resource.status === 'available') return 100;
    if (resource.status === 'partially-occupied') return 50;
    if (resource.status === 'occupied') return 0;
    if (resource.status === 'maintenance') return 0;
    return 0;
  };

  // Filter resources
  const filteredResources = allocationData.resources.filter(resource => {
    return (
      (allocationData.filterDepartment === 'all' || resource.department === allocationData.filterDepartment) &&
      (allocationData.filterStatus === 'all' || resource.status === allocationData.filterStatus)
    );
  });

  if (allocationData.loading) {
    return (
      <div className="supervisor-allocation-loading">
        <div className="supervisor-allocation-loading-spinner"></div>
        <p>Loading Resource Allocation Data...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-allocation-management-container p-4">
      {/* Header */}
      <div className="supervisor-allocation-header">
        <div className="supervisor-allocation-header-left">
          <h1 className="supervisor-allocation-title">
            <span className="supervisor-allocation-header-icon">📋</span>
            Resource Allocation
          </h1>
          <p className="supervisor-allocation-subtitle">
            Manage hospital resources, rooms, equipment, and staff assignments
          </p>
        </div>
        <div className="supervisor-allocation-header-right">
          <div className="supervisor-date-picker">
            <input 
              type="date" 
              className="supervisor-allocation-date"
              value={allocationData.filterDate}
              onChange={(e) => handleFilterChange('filterDate', e.target.value)}
            />
          </div>
          <button 
            className="supervisor-allocation-auto-btn"
            onClick={() => handleQuickAction('auto-allocate', {})}
          >
            <span className="supervisor-btn-icon">⚡</span>
            Auto Allocate
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="supervisor-allocation-stats-grid">
        <div className="supervisor-allocation-stat-card">
          <div className="supervisor-allocation-stat-content">
            <h3 className="supervisor-allocation-stat-title">Total Resources</h3>
            <p className="supervisor-allocation-stat-value">{allocationStats.totalResources}</p>
            <div className="supervisor-allocation-stat-trend">
              <span className="supervisor-trend-up">↑ 12 this month</span>
            </div>
          </div>
          <div className="supervisor-allocation-stat-icon">🏥</div>
        </div>

        <div className="supervisor-allocation-stat-card">
          <div className="supervisor-allocation-stat-content">
            <h3 className="supervisor-allocation-stat-title">Allocated</h3>
            <p className="supervisor-allocation-stat-value">{allocationStats.allocatedResources}</p>
            <div className="supervisor-allocation-stat-trend">
              <span className="supervisor-trend-up">{allocationStats.utilizationRate} utilization</span>
            </div>
          </div>
          <div className="supervisor-allocation-stat-icon">✅</div>
        </div>

        <div className="supervisor-allocation-stat-card">
          <div className="supervisor-allocation-stat-content">
            <h3 className="supervisor-allocation-stat-title">Available</h3>
            <p className="supervisor-allocation-stat-value">{allocationStats.availableResources}</p>
            <div className="supervisor-allocation-stat-trend">
              <span className="supervisor-trend-warning">{allocationStats.pendingRequests} pending requests</span>
            </div>
          </div>
          <div className="supervisor-allocation-stat-icon">🟢</div>
        </div>

        <div className="supervisor-allocation-stat-card">
          <div className="supervisor-allocation-stat-content">
            <h3 className="supervisor-allocation-stat-title">Emergency Allocs</h3>
            <p className="supervisor-allocation-stat-value">{allocationStats.emergencyAllocations}</p>
            <div className="supervisor-allocation-stat-trend">
              <span className="supervisor-trend-critical">Active</span>
            </div>
          </div>
          <div className="supervisor-allocation-stat-icon">🚨</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="supervisor-allocation-controls">
        {/* View Mode Toggle */}
        <div className="supervisor-view-mode-toggle">
          <button 
            className={`supervisor-view-mode-btn ${allocationData.viewMode === 'resources' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('resources')}
          >
            <span className="supervisor-view-icon">🏥</span>
            Resources
          </button>
          <button 
            className={`supervisor-view-mode-btn ${allocationData.viewMode === 'allocations' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('allocations')}
          >
            <span className="supervisor-view-icon">📋</span>
            Allocations
          </button>
          <button 
            className={`supervisor-view-mode-btn ${allocationData.viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('calendar')}
          >
            <span className="supervisor-view-icon">📅</span>
            Calendar
          </button>
          <button 
            className={`supervisor-view-mode-btn ${allocationData.viewMode === 'analytics' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('analytics')}
          >
            <span className="supervisor-view-icon">📊</span>
            Analytics
          </button>
        </div>

        {/* Filters */}
        <div className="supervisor-allocation-filters">
          <div className="supervisor-filter-group">
            <select 
              className="supervisor-filter-select"
              value={allocationData.filterDepartment}
              onChange={(e) => handleFilterChange('filterDepartment', e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Surgery">Surgery</option>
              <option value="Radiology">Radiology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Obstetrics">Obstetrics</option>
              <option value="OPD">OPD</option>
            </select>
          </div>

          <div className="supervisor-filter-group">
            <select 
              className="supervisor-filter-select"
              value={allocationData.filterStatus}
              onChange={(e) => handleFilterChange('filterStatus', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="partially-occupied">Partially Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="supervisor-search-box">
            <input 
              type="text" 
              placeholder="Search resources..."
              className="supervisor-search-input"
            />
            <button className="supervisor-search-btn">
              <span className="supervisor-search-icon">🔍</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="supervisor-allocation-main-content">
        {/* Left Panel - Resources List */}
        {/* <div className="supervisor-allocation-left-panel">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">🏥</span>
              Hospital Resources
              <span className="supervisor-resource-count"> ({filteredResources.length})</span>
            </h3>
            <button 
              className="supervisor-add-resource-btn"
              onClick={() => setShowAllocationModal(true)}
            >
              + Add Resource
            </button>
          </div>

          <div className="supervisor-resources-list">
            {filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className={`supervisor-resource-card supervisor-status-${resource.status}`}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="supervisor-resource-header">
                  <div className="supervisor-resource-type-icon">
                    {resource.type === 'Operation Theater' && '🔪'}
                    {resource.type === 'ICU Bed' && '🛏️'}
                    {resource.type === 'MRI Machine' && '📊'}
                    {resource.type === 'General Ward' && '🏥'}
                    {resource.type === 'Emergency Bay' && '🚨'}
                    {resource.type === 'Delivery Room' && '👶'}
                    {resource.type === 'Isolation Room' && '🦠'}
                    {resource.type === 'Consultation Room' && '👨‍⚕️'}
                  </div>
                  <div className="supervisor-resource-info">
                    <h4 className="supervisor-resource-name">{resource.name}</h4>
                    <span className="supervisor-resource-type">{resource.type}</span>
                  </div>
                  <span className={`supervisor-resource-status supervisor-status-${resource.status}`}>
                    {resource.status}
                  </span>
                </div>

                <div className="supervisor-resource-details">
                  <div className="supervisor-resource-detail">
                    <span className="supervisor-detail-label">Department:</span>
                    <span className="supervisor-detail-value">{resource.department}</span>
                  </div>
                  <div className="supervisor-resource-detail">
                    <span className="supervisor-detail-label">Current Allocation:</span>
                    <span className="supervisor-detail-value">{resource.currentAllocation}</span>
                  </div>
                  <div className="supervisor-resource-detail">
                    <span className="supervisor-detail-label">Next Available:</span>
                    <span className="supervisor-detail-value">{resource.nextAvailable}</span>
                  </div>
                </div>

                <div className="supervisor-resource-footer">
                  <div className="supervisor-utilization-bar">
                    <div 
                      className="supervisor-utilization-fill"
                      style={{ width: `${resource.utilization}%` }}
                    ></div>
                    <span className="supervisor-utilization-text">{resource.utilization}% utilized</span>
                  </div>
                  <button 
                    className="supervisor-allocate-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedResource(resource);
                      setShowAllocationModal(true);
                    }}
                  >
                    Allocate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Middle Panel - Selected Resource/Allocations */}
        <div className="supervisor-allocation-middle-panel">
          {allocationData.viewMode === 'resources' && selectedResource ? (
            /* Resource Details View */
            <div className="supervisor-resource-detail-view">
              <div className="supervisor-detail-header">
                <div className="supervisor-detail-title">
                  <h3>{selectedResource.name}</h3>
                  <span className="supervisor-detail-subtitle">{selectedResource.type}</span>
                </div>
                <div className="supervisor-detail-actions">
                  <button 
                    className="supervisor-detail-action-btn supervisor-btn-transfer"
                    onClick={() => setShowTransferModal(true)}
                  >
                    🔄 Transfer
                  </button>
                  <button 
                    className="supervisor-detail-action-btn supervisor-btn-release"
                    onClick={() => handleQuickAction('release', selectedResource.id)}
                  >
                    🆓 Release
                  </button>
                </div>
              </div>

              <div className="supervisor-detail-grid">
                <div className="supervisor-detail-section">
                  <h4 className="supervisor-detail-section-title">Resource Information</h4>
                  <div className="supervisor-detail-info">
                    <div className="supervisor-info-item">
                      <span className="supervisor-info-label">Status:</span>
                      <span className={`supervisor-info-value supervisor-status-${selectedResource.status}`}>
                        {selectedResource.status}
                      </span>
                    </div>
                    <div className="supervisor-info-item">
                      <span className="supervisor-info-label">Department:</span>
                      <span className="supervisor-info-value">{selectedResource.department}</span>
                    </div>
                    <div className="supervisor-info-item">
                      <span className="supervisor-info-label">Capacity:</span>
                      <span className="supervisor-info-value">{selectedResource.capacity}</span>
                    </div>
                    <div className="supervisor-info-item">
                      <span className="supervisor-info-label">Maintenance Due:</span>
                      <span className="supervisor-info-value">{selectedResource.maintenanceDue}</span>
                    </div>
                  </div>
                </div>

                <div className="supervisor-detail-section">
                  <h4 className="supervisor-detail-section-title">Current Allocation</h4>
                  <div className="supervisor-current-allocation">
                    <div className="supervisor-allocation-info">
                      <span className="supervisor-allocation-label">Allocated To:</span>
                      <span className="supervisor-allocation-value">{selectedResource.currentAllocation}</span>
                    </div>
                    <div className="supervisor-allocation-info">
                      <span className="supervisor-allocation-label">Next Available:</span>
                      <span className="supervisor-allocation-value">{selectedResource.nextAvailable}</span>
                    </div>
                  </div>
                </div>

                <div className="supervisor-detail-section supervisor-full-width">
                  <h4 className="supervisor-detail-section-title">Equipment</h4>
                  <div className="supervisor-equipment-list">
                    {selectedResource.equipment.map((item, index) => (
                      <span key={index} className="supervisor-equipment-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="supervisor-detail-section">
                  <h4 className="supervisor-detail-section-title">Utilization</h4>
                  <div className="supervisor-utilization-chart">
                    <div className="supervisor-chart-container">
                      <div 
                        className="supervisor-chart-fill"
                        style={{ height: `${selectedResource.utilization}%` }}
                      ></div>
                    </div>
                    <div className="supervisor-chart-info">
                      <span className="supervisor-chart-value">{selectedResource.utilization}%</span>
                      <span className="supervisor-chart-label">Utilization Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : allocationData.viewMode === 'allocations' ? (
            /* Allocations List View */
            <div className="supervisor-allocations-view">
              <div className="supervisor-section-header">
                <h3 className="supervisor-section-title">
                  <span className="supervisor-section-icon">📋</span>
                  Current Allocations
                </h3>
                <button 
                  className="supervisor-bulk-action-btn"
                  onClick={() => handleQuickAction('bulk-release', {})}
                >
                  Bulk Release
                </button>
              </div>

              <div className="supervisor-allocations-table">
                <div className="supervisor-table-header">
                  <div className="supervisor-table-col">Resource</div>
                  <div className="supervisor-table-col">Allocated To</div>
                  <div className="supervisor-table-col">Patient</div>
                  <div className="supervisor-table-col">Duration</div>
                  <div className="supervisor-table-col">Status</div>
                  <div className="supervisor-table-col">Actions</div>
                </div>

                <div className="supervisor-table-body">
                  {allocationData.allocations.map(allocation => (
                    <div key={allocation.id} className="supervisor-allocation-row">
                      <div className="supervisor-allocation-cell">
                        <div className="supervisor-resource-cell">
                          <span className="supervisor-resource-name">{allocation.resourceName}</span>
                          <span className="supervisor-resource-type">{allocation.resourceType}</span>
                        </div>
                      </div>
                      <div className="supervisor-allocation-cell">
                        <div className="supervisor-allocated-to">
                          <span className="supervisor-allocated-name">{allocation.allocatedTo}</span>
                          <span className="supervisor-allocated-dept">{allocation.department}</span>
                        </div>
                      </div>
                      <div className="supervisor-allocation-cell">
                        <span className="supervisor-patient-info">{allocation.patient}</span>
                      </div>
                      <div className="supervisor-allocation-cell">
                        <div className="supervisor-duration-info">
                          <span className="supervisor-duration">{allocation.duration}</span>
                          <span className="supervisor-timing">
                            {new Date(allocation.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(allocation.endTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <div className="supervisor-allocation-cell">
                        <span className={`supervisor-allocation-status supervisor-status-${allocation.status}`}>
                          {allocation.status}
                        </span>
                      </div>
                      <div className="supervisor-allocation-cell">
                        <div className="supervisor-allocation-actions">
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-extend"
                            onClick={() => handleQuickAction('extend', allocation.id)}
                            title="Extend Allocation"
                          >
                            ⏱️
                          </button>
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-transfer"
                            onClick={() => handleQuickAction('transfer', allocation.id)}
                            title="Transfer"
                          >
                            🔄
                          </button>
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-release"
                            onClick={() => handleQuickAction('release', allocation.id)}
                            title="Release"
                          >
                            🆓
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : allocationData.viewMode === 'analytics' ? (
            /* Analytics View */
            <div className="supervisor-analytics-view">
              <div className="supervisor-section-header">
                <h3 className="supervisor-section-title">
                  <span className="supervisor-section-icon">📊</span>
                  Allocation Analytics
                </h3>
              </div>

              <div className="supervisor-analytics-grid">
                {/* Department Utilization */}
                <div className="supervisor-analytics-card">
                  <h4 className="supervisor-analytics-title">Department Utilization</h4>
                  <div className="supervisor-department-utilization">
                    {allocationData.departments.map(dept => (
                      <div key={dept.id} className="supervisor-dept-utilization-item">
                        <div className="supervisor-dept-header">
                          <span className="supervisor-dept-name">{dept.name}</span>
                          <span className="supervisor-dept-score">{dept.priorityScore}</span>
                        </div>
                        <div className="supervisor-dept-bar">
                          <div 
                            className="supervisor-dept-fill"
                            style={{ 
                              width: `${dept.priorityScore}%`,
                              backgroundColor: dept.color
                            }}
                          ></div>
                        </div>
                        <div className="supervisor-dept-stats">
                          <span className="supervisor-dept-stat">Allocated: {dept.allocatedResources}</span>
                          <span className="supervisor-dept-stat">Requests: {dept.resourceRequests}</span>
                          <span className="supervisor-dept-stat">Waiting: {dept.waitingList}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment Pool */}
                <div className="supervisor-analytics-card">
                  <h4 className="supervisor-analytics-title">Equipment Pool Status</h4>
                  <div className="supervisor-equipment-status">
                    {allocationData.equipment.map(item => (
                      <div key={item.id} className="supervisor-equipment-item">
                        <div className="supervisor-equipment-header">
                          <span className="supervisor-equipment-name">{item.name}</span>
                          <span className={`supervisor-equipment-condition supervisor-condition-${item.condition}`}>
                            {item.condition}
                          </span>
                        </div>
                        <div className="supervisor-equipment-availability">
                          <div className="supervisor-availability-bar">
                            <div 
                              className="supervisor-availability-fill"
                              style={{ width: `${(item.allocated / item.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="supervisor-availability-numbers">
                            <span className="supervisor-available-count">{item.available} available</span>
                            <span className="supervisor-total-count">of {item.total} total</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Calendar View */
            <div className="supervisor-calendar-view">
              <div className="supervisor-section-header">
                <h3 className="supervisor-section-title">
                  <span className="supervisor-section-icon">📅</span>
                  Allocation Calendar
                </h3>
                <div className="supervisor-calendar-navigation">
                  <button className="supervisor-calendar-btn">← Prev</button>
                  <span className="supervisor-calendar-month">January 2024</span>
                  <button className="supervisor-calendar-btn">Next →</button>
                </div>
              </div>

              <div className="supervisor-calendar-grid">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="supervisor-calendar-day-header">
                    {day}
                  </div>
                ))}

                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div key={day} className="supervisor-calendar-day">
                    <div className="supervisor-day-number">{day}</div>
                    <div className="supervisor-day-allocations">
                      {day % 3 === 0 && <div className="supervisor-allocation-dot" style={{ backgroundColor: '#F44336' }}></div>}
                      {day % 4 === 0 && <div className="supervisor-allocation-dot" style={{ backgroundColor: '#2196F3' }}></div>}
                      {day % 5 === 0 && <div className="supervisor-allocation-dot" style={{ backgroundColor: '#4CAF50' }}></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Quick Stats & Actions */}
        <div className="supervisor-allocation-right-panel">
          {/* Department Requests */}
          <div className="supervisor-requests-card">
            <h3 className="supervisor-requests-title">
              <span className="supervisor-requests-icon">📨</span>
              Department Requests
            </h3>
            <div className="supervisor-requests-list">
              {allocationData.departments
                .filter(dept => dept.resourceRequests > 0)
                .map(dept => (
                  <div key={dept.id} className="supervisor-request-item">
                    <div className="supervisor-request-info">
                      <h4 className="supervisor-request-dept">{dept.name}</h4>
                      <span className="supervisor-request-count">{dept.resourceRequests} requests</span>
                    </div>
                    <div className="supervisor-request-priority">
                      <span className="supervisor-priority-badge">Priority: {dept.priorityScore}</span>
                      <button 
                        className="supervisor-request-action-btn"
                        onClick={() => handleQuickAction('review-request', dept.id)}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Staff Availability */}
          <div className="supervisor-staff-availability-card">
            <h3 className="supervisor-staff-title">
              <span className="supervisor-staff-icon">👨‍⚕️</span>
              Staff Availability
            </h3>
            <div className="supervisor-staff-list">
              {allocationData.staff.map(staff => (
                <div key={staff.id} className="supervisor-staff-item">
                  <div className="supervisor-staff-info">
                    <h4 className="supervisor-staff-name">{staff.name}</h4>
                    <span className="supervisor-staff-dept">{staff.department}</span>
                  </div>
                  <div className="supervisor-staff-status">
                    <span className={`supervisor-availability-status supervisor-status-${staff.status}`}>
                      {staff.status}
                    </span>
                    <span className="supervisor-available-from">From: {staff.availableFrom}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Allocation */}
          <div className="supervisor-quick-allocation-card">
            <h3 className="supervisor-quick-title">Quick Allocation</h3>
            <div className="supervisor-quick-actions">
              <button 
                className="supervisor-quick-action-btn"
                onClick={() => handleQuickAction('allocate-bed', {})}
              >
                🛏️ Allocate Bed
              </button>
              <button 
                className="supervisor-quick-action-btn"
                onClick={() => handleQuickAction('allocate-room', {})}
              >
                🏥 Allocate Room
              </button>
              <button 
                className="supervisor-quick-action-btn"
                onClick={() => handleQuickAction('allocate-equipment', {})}
              >
                🧰 Allocate Equipment
              </button>
              <button 
                className="supervisor-quick-action-btn"
                onClick={() => handleQuickAction('emergency-allocation', {})}
              >
                🚨 Emergency Allocation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="supervisor-allocation-quick-stats">
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Peak Utilization</span>
          <span className="supervisor-quick-stat-value">{allocationStats.peakUtilization}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Avg Allocation Time</span>
          <span className="supervisor-quick-stat-value">{allocationStats.avgAllocationTime}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Resources Available</span>
          <span className="supervisor-quick-stat-value">{allocationStats.availableResources}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Pending Requests</span>
          <span className="supervisor-quick-stat-value">{allocationStats.pendingRequests}</span>
        </div>
      </div>

      {/* Allocation Modal */}
      {showAllocationModal && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-allocation-modal">
            <div className="supervisor-modal-header">
              <h2>
                {selectedResource ? `Allocate ${selectedResource.name}` : 'Allocate Resource'}
              </h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowAllocationModal(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Allocation form */}
              <p>Resource allocation form will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowAllocationModal(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-allocate"
                onClick={() => handleAllocateResource(selectedResource?.id, {})}
              >
                Allocate Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedResource && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-transfer-modal">
            <div className="supervisor-modal-header">
              <h2>Transfer {selectedResource.name}</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowTransferModal(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Transfer form */}
              <p>Resource transfer form will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowTransferModal(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-transfer"
                onClick={() => handleTransferResource(selectedResource.id, {})}
              >
                Transfer Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocationManagement;