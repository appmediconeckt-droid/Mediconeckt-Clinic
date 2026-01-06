import React, { useState } from 'react';
import './General-Physician.css';

const GeneralPhysicianClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    symptoms: '',
    appointmentType: 'new',
    preferredDate: '',
    preferredTime: '',
    medicalHistory: '',
    insuranceProvider: ''
  });

  const services = [
    { 
      id: 1, 
      name: 'Primary Care', 
      icon: '👨‍⚕️', 
      color: '#3B82F6', 
      desc: 'Comprehensive health assessments and preventive care',
      duration: '30-60 min',
      special: true
    },
    { 
      id: 2, 
      name: 'Chronic Disease Management', 
      icon: '🫀', 
      color: '#EF4444', 
      desc: 'Diabetes, hypertension, and other chronic conditions',
      duration: '30 min',
      special: false
    },
    { 
      id: 3, 
      name: 'Preventive Health Checks', 
      icon: '🩺', 
      color: '#10B981', 
      desc: 'Annual physicals, screenings, and wellness exams',
      duration: '60 min',
      special: true
    },
    { 
      id: 4, 
      name: 'Acute Illness Care', 
      icon: '🤒', 
      color: '#F59E0B', 
      desc: 'Cold, flu, infections, and urgent medical concerns',
      duration: '20 min',
      special: false
    },
    { 
      id: 5, 
      name: 'Vaccinations & Immunizations', 
      icon: '💉', 
      color: '#8B5CF6', 
      desc: 'All age-appropriate vaccines and travel immunizations',
      duration: '15 min',
      special: false
    },
    { 
      id: 6, 
      name: 'Minor Procedures', 
      icon: '🔪', 
      color: '#EC4899', 
      desc: 'Sutures, skin biopsies, and other in-office procedures',
      duration: '30-45 min',
      special: false
    },
    { 
      id: 7, 
      name: 'Health Counseling', 
      icon: '💬', 
      color: '#06B6D4', 
      desc: 'Nutrition, lifestyle, and mental health guidance',
      duration: '45 min',
      special: false
    },
    { 
      id: 8, 
      name: 'Telemedicine', 
      icon: '📱', 
      color: '#84CC16', 
      desc: 'Virtual consultations from the comfort of your home',
      duration: '20 min',
      special: true
    }
  ];

  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Chen', 
      specialty: 'Internal Medicine', 
      experience: '18 years', 
      image: '👩‍⚕️', 
      education: 'MD, FACP',
      focus: ['Preventive Medicine', 'Chronic Care', 'Geriatrics'],
      availability: 'Mon-Thu, Sat AM',
      languages: ['English', 'Mandarin', 'Spanish']
    },
    { 
      id: 2, 
      name: 'Dr. Michael Rodriguez', 
      specialty: 'Family Medicine', 
      experience: '15 years', 
      image: '👨‍⚕️', 
      education: 'MD, FAAFP',
      focus: ['Family Health', 'Pediatrics', 'Sports Medicine'],
      availability: 'Tue-Fri',
      languages: ['English', 'Spanish']
    },
    { 
      id: 3, 
      name: 'Dr. James Wilson', 
      specialty: 'General Practitioner', 
      experience: '12 years', 
      image: '👨‍⚕️', 
      education: 'MD, MRCGP',
      focus: ['Acute Care', 'Men\'s Health', 'Occupational Medicine'],
      availability: 'Mon-Wed, Fri',
      languages: ['English', 'French']
    }
  ];

  const conditions = [
    { id: 1, name: 'Diabetes Management', icon: '🩸', category: 'Chronic' },
    { id: 2, name: 'Hypertension', icon: '🫀', category: 'Cardiovascular' },
    { id: 3, name: 'Respiratory Infections', icon: '😷', category: 'Acute' },
    { id: 4, name: 'Arthritis & Joint Pain', icon: '🦴', category: 'Musculoskeletal' },
    { id: 5, name: 'Digestive Issues', icon: '🤢', category: 'Gastrointestinal' },
    { id: 6, name: 'Mental Health', icon: '🧠', category: 'Psychological' },
    { id: 7, name: 'Skin Conditions', icon: '🤕', category: 'Dermatological' },
    { id: 8, name: 'Allergies', icon: '🤧', category: 'Immunological' }
  ];

  const testimonials = [
    { 
      id: 1, 
      name: 'Jennifer Miller', 
      age: 45, 
      text: 'Dr. Chen has been my primary physician for 5 years. Her approach to preventive care helped identify early signs of diabetes.', 
      rating: 5, 
      condition: 'Diabetes Prevention',
      visits: 'Regular patient'
    },
    { 
      id: 2, 
      name: 'Robert Johnson', 
      age: 62, 
      text: 'Excellent management of my hypertension. The team is always responsive and the follow-up care is outstanding.', 
      rating: 5, 
      condition: 'Hypertension',
      visits: '3 years'
    },
    { 
      id: 3, 
      name: 'Lisa Wong', 
      age: 28, 
      text: 'As a busy professional, the telemedicine option has been a lifesaver. Quality care without leaving my home office.', 
      rating: 4, 
      condition: 'General Wellness',
      visits: 'New patient'
    }
  ];

  const stats = [
    { number: '25,000+', label: 'Patients Trust Us', icon: '👥' },
    { number: '98%', label: 'Patient Satisfaction', icon: '⭐' },
    { number: '15 min', label: 'Average Wait Time', icon: '⏱️' },
    { number: '24/7', label: 'Telehealth Support', icon: '💻' }
  ];

  const healthTips = [
    { id: 1, title: 'Annual Check-ups', desc: 'Regular screenings can prevent 80% of major diseases', icon: '📋' },
    { id: 2, title: 'Vaccination Schedule', desc: 'Stay updated with age-appropriate immunizations', icon: '💉' },
    { id: 3, title: 'Healthy Lifestyle', desc: 'Balance diet, exercise, and stress management', icon: '🥗' },
    { id: 4, title: 'Medication Adherence', desc: 'Take prescribed medications as directed', icon: '💊' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your appointment request has been submitted. Our team will contact you within 2 hours to confirm.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      symptoms: '',
      appointmentType: 'new',
      preferredDate: '',
      preferredTime: '',
      medicalHistory: '',
      insuranceProvider: ''
    });
  };

  return (
    <div className="genphys-container">
      {/* Navigation */}
      <nav className="genphys-navbar">
        <div className="genphys-nav-container">
          <div className="genphys-logo">
            <span className="genphys-logo-icon">🏥</span>
            <div className="genphys-logo-text">
              <h1 className="genphys-logo-title">PrimeCare Physicians</h1>
              <p className="genphys-logo-subtitle">Comprehensive Primary Care</p>
            </div>
          </div>
          
          <button 
            className={`genphys-menu-btn ${menuOpen ? 'genphys-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="genphys-menu-line genphys-line-1"></span>
            <span className="genphys-menu-line genphys-line-2"></span>
            <span className="genphys-menu-line genphys-line-3"></span>
          </button>
          
          <div className={`genphys-nav-menu ${menuOpen ? 'genphys-nav-show' : ''}`}>
            <ul className="genphys-nav-list">
              <li><a href="#home" className="genphys-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="genphys-nav-link" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#conditions" className="genphys-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#doctors" className="genphys-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#healthtips" className="genphys-nav-link" onClick={() => setMenuOpen(false)}>Health Tips</a></li>
              <li><a href="#appointment" className="genphys-nav-cta" onClick={() => setMenuOpen(false)}>Book Appointment</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="genphys-hero" id="home">
        <div className="genphys-hero-background">
          <div className="genphys-hero-gradient"></div>
          <div className="genphys-hero-pattern"></div>
        </div>
        
        <div className="genphys-hero-content">
          <div className="genphys-hero-text">
            <span className="genphys-hero-badge">Trusted Healthcare Since 1995</span>
            <h2 className="genphys-hero-title">Your Health, Our Priority</h2>
            <p className="genphys-hero-description">
              Comprehensive primary care for the entire family. From preventive health checks to chronic disease management, 
              we provide personalized medical care with compassion and expertise.
            </p>
            <div className="genphys-hero-actions">
              <a href="#appointment" className="genphys-btn genphys-btn-primary">
                <span className="genphys-btn-icon">📅</span>
                Schedule Appointment
              </a>
              <a href="#services" className="genphys-btn genphys-btn-secondary">
                <span className="genphys-btn-icon">🏥</span>
                View Services
              </a>
            </div>
          </div>
          
          <div className="genphys-hero-visual">
            <div className="genphys-visual-main">
              <div className="genphys-visual-element genphys-element-1">
                <span className="genphys-element-icon">🩺</span>
              </div>
              <div className="genphys-visual-element genphys-element-2">
                <span className="genphys-element-icon">💊</span>
              </div>
              <div className="genphys-visual-element genphys-element-3">
                <span className="genphys-element-icon">❤️</span>
              </div>
              <div className="genphys-visual-element genphys-element-4">
                <span className="genphys-element-icon">🩸</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="genphys-hero-stats">
          {stats.map((stat, index) => (
            <div className="genphys-stat-card" key={index}>
              <div className="genphys-stat-content">
                <span className="genphys-stat-icon">{stat.icon}</span>
                <span className="genphys-stat-number">{stat.number}</span>
                <span className="genphys-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="genphys-services" id="services">
        <div className="genphys-section-header">
          <span className="genphys-section-badge">Our Services</span>
          <h2 className="genphys-section-title">Comprehensive Primary Care</h2>
          <p className="genphys-section-subtitle">Complete healthcare services for all ages and stages of life</p>
        </div>
        
        <div className="genphys-services-grid">
          {services.map(service => (
            <div className={`genphys-service-card ${service.special ? 'genphys-service-special' : ''}`} key={service.id}>
              {service.special && <div className="genphys-service-badge">Most Popular</div>}
              <div 
                className="genphys-service-icon-wrapper"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="genphys-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="genphys-service-name">{service.name}</h3>
              <p className="genphys-service-description">{service.desc}</p>
              <div className="genphys-service-meta">
                <span className="genphys-service-duration">⏱️ {service.duration}</span>
                <a href="#appointment" className="genphys-service-link">
                  Book Now
                  <span className="genphys-link-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="genphys-conditions" id="conditions">
        <div className="genphys-conditions-container">
          <div className="genphys-conditions-content">
            <span className="genphys-conditions-badge">Conditions We Treat</span>
            <h2 className="genphys-conditions-title">Expert Care for Common Health Issues</h2>
            <p className="genphys-conditions-description">
              From acute illnesses to chronic conditions, our physicians provide evidence-based treatment 
              and personalized management plans.
            </p>
            
            <div className="genphys-conditions-grid">
              {conditions.map(condition => (
                <div className="genphys-condition-card" key={condition.id}>
                  <div className="genphys-condition-icon">
                    {condition.icon}
                  </div>
                  <div className="genphys-condition-info">
                    <h4 className="genphys-condition-name">{condition.name}</h4>
                    <div className="genphys-condition-category">{condition.category}</div>
                    <p className="genphys-condition-desc">Comprehensive diagnosis & treatment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="genphys-conditions-visual">
            <div className="genphys-care-process">
              <div className="genphys-care-header">
                <span className="genphys-care-icon">🎯</span>
                <h3 className="genphys-care-title">Our Care Process</h3>
              </div>
              <div className="genphys-care-list">
                <div className="genphys-care-step">
                  <div className="genphys-care-step-number">1</div>
                  <div className="genphys-care-step-content">
                    <h4>Comprehensive Assessment</h4>
                    <p>Thorough medical history and physical examination</p>
                  </div>
                </div>
                <div className="genphys-care-step">
                  <div className="genphys-care-step-number">2</div>
                  <div className="genphys-care-step-content">
                    <h4>Accurate Diagnosis</h4>
                    <p>Evidence-based diagnostic approach</p>
                  </div>
                </div>
                <div className="genphys-care-step">
                  <div className="genphys-care-step-number">3</div>
                  <div className="genphys-care-step-content">
                    <h4>Personalized Treatment Plan</h4>
                    <p>Customized care for your specific needs</p>
                  </div>
                </div>
                <div className="genphys-care-step">
                  <div className="genphys-care-step-number">4</div>
                  <div className="genphys-care-step-content">
                    <h4>Follow-up & Support</h4>
                    <p>Ongoing monitoring and adjustment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="genphys-doctors" id="doctors">
        <div className="genphys-section-header">
          <span className="genphys-section-badge">Meet Our Team</span>
          <h2 className="genphys-section-title">Board-Certified Physicians</h2>
          <p className="genphys-section-subtitle">Experienced doctors dedicated to your health and wellbeing</p>
        </div>
        
        <div className="genphys-doctors-grid">
          {doctors.map(doctor => (
            <div className="genphys-doctor-card" key={doctor.id}>
              <div className="genphys-doctor-header">
                <div className="genphys-doctor-image">
                  <div className="genphys-doctor-avatar">
                    <span className="genphys-avatar-icon">{doctor.image}</span>
                  </div>
                  <div className="genphys-doctor-badge">
                    <span className="genphys-badge-icon">⭐</span>
                    Accepting New Patients
                  </div>
                </div>
                
                <div className="genphys-doctor-info">
                  <h3 className="genphys-doctor-name">{doctor.name}</h3>
                  <p className="genphys-doctor-education">{doctor.education}</p>
                  <p className="genphys-doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="genphys-doctor-details">
                    <div className="genphys-doctor-detail">
                      <span className="genphys-detail-icon">📅</span>
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="genphys-doctor-detail">
                      <span className="genphys-detail-icon">🗓️</span>
                      <span>{doctor.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="genphys-doctor-expertise">
                <h4>Areas of Focus</h4>
                <div className="genphys-expertise-tags">
                  {doctor.focus.map((focus, index) => (
                    <span className="genphys-expertise-tag" key={index}>{focus}</span>
                  ))}
                </div>
              </div>
              
              <div className="genphys-doctor-languages">
                <h4>Languages Spoken</h4>
                <div className="genphys-languages-list">
                  {doctor.languages.map((language, index) => (
                    <span className="genphys-language-tag" key={index}>{language}</span>
                  ))}
                </div>
              </div>
              
              <div className="genphys-doctor-philosophy">
                <span className="genphys-philosophy-icon">💬</span>
                <p className="genphys-philosophy-text">"Prevention is better than cure. Let's work together to keep you healthy."</p>
              </div>
              
              <a href="#appointment" className="genphys-doctor-consult">
                Book with Dr. {doctor.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="genphys-health-tips" id="healthtips">
        <div className="genphys-section-header">
          <span className="genphys-section-badge">Preventive Care</span>
          <h2 className="genphys-section-title">Health Tips & Guidance</h2>
          <p className="genphys-section-subtitle">Proactive steps for maintaining optimal health</p>
        </div>
        
        <div className="genphys-tips-grid">
          {healthTips.map(tip => (
            <div className="genphys-tip-card" key={tip.id}>
              <div className="genphys-tip-icon">
                <span className="genphys-tip-icon-inner">{tip.icon}</span>
              </div>
              <h3 className="genphys-tip-title">{tip.title}</h3>
              <p className="genphys-tip-description">{tip.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="genphys-preventive-care">
          <div className="genphys-care-content">
            <h3 className="genphys-care-subtitle">Why Preventive Care Matters</h3>
            <div className="genphys-care-features">
              <div className="genphys-care-feature">
                <span className="genphys-care-feature-icon">✅</span>
                <span>Early detection saves lives</span>
              </div>
              <div className="genphys-care-feature">
                <span className="genphys-care-feature-icon">✅</span>
                <span>Reduces healthcare costs long-term</span>
              </div>
              <div className="genphys-care-feature">
                <span className="genphys-care-feature-icon">✅</span>
                <span>Improves quality of life</span>
              </div>
              <div className="genphys-care-feature">
                <span className="genphys-care-feature-icon">✅</span>
                <span>Prevents disease progression</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="genphys-testimonials">
        <div className="genphys-testimonials-container">
          <div className="genphys-testimonials-header">
            <span className="genphys-testimonials-badge">Patient Stories</span>
            <h2 className="genphys-testimonials-title">Trusted by Families</h2>
            <p className="genphys-testimonials-subtitle">Hear from patients who receive exceptional care</p>
          </div>
          
          <div className="genphys-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="genphys-testimonial-card" key={testimonial.id}>
                <div className="genphys-testimonial-header">
                  <div className="genphys-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`genphys-rating-star ${i < testimonial.rating ? 'genphys-star-active' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="genphys-testimonial-condition">
                    {testimonial.condition}
                  </div>
                </div>
                
                <p className="genphys-testimonial-text">"{testimonial.text}"</p>
                
                <div className="genphys-testimonial-history">
                  <div className="genphys-history-label">Patient History</div>
                  <div className="genphys-history-value">{testimonial.visits}</div>
                </div>
                
                <div className="genphys-testimonial-author">
                  <div className="genphys-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="genphys-author-info">
                    <h4 className="genphys-author-name">{testimonial.name}</h4>
                    <div className="genphys-author-details">
                      <span className="genphys-author-age">Age {testimonial.age}</span>
                      <span className="genphys-author-status">Satisfied Patient</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="genphys-appointment" id="appointment">
        <div className="genphys-appointment-container">
          <div className="genphys-appointment-form">
            <div className="genphys-form-header">
              <h2 className="genphys-form-title">Schedule Your Visit</h2>
              <p className="genphys-form-subtitle">Book an appointment with our experienced physicians</p>
            </div>
            
            <form onSubmit={handleSubmit} className="genphys-booking-form">
              <div className="genphys-form-row">
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="genphys-form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="genphys-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="genphys-form-row">
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="genphys-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="genphys-form-input"
                    placeholder="Enter your age"
                    min="0"
                    max="120"
                    required
                  />
                </div>
              </div>
              
              <div className="genphys-form-row">
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="genphys-form-select"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Appointment Type *</label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    className="genphys-form-select"
                    required
                  >
                    <option value="new">New Patient Visit</option>
                    <option value="followup">Follow-up Visit</option>
                    <option value="annual">Annual Check-up</option>
                    <option value="urgent">Urgent Care</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="telemedicine">Telemedicine</option>
                  </select>
                </div>
              </div>
              
              <div className="genphys-form-row">
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="genphys-form-input"
                    required
                  />
                </div>
                
                <div className="genphys-form-group">
                  <label className="genphys-form-label">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="genphys-form-select"
                    required
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (1pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                    <option value="saturday">Saturday (9am-1pm)</option>
                  </select>
                </div>
              </div>
              
              <div className="genphys-form-group">
                <label className="genphys-form-label">Symptoms or Reason for Visit *</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  className="genphys-form-textarea"
                  placeholder="Please describe your symptoms or reason for visit..."
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="genphys-form-group">
                <label className="genphys-form-label">Medical History (Optional)</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  className="genphys-form-textarea"
                  placeholder="Any pre-existing conditions, allergies, or current medications..."
                  rows="2"
                ></textarea>
              </div>
              
              <div className="genphys-form-group">
                <label className="genphys-form-label">Insurance Provider (Optional)</label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  className="genphys-form-input"
                  placeholder="Insurance company name"
                />
              </div>
              
              <div className="genphys-form-urgency">
                <label className="genphys-urgency-label">
                  <input type="checkbox" />
                  <span className="genphys-urgency-text">
                    This is an urgent medical concern
                  </span>
                </label>
                <label className="genphys-urgency-label">
                  <input type="checkbox" />
                  <span className="genphys-urgency-text">
                    I need wheelchair accessible facilities
                  </span>
                </label>
                <label className="genphys-urgency-label">
                  <input type="checkbox" />
                  <span className="genphys-urgency-text">
                    I prefer a same-day appointment if available
                  </span>
                </label>
              </div>
              
              <button type="submit" className="genphys-btn genphys-btn-submit">
                <span className="genphys-submit-icon">📅</span>
                Book Appointment Now
              </button>
              
              <p className="genphys-form-notice">
                We'll confirm your appointment within 2 hours. For medical emergencies, call 911 immediately.
                Please arrive 15 minutes early for paperwork if you're a new patient.
              </p>
            </form>
          </div>
          
          <div className="genphys-appointment-info">
            <div className="genphys-info-card">
              <div className="genphys-info-header">
                <h3 className="genphys-info-title">What to Expect</h3>
                <p className="genphys-info-subtitle">Quality care from start to finish</p>
              </div>
              
              <div className="genphys-info-features">
                <div className="genphys-info-feature">
                  <div className="genphys-feature-icon">
                    <span>⏱️</span>
                  </div>
                  <div>
                    <h4>Minimal Wait Times</h4>
                    <p>15-minute average waiting period</p>
                  </div>
                </div>
                
                <div className="genphys-info-feature">
                  <div className="genphys-feature-icon">
                    <span>🏥</span>
                  </div>
                  <div>
                    <h4>Modern Facility</h4>
                    <p>Clean, comfortable, and well-equipped</p>
                  </div>
                </div>
                
                <div className="genphys-info-feature">
                  <div className="genphys-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Attention</h4>
                    <p>30+ minutes with your physician</p>
                  </div>
                </div>
              </div>
              
              <div className="genphys-clinic-hours">
                <h4 className="genphys-hours-title">Clinic Hours</h4>
                <div className="genphys-hours-grid">
                  <div className="genphys-hour-item">
                    <span className="genphys-hour-day">Monday - Friday</span>
                    <span className="genphys-hour-time">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="genphys-hour-item">
                    <span className="genphys-hour-day">Saturday</span>
                    <span className="genphys-hour-time">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="genphys-hour-item">
                    <span className="genphys-hour-day">Sunday</span>
                    <span className="genphys-hour-time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="genphys-hour-item genphys-emergency">
                    <span className="genphys-hour-day">After Hours</span>
                    <span className="genphys-hour-time">On-call physician available</span>
                  </div>
                </div>
              </div>
              
              <div className="genphys-insurance">
                <h4 className="genphys-insurance-title">Insurance Accepted</h4>
                <div className="genphys-insurance-features">
                  <div className="genphys-insurance-feature">
                    <span className="genphys-insurance-icon">✅</span>
                    <span>Most major insurance plans</span>
                  </div>
                  <div className="genphys-insurance-feature">
                    <span className="genphys-insurance-icon">✅</span>
                    <span>Medicare & Medicaid</span>
                  </div>
                  <div className="genphys-insurance-feature">
                    <span className="genphys-insurance-icon">✅</span>
                    <span>Affordable self-pay options</span>
                  </div>
                  <div className="genphys-insurance-feature">
                    <span className="genphys-insurance-icon">✅</span>
                    <span>Direct billing available</span>
                  </div>
                </div>
              </div>
              
              <div className="genphys-facilities">
                <h4 className="genphys-facilities-title">Clinic Features</h4>
                <div className="genphys-facilities-features">
                  <div className="genphys-facilities-feature">
                    <span className="genphys-facilities-icon">✅</span>
                    <span>On-site laboratory</span>
                  </div>
                  <div className="genphys-facilities-feature">
                    <span className="genphys-facilities-icon">✅</span>
                    <span>Digital X-ray facility</span>
                  </div>
                  <div className="genphys-facilities-feature">
                    <span className="genphys-facilities-icon">✅</span>
                    <span>Pharmacy services</span>
                  </div>
                  <div className="genphys-facilities-feature">
                    <span className="genphys-facilities-icon">✅</span>
                    <span>Ample parking</span>
                  </div>
                </div>
              </div>
              
              <div className="genphys-contact-details">
                <div className="genphys-contact-item">
                  <span className="genphys-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>789 Medical Plaza, Suite 100</p>
                  </div>
                </div>
                
                <div className="genphys-contact-item">
                  <span className="genphys-contact-icon">📞</span>
                  <div>
                    <h4>Clinic Phone</h4>
                    <p>(555) 789-HEALTH</p>
                  </div>
                </div>
                
                <div className="genphys-contact-item">
                  <span className="genphys-contact-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <p>care@primecare.example</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="genphys-footer">
        <div className="genphys-footer-container">
          <div className="genphys-footer-main">
            <div className="genphys-footer-brand">
              <div className="genphys-footer-logo">
                <span className="genphys-footer-icon">🏥</span>
                <div>
                  <h3 className="genphys-footer-title">PrimeCare Physicians</h3>
                  <p className="genphys-footer-tagline">Your Health, Our Commitment</p>
                </div>
              </div>
              <p className="genphys-footer-description">
                Providing compassionate, comprehensive primary care for individuals and families since 1995.
              </p>
              
              <div className="genphys-footer-social">
                <a href="#" className="genphys-social-link" aria-label="Facebook">
                  <span className="genphys-social-icon">📘</span>
                </a>
                <a href="#" className="genphys-social-link" aria-label="Instagram">
                  <span className="genphys-social-icon">📷</span>
                </a>
                <a href="#" className="genphys-social-link" aria-label="Twitter">
                  <span className="genphys-social-icon">🐦</span>
                </a>
                <a href="#" className="genphys-social-link" aria-label="LinkedIn">
                  <span className="genphys-social-icon">💼</span>
                </a>
              </div>
            </div>
            
            <div className="genphys-footer-links">
              <div className="genphys-footer-column">
                <h4 className="genphys-column-title">Quick Links</h4>
                <a href="#home" className="genphys-footer-link">Home</a>
                <a href="#services" className="genphys-footer-link">Services</a>
                <a href="#conditions" className="genphys-footer-link">Conditions</a>
                <a href="#doctors" className="genphys-footer-link">Our Doctors</a>
                <a href="#healthtips" className="genphys-footer-link">Health Tips</a>
              </div>
              
              <div className="genphys-footer-column">
                <h4 className="genphys-column-title">Services</h4>
                <a href="#" className="genphys-footer-link">Primary Care</a>
                <a href="#" className="genphys-footer-link">Preventive Health</a>
                <a href="#" className="genphys-footer-link">Chronic Disease Care</a>
                <a href="#" className="genphys-footer-link">Vaccinations</a>
                <a href="#" className="genphys-footer-link">Telemedicine</a>
              </div>
              
              <div className="genphys-footer-column">
                <h4 className="genphys-column-title">Contact Info</h4>
                <p className="genphys-contact-info">📍 789 Medical Plaza, Suite 100</p>
                <p className="genphys-contact-info">📞 (555) 789-HEALTH</p>
                <p className="genphys-contact-info">📧 care@primecare.example</p>
                <p className="genphys-contact-info">🏥 Emergency: 911</p>
                <p className="genphys-contact-info">🕒 Mon-Fri: 8am-8pm, Sat: 9am-5pm, Sun: 10am-4pm</p>
              </div>
            </div>
          </div>
          
          <div className="genphys-footer-bottom">
            <p className="genphys-copyright">
              © {new Date().getFullYear()} PrimeCare Physicians. All rights reserved.
            </p>
            <div className="genphys-footer-legal">
              <a href="#" className="genphys-legal-link">Privacy Policy</a>
              <a href="#" className="genphys-legal-link">Terms of Service</a>
              <a href="#" className="genphys-legal-link">Patient Rights</a>
              <a href="#" className="genphys-legal-link">HIPAA Compliance</a>
              <a href="#" className="genphys-legal-link">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneralPhysicianClinic;