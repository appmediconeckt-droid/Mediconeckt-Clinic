import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeartbeat, FaUser, FaVenusMars, FaCalendarAlt, FaMapMarkerAlt, FaTint, FaRulerVertical, FaAllergies, FaStethoscope, FaPills, FaPhone, FaEnvelope, FaLock, FaCheckCircle, FaArrowLeft, FaArrowRight, FaMobileAlt, FaShieldAlt, FaCheck, FaArrowLeft as FaLeftArrow, FaHospital, FaUserMd, FaStar } from 'react-icons/fa';
import './PatientSignup.css';

const MedicalPatientSignup = () => {
  // Step state
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1 fields
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    address: '',
    bloodGroup: '',
    height: '',
    weight: '',
    allergies: '',
    conditions: '',
    medications: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Step 2 fields
    phoneOTP: '',
    emailOTP: ''
  });

  // OTP states
  const [phoneOTPVerified, setPhoneOTPVerified] = useState(false);
  const [emailOTPVerified, setEmailOTPVerified] = useState(false);
  const [phoneOTPTimer, setPhoneOTPTimer] = useState(30);
  const [emailOTPTimer, setEmailOTPTimer] = useState(30);

  // Validation states
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Refs for OTP inputs
  const phoneOTPRef = useRef(null);
  const emailOTPRef = useRef(null);

  // Navigate hook
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Check password match
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(value === formData.confirmPassword);
      } else {
        setPasswordMatch(formData.password === value);
      }
    }

    // Auto-calculate age if DOB changes
    if (name === 'dob' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      setFormData(prev => ({
        ...prev,
        age: calculatedAge > 0 ? calculatedAge.toString() : ''
      }));
    }
  };

  // Validate step 1 form
  const validateStep1 = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'fullName', 'gender', 'dob', 'address',
      'bloodGroup', 'height', 'phone', 'email',
      'password', 'confirmPassword'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Password match validation
    if (formData.password && formData.confirmPassword && !passwordMatch) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step 1 submission
  const handleStep1Submit = (e) => {
    e.preventDefault();

    if (validateStep1()) {
      // Simulate sending OTPs
      sendOTPs();

      // Move to step 2
      setStep(2);

      // Focus on phone OTP input
      setTimeout(() => {
        if (phoneOTPRef.current) {
          phoneOTPRef.current.focus();
        }
      }, 100);
    }
  };

  // Simulate sending OTPs
  const sendOTPs = () => {
    console.log('Sending OTP to phone:', formData.phone);
    console.log('Sending OTP to email:', formData.email);

    // Start timers for resend OTP
    setPhoneOTPTimer(30);
    setEmailOTPTimer(30);
  };

  // Handle resend OTP
  const handleResendOTP = (type) => {
    if (type === 'phone' && phoneOTPTimer === 0) {
      console.log('Resending OTP to phone:', formData.phone);
      setPhoneOTPTimer(30);
    } else if (type === 'email' && emailOTPTimer === 0) {
      console.log('Resending OTP to email:', formData.email);
      setEmailOTPTimer(30);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = (type) => {
    const otpValue = type === 'phone' ? formData.phoneOTP : formData.emailOTP;

    if (otpValue.length === 6 && /^\d+$/.test(otpValue)) {
      if (type === 'phone') {
        setPhoneOTPVerified(true);
      } else {
        setEmailOTPVerified(true);
      }

      setErrors(prev => ({
        ...prev,
        [`${type}OTP`]: ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [`${type}OTP`]: 'Please enter a valid 6-digit OTP'
      }));
    }
  };

  // Handle final submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    // Check if both OTPs are verified
    if (!phoneOTPVerified || !emailOTPVerified) {
      alert('Please verify both phone and email OTPs before submitting');
      return;
    }

    console.log('Form submitted successfully:', formData);

    // Show success message
    alert('Medical account created successfully!');

    // Navigate to login page after 1 second
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Timer effect for OTP resend
  useEffect(() => {
    const phoneTimer = setInterval(() => {
      if (phoneOTPTimer > 0) {
        setPhoneOTPTimer(prev => prev - 1);
      }
    }, 1000);

    const emailTimer = setInterval(() => {
      if (emailOTPTimer > 0) {
        setEmailOTPTimer(prev => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(phoneTimer);
      clearInterval(emailTimer);
    };
  }, [phoneOTPTimer, emailOTPTimer]);

  // Blood group options
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

  // Gender options
  const genders = [
    { value: 'Male', icon: '♂' },
    { value: 'Female', icon: '♀' },
    { value: 'Other', icon: '⚧' },
    { value: 'Prefer not to say', icon: '?' }
  ];

  return (
    <div className="med-patient-signup-container">
      {/* Left Side - Signup Form */}


      {/* Right Side - Logo & Info */}
      <div className="medi-signup-right-side">
        <div className="medi-right-logo-container">
          <div className="medi-right-logo-wrapper">
            <FaUserMd className="medi-right-logo-icon" />
          </div>
          <h1 className="medi-right-logo-text">MediConnect+</h1>
          <p className="medi-right-tagline">Healthcare Redefined</p>
        </div>
      </div>


      <div className="med-patient-left-side">
        <div className="med-patient-form-wrapper">
          {/* Back Button */}
          <div className="med-back-button">
            <Link to="/" className="med-back-link">
              <FaLeftArrow className="med-back-icon" />
              Back to Home
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="med-progress-steps">
            <div className={`med-step ${step >= 1 ? 'active' : ''}`}>
              <div className="med-step-number">1</div>
              <div className="med-step-info">
                <div className="med-step-title">Personal Details</div>
                <div className="med-step-desc">Basic & Medical Info</div>
              </div>
            </div>
            <div className="med-step-connector"></div>
            <div className={`med-step ${step >= 2 ? 'active' : ''}`}>
              <div className="med-step-number">2</div>
              <div className="med-step-info">
                <div className="med-step-title">Verification</div>
                <div className="med-step-desc">OTP Confirmation</div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="med-patient-form">
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="med-step1-form">
                <div className="med-form-header">
                  <h2>Patient Registration</h2>
                  <p className="med-form-subtitle">Create your medical profile for personalized care</p>
                </div>

                {/* Personal Information */}
                <div className="med-form-section">
                  <h3 className="med-section-title">
                    <FaUser className="med-section-icon" />
                    Personal Information
                  </h3>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        Full Name <span className="med-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`med-input-field ${errors.fullName ? 'error' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <div className="med-error-message">{errors.fullName}</div>}
                    </div>
                    <div className="med-input-group">
                      <label className="med-input-label">
                        Gender <span className="med-required">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`med-select-field ${errors.gender ? 'error' : ''}`}
                      >
                        <option value="">Select Gender</option>
                        {genders.map(gender => (
                          <option key={gender.value} value={gender.value}>
                            {gender.icon} {gender.value}
                          </option>
                        ))}
                      </select>
                      {errors.gender && <div className="med-error-message">{errors.gender}</div>}
                    </div>
                  </div>



                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaCalendarAlt className="med-input-icon" />
                        Date of Birth <span className="med-required">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`med-input-field ${errors.dob ? 'error' : ''}`}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.dob && <div className="med-error-message">{errors.dob}</div>}
                    </div>

                    <div className="med-input-group">
                      <label className="med-input-label">Age</label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        readOnly
                        className="med-input-field"
                        placeholder="Auto-calculated"
                      />
                    </div>
                  </div>

                  <div className="address">
                    <div className="med-input-group ">
                      <label className="med-input-label">
                        <FaMapMarkerAlt className="med-input-icon" />
                        Address <span className="med-required">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`med-textarea-field ${errors.address ? 'error' : ''}`}
                        placeholder="Enter your complete address"
                        rows="3"
                      />
                      {errors.address && <div className="med-error-message">{errors.address}</div>}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="med-form-section">
                  <h3 className="med-section-title">
                    <FaHeartbeat className="med-section-icon" />
                    Medical Information
                  </h3>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaTint className="med-input-icon" />
                        Blood Group <span className="med-required">*</span>
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className={`med-select-field ${errors.bloodGroup ? 'error' : ''}`}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                      {errors.bloodGroup && <div className="med-error-message">{errors.bloodGroup}</div>}
                    </div>

                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaRulerVertical className="med-input-icon" />
                        Height (cm) <span className="med-required">*</span>
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className={`med-input-field ${errors.height ? 'error' : ''}`}
                        placeholder="e.g., 175"
                        min="50"
                        max="250"
                      />
                      {errors.height && <div className="med-error-message">{errors.height}</div>}
                    </div>
                  </div>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaAllergies className="med-input-icon" />
                        Allergies (Optional)
                      </label>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        className="med-input-field"
                        placeholder="List any known allergies"
                      />
                    </div>

                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaStethoscope className="med-input-icon" />
                        Medical Conditions (Optional)
                      </label>
                      <input
                        type="text"
                        name="conditions"
                        value={formData.conditions}
                        onChange={handleChange}
                        className="med-input-field"
                        placeholder="Any existing conditions"
                      />
                    </div>
                  </div>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaPills className="med-input-icon" />
                        Current Medications (Optional)
                      </label>
                      <input
                        type="text"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        className="med-input-field"
                        placeholder="List current medications"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact & Security */}
                <div className="med-form-section">
                  <h3 className="med-section-title">
                    Contact & Security
                  </h3>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaPhone className="med-input-icon" />
                        Phone Number <span className="med-required">*</span>
                      </label>
                      <div className="med-phone-input">
                        <span className="med-phone-prefix">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`med-input-field ${errors.phone ? 'error' : ''}`}
                          placeholder="Enter 10-digit number"
                          maxLength="10"
                        />
                      </div>
                      {errors.phone && <div className="med-error-message">{errors.phone}</div>}
                    </div>

                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaEnvelope className="med-input-icon" />
                        Email Address <span className="med-required">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`med-input-field ${errors.email ? 'error' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <div className="med-error-message">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="med-form-row">
                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaLock className="med-input-icon" />
                        Password <span className="med-required">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`med-input-field ${errors.password ? 'error' : ''}`}
                        placeholder="Create a strong password"
                      />
                      {errors.password && <div className="med-error-message">{errors.password}</div>}
                    </div>

                    <div className="med-input-group">
                      <label className="med-input-label">
                        <FaLock className="med-input-icon" />
                        Confirm Password <span className="med-required">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`med-input-field ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && <div className="med-error-message">{errors.confirmPassword}</div>}
                      {!passwordMatch && formData.confirmPassword && (
                        <div className="med-error-message">Passwords do not match</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="med-form-actions">
                  <button type="submit" className="med-next-button">
                    Continue to Verification
                    <FaArrowRight className="med-button-icon" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="med-step2-form">
                <div className="med-form-header">
                  <h2>OTP Verification</h2>
                  <p className="med-form-subtitle">Verify your phone and email to complete registration</p>
                </div>

                <div className="med-otp-verification">
                  {/* Phone OTP */}
                  <div className="med-otp-section">
                    <div className="med-otp-header">
                      <div className="med-otp-title">
                        <FaMobileAlt className="med-otp-icon" />
                        Phone Verification
                      </div>
                      <div className={`med-otp-status ${phoneOTPVerified ? 'verified' : 'pending'}`}>
                        {phoneOTPVerified ? (
                          <>
                            <FaCheckCircle /> Verified
                          </>
                        ) : 'Pending'}
                      </div>
                    </div>

                    <p className="med-otp-target">
                      OTP sent to: <strong>+91 {formData.phone}</strong>
                    </p>

                    <div className="med-otp-input-group">
                      <input
                        ref={phoneOTPRef}
                        type="text"
                        name="phoneOTP"
                        value={formData.phoneOTP}
                        onChange={handleChange}
                        className={`med-otp-input ${errors.phoneOTP ? 'error' : ''}`}
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        disabled={phoneOTPVerified}
                      />

                      {!phoneOTPVerified ? (
                        <div className="med-otp-actions">
                          <button
                            type="button"
                            className="med-verify-button"
                            onClick={() => handleVerifyOTP('phone')}
                          >
                            Verify
                          </button>
                          <button
                            type="button"
                            className={`med-resend-button ${phoneOTPTimer > 0 ? 'disabled' : ''}`}
                            onClick={() => handleResendOTP('phone')}
                            disabled={phoneOTPTimer > 0}
                          >
                            {phoneOTPTimer > 0 ? `Resend in ${phoneOTPTimer}s` : 'Resend OTP'}
                          </button>
                        </div>
                      ) : (
                        <div className="med-verified-badge">
                          <FaCheck /> Verified
                        </div>
                      )}
                    </div>
                    {errors.phoneOTP && <div className="med-error-message">{errors.phoneOTP}</div>}
                  </div>

                  {/* Email OTP */}
                  <div className="med-otp-section">
                    <div className="med-otp-header">
                      <div className="med-otp-title">
                        <FaEnvelope className="med-otp-icon" />
                        Email Verification
                      </div>
                      <div className={`med-otp-status ${emailOTPVerified ? 'verified' : 'pending'}`}>
                        {emailOTPVerified ? (
                          <>
                            <FaCheckCircle /> Verified
                          </>
                        ) : 'Pending'}
                      </div>
                    </div>

                    <p className="med-otp-target">
                      OTP sent to: <strong>{formData.email}</strong>
                    </p>

                    <div className="med-otp-input-group">
                      <input
                        ref={emailOTPRef}
                        type="text"
                        name="emailOTP"
                        value={formData.emailOTP}
                        onChange={handleChange}
                        className={`med-otp-input ${errors.emailOTP ? 'error' : ''}`}
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        disabled={emailOTPVerified}
                      />

                      {!emailOTPVerified ? (
                        <div className="med-otp-actions">
                          <button
                            type="button"
                            className="med-verify-button"
                            onClick={() => handleVerifyOTP('email')}
                          >
                            Verify
                          </button>
                          <button
                            type="button"
                            className={`med-resend-button ${emailOTPTimer > 0 ? 'disabled' : ''}`}
                            onClick={() => handleResendOTP('email')}
                            disabled={emailOTPTimer > 0}
                          >
                            {emailOTPTimer > 0 ? `Resend in ${emailOTPTimer}s` : 'Resend OTP'}
                          </button>
                        </div>
                      ) : (
                        <div className="med-verified-badge">
                          <FaCheck /> Verified
                        </div>
                      )}
                    </div>
                    {errors.emailOTP && <div className="med-error-message">{errors.emailOTP}</div>}
                  </div>
                </div>

                <div className="med-form-navigation">
                  <button
                    type="button"
                    className="med-back-button-secondary"
                    onClick={() => setStep(1)}
                  >
                    <FaArrowLeft className="med-button-icon" />
                    Back to Details
                  </button>

                  <button
                    type="submit"
                    className="med-submit-button"
                    disabled={!phoneOTPVerified || !emailOTPVerified}
                  >
                    <FaCheckCircle className="med-button-icon" />
                    Complete Registration
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Login Link */}
          <div className="med-login-link">
            <p>
              Already have a medical account?{' '}
              <Link to="/login" className="med-login-text">
                Sign in here
              </Link>
            </p>
            <p className="med-security-note">
              <FaShieldAlt className="med-security-icon" />
              Your medical data is protected with 256-bit encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPatientSignup;