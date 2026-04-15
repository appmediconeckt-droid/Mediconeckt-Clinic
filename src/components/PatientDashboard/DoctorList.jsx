import React, { useState } from 'react';
import './PatientSms.css';

const DoctorList = ({ doctors, onSelectDoctor, searchTerm, setSearchTerm }) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="doctor-list-section">
      <div className="search-section">
        <h3 className="doctors-list-title">Doctors</h3>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="doctors-list-container">
        {doctors.length === 0 ? (
          <div className="no-doctors-message">
            <i className="fas fa-user-md no-doctor-icon"></i>
            <p className="no-doctor-text">No doctors found</p>
          </div>
        ) : (
          <ul className="doctors-list">
            {doctors.map(doctor => (
              <li
                key={doctor.id}
                className="doctor-list-item"
                onClick={() => onSelectDoctor(doctor)}
              >
                <div className={`doctor-avatar ${doctor.avatarColor}`}>
                  {getInitials(doctor.name)}
                  {doctor.online && <span className="online-indicator"></span>}
                </div>
                
                <div className="doctor-main-info">
                  <h4 className="doctor-name">{doctor.name}</h4>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="doctor-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star star ${i < Math.floor(doctor.rating) ? 'star-filled' : 'star-empty'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-value">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="doctor-list-details">
                  <span className="last-message-time">{doctor.time}</span>
                  {doctor.unread > 0 && (
                    <span className="unread-count">{doctor.unread}</span>
                  )}
                  <p className="last-message-preview">{doctor.lastMessage}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorList;