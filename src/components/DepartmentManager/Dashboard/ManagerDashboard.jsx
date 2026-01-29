import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, FaUsers, FaUserMd, FaProcedures, 
  FaChartBar, FaCalendarAlt, FaMoneyBillWave, 
  FaBed, FaAmbulance, FaPills, FaClipboardList,
  FaBell, FaSearch, FaCog, FaSignOutAlt, FaBars,
  FaHospital, FaStethoscope, FaHeartbeat, FaPrescriptionBottle,
  FaFileInvoice, FaUserNurse, FaSyringe, FaXRay,FaBrain,FaBone, FaChild, FaAllergies
} from 'react-icons/fa';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 1245,
    totalDoctors: 86,
    availableBeds: 342,
    todayAppointments: 156,
    monthlyRevenue: 2450000,
    occupancyRate: 78,
    staffCount: 324,
    emergencyCases: 12,
    surgeriesToday: 24,
    pharmacyOrders: 45,
    labReports: 89
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, activity: "New patient admission - Mr. Sharma", time: "10:30 AM", type: "admission" },
    { id: 2, activity: "Operation theater booked for Surgery #345", time: "11:15 AM", type: "surgery" },
    { id: 3, activity: "Monthly financial report generated", time: "09:45 AM", type: "report" },
    { id: 4, activity: "Staff meeting scheduled for 3 PM", time: "Yesterday", type: "meeting" },
    { id: 5, activity: "MRI machine maintenance completed", time: "Yesterday", type: "maintenance" },
    { id: 6, activity: "New doctor joined - Dr. Verma", time: "2 days ago", type: "staff" }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Smith", doctor: "Dr. Sharma", time: "10:00 AM", status: "confirmed", department: "Cardiology" },
    { id: 2, patient: "Priya Patel", doctor: "Dr. Gupta", time: "11:30 AM", status: "pending", department: "Neurology" },
    { id: 3, patient: "Robert Kim", doctor: "Dr. Khan", time: "02:00 PM", status: "confirmed", department: "Orthopedics" },
    { id: 4, patient: "Sarah Johnson", doctor: "Dr. Reddy", time: "03:45 PM", status: "confirmed", department: "Pediatrics" },
    { id: 5, patient: "Amit Kumar", doctor: "Dr. Joshi", time: "04:30 PM", status: "pending", department: "Dermatology" }
  ]);

  const [departments, setDepartments] = useState([
    { name: "Cardiology", occupancy: 85, staff: 24, revenue: 450000 },
    { name: "Neurology", occupancy: 72, staff: 18, revenue: 380000 },
    { name: "Orthopedics", occupancy: 90, staff: 22, revenue: 520000 },
    { name: "Pediatrics", occupancy: 65, staff: 20, revenue: 310000 },
    { name: "Emergency", occupancy: 95, staff: 15, revenue: 280000 },
    { name: "Dermatology", occupancy: 60, staff: 12, revenue: 220000 }
  ]);

  const [emergencyCases, setEmergencyCases] = useState([
    { id: 1, patient: "Emergency Case #1", condition: "Critical", time: "30 mins ago", priority: "high" },
    { id: 2, patient: "Emergency Case #2", condition: "Stable", time: "1 hour ago", priority: "medium" },
    { id: 3, patient: "Emergency Case #3", condition: "Critical", time: "2 hours ago", priority: "high" }
  ]);

  // Initialize data on component mount
  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardData = () => {
      console.log("Dashboard data loaded");
    };
    
    fetchDashboardData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayAppointments: prev.todayAppointments + Math.floor(Math.random() * 3)
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="manager-dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-manager-header">
        <div className="dashboard-manager-title">
          <FaTachometerAlt className="dashboard-manager-icon" />
          <div>
            <h1>Hospital Manager Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, Hospital Administrator</p>
          </div>
        </div>
        
      </div>

      {/* Main Stats Grid */}
      <div className="dashboard-manager-stats-grid">
        <div className="stats-card-manager stats-card-primary">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaUsers />
            </div>
            <div className="stats-card-info">
              <h3>Total Patients</h3>
              <p className="stats-card-number">{formatNumber(stats.totalPatients)}</p>
              <div className="stats-card-details">
                <span className="stats-card-change positive">↑ 5.2% this month</span>
                <span className="stats-card-sub">Admitted: 245</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card-manager stats-card-secondary">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaUserMd />
            </div>
            <div className="stats-card-info">
              <h3>Active Doctors</h3>
              <p className="stats-card-number">{stats.totalDoctors}</p>
              <div className="stats-card-details">
                <span className="stats-card-change positive">↑ 2 new this week</span>
                <span className="stats-card-sub">On Duty: 68</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card-manager stats-card-tertiary">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaBed />
            </div>
            <div className="stats-card-info">
              <h3>Bed Availability</h3>
              <p className="stats-card-number">{stats.availableBeds}</p>
              <div className="stats-card-details">
                <span className="stats-card-change negative">↓ 8% occupied</span>
                <span className="stats-card-sub">Total: 1200</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card-manager stats-card-quaternary">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stats-card-info">
              <h3>Monthly Revenue</h3>
              <p className="stats-card-number">{formatCurrency(stats.monthlyRevenue)}</p>
              <div className="stats-card-details">
                <span className="stats-card-change positive">↑ 12.5% growth</span>
                <span className="stats-card-sub">Target: ₹30,00,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card-manager stats-card-fifth">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaCalendarAlt />
            </div>
            <div className="stats-card-info">
              <h3>Today's Appointments</h3>
              <p className="stats-card-number">{stats.todayAppointments}</p>
              <div className="stats-card-details">
                <span className="stats-card-change positive">↑ 8 from yesterday</span>
                <span className="stats-card-sub">Completed: 89</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card-manager stats-card-sixth">
          <div className="stats-card-content">
            <div className="stats-card-icon">
              <FaUserNurse />
            </div>
            <div className="stats-card-info">
              <h3>Total Staff</h3>
              <p className="stats-card-number">{stats.staffCount}</p>
              <div className="stats-card-details">
                <span className="stats-card-change positive">↑ 5 new hires</span>
                <span className="stats-card-sub">Nurses: 156</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Stats Section */}
      <div className="dashboard-manager-main-content">
        {/* Left Column */}
        <div className="dashboard-left-column">
          {/* Occupancy Chart */}
          <div className="dashboard-manager-chart-card">
            <div className="chart-card-header">
              <h3>Hospital Bed Occupancy</h3>
              <div className="chart-header-right">
                <span className="chart-percentage">{stats.occupancyRate}% Occupied</span>
                <select className="time-selector">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <div className="occupancy-chart">
                <div className="chart-labels">
                  <span>ICU</span>
                  <span>General</span>
                  <span>Emergency</span>
                  <span>Private</span>
                </div>
                <div className="chart-bars">
                  {[92, 75, 88, 65].map((value, index) => (
                    <div key={index} className="chart-bar-container">
                      <div className="chart-bar-background">
                        <div 
                          className="chart-bar-fill" 
                          style={{ height: `${value}%` }}
                        >
                          <span className="bar-value">{value}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-summary">
                <div className="summary-item">
                  <span className="summary-label">Total Beds</span>
                  <span className="summary-value">1200</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Available</span>
                  <span className="summary-value">{stats.availableBeds}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Occupancy Rate</span>
                  <span className="summary-value highlight">{stats.occupancyRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="dashboard-manager-departments">
            <div className="departments-header">
              <h3>Department Performance</h3>
              <button className="view-all-btn">View All Departments →</button>
            </div>
            <div className="departments-table">
              <div className="table-header">
                <div className="table-cell">Department</div>
                <div className="table-cell">Occupancy</div>
                <div className="table-cell">Staff</div>
                <div className="table-cell">Revenue</div>
              </div>
              {departments.map(dept => (
                <div key={dept.name} className="table-row">
                  <div className="table-cell department-name">
                    <div className="dept-icon">
                      {dept.name === "Cardiology" && <FaHeartbeat />}
                      {dept.name === "Neurology" && <FaBrain />}
                      {dept.name === "Orthopedics" && <FaBone />}
                      {dept.name === "Pediatrics" && <FaChild />}
                      {dept.name === "Emergency" && <FaAmbulance />}
                      {dept.name === "Dermatology" && <FaAllergies />}
                    </div>
                    <span>{dept.name}</span>
                  </div>
                  <div className="table-cell">
                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${dept.occupancy}%` }}>
                        <span className="progress-text">{dept.occupancy}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell">{dept.staff}</div>
                  <div className="table-cell revenue-cell">{formatCurrency(dept.revenue)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right-column">
          {/* Today's Appointments */}
          <div className="dashboard-manager-appointments">
            <div className="appointments-header">
              <h3>Today's Appointments</h3>
              <div className="header-actions">
                <span className="appointments-count">{appointments.length} appointments</span>
                <button className="add-appointment-btn">+ New</button>
              </div>
            </div>
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-time">
                    <FaCalendarAlt />
                    <span className="time-slot">{appointment.time}</span>
                  </div>
                  <div className="appointment-details">
                    <div className="patient-info">
                      <h4>{appointment.patient}</h4>
                      <p className="doctor-name">With {appointment.doctor}</p>
                    </div>
                    <div className="department-info">
                      <span className="department-badge">{appointment.department}</span>
                    </div>
                  </div>
                  <div className={`appointment-status ${appointment.status}`}>
                    <span>{appointment.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="appointments-footer">
              <button className="view-calendar-btn">View Full Calendar →</button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-manager-activities">
            <div className="activities-header">
              <h3>Recent Activities</h3>
              <button className="refresh-btn">
                <FaCog className="refresh-icon" /> Refresh
              </button>
            </div>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'admission' && <FaProcedures />}
                    {activity.type === 'surgery' && <FaSyringe />}
                    {activity.type === 'report' && <FaChartBar />}
                    {activity.type === 'meeting' && <FaUsers />}
                    {activity.type === 'maintenance' && <FaCog />}
                    {activity.type === 'staff' && <FaUserMd />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.activity}</p>
                    <div className="activity-footer">
                      <span className="activity-time">
                        <FaCalendarAlt /> {activity.time}
                      </span>
                      <span className="activity-type">{activity.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Cases */}
          <div className="dashboard-emergency-cases">
            <div className="emergency-header">
              <h3>Emergency Cases</h3>
              <span className="emergency-count">{stats.emergencyCases} active</span>
            </div>
            <div className="emergency-list">
              {emergencyCases.map(caseItem => (
                <div key={caseItem.id} className={`emergency-item priority-${caseItem.priority}`}>
                  <div className="emergency-info">
                    <h4>{caseItem.patient}</h4>
                    <p className="emergency-condition">{caseItem.condition}</p>
                    <span className="emergency-time">{caseItem.time}</span>
                  </div>
                  <div className="emergency-action">
                    <button className="action-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-manager-quick-actions">
        <div className="actions-header">
          <h3>Quick Actions</h3>
          <p className="actions-subtitle">Manage your hospital operations</p>
        </div>
        <div className="actions-grid">
          <button className="quick-action-btn">
            <FaChartBar />
            <span>Generate Reports</span>
            <p className="action-desc">Monthly financial & operational reports</p>
          </button>
          <button className="quick-action-btn">
            <FaCalendarAlt />
            <span>Schedule Meetings</span>
            <p className="action-desc">Staff meetings and appointments</p>
          </button>
          <button className="quick-action-btn">
            <FaMoneyBillWave />
            <span>Financial Overview</span>
            <p className="action-desc">Revenue, expenses, and budgets</p>
          </button>
          <button className="quick-action-btn">
            <FaUsers />
            <span>Staff Management</span>
            <p className="action-desc">Doctors, nurses, and staff</p>
          </button>
          <button className="quick-action-btn">
            <FaBed />
            <span>Bed Management</span>
            <p className="action-desc">Allocate and track beds</p>
          </button>
          <button className="quick-action-btn">
            <FaAmbulance />
            <span>Emergency Control</span>
            <p className="action-desc">Monitor emergency cases</p>
          </button>
          <button className="quick-action-btn">
            <FaHospital />
            <span>Inventory</span>
            <p className="action-desc">Medical supplies and equipment</p>
          </button>
          <button className="quick-action-btn">
            <FaFileInvoice />
            <span>Billing</span>
            <p className="action-desc">Patient billing and invoices</p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-manager-footer">
        <div className="footer-content">
          <div className="md-footer-section">
            <h4>Hospital Status</h4>
            <p>All systems operational</p>
            <span className="status-indicator active"></span>
          </div>
          <div className="md-footer-section">
            <h4>Last Updated</h4>
            <p>{new Date().toLocaleTimeString('en-IN')}</p>
          </div>
          <div className="md-footer-section">
            <h4>Support</h4>
            <p>Contact: support@hospital.com</p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2024 Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;