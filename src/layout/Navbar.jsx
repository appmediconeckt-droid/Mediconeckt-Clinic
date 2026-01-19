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
    }  else if (userRole === "housekeeping") {
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
      'admin-theme-navbar'
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
    }
  }, [userRole, hospitalDept]);

  // Handle notification click - different routes based on role
  const handleNotificationClick = (e) => {
    e.preventDefault();

    if (userRole === "doctor") {
      navigate("/doctor-notifications");
    } else if (userRole === "patient") {
      navigate("/patient-notifications");
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

  // Rest of your code remains the same...

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
          height: "60px"
        }}
      >
        <div className="nav-conte">
          <div className="nav-content">
            <div className="nav-bran d-flex mb-4">
              <motion.img
                src={logo}
                alt="Mediconect Logo"
                width={220}
                height={35}
                className="me-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />
            </div>

            <div className="nav-main-icon d-flex align-items-center">
              {/* Emergency Icon - Only for DOCTOR role */}
              {userRole === "doctor" && (
                <div className="emergency-container position-relative d-flex">
                  {/* Your emergency icon code */}
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
                  textDecoration: "none"
                }}
              >
                <i className="fa-solid fa-bell"></i>
              </Link>

              {/* Profile Image */}
              <div className="dropdown profile-element">
                <div
                  className="fw-bold p-1 rounded-4 profile d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={profileImage}
                    alt="profile"
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginTop: "-20px",
                      border: `2px solid ${themeColors.notificationColor}`
                    }}
                  />
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
        
        /* Profile image border colors based on role */
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
      `}</style>
    </>
  );
};

export default Navbar;