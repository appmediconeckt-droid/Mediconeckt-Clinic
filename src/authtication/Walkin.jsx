import React, { useState } from 'react';
import './Walkin.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import logo from '../image/Mediconect-Logo-4.png';

function Walkin() {
  const [activeCard, setActiveCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (cardType, routePath) => {
    setActiveCard(cardType);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(routePath);
    }, 500);
  };

  const handleDashboardClick = () => {
    handleCardClick('dashboard', '/patientdashboard');
  };

  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
  };

  const handleWalkinAppointment = () => {
    setShowAppointmentModal(false);
    handleCardClick('walkin', '/walk-in-appointment');
  };

  const handleOnlineAppointment = () => {
    setShowAppointmentModal(false);
    handleCardClick('online', '/qrappointment');
  };

  const closeModal = () => setShowAppointmentModal(false);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    navigate('/');
  };

  return (
    <div className="welcome-page">

      {/* ===== Top Nav ===== */}
      <header className="welcome-nav">
        <img src={logo} alt="Mediconeckt" className="welcome-logo" />
      </header>

      {/* ===== Hero ===== */}
      <div className="welcome-hero">
        <h1 className="welcome-title">Welcome back!</h1>
        <p className="welcome-sub">Choose what you'd like to do today.</p>
        <p className="welcome-desc">
          You can manage your health records or quickly schedule an appointment.
        </p>
      </div>

      {/* ===== Cards ===== */}
      <div className="welcome-cards">

        {/* My Dashboard */}
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="welcome-card-img">
            <img
              src="/Background.png"
              alt="My Dashboard"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="welcome-card-title">My Dashboard</h2>
          <p className="welcome-card-desc">
            View your medical profile, appointment history, prescriptions,
            reports, payments, and personal information.
          </p>
          <span className="welcome-card-note">ACCESS ALL YOUR HEALTHCARE RECORDS.</span>
          <button
            className="welcome-btn"
            onClick={handleDashboardClick}
            disabled={isLoading}
          >
            Open Dashboard <i className="fa-solid fa-arrow-right"></i>
          </button>
        </motion.div>

        {/* Book an Appointment */}
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="welcome-card-img">
            <img
              src="/Background%20(1).png"
              alt="Book an Appointment"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="welcome-card-title">Book an Appointment</h2>
          <p className="welcome-card-desc">
            Schedule a walk-in visit or an online consultation with your
            preferred doctor.
          </p>
          <span className="welcome-card-note">CHOOSE BETWEEN WALK-IN AND ONLINE CONSULTATION.</span>
          <button
            className="welcome-btn"
            onClick={handleAppointmentClick}
            disabled={isLoading}
          >
            Book Appointment <i className="fa-solid fa-arrow-right"></i>
          </button>
        </motion.div>

      </div>

      {/* ===== Footer ===== */}
      <footer className="welcome-footer">
        <img src={logo} alt="Mediconeckt" className="welcome-footer-logo" />
        <div className="welcome-footer-links">
          <a href="#help">Need Help?</a>
          <a href="#support">Contact Support</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <span className="welcome-copy">© 2024 Mediconeckt. All rights reserved.</span>
      </footer>

      {/* ===== Choose Appointment Type Modal ===== */}
      {showAppointmentModal && (
        <div className="apt-modal-overlay" onClick={closeModal}>
          <div className="apt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="apt-modal-head">
              <div>
                <h2 className="apt-modal-title">Choose Appointment Type</h2>
                <p className="apt-modal-sub">How would you like to consult with your doctor?</p>
              </div>
              <button className="apt-modal-close" onClick={closeModal} aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="apt-modal-banner">
              <i className="fa-solid fa-lightbulb"></i>
              <span>
                Walk-in appointments are ideal for physical examinations and acute conditions,
                while online consultations are perfect for follow-ups, prescription refills,
                and reviewing test results.
              </span>
            </div>

            <div className="apt-modal-cards">
              {/* Walk-in */}
              <div className="apt-opt">
                <div className="apt-opt-top">
                  <div className="apt-opt-icon green"><i className="fa-solid fa-person-walking"></i></div>
                  <span className="apt-opt-badge">Available Today</span>
                </div>
                <h3 className="apt-opt-title">Walk-in Visit</h3>
                <p className="apt-opt-desc">Visit the clinic for an in-person consultation.</p>
                <ul className="apt-opt-features">
                  <li><i className="fa-solid fa-user-group"></i> Face-to-face consultation</li>
                  <li><i className="fa-solid fa-stethoscope"></i> Physical examination</li>
                  <li><i className="fa-solid fa-flask"></i> Access to lab tests</li>
                </ul>
                <button className="apt-opt-btn green" onClick={handleWalkinAppointment} disabled={isLoading}>
                  Select Walk-in
                </button>
              </div>

              {/* Online */}
              <div className="apt-opt">
                <div className="apt-opt-top">
                  <div className="apt-opt-icon blue"><i className="fa-solid fa-video"></i></div>
                  <span className="apt-opt-badge">Available Today</span>
                </div>
                <h3 className="apt-opt-title">Online Consultation</h3>
                <p className="apt-opt-desc">Meet your doctor remotely through a secure video consultation.</p>
                <ul className="apt-opt-features">
                  <li><i className="fa-solid fa-desktop"></i> Video consultation</li>
                  <li><i className="fa-solid fa-globe"></i> Join from anywhere</li>
                  <li><i className="fa-solid fa-file-prescription"></i> Digital prescription</li>
                </ul>
                <button className="apt-opt-btn darkgreen" onClick={handleOnlineAppointment} disabled={isLoading}>
                  Select Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Walkin;
