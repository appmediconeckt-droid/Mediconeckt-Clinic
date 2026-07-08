import React, { useState } from "react";
import "./PatientSettingsPage.css";

export default function PatientSettingsPage() {
  const [active, setActive] = useState("appointments");
  const [apptTab, setApptTab] = useState("Upcoming");
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);

  const menu = [
    { id: "appointments", icon: "fa-calendar-check", label: "Appointments" },
    { id: "medical", icon: "fa-file-medical", label: "Medical Records" },
    { id: "password", icon: "fa-lock", label: "Change Password" },
    { id: "help", icon: "fa-circle-question", label: "Help" },
    { id: "info", icon: "fa-circle-info", label: "Info" },
  ];

  const appointments = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      initials: "SJ",
      color: "#0d9488",
      specialty: "Cardiology",
      status: "Confirmed",
      date: "Oct 24, 2023",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      initials: "MC",
      color: "#2563eb",
      specialty: "General Practice",
      status: "Pending",
      date: "Oct 28, 2023",
      time: "2:30 PM",
    },
  ];

  const records = [
    { id: 1, icon: "fa-droplet", title: "Blood Test Results", date: "Oct 15, 2023" },
    { id: 2, icon: "fa-notes-medical", title: "Annual Checkup", date: "Sept 20, 2023" },
  ];

  return (
    <div className="pset-page">
      <div className="pset-grid">

        {/* ---- Left: Settings Menu ---- */}
        <aside className="pset-menu">
          <h3 className="pset-menu-title">Settings Menu</h3>
          {menu.map((m) => (
            <button
              key={m.id}
              className={`pset-menu-item ${active === m.id ? "active" : ""}`}
              onClick={() => setActive(m.id)}
            >
              <i className={`fa-solid ${m.icon}`}></i>
              <span>{m.label}</span>
            </button>
          ))}
        </aside>

        {/* ---- Center: Appointments ---- */}
        <div className="pset-main">
          <div className="pset-card">
            <div className="pset-card-head">
              <h2 className="pset-card-title">
                <i className="fa-solid fa-calendar-days"></i> Appointments
              </h2>
              <div className="pset-toggle-tabs">
                <button
                  className={apptTab === "Upcoming" ? "active" : ""}
                  onClick={() => setApptTab("Upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={apptTab === "Past" ? "active" : ""}
                  onClick={() => setApptTab("Past")}
                >
                  Past
                </button>
              </div>
            </div>

            {appointments.map((a) => (
              <div className="pset-appt" key={a.id}>
                <div className="pset-appt-top">
                  <div className="pset-appt-doctor">
                    <div className="pset-avatar" style={{ background: a.color }}>{a.initials}</div>
                    <div>
                      <div className="pset-appt-name">{a.name}</div>
                      <div className="pset-appt-specialty">{a.specialty}</div>
                    </div>
                  </div>
                  <span className={`pset-status ${a.status.toLowerCase()}`}>
                    <i className={`fa-solid ${a.status === "Confirmed" ? "fa-circle-check" : "fa-clock"}`}></i>
                    {a.status}
                  </span>
                </div>

                <div className="pset-appt-when">
                  <span><i className="fa-regular fa-calendar"></i> {a.date}</span>
                  <span><i className="fa-regular fa-clock"></i> {a.time}</span>
                </div>

                <div className="pset-appt-actions">
                  <button className="pset-btn-primary">View Details</button>
                  <button className="pset-btn-outline">Reschedule</button>
                  <button className="pset-btn-cancel">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: Recent Records + Security ---- */}
        <aside className="pset-right">
          <div className="pset-card">
            <h3 className="pset-side-title">
              <i className="fa-solid fa-file-lines"></i> Recent Records
            </h3>
            {records.map((r) => (
              <div className="pset-record" key={r.id}>
                <div className="pset-record-icon"><i className={`fa-solid ${r.icon}`}></i></div>
                <div>
                  <div className="pset-record-title">{r.title}</div>
                  <div className="pset-record-date">{r.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pset-card">
            <h3 className="pset-side-title">
              <i className="fa-solid fa-shield-halved"></i> Security
            </h3>

            <div className="pset-security-row">
              <div>
                <div className="pset-security-label">Two-Factor Authentication</div>
                <div className="pset-security-sub">Enhanced account security</div>
              </div>
              <button
                className={`pset-switch ${twoFactor ? "on" : ""}`}
                onClick={() => setTwoFactor(!twoFactor)}
                aria-label="Toggle two-factor authentication"
              >
                <span className="pset-switch-knob"></span>
              </button>
            </div>

            <div className="pset-security-row">
              <div>
                <div className="pset-security-label">Email Notifications</div>
                <div className="pset-security-sub">Receive updates via email</div>
              </div>
              <button
                className={`pset-switch ${emailNotif ? "on" : ""}`}
                onClick={() => setEmailNotif(!emailNotif)}
                aria-label="Toggle email notifications"
              >
                <span className="pset-switch-knob"></span>
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
