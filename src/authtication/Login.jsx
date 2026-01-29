import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaKey,
  FaUserNurse,
  FaUsers,
  FaMicroscope,
  FaBroom,
  FaUserTie,
  FaFileInvoiceDollar,
  FaUserMd,
  FaUserInjured,
  FaCaretDown,
  FaUserShield // Added for Super Admin
} from "react-icons/fa";
import "./Login.css";
import { motion } from "framer-motion";
import logo from "../image/Mediconect Logo-2.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define role-specific paths - ADDED SUPER ADMIN
  const rolePaths = {
    doctor: "/doctordashboard",
    patient: "/appointmentbooking",
    nurse: "/hospital/nurse-dashboard",
    assistant: "/hospital/assistant-dashboard",
    technician: "/hospital/lab-dashboard",
    housekeeping: "/hospital/housekeeping-dashboard",
    supervisor: "/hospital/supervisor-dashboard",
    manager: "/hospital/manager-dashboard",
    billing: "/hospital/billing-dashboard",
    admin: "/hospital/admin-dashboard",
    superadmin: "/superadmin/dashboard" // Added Super Admin path
  };

  // Define hospital departments as individual roles - ADDED SUPER ADMIN
  const userRoles = [
    { value: "", label: "Select Role", icon: <FaCaretDown />, description: "Choose your role" },
    { value: "superadmin", label: "Super Administrator", icon: <FaUserShield />, description: "Full system control and management" },
    { value: "patient", label: "Patient", icon: <FaUserInjured />, description: "Book appointments and manage health" },
    { value: "doctor", label: "Doctor", icon: <FaUserMd />, description: "Manage appointments and patient records" },
    { value: "nurse", label: "Nurse", icon: <FaUserNurse />, description: "Patient care and medical assistance" },
    { value: "assistant", label: "Medical Assistant", icon: <FaUsers />, description: "Support medical procedures" },
    { value: "technician", label: "Lab Technician", icon: <FaMicroscope />, description: "Laboratory testing and analysis" },
    { value: "housekeeping", label: "Housekeeping Staff", icon: <FaBroom />, description: "Hospital cleanliness and maintenance" },
    { value: "supervisor", label: "Supervisor", icon: <FaUserTie />, description: "Department supervision" },
    { value: "manager", label: "Department Manager", icon: <FaUserTie />, description: "Department management" },
    { value: "billing", label: "Billing Staff", icon: <FaFileInvoiceDollar />, description: "Financial transactions and billing" },
    { value: "admin", label: "Administrator", icon: <FaUserTie />, description: "System administration" }
  ];

  const [form, setForm] = useState({ 
    identifier: "", 
    password: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState(""); // Start with no default role
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: ""
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [roleFromSignup, setRoleFromSignup] = useState("");

  // Check for role from URL query parameters or localStorage
  useEffect(() => {
    // Check URL query parameters first
    const searchParams = new URLSearchParams(location.search);
    const urlRole = searchParams.get('role');
    
    // Check localStorage for role from signup
    const savedRole = localStorage.getItem("signupRole");
    const loginSavedRole = localStorage.getItem("userRole");
    
    // Priority: URL param > signupRole from localStorage > saved login role
    if (urlRole && (urlRole === "doctor" || urlRole === "patient" || urlRole === "superadmin")) {
      setRoleFromSignup(urlRole);
      setUserRole(urlRole);
      localStorage.setItem("userRole", urlRole);
      // Clear the signupRole from localStorage after using
      localStorage.removeItem("signupRole");
      
      // Show notification about auto-selected role
      setTimeout(() => {
        showNotification("success", `Role auto-selected from signup: ${urlRole.charAt(0).toUpperCase() + urlRole.slice(1)}`);
      }, 500);
    } else if (savedRole && (savedRole === "doctor" || savedRole === "patient" || savedRole === "superadmin")) {
      setRoleFromSignup(savedRole);
      setUserRole(savedRole);
      localStorage.setItem("userRole", savedRole);
      // Clear the signupRole from localStorage after using
      localStorage.removeItem("signupRole");
      
      setTimeout(() => {
        showNotification("success", `Role auto-selected from signup: ${savedRole.charAt(0).toUpperCase() + savedRole.slice(1)}`);
      }, 500);
    } else if (loginSavedRole) {
      setUserRole(loginSavedRole);
    }
  }, [location]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000);
  };

  // Handle role selection
  const handleRoleSelect = (role) => {
    setUserRole(role);
    setIsRoleDropdownOpen(false);
    localStorage.setItem("userRole", role);
    
    if (role) {
      showNotification("success", `Selected ${userRoles.find(r => r.value === role)?.label} role`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      showNotification("error", "Please fill all fields");
      return;
    }

    if (!userRole) {
      showNotification("error", "Please select role first");
      return;
    }

    // Show success notification on right side only
    setLoginSuccess(true);
    setTimeout(() => {
      setLoginSuccess(false);
      navigate(rolePaths[userRole]);
    }, 1500);
  };

  // Get signup route based on role
  const getSignupRoute = () => {
    if (userRole === "patient") return "/patientsignup";
    if (userRole === "doctor") return "/signup";
    if (userRole === "superadmin") return "/superadmin/signup";
    return "#";
  };

  // Get current role for display
  const getDisplayRole = () => {
    return userRoles.find(r => r.value === userRole)?.label || "Select Role";
  };

  // Get selected role details
  const getSelectedRoleDetails = () => {
    if (userRole) {
      return userRoles.find(r => r.value === userRole);
    }
    return userRoles[0]; // Return "Select Role"
  };

  return (
    <div className="med-login-container">
      {/* LEFT LOGO SECTION */}
      <div className="med-login-left-side">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="med-logo-container"
        >
          <img src={logo} width={300} alt="Mediconect Logo" className="med-logo" />
        </motion.div>
        
        {/* Role indicator for signup flow */}
        {roleFromSignup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="med-role-indicator"
          >
            {/* Role indicator content (commented out as in original) */}
          </motion.div>
        )}
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="med-login-right-side">
        {/* Right-side specific success notification */}
        {loginSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="med-right-success-notification"
          >
            <div className="med-right-success-content">
              <FaCheckCircle className="med-right-success-icon" />
              <div className="med-right-success-text">
                <span className="med-right-success-title">Login Successful!</span>
                <span className="med-right-success-role">
                  Logging in as {getDisplayRole()}
                </span>
              </div>
            </div>
            <div className="med-right-success-progress">
              <div className="med-right-success-progress-bar"></div>
            </div>
          </motion.div>
        )}
        
        <div className="med-login-right-content">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="med-login-form-wrapper"
          >
            <form onSubmit={handleLogin} className="med-login-form">
              <div className="med-form-header">
                <h2 className="med-form-title">Welcome Back</h2>
                <p className="med-form-subtitle">
                  {roleFromSignup 
                    ? `Continue as ${roleFromSignup.charAt(0).toUpperCase() + roleFromSignup.slice(1)}` 
                    : "Sign in to continue"}
                </p>
              </div>

              {/* ROLE SELECTION DROPDOWN */}
              <div className="med-role-section">
                <label className="med-section-label">Select Role</label>
                
                <div className="med-role-dropdown-container">
                  <button
                    type="button"
                    className={`med-role-dropdown-toggle ${isRoleDropdownOpen ? 'med-dropdown-open' : ''} ${userRole ? 'med-role-selected' : ''} ${roleFromSignup ? 'med-role-from-signup' : ''}`}
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  >
                    <div className="med-role-toggle-content">
                      <span className="med-role-toggle-icon">
                        {getSelectedRoleDetails().icon}
                      </span>
                      <div className="med-role-toggle-info">
                        <span className="med-role-toggle-text">
                          {getDisplayRole()}
                        </span>
                        {userRole && getSelectedRoleDetails().description && (
                          <span className="med-role-toggle-desc">
                            {getSelectedRoleDetails().description}
                          </span>
                        )}
                      </div>
                    </div>
                    <FaCaretDown className={`med-dropdown-arrow ${isRoleDropdownOpen ? 'med-arrow-rotate' : ''}`} />
                  </button>
                  
                  {isRoleDropdownOpen && (
                    <div className="med-role-dropdown-menu">
                      {userRoles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          className={`med-role-dropdown-item ${userRole === role.value ? 'med-role-item-active' : ''} ${roleFromSignup && role.value === roleFromSignup ? 'med-role-from-signup-item' : ''} ${role.value === 'superadmin' ? 'med-superadmin-item' : ''}`}
                          onClick={() => handleRoleSelect(role.value)}
                        >
                          <span className="med-role-item-icon">{role.icon}</span>
                          <div className="med-role-item-info">
                            <span className="med-role-item-label">{role.label}</span>
                            {role.description && (
                              <span className="med-role-item-desc">{role.description}</span>
                            )}
                          </div>
                          {userRole === role.value && (
                            <FaCheckCircle className="med-role-item-check" />
                          )}
                          {role.value === 'superadmin' && (
                            <span className="med-superadmin-badge">Top Level</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
              </div>

              {/* LOGIN FORM FIELDS */}
              <div className="med-input-group">
                <label className="med-input-label">
                  <FaUser className="med-input-icon" /> Email / Phone
                </label>
                <input
                  className="med-input-field"
                  value={form.identifier}
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                  placeholder={roleFromSignup === "doctor" ? "Enter doctor email" : roleFromSignup === "patient" ? "Enter patient email or phone" : roleFromSignup === "superadmin" ? "Enter super admin email" : "Enter email or phone number"}
                />
              </div>

              <div className="med-input-group">
                <label className="med-input-label">
                  <FaKey className="med-input-icon" /> Password
                </label>
                <div className="med-password-container">
                  <input
                    className="med-input-field"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="med-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button 
                type="submit" 
                className={`med-login-button ${userRole ? 'med-login-has-role' : ''} ${roleFromSignup ? 'med-login-from-signup' : ''} ${userRole === 'superadmin' ? 'med-superadmin-button' : ''}`}
              >
                {userRole 
                  ? `SIGN IN AS ${getDisplayRole().toUpperCase()}` 
                  : 'SIGN IN'}
              </button>

              {/* SIGNUP PROMPT (Only for Doctor, Patient & Super Admin) */}
              {(userRole === "patient" || userRole === "doctor" || userRole === "superadmin") && (
                <div className="med-signup-container">
                  <span className="med-signup-text">
                    {roleFromSignup === userRole 
                      ? `Don't have ${userRole} account?` 
                      : "Don't have an account?"}
                  </span>
                  <Link to={getSignupRoute()} className="med-signup-link">
                    {roleFromSignup === userRole 
                      ? `Create ${userRole} account` 
                      : `Sign up as ${getDisplayRole()}`}
                  </Link>
                </div>
              )}

              {/* FORGOT PASSWORD */}
              <div className="med-forgot-password">
                <Link to="/forgot-password" className="med-forgot-link">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* MAIN NOTIFICATION (for errors/info) */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`med-notification med-notification-${notification.type}`}
        >
          {notification.type === "success" && <FaCheckCircle className="med-notification-icon" />}
          {notification.type === "error" && <FaExclamationCircle className="med-notification-icon" />}
          {notification.type === "info" && <FaExclamationCircle className="med-notification-icon" />}
          <span className="med-notification-text">{notification.message}</span>
        </motion.div>
      )}
    </div>
  );
}