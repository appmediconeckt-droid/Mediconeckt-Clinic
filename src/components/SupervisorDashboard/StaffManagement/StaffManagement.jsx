import React, { useState, useEffect } from 'react';
import './StaffManagement.css';

const StaffManagement = () => {
  const [staffData, setStaffData] = useState({
    staffList: [],
    departments: [],
    shifts: [],
    loading: true,
    filters: {
      department: 'all',
      shift: 'all',
      status: 'active'
    }
  });

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Sample Staff Data for Supervisor
  const supervisorStaffData = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      role: "Senior Cardiologist",
      department: "Cardiology",
      shift: "Morning (9AM-5PM)",
      contact: "9876543210",
      email: "rajesh.sharma@hospital.com",
      status: "active",
      experience: "12 years",
      salary: "₹1,50,000",
      joinDate: "2020-03-15",
      avatarColor: "#4a9eff"
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      role: "Neurologist",
      department: "Neurology",
      shift: "Evening (2PM-10PM)",
      contact: "9876543211",
      email: "priya.patel@hospital.com",
      status: "active",
      experience: "8 years",
      salary: "₹1,20,000",
      joinDate: "2021-06-20",
      avatarColor: "#6bc48a"
    },
    {
      id: 3,
      name: "Nurse Anjali Singh",
      role: "Head Nurse",
      department: "Emergency",
      shift: "Night (10PM-6AM)",
      contact: "9876543212",
      email: "anjali.singh@hospital.com",
      status: "active",
      experience: "15 years",
      salary: "₹65,000",
      joinDate: "2018-11-10",
      avatarColor: "#ff85b3"
    },
    {
      id: 4,
      name: "Dr. Amit Verma",
      role: "Orthopedic Surgeon",
      department: "Orthopedics",
      shift: "Morning (9AM-5PM)",
      contact: "9876543213",
      email: "amit.verma@hospital.com",
      status: "on-leave",
      experience: "10 years",
      salary: "₹1,40,000",
      joinDate: "2019-08-25",
      avatarColor: "#a78bfa"
    },
    {
      id: 5,
      name: "Lab Technician Rohit",
      role: "Senior Lab Technician",
      department: "Pathology",
      shift: "General (24/7)",
      contact: "9876543214",
      email: "rohit.tech@hospital.com",
      status: "active",
      experience: "7 years",
      salary: "₹45,000",
      joinDate: "2022-01-15",
      avatarColor: "#ffa94d"
    },
    {
      id: 6,
      name: "Dr. Sneha Reddy",
      role: "Pediatrician",
      department: "Pediatrics",
      shift: "Morning (9AM-5PM)",
      contact: "9876543215",
      email: "sneha.reddy@hospital.com",
      status: "active",
      experience: "6 years",
      salary: "₹1,10,000",
      joinDate: "2022-03-30",
      avatarColor: "#fdd835"
    },
    {
      id: 7,
      name: "Housekeeping Manager",
      role: "Sanitation Supervisor",
      department: "Housekeeping",
      shift: "Day (8AM-4PM)",
      contact: "9876543216",
      email: "hk.manager@hospital.com",
      status: "active",
      experience: "5 years",
      salary: "₹35,000",
      joinDate: "2021-09-12",
      avatarColor: "#26c6da"
    },
    {
      id: 8,
      name: "Dr. Karan Malhotra",
      role: "Anesthesiologist",
      department: "Anesthesia",
      shift: "Evening (2PM-10PM)",
      contact: "9876543217",
      email: "karan.malhotra@hospital.com",
      status: "inactive",
      experience: "9 years",
      salary: "₹1,30,000",
      joinDate: "2020-12-01",
      avatarColor: "#8c9eff"
    }
  ];

  // Departments Data
  const departmentsList = [
    { id: 1, name: "Cardiology", staffCount: 15, head: "Dr. Rajesh Sharma" },
    { id: 2, name: "Neurology", staffCount: 12, head: "Dr. Priya Patel" },
    { id: 3, name: "Emergency", staffCount: 25, head: "Nurse Anjali Singh" },
    { id: 4, name: "Orthopedics", staffCount: 10, head: "Dr. Amit Verma" },
    { id: 5, name: "Pathology", staffCount: 8, head: "Rohit Kumar" },
    { id: 6, name: "Pediatrics", staffCount: 14, head: "Dr. Sneha Reddy" },
    { id: 7, name: "Housekeeping", staffCount: 30, head: "Ramesh Kumar" },
    { id: 8, name: "Anesthesia", staffCount: 6, head: "Dr. Karan Malhotra" }
  ];

  // Shift Data
  const shiftsData = [
    { id: 1, name: "Morning (9AM-5PM)", staffCount: 45 },
    { id: 2, name: "Evening (2PM-10PM)", staffCount: 35 },
    { id: 3, name: "Night (10PM-6AM)", staffCount: 25 },
    { id: 4, name: "General (24/7)", staffCount: 15 }
  ];

  // Stats Data
  const staffStats = {
    totalStaff: 145,
    activeStaff: 138,
    onLeave: 5,
    inactive: 2,
    departments: 15,
    avgExperience: "8.5 years",
    todayPresent: 142
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStaffData(prev => ({
        ...prev,
        staffList: supervisorStaffData,
        departments: departmentsList,
        shifts: shiftsData,
        loading: false
      }));
    }, 1500);
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setStaffData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value
      }
    }));
  };

  // Filter staff based on selected filters
  const filteredStaff = staffData.staffList.filter(staff => {
    return (
      (staffData.filters.department === 'all' || staff.department === staffData.filters.department) &&
      (staffData.filters.shift === 'all' || staff.shift === staffData.filters.shift) &&
      (staffData.filters.status === 'all' || staff.status === staffData.filters.status)
    );
  });

  // Handle staff actions
  const handleStaffAction = (staffId, action) => {
    console.log(`${action} staff ${staffId}`);
    // Add API call here
  };

  // Handle add new staff
  const handleAddStaff = (newStaff) => {
    console.log("Adding new staff:", newStaff);
    // Add API call here
    setShowAddModal(false);
  };

  if (staffData.loading) {
    return (
      <div className="supervisor-staff-loading">
        <div className="supervisor-staff-loading-spinner"></div>
        <p>Loading Staff Management Data...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-staff-management-container p-4">
      {/* Header */}
      <div className="supervisor-staff-header">
        <div className="supervisor-staff-header-left">
          <h1 className="supervisor-staff-title">
            <span className="supervisor-staff-header-icon">👨‍⚕️</span>
            Staff Management
          </h1>
          <p className="supervisor-staff-subtitle">
            Manage hospital staff, schedules, and departments
          </p>
        </div>
        <div className="supervisor-staff-header-right">
          <button 
            className="supervisor-staff-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="supervisor-btn-icon">➕</span>
            Add New Staff
          </button>
          <button 
            className="supervisor-staff-schedule-btn"
            onClick={() => setShowScheduleModal(true)}
          >
            <span className="supervisor-btn-icon">📅</span>
            Manage Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="supervisor-staff-stats-grid">
        <div className="supervisor-staff-stat-card">
          <div className="supervisor-staff-stat-content">
            <h3 className="supervisor-staff-stat-title">Total Staff</h3>
            <p className="supervisor-staff-stat-value">{staffStats.totalStaff}</p>
            <div className="supervisor-staff-stat-trend">
              <span className="supervisor-trend-up">↑ 5 new this month</span>
            </div>
          </div>
          <div className="supervisor-staff-stat-icon">👥</div>
        </div>

        <div className="supervisor-staff-stat-card">
          <div className="supervisor-staff-stat-content">
            <h3 className="supervisor-staff-stat-title">Active Staff</h3>
            <p className="supervisor-staff-stat-value">{staffStats.activeStaff}</p>
            <div className="supervisor-staff-stat-trend">
              <span className="supervisor-trend-up">98% active rate</span>
            </div>
          </div>
          <div className="supervisor-staff-stat-icon">✅</div>
        </div>

        <div className="supervisor-staff-stat-card">
          <div className="supervisor-staff-stat-content">
            <h3 className="supervisor-staff-stat-title">On Leave</h3>
            <p className="supervisor-staff-stat-value">{staffStats.onLeave}</p>
            <div className="supervisor-staff-stat-trend">
              <span className="supervisor-trend-down">↓ 2 returning tomorrow</span>
            </div>
          </div>
          <div className="supervisor-staff-stat-icon">🏖️</div>
        </div>

        <div className="supervisor-staff-stat-card">
          <div className="supervisor-staff-stat-content">
            <h3 className="supervisor-staff-stat-title">Avg Experience</h3>
            <p className="supervisor-staff-stat-value">{staffStats.avgExperience}</p>
            <div className="supervisor-staff-stat-trend">
              <span className="supervisor-trend-neutral">Stable</span>
            </div>
          </div>
          <div className="supervisor-staff-stat-icon">📊</div>
        </div>
      </div>

      {/* Filters */}
      <div className="supervisor-staff-filters">
        <div className="supervisor-filter-group">
          <label className="supervisor-filter-label">Department</label>
          <select 
            className="supervisor-filter-select"
            value={staffData.filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            <option value="all">All Departments</option>
            {staffData.departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div className="supervisor-filter-group">
          <label className="supervisor-filter-label">Shift</label>
          <select 
            className="supervisor-filter-select"
            value={staffData.filters.shift}
            onChange={(e) => handleFilterChange('shift', e.target.value)}
          >
            <option value="all">All Shifts</option>
            {staffData.shifts.map(shift => (
              <option key={shift.id} value={shift.name}>{shift.name}</option>
            ))}
          </select>
        </div>

        <div className="supervisor-filter-group">
          <label className="supervisor-filter-label">Status</label>
          <select 
            className="supervisor-filter-select"
            value={staffData.filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="supervisor-filter-search">
          <input 
            type="text" 
            placeholder="Search staff by name..."
            className="supervisor-search-input"
          />
          <button className="supervisor-search-btn">
            <span className="supervisor-search-icon">🔍</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="supervisor-staff-content-grid">
        {/* Staff List */}
        <div className="supervisor-staff-list-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              Staff Members ({filteredStaff.length})
            </h3>
            <div className="supervisor-staff-actions">
              <button className="supervisor-action-btn supervisor-btn-export">
                Export CSV
              </button>
              <button className="supervisor-action-btn supervisor-btn-print">
                Print List
              </button>
            </div>
          </div>

          <div className="supervisor-staff-table-container">
            <table className="supervisor-staff-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map(staff => (
                  <tr 
                    key={staff.id} 
                    className="supervisor-staff-row"
                    onClick={() => setSelectedStaff(staff)}
                  >
                    <td>
                      <div className="supervisor-staff-info">
                        <div 
                          className="supervisor-staff-avatar"
                          style={{ backgroundColor: staff.avatarColor }}
                        >
                          {staff.name.charAt(0)}
                        </div>
                        <div className="supervisor-staff-details">
                          <h4 className="supervisor-staff-name">{staff.name}</h4>
                          <p className="supervisor-staff-contact">{staff.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="supervisor-staff-role">{staff.role}</span>
                    </td>
                    <td>
                      <span className="supervisor-dept-badge">{staff.department}</span>
                    </td>
                    <td>
                      <span className="supervisor-shift-badge">{staff.shift}</span>
                    </td>
                    <td>
                      <span className={`supervisor-status-badge supervisor-status-${staff.status}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td>
                      <div className="supervisor-staff-row-actions">
                        <button 
                          className="supervisor-row-btn supervisor-btn-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStaffAction(staff.id, 'view');
                          }}
                        >
                          👁️
                        </button>
                        <button 
                          className="supervisor-row-btn supervisor-btn-edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStaffAction(staff.id, 'edit');
                          }}
                        >
                          ✏️
                        </button>
                        <button 
                          className="supervisor-row-btn supervisor-btn-leave"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStaffAction(staff.id, 'leave');
                          }}
                        >
                          🏖️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar - Department & Selected Staff Info */}
        <div className="supervisor-staff-sidebar">
          {/* Selected Staff Details */}
          {selectedStaff ? (
            <div className="supervisor-staff-detail-card">
              <div className="supervisor-staff-detail-header">
                <div 
                  className="supervisor-detail-avatar"
                  style={{ backgroundColor: selectedStaff.avatarColor }}
                >
                  {selectedStaff.name.charAt(0)}
                </div>
                <div className="supervisor-detail-title">
                  <h3>{selectedStaff.name}</h3>
                  <p>{selectedStaff.role}</p>
                </div>
              </div>

              <div className="supervisor-staff-detail-info">
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Department:</span>
                  <span className="supervisor-detail-value">{selectedStaff.department}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Shift:</span>
                  <span className="supervisor-detail-value">{selectedStaff.shift}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Contact:</span>
                  <span className="supervisor-detail-value">{selectedStaff.contact}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Email:</span>
                  <span className="supervisor-detail-value">{selectedStaff.email}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Experience:</span>
                  <span className="supervisor-detail-value">{selectedStaff.experience}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Join Date:</span>
                  <span className="supervisor-detail-value">{selectedStaff.joinDate}</span>
                </div>
                <div className="supervisor-detail-item">
                  <span className="supervisor-detail-label">Salary:</span>
                  <span className="supervisor-detail-value">{selectedStaff.salary}</span>
                </div>
              </div>

              <div className="supervisor-staff-detail-actions">
                <button className="supervisor-detail-btn supervisor-btn-message">
                  ✉️ Send Message
                </button>
                <button className="supervisor-detail-btn supervisor-btn-schedule">
                  📅 View Schedule
                </button>
                <button className="supervisor-detail-btn supervisor-btn-performance">
                  📊 Performance
                </button>
              </div>
            </div>
          ) : (
            <div className="supervisor-staff-select-prompt">
              <div className="supervisor-prompt-icon">👆</div>
              <h3>Select a Staff Member</h3>
              <p>Click on any staff member to view detailed information</p>
            </div>
          )}

          {/* Departments Overview */}
          <div className="supervisor-departments-card">
            <h3 className="supervisor-departments-title">Departments Overview</h3>
            <div className="supervisor-departments-list">
              {staffData.departments.map(dept => (
                <div key={dept.id} className="supervisor-department-item">
                  <div className="supervisor-dept-info">
                    <h4 className="supervisor-dept-name">{dept.name}</h4>
                    <p className="supervisor-dept-head">{dept.head}</p>
                  </div>
                  <div className="supervisor-dept-stats">
                    <span className="supervisor-dept-count">{dept.staffCount} staff</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="supervisor-staff-summary">
        <div className="supervisor-summary-item">
          <span className="supervisor-summary-label">Today Present:</span>
          <span className="supervisor-summary-value">{staffStats.todayPresent}</span>
        </div>
        <div className="supervisor-summary-item">
          <span className="supervisor-summary-label">Departments:</span>
          <span className="supervisor-summary-value">{staffStats.departments}</span>
        </div>
        <div className="supervisor-summary-item">
          <span className="supervisor-summary-label">Inactive Staff:</span>
          <span className="supervisor-summary-value">{staffStats.inactive}</span>
        </div>
        <div className="supervisor-summary-item">
          <span className="supervisor-summary-label">Last Updated:</span>
          <span className="supervisor-summary-value">Today, 10:30 AM</span>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-add-staff-modal">
            <div className="supervisor-modal-header">
              <h2>Add New Staff Member</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Add form fields here */}
              <p>Add new staff form will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-save"
                onClick={() => handleAddStaff({})}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-schedule-modal">
            <div className="supervisor-modal-header">
              <h2>Manage Staff Schedule</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Schedule management UI */}
              <p>Schedule management interface will appear here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;