import './PatientDashboard.css';


const PatientDashboard = ({
  patientId = "P-1024",
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

  // Get patient status based on vital signs
  const getPatientStatus = () => {
    const warningCount = [
      bp !== "Not Provided" && bp.includes('/') ? (parseInt(bp.split('/')[0]) > 140 || parseInt(bp.split('/')[1]) > 90 ? 1 : 0) : 0,
      sugar !== "Not Provided" ? (parseInt(sugar) > 140 ? 1 : 0) : 0,
      spO2 !== "Not Provided" ? (parseInt(spO2) < 95 ? 1 : 0) : 0,
      temperature !== "Not Provided" ? (parseFloat(temperature) > 99.5 ? 1 : 0) : 0
    ].reduce((a, b) => a + b, 0);

    if (warningCount >= 3) return "critical";
    if (warningCount >= 1) return "warning";
    return "stable";
  };

  const patientStatus = getPatientStatus();
  const valueWithUnit = (value, unit) =>
    value === "Not Provided" ? value : `${value}${unit}`;

  return (
    <div className={`patient-dashboard patient-status-${patientStatus}`}>

      <header className="patient-app-header">
        <div>
          <span className="patient-app-eyebrow">Health overview</span>
          <h2>Patient Dashboard</h2>
          <p>Your profile and latest vital signs in one place.</p>
        </div>
      </header>
      <div className="dashboard-header">

        <div className="patient-status-indicator">
          <div className={`status-dot ${patientStatus}`}></div>
          <span className="status-text">Status: {patientStatus.charAt(0).toUpperCase() + patientStatus.slice(1)}</span>
        </div>
        <div className="patient-id">Patient ID: {patientId}</div>
      </div>

      <div className="patient-info-section">
        <div className={`info-card full-name-card patient-${patientStatus}`}>
          <div className="patient-header">
            <div className="patient-profile-avatar" aria-hidden="true">
              {fullName
                .split(" ")
                .map((name) => name.charAt(0))
                .slice(0, 2)
                .join("")}
            </div>
            <div className="patient-profile-copy">
              <span className="patient-profile-label">Patient profile</span>
              <h2>{fullName}</h2>
              <div className="patient-age-gender">
                <span className="patient-age">Age: {age}</span>
                <span className="patient-gender">{gender}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-info-grid">
          <div className="info-column">
            <div className="info-item">
              <h3><i className="icon-phone"></i> Phone No</h3>
              <p className="info-value phone">{phoneNo}</p>
            </div>

            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-blood"></i> Blood Group</span>
                <span className={`sub-value blood-group ${bloodGroup.toLowerCase().replace('+', 'pos').replace('-', 'neg')}`}>
                  {bloodGroup}
                </span>
              </div>
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-bp"></i> BP</span>
                <span className={`sub-value ${bp !== "Not Provided" && bp.includes('/') ? (parseInt(bp.split('/')[0]) > 140 || parseInt(bp.split('/')[1]) > 90 ? 'warning-value' : 'normal-value') : ''}`}>
                  {bp}
                </span>
              </div>
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-bmi"></i> BMI</span>
                <span className={`sub-value ${bmi !== "Not Provided" ? (parseFloat(bmi) > 25 || parseFloat(bmi) < 18.5 ? 'warning-value' : 'normal-value') : ''}`}>
                  {bmi}
                </span>
              </div>
            </div>
          </div>

          <div className="info-column">
            <div className="info-item">
              <h3><i className="icon-email"></i> Email</h3>
              <p className="info-value email">{email}</p>
            </div>

            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-gender"></i> Gender</span>
                <span className="sub-value gender-value">{gender}</span>
              </div>
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-sugar"></i> Sugar</span>
                <span className={`sub-value ${sugar !== "Not Provided" ? (parseInt(sugar) > 140 ? 'warning-value' : 'normal-value') : ''}`}>
                  {valueWithUnit(sugar, " mg/dL")}
                </span>
              </div>
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-spo2"></i> SpO2</span>
                <span className={`sub-value ${spO2 !== "Not Provided" ? (parseInt(spO2) < 95 ? 'warning-value' : 'normal-value') : ''}`}>
                  {valueWithUnit(spO2, "%")}
                </span>
              </div>
            </div>
          </div>

          <div className="info-column">
            <div className="info-item">
              <h3><i className="icon-address"></i> Address</h3>
              <p className="info-value address-text">{address}</p>
            </div>

            <div className="info-subgroup">
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-temp"></i> Temperature</span>
                <span className={`sub-value ${temperature !== "Not Provided" ? (parseFloat(temperature) > 99.5 ? 'warning-value' : 'normal-value') : ''}`}>
                  {valueWithUnit(temperature, "°F")}
                </span>
              </div>
              <div className="info-subitem">
                <span className="sub-label"><i className="icon-weight"></i> Weight</span>
                <span className="sub-value">{valueWithUnit(weight, " lbs")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="active-conditions-section">
          <h3><i className="icon-conditions"></i> Active Conditions</h3>
          <div className="conditions-container">
            {formatActiveConditions()}
          </div>
        </div>
      </div>

      <div className="vital-signs-summary">
        <h3><i className="icon-vitals"></i> Vital Signs Summary</h3>
        <div className="vitals-grid">
          <div className={`vital-item ${bp !== "Not Provided" ? (bp.includes('/') ? (parseInt(bp.split('/')[0]) > 140 || parseInt(bp.split('/')[1]) > 90 ? 'warning' : 'normal') : 'normal') : 'normal'}`}>
            <span className="vital-label">Blood Pressure</span>
            <span className="vital-value">{bp}</span>
            <span className="vital-status">
              {bp !== "Not Provided" && bp.includes('/') ?
                (parseInt(bp.split('/')[0]) > 140 || parseInt(bp.split('/')[1]) > 90 ? '⚠️ High' : '✅ Normal') :
                ''}
            </span>
          </div>
          <div className={`vital-item ${sugar !== "Not Provided" ? (parseInt(sugar) > 140 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">Blood Sugar</span>
            <span className="vital-value">{valueWithUnit(sugar, " mg/dL")}</span>
            <span className="vital-status">
              {sugar !== "Not Provided" ?
                (parseInt(sugar) > 140 ? '⚠️ High' : '✅ Normal') :
                ''}
            </span>
          </div>
          <div className={`vital-item ${spO2 !== "Not Provided" ? (parseInt(spO2) < 95 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">SpO2</span>
            <span className="vital-value">{valueWithUnit(spO2, "%")}</span>
            <span className="vital-status">
              {spO2 !== "Not Provided" ?
                (parseInt(spO2) < 95 ? '⚠️ Low' : '✅ Normal') :
                ''}
            </span>
          </div>
          <div className={`vital-item ${temperature !== "Not Provided" ? (parseFloat(temperature) > 99.5 ? 'warning' : 'normal') : 'normal'}`}>
            <span className="vital-label">Temperature</span>
            <span className="vital-value">{valueWithUnit(temperature, "°F")}</span>
            <span className="vital-status">
              {temperature !== "Not Provided" ?
                (parseFloat(temperature) > 99.5 ? '⚠️ High' : '✅ Normal') :
                ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
