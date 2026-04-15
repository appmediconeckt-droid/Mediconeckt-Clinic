import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";
import "./WalkinClinic.css";

export default function WalkinScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isQrScanning, setIsQrScanning] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [totalScans, setTotalScans] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    initCamera();
    return () => closeCamera();
  }, []);

  useEffect(() => {
    if (isQrScanning && !scannedData && !showQrModal) {
      requestAnimationFrame(scanQrCode);
    }
  }, [isQrScanning, scannedData, showQrModal]);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.play();
        setIsQrScanning(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Camera permission denied. Please allow camera access.");
      setIsQrScanning(false);
    }
  };

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const scanQrCode = () => {
    if (!videoRef.current || !canvasRef.current || scannedData || showQrModal) {
      return;
    }

    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.height = videoRef.current.videoHeight;
      canvas.width = videoRef.current.videoWidth;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        handleQrDetected(code.data);
        return;
      }
    }
    
    if (isQrScanning && !scannedData && !showQrModal) {
      requestAnimationFrame(scanQrCode);
    }
  };

  const extractPatientInfo = (data) => {
    try {
      // Try to parse as JSON
      if (data.startsWith('{')) {
        const jsonData = JSON.parse(data);
        return {
          patientId: jsonData.patientId || jsonData.id || `PAT-${Date.now()}`,
          patientName: jsonData.name || jsonData.fullName || "Unknown Patient",
          birthDate: jsonData.dob || jsonData.dateOfBirth || "Not specified",
          contactNumber: jsonData.phone || jsonData.mobile || "Not specified",
          emailAddress: jsonData.email || "Not specified",
          insuranceProvider: jsonData.insurance || jsonData.insuranceId || "Not specified",
          rawQrContent: data
        };
      }

      // Try to parse as URL parameters
      if (data.includes('=')) {
        const params = new URLSearchParams(data);
        return {
          patientId: params.get('patientId') || params.get('id') || `PAT-${Date.now()}`,
          patientName: params.get('name') || params.get('fullName') || "Unknown Patient",
          birthDate: params.get('dob') || params.get('dateOfBirth') || "Not specified",
          contactNumber: params.get('phone') || params.get('mobile') || "Not specified",
          emailAddress: params.get('email') || "Not specified",
          insuranceProvider: params.get('insurance') || params.get('insuranceId') || "Not specified",
          rawQrContent: data
        };
      }

      // Try to parse as simple text format
      if (data.includes('|')) {
        const parts = data.split('|');
        return {
          patientId: parts[0] || `PAT-${Date.now()}`,
          patientName: parts[1] || "Unknown Patient",
          birthDate: parts[2] || "Not specified",
          contactNumber: parts[3] || "Not specified",
          emailAddress: parts[4] || "Not specified",
          insuranceProvider: parts[5] || "Not specified",
          rawQrContent: data
        };
      }

      // Default format for patient ID
      if (data.includes('PAT-') || data.includes('MRN-') || data.includes('PID-')) {
        return {
          patientId: data,
          patientName: "Patient from QR Code",
          birthDate: "Not specified",
          contactNumber: "Not specified",
          emailAddress: "Not specified",
          insuranceProvider: "Not specified",
          rawQrContent: data
        };
      }

      // Generic fallback
      return {
        patientId: `QR-${Date.now()}`,
        patientName: "QR Code Patient",
        birthDate: "Not specified",
        contactNumber: "Not specified",
        emailAddress: "Not specified",
        insuranceProvider: "Not specified",
        rawQrContent: data
      };

    } catch (error) {
      console.error("Error parsing patient data:", error);
      return {
        patientId: `ERR-${Date.now()}`,
        patientName: "Error in QR Code",
        birthDate: "Not specified",
        contactNumber: "Not specified",
        emailAddress: "Not specified",
        insuranceProvider: "Not specified",
        rawQrContent: data,
        hasError: true
      };
    }
  };

  const handleQrDetected = (data) => {
    setIsQrScanning(false);
    closeCamera();
    
    const extractedData = extractPatientInfo(data);
    setPatientData(extractedData);
    setScannedData(data);
    setTotalScans(prev => prev + 1);
    
    // Show modal after a short delay
    setTimeout(() => {
      setShowQrModal(true);
    }, 500);
  };

  const proceedToAppointment = () => {
    const appointmentPayload = {
      ...patientData,
      scannedTimestamp: new Date().toISOString(),
      sourceApplication: "qr-scanner",
      scanCounter: totalScans
    };

    // Store for next page
    localStorage.setItem("walkInPatientData", JSON.stringify(appointmentPayload));

    // Navigate to appointment page
    navigate("/walk-in-appointment", {
      state: appointmentPayload,
    });
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setScannedData(null);
    setPatientData(null);
    setIsQrScanning(true);
    
    // Restart camera
    setTimeout(() => {
      initCamera();
    }, 500);
  };

  const openManualEntryForm = () => {
    setShowQrModal(false);
    setIsQrScanning(false);
    
    const patientName = prompt("Enter patient name:");
    if (!patientName) {
      closeQrModal();
      return;
    }
    
    const patientId = prompt("Enter patient ID:", `MAN-${Date.now()}`);
    const birthDate = prompt("Enter date of birth (YYYY-MM-DD):");
    const phoneNumber = prompt("Enter phone number:");
    const insuranceId = prompt("Enter insurance ID (optional):");
    
    const manualEntryData = {
      patientId: patientId || `MAN-${Date.now()}`,
      patientName: patientName,
      birthDate: birthDate || "Not specified",
      contactNumber: phoneNumber || "Not specified",
      emailAddress: "Not specified",
      insuranceProvider: insuranceId || "Not specified",
      rawQrContent: "Manual Entry",
      isManualEntry: true
    };
    
    setPatientData(manualEntryData);
    
    // Show modal for manual entry too
    setTimeout(() => {
      setShowQrModal(true);
    }, 500);
  };

  const rescanQrCode = () => {
    setShowQrModal(false);
    setScannedData(null);
    setPatientData(null);
    setIsQrScanning(true);
    
    // Restart camera
    setTimeout(() => {
      initCamera();
    }, 500);
  };

  const formatBirthDate = (dateString) => {
    if (dateString === "Not specified") return dateString;
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="walkin-scanner-page">
      {/* Page Header */}
      <div className="scanner-page-header">
        <button 
          className="navigation-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h1><i className="fas fa-qrcode"></i> Patient QR Screener</h1>
        <p>Scan patient's QR code for walk-in registration</p>
      </div>

      {/* Scanner Section */}
      <div className="qr-scanner-section">
        <div className="scanner-main-box">
          {/* Camera Preview */}
          <div className="camera-preview-wrapper">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-live-feed"
            />
            
            {/* Scanner UI Overlay */}
            <div className="scanner-ui-overlay">
              <div className="qr-frame-overlay">
                <div className="frame-corner top-left"></div>
                <div className="frame-corner top-right"></div>
                <div className="frame-corner bottom-left"></div>
                <div className="frame-corner bottom-right"></div>
              </div>
              
              <div className="scanning-animation-line"></div>
              
              <div className="scan-instructions">
                <i className="fas fa-qrcode"></i>
                <p>Align QR code within the frame</p>
                <small>Auto-scanning enabled</small>
              </div>
            </div>
            
            {/* Scanning Indicator */}
            
          </div>

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Error Display */}
          {cameraError && (
            <div className="camera-error-alert">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{cameraError}</p>
              <button 
                className="camera-retry-btn"
                onClick={() => {
                  setCameraError("");
                  initCamera();
                }}
              >
                <i className="fas fa-redo"></i> Retry Camera
              </button>
            </div>
          )}

          {/* Scanner Statistics */}
          <div className="scanner-stats-container">
            <div className="stat-card">
              <i className="fas fa-qrcode"></i>
              <span>QR Scanner Active</span>
            </div>
            <div className="stat-card">
              <i className="fas fa-clock"></i>
              <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="stat-card">
              <i className="fas fa-scan"></i>
              <span>Scans: {totalScans}</span>
            </div>
          </div>

          {/* Manual Entry Option */}
          <div className="manual-entry-container">
            <button 
              className="manual-entry-action-btn"
              onClick={openManualEntryForm}
              disabled={showQrModal || isQrScanning}
            >
              <i className="fas fa-keyboard"></i> Manual Patient Entry
            </button>
          </div>
        </div>
      </div>

      {/* QR Result Modal */}
      {showQrModal && patientData && (
        <div className="qr-result-modal-overlay">
          <div className="qr-result-modal-container">
            <div className="qr-modal-header-section">
              <div className="qr-modal-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>QR Code Scanned Successfully!</h2>
              <button 
                className="qr-modal-close-btn"
                onClick={closeQrModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="qr-modal-body-section">
              <div className="patient-info-display-card">
                <div className="patient-card-header">
                  <h3>Patient Information</h3>
                  <span className="patient-id-display">
                    ID: {patientData.patientId}
                  </span>
                </div>

                <div className="patient-details-list">
                  <div className="patient-detail-item">
                    <span className="detail-label-text">
                      <i className="fas fa-user"></i> Patient Name:
                    </span>
                    <span className="detail-value-text">{patientData.patientName}</span>
                  </div>

                  <div className="patient-detail-item">
                    <span className="detail-label-text">
                      <i className="fas fa-birthday-cake"></i> Date of Birth:
                    </span>
                    <span className="detail-value-text">{formatBirthDate(patientData.birthDate)}</span>
                  </div>

                  {patientData.contactNumber !== "Not specified" && (
                    <div className="patient-detail-item">
                      <span className="detail-label-text">
                        <i className="fas fa-phone"></i> Phone:
                      </span>
                      <span className="detail-value-text">{patientData.contactNumber}</span>
                    </div>
                  )}

                  {patientData.emailAddress !== "Not specified" && (
                    <div className="patient-detail-item">
                      <span className="detail-label-text">
                        <i className="fas fa-envelope"></i> Email:
                      </span>
                      <span className="detail-value-text">{patientData.emailAddress}</span>
                    </div>
                  )}

                  {patientData.insuranceProvider !== "Not specified" && (
                    <div className="patient-detail-item">
                      <span className="detail-label-text">
                        <i className="fas fa-shield-alt"></i> Insurance:
                      </span>
                      <span className="detail-value-text">{patientData.insuranceProvider}</span>
                    </div>
                  )}

                  <div className="patient-detail-item">
                    <span className="detail-label-text">
                      <i className="fas fa-calendar-check"></i> Scan Time:
                    </span>
                    <span className="detail-value-text">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>

                {patientData.rawQrContent && (
                  <div className="raw-qr-data-section">
                    <h4>Raw QR Data:</h4>
                    <div className="raw-data-content">
                      {patientData.rawQrContent}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="qr-modal-footer-section">
              <button 
                className="modal-action-btn cancel-action-btn"
                onClick={closeQrModal}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              
              <button 
                className="modal-action-btn rescan-action-btn"
                onClick={rescanQrCode}
              >
                <i className="fas fa-redo"></i> Scan Again
              </button>
              
              <button 
                className="modal-action-btn confirm-action-btn"
                onClick={proceedToAppointment}
              >
                <i className="fas fa-check"></i> Confirm & Continue
              </button>
            </div>

            <div className="qr-modal-note">
              <i className="fas fa-info-circle"></i>
              <small>Click "Confirm & Continue" to proceed to appointment booking</small>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <div className="scanner-page-footer">
        <p>Walk-in Clinic Registration System v3.0</p>
        <p className="support-contact">
          <i className="fas fa-headset"></i> Support: 1-800-CLINIC-HELP
        </p>
      </div>
    </div>
  );
}