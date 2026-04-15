import React, { useState } from 'react';
import './Ent-Secialist.css';

const EntCareClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    concern: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    { id: 1, name: 'Hearing Evaluation', icon: '👂', color: '#3B82F6', desc: 'Comprehensive hearing tests and diagnosis' },
    { id: 2, name: 'Sinus Treatment', icon: '👃', color: '#10B981', desc: 'Advanced sinus care and surgical options' },
    { id: 3, name: 'Throat Disorders', icon: '👄', color: '#8B5CF6', desc: 'Treatment for voice and swallowing issues' },
    { id: 4, name: 'Tonsil & Adenoid Care', icon: '🦠', color: '#EF4444', desc: 'Pediatric and adult tonsil care' },
    { id: 5, name: 'Allergy Testing', icon: '🌸', color: '#F59E0B', desc: 'Comprehensive allergy diagnosis' },
    { id: 6, name: 'Sleep Apnea Treatment', icon: '😴', color: '#EC4899', desc: 'Solutions for sleep breathing disorders' },
    { id: 7, name: 'Vertigo & Balance', icon: '🌀', color: '#06B6D4', desc: 'Dizziness and balance disorder care' },
    { id: 8, name: 'Ear Tube Placement', icon: '🔊', color: '#84CC16', desc: 'Surgical solutions for ear infections' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Michael Chen', specialty: 'Otology Specialist', experience: '18 years', image: '👨‍⚕️', education: 'MD, FACS' },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Rhinology Expert', experience: '15 years', image: '👩‍⚕️', education: 'MD, FAOA' },
    { id: 3, name: 'Dr. Robert Wilson', specialty: 'Pediatric ENT', experience: '12 years', image: '👨‍⚕️', education: 'MD, FAAP' }
  ];

  const testimonials = [
    { id: 1, name: 'John Matthews', age: 45, text: 'Life-changing sinus surgery. I can breathe properly for the first time in years!', rating: 5, condition: 'Chronic Sinusitis' },
    { id: 2, name: 'Lisa Rodriguez', age: 32, text: 'Professional care for my hearing loss. The team was patient and thorough.', rating: 5, condition: 'Hearing Loss' },
    { id: 3, name: 'David Kim', age: 58, text: 'Excellent treatment for my vertigo. Back to normal activities within weeks.', rating: 4, condition: 'Vertigo' }
  ];

  const conditions = [
    { id: 1, name: 'Ear Infections', icon: '👂', area: 'Ear' },
    { id: 2, name: 'Sinusitis', icon: '👃', area: 'Nose' },
    { id: 3, name: 'Tonsillitis', icon: '👄', area: 'Throat' },
    { id: 4, name: 'Hearing Loss', icon: '🔊', area: 'Ear' },
    { id: 5, name: 'Allergic Rhinitis', icon: '🌸', area: 'Nose' },
    { id: 6, name: 'Voice Disorders', icon: '🗣️', area: 'Throat' }
  ];

  const treatments = [
    { id: 1, name: 'Endoscopic Surgery', desc: 'Minimally invasive procedures' },
    { id: 2, name: 'Hearing Aids', desc: 'Latest digital hearing technology' },
    { id: 3, name: 'Immunotherapy', desc: 'Allergy desensitization' },
    { id: 4, name: 'Voice Therapy', desc: 'Speech and voice rehabilitation' }
  ];

  const stats = [
    { number: '25,000+', label: 'Successful Procedures' },
    { number: '98%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Emergency ENT Care' },
    { number: '30+', label: 'Years Experience' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your ENT consultation request. Our specialist team will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      concern: '',
      preferredTime: '',
      message: ''
    });
  };

  return (
    <div className="entcare-container">
      {/* Navigation */}
      <nav className="entcare-navbar">
        <div className="entcare-nav-container">
          <div className="entcare-logo">
            <span className="entcare-logo-icon">👂👃👄</span>
            <div className="entcare-logo-text">
              <h1 className="entcare-logo-title">ENT Care Specialists</h1>
              <p className="entcare-logo-subtitle">Ear, Nose & Throat Excellence</p>
            </div>
          </div>
          
          <button 
            className={`entcare-menu-btn ${menuOpen ? 'entcare-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="entcare-menu-line entcare-line-1"></span>
            <span className="entcare-menu-line entcare-line-2"></span>
            <span className="entcare-menu-line entcare-line-3"></span>
          </button>
          
          <div className={`entcare-nav-menu ${menuOpen ? 'entcare-nav-show' : ''}`}>
            <ul className="entcare-nav-list">
              <li><a href="#home" className="entcare-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="entcare-nav-link" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#conditions" className="entcare-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#doctors" className="entcare-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#treatments" className="entcare-nav-link" onClick={() => setMenuOpen(false)}>Treatments</a></li>
              <li><a href="#contact" className="entcare-nav-cta" onClick={() => setMenuOpen(false)}>Book Consultation</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="entcare-hero" id="home">
        <div className="entcare-hero-background">
          <div className="entcare-hero-gradient"></div>
          <div className="entcare-hero-pattern"></div>
        </div>
        
        <div className="entcare-hero-content">
          <div className="entcare-hero-text">
            <span className="entcare-hero-badge">ENT Excellence Since 1990</span>
            <h2 className="entcare-hero-title">Specialized Care for Ear, Nose & Throat Health</h2>
            <p className="entcare-hero-description">
              Advanced ENT treatments with state-of-the-art technology. From hearing loss to sinus disorders, we provide comprehensive care for all ENT conditions.
            </p>
            <div className="entcare-hero-actions">
              <a href="#contact" className="entcare-btn entcare-btn-primary">
                <span className="entcare-btn-icon">📅</span>
                Schedule ENT Consultation
              </a>
              <a href="#services" className="entcare-btn entcare-btn-secondary">
                <span className="entcare-btn-icon">👂</span>
                View Our Services
              </a>
            </div>
          </div>
          
          <div className="entcare-hero-visual">
            <div className="entcare-visual-main">
              <div className="entcare-visual-element entcare-element-1">
                <span className="entcare-element-icon">👂</span>
              </div>
              <div className="entcare-visual-element entcare-element-2">
                <span className="entcare-element-icon">👃</span>
              </div>
              <div className="entcare-visual-element entcare-element-3">
                <span className="entcare-element-icon">👄</span>
              </div>
              <div className="entcare-visual-element entcare-element-4">
                <span className="entcare-element-icon">🔊</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="entcare-hero-stats">
          {stats.map((stat, index) => (
            <div className="entcare-stat-card" key={index}>
              <div className="entcare-stat-content">
                <span className="entcare-stat-number">{stat.number}</span>
                <span className="entcare-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="entcare-services" id="services">
        <div className="entcare-section-header">
          <span className="entcare-section-badge">Our Services</span>
          <h2 className="entcare-section-title">Comprehensive ENT Care</h2>
          <p className="entcare-section-subtitle">Specialized treatments for ear, nose, and throat disorders</p>
        </div>
        
        <div className="entcare-services-grid">
          {services.map(service => (
            <div className="entcare-service-card" key={service.id}>
              <div 
                className="entcare-service-icon-wrapper"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="entcare-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="entcare-service-name">{service.name}</h3>
              <p className="entcare-service-description">{service.desc}</p>
              <a href="#contact" className="entcare-service-link">
                Learn More
                <span className="entcare-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="entcare-conditions" id="conditions">
        <div className="entcare-conditions-container">
          <div className="entcare-conditions-content">
            <span className="entcare-conditions-badge">Common Conditions</span>
            <h2 className="entcare-conditions-title">ENT Disorders We Treat</h2>
            <p className="entcare-conditions-description">
              Expert diagnosis and treatment for a wide range of ear, nose, and throat conditions.
            </p>
            
            <div className="entcare-conditions-grid">
              {conditions.map(condition => (
                <div className="entcare-condition-card" key={condition.id}>
                  <div className="entcare-condition-icon">
                    {condition.icon}
                  </div>
                  <div className="entcare-condition-info">
                    <h4 className="entcare-condition-name">{condition.name}</h4>
                    <div className="entcare-condition-area">{condition.area}</div>
                    <p className="entcare-condition-desc">Comprehensive evaluation and treatment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="entcare-conditions-visual">
            <div className="entcare-specialties">
              <div className="entcare-specialties-header">
                <span className="entcare-specialties-icon">🏥</span>
                <h3 className="entcare-specialties-title">Our Specialties</h3>
              </div>
              <div className="entcare-specialties-list">
                <div className="entcare-specialty">
                  <div className="entcare-specialty-icon">👂</div>
                  <div className="entcare-specialty-content">
                    <h4>Otology</h4>
                    <p>Ear disorders and hearing</p>
                  </div>
                </div>
                <div className="entcare-specialty">
                  <div className="entcare-specialty-icon">👃</div>
                  <div className="entcare-specialty-content">
                    <h4>Rhinology</h4>
                    <p>Nose and sinus conditions</p>
                  </div>
                </div>
                <div className="entcare-specialty">
                  <div className="entcare-specialty-icon">👄</div>
                  <div className="entcare-specialty-content">
                    <h4>Laryngology</h4>
                    <p>Throat and voice disorders</p>
                  </div>
                </div>
                <div className="entcare-specialty">
                  <div className="entcare-specialty-icon">👶</div>
                  <div className="entcare-specialty-content">
                    <h4>Pediatric ENT</h4>
                    <p>Children's ENT conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="entcare-treatments" id="treatments">
        <div className="entcare-section-header">
          <span className="entcare-section-badge">Advanced Treatments</span>
          <h2 className="entcare-section-title">State-of-the-Art ENT Solutions</h2>
          <p className="entcare-section-subtitle">Latest technology and minimally invasive procedures</p>
        </div>
        
        <div className="entcare-treatments-grid">
          {treatments.map(treatment => (
            <div className="entcare-treatment-card" key={treatment.id}>
              <div className="entcare-treatment-icon">
                <span className="entcare-treatment-icon-inner">✨</span>
              </div>
              <h3 className="entcare-treatment-name">{treatment.name}</h3>
              <p className="entcare-treatment-description">{treatment.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="entcare-technology">
          <div className="entcare-technology-content">
            <h3 className="entcare-technology-title">Advanced Diagnostic Technology</h3>
            <div className="entcare-technology-features">
              <div className="entcare-technology-feature">
                <span className="entcare-tech-icon">🔬</span>
                <span>High-definition endoscopy</span>
              </div>
              <div className="entcare-technology-feature">
                <span className="entcare-tech-icon">📊</span>
                <span>Digital hearing assessment</span>
              </div>
              <div className="entcare-technology-feature">
                <span className="entcare-tech-icon">📷</span>
                <span>CT scan for sinus evaluation</span>
              </div>
              <div className="entcare-technology-feature">
                <span className="entcare-tech-icon">🎯</span>
                <span>Image-guided surgery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="entcare-doctors" id="doctors">
        <div className="entcare-section-header">
          <span className="entcare-section-badge">Meet Our Specialists</span>
          <h2 className="entcare-section-title">Board-Certified ENT Surgeons</h2>
          <p className="entcare-section-subtitle">Expert care from experienced ENT specialists</p>
        </div>
        
        <div className="entcare-doctors-grid">
          {doctors.map(doctor => (
            <div className="entcare-doctor-card" key={doctor.id}>
              <div className="entcare-doctor-header">
                <div className="entcare-doctor-image">
                  <div className="entcare-doctor-avatar">
                    <span className="entcare-avatar-icon">{doctor.image}</span>
                  </div>
                  <div className="entcare-doctor-badge">
                    <span className="entcare-badge-icon">⭐</span>
                    Patient Recommended
                  </div>
                </div>
                
                <div className="entcare-doctor-info">
                  <h3 className="entcare-doctor-name">{doctor.name}</h3>
                  <p className="entcare-doctor-education">{doctor.education}</p>
                  <p className="entcare-doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="entcare-doctor-details">
                    <div className="entcare-doctor-detail">
                      <span className="entcare-detail-icon">📅</span>
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="entcare-doctor-detail">
                      <span className="entcare-detail-icon">🎓</span>
                      <span>Fellowship Trained</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="entcare-doctor-expertise">
                <h4>Surgical Expertise</h4>
                <div className="entcare-expertise-tags">
                  <span className="entcare-expertise-tag">Endoscopic Surgery</span>
                  <span className="entcare-expertise-tag">Hearing Restoration</span>
                  <span className="entcare-expertise-tag">Sinus Procedures</span>
                </div>
              </div>
              
              <div className="entcare-doctor-philosophy">
                <span className="entcare-philosophy-icon">💬</span>
                <p className="entcare-philosophy-text">"Precision care for better breathing, hearing, and quality of life."</p>
              </div>
              
              <a href="#contact" className="entcare-doctor-consult">
                Consult with Dr. {doctor.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="entcare-testimonials">
        <div className="entcare-testimonials-container">
          <div className="entcare-testimonials-header">
            <span className="entcare-testimonials-badge">Patient Stories</span>
            <h2 className="entcare-testimonials-title">Life-Changing ENT Care</h2>
            <p className="entcare-testimonials-subtitle">Hear from patients who regained their quality of life</p>
          </div>
          
          <div className="entcare-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="entcare-testimonial-card" key={testimonial.id}>
                <div className="entcare-testimonial-header">
                  <div className="entcare-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`entcare-rating-star ${i < testimonial.rating ? 'entcare-star-active' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="entcare-testimonial-condition">
                    {testimonial.condition}
                  </div>
                </div>
                
                <p className="entcare-testimonial-text">"{testimonial.text}"</p>
                
                <div className="entcare-testimonial-author">
                  <div className="entcare-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="entcare-author-info">
                    <h4 className="entcare-author-name">{testimonial.name}</h4>
                    <div className="entcare-author-details">
                      <span className="entcare-author-age">Age {testimonial.age}</span>
                      <span className="entcare-author-success">Treatment successful</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="entcare-appointment" id="contact">
        <div className="entcare-appointment-container">
          <div className="entcare-appointment-form">
            <div className="entcare-form-header">
              <h2 className="entcare-form-title">Schedule Your ENT Consultation</h2>
              <p className="entcare-form-subtitle">Take the first step towards better ear, nose, and throat health</p>
            </div>
            
            <form onSubmit={handleSubmit} className="entcare-booking-form">
              <div className="entcare-form-row">
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="entcare-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="entcare-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="entcare-form-row">
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="entcare-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Age</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="entcare-form-select"
                    required
                  >
                    <option value="">Select age</option>
                    <option value="child">Child (0-12)</option>
                    <option value="teen">Teenager (13-17)</option>
                    <option value="adult">Adult (18-64)</option>
                    <option value="senior">Senior (65+)</option>
                  </select>
                </div>
              </div>
              
              <div className="entcare-form-row">
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Primary Concern</label>
                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    className="entcare-form-select"
                    required
                  >
                    <option value="">Select primary concern</option>
                    <option value="ear">Ear Problem (Hearing, Pain, Infection)</option>
                    <option value="nose">Nose/Sinus Issue (Breathing, Allergies)</option>
                    <option value="throat">Throat Problem (Voice, Swallowing)</option>
                    <option value="hearing">Hearing Loss/Difficulty</option>
                    <option value="vertigo">Dizziness/Vertigo</option>
                    <option value="sleep">Sleep Apnea/Snoring</option>
                    <option value="tinnitus">Tinnitus (Ringing in Ears)</option>
                    <option value="other">Other ENT Concern</option>
                  </select>
                </div>
                
                <div className="entcare-form-group">
                  <label className="entcare-form-label">Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="entcare-form-select"
                    required
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                    <option value="saturday">Saturday Appointment</option>
                  </select>
                </div>
              </div>
              
              <div className="entcare-form-group">
                <label className="entcare-form-label">Symptoms Description</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="entcare-form-textarea"
                  placeholder="Please describe your symptoms, how long you've had them, and any previous treatments..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="entcare-form-urgency">
                <label className="entcare-urgency-label">
                  <input type="checkbox" />
                  <span className="entcare-urgency-text">
                    This is an urgent concern requiring immediate attention
                  </span>
                </label>
              </div>
              
              <button type="submit" className="entcare-btn entcare-btn-submit">
                <span className="entcare-submit-icon">👂</span>
                Request ENT Consultation
              </button>
              
              <p className="entcare-form-notice">
                We'll contact you within 24 hours to schedule your consultation. For emergencies, call (555) 123-ENT immediately.
              </p>
            </form>
          </div>
          
          <div className="entcare-appointment-info">
            <div className="entcare-info-card">
              <div className="entcare-info-header">
                <h3 className="entcare-info-title">Why Choose ENT Care Specialists?</h3>
                <p className="entcare-info-subtitle">Precision care since 1990</p>
              </div>
              
              <div className="entcare-info-features">
                <div className="entcare-info-feature">
                  <div className="entcare-feature-icon">
                    <span>🔬</span>
                  </div>
                  <div>
                    <h4>Advanced Technology</h4>
                    <p>Latest diagnostic and surgical equipment</p>
                  </div>
                </div>
                
                <div className="entcare-info-feature">
                  <div className="entcare-feature-icon">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4>Same-Day Appointments</h4>
                    <p>Urgent ENT concerns addressed promptly</p>
                  </div>
                </div>
                
                <div className="entcare-info-feature">
                  <div className="entcare-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Treatment Plans</h4>
                    <p>Customized care for your specific condition</p>
                  </div>
                </div>
              </div>
              
              <div className="entcare-clinic-hours">
                <h4 className="entcare-hours-title">Clinic Hours</h4>
                <div className="entcare-hours-grid">
                  <div className="entcare-hour-item">
                    <span className="entcare-hour-day">Monday - Friday</span>
                    <span className="entcare-hour-time">8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="entcare-hour-item">
                    <span className="entcare-hour-day">Saturday</span>
                    <span className="entcare-hour-time">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="entcare-hour-item">
                    <span className="entcare-hour-day">Sunday</span>
                    <span className="entcare-hour-time">Emergency Only</span>
                  </div>
                  <div className="entcare-hour-item entcare-emergency">
                    <span className="entcare-hour-day">24/7 Emergency</span>
                    <span className="entcare-hour-time">(555) 123-ENT</span>
                  </div>
                </div>
              </div>
              
              <div className="entcare-facility">
                <h4 className="entcare-facility-title">Our Facility Features</h4>
                <div className="entcare-facility-features">
                  <div className="entcare-facility-feature">
                    <span className="entcare-facility-icon">✅</span>
                    <span>On-site audiology lab</span>
                  </div>
                  <div className="entcare-facility-feature">
                    <span className="entcare-facility-icon">✅</span>
                    <span>Minimally invasive surgery center</span>
                  </div>
                  <div className="entcare-facility-feature">
                    <span className="entcare-facility-icon">✅</span>
                    <span>Allergy testing center</span>
                  </div>
                  <div className="entcare-facility-feature">
                    <span className="entcare-facility-icon">✅</span>
                    <span>Sleep study facilities</span>
                  </div>
                </div>
              </div>
              
              <div className="entcare-contact-details">
                <div className="entcare-contact-item">
                  <span className="entcare-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>123 ENT Medical Center, Suite 500</p>
                  </div>
                </div>
                
                <div className="entcare-contact-item">
                  <span className="entcare-contact-icon">📞</span>
                  <div>
                    <h4>Emergency Line</h4>
                    <p>(555) 123-ENT</p>
                  </div>
                </div>
                
                <div className="entcare-contact-item">
                  <span className="entcare-contact-icon">🕒</span>
                  <div>
                    <h4>Office Hours</h4>
                    <p>Mon-Fri: 8am-7pm | Sat: 9am-4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="entcare-footer">
        <div className="entcare-footer-container">
          <div className="entcare-footer-main">
            <div className="entcare-footer-brand">
              <div className="entcare-footer-logo">
                <span className="entcare-footer-icon">👂👃👄</span>
                <div>
                  <h3 className="entcare-footer-title">ENT Care Specialists</h3>
                  <p className="entcare-footer-tagline">Precision Care for Better Living</p>
                </div>
              </div>
              <p className="entcare-footer-description">
                Providing exceptional ear, nose, and throat care with advanced technology and compassionate expertise since 1990.
              </p>
              
              <div className="entcare-footer-social">
                <a href="#" className="entcare-social-link" aria-label="Facebook">
                  <span className="entcare-social-icon">📘</span>
                </a>
                <a href="#" className="entcare-social-link" aria-label="Instagram">
                  <span className="entcare-social-icon">📷</span>
                </a>
                <a href="#" className="entcare-social-link" aria-label="Twitter">
                  <span className="entcare-social-icon">🐦</span>
                </a>
                <a href="#" className="entcare-social-link" aria-label="YouTube">
                  <span className="entcare-social-icon">📺</span>
                </a>
              </div>
            </div>
            
            <div className="entcare-footer-links">
              <div className="entcare-footer-column">
                <h4 className="entcare-column-title">Quick Links</h4>
                <a href="#home" className="entcare-footer-link">Home</a>
                <a href="#services" className="entcare-footer-link">Services</a>
                <a href="#conditions" className="entcare-footer-link">Conditions</a>
                <a href="#doctors" className="entcare-footer-link">Our Doctors</a>
                <a href="#treatments" className="entcare-footer-link">Treatments</a>
              </div>
              
              <div className="entcare-footer-column">
                <h4 className="entcare-column-title">ENT Services</h4>
                <a href="#" className="entcare-footer-link">Hearing Care</a>
                <a href="#" className="entcare-footer-link">Sinus Treatment</a>
                <a href="#" className="entcare-footer-link">Throat Disorders</a>
                <a href="#" className="entcare-footer-link">Pediatric ENT</a>
                <a href="#" className="entcare-footer-link">Allergy Testing</a>
              </div>
              
              <div className="entcare-footer-column">
                <h4 className="entcare-column-title">Contact Info</h4>
                <p className="entcare-contact-info">📍 123 ENT Medical Center</p>
                <p className="entcare-contact-info">📞 (555) 123-4567</p>
                <p className="entcare-contact-info">🆘 Emergency: (555) 123-ENT</p>
                <p className="entcare-contact-info">✉️ care@entcare.example</p>
                <p className="entcare-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="entcare-footer-bottom">
            <p className="entcare-copyright">
              © {new Date().getFullYear()} ENT Care Specialists. All rights reserved.
            </p>
            <div className="entcare-footer-legal">
              <a href="#" className="entcare-legal-link">Privacy Policy</a>
              <a href="#" className="entcare-legal-link">Terms of Service</a>
              <a href="#" className="entcare-legal-link">Patient Rights</a>
              <a href="#" className="entcare-legal-link">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EntCareClinic;