// ProfessionalProfileTable.jsx
import React, { useState } from "react";
import "./ProfessionalProfileTable.css";

const ProfessionalProfileTable = () => {
  // Initial state with some sample data
  const [profileData, setProfileData] = useState({
    personalDetails: {
      fullName: "Dr. Sarah Johnson",
      qualification: "MD, Internal Medicine",
      experience: "15 years",
      languages: "English, Spanish, French",
    },
    professionalSummary: {
      about:
        "Experienced physician specializing in internal medicine with a focus on preventive care.",
      expertise: "Diabetes Management, Hypertension, Preventive Care",
      totalPatientsConsulted: "4500+",
      rating: "4.8",
      reviewsCount: "342",
    },
    availability: {
      todayAvailable: true,
      onlineConsultation: true,
    },
    clinicAndHospital: {
      clinicName: "Aashirwad Clinic Homoeopathic Treatment",
      address: "31 Saket Nagar, Saket Club Rd, Indore, Madhya Pradesh 452018",
      googleMapLink: "https://maps.app.goo.gl/97UXW12vLkf4TvfT9",
      consultationTiming: "9:00 AM - 6:00 PM",
      daysAvailable: "Mon, Wed, Fri, Sat",
    },
    consultationFees: {
      inClinicFees: "$150",
      onlineConsultationFees: "$120",
      followUpFees: "$90",
    },
  });

  const [editingSection, setEditingSection] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLinkInput, setMapLinkInput] = useState("");

  // Handle edit button click
  const handleEditClick = (section) => {
    setEditingSection(section);
    setEditFormData(profileData[section]);
  };

  // Handle input changes in edit form
  const handleInputChange = (e, field) => {
    const { value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [field]: type === "checkbox" ? checked : value,
    });
  };

  // Save changes
  const handleSaveClick = () => {
    if (editingSection) {
      setProfileData({
        ...profileData,
        [editingSection]: editFormData,
      });
      setEditingSection(null);
      setEditFormData({});
    }
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingSection(null);
    setEditFormData({});
  };

  // Open map modal
  const handleOpenMapModal = () => {
    setMapLinkInput(profileData.clinicAndHospital.googleMapLink);
    setShowMapModal(true);
  };

  // Save map link
  const handleSaveMapLink = () => {
    setProfileData({
      ...profileData,
      clinicAndHospital: {
        ...profileData.clinicAndHospital,
        googleMapLink: mapLinkInput,
      },
    });
    setShowMapModal(false);
  };

  // Get current location
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

  // Render table rows based on section
  const renderTableRows = (section, data) => {
    const rows = [];

    for (const [key, value] of Object.entries(data)) {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      rows.push(
        <tr key={key}>
          <td className="label-cell">{label}</td>
          <td className="value-cell">
            {editingSection === section ? (
              key === "todayAvailable" || key === "onlineConsultation" ? (
                <input
                  type="checkbox"
                  checked={editFormData[key] || false}
                  onChange={(e) => handleInputChange(e, key)}
                  className="checkbox-input"
                />
              ) : key === "googleMapLink" ? (
                <div className="map-link-container">
                  <input
                    type="text"
                    value={editFormData[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                    className="edit-input"
                  />
                  <button 
                    className="btn-map-small"
                    onClick={handleOpenMapModal}
                  >
                    <i className="fas fa-map"></i>
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={editFormData[key] || ""}
                  onChange={(e) => handleInputChange(e, key)}
                  className="edit-input"
                />
              )
            ) : key === "googleMapLink" ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Google Maps
              </a>
            ) : key === "todayAvailable" || key === "onlineConsultation" ? (
              <span
                className={`availability ${
                  value ? "available" : "not-available"
                }`}
              >
                {value ? "Yes" : "No"}
              </span>
            ) : (
              value
            )}
          </td>
        </tr>
      );
    }

    return rows;
  };

  // Define sections for the table
  const sections = [
    { id: "personalDetails", title: "Personal Details" },
    { id: "professionalSummary", title: "Professional Summary" },
    { id: "availability", title: "Availability" },
    { id: "clinicAndHospital", title: "Clinic & Hospital" },
    { id: "consultationFees", title: "Consultation Fees" },
  ];

  return (
    <div className="profile p-4">
      <header>
        <h1>Professional Profile</h1>
        <p className="subtitle">View and edit your professional information</p>
      </header>

      <div className="table-responsive">
        <table className="profile-table">
          <tbody>
            {sections.map((section) => (
              <React.Fragment key={section.id}>
                <tr className="section-header">
                  <td colSpan="2">
                    <div className="section-title">
                      {section.title}
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(section.id)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    </div>
                  </td>
                </tr>
                {renderTableRows(section.id, profileData[section.id])}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map Link Modal */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Map Location</h3>
              <button 
                className="modal-close"
                onClick={() => setShowMapModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={mapLinkInput}
                onChange={(e) => setMapLinkInput(e.target.value)}
                placeholder="Enter Google Maps link"
                className="map-input"
              />
              <div className="map-preview">
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
              <div className="modal-buttons">
                <button
                  className="btn-location"
                  onClick={handleGetCurrentLocation}
                >
                  <i className="fas fa-location-dot"></i> Use Current Location
                </button>
                <div className="action-buttons">
                  <button className="btn-cancel" onClick={() => setShowMapModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-save" onClick={handleSaveMapLink}>
                    Save Map Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Controls */}
      {editingSection && (
        <div className="edit-controls">
          <button className="btn-save" onClick={handleSaveClick}>
            <i className="fas fa-check"></i> Save All Changes
          </button>
          <button className="btn-cancel" onClick={handleCancelClick}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      )}

      <div className="instructions">
        <h3>
          <i className="fas fa-info-circle"></i> Instructions
        </h3>
        <ul>
          <li>
            Click the "Edit" button next to any section to modify its content
          </li>
          <li>
            For Google Maps link in "Clinic & Hospital" section, click the map icon to update
          </li>
          <li>
            Use the "Use Current Location" button to automatically generate a map link
          </li>
          <li>Click "Save Changes" to apply your edits</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalProfileTable;