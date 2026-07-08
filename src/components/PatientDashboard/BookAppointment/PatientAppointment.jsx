import React, { useState } from 'react';
import './PatientAppointment.css';
import AppointmentBooking from './AppointmentBookingModal';

const PatientAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Consultation Type');
  const [viewMode, setViewMode] = useState('grid');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // --- Mock doctors (static, matches screenshot) ---
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      initials: 'SJ',
      color: '#0d9488',
      specialty: 'Cardiology Specialist',
      hospital: 'City General Hospital',
      rating: 4.9,
      reviews: 324,
      experience: '15 Yrs Exp',
      availableToday: true,
      distance: '2.4 miles away',
      fee: '$150 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['09:00 AM', '10:30 AM', '11:45 AM'],
      moreSlots: 5,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      initials: 'MC',
      color: '#2563eb',
      specialty: 'Dermatology',
      hospital: 'Skin Care Wellness Center',
      rating: 4.8,
      reviews: 189,
      experience: '8 Yrs Exp',
      availableToday: false,
      distance: '5.1 miles away',
      fee: '$120 Consult',
      onlineAvail: false,
      clinicText: 'In-Clinic Only',
      slots: ['08:00 AM', '01:15 PM', '03:30 PM'],
      moreSlots: 0,
    },
    {
      id: 3,
      name: 'Dr. Emily Carter',
      initials: 'EC',
      color: '#7c3aed',
      specialty: 'Pediatrics',
      hospital: 'Sunrise Children’s Clinic',
      rating: 4.7,
      reviews: 256,
      experience: '11 Yrs Exp',
      availableToday: true,
      distance: '3.2 miles away',
      fee: '$100 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['10:00 AM', '12:30 PM', '02:15 PM'],
      moreSlots: 4,
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      initials: 'JW',
      color: '#ea580c',
      specialty: 'Orthopedics',
      hospital: 'Metro Bone & Joint Center',
      rating: 4.6,
      reviews: 142,
      experience: '20 Yrs Exp',
      availableToday: true,
      distance: '1.8 miles away',
      fee: '$180 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['09:30 AM', '11:00 AM', '04:00 PM'],
      moreSlots: 6,
    },
  ];

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const filters = ['Specialty', 'Location', 'Consultation Type', 'Available Today'];

  return (
    <div className="appt-page">

      {/* ===== Header ===== */}
      <div className="appt-head">
        <div className="appt-head-left">
          <h1 className="appt-title">Book an Appointment</h1>
          <p className="appt-sub">
            Find experienced doctors based on specialty, location, availability, and patient ratings.
          </p>
        </div>
        <div className="appt-stats">
          <div className="appt-stat">
            <i className="fa-solid fa-user-doctor"></i>
            <div className="appt-stat-body">
              <strong>126</strong>
              <span>Doctors</span>
            </div>
          </div>
          <div className="appt-stat">
            <span className="appt-stat-dot"></span>
            <div className="appt-stat-body">
              <strong>48</strong>
              <span>Available Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Search ===== */}
      <div className="appt-searchbar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search by doctor name, specialty, symptoms, hospital, or clinic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ===== Filters ===== */}
      <div className="appt-filters">
        <span className="appt-filters-label">
          <i className="fa-solid fa-sliders"></i> Filters:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            className={`appt-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(activeFilter === f ? '' : f)}
          >
            {activeFilter === f && <i className="fa-solid fa-check"></i>}
            {f}
            {(f === 'Specialty' || f === 'Location') && <i className="fa-solid fa-chevron-down appt-chip-caret"></i>}
          </button>
        ))}
        <button
          className="appt-clear"
          onClick={() => { setSearchTerm(''); setActiveFilter(''); }}
        >
          Clear Filters
        </button>
      </div>

      {/* ===== Results head ===== */}
      <div className="appt-results-head">
        <h2 className="appt-results-title">Available Specialists</h2>
        <div className="appt-sort">
          <span className="appt-sort-label">Sort By:</span>
          <span className="appt-sort-value">Recommended <i className="fa-solid fa-chevron-down"></i></span>
          <div className="appt-view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <i className="fa-solid fa-table-cells-large"></i>
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Doctor cards ===== */}
      <div className={`appt-grid ${viewMode === 'list' ? 'appt-grid-list' : ''}`}>
        {filteredDoctors.length > 0 ? filteredDoctors.map((doc) => (
          <div className="doc-card" key={doc.id}>

            <div className="doc-card-top">
              <div className="doc-avatar-wrap">
                <div className="doc-avatar" style={{ background: doc.color }}>{doc.initials}</div>
                {doc.availableToday && <span className="doc-online"></span>}
              </div>

              <div className="doc-main">
                <div className="doc-name-row">
                  <h3 className="doc-name">{doc.name}</h3>
                  <span className={`doc-avail ${doc.availableToday ? 'today' : 'tomorrow'}`}>
                    {doc.availableToday ? 'AVAILABLE TODAY' : 'NEXT AVAIL: TOMORROW'}
                  </span>
                </div>
                <span className="doc-specialty">{doc.specialty}</span>
                <span className="doc-hospital">{doc.hospital}</span>
                <div className="doc-meta">
                  <span className="doc-rating">
                    <i className="fa-solid fa-star"></i> {doc.rating} <span className="doc-reviews">({doc.reviews})</span>
                  </span>
                  <span className="doc-dot">•</span>
                  <span className="doc-exp">{doc.experience}</span>
                </div>
              </div>
            </div>

            <div className="doc-info">
              <div className="doc-info-item"><i className="fa-solid fa-location-dot"></i> {doc.distance}</div>
              <div className="doc-info-item"><i className="fa-solid fa-credit-card"></i> {doc.fee}</div>
              <div className={`doc-info-item ${doc.onlineAvail ? '' : 'muted'}`}>
                <i className="fa-solid fa-video"></i> Online Avail
              </div>
              <div className="doc-info-item"><i className="fa-solid fa-hospital"></i> {doc.clinicText}</div>
            </div>

            <div className="doc-slots-label">
              {doc.availableToday ? "Today's Availability" : "Tomorrow's Availability"}
            </div>
            <div className="doc-slots">
              {doc.slots.map((s) => (
                <span className="doc-slot" key={s}>{s}</span>
              ))}
              {doc.moreSlots > 0 && <span className="doc-slot doc-slot-more">+{doc.moreSlots} More</span>}
            </div>

            <div className="doc-actions">
              <button className="doc-book" onClick={() => handleBookAppointment(doc)}>Book Appointment</button>
              <button className="doc-view">View Profile</button>
            </div>
          </div>
        )) : (
          <div className="appt-no-results">
            <i className="fa-solid fa-user-doctor"></i>
            <h3>No doctors found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;
