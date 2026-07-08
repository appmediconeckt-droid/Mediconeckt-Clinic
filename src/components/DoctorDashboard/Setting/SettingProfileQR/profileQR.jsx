// import React, { useState, useEffect } from "react";
// import "./ProfileCard.css";

// export default function ProfileCard({
//   profile = {
//     name: "Dr. Ronit Roy",
//     role: "General Physician",
//     clinic: "MedicOne Clinic",
//     phone: "+91 98765 43210",
//     experience: "15+ Years",
//   },
//   qrData = "Arunbadode",
// }) {
//   const [qrSrc, setQrSrc] = useState("");
//   const [profileImage, setProfileImage] = useState(
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cd3WPk9UN_F0b0ieXUS5ufEV0fgYfuDO1Q&s"
//     );

//   useEffect(() => {
//     setQrSrc(
//       `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
//         qrData
//       )}`
//     );
//   }, [qrData]);

//   return (
//   <div>
//       <div className="atm-card ">
//       {/* Left Side */}
//       <div className="atm-left ">
//         <div className="dropdown profile-element">
//           <div
//             className="fw-bold p-1 rounded-4 profile d-flex align-items-center"
//             style={{ cursor: "pointer" }}

//           >
//             <img
//               src={profileImage}
//               alt="profile"
//               className="rounded-circle"
//               style={{ width: "80px", height: "80px" }}
//             />
//           </div>
//         </div>

//         <h3 className="atm-name">{profile.name}</h3>
//         <p className="atm-role">{profile.role}</p>

//         <div className="atm-info">
//           <p><strong>Clinic:</strong> {profile.clinic}</p>
//           <p><strong>Phone:</strong> {profile.phone}</p>
//           <p><strong>Experience:</strong> {profile.experience}</p>
//         </div>
//       </div>

//       {/* Right Side - QR */}
//       <div className="atm-right">
//         <img src={qrSrc} alt="QR Code" className="atm-qr" />
//         <p className="atm-scan">Scan for Appointment</p>
//       </div>
//     </div>
//   </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileCard.css";
import { API_BASE_URL } from "../../../../redux/apiConfig";


export default function ProfileCard() {
  const [qrSrc, setQrSrc] = useState("");
  const [profile, setProfile] = useState(null);

  const getDoctorId = () => {
    const userAuth = localStorage.getItem("authUser");

    if (!userAuth) return null;

    try {
      const parsed = JSON.parse(userAuth);
      return parsed?.user?.id || parsed?.id || null;
    } catch {
      return null;
    }
  };

  const getDoctorProfile = async (doctorId) => {
    const res = await axios.get(
      `${API_BASE_URL}/users/doctor-profile/${doctorId}`
    );

    console.log("Doctor Profile:", res.data);

    setProfile(res.data.data);
  };

  const getDoctorQR = async (doctorId) => {
    const res = await axios.get(
      `${API_BASE_URL}/users/doctor-qr/${doctorId}`
    );

    console.log("Doctor QR:", res.data);

    // profile QR lagana hai, appointment QR nahi
    setQrSrc(res.data.data.profile_qr_code);
  };

  useEffect(() => {
    const doctorId = getDoctorId();

    console.log("Doctor ID:", doctorId);

    if (!doctorId) {
      console.log("Doctor ID not found");
      return;
    }

    getDoctorProfile(doctorId);
    getDoctorQR(doctorId);
  }, []);

  return (
    <div className="atm-card">
      <div className="atm-left">
        <h3>{profile?.full_name || "Doctor Name"}</h3>
        <p>{profile?.speciality || "Doctor Speciality"}</p>
        <p><strong>Email:</strong> {profile?.email || "-"}</p>
        <p><strong>Phone:</strong> {profile?.contact_number || "-"}</p>
      </div>

      <div className="atm-right">
        {qrSrc ? (
          <img src={qrSrc} alt="Doctor Profile QR" className="atm-qr" />
        ) : (
          <p>QR Loading...</p>
        )}

        <p>Scan for Doctor Profile</p>
      </div>
    </div>
  );
}