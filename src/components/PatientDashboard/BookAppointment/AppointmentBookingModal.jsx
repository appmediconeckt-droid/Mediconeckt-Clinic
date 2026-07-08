import React, { useState } from 'react';
import './AppointmentBookingModal.css';

const AppointmentBookingModal = ({ doctorData, onClose }) => {
  // Default selections match the Figma screenshot (Wed 18, 01:30 PM)
  const [selectedDate, setSelectedDate] = useState({ date: 18, day: 'Wed' });
  const [selectedTime, setSelectedTime] = useState('01:30 PM');

  const doctor = {
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    experience: '15 Years Exp',
    rating: 4.9,
    reviews: '120+ reviews',
    languages: 'English, Spanish',
    nextAvailable: 'Today',
    consultationFee: 150,
  };

  const clinic = {
    name: 'City Medical Clinic',
    address: '123 Health Ave, Medical District.',
    type: 'In-Clinic Consultation',
  };

  const patient = {
    name: 'Alex Mercer (You)',
    email: 'alex.m@example.com',
    phone: '+1 (555) 123-4567',
  };

  // Calendar dates — Oct 2023
  const calendarDates = [
    { date: 16, day: 'Mon', status: 'available' },
    { date: 17, day: 'Tue', status: 'available' },
    { date: 18, day: 'Wed', status: 'available' },
    { date: 19, day: 'Thu', status: 'limited', note: '2 Slots' },
    { date: 20, day: 'Fri', status: 'available' },
    { date: 21, day: 'Sat', status: 'unavailable' },
  ];

  const legend = [
    { label: 'Available', className: 'available' },
    { label: 'Limited', className: 'limited' },
    { label: 'Unavailable', className: 'unavailable' },
    { label: 'Selected', className: 'selected' },
  ];

  const morningSlots = [
    { time: '09:00 AM', disabled: false },
    { time: '09:30 AM', disabled: false },
    { time: '10:15 AM', disabled: false },
    { time: '11:00 AM', disabled: true },
  ];
  const afternoonSlots = [
    { time: '01:30 PM', disabled: false },
    { time: '02:00 PM', disabled: false },
    { time: '03:45 PM', disabled: false },
  ];

  const handleDateSelect = (d) => {
    if (d.status !== 'unavailable') {
      setSelectedDate({ date: d.date, day: d.day });
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (slot) => {
    if (!slot.disabled) setSelectedTime(slot.time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment confirmed for ${selectedDate.day}, Oct ${selectedDate.date} at ${selectedTime}`);
      onClose?.();
    }
  };

  const summarySteps = [
    {
      key: 'datetime', icon: 'fa-calendar', label: 'Date & Time',
      value: selectedDate && selectedTime ? `Wed, Oct ${selectedDate.date} • ${selectedTime}` : null,
      active: true,
    },
    { key: 'consultation', icon: 'fa-hospital', label: 'Consultation', value: 'In-Clinic Visit', active: false },
    { key: 'patient', icon: 'fa-user', label: 'Patient Info', value: patient.name.replace(' (You)', ''), active: false },
    { key: 'review', icon: 'fa-clipboard-check', label: 'Review', value: null, active: false },
    { key: 'payment', icon: 'fa-credit-card', label: 'Payment', value: null, active: false },
  ];

  return (
    <div className="abm-page">
      <div className="abm-grid">

        {/* ===== Left column (header + date picker) ===== */}
        <div className="abm-left">

          {/* Header row: doctor | clinic+patient stack */}
          <div className="abm-header">
            {/* Doctor */}
            <div className="abm-card abm-doctor">
              <div className="abm-doctor-top">
                <div className="abm-avatar" style={{ background: '#0d9488' }}>SJ</div>
                <div className="abm-doctor-info">
                  <div className="abm-doctor-name">{doctor.name}</div>
                  <div className="abm-doctor-specialty">{doctor.specialty} • {doctor.experience}</div>
                  <div className="abm-doctor-rating">
                    <i className="fa-solid fa-star"></i> {doctor.rating}/5 <span>({doctor.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="abm-doctor-divider"></div>
              <div className="abm-doctor-badges">
                <span className="abm-badge"><i className="fa-solid fa-globe"></i> {doctor.languages}</span>
                <span className="abm-badge"><i className="fa-regular fa-clock"></i> Next available: {doctor.nextAvailable}</span>
              </div>
            </div>

            {/* Clinic + Patient stacked */}
            <div className="abm-side-stack">
              <div className="abm-card abm-clinic">
                <div className="abm-clinic-thumb"><i className="fa-solid fa-hospital"></i></div>
                <div>
                  <div className="abm-clinic-name">{clinic.name}</div>
                  <div className="abm-clinic-addr">{clinic.address}</div>
                  <div className="abm-clinic-type">{clinic.type}</div>
                </div>
              </div>

              <div className="abm-card abm-patient">
                <div className="abm-patient-ic"><i className="fa-solid fa-user"></i></div>
                <div className="abm-patient-info">
                  <div className="abm-patient-name">{patient.name}</div>
                  <div className="abm-patient-contact">{patient.email} • {patient.phone.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="abm-patient-contact">{patient.phone.split(' ').slice(2).join(' ')}</div>
                </div>
                <button className="abm-patient-edit" aria-label="Edit"><i className="fa-solid fa-pen"></i></button>
              </div>
            </div>
          </div>

          {/* ---- Booking Form (date picker) ---- */}
          <div className="abm-main">
          <div className="abm-section-head">
            <h3 className="abm-section-title">Choose Appointment Date</h3>
            <div className="abm-month-nav">
              <button><i className="fa-solid fa-chevron-left"></i></button>
              <span>October 2023</span>
              <button><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>

          {/* Legend */}
          <div className="abm-legend">
            {legend.map((l) => (
              <span key={l.label} className="abm-legend-item">
                <span className={`abm-legend-dot ${l.className}`}></span> {l.label}
              </span>
            ))}
          </div>

          {/* Date cards */}
          <div className="abm-dates">
            {calendarDates.map((d) => {
              const isSelected = selectedDate?.date === d.date;
              return (
                <button
                  key={d.date}
                  className={`abm-date ${d.status} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(d)}
                  disabled={d.status === 'unavailable'}
                >
                  <span className="abm-date-day">{d.day}</span>
                  <span className="abm-date-num">{d.date}</span>
                  {d.note && <span className="abm-date-note">{d.note}</span>}
                </button>
              );
            })}
          </div>

          <div className="abm-hr"></div>

          {/* Time slots */}
          {selectedDate && (
            <div className="abm-times">
              <h4 className="abm-times-title">Available Times for {selectedDate.day}, Oct {selectedDate.date}</h4>

              <div className="abm-times-group">
                <span className="abm-times-label"><i className="fa-regular fa-clock"></i> Morning</span>
                <div className="abm-time-slots">
                  {morningSlots.map((s) => (
                    <button
                      key={s.time}
                      className={`abm-time ${selectedTime === s.time ? 'selected' : ''} ${s.disabled ? 'disabled' : ''}`}
                      onClick={() => handleTimeSelect(s)}
                      disabled={s.disabled}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="abm-times-group">
                <span className="abm-times-label">Afternoon</span>
                <div className="abm-time-slots">
                  {afternoonSlots.map((s) => (
                    <button
                      key={s.time}
                      className={`abm-time ${selectedTime === s.time ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(s)}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* ---- Right: Booking Summary (timeline, full height) ---- */}
        <aside className="abm-summary">
          <h3 className="abm-summary-title">Booking Summary</h3>
          <div className="abm-summary-doctor">{doctor.name}</div>

          <div className="abm-timeline">
            {summarySteps.map((s) => (
              <div key={s.key} className={`abm-step ${s.active ? 'active' : ''}`}>
                <div className="abm-step-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                <div className="abm-step-body">
                  <div className="abm-step-label">{s.label}</div>
                  {s.value && <div className="abm-step-value">{s.value}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="abm-total">
            <span className="abm-total-label">Total Fee</span>
            <span className="abm-total-amount">${doctor.consultationFee}.00</span>
          </div>

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
