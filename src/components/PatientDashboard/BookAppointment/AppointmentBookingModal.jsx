import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './AppointmentBookingModal.css';

import { fetchClinicsByDoctor } from '../../../redux/clinicsSlice';
import { API_BASE_URL, getAuthHeaders } from '../../../redux/apiConfig';

const AppointmentBooking = ({ userData, doctorId, doctorData }) => {
  const dispatch = useDispatch();
  const { list: reduxClinics, status: clinicsStatus, error: clinicsError } = useSelector((state) => state.clinics || { list: [], status: 'idle', error: null });
  const authUser = useSelector((state) => state.auth?.user);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [tokenNumber, setTokenNumber] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showConsultationModeDropdown, setShowConsultationModeDropdown] = useState(false);
  const [selectedConsultationMode, setSelectedConsultationMode] = useState('in-clinic');
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [bookingError, setBookingError] = useState('');
    const [patientData, setPatientData] = useState({
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
});

  const getClinicAvailableDays = (clinic) => {
    const days = clinic.available_days || clinic.availableDays;
    if (Array.isArray(days)) return days;
    if (typeof days === 'string') {
      return days.split(',').map(day => day.trim()).filter(Boolean);
    }
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  };

  // Fetch clinics for the selected doctor on component mount
  useEffect(() => {
    if (doctorId) {
      dispatch(fetchClinicsByDoctor(doctorId));
    }
  }, [doctorId, dispatch]);

  // Set first clinic as selected when clinics are fetched
  useEffect(() => {
    if (reduxClinics && reduxClinics.length > 0) {
      // Map API response to clinic object format
      const firstClinic = reduxClinics[0];
      const mappedClinic = {
        id: firstClinic.id || firstClinic._id,
        name: firstClinic.clinic_name,
        location: firstClinic.location || '',
        color: '#007bff',
        consultationFee: firstClinic.consultation_fee || firstClinic.consultationFee || 150,
        availableDays: getClinicAvailableDays(firstClinic),
        timings: firstClinic.timings || '9:00 AM - 5:00 PM',
        supportsVideoCall: firstClinic.supports_video_call ?? firstClinic.supportsVideoCall ?? true,
        supportsVoiceCall: firstClinic.supports_voice_call ?? firstClinic.supportsVoiceCall ?? true,
        phone_number: firstClinic.phone_number,
      };
      setSelectedClinic(mappedClinic);
    }
  }, [reduxClinics]);

  // Use doctorData prop if provided, otherwise use empty object
  const doctorInfo = doctorData || {
    name: "Select Doctor",
    specialty: "Speciality",
    experience: "N/A",
    languages: "English",
    id: doctorId,
  };

  // Consultation mode options
  const consultationModes = [
    {
      id: 'in-clinic',
      name: 'In-Clinic Visit',
      description: 'Visit the clinic in person for consultation',
      icon: 'fas fa-hospital',
      color: '#007bff',
      available: true,
      additionalFee: 0,
    },
    {
      id: 'video-call',
      name: 'Video Consultation',
      description: 'Connect with doctor via video call',
      icon: 'fas fa-video',
      color: '#28a745',
      available: true,
      additionalFee: 10,
    },
    {
      id: 'voice-call',
      name: 'Voice Consultation',
      description: 'Talk to doctor over phone call',
      icon: 'fas fa-phone-alt',
      color: '#6f42c1',
      available: true,
      additionalFee: 5,
    },
  ];

  // Update consultation mode availability based on selected clinic
  const updateConsultationModeAvailability = (clinic) => {
    const updatedModes = consultationModes.map(mode => {
      if (mode.id === 'video-call') {
        return { ...mode, available: clinic.supportsVideoCall };
      }
      if (mode.id === 'voice-call') {
        return { ...mode, available: clinic.supportsVoiceCall };
      }
      return mode;
    });
    // Update the consultationModes array (you might want to store it in state if it needs to be dynamic)
  };

  // Generate next 10 days for calendar
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      // Check if clinic is available on this day
      const isClinicAvailable = selectedClinic?.availableDays.includes(dayName);

      dates.push({
        date: date.getDate(),
        day: dayName,
        fullDate: date.toISOString().split('T')[0],
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        available: isClinicAvailable
      });
    }
    return dates;
  };

  // Generate time slots based on clinic timings and consultation mode
  const generateTimeSlots = () => {
    if (!selectedClinic) return [];

    const slots = [];
    const timings = selectedClinic.timings.split('-');
    const startTime = timings[0].trim();
    const endTime = timings[1].trim();

    // Parse start time
    const [startHourStr, startMinuteStr] = startTime.split(':');
    let startHour = parseInt(startHourStr);
    const startMinute = parseInt(startMinuteStr || '0');

    // Parse end time
    const [endHourStr, endMinuteStr] = endTime.split(':');
    let endHour = parseInt(endHourStr);
    const endMinute = parseInt(endMinuteStr || '0');

    // Convert to 24-hour format if needed
    if (startTime.includes('PM') && startHour < 12) startHour += 12;
    if (startTime.includes('AM') && startHour === 12) startHour = 0;
    if (endTime.includes('PM') && endHour < 12) endHour += 12;
    if (endTime.includes('AM') && endHour === 12) endHour = 0;

    let hour = startHour;
    let minute = startMinute;

    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayTime = `${displayHour}:${minute === 0 ? '00' : minute} ${ampm}`;

      slots.push({
        value: timeString,
        display: displayTime,
        available: Math.random() > 0.2 // Random availability for demo
      });

      minute += 30;
      if (minute >= 60) {
        hour += 1;
        minute = minute % 60;
      }
    }
    return slots;
  };

  const availableDates = generateAvailableDates();
  const availableSlots = generateTimeSlots();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTokenNumber(Math.floor(Math.random() * 20) + 1);
    setBookingStep(3);
  };

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
    setBookingError('');
  };

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setShowClinicDropdown(false);
    // Reset selections when clinic changes
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPayment('');
    setTokenNumber(null);
    setBookingError('');

    // Update consultation mode based on clinic support
    if (!clinic.supportsVideoCall && selectedConsultationMode === 'video-call') {
      setSelectedConsultationMode('in-clinic');
    }
    if (!clinic.supportsVoiceCall && selectedConsultationMode === 'voice-call') {
      setSelectedConsultationMode('in-clinic');
    }

    if (bookingStep > 1) {
      setBookingStep(1);
    }
  };

  const handleConsultationModeSelect = (mode) => {
    if (mode.available) {
      setSelectedConsultationMode(mode.id);
      setShowConsultationModeDropdown(false);
    }
  };

  const getSelectedModeDetails = () => {
    return consultationModes.find(mode => mode.id === selectedConsultationMode);
  };

  const calculateTotalFee = () => {
    const clinicFee = selectedClinic?.consultationFee || 0;
    const modeDetails = getSelectedModeDetails();
    const additionalFee = modeDetails?.additionalFee || 0;
    return clinicFee + additionalFee;
  };

  const getStoredAuthUser = () => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || 'null');
    } catch (error) {
      return null;
    }
  };

  const getPatientId = () => {
    const user = authUser || userData || getStoredAuthUser();
    return user?.patient_id || user?.patientId || user?.id || user?._id || user?.user_id;
  };

  const getConsultationModeForApi = () => {
    return selectedConsultationMode === 'in-clinic' ? 'offline' : 'online';
  };

  const formatTimeForApi = (time) => {
    return time && time.length === 5 ? `${time}:00` : time;
  };


