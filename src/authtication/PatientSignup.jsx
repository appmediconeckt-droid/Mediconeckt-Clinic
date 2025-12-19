import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import './PatientSignup.css';
import { nav } from 'framer-motion/client';

const MedicalSignup = () => {
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
  const [phoneOTPSent, setPhoneOTPSent] = useState(false);
  const [emailOTPSent, setEmailOTPSent] = useState(false);
  const [phoneOTPVerified, setPhoneOTPVerified] = useState(false);
  const [emailOTPVerified, setEmailOTPVerified] = useState(false);
  const [phoneOTPTimer, setPhoneOTPTimer] = useState(0);
  const [emailOTPTimer, setEmailOTPTimer] = useState(0);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  // Refs for OTP inputs
  const phoneOTPRef = useRef(null);
  const emailOTPRef = useRef(null);

  // Add navigate hook
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
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
        age: calculatedAge.toString()
      }));
    }
  };

  // Validate step 1 form
  const validateStep1 = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.height.trim()) newErrors.height = 'Height is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (simple 10 digit check)
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Send OTPs in a real application
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
    // In a real app, you would call an API to send OTPs
    console.log('Sending OTP to phone:', formData.phone);
    console.log('Sending OTP to email:', formData.email);
    
    // Simulate OTP sent
    setPhoneOTPSent(true);
    setEmailOTPSent(true);
    
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
    // In a real app, you would verify the OTP with your backend
    // For demo, we'll just check if it's 6 digits
    const otpValue = type === 'phone' ? formData.phoneOTP : formData.emailOTP;
    
    if (otpValue.length === 6) {
      if (type === 'phone') {
        setPhoneOTPVerified(true);
      } else {
        setEmailOTPVerified(true);
      }
      
      // Clear any errors
      setErrors(prev => ({
        ...prev,
        [`${type}OTP`]: ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [`${type}OTP`]: 'OTP must be 6 digits'
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
    
    // In a real app, you would submit the form data to your backend
    console.log('Form submitted successfully:', formData);
    
    // Show success message
    alert('Account created successfully! Redirecting to login page...');
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    
    // Optional: Reset form (if you want to keep the form for new registrations)
    // resetForm();
  };

  // Reset form function (optional)
  const resetForm = () => {
    setStep(1);
    setFormData({
      fullName: '',
      gender: '',
      dob: '',
      age: '',
      address: '',
      bloodGroup: '',
      height: '',
      allergies: '',
      conditions: '',
      medications: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneOTP: '',
      emailOTP: ''
    });
    setPhoneOTPSent(false);
    setEmailOTPSent(false);
    setPhoneOTPVerified(false);
    setEmailOTPVerified(false);
    setErrors({});
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
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Gender options
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  return (
    <div className="medical-signup-container">
      <div className="medical-signup-header">
        <h1><i className="fas fa-heartbeat"></i> Medical Signup</h1>
        <div className="step-indicator">
          <div className={`step ${step === 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Personal Details</p>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>OTP Verification</p>
          </div>
        </div>
      </div>
      
      <div className="medical-signup-form">
        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="step1-form">
            <h2>Personal & Medical Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender <span className="required">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.gender && <div className="error-message">{errors.gender}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dob">Date of Birth <span className="required">*</span></label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? 'error' : ''}
                />
                {errors.dob && <div className="error-message">{errors.dob}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Auto-calculated"
                  readOnly
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address <span className="required">*</span></label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your full address"
                rows="3"
              />
              {errors.address && <div className="error-message">{errors.address}</div>}
            </div>
            
            <div className="medical-info-section">
              <h3><i className="fas fa-medkit"></i> Medical Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bloodGroup">Blood Group <span className="required">*</span></label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={errors.bloodGroup ? 'error' : ''}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <div className="error-message">{errors.bloodGroup}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="height">Height (cm) <span className="required">*</span></label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={errors.height ? 'error' : ''}
                    placeholder="e.g., 175"
                  />
                  {errors.height && <div className="error-message">{errors.height}</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List any allergies (optional)"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="conditions">Medical Conditions</label>
                  <input
                    type="text"
                    id="conditions"
                    name="conditions"
                    value={formData.conditions}
                    onChange={handleChange}
                    placeholder="Any existing conditions (optional)"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="medications">Current Medications</label>
                <input
                  type="text"
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="List current medications (optional)"
                />
              </div>
            </div>
            
            <div className="contact-info-section">
              <h3><i className="fas fa-address-book"></i> Contact Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <div className="phone-input-wrapper">
                    <span className="phone-prefix">+1</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password <span className="required">*</span></label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Create a password"
                  />
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                  {!passwordMatch && formData.confirmPassword && (
                    <div className="error-message">Passwords do not match</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-next">
                Continue to OTP Verification <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFinalSubmit} className="step2-form">
            <h2>OTP Verification</h2>
            <p className="verification-instruction">
              We've sent verification codes to your phone and email. Please enter them below to complete your registration.
            </p>
            
            <div className="otp-verification-section">
              <div className="otp-box">
                <div className="otp-header">
                  <h4><i className="fas fa-mobile-alt"></i> Phone Verification</h4>
                  <div className={`otp-status ${phoneOTPVerified ? 'verified' : 'pending'}`}>
                    {phoneOTPVerified ? 'Verified' : 'Pending'}
                  </div>
                </div>
                
                <p className="otp-target">Code sent to: <strong>+1 {formData.phone}</strong></p>
                
                <div className="otp-input-group">
                  <input
                    type="text"
                    name="phoneOTP"
                    value={formData.phoneOTP}
                    onChange={handleChange}
                    className={errors.phoneOTP ? 'error' : ''}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    ref={phoneOTPRef}
                    disabled={phoneOTPVerified}
                  />
                  
                  {!phoneOTPVerified ? (
                    <>
                      <button 
                        type="button" 
                        className="btn-verify"
                        onClick={() => handleVerifyOTP('phone')}
                      >
                        Verify
                      </button>
                      
                      <button 
                        type="button" 
                        className={`btn-resend ${phoneOTPTimer > 0 ? 'disabled' : ''}`}
                        onClick={() => handleResendOTP('phone')}
                        disabled={phoneOTPTimer > 0}
                      >
                        {phoneOTPTimer > 0 ? `Resend in ${phoneOTPTimer}s` : 'Resend OTP'}
                      </button>
                    </>
                  ) : (
                    <div className="verified-badge">
                      <i className="fas fa-check-circle"></i> Verified
                    </div>
                  )}
                </div>
                {errors.phoneOTP && <div className="error-message">{errors.phoneOTP}</div>}
              </div>
              
              <div className="otp-box">
                <div className="otp-header">
                  <h4><i className="fas fa-envelope"></i> Email Verification</h4>
                  <div className={`otp-status ${emailOTPVerified ? 'verified' : 'pending'}`}>
                    {emailOTPVerified ? 'Verified' : 'Pending'}
                  </div>
                </div>
                
                <p className="otp-target">Code sent to: <strong>{formData.email}</strong></p>
                
                <div className="otp-input-group">
                  <input
                    type="text"
                    name="emailOTP"
                    value={formData.emailOTP}
                    onChange={handleChange}
                    className={errors.emailOTP ? 'error' : ''}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    ref={emailOTPRef}
                    disabled={emailOTPVerified}
                  />
                  
                  {!emailOTPVerified ? (
                    <>
                      <button 
                        type="button" 
                        className="btn-verify"
                        onClick={() => handleVerifyOTP('email')}
                      >
                        Verify
                      </button>
                      
                      <button 
                        type="button" 
                        className={`btn-resend ${emailOTPTimer > 0 ? 'disabled' : ''}`}
                        onClick={() => handleResendOTP('email')}
                        disabled={emailOTPTimer > 0}
                      >
                        {emailOTPTimer > 0 ? `Resend in ${emailOTPTimer}s` : 'Resend OTP'}
                      </button>
                    </>
                  ) : (
                    <div className="verified-badge">
                      <i className="fas fa-check-circle"></i> Verified
                    </div>
                  )}
                </div>
                {errors.emailOTP && <div className="error-message">{errors.emailOTP}</div>}
              </div>
            </div>
            
            <div className="form-navigation">
              <button 
                type="button" 
                className="btn-back"
                onClick={() => setStep(1)}
              >
                <i className="fas fa-arrow-left"></i> Back to Details
              </button>
              
              <button 
                type="submit" 
                className="btn-submit"
                disabled={!phoneOTPVerified || !emailOTPVerified}
              >
                <i className="fas fa-check-circle"></i> Create Account
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="form-footer">
        <p>Already have an account? <a href="/login">Sign in here</a></p>
        <p className="disclaimer">
          <i className="fas fa-shield-alt"></i> Your information is secured and encrypted. We never share your medical data without consent.
        </p>
      </div>
    </div>
  );
};

export default MedicalSignup;