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
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
    menuItemClick();
  };

  const doctorMenuItems = [
    { path: "/doctordashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/doctorcalendar", icon: "fa-calendar-days", text: "Calendar" },
    { path: "/doctorprofile", icon: "fa-user-check", text: "Profile" },
    { path: "/qrcode", icon: "fa-qrcode", text: "QR_Code" },
    { path: "/appointmentlist", icon: "fa-list-check", text: "Appointment_List" },
    { path: "/walkinappointment", icon: "fa-list-check", text: "Walk_in" },
    { path: "/clinicpage", icon: "fa-hospital", text: "Clinic_Page" },
    { path: "/notifications", icon: "fa-bell", text: "Notification" },
    { path: "/setting", icon: "fa-gear", text: "Setting" },
  ];

  const patientMenuItems = [
    { path: "/patientdashboard", icon: "fa-gauge-high", text: "Dashboard" },
    { path: "/patientappointments", icon: "fa-calendar-days", text: "My Appointments" },
    { path: "/patientprofile", icon: "fa-user-check", text: "Profile" },
    { path: "/patientrecords", icon: "fa-file-medical", text: "Medical Records" },
    { path: "/patientdoctors", icon: "fa-user-md", text: "Find Doctors" },
    { path: "/patientnotifications", icon: "fa-bell", text: "Notifications" },
    { path: "/patientsettings", icon: "fa-gear", text: "Settings" },
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
      className={`sidebar-container ${hoverExpand ? "" : "collapsed"} ${
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
              
              
              {/* <small className="user-email">
                {localStorage.getItem("userEmail") || "user@example.com"}
              </small> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;