import React, { useState } from 'react';
import './AppointmentBookingModal.css';
import { patientData } from "./data";

const AppointmentBooking = ({ userData }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [tokenNumber, setTokenNumber] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  // User data from props (from login)
 

  // Fixed clinic and doctor details
  const clinicName = "City Medical Clinic";
  const doctorName = "Dr. Sarah Johnson";
  const doctorSpecialty = "Cardiologist";
  const consultationFee = 150;
  const doctorExperience = "15 years";
  const languages = "English, Spanish";

  const doctorAbout = `${doctorSpecialty} with ${doctorExperience} experience. ${languages}`;

  // Generate next 10 days for calendar
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;
    let minute = 0;
    
    for (let i = 0; i < 14; i++) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = `${hour}:${minute === 0 ? '00' : minute} ${hour >= 12 ? 'PM' : 'AM'}`;
      
      slots.push({
        value: timeString,
        display: displayTime,
        available: Math.random() > 0.3
      });
      
      minute += 30;
      if (minute === 60) {
        hour += 1;
        minute = 0;
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

  const handleBookAppointment = () => {
    const appointmentData = {
     
      
      doctorName,
      date: selectedDate,
      time: selectedTime,
      tokenNumber: tokenNumber,
      paymentMethod: selectedPayment,
      clinicName,
      fee: consultationFee,
      timestamp: new Date().toISOString()
    };
    
    // Simulate booking API call
    console.log('Booking appointment:', appointmentData);
    setIsBooked(true);
    
    // Reset form after 5 seconds
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

  if (isBooked) {
    return (
      <div className="appointment-booking-container">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className='mb-5'>Appointment Booked Successfully!</h2>
          <div className="confirmation-details">
            <div className="detail-item">
              <i className="fas fa-user"></i>
              <span>Patient: <strong>{patientData.name}</strong></span>
            </div>
            <div className="detail-item">
              <i className="fas fa-user-md"></i>
              <span>Doctor: <strong>{doctorName}</strong></span>
            </div>
            <div className="detail-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Date: <strong>{formatDisplayDate(selectedDate)}</strong></span>
            </div>
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>Time: <strong>{selectedTime}</strong></span>
            </div>
            <div className="detail-item">
              <i className="fas fa-ticket-alt"></i>
              <span>Token: <strong>#{tokenNumber}</strong></span>
            </div>
          </div>
          <button className="new-appointment-btn" onClick={resetForm}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-booking-container">
      <div className="booking-header">
        <h2 className="clinic-name">{clinicName}</h2>
        <div className="patient-info-banner">
          <div className="patient-info-item">
            <i className="fas fa-user"></i>
            <span>{patientData.name}</span>
          </div>
          <div className="patient-info-item">
            <i className="fas fa-envelope"></i>
            <span>{patientData.email}</span>
          </div>
          <div className="patient-info-item">
            <i className="fas fa-phone"></i>
            <span>{patientData.phone}</span>
          </div>
        </div>
        <p className="doctor-about">{doctorAbout}</p>
        <div className="doctor-fee">
          <i className="fas fa-money-bill-wave"></i>
          Consultation Fee: <strong>${consultationFee}</strong>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
          <div className="step-circle"></div>
          <span className="step-label">Select Date</span>
        </div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
          <div className="step-circle"></div>
          <span className="step-label">Select Time</span>
        </div>
        <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
          <div className="step-circle"></div>
          <span className="step-label">Review & Pay</span>
        </div>
      </div>

      <div className="booking-content">
        {/* Step 1: Date Selection */}
        {bookingStep === 1 && (
          <div className="booking-step active">
            <div className="step-title">
              <i className="fas fa-calendar-alt"></i>
              Select Appointment Date
            </div>
            <div className="calendar-container">
              <div className="calendar-dates">
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    className={`date-btn ${selectedDate === date.fullDate ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(date.fullDate)}
                  >
                    <div className="date-day">{date.day}</div>
                    <div className="date-number">{date.date}</div>
                    <div className="date-month">{date.month}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="selected-info">
              <i className="fas fa-calendar-check"></i>
              {selectedDate ? `Selected: ${formatDisplayDate(selectedDate)}` : "Please select a date"}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {bookingStep === 2 && (
          <div className="booking-step active">
            <div className="step-title">
              <i className="fas fa-clock"></i>
              Select Time Slot
            </div>
            <div className="selected-date-info">
              <i className="fas fa-calendar-alt"></i>
              {formatDisplayDate(selectedDate)}
            </div>
            <div className="time-selection">
              <div className="time-slots-grid">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot ${selectedTime === slot.value ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                    onClick={() => slot.available && handleTimeSelect(slot.value)}
                    disabled={!slot.available}
                  >
                    {slot.display}
                    {slot.available && index % 3 === 0 && (
                      <span className="slot-badge">Popular</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="selected-info">
              <i className="fas fa-clock"></i>
              {selectedTime ? `Selected: ${selectedTime}` : "Please select a time slot"}
            </div>
          </div>
        )}

        {/* Step 3: Payment Method & Review */}
        {bookingStep === 3 && (
          <div className="booking-step active">
            <div className="step-title">
              <i className="fas fa-credit-card"></i>
              Review & Payment
            </div>
            
            {tokenNumber && (
              <div className="token-display">
                <div className="token-card">
                  <i className="fas fa-ticket-alt"></i>
                  <div className="token-info">
                    <span className="token-label">Your Token Number</span>
                    <span className="token-number">#{tokenNumber}</span>
                    <p className="token-note">Please arrive 15 minutes before your appointment</p>
                  </div>
                </div>
              </div>
            )}

            <div className="appointment-summary">
              <div className="summary-card">
                <h4>Appointment Summary</h4>
                <div className="summary-details">
                  <div className="summary-item">
                    <i className="fas fa-user"></i>
                    <span>Patient:</span>
                    <strong>{patientData.name}</strong>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-user-md"></i>
                    <span>Doctor:</span>
                    <strong>{doctorName}</strong>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Date:</span>
                    <strong>{formatDisplayDate(selectedDate)}</strong>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-clock"></i>
                    <span>Time:</span>
                    <strong>{selectedTime}</strong>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-ticket-alt"></i>
                    <span>Token:</span>
                    <strong className="token-highlight">#{tokenNumber}</strong>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Fee:</span>
                    <strong>${consultationFee}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Choose Payment Method</h4>
              <div className="payment-options">
                <button
                  className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('card')}
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Credit/Debit Card</span>
                </button>
                <button
                  className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('upi')}
                >
                  <i className="fas fa-mobile-alt"></i>
                  <span>UPI Payment</span>
                </button>
                <button
                  className={`payment-option ${selectedPayment === 'cash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('cash')}
                >
                  <i className="fas fa-money-bill-wave"></i>
                  <span>Cash at Clinic</span>
                </button>
                <button
                  className={`payment-option ${selectedPayment === 'insurance' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('insurance')}
                >
                  <i className="fas fa-shield-alt"></i>
                  <span>Insurance</span>
                </button>
              </div>
            </div>

            <div className="selected-info">
              <i className="fas fa-credit-card"></i>
              {selectedPayment ? `Selected: ${selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)}` : "Please select payment method"}
            </div>

            <div className="booking-note">
              <i className="fas fa-exclamation-circle"></i>
              <p>Your appointment will be confirmed immediately after payment. You will receive a confirmation email with all details.</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="booking-actions">
        {bookingStep > 1 && (
          <button className="btn-back" onClick={prevStep}>
            <i className="fas fa-arrow-left"></i>
            Back
          </button>
        )}
        
        {bookingStep < 3 ? (
          <button 
            className={`btn-next ${(
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
            className={`btn-book ${!selectedPayment ? 'disabled' : ''}`}
            onClick={handleBookAppointment}
            disabled={!selectedPayment}
          >
            <i className="fas fa-calendar-check"></i>
            Confirm & Book Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;