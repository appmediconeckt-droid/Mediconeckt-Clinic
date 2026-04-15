import React, { useState, useEffect } from 'react';
import './AppointmentBookingModal.css';

const AppointmentBooking = ({ patientData }) => {
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

  // Consultation mode options
  const consultationModes = [
    {
      id: 'in-clinic',
      name: 'In-Clinic Visit',
      description: 'Visit the clinic in person for consultation',
      icon: 'fas fa-hospital',
      color: '#007bff',
      available: true,
      additionalFee: 0
    },
    {
      id: 'video-call',
      name: 'Video Consultation',
      description: 'Connect with doctor via video call',
      icon: 'fas fa-video',
      color: '#28a745',
      available: true,
      additionalFee: 10
    },
    {
      id: 'voice-call',
      name: 'Voice Consultation',
      description: 'Talk to doctor over phone call',
      icon: 'fas fa-phone-alt',
      color: '#6f42c1',
      available: true,
      additionalFee: 5
    }
  ];

  // Doctor data with multiple clinics
  const doctorInfo = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years",
    languages: "English, Spanish",
    clinics: [
      {
        id: 1,
        name: "City Medical Clinic",
        location: "456 North Ave, Healthcare Complex",
        color: "#007bff",
        consultationFee: 150,
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        timings: "9:00 AM - 5:00 PM",
        supportsVideoCall: true,
        supportsVoiceCall: true
      },
      {
        id: 2,
        name: "Northside Hospital",
        location: "456 North Ave, Healthcare Complex",
        color: "#28a745",
        consultationFee: 180,
        availableDays: ["Mon", "Wed", "Fri", "Sat"],
        timings: "10:00 AM - 6:00 PM",
        supportsVideoCall: true,
        supportsVoiceCall: true
      },
      {
        id: 3,
        name: "West End Clinic",
        location: "789 West Blvd, Medical Plaza",
        color: "#dc3545",
        consultationFee: 130,
        availableDays: ["Tue", "Thu", "Sat"],
        timings: "8:00 AM - 4:00 PM",
        supportsVideoCall: false,
        supportsVoiceCall: true
      },
      {
        id: 4,
        name: "East Medical Center",
        location: "321 East Road, Health District",
        color: "#ffc107",
        consultationFee: 200,
        availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        timings: "7:00 AM - 7:00 PM",
        supportsVideoCall: true,
        supportsVoiceCall: true
      }
    ]
  };

  // Initialize selected clinic
  useEffect(() => {
    if (doctorInfo.clinics.length > 0) {
      setSelectedClinic(doctorInfo.clinics[0]);
    }
  }, []);

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

  // Generate time slots
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
        available: Math.random() > 0.2
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

  const handleBookAppointment = () => {
    if (!selectedClinic) {
      alert('Please select a clinic first');
      return;
    }

    const modeDetails = getSelectedModeDetails();
    const totalFee = calculateTotalFee();

    const appointmentData = {
      patient: patientData?.name || 'N/A',
      doctor: doctorInfo.name,
      clinic: selectedClinic.name,
      clinicLocation: selectedClinic.location,
      consultationMode: selectedConsultationMode,
      consultationModeName: modeDetails?.name,
      date: selectedDate,
      time: selectedTime,
      tokenNumber: tokenNumber,
      paymentMethod: selectedPayment,
      consultationFee: selectedClinic.consultationFee,
      additionalFee: modeDetails?.additionalFee,
      totalFee: totalFee,
      timestamp: new Date().toISOString()
    };

    console.log('Booking appointment:', appointmentData);
    setIsBooked(true);

    setTimeout(() => {
      resetForm();
    }, 5000);
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPayment('');
    setTokenNumber(null);
    setBookingStep(1);
    setIsBooked(false);
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

  // Safely get patient data with fallbacks
  const getPatientData = () => {
    return {
      name: patientData?.name || 'Not Provided',
      email: patientData?.email || 'Not Provided',
      phone: patientData?.phone || 'Not Provided',
      gender: patientData?.gender || 'Not Provided',
      dob: patientData?.dob || 'Not Provided'
    };
  };

  const patient = getPatientData();

  // Confirmation view
  if (isBooked) {
    const modeDetails = getSelectedModeDetails();
    const totalFee = calculateTotalFee();

    return (
      <div className="abm-confirmation-container">
        <div className="abm-confirmation-card">
          <div className="abm-confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Appointment Booked Successfully!</h2>
          
          <div className="abm-confirmation-details">
            <div className="abm-detail-item">
              <i className="fas fa-user"></i>
              <span>Patient: <strong>{patient.name}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-user-md"></i>
              <span>Doctor: <strong>{doctorInfo.name}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-hospital"></i>
              <span>Clinic: <strong>{selectedClinic?.name}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className={modeDetails?.icon}></i>
              <span>Consultation Mode: <strong>{modeDetails?.name}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Date: <strong>{formatDisplayDate(selectedDate)}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-clock"></i>
              <span>Time: <strong>{selectedTime}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-ticket-alt"></i>
              <span>Token: <strong>#{tokenNumber}</strong></span>
            </div>
            <div className="abm-detail-item">
              <i className="fas fa-money-bill-wave"></i>
              <span>Total Fee: <strong>${totalFee}</strong></span>
            </div>
          </div>
          
          <button className="abm-new-appointment-btn" onClick={resetForm}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="abm-container p-3">
      {/* Header Section */}
      <div className="abm-header">
        <h1 className="abm-main-title">Book Appointment</h1>
        
        {/* Clinic and Consultation Mode Selection */}
        <div className="abm-selection-grid">
          {/* Clinic Selection */}
          <div className="abm-selection-column">
            <div className="abm-dropdown-container">
              <button
                className="abm-dropdown-btn"
                onClick={() => setShowClinicDropdown(!showClinicDropdown)}
              >
                <div className="abm-dropdown-btn-content">
                  <div className="abm-dropdown-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="abm-dropdown-text">
                    <div className="abm-dropdown-label">Clinic</div>
                    <div className="abm-dropdown-value">
                      {selectedClinic ? selectedClinic.name : 'Select Clinic'}
                    </div>
                  </div>
                  <div className="abm-dropdown-arrow">
                    <i className={`fas fa-chevron-${showClinicDropdown ? 'up' : 'down'}`}></i>
                  </div>
                </div>
              </button>
              
              {showClinicDropdown && (
                <div className="abm-dropdown-menu">
                  <div className="abm-dropdown-header">
                    <i className="fas fa-hospital"></i>
                    Select Clinic for {doctorInfo.name}
                  </div>
                  <div className="abm-options-list">
                    {doctorInfo.clinics.map(clinic => (
                      <div
                        key={clinic.id}
                        className={`abm-option-item ${selectedClinic?.id === clinic.id ? 'selected' : ''}`}
                        onClick={() => handleClinicSelect(clinic)}
                      >
                        <div className="abm-option-content">
                          <div className="abm-option-color" style={{ backgroundColor: clinic.color }}></div>
                          <div className="abm-option-details">
                            <div className="abm-option-title" style={{ color: clinic.color }}>
                              {clinic.name}
                            </div>
                            <div className="abm-option-description">{clinic.location}</div>
                            <div className="abm-option-tags">
                              <span className="abm-tag" style={{ backgroundColor: clinic.color }}>
                                <i className="fas fa-calendar"></i> {clinic.availableDays.join(', ')}
                              </span>
                              <span className="abm-tag abm-tag-secondary">
                                <i className="fas fa-clock"></i> {clinic.timings}
                              </span>
                              <span className="abm-tag abm-tag-success">
                                <i className="fas fa-money-bill-wave"></i> ${clinic.consultationFee}
                              </span>
                            </div>
                          </div>
                          {selectedClinic?.id === clinic.id && (
                            <span className="abm-selected-badge">
                              <i className="fas fa-check"></i>
                            </span>
                          )}
                        </div>
                        <div className="abm-option-features">
                          <span className={`abm-feature ${clinic.supportsVideoCall ? 'available' : 'unavailable'}`}>
                            <i className="fas fa-video"></i> Video Call
                          </span>
                          <span className={`abm-feature ${clinic.supportsVoiceCall ? 'available' : 'unavailable'}`}>
                            <i className="fas fa-phone-alt"></i> Voice Call
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Consultation Mode Selection */}
          <div className="abm-selection-column">
            <div className="abm-dropdown-container">
              <button
                className="abm-dropdown-btn"
                onClick={() => setShowConsultationModeDropdown(!showConsultationModeDropdown)}
              >
                <div className="abm-dropdown-btn-content">
                  <div className="abm-dropdown-icon">
                    <i className={getSelectedModeDetails()?.icon || 'fas fa-stethoscope'}></i>
                  </div>
                  <div className="abm-dropdown-text">
                    <div className="abm-dropdown-label">Consultation Mode</div>
                    <div className="abm-dropdown-value">
                      {getSelectedModeDetails()?.name || 'Select Mode'}
                    </div>
                  </div>
                  <div className="abm-dropdown-arrow">
                    <i className={`fas fa-chevron-${showConsultationModeDropdown ? 'up' : 'down'}`}></i>
                  </div>
                </div>
              </button>
              
              {showConsultationModeDropdown && (
                <div className="abm-dropdown-menu">
                  <div className="abm-dropdown-header">
                    <i className="fas fa-comment-medical"></i>
                    Select Consultation Mode
                  </div>
                  <div className="abm-options-list">
                    {consultationModes.map(mode => {
                      const isDisabled = selectedClinic &&
                        ((mode.id === 'video-call' && !selectedClinic.supportsVideoCall) ||
                         (mode.id === 'voice-call' && !selectedClinic.supportsVoiceCall));

                      return (
                        <div
                          key={mode.id}
                          className={`abm-option-item ${selectedConsultationMode === mode.id ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={() => !isDisabled && handleConsultationModeSelect(mode)}
                        >
                          <div className="abm-option-content">
                            <div className="abm-option-icon" style={{ color: mode.color }}>
                              <i className={mode.icon}></i>
                            </div>
                            <div className="abm-option-details">
                              <div className="abm-option-title" style={{ color: mode.color }}>
                                {mode.name}
                              </div>
                              <div className="abm-option-description">{mode.description}</div>
                              <div className="abm-option-tags">
                                <span className={`abm-tag ${mode.additionalFee > 0 ? 'abm-tag-success' : 'abm-tag-secondary'}`}>
                                  <i className="fas fa-money-bill-wave"></i> Additional Fee: ${mode.additionalFee}
                                </span>
                              </div>
                            </div>
                            {selectedConsultationMode === mode.id && (
                              <span className="abm-selected-badge">
                                <i className="fas fa-check"></i>
                              </span>
                            )}
                            {isDisabled && (
                              <span className="abm-unavailable-badge">
                                <i className="fas fa-times"></i>
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

        {/* Selected Options Display */}
        <div className="abm-selected-options">
          <div className="abm-selected-option">
            <div className="abm-selected-label">Selected Clinic:</div>
            <div className="abm-selected-value" style={{ color: selectedClinic?.color }}>
              <i className="fas fa-hospital"></i> {selectedClinic?.name || 'Not selected'}
            </div>
          </div>
          <div className="abm-selected-option">
            <div className="abm-selected-label">Consultation Mode:</div>
            <div className="abm-selected-value" style={{ color: getSelectedModeDetails()?.color }}>
              <i className={getSelectedModeDetails()?.icon}></i> {getSelectedModeDetails()?.name || 'Not selected'}
              {getSelectedModeDetails()?.additionalFee > 0 && (
                <span className="abm-fee-badge">+${getSelectedModeDetails()?.additionalFee}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Information */}
      <div className="abm-doctor-section">
        <div className="abm-doctor-info">
          <h3 className="abm-doctor-name">
            <i className="fas fa-user-md"></i> {doctorInfo.name}
          </h3>
          <div className="abm-doctor-details">
            <div className="abm-doctor-detail">
              <i className="fas fa-stethoscope"></i>
              <span>{doctorInfo.specialty}</span>
            </div>
            <div className="abm-doctor-detail">
              <i className="fas fa-award"></i>
              <span>{doctorInfo.experience} experience</span>
            </div>
            <div className="abm-doctor-detail">
              <i className="fas fa-language"></i>
              <span>Speaks: {doctorInfo.languages}</span>
            </div>
          </div>
        </div>
        
        {selectedClinic && (
          <div className="abm-clinic-details">
            <h4 className="abm-clinic-title">
              <i className="fas fa-hospital"></i> Clinic Details
            </h4>
            <div className="abm-clinic-info">
              <div className="abm-clinic-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span><strong>Location:</strong> {selectedClinic.location}</span>
              </div>
              <div className="abm-clinic-info-item">
                <i className="fas fa-calendar"></i>
                <span><strong>Available Days:</strong> {selectedClinic.availableDays.join(', ')}</span>
              </div>
              <div className="abm-clinic-info-item">
                <i className="fas fa-clock"></i>
                <span><strong>Timings:</strong> {selectedClinic.timings}</span>
              </div>
              <div className="abm-clinic-info-item">
                <i className="fas fa-money-bill-wave"></i>
                <span><strong>Consultation Fee:</strong> ${selectedClinic.consultationFee}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Information */}
      <div className="abm-patient-info">
        <div className="abm-patient-info-item">
          <i className="fas fa-user"></i>
          <span>{patient.name}</span>
        </div>
        <div className="abm-patient-info-item">
          <i className="fas fa-envelope"></i>
          <span>{patient.email}</span>
        </div>
        <div className="abm-patient-info-item">
          <i className="fas fa-phone"></i>
          <span>{patient.phone}</span>
        </div>
        <div className="abm-patient-info-item">
          <i className="fas fa-venus-mars"></i>
          <span>{patient.gender}</span>
        </div>
        <div className="abm-patient-info-item">
          <i className="fas fa-birthday-cake"></i>
          <span>{patient.dob}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="abm-progress-bar">
        <div className={`abm-progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <div className="abm-step-circle">1</div>
          <span className="abm-step-label">Select Date</span>
        </div>
        <div className={`abm-progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <div className="abm-step-circle">2</div>
          <span className="abm-step-label">Select Time</span>
        </div>
        <div className={`abm-progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <div className="abm-step-circle">3</div>
          <span className="abm-step-label">Review & Pay</span>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="abm-steps-container">
        {/* Step 1: Date Selection */}
        {bookingStep === 1 && (
          <div className="abm-step-content">
            <div className="abm-step-header">
              <i className="fas fa-calendar-alt"></i>
              <h3>Select Appointment Date</h3>
            </div>
            
            {selectedClinic && (
              <div className="abm-availability-note">
                <i className="fas fa-info-circle"></i>
                <span>
                  <strong>{selectedClinic.name}</strong> is available on: {selectedClinic.availableDays.join(', ')}
                </span>
              </div>
            )}
            
            <div className="abm-calendar">
              <div className="abm-calendar-scroll-container">
                <div className="abm-calendar-dates">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      className={`abm-date-btn ${selectedDate === date.fullDate ? 'selected' : ''} ${!date.available ? 'unavailable' : ''}`}
                      onClick={() => date.available && handleDateSelect(date.fullDate)}
                      disabled={!date.available}
                    >
                      <div className="abm-date-day">{date.day}</div>
                      <div className="abm-date-number">{date.date}</div>
                      <div className="abm-date-month">{date.month}</div>
                      {!date.available && (
                        <div className="abm-unavailable-overlay">
                          <i className="fas fa-times"></i>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="abm-selected-display">
              <i className="fas fa-calendar-check"></i>
              {selectedDate ? `Selected: ${formatDisplayDate(selectedDate)}` : "Please select a date"}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {bookingStep === 2 && (
          <div className="abm-step-content">
            <div className="abm-step-header">
              <i className="fas fa-clock"></i>
              <h3>Select Time Slot</h3>
            </div>
            
            <div className="abm-selected-info">
              <i className="fas fa-calendar-alt"></i>
              {formatDisplayDate(selectedDate)}
            </div>
            
            <div className="abm-time-slots">
              <div className="abm-time-scroll-container">
                <div className="abm-time-grid">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`abm-time-btn ${selectedTime === slot.value ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                      onClick={() => slot.available && handleTimeSelect(slot.display)}
                      disabled={!slot.available}
                    >
                      {slot.display}
                      {slot.available && index % 3 === 0 && (
                        <span className="abm-popular-badge">Popular</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="abm-selected-display">
              <i className="fas fa-clock"></i>
              {selectedTime ? `Selected: ${selectedTime}` : "Please select a time slot"}
            </div>
          </div>
        )}

        {/* Step 3: Review & Payment */}
        {bookingStep === 3 && (
          <div className="abm-step-content">
            <div className="abm-step-header">
              <i className="fas fa-credit-card"></i>
              <h3>Review & Payment</h3>
            </div>
            
            {tokenNumber && (
              <div className="abm-token-card">
                <div className="abm-token-icon">
                  <i className="fas fa-ticket-alt"></i>
                </div>
                <div className="abm-token-content">
                  <div className="abm-token-label">Your Token Number</div>
                  <div className="abm-token-number">#{tokenNumber}</div>
                  <div className="abm-token-note">Please arrive 15 minutes before your appointment</div>
                </div>
              </div>
            )}
            
            <div className="abm-summary">
              <h4 className="abm-summary-title">Appointment Summary</h4>
              <div className="abm-summary-grid">
                <div className="abm-summary-item">
                  <i className="fas fa-user"></i>
                  <div className="abm-summary-label">Patient:</div>
                  <div className="abm-summary-value">{patient.name}</div>
                </div>
                <div className="abm-summary-item">
                  <i className="fas fa-user-md"></i>
                  <div className="abm-summary-label">Doctor:</div>
                  <div className="abm-summary-value">{doctorInfo.name}</div>
                </div>
                <div className="abm-summary-item">
                  <i className="fas fa-hospital"></i>
                  <div className="abm-summary-label">Clinic:</div>
                  <div className="abm-summary-value" style={{ color: selectedClinic?.color }}>
                    {selectedClinic?.name}
                  </div>
                </div>
                <div className="abm-summary-item">
                  <i className={getSelectedModeDetails()?.icon}></i>
                  <div className="abm-summary-label">Mode:</div>
                  <div className="abm-summary-value" style={{ color: getSelectedModeDetails()?.color }}>
                    {getSelectedModeDetails()?.name}
                  </div>
                </div>
                <div className="abm-summary-item">
                  <i className="fas fa-calendar-alt"></i>
                  <div className="abm-summary-label">Date:</div>
                  <div className="abm-summary-value">{formatDisplayDate(selectedDate)}</div>
                </div>
                <div className="abm-summary-item">
                  <i className="fas fa-clock"></i>
                  <div className="abm-summary-label">Time:</div>
                  <div className="abm-summary-value">{selectedTime}</div>
                </div>
              </div>
              
              <div className="abm-fee-breakdown">
                <h5>Fee Breakdown</h5>
                <div className="abm-fee-item">
                  <span>Consultation Fee:</span>
                  <span>${selectedClinic?.consultationFee}</span>
                </div>
                {getSelectedModeDetails()?.additionalFee > 0 && (
                  <div className="abm-fee-item">
                    <span>{getSelectedModeDetails()?.name} Fee:</span>
                    <span className="abm-fee-additional">+ ${getSelectedModeDetails()?.additionalFee}</span>
                  </div>
                )}
                <div className="abm-fee-total">
                  <span>Total:</span>
                  <span className="abm-total-amount">${calculateTotalFee()}</span>
                </div>
              </div>
            </div>
            
            <div className="abm-payment-methods">
              <h4 className="abm-payment-title">Choose Payment Method</h4>
              <div className="abm-payment-grid">
                <button
                  className={`abm-payment-btn ${selectedPayment === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('card')}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Credit/Debit Card</span>
                </button>
                <button
                  className={`abm-payment-btn ${selectedPayment === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('upi')}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <span>UPI Payment</span>
                </button>
                <button
                  className={`abm-payment-btn ${selectedPayment === 'cash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('cash')}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Cash at Clinic</span>
                </button>
                <button
                  className={`abm-payment-btn ${selectedPayment === 'insurance' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('insurance')}
                >
                  <i className="fas fa-shield-alt"></i>
                  <span>Insurance</span>
                </button>
              </div>
            </div>
            
            <div className="abm-selected-display">
              <i className="fas fa-credit-card"></i>
              {selectedPayment ? `Selected: ${selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)}` : "Please select payment method"}
            </div>
            
            <div className="abm-booking-note">
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
      <div className="abm-navigation">
        {bookingStep > 1 && (
          <button className="abm-btn abm-btn-back" onClick={prevStep}>
            <i className="fas fa-arrow-left"></i>
            <span>Back</span>
          </button>
        )}
        
        {bookingStep < 3 ? (
          <button
            className={`abm-btn abm-btn-next ${(
              (bookingStep === 1 && !selectedDate) ||
              (bookingStep === 2 && !selectedTime)
            ) ? 'disabled' : ''}`}
            onClick={nextStep}
            disabled={
              (bookingStep === 1 && !selectedDate) ||
              (bookingStep === 2 && !selectedTime)
            }
          >
            <span>{bookingStep === 2 ? 'Review Appointment' : 'Next'}</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        ) : (
          <button
            className={`abm-btn abm-btn-confirm ${!selectedPayment ? 'disabled' : ''}`}
            onClick={handleBookAppointment}
            disabled={!selectedPayment}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Confirm & Book Appointment (${calculateTotalFee()})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;