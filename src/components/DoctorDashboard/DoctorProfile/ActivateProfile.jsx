import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ActivateProfile.css";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";

export default function DoctorProfileFlow() {
  const authUser = useSelector((state) => state.auth?.user);
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
  });

  const [statusPersonal, setStatusPersonal] = useState("Incomplete");
  const [statusProfessional, setStatusProfessional] = useState("Incomplete");
  const [editingSection, setEditingSection] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileStatus, setProfileStatus] = useState("loading");
  const [profileError, setProfileError] = useState("");
  const [savedContact, setSavedContact] = useState({ email: "", mobile: "" });
  const [verification, setVerification] = useState({
    email: { otp: "", sent: false, verified: true, loading: false, message: "" },
    mobile: { otp: "", sent: false, verified: true, loading: false, message: "" },
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const storedAuthUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("authUser") || "null");
    } catch {
      return null;
    }
  })();
  const currentUser = authUser || storedAuthUser || {};
  const doctorId = currentUser.doctor_id || currentUser.doctorId || currentUser.id || currentUser._id || currentUser.user_id || currentUser.userId;

  const getImageUrl = (value) => {
    if (!value) return null;
    if (/^(https?:|data:|blob:)/i.test(value)) return value;
    return `${API_BASE_URL.replace(/\/api\/?$/, "")}/${String(value).replace(/^\/+/, "")}`;
  };

  const mapApiProfile = (data = {}) => ({
    name: data.full_name || data.fullName || data.name || "",
    email: data.email || data.email_address || "",
    mobile: data.mobile || data.phone || data.phone_number || data.contact_number || "",
    dob: data.dob ? String(data.dob).slice(0, 10) : data.date_of_birth ? String(data.date_of_birth).slice(0, 10) : "",
    gender: data.gender || "",
    currentAddress: data.current_address || data.currentAddress || data.address || "",
    permanentAddress: data.permanent_address || data.permanentAddress || "",
    aadhaar: data.aadhaar || data.aadhaar_number || "",
    pan: data.pan || data.pan_number || "",
    photo: getImageUrl(data.profileImage || data.profilePic || data.profile_pic || data.profile_image || data.profile_photo),
    qualification: data.qualification || data.medical_degree || "",
    experience: data.experience || data.years_of_experience || "",
    languages: Array.isArray(data.languages) ? data.languages.join(", ") : data.languages || "",
    about: data.about_doctor || data.about || data.professional_summary || "",
    expertise: Array.isArray(data.expertise) ? data.expertise.join(", ") : data.expertise || data.specialization || "",
  });

  // Load the authenticated doctor's profile from the API. Local storage is a
  // fallback only, so the navbar profile always reflects backend data.
  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      const savedProfile = localStorage.getItem(`doctorProfile:${doctorId || "doctor"}`) || localStorage.getItem("doctorProfile");
      if (!doctorId) {
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        setProfileStatus("failed");
        setProfileError("Doctor ID not found. Please login again.");
        return;
      }
      try {
        setProfileStatus("loading");
        setProfileError("");
        const response = await axios.get(`${API_BASE_URL}/users/doctor-profile/${doctorId}`, {
          headers: getAuthHeaders(),
        });
        if (!active) return;
        const data = response.data?.data || response.data?.profile || response.data || {};
        const mappedProfile = mapApiProfile(data);
        setProfile(mappedProfile);
        setSavedContact({ email: mappedProfile.email, mobile: mappedProfile.mobile });
        validateAllSections(mappedProfile);
        localStorage.setItem(`doctorProfile:${doctorId}`, JSON.stringify(mappedProfile));
        setProfileStatus("succeeded");
      } catch (error) {
        if (!active) return;
        if (savedProfile) {
          const cached = JSON.parse(savedProfile);
          setProfile(cached);
          validateAllSections(cached);
        }
        setProfileStatus("failed");
        setProfileError(error.response?.data?.message || error.response?.data?.error || "Failed to load doctor profile");
      }
    };
    loadProfile();
    return () => { active = false; };
  }, [doctorId]);

  // Save profile to localStorage
  useEffect(() => {
    if (profileStatus !== "loading") {
      localStorage.setItem(`doctorProfile:${doctorId || "doctor"}`, JSON.stringify(profile));
    }
  }, [profile, profileStatus, doctorId]);

  const validatePersonal = (profileData = profile) => {
    if (
      profileData.name &&
      profileData.email &&
      profileData.mobile &&
      profileData.dob &&
      profileData.gender &&
      profileData.currentAddress &&
      profileData.permanentAddress &&
      profileData.aadhaar &&
      profileData.pan
    ) {
      setStatusPersonal("Completed");
      return true;
    } else {
      setStatusPersonal("Incomplete");
      return false;
    }
  };

  const validateProfessional = (profileData = profile) => {
    if (
      profileData.qualification &&
      profileData.experience &&
      profileData.languages &&
      profileData.about &&
      profileData.expertise
    ) {
      setStatusProfessional("Completed");
      return true;
    } else {
      setStatusProfessional("Incomplete");
      return false;
    }
  };

  const validateAllSections = (profileData = profile) => {
    validatePersonal(profileData);
    validateProfessional(profileData);
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
      setIsEditMode(false);
      alert("Profile updated successfully!");
    }
  };

  const handleCancelClick = () => {
    setEditingSection(null);
    setEditFormData({});
    setIsEditMode(false);
  };

  const handleCompleteProfile = () => {
    if (statusPersonal === "Completed" && statusProfessional === "Completed") {
      alert("Profile setup completed successfully!");
    } else {
      alert("Please complete all sections before finalizing.");
    }
  };

  const handleEditProfileClick = () => {
    setIsEditMode(true);
  };

  const contactChanged = (type) => String(profile[type] || "").trim() !== String(savedContact[type] || "").trim();

  const updateContact = (type, value) => {
    setProfile((previous) => ({ ...previous, [type]: value }));
    setVerification((previous) => ({
      ...previous,
      [type]: { otp: "", sent: false, verified: false, loading: false, message: "Verification required" },
    }));
  };

  const STATIC_OTP = "123456";

  const callOtpEndpoint = async (action, payload) => {
    // Registration currently uses the same static OTP test flow and does not
    // call an OTP backend endpoint. Keep profile verification consistent until
    // a real send/verify service is introduced.
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (action === "send") return { success: true };
    if (String(payload?.otp || "").trim() !== STATIC_OTP) {
      throw new Error(`Invalid OTP. Use ${STATIC_OTP} in test mode.`);
    }
    return { success: true };
  };

  const sendContactOtp = async (type) => {
    const value = String(profile[type] || "").trim();
    if (type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setVerification((previous) => ({ ...previous, email: { ...previous.email, message: "Enter a valid email address" } }));
      return;
    }
    if (type === "mobile" && !/^\+?[0-9]{10,15}$/.test(value.replace(/[\s-]/g, ""))) {
      setVerification((previous) => ({ ...previous, mobile: { ...previous.mobile, message: "Enter a valid phone number" } }));
      return;
    }
    setVerification((previous) => ({ ...previous, [type]: { ...previous[type], loading: true, message: "" } }));
    try {
      await callOtpEndpoint("send", {
        doctor_id: doctorId,
        type: type === "mobile" ? "phone" : "email",
        value,
        email: type === "email" ? value : undefined,
        phone: type === "mobile" ? value : undefined,
      });
      setVerification((previous) => ({
        ...previous,
        [type]: { ...previous[type], sent: true, verified: false, loading: false, message: `OTP sent to ${value}. Test OTP: ${STATIC_OTP}` },
      }));
    } catch (error) {
      setVerification((previous) => ({
        ...previous,
        [type]: { ...previous[type], loading: false, message: error.response?.data?.message || error.message || "Unable to send OTP" },
      }));
    }
  };

  const verifyContactOtp = async (type) => {
    const state = verification[type];
    if (!/^\d{4,6}$/.test(state.otp)) {
      setVerification((previous) => ({ ...previous, [type]: { ...previous[type], message: "Enter a valid OTP" } }));
      return;
    }
    setVerification((previous) => ({ ...previous, [type]: { ...previous[type], loading: true, message: "" } }));
    try {
      const value = String(profile[type] || "").trim();
      await callOtpEndpoint("verify", {
        doctor_id: doctorId,
        type: type === "mobile" ? "phone" : "email",
        value,
        otp: state.otp,
        email: type === "email" ? value : undefined,
        phone: type === "mobile" ? value : undefined,
      });
      setVerification((previous) => ({
        ...previous,
        [type]: { ...previous[type], verified: true, loading: false, message: "Verified successfully" },
      }));
    } catch (error) {
      setVerification((previous) => ({
        ...previous,
        [type]: { ...previous[type], verified: false, loading: false, message: error.response?.data?.message || error.message || "Invalid or expired OTP" },
      }));
    }
  };

  const saveProfileToApi = async () => {
    const emailNeedsVerification = contactChanged("email") && !verification.email.verified;
    const mobileNeedsVerification = contactChanged("mobile") && !verification.mobile.verified;
    if (emailNeedsVerification || mobileNeedsVerification) {
      setProfileError("Please verify the changed email address and phone number before saving.");
      return;
    }
    try {
      setSavingProfile(true);
      setProfileError("");
      await axios.put(`${API_BASE_URL}/users/doctor-profile/${doctorId}`, {
        full_name: profile.name,
        email: profile.email,
        phone: profile.mobile,
        dob: profile.dob,
        gender: profile.gender,
        current_address: profile.currentAddress,
        permanent_address: profile.permanentAddress,
        aadhaar_number: profile.aadhaar,
        pan_number: profile.pan,
        qualification: profile.qualification,
        experience: profile.experience,
        languages: profile.languages,
        about_doctor: profile.about,
        expertise: profile.expertise,
      }, { headers: getAuthHeaders() });
      setSavedContact({ email: profile.email, mobile: profile.mobile });
      setIsEditMode(false);
      setProfileStatus("succeeded");
      localStorage.setItem(`doctorProfile:${doctorId}`, JSON.stringify(profile));
    } catch (error) {
      setProfileError(error.response?.data?.message || "Profile update failed");
    } finally {
      setSavingProfile(false);
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
      }
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
            onClick={handleEditProfileClick}
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
                {/* <button
                  className="btn-edit-section"
                  onClick={() => handleEditClick(section.id)}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </button> */}
              </div>
              <div className="section-content">
                {section.fields.map((field) => (
                  <div key={field.key} className="profile-field">
                    <span className="field-label">{field.label}:</span>
                    <span className="field-value">
                      {profile[field.key] || "Not set"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Profile Completion Status */}
        <div className="overall-status mt-4">
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
          </div>
          {statusPersonal === "Completed" &&
            statusProfessional === "Completed" && (
              <div className="mt-4 text-center">
                <button
                  className="complete-btn"
                  onClick={handleCompleteProfile}
                >
                  <i className="bi bi-check-lg me-2"></i>
                  Profile Complete
                </button>
                <p className="text-muted mt-2">
                  Your profile is fully completed and ready!
                </p>
              </div>
            )}
        </div>
      </div>
    );
  };

  // Render Edit Form
  const renderEditForm = () => {
    return (
      <div className="profile-flow">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <h2 className="profile-header">Edit Profile</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setIsEditMode(false)}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back to View
          </button>
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
        </div>

        {/* PERSONAL DETAILS - Edit Mode */}
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
                onChange={(e) => updateContact("email", e.target.value)}
                placeholder="Enter your email"
              />
              {contactChanged("email") && (
                <div className="profile-contact-verification">
                  <button type="button" onClick={() => sendContactOtp("email")} disabled={verification.email.loading}>
                    {verification.email.loading ? "Please wait..." : verification.email.sent ? "Resend OTP" : "Send OTP"}
                  </button>
                  {verification.email.sent && !verification.email.verified && (
                    <><input inputMode="numeric" maxLength="6" value={verification.email.otp} onChange={(e) => setVerification((previous) => ({ ...previous, email: { ...previous.email, otp: e.target.value.replace(/\D/g, "") } }))} placeholder="OTP" /><button type="button" onClick={() => verifyContactOtp("email")}>Verify</button></>
                  )}
                  <small className={verification.email.verified ? "verified" : ""}>{verification.email.message}</small>
                </div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                className="form-input form-control"
                type="tel"
                value={profile.mobile}
                onChange={(e) => updateContact("mobile", e.target.value)}
                placeholder="Enter mobile number"
              />
              {contactChanged("mobile") && (
                <div className="profile-contact-verification">
                  <button type="button" onClick={() => sendContactOtp("mobile")} disabled={verification.mobile.loading}>
                    {verification.mobile.loading ? "Please wait..." : verification.mobile.sent ? "Resend OTP" : "Send OTP"}
                  </button>
                  {verification.mobile.sent && !verification.mobile.verified && (
                    <><input inputMode="numeric" maxLength="6" value={verification.mobile.otp} onChange={(e) => setVerification((previous) => ({ ...previous, mobile: { ...previous.mobile, otp: e.target.value.replace(/\D/g, "") } }))} placeholder="OTP" /><button type="button" onClick={() => verifyContactOtp("mobile")}>Verify</button></>
                  )}
                  <small className={verification.mobile.verified ? "verified" : ""}>{verification.mobile.message}</small>
                </div>
              )}
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

          <div className="d-flex justify-content-between align-items-center mt-3 profile-form-actions">
            <button className="btn btn-secondary" onClick={() => setIsEditMode(false)}>
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
            <button className="save-btn" onClick={validatePersonal}>


              <i className="bi bi-check-circle me-2"></i>
              Save Personal Details
            </button>

          </div>
        </div>

        {/* PROFESSIONAL DETAILS - Edit Mode */}
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

          <div className="d-flex justify-content-between align-items-center mt-3 profile-form-actions">
            <button className="btn btn-secondary" onClick={() => setIsEditMode(false)}>
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>

            <button className="save-btn" onClick={validateProfessional}>
              <i className="bi bi-check-circle me-2"></i>
              Save Professional Details
            </button>
          </div>

        </div>
        <div className="text-center">
          <button className="save-btn" onClick={saveProfileToApi} disabled={savingProfile}>
          <i className="bi bi-check-circle me-2"></i>
          {savingProfile ? "Saving..." : "Save"}
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
          </div>
          {statusPersonal === "Completed" &&
            statusProfessional === "Completed" && (
              <div className="mt-4 text-center">
                <button
                  className="complete-btn"
                  onClick={handleCompleteProfile}

                >
                  <i className="bi bi-check-lg me-2"></i>
                  Complete Profile Setup
                </button>
                <p className="text-muted mt-2">
                  Your profile is ready! Click above to finalize.
                </p>
              </div>
            )}
        </div>
      </div>
    );
  };

  // Render Edit Modal for View Mode (for section-wise editing)
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

  return (
    <div className="doctor-profile-container">
      {profileStatus === "loading" && (
        <div className="alert alert-info" role="status">Loading doctor profile...</div>
      )}
      {profileError && (
        <div className="alert alert-warning" role="alert">{profileError}</div>
      )}
      {isEditMode ? renderEditForm() : renderProfileView()}
      {renderEditModal()}
    </div>
  );
}
