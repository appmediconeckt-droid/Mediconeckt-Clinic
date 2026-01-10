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
  Dropdown,
} from "react-bootstrap";
import "./DoctorDashboard.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

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

// Enhanced Color Themes for PDF Generation (10+ themes)
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
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fdba74',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      info: '#0284c7',
      text: '#451a03',
      light: '#fff7ed'
    }
  },
  {
    id: 'elegant-pink',
    name: 'Elegant Pink',
    colors: {
      primary: '#be185d',
      secondary: '#db2777',
      accent: '#f472b6',
      success: '#059669',
      warning: '#d97706',
      danger: '#be123c',
      info: '#0d9488',
      text: '#500724',
      light: '#fdf2f8'
    }
  },
  {
    id: 'corporate-gray',
    name: 'Corporate Gray',
    colors: {
      primary: '#4b5563',
      secondary: '#6b7280',
      accent: '#9ca3af',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
      text: '#1f2937',
      light: '#f9fafb'
    }
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    colors: {
      primary: '#0d9488',
      secondary: '#14b8a6',
      accent: '#5eead4',
      success: '#0d9488',
      warning: '#eab308',
      danger: '#ef4444',
      info: '#0ea5e9',
      text: '#134e4a',
      light: '#f0fdfa'
    }
  },
  {
    id: 'golden-yellow',
    name: 'Golden Yellow',
    colors: {
      primary: '#ca8a04',
      secondary: '#eab308',
      accent: '#fde047',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      info: '#0891b2',
      text: '#451a03',
      light: '#fefce8'
    }
  },
  {
    id: 'deep-red',
    name: 'Deep Red',
    colors: {
      primary: '#991b1b',
      secondary: '#dc2626',
      accent: '#f87171',
      success: '#059669',
      warning: '#d97706',
      danger: '#991b1b',
      info: '#0891b2',
      text: '#450a0a',
      light: '#fef2f2'
    }
  },
  {
    id: 'vibrant-cyan',
    name: 'Vibrant Cyan',
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#67e8f9',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#0891b2',
      text: '#164e63',
      light: '#ecfeff'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#166534',
      secondary: '#16a34a',
      accent: '#4ade80',
      success: '#166534',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0d9488',
      text: '#052e16',
      light: '#f0fdf4'
    }
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    colors: {
      primary: '#1e3a8a',
      secondary: '#1d4ed8',
      accent: '#60a5fa',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#be123c',
      info: '#0d9488',
      text: '#0c1c36',
      light: '#dbeafe'
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

// CompleteModal component
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
    <Modal show={show} onHide={onHide} centered size="lg" className="dd-complete-modal">
      <Modal.Header closeButton className="dd-complete-modal-header">
        <Modal.Title className="dd-complete-modal-title">Complete Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dd-complete-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div className="dd-patient-info-summary mb-3">
          <h6 className="dd-patient-summary-title">Completing appointment for:</h6>
          <div className="dd-patient-name-display">
            <i className="bi bi-person-circle me-2"></i>
            <span className="fs-6 fw-bold">{patientName}</span>
          </div>
        </div>

        <Form>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Diagnosis <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed diagnosis..."
                  value={form.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="dd-form-control-sm dd-diagnosis-textarea"
                  required
                />
                <div className="dd-form-text text-muted mt-1">
                  Include symptoms, observations, medical findings.
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Prescribed Medicine <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter prescribed medicines..."
                  value={form.medicine}
                  onChange={(e) => handleInputChange("medicine", e.target.value)}
                  className="dd-form-control-sm dd-medicine-textarea"
                  required
                />
                <div className="dd-form-text text-muted mt-1">
                  Medicine Name - Dosage - Frequency - Duration
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Advice <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed advice..."
                  value={form.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="dd-form-control-sm dd-advice-textarea"
                  required
                />
                <div className="dd-form-text text-muted mt-1">
                  Include lifestyle recommendations and instructions.
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <div className="dd-follow-up-section p-2 border rounded">
                <Form.Group className="mb-2">
                  <Form.Check
                    type="switch"
                    id="follow-up-switch"
                    label="Schedule Follow-up Appointment"
                    checked={form.followUpRequired || false}
                    onChange={handleFollowUpToggle}
                    className="dd-follow-up-switch"
                  />
                </Form.Group>

                {form.followUpRequired && (
                  <Form.Group>
                    <Form.Label className="dd-form-label">
                      Follow-up Date <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        type="date"
                        min={minDate}
                        value={form.followUpDate || defaultFollowUpDateStr}
                        onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                        className="dd-form-control-sm dd-follow-up-date-input"
                        required={form.followUpRequired}
                      />
                      <div className="text-muted">
                        <small>Select date for follow-up</small>
                      </div>
                    </div>
                    {form.followUpDate && (
                      <div className="mt-1 text-info dd-follow-up-date-info">
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
              <div className="dd-additional-notes-section p-2 border rounded">
                <Form.Group>
                  <Form.Label className="dd-form-label">
                    Additional Notes (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Any additional observations, referrals..."
                    value={form.additionalNotes || ""}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="dd-form-control-sm dd-additional-notes-textarea"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="dd-complete-modal-footer">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="dd-form-requirements">
            <small className="text-muted">
              <i className="bi bi-exclamation-circle me-1"></i>
              Fields marked with <span className="text-danger">*</span> are required
            </small>
          </div>
          <div className="dd-modal-actions">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="dd-complete-cancel-btn me-2"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleSave}
              className="dd-complete-save-btn"
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
    <Modal show={show} onHide={onHide} centered size="lg" className="dd-edit-modal">
      <Modal.Header closeButton className="dd-edit-modal-header">
        <Modal.Title className="dd-edit-modal-title">
          <i className="bi bi-pencil-square me-2"></i>
          Edit Completed Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="dd-edit-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div className="dd-patient-info-summary mb-3">
          <h6 className="dd-patient-summary-title">Editing appointment for:</h6>
          <div className="dd-patient-name-display">
            <i className="bi bi-person-circle me-2"></i>
            <span className="fs-6 fw-bold">{appointment?.name}</span>
          </div>
          <div className="dd-patient-details">
            <small className="text-muted">
              <i className="bi bi-calendar me-1"></i>
              Completed on: {appointment?.endTime ? formatDateTime(appointment.endTime) : 'N/A'}
            </small>
          </div>
        </div>

        <Form>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Diagnosis
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed diagnosis..."
                  value={form.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="dd-form-control-sm dd-diagnosis-textarea"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Prescribed Medicine
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter prescribed medicines..."
                  value={form.medicine}
                  onChange={(e) => handleInputChange("medicine", e.target.value)}
                  className="dd-form-control-sm dd-medicine-textarea"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="dd-form-label">
                  Advice
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter detailed advice..."
                  value={form.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="dd-form-control-sm dd-advice-textarea"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <div className="dd-follow-up-section p-2 border rounded">
                <Form.Group className="mb-2">
                  <Form.Check
                    type="switch"
                    id="edit-follow-up-switch"
                    label="Schedule Follow-up Appointment"
                    checked={form.followUpRequired || false}
                    onChange={handleFollowUpToggle}
                    className="dd-follow-up-switch"
                  />
                </Form.Group>

                {form.followUpRequired && (
                  <Form.Group>
                    <Form.Label className="dd-form-label">
                      Follow-up Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={form.followUpDate}
                      onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                      className="dd-form-control-sm dd-follow-up-date-input"
                    />
                  </Form.Group>
                )}
              </div>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <div className="dd-additional-notes-section p-2 border rounded">
                <Form.Group>
                  <Form.Label className="dd-form-label">
                    Additional Notes
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Any additional observations..."
                    value={form.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    className="dd-form-control-sm dd-additional-notes-textarea"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="dd-edit-modal-footer">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          className="dd-edit-cancel-btn me-2"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="dd-edit-save-btn"
          size="sm"
        >
          <i className="bi bi-save me-1"></i>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Enhanced Summary Modal Component with Custom Theme Support
const SummaryModal = ({ show, onHide, appointmentData, onPrint, onCompleteWithoutPrint }) => {
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

  if (!appointmentData) return null;

  const doctorName = "Dr. Ramesh Kumar";
  const clinicName = "City Hospital & Medical Center";
  const clinicAddress = "Indore Saket Nagar, Madhya Pradesh 452001";
  const clinicContact = "+91 9876543210";
  const clinicEmail = "info@cityhospital.com";
  const clinicLicense = "MH-MED-2023-45678";
  const clinicMotto = "Excellence in Healthcare Since 1995";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="xl" 
      className="dd-summary-modal"
      style={{ zIndex: 1060 }}
    >
      <Modal.Header closeButton className="dd-summary-modal-header" style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`
      }}>
        <div className="d-flex align-items-center w-100">
          {/* Company Icon on Left Side */}
          <div className="dd-company-icon-container me-3">
            <div className="dd-company-icon" style={{
              width: '40px',
              height: '40px',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <i className="bi bi-hospital" style={{
                fontSize: '24px',
                color: currentTheme.colors.primary
              }}></i>
            </div>
          </div>
          
          <Modal.Title className="dd-summary-modal-title flex-grow-1">
            <i className="bi bi-file-medical me-2"></i>
            Consultation Summary
          </Modal.Title>
          
          <div className="dd-color-theme-picker">
            <Dropdown>
              <Dropdown.Toggle 
                variant="white" 
                size="sm" 
                id="theme-dropdown" 
                className="dd-theme-dropdown-toggle"
              >
                <i className="bi bi-palette me-2"></i> 
                Theme: {selectedTheme.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dd-theme-dropdown-menu" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="p-3">
                  <h6 className="mb-3 dd-theme-selector-title">Select Theme</h6>
                  
                  {/* Custom Theme Section */}
                  <div className="mb-3">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowCustomTheme(!showCustomTheme)}
                      className="w-100 mb-2"
                    >
                      <i className="bi bi-sliders me-2"></i>
                      {showCustomTheme ? 'Hide Custom Colors' : 'Custom Colors'}
                    </Button>
                    
                    {showCustomTheme && (
                      <div className="dd-custom-theme-editor border p-3 rounded">
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
                                    className="p-0 border-0"
                                  />
                                  <Form.Control
                                    type="text"
                                    value={customTheme[colorKey]}
                                    onChange={(e) => handleCustomThemeChange(colorKey, e.target.value)}
                                    className="small"
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
                          className="w-100"
                        >
                          Apply Custom Theme
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="dd-theme-grid">
                    {COLOR_THEMES.map(theme => (
                      <div 
                        key={theme.id}
                        className={`dd-theme-option ${selectedTheme.id === theme.id ? 'dd-theme-active' : ''}`}
                        onClick={() => handleThemeChange(theme)}
                      >
                        <div className="dd-theme-preview">
                          <div className="dd-theme-primary" style={{ backgroundColor: theme.colors.primary }}></div>
                          <div className="dd-theme-secondary" style={{ backgroundColor: theme.colors.secondary }}></div>
                          <div className="dd-theme-accent" style={{ backgroundColor: theme.colors.accent }}></div>
                        </div>
                        <div className="dd-theme-name">{theme.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body className="dd-summary-modal-body p-0" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div id="printable-summary" className="dd-printable-summary">
          {/* Clinic Header with Company Icon */}
          <div className="dd-clinic-header text-center mb-4 p-4">
            <div className="dd-clinic-icon mb-3">
              <div style={{
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <i className="bi bi-hospital" style={{
                  fontSize: '40px',
                  color: 'white'
                }}></i>
              </div>
            </div>
            
            <h4 className="dd-clinic-name mb-1" style={{ color: currentTheme.colors.primary }}>
              {clinicName}
            </h4>
            <p className="dd-clinic-address mb-1" style={{ color: currentTheme.colors.text }}>
              <i className="bi bi-geo-alt me-1"></i>{clinicAddress}
            </p>
            <div className="dd-clinic-contacts">
              <span className="dd-clinic-contact me-3" style={{ color: currentTheme.colors.text }}>
                <i className="bi bi-telephone me-1"></i>{clinicContact}
              </span>
              <span className="dd-clinic-email" style={{ color: currentTheme.colors.text }}>
                <i className="bi bi-envelope me-1"></i>{clinicEmail}
              </span>
            </div>
          </div>

          {/* Appointment ID Banner */}
          <div className="dd-appointment-banner mb-4 p-3" style={{ 
            background: `linear-gradient(135deg, ${currentTheme.colors.primary}15 0%, ${currentTheme.colors.secondary}15 100%)`,
            border: `2px solid ${currentTheme.colors.primary}30`,
            borderRadius: '12px'
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1" style={{ color: currentTheme.colors.primary }}>
                  <i className="bi bi-calendar-check me-2"></i>
                  Appointment ID: APPT-{appointmentData.id.toString().padStart(3, '0')}
                </h6>
                <small style={{ color: currentTheme.colors.text }}>Consultation Date: {formatDate(new Date())}</small>
              </div>
              <div className="text-end">
                <h6 className="mb-1" style={{ color: currentTheme.colors.primary }}>
                  Status: <Badge style={{ backgroundColor: currentTheme.colors.success }}>COMPLETED</Badge>
                </h6>
              </div>
            </div>
          </div>

          <div className="dd-summary-content p-4">
            {/* Patient Information */}
            <div className="dd-patient-info-section mb-4 p-4" style={{ 
              background: `linear-gradient(135deg, ${currentTheme.colors.light} 0%, ${currentTheme.colors.light}80 100%)`,
              borderRadius: '15px',
              border: `1px solid ${currentTheme.colors.primary}20`
            }}>
              <h6 className="dd-section-title mb-3" style={{ color: currentTheme.colors.primary }}>
                <i className="bi bi-person-badge me-2"></i>
                Patient Information
              </h6>
              <Row className="mb-2">
                <Col md={6}>
                  <div className="dd-info-item mb-3">
                    <span className="dd-info-label" style={{ color: currentTheme.colors.text, fontWeight: '600' }}>
                      Patient Name:
                    </span>
                    <span className="dd-info-value" style={{ color: currentTheme.colors.primary, fontWeight: '700' }}>
                      {appointmentData.name}
                    </span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="dd-info-item mb-3">
                    <span className="dd-info-label" style={{ color: currentTheme.colors.text, fontWeight: '600' }}>
                      Gender:
                    </span>
                    <Badge style={{ backgroundColor: currentTheme.colors.accent }}>
                      {appointmentData.gender}
                    </Badge>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="dd-info-item mb-3">
                    <span className="dd-info-label" style={{ color: currentTheme.colors.text, fontWeight: '600' }}>
                      Blood Group:
                    </span>
                    <Badge style={{ backgroundColor: currentTheme.colors.danger }}>
                      {appointmentData.bloodGroup}
                    </Badge>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="dd-info-item">
                    <span className="dd-info-label" style={{ color: currentTheme.colors.text, fontWeight: '600' }}>
                      Presenting Issue:
                    </span>
                    <span className="dd-info-value" style={{ color: currentTheme.colors.danger, fontWeight: '700' }}>
                      {appointmentData.issue}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Medical Information */}
            <div className="dd-medical-section mb-4">
              <h6 className="dd-section-title mb-3" style={{ color: currentTheme.colors.primary }}>
                <i className="bi bi-clipboard-check me-2"></i>
                Medical Information
              </h6>
              
              <div className="dd-medical-card p-4 mb-3" style={{ 
                background: 'white',
                borderRadius: '12px',
                border: `1px solid ${currentTheme.colors.primary}`,
                borderLeft: `5px solid ${currentTheme.colors.primary}`
              }}>
                <h6 className="dd-medical-title mb-3" style={{ color: currentTheme.colors.primary }}>
                  Diagnosis
                </h6>
                <div className="dd-medical-content" style={{ color: currentTheme.colors.text }}>
                  {appointmentData.diagnosis}
                </div>
              </div>

              <div className="dd-medical-card p-4 mb-3" style={{ 
                background: 'white',
                borderRadius: '12px',
                border: `1px solid ${currentTheme.colors.success}`,
                borderLeft: `5px solid ${currentTheme.colors.success}`
              }}>
                <h6 className="dd-medical-title mb-3" style={{ color: currentTheme.colors.success }}>
                  Prescribed Medicine
                </h6>
                <div className="dd-medical-content" style={{ color: currentTheme.colors.text }}>
                  {appointmentData.medicine}
                </div>
              </div>

              <div className="dd-medical-card p-4 mb-3" style={{ 
                background: 'white',
                borderRadius: '12px',
                border: `1px solid ${currentTheme.colors.info}`,
                borderLeft: `5px solid ${currentTheme.colors.info}`
              }}>
                <h6 className="dd-medical-title mb-3" style={{ color: currentTheme.colors.info }}>
                  Medical Advice
                </h6>
                <div className="dd-medical-content" style={{ color: currentTheme.colors.text }}>
                  {appointmentData.advice}
                </div>
              </div>

              {appointmentData.additionalNotes && (
                <div className="dd-medical-card p-4 mb-3" style={{ 
                  background: 'white',
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.colors.warning}`,
                  borderLeft: `5px solid ${currentTheme.colors.warning}`
                }}>
                  <h6 className="dd-medical-title mb-3" style={{ color: currentTheme.colors.warning }}>
                    Additional Notes
                  </h6>
                  <div className="dd-medical-content" style={{ color: currentTheme.colors.text }}>
                    {appointmentData.additionalNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Follow-up Information */}
            <div className="dd-followup-section mb-4 p-4" style={{ 
              background: `linear-gradient(135deg, ${currentTheme.colors.light}80 0%, ${currentTheme.colors.light}60 100%)`,
              borderRadius: '15px'
            }}>
              <h6 className="dd-section-title mb-3" style={{ color: currentTheme.colors.secondary }}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Follow-up Information
              </h6>
              <div className="text-center">
                {appointmentData.followUpRequired ? (
                  <div className="dd-followup-scheduled">
                    <h6 className="dd-followup-status mb-2" style={{ color: currentTheme.colors.warning }}>
                      Follow-up Scheduled
                    </h6>
                    <div className="dd-followup-date" style={{ 
                      color: currentTheme.colors.danger,
                      fontWeight: '700',
                      fontSize: '1.2rem'
                    }}>
                      {formatDate(appointmentData.followUpDate)}
                    </div>
                  </div>
                ) : (
                  <div className="dd-followup-none">
                    <h6 className="dd-followup-status mb-2" style={{ color: currentTheme.colors.secondary }}>
                      No Follow-up Required
                    </h6>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor's Signature */}
            <div className="dd-signature-section mt-4 pt-4 border-top">
              <Row className="align-items-end">
                <Col md={6}>
                  <div className="dd-signature-box p-4" style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.light} 0%, white 100%)`,
                    borderRadius: '10px'
                  }}>
                    <div className="dd-signature-line mb-3" style={{ 
                      borderBottom: `2px solid ${currentTheme.colors.text}`,
                      width: '200px'
                    }}></div>
                    <p className="dd-signature-label mb-1" style={{ 
                      color: currentTheme.colors.primary,
                      fontWeight: '700'
                    }}>
                      Dr. Ramesh Kumar
                    </p>
                    <small className="dd-signature-title" style={{ color: currentTheme.colors.text }}>
                      MBBS, MD (General Medicine)
                    </small>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="dd-summary-modal-footer">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="dd-footer-notes">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Digital consultation summary
            </small>
          </div>
          <div className="dd-footer-actions">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              className="me-2 dd-close-btn"
              size="sm"
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={onCompleteWithoutPrint}
              className="me-2 dd-complete-btn"
              size="sm"
            >
              <i className="bi bi-check-circle me-1"></i>
              Mark as Complete
            </Button>
            <Button
              variant="primary"
              onClick={() => onPrint(appointmentData, currentTheme)}
              className="dd-print-btn"
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
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

  // Break start
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

  // Print function
  const handlePrintSummary = async (appointmentData, theme) => {
    try {
      const element = document.getElementById('printable-summary');
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

      const fileName = `consultation_summary_${appointmentData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      setTimeout(() => {
        setShowSummaryModal(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
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
    <div className="dd-main-container p-3">
      {/* HEADER */}
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2 className="dd-dashboard-title">Doctor Dashboard</h2>
        <div className="dd-dashboard-time-info text-end">
          <div className="dd-current-date-display">
            {new Date(now).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="dd-current-time-display">
            {new Date(now).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* BREAK CONTROLS */}
      <div className="dd-break-controls-card card shadow-sm mb-4">
        <div className="card-body p-3">
          <h5 className="dd-break-controls-title mb-3">Break Controls</h5>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Form.Select
              size="sm"
              value={selectedBreakMin}
              onChange={(e) => setSelectedBreakMin(Number(e.target.value))}
              className="dd-break-duration-select"
              style={{ width: "120px" }}
            >
              {BREAK_OPTIONS_MIN.map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </Form.Select>

            <InputGroup size="sm" className="dd-custom-break-input-group" style={{ width: "150px" }}>
              <FormControl
                placeholder="Custom minutes"
                style={{height:"45px", marginTop:"0px"}}
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
              className="dd-take-break-btn"
            >
              <i className="bi bi-cup-hot me-1"></i>
              Take Break
            </Button>
            
            <Button
              variant={
                activeSession?.status === "paused" ? "success" : "warning"
              }
              className="dd-pause-resume-btn"
              onClick={handlePause}
              size="sm"
              disabled={!activeSession?.appt || activeSession?.status === "break"}
            >
              {activeSession?.status === "paused" ? (
                <>
                  <i className="bi bi-play-circle me-1"></i>
                  Resume
                </>
              ) : (
                <>
                  <i className="bi bi-pause-circle me-1"></i>
                  Pause
                </>
              )}
            </Button>
          </div>

          {activeSession?.status === "break" && (
            <div className="dd-break-timer-section mt-3 p-3 border rounded bg-light">
              <div className="dd-break-remaining-label fw-bold mb-2">
                {activeSession.appt ? `Break for ${activeSession.appt.name}` : "On Break"}
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div className="dd-break-time-remaining fw-bold text-primary fs-5">
                  {formatDuration(breakRemainingMs)}
                </div>
                <ProgressBar
                  animated
                  now={
                    ((activeSession.breakDurationMs - breakRemainingMs) /
                      (activeSession.breakDurationMs || 1)) *
                    100
                  }
                  className="dd-break-progress-bar flex-grow-1"
                />
              </div>

              <Button
                variant="outline-secondary"
                size="sm"
                className="mt-2 dd-end-break-btn"
                onClick={handleEndBreakAndResume}
              >
                <i className="bi bi-stop-circle me-1"></i>
                End Break Early
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE SESSION CARD */}
      {activeSession && activeSession.appt ? (
        <div className={`dd-active-session-card card mb-4 shadow-sm dd-active`}>
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="d-flex gap-3 align-items-start mb-3 mb-md-0">
                <div className="dd-patient-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                  {activeAppt.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="dd-patient-details">
                  <div className="dd-patient-label text-muted mb-1">Currently with</div>
                  <h5 className="dd-patient-name mb-1">
                    {activeAppt.name}
                    <small className="dd-patient-gender text-muted ms-2">({activeAppt.gender})</small>
                  </h5>
                  <div className="dd-patient-issue mb-2">
                    <Badge bg="light" text="dark" className="border">
                      <i className="bi bi-clipboard-plus me-1"></i>
                      {activeAppt.issue}
                    </Badge>
                  </div>

                  <div className="dd-patient-vitals d-flex gap-2 mb-2">
                    <Badge bg="info" className="dd-vital-badge">
                      <i className="bi bi-heart me-1"></i>
                      BP: {activeAppt.bp || 'N/A'}
                    </Badge>
                    <Badge bg="info" className="dd-vital-badge">
                      <i className="bi bi-droplet me-1"></i>
                      BG: {activeAppt.bloodGroup || 'N/A'}
                    </Badge>
                  </div>

                  <div className="d-flex gap-4 dd-session-info">
                    <div>
                      <div className="dd-info-label text-muted small">Started</div>
                      <div className="dd-info-value fw-bold">
                        {formatTimeOfDay(activeSession.startTime)}
                      </div>
                    </div>

                    <div>
                      <div className="dd-info-label text-muted small">Elapsed</div>
                      <div className="dd-info-value fw-bold text-success">
                        {formatDuration(elapsedMs)}
                      </div>
                    </div>

                    <div>
                      <div className="dd-info-label text-muted small">Status</div>
                      <div>
                        {activeSession.status === "started" && (
                          <Badge bg="success" className="dd-session-status">
                            <Spinner animation="border" size="sm" className="me-1" />
                            Active
                          </Badge>
                        )}
                        {activeSession.status === "paused" && (
                          <Badge bg="warning" className="dd-session-status">
                            <i className="bi bi-pause me-1"></i>
                            Paused
                          </Badge>
                        )}
                        {activeSession.status === "break" && (
                          <Badge bg="info" className="dd-session-status">
                            <i className="bi bi-cup-hot me-1"></i>
                            On Break
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dd-session-controls mt-3 mt-md-0">
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleChecked}
                    size="sm"
                    className="dd-checked-btn"
                    disabled={activeSession.status === "break"}
                  >
                    <i className="bi bi-clipboard-check me-1"></i>
                    Checked
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCompleteNow}
                    size="sm"
                    className="dd-complete-now-btn"
                    disabled={activeSession.status === "break"}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeSession?.status === "break" ? (
        <div className="dd-break-only-card card mb-4 shadow-sm">
          <div className="card-body p-4 text-center">
            <div className="dd-no-patient-break py-3">
              <i className="bi bi-cup-hot fs-1 text-info mb-3"></i>
              <div className="dd-break-message fs-5 fw-bold mb-2">Currently on break</div>
              <h5 className="dd-break-instruction text-muted">
                No active patient appointment
              </h5>
            </div>
          </div>
        </div>
      ) : null}

      {/* TODAY'S APPOINTMENTS TABLE */}
      <div className="dd-appointments-table-card card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="dd-table-heading mb-0">
              <i className="bi bi-calendar-check me-2"></i>
              Today's Appointments
            </h5>
            <Badge bg="secondary" className="dd-appointment-count">
              {appointments.length} appointments
            </Badge>
          </div>
          
          <div className="table-responsive">
            <table className="table dd-appointments-table align-middle mb-0">
              <thead className="dd-table-header">
                <tr>
                  <th className="dd-serial-col">S No.</th>
                  <th className="dd-patient-col">Patient</th>
                  <th className="dd-gender-col">Gender</th>
                  <th className="dd-issue-col">Issue</th>
                  <th className="dd-phone-col">Phone</th>
                  <th className="dd-bp-col">BP</th>
                  <th className="dd-blood-group-col">BG</th>
                  <th className="dd-scheduled-col">Time</th>
                  <th className="dd-status-col">Status</th>
                  <th className="dd-action-col">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a, idx) => (
                  <tr key={a.id} className="dd-appointment-row">
                    <td className="dd-serial-number text-center">
                      <span className="dd-serial-badge">{idx + 1}</span>
                    </td>
                    <td className="dd-patient-name-cell">
                      <div className="d-flex align-items-center">
                        <div className="dd-patient-avatar-small bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                             style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                          {a.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span className="dd-patient-name fw-bold">{a.name}</span>
                      </div>
                    </td>
                    <td className="dd-patient-gender-cell">
                      <Badge bg={a.gender === "Male" ? "primary" : "danger"} className="dd-gender-badge">
                        {a.gender}
                      </Badge>
                    </td>
                    <td className="dd-patient-issue-cell">
                      <span className="dd-issue-text">{a.issue}</span>
                    </td>
                    <td className="dd-patient-phone-cell">
                      <a href={`tel:${a.phone}`} className="dd-phone-link text-decoration-none">
                        <i className="bi bi-telephone me-1"></i>
                        {a.phone}
                      </a>
                    </td>
                    <td className="dd-bp-cell">
                      <Badge bg="info" className="dd-bp-badge">
                        {a.bp || 'N/A'}
                      </Badge>
                    </td>
                    <td className="dd-blood-group-cell">
                      <Badge bg="danger" className="dd-blood-group-badge">
                        {a.bloodGroup || 'N/A'}
                      </Badge>
                    </td>
                    <td className="dd-scheduled-time-cell">
                      <div className="dd-time-display">
                        <i className="bi bi-clock me-1"></i>
                        {a.scheduledTime}
                      </div>
                    </td>
                    <td className="dd-status-cell">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="dd-action-cell">
                      {(!activeSession?.appt || activeSession?.appt?.id === a.id) &&
                        a.status === "pending" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleConsentClick(a)}
                            className="dd-consent-btn"
                            disabled={activeSession?.status === "break"}
                          >
                            <i className="bi bi-person-check me-1"></i>
                            Appointment
                          </Button>
                        )}

                      {activeSession?.appt?.id === a.id &&
                        a.status === "in-progress" && (
                          <Badge bg="info" className="dd-active-badge">
                            <Spinner animation="border" size="sm" className="me-1" />
                            Active
                          </Badge>
                        )}
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr className="dd-no-appointments-row">
                    <td colSpan="10" className="text-center py-4">
                      <div className="dd-empty-state">
                        <i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
                        <h6 className="text-muted mb-0">All appointments completed</h6>
                        <p className="text-muted small mt-1">No pending appointments for today</p>
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
      <div className="dd-completed-table-card card shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="dd-table-heading mb-0">
              <i className="bi bi-check-circle me-2"></i>
              Completed Appointments
            </h5>
            <Badge bg="success" className="dd-completed-count">
              {completed.length} completed
            </Badge>
          </div>
          
          <div className="table-responsive">
            <table className="table dd-completed-appointments-table align-middle mb-0">
              <thead className="dd-table-header">
                <tr>
                  <th className="dd-serial-col">S No.</th>
                  <th className="dd-patient-col">Patient</th>
                  <th className="dd-gender-col">Gender</th>
                  <th className="dd-issue-col">Issue</th>
                  <th className="dd-phone-col">Phone</th>
                  <th className="dd-duration-col">Duration</th>
                  <th className="dd-diagnosis-col">Diagnosis</th>
                  <th className="dd-medicine-col">Medicine</th>
                  <th className="dd-advice-col">Advice</th>
                  <th className="dd-followup-col">Follow-up</th>
                  <th className="dd-edit-col">Edit</th>
                </tr>
              </thead>

              <tbody>
                {completed.map((c, i) => (
                  <tr key={c.id} className="dd-completed-row">
                    <td className="dd-serial-number text-center">
                      <span className="dd-serial-badge">{i + 1}</span>
                    </td>
                    <td className="dd-patient-name-cell">
                      <div className="d-flex align-items-center">
                        <div className="dd-patient-avatar-small bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                             style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="dd-patient-name fw-bold">{c.name}</div>
                          <small className="dd-completed-time text-muted">
                            {formatTimeOfDay(c.endTime)}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="dd-patient-gender-cell">
                      <Badge bg={c.gender === "Male" ? "primary" : "danger"} className="dd-gender-badge">
                        {c.gender}
                      </Badge>
                    </td>
                    <td className="dd-patient-issue-cell">
                      <span className="dd-issue-text">{c.issue}</span>
                    </td>
                    <td className="dd-patient-phone-cell">
                      <a href={`tel:${c.phone}`} className="dd-phone-link text-decoration-none">
                        <i className="bi bi-telephone me-1"></i>
                        {c.phone}
                      </a>
                    </td>
                    <td className="dd-duration-cell">
                      <Badge bg="info" className="dd-duration-badge">
                        {formatDuration(c.durationMs)}
                      </Badge>
                    </td>
                    <td className="dd-diagnosis-cell">
                      <div className="dd-diagnosis-text">{c.diagnosis}</div>
                    </td>
                    <td className="dd-medicine-cell">
                      <div className="dd-medicine-text">{c.medicine}</div>
                    </td>
                    <td className="dd-advice-cell">
                      <div className="dd-advice-text">{c.advice}</div>
                    </td>
                    <td className="dd-followup-cell">
                      {c.followUpRequired && c.followUpDate ? (
                        <Badge bg="warning" className="dd-follow-up-badge">
                          <i className="bi bi-calendar-check me-1"></i>
                          {new Date(c.followUpDate).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short'
                          })}
                        </Badge>
                      ) : (
                        <span className="text-muted dd-no-followup">No</span>
                      )}
                    </td>
                    <td className="dd-edit-cell">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditCompleted(c)}
                        className="dd-edit-btn"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    </td>
                  </tr>
                ))}

                {completed.length === 0 && (
                  <tr className="dd-no-completed-row">
                    <td colSpan="11" className="text-center py-4">
                      <div className="dd-empty-state">
                        <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                        <h6 className="text-muted mb-0">No completed appointments</h6>
                        <p className="text-muted small mt-1">Completed appointments will appear here</p>
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
        className="dd-consent-modal"
        size="lg"
      >
        <Modal.Header closeButton className="dd-consent-modal-header p-3">
          <Modal.Title className="dd-consent-modal-title">
            <i className="bi bi-person-check me-2"></i>
            Patient Consent Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="dd-consent-modal-body p-4" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <div className="dd-patient-summary mb-4">
            <h6 className="dd-patient-summary-title mb-3">Patient Information</h6>
            <div className="dd-patient-details-grid">
              <div className="dd-patient-detail">
                <span className="dd-detail-label">Name:</span>
                <span className="dd-detail-value fw-bold">{selectedAppointment?.name}</span>
              </div>
              <div className="dd-patient-detail">
                <span className="dd-detail-label">Gender:</span>
                <span className="dd-detail-value">{selectedAppointment?.gender}</span>
              </div>
              <div className="dd-patient-detail">
                <span className="dd-detail-label">Issue:</span>
                <span className="dd-detail-value">{selectedAppointment?.issue}</span>
              </div>
              <div className="dd-patient-detail">
                <span className="dd-detail-label">Scheduled:</span>
                <span className="dd-detail-value">{selectedAppointment?.scheduledTime}</span>
              </div>
              <div className="dd-patient-detail">
                <span className="dd-detail-label">Phone:</span>
                <span className="dd-detail-value">{selectedAppointment?.phone}</span>
              </div>
            </div>
          </div>

          <div className="dd-patient-vitals-section mb-4">
            <h6 className="dd-patient-summary-title mb-3">Patient Vitals</h6>
            <div className="dd-vitals-display">
              <div className="dd-vital-item">
                <span className="dd-vital-label">Blood Pressure:</span>
                <span className="dd-vital-value fw-bold">{selectedAppointment?.bp || 'Not recorded'}</span>
              </div>
              <div className="dd-vital-item">
                <span className="dd-vital-label">Blood Group:</span>
                <span className="dd-vital-value fw-bold">{selectedAppointment?.bloodGroup || 'Not recorded'}</span>
              </div>
            </div>
          </div>

          <div className="dd-consent-agreement">
            <h6 className="dd-patient-summary-title mb-3">Consent Agreement</h6>
            <div className="dd-consent-text">
              <p>I confirm that I have reviewed the patient's information and vitals.</p>
              <p>I understand that starting will begin tracking consultation time.</p>
              <p>I acknowledge my responsibility for providing appropriate medical care.</p>
              <p>I confirm I will maintain patient confidentiality.</p>
              <p className="mb-0">Click "Start Appointment" to begin consultation.</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dd-consent-modal-footer p-3">
          <Button
            variant="outline-secondary"
            onClick={() => setShowConsentModal(false)}
            className="dd-consent-cancel-btn"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStartFromConsent}
            className="dd-consent-start-btn"
            size="sm"
          >
            <i className="bi bi-play-circle me-1"></i>
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
        onPrint={handlePrintSummary}
        onCompleteWithoutPrint={handleCompleteWithoutPrint}
      />
    </div>
  );
};

export default DoctorDashboard;