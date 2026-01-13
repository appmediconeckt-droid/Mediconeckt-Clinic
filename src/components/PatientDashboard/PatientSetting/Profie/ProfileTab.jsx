import React, { useState, useRef } from "react";
import { patientData } from "../../BookAppointment/data";
import "./ProfileTab.css";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: patientData.name,
    email: patientData.email,
    phone: patientData.phone,
    dob: patientData.dob,
    gender: patientData.gender,
    bloodGroup: patientData.bloodGroup,
    address: patientData.address,
    primaryDoctor: patientData.primaryDoctor,
    emergencyContact: patientData.emergencyContact,
    insuranceProvider: patientData.insuranceProvider,
    policyNumber: patientData.policyNumber,
    profilePic: patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData({
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      dob: patientData.dob,
      gender: patientData.gender,
      bloodGroup: patientData.bloodGroup,
      address: patientData.address,
      primaryDoctor: patientData.primaryDoctor,
      emergencyContact: patientData.emergencyContact,
      insuranceProvider: patientData.insuranceProvider,
      policyNumber: patientData.policyNumber,
      profilePic: patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    });
    setImagePreview(patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Create updated data with profile picture
    const updatedData = {
      ...formData,
      profilePic: imagePreview
    };

    // In a real application, you would send this data to your backend API
    console.log("Updated data:", updatedData);
    
    // Update the original data (in a real app, this would be an API call)
    Object.assign(patientData, updatedData);
    
    setIsEditing(false);
    setSelectedImage(null);
    alert("Profile updated successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePicClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Update form data with new image
      setFormData(prev => ({
        ...prev,
        profilePic: previewUrl
      }));
    }
  };

  const handleSaveProfilePic = () => {
    if (selectedImage) {
      // In a real application, you would upload the image to your server
      // For now, we'll just use the preview URL
      console.log("Uploading profile picture:", selectedImage);
      
      // Update patient data with new profile picture
      patientData.profilePic = imagePreview;
    }
    
    setShowProfilePicModal(false);
    setSelectedImage(null);
  };

  const handleRemoveProfilePic = () => {
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    setImagePreview(defaultImage);
    setFormData(prev => ({
      ...prev,
      profilePic: defaultImage
    }));
    patientData.profilePic = defaultImage;
    setSelectedImage(null);
    setShowProfilePicModal(false);
  };

  return (
    <div className="patient-profile-content">
      {/* Profile Picture Modal */}
      {showProfilePicModal && (
        <div className="profile-pic-modal">
          <div className="profile-pic-modal-content">
            <h3>Update Profile Picture</h3>
            <img 
              src={imagePreview} 
              alt="Profile Preview" 
              className="profile-pic-preview"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveProfilePic}>
                Save Picture
              </button>
              <button onClick={handleRemoveProfilePic}>
                Remove Picture
              </button>
              <button onClick={() => setShowProfilePicModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="patient-profile-header">
        <div className="patient-profile-avatar-container">
          <img 
            src={imagePreview} 
            alt="Patient Avatar" 
            className="patient-profile-avatar"
            onClick={handleProfilePicClick}
          />
          {isEditing && (
            <div 
              className="profile-pic-overlay"
              onClick={handleProfilePicClick}
            >
              <span className="profile-pic-edit-icon">📷</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="profile-pic-upload-input"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>
        
        <div className="patient-profile-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profile-edit-input"
              placeholder="Full Name"
            />
          ) : (
            <h3>{patientData.name}</h3>
          )}
          <p>Patient ID: PAT-789456</p>
          <p>Member since: January 2023</p>
          {isEditing && (
            <div className="profile-pic-hint">
              <small>Click on profile picture to change</small>
            </div>
          )}
        </div>
        
        <div className="profile-action-buttons">
          {!isEditing ? (
            <button className="profile-edit-btn" onClick={handleEditClick}>
              ✏️ Edit 
            </button>
          ) : (
            <div className="edit-mode-buttons">
              <button className="profile-save-btn" onClick={handleSaveClick}>
                💾 Save 
              </button>
              <button className="profile-cancel-btn" onClick={handleCancelClick}>
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="patient-profile-section">
        <h4 className="patient-section-title">👤 Personal Information</h4>
        <div className="patient-info-grid">
          <div className="patient-info-item">
            <span className="patient-info-label">Email</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Email Address"
              />
            ) : (
              <span className="patient-info-value">{patientData.email}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Phone</span>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Phone Number"
              />
            ) : (
              <span className="patient-info-value">{patientData.phone}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Date of Birth</span>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="profile-edit-input"
              />
            ) : (
              <span className="patient-info-value">{patientData.dob}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Gender</span>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="profile-edit-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <span className="patient-info-value">{patientData.gender}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Blood Group</span>
            {isEditing ? (
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="profile-edit-select"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            ) : (
              <span className="patient-info-value">{patientData.bloodGroup}</span>
            )}
          </div>
          <div className="patient-info-item full-width">
            <span className="patient-info-label">Address</span>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="profile-edit-textarea"
                rows="3"
                placeholder="Full Address"
              />
            ) : (
              <span className="patient-info-value">{patientData.address}</span>
            )}
          </div>
        </div>
      </div>

      <div className="patient-profile-section">
        <h4 className="patient-section-title">🏥 Medical Information</h4>
        <div className="patient-info-grid">
          <div className="patient-info-item">
            <span className="patient-info-label">Primary Doctor</span>
            {isEditing ? (
              <input
                type="text"
                name="primaryDoctor"
                value={formData.primaryDoctor}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Doctor's Name"
              />
            ) : (
              <span className="patient-info-value">{patientData.primaryDoctor}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Emergency Contact</span>
            {isEditing ? (
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Emergency Contact Number"
              />
            ) : (
              <span className="patient-info-value">{patientData.emergencyContact}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Insurance Provider</span>
            {isEditing ? (
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Insurance Company"
              />
            ) : (
              <span className="patient-info-value">{patientData.insuranceProvider}</span>
            )}
          </div>
          <div className="patient-info-item">
            <span className="patient-info-label">Policy Number</span>
            {isEditing ? (
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className="profile-edit-input"
                placeholder="Insurance Policy Number"
              />
            ) : (
              <span className="patient-info-value">{patientData.policyNumber}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}