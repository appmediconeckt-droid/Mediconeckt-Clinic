import React, { useState } from "react";
import "./ClinicSettings.css";

export default function ClinicSettings() {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [photos, setPhotos] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 📍 Get Current Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Unable to fetch current location")
    );
  };

  // 📸 Upload Photo
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // 💾 Save Data
  const handleSave = () => {
    const payload = {
      clinicName,
      address,
      location,
      photos,
    };
    console.log("Saved Data:", payload);
    alert("Clinic Details Saved!");
  };

  // ❌ Cancel
  const handleCancel = () => {
    setClinicName("");
    setAddress("");
    setLocation({ lat: null, lng: null });
    setPhotos([]);
    setPreviewUrls([]);
  };

  return (
    <div className="clinic p-4">
      <h2>Clinic Settings</h2>

      {/* Clinic Name */}
      <div className="input-group">
        <label>Clinic Name</label>
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Enter Clinic Name"
        />
      </div>

      {/* Google Map */}
      <div className="map-section">
        <h3>Location</h3>
        <textarea
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className="btn current-btn" onClick={getCurrentLocation}>
          Get Current Location
        </button>

        {location.lat && (
          <p className="location-text">
            📍 Latitude: {location.lat} | Longitude: {location.lng}
          </p>
        )}
      </div>

      {/* Upload Photo */}
      <div className="upload-section">
        <h3>Upload Photo</h3>
        <input type="file" multiple onChange={handlePhotoUpload} />
      </div>

      {/* Photo Preview */}
      <div className="preview-wrapper">
        {previewUrls.map((src, i) => (
          <div className="preview-card" key={i}>
            <img src={src} alt={`preview-${i}`} />
            <p>Photo {i + 1}</p>
          </div>
        ))}
      </div>

      {/* Save / Cancel */}
      <div className="button-row">
        <button className="btn save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
