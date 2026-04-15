import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../image/Mediconect-Logo-4.png';
import logo2 from '../image/Mediconect Logo-3.png';

const Navbar = ({ toggleSidebar }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [alarmVolume, setAlarmVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [hospitaluserRole, setHospitaluserRole] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const alarmSoundRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const navigate = useNavigate();

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Get user role and department from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userRole = localStorage.getItem("hospitaluserRole");
    setUserRole(role);
    setHospitaluserRole(userRole);
  }, []);

  // Get theme colors based on user role
  const getThemeColors = () => {
    if (userRole === "doctor") {
      return {
        navbarBg: "#a8d8ff",
        emergencyIconColor: "#101012ff",
        emergencyActiveColor: "#dc2626",
        notificationColor: "#121314ff",
        brandColor: "#1e3a8a"
      };
    } else if (userRole === "patient") {
      return {
        navbarBg: "#cae9e6",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    } else if (userRole === "nurse") {
      return {
        navbarBg: "#dfbde6",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    } else if (userRole === "assistant") {
      return {
        navbarBg: "#e0d1ff",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    } else if (userRole === "technician") {
      return {
        navbarBg: "#ffe4c9",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    } else if (userRole === "housekeeping") {
      return {
        navbarBg: "#fff9c9",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    }
    else if (userRole === "supervisor") {
      return {
        navbarBg: "#b2ebf2",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    }
    else if (userRole === "manager") {
      return {
        navbarBg: "#e6e6ff",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    }
    else if (userRole === "billing") {
      return {
        navbarBg: "#c8f7c5",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    }
    else if (userRole === "admin") {
      return {
        navbarBg: "#e3f2fd",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    }
    else if (userRole === "superadmin") {
      return {
        navbarBg: "#fff9c2",
        emergencyIconColor: "#8b6914",
        emergencyActiveColor: "#b8860b",
        notificationColor: "#000000",
        brandColor: "#000000",
        badgeBg: "#ffd700",
        badgeColor: "#000000",
        navbarBorder: "#ffd700"
      };
    }
    else {
      return {
        navbarBg: "#6b7280",
        emergencyIconColor: "#4b5563",
        emergencyActiveColor: "#dc2626",
        notificationColor: "#4b5563",
        brandColor: "#374151"
      };
    }
  };

  const themeColors = getThemeColors();

  // Add role-specific CSS class to body for global styling
  useEffect(() => {
    // Remove all role classes first
    const allClasses = [
      'doctor-theme-navbar',
      'patient-theme-navbar',
      'nurse-theme-navbar',
      'assistant-theme-navbar',
      'technician-theme-navbar',
      'housekeeping-theme-navbar',
      'supervisor-theme-navbar',
      'manager-theme-navbar',
      'billing-theme-navbar',
      'admin-theme-navbar',
      'superadmin-theme-navbar'
    ];

    allClasses.forEach(cls => {
      document.body.classList.remove(cls);
    });

    // Add appropriate role class
    if (userRole === "doctor") {
      document.body.classList.add('doctor-theme-navbar');
    } else if (userRole === "patient") {
      document.body.classList.add('patient-theme-navbar');
    } else if (userRole === "hospital" && hospitaluserRole) {
      document.body.classList.add(`${hospitaluserRole}-theme-navbar`);
    } else if (userRole === "superadmin") {
      document.body.classList.add('superadmin-theme-navbar');
    }
  }, [userRole, hospitaluserRole]);

  // Handle notification click - different routes based on role
  const handleNotificationClick = (e) => {
    e.preventDefault();

    if (userRole === "doctor") {
      navigate("/doctor-notifications");
    } else if (userRole === "patient") {
      navigate("/patient-notifications");
    } else if (userRole === "superadmin") {
      navigate("/superadmin/notifications");
    } else if (userRole === "hospital") {
      const userRole = hospitaluserRole;
      if (userRole === "nurse") {
        navigate("/hospital/nurse-notifications");
      } else if (userRole === "admin") {
        navigate("/hospital/admin-notifications");
      } else {
        navigate("/hospital/notifications");
      }
    } else {
      navigate("/notifications");
    }
  };

  // Handle emergency click - Only for Doctor and Super Admin
  const handleEmergencyClick = () => {
    if (userRole === "doctor" || userRole === "superadmin") {
      setIsEmergencyActive(!isEmergencyActive);
      // Add emergency logic here
    }
  };

  // Handle profile image click - Different routes for ALL roles
  const handleProfileClick = () => {
    // Navigate based on role
    if (userRole === "doctor") {
      navigate("/doctor/profile");
    } else if (userRole === "patient") {
      navigate("/patient/profile");
    } else if (userRole === "superadmin") {
      navigate("/superadmin/profile");
    } else if (userRole === "nurse") {
      navigate("/hospital/nurse/profile");
    } else if (userRole === "assistant") {
      navigate("/hospital/assistant/profile");
    } else if (userRole === "technician") {
      navigate("/hospital/technician/profile");
    } else if (userRole === "housekeeping") {
      navigate("/hospital/housekeeping/profile");
    } else if (userRole === "supervisor") {
      navigate("/hospital/supervisor/profile");
    } else if (userRole === "manager") {
      navigate("/hospital/manager/profile");
    } else if (userRole === "billing") {
      navigate("/hospital/billing/profile");
    } else if (userRole === "admin") {
      navigate("/hospital/admin/profile");
    } else {
      // Default fallback
      navigate("/profile");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("hospitaluserRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  // Get role display name
  const getRoleDisplayName = () => {
    if (userRole === "doctor") return "Doctor";
    if (userRole === "patient") return "Patient";
    if (userRole === "superadmin") return "Super Administrator";
    if (userRole === "hospital" && hospitaluserRole) {
      const userRoleNames = {
        nurse: "Nurse",
        assistant: "Medical Assistant",
        technician: "Lab Technician",
        housekeeping: "Housekeeping Staff",
        supervisor: "Supervisor",
        manager: "Department Manager",
        billing: "Billing Staff",
        admin: "Administrator"
      };
      return userRoleNames[hospitaluserRole] || "Hospital Staff";
    }
    return "User";
  };

  // Get role icon
  const getRoleIcon = () => {
    if (userRole === "doctor") return "fa-user-doctor";
    if (userRole === "patient") return "fa-user";
    if (userRole === "superadmin") return "fa-crown";
    if (userRole === "hospital" && hospitaluserRole) {
      const userRoleIcons = {
        nurse: "fa-user-nurse",
        assistant: "fa-user-md",
        technician: "fa-flask",
        housekeeping: "fa-broom",
        supervisor: "fa-user-tie",
        manager: "fa-user-cog",
        billing: "fa-file-invoice-dollar",
        admin: "fa-user-shield"
      };
      return userRoleIcons[hospitaluserRole] || "fa-user";
    }
    return "fa-user";
  };

  // Handle profile icon click - ALL roles will navigate directly to profile
  const handleProfileIconClick = () => {
    // For ALL roles, navigate directly to profile
    handleProfileClick();
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 999,
          backgroundColor: themeColors.navbarBg,
          transition: "background-color 0.3s ease",
          height: isMobile ? "55px" : "60px",
          borderBottom: userRole === "superadmin" ? "3px solid #ffd700" : "none",
          boxShadow: userRole === "superadmin" ? "0 4px 15px rgba(255, 215, 0, 0.3)" : "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand-wrapper">
              {/* Sidebar Toggle Button - Only on Mobile */}
              {(isMobile || isTablet) && (
                <button 
                  className="sidebar-toggle-btn"
                  onClick={toggleSidebar}
                  aria-label="Toggle sidebar"
                  style={{
                    background: "none",
                    border: "none",
                    color: themeColors.notificationColor,
                    fontSize: isMobile ? "18px" : "20px",
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    marginRight: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "32px",
                    minHeight: "32px"
                  }}
                >
                  <i className="fas fa-bars"></i>
                </button>
              )}
              
              {/* Logo for large screens (logo) */}
              <motion.img
                src={logo}
                alt="Mediconect Logo"
                className="nav-logo nav-logo-large"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{
                  filter: userRole === "superadmin" ? "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))" : "none",
                  objectFit: "contain"
                }}
              />
              
              {/* Logo for small screens (logo2) */}
              <motion.img
                src={logo2}
                alt="Mediconect Logo"
                className="nav-logo nav-logo-small"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{
                  filter: userRole === "superadmin" ? "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))" : "none",
                  objectFit: "contain"
                }}
              />
            </div>

            <div className="nav-icons-container">
              {/* Emergency Icon - Only for DOCTOR and SUPER ADMIN roles */}
              {(userRole === "doctor" || userRole === "superadmin") && (
                <div className="emergency-wrapper position-relative">
                  <button
                    onClick={handleEmergencyClick}
                    className="emergency-icon"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: isMobile ? "4px" : "5px",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: isMobile ? "36px" : "40px",
                      minHeight: isMobile ? "36px" : "40px"
                    }}
                  >
                    <i className={`fa-solid fa-triangle-exclamation ${isEmergencyActive ? 'fa-beat-fade' : ''}`}
                      style={{ fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px" }}></i>
                  </button>
                  {isEmergencyActive && (
                    <span className="emergency-alert" style={{
                      position: "absolute",
                      top: isMobile ? "3px" : "5px",
                      right: isMobile ? "3px" : "5px",
                      width: isMobile ? "8px" : "10px",
                      height: isMobile ? "8px" : "10px",
                      borderRadius: "50%",
                      background: userRole === "superadmin" ? "#ff0000" : "#dc2626",
                      animation: "pulse 1s infinite"
                    }}></span>
                  )}
                </div>
              )}

              {/* Notification Link - Different routes based on role */}
              <Link
                to="#"
                className="notification-link"
                onClick={handleNotificationClick}
                style={{
                  color: themeColors.notificationColor,
                  textDecoration: "none",
                  position: "relative",
                  fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: isMobile ? "36px" : "40px",
                  minHeight: isMobile ? "36px" : "40px"
                }}
              >
                <i className="fa-solid fa-bell"></i>
                <span className="notification-badge" style={{
                  position: "absolute",
                  top: isMobile ? "-6px" : "-8px",
                  right: isMobile ? "-6px" : "-8px",
                  backgroundColor: userRole === "superadmin" ? "#ff0000" : "#dc2626",
                  color: "white",
                  borderRadius: "50%",
                  width: isMobile ? "14px" : "16px",
                  height: isMobile ? "14px" : "16px",
                  fontSize: isMobile ? "8px" : "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>3</span>
              </Link>

              {/* Profile Image */}
              <div className="profile-wrapper position-relative">
                <div
                  className="profile-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleProfileIconClick}
                >
                  <div className="position-relative">
                    <img
                      src={profileImage}
                      alt="profile"
                      className="profile-image"
                      style={{
                        width: isMobile ? "35px" : isTablet ? "38px" : "40px",
                        height: isMobile ? "35px" : isTablet ? "38px" : "40px",
                        border: userRole === "superadmin" ?
                          "3px solid #ffd700" :
                          `2px solid ${themeColors.notificationColor}`,
                        boxShadow: userRole === "superadmin" ?
                          "0 0 10px rgba(255, 215, 0, 0.5)" : "none",
                        objectFit: "cover"
                      }}
                    />
                    {userRole === "superadmin" && (
                      <div className="superadmin-profile-badge" style={{
                        position: "absolute",
                        bottom: isMobile ? "-5px" : "0px",
                        right: isMobile ? "-5px" : "0px",
                        background: "#ffd700",
                        color: "#000",
                        width: isMobile ? "14px" : "16px",
                        height: isMobile ? "14px" : "16px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isMobile ? "8px" : "10px",
                        border: "2px solid #000",
                        zIndex: 2
                      }}>
                        <i className="fas fa-crown"></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add CSS styles */}
      <style jsx="true">{`
        /* Base navbar styles */
        .navbar {
          position: fixed;
          width: 100%;
          z-index: 999;
          transition: background-color 0.3s ease;
          height: 60px;
        }
        
        .nav-container {
          width: 100%;
          height: 100%;
          padding: 0 15px;
        }
        
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          width: 100%;
          padding: 0 5px;
        }
        
        .nav-brand-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
          position: relative;
        }
        
        /* Logo Styling */
        .nav-logo {
          height: auto;
          max-width: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }
        
        /* Large logo (logo) - Show on large screens */
        .nav-logo-large {
          display: block;
          width: 220px;
          height: 35px;
        }
        
        /* Small logo (logo2) - Show on small screens */
        .nav-logo-small {
          display: none;
          width: 50px;
          height: 35px;
        }
        
        .nav-icons-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }
        
        .emergency-wrapper,
        .notification-link,
        .profile-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-image {
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        
        .profile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .profile-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes goldGlow {
          0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
          100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
        }
        
        /* ========== DOCTOR THEME NAVBAR (Light Blue) ========== */
        body.doctor-theme-navbar .navbar {
          background-color: #a8d8ff !important;
        }
        
        body.doctor-theme-navbar .fa-bell {
          color: #121314ff !important;
        }
        
        body.doctor-theme-navbar .emergency-icon .fa-triangle-exclamation {
          color: #101012ff !important;
        }
        
        body.doctor-theme-navbar .emergency-icon.active .fa-triangle-exclamation {
          color: #dc2626 !important;
        }
        
        /* ========== PATIENT THEME NAVBAR (Light Green) ========== */
        body.patient-theme-navbar .navbar {
          background-color: #cae9e6 !important;
        }
        
        body.patient-theme-navbar .fa-bell {
          color: #191515ff !important;
        }
        
        /* ========== NURSE THEME NAVBAR (Light Pink) ========== */
        body.nurse-theme-navbar .navbar {
          background-color: #ffd6e7 !important;
        }
        
        body.nurse-theme-navbar .fa-bell {
          color: #c2185b !important;
        }
        
        /* ========== ASSISTANT THEME NAVBAR (Light Purple) ========== */
        body.assistant-theme-navbar .navbar {
          background-color: #e0d1ff !important;
        }
        
        body.assistant-theme-navbar .fa-bell {
          color: #7b1fa2 !important;
        }
        
        /* ========== TECHNICIAN THEME NAVBAR (Light Orange) ========== */
        body.technician-theme-navbar .navbar {
          background-color: #ffe4c9 !important;
        }
        
        body.technician-theme-navbar .fa-bell {
          color: #f57c00 !important;
        }
        
        /* ========== HOUSEKEEPING THEME NAVBAR (Light Yellow) ========== */
        body.housekeeping-theme-navbar .navbar {
          background-color: #fff9c9 !important;
        }
        
        body.housekeeping-theme-navbar .fa-bell {
          color: #f9a825 !important;
        }
        
        /* ========== SUPERVISOR THEME NAVBAR (Light Teal) ========== */
        body.supervisor-theme-navbar .navbar {
          background-color: #b2ebf2 !important;
        }
        
        body.supervisor-theme-navbar .fa-bell {
          color: #00838f !important;
        }
        
        /* ========== MANAGER THEME NAVBAR (Light Lavender) ========== */
        body.manager-theme-navbar .navbar {
          background-color: #e6e6ff !important;
        }
        
        body.manager-theme-navbar .fa-bell {
          color: #3949ab !important;
        }
        
        /* ========== BILLING THEME NAVBAR (Light Mint) ========== */
        body.billing-theme-navbar .navbar {
          background-color: #c8f7c5 !important;
        }
        
        body.billing-theme-navbar .fa-bell {
          color: #388e3c !important;
        }
        
        /* ========== ADMIN THEME NAVBAR (Light Gray-Blue) ========== */
        body.admin-theme-navbar .navbar {
          background-color: #e3f2fd !important;
        }
        
        body.admin-theme-navbar .fa-bell {
          color: #1976d2 !important;
        }
        
        /* ========== SUPER ADMIN THEME NAVBAR (Premium Gold) ========== */
        body.superadmin-theme-navbar .navbar {
          background: linear-gradient(135deg, #fff9c2 0%, #ffec8b 100%) !important;
          border-bottom: 3px solid #ffd700 !important;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3) !important;
        }
        
        body.superadmin-theme-navbar .fa-bell {
          text-shadow: 0 0 3px rgba(255, 215, 0, 0.5);
        }
        
        body.superadmin-theme-navbar .fa-bell:hover {
          color: #ffd700 !important;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }
        
        body.superadmin-theme-navbar .emergency-icon .fa-triangle-exclamation {
          color: #8b6914 !important;
        }
        
        body.superadmin-theme-navbar .emergency-icon.active .fa-triangle-exclamation {
          color: #b8860b !important;
          animation: pulse 1.5s infinite !important;
        }
        
        body.superadmin-theme-navbar .emergency-icon:hover {
          background: rgba(255, 215, 0, 0.2) !important;
          transform: scale(1.1) !important;
        }
        
        body.superadmin-theme-navbar .nav-logo {
          filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)) !important;
        }
        
        /* Super Admin Crown Icon Animation */
        body.superadmin-theme-navbar .fa-crown {
          animation: crownGlow 2s infinite alternate;
        }
        
        @keyframes crownGlow {
          0% {
            filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
            transform: scale(1);
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
            transform: scale(1.1);
          }
        }
        
        /* Super Admin Badge Animation */
        body.superadmin-theme-navbar .superadmin-badge {
          animation: goldGlow 3s infinite;
        }
        
        /* Super Admin Notification Badge */
        body.superadmin-theme-navbar .notification-badge {
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%) !important;
          box-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
          font-weight: 700;
        }
        
        /* Super Admin Profile Image Border */
        body.superadmin-theme-navbar .profile-image {
          border: 3px solid #ffd700 !important;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
        }
        
        body.superadmin-theme-navbar .profile-image:hover {
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8) !important;
          transform: scale(1.05);
          transition: all 0.3s ease;
        }
        
        /* Profile image border colors for other roles */
        body.doctor-theme-navbar .profile-image {
          border: 2px solid #101012ff !important;
        }
        
        body.patient-theme-navbar .profile-image {
          border: 2px solid #991b1b !important;
        }
        
        body.nurse-theme-navbar .profile-image {
          border: 2px solid #c2185b !important;
        }
        
        body.assistant-theme-navbar .profile-image {
          border: 2px solid #7b1fa2 !important;
        }
        
        body.technician-theme-navbar .profile-image {
          border: 2px solid #f57c00 !important;
        }
        
        body.housekeeping-theme-navbar .profile-image {
          border: 2px solid #f9a825 !important;
        }
        
        body.supervisor-theme-navbar .profile-image {
          border: 2px solid #00838f !important;
        }
        
        body.manager-theme-navbar .profile-image {
          border: 2px solid #3949ab !important;
        }
        
        body.billing-theme-navbar .profile-image {
          border: 2px solid #388e3c !important;
        }
        
        body.admin-theme-navbar .profile-image {
          border: 2px solid #1976d2 !important;
        }
        
        /* Profile image hover effect for all roles */
        .profile-image:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        /* Emergency icon hover effect */
        .emergency-icon:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
          background: rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Notification icon hover effect */
        .notification-link:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        
        /* Sidebar toggle button hover effect */
        .sidebar-toggle-btn:hover {
          background: rgba(0, 0, 0, 0.1) !important;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }
        
        /* ========== RESPONSIVE DESIGN ========== */
        
        /* Extra small devices (phones, less than 576px) */
        @media (max-width: 575.98px) {
          .navbar {
            height: 55px !important;
          }
          
          .nav-container {
            padding: 0 10px;
          }
          
          .nav-content {
            padding: 0 3px;
          }
          
          .nav-icons-container {
            gap: 6px;
          }
          
          .sidebar-toggle-btn {
            margin-right: 10px !important;
            min-width: 30px !important;
            min-height: 30px !important;
            font-size: 16px !important;
          }
          
          /* Show logo2 on extra small screens */
          .nav-logo-large {
            display: none !important;
          }
          
          .nav-logo-small {
            display: block !important;
            width: 50px !important;
            height: 30px !important;
          }
          
          /* Adjust logo size for very small screens */
          @media (max-width: 350px) {
            .nav-logo-small {
              width: 45px !important;
              height: 28px !important;
            }
          }
        }
        
        /* Small devices (tablets, 576px - 767.98px) */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .navbar {
            height: 58px !important;
          }
          
          .nav-container {
            padding: 0 12px;
          }
          
          .nav-icons-container {
            gap: 8px;
          }
          
          .sidebar-toggle-btn {
            margin-right: 12px !important;
          }
          
          /* Show logo2 on small tablet screens */
          .nav-logo-large {
            display: none !important;
          }
          
          .nav-logo-small {
            display: block !important;
            width: 60px !important;
            height: 35px !important;
          }
        }
        
        /* Medium devices (tablets, 768px - 991.98px) */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .nav-container {
            padding: 0 20px;
          }
          
          .nav-icons-container {
            gap: 15px;
          }
          
          .sidebar-toggle-btn {
            margin-right: 20px !important;
          }
          
          /* Show logo (large version) on medium tablets */
          .nav-logo-large {
            display: block !important;
            width: 180px !important;
            height: 30px !important;
          }
          
          .nav-logo-small {
            display: none !important;
          }
        }
        
        /* Large devices (desktops, 992px - 1199.98px) */
        @media (min-width: 992px) and (max-width: 1199.98px) {
          .nav-container {
            padding: 0 25px;
          }
          
          .nav-icons-container {
            gap: 18px;
          }
          
          .sidebar-toggle-btn {
            display: none !important;
          }
          
          /* Show logo (large version) on large screens */
          .nav-logo-large {
            display: block !important;
            width: 200px !important;
            height: 32px !important;
          }
          
          .nav-logo-small {
            display: none !important;
          }
        }
        
        /* Extra large devices (large desktops, 1200px and up) */
        @media (min-width: 1200px) {
          .nav-container {
            padding: 0 30px;
          }
          
          .nav-icons-container {
            gap: 20px;
          }
          
          .sidebar-toggle-btn {
            display: none !important;
          }
          
          /* Show logo (large version) on extra large screens */
          .nav-logo-large {
            display: block !important;
            width: 220px !important;
            height: 35px !important;
          }
          
          .nav-logo-small {
            display: none !important;
          }
        }
        
        /* Ultra-wide screens */
        @media (min-width: 1600px) {
          .nav-logo-large {
            width: 240px !important;
            height: 38px !important;
          }
        }
        
        /* Ensure logo doesn't shrink too much on very small screens */
        @media (max-width: 350px) {
          .nav-brand-wrapper {
            min-width: 50px;
          }
        }
        
        /* Adjust for landscape mode on mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .navbar {
            height: 50px !important;
          }
          
          .profile-image {
            width: 30px !important;
            height: 30px !important;
          }
          
          .nav-logo-large,
          .nav-logo-small {
            height: 25px !important;
          }
        }
        
        /* Accessibility improvements */
        .emergency-icon:focus,
        .notification-link:focus,
        .profile-btn:focus,
        .sidebar-toggle-btn:focus {
          outline: 2px solid #4a90e2;
          outline-offset: 2px;
        }
        
        /* Touch-friendly tap targets for mobile */
        @media (max-width: 768px) {
          .emergency-icon,
          .notification-link,
          .profile-btn,
          .sidebar-toggle-btn {
            min-width: 44px;
            min-height: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;