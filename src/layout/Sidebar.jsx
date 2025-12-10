import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItemClick }) => {
  const [hoverExpand, setHoverExpand] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`sidebar-container ${hoverExpand ? "" : "collapsed"}`}
      onMouseEnter={() => setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
    >
      <div className="sidebar">
        <ul className="menu">

          {/* Dashboard */}
          <li className={`menu-item ${isActive("/doctordashboard") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/doctordashboard");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-gauge-high"></i>
              <span className="menu-text">Dashboard</span>
            </div>
          </li>

          {/* Calendar */}
          <li className={`menu-item ${isActive("/doctorcalendar") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/doctorcalendar");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-calendar-days"></i>
              <span className="menu-text">Calendar</span>
            </div>
          </li>

          {/* Activate Profile */}
          <li className={`menu-item ${isActive("/doctorprofileflow") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/doctorprofileflow");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-user-check"></i>
              <span className="menu-text">Activate Profile</span>
            </div>
          </li>

          {/* Profile */}
          <li className={`menu-item ${isActive("/doctorprofile") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/doctorprofile");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-user-doctor"></i>
              <span className="menu-text">Profile</span>
            </div>
          </li>

          {/* QR Code */}
          <li className={`menu-item ${isActive("/qrcode") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/qrcode");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-qrcode"></i>
              <span className="menu-text">QR Code</span>
            </div>
          </li>

          {/* Appointment List */}
          <li className={`menu-item ${isActive("/appointmentlist") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/appointmentlist");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-list-check"></i>
              <span className="menu-text">Appointment List</span>
            </div>
          </li>
          <li className={`menu-item ${isActive("/login") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/login");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="menu-text">Logout</span>
            </div>
          </li>
          

          {/* Setting */}
          {/* <li className={`menu-item ${isActive("/setting") ? "active" : ""}`}>
            <div
              className="menu-link menu-i"
              onClick={() => {
                navigate("/setting");
                menuItemClick();
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <span className="menu-text">Setting</span>
            </div>
          </li> */}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
