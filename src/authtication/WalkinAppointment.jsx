import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WalkinAppointment.css";

function WalkinAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    medicalIssue: "",
    problemDuration: "",
    severityLevel: "medium",
    appointmentTime: "",
    symptoms: "",
    previousTreatment: "",
    emergencyContact: "",
    additionalNotes: ""
  });
  const [generatedToken, setGeneratedToken] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([
    { id: 1, name: "Dr. Sarah Johnson", specialization: "General Physician", availableSlots: 3 },
    { id: 2, name: "Dr. Michael Chen", specialization: "Emergency Medicine", availableSlots: 2 },
    { id: 3, name: "Dr. Priya Sharma", specialization: "Internal Medicine", availableSlots: 1 },
    { id: 4, name: "Dr. Robert Williams", specialization: "Family Medicine", availableSlots: 4 }
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Get patient data from localStorage or location state
    const storedPatientData = localStorage.getItem("walkInPatientData");
    if (storedPatientData) {
      const parsedData = JSON.parse(storedPatientData);
      setPatientInfo(parsedData);
      
      // Generate token
      const token = `TKN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
      setGeneratedToken(token);
      
      // Set default appointment time (next hour)
      const now = new Date();
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
      const formattedTime = nextHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setAppointmentForm(prev => ({
        ...prev,
        appointmentTime: formattedTime
      }));
    } else if (location.state) {
      setPatientInfo(location.state);
      
      // Generate token
      const token = `TKN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
      setGeneratedToken(token);
      
      // Set default appointment time
      const now = new Date();
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
      const formattedTime = nextHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setAppointmentForm(prev => ({
        ...prev,
        appointmentTime: formattedTime
      }));
    }
  }, [location.state]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDoctorSelection = (doctorName) => {
    setSelectedDoctor(doctorName);
  };

  const validateForm = () => {
    if (!appointmentForm.medicalIssue.trim()) {
      alert("Please describe the medical issue");
      return false;
    }
    if (!appointmentForm.problemDuration.trim()) {
      alert("Please specify how long you've had this problem");
      return false;
    }
    if (!selectedDoctor) {
      alert("Please select a doctor");
      return false;
    }
    return true;
  };

  const handleConfirmAppointment = () => {
    if (!validateForm()) return;

    const appointmentData = {
      appointmentId: `APT-${Date.now().toString().slice(-8)}`,
      patientId: patientInfo?.patientId || "N/A",
      patientName: patientInfo?.patientName || "Unknown Patient",
      patientToken: generatedToken,
      doctorName: selectedDoctor,
      medicalIssue: appointmentForm.medicalIssue,
      problemDuration: appointmentForm.problemDuration,
      severityLevel: appointmentForm.severityLevel,
      appointmentTime: appointmentForm.appointmentTime,
      symptoms: appointmentForm.symptoms,
      previousTreatment: appointmentForm.previousTreatment,
      emergencyContact: appointmentForm.emergencyContact,
      additionalNotes: appointmentForm.additionalNotes,
      appointmentDate: new Date().toLocaleDateString(),
      status: "Confirmed",
      waitingTime: "15-30 minutes"
    };

    // Add to appointments list
    setAppointmentsList(prev => [appointmentData, ...prev]);
    setIsConfirmed(true);

    // Update available slots for selected doctor
    setAvailableDoctors(prev => 
      prev.map(doctor => 
        doctor.name === selectedDoctor 
          ? { ...doctor, availableSlots: doctor.availableSlots - 1 }
          : doctor
      )
    );

    // Show success message
    alert(`Appointment Confirmed!\n\nToken: ${generatedToken}\nDoctor: ${selectedDoctor}\nPlease wait in the waiting area.`);
  };

  const handlePrintToken = () => {
    const printContent = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h2>Walk-in Clinic Token</h2>
        <div style="border: 2px dashed #333; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1a2980;">Token: ${generatedToken}</h3>
          <p><strong>Patient:</strong> ${patientInfo?.patientName}</p>
          <p><strong>Appointment ID:</strong> APT-${Date.now().toString().slice(-8)}</p>
          <p><strong>Doctor:</strong> ${selectedDoctor}</p>
          <p><strong>Time:</strong> ${appointmentForm.appointmentTime}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <hr>
          <p><small>Please show this token at the reception</small></p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleNewPatient = () => {
    navigate('/walkin-scanner');
  };

  const handleBackToScanner = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not specified") return "Not specified";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const severityOptions = [
    { value: "low", label: "Low (Not urgent)", color: "#28a745" },
    { value: "medium", label: "Medium (Needs attention)", color: "#ffc107" },
    { value: "high", label: "High (Urgent)", color: "#dc3545" },
    { value: "emergency", label: "Emergency", color: "#dc3545", icon: "⚠️" }
  ];

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="appointment-step-content">
            <h3 className="step-title">Step 1: Patient Information</h3>
            <div className="patient-summary-card">
              <div className="patient-summary-header">
                <h4>Patient Details</h4>
                <span className="patient-status-badge">Verified ✓</span>
              </div>
              <div className="patient-summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Patient ID:</span>
                  <span className="summary-value">{patientInfo?.patientId || "N/A"}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Full Name:</span>
                  <span className="summary-value">{patientInfo?.patientName || "Unknown"}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Date of Birth:</span>
                  <span className="summary-value">{formatDate(patientInfo?.birthDate)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Contact:</span>
                  <span className="summary-value">{patientInfo?.contactNumber || "N/A"}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Insurance:</span>
                  <span className="summary-value">{patientInfo?.insuranceProvider || "N/A"}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Scanned At:</span>
                  <span className="summary-value">
                    {patientInfo?.scannedTimestamp ? new Date(patientInfo.scannedTimestamp).toLocaleString() : "Just now"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="appointment-step-content">
            <h3 className="step-title">Step 2: Medical Information</h3>
            <div className="medical-form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-stethoscope"></i> Medical Issue *
                  </label>
                  <textarea
                    name="medicalIssue"
                    value={appointmentForm.medicalIssue}
                    onChange={handleFormChange}
                    className="form-textarea"
                    placeholder="Describe your medical issue in detail..."
                    rows="3"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row double-column">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-clock"></i> How long have you had this problem? *
                  </label>
                  <input
                    type="text"
                    name="problemDuration"
                    value={appointmentForm.problemDuration}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="e.g., 2 days, 1 week, 3 months"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-exclamation-triangle"></i> Severity Level
                  </label>
                  <div className="severity-selector">
                    {severityOptions.map(option => (
                      <button
                        key={option.value}
                        type="button"
                        className={`severity-option ${appointmentForm.severityLevel === option.value ? 'selected' : ''}`}
                        onClick={() => setAppointmentForm(prev => ({ ...prev, severityLevel: option.value }))}
                        style={{ borderLeft: `4px solid ${option.color}` }}
                      >
                        <span className="severity-icon">{option.icon || "•"}</span>
                        <span className="severity-text">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-notes-medical"></i> Symptoms (comma separated)
                  </label>
                  <input
                    type="text"
                    name="symptoms"
                    value={appointmentForm.symptoms}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="e.g., fever, headache, cough, fatigue"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-history"></i> Previous Treatment (if any)
                  </label>
                  <textarea
                    name="previousTreatment"
                    value={appointmentForm.previousTreatment}
                    onChange={handleFormChange}
                    className="form-textarea"
                    placeholder="Any medications or treatments you've tried..."
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="appointment-step-content">
            <h3 className="step-title">Step 3: Doctor Selection & Timing</h3>
            
            <div className="doctor-selection-section">
              <h4>Available Doctors</h4>
              <div className="doctors-grid">
                {availableDoctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`doctor-card ${selectedDoctor === doctor.name ? 'selected' : ''}`}
                    onClick={() => handleDoctorSelection(doctor.name)}
                  >
                    <div className="doctor-card-header">
                      <div className="doctor-avatar">
                        <i className="fas fa-user-md"></i>
                      </div>
                      <div className="doctor-info">
                        <h5>{doctor.name}</h5>
                        <p className="doctor-specialty">{doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="doctor-card-footer">
                      <span className="slots-badge">
                        <i className="fas fa-calendar-check"></i>
                        {doctor.availableSlots} slots available
                      </span>
                      {selectedDoctor === doctor.name && (
                        <span className="selected-indicator">
                          <i className="fas fa-check"></i> Selected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="time-selection-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-calendar-alt"></i> Preferred Appointment Time *
                  </label>
                  <input
                    type="text"
                    name="appointmentTime"
                    value={appointmentForm.appointmentTime}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="e.g., 10:30 AM"
                    required
                  />
                  <small className="form-hint">Estimated waiting time: 15-30 minutes</small>
                </div>
              </div>
              
              <div className="form-row double-column">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-phone"></i> Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={appointmentForm.emergencyContact}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="Emergency contact number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-notes"></i> Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={appointmentForm.additionalNotes}
                    onChange={handleFormChange}
                    className="form-textarea"
                    placeholder="Any additional information..."
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!patientInfo) {
    return (
      <div className="no-patient-container">
        <div className="no-patient-card">
          <div className="no-patient-icon">
            <i className="fas fa-user-times"></i>
          </div>
          <h2>No Patient Data Found</h2>
          <p>Please scan a QR code or enter patient information first.</p>
          <button 
            className="scan-again-btn"
            onClick={handleNewPatient}
          >
            <i className="fas fa-qrcode"></i> Scan QR Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="walkin-appointment-page">
      {/* Page Header */}
      <div className="appointment-page-header">
        <button 
          className="appointment-back-btn"
          onClick={handleBackToScanner}
        >
          <i className="fas fa-arrow-left"></i> Back to Scanner
        </button>
        <h1><i className="fas fa-calendar-check"></i> Walk-in Appointment Booking</h1>
        <p>Complete the form below to book your appointment</p>
      </div>

      <div className="appointment-content-container">
        <div className="appointment-left-panel">
          {/* Step Indicator */}
          <div className="step-indicator-container">
            <div className="step-indicator">
              {[1, 2, 3].map(step => (
                <div key={step} className={`step-item ${currentStep === step ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                  <div className="Walk-step-number">
                    {step < currentStep ? <i className="fas fa-check"></i> : step}
                  </div>
                  <div className="step-label">
                    {step === 1 && "Patient Info"}
                    {step === 2 && "Medical Details"}
                    {step === 3 && "Doctor & Time"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form Section */}
          <div className="appointment-form-container">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <button 
                  className="nav-btn prev-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  className="nav-btn next-btn"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              ) : (
                <button 
                  className="nav-btn confirm-btn"
                  onClick={handleConfirmAppointment}
                  disabled={isConfirmed}
                >
                  <i className="fas fa-check-circle"></i> Confirm Appointment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Token & Summary */}
        <div className="appointment-right-panel">
          <div className="token-display-card">
            <div className="token-card-header">
              <h3><i className="fas fa-ticket-alt"></i> Your Token</h3>
              <div className="token-status">Active</div>
            </div>
            <div className="token-number-display">
              {generatedToken}
            </div>
            <div className="token-details">
              <div className="token-detail-item">
                <span className="token-label">Appointment ID:</span>
                <span className="token-value">APT-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="token-detail-item">
                <span className="token-label">Date:</span>
                <span className="token-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="token-detail-item">
                <span className="token-label">Time:</span>
                <span className="token-value">{appointmentForm.appointmentTime}</span>
              </div>
              {selectedDoctor && (
                <div className="token-detail-item">
                  <span className="token-label">Doctor:</span>
                  <span className="token-value">{selectedDoctor}</span>
                </div>
              )}
            </div>
            
            <div className="token-actions">
              <button 
                className="token-action-btn print-btn"
                onClick={handlePrintToken}
                disabled={!isConfirmed}
              >
                <i className="fas fa-print"></i> Print Token
              </button>
              <button 
                className="token-action-btn share-btn"
                onClick={() => alert("Token shared successfully!")}
                disabled={!isConfirmed}
              >
                <i className="fas fa-share-alt"></i> Share
              </button>
            </div>
            
            <div className="token-instructions">
              <h4><i className="fas fa-info-circle"></i> Instructions:</h4>
              <ul>
                <li>Show this token at reception</li>
                <li>Wait in the designated waiting area</li>
                <li>Estimated wait time: 15-30 minutes</li>
                <li>Keep your ID proof ready</li>
              </ul>
            </div>
          </div>

          {/* Confirmation Status */}
          {isConfirmed && (
            <div className="confirmation-banner">
              <div className="confirmation-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="confirmation-text">
                
                <h4>Appointment Confirmed!</h4>
               
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointments Table */}
      {appointmentsList.length > 0 && (
        <div className="appointments-table-section">
          <div className="table-header">
            <h3><i className="fas fa-list-alt"></i> Today's Appointments</h3>
            <span className="table-count">{appointmentsList.length} appointment(s)</span>
          </div>
          
          <div className="appointments-table-container">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Medical Issue</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsList.map((appointment, index) => (
                  <tr key={index}>
                    <td>
                      <span className="token-badge">{appointment.patientToken}</span>
                    </td>
                    <td>
                      <div className="patient-cell">
                        <div className="patient-name">{appointment.patientName}</div>
                        <div className="patient-id">ID: {appointment.patientId}</div>
                      </div>
                    </td>
                    <td>
                      <div className="doctor-cell">
                        <div className="doctor-name">{appointment.doctorName}</div>
                        <div className="doctor-specialty">Available</div>
                      </div>
                    </td>
                    <td>
                      <div className="issue-cell">
                        <div className="issue-text">{appointment.medicalIssue}</div>
                        <div className="issue-duration">{appointment.problemDuration}</div>
                      </div>
                    </td>
                    <td>
                      <div className="time-cell">
                        <div className="appointment-time">{appointment.appointmentTime}</div>
                        <div className="waiting-time">{appointment.waitingTime}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <div className="appointment-page-footer">
        <div className="footer-content">
          <p><i className="fas fa-hospital"></i> Walk-in Clinic Management System</p>
          <div className="footer-links">
            <span><i className="fas fa-phone"></i> Emergency: 911</span>
            <span><i className="fas fa-headset"></i> Support: 1-800-CLINIC</span>
            <span><i className="fas fa-clock"></i> Hours: 8 AM - 10 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalkinAppointment;