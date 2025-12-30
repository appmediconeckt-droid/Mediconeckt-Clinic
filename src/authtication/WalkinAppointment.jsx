import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WalkinAppointment.css';

function AppointmentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorInfo = location.state || {};

  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    problem: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    appointmentTime: '',
    email: ''
  });

  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentToken, setAppointmentToken] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate age from date of birth
    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Enter valid 10-digit number';
    }

    if (!formData.problem.trim()) {
      newErrors.problem = 'Please describe the problem';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!isOtpVerified) {
      newErrors.otp = 'Please verify OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOTP = () => {
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
      setErrors(prev => ({ ...prev, contactNumber: 'Enter valid 10-digit number first' }));
      return;
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setIsOtpSent(true);
    setOtpTimer(300); // 5 minutes in seconds

    // Start timer
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show OTP (in real app, send via SMS)
    alert(`OTP sent to ${formData.contactNumber}: ${otp}`);
    console.log('Generated OTP:', otp);
  };

  const verifyOTP = () => {
    if (!otp) {
      setErrors(prev => ({ ...prev, otp: 'Enter OTP' }));
      return;
    }

    if (otp === generatedOtp) {
      setIsOtpVerified(true);
      setErrors(prev => ({ ...prev, otp: '' }));
      alert('✓ Phone number verified successfully!');
    } else {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Generate appointment token
    const token = `TKN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
    setAppointmentToken(token);

    // Save to localStorage
    const appointmentData = {
      token,
      timestamp: new Date().toISOString(),
      doctorInfo,
      patientInfo: formData,
      status: 'confirmed',
      estimatedWait: '15-30 minutes'
    };

    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));

    // Show success
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Appointment booked successfully!\nYour Token: ${token}`);
      
      // Optionally navigate to confirmation page
      // navigate('/confirmation', { state: appointmentData });
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      patientName: '',
      contactNumber: '',
      problem: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      appointmentTime: '',
      email: ''
    });
    setOtp('');
    setGeneratedOtp('');
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setErrors({});
    setAppointmentToken('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="simple-form-page">
      <div className="simple-form-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back to Scanner
        </button>
        <h1>Book Appointment</h1>
        <p>Fill in your details to confirm appointment</p>
      </div>

      {/* Doctor Information Card */}
      {doctorInfo.doctorName && (
        <div className="doctor-info-card">
          <div className="doctor-info-header">
            <div className="doctor-avatar">
              👨‍⚕️
            </div>
            <div className="doctor-details">
              <h2>{doctorInfo.doctorName}</h2>
              <div className="doctor-specialty">{doctorInfo.doctorSpecialty}</div>
              <div className="doctor-location">
                📍 {doctorInfo.clinicName} • {doctorInfo.location}
              </div>
            </div>
          </div>
          <div className="clinic-info">
            <h4>Clinic Information</h4>
            <p><strong>Contact:</strong> {doctorInfo.contact}</p>
            <p><strong>Timings:</strong> {doctorInfo.timings}</p>
            <p><strong>Consultation Fee:</strong> {doctorInfo.fees}</p>
          </div>
        </div>
      )}

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="simple-form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientName" className="form-label">
              Patient Name *
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter full name"
            />
            {errors.patientName && <span className="error-message">{errors.patientName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number *
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="form-input"
              placeholder="10-digit mobile number"
              maxLength="10"
            />
            {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="problem" className="form-label">
            Medical Problem *
          </label>
          <textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Describe your medical issue..."
            rows="3"
          />
          {errors.problem && <span className="error-message">{errors.problem}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="form-input"
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              readOnly
              className="form-input"
              placeholder="Auto-calculated"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime" className="form-label">
              Preferred Time
            </label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="email@example.com"
          />
        </div>

        {/* OTP Verification Section */}
        <div className="otp-section">
          <label className="form-label">Phone Verification *</label>
          
          {!isOtpVerified ? (
            <>
              <div className="otp-input-group">
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    if (errors.otp) {
                      setErrors(prev => ({ ...prev, otp: '' }));
                    }
                  }}
                  className="otp-input"
                  placeholder="Enter OTP"
                  disabled={!isOtpSent}
                />
              </div>
              
              <div className="otp-buttons">
                <button
                  type="button"
                  className="otp-btn send-otp-btn"
                  onClick={generateOTP}
                  disabled={isOtpSent && otpTimer > 0}
                >
                  {isOtpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
                
                <button
                  type="button"
                  className="otp-btn verify-otp-btn"
                  onClick={verifyOTP}
                  disabled={!isOtpSent}
                >
                  Verify OTP
                </button>
              </div>
              
              {isOtpSent && otpTimer > 0 && (
                <div className="otp-timer">
                  OTP expires in: {formatTime(otpTimer)}
                </div>
              )}
              
              {errors.otp && <span className="error-message">{errors.otp}</span>}
            </>
          ) : (
            <div className="otp-success">
              ✓ Phone number verified successfully!
            </div>
          )}
        </div>

        {/* Token Display */}
        {appointmentToken && (
          <div className="token-display">
            <h3>Appointment Confirmed!</h3>
            <div className="token-number">{appointmentToken}</div>
            <div className="token-info">
              <div>Doctor: {doctorInfo.doctorName}</div>
              <div>Patient: {formData.patientName}</div>
              <div>Time: {formData.appointmentTime || 'ASAP'}</div>
              <div>Status: Confirmed</div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
          >
            Reset Form
          </button>
          
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;