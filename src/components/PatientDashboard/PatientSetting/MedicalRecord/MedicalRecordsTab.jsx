import React from "react";
import { medicalReports } from "../../BookAppointment/data";

export default function MedicalRecordsTab() {
  return (
    <div className="patient-profile-content">
      <h3 className="patient-section-title">🏥 Medical Records</h3>
      <div className="patient-profile-section">
        <h4 className="patient-section-title">📋 Recent Reports</h4>
        <div className="patient-appointment-list">
          {medicalReports.map((report, idx) => (
            <div key={idx} className="patient-appointment-card">
              <div className="patient-appointment-header">
                <h4>{report.name}</h4>
                <span className="patient-appointment-date">{report.date}</span>
              </div>
              <p>Report from Dr. {report.doctor}</p>
              <div className="patient-appointment-actions">
                <button className="patient-btn-light">View</button>
                <button className="patient-btn-primary">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}