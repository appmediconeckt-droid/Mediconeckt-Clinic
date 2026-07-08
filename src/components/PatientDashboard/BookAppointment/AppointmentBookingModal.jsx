import React, { useState } from 'react';
import './AppointmentBookingModal.css';

const AppointmentBookingModal = ({ doctorData, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);

  // Mock doctor data — replace with props if needed
  const doctor = doctorData || {
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    experience: '15 Yrs Exp',
    rating: 4.9,
    reviews: 324,
    clinic: 'City Medical Clinic',
    address: '123 Health Ave, Medical District',
    phone: '+1 (555) 123-4567',
    consultationFee: 150,
  };

  const patient = {
    name: 'Arun Kumar',
    email: 'arun@example.com',
    phone: '+1 (555) 987-6543',
  };

  // Calendar dates for October 2023
  const calendarDates = [
    { date: 16, available: true, isToday: false },
    { date: 17, available: true, isToday: false },
    { date: 18, available: true, isToday: true, dayLabel: 'Today' },
    { date: 19, available: false, isToday: false },
    { date: 20, available: true, isToday: false },
    { date: 21, available: true, isToday: false },
  ];

  // Time slots for selected date
  const morningSlots = ['08:00 AM', '08:30 AM', '10:15 AM', '11:00 AM'];
  const afternoonSlots = ['02:30 PM', '03:00 PM', '03:45 PM'];

  const handleDateSelect = (date) => {
    if (date.available) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment confirmed for ${selectedDate.date} Oct at ${selectedTime}`);
      onClose?.();
    }
  };

  return (
    <div className="abm-page">
      {/* ===== Header ===== */}
      <div className="abm-header">
        <div className="abm-doctor">
          <div className="abm-avatar" style={{ background: '#0d9488' }}>SJ</div>
          <div>
            <div className="abm-doctor-name">{doctor.name}</div>
            <div className="abm-doctor-specialty">{doctor.specialty} • {doctor.experience}</div>
            <div className="abm-doctor-rating">
              <i className="fa-solid fa-star"></i> {doctor.rating} ({doctor.reviews})
            </div>
          </div>
        </div>

        <div className="abm-clinic">
          <i className="fa-solid fa-hospital"></i>
          <div>
            <div className="abm-clinic-name">{doctor.clinic}</div>
            <div className="abm-clinic-addr">{doctor.address}</div>
            <div className="abm-clinic-contact">Booking Consultation</div>
          </div>
        </div>

        <div className="abm-patient">
          <i className="fa-solid fa-user-circle"></i>
          <div>
            <div className="abm-patient-label">Patient</div>
            <div className="abm-patient-name">{patient.name}</div>
            <div className="abm-patient-contact">{patient.email} • {patient.phone}</div>
          </div>
        </div>
      </div>

      {/* ===== Main + Sidebar ===== */}
      <div className="abm-grid">

        {/* ---- Left: Booking Form ---- */}
        <div className="abm-main">
          <div className="abm-section">
            <h3 className="abm-section-title">Choose Appointment Date</h3>

            {/* Date tabs */}
            <div className="abm-date-tabs">
              {['Available', 'Limited', 'Unavailable', 'Unselect'].map((tab, i) => (
                <button key={i} className={`abm-tab ${i === 0 ? 'active' : ''}`}>{tab}</button>
              ))}
            </div>

            {/* Calendar */}
            <div className="abm-calendar">
              <div className="abm-calendar-nav">
                <button><i className="fa-solid fa-chevron-left"></i></button>
                <span className="abm-calendar-month">October 2023</span>
                <button><i className="fa-solid fa-chevron-right"></i></button>
              </div>

              <div className="abm-dates">
                {calendarDates.map((d, i) => (
                  <button
                    key={i}
                    className={`abm-date ${selectedDate?.date === d.date ? 'selected' : ''} ${d.available ? 'available' : 'unavailable'} ${d.isToday ? 'today' : ''}`}
                    onClick={() => handleDateSelect(d)}
                    disabled={!d.available}
                  >
                    {d.dayLabel && <span className="abm-date-label">{d.dayLabel}</span>}
                    <div className="abm-date-num">{d.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="abm-times">
                <div className="abm-times-head">
                  <h4>Available Times for Wed, Oct {selectedDate.date}</h4>
                  <span className="abm-times-count">{morningSlots.length + afternoonSlots.length}</span>
                </div>

                <div className="abm-times-group">
                  <span className="abm-times-label">Morning</span>
                  <div className="abm-time-slots">
                    {morningSlots.map((time, i) => (
                      <button
                        key={i}
                        className={`abm-time ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="abm-times-group">
                  <span className="abm-times-label">Afternoon</span>
                  <div className="abm-time-slots">
                    {afternoonSlots.map((time, i) => (
                      <button
                        key={i}
                        className={`abm-time ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---- Right: Summary ---- */}
        <aside className="abm-summary">
          <h3 className="abm-summary-title">Booking Summary</h3>

          {/* Date & Time */}
          <div className="abm-summary-item">
            <div className="abm-summary-label">
              <i className="fa-solid fa-calendar"></i> Date & Time
            </div>
            {selectedDate && selectedTime ? (
              <div className="abm-summary-value">
                Wed, Oct {selectedDate.date} • {selectedTime} PM
              </div>
            ) : (
              <div className="abm-summary-placeholder">Not selected</div>
            )}
          </div>

          {/* Consultation type */}
          <div className="abm-summary-item">
            <div className="abm-summary-label">
              <i className="fa-solid fa-video"></i> Consultation
            </div>
            <div className="abm-summary-value">In-Clinic Visit</div>
          </div>

          {/* Patient info */}
          <div className="abm-summary-item">
            <div className="abm-summary-label">
              <i className="fa-solid fa-user"></i> Patient Info
            </div>
            <div className="abm-summary-value">{patient.name}</div>
          </div>

          {/* Review */}
          <div className="abm-summary-item">
            <div className="abm-summary-label">
              <i className="fa-solid fa-check-circle"></i> Review
            </div>
            <div className="abm-summary-value">Pending</div>
          </div>

          {/* Payment */}
          <div className="abm-summary-item">
            <div className="abm-summary-label">
              <i className="fa-solid fa-credit-card"></i> Payment
            </div>
            <div className="abm-summary-value">Not Processed</div>
          </div>

          {/* Total fee */}
          <div className="abm-divider"></div>
          <div className="abm-total">
            <span className="abm-total-label">Total Fee</span>
            <span className="abm-total-amount">${doctor.consultationFee}.00</span>
          </div>

          {/* Confirm button */}
          <button
            className="abm-confirm"
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            Confirm Selection <i className="fa-solid fa-arrow-right"></i>
          </button>
        </aside>

      </div>
    </div>
  );
};

export default AppointmentBookingModal;
