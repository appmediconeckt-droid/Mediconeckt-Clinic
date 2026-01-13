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
  const alarmSoundRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const navigate = useNavigate();

  // Get user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Initialize alarm sound (only for doctor)
  useEffect(() => {
    if (userRole === "doctor") {
      const audio = new Audio();
      audio.src = "https://assets.mixkit.co/sfx/preview/mixkit-emergency-siren-1000.mp3";
      audio.loop = true;
      audio.volume = alarmVolume;
      
      const createBeepSound = () => {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = 1000;
          oscillator.type = 'sawtooth';
          gainNode.gain.value = 0.5 * alarmVolume;
          
          return { oscillator, gainNode, audioContext };
        } catch (err) {
          console.error("Web Audio API not supported:", err);
          return null;
        }
      };

      alarmSoundRef.current = { 
        audio, 
        createBeepSound,
        beepSound: null 
      };
    }

    return () => {
      if (alarmSoundRef.current?.audio) {
        alarmSoundRef.current.audio.pause();
        alarmSoundRef.current.audio.currentTime = 0;
      }
      if (alarmSoundRef.current?.beepSound) {
        alarmSoundRef.current.beepSound.oscillator.stop();
      }
    };
  }, [userRole]);

  // Update volume when alarmVolume changes (only for doctor)
  useEffect(() => {
    if (userRole === "doctor" && alarmSoundRef.current?.audio) {
      alarmSoundRef.current.audio.volume = alarmVolume;
    }
    if (userRole === "doctor" && alarmSoundRef.current?.beepSound) {
      alarmSoundRef.current.beepSound.gainNode.gain.value = 0.5 * alarmVolume;
    }
  }, [alarmVolume, userRole]);

  // Handle emergency click - only for doctor
  const handleEmergencyClick = (e) => {
    e.preventDefault();
    
    if (userRole === "doctor") {
      // Doctor: Toggle alarm with sound
      if (!isEmergencyActive) {
        startEmergencyAlarm();
      } else {
        stopEmergencyAlarm();
      }
    }
    // Patient: No emergency functionality
  };

  // Doctor: Start emergency alarm with sound
  const startEmergencyAlarm = () => {
    setIsEmergencyActive(true);
    document.body.classList.add("emergency-active");
    
    const playOnlineAudio = () => {
      if (alarmSoundRef.current?.audio) {
        alarmSoundRef.current.audio.play()
          .then(() => {
            console.log("Doctor: Online alarm playing");
          })
          .catch(err => {
            console.log("Doctor: Online audio failed, falling back to beep:", err);
            playBeepSound();
          });
      } else {
        playBeepSound();
      }
    };

    const playBeepSound = () => {
      if (alarmSoundRef.current?.createBeepSound) {
        const beepSound = alarmSoundRef.current.createBeepSound();
        if (beepSound) {
          beepSound.oscillator.start();
          alarmSoundRef.current.beepSound = beepSound;
        } else {
          speakEmergencyAlert();
        }
      } else {
        speakEmergencyAlert();
      }
    };

    const speakEmergencyAlert = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = "Emergency! Emergency! Help needed!";
        utterance.volume = alarmVolume;
        utterance.rate = 1.5;
        utterance.pitch = 1.2;
        
        const speakInterval = setInterval(() => {
          if (isEmergencyActive) {
            window.speechSynthesis.speak(utterance);
          } else {
            clearInterval(speakInterval);
          }
        }, 3000);
        
        alarmSoundRef.current.speakInterval = speakInterval;
      }
    };

    playOnlineAudio();
  };

  // Doctor: Stop emergency alarm
  const stopEmergencyAlarm = () => {
    setIsEmergencyActive(false);
    
    if (alarmSoundRef.current?.audio) {
      alarmSoundRef.current.audio.pause();
      alarmSoundRef.current.audio.currentTime = 0;
    }
    
    if (alarmSoundRef.current?.beepSound) {
      alarmSoundRef.current.beepSound.oscillator.stop();
      alarmSoundRef.current.beepSound = null;
    }
    
    if (alarmSoundRef.current?.speakInterval) {
      clearInterval(alarmSoundRef.current.speakInterval);
      alarmSoundRef.current.speakInterval = null;
    }
    
    window.speechSynthesis?.cancel();
    document.body.classList.remove("emergency-active");
    setShowVolumeControl(false);
  };

  // Handle notification click - different routes based on role
  const handleNotificationClick = (e) => {
    e.preventDefault();
    
    if (userRole === "doctor") {
      navigate("/doctor-notifications");
    } else if (userRole === "patient") {
      navigate("/patient-notifications");
    } else {
      navigate("/notifications");
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAlarmVolume(newVolume);
  };

  const handleVolumeIconClick = (e) => {
    e.stopPropagation();
    setShowVolumeControl(!showVolumeControl);
  };

  // Close volume control when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showVolumeControl) {
        setShowVolumeControl(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showVolumeControl]);

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
    } else {
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

  return (
    <>
      <nav
        className="navbar"
        style={{ 
          position: "fixed", 
          width: "100%", 
          zIndex: 999,
          backgroundColor: themeColors.navbarBg,
          transition: "background-color 0.3s ease"
        }}
      >
        <div className="nav-conte">
          <div className="nav-content">
            <div className="nav-bran d-flex  mb-4 " >
              <motion.img
              src={logo} // imported variable use करें
              alt="Hospital Logo"
              width={220}
              height={35}
              className="me-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
            </div>

            <div className="nav-main-icon d-flex align-items-center">
              {/* Emergency Icon - Only for doctor role */}
              {userRole === "doctor" && (
                
                <div className="emergency-container position-relative d-flex">
                  {/* <div className="dc-location-label mt-1" style={{marginRight:"20px"}}>Indore Saket Nagar</div> */}
                  <a 
                    className={`emergency-icon ${isEmergencyActive ? 'active' : ''}`} 
                    href="#" 
                    onClick={handleEmergencyClick}
                    title={
                      isEmergencyActive ? "Stop Emergency Alarm" : "Activate Emergency Alarm"
                    }
                    style={{ position: "relative", marginRight: "10px" }}
                  >
                    <i
                      className="fa-solid fa-triangle-exclamation"
                      style={{ 
                        fontSize: "20px", 
                        marginBottom: "25px",
                        color: isEmergencyActive ? themeColors.emergencyActiveColor : themeColors.emergencyIconColor,
                        animation: isEmergencyActive ? "pulse 0.5s infinite" : "none"
                      }}
                    ></i>
                    {isEmergencyActive && (
                      <span className="emergency-badge">!</span>
                    )}
                  </a>
                  
                  {/* Volume Control - Only for doctor when emergency is active */}
                  {isEmergencyActive && (
                    <a 
                      className="volume-icon" 
                      href="#" 
                      onClick={handleVolumeIconClick}
                      title="Adjust Alarm Volume"
                      style={{ marginRight: "10px" }}
                    >
                      <i
                        className="fa-solid fa-volume-high"
                        style={{ 
                          fontSize: "18px", 
                          marginBottom: "25px",
                          color: themeColors.emergencyIconColor
                        }}
                      ></i>
                    </a>
                  )}
                  
                  {/* Volume Slider - Only for doctor */}
                  {showVolumeControl && (
                    <div 
                      className="volume-control-popup"
                      style={{
                        position: "absolute",
                        top: "35px",
                        left: "0",
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                        minWidth: "150px",
                        border: `2px solid ${themeColors.emergencyIconColor}`
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <i 
                          className="fa-solid fa-volume-low me-2"
                          style={{ color: themeColors.emergencyIconColor }}
                        ></i>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={alarmVolume}
                          onChange={handleVolumeChange}
                          className="form-range"
                          style={{ width: "100px" }}
                        />
                        <i 
                          className="fa-solid fa-volume-high ms-2"
                          style={{ color: themeColors.emergencyIconColor }}
                        ></i>
                      </div>
                      <div className="text-center small">
                        Volume: {Math.round(alarmVolume * 100)}%
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notification Link - Different routes based on role */}
              <Link 
                href="#" 
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
                      border: userRole === "doctor" ? `2px solid ${themeColors.emergencyIconColor}` : "2px solid #991b1b"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Emergency Overlay - Only for doctor role */}
      {isEmergencyActive && userRole === "doctor" && (
        <div className="emergency-overlay">
          <div 
            className="emergency-alert"
            style={{
              backgroundColor: "#dbeafe",
              border: `3px solid ${themeColors.emergencyActiveColor}`
            }}
          >
            <div className="emergency-header">
              <i 
                className="fa-solid fa-circle-exclamation fa-3x mb-3" 
                style={{ color: themeColors.emergencyActiveColor }}
              ></i>
              <h2 style={{ color: themeColors.emergencyActiveColor }}>
                🚨 EMERGENCY ALARM 🚨
              </h2>
            </div>
            <div className="emergency-body">
              <p className="alert-message">
                Emergency alarm is active! Doctors have been notified with sound.
              </p>
              
              {/* Volume Control - Only for doctor */}
              <div className="volume-control-inline mb-3">
                <label className="form-label" style={{ color: themeColors.emergencyActiveColor }}>
                  Alarm Volume:
                </label>
                <div className="d-flex align-items-center">
                  <i 
                    className="fa-solid fa-volume-off me-2"
                    style={{ color: themeColors.emergencyActiveColor }}
                  ></i>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={alarmVolume}
                    onChange={handleVolumeChange}
                    className="form-range"
                    style={{ 
                      accentColor: themeColors.emergencyActiveColor 
                    }}
                  />
                  <i 
                    className="fa-solid fa-volume-high ms-2"
                    style={{ color: themeColors.emergencyActiveColor }}
                  ></i>
                  <span 
                    className="ms-2"
                    style={{ 
                      color: themeColors.emergencyActiveColor,
                      fontWeight: "bold"
                    }}
                  >
                    {Math.round(alarmVolume * 100)}%
                  </span>
                </div>
              </div>
              
              <div className="emergency-buttons">
                <button 
                  className="btn btn-danger btn-lg"
                  onClick={stopEmergencyAlarm}
                  style={{ 
                    backgroundColor: themeColors.emergencyActiveColor,
                    borderColor: themeColors.emergencyActiveColor
                  }}
                >
                  <i className="fa-solid fa-stop me-2"></i>
                  STOP ALARM
                </button>
                
                <button 
                  className="btn btn-warning btn-lg ms-2"
                  onClick={() => {
                    const newVolume = alarmVolume > 0.5 ? 1 : Math.min(1, alarmVolume + 0.3);
                    setAlarmVolume(newVolume);
                  }}
                  style={{ 
                    backgroundColor: "#3b82f6",
                    borderColor: "#1d4ed8",
                    color: "white"
                  }}
                >
                  <i className="fa-solid fa-volume-high me-2"></i>
                  LOUDER
                </button>
              </div>
            </div>
            <div className="emergency-footer mt-3">
              <small className="text-muted">
                If alarm is too loud, reduce volume using the slider above.
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animation for pulse effect */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .emergency-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: ${themeColors.emergencyActiveColor};
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          animation: pulse 1s infinite;
        }
        
        .emergency-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in;
        }
        
        .emergency-alert {
          background: white;
          padding: 30px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          animation: pulse 2s infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;