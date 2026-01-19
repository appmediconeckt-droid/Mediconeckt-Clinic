import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  Stethoscope, 
  AlertCircle, 
  BarChart3, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Bed,
  Heart,
  PieChart,
  User,
  Shield,
  ClipboardCheck,
  PhoneCall,
  Building
} from 'lucide-react';
import {
  FaUserInjured,
  FaUserMd,
  FaUserNurse,
  FaUsers,
  FaMicroscope,
  FaBroom,
  FaUserTie,
  FaFileInvoiceDollar,
  FaUserShield,
  FaCaretDown
} from 'react-icons/fa';
import './AdminDashboard.css';

const HospitalDashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Staff data for all roles
  const staffData = {
    patient: { count: 2450, active: 156, label: "Patients", icon: <FaUserInjured />, color: "#8af5aaff" },
    doctor: { count: 87, active: 24, label: "Doctors", icon: <FaUserMd />, color: "#a8d8ff" },
    nurse: { count: 156, active: 89, label: "Nurses", icon: <FaUserNurse />, color: "#ffd6e7" },
    assistant: { count: 45, active: 32, label: "Medical Assistants", icon: <FaUsers />, color: "#e0d1ff" },
    technician: { count: 28, active: 18, label: "Lab Technicians", icon: <FaMicroscope />, color: "#ffe4c9" },
    housekeeping: { count: 65, active: 42, label: "Housekeeping Staff", icon: <FaBroom />, color: "#fff9c9" },
    supervisor: { count: 15, active: 12, label: "Supervisors", icon: <FaUserTie />, color: "#b2ebf2" },
    manager: { count: 8, active: 8, label: "Department Managers", icon: <FaUserTie />, color: "#e6e6ff" },
    billing: { count: 12, active: 9, label: "Billing Staff", icon: <FaFileInvoiceDollar />, color: "#c8f7c5" },
    admin: { count: 5, active: 3, label: "Admin Staff", icon: <FaUserShield />, color: "#e3f2fd" }
  };

  // Mock data for the dashboard
  const dashboardData = {
    appointments: {
      today: 48,
      upcoming: 23,
      completed: 32,
      cancelled: 5
    },
    patients: {
      total: 2450,
      opd: 156,
      ipd: 89,
      emergency: 12,
      discharged: 42,
      newToday: 28
    },
    revenue: {
      daily: 125400,
      monthly: 3250000,
      pendingBills: 234500,
      collected: 3015500
    },
    doctors: {
      total: 87,
      available: 24,
      onDuty: 18,
      onLeave: 6,
      specialists: 12
    },
    emergency: {
      active: 8,
      critical: 3,
      stable: 5,
      bedsAvailable: 15
    },
    staff: {
      total: 1421,
      active: 393,
      departments: 12
    }
  };

  // Today's appointments detailed data
  const todaysAppointments = [
    { id: 1, patient: "Rajesh Kumar", doctor: "Dr. Sharma", time: "09:30 AM", type: "OPD", status: "completed" },
    { id: 2, patient: "Priya Singh", doctor: "Dr. Gupta", time: "10:15 AM", type: "OPD", status: "completed" },
    { id: 3, patient: "Amit Patel", doctor: "Dr. Reddy", time: "11:00 AM", type: "IPD", status: "scheduled" },
    { id: 4, patient: "Sneha Verma", doctor: "Dr. Kapoor", time: "11:45 AM", type: "Emergency", status: "emergency" },
    { id: 5, patient: "Rohan Desai", doctor: "Dr. Joshi", time: "02:30 PM", type: "OPD", status: "scheduled" },
    { id: 6, patient: "Meera Iyer", doctor: "Dr. Nair", time: "03:15 PM", type: "IPD", status: "cancelled" }
  ];

  // Doctors on duty
  const doctorsOnDuty = [
    { id: 1, name: "Dr. Sharma", department: "Cardiology", patients: 18, status: "available" },
    { id: 2, name: "Dr. Gupta", department: "Orthopedics", patients: 12, status: "available" },
    { id: 3, name: "Dr. Reddy", department: "Neurology", patients: 8, status: "busy" },
    { id: 4, name: "Dr. Kapoor", department: "Pediatrics", patients: 15, status: "available" },
    { id: 5, name: "Dr. Joshi", department: "General Surgery", patients: 10, status: "available" },
    { id: 6, name: "Dr. Nair", department: "Dermatology", patients: 7, status: "busy" }
  ];

  // Graph data
  const revenueData = {
    daily: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 75, 88],
    monthly: [320, 340, 365, 398, 425, 456, 412, 478, 512, 540, 575, 610]
  };

  const appointmentStatusData = [
    { status: 'Completed', value: 32, color: '#10B981' },
    { status: 'Scheduled', value: 23, color: '#3B82F6' },
    { status: 'Cancelled', value: 5, color: '#EF4444' },
    { status: 'Emergency', value: 3, color: '#F59E0B' }
  ];

  const patientFlowData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    inPatients: [25, 40, 65, 80, 60, 35],
    outPatients: [45, 70, 85, 95, 75, 45]
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 17) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredStaff = activeFilter === 'all' 
    ? Object.entries(staffData)
    : Object.entries(staffData).filter(([key]) => key === activeFilter);

  return (
    <div className={`hospital-dashboard-admin ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="dashboard-header-admin">
        <div className="header-left-admin">
          <h1 className="dashboard-title-admin">
            <Shield size={28} />
            Hospital Admin Dashboard
          </h1>
          <p className="dashboard-greeting-admin">Good {timeOfDay}, Admin! Here's your complete overview.</p>
        </div>
        <div className="header-right-admin">
          <div className="header-stats-admin">
            <div className="header-stat-item-admin">
              <Users size={16} />
              <span>Total Staff: <strong>{dashboardData.staff.total}</strong></span>
            </div>
            <div className="header-stat-item-admin">
              <UserCheck size={16} />
              <span>Active Today: <strong>{dashboardData.staff.active}</strong></span>
            </div>
            <div className="header-stat-item-admin">
              <Building size={16} />
              <span>Departments: <strong>{dashboardData.staff.departments}</strong></span>
            </div>
          </div>
          <div className="date-display-admin">
            <Calendar size={20} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          {/* <button 
            className="theme-toggle-btn-admin"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button> */}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="quick-stats-bar-admin">
        <div className="quick-stat-admin">
          <div className="quick-stat-icon-admin">
            <Calendar size={20} />
          </div>
          <div className="quick-stat-content-admin">
            <div className="quick-stat-value-admin">{dashboardData.appointments.today}</div>
            <div className="quick-stat-label-admin">Today's Appointments</div>
          </div>
        </div>
        <div className="quick-stat-admin">
          <div className="quick-stat-icon-admin">
            <User size={20} />
          </div>
          <div className="quick-stat-content-admin">
            <div className="quick-stat-value-admin">{dashboardData.patients.total}</div>
            <div className="quick-stat-label-admin">Total Patients</div>
          </div>
        </div>
        <div className="quick-stat-admin">
          <div className="quick-stat-icon-admin">
            <Stethoscope size={20} />
          </div>
          <div className="quick-stat-content-admin">
            <div className="quick-stat-value-admin">{dashboardData.doctors.total}</div>
            <div className="quick-stat-label-admin">Total Doctors</div>
          </div>
        </div>
        <div className="quick-stat-admin">
          <div className="quick-stat-icon-admin">
            <DollarSign size={20} />
          </div>
          <div className="quick-stat-content-admin">
            <div className="quick-stat-value-admin">{formatCurrency(dashboardData.revenue.monthly).split('.')[0]}</div>
            <div className="quick-stat-label-admin">Monthly Revenue</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid-admin">
        {/* Left Column - Staff Overview */}
        <div className="left-column-admin">
          {/* Staff Overview Card */}
          <div className="card-admin staff-overview-card-admin">
            <div className="card-header-admin">
              <h3 className="card-title-admin">
                <Users size={20} />
                Staff Overview
              </h3>
              <div className="filter-tabs-admin">
                {['all', 'patient', 'doctor', 'nurse', 'assistant', 'technician', 'housekeeping', 'supervisor', 'manager', 'billing', 'admin'].map(role => (
                  <button
                    key={role}
                    className={`filter-tab-admin ${activeFilter === role ? 'active' : ''}`}
                    onClick={() => setActiveFilter(role)}
                  >
                    {role === 'all' ? 'All' : staffData[role]?.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="staff-grid-admin">
              {filteredStaff.map(([role, data]) => (
                <div key={role} className="staff-card-admin" style={{ borderLeftColor: data.color }}>
                  <div className="staff-card-header-admin">
                    <div className="staff-icon-admin" style={{ backgroundColor: data.color }}>
                      {data.icon}
                    </div>
                    <div className="staff-info-admin">
                      <h4 className="staff-role-admin">{data.label}</h4>
                      <div className="staff-counts-admin">
                        <div className="staff-count-admin">
                          <span className="count-value-admin">{data.count}</span>
                          <span className="count-label-admin">Total</span>
                        </div>
                        <div className="staff-count-admin">
                          <span className="count-value-admin active">{data.active}</span>
                          <span className="count-label-admin">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="staff-description-admin">
                    {role === 'patient' && 'Book appointments and manage health'}
                    {role === 'doctor' && 'Manage appointments and patient records'}
                    {role === 'nurse' && 'Patient care and medical assistance'}
                    {role === 'assistant' && 'Support medical procedures'}
                    {role === 'technician' && 'Laboratory testing and analysis'}
                    {role === 'housekeeping' && 'Hospital cleanliness and maintenance'}
                    {role === 'supervisor' && 'Department supervision'}
                    {role === 'manager' && 'Department management'}
                    {role === 'billing' && 'Financial transactions and billing'}
                    {role === 'admin' && 'Hospital administration and management'}
                  </div>
                </div>
              ))}
            </div>
            <div className="staff-summary-admin">
              <div className="summary-item-admin">
                <span className="summary-label-admin">Total Staff Count:</span>
                <span className="summary-value-admin">{dashboardData.staff.total}</span>
              </div>
              <div className="summary-item-admin">
                <span className="summary-label-admin">Active Today:</span>
                <span className="summary-value-admin active">{dashboardData.staff.active}</span>
              </div>
              <div className="summary-item-admin">
                <span className="summary-label-admin">Departments:</span>
                <span className="summary-value-admin">{dashboardData.staff.departments}</span>
              </div>
            </div>
          </div>

          {/* Today's Detailed Appointments */}
          <div className="card-admin appointments-card-admin">
            <div className="card-header-admin">
              <h3 className="card-title-admin">
                <ClipboardCheck size={20} />
                Today's Detailed Appointments
              </h3>
              <span className="card-badge-admin">{dashboardData.appointments.today} Total</span>
            </div>
            <div className="appointments-list-admin">
              {todaysAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-item-admin">
                  <div className="appointment-time-admin">
                    <Clock size={14} />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="appointment-details-admin">
                    <div className="patient-name-admin">{appointment.patient}</div>
                    <div className="doctor-name-admin">{appointment.doctor}</div>
                  </div>
                  <div className="appointment-type-admin">
                    <span className={`type-badge-admin ${appointment.type.toLowerCase()}-admin`}>
                      {appointment.type}
                    </span>
                  </div>
                  <div className="appointment-status-admin">
                    <span className={`status-badge-admin ${appointment.status}-admin`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="appointments-summary-admin">
              <div className="summary-badge-admin completed-admin">
                <CheckCircle size={16} />
                <span>{dashboardData.appointments.completed} Completed</span>
              </div>
              <div className="summary-badge-admin scheduled-admin">
                <Clock size={16} />
                <span>{dashboardData.appointments.upcoming} Scheduled</span>
              </div>
              <div className="summary-badge-admin cancelled-admin">
                <XCircle size={16} />
                <span>{dashboardData.appointments.cancelled} Cancelled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Charts */}
        <div className="right-column-admin">
          {/* Stats Grid */}
          <div className="stats-grid-admin">
            {/* Patients Stats */}
            <div className="stat-card-admin patient-stat-card-admin">
              <div className="stat-icon-admin">
                <User size={24} />
              </div>
              <div className="stat-content-admin">
                <h3 className="stat-title-admin">Patient Statistics</h3>
                <div className="stat-value-admin">{dashboardData.patients.total}</div>
                <div className="stat-details-admin">
                  <div className="stat-detail-item-admin">
                    <Bed size={14} />
                    <span>OPD: {dashboardData.patients.opd}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Bed size={14} />
                    <span>IPD: {dashboardData.patients.ipd}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <AlertCircle size={14} />
                    <span>Emergency: {dashboardData.patients.emergency}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <UserCheck size={14} />
                    <span>New Today: {dashboardData.patients.newToday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Stats */}
            <div className="stat-card-admin doctor-stat-card-admin">
              <div className="stat-icon-admin">
                <Stethoscope size={24} />
              </div>
              <div className="stat-content-admin">
                <h3 className="stat-title-admin">Doctor Statistics</h3>
                <div className="stat-value-admin">{dashboardData.doctors.total}</div>
                <div className="stat-details-admin">
                  <div className="stat-detail-item-admin">
                    <UserCheck size={14} />
                    <span>Available: {dashboardData.doctors.available}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Clock size={14} />
                    <span>On Duty: {dashboardData.doctors.onDuty}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Clock size={14} />
                    <span>On Leave: {dashboardData.doctors.onLeave}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Shield size={14} />
                    <span>Specialists: {dashboardData.doctors.specialists}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Stats */}
            <div className="stat-card-admin revenue-stat-card-admin">
              <div className="stat-icon-admin">
                <DollarSign size={24} />
              </div>
              <div className="stat-content-admin">
                <h3 className="stat-title-admin">Revenue Overview</h3>
                <div className="stat-value-admin">{formatCurrency(dashboardData.revenue.daily)}</div>
                <div className="stat-details-admin">
                  <div className="stat-detail-item-admin">
                    <TrendingUp size={14} />
                    <span>Daily: {formatCurrency(dashboardData.revenue.daily)}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <TrendingUp size={14} />
                    <span>Monthly: {formatCurrency(dashboardData.revenue.monthly)}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <FileText size={14} />
                    <span>Pending: {formatCurrency(dashboardData.revenue.pendingBills)}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <CheckCircle size={14} />
                    <span>Collected: {formatCurrency(dashboardData.revenue.collected)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Stats */}
            <div className="stat-card-admin emergency-stat-card-admin">
              <div className="stat-icon-admin">
                <AlertCircle size={24} />
              </div>
              <div className="stat-content-admin">
                <h3 className="stat-title-admin">Emergency Status</h3>
                <div className="stat-value-admin">{dashboardData.emergency.active}</div>
                <div className="stat-details-admin">
                  <div className="stat-detail-item-admin">
                    <Heart size={14} />
                    <span>Critical: {dashboardData.emergency.critical}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Activity size={14} />
                    <span>Stable: {dashboardData.emergency.stable}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <Bed size={14} />
                    <span>Beds Available: {dashboardData.emergency.bedsAvailable}</span>
                  </div>
                  <div className="stat-detail-item-admin">
                    <PhoneCall size={14} />
                    <span>Response Time: 8min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors On Duty */}
          <div className="card-admin doctors-card-admin">
            <div className="card-header-admin">
              <h3 className="card-title-admin">
                <Stethoscope size={20} />
                Doctors Currently On Duty
              </h3>
              <span className="card-badge-admin">{dashboardData.doctors.onDuty} On Duty</span>
            </div>
            <div className="doctors-grid-admin">
              {doctorsOnDuty.map(doctor => (
                <div key={doctor.id} className="doctor-card-admin">
                  <div className="doctor-avatar-admin">
                    <User size={24} />
                  </div>
                  <div className="doctor-info-admin">
                    <h4 className="doctor-name-admin">{doctor.name}</h4>
                    <p className="doctor-department-admin">{doctor.department}</p>
                    <div className="doctor-stats-admin">
                      <div className="doctor-stat-admin">
                        <Users size={12} />
                        <span>{doctor.patients} Patients</span>
                      </div>
                      <div className={`doctor-status-admin ${doctor.status}-admin`}>
                        {doctor.status === 'available' ? 'Available' : 'Busy'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Section */}
        
        </div>
          <div className="charts-section-admin">
            {/* Revenue Chart */}
            <div className="chart-container-admin ">
              <div className="chart-header-admin">
                <h3 className="chart-title-admin">
                  <BarChart3 size={20} />
                  Revenue Trend
                </h3>
                <div className="chart-controls-admin">
                  <button className="chart-period-btn-admin active">Daily</button>
                  <button className="chart-period-btn-admin">Monthly</button>
                </div>
              </div>
              <div className="revenue-chart-admin">
                <div className="chart-bars-admin">
                  {revenueData.daily.map((value, index) => (
                    <div key={index} className="chart-bar-wrapper-admin">
                      <div 
                        className="chart-bar-admin"
                        style={{ height: `${(value / 100) * 100}%` }}
                        title={`₹${value * 1000}`}
                      >
                        <div className="bar-value-admin">₹{value}K</div>
                      </div>
                      <div className="bar-label-admin">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Status Chart */}
            <div className="chart-container-admin">
              <div className="chart-header-admin">
                <h3 className="chart-title-admin">
                  <PieChart size={20} />
                  Appointment Status
                </h3>
              </div>
              <div className="appointment-chart-admin">
                <div className="pie-chart-container-admin">
                  <div className="pie-chart-admin">
                    {appointmentStatusData.map((item, index) => {
                      const percentage = (item.value / 63) * 100;
                      const offset = 25;
                      const cumulative = appointmentStatusData
                        .slice(0, index)
                        .reduce((sum, i) => sum + (i.value / 63) * 100, 0);
                      
                      return (
                        <div
                          key={item.status}
                          className="pie-segment-admin"
                          style={{
                            background: `conic-gradient(
                              ${item.color} 0% ${percentage}%,
                              transparent ${percentage}% 100%
                            )`,
                            transform: `rotate(${cumulative * 3.6}deg)`
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="pie-center-admin">
                    <div className="total-appointments-admin">63</div>
                    <div className="appointments-label-admin">Total Today</div>
                  </div>
                </div>
                <div className="pie-legend-admin">
                  {appointmentStatusData.map((item) => (
                    <div key={item.status} className="pie-legend-item-admin">
                      <div 
                        className="pie-color-admin" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="pie-legend-details-admin">
                        <span className="pie-status-admin">{item.status}</span>
                        <span className="pie-value-admin">{item.value} ({Math.round((item.value / 63) * 100)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;