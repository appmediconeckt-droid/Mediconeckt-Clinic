import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../redux/apiConfig';
import './WalkinAppointment.css';

function AppointmentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorInfo = location.state || {};
  const doctorId = new URLSearchParams(location.search).get('doctorId') ||
    doctorInfo.doctorId || doctorInfo.doctor_id || doctorInfo.id || '';

  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    problem: '',
    dateOfBirth: '',
    age: '',
    location: '',
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
  const [apiError, setApiError] = useState('');

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const [year, month, day] = dateOfBirth.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    if (Number.isNaN(birthDate.getTime()) || birthDate > today) return '';

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const birthdayPending =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (birthdayPending) calculatedAge -= 1;
    return String(calculatedAge);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'dateOfBirth' ? { age: calculateAge(value) } : {})
    }));
    if (apiError) setApiError('');

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
    } else if (new Date(`${formData.dateOfBirth}T00:00:00`) > new Date()) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location or address is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!doctorId) {
      setApiError('Doctor information is missing. Please scan the doctor QR code again.');
      return;
    }

    const payload = {
      patient_name: formData.patientName.trim(),
      phone_number: formData.contactNumber.trim(),
      symptoms: formData.problem.trim(),
      doctor_id: doctorId,
      date_of_birth: formData.dateOfBirth,
      age: formData.age ? Number(formData.age) : undefined,
      location: formData.location.trim(),
      gender: formData.gender,
      appointment_time: formData.appointmentTime || undefined,
      email: formData.email.trim() || undefined,
      status: 'booked'
    };

    try {
      setIsSubmitting(true);
      setApiError('');
      const response = await axios.post(`${API_BASE_URL}/walkin-appointments`, payload, {
        // QR walk-ins are guest bookings. Do not attach a previously logged-in
        // patient's token; the entered patient_name must remain authoritative.
        headers: { 'Content-Type': 'application/json' },
      });
      const createdAppointment = response.data?.data || response.data?.appointment || response.data || {};
      const token = createdAppointment.token_number ||
        createdAppointment.tokenNumber ||
        createdAppointment.token_no ||
        createdAppointment.tokenNo ||
        createdAppointment.walkin_token ||
        createdAppointment.walkinToken ||
        createdAppointment.queue_token ||
        createdAppointment.queueToken ||
        createdAppointment.appointment_token ||
        createdAppointment.appointmentToken ||
        createdAppointment.token ||
        createdAppointment.id ||
        createdAppointment._id ||
        'Booked';

      setAppointmentToken(String(token));
      const appointmentData = {
        ...createdAppointment,
        token,
        doctorId,
        doctorInfo,
        patientInfo: formData,
      };
      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
      alert(`Appointment booked successfully!${token !== 'Booked' ? `\nYour Token: ${token}` : ''}`);
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Unable to book walk-in appointment'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      patientName: '',
      contactNumber: '',
      problem: '',
      dateOfBirth: '',
      age: '',
      location: '',
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
    setApiError('');
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

      <div className="walkin-layout">
      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="simple-form-container" autoComplete="off">
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
              autoComplete="off"
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
              max={new Date().toISOString().split('T')[0]}
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

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location / Address *
          </label>
          <textarea
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your complete address or location"
            rows="2"
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
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
        {apiError && <div className="error-message walkin-submit-error">{apiError}</div>}
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

      {/* Right info sidebar */}
      <aside className="walkin-aside">
        {doctorInfo.doctorName && (
          <div className="doctor-info-card">
            <div className="doctor-info-header">
              <div className="doctor-avatar">👨‍⚕️</div>
              <div className="doctor-details">
                <h2>{doctorInfo.doctorName}</h2>
                <div className="doctor-specialty">{doctorInfo.doctorSpecialty}</div>
                <div className="doctor-location">📍 {doctorInfo.clinicName} • {doctorInfo.location}</div>
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

        <div className="walkin-tips">
          <h4><i className="fa-solid fa-circle-info"></i> What to expect</h4>
          <ul>
            <li><i className="fa-solid fa-check"></i> Fill your details &amp; verify your phone via OTP</li>
            <li><i className="fa-solid fa-check"></i> Get an instant appointment token</li>
            <li><i className="fa-solid fa-check"></i> Estimated wait: 15–30 minutes</li>
            <li><i className="fa-solid fa-check"></i> Carry a valid ID &amp; past reports if any</li>
          </ul>
        </div>
      </aside>
      </div>
    </div>
  );
}

export default AppointmentForm;
