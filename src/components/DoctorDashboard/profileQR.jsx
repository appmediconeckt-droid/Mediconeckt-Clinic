import React, { useState, useEffect } from "react";
import "./ProfileCard.css";

export default function ProfileCard({
  profile = {
    name: "Dr. Ronit Roy",
    role: "General Physician",
    clinic: "MedicOne Clinic",
    phone: "+91 98765 43210",
    experience: "15+ Years",
  },
  qrData = "Arunbadode",
}) {
  const [qrSrc, setQrSrc] = useState("");
  const [profileImage, setProfileImage] = useState(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cd3WPk9UN_F0b0ieXUS5ufEV0fgYfuDO1Q&s"
    );

  useEffect(() => {
    setQrSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        qrData
      )}`
    );
  }, [qrData]);

  return (
  <div>
      <div className="atm-card ">
      {/* Left Side */}
      <div className="atm-left ">
        <div className="dropdown profile-element">
          <div
            className="fw-bold p-1 rounded-4 profile d-flex align-items-center"
            style={{ cursor: "pointer" }}

          >
            <img
              src={profileImage}
              alt="profile"
              className="rounded-circle"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
        </div>

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
  </div>
  );
}
