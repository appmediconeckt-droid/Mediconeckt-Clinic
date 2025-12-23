import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [alarmVolume, setAlarmVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const alarmSoundRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "data:image/jpeg;base64,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"
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

  // Handle emergency click - different behavior based on role
  const handleEmergencyClick = (e) => {
    e.preventDefault();
    
    if (userRole === "doctor") {
      // Doctor: Toggle alarm with sound
      if (!isEmergencyActive) {
        startEmergencyAlarm();
      } else {
        stopEmergencyAlarm();
      }
    } else if (userRole === "patient") {
      // Patient: Show emergency alert without sound
      if (!isEmergencyActive) {
        showPatientEmergencyAlert();
      } else {
        stopPatientEmergencyAlert();
      }
    }
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

  // Patient: Show emergency alert without sound
  const showPatientEmergencyAlert = () => {
    setIsEmergencyActive(true);
    document.body.classList.add("emergency-active");
    
    // No sound for patient, just visual alert
    console.log("Patient: Emergency alert activated (silent mode)");
  };

  // Patient: Stop emergency alert
  const stopPatientEmergencyAlert = () => {
    setIsEmergencyActive(false);
    document.body.classList.remove("emergency-active");
    console.log("Patient: Emergency alert deactivated");
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
        navbarBg: "#41a0f8",
        emergencyIconColor: "#101012ff",
        emergencyActiveColor: "#dc2626",
        notificationColor: "#121314ff",
        brandColor: "#1e3a8a"
      };
    } else if (userRole === "patient") {
      return {
        navbarBg: "#ff6b6b",
        emergencyIconColor: "#1d1919ff",
        emergencyActiveColor: "#dc2626",
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
            <div className="nav-bran d-flex align-items-center">
              <a 
                className="nav-brand" 
                href="#" 
                style={{ 
                  textDecoration: "none", 
                  marginBottom: "20px",
                  color: themeColors.brandColor,
                  fontWeight: "bold",
                  fontSize: "24px"
                }}
              >
                Mediconeckt
              </a>
            </div>

            <div className="nav-main-icon d-flex align-items-center">
              {/* Emergency Icon - Different behavior for doctor and patient */}
              <div className="emergency-container position-relative">
                <a 
                  className={`emergency-icon ${isEmergencyActive ? 'active' : ''}`} 
                  href="#" 
                  onClick={handleEmergencyClick}
                  title={
                    userRole === "doctor" 
                      ? (isEmergencyActive ? "Stop Emergency Alarm" : "Activate Emergency Alarm")
                      : (isEmergencyActive ? "Stop Emergency Alert" : "Send Emergency Alert (Silent)")
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
                {userRole === "doctor" && isEmergencyActive && (
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
                {userRole === "doctor" && showVolumeControl && (
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
                      border: `2px solid ${themeColors.emergencyIconColor}`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Emergency Overlay - Different content based on role */}
      {isEmergencyActive && (
        <div className="emergency-overlay">
          <div 
            className="emergency-alert"
            style={{
              backgroundColor: userRole === "doctor" ? "#dbeafe" : "#fee2e2",
              border: `3px solid ${themeColors.emergencyActiveColor}`
            }}
          >
            <div className="emergency-header">
              <i 
                className="fa-solid fa-circle-exclamation fa-3x mb-3" 
                style={{ color: themeColors.emergencyActiveColor }}
              ></i>
              <h2 style={{ color: themeColors.emergencyActiveColor }}>
                🚨 {userRole === "doctor" ? "EMERGENCY ALARM" : "SILENT EMERGENCY ALERT"} 🚨
              </h2>
            </div>
            <div className="emergency-body">
              <p className="alert-message">
                {userRole === "doctor" 
                  ? "Emergency alarm is active! Doctors have been notified with sound."
                  : "Emergency alert has been sent! Doctors have been notified silently."}
              </p>
              
              {/* Volume Control - Only for doctor */}
              {userRole === "doctor" && (
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
              )}
              
              <div className="emergency-buttons">
                <button 
                  className="btn btn-danger btn-lg"
                  onClick={userRole === "doctor" ? stopEmergencyAlarm : stopPatientEmergencyAlert}
                  style={{ 
                    backgroundColor: themeColors.emergencyActiveColor,
                    borderColor: themeColors.emergencyActiveColor
                  }}
                >
                  <i className="fa-solid fa-stop me-2"></i>
                  {userRole === "doctor" ? "STOP ALARM" : "STOP ALERT"}
                </button>
                
                {/* Louder button - Only for doctor */}
                {userRole === "doctor" && (
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
                )}
              </div>
            </div>
            <div className="emergency-footer mt-3">
              <small className="text-muted">
                {userRole === "doctor" 
                  ? "If alarm is too loud, reduce volume using the slider above."
                  : "This is a silent alert. Doctors will receive notification without sound."}
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