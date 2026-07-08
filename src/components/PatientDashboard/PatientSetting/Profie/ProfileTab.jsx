// import React, { useState, useRef } from "react";
// import { patientData } from "../../BookAppointment/data";
// import "./ProfileTab.css";

// export default function ProfileTab() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showProfilePicModal, setShowProfilePicModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: patientData.name,
//     email: patientData.email,
//     phone: patientData.phone,
//     dob: patientData.dob,
//     gender: patientData.gender,
//     bloodGroup: patientData.bloodGroup,
//     address: patientData.address,
//     primaryDoctor: patientData.primaryDoctor,
//     emergencyContact: patientData.emergencyContact,
//     insuranceProvider: patientData.insuranceProvider,
//     policyNumber: patientData.policyNumber,
//     profilePic: patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//   });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelClick = () => {
//     setFormData({
//       name: patientData.name,
//       email: patientData.email,
//       phone: patientData.phone,
//       dob: patientData.dob,
//       gender: patientData.gender,
//       bloodGroup: patientData.bloodGroup,
//       address: patientData.address,
//       primaryDoctor: patientData.primaryDoctor,
//       emergencyContact: patientData.emergencyContact,
//       insuranceProvider: patientData.insuranceProvider,
//       policyNumber: patientData.policyNumber,
//       profilePic: patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//     });
//     setImagePreview(patientData.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
//     setSelectedImage(null);
//     setIsEditing(false);
//   };

//   const handleSaveClick = () => {
//     // Create updated data with profile picture
//     const updatedData = {
//       ...formData,
//       profilePic: imagePreview
//     };

//     // In a real application, you would send this data to your backend API
//     console.log("Updated data:", updatedData);
    
//     // Update the original data (in a real app, this would be an API call)
//     Object.assign(patientData, updatedData);
    
//     setIsEditing(false);
//     setSelectedImage(null);
//     alert("Profile updated successfully!");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleProfilePicClick = () => {
//     if (isEditing) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert('Please select an image file');
//         return;
//       }

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       setSelectedImage(file);
      
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
      
//       // Update form data with new image
//       setFormData(prev => ({
//         ...prev,
//         profilePic: previewUrl
//       }));
//     }
//   };

//   const handleSaveProfilePic = () => {
//     if (selectedImage) {
//       // In a real application, you would upload the image to your server
//       // For now, we'll just use the preview URL
//       console.log("Uploading profile picture:", selectedImage);
      
//       // Update patient data with new profile picture
//       patientData.profilePic = imagePreview;
//     }
    
//     setShowProfilePicModal(false);
//     setSelectedImage(null);
//   };

//   const handleRemoveProfilePic = () => {
//     const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
//     setImagePreview(defaultImage);
//     setFormData(prev => ({
//       ...prev,
//       profilePic: defaultImage
//     }));
//     patientData.profilePic = defaultImage;
//     setSelectedImage(null);
//     setShowProfilePicModal(false);
//   };

//   return (
//     <div className="patient-profile-content">
//       {/* Profile Picture Modal */}
//       {showProfilePicModal && (
//         <div className="profile-pic-modal">
//           <div className="profile-pic-modal-content">
//             <h3>Update Profile Picture</h3>
//             <img 
//               src={imagePreview} 
//               alt="Profile Preview" 
//               className="profile-pic-preview"
//             />
//             <div className="modal-buttons">
//               <button onClick={handleSaveProfilePic}>
//                 Save Picture
//               </button>
//               <button onClick={handleRemoveProfilePic}>
//                 Remove Picture
//               </button>
//               <button onClick={() => setShowProfilePicModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="patient-profile-header">
//         <div className="patient-profile-avatar-container">
//           <img 
//             src={imagePreview} 
//             alt="Patient Avatar" 
//             className="patient-profile-avatar"
//             onClick={handleProfilePicClick}
//           />
//           {isEditing && (
//             <div 
//               className="profile-pic-overlay"
//               onClick={handleProfilePicClick}
//             >
//               <span className="profile-pic-edit-icon">📷</span>
//             </div>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="profile-pic-upload-input"
//             accept="image/*"
//             onChange={handleFileSelect}
//           />
//         </div>
        
