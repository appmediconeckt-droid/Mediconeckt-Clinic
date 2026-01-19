import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaUserMd,
    FaStethoscope,
    FaPhone,
    FaEnvelope,
    FaLock,
    FaUser,
    FaBuilding,
    FaIdCard,
    FaUsers,
    FaArrowLeft as FaLeftArrow,
    FaUserNurse,
    FaMicroscope,
    FaBroom,
    FaUserTie,
    FaFileInvoiceDollar
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from '../../image/Mediconect Logo-2.png';
import "./HospitalSignup.css";

export default function HospitalSignup() {
    const navigate = useNavigate();

    const departments = [
        "Emergency",
        "ICU/CCU",
        "Operation Theater",
        "Radiology",
        "Pathology",
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "Gynecology",
        "General Ward",
        "Pharmacy",
        "Administration",
        "Housekeeping",
        "Maintenance"
    ];

    const roles = [
        { value: "nurse", label: "Nurse", icon: <FaUserNurse /> },
        { value: "assistant", label: "Medical Assistant", icon: <FaUsers /> },
        { value: "technician", label: "Lab Technician", icon: <FaMicroscope /> },
        { value: "housekeeping", label: "Housekeeping Staff", icon: <FaBroom /> },
        { value: "supervisor", label: "Supervisor", icon: <FaUserTie /> },
        { value: "manager", label: "Department Manager", icon: <FaUserTie /> },
        { value: "billing", label: "Billing Staff", icon: <FaFileInvoiceDollar /> },
        { value: "admin", label: "Administrator", icon: <FaUserTie /> }
    ];

    const [form, setForm] = useState({
        fullname: "",
        employeeId: "",
        role: "",
        department: "",
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
        if (!form.fullname || !form.email || !form.phone || !form.password || !form.employeeId || !form.role) {
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

        alert("Hospital Staff Signup Successful!");
        setModalOpen(false);
        navigate("/hospital-login");
    };

    const handleResendOtp = () => {
        setTimeLeft(300);
        alert("New OTP sent to your email and phone!");
    };

    return (
        <div className="hosp-signup-container">
            {/* Left Side - Form Section */}
            <div className="hosp-signup-right-side">
                <div className="hosp-right-content">
                    {/* Logo Container */}
                    <div className="hosp-right-logo-container">
                        <div className="hosp-right-logo-wrapper">
                            <motion.img
                                src={logo}
                                alt="Hospital Logo"
                                width={250}
                                height={140}
                                className="me-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Title and Tagline */}
                    <div className="hosp-right-text-container">
                       
                    </div>

                    
                </div>
            </div>

            {/* Right Side - Banner Section */}
           
             <div className="hosp-signup-left-side">
                <div className="hosp-signup-form-wrapper">
                    {/* Back Button */}
                    <div className="hosp-back-button">
                        <Link to="/" className="hosp-back-link">
                            <FaLeftArrow className="hosp-back-icon" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Logo */}
                    <div className="hosp-signup-logo">
                        <FaBuilding className="hosp-signup-logo-icon" />
                       
                    </div>

                    {/* Form Header */}
                    <div className="hosp-form-header-section">
                        <h2>Hospital Staff Registration</h2>
                       
                    </div>

                    {/* Signup Form */}
                    <div className="hosp-signup-form">
                        <div className="hosp-form-row">
                            {/* Full Name */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaUser className="hosp-input-icon" />
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    className="hosp-form-input"
                                    placeholder="Enter your full name"
                                    value={form.fullname}
                                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                                />
                            </div>

                            {/* Employee ID */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaIdCard className="hosp-input-icon" />
                                    Employee ID *
                                </label>
                                <input
                                    type="text"
                                    className="hosp-form-input"
                                    placeholder="Enter your employee ID"
                                    value={form.employeeId}
                                    onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="hosp-form-row">
                            {/* Role Dropdown */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaUsers className="hosp-input-icon" />
                                    Role *
                                </label>
                                <div className="hosp-custom-select">
                                    <select
                                        className="hosp-select-input"
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    >
                                        <option value="">Select your role</option>
                                        {roles.map((role, i) => (
                                            <option key={i} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="hosp-select-arrow">▼</div>
                                </div>
                                {form.role && (
                                    <div className="hosp-role-selected">
                                        {roles.find(r => r.value === form.role)?.icon}
                                        <span>{roles.find(r => r.value === form.role)?.label}</span>
                                    </div>
                                )}
                            </div>

                            {/* Department Dropdown */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaBuilding className="hosp-input-icon" />
                                    Department
                                </label>
                                <div className="hosp-custom-select">
                                    <select
                                        className="hosp-select-input"
                                        value={form.department}
                                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                                    >
                                        <option value="">Select department</option>
                                        {departments.map((dept, i) => (
                                            <option key={i} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="hosp-select-arrow">▼</div>
                                </div>
                            </div>
                        </div>

                        <div className="hosp-form-row">
                            {/* Contact Number */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaPhone className="hosp-input-icon" />
                                    Contact Number *
                                </label>
                                <input
                                    type="text"
                                    className="hosp-form-input"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            {/* Email Address */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaEnvelope className="hosp-input-icon" />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    className="hosp-form-input"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="hosp-form-row">
                            {/* Password */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaLock className="hosp-input-icon" />
                                    Password *
                                </label>
                                <div className="hosp-password-input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="hosp-form-input"
                                        placeholder="Create a strong password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                    <span
                                        className="hosp-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="hosp-form-group">
                                <label className="hosp-form-label">
                                    <FaLock className="hosp-input-icon" />
                                    Confirm Password *
                                </label>
                                <div className="hosp-password-input-wrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="hosp-form-input"
                                        placeholder="Confirm your password"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    />
                                    <span
                                        className="hosp-password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="hosp-password-requirements">
                            <p className="hosp-requirements-title">Password must contain:</p>
                            <div className="hosp-requirements-grid">
                                <div className={`hosp-requirement-item ${form.password.length >= 8 ? 'valid' : ''}`}>
                                    <span className="hosp-requirement-check">
                                        {form.password.length >= 8 ? '✓' : '○'}
                                    </span>
                                    <span className="hosp-requirement-text">At least 8 characters</span>
                                </div>
                                <div className={`hosp-requirement-item ${/[A-Z]/.test(form.password) ? 'valid' : ''}`}>
                                    <span className="hosp-requirement-check">
                                        {/[A-Z]/.test(form.password) ? '✓' : '○'}
                                    </span>
                                    <span className="hosp-requirement-text">One uppercase letter</span>
                                </div>
                                <div className={`hosp-requirement-item ${/[0-9]/.test(form.password) ? 'valid' : ''}`}>
                                    <span className="hosp-requirement-check">
                                        {/[0-9]/.test(form.password) ? '✓' : '○'}
                                    </span>
                                    <span className="hosp-requirement-text">One number</span>
                                </div>
                                <div className={`hosp-requirement-item ${/[!@#$%^&*]/.test(form.password) ? 'valid' : ''}`}>
                                    <span className="hosp-requirement-check">
                                        {/[!@#$%^&*]/.test(form.password) ? '✓' : '○'}
                                    </span>
                                    <span className="hosp-requirement-text">One special character</span>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="hosp-terms-section">
                            <label className="hosp-terms-checkbox">
                                <input type="checkbox" required />
                                <span className="hosp-terms-text">
                                    I agree to the hospital's <Link to="/terms" className="hosp-terms-link">Terms of Service</Link> and <Link to="/privacy" className="hosp-terms-link">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="hosp-signup-button"
                            onClick={handleSubmit}
                        >
                            <span className="hosp-button-text">REGISTER AS STAFF</span>
                        </button>

                        {/* Login Link */}
                        <div className="hosp-login-link">
                            <p>
                                Already have an account?{' '}
                                <Link to="/hospital-login" className="hosp-login-text">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Verification Modal */}
            {modalOpen && (
                <div className="hosp-otp-modal-overlay">
                    <div className="hosp-otp-modal">
                        <div className="hosp-otp-header">
                            <h3>Verify Your Staff Account</h3>
                            <p className="hosp-otp-subtitle">Secure verification for hospital staff registration</p>
                        </div>

                        <div className="hosp-verification-steps">
                            <div className={`hosp-step ${verificationStep >= 1 ? 'active' : ''}`}>
                                <div className="hosp-step-number">1</div>
                                <div className="hosp-step-text">Email Verification</div>
                            </div>
                            <div className="hosp-step-connector"></div>
                            <div className={`hosp-step ${verificationStep >= 2 ? 'active' : ''}`}>
                                <div className="hosp-step-number">2</div>
                                <div className="hosp-step-text">Phone Verification</div>
                            </div>
                        </div>

                        {verificationStep === 1 ? (
                            <div className="hosp-verification-step">
                                <div className="hosp-otp-input-group">
                                    <label className="hosp-otp-label">
                                        <FaEnvelope className="hosp-otp-icon" />
                                        Email OTP Verification
                                    </label>
                                    <input
                                        type="text"
                                        className="hosp-otp-input"
                                        placeholder="Enter 6-digit OTP sent to your email"
                                        value={emailOtp}
                                        onChange={(e) => setEmailOtp(e.target.value)}
                                        maxLength={6}
                                    />
                                    <small className="hosp-otp-hint">Check your hospital email for the verification code</small>
                                </div>

                                <button
                                    className="hosp-verify-button hosp-email-verify"
                                    onClick={handleEmailVerification}
                                >
                                    Verify Email & Continue
                                </button>
                            </div>
                        ) : (
                            <div className="hosp-verification-step">
                                <div className="hosp-otp-input-group">
                                    <label className="hosp-otp-label">
                                        <FaPhone className="hosp-otp-icon" />
                                        Phone OTP Verification
                                    </label>
                                    <input
                                        type="text"
                                        className="hosp-otp-input"
                                        placeholder="Enter 6-digit OTP sent to your phone"
                                        value={phoneOtp}
                                        onChange={(e) => setPhoneOtp(e.target.value)}
                                        maxLength={6}
                                    />
                                    <small className="hosp-otp-hint">OTP sent to: {form.phone}</small>
                                </div>

                                <div className="hosp-timer-section">
                                    <div className="hosp-timer-display">
                                        <span className="hosp-timer-icon">⏱️</span>
                                        <span className="hosp-timer-text">OTP Expires in: </span>
                                        <span className="hosp-timer-countdown">{formatTime()}</span>
                                    </div>

                                    <button
                                        className="hosp-resend-button"
                                        onClick={handleResendOtp}
                                        disabled={timeLeft > 240}
                                    >
                                        Resend OTP {timeLeft > 240 && `(${Math.ceil((300 - timeLeft) / 60)} min)`}
                                    </button>
                                </div>

                                <button
                                    className="hosp-verify-button hosp-phone-verify"
                                    onClick={handlePhoneVerification}
                                >
                                    Complete Staff Registration
                                </button>
                            </div>
                        )}

                        <button
                            className="hosp-cancel-button"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel Registration
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}