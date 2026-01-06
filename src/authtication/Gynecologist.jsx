import React, { useState } from 'react';
import './WomenHealthCare.css';

const WomenHealthCare = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    concern: '',
    date: '',
    message: ''
  });

  const services = [
    { id: 1, name: 'Annual Well-Woman Exam', icon: '🩺', color: '#EC4899', desc: 'Comprehensive health screening and preventive care' },
    { id: 2, name: 'Prenatal & Obstetric Care', icon: '🤰', color: '#8B5CF6', desc: 'Complete pregnancy care and delivery support' },
    { id: 3, name: 'Menopause Management', icon: '🌙', color: '#3B82F6', desc: 'Specialized care for menopause symptoms' },
    { id: 4, name: 'Fertility Evaluation', icon: '🌸', color: '#10B981', desc: 'Advanced fertility assessment and treatment' },
    { id: 5, name: 'Minimally Invasive Surgery', icon: '🔬', color: '#F59E0B', desc: 'Laparoscopic and robotic procedures' },
    { id: 6, name: 'Breast Health Screening', icon: '💖', color: '#EF4444', desc: 'Mammograms and breast health evaluation' },
    { id: 7, name: 'PCOS Management', icon: '🦋', color: '#06B6D4', desc: 'Polycystic ovary syndrome treatment' },
    { id: 8, name: 'Urogynecology', icon: '💧', color: '#84CC16', desc: 'Bladder and pelvic floor disorders' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Martinez', specialty: 'High-Risk Pregnancy Specialist', experience: '18 years', image: '👩‍⚕️', education: 'MD, FACOG' },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Reproductive Endocrinology', experience: '15 years', image: '👩‍⚕️', education: 'MD, REI' },
    { id: 3, name: 'Dr. Jennifer Wilson', specialty: 'Gynecologic Oncology', experience: '20 years', image: '👩‍⚕️', education: 'MD, FACS' }
  ];

  const testimonials = [
    { id: 1, name: 'Maya Rodriguez', age: 32, text: 'Exceptional care during my pregnancy. The team made me feel supported every step of the way.', rating: 5, treatment: 'Prenatal Care' },
    { id: 2, name: 'Lisa Chen', age: 45, text: 'Professional, compassionate, and knowledgeable. Finally found a gynecologist I trust completely.', rating: 5, treatment: 'Menopause Management' },
    { id: 3, name: 'Sophia Williams', age: 28, text: 'Life-changing fertility treatment. We\'re now expecting our first baby thanks to their expertise.', rating: 4, treatment: 'Fertility Treatment' }
  ];

  const conditions = [
    { id: 1, name: 'Endometriosis', icon: '🌀' },
    { id: 2, name: 'Fibroids', icon: '🔘' },
    { id: 3, name: 'Ovarian Cysts', icon: '⚪' },
    { id: 4, name: 'Menstrual Disorders', icon: '🌙' },
    { id: 5, name: 'Pelvic Pain', icon: '💫' },
    { id: 6, name: 'Hormonal Imbalances', icon: '⚖️' }
  ];

  const stats = [
    { number: '10,000+', label: 'Healthy Deliveries' },
    { number: '99%', label: 'Patient Satisfaction' },
    { number: '25+', label: 'Years Experience' },
    { number: '15+', label: 'Specialized Treatments' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your appointment request. Our women\'s health team will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      concern: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="womenshealth-container">
      {/* Navigation */}
      <nav className="womenshealth-navbar">
        <div className="womenshealth-nav-container">
          <div className="womenshealth-logo">
            <span className="womenshealth-logo-icon">🌸</span>
            <div className="womenshealth-logo-text">
              <h1 className="womenshealth-logo-title">Women's Health Center</h1>
              <p className="womenshealth-logo-subtitle">Comprehensive Gynecological Care</p>
            </div>
          </div>
          
          <button 
            className={`womenshealth-menu-btn ${menuOpen ? 'womenshealth-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="womenshealth-menu-line womenshealth-line-1"></span>
            <span className="womenshealth-menu-line womenshealth-line-2"></span>
            <span className="womenshealth-menu-line womenshealth-line-3"></span>
          </button>
          
          <div className={`womenshealth-nav-menu ${menuOpen ? 'womenshealth-nav-show' : ''}`}>
            <ul className="womenshealth-nav-list">
              <li><a href="#home" className="womenshealth-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="womenshealth-nav-link" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#conditions" className="womenshealth-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#doctors" className="womenshealth-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#testimonials" className="womenshealth-nav-link" onClick={() => setMenuOpen(false)}>Stories</a></li>
              <li><a href="#contact" className="womenshealth-nav-cta" onClick={() => setMenuOpen(false)}>Book Appointment</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="womenshealth-hero" id="home">
        <div className="womenshealth-hero-background">
          <div className="womenshealth-hero-gradient"></div>
          <div className="womenshealth-hero-pattern"></div>
        </div>
        
        <div className="womenshealth-hero-content">
          <div className="womenshealth-hero-text">
            <span className="womenshealth-hero-badge">Women's Health Excellence</span>
            <h2 className="womenshealth-hero-title">Compassionate Care for Every Stage of Life</h2>
            <p className="womenshealth-hero-description">
              Expert gynecological care with a focus on women's wellness, from adolescence through menopause and beyond.
            </p>
            <div className="womenshealth-hero-actions">
              <a href="#contact" className="womenshealth-btn womenshealth-btn-primary">
                <span className="womenshealth-btn-icon">📅</span>
                Book Women's Health Exam
              </a>
              <a href="#services" className="womenshealth-btn womenshealth-btn-secondary">
                <span className="womenshealth-btn-icon">🌸</span>
                View Our Services
              </a>
            </div>
          </div>
          
          <div className="womenshealth-hero-visual">
            <div className="womenshealth-visual-main">
              <div className="womenshealth-visual-element womenshealth-element-1">
                <span className="womenshealth-element-icon">🌸</span>
              </div>
              <div className="womenshealth-visual-element womenshealth-element-2">
                <span className="womenshealth-element-icon">🤰</span>
              </div>
              <div className="womenshealth-visual-element womenshealth-element-3">
                <span className="womenshealth-element-icon">💖</span>
              </div>
              <div className="womenshealth-visual-element womenshealth-element-4">
                <span className="womenshealth-element-icon">🩺</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="womenshealth-hero-stats">
          {stats.map((stat, index) => (
            <div className="womenshealth-stat-card" key={index}>
              <div className="womenshealth-stat-content">
                <span className="womenshealth-stat-number">{stat.number}</span>
                <span className="womenshealth-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="womenshealth-services" id="services">
        <div className="womenshealth-section-header">
          <span className="womenshealth-section-badge">Our Services</span>
          <h2 className="womenshealth-section-title">Comprehensive Women's Health Care</h2>
          <p className="womenshealth-section-subtitle">Specialized gynecological services for every stage of a woman's life</p>
        </div>
        
        <div className="womenshealth-services-grid">
          {services.map(service => (
            <div className="womenshealth-service-card" key={service.id}>
              <div 
                className="womenshealth-service-icon-wrapper"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="womenshealth-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="womenshealth-service-name">{service.name}</h3>
              <p className="womenshealth-service-description">{service.desc}</p>
              <a href="#contact" className="womenshealth-service-link">
                Learn More
                <span className="womenshealth-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="womenshealth-conditions" id="conditions">
        <div className="womenshealth-conditions-container">
          <div className="womenshealth-conditions-content">
            <span className="womenshealth-conditions-badge">Conditions We Treat</span>
            <h2 className="womenshealth-conditions-title">Specialized Gynecological Care</h2>
            <p className="womenshealth-conditions-description">
              Expert diagnosis and treatment for a wide range of women's health conditions.
            </p>
            
            <div className="womenshealth-conditions-list">
              {conditions.map(condition => (
                <div className="womenshealth-condition-item" key={condition.id}>
                  <div className="womenshealth-condition-icon">
                    {condition.icon}
                  </div>
                  <div className="womenshealth-condition-info">
                    <h4 className="womenshealth-condition-name">{condition.name}</h4>
                    <p className="womenshealth-condition-desc">Comprehensive evaluation and personalized treatment</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="womenshealth-btn womenshealth-btn-outline">
              <span className="womenshealth-btn-icon">👩‍⚕️</span>
              Get Expert Consultation
            </a>
          </div>
          
          <div className="womenshealth-conditions-visual">
            <div className="womenshealth-health-journey">
              <div className="womenshealth-journey-header">
                <span className="womenshealth-journey-icon">🌷</span>
                <h3 className="womenshealth-journey-title">Your Health Journey</h3>
              </div>
              <div className="womenshealth-journey-steps">
                <div className="womenshealth-journey-step">
                  <div className="womenshealth-step-number">01</div>
                  <div className="womenshealth-step-content">
                    <h4>Initial Consultation</h4>
                    <p>Comprehensive health assessment and personalized plan</p>
                  </div>
                </div>
                <div className="womenshealth-journey-step">
                  <div className="womenshealth-step-number">02</div>
                  <div className="womenshealth-step-content">
                    <h4>Diagnostic Testing</h4>
                    <p>Advanced imaging and laboratory evaluations</p>
                  </div>
                </div>
                <div className="womenshealth-journey-step">
                  <div className="womenshealth-step-number">03</div>
                  <div className="womenshealth-step-content">
                    <h4>Treatment Plan</h4>
                    <p>Personalized medical or surgical approach</p>
                  </div>
                </div>
                <div className="womenshealth-journey-step">
                  <div className="womenshealth-step-number">04</div>
                  <div className="womenshealth-step-content">
                    <h4>Follow-up Care</h4>
                    <p>Ongoing monitoring and preventive health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="womenshealth-doctors" id="doctors">
        <div className="womenshealth-section-header">
          <span className="womenshealth-section-badge">Meet Our Specialists</span>
          <h2 className="womenshealth-section-title">Board-Certified Gynecologists</h2>
          <p className="womenshealth-section-subtitle">Expert care from women's health specialists</p>
        </div>
        
        <div className="womenshealth-doctors-grid">
          {doctors.map(doctor => (
            <div className="womenshealth-doctor-card" key={doctor.id}>
              <div className="womenshealth-doctor-header">
                <div className="womenshealth-doctor-image">
                  <div className="womenshealth-doctor-avatar">
                    <span className="womenshealth-avatar-icon">{doctor.image}</span>
                  </div>
                  <div className="womenshealth-doctor-badge">
                    <span className="womenshealth-badge-icon">⭐</span>
                    Patient Choice Award
                  </div>
                </div>
                
                <div className="womenshealth-doctor-info">
                  <h3 className="womenshealth-doctor-name">{doctor.name}</h3>
                  <p className="womenshealth-doctor-education">{doctor.education}</p>
                  <p className="womenshealth-doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="womenshealth-doctor-details">
                    <div className="womenshealth-doctor-detail">
                      <span className="womenshealth-detail-icon">📅</span>
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="womenshealth-doctor-detail">
                      <span className="womenshealth-detail-icon">👩‍🎓</span>
                      <span>Fellowship Trained</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="womenshealth-doctor-expertise">
                <h4>Areas of Specialization</h4>
                <div className="womenshealth-expertise-tags">
                  <span className="womenshealth-expertise-tag">Minimally Invasive Surgery</span>
                  <span className="womenshealth-expertise-tag">High-Risk Obstetrics</span>
                  <span className="womenshealth-expertise-tag">Reproductive Health</span>
                </div>
              </div>
              
              <div className="womenshealth-doctor-philosophy">
                <span className="womenshealth-philosophy-icon">💬</span>
                <p className="womenshealth-philosophy-text">"Empowering women through compassionate, evidence-based care."</p>
              </div>
              
              <a href="#contact" className="womenshealth-doctor-consult">
                Schedule with Dr. {doctor.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="womenshealth-testimonials" id="testimonials">
        <div className="womenshealth-testimonials-container">
          <div className="womenshealth-testimonials-header">
            <span className="womenshealth-testimonials-badge">Patient Stories</span>
            <h2 className="womenshealth-testimonials-title">Women Supporting Women</h2>
            <p className="womenshealth-testimonials-subtitle">Hear from women who trust us with their health journey</p>
          </div>
          
          <div className="womenshealth-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="womenshealth-testimonial-card" key={testimonial.id}>
                <div className="womenshealth-testimonial-header">
                  <div className="womenshealth-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`womenshealth-rating-star ${i < testimonial.rating ? 'womenshealth-star-active' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="womenshealth-testimonial-treatment">
                    {testimonial.treatment}
                  </div>
                </div>
                
                <p className="womenshealth-testimonial-text">"{testimonial.text}"</p>
                
                <div className="womenshealth-testimonial-author">
                  <div className="womenshealth-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="womenshealth-author-info">
                    <h4 className="womenshealth-author-name">{testimonial.name}</h4>
                    <div className="womenshealth-author-details">
                      <span className="womenshealth-author-age">Age {testimonial.age}</span>
                      <span className="womenshealth-author-experience">Patient since 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="womenshealth-appointment" id="contact">
        <div className="womenshealth-appointment-container">
          <div className="womenshealth-appointment-form">
            <div className="womenshealth-form-header">
              <h2 className="womenshealth-form-title">Schedule Your Women's Health Visit</h2>
              <p className="womenshealth-form-subtitle">Take the first step towards comprehensive women's wellness</p>
            </div>
            
            <form onSubmit={handleSubmit} className="womenshealth-booking-form">
              <div className="womenshealth-form-row">
                <div className="womenshealth-form-group">
                  <label className="womenshealth-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="womenshealth-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="womenshealth-form-group">
                  <label className="womenshealth-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="womenshealth-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="womenshealth-form-row">
                <div className="womenshealth-form-group">
                  <label className="womenshealth-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="womenshealth-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="womenshealth-form-group">
                  <label className="womenshealth-form-label">Age</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="womenshealth-form-select"
                    required
                  >
                    <option value="">Select age range</option>
                    <option value="15-20">15-20 years</option>
                    <option value="21-30">21-30 years</option>
                    <option value="31-40">31-40 years</option>
                    <option value="41-50">41-50 years</option>
                    <option value="51-60">51-60 years</option>
                    <option value="61+">61+ years</option>
                  </select>
                </div>
              </div>
              
              <div className="womenshealth-form-group">
                <label className="womenshealth-form-label">Health Concern</label>
                <select
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                  className="womenshealth-form-select"
                  required
                >
                  <option value="">Select concern</option>
                  <option value="annual-exam">Annual Well-Woman Exam</option>
                  <option value="pregnancy">Pregnancy/Prenatal Care</option>
                  <option value="menopause">Menopause Symptoms</option>
                  <option value="fertility">Fertility Evaluation</option>
                  <option value="menstrual">Menstrual Issues</option>
                  <option value="contraception">Contraception/Birth Control</option>
                  <option value="screening">Cancer Screening</option>
                  <option value="other">Other Concern</option>
                </select>
              </div>
              
              <div className="womenshealth-form-group">
                <label className="womenshealth-form-label">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="womenshealth-form-input"
                  required
                />
              </div>
              
              <div className="womenshealth-form-group">
                <label className="womenshealth-form-label">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="womenshealth-form-textarea"
                  placeholder="Tell us about your symptoms, concerns, or specific questions..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="womenshealth-form-privacy">
                <label className="womenshealth-privacy-label">
                  <input type="checkbox" required />
                  <span className="womenshealth-privacy-text">
                    I understand that all information shared is confidential and protected by HIPAA privacy laws
                  </span>
                </label>
              </div>
              
              <button type="submit" className="womenshealth-btn womenshealth-btn-submit">
                <span className="womenshealth-submit-icon">🌸</span>
                Request Women's Health Appointment
              </button>
              
              <p className="womenshealth-form-notice">
                We'll contact you within 24 hours to confirm your appointment. All-female staff available upon request.
              </p>
            </form>
          </div>
          
          <div className="womenshealth-appointment-info">
            <div className="womenshealth-info-card">
              <div className="womenshealth-info-header">
                <h3 className="womenshealth-info-title">Why Choose Women's Health Center?</h3>
                <p className="womenshealth-info-subtitle">Compassionate care since 2000</p>
              </div>
              
              <div className="womenshealth-info-features">
                <div className="womenshealth-info-feature">
                  <div className="womenshealth-feature-icon">
                    <span>🏥</span>
                  </div>
                  <div>
                    <h4>Women-Centered Environment</h4>
                    <p>Comfortable, private spaces designed for women's comfort</p>
                  </div>
                </div>
                
                <div className="womenshealth-info-feature">
                  <div className="womenshealth-feature-icon">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4>Same-Day Appointments</h4>
                    <p>Urgent women's health concerns addressed promptly</p>
                  </div>
                </div>
                
                <div className="womenshealth-info-feature">
                  <div className="womenshealth-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Care Plans</h4>
                    <p>Individualized treatment approaches for unique health needs</p>
                  </div>
                </div>
              </div>
              
              <div className="womenshealth-clinic-info">
                <h4 className="womenshealth-clinic-title">Our Facility Features</h4>
                <div className="womenshealth-clinic-features">
                  <div className="womenshealth-clinic-feature">
                    <span className="womenshealth-clinic-icon">✅</span>
                    <span>On-site Ultrasound</span>
                  </div>
                  <div className="womenshealth-clinic-feature">
                    <span className="womenshealth-clinic-icon">✅</span>
                    <span>Minimally Invasive OR</span>
                  </div>
                  <div className="womenshealth-clinic-feature">
                    <span className="womenshealth-clinic-icon">✅</span>
                    <span>Laboratory Services</span>
                  </div>
                  <div className="womenshealth-clinic-feature">
                    <span className="womenshealth-clinic-icon">✅</span>
                    <span>Private Consultation Rooms</span>
                  </div>
                </div>
              </div>
              
              <div className="womenshealth-contact-details">
                <div className="womenshealth-contact-item">
                  <span className="womenshealth-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>123 Women's Health Plaza, Suite 400</p>
                  </div>
                </div>
                
                <div className="womenshealth-contact-item">
                  <span className="womenshealth-contact-icon">📞</span>
                  <div>
                    <h4>Contact Number</h4>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="womenshealth-contact-item">
                  <span className="womenshealth-contact-icon">🕒</span>
                  <div>
                    <h4>Clinic Hours</h4>
                    <p>Mon-Fri: 8am-7pm | Sat: 9am-4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="womenshealth-insurance">
                <h4 className="womenshealth-insurance-title">Insurance & Payment</h4>
                <div className="womenshealth-insurance-info">
                  <div className="womenshealth-insurance-item">
                    <span className="womenshealth-insurance-icon">💳</span>
                    <span>Most major insurance plans accepted</span>
                  </div>
                  <div className="womenshealth-insurance-item">
                    <span className="womenshealth-insurance-icon">💰</span>
                    <span>Flexible payment plans available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="womenshealth-footer">
        <div className="womenshealth-footer-container">
          <div className="womenshealth-footer-main">
            <div className="womenshealth-footer-brand">
              <div className="womenshealth-footer-logo">
                <span className="womenshealth-footer-icon">🌸</span>
                <div>
                  <h3 className="womenshealth-footer-title">Women's Health Center</h3>
                  <p className="womenshealth-footer-tagline">Empowering Women's Wellness</p>
                </div>
              </div>
              <p className="womenshealth-footer-description">
                Providing exceptional gynecological care with compassion, expertise, and dedication to women's health since 2000.
              </p>
              
              <div className="womenshealth-footer-social">
                <a href="#" className="womenshealth-social-link" aria-label="Facebook">
                  <span className="womenshealth-social-icon">📘</span>
                </a>
                <a href="#" className="womenshealth-social-link" aria-label="Instagram">
                  <span className="womenshealth-social-icon">📷</span>
                </a>
                <a href="#" className="womenshealth-social-link" aria-label="Twitter">
                  <span className="womenshealth-social-icon">🐦</span>
                </a>
                <a href="#" className="womenshealth-social-link" aria-label="YouTube">
                  <span className="womenshealth-social-icon">📺</span>
                </a>
              </div>
            </div>
            
            <div className="womenshealth-footer-links">
              <div className="womenshealth-footer-column">
                <h4 className="womenshealth-column-title">Quick Links</h4>
                <a href="#home" className="womenshealth-footer-link">Home</a>
                <a href="#services" className="womenshealth-footer-link">Services</a>
                <a href="#conditions" className="womenshealth-footer-link">Conditions</a>
                <a href="#doctors" className="womenshealth-footer-link">Our Doctors</a>
                <a href="#testimonials" className="womenshealth-footer-link">Patient Stories</a>
              </div>
              
              <div className="womenshealth-footer-column">
                <h4 className="womenshealth-column-title">Women's Health</h4>
                <a href="#" className="womenshealth-footer-link">Pregnancy Care</a>
                <a href="#" className="womenshealth-footer-link">Menopause Management</a>
                <a href="#" className="womenshealth-footer-link">Fertility Services</a>
                <a href="#" className="womenshealth-footer-link">Preventive Screenings</a>
                <a href="#" className="womenshealth-footer-link">Surgical Options</a>
              </div>
              
              <div className="womenshealth-footer-column">
                <h4 className="womenshealth-column-title">Contact Info</h4>
                <p className="womenshealth-contact-info">📍 123 Women's Health Plaza</p>
                <p className="womenshealth-contact-info">📞 (555) 123-4567</p>
                <p className="womenshealth-contact-info">✉️ care@womenshealth.example</p>
                <p className="womenshealth-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="womenshealth-footer-bottom">
            <p className="womenshealth-copyright">
              © {new Date().getFullYear()} Women's Health Center. All rights reserved.
            </p>
            <div className="womenshealth-footer-legal">
              <a href="#" className="womenshealth-legal-link">Privacy Policy</a>
              <a href="#" className="womenshealth-legal-link">Terms of Service</a>
              <a href="#" className="womenshealth-legal-link">Patient Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WomenHealthCare;