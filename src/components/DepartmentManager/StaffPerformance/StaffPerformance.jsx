import React, { useState, useEffect } from 'react';
import {
  FaUserMd, FaUserNurse, FaUsers, FaChartLine, FaChartBar,
  FaChartPie, FaStar, FaTrophy, FaMedal, FaAward,
  FaCalendarAlt, FaFilter, FaSearch, FaEye, FaEdit,
  FaTrash, FaDownload, FaPrint, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaClock, FaCalendarCheck, FaUserCheck,
  FaUserTimes, FaProcedures, FaStethoscope, FaHeartbeat,
  FaBriefcaseMedical, FaClipboardCheck, FaNotesMedical,
  FaFileMedical, FaCommentDots, FaUserPlus, FaUserEdit,
  FaUserSlash, FaUserGraduate, FaUserFriends, FaUserClock,
  FaUserCog, FaUserShield, FaUserTag, FaUserInjured
} from 'react-icons/fa';
import './StaffPerformance.css';

const StaffPerformance = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('doctors');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Performance Overview Statistics
  const [performanceStats, setPerformanceStats] = useState({
    totalStaff: 324,
    doctors: 86,
    nurses: 156,
    technicians: 45,
    administrative: 37,
    averageRating: 4.7,
    onTimeAttendance: 94.2,
    patientSatisfaction: 96.8,
    efficiencyScore: 91.5
  });

  // Staff Data
  const [doctorsPerformance] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      department: "Cardiology",
      designation: "Senior Consultant",
      experience: "15 years",
      totalPatients: 1245,
      surgeries: 320,
      successRate: 98.5,
      patientSatisfaction: 99.2,
      attendance: 97.8,
      rating: 4.9,
      efficiency: 95.6,
      status: "excellent",
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      department: "Neurology",
      designation: "Head of Department",
      experience: "18 years",
      totalPatients: 1890,
      surgeries: 450,
      successRate: 97.8,
      patientSatisfaction: 98.7,
      attendance: 96.4,
      rating: 4.8,
      efficiency: 94.2,
      status: "excellent",
      color: "#4ECDC4"
    },
    {
      id: 3,
      name: "Dr. Amit Kumar",
      department: "Orthopedics",
      designation: "Consultant",
      experience: "12 years",
      totalPatients: 1560,
      surgeries: 380,
      successRate: 96.5,
      patientSatisfaction: 97.3,
      attendance: 95.2,
      rating: 4.6,
      efficiency: 92.8,
      status: "good",
      color: "#FFD166"
    },
    {
      id: 4,
      name: "Dr. Neha Gupta",
      department: "Pediatrics",
      designation: "Senior Pediatrician",
      experience: "14 years",
      totalPatients: 2100,
      surgeries: 0,
      successRate: 99.1,
      patientSatisfaction: 99.5,
      attendance: 98.3,
      rating: 4.9,
      efficiency: 96.4,
      status: "excellent",
      color: "#06D6A0"
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      department: "Emergency",
      designation: "Emergency Specialist",
      experience: "10 years",
      totalPatients: 2850,
      surgeries: 210,
      successRate: 95.8,
      patientSatisfaction: 96.2,
      attendance: 94.7,
      rating: 4.5,
      efficiency: 91.3,
      status: "good",
      color: "#118AB2"
    }
  ]);

  const [nursesPerformance] = useState([
    {
      id: 1,
      name: "Nurse Sarah Johnson",
      department: "ICU",
      designation: "Head Nurse",
      experience: "12 years",
      patientsHandled: 2850,
      procedures: 1560,
      patientSatisfaction: 98.5,
      attendance: 97.2,
      rating: 4.8,
      efficiency: 94.6,
      status: "excellent",
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Nurse Michael Chen",
      department: "Emergency",
      designation: "Senior Nurse",
      experience: "8 years",
      patientsHandled: 3210,
      procedures: 1890,
      patientSatisfaction: 97.8,
      attendance: 96.4,
      rating: 4.7,
      efficiency: 93.2,
      status: "good",
      color: "#4ECDC4"
    },
    {
      id: 3,
      name: "Nurse Emma Wilson",
      department: "Pediatrics",
      designation: "Pediatric Nurse",
      experience: "6 years",
      patientsHandled: 1980,
      procedures: 1050,
      patientSatisfaction: 99.1,
      attendance: 98.1,
      rating: 4.9,
      efficiency: 95.8,
      status: "excellent",
      color: "#FFD166"
    }
  ]);

  const [techniciansPerformance] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      department: "Radiology",
      designation: "Senior Technician",
      experience: "10 years",
      testsConducted: 12500,
      accuracy: 99.2,
      equipmentHandled: 8,
      attendance: 96.8,
      rating: 4.7,
      efficiency: 94.3,
      status: "excellent",
      color: "#06D6A0"
    }
  ]);

  const [adminPerformance] = useState([
    {
      id: 1,
      name: "Anil Mehta",
      department: "Administration",
      designation: "Administrative Manager",
      experience: "15 years",
      tasksCompleted: 1250,
      efficiency: 96.8,
      attendance: 98.2,
      rating: 4.8,
      status: "excellent",
      color: "#EF476F"
    }
  ]);

  // Performance Trends
  const [performanceTrends] = useState([
    { month: 'Jan', doctors: 4.8, nurses: 4.6, technicians: 4.5, admin: 4.7 },
    { month: 'Feb', doctors: 4.9, nurses: 4.7, technicians: 4.6, admin: 4.8 },
    { month: 'Mar', doctors: 4.7, nurses: 4.8, technicians: 4.7, admin: 4.9 },
    { month: 'Apr', doctors: 4.8, nurses: 4.9, technicians: 4.8, admin: 4.8 },
    { month: 'May', doctors: 4.9, nurses: 4.8, technicians: 4.7, admin: 4.7 },
    { month: 'Jun', doctors: 4.8, nurses: 4.7, technicians: 4.6, admin: 4.6 },
    { month: 'Jul', doctors: 4.9, nurses: 4.9, technicians: 4.8, admin: 4.9 }
  ]);

  // Departments List
  const departments = [
    'All Departments', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Emergency', 'Dermatology', 'Radiology', 'Gynecology', 'ICU', 'Lab', 'Administration'
  ];

  // Rating Categories
  const ratingCategories = [
    { label: 'Poor', min: 0, max: 2.9, color: '#FF6B6B' },
    { label: 'Average', min: 3, max: 3.9, color: '#FFD166' },
    { label: 'Good', min: 4, max: 4.4, color: '#4ECDC4' },
    { label: 'Excellent', min: 4.5, max: 5, color: '#06D6A0' }
  ];

  // Awards and Recognitions
  const [awards] = useState([
    {
      id: 1,
      staffName: "Dr. Rajesh Sharma",
      award: "Best Doctor of the Year 2023",
      date: "2023-12-15",
      category: "Excellence in Service",
      icon: <FaTrophy />
    },
    {
      id: 2,
      staffName: "Nurse Sarah Johnson",
      award: "Nursing Excellence Award",
      date: "2023-11-20",
      category: "Patient Care",
      icon: <FaMedal />
    },
    {
      id: 3,
      staffName: "Dr. Priya Patel",
      award: "Research Excellence Award",
      date: "2023-10-05",
      category: "Medical Research",
      icon: <FaAward />
    }
  ]);

  // Get current staff data based on active tab
  const getCurrentStaffData = () => {
    switch (activeTab) {
      case 'doctors': return doctorsPerformance;
      case 'nurses': return nursesPerformance;
      case 'technicians': return techniciansPerformance;
      case 'admin': return adminPerformance;
      default: return doctorsPerformance;
    }
  };

  // Filter staff data
  const getFilteredStaffData = () => {
    let data = getCurrentStaffData();
    
    if (selectedDepartment !== 'all') {
      data = data.filter(staff => staff.department === selectedDepartment);
    }
    
    if (searchTerm) {
      data = data.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return data;
  };

  // Calculate performance metrics
  const calculateMetrics = () => {
    const data = getFilteredStaffData();
    if (data.length === 0) return {};
    
    const totalRating = data.reduce((sum, staff) => sum + staff.rating, 0);
    const totalEfficiency = data.reduce((sum, staff) => sum + (staff.efficiency || 0), 0);
    const totalAttendance = data.reduce((sum, staff) => sum + (staff.attendance || 0), 0);
    
    return {
      avgRating: (totalRating / data.length).toFixed(1),
      avgEfficiency: (totalEfficiency / data.length).toFixed(1),
      avgAttendance: (totalAttendance / data.length).toFixed(1),
      totalStaff: data.length
    };
  };

  // Calculate category distribution
  const calculateCategoryDistribution = () => {
    const data = getFilteredStaffData();
    const distribution = {
      excellent: 0,
      good: 0,
      average: 0,
      needs_improvement: 0
    };
    
    data.forEach(staff => {
      if (staff.rating >= 4.5) distribution.excellent++;
      else if (staff.rating >= 4.0) distribution.good++;
      else if (staff.rating >= 3.0) distribution.average++;
      else distribution.needs_improvement++;
    });
    
    return distribution;
  };

  // Helper functions
  const formatPercentage = (value) => `${value}%`;

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#2196F3';
      case 'average': return '#FF9800';
      case 'needs_improvement': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'average': return 'Average';
      case 'needs_improvement': return 'Needs Improvement';
      default: return 'Unknown';
    }
  };

  const handleViewPerformance = (staff) => {
    setSelectedStaff(staff);
    alert(`Viewing performance details for ${staff.name}`);
  };

  const handleAddReview = (staff) => {
    setSelectedStaff(staff);
    alert(`Adding review for ${staff.name}`);
  };

  const handleSendMessage = (staff) => {
    alert(`Opening chat with ${staff.name}`);
  };

  const handleScheduleMeeting = (staff) => {
    alert(`Scheduling meeting with ${staff.name}`);
  };

  const handleDownloadReport = () => {
    alert('Downloading performance report...');
  };

  const handlePrintReport = () => {
    alert('Printing performance report...');
  };

  const metrics = calculateMetrics();
  const categoryDistribution = calculateCategoryDistribution();

  return (
    <div className="staff-performance-container">
      {/* Header */}
      <div className="staff-performance-header">
        <div className="header-left">
          <FaUsers className="header-icon" />
          <div>
            <h1>Staff Performance Management</h1>
            <p className="header-subtitle">Monitor and manage staff performance metrics</p>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-download-report" onClick={handleDownloadReport}>
            <FaDownload /> Download Report
          </button>
          <button className="btn-print-report" onClick={handlePrintReport}>
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="performance-overview-grid">
        <div className="perf-card perf-card-total">
          <div className="perf-card-header">
            <h3>Total Staff</h3>
            <FaUsers className="manager-card-icon" />
          </div>
          <div className="perf-card-content">
            <p className="perf-number">{performanceStats.totalStaff}</p>
            <div className="perf-breakdown">
              <span className="breakdown-item">
                <FaUserMd /> {performanceStats.doctors} Doctors
              </span>
              <span className="breakdown-item">
                <FaUserNurse /> {performanceStats.nurses} Nurses
              </span>
            </div>
          </div>
        </div>

        <div className="perf-card perf-card-rating">
          <div className="perf-card-header">
            <h3>Average Rating</h3>
            <FaStar className="manager-card-icon" />
          </div>
          <div className="perf-card-content">
            <div className="rating-display">
              <span className="rating-value">{performanceStats.averageRating}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${i < Math.floor(performanceStats.averageRating) ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
            <span className="rating-change positive">
              +0.2 from last month
            </span>
          </div>
        </div>

        <div className="perf-card perf-card-attendance">
          <div className="perf-card-header">
            <h3>On-Time Attendance</h3>
            <FaCalendarCheck className="manager-card-icon" />
          </div>
          <div className="perf-card-content">
            <p className="perf-number">{formatPercentage(performanceStats.onTimeAttendance)}</p>
            <div className="attendance-progress">
              <div 
                className="progress-bar"
                style={{ width: `${performanceStats.onTimeAttendance}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="perf-card perf-card-satisfaction">
          <div className="perf-card-header">
            <h3>Patient Satisfaction</h3>
            <FaHeartbeat className="manager-card-icon" />
          </div>
          <div className="perf-card-content">
            <p className="perf-number">{formatPercentage(performanceStats.patientSatisfaction)}</p>
            <span className="satisfaction-change positive">
              +1.2% improvement
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="staff-performance-main">
        {/* Left Sidebar - Filters and Stats */}
        <div className="performance-sidebar">
          {/* Department Filter */}
          <div className="sidebar-section">
            <h3>Department Filter</h3>
            <div className="department-filter">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="dept-select"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept === 'All Departments' ? 'all' : dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Period Filter */}
          <div className="sidebar-section">
            <h3>Time Period</h3>
            <div className="time-period-filter">
              {['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].map(period => (
                <button
                  key={period}
                  className={`period-btn ${timePeriod === period ? 'active' : ''}`}
                  onClick={() => setTimePeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Categories */}
          <div className="sidebar-section">
            <h3>Performance Categories</h3>
            <div className="performance-categories">
              {ratingCategories.map(category => (
                <div key={category.label} className="category-item">
                  <div 
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="category-label">{category.label}</span>
                  <span className="category-range">
                    {category.min} - {category.max}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sidebar-section">
            <h3>Quick Stats</h3>
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Avg. Rating</span>
                <span className="stat-value">{metrics.avgRating || '0.0'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg. Efficiency</span>
                <span className="stat-value">{metrics.avgEfficiency || '0.0'}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg. Attendance</span>
                <span className="stat-value">{metrics.avgAttendance || '0.0'}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Staff Count</span>
                <span className="stat-value">{metrics.totalStaff || '0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="performance-content">
          {/* Tabs Navigation */}
          <div className="performance-tabs">
            <button 
              className={`perf-tab ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              <FaUserMd /> Doctors
            </button>
            <button 
              className={`perf-tab ${activeTab === 'nurses' ? 'active' : ''}`}
              onClick={() => setActiveTab('nurses')}
            >
              <FaUserNurse /> Nurses
            </button>
            <button 
              className={`perf-tab ${activeTab === 'technicians' ? 'active' : ''}`}
              onClick={() => setActiveTab('technicians')}
            >
              <FaUserCog /> Technicians
            </button>
            <button 
              className={`perf-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <FaUserShield /> Admin
            </button>
          </div>

          {/* Search and Actions Bar */}
          <div className="performance-actions-bar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search staff by name, department, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table View
              </button>
            </div> */}
          </div>

          {/* Performance Grid/Table */}
          {viewMode === 'grid' ? (
            <div className="performance-grid">
              {getFilteredStaffData().map(staff => (
                <div key={staff.id} className="staff-card">
                  <div className="staff-card-header" style={{ backgroundColor: `${staff.color}20` }}>
                    <div className="staff-avatar">
                      <FaUserMd />
                    </div>
                    <div className="staff-basic-info">
                      <h4>{staff.name}</h4>
                      <p className="staff-designation">{staff.designation}</p>
                      <p className="staff-department">{staff.department}</p>
                    </div>
                    <div className="staff-rating">
                      <span className="rating-value">{staff.rating}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`star ${i < Math.floor(staff.rating) ? 'filled' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="staff-card-body">
                    <div className="performance-metrics">
                      <div className="metric-item">
                        <span className="metric-label">Experience</span>
                        <span className="metric-value">{staff.experience}</span>
                      </div>
                      {staff.totalPatients && (
                        <div className="metric-item">
                          <span className="metric-label">Patients</span>
                          <span className="metric-value">{staff.totalPatients}</span>
                        </div>
                      )}
                      {staff.surgeries !== undefined && (
                        <div className="metric-item">
                          <span className="metric-label">Surgeries</span>
                          <span className="metric-value">{staff.surgeries}</span>
                        </div>
                      )}
                      {staff.patientsHandled && (
                        <div className="metric-item">
                          <span className="metric-label">Handled</span>
                          <span className="metric-value">{staff.patientsHandled}</span>
                        </div>
                      )}
                      <div className="metric-item">
                        <span className="metric-label">Efficiency</span>
                        <span className="metric-value">{staff.efficiency}%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Attendance</span>
                        <span className="metric-value">{staff.attendance}%</span>
                      </div>
                    </div>

                    <div className="performance-progress">
                      <div className="progress-item">
                        <span>Satisfaction</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${staff.patientSatisfaction}%` }}
                          ></div>
                        </div>
                        <span className="progress-value">{staff.patientSatisfaction}%</span>
                      </div>
                      {staff.successRate && (
                        <div className="progress-item">
                          <span>Success Rate</span>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${staff.successRate}%` }}
                            ></div>
                          </div>
                          <span className="progress-value">{staff.successRate}%</span>
                        </div>
                      )}
                      {staff.accuracy && (
                        <div className="progress-item">
                          <span>Accuracy</span>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${staff.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="progress-value">{staff.accuracy}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="staff-card-footer">
                    <div className="status-badge" style={{ backgroundColor: getStatusColor(staff.status) }}>
                      {getStatusText(staff.status)}
                    </div>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewPerformance(staff)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn review"
                        onClick={() => handleAddReview(staff)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn message"
                        onClick={() => handleSendMessage(staff)}
                      >
                        <FaEnvelope />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="performance-table-container">
              <table className="performance-table response">
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Efficiency</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredStaffData().map(staff => (
                    <tr key={staff.id}>
                      <td>
                        <div className="staff-info-cell">
                          <div className="staff-avatar-small">
                            <FaUserMd />
                          </div>
                          <div>
                            <div className="staff-name">{staff.name}</div>
                            <div className="staff-details">
                              {staff.totalPatients && <span>{staff.totalPatients} patients</span>}
                              {staff.surgeries > 0 && <span>{staff.surgeries} surgeries</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="department-badge">{staff.department}</span>
                      </td>
                      <td>{staff.designation}</td>
                      <td>{staff.experience}</td>
                      <td>
                        <div className="rating-cell">
                          <span className="rating-value">{staff.rating}</span>
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`star ${i < Math.floor(staff.rating) ? 'filled' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="efficiency-cell">
                          <div className="efficiency-bar">
                            <div 
                              className="efficiency-fill"
                              style={{ width: `${staff.efficiency}%` }}
                            ></div>
                          </div>
                          <span>{staff.efficiency}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="attendance-cell">
                          <FaCalendarCheck />
                          <span>{staff.attendance}%</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="status-badge-table"
                          style={{ backgroundColor: getStatusColor(staff.status) }}
                        >
                          {getStatusText(staff.status)}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-btn view"
                            onClick={() => handleViewPerformance(staff)}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-btn review"
                            onClick={() => handleAddReview(staff)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn schedule"
                            onClick={() => handleScheduleMeeting(staff)}
                          >
                            <FaCalendarAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Performance Insights */}
          <div className="performance-insights">
            <div className="insights-header">
              <h3>Performance Insights</h3>
              <span className="insights-period">Last 7 months</span>
            </div>
            <div className="insights-content">
              <div className="trend-chart">
                <div className="chart-lines">
                  {performanceTrends.map((trend, index) => (
                    <div key={trend.month} className="chart-point">
                      <div className="point-doctors" style={{ height: `${trend.doctors * 20}%` }}></div>
                      <div className="point-nurses" style={{ height: `${trend.nurses * 20}%` }}></div>
                      <div className="point-technicians" style={{ height: `${trend.technicians * 20}%` }}></div>
                      <span className="point-label">{trend.month}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color doctors"></div>
                    <span>Doctors</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color nurses"></div>
                    <span>Nurses</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color technicians"></div>
                    <span>Technicians</span>
                  </div>
                </div>
              </div>

              <div className="category-distribution">
                <h4>Performance Distribution</h4>
                <div className="distribution-chart">
                  {Object.entries(categoryDistribution).map(([category, count]) => (
                    <div key={category} className="distribution-item">
                      <div className="distribution-label">
                        <div 
                          className="distribution-color"
                          style={{ backgroundColor: getStatusColor(category) }}
                        ></div>
                        <span>{category.replace('_', ' ').toUpperCase()}</span>
                      </div>
                      <div className="distribution-bar">
                        <div 
                          className="distribution-fill"
                          style={{ 
                            width: `${(count / metrics.totalStaff) * 100}%`,
                            backgroundColor: getStatusColor(category)
                          }}
                        ></div>
                        <span className="distribution-count">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards and Recognitions */}
          <div className="awards-section">
            <div className="section-header">
              <h3>
                <FaTrophy className="trophy-icon" />
                Awards & Recognitions
              </h3>
              <button className="btn-view-all">View All →</button>
            </div>
            <div className="awards-grid">
              {awards.map(award => (
                <div key={award.id} className="award-card">
                  <div className="award-icon">
                    {award.icon}
                  </div>
                  <div className="award-content">
                    <h4>{award.award}</h4>
                    <p className="award-recipient">{award.staffName}</p>
                    <div className="award-meta">
                      <span className="award-category">{award.category}</span>
                      <span className="award-date">{new Date(award.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPerformance;