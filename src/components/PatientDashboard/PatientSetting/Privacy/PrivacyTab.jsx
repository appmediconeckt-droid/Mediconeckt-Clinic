import React, { useState } from "react";

export default function PrivacyTab() {
  const [privacySettings, setPrivacySettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataSharing: true,
    locationTracking: false
  });

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="patient-profile-content">
      <h3 className="patient-section-title">🔒 Privacy Settings</h3>
      <div className="patient-privacy-section">
        {Object.entries(privacySettings).map(([key, value]) => (
          <div key={key} className="patient-privacy-item">
            <span>
              {key.split(/(?=[A-Z])/).join(' ')}
            </span>
            <label className="patient-switch">
              <input 
                type="checkbox" 
                checked={value}
                onChange={() => togglePrivacySetting(key)}
              />
              <span className="patient-slider"></span>
            </label>
          </div>
        ))}
      </div>
      <div className="patient-profile-section patient-mt-3">
        <h4 className="patient-section-title">📄 Privacy Policy</h4>
        <p>
          Your data is protected under HIPAA regulations. 
          We never share your medical information without consent.
        </p>
        <button className="patient-btn-light patient-mt-2">View Full Policy</button>
      </div>
    </div>
  );
}