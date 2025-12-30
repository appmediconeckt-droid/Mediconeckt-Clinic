import React, { useState } from "react";
import { CheckCircle, Clock, XCircle, Trash2 } from "lucide-react";
import "./WalkInAppointment.css";

export default function WalkInAppointment() {
  const [appointments, setAppointments] = useState([]);

  const submitRequest = () => {
    const name = prompt("Enter patient name:");
    const phone = prompt("Enter phone number:");
    const gender = prompt("Enter gender (Male/Female/Other):");
    const problem = prompt("Enter problem/symptoms:");
    
    if (!name || !phone || !problem) {
      alert("Please fill all required fields");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name,
      phone,
      gender: gender || "Not specified",
      problem,
      type: "WALK_IN",
      status: "PENDING",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAppointments([newAppointment, ...appointments]);
  };

  const updateStatus = (id, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case "ACCEPTED": return <span className="walkin-badge-accepted">Accepted</span>;
      case "CANCELLED": return <span className="walkin-badge-cancelled">Cancelled</span>;
      default: return <span className="walkin-badge-pending">Pending</span>;
    }
  };

  const getStatusCount = (status) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  return (
    <div className="walkin-main p-4">
      <div className="walkin-header-section">
        <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
             <h2 className="walkin-title ">🏥 Walk-in Appointment</h2>
        </div>
       
        <div className="walkin-stats-container">
          <div className="walkin-stat-card walkin-stat-total">
            <span className="walkin-stat-count">{appointments.length}</span>
            <span className="walkin-stat-label">Total</span>
          </div>
          <div className="walkin-stat-card walkin-stat-accepted">
            <span className="walkin-stat-count">{getStatusCount("ACCEPTED")}</span>
            <span className="walkin-stat-label">Accepted</span>
          </div>
          <div className="walkin-stat-card walkin-stat-pending">
            <span className="walkin-stat-count">{getStatusCount("PENDING")}</span>
            <span className="walkin-stat-label">Pending</span>
          </div>
          <div className="walkin-stat-card walkin-stat-cancelled">
            <span className="walkin-stat-count">{getStatusCount("CANCELLED")}</span>
            <span className="walkin-stat-label">Cancelled</span>
          </div>
        </div>
      </div>

      <div className="walkin-content-layout">
        {/* ADD BUTTON SECTION */}
        <div className="walkin-add-section">
          <div className="walkin-card">
            <h2 className="walkin-section-title">➕ Add New Appointment</h2>
            <p className="walkin-section-description">Click the button below to create a new walk-in appointment</p>
            <button className="walkin-primary-btn" onClick={submitRequest}>
              <CheckCircle size={18} /> Create Walk-in Appointment
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="walkin-table-section">
          <div className="walkin-card">
            <h2 className="walkin-section-title mb-3">📋 Appointments List ({appointments.length})</h2>
            
            {appointments.length === 0 ? (
              <div className="walkin-empty-state">
                <Clock size={48} />
                <p>No appointments yet</p>
                <small>Click the button above to add your first appointment</small>
              </div>
            ) : (
              <div className="walkin-table-wrapper">
                <table className="walkin-appointment-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone No</th>
                      <th>Gender</th>
                      <th>Problem</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} className={`walkin-row-${apt.status.toLowerCase()}`}>
                        <td>
                          <div className="walkin-patient-name">
                            <strong>{apt.name}</strong>
                          </div>
                        </td>
                        <td className="walkin-phone-cell">{apt.phone}</td>
                        <td className="walkin-gender-cell">{apt.gender}</td>
                        <td className="walkin-problem-cell">
                          <div className="walkin-problem-text">{apt.problem}</div>
                        </td>
                        <td>
                          <div className="walkin-time-info">
                            <div className="walkin-date">{apt.date}</div>
                            <div className="walkin-time">{apt.time}</div>
                          </div>
                        </td>
                        <td>
                          <div className="walkin-status-cell">
                            {renderStatusBadge(apt.status)}
                          </div>
                        </td>
                        <td>
                          <div className="walkin-action-buttons">
                            <button 
                              onClick={() => updateStatus(apt.id, "ACCEPTED")}
                              className={`walkin-action-btn walkin-btn-accept ${apt.status === "ACCEPTED" ? "walkin-active" : ""}`}
                              title="Accept"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button 
                              onClick={() => updateStatus(apt.id, "PENDING")}
                              className={`walkin-action-btn walkin-btn-pending ${apt.status === "PENDING" ? "walkin-active" : ""}`}
                              title="Set Pending"
                            >
                              <Clock size={14} />
                            </button>
                            <button 
                              onClick={() => updateStatus(apt.id, "CANCELLED")}
                              className={`walkin-action-btn walkin-btn-cancel ${apt.status === "CANCELLED" ? "walkin-active" : ""}`}
                              title="Cancel"
                            >
                              <XCircle size={14} />
                            </button>
                            <button 
                              onClick={() => deleteAppointment(apt.id)}
                              className="walkin-action-btn walkin-btn-delete"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}