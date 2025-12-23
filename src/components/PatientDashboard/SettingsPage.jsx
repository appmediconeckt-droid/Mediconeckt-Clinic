import React, { useState } from "react";
import "./PatientSettingsPage.css";
import { useNavigate } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import ProfileTab from "./ProfileTab";
import AppointmentsTab from "./AppointmentsTab";
import MedicalRecordsTab from "./MedicalRecordsTab";
import HelpTab from "./HelpTab";
import PrivacyTab from "./PrivacyTab";
import Modals from "./Modals";


export default function PatientSettingsPage() {
  const [active, setActive] = useState("profile");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
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
      />
    </div>
  );
}