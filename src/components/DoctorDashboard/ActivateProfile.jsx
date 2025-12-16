import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ActivateProfile.css"; // Import the CSS file

export default function DoctorProfileFlow() {
  const [profile, setProfile] = useState({
    // PERSONAL DETAILS
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",

    currentAddress: "",
    permanentAddress: "",

    aadhaar: "",
    pan: "",
    photo: null,

    // CONSULTATION SETTINGS
    availability: [], // { day: "Mon", time: "10:00 AM" }
    consultationType: "", // video / audio / chat / clinic
    fees: "",
    followUpFees: "",
  });

  const [statusPersonal, setStatusPersonal] = useState("Incomplete");
  const [statusConsultation, setStatusConsultation] = useState("Incomplete");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const validatePersonal = () => {
    if (
      profile.name &&
      profile.email &&
      profile.mobile &&
      profile.dob &&
      profile.gender &&
      profile.currentAddress &&
      profile.permanentAddress &&
      profile.aadhaar &&
      profile.pan
    ) {
      setStatusPersonal("Completed");
    } else {
      setStatusPersonal("Incomplete");
    }
  };

  const validateConsultation = () => {
    if (
      profile.availability.length > 0 &&
      profile.consultationType !== "" &&
      profile.fees !== ""
    ) {
      setStatusConsultation("Completed");
    } else {
      setStatusConsultation("Incomplete");
    }
  };

  const handleAvailabilityToggle = (day) => {
    let updated = [...profile.availability];

    if (updated.some((d) => d.day === day)) {
      updated = updated.filter((d) => d.day !== day);
    } else {
      updated.push({ day, time: "" });
    }

    setProfile({ ...profile, availability: updated });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-flow-container ">
      <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ">
        <h2 className="profile-header">Doctor Profile Setup</h2>
      </div>


      {/* Progress Tracker */}
      <div className="progress-track">
        <div className={`progress-step ${statusPersonal === "Completed" ? "active" : ""}`}>
          1
        </div>
        <div className={`progress-step ${statusConsultation === "Completed" ? "active" : ""}`}>
          2
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="profile-card">
        <div className="section-header">
          <h3 className="section-title">Personal Details</h3>
          <span className={`status-badge ${statusPersonal === "Completed" ? "status-completed" : "status-incomplete"
            }`}>
            {statusPersonal}
          </span>
        </div>

        <div className="row mt-3">
          <div className="col-md-4 mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-input form-control"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Email Address</label>
            <input
              className="form-input form-control"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              className="form-input form-control"
              type="tel"
              value={profile.mobile}
              onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-input form-control"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-input form-control"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Aadhaar Number</label>
            <input
              className="form-input form-control"
              value={profile.aadhaar}
              onChange={(e) => setProfile({ ...profile, aadhaar: e.target.value })}
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">PAN Number</label>
            <input
              className="form-input form-control"
              value={profile.pan}
              onChange={(e) => setProfile({ ...profile, pan: e.target.value })}
              placeholder="ABCDE1234F"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <label className="form-label">Current Address</label>
            <textarea
              className="form-input form-control"
              rows="2"
              value={profile.currentAddress}
              onChange={(e) => setProfile({ ...profile, currentAddress: e.target.value })}
              placeholder="Enter current address"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Permanent Address</label>
            <textarea
              className="form-input form-control"
              rows="2"
              value={profile.permanentAddress}
              onChange={(e) => setProfile({ ...profile, permanentAddress: e.target.value })}
              placeholder="Enter permanent address"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Profile Photo</label>
          <div className="photo-upload" onClick={() => document.getElementById('photoInput').click()}>
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="photo-preview" />
            ) : (
              <>
                <i className="bi bi-camera fs-1 text-muted mb-2"></i>
                <p className="text-muted mb-0">Click to upload profile photo</p>
              </>
            )}
          </div>
          <input
            id="photoInput"
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </div>

        <button className="save-btn" onClick={validatePersonal}>
          <i className="bi bi-check-circle me-2"></i>
          Save Personal Details
        </button>
      </div>

      {/* CONSULTATION SETTINGS */}
      <div className="profile-card">
        <div className="section-header">
          <h3 className="section-title">Consultation Settings</h3>
          <span className={`status-badge ${statusConsultation === "Completed" ? "status-completed" : "status-incomplete"
            }`}>
            {statusConsultation}
          </span>
        </div>

        <h6 className="mt-3 form-label">Select Available Days</h6>
        <div className="availability-grid">
          {days.map((day) => (
            <button
              key={day}
              className={`day-btn ${profile.availability.some((x) => x.day === day) ? "active" : ""
                }`}
              onClick={() => handleAvailabilityToggle(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {profile.availability.length > 0 && (
          <div className="time-slot-container">
            <h6 className="time-slot-header">
              <i className="bi bi-clock me-2"></i>
              Set Time Slots for Selected Days
            </h6>
            {profile.availability.map((item, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-6">
                  <label className="form-label">{item.day} - Start Time</label>
                  <input
                    type="time"
                    className="form-input form-control"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...profile.availability];
                      updated[index].time = e.target.value;
                      setProfile({ ...profile, availability: updated });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">{item.day} - End Time</label>
                  <input
                    type="time"
                    className="form-input form-control"
                    onChange={(e) => {
                      // You can add end time logic here
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <label className="form-label">Consultation Type</label>
            <select
              className="form-input form-control"
              value={profile.consultationType}
              onChange={(e) =>
                setProfile({ ...profile, consultationType: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option value="video">Video Consultation</option>
              <option value="audio">Audio Call</option>
              <option value="chat">Chat Consultation</option>
              <option value="clinic">Clinic Visit</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Consultation Fees (₹)</label>
            <input
              className="form-input form-control"
              type="number"
              value={profile.fees}
              onChange={(e) => setProfile({ ...profile, fees: e.target.value })}
              placeholder="Enter fees"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Follow-up Fees (₹)</label>
            <input
              className="form-input form-control"
              type="number"
              value={profile.followUpFees}
              onChange={(e) =>
                setProfile({ ...profile, followUpFees: e.target.value })
              }
              placeholder="Enter follow-up fees"
            />
          </div>
        </div>

        <button className="save-btn" onClick={validateConsultation}>
          <i className="bi bi-save me-2"></i>
          Save Consultation Settings
        </button>
      </div>

      {/* FINAL STATUS */}
      <div className="overall-status">
        <h4>Profile Completion Status</h4>
        <div className="status-display">
          <div className="status-item">
            <span className="status-label">Personal Details</span>
            <span className={`status-value ${statusPersonal === "Completed" ? "status-completed" : "status-incomplete"
              }`}>
              {statusPersonal}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Consultation Settings</span>
            <span className={`status-value ${statusConsultation === "Completed" ? "status-completed" : "status-incomplete"
              }`}>
              {statusConsultation}
            </span>
          </div>
        </div>
        {statusPersonal === "Completed" && statusConsultation === "Completed" && (
          <div className="mt-4">
            <button className="save-btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <i className="bi bi-check-lg me-2"></i>
              Complete Profile Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}