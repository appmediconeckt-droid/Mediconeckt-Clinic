import React, { useState } from 'react';
import './Psychiatrist.css';

const MindCareClinic = () => {
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
    { id: 1, name: 'Psychiatric Evaluation', icon: '🧠', color: '#8B5CF6', desc: 'Comprehensive mental health assessment and diagnosis' },
    { id: 2, name: 'Medication Management', icon: '💊', color: '#10B981', desc: 'Personalized medication treatment plans' },
    { id: 3, name: 'Anxiety Treatment', icon: '🌀', color: '#3B82F6', desc: 'Evidence-based therapies for anxiety disorders' },
    { id: 4, name: 'Depression Care', icon: '🌧️', color: '#EC4899', desc: 'Comprehensive treatment for depression' },
    { id: 5, name: 'Stress Management', icon: '🌊', color: '#F59E0B', desc: 'Coping strategies for stress reduction' },
    { id: 6, name: 'ADHD Treatment', icon: '⚡', color: '#EF4444', desc: 'Specialized care for attention disorders' },
    { id: 7, name: 'Sleep Disorders', icon: '😴', color: '#06B6D4', desc: 'Treatment for insomnia and sleep issues' },
    { id: 8, name: 'Teletherapy Sessions', icon: '💻', color: '#84CC16', desc: 'Virtual psychiatric appointments' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Michael Chen', specialty: 'Mood Disorders Specialist', experience: '15 years', image: '👨‍⚕️', education: 'MD, DFAPA' },
    { id: 2, name: 'Dr. Sarah Williams', specialty: 'Anxiety & Trauma Expert', experience: '12 years', image: '👩‍⚕️', education: 'MD, PhD' },
    { id: 3, name: 'Dr. James Wilson', specialty: 'Child & Adolescent Psychiatry', experience: '18 years', image: '👨‍⚕️', education: 'MD, FAACAP' }
  ];

  const testimonials = [
    { id: 1, name: 'Alex Thompson', age: 34, text: 'Life-changing treatment for my anxiety. I finally feel in control of my mental health.', rating: 5, condition: 'Anxiety Disorder' },
    { id: 2, name: 'Maria Rodriguez', age: 28, text: 'Compassionate care that made me feel heard and understood. Truly transformative.', rating: 5, condition: 'Depression' },
    { id: 3, name: 'David Kim', age: 42, text: 'Professional expertise combined with genuine empathy. Highly recommend their services.', rating: 4, condition: 'ADHD' }
  ];

  const conditions = [
    { id: 1, name: 'Generalized Anxiety', icon: '🌀' },
    { id: 2, name: 'Major Depression', icon: '🌧️' },
    { id: 3, name: 'Bipolar Disorder', icon: '⚡' },
    { id: 4, name: 'OCD', icon: '🔁' },
    { id: 5, name: 'PTSD', icon: '🛡️' },
    { id: 6, name: 'Eating Disorders', icon: '🍎' }
  ];

  const approaches = [
    { id: 1, name: 'Cognitive Behavioral Therapy', desc: 'Evidence-based approach to change thought patterns' },
    { id: 2, name: 'Psychodynamic Therapy', desc: 'Exploring unconscious patterns and past experiences' },
    { id: 3, name: 'Mindfulness-Based Therapy', desc: 'Developing present-moment awareness' },
    { id: 4, name: 'Medication Management', desc: 'Personalized pharmacological treatment' }
  ];

  const stats = [
    { number: '5,000+', label: 'Patients Helped' },
    { number: '95%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Crisis Support' },
    { number: '20+', label: 'Years Experience' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your consultation request. Our psychiatric team will contact you within 24 hours.');
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
    <div className="mindcare-container">
      {/* Navigation */}
      <nav className="mindcare-navbar">
        <div className="mindcare-nav-container">
          <div className="mindcare-logo">
            <span className="mindcare-logo-icon">🧠</span>
            <div className="mindcare-logo-text">
              <h1 className="mindcare-logo-title">MindCare Psychiatry</h1>
              <p className="mindcare-logo-subtitle">Comprehensive Mental Health Care</p>
            </div>
          </div>
          
          <button 
            className={`mindcare-menu-btn ${menuOpen ? 'mindcare-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="mindcare-menu-line mindcare-line-1"></span>
            <span className="mindcare-menu-line mindcare-line-2"></span>
            <span className="mindcare-menu-line mindcare-line-3"></span>
          </button>
          
          <div className={`mindcare-nav-menu ${menuOpen ? 'mindcare-nav-show' : ''}`}>
            <ul className="mindcare-nav-list">
              <li><a href="#home" className="mindcare-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="mindcare-nav-link" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#conditions" className="mindcare-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#doctors" className="mindcare-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#approach" className="mindcare-nav-link" onClick={() => setMenuOpen(false)}>Our Approach</a></li>
              <li><a href="#contact" className="mindcare-nav-cta" onClick={() => setMenuOpen(false)}>Schedule Consultation</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mindcare-hero" id="home">
        <div className="mindcare-hero-background">
          <div className="mindcare-hero-gradient"></div>
          <div className="mindcare-hero-pattern"></div>
        </div>
        
        <div className="mindcare-hero-content">
          <div className="mindcare-hero-text">
            <span className="mindcare-hero-badge">Mental Wellness Since 2005</span>
            <h2 className="mindcare-hero-title">Your Journey to Mental Wellness Begins Here</h2>
            <p className="mindcare-hero-description">
              Compassionate psychiatric care with evidence-based treatments. We provide personalized mental health solutions in a safe, confidential environment.
            </p>
            <div className="mindcare-hero-actions">
              <a href="#contact" className="mindcare-btn mindcare-btn-primary">
                <span className="mindcare-btn-icon">📅</span>
                Schedule Psychiatric Evaluation
              </a>
              <a href="#services" className="mindcare-btn mindcare-btn-secondary">
                <span className="mindcare-btn-icon">🧠</span>
                View Our Services
              </a>
            </div>
          </div>
          
          <div className="mindcare-hero-visual">
            <div className="mindcare-visual-main">
              <div className="mindcare-visual-element mindcare-element-1">
                <span className="mindcare-element-icon">🧘</span>
              </div>
              <div className="mindcare-visual-element mindcare-element-2">
                <span className="mindcare-element-icon">💭</span>
              </div>
              <div className="mindcare-visual-element mindcare-element-3">
                <span className="mindcare-element-icon">🌱</span>
              </div>
              <div className="mindcare-visual-element mindcare-element-4">
                <span className="mindcare-element-icon">✨</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mindcare-hero-stats">
          {stats.map((stat, index) => (
            <div className="mindcare-stat-card" key={index}>
              <div className="mindcare-stat-content">
                <span className="mindcare-stat-number">{stat.number}</span>
                <span className="mindcare-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="mindcare-services" id="services">
        <div className="mindcare-section-header">
          <span className="mindcare-section-badge">Our Services</span>
          <h2 className="mindcare-section-title">Comprehensive Psychiatric Care</h2>
          <p className="mindcare-section-subtitle">Evidence-based treatments for mental health and emotional wellness</p>
        </div>
        
        <div className="mindcare-services-grid">
          {services.map(service => (
            <div className="mindcare-service-card" key={service.id}>
              <div 
                className="mindcare-service-icon-wrapper"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="mindcare-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="mindcare-service-name">{service.name}</h3>
              <p className="mindcare-service-description">{service.desc}</p>
              <a href="#contact" className="mindcare-service-link">
                Learn More
                <span className="mindcare-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="mindcare-conditions" id="conditions">
        <div className="mindcare-conditions-container">
          <div className="mindcare-conditions-content">
            <span className="mindcare-conditions-badge">Conditions We Treat</span>
            <h2 className="mindcare-conditions-title">Specialized Mental Health Care</h2>
            <p className="mindcare-conditions-description">
              Expert diagnosis and treatment for a wide range of psychiatric conditions.
            </p>
            
            <div className="mindcare-conditions-list">
              {conditions.map(condition => (
                <div className="mindcare-condition-item" key={condition.id}>
                  <div className="mindcare-condition-icon">
                    {condition.icon}
                  </div>
                  <div className="mindcare-condition-info">
                    <h4 className="mindcare-condition-name">{condition.name}</h4>
                    <p className="mindcare-condition-desc">Comprehensive evaluation and personalized treatment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mindcare-conditions-visual">
            <div className="mindcare-wellness-journey">
              <div className="mindcare-journey-header">
                <span className="mindcare-journey-icon">🌻</span>
                <h3 className="mindcare-journey-title">Path to Wellness</h3>
              </div>
              <div className="mindcare-journey-steps">
                <div className="mindcare-journey-step">
                  <div className="mindcare-step-number">01</div>
                  <div className="mindcare-step-content">
                    <h4>Initial Assessment</h4>
                    <p>Comprehensive psychiatric evaluation and diagnosis</p>
                  </div>
                </div>
                <div className="mindcare-journey-step">
                  <div className="mindcare-step-number">02</div>
                  <div className="mindcare-step-content">
                    <h4>Personalized Plan</h4>
                    <p>Customized treatment approach for your needs</p>
                  </div>
                </div>
                <div className="mindcare-journey-step">
                  <div className="mindcare-step-number">03</div>
                  <div className="mindcare-step-content">
                    <h4>Treatment Phase</h4>
                    <p>Regular therapy sessions and medication management</p>
                  </div>
                </div>
                <div className="mindcare-journey-step">
                  <div className="mindcare-step-number">04</div>
                  <div className="mindcare-step-content">
                    <h4>Ongoing Support</h4>
                    <p>Continual progress monitoring and adjustment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="mindcare-approach" id="approach">
        <div className="mindcare-section-header">
          <span className="mindcare-section-badge">Our Approach</span>
          <h2 className="mindcare-section-title">Evidence-Based Psychiatric Care</h2>
          <p className="mindcare-section-subtitle">Integrating proven therapeutic methods with compassionate care</p>
        </div>
        
        <div className="mindcare-approach-grid">
          {approaches.map(approach => (
            <div className="mindcare-approach-card" key={approach.id}>
              <div className="mindcare-approach-icon">
                <span className="mindcare-approach-icon-inner">✨</span>
              </div>
              <h3 className="mindcare-approach-name">{approach.name}</h3>
              <p className="mindcare-approach-description">{approach.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="mindcare-doctors" id="doctors">
        <div className="mindcare-section-header">
          <span className="mindcare-section-badge">Meet Our Team</span>
          <h2 className="mindcare-section-title">Board-Certified Psychiatrists</h2>
          <p className="mindcare-section-subtitle">Expert care from mental health specialists</p>
        </div>
        
        <div className="mindcare-doctors-grid">
          {doctors.map(doctor => (
            <div className="mindcare-doctor-card" key={doctor.id}>
              <div className="mindcare-doctor-header">
                <div className="mindcare-doctor-image">
                  <div className="mindcare-doctor-avatar">
                    <span className="mindcare-avatar-icon">{doctor.image}</span>
                  </div>
                  <div className="mindcare-doctor-badge">
                    <span className="mindcare-badge-icon">⭐</span>
                    Patient Recommended
                  </div>
                </div>
                
                <div className="mindcare-doctor-info">
                  <h3 className="mindcare-doctor-name">{doctor.name}</h3>
                  <p className="mindcare-doctor-education">{doctor.education}</p>
                  <p className="mindcare-doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="mindcare-doctor-details">
                    <div className="mindcare-doctor-detail">
                      <span className="mindcare-detail-icon">📅</span>
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="mindcare-doctor-detail">
                      <span className="mindcare-detail-icon">🎓</span>
                      <span>Board Certified</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mindcare-doctor-expertise">
                <h4>Treatment Specialties</h4>
                <div className="mindcare-expertise-tags">
                  <span className="mindcare-expertise-tag">Psychopharmacology</span>
                  <span className="mindcare-expertise-tag">Psychotherapy</span>
                  <span className="mindcare-expertise-tag">Crisis Intervention</span>
                </div>
              </div>
              
              <div className="mindcare-doctor-philosophy">
                <span className="mindcare-philosophy-icon">💬</span>
                <p className="mindcare-philosophy-text">"Mental health is not a destination, but a journey of self-discovery and growth."</p>
              </div>
              
              <a href="#contact" className="mindcare-doctor-consult">
                Consult with Dr. {doctor.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mindcare-testimonials">
        <div className="mindcare-testimonials-container">
          <div className="mindcare-testimonials-header">
            <span className="mindcare-testimonials-badge">Patient Stories</span>
            <h2 className="mindcare-testimonials-title">Transformative Mental Health Journeys</h2>
            <p className="mindcare-testimonials-subtitle">Hear from individuals who found healing and hope</p>
          </div>
          
          <div className="mindcare-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="mindcare-testimonial-card" key={testimonial.id}>
                <div className="mindcare-testimonial-header">
                  <div className="mindcare-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`mindcare-rating-star ${i < testimonial.rating ? 'mindcare-star-active' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="mindcare-testimonial-condition">
                    {testimonial.condition}
                  </div>
                </div>
                
                <p className="mindcare-testimonial-text">"{testimonial.text}"</p>
                
                <div className="mindcare-testimonial-author">
                  <div className="mindcare-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="mindcare-author-info">
                    <h4 className="mindcare-author-name">{testimonial.name}</h4>
                    <div className="mindcare-author-details">
                      <span className="mindcare-author-age">Age {testimonial.age}</span>
                      <span className="mindcare-author-progress">2 years in treatment</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="mindcare-appointment" id="contact">
        <div className="mindcare-appointment-container">
          <div className="mindcare-appointment-form">
            <div className="mindcare-form-header">
              <h2 className="mindcare-form-title">Schedule Your Psychiatric Consultation</h2>
              <p className="mindcare-form-subtitle">Take the first step towards mental wellness</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mindcare-booking-form">
              <div className="mindcare-form-row">
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mindcare-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mindcare-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="mindcare-form-row">
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mindcare-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Age</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mindcare-form-select"
                    required
                  >
                    <option value="">Select age range</option>
                    <option value="18-25">18-25 years</option>
                    <option value="26-35">26-35 years</option>
                    <option value="36-45">36-45 years</option>
                    <option value="46-55">46-55 years</option>
                    <option value="56-65">56-65 years</option>
                    <option value="65+">65+ years</option>
                  </select>
                </div>
              </div>
              
              <div className="mindcare-form-row">
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Primary Concern</label>
                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    className="mindcare-form-select"
                    required
                  >
                    <option value="">Select primary concern</option>
                    <option value="anxiety">Anxiety/Panic Attacks</option>
                    <option value="depression">Depression/Mood Changes</option>
                    <option value="stress">Stress Management</option>
                    <option value="adhd">ADHD/Concentration Issues</option>
                    <option value="sleep">Sleep Disorders</option>
                    <option value="ocd">OCD/Repetitive Thoughts</option>
                    <option value="trauma">Trauma/PTSD</option>
                    <option value="other">Other Mental Health Concern</option>
                  </select>
                </div>
                
                <div className="mindcare-form-group">
                  <label className="mindcare-form-label">Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="mindcare-form-select"
                    required
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                    <option value="weekend">Weekend Appointment</option>
                  </select>
                </div>
              </div>
              
              <div className="mindcare-form-group">
                <label className="mindcare-form-label">Tell Us About Your Concerns</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mindcare-form-textarea"
                  placeholder="Please share what you've been experiencing, any previous treatments, and what you hope to achieve through therapy..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="mindcare-form-privacy">
                <label className="mindcare-privacy-label">
                  <input type="checkbox" required />
                  <span className="mindcare-privacy-text">
                    I understand that all information shared is confidential and protected by HIPAA privacy laws. I consent to contact regarding mental health services.
                  </span>
                </label>
              </div>
              
              <div className="mindcare-form-urgency">
                <label className="mindcare-urgency-label">
                  <input type="checkbox" />
                  <span className="mindcare-urgency-text">
                    I need urgent psychiatric support (we'll contact you within 2 hours)
                  </span>
                </label>
              </div>
              
              <button type="submit" className="mindcare-btn mindcare-btn-submit">
                <span className="mindcare-submit-icon">🧠</span>
                Request Psychiatric Consultation
              </button>
              
              <p className="mindcare-form-notice">
                We'll contact you within 24 hours to schedule your consultation. In crisis? Call our 24/7 support line: (555) 123-HELP.
              </p>
            </form>
          </div>
          
          <div className="mindcare-appointment-info">
            <div className="mindcare-info-card">
              <div className="mindcare-info-header">
                <h3 className="mindcare-info-title">Why Choose MindCare Psychiatry?</h3>
                <p className="mindcare-info-subtitle">Compassionate mental health care since 2005</p>
              </div>
              
              <div className="mindcare-info-features">
                <div className="mindcare-info-feature">
                  <div className="mindcare-feature-icon">
                    <span>🔒</span>
                  </div>
                  <div>
                    <h4>Complete Confidentiality</h4>
                    <p>Strict privacy protocols in a judgment-free environment</p>
                  </div>
                </div>
                
                <div className="mindcare-info-feature">
                  <div className="mindcare-feature-icon">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4>Flexible Scheduling</h4>
                    <p>Appointments available days, evenings, and weekends</p>
                  </div>
                </div>
                
                <div className="mindcare-info-feature">
                  <div className="mindcare-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Treatment</h4>
                    <p>Customized plans based on your unique needs and goals</p>
                  </div>
                </div>
              </div>
              
              <div className="mindcare-treatment-options">
                <h4 className="mindcare-treatment-title">Treatment Options</h4>
                <div className="mindcare-treatment-features">
                  <div className="mindcare-treatment-feature">
                    <span className="mindcare-treatment-icon">✅</span>
                    <span>In-person sessions</span>
                  </div>
                  <div className="mindcare-treatment-feature">
                    <span className="mindcare-treatment-icon">✅</span>
                    <span>Secure video teletherapy</span>
                  </div>
                  <div className="mindcare-treatment-feature">
                    <span className="mindcare-treatment-icon">✅</span>
                    <span>Phone consultations</span>
                  </div>
                  <div className="mindcare-treatment-feature">
                    <span className="mindcare-treatment-icon">✅</span>
                    <span>Group therapy sessions</span>
                  </div>
                </div>
              </div>
              
              <div className="mindcare-contact-details">
                <div className="mindcare-contact-item">
                  <span className="mindcare-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>123 Mental Wellness Center, Suite 300</p>
                  </div>
                </div>
                
                <div className="mindcare-contact-item">
                  <span className="mindcare-contact-icon">📞</span>
                  <div>
                    <h4>24/7 Crisis Line</h4>
                    <p>(555) 123-HELP</p>
                  </div>
                </div>
                
                <div className="mindcare-contact-item">
                  <span className="mindcare-contact-icon">🕒</span>
                  <div>
                    <h4>Clinic Hours</h4>
                    <p>Mon-Fri: 8am-8pm | Sat: 9am-5pm</p>
                  </div>
                </div>
              </div>
              
              <div className="mindcare-insurance">
                <h4 className="mindcare-insurance-title">Insurance & Accessibility</h4>
                <div className="mindcare-insurance-info">
                  <div className="mindcare-insurance-item">
                    <span className="mindcare-insurance-icon">💳</span>
                    <span>Most major insurance plans accepted</span>
                  </div>
                  <div className="mindcare-insurance-item">
                    <span className="mindcare-insurance-icon">💰</span>
                    <span>Sliding scale fees available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mindcare-footer">
        <div className="mindcare-footer-container">
          <div className="mindcare-footer-main">
            <div className="mindcare-footer-brand">
              <div className="mindcare-footer-logo">
                <span className="mindcare-footer-icon">🧠</span>
                <div>
                  <h3 className="mindcare-footer-title">MindCare Psychiatry</h3>
                  <p className="mindcare-footer-tagline">Healing Minds, Changing Lives</p>
                </div>
              </div>
              <p className="mindcare-footer-description">
                Providing exceptional psychiatric care with compassion, expertise, and dedication to mental wellness since 2005.
              </p>
              
              <div className="mindcare-footer-social">
                <a href="#" className="mindcare-social-link" aria-label="Facebook">
                  <span className="mindcare-social-icon">📘</span>
                </a>
                <a href="#" className="mindcare-social-link" aria-label="Instagram">
                  <span className="mindcare-social-icon">📷</span>
                </a>
                <a href="#" className="mindcare-social-link" aria-label="Twitter">
                  <span className="mindcare-social-icon">🐦</span>
                </a>
                <a href="#" className="mindcare-social-link" aria-label="LinkedIn">
                  <span className="mindcare-social-icon">💼</span>
                </a>
              </div>
            </div>
            
            <div className="mindcare-footer-links">
              <div className="mindcare-footer-column">
                <h4 className="mindcare-column-title">Quick Links</h4>
                <a href="#home" className="mindcare-footer-link">Home</a>
                <a href="#services" className="mindcare-footer-link">Services</a>
                <a href="#conditions" className="mindcare-footer-link">Conditions</a>
                <a href="#doctors" className="mindcare-footer-link">Our Doctors</a>
                <a href="#approach" className="mindcare-footer-link">Our Approach</a>
              </div>
              
              <div className="mindcare-footer-column">
                <h4 className="mindcare-column-title">Mental Health</h4>
                <a href="#" className="mindcare-footer-link">Anxiety Treatment</a>
                <a href="#" className="mindcare-footer-link">Depression Care</a>
                <a href="#" className="mindcare-footer-link">Stress Management</a>
                <a href="#" className="mindcare-footer-link">Medication Management</a>
                <a href="#" className="mindcare-footer-link">Teletherapy</a>
              </div>
              
              <div className="mindcare-footer-column">
                <h4 className="mindcare-column-title">Contact Info</h4>
                <p className="mindcare-contact-info">📍 123 Mental Wellness Center</p>
                <p className="mindcare-contact-info">📞 (555) 123-4567</p>
                <p className="mindcare-contact-info">🆘 Crisis: (555) 123-HELP</p>
                <p className="mindcare-contact-info">✉️ care@mindcare.example</p>
                <p className="mindcare-contact-info">🕒 Mon-Fri: 8am-8pm</p>
              </div>
            </div>
          </div>
          
          <div className="mindcare-footer-bottom">
            <p className="mindcare-copyright">
              © {new Date().getFullYear()} MindCare Psychiatry. All rights reserved.
            </p>
            <div className="mindcare-footer-legal">
              <a href="#" className="mindcare-legal-link">Privacy Policy</a>
              <a href="#" className="mindcare-legal-link">Terms of Service</a>
              <a href="#" className="mindcare-legal-link">Patient Rights</a>
              <a href="#" className="mindcare-legal-link">Crisis Resources</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MindCareClinic;