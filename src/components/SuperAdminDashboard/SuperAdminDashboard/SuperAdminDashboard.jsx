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
    <div className="sa-dashboard-container">
      <div className="sa-main-content">
        <div className="sa-header">
          <h1 className="sa-title">Super Administrator Dashboard</h1>
          <div className="sa-badge">
            <i className="fas fa-crown"></i>
            <span>Super Admin</span>
          </div>
        </div>

        <div className="sa-stats-grid">
          <div className="sa-stat-card sa-gold-card">
            <div className="sa-stat-icon">
              <i className="fas fa-hospital"></i>
            </div>
            <div className="sa-stat-content">
              <h3 className="sa-stat-value">{dashboardData.totalHospitals}</h3>
              <p className="sa-stat-label">Total Hospitals</p>
            </div>
          </div>

          <div className="sa-stat-card sa-gold-card">
            <div className="sa-stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="sa-stat-content">
              <h3 className="sa-stat-value">{dashboardData.totalUsers}</h3>
              <p className="sa-stat-label">Total Users</p>
            </div>
          </div>

          <div className="sa-stat-card sa-gold-card">
            <div className="sa-stat-icon">
              <i className="fas fa-user-clock"></i>
            </div>
            <div className="sa-stat-content">
              <h3 className="sa-stat-value">{dashboardData.activeSessions}</h3>
              <p className="sa-stat-label">Active Sessions</p>
            </div>
          </div>

          <div className="sa-stat-card sa-gold-card">
            <div className="sa-stat-icon">
              <i className="fas fa-heart-pulse"></i>
            </div>
            <div className="sa-stat-content">
              <h3 className="sa-stat-value">{dashboardData.systemHealth}%</h3>
              <p className="sa-stat-label">System Health</p>
            </div>
          </div>
        </div>

        <div className="sa-sections-grid">
          <div className="sa-section-card">
            <h3 className="sa-section-title">
              <i className="fas fa-hospital"></i>
              Hospital Management
            </h3>
            <ul className="sa-section-list">
              <li><i className="fas fa-plus-circle"></i> Add New Hospital</li>
              <li><i className="fas fa-edit"></i> Edit Hospital Details</li>
              <li><i className="fas fa-chart-bar"></i> Hospital Analytics</li>
              <li><i className="fas fa-ban"></i> Deactivate Hospital</li>
            </ul>
          </div>

          <div className="sa-section-card">
            <h3 className="sa-section-title">
              <i className="fas fa-user-shield"></i>
              User Management
            </h3>
            <ul className="sa-section-list">
              <li><i className="fas fa-user-plus"></i> Create New User</li>
              <li><i className="fas fa-user-cog"></i> Manage Permissions</li>
              <li><i className="fas fa-history"></i> User Activity Logs</li>
              <li><i className="fas fa-user-slash"></i> Suspend User</li>
            </ul>
          </div>

          <div className="sa-section-card">
            <h3 className="sa-section-title">
              <i className="fas fa-cogs"></i>
              System Settings
            </h3>
            <ul className="sa-section-list">
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