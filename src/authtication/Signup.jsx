import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserMd, FaStethoscope, FaPhone, FaEnvelope, FaLock, FaUser,FaArrowLeft as FaLeftArrow} from "react-icons/fa";
import "./Signup.css";
import { motion } from "framer-motion";
import logo from '../image/Mediconect Logo-2.png';

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
  const [timeLeft, setTimeLeft] = useState(300); // 300 sec = 5 min
  const [verificationStep, setVerificationStep] = useState(1); // 1: email, 2: phone

  // Timer
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
      alert("Password & Confirm Password do not match!");
      return;
    }

    // Check if all required fields are filled
    if (!form.fullname || !form.email || !form.phone || !form.password) {
      alert("Please fill all required fields!");
      return;
    }

    setModalOpen(true);
    setTimeLeft(300); // reset timer on open
    setVerificationStep(1);
  };

  const handleEmailVerification = () => {
    if (emailOtp === "") {
      alert("Please enter email OTP");
      return;
    }
    setVerificationStep(2);
    setEmailOtp("");
  };

  const handlePhoneVerification = () => {
    if (timeLeft <= 0) {
      alert("OTP Expired! Please resend OTP.");
      return;
    }

    if (phoneOtp === "") {
      alert("Please enter phone OTP");
      return;
    }

    alert("Signup Successful!");
    setModalOpen(false);
    navigate("/login");
  };

  const handleResendOtp = () => {
    setTimeLeft(300);
    alert("New OTP sent to your email and phone!");
  };

  return (
    <div className="medi-signup-container">
      {/* Left Side - Complete Signup Form */}


      {/* Right Side - Only Logo */}
      <div className="medi-signup-right-side">
        <div className="medi-right-logo-container">
          <div className="medi-right-logo-wrapper">
            <motion.img
              src={logo} // imported variable use करें
              alt="Hospital Logo"
              width={500}
              height={200}
              className="me-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
          </div>
          {/* <h1 className="medi-right-logo-text">MediConeckt+</h1>
          <p className="medi-right-tagline text-black">Healthcare Redefined</p> */}
        </div>
      </div>
      <div className="medi-signup-left-side">
        <div className="medi-signup-form-wrapper">
          {/* Back Button */}
          <div className="med-back-button">
            <Link to="/" className="med-back-link">
              <FaLeftArrow className="med-back-icon" />
              Back to Home
            </Link>
          </div>
          {/* Logo */}
          <div className="medi-signup-logo">
            <FaUserMd className="medi-signup-logo-icon" />

          </div>

          {/* Form Header */}
          <div className="medi-form-header-section">
            <h2>Create Your Account</h2>
            <p className="medi-form-subtitle">Join thousands of healthcare professionals and patients</p>
          </div>

          {/* Signup Form */}
          <div className="medi-signup-form">
            <div className="medi-form-row">
              {/* Full Name */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaUser className="medi-input-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  className="medi-form-input"
                  placeholder="Enter your full name"
                  value={form.fullname}
                  onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                />
              </div>

              {/* Speciality Dropdown */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaStethoscope className="medi-input-icon" />
                  Speciality
                </label>
                <div className="medi-custom-select">
                  <select
                    className="medi-select-input"
                    value={form.speciality}
                    onChange={(e) => setForm({ ...form, speciality: e.target.value })}
                  >
                    <option value="">Select your speciality</option>
                    {specialties.map((sp, i) => (
                      <option key={i} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                  <div className="medi-select-arrow">▼</div>
                </div>
              </div>
            </div>

            <div className="medi-form-row">
              {/* Contact Number */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaPhone className="medi-input-icon" />
                  Contact Number *
                </label>
                <input
                  type="text"
                  className="medi-form-input"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* Email Address */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaEnvelope className="medi-input-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  className="medi-form-input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="medi-form-row">
              {/* Password */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaLock className="medi-input-icon" />
                  Password *
                </label>
                <div className="medi-password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="medi-form-input"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <span
                    className="medi-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="medi-form-group">
                <label className="medi-form-label">
                  <FaLock className="medi-input-icon" />
                  Confirm Password *
                </label>
                <div className="medi-password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="medi-form-input"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                  <span
                    className="medi-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="medi-password-requirements">
              <p className="medi-requirements-title">Password must contain:</p>
              <div className="medi-requirements-grid">
                <div className={`medi-requirement-item ${form.password.length >= 8 ? 'valid' : ''}`}>
                  <span className="medi-requirement-check">
                    {form.password.length >= 8 ? '✓' : '○'}
                  </span>
                  <span className="medi-requirement-text">At least 8 characters</span>
                </div>
                <div className={`medi-requirement-item ${/[A-Z]/.test(form.password) ? 'valid' : ''}`}>
                  <span className="medi-requirement-check">
                    {/[A-Z]/.test(form.password) ? '✓' : '○'}
                  </span>
                  <span className="medi-requirement-text">One uppercase letter</span>
                </div>
                <div className={`medi-requirement-item ${/[0-9]/.test(form.password) ? 'valid' : ''}`}>
                  <span className="medi-requirement-check">
                    {/[0-9]/.test(form.password) ? '✓' : '○'}
                  </span>
                  <span className="medi-requirement-text">One number</span>
                </div>
                <div className={`medi-requirement-item ${/[!@#$%^&*]/.test(form.password) ? 'valid' : ''}`}>
                  <span className="medi-requirement-check">
                    {/[!@#$%^&*]/.test(form.password) ? '✓' : '○'}
                  </span>
                  <span className="medi-requirement-text">One special character</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="medi-terms-section">
              <label className="medi-terms-checkbox">
                <input type="checkbox" required />
                <span className="medi-terms-text">
                  I agree to the <Link to="/terms" className="medi-terms-link">Terms of Service</Link> and <Link to="/privacy" className="medi-terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="medi-signup-button"
              onClick={handleSubmit}
            >
              <span className="medi-button-text">CREATE ACCOUNT</span>
            </button>

            {/* Login Link */}
            <div className="medi-login-link">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="medi-login-text">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* OTP Verification Modal */}
      {modalOpen && (
        <div className="medi-otp-modal-overlay">
          <div className="medi-otp-modal">
            <div className="medi-otp-header">
              <h3>Verify Your Account</h3>
              <p className="medi-otp-subtitle">Secure verification for your protection</p>
            </div>

            <div className="medi-verification-steps">
              <div className={`medi-step ${verificationStep >= 1 ? 'active' : ''}`}>
                <div className="medi-step-number">1</div>
                <div className="medi-step-text">Email Verification</div>
              </div>
              <div className="medi-step-connector"></div>
              <div className={`medi-step ${verificationStep >= 2 ? 'active' : ''}`}>
                <div className="medi-step-number">2</div>
                <div className="medi-step-text">Phone Verification</div>
              </div>
            </div>

            {verificationStep === 1 ? (
              <div className="medi-verification-step">
                <div className="medi-otp-input-group">
                  <label className="medi-otp-label">
                    <FaEnvelope className="medi-otp-icon" />
                    Email OTP Verification
                  </label>
                  <input
                    type="text"
                    className="medi-otp-input"
                    placeholder="Enter 6-digit OTP sent to your email"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    maxLength={6}
                  />
                  <small className="medi-otp-hint">Check your inbox for the verification code</small>
                </div>

                <button
                  className="medi-verify-button medi-email-verify"
                  onClick={handleEmailVerification}
                >
                  Verify Email & Continue
                </button>
              </div>
            ) : (
              <div className="medi-verification-step">
                <div className="medi-otp-input-group">
                  <label className="medi-otp-label">
                    <FaPhone className="medi-otp-icon" />
                    Phone OTP Verification
                  </label>
                  <input
                    type="text"
                    className="medi-otp-input"
                    placeholder="Enter 6-digit OTP sent to your phone"
                    value={phoneOtp}
                    onChange={(e) => setPhoneOtp(e.target.value)}
                    maxLength={6}
                  />
                  <small className="medi-otp-hint">OTP sent to: {form.phone}</small>
                </div>

                <div className="medi-timer-section">
                  <div className="medi-timer-display">
                    <span className="medi-timer-icon">⏱️</span>
                    <span className="medi-timer-text">OTP Expires in: </span>
                    <span className="medi-timer-countdown">{formatTime()}</span>
                  </div>

                  <button
                    className="medi-resend-button"
                    onClick={handleResendOtp}
                    disabled={timeLeft > 240}
                  >
                    Resend OTP {timeLeft > 240 && `(${Math.ceil((300 - timeLeft) / 60)} min)`}
                  </button>
                </div>

                <button
                  className="medi-verify-button medi-phone-verify"
                  onClick={handlePhoneVerification}
                >
                  Complete Verification
                </button>
              </div>
            )}

            <button
              className="medi-cancel-button"
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