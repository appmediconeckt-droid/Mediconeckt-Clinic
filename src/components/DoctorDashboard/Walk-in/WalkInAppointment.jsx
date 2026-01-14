import React, { useState } from "react";
import { CheckCircle, Clock, XCircle, Trash2, Plus } from "lucide-react";
import "./WalkInAppointment.css";

export default function WalkInAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    problem: ""
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setShowModal(true);
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      phone: "",
      gender: "",
      problem: ""
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.problem.trim()) {
      newErrors.problem = "Problem description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRequest = () => {
    if (!validateForm()) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender || "Not specified",
      problem: formData.problem,
      type: "WALK_IN",
      status: "BOOKED", // Changed from "PENDING" to "BOOKED"
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAppointments([newAppointment, ...appointments]);
    closeModal();
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "CANCELLED" } : apt
    ));
  };

  const deleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case "BOOKED": return <span className="walkin-badge-booked">Booked</span>;
      case "CANCELLED": return <span className="walkin-badge-cancelled">Cancelled</span>;
      default: return <span className="walkin-badge-booked">Booked</span>;
    }
  };

  const getStatusCount = (status) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  return (
    <div className="walkin-main p-4">
      {/* Modal for Adding New Appointment */}
      {showModal && (
        <div className="walkin-modal-overlay">
          <div className="walkin-modal">
            <div className="walkin-modal-header">
              <h3> New Walk-in Appointment</h3>
              <button className="walkin-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            
            <div className="walkin-modal-body">
              <div className="walkin-form-group">
                <label htmlFor="name">
                  Patient Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                  className={errors.name ? "walkin-input-error" : ""}
                />
                {errors.name && (
                  <div className="walkin-error-message">{errors.name}</div>
                )}
              </div>

              <div className="walkin-form-group">
                <label htmlFor="phone">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  className={errors.phone ? "walkin-input-error" : ""}
                />
                {errors.phone && (
                  <div className="walkin-error-message">{errors.phone}</div>
                )}
              </div>

              <div className="walkin-form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="walkin-form-group">
                <label htmlFor="problem">
                  Problem/Symptoms <span className="text-danger">*</span>
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  placeholder="Describe the problem or symptoms"
                  rows="3"
                  className={errors.problem ? "walkin-input-error" : ""}
                />
                {errors.problem && (
                  <div className="walkin-error-message">{errors.problem}</div>
                )}
              </div>
            </div>
            
            <div className="walkin-modal-footer">
              <button className="walkin-btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="walkin-primary-btn" onClick={submitRequest}>
                <CheckCircle size={18} /> Create Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="walkin-header-section">
        <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <h2 className="walkin-title"> Walk-in Appointment</h2>
        </div>
       
        <div className="walkin-stats-container">
          <div className="walkin-stat-card walkin-stat-total">
            <span className="walkin-stat-count">{appointments.length}</span>
            <span className="walkin-stat-label">Total</span>
          </div>
          <div className="walkin-stat-card walkin-stat-booked">
            <span className="walkin-stat-count">{getStatusCount("BOOKED")}</span>
            <span className="walkin-stat-label">Booked</span>
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
            <h2 className="walkin-section-title"> Add New Appointment</h2>
            <p className="walkin-section-description">
              Click the button below to create a new walk-in appointment
            </p>
            <button className="walkin-primary-btn" onClick={openModal}>
              <Plus size={18} /> Create Walk-in Appointment
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="walkin-table-section">
          <div className="walkin-card">
            <h2 className="walkin-section-title mb-3">
              Appointments List ({appointments.length})
            </h2>
            
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
                              onClick={() => cancelAppointment(apt.id)}
                              className={`walkin-action-btn walkin-btn-cancel ${apt.status === "CANCELLED" ? "walkin-active" : ""}`}
                              title="Cancel Appointment"
                            >
                              <XCircle size={14} /> Cancel
                            </button>
                            <button 
                              onClick={() => deleteAppointment(apt.id)}
                              className="walkin-action-btn walkin-btn-delete"
                              title="Delete Appointment"
                            >
                              <Trash2 size={14} /> Delete
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