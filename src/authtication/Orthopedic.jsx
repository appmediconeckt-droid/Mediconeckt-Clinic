import React, { useState } from 'react';
import './OrthoCareClinic.css';

const OrthoCareClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    condition: '',
    date: '',
    message: ''
  });

  const conditions = [
    { id: 1, name: 'Joint Pain', icon: '🦵', desc: 'Knee, hip, shoulder pain treatment' },
    { id: 2, name: 'Sports Injuries', icon: '🏃', desc: 'Athlete rehabilitation & recovery' },
    { id: 3, name: 'Arthritis', icon: '🧓', desc: 'Osteoarthritis & rheumatoid arthritis' },
    { id: 4, name: 'Fractures', icon: '🦴', desc: 'Bone fracture treatment & care' },
    { id: 5, name: 'Spine Disorders', icon: '📏', desc: 'Back pain & spinal conditions' },
    { id: 6, name: 'Joint Replacement', icon: '⚙️', desc: 'Hip & knee replacement surgery' },
    { id: 7, name: 'Pediatric Orthopedics', icon: '👶', desc: 'Children\'s bone & joint care' },
    { id: 8, name: 'Tendon Injuries', icon: '💪', desc: 'Tendonitis & ligament tears' }
  ];

  const treatments = [
    { id: 1, name: 'Physical Therapy', icon: '🏋️', color: '#3B82F6' },
    { id: 2, name: 'Minimally Invasive Surgery', icon: '🔬', color: '#10B981' },
    { id: 3, name: 'Joint Injections', icon: '💉', color: '#8B5CF6' },
    { id: 4, name: 'PRP Therapy', icon: '🩸', color: '#EF4444' },
    { id: 5, name: 'Arthroscopy', icon: '📹', color: '#F59E0B' },
    { id: 6, name: 'Custom Braces', icon: '🦾', color: '#EC4899' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Michael Chen', specialty: 'Joint Replacement Specialist', exp: '18 years', image: '👨‍⚕️' },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Sports Medicine Expert', exp: '14 years', image: '👩‍⚕️' },
    { id: 3, name: 'Dr. Robert Williams', specialty: 'Spine Surgery Specialist', exp: '22 years', image: '👨‍⚕️' }
  ];

  const testimonials = [
    { id: 1, name: 'John Matthews', treatment: 'Knee Replacement', text: 'I got my mobility back thanks to the amazing team at OrthoCare.', rating: 5, age: '68' },
    { id: 2, name: 'Lisa Rodriguez', treatment: 'Shoulder Surgery', text: 'Professional care and excellent results. Highly recommended!', rating: 5, age: '45' },
    { id: 3, name: 'David Park', treatment: 'Sports Injury Recovery', text: 'Back to playing sports in record time. Thank you!', rating: 4, age: '32' }
  ];

  const stats = [
    { number: '98%', label: 'Surgery Success Rate' },
    { number: '5000+', label: 'Successful Surgeries' },
    { number: '24/7', label: 'Emergency Care' },
    { number: '15+', label: 'Years Experience' }
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
      condition: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="orthocare-container">
      {/* Navigation */}
      <nav className="orthocare-navbar">
        <div className="orthocare-navbar-container">
          <div className="orthocare-logo">
            <span className="orthocare-logo-icon">🦴</span>
            <div>
              <h1 className="orthocare-logo-title">OrthoCare Clinic</h1>
              <p className="orthocare-logo-subtitle">Advanced Orthopedics & Sports Medicine</p>
            </div>
          </div>
          
          <button 
            className="orthocare-menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="orthocare-menu-bar"></span>
            <span className="orthocare-menu-bar"></span>
            <span className="orthocare-menu-bar"></span>
          </button>
          
          <div className={`orthocare-nav-menu ${menuOpen ? 'orthocare-nav-open' : ''}`}>
            <ul className="orthocare-nav-list">
              <li><a href="#home" className="orthocare-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#conditions" className="orthocare-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#treatments" className="orthocare-nav-link" onClick={() => setMenuOpen(false)}>Treatments</a></li>
              <li><a href="#doctors" className="orthocare-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#testimonials" className="orthocare-nav-link" onClick={() => setMenuOpen(false)}>Stories</a></li>
              <li><a href="#contact" className="orthocare-nav-cta" onClick={() => setMenuOpen(false)}>Book Appointment</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="orthocare-hero" id="home">
        <div className="orthocare-hero-background">
          <div className="orthocare-hero-pattern"></div>
        </div>
        <div className="orthocare-hero-content">
          <div className="orthocare-hero-text">
            <h2 className="orthocare-hero-title">Regain Your Mobility, Reclaim Your Life</h2>
            <p className="orthocare-hero-description">Expert orthopedic care for joints, bones, and sports injuries. Advanced treatments with personalized recovery plans.</p>
            <div className="orthocare-hero-actions">
              <a href="#contact" className="orthocare-btn orthocare-btn-primary">Book Consultation</a>
              <a href="#treatments" className="orthocare-btn orthocare-btn-outline">View Treatments</a>
            </div>
          </div>
          <div className="orthocare-hero-image">
            <div className="orthocare-hero-visual">
              <div className="orthocare-visual-element orthocare-visual-1">🏃</div>
              <div className="orthocare-visual-element orthocare-visual-2">🦵</div>
              <div className="orthocare-visual-element orthocare-visual-3">💪</div>
            </div>
          </div>
        </div>
        
        <div className="orthocare-hero-stats">
          {stats.map((stat, index) => (
            <div className="orthocare-stat-item" key={index}>
              <span className="orthocare-stat-number">{stat.number}</span>
              <span className="orthocare-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="orthocare-conditions" id="conditions">
        <div className="orthocare-section-header">
          <span className="orthocare-section-badge">Conditions We Treat</span>
          <h2 className="orthocare-section-title">Comprehensive Orthopedic Care</h2>
          <p className="orthocare-section-subtitle">Expert diagnosis and treatment for all bone and joint conditions</p>
        </div>
        
        <div className="orthocare-conditions-grid">
          {conditions.map(condition => (
            <div className="orthocare-condition-card" key={condition.id}>
              <div className="orthocare-condition-header">
                <span className="orthocare-condition-icon">{condition.icon}</span>
                <h3 className="orthocare-condition-name">{condition.name}</h3>
              </div>
              <p className="orthocare-condition-description">{condition.desc}</p>
              <a href="#contact" className="orthocare-condition-link">
                Learn More
                <span className="orthocare-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments Section */}
      <section className="orthocare-treatments" id="treatments">
        <div className="orthocare-treatments-container">
          <div className="orthocare-treatments-content">
            <div className="orthocare-section-header">
              <span className="orthocare-section-badge">Advanced Solutions</span>
              <h2 className="orthocare-section-title">Modern Treatment Options</h2>
              <p className="orthocare-section-subtitle">State-of-the-art orthopedic treatments for optimal recovery</p>
            </div>
            
            <div className="orthocare-treatments-list">
              {treatments.map(treatment => (
                <div className="orthocare-treatment-item" key={treatment.id}>
                  <div className="orthocare-treatment-icon" style={{ backgroundColor: `${treatment.color}15` }}>
                    <span style={{ color: treatment.color }}>{treatment.icon}</span>
                  </div>
                  <h4 className="orthocare-treatment-name">{treatment.name}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="orthocare-treatments-visual">
            <div className="orthocare-visual-card">
              <div className="orthocare-visual-main">
                <span className="orthocare-visual-icon">🦴</span>
                <h3 className="orthocare-visual-title">Advanced Orthopedic Center</h3>
                <p className="orthocare-visual-text">Modern facilities with cutting-edge technology</p>
              </div>
              <div className="orthocare-visual-features">
                <div className="orthocare-visual-feature">
                  <span className="orthocare-feature-icon">✅</span>
                  <span>Digital X-Ray & MRI</span>
                </div>
                <div className="orthocare-visual-feature">
                  <span className="orthocare-feature-icon">✅</span>
                  <span>Minimally Invasive OR</span>
                </div>
                <div className="orthocare-visual-feature">
                  <span className="orthocare-feature-icon">✅</span>
                  <span>Physical Therapy Gym</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="orthocare-doctors" id="doctors">
        <div className="orthocare-section-header">
          <span className="orthocare-section-badge">Meet Our Team</span>
          <h2 className="orthocare-section-title">Board-Certified Orthopedic Surgeons</h2>
          <p className="orthocare-section-subtitle">Experienced specialists dedicated to your recovery</p>
        </div>
        
        <div className="orthocare-doctors-grid">
          {doctors.map(doctor => (
            <div className="orthocare-doctor-card" key={doctor.id}>
              <div className="orthocare-doctor-image">
                <span className="orthocare-doctor-avatar">{doctor.image}</span>
              </div>
              <div className="orthocare-doctor-info">
                <h3 className="orthocare-doctor-name">{doctor.name}</h3>
                <p className="orthocare-doctor-specialty">{doctor.specialty}</p>
                <div className="orthocare-doctor-exp">
                  <span className="orthocare-exp-icon">📅</span>
                  <span>{doctor.exp} Experience</span>
                </div>
                <div className="orthocare-doctor-details">
                  <div className="orthocare-doctor-detail">
                    <span className="orthocare-detail-icon">🎓</span>
                    <span>Board Certified</span>
                  </div>
                  <div className="orthocare-doctor-detail">
                    <span className="orthocare-detail-icon">⭐</span>
                    <span>Top Rated</span>
                  </div>
                </div>
                <a href="#contact" className="orthocare-doctor-consult">
                  Request Consultation
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="orthocare-testimonials" id="testimonials">
        <div className="orthocare-testimonials-container">
          <div className="orthocare-testimonials-header">
            <h2 className="orthocare-testimonials-title">Patient Success Stories</h2>
            <p className="orthocare-testimonials-subtitle">Real results from our patients</p>
          </div>
          
          <div className="orthocare-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="orthocare-testimonial-card" key={testimonial.id}>
                <div className="orthocare-testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`orthocare-rating-star ${i < testimonial.rating ? 'orthocare-star-active' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="orthocare-testimonial-text">"{testimonial.text}"</p>
                <div className="orthocare-testimonial-author">
                  <div>
                    <h4 className="orthocare-author-name">{testimonial.name}</h4>
                    <p className="orthocare-author-treatment">{testimonial.treatment} • Age {testimonial.age}</p>
                  </div>
                  <div className="orthocare-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="orthocare-appointment" id="contact">
        <div className="orthocare-appointment-container">
          <div className="orthocare-appointment-form">
            <div className="orthocare-form-header">
              <h2 className="orthocare-form-title">Book Your Appointment</h2>
              <p className="orthocare-form-subtitle">Get expert orthopedic consultation today</p>
            </div>
            
            <form onSubmit={handleSubmit} className="orthocare-consult-form">
              <div className="orthocare-form-row">
                <div className="orthocare-form-group">
                  <label className="orthocare-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="orthocare-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="orthocare-form-group">
                  <label className="orthocare-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="orthocare-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="orthocare-form-row">
                <div className="orthocare-form-group">
                  <label className="orthocare-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="orthocare-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="orthocare-form-group">
                  <label className="orthocare-form-label">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="orthocare-form-select"
                    required
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition.id} value={condition.name}>{condition.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="orthocare-form-group">
                <label className="orthocare-form-label">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="orthocare-form-input"
                  required
                />
              </div>
              
              <div className="orthocare-form-group">
                <label className="orthocare-form-label">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="orthocare-form-textarea"
                  placeholder="Tell us about your symptoms or concerns..."
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="orthocare-btn orthocare-btn-submit">
                Request Appointment
              </button>
              
              <p className="orthocare-form-note">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          </div>
          
          <div className="orthocare-appointment-info">
            <div className="orthocare-info-card">
              <h3 className="orthocare-info-title">Why Choose OrthoCare?</h3>
              
              <div className="orthocare-info-features">
                <div className="orthocare-info-feature">
                  <div className="orthocare-feature-icon">
                    <span>🏥</span>
                  </div>
                  <div>
                    <h4>Advanced Surgical Center</h4>
                    <p>State-of-the-art operating rooms with latest technology</p>
                  </div>
                </div>
                
                <div className="orthocare-info-feature">
                  <div className="orthocare-feature-icon">
                    <span>👥</span>
                  </div>
                  <div>
                    <h4>Multidisciplinary Team</h4>
                    <p>Surgeons, physiotherapists, and pain specialists working together</p>
                  </div>
                </div>
                
                <div className="orthocare-info-feature">
                  <div className="orthocare-feature-icon">
                    <span>📋</span>
                  </div>
                  <div>
                    <h4>Personalized Recovery Plans</h4>
                    <p>Customized treatment plans for each patient's needs</p>
                  </div>
                </div>
              </div>
              
              <div className="orthocare-contact-details">
                <div className="orthocare-contact-item">
                  <span className="orthocare-contact-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>123 Medical Center Drive, Suite 400</p>
                  </div>
                </div>
                
                <div className="orthocare-contact-item">
                  <span className="orthocare-contact-icon">📞</span>
                  <div>
                    <h4>Emergency Line</h4>
                    <p>(555) 123-4567 (24/7 Available)</p>
                  </div>
                </div>
                
                <div className="orthocare-contact-item">
                  <span className="orthocare-contact-icon">🕒</span>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon-Fri: 8am-7pm | Sat: 9am-4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="orthocare-footer">
        <div className="orthocare-footer-container">
          <div className="orthocare-footer-main">
            <div className="orthocare-footer-brand">
              <div className="orthocare-footer-logo">
                <span className="orthocare-footer-logo-icon">🦴</span>
                <div>
                  <h3 className="orthocare-footer-title">OrthoCare Clinic</h3>
                  <p className="orthocare-footer-tagline">Movement. Healing. Life.</p>
                </div>
              </div>
              <p className="orthocare-footer-description">
                Providing exceptional orthopedic care with compassion and expertise since 2005.
              </p>
              <div className="orthocare-footer-social">
                <a href="#" className="orthocare-social-link" aria-label="Facebook">📘</a>
                <a href="#" className="orthocare-social-link" aria-label="Twitter">🐦</a>
                <a href="#" className="orthocare-social-link" aria-label="Instagram">📷</a>
                <a href="#" className="orthocare-social-link" aria-label="LinkedIn">💼</a>
              </div>
            </div>
            
            <div className="orthocare-footer-links">
              <div className="orthocare-footer-column">
                <h4 className="orthocare-column-title">Quick Links</h4>
                <a href="#home" className="orthocare-footer-link">Home</a>
                <a href="#conditions" className="orthocare-footer-link">Conditions</a>
                <a href="#treatments" className="orthocare-footer-link">Treatments</a>
                <a href="#doctors" className="orthocare-footer-link">Our Doctors</a>
                <a href="#testimonials" className="orthocare-footer-link">Success Stories</a>
              </div>
              
              <div className="orthocare-footer-column">
                <h4 className="orthocare-column-title">Services</h4>
                <a href="#" className="orthocare-footer-link">Joint Replacement</a>
                <a href="#" className="orthocare-footer-link">Sports Medicine</a>
                <a href="#" className="orthocare-footer-link">Spine Surgery</a>
                <a href="#" className="orthocare-footer-link">Pediatric Orthopedics</a>
                <a href="#" className="orthocare-footer-link">Physical Therapy</a>
              </div>
              
              <div className="orthocare-footer-column">
                <h4 className="orthocare-column-title">Contact Info</h4>
                <p className="orthocare-contact-info">📍 123 Medical Center Drive</p>
                <p className="orthocare-contact-info">📞 (555) 123-4567</p>
                <p className="orthocare-contact-info">✉️ info@orthocare.example.com</p>
                <p className="orthocare-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="orthocare-footer-bottom">
            <p className="orthocare-copyright">
              © {new Date().getFullYear()} OrthoCare Clinic. All rights reserved.
            </p>
            <div className="orthocare-footer-legal">
              <a href="#" className="orthocare-legal-link">Privacy Policy</a>
              <a href="#" className="orthocare-legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrthoCareClinic;