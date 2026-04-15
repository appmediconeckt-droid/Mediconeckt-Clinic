// DoctorCalendar.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorCalendar.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatDateKey = (y, m, d) => `${y}-${m + 1}-${d}`;
const STORAGE_KEY = "doctor_calendar_state_v1";

const defaultDurations = [5, 10, 15, 20, 30];

// Sample clinic data
const defaultClinics = [
  { id: 1, name: "Main Hospital", location: "Downtown", color: "#007bff" },
  { id: 2, name: "North Branch", location: "North City", color: "#28a745" },
  { id: 3, name: "South Clinic", location: "South Area", color: "#dc3545" },
  { id: 4, name: "West Center", location: "West District", color: "#ffc107" },
  { id: 5, name: "East Facility", location: "East Side", color: "#6f42c1" },
];

const DoctorCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [recurringWeekdays, setRecurringWeekdays] = useState([]);
  const [availabilityDateMap, setAvailabilityDateMap] = useState({});
  const [availabilityWeekdayMap, setAvailabilityWeekdayMap] = useState({});
  const [editingTarget, setEditingTarget] = useState(null);
  const [newRange, setNewRange] = useState({
    start: "",
    end: "",
    duration: 15,
  });
  const [slotPreview, setSlotPreview] = useState([]);
  const [showAddTimeModal, setShowAddTimeModal] = useState(false);
  const [quickRanges, setQuickRanges] = useState({});

  // Clinic states
  const [clinics, setClinics] = useState(defaultClinics);
  const [selectedClinic, setSelectedClinic] = useState(defaultClinics[0]);
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);

  const [additionalTime, setAdditionalTime] = useState({
    start: "",
    end: "",
    duration: 15,
    durationMode: "preset",
    customDuration: "none",
  });

  // Check if a date is in the past
  const isPastDate = (year, month, day) => {
    const today = new Date();
    const dateToCheck = new Date(year, month, day);
    today.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  // Check if a date-time is in the past
  const isPastDateTime = (year, month, day, hour, minute) => {
    const now = new Date();
    const dateTimeToCheck = new Date(year, month, day, hour, minute);
    return dateTimeToCheck < now;
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    const nd = new Date(currentDate);
    nd.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(nd);
  };

  const toggleManualDay = (year, month, day) => {
    if (!day) return;
    if (isPastDate(year, month, day)) {
      return;
    }
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((x) => x !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  const toggleRecurringWeekday = (w) => {
    setRecurringWeekdays((prev) =>
      prev.includes(w)
        ? prev.filter((x) => x !== w)
        : [...prev, w].sort((a, b) => a - b)
    );
  };

  const ensureQuickRangeForKey = (dateKey) => {
    setQuickRanges((prev) => {
      if (prev[dateKey]) return prev;
      return {
        ...prev,
        [dateKey]: {
          start: "",
          end: "",
          durationMode: "preset",
          duration: 15,
          customDuration: "",
        },
      };
    });
  };

  const changeQuickRangeField = (dateKey, field, value) => {
    setQuickRanges((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [field]: value,
      },
    }));
  };

  const addQuickRangeToDate = (year, month, day, dateKey) => {
    const q = quickRanges[dateKey] || {};
    const start = q.start;
    const end = q.end;
    let duration = Number(q.duration || 0);
    if (q.durationMode === "custom") {
      duration = Number(q.customDuration || 0);
    }

    if (!start || !end) {
      return alert("Start and End time required");
    }

    const [sh, sm] = start.split(":").map(Number);
    if (isPastDateTime(year, month, day, sh, sm)) {
      return alert("Cannot add time in the past");
    }

    const [eh, em] = end.split(":").map(Number);
    const sMinutes = sh * 60 + sm;
    const eMinutes = eh * 60 + em;
    if (!(eMinutes > sMinutes))
      return alert("End time must be after Start time");
    if (!(duration > 0)) return alert("Duration must be a positive number");

    setAvailabilityDateMap((prev) => {
      const prevInfo = prev[dateKey]
        ? { ...prev[dateKey] }
        : { ranges: [], blocked: false };
      const arr = prevInfo.ranges ? [...prevInfo.ranges] : [];
      arr.push({ start, end, duration, clinicId: selectedClinic.id });
      return { ...prev, [dateKey]: { ...prevInfo, ranges: arr } };
    });

    setQuickRanges((prev) => ({
      ...prev,
      [dateKey]: {
        start: "",
        end: "",
        durationMode: "preset",
        duration: 15,
        customDuration: "",
      },
    }));
  };

  const addAdditionalTiming = () => {
    const { start, end, durationMode, customDuration } = additionalTime;
    let duration = Number(additionalTime.duration || 0);

    if (durationMode === "custom") {
      duration = Number(customDuration || 0);
    }

    if (!start || !end) {
      return alert("Start and End time required");
    }

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const sMinutes = sh * 60 + sm;
    const eMinutes = eh * 60 + em;

    if (!(eMinutes > sMinutes))
      return alert("End time must be after Start time");
    if (!(duration > 0)) return alert("Duration must be a positive number");

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    setSelectedDays((prevSelectedDays) => {
      const newAvailabilityDateMap = { ...availabilityDateMap };

      prevSelectedDays.forEach((day) => {
        if (isPastDate(year, month, day)) return;
        if (isPastDateTime(year, month, day, sh, sm)) {
          alert(`Cannot add time in the past for date ${day}`);
          return;
        }

        const dateKey = formatDateKey(year, month, day);
        const prevInfo = newAvailabilityDateMap[dateKey]
          ? { ...newAvailabilityDateMap[dateKey] }
          : { ranges: [], blocked: false };
        const arr = prevInfo.ranges ? [...prevInfo.ranges] : [];
        arr.push({ start, end, duration, clinicId: selectedClinic.id });
        newAvailabilityDateMap[dateKey] = { ...prevInfo, ranges: arr };
      });

      setAvailabilityDateMap(newAvailabilityDateMap);
      return prevSelectedDays;
    });

    setAdditionalTime({
      start: "",
      end: "",
      duration: 15,
      durationMode: "preset",
      customDuration: "",
    });
    setShowAddTimeModal(false);
  };

  const addAdditionalTimingToWeekdays = () => {
    const { start, end, durationMode, customDuration } = additionalTime;
    let duration = Number(additionalTime.duration || 0);

    if (durationMode === "custom") {
      duration = Number(customDuration || 0);
    }

    if (!start || !end) {
      return alert("Start and End time required");
    }

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const sMinutes = sh * 60 + sm;
    const eMinutes = eh * 60 + em;

    if (!(eMinutes > sMinutes))
      return alert("End time must be after Start time");
    if (!(duration > 0)) return alert("Duration must be a positive number");

    setRecurringWeekdays((prevRecurringWeekdays) => {
      const newAvailabilityWeekdayMap = { ...availabilityWeekdayMap };

      prevRecurringWeekdays.forEach((weekday) => {
        const arr = newAvailabilityWeekdayMap[weekday]
          ? [...newAvailabilityWeekdayMap[weekday]]
          : [];
        arr.push({ start, end, duration, clinicId: selectedClinic.id });
        newAvailabilityWeekdayMap[weekday] = arr;
      });

      setAvailabilityWeekdayMap(newAvailabilityWeekdayMap);
      return prevRecurringWeekdays;
    });

    setAdditionalTime({
      start: "",
      end: "",
      duration: 15,
      durationMode: "preset",
      customDuration: "",
    });
    setShowAddTimeModal(false);
  };

  // Clinic management functions
  const handleDeleteClinic = (clinicId) => {
    if (clinics.length <= 1) {
      alert("You must have at least one clinic");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this clinic? This will remove all appointments for this clinic.")) {
      return;
    }

    const updatedClinics = clinics.filter(clinic => clinic.id !== clinicId);
    setClinics(updatedClinics);

    if (selectedClinic.id === clinicId) {
      setSelectedClinic(updatedClinics[0]);
    }
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);
    const firstDayIndex = new Date(year, month, 1).getDay();

    let cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    return (
      <div className="doc-cal-grid doc-cal-calendar-grid">
        {cells.map((day, idx) => {
          const month = currentDate.getMonth();
          const year = currentDate.getFullYear();
          const weekday = day ? new Date(year, month, day).getDay() : null;

          const isManual = day && selectedDays.includes(day);
          const isRecurring = day && recurringWeekdays.includes(weekday);
          const isPast = day ? isPastDate(year, month, day) : false;

          const dateKey = day ? formatDateKey(year, month, day) : null;
          const dateInfo = dateKey ? availabilityDateMap[dateKey] || {} : {};
          const isBlocked = dateInfo.blocked === true;

          const classes = ["doc-cal-cell"];
          if (isPast) classes.push("doc-cal-past-date");
          if (isBlocked) classes.push("doc-cal-blocked");
          else if (isManual) classes.push("doc-cal-selected-manual");
          else if (isRecurring) classes.push("doc-cal-selected-recurring");

          if (isManual && dateKey && !quickRanges[dateKey] && !isPast) {
            ensureQuickRangeForKey(dateKey);
          }

          return (
            <div
              key={idx}
              className={classes.join(" ")}
              onClick={() => {
                if (!day || isPast) return;
                openEditorForDate(year, month, day);
              }}
              title={
                day
                  ? isPast
                    ? "Cannot edit past dates"
                    : `Click to edit ${day}-${month + 1}-${year}`
                  : ""
              }
              role={day ? "button" : undefined}
              tabIndex={day ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && day && !isPast)
                  openEditorForDate(year, month, day);
              }}
            >
              <div className="doc-cal-cell-header">
                <small className="doc-cal-day-num">{day || ""}</small>
                {day && (
                  <div className="doc-cal-cell-buttons">
                    <button
                      className={`doc-cal-toggle-btn ${isPast ? "doc-cal-disabled" : ""
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isPast) return;
                        toggleManualDay(year, month, day);
                      }}
                      disabled={isPast}
                      aria-label={
                        isPast
                          ? "Cannot select past date"
                          : `Toggle manual selection for day ${day}`
                      }
                      title={
                        isPast ? "Past date" : "Toggle manual selected day"
                      }
                    >
                      <span className="doc-cal-toggle-icon">{isManual ? "✓" : "○"}</span>
                    </button>

                    <button
                      className={`doc-cal-edit-btn ${isPast ? "doc-cal-disabled" : ""
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isPast) return;
                        openEditorForDate(year, month, day);
                      }}
                      disabled={isPast}
                      title={isPast ? "Cannot edit past dates" : "Open editor"}
                      aria-label={`Open editor for ${dateKey}`}
                    >
                      <span className="doc-cal-edit-text">Edit</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="doc-cal-edit-icon">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="doc-cal-cell-body">
                {day && (
                  <>
                    {isPast ? (
                      <small className="doc-cal-past-text">Past date</small>
                    ) : (
                      <>
                        <small className="doc-cal-ranges-count">
                          {isBlocked ? (
                            <span className="doc-cal-unavailable">Unavailable</span>
                          ) : (
                            <span>
                              {getRangesForDateOrWeek(year, month, day).length}{" "}
                              ranges
                            </span>
                          )}
                        </small>
                        <div className="doc-cal-badges">
                          {isManual && (
                            <span className="doc-cal-badge doc-cal-badge-manual">
                              Manual
                            </span>
                          )}
                          {isRecurring && (
                            <span className="doc-cal-badge doc-cal-badge-recurring">
                              Week
                            </span>
                          )}
                          {isBlocked && (
                            <span className="doc-cal-badge doc-cal-badge-blocked">
                              Blocked
                            </span>
                          )}
                        </div>

                        {isManual && !isBlocked && dateKey && !isPast && (
                          <div
                            className="doc-cal-quick-form"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="doc-cal-quick-form-fields">
                              <div className="doc-cal-form-group">
                                <input
                                  type="time"
                                  className="doc-cal-form-control"
                                  value={
                                    (quickRanges[dateKey] &&
                                      quickRanges[dateKey].start) ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    changeQuickRangeField(
                                      dateKey,
                                      "start",
                                      e.target.value
                                    )
                                  }
                                  aria-label={`Start time for ${dateKey}`}
                                />
                                <label className="doc-cal-form-label">
                                  Start
                                </label>
                              </div>

                              <div className="doc-cal-form-group">
                                <input
                                  type="time"
                                  className="doc-cal-form-control"
                                  value={
                                    (quickRanges[dateKey] &&
                                      quickRanges[dateKey].end) ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    changeQuickRangeField(
                                      dateKey,
                                      "end",
                                      e.target.value
                                    )
                                  }
                                  aria-label={`End time for ${dateKey}`}
                                />
                                <label className="doc-cal-form-label">
                                  End
                                </label>
                              </div>

                              <div className="doc-cal-duration-group">
                                <label className="doc-cal-duration-label">
                                  Duration
                                </label>
                                <div className="doc-cal-duration-selector">
                                  <select
                                    className="doc-cal-select"
                                    value={
                                      quickRanges[dateKey] &&
                                        quickRanges[dateKey].durationMode ===
                                        "preset"
                                        ? quickRanges[dateKey].duration
                                        : "custom"
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (val === "custom") {
                                        changeQuickRangeField(
                                          dateKey,
                                          "durationMode",
                                          "custom"
                                        );
                                        changeQuickRangeField(
                                          dateKey,
                                          "customDuration",
                                          ""
                                        );
                                      } else {
                                        changeQuickRangeField(
                                          dateKey,
                                          "durationMode",
                                          "preset"
                                        );
                                        changeQuickRangeField(
                                          dateKey,
                                          "duration",
                                          Number(val)
                                        );
                                      }
                                    }}
                                    aria-label={`Duration selector for ${dateKey}`}
                                  >
                                    {defaultDurations.map((d) => (
                                      <option key={d} value={d}>
                                        {d} min
                                      </option>
                                    ))}
                                    <option value="custom">Custom</option>
                                  </select>
                                </div>
                              </div>

                              {quickRanges[dateKey] &&
                                quickRanges[dateKey].durationMode ===
                                "custom" && (
                                  <input
                                    type="number"
                                    min={1}
                                    className="doc-cal-custom-duration"
                                    placeholder="mins"
                                    value={
                                      quickRanges[dateKey].customDuration ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      changeQuickRangeField(
                                        dateKey,
                                        "customDuration",
                                        e.target.value
                                      )
                                    }
                                    aria-label={`Custom duration for ${dateKey}`}
                                  />
                                )}

                              <div className="doc-cal-add-time-btn-container">
                                <button
                                  className="doc-cal-add-time-btn"
                                  style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addQuickRangeToDate(
                                      year,
                                      month,
                                      day,
                                      dateKey
                                    );
                                  }}
                                  title={`Add time range to this date at ${selectedClinic.name}`}
                                >
                                  <span className="doc-cal-add-time-text">Add Time</span>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="doc-cal-add-time-icon">
                                    <path d="M12 5v14m-7-7h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="doc-cal-quick-help">
                              <small>
                                Quick add: adds date-specific range
                              </small>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getRangesForDateOrWeek = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    const dateInfo = availabilityDateMap[dateKey] || {};
    if (dateInfo.blocked) return [];
    const dateRanges = dateInfo.ranges || [];
    if (dateRanges.length) return dateRanges;
    const weekday = new Date(year, month, day).getDay();
    return availabilityWeekdayMap[weekday] || [];
  };

  const openEditorForDate = (year, month, day) => {
    if (isPastDate(year, month, day)) {
      alert("Cannot edit past dates");
      return;
    }
    const dateKey = formatDateKey(year, month, day);
    setEditingTarget({ type: "date", key: dateKey, year, month, day });
    setNewRange({ start: "", end: "", duration: 15 });
  };

  const openEditorForWeekday = (weekdayIdx) => {
    setEditingTarget({ type: "weekday", key: weekdayIdx });
    setNewRange({ start: "", end: "", duration: 15 });
  };

  const saveRange = () => {
    if (!newRange.start || !newRange.end)
      return alert("Start and End time required");

    if (editingTarget.type === "date") {
      const [sh, sm] = newRange.start.split(":").map(Number);
      if (
        isPastDateTime(
          editingTarget.year,
          editingTarget.month,
          editingTarget.day,
          sh,
          sm
        )
      ) {
        return alert("Cannot add time in the past");
      }
    }

    const [sh, sm] = newRange.start.split(":").map(Number);
    const [eh, em] = newRange.end.split(":").map(Number);
    const sMinutes = sh * 60 + sm;
    const eMinutes = eh * 60 + em;
    if (!(eMinutes > sMinutes))
      return alert("End time must be after Start time");

    if (editingTarget.type === "date") {
      setAvailabilityDateMap((prev) => {
        const prevInfo = prev[editingTarget.key]
          ? { ...prev[editingTarget.key] }
          : { ranges: [], blocked: false };
        const arr = prevInfo.ranges ? [...prevInfo.ranges] : [];
        arr.push({
          start: newRange.start,
          end: newRange.end,
          duration: newRange.duration || 15,
          clinicId: selectedClinic.id,
        });
        return { ...prev, [editingTarget.key]: { ...prevInfo, ranges: arr } };
      });
    } else {
      const w = editingTarget.key;
      setAvailabilityWeekdayMap((prev) => {
        const arr = prev[w] ? [...prev[w]] : [];
        arr.push({
          start: newRange.start,
          end: newRange.end,
          duration: newRange.duration || 15,
          clinicId: selectedClinic.id,
        });
        return { ...prev, [w]: arr };
      });
    }
    setNewRange({ start: "", end: "", duration: 15 });
  };

  const saveAndClose = () => {
    setEditingTarget(null);
  };

  const removeRange = (index) => {
    if (!editingTarget) return;

    if (editingTarget.type === "date") {
      if (
        isPastDate(editingTarget.year, editingTarget.month, editingTarget.day)
      ) {
        return alert("Cannot modify past dates");
      }

      setAvailabilityDateMap((prev) => {
        const info = prev[editingTarget.key] || { ranges: [], blocked: false };
        const arr = (info.ranges || []).filter((_, i) => i !== index);
        return {
          ...prev,
          [editingTarget.key]: { ranges: arr, blocked: info.blocked || false },
        };
      });
    } else {
      const w = editingTarget.key;
      setAvailabilityWeekdayMap((prev) => {
        const arr = (prev[w] || []).filter((_, i) => i !== index);
        return { ...prev, [w]: arr };
      });
    }
  };

  const toggleBlockDate = (dateKey, year, month, day) => {
    if (isPastDate(year, month, day)) {
      alert("Cannot modify past dates");
      return;
    }

    setAvailabilityDateMap((prev) => {
      const info = prev[dateKey]
        ? { ...prev[dateKey] }
        : { ranges: [], blocked: false };
      return { ...prev, [dateKey]: { ...info, blocked: !info.blocked } };
    });
  };

  const removeAllRangesForDate = (dateKey, year, month, day) => {
    if (isPastDate(year, month, day)) {
      alert("Cannot modify past dates");
      return;
    }

    setAvailabilityDateMap((prev) => {
      const info = prev[dateKey] || {};
      return {
        ...prev,
        [dateKey]: { ranges: [], blocked: info.blocked || false },
      };
    });
  };

  const generateSlotsForRange = (year, month, day, range) => {
    const [sh, sm] = range.start.split(":").map(Number);
    const [eh, em] = range.end.split(":").map(Number);
    let start = new Date(year, month, day, sh, sm);
    const end = new Date(year, month, day, eh, em);
    const res = [];
    while (start < end) {
      const hh = String(start.getHours()).padStart(2, "0");
      const mm = String(start.getMinutes()).padStart(2, "0");
      const clinic = clinics.find(c => c.id === range.clinicId) || selectedClinic;
      res.push({
        time: `${hh}:${mm}`,
        clinicId: clinic.id,
        clinicName: clinic.name,
        clinicColor: clinic.color
      });
      start = new Date(start.getTime() + (range.duration || 15) * 60000);
    }
    return res;
  };

  const generateAllSlots = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);

    const final = [];
    const dateSet = new Set();

    for (let d = 1; d <= totalDays; d++) {
      const weekday = new Date(year, month, d).getDay();
      if (selectedDays.includes(d) || recurringWeekdays.includes(weekday)) {
        dateSet.add(d);
      }
    }

    Array.from(dateSet)
      .sort((a, b) => a - b)
      .forEach((d) => {
        const dateKey = formatDateKey(year, month, d);
        const dateInfo = availabilityDateMap[dateKey] || {};
        if (dateInfo.blocked) {
          final.push({ date: dateKey, slots: [], blocked: true });
          return;
        }

        const ranges =
          dateInfo.ranges && dateInfo.ranges.length
            ? dateInfo.ranges
            : availabilityWeekdayMap[new Date(year, month, d).getDay()] || [];

        const filteredRanges = ranges.filter(range => range.clinicId === selectedClinic.id);
        const slots = [];
        filteredRanges.forEach((r) => {
          slots.push(...generateSlotsForRange(year, month, d, r));
        });

        final.push({ date: dateKey, slots });
      });

    setSlotPreview(final);
  };

  const clearAll = () => {
    if (!window.confirm("Clear selected days, weekdays and availability?"))
      return;
    setSelectedDays([]);
    setRecurringWeekdays([]);
    setAvailabilityDateMap({});
    setAvailabilityWeekdayMap({});
    setSlotPreview([]);
    setEditingTarget(null);
    setQuickRanges({});
    setAdditionalTime({
      start: "",
      end: "",
      duration: 15,
      durationMode: "preset",
      customDuration: "",
    });
    setShowAddTimeModal(false);
  };

  return (
    <div className="doc-cal-root">
      {/* Header Section */}
      <div className="doc-cal-header">
        <div className="doc-cal-header-content">
          <h2 className="doc-cal-title">Calendar</h2>
          <small className="doc-cal-subtitle">
            Recurring & date-specific availability
          </small>
          <div className="doc-cal-note">
            <small className="doc-cal-warning">
              <strong>Note:</strong> Past dates cannot be edited or selected.
            </small>
          </div>
        </div>

        <div className="doc-cal-header-actions">
          {/* Clinic Dropdown */}
          <div className="doc-cal-clinic-dropdown">
            <button
              className="doc-cal-clinic-btn"
              onClick={() => setShowClinicDropdown(!showClinicDropdown)}
              style={{
                backgroundColor: selectedClinic.color + "20",
                borderColor: selectedClinic.color,
                color: selectedClinic.color
              }}
              aria-expanded={showClinicDropdown}
              aria-haspopup="true"
            >
              <div className="doc-cal-clinic-btn-content">
                <div
                  className="doc-cal-clinic-indicator"
                  style={{
                    backgroundColor: selectedClinic.color
                  }}
                />
                <span className="doc-cal-clinic-name">{selectedClinic.name}</span>
                <span className="doc-cal-clinic-location">({selectedClinic.location})</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d={showClinicDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showClinicDropdown && (
              <div
                className="doc-cal-clinic-menu"
                style={{
                  position: "absolute",
                  right: 0,
                  left: 0,
                  minWidth: "100%",
                  zIndex: 1001
                }}
              >
                <h6 className="doc-cal-clinic-menu-title">Select Clinic</h6>
                <div className="doc-cal-clinic-list">
                  {clinics.map(clinic => (
                    <div
                      key={clinic.id}
                      className={`doc-cal-clinic-item ${selectedClinic.id === clinic.id ? 'doc-cal-clinic-item-selected' : ''}`}
                      onClick={() => {
                        setSelectedClinic(clinic);
                        setShowClinicDropdown(false);
                      }}
                      style={{
                        backgroundColor: selectedClinic.id === clinic.id ? clinic.color + "20" : "transparent",
                        border: selectedClinic.id === clinic.id ? `1px solid ${clinic.color}` : "1px solid #dee2e6"
                      }}
                    >
                      <div className="doc-cal-clinic-item-content">
                        <div className="doc-cal-clinic-item-info">
                          <div
                            className="doc-cal-clinic-item-indicator"
                            style={{
                              backgroundColor: clinic.color
                            }}
                          />
                          <div className="doc-cal-clinic-item-text">
                            <strong style={{ color: clinic.color }} className="doc-cal-clinic-item-name">{clinic.name}</strong>
                            <div className="doc-cal-clinic-item-location">{clinic.location}</div>
                          </div>
                        </div>
                        <div>
                          {selectedClinic.id === clinic.id && (
                            <span className="doc-cal-clinic-item-badge" style={{ backgroundColor: clinic.color }}>Selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="doc-cal-header-buttons">
            <button className="doc-cal-clear-btn" onClick={clearAll}>
              <span className="doc-cal-clear-text">Clear All</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="doc-cal-clear-icon">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Bar */}
      <div className="doc-cal-weekday-bar">
        {days.map((d, i) => (
          <button
            key={d}
            className={`doc-cal-weekday-btn ${recurringWeekdays.includes(i) ? "doc-cal-weekday-active" : ""
              }`}
            onClick={() => toggleRecurringWeekday(i)}
            onDoubleClick={() => openEditorForWeekday(i)}
            title="Click to toggle recurring weekday. Double-click to edit weekday ranges."
            aria-pressed={recurringWeekdays.includes(i)}
          >
            {window.innerWidth < 576 ? d.charAt(0) : d}
          </button>
        ))}
        <button
          className="doc-cal-add-timing-btn"
          onClick={() => setShowAddTimeModal(true)}
          style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
        >
          <div
            className="doc-cal-add-timing-indicator"
            style={{
              backgroundColor: "white"
            }}
          />
          <span className="doc-cal-add-timing-text">Add Timing to Selected</span>
          <span className="doc-cal-add-timing-text-mobile">Add Time</span>
        </button>
      </div>

      {/* Month Navigation */}
      <div
        className="doc-cal-month-nav"
        role="group"
        aria-label="Month navigation"
      >
        <button
          className="doc-cal-nav-prev"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="doc-cal-nav-text">Prev</span>
        </button>
        
        <div className="doc-cal-month-title">
          <strong>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </strong>
        </div>
        
        <button
          className="doc-cal-nav-next"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          <span className="doc-cal-nav-text">Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Days Header */}
      <div className="doc-cal-days-header">
        {days.map((d) => (
          <div key={d} className="doc-cal-day-header">
            {window.innerWidth < 576 ? d.charAt(0) : d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      {renderCalendar()}

      {/* Quick Actions */}
      <div className="doc-cal-actions-card">
        <div className="doc-cal-actions-content">
          <div className="doc-cal-actions-info">
            <h6 className="doc-cal-actions-title">Quick Actions</h6>
            <small className="doc-cal-actions-subtitle">
              Click a date cell to open the editor. Add ranges, mark
              unavailable, or remove ranges.
            </small>
            <small className="doc-cal-actions-warning">
              <strong>Note:</strong> Past dates are grayed out and cannot be
              edited.
            </small>
          </div>

          <div className="doc-cal-actions-buttons">
            <button
              className="doc-cal-generate-btn"
              onClick={generateAllSlots}
              style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
            >
              <span className="doc-cal-generate-text">Generate Slots for {selectedClinic.name}</span>
              <span className="doc-cal-generate-text-mobile">Generate Slots</span>
            </button>
            <button
              className="doc-cal-clear-preview-btn"
              onClick={() => setSlotPreview([])}
            >
              Clear Preview
            </button>
          </div>
        </div>
        <div className="doc-cal-actions-note">
          <small>
            <strong>Note:</strong> Generating slots will only show appointments for {selectedClinic.name}.
          </small>
        </div>
      </div>

      {/* Slot Preview */}
      <div className="doc-cal-slot-preview">
        <h5 className="doc-cal-slot-title">
          Slot Preview - {selectedClinic.name}
          <span
            className="doc-cal-current-clinic-badge"
            style={{
              backgroundColor: selectedClinic.color,
              color: "white"
            }}
          >
            Current Clinic
          </span>
        </h5>
        {slotPreview.length === 0 ? (
          <p className="doc-cal-no-slots">No slots generated yet for {selectedClinic.name}.</p>
        ) : (
          <div className="doc-cal-slot-grid">
            {slotPreview.map((e, i) => (
              <div key={i} className="doc-cal-slot-card-container">
                <div className="doc-cal-slot-card">
                  <div className="doc-cal-slot-card-header">
                    <strong className="doc-cal-slot-date">{e.date}</strong>
                    {e.blocked ? (
                      <span className="doc-cal-slot-unavailable">Unavailable</span>
                    ) : (
                      <span className="doc-cal-slot-count">
                        {e.slots.length} slots
                      </span>
                    )}
                  </div>
                  <div className="doc-cal-slot-card-body">
                    {e.blocked ? (
                      <em className="doc-cal-blocked-text">Date marked unavailable</em>
                    ) : e.slots.length ? (
                      <div className="doc-cal-slot-list">
                        {e.slots.map((slot, idx) => (
                          <span
                            key={idx}
                            className="doc-cal-slot-badge"
                            style={{
                              backgroundColor: slot.clinicColor,
                              color: "white"
                            }}
                            title={`Clinic: ${slot.clinicName}`}
                          >
                            {slot.time}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <em className="doc-cal-no-slots-text">No slots for {selectedClinic.name} on this date</em>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Time Modal */}
      {showAddTimeModal && (
        <div
          className="doc-cal-modal-overlay"
          onClick={() => setShowAddTimeModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="doc-cal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="doc-cal-modal-header"
              style={{ backgroundColor: selectedClinic.color }}
            >
              <h5 className="doc-cal-modal-title">
                <div
                  className="doc-cal-modal-indicator"
                  style={{
                    backgroundColor: "white"
                  }}
                />
                Add Timing to Selected - {selectedClinic.name}
              </h5>
            </div>
            <div className="doc-cal-modal-body">
              <div className="doc-cal-modal-field">
                <label className="doc-cal-modal-label">Start Time</label>
                <input
                  type="time"
                  className="doc-cal-modal-input"
                  value={additionalTime.start}
                  onChange={(e) =>
                    setAdditionalTime((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="doc-cal-modal-field">
                <label className="doc-cal-modal-label">End Time</label>
                <input
                  type="time"
                  className="doc-cal-modal-input"
                  value={additionalTime.end}
                  onChange={(e) =>
                    setAdditionalTime((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="doc-cal-modal-field">
                <label className="doc-cal-modal-label">Duration (minutes)</label>
                <div className="doc-cal-duration-controls">
                  <select
                    className="doc-cal-duration-select"
                    value={
                      additionalTime.durationMode === "preset"
                        ? additionalTime.duration
                        : "custom"
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "custom") {
                        setAdditionalTime((prev) => ({
                          ...prev,
                          durationMode: "custom",
                          customDuration: "",
                        }));
                      } else {
                        setAdditionalTime((prev) => ({
                          ...prev,
                          durationMode: "preset",
                          duration: Number(val),
                        }));
                      }
                    }}
                  >
                    {defaultDurations.map((d) => (
                      <option key={d} value={d}>
                        {d} min
                      </option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>

                  {additionalTime.durationMode === "custom" && (
                    <input
                      type="number"
                      min={1}
                      className="doc-cal-custom-duration-input"
                      placeholder="mins"
                      value={additionalTime.customDuration}
                      onChange={(e) =>
                        setAdditionalTime((prev) => ({
                          ...prev,
                          customDuration: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              </div>

              <div className="doc-cal-modal-info">
                <div className="doc-cal-info-item">
                  <strong>Selected Clinic:</strong> {selectedClinic.name} ({selectedClinic.location})
                </div>
                <div className="doc-cal-info-item">
                  <strong>Selected Days:</strong>{" "}
                  {selectedDays.length > 0
                    ? selectedDays.join(", ")
                    : "None"}
                </div>
                <div className="doc-cal-info-item">
                  <strong>Recurring Weekdays:</strong>{" "}
                  {recurringWeekdays.length > 0
                    ? recurringWeekdays.map((w) => days[w]).join(", ")
                    : "None"}
                </div>
              </div>

              <div className="doc-cal-modal-buttons">
                <button
                  className="doc-cal-modal-btn doc-cal-modal-btn-primary"
                  onClick={addAdditionalTiming}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    selectedDays.length === 0
                  }
                  style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
                >
                  Add to Selected Days ({selectedDays.length})
                </button>

                <button
                  className="doc-cal-modal-btn doc-cal-modal-btn-success"
                  onClick={addAdditionalTimingToWeekdays}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    recurringWeekdays.length === 0
                  }
                  style={{ backgroundColor: selectedClinic.color + "CC", borderColor: selectedClinic.color }}
                >
                  Add to Recurring Weekdays ({recurringWeekdays.length})
                </button>

                <button
                  className="doc-cal-modal-btn doc-cal-modal-btn-secondary"
                  onClick={() => {
                    addAdditionalTiming();
                    addAdditionalTimingToWeekdays();
                  }}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    (selectedDays.length === 0 &&
                      recurringWeekdays.length === 0)
                  }
                  style={{ backgroundColor: selectedClinic.color + "99", borderColor: selectedClinic.color }}
                >
                  Add to Both
                </button>
              </div>
            </div>
            <div className="doc-cal-modal-footer">
              <button
                className="doc-cal-modal-footer-btn"
                onClick={() => {
                  setAdditionalTime({
                    start: "",
                    end: "",
                    duration: 15,
                    durationMode: "preset",
                    customDuration: "",
                  });
                }}
              >
                Clear Timing
              </button>
              <div className="doc-cal-modal-footer-actions">
                <button
                  className="doc-cal-modal-save-btn"
                  onClick={() => {
                    if (selectedDays.length > 0) addAdditionalTiming();
                    if (recurringWeekdays.length > 0)
                      addAdditionalTimingToWeekdays();
                  }}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    (selectedDays.length === 0 &&
                      recurringWeekdays.length === 0)
                  }
                  style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
                >
                  Save
                </button>
                <button
                  className="doc-cal-modal-close-btn"
                  onClick={() => setShowAddTimeModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editingTarget && (
        <div
          className="doc-cal-editor-overlay"
          onClick={() => setEditingTarget(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="doc-cal-editor-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="doc-cal-editor-body">
              <div className="doc-cal-editor-header">
                <h5 className="doc-cal-editor-title">
                  Edit{" "}
                  {editingTarget.type === "date"
                    ? `Date: ${editingTarget.key}`
                    : `Weekday: ${days[editingTarget.key]}`}
                </h5>
                <div className="doc-cal-editor-clinic-info">
                  <div
                    className="doc-cal-editor-clinic-indicator"
                    style={{
                      backgroundColor: selectedClinic.color
                    }}
                  />
                  <span className="doc-cal-editor-clinic-name">{selectedClinic.name}</span>
                  <button
                    className="doc-cal-editor-close-btn"
                    onClick={() => setEditingTarget(null)}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="doc-cal-existing-ranges">
                <h6 className="doc-cal-ranges-title">Existing Ranges</h6>
                <div className="doc-cal-ranges-list">
                  {editingTarget.type === "date"
                    ? (
                      (availabilityDateMap[editingTarget.key] &&
                        availabilityDateMap[editingTarget.key].ranges) ||
                      []
                    ).map((r, idx) => {
                      const clinic = clinics.find(c => c.id === r.clinicId) || selectedClinic;
                      return (
                        <div
                          key={idx}
                          className="doc-cal-range-item"
                        >
                          <div className="doc-cal-range-info">
                            <span className="doc-cal-range-time">
                              {r.start} → {r.end}
                            </span>{" "}
                            — {r.duration || 15} min
                            <span
                              className="doc-cal-range-clinic-badge"
                              style={{
                                backgroundColor: clinic.color,
                                color: "white"
                              }}
                            >
                              {clinic.name}
                            </span>
                          </div>
                          <div className="doc-cal-range-actions">
                            <button
                              className="doc-cal-range-remove-btn"
                              onClick={() => removeRange(idx)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })
                    : (availabilityWeekdayMap[editingTarget.key] || []).map(
                      (r, idx) => {
                        const clinic = clinics.find(c => c.id === r.clinicId) || selectedClinic;
                        return (
                          <div
                            key={idx}
                            className="doc-cal-range-item"
                          >
                            <div className="doc-cal-range-info">
                              <span className="doc-cal-range-time">
                                {r.start} → {r.end}
                              </span>{" "}
                              — {r.duration || 15} min
                              <span
                                className="doc-cal-range-clinic-badge"
                                style={{
                                  backgroundColor: clinic.color,
                                  color: "white"
                                }}
                              >
                                {clinic.name}
                              </span>
                            </div>
                            <div className="doc-cal-range-actions">
                              <button
                                className="doc-cal-range-remove-btn"
                                onClick={() => removeRange(idx)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}

                  {editingTarget.type === "date" &&
                    (!availabilityDateMap[editingTarget.key] ||
                      (availabilityDateMap[editingTarget.key].ranges || [])
                        .length === 0) && (
                      <div className="doc-cal-no-ranges">
                        <em>
                          No date-specific ranges (weekday ranges may still
                          apply)
                        </em>
                      </div>
                    )}
                </div>

                {editingTarget.type === "date" && (
                  <div className="doc-cal-date-actions">
                    <div className="doc-cal-date-buttons">
                      <button
                        className={`doc-cal-block-btn ${availabilityDateMap[editingTarget.key] &&
                            availabilityDateMap[editingTarget.key].blocked
                            ? "doc-cal-unblock-btn"
                            : "doc-cal-block-date-btn"
                          }`}
                        onClick={() => {
                          toggleBlockDate(
                            editingTarget.key,
                            editingTarget.year,
                            editingTarget.month,
                            editingTarget.day
                          );
                        }}
                      >
                        {availabilityDateMap[editingTarget.key] &&
                          availabilityDateMap[editingTarget.key].blocked
                          ? "Unmark Unavailable"
                          : "Mark Date Unavailable"}
                      </button>

                      <button
                        className="doc-cal-clear-ranges-btn"
                        onClick={() => {
                          if (
                            !window.confirm("Remove all ranges for this date?")
                          )
                            return;
                          removeAllRangesForDate(
                            editingTarget.key,
                            editingTarget.year,
                            editingTarget.month,
                            editingTarget.day
                          );
                        }}
                      >
                        Clear Date Ranges
                      </button>
                    </div>
                    <div className="doc-cal-date-help">
                      <small>
                        If a date is marked unavailable, it will be excluded
                        even if weekday ranges exist.
                      </small>
                    </div>
                  </div>
                )}
              </div>

              <div className="doc-cal-add-range">
                <h6 className="doc-cal-add-range-title">Add New Range</h6>
                <div className="doc-cal-add-range-form">
                  <div className="doc-cal-range-field">
                    <label className="doc-cal-range-label">Start (24-hour)</label>
                    <input
                      type="time"
                      className="doc-cal-range-input"
                      value={newRange.start}
                      onChange={(e) =>
                        setNewRange((n) => ({ ...n, start: e.target.value }))
                      }
                    />
                  </div>
                  <div className="doc-cal-range-field">
                    <label className="doc-cal-range-label">End (24-hour)</label>
                    <input
                      type="time"
                      className="doc-cal-range-input"
                      value={newRange.end}
                      onChange={(e) =>
                        setNewRange((n) => ({ ...n, end: e.target.value }))
                      }
                    />
                  </div>
                  <div className="doc-cal-range-field">
                    <label className="doc-cal-range-label">Slot Duration (min)</label>
                    <input
                      type="number"
                      min={1}
                      className="doc-cal-range-input"
                      value={newRange.duration}
                      onChange={(e) =>
                        setNewRange((n) => ({
                          ...n,
                          duration: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="doc-cal-range-action">
                    <button
                      className="doc-cal-range-add-btn"
                      onClick={saveRange}
                      disabled={!newRange.start || !newRange.end}
                      style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="doc-cal-range-help">
                  <small>
                    Click "Add" to add multiple ranges. Click "Save & Close"
                    when done.
                  </small>
                  {editingTarget.type === "date" && (
                    <div className="doc-cal-range-warning">
                      <small>
                        <strong>Note:</strong> Cannot add past time slots.
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className="doc-cal-editor-footer">
                <button
                  className="doc-cal-footer-btn"
                  onClick={() =>
                    setNewRange({ start: "", end: "", duration: 15 })
                  }
                >
                  Clear Form
                </button>
                <button
                  className="doc-cal-footer-btn"
                  onClick={() => setEditingTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="doc-cal-save-btn"
                  onClick={saveAndClose}
                  style={{ backgroundColor: selectedClinic.color, borderColor: selectedClinic.color }}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCalendar;