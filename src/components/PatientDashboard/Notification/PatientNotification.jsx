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

  // Filters
  const [openMenu, setOpenMenu] = useState(null);        // 'type' | 'priority' | 'sort'
  const [filterType, setFilterType] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");  // 'newest' | 'oldest'

  const total = items.length;
  const unread = items.filter((i) => !i.read).length;
  const highPriority = items.filter((i) => i.priority === "High").length;

  // Sortable timestamp from day + time
  const toTs = (day, time) => {
    const dayRank = day === "Today" ? 2 : day === "Yesterday" ? 1 : 0;
    const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (/PM/i.test(m[3]) && h !== 12) h += 12;
    if (/AM/i.test(m[3]) && h === 12) h = 0;
    return dayRank * 10000 + h * 60 + min;
  };

  const filtered = items.filter((i) => {
    const matchesTab = activeTab === "All" ? true : activeTab === "Unread" ? !i.read : i.read;
    const matchesSearch =
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || i.type === filterType;
    const matchesPriority = !filterPriority || i.priority === filterPriority;
    return matchesTab && matchesSearch && matchesType && matchesPriority;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "newest" ? toTs(b.day, b.time) - toTs(a.day, a.time) : toTs(a.day, a.time) - toTs(b.day, b.time)
  );

  const days = sortOrder === "newest" ? ["Today", "Yesterday"] : ["Yesterday", "Today"];

  const typeOptions = [
    { v: "", label: "All Types" },
    { v: "emergency", label: "Emergency" },
    { v: "appointment", label: "Appointment" },
    { v: "lab", label: "Lab Results" },
    { v: "reminder", label: "Reminder" },
    { v: "message", label: "Message" },
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  const typeLabel = filterType ? typeOptions.find((t) => t.v === filterType)?.label : "Type";

  const [openItemMenu, setOpenItemMenu] = useState(null);

  const markAllRead = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  const clearRead = () => setItems((prev) => prev.filter((i) => !i.read));
  const toggleRead = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: !i.read } : i)));
  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

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
        {/* Type filter */}
        <div className="notif-filter-wrap">
          <button className={`notif-chip ${filterType ? "active" : ""}`} onClick={() => setOpenMenu(openMenu === "type" ? null : "type")}>
            <i className="fa-solid fa-sliders"></i> {typeLabel}
            <i className="fa-solid fa-chevron-down notif-caret"></i>
          </button>
          {openMenu === "type" && (
            <div className="notif-dropdown">
              {typeOptions.map((t) => (
                <div key={t.v || "all"} className={`notif-dd-item ${filterType === t.v ? "sel" : ""}`} onClick={() => { setFilterType(t.v); setOpenMenu(null); }}>
                  {t.label}{filterType === t.v && <i className="fa-solid fa-check"></i>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority filter */}
        <div className="notif-filter-wrap">
          <button className={`notif-chip ${filterPriority ? "active" : ""}`} onClick={() => setOpenMenu(openMenu === "priority" ? null : "priority")}>
            <i className="fa-solid fa-flag"></i> {filterPriority || "Priority"}
            <i className="fa-solid fa-chevron-down notif-caret"></i>
          </button>
          {openMenu === "priority" && (
            <div className="notif-dropdown">
              <div className={`notif-dd-item ${!filterPriority ? "sel" : ""}`} onClick={() => { setFilterPriority(""); setOpenMenu(null); }}>All Priorities</div>
              {priorityOptions.map((p) => (
                <div key={p} className={`notif-dd-item ${filterPriority === p ? "sel" : ""}`} onClick={() => { setFilterPriority(p); setOpenMenu(null); }}>
                  {p}{filterPriority === p && <i className="fa-solid fa-check"></i>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="notif-filter-wrap">
          <button className="notif-chip" onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}>
            <i className="fa-solid fa-arrow-down-wide-short"></i> {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            <i className="fa-solid fa-chevron-down notif-caret"></i>
          </button>
          {openMenu === "sort" && (
            <div className="notif-dropdown">
              <div className={`notif-dd-item ${sortOrder === "newest" ? "sel" : ""}`} onClick={() => { setSortOrder("newest"); setOpenMenu(null); }}>
                Newest First{sortOrder === "newest" && <i className="fa-solid fa-check"></i>}
              </div>
              <div className={`notif-dd-item ${sortOrder === "oldest" ? "sel" : ""}`} onClick={() => { setSortOrder("oldest"); setOpenMenu(null); }}>
                Oldest First{sortOrder === "oldest" && <i className="fa-solid fa-check"></i>}
              </div>
            </div>
          )}
        </div>

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
        const dayItems = sorted.filter((i) => i.day === day);
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
                    <span className={`notif-priority prio-${n.priority.toLowerCase()}`}>{n.priority}</span>
                    <div className="notif-menu-wrap">
                      <button className="notif-menu" onClick={() => setOpenItemMenu(openItemMenu === n.id ? null : n.id)} aria-label="Options">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      {openItemMenu === n.id && (
                        <div className="notif-item-menu">
                          <div className="notif-item-menu-opt" onClick={() => { toggleRead(n.id); setOpenItemMenu(null); }}>
                            <i className={`fa-solid ${n.read ? "fa-envelope" : "fa-envelope-open"}`}></i>
                            Mark as {n.read ? "Unread" : "Read"}
                          </div>
                          <div className="notif-item-menu-opt danger" onClick={() => { deleteItem(n.id); setOpenItemMenu(null); }}>
                            <i className="fa-solid fa-trash-can"></i> Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {sorted.length === 0 && (
        <div className="notif-empty">
          <i className="fa-regular fa-bell-slash"></i>
          <p>No notifications match your filters</p>
        </div>
      )}
    </div>
  );
}
