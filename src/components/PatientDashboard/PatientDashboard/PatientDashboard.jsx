import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../../redux/apiConfig';
import { getCurrentUserId } from '../../../redux/chatApi';
import './PatientDashboard.css';


const PatientDashboard = ({
  fullName = "Arun Kumar",
  phoneNo = "Not recorded",
  bloodGroup = "Not recorded",
  email = "Not recorded",
  gender = "Male",
  address = "Not recorded",
  age = "34 Year",
  // --- Token queue props (mock defaults; wire to API later) ---
  myToken = 7,                 // Patient's own token number
  initialNowServing = 4,       // Token being served on load
  avgSecondsPerPatient = 90,   // Estimated time per patient (90s = 1:30)
}) => {

  // Status (static per screenshot)
  const patientStatus = "stable";
  const statusLabel = "Stable";

  // --- Live token countdown ---
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.max(0, (myToken - initialNowServing) * avgSecondsPerPatient)
  );

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds]);

  // --- Real patient data from /users/:id ---
  const [patient, setPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(true);
  const [patientError, setPatientError] = useState('');

  useEffect(() => {
    const patientId = getCurrentUserId();
    console.log('[PatientDashboard] resolved patientId =', patientId);

    if (!patientId) {
      setPatientError('Not logged in (no patient id found). Showing placeholder data.');
      setPatientLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const url = `${API_BASE_URL}/users/${patientId}`;
      try {
        const res = await axios.get(url, { headers: getAuthHeaders() });
        console.log('[PatientDashboard] GET', url, '->', res.data);
        const data = res.data?.data || res.data;
        if (!cancelled) setPatient(data);
      } catch (err) {
        const status = err.response?.status;
        const msg = err.response?.data?.message || err.message;
        console.error('[PatientDashboard] GET', url, 'failed:', status, err.response?.data || err);
        if (!cancelled) setPatientError(`Couldn't load your data (${status || 'network error'}): ${msg}`);
      } finally {
        if (!cancelled) setPatientLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const p = patient || {};

  // --- Booked appointment (token comes from here) ---
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) return;
    let cancelled = false;
    const url = `${API_BASE_URL}/appointments?patient_id=${id}`;
    axios.get(url, { headers: getAuthHeaders() })
      .then((res) => {
        const raw = res.data?.data ?? res.data ?? [];
        const list = Array.isArray(raw) ? raw : [];
        console.log('[PatientDashboard] GET', url, '->', list);
        // Prefer the soonest upcoming appointment, else the latest one
        const today = new Date().setHours(0, 0, 0, 0);
        const upcoming = list
          .filter((a) => a.appointment_date && new Date(a.appointment_date).setHours(0, 0, 0, 0) >= today)
          .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))[0];
        const latest = [...list].sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date))[0];
        if (!cancelled) setAppointment(upcoming || latest || null);
      })
      .catch((err) => console.error('[PatientDashboard] GET', url, 'failed:', err.response?.status, err.response?.data || err));
    return () => { cancelled = true; };
  }, []);

  const appt = appointment || {};
  const hasAppointment = appointment != null;

  // Token comes from the booked appointment
  const myTokenVal = Number(appt.token ?? appt.token_number ?? appt.queue_token ?? myToken);
  const nowServingVal = Number(appt.now_serving ?? appt.current_token ?? appt.serving_token ?? initialNowServing);

  // Re-seed the countdown once the real appointment arrives
  useEffect(() => {
    if (appt.token != null || appt.token_number != null || appt.now_serving != null) {
      setRemainingSeconds(Math.max(0, (myTokenVal - nowServingVal) * avgSecondsPerPatient));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  const nowServing =
    remainingSeconds <= 0
      ? myTokenVal
      : myTokenVal - Math.ceil(remainingSeconds / avgSecondsPerPatient);
  const patientsAhead = Math.max(0, myTokenVal - nowServing);
  const isMyTurn = remainingSeconds <= 0;

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Time-based greeting
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // ---- Derived display values (real data with fallbacks) ----
  const computeAge = (dob) => {
    if (!dob) return null;
    const d = new Date(dob);
    if (Number.isNaN(d.getTime())) return null;
    return Math.abs(new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970);
  };
  const apiAge = p.age ?? computeAge(p.date_of_birth || p.dob);

  const dFullName = p.full_name || p.name || p.fullname || fullName;
  const dPhone = p.contact_number || p.phone || p.phone_number || p.mobile || phoneNo;
  const dEmail = p.email || email;
  const dGender = p.gender || gender;
  const dBlood = p.blood_group || p.bloodGroup || bloodGroup;
  const dAddress = p.address || p.city || address;
  const dAgeText = apiAge != null ? `${apiAge} Year` : age;
  const dLastVisit = p.last_visit || p.lastVisit || "21 Jun 2026";
  const dPatientSince = p.created_at ? new Date(p.created_at).getFullYear() : "2024";

  // Today's date (real)
  const todayFormatted = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const patientDisplayId = p.patient_id || p.patientId || p.uhid || p.code || p._id || "PK-9921";

  // Profile avatar — real photo when available, else the local placeholder
  const profileAvatar = p.avatar || p.photo || p.profile_image || "/patient-avatar.jpg";

  // Clinical Snapshot metrics — real vitals from the patient record (fallbacks kept)
  const v = p.vitals || p.latest_vitals || {};
  const vital = (...keys) => {
    for (const k of keys) {
      if (v[k] != null && v[k] !== "") return v[k];
      if (p[k] != null && p[k] !== "") return p[k];
    }
    return null;
  };
  const hasReading = (val) => val != null && val !== "" && val !== "00.0";

  const bpVal = vital("blood_pressure", "bp", "bloodPressure");
  const sugarVal = vital("blood_sugar", "sugar", "glucose", "bloodSugar");
  const weightVal = vital("weight");
  const spo2Val = vital("spo2", "oxygen", "oxygen_saturation", "SpO2");
  const tempVal = vital("temperature", "temp");

  const snapshot = [
    { key: "bp", label: "Blood Pressure", value: bpVal ?? "120/80", unit: "mmHg", sub: hasReading(bpVal) ? "Latest reading" : "No recent reading", trend: hasReading(bpVal) ? "Normal" : "", trendType: "good", icon: "fa-heart", tint: "red" },
    { key: "sugar", label: "Blood Sugar", value: sugarVal ?? "95", unit: "mg/dL", sub: hasReading(sugarVal) ? "Latest reading" : "No recent reading", trend: "", trendType: "muted", icon: "fa-droplet", tint: "blue" },
    { key: "weight", label: "Weight", value: weightVal ?? "76.5", unit: "kg", sub: hasReading(weightVal) ? "Latest reading" : "No recent reading", trend: "", trendType: "muted", icon: "fa-weight-scale", tint: "amber" },
    { key: "spo2", label: "SPO2", value: spo2Val ?? "00.0", unit: hasReading(spo2Val) ? "%" : "", sub: hasReading(spo2Val) ? "Latest reading" : "No recent reading", trend: "", trendType: "", icon: "fa-lungs", tint: "green" },
    { key: "temp", label: "Temperature", value: tempVal ?? "00.0", unit: hasReading(tempVal) ? "°F" : "", sub: hasReading(tempVal) ? "Latest reading" : "No recent reading", trend: "", trendType: "", icon: "fa-temperature-half", tint: "indigo" },
  ];

  // Active conditions (array of strings or objects)
  // Conditions — prefer the appointment record, else the patient's registration data
  const rawConditions =
    appt.conditions || appt.active_conditions || appt.medical_conditions ||
    p.conditions || p.active_conditions || p.activeConditions || p.medical_conditions || [];
  const conditionsArr = Array.isArray(rawConditions)
    ? rawConditions
    : typeof rawConditions === "string"
      ? rawConditions.split(",")               // registration saves this as free text
      : [];
  const conditions = conditionsArr
    .map((c) => (typeof c === "string" ? c.trim() : c?.name || c?.condition || c?.title))
    .filter(Boolean)
    .filter((c) => !/^(none|n\/a|no|nil)$/i.test(c));

  // Recent consultation
  const consult =
    p.recent_consultation || p.last_consultation ||
    (Array.isArray(p.consultations) ? p.consultations[0] : null) || {};
  const consultRawDate = consult.date || consult.created_at || consult.visit_date;
  const consultDate = consultRawDate
    ? new Date(consultRawDate).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
    : "21 Jun 2026";
  const consultComplaint = consult.complaint || consult.chief_complaint || consult.symptoms || "Fever & weakness";
  const consultDiagnosis = consult.diagnosis || consult.assessment || "Viral infection";

  // Clinical notes — from the appointment record
  const rawNotes =
    appt.clinical_notes || appt.notes || appt.doctor_notes || appt.remarks ||
    appt.follow_up || appt.followup || consult.notes || p.clinical_notes || "";
  const clinicalNotes = (Array.isArray(rawNotes) ? rawNotes : String(rawNotes).split("\n"))
    .map((n) => (typeof n === "string" ? n.trim() : n?.note || n?.text))
    .filter(Boolean);

  // ===== Shimmer skeleton while the API loads (no dummy data) =====
  if (patientLoading) {
    return (
      <div className="patient-dashboard p-3">
        <header className="patient-greeting-header">
          <div className="patient-greeting-left">
            <div className="pd-skel pd-skel-title"></div>
            <div className="pd-skel pd-skel-sub"></div>
          </div>
          <div className="patient-greeting-right">
            <div className="pd-skel pd-skel-badge"></div>
            <div className="pd-skel pd-skel-badge"></div>
            <div className="pd-skel pd-skel-badge"></div>
          </div>
        </header>

        <div className="pd-grid">
          <div className="pd-main">
            {/* Profile card */}
            <div className="patient-profile-card">
              <div className="ppc-left">
                <div className="pd-skel pd-skel-avatar"></div>
                <div className="ppc-info" style={{ flex: 1 }}>
                  <div className="pd-skel pd-skel-line" style={{ width: '38%', height: 18 }}></div>
                  <div className="pd-skel pd-skel-line" style={{ width: '72%' }}></div>
                  <div className="pd-skel pd-skel-line" style={{ width: '55%', marginBottom: 0 }}></div>
                </div>
              </div>
            </div>

            {/* Token boxes */}
            <div className="token-status-grid">
              <div className="pd-skel pd-skel-box"></div>
              <div className="pd-skel pd-skel-box"></div>
              <div className="pd-skel pd-skel-box"></div>
            </div>

            {/* Clinical snapshot */}
            <section className="pd-card">
              <div className="pd-skel pd-skel-line" style={{ width: '32%', height: 16, marginBottom: 16 }}></div>
              <div className="snapshot-grid">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="pd-skel pd-skel-card" key={i}></div>
                ))}
              </div>
            </section>

            {/* Conditions + consultation */}
            <div className="pd-two">
              <section className="pd-card">
                <div className="pd-skel pd-skel-line" style={{ width: '45%', height: 16, marginBottom: 16 }}></div>
                <div className="pd-skel" style={{ height: 60, borderRadius: 10 }}></div>
              </section>
              <section className="pd-card">
                <div className="pd-skel pd-skel-line" style={{ width: '45%', height: 16, marginBottom: 16 }}></div>
                <div className="pd-skel" style={{ height: 60, borderRadius: 10 }}></div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="pd-side">
            {[1, 2, 3].map((i) => (
              <section className="pd-side-card" key={i}>
                <div className="pd-skel pd-skel-line" style={{ width: '55%', height: 15, marginBottom: 16 }}></div>
                <div className="pd-skel pd-skel-line"></div>
                <div className="pd-skel pd-skel-line" style={{ width: '80%' }}></div>
                <div className="pd-skel pd-skel-line" style={{ width: '65%', marginBottom: 0 }}></div>
              </section>
            ))}
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-dashboard p-3">

      {patientError && (
        <div className="pd-api-error">
          <i className="fa-solid fa-circle-exclamation"></i> {patientError}
        </div>
      )}

      {/* ===== Greeting Header ===== */}
      <header className="patient-greeting-header">
        <div className="patient-greeting-left">
          <h1 className="patient-greeting-title">
            {getGreeting()}, {dFullName} <span className="pg-wave">👋</span>
          </h1>
          <p className="patient-greeting-sub">Here's your health summary for today.</p>
        </div>

        <div className="patient-greeting-right">
          <span className="pg-badge pg-id">ID: {patientDisplayId}</span>
          <span className={`pg-badge pg-status pg-status-${patientStatus}`}>
            <span className="pg-status-dot"></span>
            {statusLabel}
          </span>
          <span className="pg-badge pg-date">
            <i className="fa-regular fa-calendar"></i> {todayFormatted}
          </span>
        </div>
      </header>

      {/* ===== Two-column layout ===== */}
      <div className="pd-grid">

        {/* ---------- LEFT MAIN COLUMN ---------- */}
        <div className="pd-main">

          {/* Profile Card */}
          <div className="patient-profile-card">
            <div className="ppc-left">
              <img
                src={profileAvatar}
                alt={dFullName}
                className="ppc-avatar"
                onError={(e) => { e.target.src = "https://www.w3schools.com/howto/img_avatar.png"; }}
              />
              <div className="ppc-info">
                <div className="ppc-name-row">
                  <h2 className="ppc-name">{dFullName}</h2>
                  <span className={`ppc-badge ppc-badge-${patientStatus}`}>{patientStatus.toUpperCase()}</span>
                </div>
                <div className="ppc-details">
                  <span className="ppc-detail"><i className="fa-solid fa-cake-candles"></i> Age: <strong>{dAgeText}</strong></span>
                  <span className="ppc-detail"><i className="fa-solid fa-venus-mars"></i> Gender: <strong>{dGender}</strong></span>
                  <span className="ppc-detail"><i className="fa-regular fa-calendar-check"></i> Last Visit: <strong>{dLastVisit}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Token Queue Status — only when an appointment is booked */}
          {!hasAppointment ? (
            <div className="pd-card">
              <p className="pd-empty">
                <i className="fa-regular fa-calendar-xmark"></i> No appointment booked yet — book one to get your token.
              </p>
            </div>
          ) : (
          <div className="token-status-grid">
            {/* Box 1 — Your Token */}
            <div className="token-box token-box-mine">
              <div className="token-box-icon"><i className="fa-solid fa-ticket"></i></div>
              <div className="token-box-body">
                <span className="token-box-label">Your Token</span>
                <span className="token-box-value">#{myTokenVal}</span>
                <span className="token-box-sub">
                  {isMyTurn ? "It's your turn now!" : `${patientsAhead} ${patientsAhead === 1 ? 'patient' : 'patients'} ahead`}
                </span>
              </div>
            </div>

            {/* Box 2 — Time Remaining (live countdown) */}
            <div className={`token-box token-box-timer ${isMyTurn ? 'token-box-ready' : ''}`}>
              <div className="token-box-icon"><i className="fa-solid fa-clock"></i></div>
              <div className="token-box-body">
                <span className="token-box-label">Time Remaining</span>
                <span className="token-box-value">{isMyTurn ? "0:00" : formatTime(remainingSeconds)}</span>
                <span className="token-box-sub">{isMyTurn ? "Please proceed" : "until your turn"}</span>
              </div>
            </div>

            {/* Box 3 — Now Serving */}
            <div className="token-box token-box-serving">
              <div className="token-box-icon"><i className="fa-solid fa-bullhorn"></i></div>
              <div className="token-box-body">
                <span className="token-box-label">Now Serving</span>
                <span className="token-box-value">#{nowServing}</span>
                <span className="token-box-sub">current token</span>
              </div>
            </div>
          </div>
          )}

          {/* Clinical Snapshot */}
          <section className="pd-card">
            <h3 className="pd-card-title">
              <i className="fa-solid fa-heart-pulse pd-title-icon"></i> Clinical Snapshot
            </h3>
            <div className="snapshot-grid">
              {snapshot.map((s) => (
                <div key={s.key} className="snap-card">
                  <div className="snap-top">
                    <span className={`snap-icon snap-${s.tint}`}>
                      <i className={`fa-solid ${s.icon}`}></i>
                    </span>
                    {s.trend && (
                      <span className={`snap-trend snap-trend-${s.trendType}`}>
                        {s.trendType === "up" && <i className="fa-solid fa-arrow-trend-up"></i>}
                        {s.trend}
                      </span>
                    )}
                  </div>
                  <div className="snap-label">{s.label}</div>
                  <div className="snap-value">
                    {s.value}{s.unit && <span className="snap-unit"> {s.unit}</span>}
                  </div>
                  <div className="snap-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Conditions + Recent Consultation */}
          <div className="pd-two">
            <section className="pd-card pd-card-conditions">
              <h3 className="pd-card-title">
                <i className="fa-solid fa-notes-medical pd-title-icon"></i> Active Conditions
              </h3>
              {conditions.length > 0 ? (
                <div className="pd-conditions-list">
                  {conditions.map((c, i) => (
                    <span key={i} className="pd-condition-chip">{c}</span>
                  ))}
                </div>
              ) : (
                <p className="pd-empty">No active conditions recorded</p>
              )}
            </section>

            <section className="pd-card pd-card-consult">
              <div className="consult-head">
                <h3 className="pd-card-title">
                  <i className="fa-solid fa-clock-rotate-left pd-title-icon"></i> Recent Consultation
                </h3>
                <span className="consult-date">{consultDate}</span>
              </div>
              <div className="consult-cols">
                <div className="consult-block">
                  <span className="consult-key">COMPLAINT</span>
                  <p className="consult-val">{consultComplaint}</p>
                </div>
                <div className="consult-block">
                  <span className="consult-key">DIAGNOSIS</span>
                  <p className="consult-val consult-val-diagnosis">{consultDiagnosis}</p>
                </div>
              </div>
            </section>
          </div>

        </div>

        {/* ---------- RIGHT SIDEBAR ---------- */}
        <aside className="pd-side">
          <section className="pd-side-card">
            <h3 className="pd-side-title">Contact &amp; Demographics</h3>
            <div className="side-row"><span className="side-key">PHONE</span><span className="side-val muted">{dPhone}</span></div>
            <div className="side-row"><span className="side-key">EMAIL</span><span className="side-val muted">{dEmail}</span></div>
            <div className="side-row"><span className="side-key">ADDRESS</span><span className="side-val muted">{dAddress}</span></div>
            <div className="side-row"><span className="side-key">BLOOD GRP</span><span className="side-val muted">{dBlood}</span></div>
          </section>

          <section className="pd-side-card">
            <h3 className="pd-side-title">Registration Info</h3>
            <div className="side-row"><span className="side-key">PATIENT SINCE</span><span className="side-val">{dPatientSince}</span></div>
            <div className="side-row"><span className="side-key">CLINIC</span><span className="side-val">Main Hospital</span></div>
          </section>

          <section className="pd-side-card">
            <h3 className="pd-side-title">
              <i className="fa-solid fa-file-lines pd-title-icon"></i> Clinical Notes
            </h3>
            {clinicalNotes.length > 0 ? (
              clinicalNotes.map((n, i) => (
                <div key={i} className="clinical-note">
                  <i className="fa-solid fa-circle-check"></i> {n}
                </div>
              ))
            ) : (
              <p className="pd-empty">No clinical notes recorded</p>
            )}
          </section>
        </aside>

      </div>
    </div>
  );
};

export default PatientDashboard;
