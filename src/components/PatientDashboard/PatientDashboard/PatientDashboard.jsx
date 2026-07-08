import React, { useState, useEffect } from 'react';
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

  const nowServing =
    remainingSeconds <= 0
      ? myToken
      : myToken - Math.ceil(remainingSeconds / avgSecondsPerPatient);
  const patientsAhead = Math.max(0, myToken - nowServing);
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

  // Static values (per screenshot)
  const todayFormatted = "Oct 24, 2023";
  const patientDisplayId = "PK-9921";

  // Profile card values (static). Replace /patient-avatar.jpg in public/ with a real photo.
  const profileAvatar = "/patient-avatar.jpg";
  const profileAge = "34 Year";
  const profileGender = "Male";
  const profileLastVisit = "21 Jun 2026";

  // Clinical Snapshot metrics (static per screenshot)
  const snapshot = [
    { key: "bp", label: "Blood Pressure", value: "120/80", unit: "mmHg", sub: "Updated 2h ago", trend: "Normal", trendType: "good", icon: "fa-heart", tint: "red" },
    { key: "sugar", label: "Blood Sugar", value: "95", unit: "mg/dL", sub: "Updated 1d ago", trend: "No trend", trendType: "muted", icon: "fa-droplet", tint: "blue" },
    { key: "weight", label: "Weight", value: "76.5", unit: "kg", sub: "Updated 1w ago", trend: "+1kg", trendType: "up", icon: "fa-weight-scale", tint: "amber" },
    { key: "spo2", label: "SPO2", value: "00.0", unit: "", sub: "NO Recent Reading", trend: "", trendType: "", icon: "fa-lungs", tint: "green" },
    { key: "temp", label: "Temperature", value: "00.0", unit: "", sub: "No Recent Reading", trend: "", trendType: "", icon: "fa-temperature-half", tint: "indigo" },
  ];

  return (
    <div className="patient-dashboard p-3">

      {/* ===== Greeting Header ===== */}
      <header className="patient-greeting-header">
        <div className="patient-greeting-left">
          <h1 className="patient-greeting-title">
            {getGreeting()}, {fullName} <span className="pg-wave">👋</span>
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
                alt={fullName}
                className="ppc-avatar"
                onError={(e) => { e.target.src = "https://www.w3schools.com/howto/img_avatar.png"; }}
              />
              <div className="ppc-info">
                <div className="ppc-name-row">
                  <h2 className="ppc-name">{fullName}</h2>
                  <span className={`ppc-badge ppc-badge-${patientStatus}`}>{patientStatus.toUpperCase()}</span>
                </div>
                <div className="ppc-details">
                  <span className="ppc-detail">Age: <strong>{profileAge}</strong></span>
                  <span className="ppc-detail">Gender: <strong>{profileGender}</strong></span>
                </div>
                <div className="ppc-detail ppc-lastvisit">Last Visit: <strong>{profileLastVisit}</strong></div>
              </div>
            </div>

            <div className="ppc-actions">
              <button className="ppc-btn ppc-btn-primary">
                <i className="fa-regular fa-calendar-check"></i> Book Appointment
              </button>
              <button className="ppc-btn ppc-btn-outline">
                <i className="fa-solid fa-pen"></i> Edit Profile
              </button>
            </div>
          </div>

          {/* Token Queue Status — 3 boxes */}
          <div className="token-status-grid">
            {/* Box 1 — Your Token */}
            <div className="token-box token-box-mine">
              <div className="token-box-icon"><i className="fa-solid fa-ticket"></i></div>
              <div className="token-box-body">
                <span className="token-box-label">Your Token</span>
                <span className="token-box-value">#{myToken}</span>
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
              <p className="pd-empty">No active conditions recorded</p>
            </section>

            <section className="pd-card pd-card-consult">
              <div className="consult-head">
                <h3 className="pd-card-title">
                  <i className="fa-solid fa-clock-rotate-left pd-title-icon"></i> Recent Consultation
                </h3>
                <span className="consult-date">21 Jun 2026</span>
              </div>
              <div className="consult-cols">
                <div className="consult-block">
                  <span className="consult-key">COMPLAINT</span>
                  <p className="consult-val">Fever &amp; weakness</p>
                </div>
                <div className="consult-block">
                  <span className="consult-key">DIAGNOSIS</span>
                  <p className="consult-val consult-val-diagnosis">Viral infection</p>
                </div>
              </div>
            </section>
          </div>

          {/* Clinical Notes */}
          <section className="pd-card">
            <h3 className="pd-card-title">
              <i className="fa-solid fa-file-lines pd-title-icon"></i> Clinical Notes
            </h3>
            <div className="clinical-note">
              <i className="fa-solid fa-circle-check"></i> Follow-up in 7 days
            </div>
          </section>

        </div>

        {/* ---------- RIGHT SIDEBAR ---------- */}
        <aside className="pd-side">
          <section className="pd-side-card">
            <h3 className="pd-side-title">Contact &amp; Demographics</h3>
            <div className="side-row"><span className="side-key">PHONE</span><span className="side-val muted">{phoneNo}</span></div>
            <div className="side-row"><span className="side-key">EMAIL</span><span className="side-val muted">{email}</span></div>
            <div className="side-row"><span className="side-key">ADDRESS</span><span className="side-val muted">{address}</span></div>
            <div className="side-row"><span className="side-key">BLOOD GRP</span><span className="side-val muted">{bloodGroup}</span></div>
          </section>

          <section className="pd-side-card">
            <h3 className="pd-side-title">Registration Info</h3>
            <div className="side-row"><span className="side-key">PATIENT SINCE</span><span className="side-val">2024</span></div>
            <div className="side-row"><span className="side-key">CLINIC</span><span className="side-val">Main Hospital</span></div>
          </section>
        </aside>

      </div>
    </div>
  );
};

export default PatientDashboard;
