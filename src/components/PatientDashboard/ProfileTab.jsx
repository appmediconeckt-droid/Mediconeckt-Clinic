import React from "react";
import { patientData } from "./data";

export default function ProfileTab() {
  return (
    <div className="patient-profile-content">
      <div className="patient-profile-header">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
          alt="Patient Avatar" 
          className="patient-profile-avatar"
        />
        <div className="patient-profile-info">
          <h3>{patientData.name}</h3>
          <p>Patient ID: PAT-789456</p>
          <p>Member since: January 2023</p>
        </div>
      </div>

      <div className="patient-profile-section">
        <h4 className="patient-section-title">👤 Personal Information</h4>
        <div className="patient-info-grid">
          <div className="patient-info-item">
            <span className="patient-info-label">Email</span>
            <span className="patient-info-value">{patientData.email}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Phone</span>
            <span className="patient-info-value">{patientData.phone}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Date of Birth</span>
            <span className="patient-info-value">{patientData.dob}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Gender</span>
            <span className="patient-info-value">{patientData.gender}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Blood Group</span>
            <span className="patient-info-value">{patientData.bloodGroup}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Address</span>
            <span className="patient-info-value">{patientData.address}</span>
          </div>
        </div>
      </div>

      <div className="patient-profile-section">
        <h4 className="patient-section-title">🏥 Medical Information</h4>
        <div className="patient-info-grid">
          <div className="patient-info-item">
            <span className="patient-info-label">Primary Doctor</span>
            <span className="patient-info-value">{patientData.primaryDoctor}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Emergency Contact</span>
            <span className="patient-info-value">{patientData.emergencyContact}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Insurance Provider</span>
            <span className="patient-info-value">{patientData.insuranceProvider}</span>
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Policy Number</span>
            <span className="patient-info-value">{patientData.policyNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}