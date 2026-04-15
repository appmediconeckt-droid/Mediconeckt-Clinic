import React, { useState, useEffect } from 'react';
import './SupervisorDashboard.css';

const SupervisorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    menus: [],
    requests: [],
    stats: {},
    loading: true
  });

  // Sample supervisor menu data
  const supervisorMenus = [
    {
      id: 1,
      name: "Dashboard",
      icon: "📊",
      description: "Supervisor overview and analytics",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-15"
    },
    {
      id: 2,
      name: "Staff Management",
      icon: "👨‍⚕️",
      description: "Manage hospital staff and schedules",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-14"
    },
    {
      id: 3,
      name: "Patient Oversight",
      icon: "👥",
      description: "Monitor patient care and services",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-13"
    },
    {
      id: 4,
      name: "Inventory Control",
      icon: "📦",
      description: "Medical supplies and equipment",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-12"
    },
    {
      id: 5,
      name: "Quality Assurance",
      icon: "✅",
      description: "Service quality and compliance",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-11"
    },
    {
      id: 6,
      name: "Reports & Analytics",
      icon: "📈",
      description: "Generate and analyze reports",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-10"
    },
    {
      id: 7,
      name: "Shift Management",
      icon: "🕒",
      description: "Schedule and manage shifts",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-09"
    },
    {
      id: 8,
      name: "Emergency Protocols",
      icon: "🚨",
      description: "Emergency procedures and alerts",
      accessLevel: "supervisor",
      status: "active",
      lastAccessed: "2024-01-08"
    }
  ];

  // Sample request data for supervisor
  const supervisorRequests = [
    {
      id: 101,
      type: "Staff Leave Request",
      requestedBy: "Dr. Sharma",
      department: "Cardiology",
      status: "pending",
      date: "2024-01-15",
      priority: "medium",
      details: "Request for 3 days leave due to family emergency"
    },
    {
      id: 102,
      type: "Inventory Restock",
      requestedBy: "Nurse Patel",
      department: "Emergency",
      status: "approved",
      date: "2024-01-14",
      priority: "high",
      details: "Urgent need for oxygen cylinders"
    },
    {
      id: 103,
      type: "Equipment Maintenance",
      requestedBy: "Lab Technician",
      department: "Pathology",
      status: "pending",
      date: "2024-01-15",
      priority: "low",
      details: "MRI machine requires calibration"
    },
    {
      id: 104,
      type: "Staff Training",
      requestedBy: "HR Department",
      department: "Administration",
      status: "in-progress",
      date: "2024-01-13",
      priority: "medium",
      details: "New protocol training session"
    },
    {
      id: 105,
      type: "Budget Approval",
      requestedBy: "Department Head",
      department: "Neurology",
      status: "pending",
      date: "2024-01-15",
      priority: "high",
      details: "New equipment purchase request"
    },
    {
      id: 106,
      type: "Patient Transfer",
      requestedBy: "ICU Supervisor",
      department: "Intensive Care",
      status: "approved",
      date: "2024-01-14",
      priority: "high",
      details: "Transfer patient to specialized care"
    }
  ];

  // Dashboard statistics
  const dashboardStats = {
    totalStaff: 145,
    activePatients: 89,
    pendingRequests: 12,
    completedTasks: 234,
    todayAdmissions: 8,
    occupancyRate: "78%",
    criticalAlerts: 3,
    avgResponseTime: "15 mins"
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        menus: supervisorMenus,
        requests: supervisorRequests,
        stats: dashboardStats,
        loading: false
      });
    }, 1000);
  }, []);

  // Handle request actions
  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Add your API call here
  };

  if (dashboardData.loading) {
    return (
      <div className="supervisor-dashboard-loading">
        <div className="supervisor-loading-spinner"></div>
        <p>Loading Supervisor Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-dashboard-container p-4">
      {/* Header */}
      <div className="supervisor-dashboard-header">
        <h1 className="supervisor-dashboard-title">
          <span className="supervisor-header-icon">👨‍💼</span>
          Supervisor Dashboard
        </h1>
        <div className="supervisor-dashboard-time">
          <span className="supervisor-date">January 15, 2024</span>
          <span className="supervisor-time">10:30 AM</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="supervisor-stats-grid">
        <div className="supervisor-stat-card supervisor-stat-staff">
          <div className="supervisor-stat-icon">👨‍⚕️</div>
          <div className="supervisor-stat-content">
            <h3 className="supervisor-stat-title">Total Staff</h3>
            <p className="supervisor-stat-value">{dashboardData.stats.totalStaff}</p>
          </div>
        </div>

        <div className="supervisor-stat-card supervisor-stat-patients">
          <div className="supervisor-stat-icon">👥</div>
          <div className="supervisor-stat-content">
            <h3 className="supervisor-stat-title">Active Patients</h3>
            <p className="supervisor-stat-value">{dashboardData.stats.activePatients}</p>
          </div>
        </div>

        <div className="supervisor-stat-card supervisor-stat-pending">
          <div className="supervisor-stat-icon">⏳</div>
          <div className="supervisor-stat-content">
            <h3 className="supervisor-stat-title">Pending Requests</h3>
            <p className="supervisor-stat-value">{dashboardData.stats.pendingRequests}</p>
          </div>
        </div>

        <div className="supervisor-stat-card supervisor-stat-occupancy">
          <div className="supervisor-stat-icon">🏥</div>
          <div className="supervisor-stat-content">
            <h3 className="supervisor-stat-title">Occupancy Rate</h3>
            <p className="supervisor-stat-value">{dashboardData.stats.occupancyRate}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="supervisor-content-grid">
        {/* Menu Section */}
        <div className="supervisor-menu-section">
          <div className="supervisor-section-header">
            <h2 className="supervisor-section-title">
              <span className="supervisor-section-icon">📋</span>
              Supervisor Menus
            </h2>
            <span className="supervisor-menu-count">
              {dashboardData.menus.length} menus available
            </span>
          </div>
          
          <div className="supervisor-menu-grid">
            {dashboardData.menus.map((menu) => (
              <div key={menu.id} className="supervisor-menu-card">
                <div className="supervisor-menu-icon">{menu.icon}</div>
                <div className="supervisor-menu-content">
                  <h4 className="supervisor-menu-name">{menu.name}</h4>
                  <p className="supervisor-menu-description">{menu.description}</p>
                  <div className="supervisor-menu-meta">
                    <span className="supervisor-menu-status supervisor-status-active">
                      {menu.status}
                    </span>
                    <span className="supervisor-menu-last-access">
                      Last: {menu.lastAccessed}
                    </span>
                  </div>
                </div>
                <button className="supervisor-menu-access-btn">
                  Access
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requests Section */}
        <div className="supervisor-requests-section">
          <div className="supervisor-section-header">
            <h2 className="supervisor-section-title">
              <span className="supervisor-section-icon">📨</span>
              Recent Requests
            </h2>
            <div className="supervisor-request-filters">
              <select className="supervisor-filter-select">
                <option>All Requests</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>In Progress</option>
              </select>
            </div>
          </div>

          <div className="supervisor-requests-table-container">
            <table className="supervisor-requests-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Requested By</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.requests.map((request) => (
                  <tr key={request.id} className="supervisor-request-row">
                    <td>
                      <div className="supervisor-request-type">
                        <span className="supervisor-request-icon">📋</span>
                        {request.type}
                      </div>
                    </td>
                    <td className="supervisor-request-by">{request.requestedBy}</td>
                    <td>
                      <span className="supervisor-department-badge">
                        {request.department}
                      </span>
                    </td>
                    <td>
                      <span className={`supervisor-status-badge supervisor-status-${request.status}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <span className={`supervisor-priority-badge supervisor-priority-${request.priority}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td>
                      <div className="supervisor-request-actions">
                        <button 
                          className="supervisor-action-btn supervisor-btn-view"
                          onClick={() => handleRequestAction(request.id, 'view')}
                        >
                          View
                        </button>
                        <button 
                          className="supervisor-action-btn supervisor-btn-approve"
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          Approve
                        </button>
                        <button 
                          className="supervisor-action-btn supervisor-btn-reject"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="supervisor-quick-actions">
            <h3 className="supervisor-quick-actions-title">Quick Actions</h3>
            <div className="supervisor-quick-actions-grid">
              <button className="supervisor-quick-action-btn">
                <span className="supervisor-quick-action-icon">📊</span>
                Generate Report
              </button>
              <button className="supervisor-quick-action-btn">
                <span className="supervisor-quick-action-icon">👨‍⚕️</span>
                Add Staff
              </button>
              <button className="supervisor-quick-action-btn">
                <span className="supervisor-quick-action-icon">🚨</span>
                Emergency Alert
              </button>
              <button className="supervisor-quick-action-btn">
                <span className="supervisor-quick-action-icon">📋</span>
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="supervisor-footer-stats">
        <div className="supervisor-footer-stat">
          <span className="supervisor-footer-stat-label">Avg Response Time</span>
          <span className="supervisor-footer-stat-value">
            {dashboardData.stats.avgResponseTime}
          </span>
        </div>
        <div className="supervisor-footer-stat">
          <span className="supervisor-footer-stat-label">Critical Alerts</span>
          <span className="supervisor-footer-stat-value supervisor-critical-alert">
            {dashboardData.stats.criticalAlerts}
          </span>
        </div>
        <div className="supervisor-footer-stat">
          <span className="supervisor-footer-stat-label">Today's Admissions</span>
          <span className="supervisor-footer-stat-value">
            {dashboardData.stats.todayAdmissions}
          </span>
        </div>
        <div className="supervisor-footer-stat">
          <span className="supervisor-footer-stat-label">Completed Tasks</span>
          <span className="supervisor-footer-stat-value">
            {dashboardData.stats.completedTasks}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;