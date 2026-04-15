import React, { useState, useEffect } from 'react';
import './HousekeepingDashboard.css';
import {
  FaBroom,
  FaToiletPaper,
  FaBed,
  FaShower,
  FaTrashAlt,
  FaClipboardCheck,
  FaTools,
  FaCalendarAlt,
  FaUsers,
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus
} from 'react-icons/fa';

const HousekeepingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState('all');
  
  // Dashboard Statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalRooms: 150,
    cleanedToday: 112,
    pendingCleaning: 25,
    underMaintenance: 13,
    occupiedRooms: 98,
    vacantRooms: 52,
    emergencyCleaning: 3,
    scheduledTasks: 45,
    staffOnDuty: 8,
    complaints: 2
  });

  // Housekeeping Tasks Data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      roomNo: 'ICU-101', 
      ward: 'ICU', 
      taskType: 'Deep Cleaning', 
      priority: 'High', 
      status: 'In Progress', 
      assignedTo: 'Rajesh Kumar', 
      startTime: '08:00 AM', 
      estimatedTime: '2 hours',
      lastCleaned: 'Today 06:00 AM'
    },
    { 
      id: 2, 
      roomNo: 'WARD-205', 
      ward: 'General Ward', 
      taskType: 'Regular Cleaning', 
      priority: 'Medium', 
      status: 'Pending', 
      assignedTo: 'Priya Sharma', 
      startTime: '09:30 AM', 
      estimatedTime: '1 hour',
      lastCleaned: 'Yesterday 02:00 PM'
    },
    { 
      id: 3, 
      roomNo: 'OPD-03', 
      ward: 'OPD', 
      taskType: 'Sanitization', 
      priority: 'High', 
      status: 'Completed', 
      assignedTo: 'Amit Singh', 
      startTime: '07:00 AM', 
      estimatedTime: '45 mins',
      lastCleaned: 'Today 07:45 AM'
    },
    { 
      id: 4, 
      roomNo: 'OT-01', 
      ward: 'Operation Theater', 
      taskType: 'Sterilization', 
      priority: 'Critical', 
      status: 'Scheduled', 
      assignedTo: 'Sunita Verma', 
      startTime: '10:00 AM', 
      estimatedTime: '3 hours',
      lastCleaned: 'Yesterday 10:00 PM'
    },
    { 
      id: 5, 
      roomNo: 'EMERG-01', 
      ward: 'Emergency', 
      taskType: 'Emergency Clean', 
      priority: 'Critical', 
      status: 'In Progress', 
      assignedTo: 'Vikram Patel', 
      startTime: 'Now', 
      estimatedTime: '30 mins',
      lastCleaned: 'Today 05:00 AM'
    },
  ]);

  // Room Status Data
  const [roomStatus, setRoomStatus] = useState([
    { id: 1, roomNo: '101', type: 'Single AC', status: 'Occupied', cleaningStatus: 'Cleaned', nextCleaning: '2:00 PM' },
    { id: 2, roomNo: '102', type: 'Double AC', status: 'Vacant', cleaningStatus: 'Pending', nextCleaning: 'ASAP' },
    { id: 3, roomNo: '103', type: 'General', status: 'Occupied', cleaningStatus: 'In Progress', nextCleaning: '11:00 AM' },
    { id: 4, roomNo: '104', type: 'ICU', status: 'Occupied', cleaningStatus: 'Cleaned', nextCleaning: '3:00 PM' },
    { id: 5, roomNo: '105', type: 'Emergency', status: 'Vacant', cleaningStatus: 'Under Maintenance', nextCleaning: 'Tomorrow' },
    { id: 6, roomNo: '106', type: 'OPD', status: 'Occupied', cleaningStatus: 'Needs Attention', nextCleaning: '1:00 PM' },
  ]);

  // Staff Performance Data
  const [staffPerformance, setStaffPerformance] = useState([
    { id: 1, name: 'Rajesh Kumar', tasksCompleted: 15, efficiency: '92%', avgTime: '45 mins', rating: '4.8' },
    { id: 2, name: 'Priya Sharma', tasksCompleted: 12, efficiency: '88%', avgTime: '50 mins', rating: '4.5' },
    { id: 3, name: 'Amit Singh', tasksCompleted: 18, efficiency: '95%', avgTime: '40 mins', rating: '4.9' },
    { id: 4, name: 'Sunita Verma', tasksCompleted: 14, efficiency: '90%', avgTime: '55 mins', rating: '4.6' },
    { id: 5, name: 'Vikram Patel', tasksCompleted: 16, efficiency: '93%', avgTime: '42 mins', rating: '4.7' },
  ]);

  // Supplies Inventory
  const [supplies, setSupplies] = useState([
    { id: 1, item: 'Disinfectant', currentStock: 45, minStock: 20, status: 'Adequate', lastOrder: '2024-01-15' },
    { id: 2, item: 'Floor Cleaner', currentStock: 32, minStock: 25, status: 'Adequate', lastOrder: '2024-01-10' },
    { id: 3, item: 'Hand Sanitizer', currentStock: 15, minStock: 30, status: 'Low', lastOrder: '2024-01-05' },
    { id: 4, item: 'Trash Bags', currentStock: 120, minStock: 50, status: 'Adequate', lastOrder: '2024-01-12' },
    { id: 5, item: 'Gloves', currentStock: 8, minStock: 25, status: 'Critical', lastOrder: '2024-01-03' },
    { id: 6, item: 'Mops', currentStock: 22, minStock: 15, status: 'Adequate', lastOrder: '2024-01-08' },
  ]);

  // Maintenance Requests
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 1, roomNo: '201', issue: 'Leaking Tap', priority: 'Medium', reportedBy: 'Nurse Station', status: 'Pending', date: '2024-01-20' },
    { id: 2, roomNo: '105', issue: 'AC Not Working', priority: 'High', reportedBy: 'Dr. Sharma', status: 'In Progress', date: '2024-01-20' },
    { id: 3, roomNo: 'ICU-02', issue: 'Floor Damage', priority: 'High', reportedBy: 'Head Nurse', status: 'Completed', date: '2024-01-19' },
    { id: 4, roomNo: 'WARD-305', issue: 'Light Repair', priority: 'Low', reportedBy: 'Patient Attendant', status: 'Pending', date: '2024-01-20' },
  ]);

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Handle assign task
  const handleAssignTask = (taskId, staffName) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignedTo: staffName } : task
    ));
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm === '' || 
      task.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = selectedWard === 'all' || task.ward === selectedWard;
    const matchesStaff = selectedStaff === 'all' || task.assignedTo === selectedStaff;
    
    return matchesSearch && matchesWard && matchesStaff;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'hk-status-completed';
      case 'In Progress': return 'hk-status-inprogress';
      case 'Pending': return 'hk-status-pending';
      case 'Scheduled': return 'hk-status-scheduled';
      case 'Critical': return 'hk-status-critical';
      default: return 'hk-status-default';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'hk-priority-critical';
      case 'High': return 'hk-priority-high';
      case 'Medium': return 'hk-priority-medium';
      case 'Low': return 'hk-priority-low';
      default: return 'hk-priority-default';
    }
  };

  return (
    <div className="hk-dashboard-container">
      {/* Dashboard Header */}
      <div className="hk-dashboard-header">
        <div className="hk-header-left">
          <h1><FaBroom /> Housekeeping Dashboard</h1>
          <p className="hk-subtitle">Manage cleaning operations, room status, and staff assignments</p>
        </div>
        <div className="hk-header-right">
          <div className="hk-date-picker">
            <FaCalendarAlt />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="hk-date-input"
            />
          </div>
          <button className="hk-btn-primary">
            <FaPlus /> New Task
          </button>
          <button className="hk-btn-secondary">
            <FaPrint /> Print Report
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="hk-stats-grid">
        <div className="hk-stat-card hk-stat-1">
          <div className="hk-stat-icon">
            <FaBed />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.totalRooms}</h3>
            <p>Total Rooms</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-up">↑ 5%</span>
          </div>
        </div>

        <div className="hk-stat-card hk-stat-2">
          <div className="hk-stat-icon">
            <FaBroom />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.cleanedToday}</h3>
            <p>Cleaned Today</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-up">↑ 12%</span>
          </div>
        </div>

        <div className="hk-stat-card hk-stat-3">
          <div className="hk-stat-icon">
            <FaClock />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.pendingCleaning}</h3>
            <p>Pending Cleaning</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-down">↓ 3%</span>
          </div>
        </div>

        <div className="hk-stat-card hk-stat-4">
          <div className="hk-stat-icon">
            <FaTools />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.underMaintenance}</h3>
            <p>Under Maintenance</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-neutral">→ 0%</span>
          </div>
        </div>

        <div className="hk-stat-card hk-stat-5">
          <div className="hk-stat-icon">
            <FaUsers />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.staffOnDuty}/12</h3>
            <p>Staff on Duty</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-up">↑ 8%</span>
          </div>
        </div>

        <div className="hk-stat-card hk-stat-6">
          <div className="hk-stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="hk-stat-content">
            <h3>{dashboardStats.complaints}</h3>
            <p>Active Complaints</p>
          </div>
          <div className="hk-stat-trend">
            <span className="hk-trend-down">↓ 2%</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="hk-tabs-container">
        <div className="hk-tabs">
          <button 
            className={`hk-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaClipboardCheck /> Overview
          </button>
          <button 
            className={`hk-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <FaBroom /> Cleaning Tasks
          </button>
          <button 
            className={`hk-tab ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <FaBed /> Room Status
          </button>
          <button 
            className={`hk-tab ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <FaUsers /> Staff Performance
          </button>
          <button 
            className={`hk-tab ${activeTab === 'supplies' ? 'active' : ''}`}
            onClick={() => setActiveTab('supplies')}
          >
            <FaToiletPaper /> Supplies
          </button>
          <button 
            className={`hk-tab ${activeTab === 'maintenance' ? 'active' : ''}`}
            onClick={() => setActiveTab('maintenance')}
          >
            <FaTools /> Maintenance
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="hk-filter-container">
        <div className="hk-search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search rooms, staff, or tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hk-search-input"
          />
        </div>
        <div className="hk-filter-group">
          <select 
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="hk-filter-select"
          >
            <option value="all">All Wards</option>
            <option value="ICU">ICU</option>
            <option value="General Ward">General Ward</option>
            <option value="OPD">OPD</option>
            <option value="Emergency">Emergency</option>
            <option value="Operation Theater">Operation Theater</option>
          </select>
          <select 
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="hk-filter-select"
          >
            <option value="all">All Staff</option>
            <option value="Rajesh Kumar">Rajesh Kumar</option>
            <option value="Priya Sharma">Priya Sharma</option>
            <option value="Amit Singh">Amit Singh</option>
            <option value="Sunita Verma">Sunita Verma</option>
            <option value="Vikram Patel">Vikram Patel</option>
          </select>
          <button className="hk-btn-filter">
            <FaFilter /> Apply Filters
          </button>
          <button className="hk-btn-export">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="hk-tab-content">
        {activeTab === 'overview' && (
          <div className="hk-overview-grid">
            {/* Current Tasks */}
            <div className="hk-section-card hk-section-wide">
              <div className="hk-section-header">
                <h3><FaBroom /> Current Cleaning Tasks</h3>
                <span className="hk-badge">{tasks.length} Total</span>
              </div>
              <div className="hk-tasks-list">
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className={`hk-task-item ${getStatusColor(task.status)}`}>
                    <div className="hk-task-info">
                      <div className="hk-task-room">
                        <strong>{task.roomNo}</strong>
                        <span className={`hk-priority-badge ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="hk-task-details">
                        <span>{task.taskType}</span>
                        <span>•</span>
                        <span>{task.ward}</span>
                        <span>•</span>
                        <span>Assigned to: {task.assignedTo}</span>
                      </div>
                    </div>
                    <div className="hk-task-status">
                      <span className={`hk-status-badge ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <div className="hk-task-actions">
                        <button className="hk-action-btn">
                          <FaEye />
                        </button>
                        <button className="hk-action-btn">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Status Overview */}
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaBed /> Room Status</h3>
              </div>
              <div className="hk-room-status-grid">
                <div className="hk-room-stat">
                  <div className="hk-room-stat-icon hk-stat-occupied">
                    <FaBed />
                  </div>
                  <div className="hk-room-stat-info">
                    <h4>{dashboardStats.occupiedRooms}</h4>
                    <p>Occupied</p>
                  </div>
                </div>
                <div className="hk-room-stat">
                  <div className="hk-room-stat-icon hk-stat-vacant">
                    <FaBed />
                  </div>
                  <div className="hk-room-stat-info">
                    <h4>{dashboardStats.vacantRooms}</h4>
                    <p>Vacant</p>
                  </div>
                </div>
                <div className="hk-room-stat">
                  <div className="hk-room-stat-icon hk-stat-cleaned">
                    <FaBroom />
                  </div>
                  <div className="hk-room-stat-info">
                    <h4>{dashboardStats.cleanedToday}</h4>
                    <p>Cleaned Today</p>
                  </div>
                </div>
                <div className="hk-room-stat">
                  <div className="hk-room-stat-icon hk-stat-pending">
                    <FaClock />
                  </div>
                  <div className="hk-room-stat-info">
                    <h4>{dashboardStats.pendingCleaning}</h4>
                    <p>Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff On Duty */}
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaUsers /> Staff On Duty</h3>
              </div>
              <div className="hk-staff-list">
                {staffPerformance.slice(0, 4).map(staff => (
                  <div key={staff.id} className="hk-staff-item">
                    <div className="hk-staff-avatar">
                      {staff.name.charAt(0)}
                    </div>
                    <div className="hk-staff-info">
                      <h4>{staff.name}</h4>
                      <p>{staff.tasksCompleted} tasks today</p>
                    </div>
                    <div className="hk-staff-rating">
                      <span className="hk-rating-badge">{staff.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="hk-tasks-container">
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaBroom /> Cleaning Tasks Management</h3>
                <button className="hk-btn-primary hk-btn-small">
                  <FaPlus /> Add New Task
                </button>
              </div>
              
              <div className="hk-tasks-table-container">
                <table className="hk-table">
                  <thead>
                    <tr>
                      <th>Room No.</th>
                      <th>Ward</th>
                      <th>Task Type</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assigned To</th>
                      <th>Start Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map(task => (
                      <tr key={task.id}>
                        <td>
                          <strong>{task.roomNo}</strong>
                        </td>
                        <td>{task.ward}</td>
                        <td>{task.taskType}</td>
                        <td>
                          <span className={`hk-priority-badge ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`hk-status-badge ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td>
                          <div className="hk-staff-assignment">
                            {task.assignedTo}
                            <select 
                              className="hk-assign-select"
                              value={task.assignedTo}
                              onChange={(e) => handleAssignTask(task.id, e.target.value)}
                            >
                              <option>Rajesh Kumar</option>
                              <option>Priya Sharma</option>
                              <option>Amit Singh</option>
                              <option>Sunita Verma</option>
                              <option>Vikram Patel</option>
                            </select>
                          </div>
                        </td>
                        <td>{task.startTime}</td>
                        <td>
                          <div className="hk-action-buttons">
                            <select 
                              className="hk-status-select"
                              value={task.status}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            >
                              <option>Pending</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                              <option>Scheduled</option>
                            </select>
                            <button className="hk-action-btn hk-btn-view">
                              <FaEye />
                            </button>
                            <button className="hk-action-btn hk-btn-edit">
                              <FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="hk-rooms-container">
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaBed /> Room Status Management</h3>
              </div>
              
              <div className="hk-rooms-table-container">
                <table className="hk-table">
                  <thead>
                    <tr>
                      <th>Room No.</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Cleaning Status</th>
                      <th>Last Cleaned</th>
                      <th>Next Cleaning</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomStatus.map(room => (
                      <tr key={room.id}>
                        <td>
                          <strong>{room.roomNo}</strong>
                        </td>
                        <td>{room.type}</td>
                        <td>
                          <span className={`hk-status-badge ${
                            room.status === 'Occupied' ? 'hk-status-occupied' : 
                            room.status === 'Vacant' ? 'hk-status-vacant' : 
                            'hk-status-default'
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td>
                          <span className={`hk-status-badge ${
                            room.cleaningStatus === 'Cleaned' ? 'hk-status-completed' :
                            room.cleaningStatus === 'In Progress' ? 'hk-status-inprogress' :
                            room.cleaningStatus === 'Pending' ? 'hk-status-pending' :
                            'hk-status-critical'
                          }`}>
                            {room.cleaningStatus}
                          </span>
                        </td>
                        <td>{room.lastCleaned}</td>
                        <td>
                          <span className={`hk-time-badge ${
                            room.nextCleaning === 'ASAP' ? 'hk-time-critical' :
                            'hk-time-normal'
                          }`}>
                            {room.nextCleaning}
                          </span>
                        </td>
                        <td>
                          <div className="hk-action-buttons">
                            <button className="hk-action-btn hk-btn-clean">
                              <FaBroom /> Clean
                            </button>
                            <button className="hk-action-btn hk-btn-view">
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="hk-staff-container">
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaUsers /> Staff Performance</h3>
              </div>
              
              <div className="hk-staff-table-container">
                <table className="hk-table">
                  <thead>
                    <tr>
                      <th>Staff Name</th>
                      <th>Tasks Completed</th>
                      <th>Efficiency</th>
                      <th>Avg. Time/Task</th>
                      <th>Rating</th>
                      <th>Current Task</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffPerformance.map(staff => (
                      <tr key={staff.id}>
                        <td>
                          <div className="hk-staff-profile">
                            <div className="hk-staff-avatar-small">
                              {staff.name.charAt(0)}
                            </div>
                            <span>{staff.name}</span>
                          </div>
                        </td>
                        <td>
                          <strong>{staff.tasksCompleted}</strong>
                        </td>
                        <td>
                          <div className="hk-efficiency-bar">
                            <div 
                              className="hk-efficiency-fill"
                              style={{ width: staff.efficiency }}
                            ></div>
                            <span>{staff.efficiency}</span>
                          </div>
                        </td>
                        <td>{staff.avgTime}</td>
                        <td>
                          <div className="hk-rating">
                            {'★'.repeat(Math.floor(parseFloat(staff.rating)))}
                            <span className="hk-rating-number">{staff.rating}</span>
                          </div>
                        </td>
                        <td>
                          {tasks.find(t => t.assignedTo === staff.name)?.roomNo || 'None'}
                        </td>
                        <td>
                          <div className="hk-action-buttons">
                            <button className="hk-action-btn hk-btn-view">
                              <FaEye /> View
                            </button>
                            <button className="hk-action-btn hk-btn-assign">
                              <FaEdit /> Assign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'supplies' && (
          <div className="hk-supplies-container">
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaToiletPaper /> Supplies Inventory</h3>
                <button className="hk-btn-primary hk-btn-small">
                  <FaPlus /> Order Supplies
                </button>
              </div>
              
              <div className="hk-supplies-table-container">
                <table className="hk-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Current Stock</th>
                      <th>Minimum Stock</th>
                      <th>Status</th>
                      <th>Last Ordered</th>
                      <th>Reorder Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplies.map(item => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.item}</strong>
                        </td>
                        <td>{item.currentStock}</td>
                        <td>{item.minStock}</td>
                        <td>
                          <span className={`hk-status-badge ${
                            item.status === 'Adequate' ? 'hk-status-completed' :
                            item.status === 'Low' ? 'hk-status-pending' :
                            'hk-status-critical'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.lastOrder}</td>
                        <td>
                          <input 
                            type="number" 
                            className="hk-quantity-input"
                            defaultValue="10"
                            min="1"
                          />
                        </td>
                        <td>
                          <div className="hk-action-buttons">
                            <button className={`hk-action-btn ${
                              item.currentStock <= item.minStock ? 
                              'hk-btn-critical' : 'hk-btn-secondary'
                            }`}>
                              {item.currentStock <= item.minStock ? 
                                'Order Now' : 'Reorder'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="hk-maintenance-container">
            <div className="hk-section-card">
              <div className="hk-section-header">
                <h3><FaTools /> Maintenance Requests</h3>
                <button className="hk-btn-primary hk-btn-small">
                  <FaPlus /> New Request
                </button>
              </div>
              
              <div className="hk-maintenance-table-container">
                <table className="hk-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Room No.</th>
                      <th>Issue</th>
                      <th>Priority</th>
                      <th>Reported By</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRequests.map(request => (
                      <tr key={request.id}>
                        <td>HK-MNT-{request.id.toString().padStart(3, '0')}</td>
                        <td>
                          <strong>{request.roomNo}</strong>
                        </td>
                        <td>{request.issue}</td>
                        <td>
                          <span className={`hk-priority-badge ${
                            request.priority === 'High' ? 'hk-priority-high' :
                            request.priority === 'Medium' ? 'hk-priority-medium' :
                            'hk-priority-low'
                          }`}>
                            {request.priority}
                          </span>
                        </td>
                        <td>{request.reportedBy}</td>
                        <td>
                          <span className={`hk-status-badge ${
                            request.status === 'Completed' ? 'hk-status-completed' :
                            request.status === 'In Progress' ? 'hk-status-inprogress' :
                            'hk-status-pending'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td>{request.date}</td>
                        <td>
                          <div className="hk-action-buttons">
                            <select 
                              className="hk-status-select"
                              value={request.status}
                              onChange={(e) => {
                                setMaintenanceRequests(maintenanceRequests.map(req =>
                                  req.id === request.id ? { ...req, status: e.target.value } : req
                                ));
                              }}
                            >
                              <option>Pending</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                            <button className="hk-action-btn hk-btn-view">
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HousekeepingDashboard;