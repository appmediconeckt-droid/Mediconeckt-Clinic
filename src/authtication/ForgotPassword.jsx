import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

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

    // Check if phone number (only digits)
    if (/^\d+$/.test(emailOrPhone)) {
      if (emailOrPhone.length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return;
      }
    } else {
      // Email validation (@ and .com required)
      if (!emailOrPhone.includes("@") || !emailOrPhone.endsWith(".com")) {
        alert("Please enter a valid Email (must include @ and end with .com)");
        return;
      }
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
      <div className="forgot-box">
        <h2>Forgot Password</h2>

        {/* STEP 1: EMAIL / PHONE */}
        {step === 1 && (
          <>
            <label>Enter Email or Phone Number</label>
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </>
        )}

        {/* STEP 2: OTP VERIFY */}
        {step === 2 && (
          <>
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="6 Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <label>New Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
}
