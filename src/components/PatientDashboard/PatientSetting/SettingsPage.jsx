import React, { useState } from "react";
import "./PatientSettingsPage.css";
import { useNavigate } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import ProfileTab from "./Profie/ProfileTab";
import AppointmentsTab from "./MyAppointment/AppointmentsTab";
import MedicalRecordsTab from "./MedicalRecord/MedicalRecordsTab";
import HelpTab from "./Help/HelpTab";
import PrivacyTab from "./Privacy/PrivacyTab";
import Modals from "./Modals";
import { API_BASE_URL } from "../../../redux/apiConfig";
import axios from "axios";


export default function PatientSettingsPage() {
  const [active, setActive] = useState("profile");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
  current_password: "",
  new_password: "",
  confirm_password: "",
});

const handleChangePassword = async (e) => {
  e.preventDefault();

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const user_id = authUser?.id || authUser?.user?.id;

  if (!user_id) {
    alert("User ID not found. Please login again.");
    return;
  }

  if (passwordData.new_password !== passwordData.confirm_password) {
    alert("New password and confirm password do not match");
    return;
  }

  try {
    const res = await axios.post(`${API_BASE_URL}/users/change-password`, {
      user_id,
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
      confirm_password: passwordData.confirm_password,
    });

    alert(res.data.message || "Password changed successfully");

    setPasswordData({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

    setShowChangePassword(false);
  } catch (error) {
    alert(error.response?.data?.message || "Failed to change password");
  }
};
  
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (active) {
      case "profile":
        return <ProfileTab />;
      case "appointment":
        return <AppointmentsTab />;
      case "medical":
        return <MedicalRecordsTab />;
      case "help":
        return <HelpTab />;
      case "privacy":
        return <PrivacyTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="patient-settings-page p-4">
      <div className="patient-settings-wrapper">
        {/* Sidebar */}
        <PatientSidebar 
          active={active}
          setActive={setActive}
          setShowChangePassword={setShowChangePassword}
          setShowLogoutConfirm={setShowLogoutConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
        
        {/* Content Area */}
        <div className="patient-all-tab">
          <div className="patient-form-box">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* All Modals */}
     <Modals 
  showChangePassword={showChangePassword}
  setShowChangePassword={setShowChangePassword}
  showLogoutConfirm={showLogoutConfirm}
  setShowLogoutConfirm={setShowLogoutConfirm}
  showDeleteConfirm={showDeleteConfirm}
  setShowDeleteConfirm={setShowDeleteConfirm}
  deleteSuccess={deleteSuccess}
  setDeleteSuccess={setDeleteSuccess}
  navigate={navigate}
  passwordData={passwordData}
  setPasswordData={setPasswordData}
  handleChangePassword={handleChangePassword}
/>
    </div>
  );
}