import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const navigate = useNavigate();

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Gynecologist",
    "Orthopedic Surgeon",
    "Pediatrician",
    "ENT Specialist",
    "Dentist",
    "Psychiatrist",
    "Radiologist",
    "Nephrologist",
    "Oncologist",
    "Physician",
    "Gastroenterologist",
    "Urologist",
    "Endocrinologist",
    "Ophthalmologist",
    "Pulmonologist",
    "General Surgeon",
    "Physiotherapist",
  ];

  const [form, setForm] = useState({
    fullname: "",
    speciality: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  // Timer
  const [timeLeft, setTimeLeft] = useState(300); // 300 sec = 5 min

  // ⏳ Timer Start When Modal Opens
  useEffect(() => {
    let timer;
    if (modalOpen && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [modalOpen, timeLeft]);

  // Timer format MM:SS
  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Password & Confirm Password not match!");
      return;
    }
    setModalOpen(true);
    setTimeLeft(300); // reset timer on open
  };

  const handleVerify = () => {
    if (timeLeft <= 0) {
      alert("OTP Expired! Please resend OTP.");
      return;
    }

    if (emailOtp === "" || phoneOtp === "") {
      alert("Please enter both OTPs");
      return;
    }

    alert("Signup Successfully!");
    setModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div
        className="bg-white p-4 shadow rounded-4"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        {/* Logo */}
        <div className="text-center mb-3">
          <img src="/logo192.png" alt="logo" width="80" />
        </div>

        <h2 className="text-center fw-bold text-primary">Signup</h2>
        <p className="text-center text-muted">Create your account</p>

        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            value={form.fullname}
            onChange={(e) =>
              setForm({ ...form, fullname: e.target.value })
            }
          />
        </div>

        {/* Speciality Dropdown */}
        <div className="mb-3">
          <label className="form-label">Speciality</label>
          <select
            className="form-select"
            value={form.speciality}
            onChange={(e) =>
              setForm({ ...form, speciality: e.target.value })
            }
          >
            <option value="">Select Speciality</option>
            {specialties.map((sp, i) => (
              <option key={i} value={sp}>
                {sp}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span
              className="position-absolute"
              style={{ right: "12px", top: "5px", cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="form-label">Confirm Password</label>
          <div className="position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <span
              className="position-absolute"
              style={{ right: "12px", top: "5px", cursor: "pointer" }}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-primary w-100 fw-bold py-2"
          onClick={handleSubmit}
        >
          Signup
        </button>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            Already have an account? Login
          </Link>
        </div>
      </div>

      {/* OTP Modal */}
      {modalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="bg-white p-4 rounded-4 shadow"
            style={{ width: "350px" }}
          >
            <h5 className="fw-bold text-center mb-3">
              Verify Your Account
            </h5>

            <label>Email OTP</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter email OTP"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
            />

            <label>Phone OTP</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter phone OTP"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
            />

            {/* Timer */}
            <p className="text-center text-danger fw-bold mb-3">
              OTP Valid For: {formatTime()}
            </p>

            <button className="btn btn-success w-100" onClick={handleVerify}>
              Verify & Complete Signup
            </button>

            <button
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