//         <div className="patient-profile-info">
//           {isEditing ? (
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="profile-edit-input"
//               placeholder="Full Name"
//             />
//           ) : (
//             <h3>{patientData.name}</h3>
//           )}
//           <p>Patient ID: PAT-789456</p>
//           <p>Member since: January 2023</p>
//           {isEditing && (
//             <div className="profile-pic-hint">
//               <small>Click on profile picture to change</small>
//             </div>
//           )}
//         </div>
        
//         <div className="profile-action-buttons">
//           {!isEditing ? (
//             <button className="profile-edit-btn" onClick={handleEditClick}>
//               ✏️ Edit 
//             </button>
//           ) : (
//             <div className="edit-mode-buttons">
//               <button className="profile-save-btn" onClick={handleSaveClick}>
//                 💾 Save 
//               </button>
//               <button className="profile-cancel-btn" onClick={handleCancelClick}>
//                 ❌ Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="patient-profile-section">
//         <h4 className="patient-section-title">👤 Personal Information</h4>
//         <div className="patient-info-grid">
//           <div className="patient-info-item">
//             <span className="patient-info-label">Email</span>
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Email Address"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.email}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Phone</span>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Phone Number"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.phone}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Date of Birth</span>
//             {isEditing ? (
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.dob}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Gender</span>
//             {isEditing ? (
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="profile-edit-select"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//                 <option value="Prefer not to say">Prefer not to say</option>
//               </select>
//             ) : (
//               <span className="patient-info-value">{patientData.gender}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Blood Group</span>
//             {isEditing ? (
//               <select
//                 name="bloodGroup"
//                 value={formData.bloodGroup}
//                 onChange={handleChange}
//                 className="profile-edit-select"
//               >
//                 <option value="">Select Blood Group</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//               </select>
//             ) : (
//               <span className="patient-info-value">{patientData.bloodGroup}</span>
//             )}
//           </div>
//           <div className="patient-info-item full-width">
//             <span className="patient-info-label">Address</span>
//             {isEditing ? (
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="profile-edit-textarea"
//                 rows="3"
//                 placeholder="Full Address"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.address}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="patient-profile-section">
//         <h4 className="patient-section-title">🏥 Medical Information</h4>
//         <div className="patient-info-grid">
//           <div className="patient-info-item">
//             <span className="patient-info-label">Primary Doctor</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="primaryDoctor"
//                 value={formData.primaryDoctor}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Doctor's Name"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.primaryDoctor}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Emergency Contact</span>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 name="emergencyContact"
//                 value={formData.emergencyContact}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Emergency Contact Number"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.emergencyContact}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Insurance Provider</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="insuranceProvider"
//                 value={formData.insuranceProvider}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Insurance Company"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.insuranceProvider}</span>
//             )}
//           </div>
//           <div className="patient-info-item">
//             <span className="patient-info-label">Policy Number</span>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="policyNumber"
//                 value={formData.policyNumber}
//                 onChange={handleChange}
//                 className="profile-edit-input"
//                 placeholder="Insurance Policy Number"
//               />
//             ) : (
//               <span className="patient-info-value">{patientData.policyNumber}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ProfileTab.css";
import { API_BASE_URL } from "../../../../redux/apiConfig";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const doctorId = authUser?.id || authUser?.user?.id;

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [imagePreview, setImagePreview] = useState(defaultImage);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    speciality: "",
    qualification: "",
    experience: "",
    languages: "",
    about_doctor: "",
    address: "",
    profilePic: "",
  });

  const getImageUrl = (img) => {
    if (!img) return defaultImage;
    if (img.startsWith("http") || img.startsWith("blob:")) return img;

    const baseUrl = API_BASE_URL.replace("/api", "");
    return `${baseUrl}/${img.replace(/^\/+/, "")}`;
  };

  const getDoctorProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/users/doctor-profile/${doctorId}`
      );

      const data = res.data?.data || res.data;

      const img =
        data.profilePic ||
        data.profile_pic ||
        data.profile_image ||
        data.profile_photo ||
        "";

      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        contact_number: data.contact_number || "",
        speciality: data.speciality || "",
        qualification: data.qualification || "",
        experience: data.experience || "",
        languages: data.languages || "",
        about_doctor: data.about_doctor || "",
        address: data.address || "",
        profilePic: img,
      });

      setImagePreview(getImageUrl(img));
    } catch (error) {
      console.log("Doctor profile get error:", error);
      alert("Profile load nahi ho pa rahi hai");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      getDoctorProfile();
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    getDoctorProfile();
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("full_name", formData.full_name || "");
      fd.append("email", formData.email || "");
      fd.append("contact_number", formData.contact_number || "");
      fd.append("speciality", formData.speciality || "");
      fd.append("qualification", formData.qualification || "");
      fd.append("experience", formData.experience || "");
      fd.append("languages", formData.languages || "");
      fd.append("about_doctor", formData.about_doctor || "");
      fd.append("address", formData.address || "");

      if (selectedImage) {
       fd.append("profilePic", selectedImage);
      }

      await axios.put(
        `${API_BASE_URL}/users/doctor-profile/${doctorId}`,
        fd
      );

      alert("Profile updated successfully!");
      setIsEditing(false);
      setSelectedImage(null);
      await getDoctorProfile();
    } catch (error) {
      console.log("Doctor profile update error:", error);
      alert(error.response?.data?.message || "Profile update nahi ho pa rahi hai");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  if (loading && !isEditing) {
    return <div className="patient-profile-content">Loading profile...</div>;
  }

  return (
    <div className="patient-profile-content">
      <div className="patient-profile-header">
        <div className="patient-profile-avatar-container">
          <img
            src={imagePreview}
            alt="Doctor Avatar"
            className="patient-profile-avatar"
            onClick={handleProfilePicClick}
          />

          {isEditing && (
            <div className="profile-pic-overlay" onClick={handleProfilePicClick}>
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
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="profile-edit-input"
              placeholder="Full Name"
            />
          ) : (
            <h3>{formData.full_name}</h3>
          )}

          <p>Doctor ID: {doctorId}</p>
          <p>{formData.speciality}</p>
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
        <h4 className="patient-section-title">👨‍⚕️ Doctor Information</h4>

        <div className="patient-info-grid">
          <ProfileField label="Email" name="email" type="email" value={formData.email} isEditing={isEditing} onChange={handleChange} />
          <ProfileField label="Phone" name="contact_number" value={formData.contact_number} isEditing={isEditing} onChange={handleChange} />
          <ProfileField label="Speciality" name="speciality" value={formData.speciality} isEditing={isEditing} onChange={handleChange} />
          <ProfileField label="Qualification" name="qualification" value={formData.qualification} isEditing={isEditing} onChange={handleChange} />
          <ProfileField label="Experience" name="experience" value={formData.experience} isEditing={isEditing} onChange={handleChange} />
          <ProfileField label="Languages" name="languages" value={formData.languages} isEditing={isEditing} onChange={handleChange} />

          <div className="patient-info-item full-width">
            <span className="patient-info-label">About Doctor</span>
            {isEditing ? (
              <textarea
                name="about_doctor"
                value={formData.about_doctor}
                onChange={handleChange}
                className="profile-edit-textarea"
                rows="3"
                placeholder="About Doctor"
              />
            ) : (
              <span className="patient-info-value">{formData.about_doctor}</span>
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
                placeholder="Address"
              />
            ) : (
              <span className="patient-info-value">{formData.address}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, name, value, isEditing, onChange, type = "text" }) {
  return (
    <div className="patient-info-item">
      <span className="patient-info-label">{label}</span>

      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="profile-edit-input"
          placeholder={label}
        />
      ) : (
        <span className="patient-info-value">{value}</span>
      )}
    </div>
  );
}