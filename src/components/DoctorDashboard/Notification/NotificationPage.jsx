import React, { useState, useEffect } from "react";
import "./NotificationPage.css";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        type: "New Appointment Notification",
        message: "A new appointment has been booked by Mr. Ramesh.",
        time: "10 mins ago",
        color: "appointment",
      },
      {
        id: 2,
        type: "New Report Uploaded Notification",
        message: "Patient uploaded new prescription & documents.",
        time: "30 mins ago",
        color: "report",
      },
      {
        id: 3,
        type: "Payment Confirmation Notification",
        message: "₹500 received from Patient Sunita.",
        time: "1 hour ago",
        color: "payment",
      },
      {
        id: 4,
        type: "New Message Notification",
        message: "You received a new message from Patient Ravi.",
        time: "2 hours ago",
        color: "message",
      },
      {
        id: 5,
        type: "Emergency Alert Notification",
        message: "Emergency request from Patient Aarti.",
        time: "3 hours ago",
        color: "emergency",
      },
      {
        id: 6,
        type: "Upcoming Follow-up Notification",
        message: "Follow-up due tomorrow for Patient Mehul.",
        time: "Yesterday",
        color: "followup",
      },
    ];

    setNotifications(data);
  }, []);

  return (
    <div className="doctor-notification p-4">
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2 className="">Notifications</h2>
      </div>
      

      {notifications.map((item) => (
        <NotificationCard
          key={item.id}
          type={item.type}
          message={item.message}
          time={item.time}
          colorClass={item.color}
        />
      ))}
    </div>
  );
}

function NotificationCard({ type, message, time, colorClass }) {
  return (
    <div className={`doctor-notification-card ${colorClass}`}>
      <div className="notification-info">
        <h4>{type}</h4>
        <p>{message}</p>
      </div>
      <span className="doctor-notification-time">{time}</span>
    </div>
  );
}
