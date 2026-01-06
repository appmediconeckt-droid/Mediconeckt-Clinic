import React, { useState } from 'react';
import './SkinCareClinic.css';

const SkinCareClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
    date: '',
    message: ''
  });

  const treatments = [
    { id: 1, name: 'Acne Treatment', icon: '🎯', color: '#EC4899', desc: 'Advanced solutions for clear skin' },
    { id: 2, name: 'Skin Cancer Screening', icon: '🔍', color: '#10B981', desc: 'Early detection & prevention' },
    { id: 3, name: 'Laser Therapy', icon: '✨', color: '#8B5CF6', desc: 'Precision skin rejuvenation' },
    { id: 4, name: 'Chemical Peels', icon: '🍃', color: '#F59E0B', desc: 'Revitalize your complexion' },
    { id: 5, name: 'Botox & Fillers', icon: '💉', color: '#3B82F6', desc: 'Natural-looking results' },
    { id: 6, name: 'Psoriasis Care', icon: '🛡️', color: '#EF4444', desc: 'Comprehensive management' },
    { id: 7, name: 'Hair Restoration', icon: '💇', color: '#84CC16', desc: 'Advanced hair loss solutions' },
    { id: 8, name: 'Anti-Aging Treatments', icon: '⭐', color: '#06B6D4', desc: 'Youthful radiance restored' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Miller', specialty: 'Cosmetic Dermatology', experience: '15 years', image: '👩‍⚕️', education: 'MD, FAAD' },
    { id: 2, name: 'Dr. James Wilson', specialty: 'Skin Cancer Specialist', experience: '20 years', image: '👨‍⚕️', education: 'MD, PhD' },
    { id: 3, name: 'Dr. Priya Sharma', specialty: 'Pediatric Dermatology', experience: '12 years', image: '👩‍⚕️', education: 'MD, FAAP' }
  ];

  const testimonials = [
    { id: 1, name: 'Emma Thompson', treatment: 'Acne Clearance', text: 'After years of struggling with acne, my skin is finally clear and confident!', rating: 5, age: 28 },
    { id: 2, name: 'Michael Chen', treatment: 'Laser Treatment', text: 'Professional care with amazing results. My skin has never looked better!', rating: 5, age: 42 },
    { id: 3, name: 'Sophia Rodriguez', treatment: 'Anti-Aging', text: 'Natural-looking results that made me look years younger. Highly recommend!', rating: 4, age: 55 }
  ];

  const conditions = [
    { id: 1, name: 'Acne & Rosacea', icon: '🎯' },
    { id: 2, name: 'Eczema & Psoriasis', icon: '🛡️' },
    { id: 3, name: 'Skin Cancer', icon: '🔍' },
    { id: 4, name: 'Aging & Wrinkles', icon: '⭐' },
    { id: 5, name: 'Hair Loss', icon: '💇' },
    { id: 6, name: 'Moles & Growths', icon: '🔬' }
  ];

  const stats = [
    { number: '25,000+', label: 'Patients Treated' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '20+', label: 'Years Experience' },
    { number: '10+', label: 'Board Certified Specialists' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your consultation request. Our team will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      concern: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="skincare-container">
      {/* Navigation */}
      <nav className="skincare-navbar">
        <div className="skincare-nav-container">
          <div className="skincare-logo">
            <span className="skincare-logo-icon">🌿</span>
            <div className="skincare-logo-text">
              <h1 className="skincare-logo-title">SkinCare Specialists</h1>
              <p className="skincare-logo-subtitle">Advanced Dermatology Center</p>
            </div>
          </div>
          
          <button 
            className={`skincare-menu-btn ${menuOpen ? 'skincare-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="skincare-menu-line skincare-line-1"></span>
            <span className="skincare-menu-line skincare-line-2"></span>
            <span className="skincare-menu-line skincare-line-3"></span>
          </button>
          
          <div className={`skincare-nav-menu ${menuOpen ? 'skincare-nav-show' : ''}`}>
            <ul className="skincare-nav-list">
              <li><a href="#home" className="skincare-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#treatments" className="skincare-nav-link" onClick={() => setMenuOpen(false)}>Treatments</a></li>
              <li><a href="#conditions" className="skincare-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#doctors" className="skincare-nav-link" onClick={() => setMenuOpen(false)}>Our Doctors</a></li>
              <li><a href="#testimonials" className="skincare-nav-link" onClick={() => setMenuOpen(false)}>Results</a></li>
              <li><a href="#contact" className="skincare-nav-cta" onClick={() => setMenuOpen(false)}>Book Consultation</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="skincare-hero" id="home">
        <div className="skincare-hero-background">
          <div className="skincare-hero-gradient"></div>
          <div className="skincare-hero-pattern"></div>
        </div>
        
        <div className="skincare-hero-content">
          <div className="skincare-hero-text">
            <span className="skincare-hero-badge">Advanced Skin Care</span>
            <h2 className="skincare-hero-title">Healthy Skin, Confident You</h2>
            <p className="skincare-hero-description">
              Expert dermatological care combining medical expertise with aesthetic excellence for radiant, healthy skin.
            </p>
            <div className="skincare-hero-actions">
              <a href="#contact" className="skincare-btn skincare-btn-primary">
                <span className="skincare-btn-icon">📅</span>
                Book Consultation
              </a>
              <a href="#treatments" className="skincare-btn skincare-btn-secondary">
                <span className="skincare-btn-icon">✨</span>
                View Treatments
              </a>
            </div>
          </div>
          
          <div className="skincare-hero-visual">
            <div className="skincare-visual-main">
              <div className="skincare-visual-element skincare-element-1">
                <span className="skincare-element-icon">💫</span>
              </div>
              <div className="skincare-visual-element skincare-element-2">
                <span className="skincare-element-icon">🌿</span>
              </div>
              <div className="skincare-visual-element skincare-element-3">
                <span className="skincare-element-icon">⭐</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="skincare-hero-stats">
          {stats.map((stat, index) => (
            <div className="skincare-stat-card" key={index}>
              <div className="skincare-stat-content">
                <span className="skincare-stat-number">{stat.number}</span>
                <span className="skincare-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments Section */}
      <section className="skincare-treatments" id="treatments">
        <div className="skincare-section-header">
          <span className="skincare-section-badge">Our Treatments</span>
          <h2 className="skincare-section-title">Advanced Skin Solutions</h2>
          <p className="skincare-section-subtitle">Comprehensive care for all your dermatological needs</p>
        </div>
        
        <div className="skincare-treatments-grid">
          {treatments.map(treatment => (
            <div className="skincare-treatment-card" key={treatment.id}>
              <div 
                className="skincare-treatment-icon-wrapper"
                style={{ backgroundColor: `${treatment.color}15` }}
              >
                <span 
                  className="skincare-treatment-icon"
                  style={{ color: treatment.color }}
                >
                  {treatment.icon}
                </span>
              </div>
              <h3 className="skincare-treatment-name">{treatment.name}</h3>
              <p className="skincare-treatment-description">{treatment.desc}</p>
              <a href="#contact" className="skincare-treatment-link">
                Learn More
                <span className="skincare-link-arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="skincare-conditions" id="conditions">
        <div className="skincare-conditions-container">
          <div className="skincare-conditions-content">
            <span className="skincare-conditions-badge">Skin Conditions</span>
            <h2 className="skincare-conditions-title">We Treat All Skin Concerns</h2>
            <p className="skincare-conditions-description">
              From common conditions to complex dermatological issues, our experts provide personalized treatment plans.
            </p>
            
            <div className="skincare-conditions-list">
              {conditions.map(condition => (
                <div className="skincare-condition-item" key={condition.id}>
                  <div className="skincare-condition-icon">
                    {condition.icon}
                  </div>
                  <span className="skincare-condition-name">{condition.name}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="skincare-btn skincare-btn-outline">
              <span className="skincare-btn-icon">👨‍⚕️</span>
              Get Expert Advice
            </a>
          </div>
          
          <div className="skincare-conditions-visual">
            <div className="skincare-visual-card">
              <div className="skincare-visual-header">
                <span className="skincare-visual-icon">🔬</span>
                <h3 className="skincare-visual-title">Advanced Diagnostics</h3>
              </div>
              <div className="skincare-visual-features">
                <div className="skincare-visual-feature">
                  <span className="skincare-feature-icon">✅</span>
                  <span>Digital Dermoscopy</span>
                </div>
                <div className="skincare-visual-feature">
                  <span className="skincare-feature-icon">✅</span>
                  <span>Patch Testing</span>
                </div>
                <div className="skincare-visual-feature">
                  <span className="skincare-feature-icon">✅</span>
                  <span>Skin Biopsy</span>
                </div>
                <div className="skincare-visual-feature">
                  <span className="skincare-feature-icon">✅</span>
                  <span>Allergy Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="skincare-doctors" id="doctors">
        <div className="skincare-section-header">
          <span className="skincare-section-badge">Meet Our Specialists</span>
          <h2 className="skincare-section-title">Board-Certified Dermatologists</h2>
          <p className="skincare-section-subtitle">Expert care from highly trained skin specialists</p>
        </div>
        
        <div className="skincare-doctors-grid">
          {doctors.map(doctor => (
            <div className="skincare-doctor-card" key={doctor.id}>
              <div className="skincare-doctor-image">
                <div className="skincare-doctor-avatar">
                  <span className="skincare-avatar-icon">{doctor.image}</span>
                </div>
                <div className="skincare-doctor-badge">
                  <span className="skincare-badge-icon">⭐</span>
                  Top Rated
                </div>
              </div>
              
              <div className="skincare-doctor-info">
                <h3 className="skincare-doctor-name">{doctor.name}</h3>
                <p className="skincare-doctor-education">{doctor.education}</p>
                <p className="skincare-doctor-specialty">{doctor.specialty}</p>
                
                <div className="skincare-doctor-details">
                  <div className="skincare-doctor-detail">
                    <span className="skincare-detail-icon">📅</span>
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="skincare-doctor-detail">
                    <span className="skincare-detail-icon">🏆</span>
                    <span>Board Certified</span>
                  </div>
                </div>
                
                <div className="skincare-doctor-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="skincare-expertise-tags">
                    <span className="skincare-expertise-tag">Medical Dermatology</span>
                    <span className="skincare-expertise-tag">Cosmetic Procedures</span>
                    <span className="skincare-expertise-tag">Surgical Expertise</span>
                  </div>
                </div>
                
                <a href="#contact" className="skincare-doctor-consult">
                  Consult with Dr. {doctor.name.split(' ')[2]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="skincare-testimonials" id="testimonials">
        <div className="skincare-testimonials-container">
          <div className="skincare-testimonials-header">
            <span className="skincare-testimonials-badge">Success Stories</span>
            <h2 className="skincare-testimonials-title">Transforming Skin, Changing Lives</h2>
            <p className="skincare-testimonials-subtitle">See what our patients have to say about their journey</p>
          </div>
          
          <div className="skincare-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="skincare-testimonial-card" key={testimonial.id}>
                <div className="skincare-testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`skincare-rating-star ${i < testimonial.rating ? 'skincare-star-active' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="skincare-testimonial-text">"{testimonial.text}"</p>
                
                <div className="skincare-testimonial-author">
                  <div className="skincare-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="skincare-author-info">
                    <h4 className="skincare-author-name">{testimonial.name}</h4>
                    <div className="skincare-author-details">
                      <span className="skincare-author-treatment">{testimonial.treatment}</span>
                      <span className="skincare-author-age">Age {testimonial.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="skincare-appointment" id="contact">
        <div className="skincare-appointment-container">
          <div className="skincare-appointment-form">
            <div className="skincare-form-header">
              <h2 className="skincare-form-title">Book Your Skin Consultation</h2>
              <p className="skincare-form-subtitle">Take the first step towards healthy, radiant skin</p>
            </div>
            
            <form onSubmit={handleSubmit} className="skincare-consultation-form">
              <div className="skincare-form-row">
                <div className="skincare-form-group">
                  <label className="skincare-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="skincare-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="skincare-form-group">
                  <label className="skincare-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="skincare-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="skincare-form-row">
                <div className="skincare-form-group">
                  <label className="skincare-form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="skincare-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="skincare-form-group">
                  <label className="skincare-form-label">Skin Concern</label>
                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleInputChange}
                    className="skincare-form-select"
                    required
                  >
                    <option value="">Select concern</option>
                    {treatments.map(treatment => (
                      <option key={treatment.id} value={treatment.name}>{treatment.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="skincare-form-group">
                <label className="skincare-form-label">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="skincare-form-input"
                  required
                />
              </div>
              
              <div className="skincare-form-group">
                <label className="skincare-form-label">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="skincare-form-textarea"
                  placeholder="Tell us about your skin concerns, current treatments, or specific questions..."
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="skincare-btn skincare-btn-submit">
                <span className="skincare-submit-icon">🌿</span>
                Request Consultation
              </button>
              
              <p className="skincare-form-note">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          </div>
          
          <div className="skincare-appointment-info">
            <div className="skincare-info-card">
              <div className="skincare-info-header">
                <h3 className="skincare-info-title">Why Choose SkinCare Specialists?</h3>
                <p className="skincare-info-subtitle">Excellence in dermatology since 2005</p>
              </div>
              
              <div className="skincare-info-features">
                <div className="skincare-info-feature">
                  <div className="skincare-feature-icon">
                    <span>🏆</span>
                  </div>
                  <div>
                    <h4>Award-Winning Care</h4>
                    <p>Recognized for excellence in dermatology and patient care</p>
                  </div>
                </div>
                
                <div className="skincare-info-feature">
                  <div className="skincare-feature-icon">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4>Same-Day Appointments</h4>
                    <p>Urgent skin concerns addressed promptly</p>
                  </div>
                </div>
                
                <div className="skincare-info-feature">
                  <div className="skincare-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>Personalized Treatment Plans</h4>
                    <p>Customized solutions for your unique skin needs</p>
                  </div>
                </div>
              </div>
              
              <div className="skincare-contact-details">
                <div className="skincare-contact-item">
                  <span className="skincare-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>123 SkinCare Avenue, Medical Plaza</p>
                  </div>
                </div>
                
                <div className="skincare-contact-item">
                  <span className="skincare-contact-icon">📞</span>
                  <div>
                    <h4>Contact Number</h4>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="skincare-contact-item">
                  <span className="skincare-contact-icon">🕒</span>
                  <div>
                    <h4>Clinic Hours</h4>
                    <p>Mon-Fri: 8am-7pm | Sat: 9am-4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="skincare-advantages">
                <h4 className="skincare-advantages-title">Our Advantages</h4>
                <div className="skincare-advantages-grid">
                  <div className="skincare-advantage">
                    <span className="skincare-advantage-icon">✅</span>
                    <span>Non-Surgical Options</span>
                  </div>
                  <div className="skincare-advantage">
                    <span className="skincare-advantage-icon">✅</span>
                    <span>Latest Technology</span>
                  </div>
                  <div className="skincare-advantage">
                    <span className="skincare-advantage-icon">✅</span>
                    <span>Holistic Approach</span>
                  </div>
                  <div className="skincare-advantage">
                    <span className="skincare-advantage-icon">✅</span>
                    <span>Follow-up Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="skincare-footer">
        <div className="skincare-footer-container">
          <div className="skincare-footer-main">
            <div className="skincare-footer-brand">
              <div className="skincare-footer-logo">
                <span className="skincare-footer-icon">🌿</span>
                <div>
                  <h3 className="skincare-footer-title">SkinCare Specialists</h3>
                  <p className="skincare-footer-tagline">Radiant Skin, Confident You</p>
                </div>
              </div>
              <p className="skincare-footer-description">
                Providing exceptional dermatological care with advanced technology and compassionate expertise since 2005.
              </p>
              
              <div className="skincare-footer-social">
                <a href="#" className="skincare-social-link" aria-label="Facebook">
                  <span className="skincare-social-icon">📘</span>
                </a>
                <a href="#" className="skincare-social-link" aria-label="Instagram">
                  <span className="skincare-social-icon">📷</span>
                </a>
                <a href="#" className="skincare-social-link" aria-label="Twitter">
                  <span className="skincare-social-icon">🐦</span>
                </a>
                <a href="#" className="skincare-social-link" aria-label="YouTube">
                  <span className="skincare-social-icon">📺</span>
                </a>
              </div>
            </div>
            
            <div className="skincare-footer-links">
              <div className="skincare-footer-column">
                <h4 className="skincare-column-title">Quick Links</h4>
                <a href="#home" className="skincare-footer-link">Home</a>
                <a href="#treatments" className="skincare-footer-link">Treatments</a>
                <a href="#conditions" className="skincare-footer-link">Conditions</a>
                <a href="#doctors" className="skincare-footer-link">Our Doctors</a>
                <a href="#testimonials" className="skincare-footer-link">Success Stories</a>
              </div>
              
              <div className="skincare-footer-column">
                <h4 className="skincare-column-title">Services</h4>
                <a href="#" className="skincare-footer-link">Medical Dermatology</a>
                <a href="#" className="skincare-footer-link">Cosmetic Procedures</a>
                <a href="#" className="skincare-footer-link">Skin Cancer Screening</a>
                <a href="#" className="skincare-footer-link">Laser Treatments</a>
                <a href="#" className="skincare-footer-link">Pediatric Dermatology</a>
              </div>
              
              <div className="skincare-footer-column">
                <h4 className="skincare-column-title">Contact Info</h4>
                <p className="skincare-contact-info">📍 123 SkinCare Avenue</p>
                <p className="skincare-contact-info">📞 (555) 123-4567</p>
                <p className="skincare-contact-info">✉️ hello@skincare.example</p>
                <p className="skincare-contact-info">🕒 Mon-Fri: 8am-7pm</p>
              </div>
            </div>
          </div>
          
          <div className="skincare-footer-bottom">
            <p className="skincare-copyright">
              © {new Date().getFullYear()} SkinCare Specialists. All rights reserved.
            </p>
            <div className="skincare-footer-legal">
              <a href="#" className="skincare-legal-link">Privacy Policy</a>
              <a href="#" className="skincare-legal-link">Terms of Service</a>
              <a href="#" className="skincare-legal-link">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkinCareClinic;