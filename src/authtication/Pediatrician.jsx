import React, { useState } from 'react';
import './PediatricCareClinic.css';

const PediatricCareClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    concern: '',
    date: '',
    message: ''
  });

  const services = [
    { id: 1, name: 'Well-Baby Checkups', icon: '👶', color: '#3B82F6', desc: 'Regular health monitoring and vaccinations' },
    { id: 2, name: 'Vaccination Schedule', icon: '💉', color: '#10B981', desc: 'Complete immunization program' },
    { id: 3, name: 'Growth Monitoring', icon: '📈', color: '#8B5CF6', desc: 'Tracking developmental milestones' },
    { id: 4, name: 'Childhood Illness', icon: '🤒', color: '#EF4444', desc: 'Treatment for common childhood diseases' },
    { id: 5, name: 'Nutrition Counseling', icon: '🥗', color: '#F59E0B', desc: 'Healthy eating habits for children' },
    { id: 6, name: 'Developmental Screening', icon: '🎯', color: '#EC4899', desc: 'Early detection of delays' },
    { id: 7, name: 'Allergy Testing', icon: '🌸', color: '#06B6D4', desc: 'Comprehensive allergy management' },
    { id: 8, name: 'Emergency Pediatric Care', icon: '🚑', color: '#84CC16', desc: '24/7 urgent care for children' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Emily Johnson', specialty: 'Neonatology Specialist', experience: '18 years', image: '👩‍⚕️', education: 'MD, FAAP' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatric Cardiology', experience: '15 years', image: '👨‍⚕️', education: 'MD, FACC' },
    { id: 3, name: 'Dr. Sarah Williams', specialty: 'Developmental Pediatrics', experience: '12 years', image: '👩‍⚕️', education: 'MD, FAAP' }
  ];

  const testimonials = [
    { id: 1, name: 'The Patel Family', child: 'Aarav (3 years)', text: 'The care and attention our son receives is exceptional. We trust them completely!', rating: 5 },
    { id: 2, name: 'Lisa Thompson', child: 'Emma (5 years)', text: 'Patient, kind, and incredibly knowledgeable. Our go-to pediatrician for 5 years!', rating: 5 },
    { id: 3, name: 'Carlos Rodriguez', child: 'Mateo (2 years)', text: 'Emergency care saved our son. Forever grateful for their quick response.', rating: 4 }
  ];

  const milestones = [
    { age: '0-3 months', icon: '🍼', title: 'Newborn Care', desc: 'Feeding, sleeping patterns, and early development' },
    { age: '4-6 months', icon: '👶', title: 'First Vaccinations', desc: 'Initial immunizations and health screenings' },
    { age: '7-12 months', icon: '🚼', title: 'Crawling & Sitting', desc: 'Motor skills development and nutrition' },
    { age: '1-2 years', icon: '👣', title: 'First Steps', desc: 'Walking, talking, and social development' }
  ];

  const stats = [
    { number: '15,000+', label: 'Healthy Children' },
    { number: '99%', label: 'Vaccination Rate' },
    { number: '24/7', label: 'Emergency Care' },
    { number: '25+', label: 'Years Experience' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your appointment request. Our pediatric team will contact you within 24 hours.');
    setFormData({
      parentName: '',
      childName: '',
      email: '',
      phone: '',
      childAge: '',
      concern: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="pediatric-container">
      {/* Navigation */}
      <nav className="pediatric-navbar">
        <div className="pediatric-nav-container">
          <div className="pediatric-logo">
            <span className="pediatric-logo-icon">👶</span>
            <div className="pediatric-logo-text">
              <h1 className="pediatric-logo-title">LittleLife Pediatrics</h1>
              <p className="pediatric-logo-subtitle">Caring for Your Child's Health</p>
            </div>
          </div>
          
          <button 
            className={`pediatric-menu-btn ${menuOpen ? 'pediatric-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="pediatric-menu-line pediatric-line-1"></span>
            <span className="pediatric-menu-line pediatric-line-2"></span>
            <span className="pediatric-menu-line pediatric-line-3"></span>
          </button>
          
          <div className={`pediatric-nav-menu ${menuOpen ? 'pediatric-nav-visible' : ''}`}>
            <ul className="pediatric-nav-list">
              <li><a href="#home" className="pediatric-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="pediatric-nav-link" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#milestones" className="pediatric-nav-link" onClick={() => setMenuOpen(false)}>Milestones</a></li>
              <li><a href="#doctors" className="pediatric-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#testimonials" className="pediatric-nav-link" onClick={() => setMenuOpen(false)}>Families</a></li>
              <li><a href="#contact" className="pediatric-nav-cta" onClick={() => setMenuOpen(false)}>Book Checkup</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pediatric-hero" id="home">
        <div className="pediatric-hero-background">
          <div className="pediatric-hero-gradient"></div>
          <div className="pediatric-hero-pattern"></div>
        </div>
        
        <div className="pediatric-hero-content">
          <div className="pediatric-hero-text">
            <span className="pediatric-hero-badge">Pediatric Excellence Since 1998</span>
            <h2 className="pediatric-hero-title">Growing Healthy, Happy Children Together</h2>
            <p className="pediatric-hero-description">
              Comprehensive pediatric care with compassion and expertise. From newborn care to adolescent health, we're here for every stage of your child's development.
            </p>
            <div className="pediatric-hero-actions">
              <a href="#contact" className="pediatric-btn pediatric-btn-primary">
                <span className="pediatric-btn-icon">📅</span>
                Book Pediatric Checkup
              </a>
              <a href="#services" className="pediatric-btn pediatric-btn-secondary">
                <span className="pediatric-btn-icon">👶</span>
                View Services
              </a>
            </div>
          </div>
          
          <div className="pediatric-hero-visual">
            <div className="pediatric-visual-main">
              <div className="pediatric-visual-element pediatric-element-1">
                <span className="pediatric-element-icon">👶</span>
              </div>
              <div className="pediatric-visual-element pediatric-element-2">
                <span className="pediatric-element-icon">🩺</span>
              </div>
              <div className="pediatric-visual-element pediatric-element-3">
                <span className="pediatric-element-icon">⭐</span>
              </div>
              <div className="pediatric-visual-element pediatric-element-4">
                <span className="pediatric-element-icon">💖</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pediatric-hero-stats">
          {stats.map((stat, index) => (
            <div className="pediatric-stat-card" key={index}>
              <div className="pediatric-stat-content">
                <span className="pediatric-stat-number">{stat.number}</span>
                <span className="pediatric-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="pediatric-services" id="services">
        <div className="pediatric-section-header">
          <span className="pediatric-section-badge">Our Services</span>
          <h2 className="pediatric-section-title">Comprehensive Pediatric Care</h2>
          <p className="pediatric-section-subtitle">Complete healthcare for children from birth through adolescence</p>
        </div>
        
        <div className="pediatric-services-grid">
          {services.map(service => (
            <div className="pediatric-service-card" key={service.id}>
              <div 
                className="pediatric-service-icon-wrapper"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="pediatric-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="pediatric-service-name">{service.name}</h3>
              <p className="pediatric-service-description">{service.desc}</p>
              <a href="#contact" className="pediatric-service-link">
                Learn More
                <span className="pediatric-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Section */}
      <section className="pediatric-milestones" id="milestones">
        <div className="pediatric-milestones-container">
          <div className="pediatric-milestones-content">
            <span className="pediatric-milestones-badge">Child Development</span>
            <h2 className="pediatric-milestones-title">Tracking Growth & Milestones</h2>
            <p className="pediatric-milestones-description">
              We monitor your child's development through every important stage, ensuring they reach their full potential.
            </p>
            
            <div className="pediatric-milestones-timeline">
              {milestones.map((milestone, index) => (
                <div className="pediatric-milestone-item" key={index}>
                  <div className="pediatric-milestone-icon">
                    {milestone.icon}
                  </div>
                  <div className="pediatric-milestone-content">
                    <div className="pediatric-milestone-age">{milestone.age}</div>
                    <h4 className="pediatric-milestone-title">{milestone.title}</h4>
                    <p className="pediatric-milestone-desc">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pediatric-milestones-visual">
            <div className="pediatric-growth-chart">
              <div className="pediatric-chart-header">
                <span className="pediatric-chart-icon">📊</span>
                <h3 className="pediatric-chart-title">Growth Monitoring</h3>
              </div>
              <div className="pediatric-chart-content">
                <div className="pediatric-chart-metrics">
                  <div className="pediatric-chart-metric">
                    <span className="pediatric-metric-label">Height</span>
                    <div className="pediatric-metric-bar pediatric-bar-1"></div>
                  </div>
                  <div className="pediatric-chart-metric">
                    <span className="pediatric-metric-label">Weight</span>
                    <div className="pediatric-metric-bar pediatric-bar-2"></div>
                  </div>
                  <div className="pediatric-chart-metric">
                    <span className="pediatric-metric-label">Development</span>
                    <div className="pediatric-metric-bar pediatric-bar-3"></div>
                  </div>
                </div>
                <div className="pediatric-chart-legend">
                  <div className="pediatric-legend-item">
                    <span className="pediatric-legend-color pediatric-color-1"></span>
                    <span>At Birth</span>
                  </div>
                  <div className="pediatric-legend-item">
                    <span className="pediatric-legend-color pediatric-color-2"></span>
                    <span>6 Months</span>
                  </div>
                  <div className="pediatric-legend-item">
                    <span className="pediatric-legend-color pediatric-color-3"></span>
                    <span>1 Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="pediatric-doctors" id="doctors">
        <div className="pediatric-section-header">
          <span className="pediatric-section-badge">Meet Our Team</span>
          <h2 className="pediatric-section-title">Board-Certified Pediatricians</h2>
          <p className="pediatric-section-subtitle">Experienced specialists dedicated to children's health</p>
        </div>
        
        <div className="pediatric-doctors-grid">
          {doctors.map(doctor => (
            <div className="pediatric-doctor-card" key={doctor.id}>
              <div className="pediatric-doctor-header">
                <div className="pediatric-doctor-image">
                  <div className="pediatric-doctor-avatar">
                    <span className="pediatric-avatar-icon">{doctor.image}</span>
                  </div>
                  <div className="pediatric-doctor-badge">
                    <span className="pediatric-badge-icon">⭐</span>
                    Child-Friendly
                  </div>
                </div>
                
                <div className="pediatric-doctor-info">
                  <h3 className="pediatric-doctor-name">{doctor.name}</h3>
                  <p className="pediatric-doctor-education">{doctor.education}</p>
                  <p className="pediatric-doctor-specialty">{doctor.specialty}</p>
                  
                  <div className="pediatric-doctor-details">
                    <div className="pediatric-doctor-detail">
                      <span className="pediatric-detail-icon">📅</span>
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="pediatric-doctor-detail">
                      <span className="pediatric-detail-icon">👨‍👩‍👧‍👦</span>
                      <span>Family-Centered Care</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pediatric-doctor-expertise">
                <h4>Specialized Training</h4>
                <div className="pediatric-expertise-tags">
                  <span className="pediatric-expertise-tag">Pediatric Emergency</span>
                  <span className="pediatric-expertise-tag">Child Psychology</span>
                  <span className="pediatric-expertise-tag">Nutrition Science</span>
                </div>
              </div>
              
              <div className="pediatric-doctor-quote">
                <span className="pediatric-quote-icon">💬</span>
                <p className="pediatric-quote-text">"Every child deserves the best start in life. We're here to make that happen."</p>
              </div>
              
              <a href="#contact" className="pediatric-doctor-consult">
                Schedule with Dr. {doctor.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="pediatric-testimonials" id="testimonials">
        <div className="pediatric-testimonials-container">
          <div className="pediatric-testimonials-header">
            <span className="pediatric-testimonials-badge">Happy Families</span>
            <h2 className="pediatric-testimonials-title">Trusted by Thousands of Families</h2>
            <p className="pediatric-testimonials-subtitle">See why parents choose LittleLife Pediatrics</p>
          </div>
          
          <div className="pediatric-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="pediatric-testimonial-card" key={testimonial.id}>
                <div className="pediatric-testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`pediatric-rating-star ${i < testimonial.rating ? 'pediatric-star-active' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="pediatric-testimonial-text">"{testimonial.text}"</p>
                
                <div className="pediatric-testimonial-family">
                  <div className="pediatric-family-avatar">
                    <span className="pediatric-family-icon">👨‍👩‍👧</span>
                  </div>
                  <div className="pediatric-family-info">
                    <h4 className="pediatric-family-name">{testimonial.name}</h4>
                    <p className="pediatric-family-child">{testimonial.child}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="pediatric-appointment" id="contact">
        <div className="pediatric-appointment-container">
          <div className="pediatric-appointment-form">
            <div className="pediatric-form-header">
              <h2 className="pediatric-form-title">Schedule Your Child's Checkup</h2>
              <p className="pediatric-form-subtitle">Complete care for your little one's health journey</p>
            </div>
            
            <form onSubmit={handleSubmit} className="pediatric-booking-form">
              <div className="pediatric-form-row">
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Parent's Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="pediatric-form-input"
                    placeholder="Enter parent's name"
                    required
                  />
                </div>
                
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Child's Name</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    className="pediatric-form-input"
                    placeholder="Enter child's name"
                    required
                  />
                </div>
              </div>
              
              <div className="pediatric-form-row">
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pediatric-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pediatric-form-input"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="pediatric-form-row">
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Child's Age</label>
                  <select
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    className="pediatric-form-select"
                    required
                  >
                    <option value="">Select age</option>
                    <option value="0-1">Newborn (0-1 month)</option>
                    <option value="1-12">Infant (1-12 months)</option>
                    <option value="1-3">Toddler (1-3 years)</option>
                    <option value="3-5">Preschool (3-5 years)</option>
                    <option value="5-12">School Age (5-12 years)</option>
                    <option value="12-18">Adolescent (12-18 years)</option>
                  </select>
                </div>
                
                <div className="pediatric-form-group">
                  <label className="pediatric-form-label">Health Concern</label>
                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    className="pediatric-form-select"
                    required
                  >
                    <option value="">Select concern</option>
                    <option value="routine">Routine Checkup</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="sickness">Illness/Fever</option>
                    <option value="allergy">Allergy/Respiratory</option>
                    <option value="development">Development Check</option>
                    <option value="nutrition">Nutrition Advice</option>
                    <option value="emergency">Emergency Care</option>
                  </select>
                </div>
              </div>
              
              <div className="pediatric-form-group">
                <label className="pediatric-form-label">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="pediatric-form-input"
                  required
                />
              </div>
              
              <div className="pediatric-form-group">
                <label className="pediatric-form-label">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="pediatric-form-textarea"
                  placeholder="Tell us about your child's health history, symptoms, or specific concerns..."
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="pediatric-btn pediatric-btn-submit">
                <span className="pediatric-submit-icon">👶</span>
                Request Pediatric Appointment
              </button>
              
              <p className="pediatric-form-notice">
                We'll contact you within 24 hours to confirm your appointment. Emergency? Call (555) 123-4567 immediately.
              </p>
            </form>
          </div>
          
          <div className="pediatric-appointment-info">
            <div className="pediatric-info-card">
              <div className="pediatric-info-header">
                <h3 className="pediatric-info-title">Why Choose LittleLife?</h3>
                <p className="pediatric-info-subtitle">Nurturing health from day one</p>
              </div>
              
              <div className="pediatric-info-features">
                <div className="pediatric-info-feature">
                  <div className="pediatric-feature-icon">
                    <span>🏥</span>
                  </div>
                  <div>
                    <h4>Child-Friendly Environment</h4>
                    <p>Colorful, welcoming spaces designed for children's comfort</p>
                  </div>
                </div>
                
                <div className="pediatric-info-feature">
                  <div className="pediatric-feature-icon">
                    <span>⏰</span>
                  </div>
                  <div>
                    <h4>Minimal Wait Times</h4>
                    <p>Efficient scheduling to reduce stress for children and parents</p>
                  </div>
                </div>
                
                <div className="pediatric-info-feature">
                  <div className="pediatric-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Family-Centered Care</h4>
                    <p>Involving parents in every step of the healthcare journey</p>
                  </div>
                </div>
              </div>
              
              <div className="pediatric-clinic-hours">
                <h4 className="pediatric-hours-title">Clinic Hours</h4>
                <div className="pediatric-hours-grid">
                  <div className="pediatric-hour-item">
                    <span className="pediatric-hour-day">Monday - Friday</span>
                    <span className="pediatric-hour-time">8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="pediatric-hour-item">
                    <span className="pediatric-hour-day">Saturday</span>
                    <span className="pediatric-hour-time">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="pediatric-hour-item">
                    <span className="pediatric-hour-day">Sunday</span>
                    <span className="pediatric-hour-time">Emergency Only</span>
                  </div>
                  <div className="pediatric-hour-item pediatric-emergency">
                    <span className="pediatric-hour-day">24/7 Emergency</span>
                    <span className="pediatric-hour-time">(555) 123-4567</span>
                  </div>
                </div>
              </div>
              
              <div className="pediatric-vaccination">
                <h4 className="pediatric-vaccination-title">Vaccination Schedule</h4>
                <div className="pediatric-vaccination-info">
                  <div className="pediatric-vaccine">
                    <span className="pediatric-vaccine-icon">💉</span>
                    <span>Complete immunization program following CDC guidelines</span>
                  </div>
                  <div className="pediatric-vaccine">
                    <span className="pediatric-vaccine-icon">📋</span>
                    <span>Digital vaccination records and reminders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pediatric-footer">
        <div className="pediatric-footer-container">
          <div className="pediatric-footer-main">
            <div className="pediatric-footer-brand">
              <div className="pediatric-footer-logo">
                <span className="pediatric-footer-icon">👶</span>
                <div>
                  <h3 className="pediatric-footer-title">LittleLife Pediatrics</h3>
                  <p className="pediatric-footer-tagline">Growing Healthy Futures</p>
                </div>
              </div>
              <p className="pediatric-footer-description">
                Providing exceptional pediatric care with compassion, expertise, and dedication to children's health since 1998.
              </p>
              
              <div className="pediatric-footer-social">
                <a href="#" className="pediatric-social-link" aria-label="Facebook">
                  <span className="pediatric-social-icon">📘</span>
                </a>
                <a href="#" className="pediatric-social-link" aria-label="Instagram">
                  <span className="pediatric-social-icon">📷</span>
                </a>
                <a href="#" className="pediatric-social-link" aria-label="Twitter">
                  <span className="pediatric-social-icon">🐦</span>
                </a>
                <a href="#" className="pediatric-social-link" aria-label="YouTube">
                  <span className="pediatric-social-icon">📺</span>
                </a>
              </div>
            </div>
            
            <div className="pediatric-footer-links">
              <div className="pediatric-footer-column">
                <h4 className="pediatric-column-title">Quick Links</h4>
                <a href="#home" className="pediatric-footer-link">Home</a>
                <a href="#services" className="pediatric-footer-link">Services</a>
                <a href="#milestones" className="pediatric-footer-link">Child Development</a>
                <a href="#doctors" className="pediatric-footer-link">Our Doctors</a>
                <a href="#testimonials" className="pediatric-footer-link">Family Stories</a>
              </div>
              
              <div className="pediatric-footer-column">
                <h4 className="pediatric-column-title">Child Health</h4>
                <a href="#" className="pediatric-footer-link">Well-Baby Visits</a>
                <a href="#" className="pediatric-footer-link">Vaccinations</a>
                <a href="#" className="pediatric-footer-link">Nutrition Guide</a>
                <a href="#" className="pediatric-footer-link">Safety Tips</a>
                <a href="#" className="pediatric-footer-link">Common Illnesses</a>
              </div>
              
              <div className="pediatric-footer-column">
                <h4 className="pediatric-column-title">Contact Info</h4>
                <p className="pediatric-contact-info">📍 123 Children's Health Lane</p>
                <p className="pediatric-contact-info">📞 (555) 123-4567</p>
                <p className="pediatric-contact-info">✉️ care@littlelife.example</p>
                <p className="pediatric-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="pediatric-footer-bottom">
            <p className="pediatric-copyright">
              © {new Date().getFullYear()} LittleLife Pediatrics. All rights reserved.
            </p>
            <div className="pediatric-footer-legal">
              <a href="#" className="pediatric-legal-link">Privacy Policy</a>
              <a href="#" className="pediatric-legal-link">Terms of Service</a>
              <a href="#" className="pediatric-legal-link">Patient Rights</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PediatricCareClinic;