import React, { useState } from 'react';
import './PatientAppointment.css';
import { Link } from 'react-router-dom';

const PatientAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedist',
    'Gynecologist',
    'General Physician'
  ];

  const locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Miami',
    'Boston'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'New York',
      experience: '12 years',
      rating: 4.8,
      availableToday: true,
      imageColor: '#4CAF50'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      location: 'Los Angeles',
      experience: '15 years',
      rating: 4.9,
      availableToday: true,
      imageColor: '#2196F3'
    },
    {
      id: 3,
      name: 'Dr. Emily Wilson',
      specialty: 'Dermatologist',
      location: 'Chicago',
      experience: '8 years',
      rating: 4.7,
      availableToday: false,
      imageColor: '#FF9800'
    },
    {
      id: 4,
      name: 'Dr. Robert Davis',
      specialty: 'Pediatrician',
      location: 'Houston',
      experience: '10 years',
      rating: 4.6,
      availableToday: true,
      imageColor: '#9C27B0'
    },
    {
      id: 5,
      name: 'Dr. Jennifer Lee',
      specialty: 'Orthopedist',
      location: 'Phoenix',
      experience: '14 years',
      rating: 4.9,
      availableToday: true,
      imageColor: '#F44336'
    },
    {
      id: 6,
      name: 'Dr. James Miller',
      specialty: 'Gynecologist',
      location: 'Miami',
      experience: '11 years',
      rating: 4.8,
      availableToday: false,
      imageColor: '#3F51B5'
    },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = (doctorId) => {
    alert(`Booking appointment with doctor ID: ${doctorId}`);
    // In a real app, this would navigate to a booking page or open a modal
  };

  return (
    <div className="doctor-appointment">
      <header className="app-header">
        <h1>Book Appointment</h1>
        <p>Find and book appointments with top doctors</p>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search Doctor name, Location, Specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="specialty">
              <i className="fas fa-stethoscope"></i> Specialty
            </label>
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="location">
              <i className="fas fa-map-marker-alt"></i> Location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="clear-filters" 
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('');
              setSelectedLocation('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="results-info">
        <h2>Available Doctors</h2>
        <p>{filteredDoctors.length} doctors found</p>
      </div>

      <div className="doctor-profiles">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div className="doctor-card" key={doctor.id}>
              <div className="patient-card" style={{ backgroundColor: doctor.imageColor }}>
                <div className="doctor-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="availability-badge">
                  {doctor.availableToday ? (
                    <span className="available">Available Today</span>
                  ) : (
                    <span className="not-available">Next Available: Tomorrow</span>
                  )}
                </div>
              </div>
              
              <div className="card-body">
                <h3>{doctor.name}</h3>
                <div className="doctor-specialty">
                  <i className="fas fa-stethoscope"></i>
                  <span>{doctor.specialty}</span>
                </div>
                <div className="doctor-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{doctor.location}</span>
                </div>
                <div className="doctor-experience">
                  <i className="fas fa-briefcase"></i>
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="doctor-rating">
                  <i className="fas fa-star"></i>
                  <span>{doctor.rating}/5.0</span>
                </div>
              </div>
              
              <div className="appointment-card-footer">
                <Link to="/patient-appointment" style={{textDecorationLine:"none"}}>
                  <button className="book-btn">
                    <i className="fas fa-calendar-check"></i> Book Appointment
                  </button>
                </Link>
                <button className="view-profile-btn">
                  <i className="fas fa-user"></i> View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search fa-3x"></i>
            <h3>No doctors found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;