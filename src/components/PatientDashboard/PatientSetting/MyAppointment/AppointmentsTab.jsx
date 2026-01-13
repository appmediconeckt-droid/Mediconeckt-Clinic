import React, { useState } from "react";
import { appointments } from "../../BookAppointment/data";
import { Link } from "react-router-dom";

export default function AppointmentsTab() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  const handleCloseModal = () => {
    setShowEmergencyModal(false);
  };

  const handleConfirmEmergency = () => {
    // Handle emergency confirmation logic here
    console.log("Emergency confirmed");
    setShowEmergencyModal(false);
    // You can add API call or other logic here
  };

  return (
    <>
      <div className="patient-profile-content">
        <h3 className="patient-section-title">📅 My Appointments</h3>
        <div className="patient-appointment-list">
          {appointments.map(app => (
            <div key={app.id} className="patient-appointment-card">

              <div className="patient-appointment-header">
                <span className="patient-appointment-date">
                  {app.date} at {app.time}
                </span>

                <span className={`patient-appointment-status patient-status-${app.status}`}>

                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              <div className="patient-appointment-details">
                <div className="d-flex justify-content-between align-items-center">
                  <div> <h4>{app.doctor}</h4></div>
                  <div> <Link to="/doctor-chat/:doctorId">
                    <span className="fas fa-message"></span>
                  </Link></div>
                </div>
                <p><strong>Department:</strong> {app.department}</p>
                <p><strong>Reason:</strong> {app.reason}</p>

              </div>
              <div className="patient-appointment-actions">
                <Link to="/patient-appointment">
                  <button className="btn btn-outline-secondary">Reschedule</button>
                </Link>
                <button className="btn btn-primary">View Details</button>
                <button
                  className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
                  onClick={handleEmergencyClick}
                >
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  EMERGENCY
                </button>
                {app.status === "pending" && (
                  <button className="btn btn-outline-danger">Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3">Book New Appointment</button>
      </div>

      {/* Emergency Confirmation Modal */}
      <div
        className={`modal fade ${showEmergencyModal ? 'show d-block' : ''}`}
        style={{ backgroundColor: showEmergencyModal ? 'rgba(0,0,0,0.1)' : 'transparent' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Emergency Alert
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>
                  <strong>Emergency Assistance Requested!</strong>
                  <p className="mb-0 mt-2">
                    Are you sure you want to trigger an emergency alert? This will immediately notify hospital staff and may result in additional charges.
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <h6>What happens next:</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-bell-fill text-danger me-2"></i>
                    Hospital emergency team will be notified immediately
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-telephone-fill text-primary me-2"></i>
                    You may receive a call to confirm your emergency
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-cash-coin text-warning me-2"></i>
                    Additional emergency fees may apply
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-clock-fill text-info me-2"></i>
                    Priority will be given to your case
                  </li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmEmergency}
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirm Emergency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backdrop */}
      {showEmergencyModal && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseModal}
        ></div>
      )}
    </>
  );
}