import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./Appointment List.css";

export default function AppointmentList() {
  const authUser = useSelector((state) => state.auth?.user);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [activeActionsId, setActiveActionsId] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    phone: "",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    test: "",
    technician: "",
    location: "",
    type: "Clinic",
    status: "Confirmed",
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

  const unwrapApiArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.appointments)) return payload.appointments;
    if (Array.isArray(payload?.data?.appointments)) return payload.data.appointments;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateForInput = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return date.toISOString().split("T")[0];
  };

  const formatDateLabel = (value) => {
    if (!value) return "All Dates";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const [hours, minutes] = String(value).split(":");
    if (!hours || !minutes) return value;
    const time = new Date();
    time.setHours(Number(hours), Number(minutes), 0, 0);
    return time.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPatient = (appointment) => appointment.patient || appointment.patient_details || {};
  const getDoctor = (appointment) => appointment.doctor || appointment.doctor_details || {};
  const getClinic = (appointment) => appointment.clinic || appointment.clinic_details || {};

  const normalizeStatus = (value) => {
    const statusValue = String(value || "Pending").toLowerCase();
    if (statusValue === "confirmed" || statusValue === "booked" || statusValue === "approved") return "Confirmed";
    if (statusValue === "completed" || statusValue === "complete") return "Completed";
    if (statusValue === "cancelled" || statusValue === "canceled") return "Cancelled";
    return "Pending";
  };

  const normalizeType = (value) => {
    const mode = String(value || "").toLowerCase();
    if (mode === "offline" || mode === "clinic" || mode === "in-clinic") return "Clinic";
    if (mode === "video" || mode === "video-call") return "Video Call";
    if (mode === "voice" || mode === "voice-call") return "Voice Call";
    if (mode === "online") return "Online";
    return value || "N/A";
  };

  const normalizeAppointment = (appointment, index) => {
    const patient = getPatient(appointment);
    const doctor = getDoctor(appointment);
    const clinic = getClinic(appointment);

    return {
      id: appointment.id || appointment.appointment_id || appointment._id || index,
      doctorId: appointment.doctor_id || appointment.doctorId || doctor.id || doctor._id,
      patientName:
        appointment.patient_name ||
        patient.name ||
        patient.full_name ||
        patient.patient_name ||
        "N/A",
      doctorName:
        appointment.doctor_name ||
        doctor.name ||
        doctor.full_name ||
        "N/A",
      clinicName:
        appointment.clinic_name ||
        clinic.name ||
        clinic.clinic_name ||
        "N/A",
      phone:
        appointment.patient_phone ||
        appointment.phone ||
        appointment.mobile ||
        patient.patient_phone ||
        patient.phone ||
        patient.mobile ||
        "N/A",
      date: formatDate(appointment.appointment_date || appointment.date || appointment.created_at),
      rawDate: formatDateForInput(appointment.appointment_date || appointment.date || appointment.created_at),
      time: formatTime(appointment.appointment_time || appointment.time || appointment.created_at),
      rawTime: appointment.appointment_time || appointment.time || appointment.created_at,
      type: normalizeType(appointment.consultation_mode || appointment.type || appointment.mode),
      status: normalizeStatus(appointment.status || appointment.appointment_status),
      test:
        appointment.test_name ||
        appointment.reason ||
        appointment.issue ||
        appointment.symptoms ||
        appointment.department ||
        normalizeType(appointment.consultation_mode || appointment.type || appointment.mode),
      technician:
        appointment.technician_name ||
        appointment.staff_name ||
        appointment.assigned_to ||
        "Kristin",
      location:
        appointment.location ||
        appointment.address ||
        clinic.address ||
        clinic.location ||
        clinic.clinic_address ||
        "N/A",
    };
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadAppointments = async () => {
      const doctorId = getDoctorId();
      if (!doctorId) {
        setError("Doctor id not found. Please login again.");
        setStatus("failed");
        return;
      }

      try {
        setStatus("loading");
        setError("");
        const response = await axios.get(`${API_BASE_URL}/appointments`, {
          headers: getAuthHeaders(),
          params: { doctor_id: doctorId },
          signal: controller.signal,
        });

        const rows = unwrapApiArray(response.data)
          .map(normalizeAppointment)
          .filter((appointment) => !appointment.doctorId || String(appointment.doctorId) === String(doctorId));

        setAppointments(rows);
        setStatus("succeeded");
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(error.response?.data?.message || error.response?.data?.error || error.message || "Failed to load appointments");
        setStatus("failed");
      }
    };

    loadAppointments();

    return () => controller.abort();
  }, [authUser, reloadKey]);

  const getUiStatus = (appointmentStatus) => {
    if (appointmentStatus === "Confirmed") {
      return { label: "Scheduled", className: "scheduled", icon: "fa-solid fa-calendar-check" };
    }
    if (appointmentStatus === "Completed") {
      return { label: "Visited", className: "visited", icon: "fa-solid fa-circle-check" };
    }
    if (appointmentStatus === "Cancelled") {
      return { label: "Cancelled", className: "cancelled", icon: "fa-solid fa-circle-xmark" };
    }
    return { label: "Not confirmed", className: "not-confirmed", icon: "fa-solid fa-clock" };
  };

  const getTimeRange = (appointment) => {
    if (!appointment.rawTime || appointment.rawTime === "N/A") return appointment.time;
    const date = new Date(appointment.rawTime);
    if (Number.isNaN(date.getTime())) return appointment.time;
    const end = new Date(date.getTime() + 30 * 60000);
    return `${formatTime(date)} - ${formatTime(end)}`;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
    const matchesDate = !selectedDate || !appointment.rawDate || appointment.rawDate === selectedDate;
    const query = searchText.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [appointment.patientName, appointment.phone, appointment.test, appointment.technician, appointment.location]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return matchesStatus && matchesDate && matchesSearch;
  });

  const allVisibleSelected =
    filteredAppointments.length > 0 &&
    filteredAppointments.every((appointment) => selectedRows.includes(appointment.id));

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedRows((prev) => prev.filter((id) => !filteredAppointments.some((appointment) => appointment.id === id)));
      return;
    }

    setSelectedRows((prev) => Array.from(new Set([...prev, ...filteredAppointments.map((appointment) => appointment.id)])));
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const shiftSelectedDate = (days) => {
    const base = selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date();
    base.setDate(base.getDate() + days);
    setSelectedDate(base.toISOString().split("T")[0]);
  };

  const updateNewAppointment = (field, value) => {
    setNewAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const getFormTime = (appointment) => {
    if (!appointment?.rawTime || appointment.rawTime === "N/A") return "";
    const date = new Date(appointment.rawTime);
    if (!Number.isNaN(date.getTime())) {
      return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }
    return String(appointment.rawTime).slice(0, 5);
  };

  const appointmentToForm = (appointment) => ({
    patientName: appointment.patientName === "N/A" ? "" : appointment.patientName,
    phone: appointment.phone === "N/A" ? "" : appointment.phone,
    appointmentDate: appointment.rawDate || new Date().toISOString().split("T")[0],
    appointmentTime: getFormTime(appointment),
    test: appointment.test === "N/A" ? "" : appointment.test,
    technician: appointment.technician === "N/A" ? "" : appointment.technician,
    location: appointment.location === "N/A" ? "" : appointment.location,
    type: appointment.type === "N/A" ? "Clinic" : appointment.type,
    status: appointment.status || "Confirmed",
  });

  const buildAppointmentFromForm = (form, existing = {}) => ({
    ...existing,
    id: existing.id || `local-${Date.now()}`,
    doctorId: existing.doctorId || getDoctorId(),
    patientName: form.patientName || "New Patient",
    doctorName: existing.doctorName || "N/A",
    clinicName: existing.clinicName || "N/A",
    phone: form.phone || "N/A",
    date: formatDate(form.appointmentDate),
    rawDate: form.appointmentDate,
    time: formatTime(form.appointmentTime),
    rawTime: `${form.appointmentDate}T${form.appointmentTime || "00:00"}`,
    type: form.type,
    status: form.status,
    test: form.test || form.type,
    technician: form.technician || "N/A",
    location: form.location || "N/A",
  });

  const handleCreateAppointment = (event) => {
    event.preventDefault();
    const localAppointment = buildAppointmentFromForm(newAppointment);

    setAppointments((prev) => [localAppointment, ...prev]);
    setSelectedDate(newAppointment.appointmentDate);
    setShowNewModal(false);
    setNewAppointment({
      patientName: "",
      phone: "",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      test: "",
      technician: "",
      location: "",
      type: "Clinic",
      status: "Confirmed",
    });
  };

  const openEditAppointment = (appointment) => {
    setEditAppointment({ id: appointment.id, form: appointmentToForm(appointment) });
    setViewAppointment(null);
    setActiveActionsId(null);
  };

  const updateEditAppointment = (field, value) => {
    setEditAppointment((prev) => ({ ...prev, form: { ...prev.form, [field]: value } }));
  };

  const handleUpdateAppointment = (event) => {
    event.preventDefault();
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === editAppointment.id
          ? buildAppointmentFromForm(editAppointment.form, appointment)
          : appointment
      )
    );
    setSelectedDate(editAppointment.form.appointmentDate);
    setEditAppointment(null);
  };

  const handleDeleteAppointment = async (appointment) => {
    if (!window.confirm(`Delete appointment for ${appointment.patientName}?`)) return;
    setAppointments((prev) => prev.filter((item) => item.id !== appointment.id));
    setSelectedRows((prev) => prev.filter((id) => id !== appointment.id));
    setActiveActionsId(null);

    if (String(appointment.id).startsWith("local-")) return;

    try {
      await axios.delete(`${API_BASE_URL}/appointments/${appointment.id}`, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      setError(error.response?.data?.message || error.response?.data?.error || "Appointment removed locally. Delete API failed.");
    }
  };

  return (
    <div className="appointment-page">
      <section className="appointment-toolbar">
        <div className="appointment-searchbar">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option>All</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <label>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Search Text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <button type="button">Search</button>
        </div>
      </section>

      {status === "failed" && (
        <div className="appointment-alert" role="alert">
          {error}
        </div>
      )}

      <section className="appointment-header">
        <div>
          <h1>Appointments</h1>
          <p>Showing: <strong>{filteredAppointments.length} Appointments</strong></p>
        </div>
        <div className="appointment-date-actions">
          <button type="button" className="today-link" onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}>Today</button>
          <button type="button" className="nav-round" aria-label="Previous date" onClick={() => shiftSelectedDate(-1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <label className="date-picker-control">
            <span>{formatDateLabel(selectedDate)}</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
            <i className="fa-solid fa-chevron-down"></i>
          </label>
          {selectedDate && (
            <button type="button" className="clear-date-btn" onClick={() => setSelectedDate("")}>
              Clear
            </button>
          )}
          <button type="button" className="nav-round" aria-label="Next date" onClick={() => shiftSelectedDate(1)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button type="button" className="new-appointment-btn" onClick={() => setShowNewModal(true)}>
            <i className="fa-solid fa-plus"></i>
            New Appointment
          </button>
        </div>
      </section>

      <section className="appointment-filter-row">
        <div className="filter-chips">
          {["Life", "Health", "Helong-Term Disability", "Auto Insurance"].map((chip) => (
            <button type="button" key={chip}>{chip} <i className="fa-solid fa-xmark"></i></button>
          ))}
          <button type="button" className="add-filter"><i className="fa-solid fa-plus"></i> Add Filter</button>
          <button type="button" className="delete-filter"><i className="fa-solid fa-xmark"></i> Delete All Filters</button>
        </div>
        <div className="table-options">
          <label><input type="checkbox" defaultChecked /> Hide visited</label>
          <label><input type="checkbox" /> Show Empty</label>
          <select defaultValue="Display Columns">
            <option>Display Columns</option>
          </select>
        </div>
      </section>

      <section className="appointment-table-shell">
        <table className="appointment-table">
          <thead>
            <tr>
              <th className="check-cell"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} /></th>
              <th>Time <i className="fa-solid fa-arrow-up-short-wide"></i></th>
              <th>Patient</th>
              <th>Phone No</th>
              <th>Test</th>
              <th>Technician</th>
              <th>Location</th>
              <th>Status</th>
              <th>Info</th>
              <th className="more-cell"><i className="fa-solid fa-ellipsis-vertical"></i></th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="10" className="appointment-empty">Loading appointments...</td>
              </tr>
            ) : filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="10" className="appointment-empty">No appointments found</td>
              </tr>
            ) : (
              filteredAppointments.map((appointment, index) => {
                const statusMeta = getUiStatus(appointment.status);
                const isSelected = selectedRows.includes(appointment.id);
                return (
                  <tr key={appointment.id} className={isSelected ? "selected" : ""}>
                    <td className="check-cell">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRow(appointment.id)} />
                    </td>
                    <td>{getTimeRange(appointment)}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.phone}</td>
                    <td className="test-cell">{appointment.test}</td>
                    <td>{appointment.technician}</td>
                    <td className="location-cell">{appointment.location}</td>
                    <td>
                      <span className={`status-pill ${statusMeta.className}`}>
                        <i className={statusMeta.icon}></i>
                        {statusMeta.label}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="call-btn" aria-label={`Call ${appointment.patientName}`}>
                        <i className="fa-solid fa-phone"></i>
                      </button>
                    </td>
                    <td className="more-cell">
                      {activeActionsId === appointment.id ? (
                        <div className="row-actions">
                          <button type="button" title="Refresh" onClick={() => setReloadKey((key) => key + 1)}><i className="fa-solid fa-rotate-left"></i></button>
                          <button type="button" title="Update" onClick={() => openEditAppointment(appointment)}><i className="fa-solid fa-pen"></i></button>
                          <button type="button" title="View" onClick={() => { setViewAppointment(appointment); setActiveActionsId(null); }}><i className="fa-solid fa-eye"></i></button>
                          <button type="button" className="danger" title="Delete" onClick={() => handleDeleteAppointment(appointment)}><i className="fa-solid fa-trash"></i></button>
                          <button type="button" onClick={() => setActiveActionsId(null)} title="Close"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>
                      ) : (
                        <button type="button" className="more-btn" aria-label="More actions" onClick={() => setActiveActionsId(appointment.id)}>
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {showNewModal && (
        <div className="appointment-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setShowNewModal(false)}>
          <form className="appointment-modal" onSubmit={handleCreateAppointment} onClick={(event) => event.stopPropagation()}>
            <div className="appointment-modal-header">
              <div>
                <h2>New Appointment</h2>
                <p>Create appointment details. API connection can be wired after UI approval.</p>
              </div>
              <button type="button" onClick={() => setShowNewModal(false)} aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="appointment-form-grid">
              <label>
                Patient Name
                <input
                  required
                  value={newAppointment.patientName}
                  onChange={(event) => updateNewAppointment("patientName", event.target.value)}
                  placeholder="Enter patient name"
                />
              </label>
              <label>
                Phone No
                <input
                  value={newAppointment.phone}
                  onChange={(event) => updateNewAppointment("phone", event.target.value)}
                  placeholder="Enter phone number"
                />
              </label>
              <label>
                Appointment Date
                <input
                  type="date"
                  required
                  value={newAppointment.appointmentDate}
                  onChange={(event) => updateNewAppointment("appointmentDate", event.target.value)}
                />
              </label>
              <label>
                Appointment Time
                <input
                  type="time"
                  required
                  value={newAppointment.appointmentTime}
                  onChange={(event) => updateNewAppointment("appointmentTime", event.target.value)}
                />
              </label>
              <label>
                Test / Reason
                <input
                  value={newAppointment.test}
                  onChange={(event) => updateNewAppointment("test", event.target.value)}
                  placeholder="Digestive Disorders"
                />
              </label>
              <label>
                Technician
                <input
                  value={newAppointment.technician}
                  onChange={(event) => updateNewAppointment("technician", event.target.value)}
                  placeholder="Kristin"
                />
              </label>
              <label className="wide-field">
                Location
                <input
                  value={newAppointment.location}
                  onChange={(event) => updateNewAppointment("location", event.target.value)}
                  placeholder="Clinic or patient location"
                />
              </label>
              <label>
                Type
                <select value={newAppointment.type} onChange={(event) => updateNewAppointment("type", event.target.value)}>
                  <option>Clinic</option>
                  <option>Video Call</option>
                  <option>Voice Call</option>
                  <option>Online</option>
                </select>
              </label>
              <label>
                Status
                <select value={newAppointment.status} onChange={(event) => updateNewAppointment("status", event.target.value)}>
                  <option value="Confirmed">Scheduled</option>
                  <option value="Pending">Not confirmed</option>
                  <option value="Completed">Visited</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
            </div>

            <div className="appointment-modal-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setShowNewModal(false)}>Cancel</button>
              <button type="submit" className="modal-save-btn">Create Appointment</button>
            </div>
          </form>
        </div>
      )}

      {editAppointment && (
        <div className="appointment-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setEditAppointment(null)}>
          <form className="appointment-modal" onSubmit={handleUpdateAppointment} onClick={(event) => event.stopPropagation()}>
            <div className="appointment-modal-header">
              <div>
                <h2>Update Appointment</h2>
                <p>Edit appointment details for the selected patient.</p>
              </div>
              <button type="button" onClick={() => setEditAppointment(null)} aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="appointment-form-grid">
              <label>
                Patient Name
                <input required value={editAppointment.form.patientName} onChange={(event) => updateEditAppointment("patientName", event.target.value)} />
              </label>
              <label>
                Phone No
                <input value={editAppointment.form.phone} onChange={(event) => updateEditAppointment("phone", event.target.value)} />
              </label>
              <label>
                Appointment Date
                <input type="date" required value={editAppointment.form.appointmentDate} onChange={(event) => updateEditAppointment("appointmentDate", event.target.value)} />
              </label>
              <label>
                Appointment Time
                <input type="time" required value={editAppointment.form.appointmentTime} onChange={(event) => updateEditAppointment("appointmentTime", event.target.value)} />
              </label>
              <label>
                Test / Reason
                <input value={editAppointment.form.test} onChange={(event) => updateEditAppointment("test", event.target.value)} />
              </label>
              <label>
                Technician
                <input value={editAppointment.form.technician} onChange={(event) => updateEditAppointment("technician", event.target.value)} />
              </label>
              <label className="wide-field">
                Location
                <input value={editAppointment.form.location} onChange={(event) => updateEditAppointment("location", event.target.value)} />
              </label>
              <label>
                Type
                <select value={editAppointment.form.type} onChange={(event) => updateEditAppointment("type", event.target.value)}>
                  <option>Clinic</option>
                  <option>Video Call</option>
                  <option>Voice Call</option>
                  <option>Online</option>
                </select>
              </label>
              <label>
                Status
                <select value={editAppointment.form.status} onChange={(event) => updateEditAppointment("status", event.target.value)}>
                  <option value="Confirmed">Scheduled</option>
                  <option value="Pending">Not confirmed</option>
                  <option value="Completed">Visited</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
            </div>

            <div className="appointment-modal-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setEditAppointment(null)}>Cancel</button>
              <button type="submit" className="modal-save-btn">Update Appointment</button>
            </div>
          </form>
        </div>
      )}

      {viewAppointment && (
        <div className="appointment-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setViewAppointment(null)}>
          <div className="appointment-modal appointment-view-modal" onClick={(event) => event.stopPropagation()}>
            <div className="appointment-modal-header">
              <div>
                <h2>Appointment Details</h2>
                <p>{viewAppointment.patientName}</p>
              </div>
              <button type="button" onClick={() => setViewAppointment(null)} aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="appointment-detail-grid">
              <div><span>Time</span><strong>{getTimeRange(viewAppointment)}</strong></div>
              <div><span>Patient</span><strong>{viewAppointment.patientName}</strong></div>
              <div><span>Phone No</span><strong>{viewAppointment.phone}</strong></div>
              <div><span>Test</span><strong>{viewAppointment.test}</strong></div>
              <div><span>Technician</span><strong>{viewAppointment.technician}</strong></div>
              <div><span>Status</span><strong>{getUiStatus(viewAppointment.status).label}</strong></div>
              <div className="wide-field"><span>Location</span><strong>{viewAppointment.location}</strong></div>
            </div>

            <div className="appointment-modal-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setViewAppointment(null)}>Close</button>
              <button type="button" className="modal-save-btn" onClick={() => openEditAppointment(viewAppointment)}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
