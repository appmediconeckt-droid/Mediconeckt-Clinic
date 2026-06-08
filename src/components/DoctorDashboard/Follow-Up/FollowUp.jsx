import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./FollowUp.css";

const FOLLOWUP_BASE_URL = `${API_BASE_URL}/followups`;

function FollowUp() {
  const authUser = useSelector((state) => state.auth?.user);
  const [followUps, setFollowUps] = useState([]);
  const [appointmentPatients, setAppointmentPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [status, setStatus] = useState("idle");
  const [apiError, setApiError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientId: "",
    appointmentId: "",
    followUpDate: "",
    followUpTime: "",
    followUpType: "routine",
    notes: "",
  });

  const getStoredAuthUser = () => {
    try {
      return JSON.parse(localStorage.getItem("authUser") || "null");
    } catch {
      return null;
    }
  };

  const getDoctorId = () => {
    const user = authUser || getStoredAuthUser() || {};
    return user.doctor_id || user.doctorId || user.id || user._id || user.user_id || user.userId || "";
  };

  const getDoctorName = () => {
    const user = authUser || getStoredAuthUser() || {};
    return user.name || user.full_name || user.doctor_name || "Doctor";
  };

  const unwrapApiArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.followUps)) return payload.followUps;
    if (Array.isArray(payload?.followups)) return payload.followups;
    if (Array.isArray(payload?.data?.followUps)) return payload.data.followUps;
    if (Array.isArray(payload?.data?.followups)) return payload.data.followups;
    if (Array.isArray(payload?.appointments)) return payload.appointments;
    if (Array.isArray(payload?.data?.appointments)) return payload.data.appointments;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const getPatient = (record) => record.patient || record.patient_details || {};
  const getDoctor = (record) => record.doctor || record.doctor_details || {};

  const getPatientId = (record) => {
    const patient = getPatient(record);
    return record.patient_id || record.patientId || patient.id || patient._id || "";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const normalizeDateInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return String(dateStr).slice(0, 10);
    return date.toISOString().split("T")[0];
  };

  const normalizeStatus = (value) => {
    const statusValue = String(value || "pending").toLowerCase();
    if (statusValue === "completed" || statusValue === "complete") return "completed";
    if (statusValue === "scheduled" || statusValue === "booked") return "scheduled";
    return "pending";
  };

  const normalizeType = (value) => {
    const type = String(value || "routine").toLowerCase();
    if (type === "urgent") return "urgent";
    if (type === "consultation") return "consultation";
    return "routine";
  };

  const buildAppointmentPatients = (appointments) => {
    const patientMap = new Map();

    appointments.forEach((appointment) => {
      const patient = getPatient(appointment);
      const patientId = getPatientId(appointment);
      if (!patientId) return;

      const patientName =
        appointment.patient_name ||
        patient.name ||
        patient.full_name ||
        patient.patient_name ||
        "Unnamed Patient";

      const existing = patientMap.get(String(patientId));
      const appointmentDate = appointment.appointment_date || appointment.date || appointment.created_at || "";
      const patientRecord = {
        id: patientId,
        appointmentId: appointment.id || appointment.appointment_id || appointment._id || "",
        name: patientName,
        age: appointment.age || patient.age || "N/A",
        phone: appointment.phone_number || appointment.phone || patient.phone_number || patient.phone || patient.mobile || "N/A",
        lastVisit: appointmentDate,
        issue: appointment.symptoms || appointment.health_issue || appointment.problem || appointment.reason || appointment.notes || "N/A",
      };

      if (!existing || new Date(appointmentDate) > new Date(existing.lastVisit || 0)) {
        patientMap.set(String(patientId), patientRecord);
      }
    });

    return Array.from(patientMap.values());
  };

  const normalizeFollowUp = (followUp, index) => {
    const patient = getPatient(followUp);
    const doctor = getDoctor(followUp);
    const patientId = getPatientId(followUp);
    const matchedPatient = appointmentPatients.find((item) => String(item.id) === String(patientId));

    return {
      id: followUp.id || followUp.followup_id || followUp.follow_up_id || followUp._id || index,
      doctorId: followUp.doctor_id || followUp.doctorId || doctor.id || doctor._id,
      patientId,
      appointmentId: followUp.appointment_id || followUp.appointmentId || "",
      name:
        followUp.patient_name ||
        patient.name ||
        patient.full_name ||
        matchedPatient?.name ||
        "N/A",
      age: followUp.age || patient.age || matchedPatient?.age || "N/A",
      phone:
        followUp.phone_number ||
        followUp.phone ||
        patient.phone_number ||
        patient.phone ||
        matchedPatient?.phone ||
        "N/A",
      lastVisit: followUp.last_visit || followUp.lastVisit || matchedPatient?.lastVisit || followUp.created_at,
      followUpDate: followUp.follow_up_date || followUp.follow_up_date || followUp.follow_up_date || followUp.date,
      followUpTime: followUp.followup_time || followUp.follow_up_time || followUp.followUpTime || followUp.time || "",
      followUpStatus: normalizeStatus(followUp.status || followUp.followup_status || followUp.followUpStatus),
      followUpType: normalizeType(
        followUp.follow_up_type ||
        followUp.type ||
        followUp.followup_type ||
        followUp.followUpType
      ),
      notes: followUp.notes || followUp.reason || followUp.description || matchedPatient?.issue || "N/A",
      doctor: followUp.doctor_name || doctor.name || doctor.full_name || getDoctorName(),
    };
  };

  const loadAppointmentPatients = async (doctorId, signal) => {
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      headers: getAuthHeaders(),
      params: { doctor_id: doctorId },
      signal,
    });

    const appointments = unwrapApiArray(response.data).filter((appointment) => {
      const doctor = getDoctor(appointment);
      const appointmentDoctorId = appointment.doctor_id || appointment.doctorId || doctor.id || doctor._id;
      return !appointmentDoctorId || String(appointmentDoctorId) === String(doctorId);
    });

    setAppointmentPatients(buildAppointmentPatients(appointments));
  };

  const loadFollowUps = async (doctorId, signal) => {
    const response = await axios.get(FOLLOWUP_BASE_URL, {
      headers: getAuthHeaders(),
      params: { doctor_id: doctorId },
      signal,
    });

    const rows = unwrapApiArray(response.data)
      .map(normalizeFollowUp)
      .filter((followUp) => !followUp.doctorId || String(followUp.doctorId) === String(doctorId));

    setFollowUps(rows);
  };

  const loadData = async (signal) => {
    const doctorId = getDoctorId();
    if (!doctorId) {
      setApiError("Doctor id not found. Please login again.");
      setStatus("failed");
      return;
    }

    try {
      setStatus("loading");
      setApiError("");
      await loadAppointmentPatients(doctorId, signal);
      await loadFollowUps(doctorId, signal);
      setStatus("succeeded");
    } catch (error) {
      if (axios.isCancel(error)) return;
      setApiError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to load follow-ups");
      setStatus("failed");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
  }, [authUser]);

  useEffect(() => {
    let result = followUps;

    if (filterStatus !== "all") {
      result = result.filter((patient) => patient.followUpStatus === filterStatus);
    }

    if (filterType !== "all") {
      result = result.filter((patient) => patient.followUpType === filterType);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((patient) =>
        patient.name.toLowerCase().includes(term) ||
        String(patient.phone).includes(term) ||
        patient.doctor.toLowerCase().includes(term)
      );
    }

    setFilteredPatients(result);
  }, [followUps, filterStatus, filterType, searchTerm]);

  const selectedPatient = useMemo(
    () => appointmentPatients.find((patient) => String(patient.id) === String(newPatient.patientId)),
    [appointmentPatients, newPatient.patientId]
  );

  const handleStatusChange = async (followUpId, newStatus) => {
    const current = followUps.find((patient) => patient.id === followUpId);
    if (!current) return;

    const previous = followUps;
    setFollowUps((prev) =>
      prev.map((patient) =>
        patient.id === followUpId ? { ...patient, followUpStatus: newStatus } : patient
      )
    );

    try {
      await axios.put(
        `${FOLLOWUP_BASE_URL}/${followUpId}`,
        {
          doctor_id: getDoctorId(),
          patient_id: current.patientId,
          appointment_id: current.appointmentId || undefined,
          follow_up_date: normalizeDateInput(current.followUpDate),
          follow_up_time: current.followUpTime || undefined,
          follow_up_type: current.followUpType,
          type: current.followUpType,
          status: newStatus,
          notes: current.notes,
        },
        { headers: getAuthHeaders() }
      );
    } catch (error) {
      setFollowUps(previous);
      alert(error.response?.data?.message || error.response?.data?.error || "Failed to update follow-up status");
    }
  };

  const resetForm = () => {
    setNewPatient({
      patientId: "",
      appointmentId: "",
      followUpDate: "",
      followUpTime: "",
      followUpType: "routine",
      notes: "",
    });
  };

  const handleAddPatient = async () => {
    const doctorId = getDoctorId();

    if (!newPatient.patientId || !newPatient.followUpDate) {
      alert("Please select patient and follow-up date");
      return;
    }

    const payload = {
      doctor_id: doctorId,
      patient_id: newPatient.patientId,
      appointment_id: newPatient.appointmentId || selectedPatient?.appointmentId || undefined,
      follow_up_date: newPatient.followUpDate,
      follow_up_time: newPatient.followUpTime || undefined,
      follow_up_type: newPatient.followUpType,
      type: newPatient.followUpType,
      status: "pending",
      reason: newPatient.notes || selectedPatient?.issue || "",
      notes: newPatient.notes || selectedPatient?.issue || "",
    };

    try {
      setIsSaving(true);
      await axios.post(FOLLOWUP_BASE_URL, payload, { headers: getAuthHeaders() });
      await loadData();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || "Failed to add follow-up");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFollowUp = async (followUpId) => {
    if (!window.confirm("Are you sure you want to delete this follow-up?")) return;

    try {
      await axios.delete(`${FOLLOWUP_BASE_URL}/${followUpId}`, {
        headers: getAuthHeaders(),
        data: { doctor_id: getDoctorId() },
      });
      setFollowUps((prev) => prev.filter((item) => item.id !== followUpId));
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || "Failed to delete follow-up");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "patientId"
        ? {
            appointmentId:
              appointmentPatients.find((patient) => String(patient.id) === String(value))?.appointmentId || "",
          }
        : {}),
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed": return "fup-status-badge-completed";
      case "scheduled": return "fup-status-badge-scheduled";
      default: return "fup-status-badge-pending";
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "urgent": return "fup-type-badge-urgent";
      case "consultation": return "fup-type-badge-consultation";
      default: return "fup-type-badge-routine";
    }
  };

  const getUpcomingCount = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return followUps.filter((p) => {
      const followUpDate = new Date(p.followUpDate);
      return followUpDate >= today && followUpDate <= nextWeek && p.followUpStatus !== "completed";
    }).length;
  };

  return (
    <div className="fup-container">
      <header className="fup-header">
        <h1 className="fup-title">
          <i className="fas fa-clipboard-check fup-title-icon"></i>
          Patient Follow-up Management
        </h1>
        <p className="fup-subtitle">Track and manage patient follow-ups efficiently</p>
      </header>

      <div className="fup-dashboard">
        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}

        <div className="fup-stats-cards">
          <div className="fup-stat-card fup-stat-total">
            <div className="fup-stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">{followUps.length}</h3>
              <p className="fup-stat-label">Total Follow-ups</p>
            </div>
          </div>

          <div className="fup-stat-card fup-stat-pending">
            <div className="fup-stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">
                {followUps.filter((p) => p.followUpStatus === "pending").length}
              </h3>
              <p className="fup-stat-label">Pending Follow-ups</p>
            </div>
          </div>

          <div className="fup-stat-card fup-stat-upcoming">
            <div className="fup-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">{getUpcomingCount()}</h3>
              <p className="fup-stat-label">Upcoming (7 days)</p>
            </div>
          </div>

          <div className="fup-stat-card fup-stat-completed">
            <div className="fup-stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">
                {followUps.filter((p) => p.followUpStatus === "completed").length}
              </h3>
              <p className="fup-stat-label">Completed</p>
            </div>
          </div>
        </div>

        <div className="fup-controls">
          <div className="fup-search-container">
            <i className="fas fa-search fup-search-icon"></i>
            <input
              type="text"
              placeholder="Search patients by name, phone or doctor..."
              className="fup-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="fup-filter-group">
            <select
              className="fup-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="fup-filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <button
            className="fup-add-button"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i> Add New Follow-up
          </button>
        </div>

        <div className="fup-table-container">
          <div className="fup-table-header">
            <div className="fup-table-row fup-table-header-row">
              <div className="fup-table-col fup-col-patient">Patient Details</div>
              <div className="fup-table-col fup-col-date">Last Visit</div>
              <div className="fup-table-col fup-col-followup">Follow-up Date</div>
              <div className="fup-table-col fup-col-status">Status</div>
              <div className="fup-table-col fup-col-type">Type</div>
              <div className="fup-table-col fup-col-doctor">Doctor</div>
              <div className="fup-table-col fup-col-actions">Actions</div>
            </div>
          </div>

          <div className="fup-table-body">
            {status === "loading" ? (
              <div className="fup-no-results">
                <h3>Loading follow-ups...</h3>
              </div>
            ) : filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div className="fup-table-row fup-table-data-row" key={patient.id}>
                  <div className="fup-table-col fup-col-patient">
                    <div className="fup-patient-info">
                      <div className="fup-patient-avatar">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="fup-patient-details">
                        <h4 className="fup-patient-name">{patient.name}</h4>
                        <p className="fup-patient-meta">Age: {patient.age} | Phone: {patient.phone}</p>
                        <p className="fup-patient-notes">{patient.notes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="fup-table-col fup-col-date">
                    {formatDate(patient.lastVisit)}
                  </div>

                  <div className="fup-table-col fup-col-followup">
                    <div className="fup-followup-date">
                      {formatDate(patient.followUpDate)}
                    </div>
                  </div>

                  <div className="fup-table-col fup-col-status">
                    <span className={`fup-status-badge ${getStatusClass(patient.followUpStatus)}`}>
                      {patient.followUpStatus.charAt(0).toUpperCase() + patient.followUpStatus.slice(1)}
                    </span>
                  </div>

                  <div className="fup-table-col fup-col-type">
                    <span className={`fup-type-badge ${getTypeClass(patient.followUpType)}`}>
                      {patient.followUpType.charAt(0).toUpperCase() + patient.followUpType.slice(1)}
                    </span>
                  </div>

                  <div className="fup-table-col fup-col-doctor">
                    <div className="fup-doctor-info">
                      <i className="fas fa-user-md fup-doctor-icon"></i>
                      <span>{patient.doctor}</span>
                    </div>
                  </div>

                  <div className="fup-table-col fup-col-actions">
                    <div className="fup-action-buttons">
                      <select
                        className="fup-status-select"
                        value={patient.followUpStatus}
                        onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                      </select>

                      <a className="fup-action-btn fup-call-btn" href={`tel:${patient.phone}`} aria-label="Call patient">
                        <i className="fas fa-phone"></i>
                      </a>

                      <button
                        className="fup-action-btn fup-notes-btn"
                        onClick={() => handleDeleteFollowUp(patient.id)}
                        aria-label="Delete follow-up"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="fup-no-results">
                <i className="fas fa-search fup-no-results-icon"></i>
                <h3>No follow-ups found</h3>
                <p>Try changing your filters or create a new follow-up</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fup-modal-overlay">
          <div className="fup-modal">
            <div className="fup-modal-header">
              <h2 className="fup-modal-title">Add New Follow-up</h2>
              <button
                className="fup-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="fup-modal-body">
              <div className="fup-form-group">
                <label className="fup-form-label">Patient *</label>
                <select
                  name="patientId"
                  className="fup-form-input"
                  value={newPatient.patientId}
                  onChange={handleInputChange}
                >
                  <option value="">Select patient</option>
                  {appointmentPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPatient && (
                <div className="fup-form-group">
                  <label className="fup-form-label">Last Appointment Issue</label>
                  <input
                    type="text"
                    className="fup-form-input"
                    value={selectedPatient.issue}
                    disabled
                  />
                </div>
              )}

              <div className="fup-form-row">
                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Follow-up Date *</label>
                  <input
                    type="date"
                    name="followUpDate"
                    className="fup-form-input"
                    value={newPatient.followUpDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Follow-up Time</label>
                  <input
                    type="time"
                    name="followUpTime"
                    className="fup-form-input"
                    value={newPatient.followUpTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="fup-form-group">
                <label className="fup-form-label">Follow-up Type</label>
                <select
                  name="followUpType"
                  className="fup-form-input"
                  value={newPatient.followUpType}
                  onChange={handleInputChange}
                >
                  <option value="routine">Routine</option>
                  <option value="urgent">Urgent</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              <div className="fup-form-group">
                <label className="fup-form-label">Notes</label>
                <textarea
                  name="notes"
                  className="fup-form-textarea"
                  value={newPatient.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes..."
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="fup-modal-footer">
              <button
                className="fup-btn-secondary"
                onClick={() => setShowAddModal(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                className="fup-btn-primary"
                onClick={handleAddPatient}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Add Follow-up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowUp;