useEffect(() => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const patientId = authUser?.id || authUser?.user?.id;

  if (patientId) {
    getPatientProfile(patientId);
  }
}, []);

const getPatientProfile = async (patientId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${patientId}`);

    const user = res.data?.data || res.data;

    setPatientData({
      name: user.full_name || "",
      email: user.email || "",
      phone: user.contact_number || "",
      gender: user.gender || "",
      dob: user.date_of_birth || "",
    });
  } catch (error) {
    console.log("Patient profile error:", error);
  }
};



  const handleBookAppointment = async () => {
    if (!selectedClinic) {
      alert('Please select a clinic first');
      return;
    }
    if (!selectedDate || !selectedTime || !selectedPayment) {
      setBookingError('Please select date, time and payment method.');
      return;
    }

    const patientId = getPatientId();
    if (!patientId) {
      setBookingError('Patient id not found. Please login again.');
      return;
    }

    const modeDetails = getSelectedModeDetails();
    const totalFee = calculateTotalFee();

    const appointmentData = {
      patient_id: patientId,
      doctor_id: doctorId || doctorInfo.id,
      clinic_id: selectedClinic.id,
      consultation_mode: getConsultationModeForApi(),
      appointment_date: selectedDate,
      appointment_time: formatTimeForApi(selectedTime),
      consultation_fee: totalFee,
      payment_method: selectedPayment,
    };

    try {
      setIsBookingAppointment(true);
      setBookingError('');
      console.log('Booking appointment:', appointmentData, modeDetails);
      await axios.post(`${API_BASE_URL}/appointments`, appointmentData, {
        headers: getAuthHeaders(),
      });
      setIsBooked(true);

      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to book appointment';
      setBookingError(typeof message === 'string' ? message : 'Failed to book appointment');
    } finally {
      setIsBookingAppointment(false);
    }
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPayment('');
    setTokenNumber(null);
    setBookingStep(1);
    setIsBooked(false);
    setBookingError('');
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const nextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const prevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  if (isBooked) {
    const modeDetails = getSelectedModeDetails();
    const totalFee = calculateTotalFee();



  



    return (
      <div className="apt-booking-container apt-p-4">
        <div className="apt-confirmation-card">
          <div className="apt-confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className='apt-mb-5'>Appointment Booked Successfully!</h2>
          <div className="apt-confirmation-details">
            <div className="apt-detail-item">
              <i className="fas fa-user"></i>
              <span>Patient: <strong>{patientData.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-user-md"></i>
              <span>Doctor: <strong>{doctorInfo.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-hospital"></i>
              <span>Clinic: <strong>{selectedClinic.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className={modeDetails?.icon}></i>
              <span>Consultation Mode: <strong>{modeDetails?.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-location-arrow"></i>
              <span>Location: <strong>{selectedClinic.location}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Date: <strong>{formatDisplayDate(selectedDate)}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-clock"></i>
              <span>Time: <strong>{selectedTime}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-ticket-alt"></i>
              <span>Token: <strong>#{tokenNumber}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-money-bill-wave"></i>
              <span>Total Fee: <strong>${totalFee}</strong></span>
            </div>
          </div>
          <button className="apt-new-appointment-btn" onClick={resetForm}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apt-booking-container">
      <div className="apt-booking-header">
        {/* Clinic and Consultation Mode Selection */}
        <div className="apt-selection-container">
          <div className="apt-row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
            {/* Clinic Selection Column */}
            <div className="apt-col" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 10px' }}>
              <div className="apt-clinic-selection-container apt-mb-3">
                {clinicsStatus === 'loading' ? (
                  <div className="apt-loading-message">Loading clinics...</div>
                ) : clinicsStatus === 'failed' ? (
                  <div className="apt-error-message">{clinicsError}</div>
                ) : reduxClinics.length === 1 ? (
                  <div className="apt-single-clinic-display">
                    <h2 className="apt-clinic-name">{reduxClinics[0].clinic_name || 'Clinic'}</h2>
                    <div className="apt-clinic-badge apt-single">
                      <i className="fas fa-hospital"></i>
                      <span>Only Clinic</span>
                    </div>
                  </div>
                ) : (
                  <div className="apt-clinic-dropdown-section">
                    <div className="dropdown" style={{ position: 'relative' }}>
                      <button
                        className="apt-clinic-dropdown-toggle apt-d-flex apt-align-items-center apt-gap-2 apt-w-100"
                        onClick={() => setShowClinicDropdown(!showClinicDropdown)}
                        style={{
                          borderColor: selectedClinic ? selectedClinic.color : '#007bff',
                          color: selectedClinic ? selectedClinic.color : '#007bff',
                          border: '1px solid',
                          outline: 'none',
                          cursor: 'pointer',
                          background: 'white',
                          padding: '10px 15px',
                          borderRadius: '8px',
                          textAlign: 'left'
                        }}
                        aria-expanded={showClinicDropdown}
                        aria-haspopup="true"
                      >
                        <div
                          className="apt-rounded-circle"
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: selectedClinic ? selectedClinic.color : '#007bff'
                          }}
                        />
                        <div className="apt-text-start apt-flex-grow-1">
                          <div className="apt-small apt-text-muted apt-mb-1">
                            <i className="fas fa-hospital me-1"></i> Clinic
                          </div>
                          <strong>{selectedClinic ? selectedClinic.name : 'Select Clinic'}</strong>
                          <div className="apt-small apt-text-muted apt-mt-1">
                            {selectedClinic ? selectedClinic.location : 'Choose a clinic'}
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d={showClinicDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {showClinicDropdown && (
                        <div
                          className="apt-clinic-dropdown-menu apt-p-3 apt-shadow-lg"
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: '100%',
                            marginTop: '5px',
                            minWidth: "100%",
                            zIndex: 1001,
                            maxHeight: "400px",
                            overflowY: "auto",
                            background: "white",
                            borderRadius: "8px",
                            border: "1px solid #dee2e6"
                          }}
                        >
                          <h6 className="apt-mb-3">
                            <i className="fas fa-hospital me-2"></i>
                            Select Clinic for {doctorInfo.name}
                          </h6>
                          <div className="apt-clinic-options-list">
                            {reduxClinics.length === 0 ? (
                              <div className="apt-small apt-text-muted apt-p-3">
                                No clinics available
                              </div>
                            ) : reduxClinics.map(clinic => {
                              const mappedClinic = {
                                id: clinic.id || clinic._id,
                                name: clinic.clinic_name,
                                location: clinic.location || '',
                                color: '#007bff',
                                consultationFee: clinic.consultation_fee || clinic.consultationFee || 150,
                                availableDays: getClinicAvailableDays(clinic),
                                timings: clinic.timings || '9:00 AM - 5:00 PM',
                                supportsVideoCall: clinic.supports_video_call ?? clinic.supportsVideoCall ?? true,
                                supportsVoiceCall: clinic.supports_voice_call ?? clinic.supportsVoiceCall ?? true,
                              };
                              return (
                                <React.Fragment key={mappedClinic.id}>
                                <div
                                  className={`apt-clinic-option apt-p-3 apt-mb-2 apt-rounded ${selectedClinic?.id === mappedClinic.id ? 'selected' : ''}`}
                                  onClick={() => handleClinicSelect(mappedClinic)}
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: selectedClinic?.id === mappedClinic.id ? mappedClinic.color + "20" : "#f8f9fa",
                                    border: selectedClinic?.id === mappedClinic.id ? `2px solid ${mappedClinic.color}` : "1px solid #dee2e6",
                                    transition: "all 0.2s"
                                  }}
                                >
                                  <div className="apt-d-flex apt-justify-content-between apt-align-items-start">
                                    <div className="apt-d-flex apt-align-items-start apt-gap-3">
                                    <div
                                      className="apt-rounded-circle apt-mt-2"
                                      style={{
                                        width: "12px",
                                        height: "12px",
                                        backgroundColor: mappedClinic.color
                                      }}
                                    />
                                    <div>
                                      <strong style={{ color: mappedClinic.color }}>{mappedClinic.name}</strong>
                                      <div className="apt-small apt-text-muted apt-mb-1">{mappedClinic.location}</div>
                                      <div className="apt-mt-2">
                                        <div className="apt-d-flex apt-flex-wrap apt-gap-2">
                                          <span className="apt-badge" style={{ backgroundColor: mappedClinic.color, color: 'white' }}>
                                            <i className="fas fa-calendar me-1"></i>
                                            {mappedClinic.availableDays.join(', ')}
                                          </span>
                                          <span className="apt-badge apt-bg-secondary">
                                            <i className="fas fa-clock me-1"></i>
                                            {mappedClinic.timings}
                                          </span>
                                          <span className="apt-badge apt-bg-success">
                                            <i className="fas fa-money-bill-wave me-1"></i>
                                            ${mappedClinic.consultationFee}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {selectedClinic?.id === mappedClinic.id && (
                                    <span className="apt-badge" style={{ backgroundColor: mappedClinic.color }}>
                                      <i className="fas fa-check"></i> Selected
                                    </span>
                                  )}
                                </div>
                                <div className="apt-mt-2 apt-pt-2 apt-border-top">
                                  <div className="apt-d-flex apt-gap-3">
                                    <span className={`apt-small ${mappedClinic.supportsVideoCall ? 'apt-text-success' : 'apt-text-muted'}`}>
                                      <i className="fas fa-video me-1"></i>
                                      Video Call {mappedClinic.supportsVideoCall ? '✓' : '✗'}
                                    </span>
                                    <span className={`apt-small ${mappedClinic.supportsVoiceCall ? 'apt-text-success' : 'apt-text-muted'}`}>
                                      <i className="fas fa-phone-alt me-1"></i>
                                      Voice Call {mappedClinic.supportsVoiceCall ? '✓' : '✗'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Consultation Mode Selection Column */}
            <div className="apt-col" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 10px' }}>
              <div className="apt-consultation-mode-container apt-mb-3">
                <div className="dropdown" style={{ position: 'relative' }}>
                  <button
                    className="apt-consultation-mode-toggle apt-d-flex apt-align-items-center apt-gap-2 apt-w-100"
                    onClick={() => setShowConsultationModeDropdown(!showConsultationModeDropdown)}
                    style={{
                      borderColor: getSelectedModeDetails()?.color || '#007bff',
                      color: getSelectedModeDetails()?.color || '#007bff',
                      border: '1px solid',
                      outline: 'none',
                      cursor: 'pointer',
                      background: 'white',
                      padding: '10px 15px',
                      width: '100%',
                      justifyContent: "center",
                      borderRadius: '8px',
                      textAlign: 'left'
                    }}
                    aria-expanded={showConsultationModeDropdown}
                    aria-haspopup="true"
                  >
                    <i className={getSelectedModeDetails()?.icon || 'fas fa-stethoscope'}></i>
                    <div className="apt-text-start apt-flex-grow-1 justify-content-between">
                      <div className="apt-small apt-text-muted apt-mb-1">
                        <i className="fas fa-comment-medical me-1"></i> Consultation Mode
                      </div>
                      <strong>{getSelectedModeDetails()?.name || 'Select Mode'}</strong>
                      <div className="apt-small apt-text-muted apt-mt-1">
                        {getSelectedModeDetails()?.description || 'Choose consultation type'}
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d={showConsultationModeDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {showConsultationModeDropdown && (
                    <div
                      className="apt-consultation-mode-dropdown-menu apt-p-3 apt-shadow-lg"
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: '100%',
                        marginTop: '5px',
                        minWidth: "100%",
                        zIndex: 1001,
                        background: "white",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6"
                      }}
                    >
                      <h6 className="apt-mb-3">
                        <i className="fas fa-comment-medical me-2"></i>
                        Select Consultation Mode
                      </h6>
                      <div className="apt-consultation-mode-options-list">
                        {consultationModes.map(mode => {
                          const isDisabled = selectedClinic &&
                            ((mode.id === 'video-call' && !selectedClinic.supportsVideoCall) ||
                              (mode.id === 'voice-call' && !selectedClinic.supportsVoiceCall));

                          return (
                            <div
                              key={mode.id}
                              className={`apt-consultation-mode-option apt-p-3 apt-mb-2 apt-rounded ${selectedConsultationMode === mode.id ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                              onClick={() => !isDisabled && handleConsultationModeSelect(mode)}
                              style={{
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                backgroundColor: selectedConsultationMode === mode.id ? mode.color + "20" : "#f8f9fa",
                                border: selectedConsultationMode === mode.id ? `2px solid ${mode.color}` : "1px solid #dee2e6",
                                opacity: isDisabled ? 0.5 : 1,
                                transition: "all 0.2s"
                              }}
                            >
                              <div className="apt-d-flex apt-justify-content-between apt-align-items-start">
                                <div className="apt-d-flex apt-align-items-start apt-gap-3">
                                  <div className="apt-mode-icon" style={{ color: mode.color }}>
                                    <i className={mode.icon}></i>
                                  </div>
                                  <div>
                                    <strong style={{ color: mode.color }}>{mode.name}</strong>
                                    <div className="apt-small apt-text-muted apt-mb-1">{mode.description}</div>
                                    <div className="apt-mt-2">
                                      <span className={`apt-badge ${mode.additionalFee > 0 ? 'apt-bg-success' : 'apt-bg-secondary'}`}>
                                        <i className="fas fa-money-bill-wave me-1"></i>
                                        Additional Fee: ${mode.additionalFee}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {selectedConsultationMode === mode.id && (
                                  <span className="apt-badge" style={{ backgroundColor: mode.color }}>
                                    <i className="fas fa-check"></i> Selected
                                  </span>
                                )}
                                {isDisabled && (
                                  <span className="apt-badge apt-bg-danger">
                                    <i className="fas fa-times"></i> Not Available
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Options Display */}
          <div className="apt-selected-options-display apt-mt-3 apt-p-3 apt-rounded mb-3"
            style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
            <div className="apt-row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
              <div className="apt-col" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 10px' }}>
                <div className="apt-selected-option">
                  <div className="apt-small apt-text-muted apt-mb-1">Selected Clinic:</div>
                  <div className="apt-d-flex apt-align-items-center apt-gap-2">
                    <div
                      className="apt-rounded-circle"
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: selectedClinic?.color
                      }}
                    />
                    <strong style={{ color: selectedClinic?.color }}>{selectedClinic?.name || 'Not selected'}</strong>
                  </div>
                </div>
              </div>
              <div className="apt-col" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 10px' }}>
                <div className="apt-selected-option">
                  <div className="apt-small apt-text-muted apt-mb-1">Consultation Mode:</div>
                  <div className="apt-d-flex apt-align-items-center apt-gap-2">
                    <i className={getSelectedModeDetails()?.icon} style={{ color: getSelectedModeDetails()?.color }}></i>
                    <strong style={{ color: getSelectedModeDetails()?.color }}>{getSelectedModeDetails()?.name || 'Not selected'}</strong>
                    {getSelectedModeDetails()?.additionalFee > 0 && (
                      <span className="apt-badge apt-bg-success apt-small">
                        +${getSelectedModeDetails()?.additionalFee}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="apt-doctor-info-section apt-mt-4">
          <div className="apt-row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px' }}>
            <div className="apt-col-md-6" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px' }}>
              <h4 className="apt-doctor-name">
                <i className="fas fa-user-md me-2"></i>
                {doctorInfo.name}
              </h4>
              <p className="apt-doctor-specialty apt-mb-1">
                <i className="fas fa-stethoscope me-2"></i>
                {doctorInfo.specialty}
              </p>
              <p className="apt-doctor-experience apt-mb-1">
                <i className="fas fa-award me-2"></i>
                {doctorInfo.experience} experience
              </p>
              <p className="apt-doctor-languages">
                <i className="fas fa-language me-2"></i>
                Speaks: {doctorInfo.languages}
              </p>
            </div>
            <div className="apt-col-md-6" style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px' }}>
              {selectedClinic && (
                <div className="apt-clinic-details-card">
                  <h5>
                    <i className="fas fa-hospital me-2"></i>
                    Clinic Details
                  </h5>
                  <div className="apt-clinic-info">
                    <p className="apt-mb-1">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      <strong>Location:</strong> {selectedClinic.location}
                    </p>
                    <p className="apt-mb-1">
                      <i className="fas fa-calendar me-2"></i>
                      <strong>Available Days:</strong> {selectedClinic.availableDays.join(', ')}
                    </p>
                    <p className="apt-mb-1">
                      <i className="fas fa-clock me-2"></i>
                      <strong>Timings:</strong> {selectedClinic.timings}
                    </p>
                    <p className="apt-mb-1">
                      <i className="fas fa-comment-medical me-2"></i>
                      <strong>Remote Support:</strong>
                      <span className={`apt-badge apt-small ${selectedClinic.supportsVideoCall ? 'apt-bg-success' : 'apt-bg-secondary'} apt-mx-2`}>
                        Video {selectedClinic.supportsVideoCall ? '✓' : '✗'}
                      </span>
                      <span className={`apt-badge apt-small ${selectedClinic.supportsVoiceCall ? 'apt-bg-success' : 'apt-bg-secondary'}`}>
                        Voice {selectedClinic.supportsVoiceCall ? '✓' : '✗'}
                      </span>
                    </p>
                    <p className="apt-mb-0">
                      <i className="fas fa-money-bill-wave me-2"></i>
                      <strong>Consultation Fee:</strong>
                      <span className="apt-text-success apt-fw-bold"> ${selectedClinic.consultationFee}</span>
                      {getSelectedModeDetails()?.additionalFee > 0 && (
                        <span className="apt-text-primary apt-fw-bold">
                          + ${getSelectedModeDetails()?.additionalFee} ({getSelectedModeDetails()?.name})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patient Information Banner */}
        <div className="apt-patient-info-banner apt-mt-4">
          <div className="apt-patient-info-item">
            <i className="fas fa-user"></i>
            <span>{patientData.name}</span>
          </div>
          <div className="apt-patient-info-item">
            <i className="fas fa-envelope"></i>
            <span>{patientData.email}</span>
          </div>
          <div className="apt-patient-info-item">
            <i className="fas fa-phone"></i>
            <span>{patientData.phone}</span>
          </div>
          <div className="apt-patient-info-item">
            <i className="fas fa-venus-mars"></i>
            <span>{patientData.gender}</span>
          </div>
          <div className="apt-patient-info-item">
            <i className="fas fa-birthday-cake"></i>
            <span>{patientData.dob}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="apt-booking-progress apt-mt-4">
        <div className={`apt-progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <div className="apt-step-circle"></div>
          <span className="apt-step-label">Select Date</span>
        </div>
        <div className={`apt-progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <div className="apt-step-circle"></div>
          <span className="apt-step-label">Select Time</span>
        </div>
        <div className={`apt-progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <div className="apt-step-circle"></div>
          <span className="apt-step-label">Review & Pay</span>
        </div>
      </div>

      <div className="apt-booking-content apt-mt-4">
        {/* Step 1: Date Selection */}
        {bookingStep === 1 && (
          <div className="apt-booking-step active">
            <div className="apt-step-title">
              <i className="fas fa-calendar-alt"></i>
              Select Appointment Date
            </div>

            {selectedClinic && (
              <div className="apt-clinic-availability-note">
                <i className="fas fa-info-circle"></i>
                <span>
                  <strong>{selectedClinic.name}</strong> is available on: {selectedClinic.availableDays.join(', ')}
                </span>,

                <i className={getSelectedModeDetails()?.icon}></i>

                <span className="apt-consultation-mode-note apt-ml-3 " style={{ padding: "10px" }}>

                  <strong>{getSelectedModeDetails()?.name}</strong> consultation selected
                </span>
              </div>
            )}

            <div className="apt-calendar-container">
              <div className="apt-calendar-dates">
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    className={`apt-date-btn ${selectedDate === date.fullDate ? 'selected' : ''} ${!date.available ? 'unavailable' : ''}`}
                    onClick={() => date.available && handleDateSelect(date.fullDate)}
                    disabled={!date.available}
                    title={!date.available ? `Clinic not available on ${date.day}` : ''}
                  >
                    <div className="apt-date-day">{date.day}</div>
                    <div className="apt-date-number">{date.date}</div>
                    <div className="apt-date-month">{date.month}</div>
                    {!date.available && (
                      <div className="apt-date-unavailable-overlay">
                        <i className="fas fa-times"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="apt-selected-info">
              <i className="fas fa-calendar-check"></i>
              {selectedDate ? `Selected: ${formatDisplayDate(selectedDate)}` : "Please select a date"}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {bookingStep === 2 && (
          <div className="apt-booking-step active">
            <div className="apt-step-title">
              <i className="fas fa-clock"></i>
              Select Time Slot
            </div>
            <div className="apt-selected-date-info">
              <i className="fas fa-calendar-alt"></i>
              {formatDisplayDate(selectedDate)}
              {selectedClinic && (
                <span className="apt-clinic-tag" >
                  <i className="fas fa-hospital"></i> {selectedClinic.name}
                </span>
              )}
              <span className="apt-consultation-mode-tag" >
                <i className={getSelectedModeDetails()?.icon}></i> {getSelectedModeDetails()?.name}
              </span>
            </div>
            <div className="apt-time-selection">
              <div className="apt-time-slots-grid">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`apt-time-slot ${selectedTime === slot.value ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                    onClick={() => slot.available && handleTimeSelect(slot.value)}
                    disabled={!slot.available}
                  >
                    {slot.display}
                    {slot.available && index % 3 === 0 && (
                      <span className="apt-slot-badge">Popular</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="apt-selected-info">
              <i className="fas fa-clock"></i>
              {selectedTime ? `Selected: ${selectedTime}` : "Please select a time slot"}
            </div>
          </div>
        )}

        {/* Step 3: Payment Method & Review */}
        {bookingStep === 3 && (
          <div className="apt-booking-step active">
            <div className="apt-step-title">
              <i className="fas fa-credit-card"></i>
              Review & Payment
            </div>

            {tokenNumber && (
              <div className="apt-token-display">
                <div className="apt-token-card">
                  <i className="fas fa-ticket-alt"></i>
                  <div className="apt-token-info">
                    <span className="apt-token-label">Your Token Number</span>
                    <span className="apt-token-number">#{tokenNumber}</span>
                    <p className="apt-token-note">Please arrive 15 minutes before your appointment</p>
                  </div>
                </div>
              </div>
            )}

            <div className="apt-appointment-summary">
              <div className="apt-summary-card">
                <h4>Appointment Summary</h4>
                <div className="apt-summary-details">
                  <div className="apt-summary-item">
                    <i className="fas fa-user"></i>
                    <span>Patient:</span>
                    <strong>{patientData.name}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className="fas fa-user-md"></i>
                    <span>Doctor:</span>
                    <strong>{doctorInfo.name}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className="fas fa-hospital"></i>
                    <span>Clinic:</span>
                    <strong style={{ color: selectedClinic?.color }}>{selectedClinic?.name}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className={getSelectedModeDetails()?.icon}></i>
                    <span>Mode:</span>
                    <strong style={{ color: getSelectedModeDetails()?.color }}>{getSelectedModeDetails()?.name}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Date:</span>
                    <strong>{formatDisplayDate(selectedDate)}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className="fas fa-clock"></i>
                    <span>Time:</span>
                    <strong>{selectedTime}</strong>
                  </div>
                  <div className="apt-summary-item">
                    <i className="fas fa-ticket-alt"></i>
                    <span>Token:</span>
                    <strong className="apt-token-highlight">#{tokenNumber}</strong>
                  </div>
                  <div className="apt-summary-item apt-fee-breakdown">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Fee Breakdown:</span>
                    <div className="apt-fee-details">
                      <div className="apt-fee-item">
                        <span>Consultation Fee:</span>
                        <span>${selectedClinic?.consultationFee}</span>
                      </div>
                      {getSelectedModeDetails()?.additionalFee > 0 && (
                        <div className="apt-fee-item">
                          <span>{getSelectedModeDetails()?.name} Fee:</span>
                          <span className="apt-text-primary">+ ${getSelectedModeDetails()?.additionalFee}</span>
                        </div>
                      )}
                      <div className="apt-fee-total">
                        <span>Total:</span>
                        <strong className="apt-text-success">${calculateTotalFee()}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="apt-payment-methods">
              <h4>Choose Payment Method</h4>
              <div className="apt-payment-options">
                <button
                  className={`apt-payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('card')}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Credit/Debit Card</span>
                </button>
                <button
                  className={`apt-payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('upi')}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <span>UPI Payment</span>
                </button>
                <button
                  className={`apt-payment-option ${selectedPayment === 'cash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('cash')}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Cash at Clinic</span>
                </button>
                <button
                  className={`apt-payment-option ${selectedPayment === 'insurance' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('insurance')}
                >
                  <i className="fas fa-shield-alt"></i>
                  <span>Insurance</span>
                </button>
              </div>
            </div>

            <div className="apt-selected-info">
              <i className="fas fa-credit-card"></i>
              {selectedPayment ? `Selected: ${selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)}` : "Please select payment method"}
            </div>

            <div className="apt-booking-note">
              <i className="fas fa-exclamation-circle"></i>
              <p>
                {selectedConsultationMode === 'in-clinic'
                  ? 'Your appointment will be confirmed immediately after payment. You will receive a confirmation email with all details.'
                  : 'Your virtual consultation link will be sent to your email after payment confirmation.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {bookingError && (
        <div className="apt-error-message apt-mt-3">
          {bookingError}
        </div>
      )}

      <div className="apt-booking-actions">
        {bookingStep > 1 && (
          <button className="apt-btn-back" onClick={prevStep}>
            <i className="fas fa-arrow-left"></i>
            Back
          </button>
        )}

        {bookingStep < 3 ? (
          <button
            className={`apt-btn-next ${(
              (bookingStep === 1 && !selectedDate) ||
              (bookingStep === 2 && !selectedTime)
            ) ? 'disabled' : ''}`}
            onClick={nextStep}
            disabled={
              (bookingStep === 1 && !selectedDate) ||
              (bookingStep === 2 && !selectedTime)
            }
          >
            {bookingStep === 2 ? 'Review Appointment' : 'Next'}
            <i className="fas fa-arrow-right"></i>
          </button>
        ) : (
          <button
            className={`apt-btn-book ${(!selectedPayment || isBookingAppointment) ? 'disabled' : ''}`}
            onClick={handleBookAppointment}
            disabled={!selectedPayment || isBookingAppointment}
          >
            <i className="fas fa-calendar-check"></i>
            {isBookingAppointment ? 'Booking...' : `Confirm & Book Appointment ($${calculateTotalFee()})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
