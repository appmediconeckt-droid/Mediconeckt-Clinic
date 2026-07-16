import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL, getAuthHeaders } from '../../../redux/apiConfig';
import { getCurrentUserId } from '../../../redux/chatApi';
import { fetchClinicsByDoctor } from '../../../redux/clinicsSlice';
import './AppointmentBookingModal.css';

const AppointmentBookingModal = ({ doctorData, onClose }) => {
  const location = useLocation();
  // Doctor passed in via prop (modal) or router state (reschedule redirect)
  const incoming = doctorData || location.state?.doctor || null;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clinicOpen, setClinicOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(1);
  const [selectedModeId, setSelectedModeId] = useState('in-clinic');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [step, setStep] = useState('select');          // 'select' | 'payment' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [token, setToken] = useState(() => Math.floor(Math.random() * 20) + 1);

  const doctor = {
    name: incoming?.name || 'Dr. Sarah Jenkins',
    specialty: incoming?.specialty || 'Cardiologist',
    experience: incoming?.experience || '15 Years Exp',
    rating: incoming?.rating || 4.9,
    reviews: incoming?.reviews || '120+ reviews',
    languages: incoming?.languages || 'English, Spanish',
    nextAvailable: incoming?.nextAvailable || 'Today',
    consultationFee: incoming?.consultationFee || 150,
  };

  // Real patient info from /users/:id
  const [patientInfo, setPatientInfo] = useState(null);
  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) return;
    axios.get(`${API_BASE_URL}/users/${id}`, { headers: getAuthHeaders() })
      .then((res) => setPatientInfo(res.data?.data || res.data))
      .catch(() => { /* keep fallback */ });
  }, []);

  const pt = patientInfo || {};
  const patient = {
    name: `${pt.full_name || pt.name || 'You'} (You)`,
    email: pt.email || '—',
    phone: pt.contact_number || pt.phone || pt.phone_number || pt.mobile || '—',
  };

  // Clinics for this doctor from /clinics?doctor_id=
  const dispatch = useDispatch();
  const doctorId = incoming?.id || incoming?._id || doctorData?.id;
  const { list: apiClinics = [] } = useSelector((state) => state.clinics || { list: [] });

  useEffect(() => {
    if (doctorId) dispatch(fetchClinicsByDoctor(doctorId));
  }, [doctorId, dispatch]);

  const mapClinic = (c, i) => ({
    id: c._id || c.id || i + 1,
    name: c.name || c.clinic_name || 'Clinic',
    address: c.address || c.location || c.city || '',
    days: c.days || c.available_days || c.working_days || 'Mon - Fri',
    timings: c.timings || c.hours || c.working_hours || '9:00 AM - 5:00 PM',
    fee: c.fee ?? c.consultation_fee ?? c.consultationFee ?? doctor.consultationFee ?? 100,
  });

  const clinics = apiClinics.length
    ? apiClinics.map(mapClinic)
    : [{ id: null, name: 'No clinic available', address: '', days: '—', timings: '—', fee: doctor.consultationFee || 0 }];

  const hasClinics = apiClinics.length > 0;

  // Default the selected clinic to the first real one once loaded
  useEffect(() => {
    if (apiClinics.length) setSelectedClinicId(apiClinics[0]._id || apiClinics[0].id || 1);
  }, [apiClinics]);

  // Consultation modes (selectable)
  const modes = [
    { id: 'in-clinic', name: 'In-Clinic Visit', desc: 'Visit the clinic in person for consultation', icon: 'fa-hospital', fee: 0 },
    { id: 'video', name: 'Video Consultation', desc: 'Connect with doctor via video call', icon: 'fa-video', fee: 10 },
    { id: 'voice', name: 'Voice Consultation', desc: 'Talk with your doctor over a voice call', icon: 'fa-phone', fee: 5 },
  ];

  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const selectedMode = modes.find((m) => m.id === selectedModeId) || modes[0];
  const totalFee = selectedClinic.fee + selectedMode.fee;

  // Calendar dates — next 7 days starting today
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const calendarDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return {
      date: d.getDate(),
      day: dayNames[d.getDay()],
      label: `${monthNames[d.getMonth()]} ${d.getDate()}`,
      iso,
      status: d.getDay() === 0 ? 'unavailable' : 'available', // Sundays closed
    };
  });
  const calendarMonthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Default the selected date to the first available day
  useEffect(() => {
    if (!selectedDate) {
      const first = calendarDates.find((d) => d.status !== 'unavailable');
      if (first) setSelectedDate(first);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setSelectedDate(d);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (slot) => {
    if (!slot.disabled) setSelectedTime(slot.time);
  };

  const paymentMethods = [
    { id: 'Card', label: 'Credit/Debit Card', icon: 'fa-credit-card' },
    { id: 'UPI', label: 'UPI Payment', icon: 'fa-mobile-screen-button' },
    { id: 'Cash', label: 'Cash at Clinic', icon: 'fa-money-bill-wave' },
    { id: 'Insurance', label: 'Insurance', icon: 'fa-shield-heart' },
  ];

  const dateStr = selectedDate ? `${selectedDate.day}, ${selectedDate.label}` : '';
  const patientName = patient.name.replace(' (You)', '') || 'Not Provided';

  const goToPayment = () => {
    if (selectedDate && selectedTime && hasClinics && appointmentLocation.trim()) setStep('payment');
  };

  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState('');

  // Convert "09:30 AM" / "01:30 PM" -> "09:30:00" / "13:30:00" for MySQL TIME
  const to24Hour = (t) => {
    if (!t) return null;
    const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return t;
    let hour = parseInt(m[1], 10);
    const min = m[2];
    const ampm = m[3].toUpperCase();
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return `${String(hour).padStart(2, '0')}:${min}:00`;
  };

  const confirmBooking = async () => {
    if (!hasClinics) {
      setBookError('This doctor has no clinic available, so the appointment cannot be booked.');
      return;
    }
    setBooking(true);
    setBookError('');
    const payload = {
      doctor_id: incoming?.id ?? incoming?._id ?? doctorData?.id,
      patient_id: getCurrentUserId(),
      appointment_date: selectedDate?.iso || null,
      appointment_time: to24Hour(selectedTime),
      clinic_id: selectedClinic.id,
      clinic: selectedClinic.name,
      location: appointmentLocation.trim(),
      appointment_location: appointmentLocation.trim(),
      consultation_mode: selectedMode.id,
      fee: totalFee,
      payment_method: paymentMethod,
      token,
    };
    try {
      const res = await axios.post(`${API_BASE_URL}/appointments`, payload, { headers: getAuthHeaders() });
      const data = res.data?.data || res.data || {};
      const respToken = data.token ?? data.token_number ?? data.queue_token;
      if (respToken != null) setToken(respToken);
      setStep('success');
    } catch (err) {
      setBookError(err.response?.data?.message || err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  const bookAnother = () => onClose?.();

  // After success, auto-return to the appointments page
  useEffect(() => {
    if (step === 'success') {
      const t = setTimeout(() => onClose?.(), 6000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const summarySteps = [
    {
      key: 'datetime', icon: 'fa-calendar', label: 'Date & Time',
      value: selectedDate && selectedTime ? `${selectedDate.day}, ${selectedDate.label} • ${selectedTime}` : null,
      active: false,
    },
    {
      key: 'clinic', icon: 'fa-hospital', label: 'Selected Clinic',
      value: selectedClinic.name, active: false,
    },
    { key: 'location', icon: 'fa-location-dot', label: 'Location', value: appointmentLocation.trim() || null, active: false },
    {
      key: 'mode', icon: selectedMode.icon, label: 'Consultation Mode',
      value: `${selectedMode.name}${selectedMode.fee > 0 ? ` +$${selectedMode.fee}` : ''}`, active: false,
    },
    { key: 'patient', icon: 'fa-user', label: 'Patient Info', value: patient.name.replace(' (You)', ''), active: false },
    { key: 'review', icon: 'fa-clipboard-check', label: 'Review', value: null, active: false },
    { key: 'payment', icon: 'fa-credit-card', label: 'Payment', value: null, active: false },
  ];

  /* ===== Success screen ===== */
  if (step === 'success') {
    return (
      <div className="abm-page abm-success-page">
        <div className="abm-success">
          <div className="abm-success-hero">
            <div className="abm-success-icon"><i className="fa-solid fa-check"></i></div>
            <h2 className="abm-success-title">Appointment Booked Successfully!</h2>
            <p className="abm-success-sub">A confirmation email with all the details has been sent to you.</p>
          </div>

          <div className="abm-success-card">
            <div className="abm-success-token">
              <div className="abm-success-token-left">
                <span className="abm-success-token-label"><i className="fa-solid fa-ticket"></i> Token Number</span>
                <span className="abm-success-token-note">Arrive 15 minutes early</span>
              </div>
              <span className="abm-success-token-num">#{token}</span>
            </div>

            <div className="abm-success-grid">
              <div className="abm-pay-row"><span><i className="fa-solid fa-user"></i> Patient</span><strong>{patientName}</strong></div>
              <div className="abm-pay-row"><span><i className="fa-solid fa-user-doctor"></i> Doctor</span><strong>{doctor.name}</strong></div>
              <div className="abm-pay-row"><span><i className="fa-solid fa-hospital"></i> Clinic</span><strong>{selectedClinic.name}</strong></div>
              <div className="abm-pay-row"><span><i className="fa-solid fa-location-dot"></i> Location</span><strong>{appointmentLocation}</strong></div>
              <div className="abm-pay-row"><span><i className={`fa-solid ${selectedMode.icon}`}></i> Consultation Mode</span><strong>{selectedMode.name}</strong></div>
              <div className="abm-pay-row"><span><i className="fa-regular fa-calendar"></i> Date</span><strong>{dateStr}</strong></div>
              <div className="abm-pay-row"><span><i className="fa-regular fa-clock"></i> Time</span><strong>{selectedTime}</strong></div>
            </div>

            <div className="abm-pay-row abm-pay-total abm-success-total"><span>Total Fee Paid</span><strong>${totalFee}</strong></div>
          </div>

          <button className="abm-confirm abm-success-btn" onClick={bookAnother}>
            <i className="fa-solid fa-plus"></i> Book Another Appointment
          </button>
          <div className="abm-success-redirect">
            <i className="fa-solid fa-rotate-right"></i> Redirecting to appointments…
          </div>
        </div>
      </div>
    );
  }

  /* ===== Review & Payment screen ===== */
  if (step === 'payment') {
    return (
      <div className="abm-page abm-pay-page">
        <div className="abm-pay">
          <div className="abm-pay-header">
            <h2 className="abm-pay-heading">Review &amp; Payment</h2>
            <p className="abm-pay-subheading">Please review your appointment details before confirming</p>
          </div>

          <div className="abm-pay-grid">
            {/* ---- Left: details + payment ---- */}
            <div className="abm-pay-main">
              {/* Appointment summary */}
              <div className="abm-pay-card">
                <h3 className="abm-pay-card-title"><i className="fa-regular fa-calendar-check"></i> Appointment Summary</h3>
                <div className="abm-pay-rows2">
                  <div className="abm-pay-row"><span><i className="fa-solid fa-user"></i> Patient</span><strong>{patientName}</strong></div>
                  <div className="abm-pay-row"><span><i className="fa-solid fa-user-doctor"></i> Doctor</span><strong>{doctor.name}</strong></div>
                  <div className="abm-pay-row"><span><i className="fa-solid fa-hospital"></i> Clinic</span><strong>{selectedClinic.name}</strong></div>
                  <div className="abm-pay-row"><span><i className="fa-solid fa-location-dot"></i> Location</span><strong>{appointmentLocation}</strong></div>
                  <div className="abm-pay-row"><span><i className={`fa-solid ${selectedMode.icon}`}></i> Mode</span><strong>{selectedMode.name}</strong></div>
                  <div className="abm-pay-row"><span><i className="fa-regular fa-calendar"></i> Date</span><strong>{dateStr}</strong></div>
                  <div className="abm-pay-row"><span><i className="fa-regular fa-clock"></i> Time</span><strong>{selectedTime}</strong></div>
                </div>
              </div>

              {/* Payment methods */}
              <div className="abm-pay-card">
                <h3 className="abm-pay-card-title"><i className="fa-solid fa-wallet"></i> Choose Payment Method</h3>
                <div className="abm-pay-methods">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      className={`abm-pay-method ${paymentMethod === pm.id ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod(pm.id)}
                    >
                      <span className="abm-pay-method-ic"><i className={`fa-solid ${pm.icon}`}></i></span>
                      <span className="abm-pay-method-label">{pm.label}</span>
                      <span className="abm-pay-method-radio">
                        {paymentMethod === pm.id && <i className="fa-solid fa-check"></i>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="abm-pay-info">
                <i className="fa-solid fa-circle-info"></i>
                <span>Your appointment will be confirmed immediately after payment. You will receive a confirmation email with all details.</span>
              </div>
            </div>

            {/* ---- Right: token + fee + confirm (sticky) ---- */}
            <aside className="abm-pay-side">
              <div className="abm-token-banner">
                <div className="abm-token-ic"><i className="fa-solid fa-ticket"></i></div>
                <div className="abm-token-label">Your Token Number</div>
                <div className="abm-token-num">#{token}</div>
                <div className="abm-token-note"><i className="fa-regular fa-clock"></i> Arrive 15 minutes early</div>
              </div>

              <div className="abm-pay-card">
                <h3 className="abm-pay-card-title"><i className="fa-solid fa-receipt"></i> Fee Breakdown</h3>
                <div className="abm-pay-row"><span>Consultation Fee</span><strong>${selectedClinic.fee}</strong></div>
                {selectedMode.fee > 0 && (
                  <div className="abm-pay-row"><span>{selectedMode.name}</span><strong>+${selectedMode.fee}</strong></div>
                )}
                <div className="abm-pay-row abm-pay-total"><span>Total</span><strong>${totalFee}</strong></div>
              </div>

              <button className="abm-btn-confirm2 abm-pay-confirm-full" onClick={confirmBooking} disabled={booking}>
                {booking ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Booking…</>
                ) : (
                  <><i className="fa-solid fa-lock"></i> Confirm &amp; Book · ${totalFee}</>
                )}
              </button>
              {bookError && <p className="abm-pay-error">{bookError}</p>}
              <button className="abm-btn-back2 abm-pay-back-full" onClick={() => setStep('select')} disabled={booking}>
                <i className="fa-solid fa-arrow-left"></i> Back
              </button>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  /* ===== Step 1: Selection ===== */
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

            {/* Clinic details */}
            <div className="abm-side-stack">
              <div className="abm-card abm-clinic-details">
                <div className="abm-cd-title"><i className="fa-solid fa-hospital"></i> Clinic Details</div>
                <div className="abm-cd-row"><span className="abm-cd-key">Location:</span> {selectedClinic.address}</div>
                <div className="abm-cd-row"><span className="abm-cd-key">Available Days:</span> {selectedClinic.days}</div>
                <div className="abm-cd-row"><span className="abm-cd-key">Timings:</span> {selectedClinic.timings}</div>
                <div className="abm-cd-row"><span className="abm-cd-key">Consultation Fee:</span> ${selectedClinic.fee}</div>
              </div>
            </div>
          </div>

          {/* ---- Booking Form (date picker) ---- */}
          {/* Clinic + Consultation Mode selectors */}
          <div className="abm-selectors">
            {/* Clinic dropdown */}
            <div className="abm-select">
              <button className="abm-select-head" onClick={() => { setClinicOpen(!clinicOpen); setModeOpen(false); }}>
                <span className="abm-select-icon"><i className="fa-solid fa-hospital"></i></span>
                <span className="abm-select-headtext">
                  <span className="abm-select-eyebrow">CLINIC</span>
                  <span className="abm-select-current">{selectedClinic.name}</span>
                </span>
                <i className={`fa-solid fa-chevron-${clinicOpen ? 'up' : 'down'} abm-select-caret`}></i>
              </button>

              {clinicOpen && (
                <div className="abm-select-body">
                  <div className="abm-select-subtitle"><i className="fa-solid fa-hospital"></i> Select Clinic for {doctor.name}</div>
                  {clinics.map((c) => (
                    <div
                      key={c.id}
                      className={`abm-opt-card ${selectedClinicId === c.id ? 'selected' : ''}`}
                      onClick={() => { setSelectedClinicId(c.id); setClinicOpen(false); }}
                    >
                      <div className="abm-opt-main">
                        <div className="abm-opt-name"><span className="abm-opt-dot"></span> {c.name}</div>
                        <div className="abm-opt-addr">{c.address}</div>
                        <div className="abm-opt-tags">
                          <span className="abm-opt-tag blue"><i className="fa-regular fa-calendar"></i> {c.days}</span>
                          <span className="abm-opt-tag gray"><i className="fa-regular fa-clock"></i> {c.timings}</span>
                          <span className="abm-opt-tag green"><i className="fa-solid fa-money-bill"></i> ${c.fee}</span>
                        </div>
                      </div>
                      {selectedClinicId === c.id && <span className="abm-opt-check"><i className="fa-solid fa-check"></i></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation Mode dropdown */}
            <div className="abm-select">
              <button className="abm-select-head" onClick={() => { setModeOpen(!modeOpen); setClinicOpen(false); }}>
                <span className="abm-select-icon"><i className={`fa-solid ${selectedMode.icon}`}></i></span>
                <span className="abm-select-headtext">
                  <span className="abm-select-eyebrow">CONSULTATION MODE</span>
                  <span className="abm-select-current">{selectedMode.name}</span>
                </span>
                <i className={`fa-solid fa-chevron-${modeOpen ? 'up' : 'down'} abm-select-caret`}></i>
              </button>

              {modeOpen && (
                <div className="abm-select-body">
                  <div className="abm-select-subtitle"><i className="fa-solid fa-comment-medical"></i> Select Consultation Mode</div>
                  {modes.map((m) => (
                    <div
                      key={m.id}
                      className={`abm-opt-card ${selectedModeId === m.id ? 'selected' : ''}`}
                      onClick={() => { setSelectedModeId(m.id); setModeOpen(false); }}
                    >
                      <div className="abm-opt-mode-ic"><i className={`fa-solid ${m.icon}`}></i></div>
                      <div className="abm-opt-main">
                        <div className="abm-opt-name">{m.name}</div>
                        <div className="abm-opt-addr">{m.desc}</div>
                        <span className="abm-opt-fee">Additional Fee: ${m.fee}</span>
                      </div>
                      {selectedModeId === m.id && <span className="abm-opt-check"><i className="fa-solid fa-check"></i></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="abm-location-field">
            <label htmlFor="appointment-location"><i className="fa-solid fa-location-dot"></i> Appointment Location</label>
            <input
              id="appointment-location"
              type="text"
              value={appointmentLocation}
              onChange={(event) => setAppointmentLocation(event.target.value)}
              placeholder="Enter area, address or location"
              required
            />
          </div>

          <div className="abm-main">
          <div className="abm-section-head">
            <h3 className="abm-section-title">Choose Appointment Date</h3>
            <div className="abm-month-nav">
              <button><i className="fa-solid fa-chevron-left"></i></button>
              <span>{calendarMonthLabel}</span>
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
              const isSelected = selectedDate?.iso === d.iso;
              return (
                <button
                  key={d.iso}
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
              <h4 className="abm-times-title">Available Times for {selectedDate.day}, {selectedDate.label}</h4>

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
            <span className="abm-total-amount">${totalFee}.00</span>
          </div>

          {!hasClinics && (
            <p className="abm-no-clinic">
              <i className="fa-solid fa-circle-exclamation"></i> This doctor has no clinic available yet, so booking isn't possible.
            </p>
          )}

          <button
            className="abm-confirm"
            onClick={goToPayment}
            disabled={!selectedDate || !selectedTime || !hasClinics || !appointmentLocation.trim()}
          >
            Confirm Selection <i className="fa-solid fa-arrow-right"></i>
          </button>
        </aside>

      </div>
    </div>
  );
};

export default AppointmentBookingModal;
