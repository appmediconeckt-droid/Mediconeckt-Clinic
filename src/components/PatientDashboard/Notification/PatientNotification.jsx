import React, { useState } from "react";
import "./PatientNotification.css";

const TYPES = {
  emergency: { label: "EMERGENCY ALERT", color: "#dc2626", bg: "#fdecec", icon: "fa-triangle-exclamation" },
  appointment: { label: "APPOINTMENT", color: "#2563eb", bg: "#e8f0fe", icon: "fa-calendar" },
  lab: { label: "LAB RESULTS", color: "#7c3aed", bg: "#f3e8ff", icon: "fa-flask-vial" },
  reminder: { label: "REMINDER", color: "#059669", bg: "#E8F8ED", icon: "fa-bell" },
  message: { label: "MESSAGE", color: "#0d9488", bg: "#ccfbf1", icon: "fa-comment-dots" },
};

export default function PatientNotification() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    {
      id: 1, type: "emergency", time: "10:42 AM", day: "Today",
      title: "Abnormal Test Results Detected",
      message: "Your recent blood panel from Dr. Sarah Jenkins shows elevated levels requiring immediate attention.",
      source: "City General Hospital • Dr. Jenkins", priority: "High", read: false,
    },
    {
      id: 2, type: "appointment", time: "08:15 AM", day: "Today",
      title: "Upcoming: Annual Physical",
      message: "Your appointment is confirmed for tomorrow at 9:00 AM. Please arrive 15 minutes early.",
      source: "Wellness Center • Dr. Emily Chen", priority: "High", read: false,
    },
    {
      id: 3, type: "lab", time: "07:30 AM", day: "Today",
      title: "Lab Results Available",
      message: "Your recent lipid panel results are ready to view in your health records.",
      source: "St. Mary's Diagnostics", priority: "Medium", read: false,
    },
    {
      id: 4, type: "reminder", time: "04:20 PM", day: "Yesterday",
      title: "Medication Refill Reminder",
      message: "Your prescription for Atorvastatin is due for a refill in 3 days.",
      source: "MediCare Pharmacy", priority: "Low", read: true,
    },
    {
      id: 5, type: "message", time: "11:05 AM", day: "Yesterday",
      title: "New message from Dr. James Cl",
      message: "Your prescription has been sent to the pharmacy. Let me know if you have any questions.",
      source: "General Practice • Dr. James Cl", priority: "Low", read: true,
    },
  ]);

  const total = items.length;
  const unread = items.filter((i) => !i.read).length;
  const highPriority = items.filter((i) => i.priority === "High").length;

  const filtered = items.filter((i) => {
    const matchesTab =
      activeTab === "All" ? true : activeTab === "Unread" ? !i.read : i.read;
    const matchesSearch =
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const days = ["Today", "Yesterday"];

  const markAllRead = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  const clearRead = () => setItems((prev) => prev.filter((i) => !i.read));
  const toggleRead = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: !i.read } : i)));

  return (
    <div className="notif-page">

      {/* ===== Header ===== */}
      <div className="notif-header">
        <h1 className="notif-title">
          <i className="fa-solid fa-bell"></i> Notifications
        </h1>
        <div className="notif-stats">
          <div className="notif-stat">
            <i className="fa-regular fa-envelope-open notif-stat-ic green"></i>
            <strong>{total}</strong>
            <span>TOTAL</span>
          </div>
          <div className="notif-stat">
            <i className="fa-regular fa-envelope notif-stat-ic green"></i>
            <strong>{unread}</strong>
            <span>UNREAD</span>
          </div>
          <div className="notif-stat notif-stat-danger">
            <i className="fa-solid fa-circle-exclamation notif-stat-ic red"></i>
            <strong>{highPriority}</strong>
            <span>HIGH PRIORITY</span>
          </div>
        </div>
      </div>

      {/* ===== Toolbar ===== */}
      <div className="notif-toolbar">
        <div className="notif-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="notif-chip"><i className="fa-solid fa-sliders"></i> Type</button>
        <button className="notif-chip"><i className="fa-solid fa-flag"></i> Priority</button>
        <button className="notif-chip"><i className="fa-solid fa-arrow-down-wide-short"></i> Newest First</button>
        <div className="notif-toolbar-right">
          <button className="notif-mark" onClick={markAllRead}>Mark All as Read</button>
          <button className="notif-clear" onClick={clearRead}>Clear Read</button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="notif-tabs">
        {["All", "Unread", "Read"].map((t) => (
          <button
            key={t}
            className={`notif-tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ===== Grouped list ===== */}
      {days.map((day) => {
        const dayItems = filtered.filter((i) => i.day === day);
        if (dayItems.length === 0) return null;
        return (
          <div className="notif-group" key={day}>
            <div className="notif-group-head">
              {day} <span className="notif-group-count">{dayItems.length}</span>
            </div>

            {dayItems.map((n) => {
              const t = TYPES[n.type];
              return (
                <div className={`notif-item ${!n.read ? "unread" : ""}`} key={n.id}>
                  {!n.read && <span className="notif-dot"></span>}
                  <div className="notif-ic" style={{ background: t.bg, color: t.color }}>
                    <i className={`fa-solid ${t.icon}`}></i>
                  </div>
                  <div className="notif-body">
                    <div className="notif-meta" style={{ color: t.color }}>
                      {t.label} <span className="notif-time">• {n.time}</span>
                    </div>
                    <div className="notif-item-title">{n.title}</div>
                    <div className="notif-message">{n.message}</div>
                    <div className="notif-source">{n.source}</div>
                  </div>
                  <div className="notif-right">
                    {n.priority === "High" && <span className="notif-priority">High</span>}
                    <button className="notif-menu" onClick={() => toggleRead(n.id)} aria-label="Options">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="notif-empty">
          <i className="fa-regular fa-bell-slash"></i>
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
}
