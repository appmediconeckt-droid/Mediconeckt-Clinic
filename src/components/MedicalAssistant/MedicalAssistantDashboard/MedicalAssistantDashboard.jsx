import React, { useState, useEffect } from 'react';
import './MedicalAssistantDashboard.css';
import { 
  FiHome, FiUsers, FiCalendar, FiPackage, 
  FiFileText, FiSettings, FiBell, FiChevronDown,
  FiActivity, FiTrendingUp, FiTrendingDown,
  FiMenu, FiX, FiUser, FiPlus,
  FiBarChart2, FiPieChart
} from 'react-icons/fi';
import { 
  FaHospital, FaUserMd, FaBed, FaPills,
  FaAmbulance, FaChartLine, FaChartBar,
  FaUserInjured, FaClipboardList, FaPrescription,
  FaCalendarAlt, FaNotesMedical, FaStethoscope,
  FaFileMedical
} from 'react-icons/fa';

const AssistantDashboard = () => {
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [currentDate, setCurrentDate] = useState('');
  
  // Dashboard Data
  const dashboardCards = [
    {
      id: 1,
      title: 'Total Patients Today',
      value: '1,248',
      icon: <FiUsers />,
      color: '#a78bfa',
      trend: '+12%',
      trendUp: true,
      description: 'Active patients registered today',
      time: 'Last 24 hours'
    },
    {
      id: 2,
      title: 'Appointments Scheduled',
      value: '86',
      icon: <FaCalendarAlt />,
      color: '#8b5cf6',
      trend: '+5%',
      trendUp: true,
      description: 'Appointments scheduled for today',
      time: 'Today'
    },
    {
      id: 3,
      title: 'Available Beds',
      value: '42',
      icon: <FaBed />,
      color: '#7c3aed',
      trend: '-3%',
      trendUp: false,
      description: 'Out of 200 total hospital beds',
      time: 'Current status'
    },
    {
      id: 4,
      title: 'Emergency Cases',
      value: '18',
      icon: <FaAmbulance />,
      color: '#ef4444',
      trend: '+8%',
      trendUp: true,
      description: 'Requiring immediate attention',
      time: 'Today'
    },
    {
      id: 5,
      title: 'Pending Tests',
      value: '156',
      icon: <FaFileMedical />,
      color: '#10b981',
      trend: '+15%',
      trendUp: true,
      description: 'Lab tests awaiting results',
      time: 'This week'
    },
    {
      id: 6,
      title: 'Pharmacy Orders',
      value: '89',
      icon: <FaPills />,
      color: '#f59e0b',
      trend: '+7%',
      trendUp: true,
      description: 'Medications to be dispensed',
      time: 'Last 24 hours'
    }
  ];

  const patientData = [
    { 
      id: 'P001', 
      name: 'John Smith', 
      age: 45, 
      condition: 'Fever & Cold', 
      doctor: 'Dr. Sharma', 
      status: 'admitted',
      admissionDate: '2024-01-20',
      room: 'Room 101'
    },
    { 
      id: 'P002', 
      name: 'Emma Wilson', 
      age: 32, 
      condition: 'Fractured Arm', 
      doctor: 'Dr. Patel', 
      status: 'admitted',
      admissionDate: '2024-01-21',
      room: 'Room 205'
    },
    { 
      id: 'P003', 
      name: 'Robert Brown', 
      age: 58, 
      condition: 'Diabetes Checkup', 
      doctor: 'Dr. Gupta', 
      status: 'discharged',
      admissionDate: '2024-01-18',
      room: 'Discharged'
    },
    { 
      id: 'P004', 
      name: 'Sarah Johnson', 
      age: 29, 
      condition: 'Pneumonia', 
      doctor: 'Dr. Kumar', 
      status: 'admitted',
      admissionDate: '2024-01-22',
      room: 'Room 312'
    },
    { 
      id: 'P005', 
      name: 'Michael Chen', 
      age: 65, 
      condition: 'Heart Checkup', 
      doctor: 'Dr. Singh', 
      status: 'pending',
      admissionDate: '2024-01-23',
      room: 'Waiting'
    },
    { 
      id: 'P006', 
      name: 'Lisa Anderson', 
      age: 41, 
      condition: 'Post Surgery', 
      doctor: 'Dr. Reddy', 
      status: 'admitted',
      admissionDate: '2024-01-19',
      room: 'Room 108'
    },
  ];

  const quickActions = [
    { id: 1, label: 'Schedule Appointment', icon: <FiCalendar /> },
    { id: 2, label: 'Add New Patient', icon: <FiUser /> },
    { id: 3, label: 'Check Pharmacy', icon: <FaPills /> },
    { id: 4, label: 'Generate Report', icon: <FiFileText /> },
    { id: 5, label: 'Update Inventory', icon: <FiPackage /> },
    { id: 6, label: 'View Lab Results', icon: <FaFileMedical /> }
  ];

  // Set current date
  useEffect(() => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    // In real app, this would mark notifications as read
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'admitted': return 'assistant-status-admitted';
      case 'discharged': return 'assistant-status-discharged';
      case 'pending': return 'assistant-status-pending';
      default: return 'assistant-status-pending';
    }
  };

  const getCardIconStyle = (color) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
  });

  return (
    <div className="assistant-dashboard-wrapper">
     
    
      <div className="assistant-main-content ">
       
        {/* Dashboard Content */}
        <div className="assistant-dashboard-content">
          {/* Welcome Section */}
          <div className="assistant-welcome-section">
            <h2 className="assistant-welcome-title">Welcome back, Medical Assistant!</h2>
            <p className="assistant-welcome-subtitle">
              Here's an overview of today's hospital activities, patient statistics, 
              and important updates that require your attention.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="assistant-cards-grid">
            {dashboardCards.map(card => (
              <div key={card.id} className="assistant-dashboard-card">
                <div className="assistant-card-header">
                  <h3 className="assistant-card-title">{card.title}</h3>
                  <div className="assistant-card-icon" style={getCardIconStyle(card.color)}>
                    {card.icon}
                  </div>
                </div>
                <div className="assistant-card-content">
                  <div className="assistant-card-value">{card.value}</div>
                  <div className="assistant-card-description">{card.description}</div>
                </div>
                <div className="assistant-card-footer">
                  <span className={`assistant-card-trend ${card.trendUp ? 'assistant-trend-up' : 'assistant-trend-down'}`}>
                    {card.trendUp ? <FiTrendingUp /> : <FiTrendingDown />}
                    {card.trend}
                  </span>
                  <span className="assistant-card-time">{card.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="assistant-charts-section">
            <div className="assistant-chart-container">
              <div className="assistant-chart-header">
                <h3 className="assistant-chart-title">Patient Admission Statistics</h3>
                <select className="assistant-chart-filter">
                  <option>Last 7 days</option>
                  <option>Last month</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="assistant-chart-placeholder">
                <FaChartLine className="assistant-chart-icon" />
                <p>Patient admission trends and statistics visualization</p>
              </div>
            </div>
            
            <div className="assistant-chart-container">
              <div className="assistant-chart-header">
                <h3 className="assistant-chart-title">Department Workload Distribution</h3>
                <select className="assistant-chart-filter">
                  <option>Today</option>
                  <option>This week</option>
                  <option>This month</option>
                </select>
              </div>
              <div className="assistant-chart-placeholder">
                <FaChartBar className="assistant-chart-icon" />
                <p>Department-wise patient load and resource allocation</p>
              </div>
            </div>
          </div>

          {/* Patient Table */}
          <div className="assistant-table-section">
            <div className="assistant-table-header">
              <h3 className="assistant-table-title">Recent Patients Overview</h3>
              <button className="assistant-view-all-button">
                View All Patients <FiChevronDown />
              </button>
            </div>
            
            <div className="assistant-table-container">
              <table className="assistant-data-table">
                <thead>
                  <tr>
                    <th className="assistant-table-header-cell">Patient ID</th>
                    <th className="assistant-table-header-cell">Name</th>
                    <th className="assistant-table-header-cell">Age</th>
                    <th className="assistant-table-header-cell">Condition</th>
                    <th className="assistant-table-header-cell">Doctor</th>
                    <th className="assistant-table-header-cell">Room</th>
                    <th className="assistant-table-header-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.map(patient => (
                    <tr key={patient.id} className="assistant-table-row">
                      <td className="assistant-table-cell"><strong>{patient.id}</strong></td>
                      <td className="assistant-table-cell">{patient.name}</td>
                      <td className="assistant-table-cell">{patient.age}</td>
                      <td className="assistant-table-cell">{patient.condition}</td>
                      <td className="assistant-table-cell">{patient.doctor}</td>
                      <td className="assistant-table-cell">{patient.room}</td>
                      <td className="assistant-table-cell">
                        <span className={`assistant-status-badge ${getStatusBadgeClass(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="assistant-actions-section">
            <h3 className="assistant-actions-title">Quick Actions</h3>
            <div className="assistant-actions-grid">
              {quickActions.map(action => (
                <button key={action.id} className="assistant-action-button">
                  <span className="assistant-action-icon">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;