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

const CardioCareClinic = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
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
    <div className="cardiocare-main-container">
      {/* Emergency Warning Banner */}
      <div className="cardiocare-emergency-alert">
        <FaExclamationTriangle className="cardiocare-emergency-icon" /> 
        CARDIAC EMERGENCY: Call 911 immediately for chest pain, shortness of breath, or fainting
      </div>

      {/* Main Navigation Header */}
      <header className="cardiocare-header">
        <div className="cardiocare-container">
          <nav className="cardiocare-nav">
            <div className="cardiocare-brand">
              <FaHeartbeat className="cardiocare-brand-logo" />
              <span className="cardiocare-clinic-name">CardioCare Specialists</span>
            </div>
            
            <div className={`cardiocare-nav-menu ${menuActive ? 'cardiocare-nav-menu-active' : ''}`}>
              <button onClick={() => navigateToSection('cardiocare-hero')} className="cardiocare-nav-btn">Home</button>
              <button onClick={() => navigateToSection('cardiocare-services')} className="cardiocare-nav-btn">Services</button>
              <button onClick={() => navigateToSection('cardiocare-team')} className="cardiocare-nav-btn">Specialists</button>
              <button onClick={() => navigateToSection('cardiocare-appointment')} className="cardiocare-nav-btn">Appointment</button>
              <button onClick={() => navigateToSection('cardiocare-health')} className="cardiocare-nav-btn">Heart Health</button>
              <button onClick={() => navigateToSection('cardiocare-contact')} className="cardiocare-nav-btn">Contact</button>
            </div>
            
            <div className="cardiocare-emergency-contact">
              <FaPhoneAlt className="cardiocare-phone-icon" />
              <span className="cardiocare-emergency-number">Emergency: 911</span>
            </div>
            
            <button className="cardiocare-mobile-toggle" onClick={() => setMenuActive(!menuActive)}>
              {menuActive ? <FaTimes /> : <FaBars />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="cardiocare-hero" className="cardiocare-hero-section">
        <div className="cardiocare-container">
          <div className="cardiocare-hero-content">
            <div className="cardiocare-hero-text">
              <h1 className="cardiocare-hero-title">Advanced Cardiac Care for Heart Health Excellence</h1>
              <p className="cardiocare-hero-subtitle">Comprehensive cardiovascular solutions with cutting-edge technology and compassionate patient care</p>
              <div className="cardiocare-hero-buttons">
                <button onClick={() => navigateToSection('cardiocare-appointment')} className="cardiocare-primary-btn">
                  <FaCalendarCheck className="cardiocare-btn-icon" /> Schedule Appointment
                </button>
                <button className="cardiocare-emergency-btn">
                  <FaHeartbeat className="cardiocare-btn-icon" /> Emergency: Call 911
                </button>
              </div>
            </div>
            <div className="cardiocare-stats">
              <div className="cardiocare-stat-card">
                <FaStethoscope className="cardiocare-stat-icon" />
                <h3 className="cardiocare-stat-number">10,000+</h3>
                <p className="cardiocare-stat-label">Patients Treated</p>
              </div>
              <div className="cardiocare-stat-card">
                <FaUserMd className="cardiocare-stat-icon" />
                <h3 className="cardiocare-stat-number">50+</h3>
                <p className="cardiocare-stat-label">Years Experience</p>
              </div>
              <div className="cardiocare-stat-card">
                <FaAward className="cardiocare-stat-icon" />
                <h3 className="cardiocare-stat-number">99%</h3>
                <p className="cardiocare-stat-label">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardiac Services Section */}
      <section id="cardiocare-services" className="cardiocare-services-section">
        <div className="cardiocare-container">
          <h2 className="cardiocare-section-title">Our <span className="cardiocare-title-highlight">Cardiac Services</span></h2>
          
          <div className="cardiocare-services-grid">
            {clinicData.cardiacServices.map((service, index) => (
              <div className="cardiocare-service-card" key={index}>
                <div className="cardiocare-service-icon">
                  {service.serviceIcon}
                </div>
                <h3 className="cardiocare-service-title">{service.serviceTitle}</h3>
                <p className="cardiocare-service-desc">{service.serviceDescription}</p>
                <div className="cardiocare-procedures">
                  <h4 className="cardiocare-procedures-title">Procedures:</h4>
                  <ul className="cardiocare-procedures-list">
                    {service.serviceProcedures.map((proc, i) => (
                      <li key={i} className="cardiocare-procedure-item">
                        <FaArrowRight className="cardiocare-procedure-arrow" /> {proc}
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
      <section id="cardiocare-team" className="cardiocare-team-section">
        <div className="cardiocare-container">
          <h2 className="cardiocare-section-title">Meet Our <span className="cardiocare-title-highlight">Cardiologists</span></h2>
          
          <div className="cardiocare-doctors-grid">
            {clinicData.medicalTeam.map((doctor, index) => (
              <div className="cardiocare-doctor-card" key={index}>
                <div className="cardiocare-doctor-image" style={{ backgroundColor: doctor.doctorColor }}>
                  <div className="cardiocare-doctor-initials">
                    {doctor.doctorName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="cardiocare-doctor-info">
                  <h3 className="cardiocare-doctor-name">{doctor.doctorName}</h3>
                  <p className="cardiocare-doctor-specialty">{doctor.doctorSpecialization}</p>
                  
                  <div className="cardiocare-doctor-details">
                    <div className="cardiocare-detail-item">
                      <FaUserMd className="cardiocare-detail-icon" />
                      <span className="cardiocare-detail-text">{doctor.doctorExperience} Experience</span>
                    </div>
                    <div className="cardiocare-detail-item">
                      <FaGraduationCap className="cardiocare-detail-icon" />
                      <span className="cardiocare-detail-text">{doctor.doctorEducation}</span>
                    </div>
                  </div>
                  
                  <div className="cardiocare-doctor-awards">
                    <h4 className="cardiocare-awards-title">
                      <FaAward className="cardiocare-award-icon" /> Awards
                    </h4>
                    <ul className="cardiocare-awards-list">
                      {doctor.doctorAwards.map((award, i) => (
                        <li key={i} className="cardiocare-award-item">{award}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="cardiocare-consult-btn" onClick={() => navigateToSection('cardiocare-appointment')}>
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="cardiocare-appointment" className="cardiocare-appointment-section">
        <div className="cardiocare-container">
          <h2 className="cardiocare-section-title">Schedule an <span className="cardiocare-title-highlight">Appointment</span></h2>
          
          <div className="cardiocare-appointment-wrapper">
            <div className="cardiocare-appointment-form-container">
              <form onSubmit={submitAppointment} className="cardiocare-appointment-form">
                <div className="cardiocare-form-group">
                  <label className="cardiocare-form-label">
                    <FaUser className="cardiocare-label-icon" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={appointmentForm.patientName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="cardiocare-form-input"
                  />
                </div>
                
                <div className="cardiocare-form-row">
                  <div className="cardiocare-form-group">
                    <label className="cardiocare-form-label">
                      <FaEnvelope className="cardiocare-label-icon" /> Email *
                    </label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={appointmentForm.patientEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="cardiocare-form-input"
                    />
                  </div>
                  
                  <div className="cardiocare-form-group">
                    <label className="cardiocare-form-label">
                      <FaPhoneAlt className="cardiocare-label-icon" /> Phone *
                    </label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={appointmentForm.patientPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="cardiocare-form-input"
                    />
                  </div>
                </div>
                
                <div className="cardiocare-form-row">
                  <div className="cardiocare-form-group">
                    <label className="cardiocare-form-label">Preferred Date *</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={appointmentForm.appointmentDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="cardiocare-form-input"
                    />
                  </div>
                  
                  <div className="cardiocare-form-group">
                    <label className="cardiocare-form-label">Preferred Time *</label>
                    <select
                      name="appointmentTime"
                      value={appointmentForm.appointmentTime}
                      onChange={handleInputChange}
                      required
                      className="cardiocare-form-input"
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
                
                <div className="cardiocare-form-group">
                  <label className="cardiocare-form-label">Urgency Level *</label>
                  <div className="cardiocare-urgency-options">
                    <label className={`cardiocare-urgency-option ${appointmentForm.urgencyLevel === 'emergency' ? 'cardiocare-urgency-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="emergency"
                        checked={appointmentForm.urgencyLevel === 'emergency'}
                        onChange={handleInputChange}
                        className="cardiocare-urgency-radio"
                      />
                      Emergency
                    </label>
                    <label className={`cardiocare-urgency-option ${appointmentForm.urgencyLevel === 'urgent' ? 'cardiocare-urgency-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="urgent"
                        checked={appointmentForm.urgencyLevel === 'urgent'}
                        onChange={handleInputChange}
                        className="cardiocare-urgency-radio"
                      />
                      Urgent
                    </label>
                    <label className={`cardiocare-urgency-option ${appointmentForm.urgencyLevel === 'routine' ? 'cardiocare-urgency-active' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value="routine"
                        checked={appointmentForm.urgencyLevel === 'routine'}
                        onChange={handleInputChange}
                        className="cardiocare-urgency-radio"
                      />
                      Routine Checkup
                    </label>
                  </div>
                </div>
                
                <div className="cardiocare-form-group">
                  <label className="cardiocare-form-label">Symptoms / Reason for Visit</label>
                  <textarea
                    name="patientSymptoms"
                    value={appointmentForm.patientSymptoms}
                    onChange={handleInputChange}
                    placeholder="Please describe your symptoms or reason for visit..."
                    rows="3"
                    className="cardiocare-form-textarea"
                  />
                </div>
                
                <button type="submit" className="cardiocare-submit-btn">
                  <FaCalendarCheck className="cardiocare-submit-icon" /> Book Appointment Now
                </button>
              </form>
            </div>
            
            <div className="cardiocare-appointment-sidebar">
              <div className="cardiocare-emergency-card">
                <h3 className="cardiocare-emergency-title">
                  <FaExclamationTriangle className="cardiocare-emergency-title-icon" /> CARDIAC EMERGENCY
                </h3>
                <p className="cardiocare-emergency-subtitle">Call 911 immediately if you experience:</p>
                <ul className="cardiocare-emergency-list">
                  {clinicData.emergencyIndicators.map((symptom, index) => (
                    <li key={index} className="cardiocare-symptom-item">⚠️ {symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="cardiocare-hours-card">
                <h3 className="cardiocare-hours-title">
                  <FaHospital className="cardiocare-hours-icon" /> Clinic Hours
                </h3>
                <ul className="cardiocare-hours-list">
                  <li className="cardiocare-hour-item">Mon-Fri: 8:00 AM - 8:00 PM</li>
                  <li className="cardiocare-hour-item">Saturday: 9:00 AM - 4:00 PM</li>
                  <li className="cardiocare-hour-item">Sunday: Emergency Only</li>
                  <li className="cardiocare-hour-item">24/7 Emergency Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heart Health Information Section */}
      <section id="cardiocare-health" className="cardiocare-health-section">
        <div className="cardiocare-container">
          <h2 className="cardiocare-section-title">Cardiology <span className="cardiocare-title-highlight">Information</span></h2>
          
          <div className="cardiocare-health-grid">
            <div className="cardiocare-health-card">
              <h3 className="cardiocare-health-card-title">
                <FaClipboardList className="cardiocare-health-card-icon" /> Diagnostic Tests
              </h3>
              <div className="cardiocare-tests-list">
                {clinicData.diagnosticProcedures.map((test, index) => (
                  <div className="cardiocare-test-card" key={index}>
                    <div className="cardiocare-test-number">{index + 1}</div>
                    <div className="cardiocare-test-info">
                      <h4 className="cardiocare-test-name">{test.testName}</h4>
                      <p className="cardiocare-test-purpose">{test.testPurpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cardiocare-health-card">
              <h3 className="cardiocare-health-card-title">
                <FaHeart className="cardiocare-health-card-icon" /> Preventive Care
              </h3>
              <div className="cardiocare-tips-list">
                {clinicData.heartHealthTips.map((tip, index) => (
                  <div className="cardiocare-tip-item" key={index}>
                    <FaCheckCircle className="cardiocare-tip-icon" />
                    <span className="cardiocare-tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cardiocare-health-card">
              <h3 className="cardiocare-health-card-title">
                <FaStethoscope className="cardiocare-health-card-icon" /> When to See a Cardiologist
              </h3>
              <ul className="cardiocare-warning-list">
                <li className="cardiocare-warning-item">Chest pain or discomfort</li>
                <li className="cardiocare-warning-item">Shortness of breath</li>
                <li className="cardiocare-warning-item">Family history of heart disease</li>
                <li className="cardiocare-warning-item">High blood pressure (140/90)</li>
                <li className="cardiocare-warning-item">High cholesterol levels</li>
                <li className="cardiocare-warning-item">Diabetes diagnosis</li>
                <li className="cardiocare-warning-item">Age 40+ with risk factors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="cardiocare-contact" className="cardiocare-contact-section">
        <div className="cardiocare-container">
          <h2 className="cardiocare-section-title">Contact <span className="cardiocare-title-highlight">Us</span></h2>
          
          <div className="cardiocare-contact-grid">
            <div className="cardiocare-contact-info">
              <div className="cardiocare-contact-item">
                <FaMapMarkerAlt className="cardiocare-contact-icon" />
                <div className="cardiocare-contact-content">
                  <h4 className="cardiocare-contact-title">Address</h4>
                  <p className="cardiocare-contact-text">123 Heart Street, Medical City, HC 12345</p>
                </div>
              </div>
              
              <div className="cardiocare-contact-item">
                <FaPhoneAlt className="cardiocare-contact-icon" />
                <div className="cardiocare-contact-content">
                  <h4 className="cardiocare-contact-title">Phone Numbers</h4>
                  <p className="cardiocare-contact-text">Emergency: 911</p>
                  <p className="cardiocare-contact-text">Appointments: (555) 123-4567</p>
                </div>
              </div>
              
              <div className="cardiocare-contact-item">
                <FaEnvelope className="cardiocare-contact-icon" />
                <div className="cardiocare-contact-content">
                  <h4 className="cardiocare-contact-title">Email</h4>
                  <p className="cardiocare-contact-text">info@cardiocare.com</p>
                  <p className="cardiocare-contact-text">emergency@cardiocare.com</p>
                </div>
              </div>
              
              <div className="cardiocare-social-links">
                <a href="#" className="cardiocare-social-link"><FaFacebook /></a>
                <a href="#" className="cardiocare-social-link"><FaTwitter /></a>
                <a href="#" className="cardiocare-social-link"><FaLinkedin /></a>
                <a href="#" className="cardiocare-social-link"><FaInstagram /></a>
              </div>
            </div>
            
            <div className="cardiocare-location">
              <h3 className="cardiocare-location-title">Our Location</h3>
              <div className="cardiocare-map">
                <div className="cardiocare-map-content">
                  <FaMapMarkerAlt className="cardiocare-map-icon" />
                  <p className="cardiocare-map-text">CardioCare Specialists</p>
                  <p className="cardiocare-map-text">123 Heart Street</p>
                  <p className="cardiocare-map-text">Medical City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="cardiocare-footer">
        <div className="cardiocare-container">
          <div className="cardiocare-footer-content">
            <div className="cardiocare-footer-brand">
              <FaHeartbeat className="cardiocare-footer-logo" />
              <span className="cardiocare-footer-name">CardioCare Specialists</span>
            </div>
            
            <div className="cardiocare-footer-nav">
              <button onClick={() => navigateToSection('cardiocare-hero')} className="cardiocare-footer-btn">Home</button>
              <button onClick={() => navigateToSection('cardiocare-services')} className="cardiocare-footer-btn">Services</button>
              <button onClick={() => navigateToSection('cardiocare-team')} className="cardiocare-footer-btn">Specialists</button>
              <button onClick={() => navigateToSection('cardiocare-appointment')} className="cardiocare-footer-btn">Appointment</button>
            </div>
            
            <div className="cardiocare-certifications">
              <span className="cardiocare-cert-badge">JCI Accredited</span>
              <span className="cardiocare-cert-badge">NABH Certified</span>
              <span className="cardiocare-cert-badge">ISO 9001:2015</span>
            </div>
          </div>
          
          <div className="cardiocare-footer-bottom">
            <p className="cardiocare-copyright">© {new Date().getFullYear()} CardioCare Specialists. All rights reserved.</p>
            <p className="cardiocare-disclaimer">
              *This is a demonstration website. For real medical emergencies, call 911 immediately.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className="cardiocare-scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
};

export default CardioCareClinic;