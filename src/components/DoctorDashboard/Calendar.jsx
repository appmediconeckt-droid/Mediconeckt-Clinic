// DoctorCalendar.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorCalendar.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatDateKey = (y, m, d) => `${y}-${m + 1}-${d}`;
const STORAGE_KEY = "doctor_calendar_state_v1";

const defaultDurations = [5, 10, 15, 20, 30];

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

    // Reset hours to compare only dates
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

    // Don't allow selection of past dates
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

    // Check if the time is in the past
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
      arr.push({ start, end, duration });
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
        // Skip past dates
        if (isPastDate(year, month, day)) return;

        // Check if start time is in the past
        if (isPastDateTime(year, month, day, sh, sm)) {
          alert(`Cannot add time in the past for date ${day}`);
          return;
        }

        const dateKey = formatDateKey(year, month, day);
        const prevInfo = newAvailabilityDateMap[dateKey]
          ? { ...newAvailabilityDateMap[dateKey] }
          : { ranges: [], blocked: false };
        const arr = prevInfo.ranges ? [...prevInfo.ranges] : [];
        arr.push({ start, end, duration });
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
        arr.push({ start, end, duration });
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

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);
    const firstDayIndex = new Date(year, month, 1).getDay();

    let cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    return (
      <div className="calendar-grid mt-3">
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

          const classes = ["calendar-cell"];
          if (isPast) classes.push("past-date");
          if (isBlocked) classes.push("blocked");
          else if (isManual) classes.push("selected-manual");
          else if (isRecurring) classes.push("selected-recurring");

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
              <div className="d-flex justify-content-between align-items-start">
                <small className="text-muted day-num">{day || ""}</small>
                {day && (
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      className={`btn btn-sm btn-ghost p-0 m-0 quick-toggle ${
                        isPast ? "disabled" : ""
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
                      <small>{isManual ? "✓" : "○"}</small>
                    </button>

                    <button
                      className={`btn btn-sm btn-outline-secondary p-1 ${
                        isPast ? "disabled" : ""
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
                      <small>Edit</small>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-2 cell-body">
                {day && (
                  <>
                    {isPast ? (
                      <small className="text-muted">Past date</small>
                    ) : (
                      <>
                        <small>
                          {isBlocked ? (
                            <span className="text-danger">Unavailable</span>
                          ) : (
                            <span>
                              {getRangesForDateOrWeek(year, month, day).length}{" "}
                              ranges
                            </span>
                          )}
                        </small>
                        <div className="mt-2 small-legend">
                          {isManual && (
                            <span className="badge badge-pill badge-manual">
                              Manual
                            </span>
                          )}
                          {isRecurring && (
                            <span className="badge badge-pill badge-recurring">
                              Week
                            </span>
                          )}
                          {isBlocked && (
                            <span className="badge badge-pill badge-blocked">
                              Blocked
                            </span>
                          )}
                        </div>

                        {isManual && !isBlocked && dateKey && !isPast && (
                          <div
                            className="quick-inline mt-2 p-2 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="d-flex gap-1 align-items-center flex-wrap">
                              <div
                                className="form-floating"
                                style={{ minWidth: 110 }}
                              >
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
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
                                <label
                                  style={{ fontSize: "0.7rem", paddingLeft: 6 }}
                                >
                                  Start
                                </label>
                              </div>

                              <div
                                className="form-floating"
                                style={{ minWidth: 110 }}
                              >
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
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
                                <label
                                  style={{ fontSize: "0.7rem", paddingLeft: 6 }}
                                >
                                  End
                                </label>
                              </div>

                              <div style={{ minWidth: 120 }}>
                                <label
                                  className="form-label mb-1 small"
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Duration (min)
                                </label>
                                <div className="d-flex gap-1 align-items-center">
                                  <select
                                    className="form-select form-select-sm"
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

                                  {quickRanges[dateKey] &&
                                    quickRanges[dateKey].durationMode ===
                                      "custom" && (
                                      <input
                                        type="number"
                                        min={1}
                                        className="form-control form-control-sm"
                                        style={{ width: 80 }}
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
                                </div>
                              </div>

                              <div>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addQuickRangeToDate(
                                      year,
                                      month,
                                      day,
                                      dateKey
                                    );
                                  }}
                                  title="Add time range to this date"
                                >
                                  Add Time
                                </button>
                              </div>
                            </div>

                            <div className="mt-2 small text-muted">
                              <small>
                                Quick add: adds date-specific range (overrides
                                weekday ranges for this date).
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

    // Check if editing a date (not weekday)
    if (editingTarget.type === "date") {
      // Check if the time is in the past
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
        });
        return { ...prev, [w]: arr };
      });
    }
    // Don't clear the form, allow adding multiple ranges
    setNewRange({ start: "", end: "", duration: 15 });
  };

  const saveAndClose = () => {
    setEditingTarget(null);
  };

  const removeRange = (index) => {
    if (!editingTarget) return;

    if (editingTarget.type === "date") {
      // Check if it's a past date
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
      res.push(`${hh}:${mm}`);
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

        const slots = [];
        ranges.forEach((r) => {
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
    <div className="p-4 doctor-calendar-root">
     
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <div>
           <h2 >Doctor Calendar</h2>
          <small className="text-muted">
            Recurring & date-specific availability — Modern Blue Theme
          </small>
          <div className="mt-1">
            <small className="text-danger">
              <strong>Note:</strong> Past dates cannot be edited or selected.
            </small>
          </div>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="weekday-bar d-flex justify-content-between gap-2 mb-2">
        {days.map((d, i) => (
          <button
            key={d}
            className={`btn btn-sm weekday-btn ${
              recurringWeekdays.includes(i) ? "active" : ""
            }`}
            onClick={() => toggleRecurringWeekday(i)}
            onDoubleClick={() => openEditorForWeekday(i)}
            title="Click to toggle recurring weekday. Double-click to edit weekday ranges."
            aria-pressed={recurringWeekdays.includes(i)}
          >
            {d}
          </button>
        ))}
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowAddTimeModal(true)}
        >
          Add Timing to Selected
        </button>
      </div>

      <div
        className="nav-controls btn-group mt-4"
        role="group"
        aria-label="Month navigation"
        style={{width:"450px", justifyContent:"center" , alignItems:"center"}}
      >
        <button
          className="btn btn-outline-primary"
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
          <span className="ms-2 d-none d-sm-inline">Prev</span>
        </button>
        <div className="month-title text-center px-3 mt-2">
          <strong>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </strong>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          <span className="me-2 d-none d-sm-inline">Next</span>
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

      <div className="days-row d-md-grid mb-1 mt-5">
        {days.map((d) => (
          <div key={d} className="text-center fw-bold">
            {d}
          </div>
        ))}
      </div>

      {renderCalendar()}

      <div className="mt-4 p-3 bg-light rounded controls-card shadow-sm">
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
          <div>
            <h6 className="m-0">Quick Actions</h6>
            <small className="text-muted d-block">
              Click a date cell to open the editor. Add ranges, mark
              unavailable, or remove ranges. Or use inline Add Time on selected
              days.
            </small>
            <small className="text-danger">
              <strong>Note:</strong> Past dates are grayed out and cannot be
              edited.
            </small>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={generateAllSlots}>
              Generate Slots for Visible Month
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSlotPreview([])}
            >
              Clear Preview
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5>Slot Preview</h5>
        {slotPreview.length === 0 ? (
          <p className="text-muted">No slots generated yet.</p>
        ) : (
          <div className="row">
            {slotPreview.map((e, i) => (
              <div key={i} className="col-12 col-md-6 mb-2">
                <div className="p-3 border rounded slot-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <strong>{e.date}</strong>
                    {e.blocked ? (
                      <span className="text-danger small">Unavailable</span>
                    ) : (
                      <span className="text-muted small">
                        {e.slots.length} slots
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    {e.blocked ? (
                      <em className="text-danger">Date marked unavailable</em>
                    ) : e.slots.length ? (
                      <div className="slot-list">{e.slots.join(", ")}</div>
                    ) : (
                      <em className="text-muted">No ranges for this date</em>
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
          className="add-time-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start p-4"
          style={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowAddTimeModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="card shadow-lg"
            style={{ width: "500px", maxWidth: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Add Timing to Selected</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={additionalTime.start}
                  onChange={(e) =>
                    setAdditionalTime((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={additionalTime.end}
                  onChange={(e) =>
                    setAdditionalTime((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Duration (minutes)</label>
                <div className="d-flex gap-2 align-items-center">
                  <select
                    className="form-select"
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
                      className="form-control"
                      style={{ width: 100 }}
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

              <div className="mb-4">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <div className="small text-muted">
                    <div>
                      <strong>Selected Days:</strong>{" "}
                      {selectedDays.length > 0
                        ? selectedDays.join(", ")
                        : "None"}
                    </div>
                    <div>
                      <strong>Recurring Weekdays:</strong>{" "}
                      {recurringWeekdays.length > 0
                        ? recurringWeekdays.map((w) => days[w]).join(", ")
                        : "None"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={addAdditionalTiming}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    selectedDays.length === 0
                  }
                >
                  Add to Selected Days ({selectedDays.length})
                </button>

                <button
                  className="btn btn-success"
                  onClick={addAdditionalTimingToWeekdays}
                  disabled={
                    !additionalTime.start ||
                    !additionalTime.end ||
                    recurringWeekdays.length === 0
                  }
                >
                  Add to Recurring Weekdays ({recurringWeekdays.length})
                </button>

                <button
                  className="btn btn-secondary"
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
                >
                  Add to Both
                </button>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
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
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
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
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
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
          className="editor-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start p-4"
          style={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setEditingTarget(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="card shadow-lg editor-card"
            style={{ width: "720px", maxWidth: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title m-0">
                  Edit{" "}
                  {editingTarget.type === "date"
                    ? `Date: ${editingTarget.key}`
                    : `Weekday: ${days[editingTarget.key]}`}
                </h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditingTarget(null)}
                >
                  Close
                </button>
              </div>

              <div className="mb-4">
                <h6>Existing Ranges</h6>
                <ul className="list-group mb-2">
                  {editingTarget.type === "date"
                    ? (
                        (availabilityDateMap[editingTarget.key] &&
                          availabilityDateMap[editingTarget.key].ranges) ||
                        []
                      ).map((r, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <span className="fw-bold">
                              {r.start} → {r.end}
                            </span>{" "}
                            — {r.duration || 15} min
                          </div>
                          <div>
                            <button
                              className="btn btn-sm btn-danger me-2"
                              onClick={() => removeRange(idx)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))
                    : (availabilityWeekdayMap[editingTarget.key] || []).map(
                        (r, idx) => (
                          <li
                            key={idx}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <span className="fw-bold">
                                {r.start} → {r.end}
                              </span>{" "}
                              — {r.duration || 15} min
                            </div>
                            <div>
                              <button
                                className="btn btn-sm btn-danger me-2"
                                onClick={() => removeRange(idx)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        )
                      )}

                  {editingTarget.type === "date" &&
                    (!availabilityDateMap[editingTarget.key] ||
                      (availabilityDateMap[editingTarget.key].ranges || [])
                        .length === 0) && (
                      <li className="list-group-item">
                        <em>
                          No date-specific ranges (weekday ranges may still
                          apply)
                        </em>
                      </li>
                    )}
                </ul>

                {editingTarget.type === "date" && (
                  <div className="mb-3">
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className={`btn ${
                          availabilityDateMap[editingTarget.key] &&
                          availabilityDateMap[editingTarget.key].blocked
                            ? "btn-outline-success"
                            : "btn-outline-danger"
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
                        className="btn btn-outline-warning"
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
                    <div className="mt-2">
                      <small className="text-muted">
                        If a date is marked unavailable, it will be excluded
                        even if weekday ranges exist. Date-specific ranges take
                        precedence over weekday ranges.
                      </small>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h6>Add New Range</h6>
                <div className="row g-2 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label">Start (24-hour)</label>
                    <input
                      type="time"
                      className="form-control"
                      value={newRange.start}
                      onChange={(e) =>
                        setNewRange((n) => ({ ...n, start: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">End (24-hour)</label>
                    <input
                      type="time"
                      className="form-control"
                      value={newRange.end}
                      onChange={(e) =>
                        setNewRange((n) => ({ ...n, end: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Slot Duration (min)</label>
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      value={newRange.duration}
                      onChange={(e) =>
                        setNewRange((n) => ({
                          ...n,
                          duration: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary"
                      onClick={saveRange}
                      disabled={!newRange.start || !newRange.end}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    Click "Add" to add multiple ranges. Click "Save & Close"
                    when done.
                  </small>
                  {editingTarget.type === "date" && (
                    <div className="mt-1">
                      <small className="text-danger">
                        <strong>Note:</strong> Cannot add past time slots.
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setNewRange({ start: "", end: "", duration: 15 })
                  }
                >
                  Clear Form
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingTarget(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={saveAndClose}>
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
