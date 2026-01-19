import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItemClick }) => {
  const [hoverExpand, setHoverExpand] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [hospitalDept, setHospitalDept] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const dept = localStorage.getItem("hospitalDept");
    const name = localStorage.getItem("userName");
    setUserRole(role);
    setHospitalDept(dept);
    setUserName(name);

    updateBodyClass(hoverExpand);

    return () => {
      document.body.classList.remove('sidebar-hover-expanded', 'sidebar-collapsed');
    };
  }, []);

  useEffect(() => {
    updateBodyClass(hoverExpand);
  }, [hoverExpand]);

  const updateBodyClass = (isExpanded) => {
    if (isExpanded) {
      document.body.classList.add('sidebar-hover-expanded');
      document.body.classList.remove('sidebar-collapsed');
    } else {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-hover-expanded');
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("hospitalDept");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
    if (menuItemClick) menuItemClick();
  };

  // Doctor Menu Items
  const doctorMenuItems = [
    { path: "/doctordashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/doctorcalendar", icon: "fa-calendar-days", text: "Calendar" },
    { path: "/appointmentlist", icon: "fa-list-check", text: "Appointment List" },
    { path: "/patient-details", icon: "fa-user", text: "Patient Details" },
    { path: "/walkinappointment", icon: "fa-solid fa-person-walking", text: "Walk in" },
    { path: "/followup", icon: "fa-history", text: "Follow Up" },
    { path: "/patient-sms", icon: "fa-message", text: "Patient SMS" },
    { path: "/qrcode", icon: "fa-qrcode", text: "QR Code" },
    { path: "/clinicpage", icon: "fa-hospital", text: "Clinic Page" },
    { path: "/doctor-notifications", icon: "fa-bell", text: "Notification" },
    { path: "/setting", icon: "fa-gear", text: "Setting" },
  ];

  // Patient Menu Items
  const patientMenuItems = [
    { path: "/patientdashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/patientappointment", icon: "fa-calendar-days", text: "My Appointments" },
    { path: "/doctor-sms", icon: "fa-message", text: "Doctor SMS" },
    { path: "/patient-notifications", icon: "fa-bell", text: "Notifications" },
    { path: "/patient-settings", icon: "fa-gear", text: "Settings" },
  ];

  // Hospital Department Menu Items
  const hospitalMenuItems = {
    nurse: [
      { path: "/hospital/nurse-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/patient-list", icon: "fa-user-injured", text: "Patient List" },
      { path: "/hospital/vital-signs", icon: "fa-heart-pulse", text: "Vital Signs" },
      { path: "/hospital/medication", icon: "fa-pills", text: "Medication" },
      { path: "/hospital/shift-report", icon: "fa-clipboard-list", text: "Shift Report" },
      // { path: "/hospital/nurse-schedule", icon: "fa-calendar-check", text: "Schedule" },
      { path: "/hospital/emergency-cases", icon: "fa-truck-medical", text: "Emergency" },
      { path: "/hospital/nurse-notifications", icon: "fa-bell", text: "Notifications" },
    ],

    assistant: [
      { path: "/hospital/assistant-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/room-assignment", icon: "fa-door-open", text: "Room Assignment" },
      { path: "/hospital/equipment", icon: "fa-stethoscope", text: "Equipment" },
      { path: "/hospital/assistant-schedule", icon: "fa-calendar-alt", text: "Schedule" },
      { path: "/hospital/patient-prep", icon: "fa-user-check", text: "Patient Prep" },
      { path: "/hospital/supplies", icon: "fa-box", text: "Supplies" },
    ],

    technician: [
      { path: "/hospital/lab-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/test-requests", icon: "fa-flask", text: "Test Requests" },
      { path: "/hospital/lab-reports", icon: "fa-file-medical", text: "Lab Reports" },
      { path: "/hospital/specimen", icon: "fa-vial", text: "Specimen" },
      { path: "/hospital/equipment-maintenance", icon: "fa-wrench", text: "Maintenance" },
      { path: "/hospital/lab-inventory", icon: "fa-boxes-stacked", text: "Inventory" },
    ],

    housekeeping: [
      { path: "/hospital/housekeeping-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/cleaning-schedule", icon: "fa-calendar", text: "Cleaning Schedule" },
      { path: "/hospital/room-status", icon: "fa-door-closed", text: "Room Status" },
      { path: "/hospital/supplies-inventory", icon: "fa-soap", text: "Supplies" },
      { path: "/hospital/maintenance-requests", icon: "fa-tools", text: "Maintenance" },
      { path: "/hospital/housekeeping-report", icon: "fa-clipboard-check", text: "Reports" },
    ],

    supervisor: [
      { path: "/hospital/supervisor-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/staff-management", icon: "fa-users", text: "Staff Management" },
      { path: "/hospital/shift-management", icon: "fa-calendar-week", text: "Shift Management" },
      { path: "/hospital/performance", icon: "fa-chart-line", text: "Performance" },
      { path: "/hospital/incident-reports", icon: "fa-triangle-exclamation", text: "Incidents" },
      { path: "/hospital/resource-allocation", icon: "fa-chart-pie", text: " Allocation" },
    ],

    manager: [
      { path: "/hospital/manager-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/department-reports", icon: "fa-chart-column", text: "Reports" },
      { path: "/hospital/budget", icon: "fa-money-bill-wave", text: "Budget" },
      { path: "/hospital/staff-performance", icon: "fa-chart-simple", text: "Staff Performance" },
      { path: "/hospital/policy", icon: "fa-file-contract", text: "Policies" },
      { path: "/hospital/meetings", icon: "fa-users-between-lines", text: "Meetings" },
    ],

    billing: [
      { path: "/hospital/billing-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/invoices", icon: "fa-file-invoice-dollar", text: "Invoices" },
      { path: "/hospital/insurance-claims", icon: "fa-file-medical", text: "Insurance Claims" },
      { path: "/hospital/payment-records", icon: "fa-credit-card", text: "Payments" },
      { path: "/hospital/patient-billing", icon: "fa-user-tag", text: "Patient Billing" },
      { path: "/hospital/financial-reports", icon: "fa-chart-bar", text: "Financial Reports" },
    ],

    admin: [
      { path: "/hospital/admin-dashboard", icon: "fa-gauge-high", text: "Dashboard" },
      { path: "/hospital/system-settings", icon: "fa-cogs", text: "System Settings" },
      { path: "/hospital/user-management", icon: "fa-user-shield", text: "User Management" },
      { path: "/hospital/hospital-config", icon: "fa-hospital", text: "Hospital Config" },
      { path: "/hospital/audit-logs", icon: "fa-clipboard-list", text: "Audit Logs" },
      { path: "/hospital/backup", icon: "fa-database", text: "Backup & Restore" },
    ],
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <li
        key={index}
        className={`menu-item ${isActive(item.path) ? "active" : ""}`}
      >
        <div
          className="menu-link menu-i"
          onClick={() => {
            navigate(item.path);
            if (menuItemClick) menuItemClick();
          }}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          <span className="menu-text">{item.text}</span>
        </div>
      </li>
    ));
  };

  // Get menu items based on role and department
  const getMenuItems = () => {
    if (userRole === "doctor") {
      return renderMenuItems(doctorMenuItems);
    } else if (userRole === "patient") {
      return renderMenuItems(patientMenuItems);
    } else if (hospitalMenuItems[userRole]) {
      return renderMenuItems(hospitalMenuItems[userRole]);
    }
    return <li className="menu-item"><div className="menu-link">No menu items available</div></li>;
  };

  // Get theme class based on role
  const getThemeClass = () => {
    const themeMap = {
      doctor: "doctor-theme",
      patient: "patient-theme",
      nurse: "nurse-theme",
      assistant: "assistant-theme",
      technician: "technician-theme",
      housekeeping: "housekeeping-theme",
      supervisor: "supervisor-theme",
      manager: "manager-theme",
      billing: "billing-theme",
      admin: "admin-theme"
    };
    return themeMap[userRole] || "";
  };

  // Get department name for display
  const getDepartmentName = () => {
    const deptNames = {
      nurse: "Nurse",
      assistant: "Medical Assistant",
      technician: "Lab Technician",
      housekeeping: "Housekeeping",
      supervisor: "Supervisor",
      manager: "Department Manager",
      billing: "Billing Staff",
      admin: "Administrator"
    };
    return deptNames[userRole] || "Hospital Staff";
  };

  // Get department icon
  const getDepartmentIcon = () => {
    const deptIcons = {
      doctor: "fa-user-doctor",
      patient: "fa-user",
      nurse: "fa-user-nurse",
      assistant: "fa-user-md",
      technician: "fa-flask",
      housekeeping: "fa-broom",
      supervisor: "fa-user-tie",
      manager: "fa-user-cog",
      billing: "fa-file-invoice-dollar",
      admin: "fa-user-shield"
    };
    return deptIcons[userRole] || "fa-user";
  };

  return (
    <div
      className={`sidebar-container ${hoverExpand ? "hover-expanded" : "collapsed"} ${getThemeClass()}`}
      onMouseEnter={() => setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
    >
      <div className="sidebar">
        
        <ul className="menu">
          {getMenuItems()}

          {/* Logout Button */}
          <li className="menu-item logout-item">
            <div
              className="menu-link menu-i"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="menu-text">Logout</span>
            </div>
          </li>
        </ul>

        {/* {hoverExpand && (
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <i className={`fa-solid ${getDepartmentIcon()}`}></i>
              </div>
              <div className="user-details">
                
                <p className="user-department">
                  {userRole === "doctor" ? "Doctor" : 
                   userRole === "patient" ? "Patient" : 
                   getDepartmentName()}
                </p>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;