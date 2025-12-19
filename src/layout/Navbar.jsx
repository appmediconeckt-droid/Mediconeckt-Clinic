import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [alarmVolume, setAlarmVolume] = useState(0.7); // Default volume 70%
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const alarmSoundRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cd3WPk9UN_F0b0ieXUS5ufEV0fgYfuDO1Q&s"
  );

  // Get user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Initialize alarm sound
  useEffect(() => {
    // Create alarm sound (using a siren sound)
    const audio = new Audio();
    
    // Using an online emergency siren sound
    audio.src = "https://assets.mixkit.co/sfx/preview/mixkit-emergency-siren-1000.mp3";
    audio.loop = true;
    audio.volume = alarmVolume;
    
    // For offline fallback, you can create a beep sound
    const createBeepSound = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1000; // High frequency for emergency
        oscillator.type = 'sawtooth'; // More piercing sound
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

    return () => {
      if (alarmSoundRef.current?.audio) {
        alarmSoundRef.current.audio.pause();
        alarmSoundRef.current.audio.currentTime = 0;
      }
      if (alarmSoundRef.current?.beepSound) {
        alarmSoundRef.current.beepSound.oscillator.stop();
      }
    };
  }, []);

  // Update volume when alarmVolume changes
  useEffect(() => {
    if (alarmSoundRef.current?.audio) {
      alarmSoundRef.current.audio.volume = alarmVolume;
    }
    if (alarmSoundRef.current?.beepSound) {
      alarmSoundRef.current.beepSound.gainNode.gain.value = 0.5 * alarmVolume;
    }
  }, [alarmVolume]);

  // Handle emergency click
  const handleEmergencyClick = (e) => {
    e.preventDefault();
    
    if (!isEmergencyActive) {
      startEmergencyAlarm();
    } else {
      stopEmergencyAlarm();
    }
  };

  const startEmergencyAlarm = () => {
    setIsEmergencyActive(true);
    document.body.classList.add("emergency-active");
    
    // Try to play online audio first
    const playOnlineAudio = () => {
      if (alarmSoundRef.current?.audio) {
        alarmSoundRef.current.audio.play()
          .then(() => {
            console.log("Online alarm playing");
          })
          .catch(err => {
            console.log("Online audio failed, falling back to beep:", err);
            playBeepSound();
          });
      } else {
        playBeepSound();
      }
    };

    // Fallback to beep sound
    const playBeepSound = () => {
      if (alarmSoundRef.current?.createBeepSound) {
        const beepSound = alarmSoundRef.current.createBeepSound();
        if (beepSound) {
          beepSound.oscillator.start();
          alarmSoundRef.current.beepSound = beepSound;
        } else {
          // If all else fails, use browser's SpeechSynthesis
          speakEmergencyAlert();
        }
      } else {
        speakEmergencyAlert();
      }
    };

    // Text-to-speech as last resort
    const speakEmergencyAlert = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = "Emergency! Emergency! Help needed!";
        utterance.volume = alarmVolume;
        utterance.rate = 1.5;
        utterance.pitch = 1.2;
        
        // Repeat every 3 seconds
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

  const stopEmergencyAlarm = () => {
    setIsEmergencyActive(false);
    
    // Stop online audio
    if (alarmSoundRef.current?.audio) {
      alarmSoundRef.current.audio.pause();
      alarmSoundRef.current.audio.currentTime = 0;
    }
    
    // Stop beep sound
    if (alarmSoundRef.current?.beepSound) {
      alarmSoundRef.current.beepSound.oscillator.stop();
      alarmSoundRef.current.beepSound = null;
    }
    
    // Stop speech synthesis
    if (alarmSoundRef.current?.speakInterval) {
      clearInterval(alarmSoundRef.current.speakInterval);
      alarmSoundRef.current.speakInterval = null;
    }
    
    window.speechSynthesis?.cancel();
    
    document.body.classList.remove("emergency-active");
    setShowVolumeControl(false);
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
        emergencyIconColor: "#1e40af",
        emergencyActiveColor: "#dc2626",
        notificationColor: "#1e40af",
        brandColor: "#1e3a8a"
      };
    } else {
      return {
        navbarBg: "#ff6b6b",
        emergencyIconColor: "#b91c1c",
        emergencyActiveColor: "#dc2626",
        notificationColor: "#b91c1c",
        brandColor: "#991b1b"
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
              {/* Emergency Icon with Alarm */}
              <div className="emergency-container position-relative">
                <a 
                  className={`emergency-icon ${isEmergencyActive ? 'active' : ''}`} 
                  href="#" 
                  onClick={handleEmergencyClick}
                  title={isEmergencyActive ? "Stop Emergency Alarm" : "Activate Emergency Alarm"}
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
                
                {/* Volume Control Icon */}
                {/* <a 
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
                </a> */}
                
                {/* Volume Slider */}
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

              <Link 
                to="/notifications" 
                className="me-3" 
                style={{
                  color: themeColors.notificationColor, 
                  marginBottom: "20px"
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
                  {/* <span 
                    className="ms-2"
                    style={{
                      color: userRole === "doctor" ? "#1e3a8a" : "#991b1b",
                      fontWeight: "bold"
                    }}
                  >
                    {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "User"}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Emergency Overlay */}
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
              <h2 style={{ color: themeColors.emergencyActiveColor }}>🚨 EMERGENCY ALERT 🚨</h2>
            </div>
            <div className="emergency-body">
              <p className="alert-message">Emergency alarm is active! Please take necessary action.</p>
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
                    backgroundColor: userRole === "doctor" ? "#3b82f6" : "#ef4444",
                    borderColor: userRole === "doctor" ? "#1d4ed8" : "#dc2626"
                  }}
                >
                  <i className="fa-solid fa-volume-high me-2"></i>
                  LOUDER
                </button>
              </div>
            </div>
            <div className="emergency-footer mt-3">
              <small className="text-muted">If alarm is too loud, reduce volume using the slider above.</small>
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