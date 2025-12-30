// DoctorDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Form,
  FormControl,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { CompleteModal } from "./AppointmentModal";
import "./DoctorDashboard.css";

const DEFAULT_BREAK_MIN = 30;
const BREAK_OPTIONS_MIN = [5, 10, 15, 30, 45, 60];

const pad = (n) => (n < 10 ? "0" + n : n);
const formatTimeOfDay = (ms) => new Date(ms).toLocaleTimeString();
const formatDateTime = (ms) =>
  `${new Date(ms).toLocaleDateString()} ${new Date(ms).toLocaleTimeString()}`;
const formatDuration = (ms) => {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${pad(m)}m ${pad(s)}s`;
  if (m > 0) return `${m}m ${pad(s)}s`;
  return `${s}s`;
};

const initialAppointments = [
  {
    id: 1,
    name: "Rahul Sharma",
    gender: "Male",
    issue: "Fever & Cough",
    scheduledTime: "10:00 AM",
    status: "pending",
    phone: "9012345678",
  },
  {
    id: 2,
    name: "Priya Verma",
    gender: "Female",
    issue: "Headache",
    scheduledTime: "10:30 AM",
    status: "pending",
    phone: "9123456780",
  },
  {
    id: 3,
    name: "Amit Kumar",
    gender: "Male",
    issue: "Back Pain",
    scheduledTime: "11:00 AM",
    status: "pending",
    phone: "9876543210",
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [completed, setCompleted] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [, setTick] = useState(0);
  const tickRef = useRef(null);
  const [now, setNow] = useState(Date.now());

  const [selectedBreakMin, setSelectedBreakMin] = useState(DEFAULT_BREAK_MIN);
  const [customBreakMin, setCustomBreakMin] = useState("");

  // Only Complete Modal now
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completeForm, setCompleteForm] = useState({
    diagnosis: "",
    medicine: "",
    advice: "",
  });

  // Timer tick
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setNow(Date.now());
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  // Start appointment directly (NO MODAL)
  const handleStart = (appt) => {
    const startTime = Date.now();

    const session = {
      appt,
      startTime,
      accumulatedPauseMs: 0,
      pauseStartMs: null,
      breakStartMs: null,
      breakEndMs: null,
      breakDurationMs: null,
      status: "started",
    };

    setActiveSession(session);

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appt.id ? { ...a, status: "in-progress" } : a
      )
    );
  };

  // Pause / Resume
  const handlePause = () => {
    if (!activeSession) return;
    if (activeSession.status === "paused") {
      const pauseDuration = Date.now() - activeSession.pauseStartMs;
      setActiveSession((s) => ({
        ...s,
        accumulatedPauseMs: s.accumulatedPauseMs + pauseDuration,
        pauseStartMs: null,
        status: "started",
      }));
    } else {
      setActiveSession((s) => ({
        ...s,
        pauseStartMs: Date.now(),
        status: "paused",
      }));
    }
  };

  // Break start
  const handleBreak = () => {
    if (!activeSession) return;

    const minutes =
      Number(customBreakMin) > 0
        ? Number(customBreakMin)
        : Number(selectedBreakMin);

    const breakStart = Date.now();
    const breakDurationMs = minutes * 60 * 1000;
    const breakEnd = breakStart + breakDurationMs;

    setActiveSession((s) => ({
      ...s,
      accumulatedPauseMs: s.pauseStartMs
        ? s.accumulatedPauseMs + (Date.now() - s.pauseStartMs)
        : s.accumulatedPauseMs,
      pauseStartMs: null,
      breakStartMs: breakStart,
      breakEndMs: breakEnd,
      breakDurationMs,
      status: "break",
    }));
  };

  // Auto resume break
  useEffect(() => {
    if (!activeSession) return;
    if (activeSession.status === "break" && activeSession.breakEndMs) {
      if (activeSession.breakEndMs - Date.now() <= 0) {
        setActiveSession((s) => ({
          ...s,
          accumulatedPauseMs: s.accumulatedPauseMs + (s.breakDurationMs || 0),
          breakStartMs: null,
          breakEndMs: null,
          breakDurationMs: null,
          status: "started",
        }));
      }
    }
  }, [now, activeSession]);

  const handleEndBreakAndResume = () => {
    if (!activeSession || activeSession.status !== "break") return;
    const used = Date.now() - activeSession.breakStartMs;

    setActiveSession((s) => ({
      ...s,
      accumulatedPauseMs: s.accumulatedPauseMs + Math.max(0, used),
      breakStartMs: null,
      breakEndMs: null,
      breakDurationMs: null,
      status: "started",
    }));
  };

  // Open complete modal
  const handleComplete = () => {
    setCompleteForm({
      diagnosis: "",
      medicine: "",
      advice: "",
    });
    setShowCompleteModal(true);
  };

  // Save completed appointment
  const saveCompleteModal = () => {
    if (!activeSession) return;
    const endTime = Date.now();

    let finalAccumulated = activeSession.accumulatedPauseMs;
    if (activeSession.pauseStartMs)
      finalAccumulated += Date.now() - activeSession.pauseStartMs;
    if (activeSession.breakStartMs)
      finalAccumulated += Date.now() - activeSession.breakStartMs;

    const totalTreatmentMs = Math.max(
      0,
      endTime - activeSession.startTime - finalAccumulated
    );

    const completedRecord = {
      ...activeSession.appt,
      startTime: activeSession.startTime,
      endTime,
      durationMs: totalTreatmentMs,

      diagnosis: completeForm.diagnosis,
      medicine: completeForm.medicine,
      advice: completeForm.advice,
    };

    setCompleted((prev) => [completedRecord, ...prev]);
    setAppointments((prev) =>
      prev.filter((a) => a.id !== activeSession.appt.id)
    );

    setActiveSession(null);
    setShowCompleteModal(false);
  };

  const computeElapsedMs = () => {
    if (!activeSession || !activeSession.startTime) return 0;

    let elapsed =
      Date.now() - activeSession.startTime - activeSession.accumulatedPauseMs;

    if (activeSession.pauseStartMs)
      elapsed =
        activeSession.pauseStartMs -
        activeSession.startTime -
        activeSession.accumulatedPauseMs;

    if (activeSession.breakStartMs)
      elapsed =
        activeSession.breakStartMs -
        activeSession.startTime -
        activeSession.accumulatedPauseMs;

    return Math.max(0, elapsed);
  };

  const getBreakRemainingMs = () => {
    if (!activeSession || !activeSession.breakEndMs) return 0;
    return Math.max(0, activeSession.breakEndMs - Date.now());
  };

  const activeAppt = activeSession?.appt || null;
  const elapsedMs = computeElapsedMs();
  const breakRemainingMs = getBreakRemainingMs();

  const StatusBadge = ({ status }) => {
    if (status === "pending") return <Badge bg="danger">Pending</Badge>;
    if (status === "in-progress") return <Badge bg="primary">In Progress</Badge>;
    if (status === "completed") return <Badge bg="success">Completed</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2>Dashboard</h2>
        <div className="text-end">
          <div className="current-time-label">Current time</div>
          <div className="current-time-value">
            {new Date(now).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* ACTIVE SESSION */}
      <div
        className={`card mb-3 dash-card shadow-sm ${
          activeSession ? "active" : ""
        }`}
      >
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
          {activeSession ? (
            <>
              {/* LEFT DETAILS */}
              <div className="d-flex gap-3 align-items-start">
                <div className="avatar-box">
                  <div className="initials">
                    {activeAppt.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                <div>
                  <div className="small-label">Now with</div>
                  <h5 className="mb-1">
                    {activeAppt.name}{" "}
                    <small className="text-muted">({activeAppt.gender})</small>
                  </h5>
                  <div className="mb-2">{activeAppt.issue}</div>

                  <div className="d-flex gap-3 small-info">
                    <div>
                      <div className="small-label">Started</div>
                      <div className="bold-text">
                        {formatTimeOfDay(activeSession.startTime)}
                      </div>
                    </div>

                    <div>
                      <div className="small-label">Elapsed</div>
                      <div className="bold-text">
                        {formatDuration(elapsedMs)}
                      </div>
                    </div>

                    <div>
                      <div className="small-label">Status</div>
                      <div>
                        {activeSession.status === "started" && (
                          <Badge bg="success">
                            In Progress <Spinner animation="border" size="sm" />
                          </Badge>
                        )}
                        {activeSession.status === "paused" && (
                          <Badge bg="warning">Paused</Badge>
                        )}
                        {activeSession.status === "break" && (
                          <Badge bg="info">Break</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTROLS */}
              <div className="ms-md-auto mt-3 mt-md-0 text-end control-block">
                <div className="mb-2 d-flex gap-2 justify-content-end align-items-center">
                  <Form.Select
                    size="sm"
                    value={selectedBreakMin}
                    onChange={(e) => setSelectedBreakMin(Number(e.target.value))}
                    className="break-select"
                  >
                    {BREAK_OPTIONS_MIN.map((m) => (
                      <option key={m} value={m}>
                        {m} min
                      </option>
                    ))}
                  </Form.Select>

                  <InputGroup size="sm" className="custom-break-input">
                    <FormControl
                     style={{marginTop:"0px"}}
                      placeholder="Custom"
                      value={customBreakMin}
                      onChange={(e) =>
                        setCustomBreakMin(e.target.value.replace(/\D/g, ""))
                      }
                    />
                    <InputGroup.Text>min</InputGroup.Text>
                  </InputGroup>
                </div>

                <div>
                  <Button
                    variant={
                      activeSession.status === "paused" ? "success" : "warning"
                    }
                    className="me-2"
                    onClick={handlePause}
                    size="sm"
                  >
                    {activeSession.status === "paused" ? "Resume" : "Pause"}
                  </Button>

                  <Button
                    variant="info"
                    className="me-2"
                    size="sm"
                    onClick={handleBreak}
                    disabled={activeSession.status === "break"}
                  >
                    Break
                  </Button>

                  <Button variant="success" onClick={handleComplete} size="sm">
                    Complete
                  </Button>
                </div>

                {activeSession.status === "break" && (
                  <div className="mt-2 text-end">
                    <div className="small-label">Break remaining</div>
                    <div className="d-flex gap-2 justify-content-end align-items-center">
                      <div className="bold-text break-remaining-time">
                        {formatDuration(breakRemainingMs)}
                      </div>
                      <ProgressBar
                        animated
                        now={
                          ((activeSession.breakDurationMs - breakRemainingMs) /
                            (activeSession.breakDurationMs || 1)) *
                          100
                        }
                        style={{ width: 150 }}
                      />
                    </div>

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="mt-2"
                      onClick={handleEndBreakAndResume}
                    >
                      End Break & Resume
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-100 text-center py-4">
              <div className="inactive-label">No active appointment</div>
              <h5>Start an appointment from Today's Appointments below</h5>
            </div>
          )}
        </div>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="card shadow-sm mb-4 table-card">
        <div className="card-body">
          <h5 className="table-heading">Today's Appointments</h5>
          <div className="table-responsive mt-3 p-4">
            <table className="table custom-table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>S No.</th>
                  <th>Patient</th>
                  <th>Gender</th>
                  <th>Issue</th>
                  <th>Phone</th>
                  <th>Scheduled</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a, idx) => (
                  <tr key={a.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {a.name}
                    </td>
                    <td>{a.gender}</td>
                    <td>{a.issue}</td>
                    <td>{a.phone}</td>
                    <td>{a.scheduledTime}</td>
                    <td>
                      <StatusBadge status={a.status} />
                    </td>
                    <td>
                      {!activeSession && a.status === "pending" && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleStart(a)}
                        >
                          Start
                        </Button>
                      )}

                      {activeSession?.appt?.id === a.id &&
                        a.status === "in-progress" && (
                          <Badge bg="info">Active</Badge>
                        )}
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-3">
                      All appointments completed ✔
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Completed Records */}
      <div className="card shadow-sm mb-5 table-card">
        <div className="card-body">
          <h5 className="table-heading">Completed Appointments</h5>
          <div className="table-responsive mt-3 p-4">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th></th>
                  <th>S No.</th>
                  <th>Patient</th>
                  <th>Gender</th>
                  <th>Issue</th>
                  <th>Phone</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Total Time</th>
                </tr>
              </thead>

              <tbody>
                {completed.map((c, i) => (
                  <tr key={c.id + "-" + i}>
                    <td>{i + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.gender}</td>
                    <td>{c.issue}</td>
                    <td>{c.phone}</td>
                    <td>{formatDateTime(c.startTime)}</td>
                    <td>{formatDateTime(c.endTime)}</td>
                    <td>{formatDuration(c.durationMs)}</td>
                  </tr>
                ))}

                {completed.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-3">
                      No completed appointments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Complete Modal */}
      <CompleteModal
        show={showCompleteModal}
        onHide={() => setShowCompleteModal(false)}
        form={completeForm}
        setForm={setCompleteForm}
        onSave={saveCompleteModal}
        patientName={activeAppt?.name}
      />
    </div>
  );
};

export default DoctorDashboard;
