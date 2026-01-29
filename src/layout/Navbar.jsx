import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../image/Mediconect-Logo-4.png';

const Navbar = ({ toggleSidebar }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [alarmVolume, setAlarmVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [hospitalDept, setHospitalDept] = useState(null);
  const alarmSoundRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const navigate = useNavigate();

  // Get user role and department from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const dept = localStorage.getItem("hospitalDept");
    setUserRole(role);
    setHospitalDept(dept);
  }, []);

  // Get theme colors based on user role - ADDED SUPER ADMIN
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
        navbarBg: "#8af5aaff",
        notificationColor: "#191515ff",
        brandColor: "#991b1b"
      };
    } else if (userRole === "nurse") {
      return {
        navbarBg: "#ffd6e7",
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
    else if (userRole === "superadmin") { // ADDED SUPER ADMIN
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
      'superadmin-theme-navbar' // ADDED SUPER ADMIN
    ];

    allClasses.forEach(cls => {
      document.body.classList.remove(cls);
    });

    // Add appropriate role class
    if (userRole === "doctor") {
      document.body.classList.add('doctor-theme-navbar');
    } else if (userRole === "patient") {
      document.body.classList.add('patient-theme-navbar');
    } else if (userRole === "hospital" && hospitalDept) {
      document.body.classList.add(`${hospitalDept}-theme-navbar`);
    } else if (userRole === "superadmin") {
      document.body.classList.add('superadmin-theme-navbar');
    }
  }, [userRole, hospitalDept]);

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
      const dept = hospitalDept;
      if (dept === "nurse") {
        navigate("/hospital/nurse-notifications");
      } else if (dept === "admin") {
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

  // Handle profile image click - Different routes based on role
  const handleProfileClick = () => {
    if (userRole === "doctor") {
      setShowAvatarModal(true);
    } else if (userRole === "patient") {
      navigate("/patient-profile");
    } else if (userRole === "superadmin") {
      navigate("/superadmin/profile");
    } else if (userRole === "hospital") {
      const dept = hospitalDept;
      if (dept) {
        navigate(`/hospital/${dept}-profile`);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("hospitalDept");
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
    if (userRole === "hospital" && hospitalDept) {
      const deptNames = {
        nurse: "Nurse",
        assistant: "Medical Assistant",
        technician: "Lab Technician",
        housekeeping: "Housekeeping Staff",
        supervisor: "Supervisor",
        manager: "Department Manager",
        billing: "Billing Staff",
        admin: "Administrator"
      };
      return deptNames[hospitalDept] || "Hospital Staff";
    }
    return "User";
  };

  // Get role icon
  const getRoleIcon = () => {
    if (userRole === "doctor") return "fa-user-doctor";
    if (userRole === "patient") return "fa-user";
    if (userRole === "superadmin") return "fa-crown";
    if (userRole === "hospital" && hospitalDept) {
      const deptIcons = {
        nurse: "fa-user-nurse",
        assistant: "fa-user-md",
        technician: "fa-flask",
        housekeeping: "fa-broom",
        supervisor: "fa-user-tie",
        manager: "fa-user-cog",
        billing: "fa-file-invoice-dollar",
        admin: "fa-user-shield"
      };
      return deptIcons[hospitalDept] || "fa-user";
    }
    return "fa-user";
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
          height: "60px",
          borderBottom: userRole === "superadmin" ? "3px solid #ffd700" : "none",
          boxShadow: userRole === "superadmin" ? "0 4px 15px rgba(255, 215, 0, 0.3)" : "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <div className="nav-conte">
          <div className="nav-content">
            <div className="nav-brand d-flex align-items-center mb-4">
              <motion.img
                src={logo}
                alt="Mediconect Logo"
                width={220}
                height={35}
                className="me-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{
                  filter: userRole === "superadmin" ? "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))" : "none"
                }}
              />

            </div>

            <div className="nav-main-icon d-flex align-items-center">
              {/* Emergency Icon - Only for DOCTOR and SUPER ADMIN roles */}
              {(userRole === "doctor") && (
                <div className="emergency-container position-relative d-flex ">
                  <button
                    onClick={handleEmergencyClick}
                    className="emergency-icon mb-4"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "5px",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                      
                    }}
                  >
                    <i className={`fa-solid fa-triangle-exclamation ${isEmergencyActive ? 'fa-beat-fade' : ''}`}
                      style={{ fontSize: "20px" }}></i>
                  </button>
                  {isEmergencyActive && (
                    <span className="emergency-alert" style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      width: "10px",
                      height: "10px",
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
                className="me-3"
                onClick={handleNotificationClick}
                style={{
                  color: themeColors.notificationColor,
                  marginBottom: "20px",
                  textDecoration: "none",
                  position: "relative",
                  fontSize: "20px"
                }}
              >
                <i className="fa-solid fa-bell"></i>
                <span className="notification-badge" style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: userRole === "superadmin" ? "#ff0000" : "#dc2626",
                  color: "white",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>3</span>
              </Link>

              {/* Profile Image with Dropdown */}
              <div className="dropdown profile-element position-relative">
                <div
                  className="fw-bold p-1 rounded-4 profile d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowAvatarModal(!showAvatarModal)}
                >
                  <div className="position-relative mb-3">
                    <img
                      src={profileImage}
                      alt="profile"
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "-20px",
                        border: userRole === "superadmin" ?
                          "3px solid #ffd700" :
                          `2px solid ${themeColors.notificationColor}`,
                        boxShadow: userRole === "superadmin" ?
                          "0 0 10px rgba(255, 215, 0, 0.5)" : "none"
                      }}
                    />
                    {userRole === "superadmin" && (
                      <div className="superadmin-profile-badge" style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "0",
                        background: "#ffd700",
                        color: "#000",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        border: "2px solid #000"
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
          background-color: #8af5aaff !important;
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
          color: #000000 !important;
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
        
        body.superadmin-theme-navbar .nav-brand img {
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
        body.superadmin-theme-navbar .profile img {
          border: 3px solid #ffd700 !important;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
        }
        
        body.superadmin-theme-navbar .profile img:hover {
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8) !important;
          transform: scale(1.05);
          transition: all 0.3s ease;
        }
        
        /* Profile image border colors for other roles */
        body.doctor-theme-navbar .profile img {
          border: 2px solid #101012ff !important;
        }
        
        body.patient-theme-navbar .profile img {
          border: 2px solid #991b1b !important;
        }
        
        body.nurse-theme-navbar .profile img {
          border: 2px solid #c2185b !important;
        }
        
        body.assistant-theme-navbar .profile img {
          border: 2px solid #7b1fa2 !important;
        }
        
        body.technician-theme-navbar .profile img {
          border: 2px solid #f57c00 !important;
        }
        
        body.housekeeping-theme-navbar .profile img {
          border: 2px solid #f9a825 !important;
        }
        
        body.supervisor-theme-navbar .profile img {
          border: 2px solid #00838f !important;
        }
        
        body.manager-theme-navbar .profile img {
          border: 2px solid #3949ab !important;
        }
        
        body.billing-theme-navbar .profile img {
          border: 2px solid #388e3c !important;
        }
        
        body.admin-theme-navbar .profile img {
          border: 2px solid #1976d2 !important;
        }
        
        /* Avatar Modal Close Button */
        .avatar-modal::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }
        
        /* Close modal when clicking outside */
        .avatar-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: 999;
        }
      `}</style>

      {/* Backdrop to close modal when clicking outside */}
      {showAvatarModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowAvatarModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;