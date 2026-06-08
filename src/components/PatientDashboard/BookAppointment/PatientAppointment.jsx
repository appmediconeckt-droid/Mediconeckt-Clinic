import React, { useState, useEffect } from 'react';
import './PatientAppointment.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../../redux/doctorsSlice';
import AppointmentBooking from './AppointmentBookingModal';

const PatientAppointment = () => {
  const dispatch = useDispatch();
  const { list: doctorsFromStore, status: doctorsStatus, error: doctorsError } = useSelector((state) => state.doctors || { list: [], status: 'idle', error: null });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Always fetch doctors when this page mounts so navigation triggers the API call
    dispatch(fetchDoctors());
  }, [dispatch]);

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

  // Use API-provided doctors; fallback to empty list until API responds
  const doctors = (doctorsFromStore && doctorsFromStore.length > 0)
    ? doctorsFromStore.map(d => ({
        id: d._id || d.id,
        name: d.full_name || d.fullname || d.name,
        specialty: d.speciality || d.specialization || d.specialty,
        location: d.location || d.city || '',
        experience: d.experience || d.years || '',
        rating: d.rating || 4.5,
        availableToday: true,
        imageColor: '#4CAF50',
      }))
    : [];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
  };

  if (showBookingModal && selectedDoctor) {
    return (
      <AppointmentBooking 
        doctorId={selectedDoctor.id} 
        doctorData={{
          name: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          experience: selectedDoctor.experience,
          id: selectedDoctor.id,
        }}
        onClose={closeBookingModal}
      />
    );
  }

  return (
    <div className="doctor-appointment p-4">
      <header className="app-header  d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h1>Book Appointment</h1>
        
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
        {doctorsStatus === 'loading' ? <p>Loading doctors...</p> : <p>{filteredDoctors.length} doctors found</p>}
        {doctorsStatus === 'failed' && <p className="text-danger">Error: {doctorsError}</p>}
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
                <button 
                  className="book-btn"
                  onClick={() => handleBookAppointment(doctor)}
                >
                  <i className="fas fa-calendar-check"></i> Book Appointment
                </button>
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
