import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../../redux/apiConfig';
import { getCurrentUserId } from '../../../redux/chatApi';
import useCallSocket from '../../../hooks/useCallSocket';
import './MyAppointments.css';

const TABS = ['Upcoming', 'Past', 'Cancelled'];

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | succeeded | failed
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Upcoming');

  useCallSocket({
    onAppointmentDelayed: (data) => setAppointments((current) => current.map((appointment) =>
      String(appointment.id || appointment._id) === String(data.appointment_id)
        ? { ...appointment, estimated_start_at: data.estimated_start_at, delay_minutes: data.delay_minutes, delay_reason: data.reason }
        : appointment
    )),
  });

  const loadAppointments = async () => {
    const id = getCurrentUserId();
    if (!id) {
      setError('Not logged in — no patient id found.');
      setStatus('failed');
      return;
    }
    setStatus('loading');
    setError('');
    const url = `${API_BASE_URL}/appointments?patient_id=${id}`;
    try {
      const res = await axios.get(url, { headers: getAuthHeaders() });
      const raw = res.data?.data ?? res.data ?? [];
      console.log('[MyAppointments] GET', url, '->', raw);
      setAppointments(Array.isArray(raw) ? raw : []);
      setStatus('succeeded');
    } catch (err) {
      const code = err.response?.status;
      console.error('[MyAppointments] GET', url, 'failed:', code, err.response?.data || err);
      setError(err.response?.data?.message || err.message || 'Failed to load appointments');
      setStatus('failed');
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // ---- helpers ----
  const rawStatus = (a) => String(a.status || a.appointment_status || '').toLowerCase();

  // "jupiter hospital" -> "Jupiter Hospital"
  const titleCase = (s) =>
    String(s || '')
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  // "in-clinic" -> "In-Clinic Visit"
  const modeLabel = (m) => {
    const key = String(m || '').toLowerCase();
    if (key.includes('video')) return 'Video Consultation';
    if (key.includes('voice') || key.includes('phone')) return 'Voice Consultation';
    if (key.includes('clinic')) return 'In-Clinic Visit';
    return titleCase(m);
  };

  const modeIcon = (m) => {
    const key = String(m || '').toLowerCase();
    if (key.includes('video')) return 'fa-video';
    if (key.includes('voice') || key.includes('phone')) return 'fa-phone';
    return 'fa-hospital';
  };

  const prettyDate = (d) => {
    if (!d) return '—';
    const dt = new Date(d);
    return Number.isNaN(dt.getTime())
      ? String(d)
      : dt.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // "14:30:00" -> "02:30 PM"
  const prettyTime = (t) => {
    if (!t) return '—';
    const m = String(t).match(/^(\d{1,2}):(\d{2})/);
    if (!m) return String(t);
    let h = parseInt(m[1], 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${String(h).padStart(2, '0')}:${m[2]} ${ampm}`;
  };

  const effectiveTime = (appointment) => appointment.estimated_start_at || appointment.original_appointment_at;

  const isPast = (a) => {
    const d = effectiveTime(a) || a.appointment_date;
    if (!d) return false;
    return new Date(d).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  };

  const bucketOf = (a) => {
    const s = rawStatus(a);
    if (s.includes('cancel')) return 'Cancelled';
    if (s.includes('complete') || isPast(a)) return 'Past';
    return 'Upcoming';
  };

  const statusClass = (a) => {
    const s = rawStatus(a);
    if (s.includes('cancel')) return 'cancelled';
    if (s.includes('complete')) return 'completed';
    if (s.includes('confirm')) return 'confirmed';
    return 'pending';
  };

  const statusLabel = (a) =>
    titleCase(a.status || a.appointment_status || (isPast(a) ? 'Completed' : 'Pending'));

  const doctorName = (a) => {
    const raw = a.doctor_name || a.doctor?.full_name || a.doctor?.name || a.doctorName || 'Doctor';
    const name = titleCase(raw);
    return /^dr\.?\s/i.test(name) ? name : `Dr. ${name}`;
  };

  const doctorId = (a) => a.doctor_user_id || a.doctor_id || a.doctorId || a.doctor?.user_id || a.doctor?.id || a.doctor?._id;

  const callAvailability = (a) => {
    const mode = String(a.consultation_mode || a.mode || '').toLowerCase();
    if (!mode.includes('video') && !mode.includes('voice')) return { enabled: false, mode: '' };
    const effective = effectiveTime(a);
    const date = String(a.appointment_date || '').slice(0, 10);
    const time = String(a.appointment_time || '00:00:00').slice(0, 8);
    const scheduled = effective ? new Date(effective) : new Date(`${date}T${time}`);
    if (Number.isNaN(scheduled.getTime())) return { enabled: true, mode: mode.includes('video') ? 'video' : 'voice' };
    const diffMinutes = (Date.now() - scheduled.getTime()) / 60000;
    return { enabled: diffMinutes >= -15 && diffMinutes <= 90, mode: mode.includes('video') ? 'video' : 'voice' };
  };

  const joinAppointmentCall = (appointment) => {
    const availability = callAvailability(appointment);
    const id = doctorId(appointment);
    if (!availability.enabled || !id) return;
    navigate(`/doctor-chat/${id}`, { state: { appointment: { ...appointment, callType: availability.mode } } });
  };

  const initialsOf = (name = '') =>
    name.replace(/^Dr\.?\s*/i, '')
      .split(' ').filter(Boolean).map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'DR';

  const visible = appointments.filter((a) => bucketOf(a) === tab);
  const countFor = (t) => appointments.filter((a) => bucketOf(a) === t).length;

  return (
    <div className="mya-page">

      {/* ===== Header ===== */}
      <div className="mya-head">
        <div>
          <h1 className="mya-title">My Appointments</h1>
          <p className="mya-sub">View your booked appointments, their status, token and details.</p>
        </div>
        {/* Segmented nav: Book Appointment | My Appointments */}
        <div className="appt-seg" role="tablist" aria-label="Appointment pages">
          <button
            className="appt-seg-btn"
            role="tab"
            aria-selected="false"
            onClick={() => navigate('/patientappointment')}
          >
            <i className="fa-solid fa-calendar-plus"></i> Book Appointment
          </button>
          <button
            className="appt-seg-btn active"
            role="tab"
            aria-selected="true"
            onClick={() => navigate('/my-appointments')}
          >
            <i className="fa-regular fa-calendar-check"></i> My Appointments
          </button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="mya-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`mya-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t} <span className="mya-tab-count">{countFor(t)}</span>
          </button>
        ))}
      </div>

      {/* ===== States ===== */}
      {status === 'loading' ? (
        <div className="mya-list">
          {[1, 2, 3].map((i) => (
            <div className="mya-card" key={i}>
              <div className="mya-card-left">
                <div className="mya-skel mya-skel-avatar"></div>
                <div style={{ flex: 1 }}>
                  <div className="mya-skel mya-skel-line" style={{ width: '38%', height: 16 }}></div>
                  <div className="mya-skel mya-skel-line" style={{ width: '25%' }}></div>
                  <div className="mya-skel-chips">
                    <span className="mya-skel mya-skel-chip"></span>
                    <span className="mya-skel mya-skel-chip"></span>
                    <span className="mya-skel mya-skel-chip"></span>
                  </div>
                </div>
              </div>
              <div className="mya-card-right">
                <div className="mya-skel mya-skel-token"></div>
              </div>
            </div>
          ))}
        </div>
      ) : status === 'failed' ? (
        <div className="mya-empty">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <h3>Couldn't load appointments</h3>
          <p>{error}</p>
          <button className="mya-book-btn" onClick={loadAppointments}>Retry</button>
        </div>
      ) : visible.length === 0 ? (
        <div className="mya-empty">
          <i className="fa-regular fa-calendar-xmark"></i>
          <h3>No {tab.toLowerCase()} appointments</h3>
          <p>
            {tab === 'Upcoming'
              ? "You haven't booked any appointment yet."
              : `You have no ${tab.toLowerCase()} appointments.`}
          </p>
          {tab === 'Upcoming' && (
            <button className="mya-book-btn" onClick={() => navigate('/patientappointment')}>
              <i className="fa-solid fa-plus"></i> Book Appointment
            </button>
          )}
        </div>
      ) : (
        <div className="mya-list">
          {visible.map((a, i) => (
            <div className={`mya-card mya-card-${statusClass(a)}`} key={a.id || a._id || i}>

              <div className="mya-card-left">
                <div className="mya-avatar">{initialsOf(doctorName(a))}</div>
                <div className="mya-info">
                  <div className="mya-name-row">
                    <h3 className="mya-doctor">{doctorName(a)}</h3>
                    <span className={`mya-status mya-status-${statusClass(a)}`}>{statusLabel(a)}</span>
                  </div>
                  <span className="mya-specialty">
                    {titleCase(a.specialization || a.specialty || '') || 'General Consultation'}
                  </span>

                  <div className="mya-meta">
                    <span className="mya-chip mya-chip-date">
                      <i className="fa-regular fa-calendar"></i> {prettyDate(effectiveTime(a) || a.appointment_date)}
                    </span>
                    <span className="mya-chip mya-chip-time">
                      <i className="fa-regular fa-clock"></i> {effectiveTime(a) ? new Date(effectiveTime(a)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : prettyTime(a.appointment_time)}
                    </span>
                    {Number(a.delay_minutes || 0) > 0 && <span className="mya-chip"><i className="fa-solid fa-clock-rotate-left"></i> Delayed {a.delay_minutes} min{a.delay_reason ? ` · ${a.delay_reason}` : ''}</span>}
                    {(a.clinic_name || a.clinic) && (
                      <span className="mya-chip">
                        <i className="fa-solid fa-location-dot"></i> {titleCase(a.clinic_name || a.clinic)}
                      </span>
                    )}
                    {(a.consultation_mode || a.mode) && (
                      <span className="mya-chip">
                        <i className={`fa-solid ${modeIcon(a.consultation_mode || a.mode)}`}></i>{' '}
                        {modeLabel(a.consultation_mode || a.mode)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mya-card-right">
                {(a.token ?? a.token_number) != null && (
                  <div className="mya-token">
                    <span className="mya-token-label">Token</span>
                    <span className="mya-token-num">#{a.token ?? a.token_number}</span>
                  </div>
                )}
                <div className="mya-pay-col">
                  {(a.fee ?? a.total_fee) != null && (
                    <span className="mya-fee">${a.fee ?? a.total_fee}</span>
                  )}
                  {a.payment_method && (
                    <span className="mya-pay">
                      <i className="fa-solid fa-wallet"></i> {titleCase(a.payment_method)}
                    </span>
                  )}
                  {callAvailability(a).mode && (
                    <button
                      type="button"
                      className="mya-call-btn"
                      disabled={!callAvailability(a).enabled || !doctorId(a)}
                      onClick={() => joinAppointmentCall(a)}
                      title={callAvailability(a).enabled ? `Start ${callAvailability(a).mode} call` : 'Call opens 15 minutes before appointment time'}
                    >
                      <i className={`fa-solid ${callAvailability(a).mode === 'video' ? 'fa-video' : 'fa-phone'}`}></i>
                      {callAvailability(a).mode === 'video' ? 'Join Video Call' : 'Start Voice Call'}
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
