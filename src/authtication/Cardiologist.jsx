import React, { useState } from 'react';
import { 
  FaHeartbeat, FaBars, FaTimes, FaPhoneAlt, FaStethoscope, 
  FaCalendarCheck, FaUserMd, FaGraduationCap, FaAward, 
  FaUser, FaEnvelope, FaMapMarkerAlt, FaFacebook, 
  FaTwitter, FaLinkedin, FaInstagram, FaHeart,
  FaProcedures, FaClipboardList, FaHospital,
  FaCheckCircle, FaExclamationTriangle, FaArrowRight
} from 'react-icons/fa';
import './CardiologistClinic.css';

const CardiologistClinic = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    selectedDoctor: '',
    patientSymptoms: '',
    urgencyLevel: 'routine'
  });

  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuActive(false);
    }
  };

  const handleInputChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value
    });
  };

  const submitAppointment = (e) => {
    e.preventDefault();
    alert('Thank you! Your appointment request has been received. Our team will contact you shortly.');
    setAppointmentForm({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentDate: '',
      appointmentTime: '',
      selectedDoctor: '',
      patientSymptoms: '',
      urgencyLevel: 'routine'
    });
  };

  const clinicData = {
    cardiacServices: [
      {
        serviceIcon: <FaHeart />,
        serviceTitle: 'Cardiac Consultation',
        serviceDescription: 'Comprehensive heart health assessment and personalized treatment plans',
        serviceProcedures: ['ECG', 'Echocardiography', 'Stress Test', 'Holter Monitor']
      },
      {
        serviceIcon: <FaProcedures />,
        serviceTitle: 'Interventional Cardiology',
        serviceDescription: 'Minimally invasive procedures for heart conditions',
        serviceProcedures: ['Angioplasty', 'Stent Placement', 'Cardiac Catheterization']
      },
      {
        serviceIcon: <FaUserMd />,
        serviceTitle: 'Preventive Cardiology',
        serviceDescription: 'Risk assessment and prevention strategies for heart disease',
        serviceProcedures: ['Cholesterol Management', 'Blood Pressure Control', 'Lifestyle Counseling']
      },
      {
        serviceIcon: <FaHospital />,
        serviceTitle: 'Cardiac Surgery',
        serviceDescription: 'Advanced surgical interventions for complex heart conditions',
        serviceProcedures: ['Bypass Surgery', 'Valve Replacement', 'Heart Transplant']
      }
    ],

    medicalTeam: [
      {
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialization: 'Interventional Cardiologist',
        doctorExperience: '15 years',
        doctorEducation: 'MD, Cardiology - Harvard Medical School',
        doctorAwards: ['Best Cardiologist 2022', 'Research Excellence Award'],
        doctorColor: '#667eea'
      },
      {
        doctorName: 'Dr. Michael Chen',
        doctorSpecialization: 'Cardiac Surgeon',
        doctorExperience: '20 years',
        doctorEducation: 'MD, Cardiac Surgery - Johns Hopkins',
        doctorAwards: ['Pioneer in Robotic Surgery', 'Teaching Excellence Award'],
        doctorColor: '#764ba2'
      },
      {
        doctorName: 'Dr. Priya Sharma',
        doctorSpecialization: 'Preventive Cardiology',
        doctorExperience: '12 years',
        doctorEducation: 'MD, Preventive Medicine - Stanford',
        doctorAwards: ['Preventive Care Leader', 'Community Service Award'],
        doctorColor: '#f093fb'
      }
    ],

    diagnosticProcedures: [
      { testName: 'Electrocardiogram (ECG)', testPurpose: 'Records heart electrical activity' },
      { testName: 'Echocardiogram', testPurpose: 'Ultrasound of the heart structure' },
      { testName: 'Stress Test', testPurpose: 'Heart function during exercise' },
      { testName: 'Cardiac Catheterization', testPurpose: 'Checks blood flow and pressure' },
      { testName: 'Holter Monitor', testPurpose: '24-48 hour heart rhythm monitoring' },
      { testName: 'Cardiac MRI/CT', testPurpose: 'Detailed heart imaging' }
    ],

    emergencyIndicators: [
      'Chest pain or discomfort',
      'Shortness of breath',
      'Pain in arms, back, neck or jaw',
      'Nausea or lightheadedness',
      'Cold sweat',
      'Irregular heartbeat'
    ],

    heartHealthTips: [
      'Regular blood pressure monitoring',
      'Cholesterol level management',
      'Maintain healthy weight',
      'Regular exercise (30 min/day)',
      'Healthy diet (Mediterranean diet)',
      'Avoid smoking and limit alcohol',
      'Stress management',
      'Regular health check-ups'
    ]
  };

  return (
    <div className="cardio-clinic-main">
      {/* Emergency Warning Banner */}
      <div className="cardio-emergency-banner">
        <FaExclamationTriangle className="emergency-icon" /> 
        CARDIAC EMERGENCY: Call 911 immediately for chest pain, shortness of breath, or fainting
      </div>

      {/* Main Navigation Header */}
      <header className="cardio-header-section">
        <div className="cardio-container">
          <nav className="cardio-navigation">
            <div className="clinic-brand">
              <FaHeartbeat className="brand-logo" />
              <span className="clinic-name">CardioCare Specialists</span>
            </div>
            
            <div className={`navigation-menu ${menuActive ? 'menu-visible' : ''}`}>
              <button onClick={() => navigateToSection('clinic-hero')} className="nav-link-btn">Home</button>
              <button onClick={() => navigateToSection('cardiac-services')} className="nav-link-btn">Services</button>
              <button onClick={() => navigateToSection('medical-team')} className="nav-link-btn">Specialists</button>
              <button onClick={() => navigateToSection('book-appointment')} className="nav-link-btn">Appointment</button>
              <button onClick={() => navigateToSection('heart-info')} className="nav-link-btn">Heart Health</button>
              <button onClick={() => navigateToSection('contact-clinic')} className="nav-link-btn">Contact</button>
            </div>
            
            <div className="emergency-call">
              <FaPhoneAlt className="phone-icon" />
              <span className="emergency-number">Emergency: 911</span>
            </div>
            
            <button className="mobile-menu-toggle" onClick={() => setMenuActive(!menuActive)}>
              {menuActive ? <FaTimes /> : <FaBars />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="clinic-hero" className="clinic-hero-section">
        <div className="cardio-container">
          <div className="hero-content-wrapper">
            <div className="hero-text-content">
              <h1 className="hero-main-title">Advanced Cardiac Care for Heart Health Excellence</h1>
              <p className="hero-subtitle">Comprehensive cardiovascular solutions with cutting-edge technology and compassionate patient care</p>
              <div className="hero-action-buttons">
                <button onClick={() => navigateToSection('book-appointment')} className="primary-action-btn">
                  <FaCalendarCheck className="btn-icon" /> Schedule Appointment
                </button>
                <button className="emergency-action-btn">
                  <FaHeartbeat className="btn-icon" /> Emergency: Call 911
                </button>
              </div>
            </div>
            <div className="clinic-statistics">
              <div className="stat-card-item">
                <FaStethoscope className="stat-icon-display" />
                <h3 className="stat-number">10,000+</h3>
                <p className="stat-label">Patients Treated</p>
              </div>
              <div className="stat-card-item">
                <FaUserMd className="stat-icon-display" />
                <h3 className="stat-number">50+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div className="stat-card-item">
                <FaAward className="stat-icon-display" />
                <h3 className="stat-number">99%</h3>
                <p className="stat-label">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardiac Services Section */}
      <section id="cardiac-services" className="cardiac-services-section">
        <div className="cardio-container">
          <h2 className="section-main-title">Our <span className="title-highlight">Cardiac Services</span></h2>
          
          <div className="services-grid-layout">
            {clinicData.cardiacServices.map((service, index) => (
              <div className="service-card-item" key={index}>
                <div className="service-icon-container">
                  {service.serviceIcon}
                </div>
                <h3 className="service-title">{service.serviceTitle}</h3>
                <p className="service-description">{service.serviceDescription}</p>
                <div className="procedures-container">
                  <h4 className="procedures-heading">Procedures:</h4>
                  <ul className="procedures-list">
                    {service.serviceProcedures.map((proc, i) => (
                      <li key={i} className="procedure-item">
                        <FaArrowRight className="procedure-arrow" /> {proc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Team Section */}
      <section id="medical-team" className="medical-team-section">
        <div className="cardio-container">
          <h2 className="section-main-title">Meet Our <span className="title-highlight">Cardiologists</span></h2>
          
          <div className="doctors-grid-layout">
            {clinicData.medicalTeam.map((doctor, index) => (
              <div className="doctor-profile-card" key={index}>
                <div className="doctor-image-area" style={{ backgroundColor: doctor.doctorColor }}>
                  <div className="doctor-initials-display">
                    {doctor.doctorName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="doctor-details-area">
                  <h3 className="doctor-name">{doctor.doctorName}</h3>
                  <p className="doctor-specialty">{doctor.doctorSpecialization}</p>
                  
                  <div className="doctor-info-container">
                    <div className="info-item">
                      <FaUserMd className="info-icon" />
                      <span className="info-text">{doctor.doctorExperience} Experience</span>
                    </div>
                    <div className="info-item">
                      <FaGraduationCap className="info-icon" />
                      <span className="info-text">{doctor.doctorEducation}</span>
                    </div>
                  </div>
                  
                  <div className="doctor-achievements">
                    <h4 className="achievements-title">
                      <FaAward className="award-icon" /> Awards
                    </h4>
                    <ul className="achievements-list">
                      {doctor.doctorAwards.map((award, i) => (
                        <li key={i} className="achievement-item">{award}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="consultation-btn" onClick={() => navigateToSection('book-appointment')}>
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="book-appointment" className="appointment-booking-section">
        <div className="cardio-container">
          <h2 className="section-main-title">Schedule an <span className="title-highlight">Appointment</span></h2>
          
          <div className="appointment-booking-wrapper">
            <div className="appointment-form-container">
              <form onSubmit={submitAppointment} className="cardiac-appointment-form">
                <div className="form-input-group">
                  <label className="input-label">
                    <FaUser className="label-icon" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={appointmentForm.patientName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input-field"
                  />
                </div>
                
                <div className="form-row-layout">
                  <div className="form-input-group">
                    <label className="input-label">
                      <FaEnvelope className="label-icon" /> Email *
                    </label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={appointmentForm.patientEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="form-input-field"
                    />
                  </div>
                  
                  <div className="form-input-group">
                    <label className="input-label">
                      <FaPhoneAlt className="label-icon" /> Phone *
                    </label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={appointmentForm.patientPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="form-input-field"
                    />
                  </div>
                </div>
                
                <div className="form-row-layout">
                  <div className="form-input-group">
                    <label className="input-label">Preferred Date *</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={appointmentForm.appointmentDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="form-input-field"
                    />
                  </div>
                  
                  <div className="form-input-group">
                    <label className="input-label">Preferred Time *</label>
                    <select
                      name="appointmentTime"
                      value={appointmentForm.appointmentTime}
                      onChange={handleInputChange}
                      required
                      className="form-input-field"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-input-group">
                  <label className="input-label">Urgency Level *</label>
                  <div className="urgency-selection">
                    <label className={`urgency-option ${appointmentForm.urgencyLevel === 'emergency' ? 'option-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="emergency"
                        checked={appointmentForm.urgencyLevel === 'emergency'}
                        onChange={handleInputChange}
                        className="urgency-radio"
                      />
                      Emergency
                    </label>
                    <label className={`urgency-option ${appointmentForm.urgencyLevel === 'urgent' ? 'option-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="urgent"
                        checked={appointmentForm.urgencyLevel === 'urgent'}
                        onChange={handleInputChange}
                        className="urgency-radio"
                      />
                      Urgent
                    </label>
                    <label className={`urgency-option ${appointmentForm.urgencyLevel === 'routine' ? 'option-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="routine"
                        checked={appointmentForm.urgencyLevel === 'routine'}
                        onChange={handleInputChange}
                        className="urgency-radio"
                      />
                      Routine Checkup
                    </label>
                  </div>
                </div>
                
                <div className="form-input-group">
                  <label className="input-label">Symptoms / Reason for Visit</label>
                  <textarea
                    name="patientSymptoms"
                    value={appointmentForm.patientSymptoms}
                    onChange={handleInputChange}
                    placeholder="Please describe your symptoms or reason for visit..."
                    rows="3"
                    className="form-textarea-field"
                  />
                </div>
                
                <button type="submit" className="form-submit-btn">
                  <FaCalendarCheck className="submit-icon" /> Book Appointment Now
                </button>
              </form>
            </div>
            
            <div className="appointment-info-sidebar">
              <div className="emergency-info-card">
                <h3 className="emergency-title">
                  <FaExclamationTriangle className="emergency-title-icon" /> CARDIAC EMERGENCY
                </h3>
                <p className="emergency-subtitle">Call 911 immediately if you experience:</p>
                <ul className="emergency-symptoms-list">
                  {clinicData.emergencyIndicators.map((symptom, index) => (
                    <li key={index} className="symptom-item">⚠️ {symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="clinic-hours-card">
                <h3 className="hours-title">
                  <FaHospital className="hours-icon" /> Clinic Hours
                </h3>
                <ul className="hours-list">
                  <li className="hour-item">Mon-Fri: 8:00 AM - 8:00 PM</li>
                  <li className="hour-item">Saturday: 9:00 AM - 4:00 PM</li>
                  <li className="hour-item">Sunday: Emergency Only</li>
                  <li className="hour-item">24/7 Emergency Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heart Health Information Section */}
      <section id="heart-info" className="heart-health-section">
        <div className="cardio-container">
          <h2 className="section-main-title">Cardiology <span className="title-highlight">Information</span></h2>
          
          <div className="health-info-grid">
            <div className="info-card-item">
              <h3 className="info-card-title">
                <FaClipboardList className="info-card-icon" /> Diagnostic Tests
              </h3>
              <div className="diagnostic-tests-list">
                {clinicData.diagnosticProcedures.map((test, index) => (
                  <div className="test-item-card" key={index}>
                    <div className="test-number-indicator">{index + 1}</div>
                    <div className="test-details">
                      <h4 className="test-name">{test.testName}</h4>
                      <p className="test-purpose">{test.testPurpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="info-card-item">
              <h3 className="info-card-title">
                <FaHeart className="info-card-icon" /> Preventive Care
              </h3>
              <div className="prevention-tips-list">
                {clinicData.heartHealthTips.map((tip, index) => (
                  <div className="tip-item" key={index}>
                    <FaCheckCircle className="tip-check-icon" />
                    <span className="tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="info-card-item">
              <h3 className="info-card-title">
                <FaStethoscope className="info-card-icon" /> When to See a Cardiologist
              </h3>
              <ul className="warning-signs-list">
                <li className="warning-item">Chest pain or discomfort</li>
                <li className="warning-item">Shortness of breath</li>
                <li className="warning-item">Family history of heart disease</li>
                <li className="warning-item">High blood pressure (140/90)</li>
                <li className="warning-item">High cholesterol levels</li>
                <li className="warning-item">Diabetes diagnosis</li>
                <li className="warning-item">Age 40+ with risk factors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-clinic" className="clinic-contact-section">
        <div className="cardio-container">
          <h2 className="section-main-title">Contact <span className="title-highlight">Us</span></h2>
          
          <div className="contact-info-grid">
            <div className="contact-details-section">
              <div className="contact-detail-item">
                <FaMapMarkerAlt className="contact-detail-icon" />
                <div className="contact-detail-content">
                  <h4 className="detail-title">Address</h4>
                  <p className="detail-text">123 Heart Street, Medical City, HC 12345</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <FaPhoneAlt className="contact-detail-icon" />
                <div className="contact-detail-content">
                  <h4 className="detail-title">Phone Numbers</h4>
                  <p className="detail-text">Emergency: 911</p>
                  <p className="detail-text">Appointments: (555) 123-4567</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <FaEnvelope className="contact-detail-icon" />
                <div className="contact-detail-content">
                  <h4 className="detail-title">Email</h4>
                  <p className="detail-text">info@cardiocare.com</p>
                  <p className="detail-text">emergency@cardiocare.com</p>
                </div>
              </div>
              
              <div className="social-media-links">
                <a href="#" className="social-link"><FaFacebook /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
                <a href="#" className="social-link"><FaInstagram /></a>
              </div>
            </div>
            
            <div className="clinic-location-section">
              <h3 className="location-title">Our Location</h3>
              <div className="location-map">
                <div className="map-content-display">
                  <FaMapMarkerAlt className="map-marker-icon" />
                  <p className="map-text">CardioCare Specialists</p>
                  <p className="map-text">123 Heart Street</p>
                  <p className="map-text">Medical City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="clinic-footer-section">
        <div className="cardio-container">
          <div className="footer-content-area">
            <div className="footer-brand-section">
              <FaHeartbeat className="footer-logo-icon" />
              <span className="footer-clinic-name">CardioCare Specialists</span>
            </div>
            
            <div className="footer-navigation">
              <button onClick={() => navigateToSection('clinic-hero')} className="footer-nav-btn">Home</button>
              <button onClick={() => navigateToSection('cardiac-services')} className="footer-nav-btn">Services</button>
              <button onClick={() => navigateToSection('medical-team')} className="footer-nav-btn">Specialists</button>
              <button onClick={() => navigateToSection('book-appointment')} className="footer-nav-btn">Appointment</button>
            </div>
            
            <div className="clinic-certifications">
              <span className="certification-badge">JCI Accredited</span>
              <span className="certification-badge">NABH Certified</span>
              <span className="certification-badge">ISO 9001:2015</span>
            </div>
          </div>
          
          <div className="footer-bottom-area">
            <p className="copyright-text">© {new Date().getFullYear()} CardioCare Specialists. All rights reserved.</p>
            <p className="medical-disclaimer">
              *This is a demonstration website. For real medical emergencies, call 911 immediately.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
};

export default CardiologistClinic;