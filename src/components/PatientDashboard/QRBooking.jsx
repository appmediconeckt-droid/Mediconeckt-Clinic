import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './QRBooking.css';
import { API_BASE_URL, getAuthHeaders } from '../../redux/apiConfig';
import axios from 'axios';

const AppointmentBooking = ({ userData }) => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [tokenNumber, setTokenNumber] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [doctorInfo, setDoctorInfo] = useState({
    id: '',
    name: 'Loading doctor...',
    specialty: '',
    experience: '',
    languages: '',
    clinics: [],
  });
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [clinicsLoading, setClinicsLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  const getStoredAuthUser = () => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || 'null');
    } catch {
      return null;
    }
  };

  const getPatientId = () => {
    const user = userData || getStoredAuthUser();
    return user?.patient_id || user?.patientId || user?.id || user?._id || user?.user_id || user?.user?.id;
  };

  const getDoctorIdFromQr = () => {
    const params = new URLSearchParams(location.search);
    return (
      params.get('doctorId') ||
      params.get('doctor_id') ||
      params.get('userId') ||
      params.get('user_id') ||
      params.get('id') ||
      params.get('doctor') ||
      ''
    );
  };

  const getClinicIdFromQr = () => {
    const params = new URLSearchParams(location.search);
    return (
      params.get('clinicId') ||
      params.get('clinic_id') ||
      params.get('clinic') ||
      ''
    );
  };

  const doctorId = getDoctorIdFromQr();
  const clinicId = getClinicIdFromQr();
  const patientId = getPatientId();

  const getApiData = (payload) => payload?.data?.data || payload?.data || payload;

  const getArrayData = (payload) => {
    const data = getApiData(payload);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.clinics)) return data.clinics;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const getClinicAvailableDays = (clinic) => {
    const days = clinic.available_days || clinic.availableDays;
    if (Array.isArray(days)) return days;
    if (typeof days === 'string') {
      return days.split(',').map((day) => day.trim()).filter(Boolean);
    }
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  };

  const normalizeClinic = (clinic, index) => ({
    id: clinic.id || clinic.clinic_id || clinic._id || index,
    name: clinic.clinic_name || clinic.clinicName || clinic.name || 'Clinic',
    location: clinic.location || clinic.address || clinic.clinic_address || '',
    color: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1'][index % 5],
    consultationFee: clinic.consultation_fee || clinic.consultationFee || clinic.fee || 0,
    availableDays: getClinicAvailableDays(clinic),
    timings: clinic.timings || clinic.consultation_hours || clinic.opening_hours || '9:00 AM - 5:00 PM',
    phone: clinic.phone_number || clinic.phone || clinic.contact_number || '',
    raw: clinic,
  });

  const normalizeDoctor = (doctor) => ({
    id: doctor.id || doctor.doctor_id || doctor.user_id || doctor._id || doctorId,
    name: doctor.full_name || doctor.name || doctor.doctor_name || 'Doctor',
    specialty: doctor.speciality || doctor.specialty || doctor.position || doctor.qualification || '',
    experience: doctor.experience || 'N/A',
    languages: doctor.languages || 'N/A',
    clinics: [],
  });

  useEffect(() => {
    const fetchDoctorAndClinics = async () => {
      if (!doctorId) {
        setBookingError('Doctor ID missing. Please scan valid QR code.');
        return;
      }

      try {
        setDoctorLoading(true);
        setClinicsLoading(true);
        setBookingError('');

        const [doctorRes, clinicsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/users/doctor-profile/${doctorId}`, { headers: getAuthHeaders() }),
          axios.get(`${API_BASE_URL}/clinics?doctor_id=${doctorId}`, { headers: getAuthHeaders() }),
        ]);

        const mappedClinics = getArrayData(clinicsRes).map(normalizeClinic);
        setDoctorInfo({
          ...normalizeDoctor(getApiData(doctorRes)),
          clinics: mappedClinics,
        });
        const qrClinic = clinicId
          ? mappedClinics.find((clinic) => String(clinic.id) === String(clinicId))
          : null;
        setSelectedClinic(qrClinic || mappedClinics[0] || null);
      } catch (error) {
        console.log('QR doctor/clinic load error:', error.response?.data || error.message);
        setBookingError(error.response?.data?.message || 'Doctor details load nahi ho pa rahi hain');
      } finally {
        setDoctorLoading(false);
        setClinicsLoading(false);
      }
    };

    fetchDoctorAndClinics();
  }, [doctorId, clinicId]);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      if (!patientId) {
        setPatientInfo(null);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/users/${patientId}`, {
          headers: getAuthHeaders(),
        });
        const user = getApiData(res);
        setPatientInfo({
          name: user.full_name || user.name || '',
          email: user.email || '',
          phone: user.contact_number || user.phone || '',
          gender: user.gender || '',
          dob: user.date_of_birth || user.dob || '',
        });
      } catch (error) {
        console.log('QR patient profile load error:', error.response?.data || error.message);
        setPatientInfo(null);
      }
    };

    fetchPatientProfile();
  }, [patientId]);


