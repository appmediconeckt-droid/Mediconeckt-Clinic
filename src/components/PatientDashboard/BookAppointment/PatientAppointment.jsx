import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import './PatientAppointment.css';
import AppointmentBooking from './AppointmentBookingModal';

const PatientAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [profileDoctor, setProfileDoctor] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [qrError, setQrError] = useState('');
  const [qrScanning, setQrScanning] = useState(false);
  const qrFileRef = useRef(null);
  const navigate = useNavigate();
  // Filters
  const [openFilter, setOpenFilter] = useState(null);          // 'specialty' | 'location' | 'consultation' | null
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [consultationType, setConsultationType] = useState(''); // '' | 'in-clinic' | 'online'
  const [availableToday, setAvailableToday] = useState(false);
  const [expandedSlots, setExpandedSlots] = useState([]); // doctor ids with all slots shown

  const toggleSlots = (id) => {
    setExpandedSlots((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // --- Mock doctors (static, matches screenshot) ---
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      initials: 'SJ',
      color: '#0d9488',
      specialty: 'Cardiology Specialist',
      hospital: 'City General Hospital',
      location: 'New York',
      rating: 4.9,
      reviews: 324,
      experience: '15 Yrs Exp',
      availableToday: true,
      distance: '2.4 miles away',
      fee: '$150 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['09:00 AM', '10:30 AM', '11:45 AM'],
      extraSlots: ['01:00 PM', '02:15 PM', '03:30 PM', '04:45 PM', '05:30 PM'],
      moreSlots: 5,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      initials: 'MC',
      color: '#2563eb',
      specialty: 'Dermatology',
      hospital: 'Skin Care Wellness Center',
      location: 'Los Angeles',
      rating: 4.8,
      reviews: 189,
      experience: '8 Yrs Exp',
      availableToday: false,
      distance: '5.1 miles away',
      fee: '$120 Consult',
      onlineAvail: false,
      clinicText: 'In-Clinic Only',
      slots: ['08:00 AM', '01:15 PM', '03:30 PM'],
      extraSlots: [],
      moreSlots: 0,
    },
    {
      id: 3,
      name: 'Dr. Emily Carter',
      initials: 'EC',
      color: '#7c3aed',
      specialty: 'Pediatrics',
      hospital: 'Sunrise Children’s Clinic',
      location: 'Chicago',
      rating: 4.7,
      reviews: 256,
      experience: '11 Yrs Exp',
      availableToday: true,
      distance: '3.2 miles away',
      fee: '$100 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['10:00 AM', '12:30 PM', '02:15 PM'],
      extraSlots: ['03:00 PM', '04:15 PM', '05:00 PM', '06:30 PM'],
      moreSlots: 4,
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      initials: 'JW',
      color: '#ea580c',
      specialty: 'Orthopedics',
      hospital: 'Metro Bone & Joint Center',
      location: 'New York',
      rating: 4.6,
      reviews: 142,
      experience: '20 Yrs Exp',
      availableToday: true,
      distance: '1.8 miles away',
      fee: '$180 Consult',
      onlineAvail: true,
      clinicText: 'In-Clinic Avail',
      slots: ['09:30 AM', '11:00 AM', '04:00 PM'],
      extraSlots: ['12:15 PM', '01:30 PM', '02:45 PM', '05:15 PM', '06:00 PM', '07:00 PM'],
      moreSlots: 6,
    },
  ];

  // Unique dropdown options
  const specialtyOptions = [...new Set(doctors.map((d) => d.specialty))];
  const locationOptions = [...new Set(doctors.map((d) => d.location))];

  const filteredDoctors = doctors.filter((d) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.hospital.toLowerCase().includes(q);
    const matchesSpecialty = !selectedSpecialty || d.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || d.location === selectedLocation;
    const matchesConsult =
      !consultationType || (consultationType === 'online' ? d.onlineAvail : true);
    const matchesToday = !availableToday || d.availableToday;
    return matchesSearch && matchesSpecialty && matchesLocation && matchesConsult && matchesToday;
  });

  const toggleFilter = (name) => setOpenFilter((prev) => (prev === name ? null : name));

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setSelectedLocation('');
    setConsultationType('');
    setAvailableToday(false);
    setOpenFilter(null);
  };

  const consultLabel =
    consultationType === 'online' ? 'Online' : consultationType === 'in-clinic' ? 'In-Clinic' : 'Consultation Type';

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
  };

  // ---- QR scanner ----
  const handleScanned = (text) => {
    let target = '/qrappointment';
    try {
      if (/^https?:\/\//i.test(text)) {
        const u = new URL(text);
        target = `/qrappointment${u.search || ''}`;
      } else if (text.includes('=')) {
        target = `/qrappointment?${text}`;
      } else {
        target = `/qrappointment?doctorId=${encodeURIComponent(text)}`;
      }
    } catch {
      target = `/qrappointment?doctorId=${encodeURIComponent(text)}`;
    }
    setShowQR(false);
    navigate(target);
  };

  // Decode a QR from an uploaded image file (no camera)
  const handleQrFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setQrError('');
    setQrScanning(true);
    const scanner = new Html5Qrcode('qr-reader-file');
    try {
      const decodedText = await scanner.scanFile(file, false);
      handleScanned(decodedText);
    } catch {
      setQrError('No QR code found in that image. Please upload a clear QR photo.');
    } finally {
      try { await scanner.clear(); } catch { /* ignore */ }
      setQrScanning(false);
      if (e.target) e.target.value = '';
    }
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
          <button className="appt-qr-btn" onClick={() => setShowQR(true)}>
            <i className="fa-solid fa-qrcode"></i> Scan QR
          </button>
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

        {/* Specialty dropdown */}
        <div className="appt-filter-wrap">
          <button
            className={`appt-chip ${selectedSpecialty ? 'active' : ''}`}
            onClick={() => toggleFilter('specialty')}
          >
            {selectedSpecialty || 'Specialty'}
            <i className="fa-solid fa-chevron-down appt-chip-caret"></i>
          </button>
          {openFilter === 'specialty' && (
            <div className="appt-dropdown">
              <div className="appt-dd-item" onClick={() => { setSelectedSpecialty(''); setOpenFilter(null); }}>All Specialties</div>
              {specialtyOptions.map((s) => (
                <div
                  key={s}
                  className={`appt-dd-item ${selectedSpecialty === s ? 'sel' : ''}`}
                  onClick={() => { setSelectedSpecialty(s); setOpenFilter(null); }}
                >
                  {s}{selectedSpecialty === s && <i className="fa-solid fa-check"></i>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location dropdown */}
        <div className="appt-filter-wrap">
          <button
            className={`appt-chip ${selectedLocation ? 'active' : ''}`}
            onClick={() => toggleFilter('location')}
          >
            {selectedLocation || 'Location'}
            <i className="fa-solid fa-chevron-down appt-chip-caret"></i>
          </button>
          {openFilter === 'location' && (
            <div className="appt-dropdown">
              <div className="appt-dd-item" onClick={() => { setSelectedLocation(''); setOpenFilter(null); }}>All Locations</div>
              {locationOptions.map((l) => (
                <div
                  key={l}
                  className={`appt-dd-item ${selectedLocation === l ? 'sel' : ''}`}
                  onClick={() => { setSelectedLocation(l); setOpenFilter(null); }}
                >
                  {l}{selectedLocation === l && <i className="fa-solid fa-check"></i>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Consultation Type dropdown */}
        <div className="appt-filter-wrap">
          <button
            className={`appt-chip ${consultationType ? 'active' : ''}`}
            onClick={() => toggleFilter('consultation')}
          >
            {consultLabel}
            <i className="fa-solid fa-chevron-down appt-chip-caret"></i>
          </button>
          {openFilter === 'consultation' && (
            <div className="appt-dropdown">
              <div className="appt-dd-item" onClick={() => { setConsultationType(''); setOpenFilter(null); }}>All Types</div>
              <div className={`appt-dd-item ${consultationType === 'in-clinic' ? 'sel' : ''}`} onClick={() => { setConsultationType('in-clinic'); setOpenFilter(null); }}>
                In-Clinic{consultationType === 'in-clinic' && <i className="fa-solid fa-check"></i>}
              </div>
              <div className={`appt-dd-item ${consultationType === 'online' ? 'sel' : ''}`} onClick={() => { setConsultationType('online'); setOpenFilter(null); }}>
                Online{consultationType === 'online' && <i className="fa-solid fa-check"></i>}
              </div>
            </div>
          )}
        </div>

        {/* Available Today toggle */}
        <button
          className={`appt-chip ${availableToday ? 'active' : ''}`}
          onClick={() => setAvailableToday(!availableToday)}
        >
          {availableToday && <i className="fa-solid fa-check"></i>}
          Available Today
        </button>

        <button className="appt-clear" onClick={clearFilters}>
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
                <span className={`doc-online ${doc.onlineAvail ? 'on' : 'off'}`}></span>
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
              {expandedSlots.includes(doc.id) &&
                doc.extraSlots.map((s) => (
                  <span className="doc-slot" key={s}>{s}</span>
                ))}
              {doc.moreSlots > 0 && (
                <button
                  type="button"
                  className="doc-slot doc-slot-more"
                  onClick={() => toggleSlots(doc.id)}
                >
                  {expandedSlots.includes(doc.id) ? 'Show Less' : `+${doc.moreSlots} More`}
                </button>
              )}
            </div>

            <div className="doc-actions">
              <button className="doc-book" onClick={() => handleBookAppointment(doc)}>Book Appointment</button>
              <button className="doc-view" onClick={() => setProfileDoctor(doc)}>View Profile</button>
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

      {/* ===== QR Upload Modal ===== */}
      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-head">
              <h3><i className="fa-solid fa-qrcode"></i> Scan Appointment QR</h3>
              <button className="qr-close" onClick={() => setShowQR(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div
              className="qr-drop"
              onClick={() => qrFileRef.current?.click()}
            >
              <i className="fa-solid fa-qrcode qr-drop-icon"></i>
              <div className="qr-drop-title">{qrScanning ? 'Reading QR…' : 'Upload QR image'}</div>
              <div className="qr-drop-sub">Click to choose a QR photo from your device</div>
            </div>

            <input
              ref={qrFileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleQrFile}
            />
            {/* hidden container required by html5-qrcode scanFile */}
            <div id="qr-reader-file" style={{ display: 'none' }}></div>

            <button className="qr-upload-btn" onClick={() => qrFileRef.current?.click()} disabled={qrScanning}>
              <i className="fa-solid fa-image"></i> {qrScanning ? 'Scanning…' : 'Choose QR Image'}
            </button>

            {qrError
              ? <p className="qr-hint qr-err">{qrError}</p>
              : <p className="qr-hint">Upload a photo of the doctor's or clinic's QR code to book instantly.</p>}
          </div>
        </div>
      )}

      {/* ===== Doctor Profile Modal ===== */}
      {profileDoctor && (
        <div className="docprof-overlay" onClick={() => setProfileDoctor(null)}>
          <div className="docprof-modal" onClick={(e) => e.stopPropagation()}>
            <button className="docprof-close" onClick={() => setProfileDoctor(null)} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Header */}
            <div className="docprof-head">
              <div className="docprof-avatar-wrap">
                <div className="docprof-avatar" style={{ background: profileDoctor.color }}>{profileDoctor.initials}</div>
                <span className={`docprof-online ${profileDoctor.onlineAvail ? 'on' : 'off'}`}></span>
              </div>
              <div className="docprof-headinfo">
                <h2 className="docprof-name">{profileDoctor.name}</h2>
                <div className="docprof-specialty">{profileDoctor.specialty}</div>
                <div className="docprof-hospital"><i className="fa-solid fa-hospital"></i> {profileDoctor.hospital}</div>
                <div className="docprof-meta">
                  <span className="docprof-rating"><i className="fa-solid fa-star"></i> {profileDoctor.rating} <span>({profileDoctor.reviews} reviews)</span></span>
                  <span className="docprof-dot">•</span>
                  <span>{profileDoctor.experience}</span>
                </div>
                <span className={`docprof-avail ${profileDoctor.availableToday ? 'today' : 'tomorrow'}`}>
                  {profileDoctor.availableToday ? 'AVAILABLE TODAY' : 'NEXT AVAIL: TOMORROW'}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="docprof-stats">
              <div className="docprof-stat"><i className="fa-solid fa-location-dot"></i><div><span>Location</span><strong>{profileDoctor.location}</strong></div></div>
              <div className="docprof-stat"><i className="fa-solid fa-route"></i><div><span>Distance</span><strong>{profileDoctor.distance}</strong></div></div>
              <div className="docprof-stat"><i className="fa-solid fa-credit-card"></i><div><span>Consultation</span><strong>{profileDoctor.fee}</strong></div></div>
            </div>

            {/* Consultation options */}
            <div className="docprof-section">
              <h4 className="docprof-section-title">Consultation Options</h4>
              <div className="docprof-modes">
                <span className="docprof-mode ok"><i className="fa-solid fa-hospital"></i> {profileDoctor.clinicText}</span>
                <span className={`docprof-mode ${profileDoctor.onlineAvail ? 'ok' : 'no'}`}>
                  <i className="fa-solid fa-video"></i> {profileDoctor.onlineAvail ? 'Online Available' : 'Online Not Available'}
                </span>
              </div>
            </div>

            {/* Slots */}
            <div className="docprof-section">
              <h4 className="docprof-section-title">
                {profileDoctor.availableToday ? "Today's Available Slots" : "Tomorrow's Available Slots"}
              </h4>
              <div className="docprof-slots">
                {profileDoctor.slots.map((s) => <span key={s} className="docprof-slot">{s}</span>)}
                {expandedSlots.includes(profileDoctor.id) &&
                  profileDoctor.extraSlots.map((s) => <span key={s} className="docprof-slot">{s}</span>)}
                {profileDoctor.moreSlots > 0 && (
                  <button
                    type="button"
                    className="docprof-slot more"
                    onClick={() => toggleSlots(profileDoctor.id)}
                  >
                    {expandedSlots.includes(profileDoctor.id) ? 'Show less' : `+${profileDoctor.moreSlots} more`}
                  </button>
                )}
              </div>
            </div>

            {/* About */}
            <div className="docprof-section">
              <h4 className="docprof-section-title">About</h4>
              <p className="docprof-about">
                {profileDoctor.name} is an experienced {profileDoctor.specialty.toLowerCase()} with {profileDoctor.experience.toLowerCase()},
                practicing at {profileDoctor.hospital}. Committed to providing quality, patient-centered care.
              </p>
            </div>

            {/* Actions */}
            <div className="docprof-actions">
              <button className="docprof-btn-book" onClick={() => { const d = profileDoctor; setProfileDoctor(null); handleBookAppointment(d); }}>
                <i className="fa-regular fa-calendar-check"></i> Book Appointment
              </button>
              <button className="docprof-btn-close" onClick={() => setProfileDoctor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointment;
