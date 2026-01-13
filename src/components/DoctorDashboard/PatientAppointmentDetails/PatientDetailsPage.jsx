// ===============================
// PatientDetailsPage.jsx (ReactJS)
// ===============================
import React, { useState } from "react";
import { Search, User, Phone, Calendar, Clock, Heart, Pill, Stethoscope, ChevronLeft, FileText, Download } from "lucide-react";
import "./PatientDetailsPage.css";
import { generatePrescriptionPDF } from "./pdfGenerator";

const patientData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    phone: "9876543210",
    bloodGroup: "O+",
    lastVisit: "2026-01-08",
    records: [
      {
        id: 101,
        date: "2026-01-05",
        time: "10:30 AM",
        bp: "120/80",
        pulse: "72",
        temperature: "98.6°F",
        problem: "Fever & Cold",
        diagnosis: "Viral Infection",
        tablets: "Paracetamol 500mg (1-0-1), Cetirizine 10mg (0-0-1)",
        days: "5 Days",
        doctor: "Dr. A. Sharma",
        prescription: "Take medicine after meals. Rest well.",
        followUp: "2026-01-10",
      },
      {
        id: 102,
        date: "2026-01-08",
        time: "11:15 AM",
        bp: "118/78",
        pulse: "68",
        temperature: "98.4°F",
        problem: "Migraine Headache",
        diagnosis: "Tension Headache",
        tablets: "Ibuprofen 400mg (1-0-0), Sumatriptan 50mg (SOS)",
        days: "3 Days",
        doctor: "Dr. A. Sharma",
        prescription: "Avoid screen time. Drink plenty of water.",
        followUp: "2026-01-12",
      },
    ],
  },
  {
    id: 2,
    name: "Sita Patil",
    age: 52,
    gender: "Female",
    phone: "9123456789",
    bloodGroup: "B+",
    lastVisit: "2026-01-07",
    records: [
      {
        id: 201,
        date: "2026-01-07",
        time: "09:45 AM",
        bp: "130/85",
        pulse: "76",
        temperature: "98.8°F",
        problem: "Hypertension",
        diagnosis: "Stage 1 Hypertension",
        tablets: "Amlodipine 5mg (0-0-1), Losartan 50mg (1-0-0)",
        days: "30 Days",
        doctor: "Dr. M. Deshmukh",
        prescription: "Monitor BP daily. Low salt diet.",
        followUp: "2026-02-07",
      },
    ],
  },
  {
    id: 3,
    name: "Amit Verma",
    age: 38,
    gender: "Male",
    phone: "9988776655",
    bloodGroup: "A+",
    lastVisit: "2026-01-09",
    records: [
      {
        id: 301,
        date: "2026-01-09",
        time: "03:20 PM",
        bp: "125/82",
        pulse: "80",
        temperature: "99.1°F",
        problem: "Back Pain",
        diagnosis: "Muscle Spasm",
        tablets: "Diclofenac 50mg (1-0-1), Muscle Relaxant",
        days: "7 Days",
        doctor: "Dr. R. Gupta",
        prescription: "Hot compression. Avoid lifting weights.",
        followUp: "2026-01-16",
      },
    ],
  },
  {
    id: 4,
    name: "Priya Sharma",
    age: 29,
    gender: "Female",
    phone: "8877665544",
    bloodGroup: "AB+",
    lastVisit: "2026-01-06",
    records: [
      {
        id: 401,
        date: "2026-01-06",
        time: "02:15 PM",
        bp: "110/70",
        pulse: "65",
        temperature: "98.9°F",
        problem: "Allergic Rhinitis",
        diagnosis: "Seasonal Allergy",
        tablets: "Levocetirizine 5mg (0-0-1), Nasal Spray",
        days: "10 Days",
        doctor: "Dr. A. Sharma",
        prescription: "Avoid dust and pollen. Use mask outside.",
        followUp: "2026-01-16",
      },
    ],
  },
];

