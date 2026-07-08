import { useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle, FaArrowLeft, FaClock } from "react-icons/fa";
import "./DeviceVerification.css";

export default function DeviceVerification({
  onVerify,
  onCancel,
  previousDevice,
  isLoading = false,
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("input"); // 'input' or 'verified'

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (verificationCode.length < 4) {
      setError("Verification code must be at least 4 characters");
      return;
    }

    onVerify(verificationCode);
  };

  return (
    <div className="device-verification-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="device-verification-modal"
      >
        <button
          className="device-verification-close"
          onClick={onCancel}
          disabled={isLoading}
          aria-label="Close"
        >
          ×
        </button>

        <div className="device-verification-content">
          {step === "input" ? (
            <>
              <div className="device-verification-header">
                <div className="device-verification-icon">
                  <FaShieldAlt />
                </div>
                <h2>Verify Your Device</h2>
                <p>
                  We've detected a login from a new device. Please verify it's
                  you.
                </p>
              </div>

              {previousDevice && (
                <div className="device-verification-previous">
                  <div className="device-info-label">Previous login device:</div>
                  <div className="device-info">
                    <div className="device-info-item">
                      <span className="device-label">Device ID:</span>
                      <span className="device-value">
                        {previousDevice.device_id?.substring(0, 20)}...
                      </span>
                    </div>
                    <div className="device-info-item">
                      <span className="device-label">Browser:</span>
                      <span className="device-value">
                        {previousDevice.device_name?.substring(0, 50)}...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="device-verification-form">
                <div className="device-verification-input-group">
                  <label>Verification Code</label>
                  <div className="device-verification-code-hint">
                    <FaClock className="hint-icon" />
                    <span>Check your email or phone for a code</span>
                  </div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter verification code"
                    disabled={isLoading}
                    autoFocus
                    maxLength="50"
                  />
                  {error && (
                    <div className="device-verification-error">{error}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="device-verification-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Device"}
                </button>
              </form>

              <div className="device-verification-footer">
                <button
                  type="button"
                  className="device-verification-cancel"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  <FaArrowLeft /> Back to Login
                </button>
                <p className="device-verification-info">
                  Your account security is important to us. We send verification
                  codes to prevent unauthorized access.
                </p>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="device-verification-success"
            >
              <div className="device-verification-success-icon">
                <FaCheckCircle />
              </div>
              <h2>Device Verified!</h2>
              <p>Your device has been verified successfully.</p>
              <p className="device-verification-success-redirect">
                You'll be redirected shortly...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
