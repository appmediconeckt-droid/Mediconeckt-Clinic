import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getAuthToken } from "../../../../redux/apiConfig";
import "./ClinicSettings.css";

export default function ClinicSettings() {
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [photos, setPhotos] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const authUser = useSelector((state) => state.auth.user);
  const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authUser') || 'null') : null;
  const user = authUser || storedUser;
  
  // Try to extract doctor ID from multiple possible field names
  const extractDoctorId = (userObj) => {
    if (!userObj) return '';
    return (
      userObj.id ||
      userObj.user_id ||
      userObj.doctor_id ||
      userObj._id ||
      userObj.userId ||
      userObj.doctorId ||
      userObj.Id ||
      ''
    );
  };
  
  const doctorId = extractDoctorId(user);

  // Debug: log user and doctor ID to console
  React.useEffect(() => {
    console.log('=== ClinicUpload Debug ===');
    console.log('authUser:', authUser);
    console.log('storedUser:', storedUser);
    console.log('user:', user);
    console.log('doctorId:', doctorId);
    if (user) {
      console.log('User object keys:', Object.keys(user));
      console.log('Full user object:', JSON.stringify(user, null, 2));
    }
    console.log('========================');
  }, [authUser, storedUser, user, doctorId]);

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

  // 📸 Upload Photos
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // 💾 Save Data
  const handleSave = async () => {
    const token = getAuthToken();
    console.log('Form validation:', { clinicName, phone, address, doctorId, token, hasToken: !!token });

    if (!clinicName || !phone || !address || !doctorId) {
      const missingFields = [];
      if (!clinicName) missingFields.push('Clinic Name');
      if (!phone) missingFields.push('Phone');
      if (!address) missingFields.push('Address');
      if (!doctorId) missingFields.push('Doctor ID (not logged in or ID missing)');
      
      const errorMsg = `Missing: ${missingFields.join(', ')}. Doctor ID: "${doctorId}"`;
      setMessage(errorMsg);
      setStatus('failed');
      console.log('Validation failed:', errorMsg);
      return;
    }

    const formData = new FormData();
    formData.append('doctor_id', doctorId);
    formData.append('clinic_name', clinicName);
    formData.append('phone_number', phone);
    formData.append('location', address);

    photos.forEach((photo) => {
      formData.append('clinic_photo', photo);
    });

    try {
      setStatus('loading');
      setMessage('Creating clinic...');

      const response = await axios.post(`${API_BASE_URL}/clinics`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus('succeeded');
      setMessage('Clinic created successfully.');
      console.log('Clinic creation response:', response.data);
    } catch (error) {
      setStatus('failed');
      const errorMessage = error.response?.data || error.message || 'Failed to create clinic';
      setMessage(errorMessage);
      console.error('Clinic creation error:', error);
    }
  };

  // ❌ Cancel
  const handleCancel = () => {
    setClinicName("");
    setPhone("");
    setAddress("");
    setLocation({ lat: null, lng: null });
    setPhotos([]);
    setPreviewUrls([]);
    setStatus('idle');
    setMessage('');
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

      {/* Phone Number */}
      <div className="input-group">
        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Clinic Phone Number"
          maxLength={10}
        />
      </div>

      {/* Location Section */}
      <div className="map-section">
        <h3>Location</h3>

        <textarea
          placeholder="Enter full clinic address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className="btn current-btn" onClick={getCurrentLocation}>
          📍 Get Current Location
        </button>

        {location.lat && (
          <p className="location-text">
            Latitude: {location.lat} <br />
            Longitude: {location.lng}
          </p>
        )}
      </div>

      {/* Upload Photos */}
      <div className="upload-section">
        <h3>Upload Clinic Photos</h3>
        <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
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

      {message && (
        <div className={`clinic-message ${status}`}>
          {message}
        </div>
      )}

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
