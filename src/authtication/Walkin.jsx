import React, { useState } from 'react';
import './Walkin.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../image/Mediconect Logo-2.png';

function Walkin() {
  const [activeCard, setActiveCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (cardType, routePath, alertMessage) => {
    setActiveCard(cardType);
    setIsLoading(true);

    // Simulate loading/API call
    setTimeout(() => {
      setIsLoading(false);
      alert(alertMessage);
      navigate(routePath);
    }, 800);
  };

  const handleDashboardClick = () => {
    handleCardClick('dashboard', '/patientdashboard', 'Dashboard loaded successfully!');
  };

  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
  };

  const handleWalkinAppointment = () => {
    setShowAppointmentModal(false);
    handleCardClick('walkin', '/walk-in-appointment', 'Walk-in Appointment form opened!');
  };

  const handleOnlineAppointment = () => {
    setShowAppointmentModal(false);
    handleCardClick('online', '/qrappointment', 'Online Appointment form opened!');
  };

  const closeModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <div className="Walkin">
      <div className="">
        <header style={{justifyContent:"center", textAlign:"center"}}>
         
          <motion.img
              src={logo} // imported variable use करें
              alt="Hospital Logo"
              width={300}
              height={180}
              className="me-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
        
        </header>

        <div className="cards" style={{ gap: "5px" }}>
          {/* Dashboard Card Button */}
          <button
            className={`card-button dashboard-card ${activeCard === 'dashboard' ? 'active' : ''}`}
            onClick={handleDashboardClick}
            disabled={isLoading}
            style={{ marginRight: "15px" }}
          >
            <div className="card-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h2 className="card-title">Dashboard</h2>
            <p className="card-description">
              Access patient records, view analytics, and manage healthcare operations
            </p>
            <div className="card-footer">
              <span className="card-badge">Patient dashboard</span>
              <div className="card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            {activeCard === 'dashboard' && isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading Dashboard...</p>
              </div>
            )}
          </button>

          {/* Appointment Card Button */}
          <button
            className={`card-button appointment-card ${activeCard === 'appointment' ? 'active' : ''}`}
            onClick={handleAppointmentClick}
            disabled={isLoading}
          >
            <div className="card-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h2 className="card-title">Appointment</h2>
            <p className="card-description">
              Choose between Walk-in or Online appointments for medical consultations
            </p>
            <div className="card-footer">
              <span className="card-badge">Book Now</span>
              <div className="card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            {activeCard === 'appointment' && isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading Appointment Options...</p>
              </div>
            )}
          </button>
        </div>

        {/* Appointment Modal */}
        {showAppointmentModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Choose Appointment Type</h2>
                <button className="modal-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-cards">
                  {/* Walk-in Option */}
                  <button
                    className="modal-card walkin-option"
                    onClick={handleWalkinAppointment}
                    disabled={isLoading}
                  >
                    <div className="modal-card-icon">
                      <i className="fas fa-walking"></i>
                    </div>
                    <h3>Walk-in</h3>
                    <p>Visit our clinic for immediate consultation and medical care</p>
                    <div className="modal-card-footer">
                      <span className="modal-badge">In-person</span>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </button>

                  {/* Online Appointment Option */}
                  <button
                    className="modal-card online-option"
                    onClick={handleOnlineAppointment}
                    disabled={isLoading}
                  >
                    <div className="modal-card-icon">
                      <i className="fas fa-video"></i>
                    </div>
                    <h3>Online Appointment</h3>
                    <p>Schedule virtual consultations from anywhere via QR code</p>
                    <div className="modal-card-footer">
                      <span className="modal-badge">Virtual</span>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </button>
                </div>

                <div className="modal-footer">
                  <button className="modal-cancel" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Walkin;