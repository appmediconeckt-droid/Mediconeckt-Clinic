import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import "./ForgotPassword.css";
import logo from "../image/Mediconect Logo-2.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = () => {
    if (!emailOrPhone) {
      alert("Please enter Email or Phone Number");
      return;
    }

    if (/^\d+$/.test(emailOrPhone)) {
      if (emailOrPhone.length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return;
      }
    } else if (!emailOrPhone.includes("@") || !emailOrPhone.endsWith(".com")) {
      alert("Please enter a valid Email (must include @ and end with .com)");
      return;
    }

    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successfully!");
    navigate("/login");
  };

  return (
    <div className="forgot-container">
      <section className="forgot-brand-panel">
        <div className="forgot-logo-card">
          <img src={logo} alt="Mediconeckt" />
        </div>
        <div className="forgot-brand-copy">
          <h1>Reset Your Password</h1>
          <p>Verify your account and create a new password to get back into Mediconeckt securely.</p>
        </div>
        <div className="forgot-brand-points">
          <span><FaShieldAlt /> Secure OTP</span>
          <span><FaKey /> Password Reset</span>
          <span><FaCheckCircle /> Quick Access</span>
        </div>
      </section>

      <section className="forgot-form-panel">
        <div className="forgot-box">
          <button className="forgot-back-button" type="button" onClick={() => navigate("/login")}>
            <FaArrowLeft /> Back to Login
          </button>

          <div className="forgot-header">
            <div className="forgot-header-icon">
              {step === 1 && <FaEnvelope />}
              {step === 2 && <FaShieldAlt />}
              {step === 3 && <FaLock />}
            </div>
            <h2>Forgot Password</h2>
            <p>
              {step === 1 && "Enter your registered email or phone number."}
              {step === 2 && "Enter the 6 digit verification code."}
              {step === 3 && "Create a strong new password."}
            </p>
          </div>

          <div className="forgot-steps" aria-label="Password reset progress">
            <span className={step >= 1 ? "active" : ""}>1</span>
            <span className={step >= 2 ? "active" : ""}>2</span>
            <span className={step >= 3 ? "active" : ""}>3</span>
          </div>

          {step === 1 && (
            <>
              <label>Enter Email or Phone Number</label>
              <input
                type="text"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChange={(event) => setEmailOrPhone(event.target.value)}
              />
              <button type="button" onClick={handleSendOtp}>Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="6 Digit OTP"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
              <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
            </>
          )}

          {step === 3 && (
            <>
              <label>New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <button
                  className="eye-icon"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  className="eye-icon"
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="button" onClick={handleResetPassword}>Reset Password</button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
