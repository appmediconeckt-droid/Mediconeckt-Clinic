import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItemClick }) => {
  const [hoverExpand, setHoverExpand] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    // Initialize body class based on initial sidebar state
    updateBodyClass(hoverExpand);
    
    return () => {
      // Clean up classes when component unmounts
      document.body.classList.remove('sidebar-hover-expanded', 'sidebar-collapsed');
    };
  }, []);

  // Update body class when hover state changes
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
    menuItemClick();
  };

  // Your existing menu items arrays remain the same
  const doctorMenuItems = [
    { path: "/doctordashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/doctorcalendar", icon: "fa-calendar-days", text: "Calendar" },
    { path: "/doctorprofile", icon: "fa-user-check", text: "Profile" },
    { path: "/qrcode", icon: "fa-qrcode", text: "QR Code" },
       { path: "/patient-sms", icon: "fa-message", text: "Patient SMS" },
    { path: "/appointmentlist", icon: "fa-list-check", text: "Appointment List" },
    { path: "/followup", icon: "fa-history", text: "Follow Up" },
    { path: "/walkinappointment", icon: "fa-solid fa-person-walking", text: "Walk in" },
    { path: "/clinicpage", icon: "fa-hospital", text: "Clinic Page" },
    { path: "/doctor-notifications", icon: "fa-bell", text: "Notification" },
    { path: "/setting", icon: "fa-gear", text: "Setting" },
  ];

  const patientMenuItems = [
    { path: "/patientdashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/patientappointment", icon: "fa-calendar-days", text: "My Appointments" },
    // { path: "/patientprofile", icon: "fa-user-check", text: "Profile" },
    // { path: "/patientrecords", icon: "fa-file-medical", text: "Medical Records" },
    // { path: "/patientdoctors", icon: "fa-user-md", text: "Find Doctors" },
     { path: "/doctor-sms", icon: "fa-message", text: "Doctor SMS" },
    { path: "/patient-notifications", icon: "fa-bell", text: "Notifications" },
    { path: "/patient-settings", icon: "fa-gear", text: "Settings" },
  ];

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
            menuItemClick();
          }}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          <span className="menu-text">{item.text}</span>
        </div>
      </li>
    ));
  };

  return (
    <div
      className={`sidebar-container ${hoverExpand ? "hover-expanded" : "collapsed"} ${
        userRole === "doctor" ? "doctor-theme" : "patient-theme"
      }`}
      onMouseEnter={() => setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
    >
      <div className="sidebar">
        <ul className="menu">
          {userRole === "doctor"
            ? renderMenuItems(doctorMenuItems)
            : renderMenuItems(patientMenuItems)
          }

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

        {hoverExpand && (
          <div className="sidebar-footer">
            <div className="user-info">
              {/* User info content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;