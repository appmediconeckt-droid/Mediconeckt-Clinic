import React, { useState, useEffect } from 'react';
import './CleaningSchedule.css';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaBed,
  FaBroom,
  FaShower,
  FaTrashAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaCalendarCheck,
  FaListAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';

const CleaningSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Cleaning Schedule Data
  const [cleaningSchedule, setCleaningSchedule] = useState([
    { 
      id: 1, 
      roomNo: 'ICU-101', 
      ward: 'ICU', 
      cleaningType: 'Deep Cleaning',
      procedure: 'Sterilization',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Rajesh Kumar',
      startTime: '06:00',
      endTime: '08:00',
      duration: '2 hours',
      status: 'In Progress',
      priority: 'High',
      lastCleaned: 'Today 04:00 AM',
      nextCleaning: 'Tomorrow 06:00 AM',
      equipment: ['Floor Scrubber', 'Steam Cleaner', 'UV Light'],
      supervisor: 'Mrs. Sharma',
      notes: 'Use extra disinfectant'
    },
    { 
      id: 2, 
      roomNo: 'WARD-205', 
      ward: 'General Ward', 
      cleaningType: 'Regular Cleaning',
      procedure: 'Sanitization',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Priya Sharma',
      startTime: '08:30',
      endTime: '09:30',
      duration: '1 hour',
      status: 'Pending',
      priority: 'Medium',
      lastCleaned: 'Yesterday 02:00 PM',
      nextCleaning: 'Today 02:00 PM',
      equipment: ['Mop', 'Bucket', 'Disinfectant'],
      supervisor: 'Mr. Gupta',
      notes: 'Patient discharged at 8 AM'
    },
    { 
      id: 3, 
      roomNo: 'OPD-03', 
      ward: 'OPD', 
      cleaningType: 'Sanitization',
      procedure: 'Surface Cleaning',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Amit Singh',
      startTime: '07:00',
      endTime: '07:45',
      duration: '45 mins',
      status: 'Completed',
      priority: 'High',
      lastCleaned: 'Today 07:45 AM',
      nextCleaning: 'Today 12:00 PM',
      equipment: ['Spray Bottle', 'Microfiber Cloth'],
      supervisor: 'Mrs. Sharma',
      notes: 'Waiting area needs attention'
    },
    { 
      id: 4, 
      roomNo: 'OT-01', 
      ward: 'Operation Theater', 
      cleaningType: 'Sterilization',
      procedure: 'Surgical Cleaning',
      shift: 'Evening (2PM-10PM)',
      assignedStaff: 'Sunita Verma',
      startTime: '10:00',
      endTime: '13:00',
      duration: '3 hours',
      status: 'Scheduled',
      priority: 'Critical',
      lastCleaned: 'Yesterday 10:00 PM',
      nextCleaning: 'After Surgery',
      equipment: ['Autoclave', 'Sterilizer', 'UV Cabinet'],
      supervisor: 'Dr. Patel',
      notes: 'Critical surgery at 2 PM'
    },
    { 
      id: 5, 
      roomNo: 'EMERG-01', 
      ward: 'Emergency', 
      cleaningType: 'Emergency Clean',
      procedure: 'Rapid Sanitization',
      shift: 'Night (10PM-6AM)',
      assignedStaff: 'Vikram Patel',
      startTime: 'NOW',
      endTime: '30 mins',
      duration: '30 mins',
      status: 'In Progress',
      priority: 'Critical',
      lastCleaned: 'Today 05:00 AM',
      nextCleaning: 'As Required',
      equipment: ['Emergency Kit'],
      supervisor: 'Head Nurse',
      notes: 'Emergency case just arrived'
    },
    { 
      id: 6, 
      roomNo: 'LAB-02', 
      ward: 'Pathology Lab', 
      cleaningType: 'Biohazard Clean',
      procedure: 'Decontamination',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Sanjay Mehta',
      startTime: '09:00',
      endTime: '10:30',
      duration: '1.5 hours',
      status: 'Completed',
      priority: 'High',
      lastCleaned: 'Today 10:30 AM',
      nextCleaning: 'Tomorrow 09:00 AM',
      equipment: ['Biohazard Kit', 'PPE Suit'],
      supervisor: 'Lab Incharge',
      notes: 'Handle biohazard waste carefully'
    },
    { 
      id: 7, 
      roomNo: 'CAFETERIA', 
      ward: 'Cafeteria', 
      cleaningType: 'Food Area Clean',
      procedure: 'Food Safety Cleaning',
      shift: 'Evening (2PM-10PM)',
      assignedStaff: 'Anita Desai',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2 hours',
      status: 'Pending',
      priority: 'Medium',
      lastCleaned: 'Yesterday 04:00 PM',
      nextCleaning: 'Daily',
      equipment: ['Floor Cleaner', 'Food Grade Sanitizer'],
      supervisor: 'Mr. Gupta',
      notes: 'Clean kitchen thoroughly'
    },
    { 
      id: 8, 
      roomNo: 'RECEPTION', 
      ward: 'Reception', 
      cleaningType: 'Public Area Clean',
      procedure: 'High Traffic Cleaning',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Mohammed Khan',
      startTime: '06:00',
      endTime: '07:00',
      duration: '1 hour',
      status: 'Completed',
      priority: 'Low',
      lastCleaned: 'Today 07:00 AM',
      nextCleaning: 'Every 4 Hours',
      equipment: ['Vacuum Cleaner', 'Glass Cleaner'],
      supervisor: 'Mrs. Sharma',
      notes: 'Focus on waiting chairs'
    },
  ]);

  // Ward Statistics
  const [wardStats, setWardStats] = useState({
    ICU: { total: 8, cleaned: 5, pending: 2, inProgress: 1 },
    'General Ward': { total: 45, cleaned: 35, pending: 8, inProgress: 2 },
    OPD: { total: 15, cleaned: 12, pending: 2, inProgress: 1 },
    'Operation Theater': { total: 5, cleaned: 3, pending: 1, inProgress: 1 },
    Emergency: { total: 8, cleaned: 6, pending: 1, inProgress: 1 },
    Pathology: { total: 6, cleaned: 4, pending: 1, inProgress: 1 },
    Cafeteria: { total: 1, cleaned: 0, pending: 1, inProgress: 0 },
    Reception: { total: 3, cleaned: 3, pending: 0, inProgress: 0 }
  });

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setCleaningSchedule(schedule =>
      schedule.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Handle reassign staff
  const handleReassignStaff = (id, newStaff) => {
    setCleaningSchedule(schedule =>
      schedule.map(item =>
        item.id === id ? { ...item, assignedStaff: newStaff } : item
      )
    );
  };

  // Handle add new schedule
  const handleAddSchedule = () => {
    const newSchedule = {
      id: cleaningSchedule.length + 1,
      roomNo: 'NEW',
      ward: 'General Ward',
      cleaningType: 'Regular Cleaning',
      procedure: 'Basic Cleaning',
      shift: 'Morning (6AM-2PM)',
      assignedStaff: 'Select Staff',
      startTime: '08:00',
      endTime: '09:00',
      duration: '1 hour',
      status: 'Scheduled',
      priority: 'Medium',
      lastCleaned: 'Never',
      nextCleaning: 'Today',
      equipment: ['Standard Kit'],
      supervisor: 'To be assigned',
      notes: 'New schedule added'
    };
    setCleaningSchedule([...cleaningSchedule, newSchedule]);
  };

  // Handle delete schedule
  const handleDeleteSchedule = (id) => {
    setCleaningSchedule(schedule => schedule.filter(item => item.id !== id));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'hk-cleaning-completed';
      case 'In Progress': return 'hk-cleaning-inprogress';
      case 'Pending': return 'hk-cleaning-pending';
      case 'Scheduled': return 'hk-cleaning-scheduled';
      default: return 'hk-cleaning-default';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'hk-cleaning-priority-critical';
      case 'High': return 'hk-cleaning-priority-high';
      case 'Medium': return 'hk-cleaning-priority-medium';
      case 'Low': return 'hk-cleaning-priority-low';
      default: return 'hk-cleaning-priority-default';
    }
  };

  // Get shift color
  const getShiftColor = (shift) => {
    if (shift.includes('Morning')) return 'hk-cleaning-shift-morning';
    if (shift.includes('Evening')) return 'hk-cleaning-shift-evening';
    if (shift.includes('Night')) return 'hk-cleaning-shift-night';
    return 'hk-cleaning-shift-default';
  };

  // Filter schedule based on criteria
  const filteredSchedule = cleaningSchedule.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedStaff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ward.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = selectedWard === 'all' || item.ward === selectedWard;
    const matchesShift = selectedShift === 'all' || item.shift === selectedShift;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesWard && matchesShift && matchesStatus;
  });

  // Get current time status
  const getTimeStatus = (startTime) => {
    if (startTime === 'NOW') return 'hk-cleaning-time-now';
    const currentHour = new Date().getHours();
    const scheduleHour = parseInt(startTime.split(':')[0]);
    
    if (scheduleHour > currentHour) return 'hk-cleaning-time-upcoming';
    if (scheduleHour === currentHour) return 'hk-cleaning-time-now';
    return 'hk-cleaning-time-past';
  };

  return (
    <div className="hk-cleaning-container">
      {/* Header Section */}
      <div className="hk-cleaning-header">
        <div className="hk-cleaning-title-section">
          <h1 className="hk-cleaning-title">
            <FaCalendarAlt className="hk-cleaning-title-icon" />
            Cleaning Schedule
          </h1>
          <p className="hk-cleaning-subtitle">
            Manage and track all cleaning schedules across hospital departments
          </p>
        </div>
        
        <div className="hk-cleaning-header-actions">
          <div className="hk-cleaning-date-selector">
            <FaCalendarCheck />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="hk-cleaning-date-input"
            />
          </div>
          <button className="hk-cleaning-btn-primary">
            <FaPlus /> Add Schedule
          </button>
          <button className="hk-cleaning-btn-secondary">
            <FaPrint /> Print Schedule
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="hk-cleaning-stats-grid">
        <div className="hk-cleaning-stat-card hk-cleaning-stat-total">
          <div className="hk-cleaning-stat-icon">
            <FaListAlt />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>{cleaningSchedule.length}</h3>
            <p>Total Schedules</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-up">↑ 12%</span>
          </div>
        </div>

        <div className="hk-cleaning-stat-card hk-cleaning-stat-completed">
          <div className="hk-cleaning-stat-icon">
            <FaCheckCircle />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>{cleaningSchedule.filter(s => s.status === 'Completed').length}</h3>
            <p>Completed Today</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-up">↑ 8%</span>
          </div>
        </div>

        <div className="hk-cleaning-stat-card hk-cleaning-stat-progress">
          <div className="hk-cleaning-stat-icon">
            <FaHourglassHalf />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>{cleaningSchedule.filter(s => s.status === 'In Progress').length}</h3>
            <p>In Progress</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-neutral">→ 2%</span>
          </div>
        </div>

        <div className="hk-cleaning-stat-card hk-cleaning-stat-pending">
          <div className="hk-cleaning-stat-icon">
            <FaClock />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>{cleaningSchedule.filter(s => s.status === 'Pending').length}</h3>
            <p>Pending</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-down">↓ 5%</span>
          </div>
        </div>

        <div className="hk-cleaning-stat-card hk-cleaning-stat-critical">
          <div className="hk-cleaning-stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>{cleaningSchedule.filter(s => s.priority === 'Critical').length}</h3>
            <p>Critical Priority</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-up">↑ 3%</span>
          </div>
        </div>

        <div className="hk-cleaning-stat-card hk-cleaning-stat-staff">
          <div className="hk-cleaning-stat-icon">
            <FaUser />
          </div>
          <div className="hk-cleaning-stat-content">
            <h3>8/12</h3>
            <p>Staff Active</p>
          </div>
          <div className="hk-cleaning-stat-trend">
            <span className="hk-cleaning-trend-up">↑ 15%</span>
          </div>
        </div>
      </div>

      {/* Ward Statistics */}
      <div className="hk-cleaning-ward-section">
        <h2 className="hk-cleaning-section-title">
          <FaMapMarkerAlt /> Ward-wise Cleaning Status
        </h2>
        <div className="hk-cleaning-ward-grid">
          {Object.entries(wardStats).map(([ward, stats]) => (
            <div key={ward} className="hk-cleaning-ward-card">
              <h3 className="hk-cleaning-ward-name">{ward}</h3>
              <div className="hk-cleaning-ward-stats">
                <div className="hk-cleaning-ward-stat">
                  <span className="hk-cleaning-ward-stat-label">Total:</span>
                  <span className="hk-cleaning-ward-stat-value">{stats.total}</span>
                </div>
                <div className="hk-cleaning-ward-stat">
                  <span className="hk-cleaning-ward-stat-label">Cleaned:</span>
                  <span className="hk-cleaning-ward-stat-value hk-cleaning-ward-cleaned">{stats.cleaned}</span>
                </div>
                <div className="hk-cleaning-ward-stat">
                  <span className="hk-cleaning-ward-stat-label">Pending:</span>
                  <span className="hk-cleaning-ward-stat-value hk-cleaning-ward-pending">{stats.pending}</span>
                </div>
                <div className="hk-cleaning-ward-stat">
                  <span className="hk-cleaning-ward-stat-label">In Progress:</span>
                  <span className="hk-cleaning-ward-stat-value hk-cleaning-ward-inprogress">{stats.inProgress}</span>
                </div>
              </div>
              <div className="hk-cleaning-ward-progress">
                <div 
                  className="hk-cleaning-ward-progress-bar"
                  style={{ width: `${(stats.cleaned / stats.total) * 100}%` }}
                ></div>
              </div>
              <div className="hk-cleaning-ward-completion">
                {Math.round((stats.cleaned / stats.total) * 100)}% Complete
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="hk-cleaning-filters-section">
        <div className="hk-cleaning-search-container">
          <FaSearch className="hk-cleaning-search-icon" />
          <input
            type="text"
            placeholder="Search by room, staff, or ward..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hk-cleaning-search-input"
          />
        </div>
        
        <div className="hk-cleaning-filter-group">
          <select 
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="hk-cleaning-filter-select"
          >
            <option value="all">All Wards</option>
            <option value="ICU">ICU</option>
            <option value="General Ward">General Ward</option>
            <option value="OPD">OPD</option>
            <option value="Operation Theater">Operation Theater</option>
            <option value="Emergency">Emergency</option>
            <option value="Pathology">Pathology Lab</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Reception">Reception</option>
          </select>

          <select 
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="hk-cleaning-filter-select"
          >
            <option value="all">All Shifts</option>
            <option value="Morning (6AM-2PM)">Morning Shift</option>
            <option value="Evening (2PM-10PM)">Evening Shift</option>
            <option value="Night (10PM-6AM)">Night Shift</option>
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="hk-cleaning-filter-select"
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
          </select>

          <button className="hk-cleaning-filter-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="hk-cleaning-reset-btn">
            <FaSync /> Reset
          </button>
          <button className="hk-cleaning-export-btn">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Main Schedule Table */}
      <div className="hk-cleaning-table-section">
        <div className="hk-cleaning-table-header">
          <h2 className="hk-cleaning-section-title">
            <FaCalendarAlt /> Cleaning Schedule Details
          </h2>
          <div className="hk-cleaning-table-actions">
            <span className="hk-cleaning-table-count">
              Showing {filteredSchedule.length} of {cleaningSchedule.length} schedules
            </span>
            <button className="hk-cleaning-btn-refresh">
              <FaSync /> Refresh
            </button>
          </div>
        </div>

        <div className="hk-cleaning-table-container">
          <table className="hk-cleaning-table response">
            <thead>
              <tr>
                <th className="hk-cleaning-th-room">Room/Area</th>
                <th className="hk-cleaning-th-ward">Ward</th>
                <th className="hk-cleaning-th-type">Cleaning Type</th>
                <th className="hk-cleaning-th-shift">Shift</th>
                <th className="hk-cleaning-th-time">Time Slot</th>
                <th className="hk-cleaning-th-staff">Assigned Staff</th>
                <th className="hk-cleaning-th-status">Status</th>
                <th className="hk-cleaning-th-priority">Priority</th>
                <th className="hk-cleaning-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.map((item) => (
                <tr key={item.id} className="hk-cleaning-table-row">
                  <td className="hk-cleaning-td-room">
                    <div className="hk-cleaning-room-info">
                      <FaBed className="hk-cleaning-room-icon" />
                      <div>
                        <strong className="hk-cleaning-room-no">{item.roomNo}</strong>
                        <div className="hk-cleaning-room-procedure">{item.procedure}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hk-cleaning-td-ward">
                    <span className={`hk-cleaning-ward-badge ${item.ward.replace(/\s+/g, '-').toLowerCase()}`}>
                      {item.ward}
                    </span>
                  </td>
                  <td className="hk-cleaning-td-type">
                    <div className="hk-cleaning-type-info">
                      {item.cleaningType === 'Deep Cleaning' && <FaBroom />}
                      {item.cleaningType === 'Sterilization' && <FaShower />}
                      {item.cleaningType === 'Emergency Clean' && <FaExclamationTriangle />}
                      {item.cleaningType === 'Biohazard Clean' && <FaTrashAlt />}
                      <span>{item.cleaningType}</span>
                    </div>
                  </td>
                  <td className="hk-cleaning-td-shift">
                    <span className={`hk-cleaning-shift-badge ${getShiftColor(item.shift)}`}>
                      {item.shift}
                    </span>
                  </td>
                  <td className="hk-cleaning-td-time">
                    <div className="hk-cleaning-time-slot">
                      <div className={`hk-cleaning-time-indicator ${getTimeStatus(item.startTime)}`}>
                        {item.startTime}
                      </div>
                      <div className="hk-cleaning-time-range">
                        <FaClock /> {item.startTime} - {item.endTime}
                      </div>
                      <div className="hk-cleaning-duration">
                        <span className="hk-cleaning-duration-badge">{item.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hk-cleaning-td-staff">
                    <div className="hk-cleaning-staff-assignment">
                      <FaUser className="hk-cleaning-staff-icon" />
                      <div className="hk-cleaning-staff-info">
                        <div className="hk-cleaning-staff-name">{item.assignedStaff}</div>
                        <select 
                          className="hk-cleaning-staff-select"
                          value={item.assignedStaff}
                          onChange={(e) => handleReassignStaff(item.id, e.target.value)}
                        >
                          <option>Rajesh Kumar</option>
                          <option>Priya Sharma</option>
                          <option>Amit Singh</option>
                          <option>Sunita Verma</option>
                          <option>Vikram Patel</option>
                          <option>Sanjay Mehta</option>
                          <option>Anita Desai</option>
                          <option>Mohammed Khan</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="hk-cleaning-td-status">
                    <div className="hk-cleaning-status-cell">
                      <select 
                        className={`hk-cleaning-status-select ${getStatusColor(item.status)}`}
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <div className="hk-cleaning-last-cleaned">
                        Last: {item.lastCleaned}
                      </div>
                    </div>
                  </td>
                  <td className="hk-cleaning-td-priority">
                    <span className={`hk-cleaning-priority-badge ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="hk-cleaning-td-actions">
                    <div className="hk-cleaning-action-buttons">
                      <button 
                        className="hk-cleaning-action-btn hk-cleaning-action-view"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="hk-cleaning-action-btn hk-cleaning-action-edit"
                        title="Edit Schedule"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="hk-cleaning-action-btn hk-cleaning-action-delete"
                        title="Delete Schedule"
                        onClick={() => handleDeleteSchedule(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="hk-cleaning-equipment">
                      <span className="hk-cleaning-equipment-badge">
                        {item.equipment.length} tools
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredSchedule.length === 0 && (
          <div className="hk-cleaning-no-results">
            <FaCalendarAlt className="hk-cleaning-no-results-icon" />
            <h3>No cleaning schedules found</h3>
            <p>Try changing your filters or add a new schedule</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="hk-cleaning-table-footer">
          <div className="hk-cleaning-pagination">
            <button className="hk-cleaning-page-btn">← Previous</button>
            <span className="hk-cleaning-page-info">Page 1 of 2</span>
            <button className="hk-cleaning-page-btn">Next →</button>
          </div>
          <div className="hk-cleaning-summary">
            <span className="hk-cleaning-summary-item">
              <span className="hk-cleaning-summary-dot hk-cleaning-summary-completed"></span>
              Completed: {cleaningSchedule.filter(s => s.status === 'Completed').length}
            </span>
            <span className="hk-cleaning-summary-item">
              <span className="hk-cleaning-summary-dot hk-cleaning-summary-inprogress"></span>
              In Progress: {cleaningSchedule.filter(s => s.status === 'In Progress').length}
            </span>
            <span className="hk-cleaning-summary-item">
              <span className="hk-cleaning-summary-dot hk-cleaning-summary-pending"></span>
              Pending: {cleaningSchedule.filter(s => s.status === 'Pending').length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hk-cleaning-quick-actions">
        <h2 className="hk-cleaning-section-title">
          <FaBroom /> Quick Actions
        </h2>
        <div className="hk-cleaning-actions-grid">
          <button className="hk-cleaning-quick-action-btn hk-cleaning-action-add">
            <FaPlus /> Add New Schedule
          </button>
          <button className="hk-cleaning-quick-action-btn hk-cleaning-action-bulk">
            <FaListAlt /> Bulk Schedule Update
          </button>
          <button className="hk-cleaning-quick-action-btn hk-cleaning-action-notify">
            <FaClock /> Send Reminders
          </button>
          <button className="hk-cleaning-quick-action-btn hk-cleaning-action-report">
            <FaDownload /> Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleaningSchedule;