import React, { useState, useEffect } from 'react';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalHospitals: 0,
    totalUsers: 0,
    activeSessions: 0,
    systemHealth: 100
  });

  useEffect(() => {
    // Fetch super admin dashboard data
    const fetchDashboardData = async () => {
      // Mock data - replace with actual API calls
      setDashboardData({
        totalHospitals: 25,
        totalUsers: 1560,
        activeSessions: 342,
        systemHealth: 98.5
      });
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="superadmin-dashboard-container">
   
      
      <div className="superadmin-main-content">
        <div className="superadmin-header">
          <h1 className="superadmin-title">Super Administrator Dashboard</h1>
          <div className="super-admin-badge">
            <i className="fas fa-crown"></i>
            <span>Super Admin</span>
          </div>
        </div>

        <div className="superadmin-stats-grid">
          <div className="stat-card gold-card">
            <div className="stat-icon">
              <i className="fas fa-hospital"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{dashboardData.totalHospitals}</h3>
              <p className="stat-label">Total Hospitals</p>
            </div>
          </div>

          <div className="stat-card gold-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{dashboardData.totalUsers}</h3>
              <p className="stat-label">Total Users</p>
            </div>
          </div>

          <div className="stat-card gold-card">
            <div className="stat-icon">
              <i className="fas fa-user-clock"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{dashboardData.activeSessions}</h3>
              <p className="stat-label">Active Sessions</p>
            </div>
          </div>

          <div className="stat-card gold-card">
            <div className="stat-icon">
              <i className="fas fa-heart-pulse"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{dashboardData.systemHealth}%</h3>
              <p className="stat-label">System Health</p>
            </div>
          </div>
        </div>

        <div className="superadmin-sections-grid">
          <div className="section-card">
            <h3 className="section-title">
              <i className="fas fa-hospital"></i>
              Hospital Management
            </h3>
            <ul className="section-list">
              <li><i className="fas fa-plus-circle"></i> Add New Hospital</li>
              <li><i className="fas fa-edit"></i> Edit Hospital Details</li>
              <li><i className="fas fa-chart-bar"></i> Hospital Analytics</li>
              <li><i className="fas fa-ban"></i> Deactivate Hospital</li>
            </ul>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <i className="fas fa-user-shield"></i>
              User Management
            </h3>
            <ul className="section-list">
              <li><i className="fas fa-user-plus"></i> Create New User</li>
              <li><i className="fas fa-user-cog"></i> Manage Permissions</li>
              <li><i className="fas fa-history"></i> User Activity Logs</li>
              <li><i className="fas fa-user-slash"></i> Suspend User</li>
            </ul>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <i className="fas fa-cogs"></i>
              System Settings
            </h3>
            <ul className="section-list">
              <li><i className="fas fa-database"></i> Database Management</li>
              <li><i className="fas fa-server"></i> Server Configuration</li>
              <li><i className="fas fa-envelope"></i> Notification Settings</li>
              <li><i className="fas fa-shield-alt"></i> Security Settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;