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
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import "./DoctorDashboard.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
    bp: "120/80 mmHg",
    bloodGroup: "B+",
  },
  {
    id: 2,
    name: "Priya Verma",
    gender: "Female",
    issue: "Headache",
    scheduledTime: "10:30 AM",
    status: "pending",
    phone: "9123456780",
    bp: "118/76 mmHg",
    bloodGroup: "O+",
  },
  {
    id: 3,
    name: "Amit Kumar",
    gender: "Male",
    issue: "Back Pain",
    scheduledTime: "11:00 AM",
    status: "pending",
    phone: "9876543210",
    bp: "130/85 mmHg",
    bloodGroup: "A+",
  },
];

// Updated CompleteModal component with follow-up field and scrollbar
const CompleteModal = ({ show, onHide, form, setForm, onSave, patientName }) => {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  const defaultFollowUpDate = new Date(today);
  defaultFollowUpDate.setDate(today.getDate() + 7);
  const defaultFollowUpDateStr = defaultFollowUpDate.toISOString().split('T')[0];
  
  React.useEffect(() => {
    if (show && !form.followUpDate) {
      setForm(prev => ({
        ...prev,
        followUpDate: defaultFollowUpDateStr,
        followUpRequired: false
      }));
    }
  }, [show, defaultFollowUpDateStr, form.followUpDate]);

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFollowUpToggle = (e) => {
    const isChecked = e.target.checked;
    setForm(prev => ({ 
      ...prev, 
      followUpRequired: isChecked,
      followUpDate: isChecked ? prev.followUpDate || defaultFollowUpDateStr : ""
    }));
  };

  const handleSave = () => {
    const finalForm = form.followUpRequired ? form : { ...form, followUpDate: "" };
    onSave(finalForm);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="complete-modal">
      <Modal.Header closeButton className="complete-modal-header">
        <Modal.Title className="complete-modal-title">Complete Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="complete-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div className="patient-info-summary mb-3">
          <h6 className="patient-summary-title">Completing appointment for:</h6>
          <div className="patient-name-display">
            <i className="bi bi-person-circle me-2"></i>
            <span className="fs-6 fw-bold">{patientName}</span>
          </div>
        </div>

        <Form>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="form-label">
                  Diagnosis <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed diagnosis..."
                  value={form.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="form-control-sm diagnosis-textarea"
                  required
                />
                <div className="form-text text-muted mt-1">
                  Include symptoms, observations, medical findings.
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="form-label">
                  Prescribed Medicine <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter prescribed medicines..."
                  value={form.medicine}
                  onChange={(e) => handleInputChange("medicine", e.target.value)}
                  className="form-control-sm medicine-textarea"
                  required
                />
                <div className="form-text text-muted mt-1">
                  Medicine Name - Dosage - Frequency - Duration
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="form-label">
                  Advice <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed advice..."
                  value={form.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="form-control-sm advice-textarea"
                  required
                />
                <div className="form-text text-muted mt-1">
                  Include lifestyle recommendations and instructions.
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <div className="follow-up-section p-2 border rounded">
                <Form.Group className="mb-2">
                  <Form.Check
                    type="switch"
                    id="follow-up-switch"
                    label="Schedule Follow-up Appointment"
                    checked={form.followUpRequired || false}
                    onChange={handleFollowUpToggle}
                    className="follow-up-switch"
                  />
                </Form.Group>

                {form.followUpRequired && (
                  <Form.Group>
                    <Form.Label className="form-label">
                      Follow-up Date <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        type="date"
                        min={minDate}
                        value={form.followUpDate || defaultFollowUpDateStr}
                        onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                        className="form-control-sm follow-up-date-input"
                        required={form.followUpRequired}
                      />
                      <div className="text-muted">
                        <small>Select date for follow-up</small>
                      </div>
                    </div>
                    {form.followUpDate && (
                      <div className="mt-1 text-info follow-up-date-info">
                        <i className="bi bi-calendar-check me-1"></i>
                        Follow-up: {new Date(form.followUpDate).toLocaleDateString('en-US', { 
                          day: '2-digit',
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    )}
                  </Form.Group>
                )}
              </div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <div className="additional-notes-section p-2 border rounded">
                <Form.Group>
                  <Form.Label className="form-label">
                    Additional Notes (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Any additional observations, referrals..."
                    value={form.additionalNotes || ""}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="form-control-sm additional-notes-textarea"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="complete-modal-footer">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="form-requirements">
            <small className="text-muted">
              <i className="bi bi-exclamation-circle me-1"></i>
              Fields marked with <span className="text-danger">*</span> are required
            </small>
          </div>
          <div className="modal-actions">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="complete-cancel-btn me-2"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSave}
              className="complete-save-btn"
              size="sm"
              disabled={!form.diagnosis.trim() || !form.medicine.trim() || !form.advice.trim()}
            >
              <i className="bi bi-check-circle me-1"></i>
              Save & Continue
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

// Updated Summary Modal Component with both buttons
const SummaryModal = ({ show, onHide, appointmentData, onPrint, onCompleteWithoutPrint }) => {
  if (!appointmentData) return null;

  const doctorName = "Dr. Ramesh Kumar";
  const clinicName = "City Hospital & Medical Center";
  const clinicAddress = "Indore Saket Nagar, Madhya Pradesh 452001";
  const clinicContact = "+91 9876543210";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl" className="summary-modal">
      <Modal.Header closeButton className="summary-modal-header bg-primary text-white">
        <Modal.Title className="summary-modal-title">
          <i className="bi bi-file-text me-2"></i>
          Appointment Summary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="summary-modal-body p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {/* Clinic Header */}
        <div className="clinic-header text-center mb-4">
          <h4 className="clinic-name mb-1">{clinicName}</h4>
          <p className="clinic-address mb-1">{clinicAddress}</p>
          <p className="clinic-contact mb-3">Contact: {clinicContact}</p>
          <div className="border-top border-bottom py-2">
            <h5 className="document-title mb-0">PATIENT CONSULTATION SUMMARY</h5>
          </div>
        </div>

        <div className="summary-content">
          {/* Patient Information Section */}
          <div className="patient-info-section mb-4">
            <h6 className="section-title bg-light p-2">
              <i className="bi bi-person-badge me-2"></i>
              Patient Information
            </h6>
            <Row className="mb-2">
              <Col md={6}>
                <div className="info-item">
                  <span className="info-label">Patient Name:</span>
                  <span className="info-value">{appointmentData.name}</span>
                </div>
              </Col>
              <Col md={3}>
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{appointmentData.gender}</span>
                </div>
              </Col>
              <Col md={3}>
                <div className="info-item">
                  <span className="info-label">Age:</span>
                  <span className="info-value">35 years</span>
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={6}>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{appointmentData.phone}</span>
                </div>
              </Col>
              <Col md={3}>
                <div className="info-item">
                  <span className="info-label">Blood Group:</span>
                  <span className="info-value">{appointmentData.bloodGroup}</span>
                </div>
              </Col>
              <Col md={3}>
                <div className="info-item">
                  <span className="info-label">Blood Pressure:</span>
                  <span className="info-value">{appointmentData.bp}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="info-item">
                  <span className="info-label">Presenting Issue:</span>
                  <span className="info-value">{appointmentData.issue}</span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Consultation Details Section */}
          <div className="consultation-details-section mb-4">
            <h6 className="section-title bg-light p-2">
              <i className="bi bi-calendar-check me-2"></i>
              Consultation Details
            </h6>
            <Row className="mb-2">
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">Consultation Date:</span>
                  <span className="info-value">{formatDate(new Date())}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">Start Time:</span>
                  <span className="info-value">{formatTimeOfDay(appointmentData.startTime)}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">End Time:</span>
                  <span className="info-value">{formatTimeOfDay(appointmentData.endTime)}</span>
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{formatDuration(appointmentData.durationMs)}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">Doctor:</span>
                  <span className="info-value">{doctorName}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="info-item">
                  <span className="info-label">Appointment ID:</span>
                  <span className="info-value">APPT-{appointmentData.id.toString().padStart(3, '0')}</span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Medical Information Section */}
          <div className="medical-info-section mb-4">
            <h6 className="section-title bg-light p-2">
              <i className="bi bi-clipboard-check me-2"></i>
              Medical Information
            </h6>
            <Row className="mb-3">
              <Col md={12}>
                <div className="info-item mb-2">
                  <span className="info-label">Diagnosis:</span>
                  <div className="info-value border rounded p-2 bg-white">
                    {appointmentData.diagnosis}
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <div className="info-item mb-2">
                  <span className="info-label">Prescribed Medicine:</span>
                  <div className="info-value border rounded p-2 bg-white">
                    {appointmentData.medicine}
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <div className="info-item mb-2">
                  <span className="info-label">Medical Advice:</span>
                  <div className="info-value border rounded p-2 bg-white">
                    {appointmentData.advice}
                  </div>
                </div>
              </Col>
            </Row>
            {appointmentData.additionalNotes && (
              <Row>
                <Col md={12}>
                  <div className="info-item mb-2">
                    <span className="info-label">Additional Notes:</span>
                    <div className="info-value border rounded p-2 bg-white">
                      {appointmentData.additionalNotes}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </div>

          {/* Follow-up Section */}
          <div className="followup-section mb-4">
            <h6 className="section-title bg-light p-2">
              <i className="bi bi-arrow-clockwise me-2"></i>
              Follow-up Information
            </h6>
            <Row>
              <Col md={12}>
                <div className="info-item">
                  <span className="info-label">Follow-up Required:</span>
                  <span className="info-value">
                    {appointmentData.followUpRequired ? (
                      <Badge bg="warning" className="ms-2">
                        <i className="bi bi-calendar-check me-1"></i>
                        Yes - {formatDate(appointmentData.followUpDate)}
                      </Badge>
                    ) : (
                      <span className="text-muted ms-2">No follow-up required</span>
                    )}
                  </span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Doctor's Signature */}
          <div className="signature-section mt-4 pt-3 border-top">
            <Row>
              <Col md={6}>
                <div className="signature-box p-3">
                  <div className="signature-line mb-1"></div>
                  <p className="signature-label mb-0">Dr. Ramesh Kumar</p>
                  <small className="text-muted">Consulting Physician</small>
                </div>
              </Col>
              <Col md={6} className="text-md-end">
                <div className="stamp-box p-3">
                  <div className="stamp-circle d-inline-flex align-items-center justify-content-center">
                    <span className="stamp-text">VERIFIED</span>
                  </div>
                  <p className="stamp-label mb-0 mt-2">City Hospital & Medical Center</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="summary-modal-footer">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="footer-notes">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              This is a digital consultation summary. Keep it for your records.
            </small>
          </div>
          <div className="footer-actions">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="me-2"
              size="sm"
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={onCompleteWithoutPrint}
              className="me-2 complete-btn"
              size="sm"
            >
              <i className="bi bi-check-circle me-1"></i>
              Completed
            </Button>
            <Button
              variant="primary"
              onClick={() => onPrint(appointmentData)}
              className="print-btn"
              size="sm"
            >
              <i className="bi bi-printer me-1"></i>
              Print Summary
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [completed, setCompleted] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [, setTick] = useState(0);
  const tickRef = useRef(null);
  const [now, setNow] = useState(Date.now());

  const [selectedBreakMin, setSelectedBreakMin] = useState(DEFAULT_BREAK_MIN);
  const [customBreakMin, setCustomBreakMin] = useState("");

  // Modals
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [lastCompletedAppointment, setLastCompletedAppointment] = useState(null);
  const [completeForm, setCompleteForm] = useState({
    diagnosis: "",
    medicine: "",
    advice: "",
    additionalNotes: "",
    followUpRequired: false,
    followUpDate: ""
  });

  // Timer tick
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setNow(Date.now());
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  // Open consent modal
  const handleConsentClick = (appt) => {
    setSelectedAppointment(appt);
    setShowConsentModal(true);
  };

  // Start appointment from consent modal
  const handleStartFromConsent = () => {
    if (!selectedAppointment) return;

    const startTime = Date.now();
    const session = {
      appt: selectedAppointment,
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
        a.id === selectedAppointment.id ? { ...a, status: "in-progress" } : a
      )
    );

    setShowConsentModal(false);
    setSelectedAppointment(null);
  };

  // Pause / Resume
  const handlePause = () => {
    if (!activeSession || activeSession.status === "break") return;
    
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

  // Break start - ALWAYS works regardless of active session
  const handleBreak = () => {
    const minutes =
      Number(customBreakMin) > 0
        ? Number(customBreakMin)
        : Number(selectedBreakMin);

    const breakStart = Date.now();
    const breakDurationMs = minutes * 60 * 1000;
    const breakEnd = breakStart + breakDurationMs;

    if (!activeSession) {
      setActiveSession({
        appt: null,
        startTime: Date.now(),
        accumulatedPauseMs: 0,
        pauseStartMs: null,
        breakStartMs: breakStart,
        breakEndMs: breakEnd,
        breakDurationMs,
        status: "break",
      });
    } else {
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
    }
  };

  // Auto resume break
  useEffect(() => {
    if (!activeSession) return;
    if (activeSession.status === "break" && activeSession.breakEndMs) {
      if (activeSession.breakEndMs - Date.now() <= 0) {
        if (!activeSession.appt) {
          setActiveSession(null);
        } else {
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
    }
  }, [now, activeSession]);

  const handleEndBreakAndResume = () => {
    if (!activeSession || activeSession.status !== "break") return;
    const used = Date.now() - activeSession.breakStartMs;

    if (!activeSession.appt) {
      setActiveSession(null);
    } else {
      setActiveSession((s) => ({
        ...s,
        accumulatedPauseMs: s.accumulatedPauseMs + Math.max(0, used),
        breakStartMs: null,
        breakEndMs: null,
        breakDurationMs: null,
        status: "started",
      }));
    }
  };

  // Open complete modal (for Checked button)
  const handleChecked = () => {
    const today = new Date();
    const defaultFollowUpDate = new Date(today);
    defaultFollowUpDate.setDate(today.getDate() + 7);
    const defaultFollowUpDateStr = defaultFollowUpDate.toISOString().split('T')[0];
    
    setCompleteForm({
      diagnosis: "",
      medicine: "",
      advice: "",
      additionalNotes: "",
      followUpRequired: false,
      followUpDate: defaultFollowUpDateStr
    });
    setShowCompleteModal(true);
  };

  // Complete appointment immediately (for Complete button)
  const handleCompleteNow = () => {
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
      diagnosis: "Not specified",
      medicine: "Not specified",
      advice: "Not specified",
      followUpRequired: false,
      followUpDate: "",
      additionalNotes: ""
    };

    setCompleted((prev) => [completedRecord, ...prev]);
    setAppointments((prev) =>
      prev.filter((a) => a.id !== activeSession.appt.id)
    );

    setActiveSession(null);
  };

  // Save completed appointment from modal
  const saveCompleteModal = (formData) => {
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
      diagnosis: formData.diagnosis,
      medicine: formData.medicine,
      advice: formData.advice,
      additionalNotes: formData.additionalNotes || "",
      followUpRequired: formData.followUpRequired || false,
      followUpDate: formData.followUpDate || ""
    };

    setCompleted((prev) => [completedRecord, ...prev]);
    setAppointments((prev) =>
      prev.filter((a) => a.id !== activeSession.appt.id)
    );

    setLastCompletedAppointment(completedRecord);
    setActiveSession(null);
    setShowCompleteModal(false);
    setShowSummaryModal(true);
  };

  // Complete without printing (for Completed button)
  const handleCompleteWithoutPrint = () => {
    setShowSummaryModal(false);
    // The appointment is already in completed state from saveCompleteModal
  };

  // Print function
  const handlePrintSummary = (appointmentData) => {
    const doc = new jsPDF();
    
    // Add clinic header
    doc.setFontSize(20);
    doc.text("City Hospital & Medical Center", 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text("Indore Saket Nagar, Madhya Pradesh 452001", 105, 28, { align: 'center' });
    doc.text("Contact: +91 9876543210", 105, 34, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);
    
    doc.setFontSize(16);
    doc.text("PATIENT CONSULTATION SUMMARY", 105, 48, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setLineWidth(0.2);
    doc.line(20, 52, 190, 52);
    
    // Patient Information
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("PATIENT INFORMATION", 20, 62);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Patient Name: ${appointmentData.name}`, 20, 70);
    doc.text(`Gender: ${appointmentData.gender}`, 20, 76);
    doc.text(`Phone: ${appointmentData.phone}`, 100, 70);
    doc.text(`Blood Group: ${appointmentData.bloodGroup}`, 100, 76);
    doc.text(`Blood Pressure: ${appointmentData.bp}`, 140, 70);
    doc.text(`Issue: ${appointmentData.issue}`, 20, 82);
    
    // Consultation Details
    doc.setFont(undefined, 'bold');
    doc.text("CONSULTATION DETAILS", 20, 92);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Consultation Date: ${new Date().toLocaleDateString()}`, 20, 100);
    doc.text(`Start Time: ${formatTimeOfDay(appointmentData.startTime)}`, 20, 106);
    doc.text(`End Time: ${formatTimeOfDay(appointmentData.endTime)}`, 100, 100);
    doc.text(`Duration: ${formatDuration(appointmentData.durationMs)}`, 100, 106);
    doc.text(`Doctor: Dr. Ramesh Kumar`, 20, 112);
    doc.text(`Appointment ID: APPT-${appointmentData.id.toString().padStart(3, '0')}`, 100, 112);
    
    // Medical Information
    doc.setFont(undefined, 'bold');
    doc.text("MEDICAL INFORMATION", 20, 122);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Diagnosis:`, 20, 130);
    const diagnosisLines = doc.splitTextToSize(appointmentData.diagnosis, 170);
    doc.text(diagnosisLines, 25, 136);
    
    let yPos = 136 + (diagnosisLines.length * 5) + 10;
    
    doc.text(`Prescribed Medicine:`, 20, yPos);
    const medicineLines = doc.splitTextToSize(appointmentData.medicine, 170);
    doc.text(medicineLines, 25, yPos + 6);
    
    yPos = yPos + 6 + (medicineLines.length * 5) + 10;
    
    doc.text(`Medical Advice:`, 20, yPos);
    const adviceLines = doc.splitTextToSize(appointmentData.advice, 170);
    doc.text(adviceLines, 25, yPos + 6);
    
    yPos = yPos + 6 + (adviceLines.length * 5) + 10;
    
    if (appointmentData.additionalNotes) {
      doc.text(`Additional Notes:`, 20, yPos);
      const notesLines = doc.splitTextToSize(appointmentData.additionalNotes, 170);
      doc.text(notesLines, 25, yPos + 6);
      yPos = yPos + 6 + (notesLines.length * 5) + 10;
    }
    
    // Follow-up Information
    doc.setFont(undefined, 'bold');
    doc.text("FOLLOW-UP INFORMATION", 20, yPos);
    doc.setFont(undefined, 'normal');
    
    if (appointmentData.followUpRequired && appointmentData.followUpDate) {
      doc.text(`Follow-up Required: Yes`, 25, yPos + 8);
      doc.text(`Follow-up Date: ${new Date(appointmentData.followUpDate).toLocaleDateString()}`, 25, yPos + 14);
    } else {
      doc.text(`Follow-up Required: No`, 25, yPos + 8);
    }
    
    // Doctor's Signature
    yPos += 30;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 80, yPos);
    doc.text("Dr. Ramesh Kumar", 30, yPos + 8);
    doc.text("Consulting Physician", 25, yPos + 14);
    
    doc.line(120, yPos, 180, yPos);
    doc.text("City Hospital & Medical Center", 125, yPos + 8);
    doc.text("Verified & Stamped", 135, yPos + 14);
    
    // Footer
    doc.setFontSize(8);
    doc.text("This is a digital consultation summary. Please keep it for your records.", 105, 280, { align: 'center' });
    
    // Save the PDF
    doc.save(`appointment-summary-${appointmentData.name.replace(/\s+/g, '-')}-${new Date().getTime()}.pdf`);
    
    // Close the modal after printing
    setTimeout(() => {
      setShowSummaryModal(false);
    }, 500);
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
    <div className="doctor-dashboard-container p-3">
      {/* HEADER */}
      <div className="dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <h2 className="dashboard-title">Doctor Dashboard</h2>
        <div className="dashboard-time-info text-end">
          <div className="location-label">Indore Saket Nager</div>
          <div className="current-time-display">
            {new Date(now).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* BREAK CONTROLS */}
      <div className="break-controls-card card shadow-sm mb-3">
        <div className="card-body p-3">
          <h5 className="break-controls-title mb-2">Break Controls</h5>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Form.Select
              size="sm"
              value={selectedBreakMin}
              onChange={(e) => setSelectedBreakMin(Number(e.target.value))}
              className="break-duration-select"
              style={{ width: "100px" }}
            >
              {BREAK_OPTIONS_MIN.map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </Form.Select>

            <InputGroup size="sm" className="custom-break-input-group" style={{ width: "130px" }}>
              <FormControl
                placeholder="Custom"
                value={customBreakMin}
                onChange={(e) =>
                  setCustomBreakMin(e.target.value.replace(/\D/g, ""))
                }
              />
              <InputGroup.Text>min</InputGroup.Text>
            </InputGroup>

            <Button
              variant="info"
              size="sm"
              onClick={handleBreak}
              className="take-break-btn"
            >
              Take Break
            </Button>
            
            <Button
              variant={
                activeSession?.status === "paused" ? "success" : "warning"
              }
              className="pause-resume-btn"
              onClick={handlePause}
              size="sm"
              disabled={!activeSession?.appt || activeSession?.status === "break"}
            >
              {activeSession?.status === "paused" ? "Resume" : "Pause"}
            </Button>
          </div>

          {activeSession?.status === "break" && (
            <div className="break-timer-section mt-2">
              <div className="break-remaining-label">
                {activeSession.appt ? `Break for ${activeSession.appt.name}` : "On Break"}
              </div>
              <div className="d-flex gap-2 align-items-center">
                <div className="break-time-remaining">
                  {formatDuration(breakRemainingMs)}
                </div>
                <ProgressBar
                  animated
                  now={
                    ((activeSession.breakDurationMs - breakRemainingMs) /
                      (activeSession.breakDurationMs || 1)) *
                    100
                  }
                  className="break-progress-bar"
                  style={{ width: 120 }}
                />
              </div>

              <Button
                variant="outline-secondary"
                size="sm"
                className="mt-1 end-break-btn"
                onClick={handleEndBreakAndResume}
              >
                {activeSession.appt ? "End Break" : "End Break"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE SESSION CARD */}
      <div
        className={`active-session-card card mb-3 shadow-sm ${activeSession && activeSession.appt ? "active" : ""
          }`}
      >
        <div className="card-body p-3">
          {activeSession && activeSession.appt ? (
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
              <div className="d-flex gap-2 align-items-start mb-2 mb-md-0">
                <div className="patient-avatar">
                  <div className="patient-initials">
                    {activeAppt.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                <div className="patient-details">
                  <div className="patient-label">Now with</div>
                  <h5 className="patient-name">
                    {activeAppt.name}{" "}
                    <small className="patient-gender">({activeAppt.gender})</small>
                  </h5>
                  <div className="patient-issue mb-1">{activeAppt.issue}</div>

                  <div className="patient-vitals mb-1">
                    <Badge bg="info" className="me-1 vital-badge">
                      BP: {activeAppt.bp || 'N/A'}
                    </Badge>
                    <Badge bg="info" className="vital-badge">
                      BG: {activeAppt.bloodGroup || 'N/A'}
                    </Badge>
                  </div>

                  <div className="d-flex gap-2 session-info">
                    <div>
                      <div className="info-label">Started</div>
                      <div className="info-value">
                        {formatTimeOfDay(activeSession.startTime)}
                      </div>
                    </div>

                    <div>
                      <div className="info-label">Elapsed</div>
                      <div className="info-value">
                        {formatDuration(elapsedMs)}
                      </div>
                    </div>

                    <div>
                      <div className="info-label">Status</div>
                      <div>
                        {activeSession.status === "started" && (
                          <Badge bg="success" className="session-status">
                            Active <Spinner animation="border" size="sm" />
                          </Badge>
                        )}
                        {activeSession.status === "paused" && (
                          <Badge bg="warning" className="session-status">
                            Paused
                          </Badge>
                        )}
                        {activeSession.status === "break" && (
                          <Badge bg="info" className="session-status">
                            On Break
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="session-controls ms-md-auto text-end">
                <div className="">
                  <Button
                    variant="primary"
                    onClick={handleChecked}
                    size="sm"
                    className="me-1 checked-btn mb-2"
                    disabled={activeSession.status === "break"}
                  >
                    Checked
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCompleteNow}
                    size="sm"
                    className="complete-now-btn"
                    disabled={activeSession.status === "break"}
                  >
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          ) : activeSession?.status === "break" ? (
            <div className="no-patient-break text-center py-3">
              <div className="break-message">Currently on break</div>
              <h5 className="break-instruction">
                No active patient appointment
              </h5>
            </div>
          ) : (
            <div className="no-active-session text-center py-3">
              <div className="inactive-message">No active appointment</div>
              <h5 className="inactive-instruction">
                Start from Today's Appointments
              </h5>
            </div>
          )}
        </div>
      </div>

      {/* TODAY'S APPOINTMENTS TABLE */}
      <div className="appointments-table-card card shadow-sm mb-3">
        <div className="card-body p-3">
          <h5 className="table-heading">Today's Appointments</h5>
          <div className="table-responsive mt-2">
            <table className="table appointments-table align-middle mb-0">
              <thead>
                <tr>
                  <th className="serial-col">#</th>
                  <th className="patient-col">Patient</th>
                  <th className="gender-col">Gender</th>
                  <th className="issue-col">Issue</th>
                  <th className="phone-col">Phone</th>
                  <th className="bp-col">BP</th>
                  <th className="blood-group-col">BG</th>
                  <th className="scheduled-col">Time</th>
                  <th className="status-col">Status</th>
                  <th className="action-col">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a, idx) => (
                  <tr key={a.id}>
                    <td className="serial-number">{idx + 1}</td>
                    <td className="patient-name-cell">{a.name}</td>
                    <td className="patient-gender-cell">{a.gender}</td>
                    <td className="patient-issue-cell">{a.issue}</td>
                    <td className="patient-phone-cell">{a.phone}</td>
                    <td className="bp-cell">{a.bp || 'N/A'}</td>
                    <td className="blood-group-cell">{a.bloodGroup || 'N/A'}</td>
                    <td className="scheduled-time-cell">{a.scheduledTime}</td>
                    <td className="status-cell">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="action-cell">
                      {(!activeSession?.appt || activeSession?.appt?.id === a.id) &&
                        a.status === "pending" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleConsentClick(a)}
                            className="consent-btn"
                            disabled={activeSession?.status === "break"}
                          >
                            Consent
                          </Button>
                        )}

                      {activeSession?.appt?.id === a.id &&
                        a.status === "in-progress" && (
                          <Badge bg="info" className="active-badge">
                            Active
                          </Badge>
                        )}
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr className="no-appointments-row">
                    <td colSpan="10" className="text-center text-muted py-3">
                      <div className="empty-state">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        All appointments completed
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* COMPLETED APPOINTMENTS TABLE */}
      <div className="completed-table-card card shadow-sm mb-4">
        <div className="card-body p-3">
          <h5 className="table-heading">Completed Appointments</h5>
          <div className="table-responsive mt-2">
            <table className="table completed-appointments-table mb-0">
              <thead>
                <tr>
                  <th className="serial-col">#</th>
                  <th className="patient-col">Patient</th>
                  <th className="gender-col">Gender</th>
                  <th className="issue-col">Issue</th>
                  <th className="phone-col">Phone</th>
                  <th className="bp-col">BP</th>
                  <th className="blood-group-col">BG</th>
                  <th className="start-col">Start</th>
                  <th className="end-col">End</th>
                  <th className="duration-col">Time</th>
                  <th className="diagnosis-col">Diagnosis</th>
                  <th className="medicine-col">Medicine</th>
                  <th className="advice-col">Advice</th>
                  <th className="followup-col">Follow-up</th>
                </tr>
              </thead>

              <tbody>
                {completed.map((c, i) => (
                  <tr key={i}>
                    <td className="serial-number">{i + 1}</td>
                    <td className="patient-name-cell">{c.name}</td>
                    <td className="patient-gender-cell">{c.gender}</td>
                    <td className="patient-issue-cell">{c.issue}</td>
                    <td className="patient-phone-cell">{c.phone}</td>
                    <td className="bp-cell">{c.bp || 'N/A'}</td>
                    <td className="blood-group-cell">{c.bloodGroup || 'N/A'}</td>
                    <td className="start-time-cell">{formatDateTime(c.startTime)}</td>
                    <td className="end-time-cell">{formatDateTime(c.endTime)}</td>
                    <td className="duration-cell">{formatDuration(c.durationMs)}</td>
                    <td className="diagnosis-cell">{c.diagnosis}</td>
                    <td className="medicine-cell">{c.medicine}</td>
                    <td className="advice-cell">{c.advice}</td>
                    <td className="followup-cell">
                      {c.followUpRequired && c.followUpDate ? (
                        <Badge bg="warning" className="follow-up-badge">
                          <i className="bi bi-calendar-check me-1"></i>
                          {new Date(c.followUpDate).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Badge>
                      ) : (
                        <span className="text-muted">No</span>
                      )}
                    </td>
                  </tr>
                ))}

                {completed.length === 0 && (
                  <tr className="no-completed-row">
                    <td colSpan="14" className="text-center text-muted py-3">
                      <div className="empty-state">
                        <i className="bi bi-calendar-x me-1"></i>
                        No completed appointments
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CONSENT MODAL */}
      <Modal
        show={showConsentModal}
        onHide={() => setShowConsentModal(false)}
        centered
        className="consent-modal"
        size="lg"
      >
        <Modal.Header closeButton className="consent-modal-header p-2">
          <Modal.Title className="consent-modal-title">Patient Consent Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="consent-modal-body p-3" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <div className="patient-summary mb-3">
            <h6 className="patient-summary-title">Patient Information</h6>
            <div className="patient-details-grid">
              <div className="patient-detail">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedAppointment?.name}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{selectedAppointment?.gender}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Issue:</span>
                <span className="detail-value">{selectedAppointment?.issue}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Scheduled:</span>
                <span className="detail-value">{selectedAppointment?.scheduledTime}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedAppointment?.phone}</span>
              </div>
            </div>
          </div>

          <div className="patient-vitals-section mb-3">
            <h6 className="patient-summary-title">Patient Vitals (Pre-recorded)</h6>
            <div className="vitals-display">
              <div className="vital-item">
                <span className="vital-label">Blood Pressure:</span>
                <span className="vital-value">{selectedAppointment?.bp || 'Not recorded'}</span>
              </div>
              <div className="vital-item">
                <span className="vital-label">Blood Group:</span>
                <span className="vital-value">{selectedAppointment?.bloodGroup || 'Not recorded'}</span>
              </div>
            </div>
          </div>

          <div className="consent-agreement">
            <h6 className="patient-summary-title">Consent Agreement</h6>
            <div className="consent-text">
              <p>I confirm that I have reviewed the patient's information and vitals.</p>
              <p>I understand that starting will begin tracking consultation time.</p>
              <p>I acknowledge my responsibility for providing appropriate medical care.</p>
              <p>I confirm I will maintain patient confidentiality.</p>
              <p className="mb-0">Click "Start Appointment" to begin consultation.</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="consent-modal-footer p-2">
          <Button
            variant="outline-secondary"
            onClick={() => setShowConsentModal(false)}
            className="consent-cancel-btn"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStartFromConsent}
            className="consent-start-btn"
            size="sm"
          >
            Start Appointment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* COMPLETE MODAL */}
      <CompleteModal
        show={showCompleteModal}
        onHide={() => setShowCompleteModal(false)}
        form={completeForm}
        setForm={setCompleteForm}
        onSave={saveCompleteModal}
        patientName={activeAppt?.name}
      />

      {/* SUMMARY MODAL */}
      <SummaryModal
        show={showSummaryModal}
        onHide={() => setShowSummaryModal(false)}
        appointmentData={lastCompletedAppointment}
        onPrint={handlePrintSummary}
        onCompleteWithoutPrint={handleCompleteWithoutPrint}
      />
    </div>
  );
};

export default DoctorDashboard;