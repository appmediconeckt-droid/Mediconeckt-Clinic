import React, { useState } from 'react';
import './EyeCareSpecialists.css';

const EyeCareSpecialists = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const services = [
    { id: 1, name: 'Comprehensive Eye Exam', icon: '👁️', color: '#4F46E5' },
    { id: 2, name: 'Cataract Surgery', icon: '🔍', color: '#10B981' },
    { id: 3, name: 'LASIK Vision Correction', icon: '✨', color: '#8B5CF6' },
    { id: 4, name: 'Glaucoma Treatment', icon: '💎', color: '#EF4444' },
    { id: 5, name: 'Retina Care', icon: '🎯', color: '#F59E0B' },
    { id: 6, name: 'Pediatric Ophthalmology', icon: '👶', color: '#EC4899' },
    { id: 7, name: 'Diabetic Eye Care', icon: '🩺', color: '#06B6D4' },
    { id: 8, name: 'Contact Lens Fitting', icon: '👓', color: '#84CC16' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cataract & Refractive Surgeon', experience: '18 years', image: '👩‍⚕️', education: 'MD, FACS' },
    { id: 2, name: 'Dr. Michael Rodriguez', specialty: 'Retina Specialist', experience: '15 years', image: '👨‍⚕️', education: 'MD, PhD' },
    { id: 3, name: 'Dr. Priya Patel', specialty: 'Pediatric Ophthalmologist', experience: '12 years', image: '👩‍⚕️', education: 'MD, FAAP' }
  ];

  const testimonials = [
    { id: 1, name: 'Robert Johnson', treatment: 'Cataract Surgery', text: 'My vision is crystal clear again! The entire process was smooth and professional.', rating: 5, age: 72 },
    { id: 2, name: 'Emma Wilson', treatment: 'LASIK Surgery', text: 'Life-changing experience. No more glasses after 20 years!', rating: 5, age: 38 },
    { id: 3, name: 'David Kim', treatment: 'Glaucoma Treatment', text: 'Excellent care. My eye pressure is perfectly controlled now.', rating: 4, age: 55 }
  ];

  const technologies = [
    { id: 1, name: 'Optical Coherence Tomography', desc: 'Advanced retinal imaging' },
    { id: 2, name: 'Femtosecond Laser', desc: 'Blade-free cataract surgery' },
    { id: 3, name: 'Wavefront-Guided LASIK', desc: 'Custom vision correction' },
    { id: 4, name: 'Digital Visual Field', desc: 'Glaucoma monitoring' }
  ];

  const stats = [
    { number: '50,000+', label: 'Successful Surgeries' },
    { number: '98%', label: 'Patient Satisfaction' },
    { number: '25+', label: 'Years Experience' },
    { number: '15+', label: 'Specialized Doctors' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your appointment request. Our team will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="eyecare-container">
      {/* Navigation */}
      <nav className="eyecare-navbar">
        <div className="eyecare-nav-container">
          <div className="eyecare-logo">
            <span className="eyecare-logo-icon">👁️</span>
            <div className="eyecare-logo-text">
              <h1 className="eyecare-logo-title">VisionCare Specialists</h1>
              <p className="eyecare-logo-subtitle">Advanced Eye Care Center</p>
            </div>
          </div>
          
          <button 
            className={`eyecare-menu-btn ${menuOpen ? 'eyecare-menu-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="eyecare-menu-line"></span>
            <span className="eyecare-menu-line"></span>
            <span className="eyecare-menu-line"></span>
          </button>
          
          <div className={`eyecare-nav-menu ${menuOpen ? 'eyecare-nav-visible' : ''}`}>
            <ul className="eyecare-nav-list">
              <li><a href="#home" className="eyecare-nav-item" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#services" className="eyecare-nav-item" onClick={() => setMenuOpen(false)}>Services</a></li>
              <li><a href="#doctors" className="eyecare-nav-item" onClick={() => setMenuOpen(false)}>Doctors</a></li>
              <li><a href="#technology" className="eyecare-nav-item" onClick={() => setMenuOpen(false)}>Technology</a></li>
              <li><a href="#testimonials" className="eyecare-nav-item" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
              <li><a href="#contact" className="eyecare-nav-cta" onClick={() => setMenuOpen(false)}>Book Eye Exam</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="eyecare-hero" id="home">
        <div className="eyecare-hero-bg">
          <div className="eyecare-hero-pattern"></div>
          <div className="eyecare-hero-glow"></div>
        </div>
        
        <div className="eyecare-hero-content">
          <div className="eyecare-hero-text">
            <span className="eyecare-hero-badge">Advanced Eye Care</span>
            <h2 className="eyecare-hero-title">See the World with Clarity</h2>
            <p className="eyecare-hero-description">
              World-class ophthalmology care with cutting-edge technology. From routine eye exams to complex surgeries, we're here for your vision health.
            </p>
            <div className="eyecare-hero-actions">
              <a href="#contact" className="eyecare-btn eyecare-btn-primary">
                <span className="eyecare-btn-icon">📅</span>
                Book Eye Exam
              </a>
              <a href="#services" className="eyecare-btn eyecare-btn-outline">
                <span className="eyecare-btn-icon">👁️</span>
                View Services
              </a>
            </div>
          </div>
          
          <div className="eyecare-hero-visual">
            <div className="eyecare-visual-main">
              <div className="eyecare-visual-circle eyecare-circle-1">
                <span className="eyecare-circle-icon">👓</span>
              </div>
              <div className="eyecare-visual-circle eyecare-circle-2">
                <span className="eyecare-circle-icon">🔬</span>
              </div>
              <div className="eyecare-visual-circle eyecare-circle-3">
                <span className="eyecare-circle-icon">✨</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="eyecare-hero-stats">
          {stats.map((stat, index) => (
            <div className="eyecare-stat-card" key={index}>
              <div className="eyecare-stat-content">
                <span className="eyecare-stat-number">{stat.number}</span>
                <span className="eyecare-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="eyecare-services" id="services">
        <div className="eyecare-section-header">
          <span className="eyecare-section-badge">Our Services</span>
          <h2 className="eyecare-section-title">Comprehensive Eye Care</h2>
          <p className="eyecare-section-subtitle">From routine checkups to advanced surgical procedures</p>
        </div>
        
        <div className="eyecare-services-grid">
          {services.map(service => (
            <div className="eyecare-service-card" key={service.id}>
              <div 
                className="eyecare-service-icon-container"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span 
                  className="eyecare-service-icon"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="eyecare-service-name">{service.name}</h3>
              <p className="eyecare-service-description">
                Expert diagnosis and treatment using the latest technology and techniques.
              </p>
              <a href="#contact" className="eyecare-service-link">
                Learn More
                <span className="eyecare-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="eyecare-technology" id="technology">
        <div className="eyecare-tech-container">
          <div className="eyecare-tech-visual">
            <div className="eyecare-tech-display">
              <div className="eyecare-tech-screen">
                <span className="eyecare-tech-icon">🔬</span>
                <div className="eyecare-tech-glow"></div>
              </div>
              <div className="eyecare-tech-base"></div>
            </div>
          </div>
          
          <div className="eyecare-tech-content">
            <span className="eyecare-tech-badge">Advanced Technology</span>
            <h2 className="eyecare-tech-title">State-of-the-Art Diagnostic Equipment</h2>
            <p className="eyecare-tech-description">
              We invest in the latest ophthalmic technology to ensure accurate diagnoses and optimal treatment outcomes.
            </p>
            
            <div className="eyecare-tech-list">
              {technologies.map(tech => (
                <div className="eyecare-tech-item" key={tech.id}>
                  <div className="eyecare-tech-marker"></div>
                  <div>
                    <h4 className="eyecare-tech-name">{tech.name}</h4>
                    <p className="eyecare-tech-desc">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="eyecare-doctors" id="doctors">
        <div className="eyecare-section-header">
          <span className="eyecare-section-badge">Meet Our Specialists</span>
          <h2 className="eyecare-section-title">Board-Certified Ophthalmologists</h2>
          <p className="eyecare-section-subtitle">Expert care from highly trained eye specialists</p>
        </div>
        
        <div className="eyecare-doctors-grid">
          {doctors.map(doctor => (
            <div className="eyecare-doctor-card" key={doctor.id}>
              <div className="eyecare-doctor-header">
                <div className="eyecare-doctor-image">
                  <span className="eyecare-doctor-avatar">{doctor.image}</span>
                  <div className="eyecare-doctor-badge">
                    <span className="eyecare-badge-icon">⭐</span>
                    Top Rated
                  </div>
                </div>
                <div className="eyecare-doctor-info">
                  <h3 className="eyecare-doctor-name">{doctor.name}</h3>
                  <p className="eyecare-doctor-education">{doctor.education}</p>
                  <p className="eyecare-doctor-specialty">{doctor.specialty}</p>
                  <div className="eyecare-doctor-exp">
                    <span className="eyecare-exp-icon">📅</span>
                    <span>{doctor.experience} Experience</span>
                  </div>
                </div>
              </div>
              
              <div className="eyecare-doctor-features">
                <div className="eyecare-doctor-feature">
                  <span className="eyecare-feature-icon">✅</span>
                  <span>Fellowship Trained</span>
                </div>
                <div className="eyecare-doctor-feature">
                  <span className="eyecare-feature-icon">✅</span>
                  <span>Published Researcher</span>
                </div>
                <div className="eyecare-doctor-feature">
                  <span className="eyecare-feature-icon">✅</span>
                  <span>Patient-Centered Care</span>
                </div>
              </div>
              
              <a href="#contact" className="eyecare-doctor-consult">
                Consult with {doctor.name.split(' ')[1]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="eyecare-testimonials" id="testimonials">
        <div className="eyecare-testimonials-container">
          <div className="eyecare-testimonials-header">
            <span className="eyecare-testimonials-badge">Patient Stories</span>
            <h2 className="eyecare-testimonials-title">Restoring Vision, Changing Lives</h2>
            <p className="eyecare-testimonials-subtitle">See what our patients have to say about their experience</p>
          </div>
          
          <div className="eyecare-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="eyecare-testimonial-card" key={testimonial.id}>
                <div className="eyecare-testimonial-header">
                  <div className="eyecare-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`eyecare-rating-star ${i < testimonial.rating ? 'eyecare-star-filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="eyecare-testimonial-treatment">
                    {testimonial.treatment}
                  </div>
                </div>
                
                <p className="eyecare-testimonial-text">"{testimonial.text}"</p>
                
                <div className="eyecare-testimonial-author">
                  <div className="eyecare-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="eyecare-author-name">{testimonial.name}</h4>
                    <p className="eyecare-author-age">Age {testimonial.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="eyecare-appointment" id="contact">
        <div className="eyecare-appointment-container">
          <div className="eyecare-appointment-form">
            <div className="eyecare-form-header">
              <h2 className="eyecare-form-title">Schedule Your Eye Exam</h2>
              <p className="eyecare-form-subtitle">Take the first step towards better vision</p>
            </div>
            
            <form onSubmit={handleSubmit} className="eyecare-booking-form">
              <div className="eyecare-form-row">
                <div className="eyecare-form-group">
                  <label className="eyecare-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="eyecare-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="eyecare-form-group">
                  <label className="eyecare-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="eyecare-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="eyecare-form-row">
                <div className="eyecare-form-group">
                  <label className="eyecare-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="eyecare-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="eyecare-form-group">
                  <label className="eyecare-form-label">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="eyecare-form-select"
                    required
                  >
                    <option value="">Select service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="eyecare-form-group">
                <label className="eyecare-form-label">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="eyecare-form-input"
                  required
                />
              </div>
              
              <div className="eyecare-form-group">
                <label className="eyecare-form-label">Additional Notes</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="eyecare-form-textarea"
                  placeholder="Tell us about your eye concerns or questions..."
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="eyecare-btn eyecare-btn-submit">
                <span className="eyecare-submit-icon">👁️</span>
                Request Appointment
              </button>
              
              <p className="eyecare-form-notice">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          </div>
          
          <div className="eyecare-appointment-info">
            <div className="eyecare-info-card">
              <div className="eyecare-info-header">
                <h3 className="eyecare-info-title">Why Choose VisionCare?</h3>
                <p className="eyecare-info-subtitle">Excellence in eye care since 1998</p>
              </div>
              
              <div className="eyecare-info-features">
                <div className="eyecare-info-feature">
                  <div className="eyecare-feature-icon">
                    <span>🏆</span>
                  </div>
                  <div>
                    <h4>Award-Winning Care</h4>
                    <p>Recognized for excellence in ophthalmology</p>
                  </div>
                </div>
                
                <div className="eyecare-info-feature">
                  <div className="eyecare-feature-icon">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4>Same-Day Appointments</h4>
                    <p>Urgent eye care when you need it most</p>
                  </div>
                </div>
                
                <div className="eyecare-info-feature">
                  <div className="eyecare-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Treatment</h4>
                    <p>Customized care plans for each patient</p>
                  </div>
                </div>
              </div>
              
              <div className="eyecare-contact-details">
                <div className="eyecare-contact-item">
                  <span className="eyecare-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>123 Vision Street, Eye Care District</p>
                  </div>
                </div>
                
                <div className="eyecare-contact-item">
                  <span className="eyecare-contact-icon">📞</span>
                  <div>
                    <h4>Emergency Line</h4>
                    <p>(555) 123-4567 (24/7 Available)</p>
                  </div>
                </div>
                
                <div className="eyecare-contact-item">
                  <span className="eyecare-contact-icon">🕒</span>
                  <div>
                    <h4>Clinic Hours</h4>
                    <p>Mon-Fri: 8am-7pm | Sat: 9am-4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="eyecare-insurance">
                <h4 className="eyecare-insurance-title">Insurance Accepted</h4>
                <div className="eyecare-insurance-badges">
                  <span className="eyecare-insurance-badge">Blue Cross</span>
                  <span className="eyecare-insurance-badge">Aetna</span>
                  <span className="eyecare-insurance-badge">Medicare</span>
                  <span className="eyecare-insurance-badge">UnitedHealth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="eyecare-footer">
        <div className="eyecare-footer-container">
          <div className="eyecare-footer-main">
            <div className="eyecare-footer-brand">
              <div className="eyecare-footer-logo">
                <span className="eyecare-footer-icon">👁️</span>
                <div>
                  <h3 className="eyecare-footer-title">VisionCare Specialists</h3>
                  <p className="eyecare-footer-tagline">Clear Vision for Life</p>
                </div>
              </div>
              <p className="eyecare-footer-description">
                Providing exceptional eye care with advanced technology and compassionate expertise since 1998.
              </p>
              
              <div className="eyecare-footer-social">
                <a href="#" className="eyecare-social-link" aria-label="Facebook">
                  <span className="eyecare-social-icon">📘</span>
                </a>
                <a href="#" className="eyecare-social-link" aria-label="Instagram">
                  <span className="eyecare-social-icon">📷</span>
                </a>
                <a href="#" className="eyecare-social-link" aria-label="Twitter">
                  <span className="eyecare-social-icon">🐦</span>
                </a>
                <a href="#" className="eyecare-social-link" aria-label="YouTube">
                  <span className="eyecare-social-icon">📺</span>
                </a>
              </div>
            </div>
            
            <div className="eyecare-footer-links">
              <div className="eyecare-footer-column">
                <h4 className="eyecare-column-title">Quick Links</h4>
                <a href="#home" className="eyecare-footer-link">Home</a>
                <a href="#services" className="eyecare-footer-link">Services</a>
                <a href="#doctors" className="eyecare-footer-link">Our Doctors</a>
                <a href="#technology" className="eyecare-footer-link">Technology</a>
                <a href="#testimonials" className="eyecare-footer-link">Patient Stories</a>
              </div>
              
              <div className="eyecare-footer-column">
                <h4 className="eyecare-column-title">Services</h4>
                <a href="#" className="eyecare-footer-link">Eye Exams</a>
                <a href="#" className="eyecare-footer-link">Cataract Surgery</a>
                <a href="#" className="eyecare-footer-link">LASIK Surgery</a>
                <a href="#" className="eyecare-footer-link">Glaucoma Care</a>
                <a href="#" className="eyecare-footer-link">Retina Services</a>
              </div>
              
              <div className="eyecare-footer-column">
                <h4 className="eyecare-column-title">Contact Us</h4>
                <p className="eyecare-contact-info">📍 123 Vision Street</p>
                <p className="eyecare-contact-info">📞 (555) 123-4567</p>
                <p className="eyecare-contact-info">✉️ hello@visioncare.example</p>
                <p className="eyecare-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="eyecare-footer-bottom">
            <p className="eyecare-copyright">
              © {new Date().getFullYear()} VisionCare Specialists. All rights reserved.
            </p>
            <div className="eyecare-footer-legal">
              <a href="#" className="eyecare-legal-link">Privacy Policy</a>
              <a href="#" className="eyecare-legal-link">Terms of Service</a>
              <a href="#" className="eyecare-legal-link">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EyeCareSpecialists;