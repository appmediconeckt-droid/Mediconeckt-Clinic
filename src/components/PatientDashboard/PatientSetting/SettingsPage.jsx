import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./PatientSettingsPage.css";

export default function PatientSettingsPage() {
  const [active, setActive] = useState("appointments");
  const [apptTab, setApptTab] = useState("Upcoming");
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);

  // Appointments (stateful so Cancel/Reschedule work)
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Dr. Sarah Johnson", initials: "SJ", color: "#0d9488", specialty: "Cardiology", status: "Confirmed", date: "Oct 24, 2023", time: "10:00 AM", tab: "Upcoming" },
    { id: 2, name: "Dr. Michael Chen", initials: "MC", color: "#2563eb", specialty: "General Practice", status: "Pending", date: "Oct 28, 2023", time: "2:30 PM", tab: "Upcoming" },
    { id: 3, name: "Dr. Emily Carter", initials: "EC", color: "#7c3aed", specialty: "Pediatrics", status: "Completed", date: "Sep 12, 2023", time: "11:15 AM", tab: "Past" },
  ]);

  const [detailsAppt, setDetailsAppt] = useState(null);
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [reDate, setReDate] = useState("");
  const [reTime, setReTime] = useState("");

  // Change password
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState(null);

  // Help FAQ
  const [openFaq, setOpenFaq] = useState(0);

  // Medical record viewer
  const [viewRecord, setViewRecord] = useState(null);

  // Delete account
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const deleteAccount = () => {
    localStorage.clear();
    setShowDelete(false);
    alert("Your account has been deleted.");
    navigate("/");
  };

  const menu = [
    { id: "appointments", icon: "fa-calendar-check", label: "Appointments" },
    { id: "medical", icon: "fa-file-medical", label: "Medical Records" },
    { id: "password", icon: "fa-lock", label: "Change Password" },
    { id: "help", icon: "fa-circle-question", label: "Help" },
    { id: "info", icon: "fa-circle-info", label: "Info" },
  ];

  const records = [
    { id: 1, icon: "fa-droplet", title: "Blood Test Results", date: "Oct 15, 2023", by: "St. Mary's Diagnostics", type: "Lab Report", tint: "red",
      findings: "Complete Blood Count (CBC) and Lipid Panel within normal limits. Total Cholesterol 180 mg/dL, HDL 55 mg/dL, LDL 100 mg/dL. Hemoglobin 14.2 g/dL. No abnormalities detected." },
    { id: 2, icon: "fa-notes-medical", title: "Annual Checkup", date: "Sept 20, 2023", by: "Dr. Sarah Johnson", type: "Checkup", tint: "green",
      findings: "General physical examination normal. Blood Pressure 120/80 mmHg, Pulse 72 bpm, Weight 76.5 kg. Patient advised routine exercise and balanced diet. Follow-up in 12 months." },
    { id: 3, icon: "fa-x-ray", title: "Chest X-Ray Report", date: "Aug 05, 2023", by: "City General Hospital", type: "Imaging", tint: "blue",
      findings: "Chest X-Ray PA view: Lung fields clear. Heart size normal. No active disease or infiltrates seen. Costophrenic angles clear." },
    { id: 4, icon: "fa-prescription", title: "Prescription — Atorvastatin", date: "Jul 28, 2023", by: "Dr. Michael Chen", type: "Prescription", tint: "purple",
      findings: "Atorvastatin 10mg — once daily at night. Duration: 3 months. Take after food. Review lipid profile after 3 months. Avoid grapefruit juice." },
  ];

  const faqs = [
    { q: "How do I book an appointment?", a: "Go to the Appointments page, choose a doctor, pick a date and time, then confirm your booking." },
    { q: "Can I reschedule or cancel an appointment?", a: "Yes. Open Settings → Appointments and use the Reschedule or Cancel button on any upcoming appointment." },
    { q: "How do I view my medical records?", a: "Open Settings → Medical Records to view and download your reports, prescriptions, and test results." },
    { q: "Is my data secure?", a: "Yes. We use encryption and optional Two-Factor Authentication (enable it under the Security panel)." },
  ];

  // --- Handlers ---
  const cancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));
    }
  };

  const openReschedule = (a) => {
    setRescheduleAppt(a);
    setReDate("");
    setReTime("");
  };

  const saveReschedule = () => {
    if (!reDate || !reTime) return;
    const pretty = new Date(reDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const t = new Date(`2000-01-01T${reTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setAppointments((prev) => prev.map((a) => (a.id === rescheduleAppt.id ? { ...a, date: pretty, time: t, status: "Pending" } : a)));
    setRescheduleAppt(null);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next || !pwd.confirm) {
      setPwdMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (pwd.next.length < 6) {
      setPwdMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    setPwdMsg({ type: "success", text: "Password updated successfully!" });
    setPwd({ current: "", next: "", confirm: "" });
  };

  // Generate a professional medical-report PDF
  const downloadRecordPDF = (r) => {
    const doc = new jsPDF("p", "mm", "a4");
    const W = 210;
    const GREEN = [0, 107, 44];
    const LIGHT = [232, 248, 237];
    const DARK = [17, 24, 39];
    const GRAY = [110, 110, 110];
    const BORDER = [223, 227, 224];
    const patientInfo = { name: "Arun Kumar", id: "PK-9921", age: "34", gender: "Male" };

    // ---- Header band ----
    doc.setFillColor(...GREEN);
    doc.rect(0, 0, W, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.text("Mediconeckt", 14, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Inspire, Engage, Connect Online.", 14, 21);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("MEDICAL REPORT", W - 14, 13, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Issued: ${new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}`, W - 14, 19, { align: "right" });

    // ---- Clinic contact ----
    doc.setTextColor(...GRAY);
    doc.setFontSize(8.5);
    doc.text("123 Health Ave, Medical District   |   +1 (800) 123-4567   |   support@mediconeckt.com", 14, 38);
    doc.setDrawColor(...BORDER);
    doc.line(14, 42, W - 14, 42);

    // ---- Title + type pill ----
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(r.title, 14, 53);
    const typeTxt = r.type.toUpperCase();
    doc.setFontSize(8);
    const tw = doc.getTextWidth(typeTxt) + 8;
    doc.setFillColor(...LIGHT);
    doc.roundedRect(W - 14 - tw, 47.5, tw, 7, 3.5, 3.5, "F");
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.text(typeTxt, W - 14 - tw + 4, 52.2);

    // ---- Patient info box ----
    let y = 60;
    doc.setDrawColor(...BORDER);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, y, W - 28, 30, 3, 3, "FD");
    const kv = (label, val, x, yy) => {
      doc.setTextColor(...GRAY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(label, x, yy);
      doc.setTextColor(...DARK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(String(val), x, yy + 5.5);
    };
    kv("PATIENT NAME", patientInfo.name, 20, y + 9);
    kv("PATIENT ID", patientInfo.id, 112, y + 9);
    kv("AGE / GENDER", `${patientInfo.age} / ${patientInfo.gender}`, 20, y + 21);
    kv("REPORT DATE", r.date, 112, y + 21);

    // ---- Provider ----
    y += 39;
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Referring Provider:", 14, y);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(r.by, 52, y);

    // ---- Findings section header ----
    y += 9;
    doc.setFillColor(...LIGHT);
    doc.roundedRect(14, y, W - 28, 9, 2, 2, "F");
    doc.setTextColor(...GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Clinical Summary / Findings", 18, y + 6);

    // ---- Findings text ----
    y += 16;
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(r.findings || "No additional notes.", W - 32);
    doc.text(lines, 16, y);

    // ---- Signature ----
    const sy = 252;
    doc.setDrawColor(...BORDER);
    doc.line(W - 74, sy, W - 14, sy);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(r.by, W - 74, sy + 5);
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Authorized Signature", W - 74, sy + 10);

    // ---- Footer ----
    doc.setDrawColor(...BORDER);
    doc.line(14, 282, W - 14, 282);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text("This is a system-generated confidential medical document.  © Mediconeckt", 14, 288);
    doc.text("Page 1 of 1", W - 14, 288, { align: "right" });

    doc.save(`${r.title.replace(/[^a-z0-9]/gi, "_")}.pdf`);
  };

  const statusIcon = (s) =>
    s === "Confirmed" ? "fa-circle-check" : s === "Cancelled" ? "fa-circle-xmark" : s === "Completed" ? "fa-check-double" : "fa-clock";

  // --- Content renderers ---
  const renderAppointments = () => {
    const list = appointments.filter((a) => a.tab === apptTab);
    return (
      <div className="pset-card">
        <div className="pset-card-head">
          <h2 className="pset-card-title"><i className="fa-solid fa-calendar-days"></i> Appointments</h2>
          <div className="pset-toggle-tabs">
            <button className={apptTab === "Upcoming" ? "active" : ""} onClick={() => setApptTab("Upcoming")}>Upcoming</button>
            <button className={apptTab === "Past" ? "active" : ""} onClick={() => setApptTab("Past")}>Past</button>
          </div>
        </div>

        {list.length === 0 && <p className="pset-empty">No {apptTab.toLowerCase()} appointments.</p>}

        {list.map((a) => (
          <div className={`pset-appt ${a.status === "Cancelled" ? "cancelled" : ""}`} key={a.id}>
            <div className="pset-appt-top">
              <div className="pset-appt-doctor">
                <div className="pset-avatar" style={{ background: a.color }}>{a.initials}</div>
                <div>
                  <div className="pset-appt-name">{a.name}</div>
                  <div className="pset-appt-specialty">{a.specialty}</div>
                </div>
              </div>
              <span className={`pset-status ${a.status.toLowerCase()}`}>
                <i className={`fa-solid ${statusIcon(a.status)}`}></i> {a.status}
              </span>
            </div>

            <div className="pset-appt-when">
              <span><i className="fa-regular fa-calendar"></i> {a.date}</span>
              <span><i className="fa-regular fa-clock"></i> {a.time}</span>
            </div>

            <div className="pset-appt-actions">
              <button className="pset-btn-primary" onClick={() => setDetailsAppt(a)}>View Details</button>
              {a.status !== "Cancelled" && a.tab === "Upcoming" && (
                <>
                  <button className="pset-btn-outline" onClick={() => navigate("/patient-appointment", { state: { doctor: a } })}>Reschedule</button>
                  <button className="pset-btn-cancel" onClick={() => cancelAppointment(a.id)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMedical = () => (
    <div className="pset-card pset-help-card">
      <div className="pset-help-head">
        <h2 className="pset-card-title"><i className="fa-solid fa-file-medical"></i> Medical Records</h2>
        <p className="pset-help-desc">View and download your reports, prescriptions, and test results — {records.length} records available.</p>
      </div>

      <div className="pset-records-list">
        {records.map((r) => (
          <div className="pset-record-row" key={r.id}>
            <div className={`pset-record-icon rec-${r.tint}`}><i className={`fa-solid ${r.icon}`}></i></div>
            <div className="pset-record-main">
              <div className="pset-record-titlerow">
                <span className="pset-record-title">{r.title}</span>
                <span className={`pset-record-badge rec-${r.tint}`}>{r.type}</span>
              </div>
              <div className="pset-record-sub"><i className="fa-solid fa-user-doctor"></i> {r.by} <span className="pset-record-dot">·</span> <i className="fa-regular fa-calendar"></i> {r.date}</div>
            </div>
            <div className="pset-record-actions">
              <button onClick={() => setViewRecord(r)}><i className="fa-regular fa-eye"></i> View</button>
              <button className="rec-dl" onClick={() => downloadRecordPDF(r)}><i className="fa-solid fa-download"></i> Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPassword = () => (
    <div className="pset-card">
      <h2 className="pset-card-title"><i className="fa-solid fa-lock"></i> Change Password</h2>
      <form className="pset-form" onSubmit={changePassword}>
        <div className="pset-field">
          <label>Current Password</label>
          <input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} placeholder="Enter current password" />
        </div>
        <div className="pset-field">
          <label>New Password</label>
          <input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} placeholder="At least 6 characters" />
        </div>
        <div className="pset-field">
          <label>Confirm New Password</label>
          <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} placeholder="Re-enter new password" />
        </div>
        {pwdMsg && <div className={`pset-msg ${pwdMsg.type}`}>{pwdMsg.text}</div>}
        <button type="submit" className="pset-btn-primary pset-form-submit">Update Password</button>
      </form>
    </div>
  );

  const renderHelp = () => (
    <div className="pset-card pset-help-card">
      <div className="pset-help-head">
        <h2 className="pset-card-title"><i className="fa-solid fa-circle-question"></i> Help &amp; Support</h2>
        <p className="pset-help-desc">Find quick answers to common questions, or reach out to our support team.</p>
      </div>

      <h4 className="pset-help-subtitle">Frequently Asked Questions</h4>
      <div className="pset-faq">
        {faqs.map((f, i) => (
          <div className={`pset-faq-item ${openFaq === i ? "open" : ""}`} key={i}>
            <button className="pset-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <span><i className="fa-regular fa-circle-question pset-faq-qic"></i> {f.q}</span>
              <i className={`fa-solid fa-chevron-${openFaq === i ? "up" : "down"}`}></i>
            </button>
            {openFaq === i && <div className="pset-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>

      <h4 className="pset-help-subtitle">Contact Support</h4>
      <div className="pset-help-contacts">
        <div className="pset-help-contact">
          <div className="pset-help-cic"><i className="fa-solid fa-envelope"></i></div>
          <div>
            <div className="pset-help-title">Email us</div>
            <div className="pset-help-sub">support@mediconeckt.com</div>
          </div>
        </div>
        <div className="pset-help-contact">
          <div className="pset-help-cic"><i className="fa-solid fa-phone"></i></div>
          <div>
            <div className="pset-help-title">Call us</div>
            <div className="pset-help-sub">+1 (800) 123-4567</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInfo = () => (
    <div className="pset-card">
      <h2 className="pset-card-title"><i className="fa-solid fa-circle-info"></i> Info</h2>
      <div className="pset-info-list">
        <div className="pset-info-row"><span>App Version</span><strong>2.4.1</strong></div>
        <div className="pset-info-row"><span>Patient ID</span><strong>PK-9921</strong></div>
        <div className="pset-info-row"><span>Member Since</span><strong>2024</strong></div>
        <div className="pset-info-row"><span>Clinic</span><strong>Main Hospital</strong></div>
      </div>
      <p className="pset-info-about">
        Mediconeckt helps you manage appointments, medical records, and communication with your
        healthcare providers — all in one secure place.
      </p>
      <div className="pset-info-links">
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#licenses">Licenses</a>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case "medical": return renderMedical();
      case "password": return renderPassword();
      case "help": return renderHelp();
      case "info": return renderInfo();
      default: return renderAppointments();
    }
  };

  return (
    <div className="pset-page">
      <div className={`pset-grid ${active === "appointments" ? "" : "pset-grid-2"}`}>

        {/* Left menu */}
        <aside className="pset-menu">
          <h3 className="pset-menu-title">Settings Menu</h3>
          {menu.map((m) => (
            <button key={m.id} className={`pset-menu-item ${active === m.id ? "active" : ""}`} onClick={() => setActive(m.id)}>
              <i className={`fa-solid ${m.icon}`}></i>
              <span>{m.label}</span>
            </button>
          ))}

          <div className="pset-menu-divider"></div>
          <button className="pset-menu-item pset-menu-danger" onClick={() => setShowDelete(true)}>
            <i className="fa-solid fa-trash-can"></i>
            <span>Delete Account</span>
          </button>
        </aside>

        {/* Center content */}
        <div className="pset-main">{renderContent()}</div>

        {/* Right sidebar — only on Appointments */}
        {active === "appointments" && (
          <aside className="pset-right">
            <div className="pset-card">
              <h3 className="pset-side-title"><i className="fa-solid fa-file-lines"></i> Recent Records</h3>
              {records.slice(0, 2).map((r) => (
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
              <h3 className="pset-side-title"><i className="fa-solid fa-shield-halved"></i> Security</h3>
              <div className="pset-security-row">
                <div>
                  <div className="pset-security-label">Two-Factor Authentication</div>
                  <div className="pset-security-sub">Enhanced account security</div>
                </div>
                <button className={`pset-switch ${twoFactor ? "on" : ""}`} onClick={() => setTwoFactor(!twoFactor)}>
                  <span className="pset-switch-knob"></span>
                </button>
              </div>
              <div className="pset-security-row">
                <div>
                  <div className="pset-security-label">Email Notifications</div>
                  <div className="pset-security-sub">Receive updates via email</div>
                </div>
                <button className={`pset-switch ${emailNotif ? "on" : ""}`} onClick={() => setEmailNotif(!emailNotif)}>
                  <span className="pset-switch-knob"></span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Delete Account modal */}
      {showDelete && (
        <div className="pset-modal-overlay" onClick={() => setShowDelete(false)}>
          <div className="pset-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pset-modal-close" onClick={() => setShowDelete(false)}><i className="fa-solid fa-xmark"></i></button>
            <div className="pset-delete-ic"><i className="fa-solid fa-triangle-exclamation"></i></div>
            <h3 className="pset-modal-title" style={{ textAlign: "center" }}>Delete Account?</h3>
            <p className="pset-delete-text">
              This will permanently delete your account and all associated data — appointments,
              medical records, and messages. <strong>This action cannot be undone.</strong>
            </p>
            <div className="pset-modal-actions">
              <button className="pset-btn-outline" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="pset-btn-danger" onClick={deleteAccount}>
                <i className="fa-solid fa-trash-can"></i> Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Medical Record modal */}
      {viewRecord && (
        <div className="pset-modal-overlay" onClick={() => setViewRecord(null)}>
          <div className="pset-modal pset-record-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pset-modal-close" onClick={() => setViewRecord(null)}><i className="fa-solid fa-xmark"></i></button>

            <div className="pset-recmodal-head">
              <div className={`pset-record-icon rec-${viewRecord.tint}`}><i className={`fa-solid ${viewRecord.icon}`}></i></div>
              <div>
                <div className="pset-record-titlerow">
                  <span className="pset-modal-title" style={{ margin: 0 }}>{viewRecord.title}</span>
                  <span className={`pset-record-badge rec-${viewRecord.tint}`}>{viewRecord.type}</span>
                </div>
                <div className="pset-record-sub"><i className="fa-solid fa-user-doctor"></i> {viewRecord.by} <span className="pset-record-dot">·</span> <i className="fa-regular fa-calendar"></i> {viewRecord.date}</div>
              </div>
            </div>

            <div className="pset-recmodal-body">
              <div className="pset-modal-row"><span>Patient</span><strong>Arun Kumar</strong></div>
              <div className="pset-modal-row"><span>Patient ID</span><strong>PK-9921</strong></div>
              <div className="pset-recmodal-findings">
                <h4>Summary / Findings</h4>
                <p>{viewRecord.findings}</p>
              </div>
            </div>

            <div className="pset-modal-actions">
              <button className="pset-btn-outline" onClick={() => setViewRecord(null)}>Close</button>
              <button className="pset-btn-primary" onClick={() => downloadRecordPDF(viewRecord)}>
                <i className="fa-solid fa-download"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details modal */}
      {detailsAppt && (
        <div className="pset-modal-overlay" onClick={() => setDetailsAppt(null)}>
          <div className="pset-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pset-modal-close" onClick={() => setDetailsAppt(null)}><i className="fa-solid fa-xmark"></i></button>
            <h3 className="pset-modal-title">Appointment Details</h3>
            <div className="pset-modal-doc">
              <div className="pset-avatar" style={{ background: detailsAppt.color }}>{detailsAppt.initials}</div>
              <div>
                <div className="pset-appt-name">{detailsAppt.name}</div>
                <div className="pset-appt-specialty">{detailsAppt.specialty}</div>
              </div>
            </div>
            <div className="pset-modal-rows">
              <div className="pset-modal-row"><span>Status</span><strong>{detailsAppt.status}</strong></div>
              <div className="pset-modal-row"><span>Date</span><strong>{detailsAppt.date}</strong></div>
              <div className="pset-modal-row"><span>Time</span><strong>{detailsAppt.time}</strong></div>
              <div className="pset-modal-row"><span>Location</span><strong>Main Hospital</strong></div>
            </div>
            <button className="pset-btn-primary pset-form-submit" onClick={() => setDetailsAppt(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Reschedule modal */}
      {rescheduleAppt && (
        <div className="pset-modal-overlay" onClick={() => setRescheduleAppt(null)}>
          <div className="pset-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pset-modal-close" onClick={() => setRescheduleAppt(null)}><i className="fa-solid fa-xmark"></i></button>
            <h3 className="pset-modal-title">Reschedule Appointment</h3>
            <p className="pset-modal-sub">with {rescheduleAppt.name}</p>
            <div className="pset-field">
              <label>New Date</label>
              <input type="date" value={reDate} onChange={(e) => setReDate(e.target.value)} />
            </div>
            <div className="pset-field">
              <label>New Time</label>
              <input type="time" value={reTime} onChange={(e) => setReTime(e.target.value)} />
            </div>
            <div className="pset-modal-actions">
              <button className="pset-btn-outline" onClick={() => setRescheduleAppt(null)}>Cancel</button>
              <button className="pset-btn-primary" onClick={saveReschedule} disabled={!reDate || !reTime}>Confirm Reschedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
