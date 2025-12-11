import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppointmentList() {
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
      <h2 className="">
        Appointment List
      </h2>

      <table className="table table-hover shadow-sm" style={{ background: "#ffe6e6", borderRadius: "10px" }}>
        <thead className="text-white" style={{ background: "#ff7b7b" }}>
          <tr>
            <th>Patient</th>
            
            <th>Clinic Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
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
