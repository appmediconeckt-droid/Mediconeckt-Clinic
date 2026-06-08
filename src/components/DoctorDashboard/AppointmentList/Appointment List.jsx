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
        appointment.patient_phone ||
        patient.patient_phone ||
        patient.patient_phone ||
        patient.patient_phone ||
        "N/A",
      date: formatDate(appointment.appointment_date || appointment.date || appointment.created_at),
      time: formatTime(appointment.appointment_time || appointment.time || appointment.created_at),
      type: normalizeType(appointment.consultation_mode || appointment.type || appointment.mode),
      status: normalizeStatus(appointment.status || appointment.appointment_status),
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
  }, [authUser]);

  const getStatusColor = (appointmentStatus) => {
    if (appointmentStatus === "Confirmed") return "#28a745";
    if (appointmentStatus === "Pending") return "#ffc107";
    if (appointmentStatus === "Completed") return "#17a2b8";
    return "#dc3545";
  };

  return (
    <div className="p-4">
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2 className="mb-3">Appointment List</h2>
      </div>

      {status === "failed" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <table className="table table-hover shadow-sm" style={{ background: "#ffe6e6", borderRadius: "10px" }}>
        <thead className="" style={{ background: "#ff7b7b" }}>
          <tr>
            <th style={{ color: "white" }}>Patient</th>
            <th style={{ color: "white" }}>Clinic Name</th>
            <th style={{ color: "white" }}>Phone</th>
            <th style={{ color: "white" }}>Date</th>
            <th style={{ color: "white" }}>Time</th>
            <th style={{ color: "white" }}>Type</th>
            <th style={{ color: "white" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {status === "loading" ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Loading appointments...
              </td>
            </tr>
          ) : appointments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((a) => (
              <tr
                key={a.id}
                className="table-row-animation"
                style={{ cursor: "pointer", transition: "0.3s" }}
              >
                <td>{a.patientName}</td>
                <td>{a.clinicName}</td>
                <td>{a.phone}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.type}</td>
                <td>
                  <span
                    className="badge px-3 py-2"
                    style={{
                      background: getStatusColor(a.status),
                      fontSize: "14px",
                    }}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style>
        {`
          .table-row-animation:hover {
            background-color: #ffd1d1;
            transform: scale(1.01);
          }
        `}
      </style>
    </div>
  );
}
