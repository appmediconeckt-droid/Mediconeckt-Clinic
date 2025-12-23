import React from "react";
import { helpData } from "./data";

export default function HelpTab() {
  return (
    <div className="patient-profile-content">
      <h3 className="patient-section-title">❓ Help & Support</h3>
      <div className="patient-help-section">
        {helpData.map((help, idx) => (
          <div key={idx} className="patient-help-card">
            <h4>{help.title}</h4>
            <p>{help.description}</p>
            {help.email && <p>{help.email}</p>}
            <button className={`patient-btn-${help.buttonType} patient-mt-2`}>
              {help.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}