const handleBookAppointment = async () => {
  if (!doctorId) {
    setBookingError("Doctor ID missing. Please scan valid QR code.");
    return;
  }

  if (!patientId) {
    setBookingError("Patient ID missing. Please login first.");
    return;
  }

  if (!selectedClinic) {
    setBookingError("Please select a clinic first");
    return;
  }

  if (!selectedDate || !selectedTime || !selectedPayment) {
    setBookingError("Please select date, time and payment method");
    return;
  }

  try {
    setIsBookingAppointment(true);
    setBookingError('');

    const appointmentPayload = {
      patient_id: patientId,
      doctor_id: doctorId,
      clinic_id: selectedClinic.id,
      consultation_mode: "clinic",
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      consultation_fee: selectedClinic.consultationFee,
      payment_method: selectedPayment,
    };

    console.log("Appointment Payload:", appointmentPayload);

    const res = await axios.post(
      `${API_BASE_URL}/appointments`,
      appointmentPayload,
      {
        headers: getAuthHeaders(),
      }
    );

    console.log("Appointment Created:", res.data);

    setIsBooked(true);

    setTimeout(() => {
      resetForm();
    }, 5000);
  } catch (error) {
    console.error("Appointment booking error:", error.response?.data || error);
    setBookingError(error.response?.data?.message || error.response?.data?.error || "Appointment booking failed");
  } finally {
    setIsBookingAppointment(false);
  }
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

  // Generate time slots based on clinic timings
  const generateTimeSlots = () => {
    if (!selectedClinic) return [];
    
    const slots = [];
    const timings = (selectedClinic.timings || '9:00 AM - 5:00 PM').split('-');
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
  };

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setShowClinicDropdown(false);
    // Reset selections when clinic changes
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPayment('');
    setTokenNumber(null);
    if (bookingStep > 1) {
      setBookingStep(1);
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
    return (
      <div className="apt-booking-container apt-p-4">
        <div className="apt-confirmation-card">
          <div className="apt-confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className='apt-mb-5'>Appointment Booked Successfully!</h2>
          <div className="apt-confirmation-details">
            {patientInfo?.name && (
              <div className="apt-detail-item">
                <i className="fas fa-user"></i>
                <span>Patient: <strong>{patientInfo.name}</strong></span>
              </div>
            )}
            <div className="apt-detail-item">
              <i className="fas fa-user-md"></i>
              <span>Doctor: <strong>{doctorInfo.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-hospital"></i>
              <span>Clinic: <strong>{selectedClinic?.name}</strong></span>
            </div>
            <div className="apt-detail-item">
              <i className="fas fa-location-arrow"></i>
              <span>Location: <strong>{selectedClinic?.location}</strong></span>
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
              <span>Fee: <strong>${selectedClinic?.consultationFee}</strong></span>
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
        {/* Clinic Selection Dropdown */}
        <div className="apt-clinic-selection-container">
          {doctorLoading || clinicsLoading ? (
            <div className="apt-loading-message">Loading doctor details...</div>
          ) : doctorInfo.clinics.length === 0 ? (
            <div className="apt-error-message">No clinics available for this doctor.</div>
          ) : doctorInfo.clinics.length === 1 ? (
            <div className="apt-single-clinic-display">
              <h2 className="apt-clinic-name">{doctorInfo.clinics[0].name}</h2>
              <div className="apt-clinic-badge apt-single">
                <i className="fas fa-hospital"></i>
                <span>Only Clinic</span>
              </div>
            </div>
          ) : (
            <div className="apt-clinic-dropdown-section">
              <div className="dropdown" style={{ position: 'relative' }}>
                <button
                  className="apt-clinic-dropdown-toggle apt-d-flex apt-align-items-center apt-gap-2"
                  onClick={() => setShowClinicDropdown(!showClinicDropdown)}
                  style={{
                   
                    borderColor: selectedClinic ? selectedClinic.color : '#007bff',
                    color: selectedClinic ? selectedClinic.color : '#007bff',
                    border: '1px solid',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
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
                  <div className="apt-text-start">
                    <strong>{selectedClinic ? selectedClinic.name : 'Select Clinic'}</strong>
                    <div className="apt-small apt-text-muted">
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
                      minWidth: "100%",
                      zIndex: 1001,
                      // maxHeight: "300px",
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
                      {doctorInfo.clinics.map(clinic => (
                        <div 
                          key={clinic.id}
                          className={`apt-clinic-option apt-p-3 apt-mb-2 apt-rounded ${selectedClinic?.id === clinic.id ? 'selected' : ''}`}
                          onClick={() => handleClinicSelect(clinic)}
                          style={{
                            cursor: "pointer",
                            backgroundColor: selectedClinic?.id === clinic.id ? clinic.color + "20" : "#f8f9fa",
                            border: selectedClinic?.id === clinic.id ? `2px solid ${clinic.color}` : "1px solid #dee2e6",
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
                                  backgroundColor: clinic.color
                                }}
                              />
                              <div>
                                <strong style={{ color: clinic.color }}>{clinic.name}</strong>
                                <div className="apt-small apt-text-muted apt-mb-1">{clinic.location}</div>
                                <div className="apt-mt-2">
                                  <div className="apt-d-flex apt-flex-wrap apt-gap-2">
                                    <span className="apt-badge" style={{ backgroundColor: clinic.color, color: 'white' }}>
                                      <i className="fas fa-calendar me-1"></i>
                                      {clinic.availableDays.join(', ')}
                                    </span>
                                    <span className="apt-badge apt-bg-secondary">
                                      <i className="fas fa-clock me-1"></i>
                                      {clinic.timings}
                                    </span>
                                    <span className="apt-badge apt-bg-success">
                                      <i className="fas fa-money-bill-wave me-1"></i>
                                      ${clinic.consultationFee}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {selectedClinic?.id === clinic.id && (
                              <span className="apt-badge" style={{ backgroundColor: clinic.color }}>
                                <i className="fas fa-check"></i> Selected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Doctor Information */}
        <div className="apt-doctor-info-section">
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
                    {selectedClinic.phone && (
                      <p className="apt-mb-1">
                        <i className="fas fa-phone me-2"></i>
                        <strong>Phone:</strong> {selectedClinic.phone}
                      </p>
                    )}
                    <p className="apt-mb-0">
                      <i className="fas fa-money-bill-wave me-2"></i>
                      <strong>Consultation Fee:</strong> 
                      <span className="apt-text-success apt-fw-bold"> ${selectedClinic.consultationFee}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patient Information Banner */}
        {patientInfo && (
          <div className="apt-patient-info-banner">
            {patientInfo.name && (
              <div className="apt-patient-info-item">
                <i className="fas fa-user"></i>
                <span>{patientInfo.name}</span>
              </div>
            )}
            {patientInfo.email && (
              <div className="apt-patient-info-item">
                <i className="fas fa-envelope"></i>
                <span>{patientInfo.email}</span>
              </div>
            )}
            {patientInfo.phone && (
              <div className="apt-patient-info-item">
                <i className="fas fa-phone"></i>
                <span>{patientInfo.phone}</span>
              </div>
            )}
            {patientInfo.gender && (
              <div className="apt-patient-info-item">
                <i className="fas fa-venus-mars"></i>
                <span>{patientInfo.gender}</span>
              </div>
            )}
            {patientInfo.dob && (
              <div className="apt-patient-info-item">
                <i className="fas fa-birthday-cake"></i>
                <span>{patientInfo.dob}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="apt-booking-progress">
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

      <div className="apt-booking-content">
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
                <span className="apt-clinic-tag" style={{ backgroundColor: selectedClinic.color }}>
                  <i className="fas fa-hospital"></i> {selectedClinic.name}
                </span>
              )}
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
                  {patientInfo?.name && (
                    <div className="apt-summary-item ">
                      <i className="fas fa-user"></i>
                      <span>Patient:</span>
                      <strong>{patientInfo.name}</strong>
                    </div>
                  )}
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
                  <div className="apt-summary-item">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Fee:</span>
                    <strong>${selectedClinic?.consultationFee}</strong>
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
              <p>Your appointment will be confirmed immediately after payment. You will receive a confirmation email with all details.</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="apt-booking-actions">
        {bookingError && (
          <div className="apt-selected-info" style={{ color: '#dc3545', width: '100%' }}>
            <i className="fas fa-exclamation-circle"></i>
            {bookingError}
          </div>
        )}

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
            {isBookingAppointment ? 'Booking...' : 'Confirm & Book Appointment'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
