import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CheckCircle, Clock, XCircle, Trash2, Plus } from "lucide-react";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./WalkInAppointment.css";

const WALKIN_BASE_URL = `${API_BASE_URL}/walkin-appointments`;

export default function WalkInAppointment() {
  const authUser = useSelector((state) => state.auth?.user);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle");
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    problem: ""
  });
  const [errors, setErrors] = useState({});

  const getStoredAuthUser = () => {
    try {
      return JSON.parse(localStorage.getItem("authUser") || "null");
    } catch (error) {
      return null;
    }
  };

  const extractDoctorId = (user) => {
    if (!user) return "";
    return user.doctor_id || user.doctorId || user.id || user._id || user.user_id || user.userId || "";
  };

  const doctorId = extractDoctorId(authUser || getStoredAuthUser());

  const unwrapApiArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.appointments)) return payload.appointments;
    if (Array.isArray(payload?.walkins)) return payload.walkins;
    return [];
  };

  const formatAppointmentDate = (value) => {
    if (!value) return new Date().toLocaleDateString();
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString();
  };

  const formatAppointmentTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const normalizeAppointment = (item) => {
    const createdAt = item.created_at || item.createdAt || item.date || item.appointment_date;
    return {
      id: item.id || item._id,
      name: item.name || item.patient_name || item.patientName || item.full_name || "",
      phone: item.phone || item.contact_number || item.contact_number || "",
      gender: item.gender || "Not specified",
      problem: item.problem || item.symptoms || item.reason || item.description || "",
      type: item.type || "WALK_IN",
      status: (item.status || "BOOKED").toUpperCase(),
      date: formatAppointmentDate(createdAt),
      time: item.time || item.appointment_time || formatAppointmentTime(createdAt),
    };
  };

  const loadAppointments = async () => {
    if (!doctorId) {
      setApiError("Doctor ID not found. Please login again.");
      setAppointments([]);
      return;
    }

    try {
      setStatus("loading");
      setApiError("");
      const response = await axios.get(WALKIN_BASE_URL, {
        headers: getAuthHeaders(),
        params: { doctor_id: doctorId },
      });
      setAppointments(unwrapApiArray(response.data).map(normalizeAppointment));
      setStatus("succeeded");
    } catch (error) {
      setApiError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to load walk-in appointments");
      setAppointments([]);
      setStatus("failed");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [doctorId]);

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

  const submitRequest = async () => {
    if (!validateForm()) {
      return;
    }

    if (!doctorId) {
      setApiError("Doctor ID not found. Please login again.");
      return;
    }

    const payload = {
      patient_name: formData.name,
      contact_number: formData.phone,
      gender: formData.gender || "Not specified",
      symptoms: formData.problem,
      status: "booked",
    };

    try {
      setSubmitting(true);
      setApiError("");
      const response = await axios.post(WALKIN_BASE_URL, payload, {
        headers: getAuthHeaders(),
      });
      closeModal();
      await loadAppointments();
    } catch (error) {
      setApiError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to create walk-in appointment");
    } finally {
      setSubmitting(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      setApiError("");
      const response = await axios.patch(`${WALKIN_BASE_URL}/${id}`, {
        status: "CANCELLED",
        doctor_id: doctorId,
      }, {
        headers: getAuthHeaders(),
      });
      const updatedAppointment = response.data?.data || response.data?.appointment || response.data;
      setAppointments(appointments.map(apt =>
        apt.id === id ? normalizeAppointment({ ...apt, ...updatedAppointment, status: "CANCELLED" }) : apt
      ));
    } catch (error) {
      setApiError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to cancel appointment");
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        setApiError("");
        await axios.delete(`${WALKIN_BASE_URL}/${id}`, {
          headers: getAuthHeaders(),
          data: { doctor_id: doctorId },
        });
        setAppointments(appointments.filter(apt => apt.id !== id));
      } catch (error) {
        setApiError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete appointment");
      }
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
              <button className="walkin-primary-btn" onClick={submitRequest} disabled={submitting}>
                <CheckCircle size={18} /> {submitting ? "Creating..." : "Create Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="walkin-header-section">
        <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <h2 className="walkin-title"> Walk-in Appointment</h2>
        </div>

        {apiError && (
          <div className="walkin-error-message mb-3">
            {apiError}
          </div>
        )}
       
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
            
            {status === "loading" ? (
              <div className="walkin-empty-state">
                <Clock size={48} />
                <p>Loading appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
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
