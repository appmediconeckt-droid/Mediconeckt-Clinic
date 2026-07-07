import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Modal,
  Row,
  Col,
  Table,
  Dropdown,
  Container,
  Card,
} from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import "./DoctorDashboard.css";

const DEFAULT_BREAK_MIN = 30;
const BREAK_OPTIONS_MIN = [5, 10, 15, 30, 45, 60];

const pad = (n) => (n < 10 ? "0" + n : n);
const formatTimeOfDay = (ms) => new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

// Enhanced Color Themes for PDF Generation
const COLOR_THEMES = [
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#dc2626',
      info: '#0891b2',
      text: '#1e293b',
      light: '#f8fafc'
    }
  },
  {
    id: 'medical-green',
    name: 'Medical Green',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0891b2',
      text: '#064e3b',
      light: '#f0fdf4'
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#dc2626',
      info: '#0891b2',
      text: '#4c1d95',
      light: '#f5f3ff'
    }
  }
];

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
    patientId: "P001",
    age: 32,
    address: "123 Main Street, Mumbai"
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
    patientId: "P002",
    age: 28,
    address: "456 Park Avenue, Delhi"
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
    patientId: "P003",
    age: 45,
    address: "789 Gandhi Road, Bangalore"
  },
];

// CompleteModal component
const CompleteModal = ({ show, onHide, form, setForm, onSave, patientName, patientData }) => {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const defaultFollowUpDate = new Date(today);
  defaultFollowUpDate.setDate(today.getDate() + 7);
  const defaultFollowUpDateStr = defaultFollowUpDate.toISOString().split('T')[0];

  // Medicine form state
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', durationType: 'days', durationValue: '', timing: [] }
  ]);

  const timingOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' }
  ];

  const durationTypeOptions = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' }
  ];

  React.useEffect(() => {
    if (show && !form.followUpDate) {
      setForm(prev => ({
        ...prev,
        followUpDate: defaultFollowUpDateStr,
        followUpRequired: false
      }));
    }
  }, [show, defaultFollowUpDateStr, form.followUpDate]);

  React.useEffect(() => {
    // Convert medicines array to text format
    const medicineText = medicines.map(med => {
      const timingStr = med.timing.map(t => {
        const timing = timingOptions.find(opt => opt.value === t);
        return timing ? timing.label : t;
      }).join(', ');

      return `${med.name || 'Medicine'} - ${med.dosage || '1'} (${timingStr}) - ${med.durationValue || '1'} ${med.durationType}`;
    }).join('\n');

    setForm(prev => ({ ...prev, medicine: medicineText }));
  }, [medicines]);

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

  // Medicine related functions
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    if (field === 'timing') {
      // Handle checkbox for timing
      if (updatedMedicines[index].timing.includes(value)) {
        updatedMedicines[index].timing = updatedMedicines[index].timing.filter(t => t !== value);
      } else {
        updatedMedicines[index].timing = [...updatedMedicines[index].timing, value];
      }
    } else {
      updatedMedicines[index][field] = value;
    }
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', durationType: 'days', durationValue: '', timing: [] }]);
  };

  const removeMedicine = (index) => {
    if (medicines.length > 1) {
      const updatedMedicines = medicines.filter((_, i) => i !== index);
      setMedicines(updatedMedicines);
    }
  };

  const handleSave = () => {
    // Format medicines for SummaryModal
    const formattedMedicines = medicines.map((med, index) => {
      const timingStr = med.timing.map(t => {
        const timing = timingOptions.find(opt => opt.value === t);
        return timing ? timing.label : t;
      }).join(', ');

      return {
        name: med.name || `Medicine ${index + 1}`,
        dosage: `${med.dosage || '1'} (${timingStr})`,
        duration: `${med.durationValue || '1'} ${med.durationType}`
      };
    });

    const finalForm = {
      ...form,
      medicines: formattedMedicines,
      // Include patient data
      patientId: patientData?.patientId || '',
      patientGender: patientData?.gender || '',
      patientAddress: patientData?.address || '',
      patientName: patientName || '',
      patientAge: patientData?.age || '',
      // Other fields
      temperature: form.temperature || '36',
      bloodPressure: form.bloodPressure || '120/80 mmHg',
      // Format follow up date
      formattedFollowUpDate: form.followUpRequired && form.followUpDate ?
        new Date(form.followUpDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) : ''
    };

    if (!form.followUpRequired) {
      finalForm.followUpDate = "";
      finalForm.formattedFollowUpDate = "";
    }

    onSave(finalForm);
  };

  const [vitals, setVitals] = useState({
    temperature: '36',
    bloodPressure: '120/80 mmHg'
  });

  const handleVitalChange = (field, value) => {
    setVitals(prev => ({ ...prev, [field]: value }));
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" scrollable className="docfix-complete-modal">
      <Modal.Header closeButton className="docfix-modal-header docfix-bg-primary text-white">
        <Modal.Title className="docfix-modal-title">Complete Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="docfix-modal-body">
        <div className="docfix-patient-info mb-3">
          <h6 className="docfix-text-secondary mb-2">Completing appointment for:</h6>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-circle me-2 docfix-fs-4"></i>
            <span className="docfix-fs-5 fw-bold docfix-text-primary">{patientName}</span>
            {patientData && (
              <span className="ms-2 badge bg-info">
                ID: {patientData.patientId}
              </span>
            )}
          </div>

          {/* Vitals Section */}
          <div className="row mb-3">
            <Col xs={6}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">
                  <i className="bi bi-thermometer me-1"></i>
                  Temperature (°C)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="36.5"
                  value={vitals.temperature}
                  onChange={(e) => handleVitalChange('temperature', e.target.value)}
                  className="docfix-form-control mb-2"
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">
                  <i className="bi bi-heart-pulse me-1"></i>
                  Blood Pressure
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="120/80 mmHg"
                  value={vitals.bloodPressure}
                  onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                  className="docfix-form-control mb-2"
                />
              </Form.Group>
            </Col>
          </div>
        </div>

        <Form>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">
                  Diagnosis <span className="docfix-text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed diagnosis..."
                  value={form.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="docfix-form-control mb-2"
                  required
                />
                <Form.Text className="docfix-text-muted">
                  Include symptoms, observations, medical findings.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Medicines Section */}
          <Row className="mb-3">
            <Col xs={12}>
              <div className="border rounded p-3 docfix-medicine-section">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Label className="fw-semibold mb-0 docfix-label">
                    Prescribed Medicines <span className="docfix-text-danger">*</span>
                  </Form.Label>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={addMedicine}
                    className="docfix-btn-sm docfix-btn-outline"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add
                  </Button>
                </div>

                {medicines.map((medicine, index) => (
                  <div key={index} className="border rounded p-3 mb-3 position-relative docfix-medicine-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="docfix-text-primary mb-0">Medicine #{index + 1}</h6>
                      {medicines.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeMedicine(index)}
                          className="docfix-btn-sm docfix-btn-outline-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      )}
                    </div>

                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="docfix-label">
                            Medicine Name <span className="docfix-text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., Paracetamol 500mg"
                            value={medicine.name}
                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                            className="docfix-form-control"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label className="docfix-label">
                            Dosage <span className="docfix-text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., 1 Tablet"
                            value={medicine.dosage}
                            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                            className="docfix-form-control"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label className="docfix-label">Timing</Form.Label>
                          <div className="d-flex flex-wrap gap-2 docfix-timing-options">
                            {timingOptions.map((option) => (
                              <Form.Check
                                key={option.value}
                                type="checkbox"
                                id={`timing-${index}-${option.value}`}
                                label={option.label}
                                checked={medicine.timing.includes(option.value)}
                                onChange={() => handleMedicineChange(index, 'timing', option.value)}
                                className="docfix-checkbox"
                              />
                            ))}
                          </div>
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label className="docfix-label">
                            Duration Value <span className="docfix-text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            placeholder="e.g., 7"
                            value={medicine.durationValue}
                            onChange={(e) => handleMedicineChange(index, 'durationValue', e.target.value)}
                            className="docfix-form-control"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group>
                          <Form.Label className="docfix-label">
                            Duration Type <span className="docfix-text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            value={medicine.durationType}
                            onChange={(e) => handleMedicineChange(index, 'durationType', e.target.value)}
                            className="docfix-form-select"
                            required
                          >
                            {durationTypeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Preview of medicine format */}
                    <div className="mt-2 p-2 bg-light rounded small docfix-medicine-preview">
                      <strong>Preview:</strong> {medicine.name || 'Medicine'} - {medicine.dosage || 'Dosage'} (
                      {medicine.timing.length > 0
                        ? medicine.timing.map(t => {
                          const timing = timingOptions.find(opt => opt.value === t);
                          return timing ? timing.label : t;
                        }).join(', ')
                        : 'Select timing'
                      }) - {medicine.durationValue || '?'} {medicine.durationType}
                    </div>
                  </div>
                ))}

                <Form.Text className="docfix-text-muted">
                  Each medicine will be formatted as: Medicine Name - Dosage (Timing) - Duration
                </Form.Text>
              </div>
            </Col>
          </Row>

          {/* Preview of all medicines */}
          {form.medicine && (
            <Row className="mb-3">
              <Col xs={12}>
                <div className="border rounded p-3 bg-light docfix-all-medicines-preview">
                  <h6 className="docfix-text-primary mb-2">
                    <i className="bi bi-eye me-1"></i>
                    All Medicines Preview
                  </h6>
                  <pre className="mb-0 docfix-text-muted small" style={{ whiteSpace: 'pre-wrap' }}>
                    {form.medicine}
                  </pre>
                </div>
              </Col>
            </Row>
          )}

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">
                  Advice <span className="docfix-text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed advice..."
                  value={form.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="docfix-form-control mb-2"
                  required
                />
                <Form.Text className="docfix-text-muted">
                  Include lifestyle recommendations and instructions.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <div className="p-3 border rounded bg-light docfix-followup-section">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="follow-up-switch"
                    label="Schedule Follow-up Appointment"
                    checked={form.followUpRequired || false}
                    onChange={handleFollowUpToggle}
                    className="docfix-switch"
                  />
                </Form.Group>

                {form.followUpRequired && (
                  <Form.Group>
                    <Form.Label className="fw-semibold docfix-label">
                      Follow-up Date <span className="docfix-text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 mb-2">
                      <Form.Control
                        type="date"
                        min={minDate}
                        value={form.followUpDate || defaultFollowUpDateStr}
                        onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                        className="w-100 w-md-auto docfix-form-control"
                        required={form.followUpRequired}
                      />
                      <div className="docfix-text-muted">
                        <small>Select date for follow-up</small>
                      </div>
                    </div>
                    {form.followUpDate && (
                      <div className="mt-2 docfix-text-info">
                        <i className="bi bi-calendar-check me-1"></i>
                        Follow-up: {new Date(form.followUpDate).toLocaleDateString('en-IN', {
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

          <Row className="mb-3">
            <Col xs={12}>
              <div className="p-3 border rounded bg-light docfix-notes-section">
                <Form.Group>
                  <Form.Label className="fw-semibold docfix-label">
                    Additional Notes (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Any additional observations, referrals..."
                    value={form.additionalNotes || ""}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="docfix-form-control"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="docfix-modal-footer">
        <div className="d-flex flex-column flex-md-row justify-content-between w-100 align-items-center gap-3">
          <div>
            <small className="docfix-text-muted">
              <i className="bi bi-exclamation-circle me-1"></i>
              Fields marked with <span className="docfix-text-danger">*</span> are required
            </small>
          </div>
          <div className="d-flex gap-2 docfix-modal-buttons">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              size="sm"
              className="docfix-btn-sm docfix-btn-cancel"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSave}
              size="sm"
              className="docfix-btn-sm docfix-btn-continue"
              disabled={!form.diagnosis.trim() || !form.advice.trim() ||
                medicines.some(med => !med.name.trim() || !med.dosage.trim() || !med.durationValue)}
            >

              Continue
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

// Edit Modal for Completed Appointments
const EditCompletedModal = ({ show, onHide, appointment, onSave }) => {
  const [form, setForm] = useState({
    diagnosis: "",
    medicine: "",
    advice: "",
    additionalNotes: "",
    followUpRequired: false,
    followUpDate: ""
  });

  useEffect(() => {
    if (appointment) {
      setForm({
        diagnosis: appointment.diagnosis || "",
        medicine: appointment.medicine || "",
        advice: appointment.advice || "",
        additionalNotes: appointment.additionalNotes || "",
        followUpRequired: appointment.followUpRequired || false,
        followUpDate: appointment.followUpDate || ""
      });
    }
  }, [appointment]);

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFollowUpToggle = (e) => {
    const isChecked = e.target.checked;
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() + 7);
    const defaultDateStr = defaultDate.toISOString().split('T')[0];

    setForm(prev => ({
      ...prev,
      followUpRequired: isChecked,
      followUpDate: isChecked ? prev.followUpDate || defaultDateStr : ""
    }));
  };

  const handleSave = () => {
    onSave(form);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="docfix-edit-modal">
      <Modal.Header closeButton className="docfix-modal-header docfix-bg-primary text-white">
        <Modal.Title className="docfix-modal-title">
          <i className="bi bi-pencil-square me-2"></i>
          Edit Completed Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="docfix-modal-body">
        <div className="docfix-edit-patient-info mb-4">
          <h6 className="docfix-text-secondary">Editing appointment for:</h6>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-circle me-2 docfix-fs-4"></i>
            <span className="docfix-fs-5 fw-bold docfix-text-primary">{appointment?.name}</span>
          </div>
          <div>
            <small className="docfix-text-muted">
              <i className="bi bi-calendar me-1"></i>
              Completed on: {appointment?.endTime ? formatDateTime(appointment.endTime) : 'N/A'}
            </small>
          </div>
        </div>

        <Form>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">Diagnosis</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed diagnosis..."
                  value={form.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="docfix-form-control"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">Prescribed Medicine</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter prescribed medicines..."
                  value={form.medicine}
                  onChange={(e) => handleInputChange("medicine", e.target.value)}
                  className="docfix-form-control"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold docfix-label">Advice</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed advice..."
                  value={form.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="docfix-form-control"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <div className="p-3 border rounded bg-light docfix-followup-section">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="edit-follow-up-switch"
                    label="Schedule Follow-up Appointment"
                    checked={form.followUpRequired || false}
                    onChange={handleFollowUpToggle}
                    className="docfix-switch"
                  />
                </Form.Group>

                {form.followUpRequired && (
                  <Form.Group>
                    <Form.Label className="fw-semibold docfix-label">Follow-up Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.followUpDate}
                      onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                      className="docfix-form-control"
                    />
                  </Form.Group>
                )}
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <div className="p-3 border rounded bg-light docfix-notes-section">
                <Form.Group>
                  <Form.Label className="fw-semibold docfix-label">Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Any additional observations..."
                    value={form.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="docfix-form-control"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="docfix-modal-footer">
        <div className="d-flex justify-content-end w-100 gap-2">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            size="sm"
            className="docfix-btn-sm docfix-btn-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            size="sm"
            className="docfix-btn-sm docfix-btn-save"
          >
            <i className="bi bi-save me-1"></i>
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

// Enhanced Medical Prescription Modal Component
const SummaryModal = ({ show, onHide, appointmentData, onCompleteWithoutPrint, prescriptionData }) => {
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  const [customTheme, setCustomTheme] = useState({
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#dc2626',
    info: '#0891b2',
    text: '#1e293b',
    light: '#f8fafc'
  });
  const [showCustomTheme, setShowCustomTheme] = useState(false);

  // Use prescriptionData passed from CompleteModal
  const prescriptionDataState = {
    doctorName: "Dr. Onkar Bhave",
    doctorQualifications: "M.B.B.S., M.D., M.S.",
    registrationNo: "270988",
    mobileNo: "8983390126",
    clinicName: "Care Clinic",
    clinicAddress: "Near Axis Bank, Kothrud, Pune - 411038",
    clinicPhone: "094233 80390",
    clinicTiming: "09:00 AM - 02:00 PM",
    clinicClosed: "Thursday",

    // Dynamic data from CompleteModal
    patientId: prescriptionData?.patientId || "N/A",
    patientName: prescriptionData?.patientName || "Patient",
    patientGender: prescriptionData?.patientGender || "N/A",
    patientAddress: prescriptionData?.patientAddress || "Not provided",
    patientAge: prescriptionData?.patientAge || "N/A",
    temperature: prescriptionData?.temperature || "36",
    bloodPressure: prescriptionData?.bloodPressure || "120/80 mmHg",
    diagnosis: prescriptionData?.diagnosis || "Sample diagnosis text",
    medicines: prescriptionData?.medicines || [
      {
        name: "TAB. DEMO MEDICINE 1",
        dosage: "1 Morning, 1 Night (Before Food)",
        duration: "10 Days (Tot:20 Tab)"
      },
      {
        name: "SYR. COUGH SYRUP",
        dosage: "2 tsp (10ml) After Lunch & Dinner",
        duration: "7 Days"
      }
    ],
    advice: prescriptionData?.advice || "AVOID OILY AND SPICY FOOD. DRINK PLENTY OF WATER. TAKE PROPER REST.",
    followUpDate: prescriptionData?.formattedFollowUpDate || "",
    additionalNotes: prescriptionData?.additionalNotes || "Return if symptoms persist or worsen."
  };

  if (!appointmentData) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setShowCustomTheme(false);
  };

  const handleCustomThemeChange = (field, value) => {
    setCustomTheme(prev => ({ ...prev, [field]: value }));
  };

  const applyCustomTheme = () => {
    const customThemeObj = {
      id: 'custom-theme',
      name: 'Custom Theme',
      colors: customTheme
    };
    setSelectedTheme(customThemeObj);
    setShowCustomTheme(false);
  };

  const currentTheme = selectedTheme.id === 'custom-theme' ? selectedTheme : selectedTheme;

  const handleDownloadPdf = async () => {
    try {
      const element = document.getElementById('docfix-printable-prescription');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `prescription_${prescriptionDataState.patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      className="docfix-summary-modal"
    >
      <Modal.Header closeButton style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`
      }} className="docfix-prescription-header">
        <div className="d-flex flex-column flex-md-row align-items-center w-100 gap-3 docfix-prescription-header-content">
          <div className="d-none d-md-flex align-items-center">
            <div className="bg-white rounded p-2 me-3 docfix-prescription-icon">
              <i className="bi bi-prescription2 docfix-fs-4" style={{ color: currentTheme.colors.primary }}></i>
            </div>
          </div>

          <Modal.Title className="text-white text-center text-md-start flex-grow-1 docfix-prescription-title">
            <h5 className="mb-0 docfix-modal-title">Medical Prescription</h5>
            <small className="opacity-75">Review and Print Prescription</small>
          </Modal.Title>

          <div className="mt-2 mt-md-0 docfix-theme-dropdown-container">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="d-flex align-items-center docfix-theme-toggle docfix-btn-sm"
              >
                <i className="bi bi-palette me-1"></i>
                <span className="d-none d-md-inline">Theme</span>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '400px', overflowY: 'auto' }} className="docfix-theme-dropdown">
                <div className="p-3">
                  <h6 className="mb-3">Select Theme</h6>

                  <div className="mb-3">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowCustomTheme(!showCustomTheme)}
                      className="w-100 mb-2 docfix-btn-sm"
                    >
                      <i className="bi bi-sliders me-2"></i>
                      {showCustomTheme ? 'Hide Custom Colors' : 'Custom Colors'}
                    </Button>

                    {showCustomTheme && (
                      <div className="border p-3 rounded docfix-custom-theme">
                        <h6 className="mb-2">Custom Theme Colors</h6>
                        <div className="row g-2 mb-2">
                          {Object.keys(customTheme).map(colorKey => (
                            <div className="col-6" key={colorKey}>
                              <Form.Group>
                                <Form.Label className="small text-capitalize mb-1">
                                  {colorKey.replace(/([A-Z])/g, ' $1')}
                                </Form.Label>
                                <div className="input-group input-group-sm">
                                  <Form.Control
                                    type="color"
                                    value={customTheme[colorKey]}
                                    onChange={(e) => handleCustomThemeChange(colorKey, e.target.value)}
                                    className="p-0 border-0 docfix-color-picker"
                                  />
                                  <Form.Control
                                    type="text"
                                    value={customTheme[colorKey]}
                                    onChange={(e) => handleCustomThemeChange(colorKey, e.target.value)}
                                    className="small docfix-color-input"
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={applyCustomTheme}
                          className="w-100 docfix-btn-sm"
                        >
                          Apply Custom Theme
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-wrap gap-2 docfix-theme-options">
                    {COLOR_THEMES.map(theme => (
                      <div
                        key={theme.id}
                        className={`border rounded p-2 cursor-pointer docfix-theme-option ${selectedTheme.id === theme.id ? 'border-primary' : ''}`}
                        onClick={() => handleThemeChange(theme)}
                        style={{ width: '80px' }}
                      >
                        <div className="d-flex mb-1">
                          <div style={{
                            backgroundColor: theme.colors.primary,
                            width: '20px',
                            height: '20px',
                            borderTopLeftRadius: '4px'
                          }}></div>
                          <div style={{
                            backgroundColor: theme.colors.secondary,
                            width: '20px',
                            height: '20px'
                          }}></div>
                          <div style={{
                            backgroundColor: theme.colors.accent,
                            width: '20px',
                            height: '20px',
                            borderTopRightRadius: '4px'
                          }}></div>
                        </div>
                        <div className="small text-center">{theme.name.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0 docfix-prescription-body">
        <div id="docfix-printable-prescription">
          {/* Prescription Header */}
          <div className="docfix-prescription-header-section">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start border-bottom pb-3 mb-3 px-4 pt-4 docfix-doctor-clinic-info">
              <div className="docfix-doctor-info mb-3 mb-md-0">
                <h1 className="docfix-doctor-name mb-1" style={{ color: currentTheme.colors.primary, fontSize: '1.75rem' }}>
                  {prescriptionDataState.doctorName}
                </h1>
                <div className="docfix-doctor-qualifications" style={{ color: currentTheme.colors.secondary }}>
                  {prescriptionDataState.doctorQualifications}
                </div>
                <div className="docfix-doctor-registration mt-1">
                  <span className="docfix-reg-label" style={{ color: currentTheme.colors.text + '99' }}>Reg. No:</span>
                  <span className="docfix-reg-value ms-1" style={{ color: currentTheme.colors.text }}>
                    {prescriptionDataState.registrationNo}
                  </span>
                </div>
                <div className="docfix-doctor-mobile">
                  <span className="docfix-mobile-label" style={{ color: currentTheme.colors.text + '99' }}>Mob. No:</span>
                  <span className="docfix-mobile-value ms-1" style={{ color: currentTheme.colors.text }}>
                    {prescriptionDataState.mobileNo}
                  </span>
                </div>
              </div>

              <div className="docfix-clinic-info text-start text-md-end">
                <h3 className="docfix-clinic-name mb-1" style={{ color: currentTheme.colors.primary }}>
                  {prescriptionDataState.clinicName}
                </h3>
                <div className="docfix-clinic-address mb-1" style={{ color: currentTheme.colors.text }}>
                  <i className="bi bi-geo-alt me-1" style={{ color: currentTheme.colors.secondary }}></i>
                  {prescriptionDataState.clinicAddress}
                </div>
                <div className="docfix-clinic-contact">
                  <span className="docfix-phone-label" style={{ color: currentTheme.colors.text + '99' }}>Ph:</span>
                  <span className="docfix-phone-value ms-1" style={{ color: currentTheme.colors.text }}>
                    {prescriptionDataState.clinicPhone}
                  </span>
                </div>
                <div className="docfix-clinic-timing">
                  <span className="docfix-timing-label" style={{ color: currentTheme.colors.text + '99' }}>Timing:</span>
                  <span className="docfix-timing-value ms-1" style={{ color: currentTheme.colors.text }}>
                    {prescriptionDataState.clinicTiming}
                  </span>
                </div>
                <div className="docfix-clinic-closed">
                  <span className="docfix-closed-label" style={{ color: currentTheme.colors.text + '99' }}>Closed:</span>
                  <span className="docfix-closed-value ms-1" style={{ color: currentTheme.colors.danger }}>
                    {prescriptionDataState.clinicClosed}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="docfix-patient-section mb-4 px-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start border-bottom pb-2 mb-3 docfix-patient-header">
              <div className="docfix-patient-id mb-2 mb-md-0">
                <span className="docfix-id-label fw-bold" style={{ color: currentTheme.colors.primary }}>
                  ID: {prescriptionDataState.patientId} -
                </span>
                <span className="docfix-patient-name ms-1 fw-bold" style={{ color: currentTheme.colors.text }}>
                  {prescriptionDataState.patientName} ({prescriptionDataState.patientGender}, {prescriptionDataState.patientAge}y)
                </span>
              </div>
              <div className="docfix-prescription-date">
                <span className="docfix-date-label small" style={{ color: currentTheme.colors.secondary }}>
                  <i className="bi bi-calendar me-1"></i>
                  {formatDate(new Date())}
                </span>
              </div>
            </div>

            {/* Diagnosis Section */}
            {prescriptionDataState.diagnosis && (
              <div className="docfix-diagnosis-section mb-3 p-3 border rounded" style={{ backgroundColor: `${currentTheme.colors.info}15` }}>
                <h6 className="mb-2" style={{ color: currentTheme.colors.info }}>
                  <i className="bi bi-clipboard-check me-2"></i>
                  Diagnosis:
                </h6>
                <div style={{ color: currentTheme.colors.text }}>
                  {prescriptionDataState.diagnosis}
                </div>
              </div>
            )}

            <div className="docfix-patient-details">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex align-items-center mb-2">
                    <span className="docfix-detail-label me-2" style={{ color: currentTheme.colors.text }}>
                      <i className="bi bi-house me-1"></i>
                      Address:
                    </span>
                    <span className="docfix-detail-value" style={{ color: currentTheme.colors.primary }}>
                      {prescriptionDataState.patientAddress}
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-2">
                    <span className="docfix-detail-label me-2" style={{ color: currentTheme.colors.text }}>
                      <i className="bi bi-thermometer me-1"></i>
                      Temp (deg):
                    </span>
                    <span className="docfix-detail-value fw-bold me-3" style={{ color: currentTheme.colors.danger }}>
                      {prescriptionDataState.temperature}
                    </span>
                    <span className="docfix-detail-label me-2" style={{ color: currentTheme.colors.text }}>
                      <i className="bi bi-heart-pulse me-1"></i>
                      BP:
                    </span>
                    <span className="docfix-detail-value fw-bold" style={{ color: currentTheme.colors.danger }}>
                      {prescriptionDataState.bloodPressure}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medicines Table */}
          <div className="docfix-medicines-section mb-4 px-4">
            <div className="docfix-table-header mb-3">
              <h5 className="docfix-section-title mb-0" style={{ color: currentTheme.colors.primary }}>
                <i className="bi bi-capsule me-2"></i>
                Prescribed Medicines
              </h5>
            </div>

            <div className="table-responsive">
              <table className="docfix-medicine-table table table-bordered mb-0">
                <thead>
                  <tr style={{
                    backgroundColor: `${currentTheme.colors.primary}15`,
                    color: currentTheme.colors.primary
                  }}>
                    <th className="docfix-medicine-name text-center py-3" style={{ width: '5%' }}>#</th>
                    <th className="docfix-medicine-name py-3" style={{ width: '40%' }}>Medicine Name</th>
                    <th className="docfix-medicine-dosage py-3" style={{ width: '40%' }}>Dosage</th>
                    <th className="docfix-medicine-duration py-3" style={{ width: '15%' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionDataState.medicines.map((medicine, index) => (
                    <tr key={index} className="docfix-medicine-row">
                      <td className="docfix-medicine-name-cell text-center align-middle">
                        <span className="docfix-medicine-number" style={{
                          backgroundColor: currentTheme.colors.primary,
                          color: 'white',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="docfix-medicine-name-cell align-middle">
                        <span className="docfix-medicine-text" style={{ color: currentTheme.colors.text }}>
                          {medicine.name}
                        </span>
                      </td>
                      <td className="docfix-medicine-dosage-cell align-middle" style={{ color: currentTheme.colors.text }}>
                        {medicine.dosage}
                      </td>
                      <td className="docfix-medicine-duration-cell align-middle" style={{ color: currentTheme.colors.text }}>
                        {medicine.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice Section */}
          <div className="docfix-advice-section mb-4 px-4">
            <div className="border-start border-3 ps-3" style={{ borderColor: currentTheme.colors.warning }}>
              <h6 className="docfix-advice-title mb-2" style={{ color: currentTheme.colors.warning }}>
                <i className="bi bi-exclamation-triangle me-2"></i>
                Advice Given:
              </h6>
              <div className="docfix-advice-content" style={{ color: currentTheme.colors.text }}>
                <strong>* {prescriptionDataState.advice}</strong>
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          {prescriptionDataState.additionalNotes && (
            <div className="docfix-notes-section mb-4 px-4">
              <div className="border-start border-3 ps-3" style={{ borderColor: currentTheme.colors.info }}>
                <h6 className="docfix-notes-title mb-2" style={{ color: currentTheme.colors.info }}>
                  <i className="bi bi-sticky me-2"></i>
                  Additional Notes:
                </h6>
                <div className="docfix-notes-content" style={{ color: currentTheme.colors.text }}>
                  {prescriptionDataState.additionalNotes}
                </div>
              </div>
            </div>
          )}

          {/* Follow-up Section */}
          {prescriptionDataState.followUpDate && (
            <div className="docfix-followup-section mb-4 px-4">
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between border-top pt-3">
                <div className="docfix-followup-info mb-3 mb-md-0">
                  <h6 className="docfix-followup-title mb-1" style={{ color: currentTheme.colors.info }}>
                    <i className="bi bi-calendar-check me-2"></i>
                    Follow Up Appointment
                  </h6>
                  <div className="docfix-followup-date" style={{ color: currentTheme.colors.danger, fontWeight: 'bold' }}>
                    {prescriptionDataState.followUpDate}
                  </div>
                </div>
                <div className="docfix-doctor-signature text-center">
                  <div className="docfix-signature-line mb-2" style={{
                    borderBottom: `2px solid ${currentTheme.colors.text}`,
                    width: '180px'
                  }}></div>
                  <div className="docfix-signature-name" style={{ color: currentTheme.colors.primary, fontWeight: 'bold' }}>
                    {prescriptionDataState.doctorName}
                  </div>
                  <div className="docfix-signature-title small" style={{ color: currentTheme.colors.secondary }}>
                    {prescriptionDataState.doctorQualifications}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Notes */}
          <div className="docfix-footer-section mt-4 pt-3 border-top px-4">
            <div className="row">
              <div className="col-md-8">
                <div className="docfix-footer-note small" style={{ color: currentTheme.colors.text + '80' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  This is a digital prescription. Please keep it for your records and follow the instructions carefully.
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="docfix-print-info small" style={{ color: currentTheme.colors.text + '80' }}>
                  <i className="bi bi-clock me-1"></i>
                  Generated on: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {formatDate(new Date())}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="docfix-prescription-footer">
        <div className="d-flex flex-column flex-md-row justify-content-between w-100 align-items-center gap-3">
          <div>
            <small className="docfix-text-muted">
              <i className="bi bi-prescription2 me-1"></i>
              Medical Prescription Summary
            </small>
          </div>
          <div className="d-flex gap-2 flex-wrap justify-content-center docfix-prescription-buttons">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              size="sm"
              className="docfix-btn-sm docfix-btn-close"
            >
              <i className="bi bi-x-circle me-1"></i>
              Close
            </Button>
            <Button
              variant="success"
              onClick={onCompleteWithoutPrint}
              size="sm"
              className="docfix-btn-sm docfix-btn-complete"
            >
              <i className="bi bi-check-circle me-1"></i>
              Mark as Complete
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleDownloadPdf}
              size="sm"
              className="docfix-btn-sm docfix-btn-download"
            >
              <i className="bi bi-file-earmark-pdf me-1"></i>
              Download PDF
            </Button>
            <Button
              variant="primary"
              onClick={handlePrint}
              size="sm"
              className="docfix-btn-sm docfix-btn-print"
            >
              <i className="bi bi-printer me-1"></i>
              Print Prescription
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [lastCompletedAppointment, setLastCompletedAppointment] = useState(null);
  const [lastPrescriptionData, setLastPrescriptionData] = useState(null);
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

  // Break start
  const handleBreak = () => {
    const minutes =
      Number(customBreakMin) > 0
        ? Number(customBreakMin)
        : Number(selectedBreakMin);

    if (!minutes || minutes <= 0) return;

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
    setLastPrescriptionData(formData);
    setActiveSession(null);
    setShowCompleteModal(false);
    setShowSummaryModal(true);
  };

  // Edit completed appointment
  const handleEditCompleted = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditModal(true);
  };

  // Save edited appointment
  const saveEditedAppointment = (formData) => {
    if (!editingAppointment) return;

    setCompleted((prev) =>
      prev.map((appt) =>
        appt.id === editingAppointment.id
          ? {
            ...appt,
            diagnosis: formData.diagnosis,
            medicine: formData.medicine,
            advice: formData.advice,
            additionalNotes: formData.additionalNotes,
            followUpRequired: formData.followUpRequired,
            followUpDate: formData.followUpDate
          }
          : appt
      )
    );

    setShowEditModal(false);
    setEditingAppointment(null);
  };

  // Complete without printing
  const handleCompleteWithoutPrint = () => {
    setShowSummaryModal(false);
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

  const getBreakProgress = () => {
    if (!activeSession || !activeSession.breakDurationMs) return 0;
    const remaining = getBreakRemainingMs();
    const progress = ((activeSession.breakDurationMs - remaining) / activeSession.breakDurationMs) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const activeAppt = activeSession?.appt || null;
  const elapsedMs = computeElapsedMs();
  const breakRemainingMs = getBreakRemainingMs();
  const breakProgress = getBreakProgress();

  const StatusBadge = ({ status }) => {
    if (status === "pending") return <Badge bg="danger" className="docfix-badge">Pending</Badge>;
    if (status === "in-progress") return <Badge bg="primary" className="docfix-badge">In Progress</Badge>;
    if (status === "completed") return <Badge bg="success" className="docfix-badge">Completed</Badge>;
    return <Badge bg="secondary" className="docfix-badge">{status}</Badge>;
  };

  return (
    <Container fluid className="docfix-container">
      {/* HEADER */}
      <div className="docfix-header">
        <h2 className="docfix-title">
          Doctor Dashboard
        </h2>
        <div className="docfix-date-time">
          <div className="docfix-date">
            {new Date(now).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="docfix-time">
            {new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </div>

      {/* BREAK CONTROLS */}
      <Card className="docfix-card docfix-break-controls">
        <Card.Body className="docfix-card-body">
          <h5 className="docfix-card-title">
            <i className="bi bi-cup-hot me-2"></i>
            Break Controls
          </h5>
          <div className="docfix-break-controls-content">
            <Form.Select
              size="sm"
              value={selectedBreakMin}
              onChange={(e) => setSelectedBreakMin(Number(e.target.value))}
              className="docfix-break-select"
            >
              {BREAK_OPTIONS_MIN.map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </Form.Select>

            <InputGroup size="sm" className="docfix-custom-break-input">
              <FormControl
                placeholder="Custom minutes"
                value={customBreakMin}
                onChange={(e) =>
                  setCustomBreakMin(e.target.value.replace(/\D/g, ""))
                }
                className="docfix-form-control"
              />

            </InputGroup>

            <div className="docfix-break-buttons">
              <Button
                variant="info"
                onClick={handleBreak}
                className="docfix-btn docfix-btn-break"
                disabled={!selectedBreakMin && !customBreakMin}
              >
                <i className="bi bi-cup-hot me-1"></i>
                <span className="docfix-btn-text">Take Break</span>
              </Button>

              <Button
                variant={activeSession?.status === "paused" ? "success" : "warning"}
                onClick={handlePause}
                disabled={!activeSession?.appt || activeSession?.status === "break"}
                className="docfix-btn docfix-btn-pause"
              >
                {activeSession?.status === "paused" ? (
                  <>
                    <i className="bi bi-play-circle me-1"></i>
                    <span className="docfix-btn-text">Resume</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-pause-circle me-1"></i>
                    <span className="docfix-btn-text">Pause</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="docfix-btn-sm docfix-btn-end-break"
                onClick={handleEndBreakAndResume}
              >
                <i className="bi bi-stop-circle me-1"></i>
                End Break Early
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* ACTIVE SESSION CARD */}
      {activeSession && activeSession.appt ? (
        <Card className="docfix-card docfix-active-session">
          <Card.Body className="docfix-card-body">
            <div className="docfix-active-session-content">
              <div className="docfix-patient-avatar-section">
                <div className="docfix-patient-avatar">
                  {activeAppt.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="docfix-patient-info">
                  <div className="docfix-patient-title">Currently with</div>
                  <h5 className="docfix-patient-name">
                    {activeAppt.name}
                    <small className="docfix-patient-gender">({activeAppt.gender})</small>
                  </h5>
                  <div className="docfix-patient-issue">
                    <Badge bg="light" text="dark" className="docfix-badge">
                      <i className="bi bi-clipboard-plus me-1"></i>
                      {activeAppt.issue}
                    </Badge>
                  </div>

                  <div className="docfix-patient-vitals">
                    <Badge bg="info" className="docfix-badge">
                      <i className="bi bi-heart me-1"></i>
                      BP: {activeAppt.bp || 'N/A'}
                    </Badge>
                    <Badge bg="info" className="docfix-badge">
                      <i className="bi bi-droplet me-1"></i>
                      BG: {activeAppt.bloodGroup || 'N/A'}
                    </Badge>
                    <Badge bg="info" className="docfix-badge">
                      <i className="bi bi-person me-1"></i>
                      ID: {activeAppt.patientId || 'N/A'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="docfix-session-stats">
                <div className="docfix-session-stat">
                  <div className="docfix-stat-label">Started</div>
                  <div className="docfix-stat-value">
                    {formatTimeOfDay(activeSession.startTime)}
                  </div>
                </div>

                <div className="docfix-session-stat">
                  <div className="docfix-stat-label">Elapsed</div>
                  <div className="docfix-stat-value docfix-elapsed-time">
                    {formatDuration(elapsedMs)}
                  </div>
                </div>

                <div className="docfix-session-stat">
                  <div className="docfix-stat-label">Status</div>
                  <div>
                    {activeSession.status === "started" && (
                      <Badge bg="success" className="docfix-badge">
                        <Spinner animation="border" size="sm" className="me-1" />
                        Active
                      </Badge>
                    )}
                    {activeSession.status === "paused" && (
                      <Badge bg="warning" className="docfix-badge">
                        <i className="bi bi-pause me-1"></i>
                        Paused
                      </Badge>
                    )}
                    {activeSession.status === "break" && (
                      <Badge bg="info" className="docfix-badge">
                        <i className="bi bi-cup-hot me-1"></i>
                        On Break
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="docfix-session-actions">
                <div className="docfix-action-buttons">
                  <Button
                    variant="primary"
                    onClick={handleChecked}
                    className="docfix-btn docfix-btn-checked"
                    disabled={activeSession.status === "break"}
                  >
                    <i className="bi bi-clipboard-check me-1"></i>
                    <span className="docfix-btn-text">Checked</span>
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCompleteNow}
                    className="docfix-btn docfix-btn-complete"
                    disabled={activeSession.status === "break"}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    <span className="docfix-btn-text">Complete</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : activeSession?.status === "break" ? (
        <Card className="docfix-card docfix-on-break">
          <Card.Body className="docfix-card-body">
            <div className="docfix-break-status">
             
              <i className="bi bi-cup-hot docfix-break-icon"></i>
              <div className="docfix-break-message">Currently on break</div>
              <h5 className="docfix-break-subtitle">
                No active patient appointment
              </h5>
               <div className="docfix-break-time mb-2">
                  {formatDuration(breakRemainingMs)}
                </div>
              
            </div>
          </Card.Body>
        </Card>
      ) : null}

      {/* TODAY'S APPOINTMENTS TABLE */}
      <Card className="docfix-card docfix-appointments-card">
        <Card.Body className="docfix-card-body">
          <div className="docfix-table-header">
            <h5 className="docfix-card-title">
              <i className="bi bi-calendar-check me-2"></i>
              Today's Appointments
            </h5>
            <Badge bg="secondary" className="docfix-badge docfix-appointment-count">
              {appointments.length} appointments
            </Badge>
          </div>

          <div className="table-responsive docfix-table-responsive">
            <Table hover className="docfix-table docfix-appointments-table">
              <thead className="docfix-table-head">
                <tr>
                  <th className="docfix-table-th d-md-table-cell">#</th>
                  <th className="docfix-table-th">Patient</th>
                  <th className="docfix-table-th d-md-table-cell">Gender</th>
                  <th className="docfix-table-th  d-lg-table-cell">Issue</th>
                  <th className="docfix-table-th d-lg-table-cell">Phone</th>
                  <th className="docfix-table-th  d-lg-table-cell">BP</th>
                  <th className="docfix-table-th  d-lg-table-cell">BG</th>
                  <th className="docfix-table-th">Time</th>
                  <th className="docfix-table-th">Status</th>
                  <th className="docfix-table-th">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a, idx) => (
                  <tr key={a.id} className="docfix-table-row">
                    <td className="docfix-table-td d-md-table-cell" data-label="No.">
                      <span className="docfix-table-index">
                        {idx + 1}
                      </span>
                    </td>
                    <td className="docfix-table-td" data-label="Patient">
                      <div className="docfix-patient-cell">
                        <div className="docfix-table-avatar">
                          {a.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="docfix-patient-details">
                          <div className="docfix-patient-name">{a.name}</div>
                          <div className="d-block d-lg-none docfix-patient-mobile">
                            {a.issue}
                          </div>
                          <div className="d-block d-lg-none docfix-patient-phone">
                            <i className="bi bi-telephone me-1"></i>
                            {a.phone}
                          </div>
                          <div className="d-block d-lg-none">
                            <small className="text-muted">ID: {a.patientId}</small>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="docfix-table-td d-md-table-cell" data-label="Gender">
                      <Badge bg={a.gender === "Male" ? "primary" : "danger"} className="docfix-badge">
                        {a.gender}
                      </Badge>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Issue">
                      <div className="docfix-table-issue">
                        {a.issue}
                      </div>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Phone">
                      <a href={`tel:${a.phone}`} className="docfix-phone-link">
                        <i className="bi bi-telephone me-1"></i>
                        {a.phone}
                      </a>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Blood pressure">
                      <Badge bg="info" className="docfix-badge">
                        {a.bp || 'N/A'}
                      </Badge>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Blood group">
                      <Badge bg="danger" className="docfix-badge">
                        {a.bloodGroup || 'N/A'}
                      </Badge>
                    </td>
                    <td className="docfix-table-td" data-label="Time">
                      <div className="docfix-time-cell">
                        <i className="bi bi-clock me-1"></i>
                        {a.scheduledTime}
                      </div>
                    </td>
                    <td className="docfix-table-td" data-label="Status">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="docfix-table-td" data-label="Action">
                      {(!activeSession?.appt || activeSession?.appt?.id === a.id) &&
                        a.status === "pending" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleConsentClick(a)}
                            disabled={activeSession?.status === "break"}
                            className="docfix-btn-sm docfix-btn-consult"
                          >
                            <i className="bi bi-person-check me-1"></i>
                            <span className="d-none d-md-inline">Start</span>
                            <span className="d-md-none">Start</span>
                          </Button>
                        )}

                      {activeSession?.appt?.id === a.id &&
                        a.status === "in-progress" && (
                          <Badge bg="info" className="docfix-badge">
                            <Spinner animation="border" size="sm" className="me-1" />
                            Active
                          </Badge>
                        )}
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="10" className="docfix-empty-state">
                      <div>
                        <i className="bi bi-check-circle-fill docfix-empty-icon"></i>
                        <h6 className="docfix-empty-title">All appointments completed</h6>
                        <p className="docfix-empty-text">No pending appointments for today</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* COMPLETED APPOINTMENTS TABLE */}
      <Card className="docfix-card docfix-completed-card">
        <Card.Body className="docfix-card-body">
          <div className="docfix-table-header">
            <h5 className="docfix-card-title">
              <i className="bi bi-check-circle me-2"></i>
              Completed Appointments
            </h5>
            <Badge bg="success" className="docfix-badge docfix-completed-count">
              {completed.length} completed
            </Badge>
          </div>

          <div className="table-responsive docfix-table-responsive">
            <Table hover className="docfix-table docfix-completed-table">
              <thead className="docfix-table-head">
                <tr>
                  <th className="docfix-table-th d-md-table-cell">#</th>
                  <th className="docfix-table-th">Patient</th>
                  <th className="docfix-table-th  d-md-table-cell">Gender</th>
                  <th className="docfix-table-th d-lg-table-cell">Issue</th>
                  <th className="docfix-table-th d-lg-table-cell">Phone</th>
                  <th className="docfix-table-th">Duration</th>
                  <th className="docfix-table-th d-lg-table-cell">Diagnosis</th>
                  <th className="docfix-table-th  d-xl-table-cell">Medicine</th>
                  <th className="docfix-table-th d-xl-table-cell">Advice</th>
                  <th className="docfix-table-th">Follow-up</th>
                  <th className="docfix-table-th">Edit</th>
                </tr>
              </thead>

              <tbody>
                {completed.map((c, i) => (
                  <tr key={c.id} className="docfix-table-row">
                    <td className="docfix-table-td d-md-table-cell" data-label="No.">
                      <span className="docfix-table-index">
                        {i + 1}
                      </span>
                    </td>
                    <td className="docfix-table-td" data-label="Patient">
                      <div className="docfix-patient-cell">
                        <div className="docfix-table-avatar docfix-avatar-completed">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="docfix-patient-details">
                          <div className="docfix-patient-name">{c.name}</div>
                          <div className="docfix-completed-time">
                            {formatTimeOfDay(c.endTime)}
                          </div>
                          <div className="d-block d-lg-none docfix-diagnosis-mobile">
                            {c.diagnosis.substring(0, 30)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="docfix-table-td d-md-table-cell" data-label="Gender">
                      <Badge bg={c.gender === "Male" ? "primary" : "danger"} className="docfix-badge">
                        {c.gender}
                      </Badge>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Issue">
                      <div className="docfix-table-issue">
                        {c.issue}
                      </div>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Phone">
                      <a href={`tel:${c.phone}`} className="docfix-phone-link">
                        <i className="bi bi-telephone me-1"></i>
                        {c.phone}
                      </a>
                    </td>
                    <td className="docfix-table-td" data-label="Duration">
                      <Badge bg="info" className="docfix-badge docfix-duration-badge">
                        {formatDuration(c.durationMs)}
                      </Badge>
                    </td>
                    <td className="docfix-table-td d-lg-table-cell" data-label="Diagnosis">
                      <div className="docfix-table-diagnosis">
                        {c.diagnosis}
                      </div>
                    </td>
                    <td className="docfix-table-td d-xl-table-cell" data-label="Medicine">
                      <div className="docfix-table-medicine">
                        {c.medicine}
                      </div>
                    </td>
                    <td className="docfix-table-td d-xl-table-cell" data-label="Advice">
                      <div className="docfix-table-advice">
                        {c.advice}
                      </div>
                    </td>
                    <td className="docfix-table-td" data-label="Follow-up">
                      {c.followUpRequired && c.followUpDate ? (
                        <Badge bg="warning" className="docfix-badge docfix-followup-badge">
                          <i className="bi bi-calendar-check me-1"></i>
                          <span className="d-none d-md-inline">
                            {new Date(c.followUpDate).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </span>
                          <span className="d-md-none">Yes</span>
                        </Badge>
                      ) : (
                        <span className="docfix-no-followup">No</span>
                      )}
                    </td>
                    <td className="docfix-table-td" data-label="Edit">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditCompleted(c)}
                        className="docfix-btn-sm docfix-btn-edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    </td>
                  </tr>
                ))}

                {completed.length === 0 && (
                  <tr>
                    <td colSpan="11" className="docfix-empty-state">
                      <div>
                        <i className="bi bi-calendar-x docfix-empty-icon"></i>
                        <h6 className="docfix-empty-title">No completed appointments</h6>
                        <p className="docfix-empty-text">Completed appointments will appear here</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* CONSENT MODAL */}
      <Modal
        show={showConsentModal}
        onHide={() => setShowConsentModal(false)}
        centered
        size="lg"
        className="docfix-consent-modal"
      >
        <Modal.Header closeButton className="docfix-modal-header docfix-bg-primary text-white">
          <Modal.Title className="docfix-modal-title">
            <i className="bi bi-person-check me-2"></i>
            <span className="docfix-modal-title-text">Patient Consent Form</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="docfix-modal-body">
          <div className="docfix-consent-patient-info mb-4">
            <h6 className="docfix-text-primary mb-3">Patient Information</h6>
            <Row className="g-2">
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Name:</small>
                  <strong className="text-break">{selectedAppointment?.name || 'N/A'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Gender:</small>
                  <strong>{selectedAppointment?.gender || 'N/A'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Issue:</small>
                  <strong className="text-break">{selectedAppointment?.issue || 'N/A'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Scheduled:</small>
                  <strong>{selectedAppointment?.scheduledTime || 'N/A'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Phone:</small>
                  <strong className="text-break">{selectedAppointment?.phone || 'N/A'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="border rounded p-2 h-100 docfix-info-card">
                  <small className="docfix-text-muted d-block">Patient ID:</small>
                  <strong>{selectedAppointment?.patientId || 'N/A'}</strong>
                </div>
              </Col>
            </Row>
          </div>

          <div className="docfix-consent-vitals mb-4">
            <h6 className="docfix-text-primary mb-3">Patient Vitals</h6>
            <Row className="g-2">
              <Col xs={12} md={6}>
                <div className="border rounded p-3 text-center docfix-vital-card">
                  <small className="docfix-text-muted d-block">Blood Pressure</small>
                  <strong className="docfix-vital-value">{selectedAppointment?.bp || 'Not recorded'}</strong>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="border rounded p-3 text-center docfix-vital-card">
                  <small className="docfix-text-muted d-block">Blood Group</small>
                  <strong className="docfix-vital-value">{selectedAppointment?.bloodGroup || 'Not recorded'}</strong>
                </div>
              </Col>
            </Row>
          </div>

          <div className="docfix-consent-agreement">
            <h6 className="docfix-text-primary mb-3">Agreement</h6>
            <div className="border rounded p-3 bg-light docfix-agreement-box">
              <div className="d-flex align-items-start mb-2">
                <i className="bi bi-check-circle text-success me-2 mt-1"></i>
                <span>I confirm that I have reviewed the patient's information and vitals.</span>
              </div>
              <div className="d-flex align-items-start mb-2">
                <i className="bi bi-check-circle text-success me-2 mt-1"></i>
                <span>I understand that starting will begin tracking consultation time.</span>
              </div>
              <div className="d-flex align-items-start mb-2">
                <i className="bi bi-check-circle text-success me-2 mt-1"></i>
                <span>I acknowledge my responsibility for providing appropriate medical care.</span>
              </div>
              <div className="d-flex align-items-start mb-2">
                <i className="bi bi-check-circle text-success me-2 mt-1"></i>
                <span>I confirm I will maintain patient confidentiality.</span>
              </div>
              <div className="d-flex align-items-start mb-0">
                <i className="bi bi-info-circle text-primary me-2 mt-1"></i>
                <span>Click "Start Consultation" to begin consultation.</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="docfix-modal-footer">
          <Button
            variant="outline-secondary"
            onClick={() => setShowConsentModal(false)}
            className="docfix-btn docfix-btn-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStartFromConsent}
            className="docfix-btn docfix-btn-start"
          >
            <i className="bi bi-play-circle me-2"></i>
            Start Consultation
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
        patientData={activeAppt}
      />

      {/* EDIT MODAL */}
      <EditCompletedModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        appointment={editingAppointment}
        onSave={saveEditedAppointment}
      />

      {/* SUMMARY MODAL */}
      <SummaryModal
        show={showSummaryModal}
        onHide={() => setShowSummaryModal(false)}
        appointmentData={lastCompletedAppointment}
        onCompleteWithoutPrint={handleCompleteWithoutPrint}
        prescriptionData={lastPrescriptionData}
      />
    </Container>
  );
};

export default DoctorDashboard;
