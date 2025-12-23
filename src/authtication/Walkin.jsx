// Walkin.js
import React, { useState } from 'react';
import './Walkin.css';
import { useNavigate } from 'react-router-dom';



function Walkin() {
  const [activeCard, setActiveCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleDashboardClick = () => {
    setActiveCard('dashboard');
    setIsLoading(true);
    
    // Simulate loading/API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Dashboard loaded successfully!');
      navigate("/patientdashboard");
      // In a real app: navigate('/dashboard') or set state to show dashboard content
    }, 800);
  };
  
  const handleAppointmentClick = () => {
    setActiveCard('appointment');
    setIsLoading(true);
    
    // Simulate loading/API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Walk-in Appointment form opened!');
      navigate("/walkinclinic");
      // In a real app: navigate('/appointment') or set state to show appointment form
    }, 800);
  };
  
  return (
    <div className="Walkin">
      <div className="">
        <header>
          <div className="logo">
            <i className="fas fa-heartbeat"></i>
          </div>
          <h1>HealthCare Portal</h1>
          <p className="subtitle">Choose an option below to access healthcare services</p>
           <footer className=''>
          <p>© {new Date().getFullYear()} MediCare Solutions. All rights reserved.</p>
          <p className="emergency-contact">
            <i className="fas fa-phone-alt"></i> Emergency: <strong>1-800-MED-HELP</strong>
          </p>
        </footer>
        </header>
        
        
        
        
         <div className="cards" style={{gap:"5px"}}>
            {/* Dashboard Card Button */}
            <button 
              className={`card-button dashboard-card ${activeCard === 'dashboard' ? 'active' : ''}`}
              onClick={handleDashboardClick}
              disabled={isLoading}
              style={{marginRight:"30px"}}
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
                <i className="fas fa-calendar-plus"></i>
              </div>
              <h2 className="card-title">Walk-in Appointment</h2>
              <p className="card-description">
                Register new patients for immediate consultation and medical care
              </p>
              <div className="card-footer">
                <span className="card-badge">Walk-in-clinic</span>
                <div className="card-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              
              {activeCard === 'appointment' && isLoading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                  <p>Loading Appointment Form...</p>
                </div>
              )}
            </button>
          </div>
      </div>
    </div>
  );
}

export default Walkin;