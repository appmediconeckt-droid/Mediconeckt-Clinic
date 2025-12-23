import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  // Role to route mapping
  const rolePaths = {
    doctor: "/doctordashboard",
    patient: "/appointmentbooking",
    // admin: "/admindashboard",
    // superadmin: "/superadmin",
    // staff: "/staffdashboard",
  };

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Load role from localStorage on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.identifier.trim() || !form.password.trim()) {
      setError("Please enter both email/phone and password");
      return;
    }

    // Get role from localStorage
    const role = localStorage.getItem("userRole");
    
    if (!role) {
      setError("Please select a role first from the landing page");
      return;
    }

    // Check if role exists in rolePaths
    if (rolePaths[role]) {
      // Simulate login success
      // Here you would typically make an API call
      
      // Store login info (optional)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", form.identifier);
      
      // Navigate to appropriate dashboard
      navigate(rolePaths[role]);
    } else {
      setError(`Invalid role: ${role}. Please select a valid role.`);
    }
  };

  const handleQuickLogin = (role, identifier, password) => {
    // For demo purposes - quick login with predefined credentials
    localStorage.setItem("userRole", role);
    setUserRole(role);
    
    setForm({
      identifier: identifier,
      password: password
    });
    
    // Auto login after 500ms
    setTimeout(() => {
      navigate(rolePaths[role]);
    }, 500);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-white p-4 shadow rounded-4"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        {/* Logo */}
        <div className="text-center mb-3">
          <img src="/logo192.png" alt="logo" width="80" />
        </div>

        <h2 className="text-center fw-bold text-primary">Mediconneckt</h2>
        <p className="text-center text-muted">
          Inspire. Engage. Connect Online.
        </p>

        {/* Current Role Indicator */}
        {/* {userRole && (
          <div className="alert alert-info py-2 mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <strong>Current Role:</strong> {userRole.toUpperCase()}
              </span>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  localStorage.removeItem("userRole");
                  setUserRole(null);
                }}
              >
                Change
              </button>
            </div>
          </div>
        )} */}

        {/* Error Message */}
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email/Phone */}
          <div className="mb-3">
            <label className="form-label">Email or Phone Number</label>
            <input
              type="text"
              placeholder="Enter email or phone"
              className="form-control"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span
                className="position-absolute"
                style={{
                  right: "12px",
                  top: "5px",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "18px",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-bold mb-3 py-2"
          >
            LOGIN TO {userRole ? userRole.toUpperCase() : "User"}
          </button>
        </form>

        <div className="text-center mb-4">
          <Link className="text-decoration-none" to="/">
            New Patient & Doctor? Create Account
          </Link>
        </div>

        {/* Forgot Password */}
        <div className="text-center mb-4">
          <Link
            className="text-decoration-none text-muted"
            to="/forgotpassword"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Quick Demo Login Buttons */}
        {/* <div className="border-top pt-3">
          <p className="text-center text-muted mb-3">Quick Demo Login</p>
          <div className="row g-2">
            <div className="col-6">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => handleQuickLogin("doctor", "doctor@example.com", "doctor123")}
              >
                <small>Login as Doctor</small>
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-outline-success w-100"
                onClick={() => handleQuickLogin("patient", "patient@example.com", "patient123")}
              >
                <small>Login as Patient</small>
              </button>
            </div>
          </div>
        </div> */}

        {/* No Role Selected Message */}
        {/* {!userRole && (
          <div className="alert alert-warning mt-3">
            <small>
              <i className="fas fa-exclamation-triangle me-2"></i>
              No role selected. Please go back to{" "}
              <Link to="/" className="text-decoration-none">
                landing page
              </Link>{" "}
              to select your role first.
            </small>
          </div>
        )} */}
      </div>
    </div>
  );
}