import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  // Role to route mapping
  const rolePaths = {
    doctor: "/doctordashboard",
    // admin: "/admindashboard",
    // superadmin: "/superadmin",
    // staff: "/staffdashboard",
    patient: "/patientdashboard",
  };

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Quick login buttons data

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

        {/* Email/Phone */}
        <div className="mb-3">
          <label className="form-label">Email or Phone Number</label>
          <input
            type="text"
            placeholder="Enter email or phone"
            className="form-control"
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
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
        <Link to="/doctordashboard">
        <button className="btn btn-primary w-100 fw-bold mb-3 py-2">
          Login
        </button>
        </Link>

        <div className="text-center mb-4">
          <Link className="text-decoration-none" to="/signup">
            New Patient? Create Account
          </Link>
        </div>

        {/* Forgot Password */}
        <div className="text-center mb-4">
          <Link
            className="text-decoration-none text-muted"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Quick Demo */}
      </div>
    </div>
  );
}
