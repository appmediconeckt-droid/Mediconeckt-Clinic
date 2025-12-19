import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ActivateProfile.css";

export default function DoctorProfileFlow() {
  const [activeTab, setActiveTab] = useState("setup");
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

    // PROFESSIONAL DETAILS
    qualification: "",
    experience: "",
    languages: "",
    about: "",
    expertise: "",

    // CONSULTATION SETTINGS
    availability: [],
    consultationType: "",
    fees: "",
    followUpFees: "",

    // CLINIC DETAILS
    clinicName: "",
    clinicAddress: "",
    googleMapLink: "",
    consultationTiming: "",
    daysAvailable: "",

    // AVAILABILITY
    todayAvailable: true,
    onlineConsultation: true,
  });

  const [statusPersonal, setStatusPersonal] = useState("Incomplete");
  const [statusProfessional, setStatusProfessional] = useState("Incomplete");
  const [statusConsultation, setStatusConsultation] = useState("Incomplete");
  const [editingSection, setEditingSection] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLinkInput, setMapLinkInput] = useState("");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      validateAllSections(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('doctorProfile', JSON.stringify(profile));
  }, [profile]);

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
      return true;
    } else {
      setStatusPersonal("Incomplete");
      return false;
    }
  };

  const validateProfessional = () => {
    if (
      profile.qualification &&
      profile.experience &&
      profile.languages &&
      profile.about &&
      profile.expertise
    ) {
      setStatusProfessional("Completed");
      return true;
    } else {
      setStatusProfessional("Incomplete");
      return false;
    }
  };

  const validateConsultation = () => {
    if (
      profile.availability.length > 0 &&
      profile.consultationType !== "" &&
      profile.fees !== "" &&
      profile.clinicName &&
      profile.clinicAddress
    ) {
      setStatusConsultation("Completed");
      return true;
    } else {
      setStatusConsultation("Incomplete");
      return false;
    }
  };

  const validateAllSections = (profileData = profile) => {
    validatePersonal(profileData);
    validateProfessional(profileData);
    validateConsultation(profileData);
  };

  const handleAvailabilityToggle = (day) => {
    let updated = [...profile.availability];

    if (updated.some((d) => d.day === day)) {
      updated = updated.filter((d) => d.day !== day);
    } else {
      updated.push({ day, startTime: "09:00", endTime: "17:00" });
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

  const handleEditClick = (section) => {
    setEditingSection(section);
    setEditFormData(profile);
  };

  const handleInputChange = (e, field) => {
    const { value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [field]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveClick = () => {
    if (editingSection) {
      setProfile(editFormData);
      validateAllSections(editFormData);
      setEditingSection(null);
      setEditFormData({});
      alert("Profile updated successfully!");
    }
  };

  const handleCancelClick = () => {
    setEditingSection(null);
    setEditFormData({});
  };

  const handleOpenMapModal = () => {
    setMapLinkInput(profile.googleMapLink);
    setShowMapModal(true);
  };

  const handleSaveMapLink = () => {
    setProfile({
      ...profile,
      googleMapLink: mapLinkInput,
    });
    setShowMapModal(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newMapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setMapLinkInput(newMapLink);
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCompleteProfile = () => {
    if (statusPersonal === "Completed" && statusConsultation === "Completed" && statusProfessional === "Completed") {
      alert("Profile setup completed successfully!");
      setActiveTab("view");
    } else {
      alert("Please complete all sections before finalizing.");
    }
  };

  // Render Professional Profile View
  const renderProfileView = () => {
    const sections = [
      {
        id: "personalDetails",
        title: "Personal Details",
        fields: [
          { label: "Full Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Mobile", key: "mobile" },
          { label: "Date of Birth", key: "dob" },
          { label: "Gender", key: "gender" },
          { label: "Aadhaar", key: "aadhaar" },
          { label: "PAN", key: "pan" },
          { label: "Current Address", key: "currentAddress" },
          { label: "Permanent Address", key: "permanentAddress" },
        ]
      },
      {
        id: "professionalDetails",
        title: "Professional Details",
        fields: [
          { label: "Qualification", key: "qualification" },
          { label: "Experience", key: "experience" },
          { label: "Languages", key: "languages" },
          { label: "About", key: "about" },
          { label: "Expertise", key: "expertise" },
        ]
      },
      {
        id: "consultationSettings",
        title: "Consultation Settings",
        fields: [
          { label: "Consultation Type", key: "consultationType" },
          { label: "Consultation Fees", key: "fees" },
          { label: "Follow-up Fees", key: "followUpFees" },
          { label: "Clinic Name", key: "clinicName" },
          { label: "Clinic Address", key: "clinicAddress" },
          { label: "Consultation Timing", key: "consultationTiming" },
          { label: "Days Available", key: "daysAvailable" },
        ]
      },
      {
        id: "availability",
        title: "Availability",
        fields: [
          {
            label: "Today Available",
            key: "todayAvailable",
            type: "boolean"
          },
          {
            label: "Online Consultation",
            key: "onlineConsultation",
            type: "boolean"
          },
          {
            label: "Google Map Link",
            key: "googleMapLink",
            type: "link"
          },
        ]
      },
    ];

    return (
      <div className="profile-view-container">
        <div className="profile-header-section">
          <div className="profile-photo-container">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="profile-photo-large" />
            ) : (
              <div className="profile-photo-placeholder">
                <i className="bi bi-person-circle fs-1"></i>
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>{profile.name || "Dr. Name"}</h2>
            <p className="text-muted">{profile.qualification || "Qualification"}</p>
            <div className="profile-stats">
              <span className="stat-item">
                <i className="bi bi-briefcase me-1"></i>
                {profile.experience || "0"} Years Experience
              </span>
              <span className="stat-item">
                <i className="bi bi-translate me-1"></i>
                {profile.languages || "English"}
              </span>
            </div>
          </div>
          <button
            className="btn-edit-profile"
            onClick={() => setActiveTab("setup")}
          >
            <i className="bi bi-pencil me-2"></i>
            Edit Profile
          </button>
        </div>

        <div className="profile-tables">
          {sections.map((section) => (
            <div key={section.id} className="profile-section-card">
              <div className="section-header">
                <h4>{section.title}</h4>
                <button
                  className="btn-edit-section"
                  onClick={() => handleEditClick(section.id)}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </button>
              </div>
              <div className="section-content">
                {section.fields.map((field) => (
                  <div key={field.key} className="profile-field">
                    <span className="field-label">{field.label}:</span>
                    <span className="field-value">
                      {field.type === "boolean" ? (
                        <span className={`availability ${profile[field.key] ? "available" : "not-available"}`}>
                          {profile[field.key] ? "Yes" : "No"}
                        </span>
                      ) : field.type === "link" && profile[field.key] ? (
                        <a
                          href={profile[field.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link"
                        >
                          View on Google Maps
                        </a>
                      ) : (
                        profile[field.key] || "Not set"
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Availability Grid in View Mode */}
        <div className="profile-section-card">
          <div className="section-header">
            <h4>Weekly Availability</h4>
          </div>
          <div className="availability-grid-view">
            {days.map((day) => {
              const daySlot = profile.availability.find(d => d.day === day);
              return (
                <div key={day} className="day-slot-view">
                  <div className={`day-label ${daySlot ? "active" : ""}`}>
                    {day}
                  </div>
                  {daySlot ? (
                    <div className="time-slot">
                      {daySlot.startTime} - {daySlot.endTime}
                    </div>
                  ) : (
                    <div className="time-slot unavailable">Not Available</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render Profile Setup Form
  const renderProfileSetup = () => {
    return (
      <div className="profile-flow">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <h2 className="profile-header">Doctor Profile</h2>
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'setup' ? 'active' : ''}`}
              onClick={() => setActiveTab('setup')}
            >
              Setup
            </button>
            <button
              className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="progress-track">
          <div className={`progress-step ${statusPersonal === "Completed" ? "active" : ""}`}>
            1
            <span>Personal</span>
          </div>
          <div className={`progress-step ${statusProfessional === "Completed" ? "active" : ""}`}>
            2
            <span>Professional</span>
          </div>
          <div className={`progress-step ${statusConsultation === "Completed" ? "active" : ""}`}>
            3
            <span>Consultation</span>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <div className="profile-card">
          <div className="section-header">
            <h3 className="section-title">Personal Details</h3>
            <span className={`status-badge ${statusPersonal === "Completed" ? "status-completed" : "status-incomplete"}`}>
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

        {/* PROFESSIONAL DETAILS */}
        <div className="profile-card">
          <div className="section-header">
            <h3 className="section-title">Professional Details</h3>
            <span className={`status-badge ${statusProfessional === "Completed" ? "status-completed" : "status-incomplete"}`}>
              {statusProfessional}
            </span>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Qualification</label>
              <input
                className="form-input form-control"
                value={profile.qualification}
                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                placeholder="MD, Internal Medicine"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Experience (Years)</label>
              <input
                className="form-input form-control"
                type="number"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                placeholder="15"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Languages Known</label>
              <input
                className="form-input form-control"
                value={profile.languages}
                onChange={(e) => setProfile({ ...profile, languages: e.target.value })}
                placeholder="English, Spanish, French"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Specialization/Expertise</label>
              <input
                className="form-input form-control"
                value={profile.expertise}
                onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                placeholder="Diabetes Management, Hypertension"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 mb-3">
              <label className="form-label">Professional Summary</label>
              <textarea
                className="form-input form-control"
                rows="3"
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                placeholder="Experienced physician specializing in internal medicine..."
              />
            </div>
          </div>

          <button className="save-btn" onClick={validateProfessional}>
            <i className="bi bi-check-circle me-2"></i>
            Save Professional Details
          </button>
        </div>

        {/* CONSULTATION SETTINGS */}
        <div className="profile-card">
          <div className="section-header">
            <h3 className="section-title">Consultation Settings</h3>
            <span className={`status-badge ${statusConsultation === "Completed" ? "status-completed" : "status-incomplete"}`}>
              {statusConsultation}
            </span>
          </div>

          <h6 className="mt-3 form-label">Select Available Days</h6>
          <div className="availability-grid">
            {days.map((day) => (
              <button
                key={day}
                className={`day-btn ${profile.availability.some((x) => x.day === day) ? "active" : ""}`}
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
                      value={item.startTime}
                      onChange={(e) => {
                        const updated = [...profile.availability];
                        updated[index].startTime = e.target.value;
                        setProfile({ ...profile, availability: updated });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{item.day} - End Time</label>
                    <input
                      type="time"
                      className="form-input form-control"
                      value={item.endTime}
                      onChange={(e) => {
                        const updated = [...profile.availability];
                        updated[index].endTime = e.target.value;
                        setProfile({ ...profile, availability: updated });
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

          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Clinic/Hospital Name</label>
              <input
                className="form-input form-control"
                value={profile.clinicName}
                onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                placeholder="Enter clinic name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Clinic Address</label>
              <input
                className="form-input form-control"
                value={profile.clinicAddress}
                onChange={(e) => setProfile({ ...profile, clinicAddress: e.target.value })}
                placeholder="Enter clinic address"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Consultation Timing</label>
              <input
                className="form-input form-control"
                value={profile.consultationTiming}
                onChange={(e) => setProfile({ ...profile, consultationTiming: e.target.value })}
                placeholder="9:00 AM - 6:00 PM"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Days Available</label>
              <input
                className="form-input form-control"
                value={profile.daysAvailable}
                onChange={(e) => setProfile({ ...profile, daysAvailable: e.target.value })}
                placeholder="Mon, Wed, Fri, Sat"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Google Maps Link</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-input form-control"
                  value={profile.googleMapLink}
                  onChange={(e) => setProfile({ ...profile, googleMapLink: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleOpenMapModal}
                >
                  <i className="bi bi-map"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3 d-flex align-items-end">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlineConsultation"
                  checked={profile.onlineConsultation}
                  onChange={(e) => setProfile({ ...profile, onlineConsultation: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="onlineConsultation">
                  Available for Online Consultation
                </label>
              </div>
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
              <span className={`status-value ${statusPersonal === "Completed" ? "status-completed" : "status-incomplete"}`}>
                {statusPersonal}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Professional Details</span>
              <span className={`status-value ${statusProfessional === "Completed" ? "status-completed" : "status-incomplete"}`}>
                {statusProfessional}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Consultation Settings</span>
              <span className={`status-value ${statusConsultation === "Completed" ? "status-completed" : "status-incomplete"}`}>
                {statusConsultation}
              </span>
            </div>
          </div>
          {statusPersonal === "Completed" &&
            statusProfessional === "Completed" &&
            statusConsultation === "Completed" && (
              <div className="mt-4 text-center">
                <button
                  className="complete-btn"
                  onClick={handleCompleteProfile}
                >
                  <i className="bi bi-check-lg me-2"></i>
                  Complete Profile Setup
                </button>
                <p className="text-muted mt-2">
                  Your profile is ready! Click above to finalize or switch to View mode.
                </p>
              </div>
            )}
        </div>
      </div>
    );
  };

  // Render Edit Modal for View Mode
  const renderEditModal = () => {
    if (!editingSection) return null;

    return (
      <div className="modal-overlay" onClick={handleCancelClick}>
        <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit {editingSection.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
            <button className="modal-close" onClick={handleCancelClick}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body">
            {Object.keys(editFormData).map((key) => {
              if (typeof editFormData[key] === 'boolean') {
                return (
                  <div key={key} className="mb-3">
                    <label className="form-label">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={editFormData[key]}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                      <label className="form-check-label">
                        {editFormData[key] ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                );
              } else if (key === 'googleMapLink') {
                return (
                  <div key={key} className="mb-3">
                    <label className="form-label">Google Map Link</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={editFormData[key] || ''}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleOpenMapModal}
                      >
                        <i className="bi bi-map"></i>
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={key} className="mb-3">
                    <label className="form-label">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={editFormData[key] || ''}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSaveClick}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Map Modal
  const renderMapModal = () => {
    if (!showMapModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Update Map Location</h3>
            <button className="modal-close" onClick={() => setShowMapModal(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={mapLinkInput}
              onChange={(e) => setMapLinkInput(e.target.value)}
              placeholder="Enter Google Maps link"
              className="form-control mb-3"
            />
            <div className="map-preview mb-3">
              <p>Preview:</p>
              <a
                href={mapLinkInput}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-link"
              >
                {mapLinkInput || "No link provided"}
              </a>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-primary" onClick={handleGetCurrentLocation}>
                <i className="bi bi-geo-alt me-2"></i>
                Use Current Location
              </button>
              <div>
                <button className="btn btn-secondary me-2" onClick={() => setShowMapModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveMapLink}>
                  Save Map Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="doctor-profile-container">
      {activeTab === 'setup' ? renderProfileSetup() : renderProfileView()}
      {renderEditModal()}
      {renderMapModal()}
    </div>
  );
}