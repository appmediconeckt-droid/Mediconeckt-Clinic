import React, { useState, useEffect } from 'react';
import './ShiftManagement.css';

const ShiftManagement = () => {
  const [shiftData, setShiftData] = useState({
    shifts: [],
    staffOnShift: [],
    shiftRequests: [],
    schedule: [],
    loading: true,
    viewMode: 'daily', // daily, weekly, monthly
    selectedDate: new Date().toISOString().split('T')[0]
  });

  const [showCreateShift, setShowCreateShift] = useState(false);
  const [showAssignStaff, setShowAssignStaff] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  // Sample Shift Data
  const shiftTypes = [
    {
      id: 1,
      name: "Morning Shift",
      time: "09:00 AM - 05:00 PM",
      code: "MORN",
      color: "#4CAF50",
      staffCount: 45,
      department: "All",
      supervisor: "Dr. Rajesh Sharma"
    },
    {
      id: 2,
      name: "Evening Shift",
      time: "02:00 PM - 10:00 PM",
      code: "EVEN",
      color: "#2196F3",
      staffCount: 35,
      department: "All",
      supervisor: "Dr. Priya Patel"
    },
    {
      id: 3,
      name: "Night Shift",
      time: "10:00 PM - 06:00 AM",
      code: "NIGHT",
      color: "#9C27B0",
      staffCount: 25,
      department: "Emergency",
      supervisor: "Nurse Anjali Singh"
    },
    {
      id: 4,
      name: "General Shift",
      time: "24/7 Rotation",
      code: "GEN",
      color: "#FF9800",
      staffCount: 15,
      department: "ICU",
      supervisor: "Dr. Amit Verma"
    },
    {
      id: 5,
      name: "Weekend Shift",
      time: "08:00 AM - 04:00 PM",
      code: "WEEK",
      color: "#E91E63",
      staffCount: 20,
      department: "OPD",
      supervisor: "Dr. Sneha Reddy"
    }
  ];

  // Staff on Current Shift
  const currentShiftStaff = [
    {
      id: 101,
      name: "Dr. Rajesh Sharma",
      department: "Cardiology",
      shift: "Morning Shift",
      time: "09:00 AM - 05:00 PM",
      status: "on-duty",
      checkIn: "08:55 AM",
      checkOut: null
    },
    {
      id: 102,
      name: "Nurse Anjali Singh",
      department: "Emergency",
      shift: "Night Shift",
      time: "10:00 PM - 06:00 AM",
      status: "on-duty",
      checkIn: "09:50 PM",
      checkOut: null
    },
    {
      id: 103,
      name: "Lab Technician Rohit",
      department: "Pathology",
      shift: "General Shift",
      time: "24/7 Rotation",
      status: "on-break",
      checkIn: "10:00 AM",
      checkOut: null
    },
    {
      id: 104,
      name: "Dr. Priya Patel",
      department: "Neurology",
      shift: "Evening Shift",
      time: "02:00 PM - 10:00 PM",
      status: "off-duty",
      checkIn: null,
      checkOut: "10:05 PM"
    },
    {
      id: 105,
      name: "Housekeeping Staff",
      department: "Sanitation",
      shift: "Morning Shift",
      time: "07:00 AM - 03:00 PM",
      status: "on-duty",
      checkIn: "06:55 AM",
      checkOut: null
    }
  ];

  // Shift Change Requests
  const shiftRequests = [
    {
      id: 201,
      staffName: "Dr. Amit Verma",
      department: "Orthopedics",
      currentShift: "Morning Shift",
      requestedShift: "Evening Shift",
      reason: "Personal commitment",
      date: "2024-01-20",
      status: "pending",
      priority: "medium"
    },
    {
      id: 202,
      staffName: "Nurse Priya Sharma",
      department: "Pediatrics",
      currentShift: "Night Shift",
      requestedShift: "Morning Shift",
      reason: "Health issues",
      date: "2024-01-19",
      status: "approved",
      priority: "high"
    },
    {
      id: 203,
      staffName: "Lab Assistant",
      department: "Pathology",
      currentShift: "Evening Shift",
      requestedShift: "General Shift",
      reason: "Training program",
      date: "2024-01-18",
      status: "rejected",
      priority: "low"
    },
    {
      id: 204,
      staffName: "Dr. Karan Malhotra",
      department: "Anesthesia",
      currentShift: "General Shift",
      requestedShift: "Weekend Shift",
      reason: "Family function",
      date: "2024-01-20",
      status: "pending",
      priority: "medium"
    }
  ];

  // Weekly Schedule Data
  const weeklySchedule = [
    {
      day: "Monday",
      date: "2024-01-15",
      shifts: [
        { type: "Morning", staff: 45, coverage: "100%" },
        { type: "Evening", staff: 35, coverage: "95%" },
        { type: "Night", staff: 25, coverage: "100%" }
      ]
    },
    {
      day: "Tuesday",
      date: "2024-01-16",
      shifts: [
        { type: "Morning", staff: 42, coverage: "93%" },
        { type: "Evening", staff: 38, coverage: "100%" },
        { type: "Night", staff: 22, coverage: "88%" }
      ]
    },
    {
      day: "Wednesday",
      date: "2024-01-17",
      shifts: [
        { type: "Morning", staff: 48, coverage: "100%" },
        { type: "Evening", staff: 32, coverage: "91%" },
        { type: "Night", staff: 28, coverage: "100%" }
      ]
    },
    {
      day: "Thursday",
      date: "2024-01-18",
      shifts: [
        { type: "Morning", staff: 40, coverage: "89%" },
        { type: "Evening", staff: 35, coverage: "100%" },
        { type: "Night", staff: 25, coverage: "100%" }
      ]
    },
    {
      day: "Friday",
      date: "2024-01-19",
      shifts: [
        { type: "Morning", staff: 38, coverage: "84%" },
        { type: "Evening", staff: 40, coverage: "100%" },
        { type: "Night", staff: 30, coverage: "100%" }
      ]
    },
    {
      day: "Saturday",
      date: "2024-01-20",
      shifts: [
        { type: "Morning", staff: 35, coverage: "100%" },
        { type: "Weekend", staff: 20, coverage: "100%" },
        { type: "Night", staff: 25, coverage: "100%" }
      ]
    },
    {
      day: "Sunday",
      date: "2024-01-21",
      shifts: [
        { type: "Morning", staff: 30, coverage: "100%" },
        { type: "Weekend", staff: 25, coverage: "100%" },
        { type: "Night", staff: 20, coverage: "100%" }
      ]
    }
  ];

  // Stats Data
  const shiftStats = {
    totalShifts: 5,
    activeShifts: 3,
    staffOnDuty: 142,
    todayCoverage: "96%",
    pendingRequests: 8,
    shiftChanges: 12,
    avgStaffPerShift: 28,
    overtimeHours: "45 hours"
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setShiftData(prev => ({
        ...prev,
        shifts: shiftTypes,
        staffOnShift: currentShiftStaff,
        shiftRequests: shiftRequests,
        schedule: weeklySchedule,
        loading: false
      }));
    }, 1500);
  }, []);

  // Handle View Mode Change
  const handleViewModeChange = (mode) => {
    setShiftData(prev => ({ ...prev, viewMode: mode }));
  };

  // Handle Date Change
  const handleDateChange = (date) => {
    setShiftData(prev => ({ ...prev, selectedDate: date }));
  };

  // Handle Shift Actions
  const handleShiftAction = (shiftId, action) => {
    console.log(`${action} shift ${shiftId}`);
    // Add API call here
  };

  // Handle Request Actions
  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Add API call here
  };

  // Handle Create New Shift
  const handleCreateShift = (newShift) => {
    console.log("Creating new shift:", newShift);
    // Add API call here
    setShowCreateShift(false);
  };

  // Handle Assign Staff to Shift
  const handleAssignStaff = (shiftId, staffData) => {
    console.log(`Assigning staff to shift ${shiftId}:`, staffData);
    // Add API call here
    setShowAssignStaff(false);
  };

  if (shiftData.loading) {
    return (
      <div className="supervisor-shift-loading">
        <div className="supervisor-shift-loading-spinner"></div>
        <p>Loading Shift Management Data...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-shift-management-container p-4">
      {/* Header */}
      <div className="supervisor-shift-header">
        <div className="supervisor-shift-header-left">
          <h1 className="supervisor-shift-title">
            <span className="supervisor-shift-header-icon">🕒</span>
            Shift Management
          </h1>
          <p className="supervisor-shift-subtitle">
            Manage hospital shifts, schedules, and staff rotations
          </p>
        </div>
        <div className="supervisor-shift-header-right">
          <div className="supervisor-shift-date-picker">
            <input 
              type="date" 
              className="supervisor-date-input"
              value={shiftData.selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <button 
            className="supervisor-shift-create-btn"
            onClick={() => setShowCreateShift(true)}
          >
            <span className="supervisor-btn-icon">➕</span>
            Create Shift
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="supervisor-shift-stats-grid">
        <div className="supervisor-shift-stat-card">
          <div className="supervisor-shift-stat-content">
            <h3 className="supervisor-shift-stat-title">Active Shifts</h3>
            <p className="supervisor-shift-stat-value">{shiftStats.activeShifts}/5</p>
            <div className="supervisor-shift-stat-trend">
              <span className="supervisor-trend-up">All running</span>
            </div>
          </div>
          <div className="supervisor-shift-stat-icon">🔄</div>
        </div>

        <div className="supervisor-shift-stat-card">
          <div className="supervisor-shift-stat-content">
            <h3 className="supervisor-shift-stat-title">Staff On Duty</h3>
            <p className="supervisor-shift-stat-value">{shiftStats.staffOnDuty}</p>
            <div className="supervisor-shift-stat-trend">
              <span className="supervisor-trend-up">96% coverage</span>
            </div>
          </div>
          <div className="supervisor-shift-stat-icon">👨‍⚕️</div>
        </div>

        <div className="supervisor-shift-stat-card">
          <div className="supervisor-shift-stat-content">
            <h3 className="supervisor-shift-stat-title">Pending Requests</h3>
            <p className="supervisor-shift-stat-value">{shiftStats.pendingRequests}</p>
            <div className="supervisor-shift-stat-trend">
              <span className="supervisor-trend-warning">Needs review</span>
            </div>
          </div>
          <div className="supervisor-shift-stat-icon">📋</div>
        </div>

        <div className="supervisor-shift-stat-card">
          <div className="supervisor-shift-stat-content">
            <h3 className="supervisor-shift-stat-title">Overtime Hours</h3>
            <p className="supervisor-shift-stat-value">{shiftStats.overtimeHours}</p>
            <div className="supervisor-shift-stat-trend">
              <span className="supervisor-trend-down">↓ 5% from last week</span>
            </div>
          </div>
          <div className="supervisor-shift-stat-icon">⏰</div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="supervisor-view-mode-toggle">
        <div className="supervisor-view-mode-buttons">
          <button 
            className={`supervisor-view-btn ${shiftData.viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('daily')}
          >
            📅 Daily View
          </button>
          <button 
            className={`supervisor-view-btn ${shiftData.viewMode === 'weekly' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('weekly')}
          >
            📆 Weekly View
          </button>
          <button 
            className={`supervisor-view-btn ${shiftData.viewMode === 'monthly' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('monthly')}
          >
            📊 Monthly View
          </button>
        </div>
        <div className="supervisor-shift-actions">
          <button className="supervisor-action-btn supervisor-btn-print">
            🖨️ Print Schedule
          </button>
          <button className="supervisor-action-btn supervisor-btn-export">
            📥 Export Excel
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="supervisor-shift-content-grid">
        {/* Shift Types Section */}
        <div className="supervisor-shift-types-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">🔄</span>
              Shift Types
            </h3>
            <span className="supervisor-shift-count">
              {shiftData.shifts.length} shifts configured
            </span>
          </div>

          <div className="supervisor-shift-types-grid">
            {shiftData.shifts.map((shift) => (
              <div 
                key={shift.id} 
                className="supervisor-shift-type-card"
                style={{ borderLeft: `6px solid ${shift.color}` }}
              >
                <div className="supervisor-shift-type-header">
                  <div className="supervisor-shift-code" style={{ background: shift.color }}>
                    {shift.code}
                  </div>
                  <h4 className="supervisor-shift-name">{shift.name}</h4>
                </div>
                
                <div className="supervisor-shift-details">
                  <div className="supervisor-shift-detail-item">
                    <span className="supervisor-detail-label">Timing:</span>
                    <span className="supervisor-detail-value">{shift.time}</span>
                  </div>
                  <div className="supervisor-shift-detail-item">
                    <span className="supervisor-detail-label">Staff Count:</span>
                    <span className="supervisor-detail-value">{shift.staffCount}</span>
                  </div>
                  <div className="supervisor-shift-detail-item">
                    <span className="supervisor-detail-label">Department:</span>
                    <span className="supervisor-detail-value">{shift.department}</span>
                  </div>
                  <div className="supervisor-shift-detail-item">
                    <span className="supervisor-detail-label">Supervisor:</span>
                    <span className="supervisor-detail-value">{shift.supervisor}</span>
                  </div>
                </div>

                <div className="supervisor-shift-actions-row">
                  <button 
                    className="supervisor-shift-action-btn supervisor-btn-assign"
                    onClick={() => {
                      setSelectedShift(shift);
                      setShowAssignStaff(true);
                    }}
                  >
                    👥 Assign Staff
                  </button>
                  <button 
                    className="supervisor-shift-action-btn supervisor-btn-edit"
                    onClick={() => handleShiftAction(shift.id, 'edit')}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="supervisor-shift-action-btn supervisor-btn-view"
                    onClick={() => handleShiftAction(shift.id, 'view')}
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Shift Staff */}
        <div className="supervisor-current-shift-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">👨‍⚕️</span>
              Staff On Current Shift
            </h3>
            <div className="supervisor-time-display">
              <span className="supervisor-current-time">10:30 AM</span>
              <span className="supervisor-time-zone">IST</span>
            </div>
          </div>

          <div className="supervisor-staff-shift-table">
            <div className="supervisor-table-header">
              <div className="supervisor-header-col">Staff Name</div>
              <div className="supervisor-header-col">Department</div>
              <div className="supervisor-header-col">Shift</div>
              <div className="supervisor-header-col">Status</div>
              <div className="supervisor-header-col">Check In/Out</div>
              <div className="supervisor-header-col">Actions</div>
            </div>

            <div className="supervisor-table-body">
              {shiftData.staffOnShift.map((staff) => (
                <div key={staff.id} className="supervisor-staff-shift-row">
                  <div className="supervisor-staff-col">
                    <div className="supervisor-staff-avatar">
                      {staff.name.charAt(0)}
                    </div>
                    <div className="supervisor-staff-info">
                      <h4 className="supervisor-staff-name">{staff.name}</h4>
                      <p className="supervisor-staff-time">{staff.time}</p>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-col">
                    <span className="supervisor-dept-badge">{staff.department}</span>
                  </div>
                  
                  <div className="supervisor-shift-col">
                    <span className="supervisor-shift-badge">{staff.shift}</span>
                  </div>
                  
                  <div className="supervisor-status-col">
                    <span className={`supervisor-status-indicator supervisor-status-${staff.status}`}>
                      {staff.status}
                    </span>
                  </div>
                  
                  <div className="supervisor-time-col">
                    {staff.checkIn ? (
                      <div className="supervisor-time-entry">
                        <span className="supervisor-time-in">In: {staff.checkIn}</span>
                        {staff.checkOut && (
                          <span className="supervisor-time-out">Out: {staff.checkOut}</span>
                        )}
                      </div>
                    ) : (
                      <span className="supervisor-time-not-checked">Not checked in</span>
                    )}
                  </div>
                  
                  <div className="supervisor-actions-col">
                    <div className="supervisor-staff-actions">
                      <button 
                        className="supervisor-action-icon-btn supervisor-btn-check"
                        onClick={() => handleShiftAction(staff.id, 'check')}
                      >
                        ✅
                      </button>
                      <button 
                        className="supervisor-action-icon-btn supervisor-btn-message"
                        onClick={() => handleShiftAction(staff.id, 'message')}
                      >
                        💬
                      </button>
                      <button 
                        className="supervisor-action-icon-btn supervisor-btn-alert"
                        onClick={() => handleShiftAction(staff.id, 'alert')}
                      >
                        ⚠️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="supervisor-shift-bottom-grid">
        {/* Shift Requests */}
        <div className="supervisor-shift-requests-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">📨</span>
              Shift Change Requests
            </h3>
            <span className="supervisor-requests-count">
              {shiftData.shiftRequests.filter(r => r.status === 'pending').length} pending
            </span>
          </div>

          <div className="supervisor-requests-list">
            {shiftData.shiftRequests.map((request) => (
              <div key={request.id} className="supervisor-request-card">
                <div className="supervisor-request-header">
                  <div className="supervisor-request-staff">
                    <h4 className="supervisor-request-name">{request.staffName}</h4>
                    <span className="supervisor-request-dept">{request.department}</span>
                  </div>
                  <span className={`supervisor-request-status supervisor-status-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                
                <div className="supervisor-request-details">
                  <div className="supervisor-shift-change">
                    <span className="supervisor-current-shift">{request.currentShift}</span>
                    <span className="supervisor-change-arrow">→</span>
                    <span className="supervisor-requested-shift">{request.requestedShift}</span>
                  </div>
                  <p className="supervisor-request-reason">{request.reason}</p>
                </div>

                <div className="supervisor-request-footer">
                  <span className="supervisor-request-date">{request.date}</span>
                  <span className={`supervisor-priority-badge supervisor-priority-${request.priority}`}>
                    {request.priority} priority
                  </span>
                  <div className="supervisor-request-actions">
                    {request.status === 'pending' && (
                      <>
                        <button 
                          className="supervisor-request-btn supervisor-btn-approve"
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          Approve
                        </button>
                        <button 
                          className="supervisor-request-btn supervisor-btn-reject"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      className="supervisor-request-btn supervisor-btn-view"
                      onClick={() => handleRequestAction(request.id, 'view')}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="supervisor-weekly-schedule-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">📅</span>
              Weekly Schedule
            </h3>
            <div className="supervisor-week-navigation">
              <button className="supervisor-week-btn supervisor-btn-prev">← Prev</button>
              <span className="supervisor-week-range">Jan 15 - Jan 21, 2024</span>
              <button className="supervisor-week-btn supervisor-btn-next">Next →</button>
            </div>
          </div>

          <div className="supervisor-schedule-table">
            <div className="supervisor-schedule-header">
              <div className="supervisor-schedule-day">Day</div>
              <div className="supervisor-schedule-date">Date</div>
              <div className="supervisor-schedule-shifts">Shifts</div>
              <div className="supervisor-schedule-coverage">Coverage</div>
            </div>

            <div className="supervisor-schedule-body">
              {shiftData.schedule.map((day) => (
                <div key={day.date} className="supervisor-schedule-row">
                  <div className="supervisor-schedule-day-cell">
                    <span className="supervisor-day-name">{day.day}</span>
                    {day.day === 'Saturday' || day.day === 'Sunday' ? (
                      <span className="supervisor-weekend-badge">Weekend</span>
                    ) : null}
                  </div>
                  
                  <div className="supervisor-schedule-date-cell">
                    {day.date.split('-')[2]}
                  </div>
                  
                  <div className="supervisor-schedule-shifts-cell">
                    <div className="supervisor-shifts-list">
                      {day.shifts.map((shift, index) => (
                        <div key={index} className="supervisor-shift-item">
                          <span className="supervisor-shift-type">{shift.type}</span>
                          <span className="supervisor-shift-staff">{shift.staff} staff</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="supervisor-schedule-coverage-cell">
                    {day.shifts.map((shift, index) => (
                      <div key={index} className="supervisor-coverage-item">
                        <div className="supervisor-coverage-bar">
                          <div 
                            className="supervisor-coverage-fill"
                            style={{ width: shift.coverage }}
                          ></div>
                        </div>
                        <span className="supervisor-coverage-value">{shift.coverage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="supervisor-quick-actions-bar">
        <button className="supervisor-quick-action">
          <span className="supervisor-quick-icon">📊</span>
          Generate Report
        </button>
        <button className="supervisor-quick-action">
          <span className="supervisor-quick-icon">🔄</span>
          Auto Assign
        </button>
        <button className="supervisor-quick-action">
          <span className="supervisor-quick-icon">⚠️</span>
          Emergency Override
        </button>
        <button className="supervisor-quick-action">
          <span className="supervisor-quick-icon">📱</span>
          Send Alerts
        </button>
      </div>

      {/* Create Shift Modal */}
      {showCreateShift && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-create-shift-modal">
            <div className="supervisor-modal-header">
              <h2>Create New Shift</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowCreateShift(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Shift creation form */}
              <p>Shift creation form will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowCreateShift(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-save"
                onClick={handleCreateShift}
              >
                Create Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Staff Modal */}
      {showAssignStaff && selectedShift && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-assign-staff-modal">
            <div className="supervisor-modal-header">
              <h2>Assign Staff to {selectedShift.name}</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowAssignStaff(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Staff assignment interface */}
              <p>Staff assignment interface for {selectedShift.name}</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowAssignStaff(false)}
              >
                Cancel
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-save"
                onClick={() => handleAssignStaff(selectedShift.id, {})}
              >
                Assign Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;