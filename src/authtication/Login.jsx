import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaHeartbeat, FaUser, FaKey } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const rolePaths = {
    doctor: "/doctordashboard",
    patient: "/appointmentbooking",
  };

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [userRole, setUserRole] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Load role from localStorage on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        handleCloseNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  const handleCloseNotification = () => {
    const notificationElement = document.querySelector('.medi-notification-popup');
    if (notificationElement) {
      notificationElement.classList.add('medi-notification-closing');
      setTimeout(() => {
        setNotification({ show: false, type: "", message: "" });
      }, 300);
    } else {
      setNotification({ show: false, type: "", message: "" });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.identifier.trim() || !form.password.trim()) {
      showNotification("error", "Please enter both email/phone and password");
      return;
    }

    // Get role from localStorage
    const role = localStorage.getItem("userRole");
    
    if (!role) {
      showNotification("error", "Please select a role first from the landing page");
      return;
    }

    // Check if role exists in rolePaths
    if (rolePaths[role]) {
      // Store login info
      if (rememberMe) {
        localStorage.setItem("rememberedUser", form.identifier);
      }
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", form.identifier);
      
      // Show success notification
      showNotification("success", `Login successful!`);
      
      // Navigate to appropriate dashboard after 1.5 seconds
      setTimeout(() => {
        navigate(rolePaths[role]);
      }, 1500);
    } else {
      showNotification("error", `Invalid role: ${role}. Please select a valid role.`);
    }
  };

  const handleQuickLogin = (role, identifier, password) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
    
    setForm({
      identifier: identifier,
      password: password
    });
    
    showNotification("success", `Logging in as ${role}...`);
    
    setTimeout(() => {
      navigate(rolePaths[role]);
    }, 1500);
  };

  // Get notification icon based on type
  const getNotificationIcon = () => {
    switch(notification.type) {
      case "success":
        return <FaCheckCircle className="medi-notification-icon" />;
      case "error":
        return <FaExclamationCircle className="medi-notification-icon" />;
      case "info":
        return <FaInfoCircle className="medi-notification-icon" />;
      default:
        return <FaInfoCircle className="medi-notification-icon" />;
    }
  };

  // Get notification title based on type
  const getNotificationTitle = () => {
    switch(notification.type) {
      case "success":
        return "Success!";
      case "error":
        return "Error!";
      case "info":
        return "Info";
      default:
        return "Notification";
    }
  };

  return (
    <div className="medi-login-container">
      {/* Left Side - Login Form */}
    

      {/* Right Side - Logo Only */}
      <div className="medi-login-right-side">
        <div className="medi-right-logo-container">
          <div className="medi-right-logo-wrapper">
            <FaHeartbeat className="medi-right-logo-icon" />
          </div>
          <h1 className="medi-right-logo-text">MediConnect+</h1>
          <p className="medi-right-tagline">Secure Healthcare Access</p>
          
          {/* Security Features */}
          <div className="medi-security-features">
            <div className="medi-security-item">
              <div className="medi-security-icon">🔒</div>
              <div className="medi-security-text">
                <strong>Bank-Level Security</strong>
                <small>256-bit encryption</small>
              </div>
            </div>
            <div className="medi-security-item">
              <div className="medi-security-icon">⚡</div>
              <div className="medi-security-text">
                <strong>Instant Access</strong>
                <small>Real-time dashboard</small>
              </div>
            </div>
            <div className="medi-security-item">
              <div className="medi-security-icon">🛡️</div>
              <div className="medi-security-text">
                <strong>HIPAA Compliant</strong>
                <small>Patient data protected</small>
              </div>
            </div>
          </div>
        </div>
      </div>
  <div className="medi-login-left-side">
        <div className="medi-login-form-wrapper">
          {/* Back Button */}
         

          {/* Form Header */}
          <div className="medi-login-header">
            <h2>Welcome Back</h2>
            <p className="medi-login-subtitle">Sign in to continue to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="medi-login-form">
            {/* Email/Phone Input */}
            <div className="medi-input-group">
              <label className="medi-input-label">
                <FaUser className="medi-input-icon" />
                Email or Phone Number
              </label>
              <input
                type="text"
                className="medi-input-field"
                placeholder="Enter your email or phone number"
                value={form.identifier}
                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                required
              />
              <div className="medi-input-underline"></div>
            </div>

            {/* Password Input */}
            <div className="medi-input-group">
              <label className="medi-input-label">
                <FaKey className="medi-input-icon" />
                Password
              </label>
              <div className="medi-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="medi-input-field"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <span
                  className="medi-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <div className="medi-input-underline"></div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="medi-login-options">
              <label className="medi-remember-label">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgotpassword" className="medi-forgot-link">
                Forgot Password?
              </Link>
            </div>

            {/* Role Display */}
            {/* {userRole && (
              <div className="medi-role-display">
                <span className="medi-role-text">
                  Logging in as: <strong>{userRole.toUpperCase()}</strong>
                </span>
                <button 
                  type="button"
                  className="medi-change-role"
                  onClick={() => {
                    localStorage.removeItem("userRole");
                    setUserRole(null);
                    showNotification("info", "Role cleared. Please select a new role from home page.");
                  }}
                >
                  Change
                </button>
              </div>
            )} */}

            {/* Login Button */}
            <button type="submit" className="medi-login-btn">
              SIGN IN {userRole && <span className="medi-role-highlight">AS {userRole.toUpperCase()}</span>}
            </button>

            {/* Signup Link */}
            <div className="medi-signup-prompt">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="medi-signup-link">
                  Sign up now
                </Link>
              </p>
            </div>

            {/* Demo Login Buttons (Optional) */}
            {/* <div className="medi-demo-login">
              <p className="medi-demo-title">Quick Demo Login:</p>
              <div className="medi-demo-buttons">
                <button
                  type="button"
                  className="medi-demo-btn medi-demo-doctor"
                  onClick={() => handleQuickLogin("doctor", "doctor@example.com", "doctor123")}
                >
                  Login as Doctor
                </button>
                <button
                  type="button"
                  className="medi-demo-btn medi-demo-patient"
                  onClick={() => handleQuickLogin("patient", "patient@example.com", "patient123")}
                >
                  Login as Patient
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
      {/* Notification Popup */}
      {notification.show && (
        <div 
          className="medi-notification-popup"
          style={{
            background: notification.type === "success" 
              ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)" 
              : notification.type === "error"
              ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)"
              : "linear-gradient(135deg, #17a2b8 0%, #138496 100%)"
          }}
        >
          <div className="medi-notification-content">
            <div className="medi-notification-header">
              <div className="medi-notification-icon-wrapper">
                {getNotificationIcon()}
              </div>
              <div className="medi-notification-title-section">
                <h5>{getNotificationTitle()}</h5>
                <small>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
            </div>
            
            <div className="medi-notification-body">
              <p>{notification.message}</p>
            </div>
            
            {notification.type === "success" && (
              <div className="medi-notification-progress">
                <div className="medi-progress-bar"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}