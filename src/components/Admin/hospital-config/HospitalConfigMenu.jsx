import React, { useState, useEffect } from 'react';
import './HospitalConfigMenu.css';

const HospitalConfig = () => {
  const [activeTab, setActiveTab] = useState('hospital-info');
  const [hospitalData, setHospitalData] = useState({
    name: 'City General Hospital',
    address: '123 Medical Street, Healthcare City',
    phone: '+1 (555) 123-4567',
    email: 'info@citygeneralhospital.com',
    licenseNumber: 'HSP-2024-001',
    beds: 500,
    established: '1995',
    emergencyServices: true,
    ambulanceCount: 15
  });
  
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', head: 'Dr. Smith', staffCount: 25, status: 'Active' },
    { id: 2, name: 'Neurology', head: 'Dr. Johnson', staffCount: 18, status: 'Active' },
    { id: 3, name: 'Orthopedics', head: 'Dr. Williams', staffCount: 22, status: 'Active' },
    { id: 4, name: 'Pediatrics', head: 'Dr. Brown', staffCount: 30, status: 'Active' },
    { id: 5, name: 'Emergency', head: 'Dr. Davis', staffCount: 35, status: 'Active' }
  ]);
  
  const [settings, setSettings] = useState({
    appointmentDuration: 30,
    visitingHours: '9:00 AM - 9:00 PM',
    emergencyContact: '911',
    autoBackup: true,
    backupFrequency: 'daily',
    smsNotifications: true,
    emailNotifications: true
  });
  
  const [stats, setStats] = useState({
    totalPatients: 1250,
    activeDoctors: 89,
    availableBeds: 142,
    todayAppointments: 56,
    monthlyRevenue: 1250000,
    occupancyRate: 78
  });

  // Fetch data on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    console.log('Fetching hospital configuration data...');
  }, []);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    // In real app, make API call here
  };

  const handleAddDepartment = () => {
    const newDept = {
      id: departments.length + 1,
      name: 'New Department',
      head: 'To be assigned',
      staffCount: 0,
      status: 'Pending'
    };
    setDepartments([...departments, newDept]);
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  return (
    <div className="hospital-admin-config-container">
      {/* Header Section */}
      <div className="hospital-config-header">
        <div className="hospital-config-title-section">
          <h1 className="hospital-config-main-title">
            <i className="fas fa-hospital-alt hospital-config-title-icon"></i>
            Hospital Configuration
          </h1>
          <p className="hospital-config-subtitle">
            Manage hospital settings, departments, and system configurations
          </p>
        </div>
        
        <div className="hospital-config-actions">
          <button className="hospital-config-action-btn hospital-config-save-btn">
            <i className="fas fa-save"></i> Save Changes
          </button>
          <button className="hospital-config-action-btn hospital-config-export-btn">
            <i className="fas fa-download"></i> Export Data
          </button>
          <button className="hospital-config-action-btn hospital-config-backup-btn">
            <i className="fas fa-database"></i> Backup Now
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="hospital-config-tabs">
        <button 
          className={`hospital-config-tab ${activeTab === 'overview' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-chart-line"></i> Overview
        </button>
        <button 
          className={`hospital-config-tab ${activeTab === 'hospital-info' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('hospital-info')}
        >
          <i className="fas fa-info-circle"></i> Hospital Info
        </button>
        <button 
          className={`hospital-config-tab ${activeTab === 'departments' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          <i className="fas fa-building"></i> Departments
        </button>
        <button 
          className={`hospital-config-tab ${activeTab === 'settings' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cogs"></i> Settings
        </button>
        <button 
          className={`hospital-config-tab ${activeTab === 'users' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <i className="fas fa-users"></i> User Management
        </button>
        <button 
          className={`hospital-config-tab ${activeTab === 'backup' ? 'hospital-config-tab-active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          <i className="fas fa-shield-alt"></i> Security & Backup
        </button>
      </div>

      {/* Main Content Area */}
      <div className="hospital-config-content">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="hospital-config-overview">
            {/* Stats Cards */}
            <div className="hospital-config-stats-grid">
              <div className="hospital-config-stat-card hospital-config-stat-primary">
                <div className="hospital-config-stat-icon">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="hospital-config-stat-info">
                  <h3 className="hospital-config-stat-title">Total Patients</h3>
                  <p className="hospital-config-stat-value">{stats.totalPatients.toLocaleString()}</p>
                  <span className="hospital-config-stat-change">+12% this month</span>
                </div>
              </div>
              
              <div className="hospital-config-stat-card hospital-config-stat-success">
                <div className="hospital-config-stat-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="hospital-config-stat-info">
                  <h3 className="hospital-config-stat-title">Active Doctors</h3>
                  <p className="hospital-config-stat-value">{stats.activeDoctors}</p>
                  <span className="hospital-config-stat-change">+5 new this month</span>
                </div>
              </div>
              
              <div className="hospital-config-stat-card hospital-config-stat-warning">
                <div className="hospital-config-stat-icon">
                  <i className="fas fa-bed"></i>
                </div>
                <div className="hospital-config-stat-info">
                  <h3 className="hospital-config-stat-title">Available Beds</h3>
                  <p className="hospital-config-stat-value">{stats.availableBeds}</p>
                  <span className="hospital-config-stat-change">{stats.occupancyRate}% occupancy</span>
                </div>
              </div>
              
              <div className="hospital-config-stat-card hospital-config-stat-info">
                <div className="hospital-config-stat-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="hospital-config-stat-info">
                  <h3 className="hospital-config-stat-title">Today's Appointments</h3>
                  <p className="hospital-config-stat-value">{stats.todayAppointments}</p>
                  <span className="hospital-config-stat-change">+8 from yesterday</span>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="hospital-config-revenue-section">
              <h3 className="hospital-config-section-title">
                <i className="fas fa-chart-bar"></i> Monthly Revenue
              </h3>
              <div className="hospital-config-revenue-chart">
                <div className="hospital-config-revenue-bar" style={{height: '80%'}}>
                  <span>Jan</span>
                </div>
                <div className="hospital-config-revenue-bar" style={{height: '90%'}}>
                  <span>Feb</span>
                </div>
                <div className="hospital-config-revenue-bar" style={{height: '70%'}}>
                  <span>Mar</span>
                </div>
                <div className="hospital-config-revenue-bar" style={{height: '95%'}}>
                  <span>Apr</span>
                </div>
                <div className="hospital-config-revenue-bar" style={{height: '100%'}}>
                  <span>May</span>
                </div>
                <div className="hospital-config-revenue-bar" style={{height: '85%'}}>
                  <span>Jun</span>
                </div>
              </div>
              <div className="hospital-config-revenue-total">
                <h4>Total Revenue</h4>
                <p className="hospital-config-revenue-amount">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hospital-config-quick-actions">
              <h3 className="hospital-config-section-title">
                <i className="fas fa-bolt"></i> Quick Actions
              </h3>
              <div className="hospital-config-quick-grid">
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-user-plus"></i>
                  <span>Add New Staff</span>
                </button>
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-calendar-plus"></i>
                  <span>Schedule Maintenance</span>
                </button>
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-file-invoice"></i>
                  <span>Generate Reports</span>
                </button>
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-bell"></i>
                  <span>Send Notifications</span>
                </button>
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-prescription"></i>
                  <span>Order Medicines</span>
                </button>
                <button className="hospital-config-quick-btn">
                  <i className="fas fa-tools"></i>
                  <span>System Check</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hospital Information Tab */}
        {activeTab === 'hospital-info' && (
          <div className="hospital-config-info-section">
            <div className="hospital-config-info-card">
              <h3 className="hospital-config-section-title">
                <i className="fas fa-hospital"></i> Hospital Details
              </h3>
              
              <div className="hospital-config-form">
                <div className="hospital-config-form-group">
                  <label className="hospital-config-form-label">
                    <i className="fas fa-signature"></i> Hospital Name
                  </label>
                  <input 
                    type="text" 
                    className="hospital-config-form-input"
                    value={hospitalData.name}
                    onChange={(e) => setHospitalData({...hospitalData, name: e.target.value})}
                  />
                </div>
                
                <div className="hospital-config-form-group">
                  <label className="hospital-config-form-label">
                    <i className="fas fa-map-marker-alt"></i> Address
                  </label>
                  <textarea 
                    className="hospital-config-form-textarea"
                    value={hospitalData.address}
                    onChange={(e) => setHospitalData({...hospitalData, address: e.target.value})}
                    rows="3"
                  />
                </div>
                
                <div className="hospital-config-form-row">
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-phone"></i> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="hospital-config-form-input"
                      value={hospitalData.phone}
                      onChange={(e) => setHospitalData({...hospitalData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <input 
                      type="email" 
                      className="hospital-config-form-input"
                      value={hospitalData.email}
                      onChange={(e) => setHospitalData({...hospitalData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="hospital-config-form-row">
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-id-card"></i> License Number
                    </label>
                    <input 
                      type="text" 
                      className="hospital-config-form-input"
                      value={hospitalData.licenseNumber}
                      onChange={(e) => setHospitalData({...hospitalData, licenseNumber: e.target.value})}
                    />
                  </div>
                  
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-calendar-alt"></i> Year Established
                    </label>
                    <input 
                      type="number" 
                      className="hospital-config-form-input"
                      value={hospitalData.established}
                      onChange={(e) => setHospitalData({...hospitalData, established: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="hospital-config-form-row">
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-bed"></i> Total Beds
                    </label>
                    <input 
                      type="number" 
                      className="hospital-config-form-input"
                      value={hospitalData.beds}
                      onChange={(e) => setHospitalData({...hospitalData, beds: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="hospital-config-form-group hospital-config-form-half">
                    <label className="hospital-config-form-label">
                      <i className="fas fa-ambulance"></i> Ambulance Count
                    </label>
                    <input 
                      type="number" 
                      className="hospital-config-form-input"
                      value={hospitalData.ambulanceCount}
                      onChange={(e) => setHospitalData({...hospitalData, ambulanceCount: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="hospital-config-form-group hospital-config-form-checkbox">
                  <label className="hospital-config-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={hospitalData.emergencyServices}
                      onChange={(e) => setHospitalData({...hospitalData, emergencyServices: e.target.checked})}
                    />
                    <span className="hospital-config-checkbox-custom"></span>
                    <i className="fas fa-first-aid"></i> 24/7 Emergency Services Available
                  </label>
                </div>
              </div>
              
              <div className="hospital-config-form-actions">
                <button 
                  className="hospital-config-form-btn hospital-config-form-btn-primary"
                  onClick={handleSaveSettings}
                >
                  <i className="fas fa-save"></i> Update Hospital Information
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="hospital-config-departments">
            <div className="hospital-config-departments-header">
              <h3 className="hospital-config-section-title">
                <i className="fas fa-building"></i> Hospital Departments
              </h3>
              <button 
                className="hospital-config-add-dept-btn"
                onClick={handleAddDepartment}
              >
                <i className="fas fa-plus"></i> Add New Department
              </button>
            </div>
            
            <div className="hospital-config-departments-grid">
              {departments.map((dept) => (
                <div key={dept.id} className="hospital-config-dept-card">
                  <div className="hospital-config-dept-header">
                    <h4 className="hospital-config-dept-name">{dept.name}</h4>
                    <span className={`hospital-config-dept-status hospital-config-dept-status-${dept.status.toLowerCase()}`}>
                      {dept.status}
                    </span>
                  </div>
                  
                  <div className="hospital-config-dept-info">
                    <div className="hospital-config-dept-field">
                      <i className="fas fa-user-md"></i>
                      <span className="hospital-config-dept-label">Head:</span>
                      <span className="hospital-config-dept-value">{dept.head}</span>
                    </div>
                    
                    <div className="hospital-config-dept-field">
                      <i className="fas fa-users"></i>
                      <span className="hospital-config-dept-label">Staff:</span>
                      <span className="hospital-config-dept-value">{dept.staffCount} members</span>
                    </div>
                  </div>
                  
                  <div className="hospital-config-dept-actions">
                    <button className="hospital-config-dept-action-btn hospital-config-dept-edit-btn">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button 
                      className="hospital-config-dept-action-btn hospital-config-dept-delete-btn"
                      onClick={() => handleDeleteDepartment(dept.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="hospital-config-settings">
            <div className="hospital-config-settings-grid">
              {/* Appointment Settings */}
              <div className="hospital-config-settings-card">
                <h4 className="hospital-config-settings-title">
                  <i className="fas fa-calendar-alt"></i> Appointment Settings
                </h4>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Appointment Duration (minutes)
                  </label>
                  <input 
                    type="number" 
                    className="hospital-config-settings-input"
                    value={settings.appointmentDuration}
                    onChange={(e) => setSettings({...settings, appointmentDuration: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Visiting Hours
                  </label>
                  <input 
                    type="text" 
                    className="hospital-config-settings-input"
                    value={settings.visitingHours}
                    onChange={(e) => setSettings({...settings, visitingHours: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="hospital-config-settings-card">
                <h4 className="hospital-config-settings-title">
                  <i className="fas fa-bell"></i> Notification Settings
                </h4>
                
                <div className="hospital-config-settings-checkbox">
                  <label className="hospital-config-settings-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    />
                    <span className="hospital-config-settings-checkbox-custom"></span>
                    Enable SMS Notifications
                  </label>
                </div>
                
                <div className="hospital-config-settings-checkbox">
                  <label className="hospital-config-settings-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    />
                    <span className="hospital-config-settings-checkbox-custom"></span>
                    Enable Email Notifications
                  </label>
                </div>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Emergency Contact
                  </label>
                  <input 
                    type="text" 
                    className="hospital-config-settings-input"
                    value={settings.emergencyContact}
                    onChange={(e) => setSettings({...settings, emergencyContact: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Backup Settings */}
              <div className="hospital-config-settings-card">
                <h4 className="hospital-config-settings-title">
                  <i className="fas fa-database"></i> Backup Settings
                </h4>
                
                <div className="hospital-config-settings-checkbox">
                  <label className="hospital-config-settings-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                    />
                    <span className="hospital-config-settings-checkbox-custom"></span>
                    Enable Auto Backup
                  </label>
                </div>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Backup Frequency
                  </label>
                  <select 
                    className="hospital-config-settings-select"
                    value={settings.backupFrequency}
                    onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              
              {/* System Settings */}
              <div className="hospital-config-settings-card">
                <h4 className="hospital-config-settings-title">
                  <i className="fas fa-tools"></i> System Settings
                </h4>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Session Timeout (minutes)
                  </label>
                  <input 
                    type="number" 
                    className="hospital-config-settings-input"
                    defaultValue="30"
                  />
                </div>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Max Login Attempts
                  </label>
                  <input 
                    type="number" 
                    className="hospital-config-settings-input"
                    defaultValue="3"
                  />
                </div>
                
                <div className="hospital-config-settings-group">
                  <label className="hospital-config-settings-label">
                    Data Retention (months)
                  </label>
                  <input 
                    type="number" 
                    className="hospital-config-settings-input"
                    defaultValue="36"
                  />
                </div>
              </div>
            </div>
            
            <div className="hospital-config-settings-actions">
              <button 
                className="hospital-config-settings-save-btn"
                onClick={handleSaveSettings}
              >
                <i className="fas fa-save"></i> Save All Settings
              </button>
              <button className="hospital-config-settings-reset-btn">
                <i className="fas fa-redo"></i> Reset to Default
              </button>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="hospital-config-users">
            <h3 className="hospital-config-section-title">
              <i className="fas fa-users-cog"></i> User Management
            </h3>
            
            <div className="hospital-config-users-table-container">
              <table className="hospital-config-users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ADM001</td>
                    <td>
                      <div className="hospital-config-user-info">
                        <div className="hospital-config-user-avatar">JD</div>
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td>Administrator</td>
                    <td>Management</td>
                    <td><span className="hospital-config-user-status hospital-config-user-active">Active</span></td>
                    <td>Today, 09:30 AM</td>
                    <td>
                      <div className="hospital-config-user-actions">
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-lock"></i>
                        </button>
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>DR045</td>
                    <td>
                      <div className="hospital-config-user-info">
                        <div className="hospital-config-user-avatar">SM</div>
                        <span>Dr. Sarah Miller</span>
                      </div>
                    </td>
                    <td>Doctor</td>
                    <td>Cardiology</td>
                    <td><span className="hospital-config-user-status hospital-config-user-active">Active</span></td>
                    <td>Yesterday, 05:45 PM</td>
                    <td>
                      <div className="hospital-config-user-actions">
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-lock"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>NR128</td>
                    <td>
                      <div className="hospital-config-user-info">
                        <div className="hospital-config-user-avatar">RJ</div>
                        <span>Robert Johnson</span>
                      </div>
                    </td>
                    <td>Nurse</td>
                    <td>Emergency</td>
                    <td><span className="hospital-config-user-status hospital-config-user-onleave">On Leave</span></td>
                    <td>3 days ago</td>
                    <td>
                      <div className="hospital-config-user-actions">
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ADM002</td>
                    <td>
                      <div className="hospital-config-user-info">
                        <div className="hospital-config-user-avatar">EW</div>
                        <span>Emma Wilson</span>
                      </div>
                    </td>
                    <td>Administrator</td>
                    <td>Billing</td>
                    <td><span className="hospital-config-user-status hospital-config-user-active">Active</span></td>
                    <td>Today, 08:15 AM</td>
                    <td>
                      <div className="hospital-config-user-actions">
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-lock"></i>
                        </button>
                        <button className="hospital-config-user-action-btn">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="hospital-config-users-actions">
              <button className="hospital-config-users-add-btn">
                <i className="fas fa-user-plus"></i> Add New User
              </button>
              <button className="hospital-config-users-export-btn">
                <i className="fas fa-file-export"></i> Export User List
              </button>
            </div>
          </div>
        )}

        {/* Security & Backup Tab */}
        {activeTab === 'backup' && (
          <div className="hospital-config-security">
            <div className="hospital-config-security-grid">
              {/* Backup Section */}
              <div className="hospital-config-security-card hospital-config-backup-card">
                <h4 className="hospital-config-security-title">
                  <i className="fas fa-database"></i> Data Backup
                </h4>
                
                <div className="hospital-config-backup-info">
                  <div className="hospital-config-backup-item">
                    <span className="hospital-config-backup-label">Last Backup:</span>
                    <span className="hospital-config-backup-value">Today, 02:00 AM</span>
                  </div>
                  
                  <div className="hospital-config-backup-item">
                    <span className="hospital-config-backup-label">Backup Size:</span>
                    <span className="hospital-config-backup-value">2.4 GB</span>
                  </div>
                  
                  <div className="hospital-config-backup-item">
                    <span className="hospital-config-backup-label">Next Scheduled:</span>
                    <span className="hospital-config-backup-value">Tomorrow, 02:00 AM</span>
                  </div>
                </div>
                
                <div className="hospital-config-backup-actions">
                  <button className="hospital-config-backup-btn hospital-config-backup-now-btn">
                    <i className="fas fa-play-circle"></i> Backup Now
                  </button>
                  <button className="hospital-config-backup-btn hospital-config-restore-btn">
                    <i className="fas fa-history"></i> Restore Data
                  </button>
                </div>
              </div>
              
              {/* Security Settings */}
              <div className="hospital-config-security-card hospital-config-security-settings-card">
                <h4 className="hospital-config-security-title">
                  <i className="fas fa-shield-alt"></i> Security Settings
                </h4>
                
                <div className="hospital-config-security-group">
                  <label className="hospital-config-security-label">
                    <i className="fas fa-lock"></i> Two-Factor Authentication
                  </label>
                  <div className="hospital-config-security-switch">
                    <input type="checkbox" id="twoFactor" />
                    <label htmlFor="twoFactor" className="hospital-config-security-switch-label"></label>
                    <span className="hospital-config-security-switch-text">Enabled</span>
                  </div>
                </div>
                
                <div className="hospital-config-security-group">
                  <label className="hospital-config-security-label">
                    <i className="fas fa-key"></i> Password Policy
                  </label>
                  <select className="hospital-config-security-select">
                    <option>Strong (8+ chars, special symbols)</option>
                    <option>Medium (6+ chars)</option>
                    <option>Basic (4+ chars)</option>
                  </select>
                </div>
                
                <div className="hospital-config-security-group">
                  <label className="hospital-config-security-label">
                    <i className="fas fa-clock"></i> Session Timeout
                  </label>
                  <select className="hospital-config-security-select">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>
              </div>
              
              {/* Audit Logs */}
              <div className="hospital-config-security-card hospital-config-audit-card">
                <h4 className="hospital-config-security-title">
                  <i className="fas fa-clipboard-list"></i> Recent Activities
                </h4>
                
                <div className="hospital-config-audit-list">
                  <div className="hospital-config-audit-item">
                    <div className="hospital-config-audit-icon hospital-config-audit-success">
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="hospital-config-audit-content">
                      <p>New user account created</p>
                      <span>Today, 09:45 AM</span>
                    </div>
                  </div>
                  
                  <div className="hospital-config-audit-item">
                    <div className="hospital-config-audit-icon hospital-config-audit-warning">
                      <i className="fas fa-cog"></i>
                    </div>
                    <div className="hospital-config-audit-content">
                      <p>System settings updated</p>
                      <span>Yesterday, 03:20 PM</span>
                    </div>
                  </div>
                  
                  <div className="hospital-config-audit-item">
                    <div className="hospital-config-audit-icon hospital-config-audit-info">
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="hospital-config-audit-content">
                      <p>Data backup completed</p>
                      <span>Yesterday, 02:00 AM</span>
                    </div>
                  </div>
                  
                  <div className="hospital-config-audit-item">
                    <div className="hospital-config-audit-icon hospital-config-audit-primary">
                      <i className="fas fa-file-export"></i>
                    </div>
                    <div className="hospital-config-audit-content">
                      <p>Report generated and exported</p>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hospital-config-security-footer">
              <button className="hospital-config-security-audit-btn">
                <i className="fas fa-file-alt"></i> View Full Audit Log
              </button>
              <button className="hospital-config-security-test-btn">
                <i className="fas fa-virus"></i> Run Security Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalConfig;