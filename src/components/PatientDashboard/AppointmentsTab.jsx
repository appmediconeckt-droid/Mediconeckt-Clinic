import React from "react";
import { appointments } from "./data";

export default function AppointmentsTab() {
  return (
    <div className="patient-profile-content">
      <h3 className="patient-section-title">📅 My Appointments</h3>
      <div className="patient-appointment-list">
        {appointments.map(app => (
          <div key={app.id} className="patient-appointment-card">
            <div className="patient-appointment-header">
              <span className="patient-appointment-date">
                {app.date} at {app.time}
              </span>
              <span className={`patient-appointment-status patient-status-${app.status}`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
            <div className="patient-appointment-details">
              <h4>{app.doctor}</h4>
              <p><strong>Department:</strong> {app.department}</p>
              <p><strong>Reason:</strong> {app.reason}</p>
            </div>
            <div className="patient-appointment-actions">
              <button className="patient-btn-light">Reschedule</button>
              <button className="patient-btn-primary">View Details</button>
              {app.status === "pending" && (
                <button className="patient-btn-danger">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="patient-btn-primary patient-mt-3">Book New Appointment</button>
    </div>
  );
}