export default function PatientDetailsPage() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showPatientList, setShowPatientList] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredPatients = patientData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setSelectedRecord(null);
    setShowPatientList(false);
  };

  const handleBackToPatients = () => {
    setShowPatientList(true);
    setSelectedPatient(null);
    setSelectedRecord(null);
  };

  const handleBackToRecords = () => {
    setSelectedRecord(null);
  };

  const handleDownloadPrescription = async () => {
    if (!selectedPatient || !selectedRecord) return;
    
    setIsDownloading(true);
    try {
      await generatePrescriptionPDF(selectedPatient, selectedRecord);
    } catch (error) {
      console.error("Error downloading prescription:", error);
      alert("Failed to download prescription. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pd-container">
      {/* Header */}
      <div className="pd-header">
        <div className="pd-header-left">
          <Stethoscope size={32} className="pd-header-icon" />
          <div>
            <h2 className="pd-title">Patient Medical Records</h2>
            <p className="pd-subtitle">Comprehensive patient history and visit details</p>
          </div>
        </div>
        <div className="pd-stats">
          <div className="pd-stat-card">
            <span className="pd-stat-number">{patientData.length}</span>
            <span className="pd-stat-label">Total Patients</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="pd-search-container">
        <Search className="pd-search-icon" />
        <input
          type="text"
          className="pd-search-input"
          placeholder="Search patient by name or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="pd-main-layout">
        {/* Patient List Section - Only shown when no patient selected */}
        {showPatientList && (
          <div className="pd-patient-list-section">
            <h3 className="pd-section-title">
              <User size={20} /> Patient Directory
            </h3>
            <div className="pd-patient-grid">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="pd-patient-card"
                  onClick={() => handlePatientClick(patient)}
                >
                  <div className="pd-patient-header">
                    <div className="pd-patient-avatar">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="pd-patient-info">
                      <h4 className="pd-patient-name">{patient.name}</h4>
                      <div className="pd-patient-meta">
                        <span className="pd-patient-age">{patient.age} yrs • {patient.gender}</span>
                        <span className="pd-patient-blood">{patient.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pd-patient-contact">
                    <Phone size={14} />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="pd-patient-footer">
                    <span className="pd-last-visit">
                      Last visit: {patient.lastVisit}
                    </span>
                    <span className="pd-record-count">
                      {patient.records.length} {patient.records.length === 1 ? 'Visit' : 'Visits'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Patient's Records Section */}
        {selectedPatient && !selectedRecord && (
          <div className="pd-records-section">
            <div className="pd-records-header">
              <button className="pd-back-btn" onClick={handleBackToPatients}>
                <ChevronLeft size={18} /> Back to Patients
              </button>
              <div className="pd-selected-patient-info">
                <div className="pd-patient-avatar-large">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="pd-patient-name-large">{selectedPatient.name}</h3>
                  <div className="pd-patient-details">
                    <span><User size={14} /> {selectedPatient.age} yrs • {selectedPatient.gender}</span>
                    <span><Phone size={14} /> {selectedPatient.phone}</span>
                    <span><Heart size={14} /> Blood Group: {selectedPatient.bloodGroup}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="pd-section-title">
              <Calendar size={20} /> Visit History
            </h3>
            
            {selectedPatient.records.length === 0 ? (
              <div className="pd-empty-state">
                <FileText size={48} />
                <p>No visit records found for this patient</p>
              </div>
            ) : (
              <div className="pd-records-table-container">
                <table className="pd-records-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Problem</th>
                      <th>Doctor</th>
                      <th>Follow-up</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPatient.records.map((record) => (
                      <tr key={record.id} className="pd-record-row">
                        <td>
                          <div className="pd-date-cell">
                            <Calendar size={14} />
                            {record.date}
                          </div>
                        </td>
                        <td>
                          <div className="pd-time-cell">
                            <Clock size={14} />
                            {record.time}
                          </div>
                        </td>
                        <td className="pd-problem-cell">
                          <div className="pd-problem-tag">{record.problem}</div>
                        </td>
                        <td className="pd-doctor-cell">{record.doctor}</td>
                        <td>
                          <div className="pd-followup-badge">{record.followUp}</div>
                        </td>
                        <td>
                          <button
                            className="pd-view-detail-btn"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <FileText size={14} /> View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Record Details Section */}
        {selectedRecord && (
          <div className="pd-record-detail-section">
            <div className="pd-detail-header">
              <button className="pd-back-btn" onClick={handleBackToRecords}>
                <ChevronLeft size={18} /> Back to Visits
              </button>
              <h3 className="pd-section-title">
                <FileText size={20} /> Visit Details
              </h3>
            </div>

            <div className="pd-detail-card">
              {/* Patient Info Banner */}
              <div className="pd-detail-patient-banner">
                <div className="pd-detail-avatar">{selectedPatient.name.charAt(0)}</div>
                <div>
                  <h4 className="pd-detail-patient-name">{selectedPatient.name}</h4>
                  <div className="pd-detail-patient-meta">
                    <span>{selectedPatient.age} yrs • {selectedPatient.gender}</span>
                    <span>•</span>
                    <span>{selectedPatient.bloodGroup}</span>
                    <span>•</span>
                    <span>{selectedPatient.phone}</span>
                  </div>
                </div>
              </div>

              {/* Visit Details Grid */}
              <div className="pd-detail-grid">
                <div className="pd-detail-column">
                  <h5 className="pd-detail-column-title">Visit Information</h5>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Date</span>
                    <span className="pd-detail-value">
                      <Calendar size={14} /> {selectedRecord.date}
                    </span>
                  </div>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Time</span>
                    <span className="pd-detail-value">
                      <Clock size={14} /> {selectedRecord.time}
                    </span>
                  </div>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Consulting Doctor</span>
                    <span className="pd-detail-value pd-doctor-highlight">
                      <Stethoscope size={14} /> {selectedRecord.doctor}
                    </span>
                  </div>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Follow-up Date</span>
                    <span className="pd-detail-value pd-followup-highlight">
                      {selectedRecord.followUp}
                    </span>
                  </div>
                </div>

                <div className="pd-detail-column">
                  <h5 className="pd-detail-column-title">Vital Signs</h5>
                  <div className="pd-vitals-grid">
                    <div className="pd-vital-card">
                      <div className="pd-vital-icon bp-icon">
                        <Heart size={18} />
                      </div>
                      <div>
                        <div className="pd-vital-label">Blood Pressure</div>
                        <div className="pd-vital-value">{selectedRecord.bp} mmHg</div>
                      </div>
                    </div>
                    <div className="pd-vital-card">
                      <div className="pd-vital-icon pulse-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                      </div>
                      <div>
                        <div className="pd-vital-label">Pulse Rate</div>
                        <div className="pd-vital-value">{selectedRecord.pulse} bpm</div>
                      </div>
                    </div>
                    <div className="pd-vital-card">
                      <div className="pd-vital-icon temp-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="pd-vital-label">Temperature</div>
                        <div className="pd-vital-value">{selectedRecord.temperature}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pd-detail-column">
                  <h5 className="pd-detail-column-title">Medical Information</h5>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Presenting Problem</span>
                    <span className="pd-detail-value pd-problem-value">{selectedRecord.problem}</span>
                  </div>
                  <div className="pd-detail-item">
                    <span className="pd-detail-label">Diagnosis</span>
                    <span className="pd-detail-value">{selectedRecord.diagnosis}</span>
                  </div>
                </div>

                <div className="pd-detail-column pd-prescription-column">
                  <h5 className="pd-detail-column-title">
                    <Pill size={18} /> Prescription
                  </h5>
                  <div className="pd-prescription-box">
                    <div className="pd-medication-list">
                      <div className="pd-medication-item">
                        <div className="pd-medication-name">Medication</div>
                        <div className="pd-medication-details">{selectedRecord.tablets}</div>
                      </div>
                      <div className="pd-medication-item">
                        <div className="pd-medication-name">Duration</div>
                        <div className="pd-medication-details">{selectedRecord.days}</div>
                      </div>
                    </div>
                    <div className="pd-instructions">
                      <h6>Doctor's Instructions:</h6>
                      <p>{selectedRecord.prescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pd-detail-actions">
                <button 
                  className="pd-btn-primary"
                  onClick={handleDownloadPrescription}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <span className="pd-spinner"></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download Prescription
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}