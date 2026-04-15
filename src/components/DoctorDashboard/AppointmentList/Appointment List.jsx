import React, { useState, useMemo } from "react";
import "./Appointment List.css";
import "./Appointment List.responsive.css";

export default function AppointmentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const appointments = [
    {
      id: 1,
      patientName: "Rahul Sharma",
      doctorName: "Dr. Mehta",
      clinicName: "City Health Clinic",
      phone: "9876543210",
      date: "2025-01-10",
      time: "10:30 AM",
      type: "Clinic",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Anjali Verma",
      doctorName: "Dr. Ritu",
      clinicName: "Prime Medical Center",
      phone: "9811223344",
      date: "2025-01-11",
      time: "12:00 PM",
      type: "Online",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Suresh Patel",
      doctorName: "Dr. Kiran",
      clinicName: "Sunrise Clinic",
      phone: "9988776655",
      date: "2025-01-12",
      time: "02:30 PM",
      type: "Clinic",
      status: "Completed",
    },
    {
      id: 4,
      patientName: "Neha Jain",
      doctorName: "Dr. Verma",
      clinicName: "Care & Cure Hospital",
      phone: "9123456780",
      date: "2025-01-13",
      time: "11:00 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 5,
      patientName: "Vikas Yadav",
      doctorName: "Dr. Ajay",
      clinicName: "Wellness Point Clinic",
      phone: "9001122334",
      date: "2025-01-14",
      time: "04:00 PM",
      type: "Voice Call",
      status: "Cancelled",
    },
    {
      id: 6,
      patientName: "Meena Kumari",
      doctorName: "Dr. Neha",
      clinicName: "Lotus Hospital",
      phone: "9797979797",
      date: "2025-01-15",
      time: "01:30 PM",
      type: "Online",
      status: "Pending",
    },
    {
      id: 7,
      patientName: "Rohit Singh",
      doctorName: "Dr. Rohan",
      clinicName: "Healing Touch Clinic",
      phone: "9345678901",
      date: "2025-01-16",
      time: "10:00 AM",
      type: "Clinic",
      status: "Confirmed",
    },
    {
      id: 8,
      patientName: "Pooja Sharma",
      doctorName: "Dr. Kavita",
      clinicName: "Healthy Life Center",
      phone: "9877012345",
      date: "2025-01-17",
      time: "03:15 PM",
      type: "Video Call",
      status: "Completed",
    },
    {
      id: 9,
      patientName: "Mohit Gupta",
      doctorName: "Dr. Nikhil",
      clinicName: "Metro Care Clinic",
      phone: "9812345678",
      date: "2025-01-18",
      time: "09:45 AM",
      type: "Clinic",
      status: "Pending",
    },
    {
      id: 10,
      patientName: "Ananya Raj",
      doctorName: "Dr. Shalini",
      clinicName: "Super Speciality Clinic",
      phone: "9876001122",
      date: "2025-01-19",
      time: "05:00 PM",
      type: "Online",
      status: "Confirmed",
    }
  ];

  return (
    <div className="p-4">
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2 className="mb-3">Appointment List</h2>

        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search by patient phone..."
            aria-label="Search by patient phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>


      <div className="table-responsive">
        <table className="table responsive-table table-hover shadow-sm " style={{ background: "#ffe6e6", borderRadius: "10px" }}>
        <thead className="" style={{ background: "#ff7b7b" }}>
          <tr>
            <th style={{color:"white"}}>Patient</th>
            <th style={{color:"white"}}>Clinic Name</th>
            <th style={{color:"white"}}>Phone</th>
            <th style={{color:"white"}}>Date</th>
            <th style={{color:"white"}}>Time</th>
            <th style={{color:"white"}}>Type</th>
            <th style={{color:"white"}}>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments
            .filter((a) => {
              const q = searchTerm.trim();
              if (!q) return true;
              return a.phone.includes(q) || a.patientName.toLowerCase().includes(q.toLowerCase());
            })
            .map((a) => (
            <tr
              key={a.id}
              className="table-row-animation"
              style={{ cursor: "pointer", transition: "0.3s" }}
            >
              <td data-label="Patient">{a.patientName}</td>

              <td data-label="Clinic Name">{a.clinicName}</td>
              <td data-label="Phone">{a.phone}</td>
              <td data-label="Date">{a.date}</td>
              <td data-label="Time">{a.time}</td>
              <td data-label="Type">{a.type}</td>
              <td data-label="Status">
                <span
                  className="badge px-3 py-2"
                  style={{
                    background:
                      a.status === "Confirmed"
                        ? "#28a745"
                        : a.status === "Pending"
                          ? "#ffc107"
                          : a.status === "Completed"
                            ? "#17a2b8"
                            : "#dc3545",
                    fontSize: "14px",
                  }}
                >
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Row Hover Animation */}
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
