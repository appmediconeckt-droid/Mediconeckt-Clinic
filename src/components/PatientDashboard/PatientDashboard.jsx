// PatientDashboard.jsx
import React from 'react';
import './PatientDashboard.css';

const PatientDashboard = ({
  fullName = "Arun Kumar",
  phoneNo = "Not Provided",
  bloodGroup = "Not Provided",
  bp = "Not Provided",
  bmi = "Not Provided",
  email = "Not Provided",
  gender = "Not Provided",
  sugar = "Not Provided",
  spO2 = "Not Provided",
  address = "Not Provided",
  age = "Not Provided",
  activeConditions = [],
  temperature = "Not Provided",
  weight = "Not Provided"
}) => {
  
  // Format active conditions for display
  const formatActiveConditions = () => {
    if (!activeConditions || activeConditions.length === 0) {
      return "No active conditions";
    }
    
    return activeConditions.map((condition, index) => (
      <div key={index} className="condition-tag">
        {condition}
      </div>
    ));
  };

  return (
    <div className="patient-dashboard">
        
      <div className=" dashboard-header">
        <div className='pheader'><h3>Patient Dashboard</h3></div>
        <div className="patient-id">ID: P-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
      </div>
      
      <div className="patient-info-section">
        <div className="info-card full-name-card">
          <h2>{fullName}</h2>
          <div className="patient-age">Age: {age}</div>
        </div>
        
        <div className="info-grid">
          <div className="info-column">
            <div className="info-item">
              <h3>Phone No</h3>
              <p className="info-value">{phoneNo}</p>
            </div>
            
            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label">Blood Group</span>
                <span className={`sub-value blood-group ${bloodGroup.toLowerCase().replace('+', 'pos').replace('-', 'neg')}`}>
                  {bloodGroup}
                </span>
              </div>
              <div className="info-subitem">
                <span className="sub-label">BP</span>
                <span className="sub-value">{bp}</span>
              </div>
              <div className="info-subitem">
                <span className="sub-label">BMI</span>
                <span className="sub-value">{bmi}</span>
              </div>
            </div>
          </div>
          
          <div className="info-column">
            <div className="info-item">
              <h3>Email</h3>
              <p className="info-value">{email}</p>
            </div>
            
            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label">Gender</span>
                <span className="sub-value">{gender}</span>
              </div>
              <div className="info-subitem">
                <span className="sub-label">Sugar</span>
                <span className="sub-value">{sugar} mg/dL</span>
              </div>
              <div className="info-subitem">
                <span className="sub-label">SpO2</span>
                <span className="sub-value">{spO2}%</span>
              </div>
            </div>
          </div>
          
          <div className="info-column">
            <div className="info-item">
              <h3>Address</h3>
              <p className="info-value address-text">{address}</p>
            </div>
            
            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label">Temperature</span>
                <span className="sub-value">{temperature}°F</span>
              </div>
              <div className="info-subitem">
                <span className="sub-label">Weight</span>
                <span className="sub-value">{weight} lbs</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="active-conditions-section">
          <h3>Active Conditions</h3>
          <div className="conditions-container">
            {formatActiveConditions()}
          </div>
        </div>
      </div>
      
      <div className="vital-signs-summary">
        <h3>Vital Signs Summary</h3>
        <div className="vitals-grid">
          <div className={`vital-item ${bp !== "Not Provided" ? (bp.includes('/') ? (parseInt(bp.split('/')[0]) > 140 || parseInt(bp.split('/')[1]) > 90 ? 'warning' : 'normal') : 'normal') : 'normal'}`}>
            <span className="vital-label">Blood Pressure</span>
            <span className="vital-value">{bp}</span>
          </div>
          <div className={`vital-item ${sugar !== "Not Provided" ? (parseInt(sugar) > 140 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">Blood Sugar</span>
            <span className="vital-value">{sugar} mg/dL</span>
          </div>
          <div className={`vital-item ${spO2 !== "Not Provided" ? (parseInt(spO2) < 95 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">SpO2</span>
            <span className="vital-value">{spO2}%</span>
          </div>
          <div className={`vital-item ${temperature !== "Not Provided" ? (parseFloat(temperature) > 99.5 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">Temperature</span>
            <span className="vital-value">{temperature}°F</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;