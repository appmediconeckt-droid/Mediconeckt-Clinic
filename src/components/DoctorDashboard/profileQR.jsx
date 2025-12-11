import React, { useState, useEffect } from "react";
import "./ProfileCard.css";

export default function ProfileCard({
  profile = {
    name: "Dr. Arun Badode",
    role: "General Physician",
    clinic: "MedicOne Clinic",
    phone: "+91 98765 43210",
    experience: "15+ Years",
  },
  qrData = "Arunbadode",
}) {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    setQrSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        qrData
      )}`
    );
  }, [qrData]);

  return (
    <div className="atm-card container">
      {/* Left Side */}
      <div className="atm-left">
        <div className="chip"></div>

        <h3 className="atm-name">{profile.name}</h3>
        <p className="atm-role">{profile.role}</p>

        <div className="atm-info">
          <p><strong>Clinic:</strong> {profile.clinic}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Experience:</strong> {profile.experience}</p>
        </div>
      </div>

      {/* Right Side - QR */}
      <div className="atm-right">
        <img src={qrSrc} alt="QR Code" className="atm-qr" />
        <p className="atm-scan">Scan for Appointment</p>
      </div>
    </div>
  );
}
