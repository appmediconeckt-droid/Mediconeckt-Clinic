import React, { useState, useEffect } from 'react';
import './IncidentsManagement.css';

const IncidentsManagement = () => {
  const [incidentsData, setIncidentsData] = useState({
    incidents: [],
    categories: [],
    severityLevels: [],
    departments: [],
    loading: true,
    filters: {
      status: 'all',
      severity: 'all',
      department: 'all',
      dateRange: 'all'
    },
    viewMode: 'list', // list, grid, timeline
    selectedIncident: null
  });

  const [showReportIncident, setShowReportIncident] = useState(false);
  const [showIncidentDetails, setShowIncidentDetails] = useState(false);

  // Incidents Data
  const incidentsList = [
    {
      id: 1,
      incidentId: "INC-2024-001",
      title: "Medication Error - Wrong Dosage",
      description: "Patient received 50mg instead of 25mg of medication",
      category: "Medication Error",
      severity: "high",
      status: "open",
      department: "Pharmacy",
      reportedBy: "Nurse Anjali Singh",
      reportedAt: "2024-01-15 09:30",
      assignedTo: "Dr. Rajesh Sharma",
      priority: "urgent",
      location: "Ward 3, Room 12",
      patientInvolved: "Mr. Sharma (ID: P-1234)",
      actionsTaken: "Stopped medication, monitoring vitals",
      followUpRequired: true,
      followUpDate: "2024-01-20",
      resolution: "",
      createdAt: "2024-01-15 09:25",
      updatedAt: "2024-01-15 10:15"
    },
    {
      id: 2,
      incidentId: "INC-2024-002",
      title: "Equipment Malfunction - MRI Machine",
      description: "MRI machine stopped working during patient scan",
      category: "Equipment Failure",
      severity: "medium",
      status: "in-progress",
      department: "Radiology",
      reportedBy: "Lab Technician Rohit",
      reportedAt: "2024-01-15 11:45",
      assignedTo: "Maintenance Team",
      priority: "high",
      location: "MRI Room, Block B",
      patientInvolved: "Ms. Patel (ID: P-1235)",
      actionsTaken: "Rescheduled scan, called technician",
      followUpRequired: true,
      followUpDate: "2024-01-16",
      resolution: "",
      createdAt: "2024-01-15 11:40",
      updatedAt: "2024-01-15 12:30"
    },
    {
      id: 3,
      incidentId: "INC-2024-003",
      title: "Patient Fall in Bathroom",
      description: "Elderly patient slipped in bathroom",
      category: "Patient Safety",
      severity: "high",
      status: "resolved",
      department: "Geriatrics",
      reportedBy: "Care Assistant",
      reportedAt: "2024-01-14 16:20",
      assignedTo: "Dr. Priya Patel",
      priority: "urgent",
      location: "Room 205, Ward 5",
      patientInvolved: "Mr. Gupta (ID: P-1236)",
      actionsTaken: "First aid, X-ray, observation",
      followUpRequired: true,
      followUpDate: "2024-01-17",
      resolution: "Patient stable, minor injuries",
      createdAt: "2024-01-14 16:15",
      updatedAt: "2024-01-14 18:45"
    },
    {
      id: 4,
      incidentId: "INC-2024-004",
      title: "Data Privacy Breach",
      description: "Unauthorized access to patient records",
      category: "Security Breach",
      severity: "critical",
      status: "investigating",
      department: "IT Security",
      reportedBy: "System Administrator",
      reportedAt: "2024-01-13 14:10",
      assignedTo: "IT Security Team",
      priority: "urgent",
      location: "Hospital Network",
      patientInvolved: "Multiple patients",
      actionsTaken: "System lockdown, investigation started",
      followUpRequired: true,
      followUpDate: "2024-01-18",
      resolution: "Under investigation",
      createdAt: "2024-01-13 14:05",
      updatedAt: "2024-01-14 09:30"
    },
    {
      id: 5,
      incidentId: "INC-2024-005",
      title: "Supply Shortage - Oxygen Cylinders",
      description: "Low stock of oxygen cylinders in emergency ward",
      category: "Resource Management",
      severity: "medium",
      status: "open",
      department: "Emergency",
      reportedBy: "Head Nurse",
      reportedAt: "2024-01-15 08:15",
      assignedTo: "Inventory Manager",
      priority: "high",
      location: "Emergency Ward",
      patientInvolved: "N/A",
      actionsTaken: "Ordered emergency supply",
      followUpRequired: true,
      followUpDate: "2024-01-16",
      resolution: "",
      createdAt: "2024-01-15 08:10",
      updatedAt: "2024-01-15 09:00"
    },
    {
      id: 6,
      incidentId: "INC-2024-006",
      title: "Staff Conflict in Surgery Room",
      description: "Argument between surgeon and assistant during surgery",
      category: "Staff Conflict",
      severity: "low",
      status: "resolved",
      department: "Surgery",
      reportedBy: "Operation Theater In-charge",
      reportedAt: "2024-01-12 13:45",
      assignedTo: "HR Department",
      priority: "medium",
      location: "OT-3",
      patientInvolved: "N/A",
      actionsTaken: "Conflict resolution meeting",
      followUpRequired: false,
      followUpDate: "",
      resolution: "Issues resolved, counseling provided",
      createdAt: "2024-01-12 13:40",
      updatedAt: "2024-01-12 15:30"
    },
    {
      id: 7,
      incidentId: "INC-2024-007",
      title: "Power Outage in ICU",
      description: "30-minute power outage in Intensive Care Unit",
      category: "Infrastructure",
      severity: "critical",
      status: "resolved",
      department: "ICU",
      reportedBy: "ICU Supervisor",
      reportedAt: "2024-01-11 22:30",
      assignedTo: "Maintenance",
      priority: "urgent",
      location: "ICU, 2nd Floor",
      patientInvolved: "All ICU patients",
      actionsTaken: "Backup generators activated",
      followUpRequired: true,
      followUpDate: "2024-01-20",
      resolution: "Power restored, no harm to patients",
      createdAt: "2024-01-11 22:25",
      updatedAt: "2024-01-11 23:15"
    },
    {
      id: 8,
      incidentId: "INC-2024-008",
      title: "Medication Expired Stock Found",
      description: "Expired medications found in pharmacy storage",
      category: "Compliance Issue",
      severity: "medium",
      status: "in-progress",
      department: "Pharmacy",
      reportedBy: "Pharmacist",
      reportedAt: "2024-01-15 10:00",
      assignedTo: "Quality Control",
      priority: "high",
      location: "Pharmacy Store",
      patientInvolved: "N/A",
      actionsTaken: "Quarantined expired stock",
      followUpRequired: true,
      followUpDate: "2024-01-18",
      resolution: "",
      createdAt: "2024-01-15 09:55",
      updatedAt: "2024-01-15 11:30"
    }
  ];

  // Incident Categories
  const incidentCategories = [
    { id: 1, name: "Medication Error", count: 12, color: "#F44336" },
    { id: 2, name: "Patient Safety", count: 8, color: "#2196F3" },
    { id: 3, name: "Equipment Failure", count: 15, color: "#FF9800" },
    { id: 4, name: "Staff Conflict", count: 5, color: "#9C27B0" },
    { id: 5, name: "Security Breach", count: 3, color: "#607D8B" },
    { id: 6, name: "Resource Management", count: 10, color: "#4CAF50" },
    { id: 7, name: "Infrastructure", count: 7, color: "#795548" },
    { id: 8, name: "Compliance Issue", count: 9, color: "#E91E63" }
  ];

  // Severity Levels
  const severityLevels = [
    { level: "critical", label: "Critical", color: "#D32F2F", icon: "🚨" },
    { level: "high", label: "High", color: "#F44336", icon: "⚠️" },
    { level: "medium", label: "Medium", color: "#FF9800", icon: "🔸" },
    { level: "low", label: "Low", color: "#4CAF50", icon: "🔹" }
  ];

  // Departments
  const departmentsList = [
    { id: 1, name: "Emergency", incidentCount: 25 },
    { id: 2, name: "ICU", incidentCount: 18 },
    { id: 3, name: "Surgery", incidentCount: 12 },
    { id: 4, name: "Pharmacy", incidentCount: 15 },
    { id: 5, name: "Radiology", incidentCount: 8 },
    { id: 6, name: "Laboratory", incidentCount: 7 },
    { id: 7, name: "Admin", incidentCount: 5 },
    { id: 8, name: "Maintenance", incidentCount: 10 }
  ];

  // Incident Statistics
  const incidentStats = {
    totalIncidents: 145,
    openIncidents: 12,
    resolvedIncidents: 120,
    criticalIncidents: 5,
    avgResolutionTime: "48 hours",
    todayIncidents: 3,
    weekIncidents: 15,
    monthIncidents: 45
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIncidentsData(prev => ({
        ...prev,
        incidents: incidentsList,
        categories: incidentCategories,
        severityLevels: severityLevels,
        departments: departmentsList,
        loading: false
      }));
    }, 1500);
  }, []);

  // Handle Filter Changes
  const handleFilterChange = (filterType, value) => {
    setIncidentsData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value
      }
    }));
  };

  // Handle View Mode Change
  const handleViewModeChange = (mode) => {
    setIncidentsData(prev => ({ ...prev, viewMode: mode }));
  };

  // Filter incidents
  const filteredIncidents = incidentsData.incidents.filter(incident => {
    return (
      (incidentsData.filters.status === 'all' || incident.status === incidentsData.filters.status) &&
      (incidentsData.filters.severity === 'all' || incident.severity === incidentsData.filters.severity) &&
      (incidentsData.filters.department === 'all' || incident.department === incidentsData.filters.department)
    );
  });

  // Handle Incident Actions
  const handleIncidentAction = (incidentId, action) => {
    console.log(`${action} incident ${incidentId}`);
    // Add API call here
  };

  // Handle Report Incident
  const handleReportIncident = (incidentData) => {
    console.log("Reporting new incident:", incidentData);
    // Add API call here
    setShowReportIncident(false);
  };

  // Handle View Incident Details
  const handleViewIncidentDetails = (incident) => {
    setIncidentsData(prev => ({ ...prev, selectedIncident: incident }));
    setShowIncidentDetails(true);
  };

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (incidentsData.loading) {
    return (
      <div className="supervisor-incidents-loading">
        <div className="supervisor-incidents-loading-spinner"></div>
        <p>Loading Incidents Management Data...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-incidents-management-container p-4">
      {/* Header */}
      <div className="supervisor-incidents-header">
        <div className="supervisor-incidents-header-left">
          <h1 className="supervisor-incidents-title">
            <span className="supervisor-incidents-header-icon">🚨</span>
            Incidents Management
          </h1>
          <p className="supervisor-incidents-subtitle">
            Track, manage, and resolve hospital incidents and safety issues
          </p>
        </div>
        <div className="supervisor-incidents-header-right">
          <button 
            className="supervisor-incidents-report-btn"
            onClick={() => setShowReportIncident(true)}
          >
            <span className="supervisor-btn-icon">📝</span>
            Report Incident
          </button>
          <button 
            className="supervisor-incidents-export-btn"
            onClick={() => handleIncidentAction('all', 'export')}
          >
            <span className="supervisor-btn-icon">📥</span>
            Export Data
          </button>
        </div>
      </div>

      {/* Incident Statistics */}
      <div className="supervisor-incidents-stats-grid">
        <div className="supervisor-incidents-stat-card">
          <div className="supervisor-incidents-stat-content">
            <h3 className="supervisor-incidents-stat-title">Total Incidents</h3>
            <p className="supervisor-incidents-stat-value">{incidentStats.totalIncidents}</p>
            <div className="supervisor-incidents-stat-trend">
              <span className="supervisor-trend-up">↑ {incidentStats.todayIncidents} today</span>
            </div>
          </div>
          <div className="supervisor-incidents-stat-icon">📊</div>
        </div>

        <div className="supervisor-incidents-stat-card">
          <div className="supervisor-incidents-stat-content">
            <h3 className="supervisor-incidents-stat-title">Open Incidents</h3>
            <p className="supervisor-incidents-stat-value">{incidentStats.openIncidents}</p>
            <div className="supervisor-incidents-stat-trend">
              <span className="supervisor-trend-warning">Needs attention</span>
            </div>
          </div>
          <div className="supervisor-incidents-stat-icon">⚠️</div>
        </div>

        <div className="supervisor-incidents-stat-card">
          <div className="supervisor-incidents-stat-content">
            <h3 className="supervisor-incidents-stat-title">Critical Incidents</h3>
            <p className="supervisor-incidents-stat-value">{incidentStats.criticalIncidents}</p>
            <div className="supervisor-incidents-stat-trend">
              <span className="supervisor-trend-critical">Immediate action needed</span>
            </div>
          </div>
          <div className="supervisor-incidents-stat-icon">🚨</div>
        </div>

        <div className="supervisor-incidents-stat-card">
          <div className="supervisor-incidents-stat-content">
            <h3 className="supervisor-incidents-stat-title">Avg Resolution Time</h3>
            <p className="supervisor-incidents-stat-value">{incidentStats.avgResolutionTime}</p>
            <div className="supervisor-incidents-stat-trend">
              <span className="supervisor-trend-down">↓ 12h from last month</span>
            </div>
          </div>
          <div className="supervisor-incidents-stat-icon">⏰</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="supervisor-incidents-controls">
        {/* Filters */}
        <div className="supervisor-incidents-filters">
          <div className="supervisor-filter-group">
            <label className="supervisor-filter-label">Status</label>
            <select 
              className="supervisor-filter-select"
              value={incidentsData.filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="supervisor-filter-group">
            <label className="supervisor-filter-label">Severity</label>
            <select 
              className="supervisor-filter-select"
              value={incidentsData.filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="supervisor-filter-group">
            <label className="supervisor-filter-label">Department</label>
            <select 
              className="supervisor-filter-select"
              value={incidentsData.filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <option value="all">All Departments</option>
              {incidentsData.departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="supervisor-filter-group">
            <label className="supervisor-filter-label">Date Range</label>
            <select 
              className="supervisor-filter-select"
              value={incidentsData.filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* View Toggle and Search */}
        <div className="supervisor-incidents-view-search">
          <div className="supervisor-view-toggle">
            <button 
              className={`supervisor-view-toggle-btn ${incidentsData.viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('list')}
              title="List View"
            >
              📋
            </button>
            <button 
              className={`supervisor-view-toggle-btn ${incidentsData.viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
              title="Grid View"
            >
              🔲
            </button>
            <button 
              className={`supervisor-view-toggle-btn ${incidentsData.viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('timeline')}
              title="Timeline View"
            >
              📅
            </button>
          </div>

          <div className="supervisor-incidents-search">
            <input 
              type="text" 
              placeholder="Search incidents..."
              className="supervisor-search-input"
            />
            <button className="supervisor-search-btn">
              <span className="supervisor-search-icon">🔍</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="supervisor-incidents-main-content">
        {/* Incident Categories Summary */}
       

        {/* Incidents List/Grid */}
        <div className="supervisor-incidents-list-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">📋</span>
              Incidents ({filteredIncidents.length})
            </h3>
            <div className="supervisor-incidents-actions">
              <button 
                className="supervisor-action-btn supervisor-btn-assign"
                onClick={() => handleIncidentAction('bulk', 'assign')}
              >
                Bulk Assign
              </button>
              <button 
                className="supervisor-action-btn supervisor-btn-export"
                onClick={() => handleIncidentAction('bulk', 'export')}
              >
                Export Selected
              </button>
            </div>
          </div>

          {incidentsData.viewMode === 'list' ? (
            /* List View */
            <div className="supervisor-incidents-table-container">
              <table className="supervisor-incidents-table">
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Department</th>
                    <th>Reported At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map(incident => (
                    <tr key={incident.id} className="supervisor-incident-row">
                      <td>
                        <span className="supervisor-incident-id">{incident.incidentId}</span>
                      </td>
                      <td>
                        <div className="supervisor-incident-title">
                          <h4>{incident.title}</h4>
                          <p className="supervisor-incident-desc">{incident.description}</p>
                        </div>
                      </td>
                      <td>
                        <span className="supervisor-incident-category">
                          {incident.category}
                        </span>
                      </td>
                      <td>
                        <span className={`supervisor-severity-badge supervisor-severity-${incident.severity}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td>
                        <span className={`supervisor-status-badge supervisor-status-${incident.status}`}>
                          {incident.status}
                        </span>
                      </td>
                      <td>
                        <span className="supervisor-department-badge">{incident.department}</span>
                      </td>
                      <td>
                        <span className="supervisor-reported-time">
                          {formatDate(incident.reportedAt)}
                        </span>
                      </td>
                      <td>
                        <div className="supervisor-incident-actions">
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-view"
                            onClick={() => handleViewIncidentDetails(incident)}
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-edit"
                            onClick={() => handleIncidentAction(incident.id, 'edit')}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="supervisor-action-icon-btn supervisor-btn-assign"
                            onClick={() => handleIncidentAction(incident.id, 'assign')}
                            title="Assign"
                          >
                            👥
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : incidentsData.viewMode === 'grid' ? (
            /* Grid View */
            <div className="supervisor-incidents-grid">
              {filteredIncidents.map(incident => (
                <div key={incident.id} className="supervisor-incident-card">
                  <div className="supervisor-incident-card-header">
                    <div className="supervisor-incident-id-badge">{incident.incidentId}</div>
                    <span className={`supervisor-severity-indicator supervisor-severity-${incident.severity}`}></span>
                  </div>
                  
                  <div className="supervisor-incident-card-body">
                    <h4 className="supervisor-incident-card-title">{incident.title}</h4>
                    <p className="supervisor-incident-card-desc">{incident.description}</p>
                    
                    <div className="supervisor-incident-card-meta">
                      <div className="supervisor-meta-item">
                        <span className="supervisor-meta-label">Category:</span>
                        <span className="supervisor-meta-value">{incident.category}</span>
                      </div>
                      <div className="supervisor-meta-item">
                        <span className="supervisor-meta-label">Department:</span>
                        <span className="supervisor-meta-value">{incident.department}</span>
                      </div>
                      <div className="supervisor-meta-item">
                        <span className="supervisor-meta-label">Reported By:</span>
                        <span className="supervisor-meta-value">{incident.reportedBy}</span>
                      </div>
                      <div className="supervisor-meta-item">
                        <span className="supervisor-meta-label">Reported At:</span>
                        <span className="supervisor-meta-value">
                          {new Date(incident.reportedAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="supervisor-incident-card-footer">
                    <span className={`supervisor-status-indicator supervisor-status-${incident.status}`}>
                      {incident.status}
                    </span>
                    <div className="supervisor-incident-card-actions">
                      <button 
                        className="supervisor-card-action-btn supervisor-btn-view"
                        onClick={() => handleViewIncidentDetails(incident)}
                      >
                        View
                      </button>
                      <button 
                        className="supervisor-card-action-btn supervisor-btn-edit"
                        onClick={() => handleIncidentAction(incident.id, 'edit')}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Timeline View */
            <div className="supervisor-incidents-timeline">
              {filteredIncidents.map((incident, index) => (
                <div key={incident.id} className="supervisor-timeline-item">
                  <div className="supervisor-timeline-marker">
                    <div className="supervisor-timeline-dot"></div>
                    {index !== filteredIncidents.length - 1 && (
                      <div className="supervisor-timeline-line"></div>
                    )}
                  </div>
                  
                  <div className="supervisor-timeline-content">
                    <div className="supervisor-timeline-header">
                      <span className="supervisor-timeline-id">{incident.incidentId}</span>
                      <span className="supervisor-timeline-date">
                        {formatDate(incident.reportedAt)}
                      </span>
                    </div>
                    
                    <div className="supervisor-timeline-body">
                      <h4 className="supervisor-timeline-title">{incident.title}</h4>
                      <p className="supervisor-timeline-desc">{incident.description}</p>
                      
                      <div className="supervisor-timeline-tags">
                        <span className={`supervisor-timeline-severity supervisor-severity-${incident.severity}`}>
                          {incident.severity}
                        </span>
                        <span className={`supervisor-timeline-status supervisor-status-${incident.status}`}>
                          {incident.status}
                        </span>
                        <span className="supervisor-timeline-dept">{incident.department}</span>
                      </div>
                    </div>
                    
                    <div className="supervisor-timeline-actions">
                      <button 
                        className="supervisor-timeline-btn supervisor-btn-view"
                        onClick={() => handleViewIncidentDetails(incident)}
                      >
                        View Details
                      </button>
                      <button 
                        className="supervisor-timeline-btn supervisor-btn-assign"
                        onClick={() => handleIncidentAction(incident.id, 'assign')}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
         <div className="supervisor-incidents-categories">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">🏷️</span>
              Incident Categories
            </h3>
            <span className="supervisor-categories-count">
              {incidentsData.categories.length} categories
            </span>
          </div>

          <div className="supervisor-categories-grid">
            {incidentsData.categories.map(category => (
              <div 
                key={category.id} 
                className="supervisor-category-card"
                style={{ borderLeft: `4px solid ${category.color}` }}
              >
                <div className="supervisor-category-header">
                  <h4 className="supervisor-category-name">{category.name}</h4>
                  <span className="supervisor-category-count">{category.count}</span>
                </div>
                <div className="supervisor-category-progress">
                  <div 
                    className="supervisor-category-progress-bar"
                    style={{ 
                      width: `${(category.count / incidentStats.totalIncidents) * 100}%`,
                      background: category.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      </div>

      {/* Quick Stats Footer */}
      <div className="supervisor-incidents-quick-stats">
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Today's Incidents</span>
          <span className="supervisor-quick-stat-value">{incidentStats.todayIncidents}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">This Week</span>
          <span className="supervisor-quick-stat-value">{incidentStats.weekIncidents}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">This Month</span>
          <span className="supervisor-quick-stat-value">{incidentStats.monthIncidents}</span>
        </div>
        <div className="supervisor-quick-stat">
          <span className="supervisor-quick-stat-label">Resolved Rate</span>
          <span className="supervisor-quick-stat-value">
            {((incidentStats.resolvedIncidents / incidentStats.totalIncidents) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Report Incident Modal */}
      {showReportIncident && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-report-incident-modal">
            <div className="supervisor-modal-header">
              <h2>Report New Incident</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowReportIncident(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Incident reporting form */}
              <p>Incident reporting form will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowReportIncident(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-submit"
                onClick={handleReportIncident}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incident Details Modal */}
      {showIncidentDetails && incidentsData.selectedIncident && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-incident-details-modal">
            <div className="supervisor-modal-header">
              <h2>Incident Details - {incidentsData.selectedIncident.incidentId}</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowIncidentDetails(false)}
              >
                ×
              </button>
            </div>
            
            <div className="supervisor-modal-body">
              <div className="supervisor-incident-details-content">
                <div className="supervisor-details-header">
                  <div className="supervisor-details-title">
                    <h3>{incidentsData.selectedIncident.title}</h3>
                    <div className="supervisor-details-badges">
                      <span className={`supervisor-details-severity supervisor-severity-${incidentsData.selectedIncident.severity}`}>
                        {incidentsData.selectedIncident.severity}
                      </span>
                      <span className={`supervisor-details-status supervisor-status-${incidentsData.selectedIncident.status}`}>
                        {incidentsData.selectedIncident.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="supervisor-details-grid">
                  <div className="supervisor-details-section">
                    <h4 className="supervisor-details-section-title">Incident Information</h4>
                    <div className="supervisor-details-info">
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Incident ID:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.incidentId}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Category:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.category}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Department:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.department}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Location:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.location}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Priority:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="supervisor-details-section">
                    <h4 className="supervisor-details-section-title">Reporting Details</h4>
                    <div className="supervisor-details-info">
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Reported By:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.reportedBy}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Reported At:</span>
                        <span className="supervisor-detail-value">{formatDate(incidentsData.selectedIncident.reportedAt)}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Assigned To:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.assignedTo}</span>
                      </div>
                      <div className="supervisor-detail-item">
                        <span className="supervisor-detail-label">Patient Involved:</span>
                        <span className="supervisor-detail-value">{incidentsData.selectedIncident.patientInvolved}</span>
                      </div>
                    </div>
                  </div>

                  <div className="supervisor-details-section supervisor-full-width">
                    <h4 className="supervisor-details-section-title">Description</h4>
                    <div className="supervisor-details-description">
                      {incidentsData.selectedIncident.description}
                    </div>
                  </div>

                  <div className="supervisor-details-section">
                    <h4 className="supervisor-details-section-title">Actions Taken</h4>
                    <div className="supervisor-details-actions">
                      {incidentsData.selectedIncident.actionsTaken}
                    </div>
                  </div>

                  {incidentsData.selectedIncident.followUpRequired && (
                    <div className="supervisor-details-section">
                      <h4 className="supervisor-details-section-title">Follow-up</h4>
                      <div className="supervisor-details-followup">
                        <div className="supervisor-followup-item">
                          <span className="supervisor-followup-label">Follow-up Required:</span>
                          <span className="supervisor-followup-value">Yes</span>
                        </div>
                        <div className="supervisor-followup-item">
                          <span className="supervisor-followup-label">Follow-up Date:</span>
                          <span className="supervisor-followup-value">{incidentsData.selectedIncident.followUpDate}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {incidentsData.selectedIncident.resolution && (
                    <div className="supervisor-details-section supervisor-full-width">
                      <h4 className="supervisor-details-section-title">Resolution</h4>
                      <div className="supervisor-details-resolution">
                        {incidentsData.selectedIncident.resolution}
                      </div>
                    </div>
                  )}
                </div>

                <div className="supervisor-details-timestamps">
                  <div className="supervisor-timestamp">
                    <span className="supervisor-timestamp-label">Created:</span>
                    <span className="supervisor-timestamp-value">{formatDate(incidentsData.selectedIncident.createdAt)}</span>
                  </div>
                  <div className="supervisor-timestamp">
                    <span className="supervisor-timestamp-label">Last Updated:</span>
                    <span className="supervisor-timestamp-value">{formatDate(incidentsData.selectedIncident.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-close"
                onClick={() => setShowIncidentDetails(false)}
              >
                Close
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-edit"
                onClick={() => handleIncidentAction(incidentsData.selectedIncident.id, 'edit')}
              >
                Edit Incident
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-resolve"
                onClick={() => handleIncidentAction(incidentsData.selectedIncident.id, 'resolve')}
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentsManagement;