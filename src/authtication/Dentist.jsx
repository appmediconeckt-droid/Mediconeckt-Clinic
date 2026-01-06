import React, { useState } from 'react';
import './DentalClinic.css';

const DentalClinic = () => {
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
    { id: 1, name: 'Teeth Cleaning', icon: '🦷' },
    { id: 2, name: 'Dental Fillings', icon: '🔧' },
    { id: 3, name: 'Teeth Whitening', icon: '✨' },
    { id: 4, name: 'Root Canal', icon: '🩺' },
    { id: 5, name: 'Dental Implants', icon: '🦴' },
    { id: 6, name: 'Orthodontics', icon: '😁' }
  ];

  const testimonials = [
    { id: 1, name: 'Sarah Johnson', text: 'Excellent service! The team made me feel comfortable throughout my treatment.', rating: 5 },
    { id: 2, name: 'Michael Chen', text: 'Professional and painless. My teeth have never looked better!', rating: 5 },
    { id: 3, name: 'Priya Sharma', text: 'The best dental experience I\'ve ever had. Highly recommended.', rating: 4 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment request submitted! We will contact you shortly.');
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
    <div className="dental-container">
      {/* Navigation */}
      <nav className="dental-navbar">
        <div className="dental-navbar-inner">
          <div className="dental-logo">
            <span className="dental-logo-icon">🦷</span>
            <h1 className="dental-logo-text">Isaka Dental Care</h1>
          </div>
          
          <button 
            className="dental-menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="dental-menu-icon"></span>
            <span className="dental-menu-icon"></span>
            <span className="dental-menu-icon"></span>
          </button>
          
          <ul className={`dental-nav-links ${menuOpen ? 'dental-nav-active' : ''}`}>
            <li><a href="#home" className="dental-nav-item">Home</a></li>
            <li><a href="#services" className="dental-nav-item">Services</a></li>
            <li><a href="#about" className="dental-nav-item">About</a></li>
            <li><a href="#testimonials" className="dental-nav-item">Testimonials</a></li>
            <li><a href="#contact" className="dental-nav-item dental-nav-cta">Book Appointment</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="dental-hero" id="home">
        <div className="dental-hero-content">
          <h2 className="dental-hero-title">Your Smile, Our Passion</h2>
          <p className="dental-hero-subtitle">Professional dental care in a comfortable, modern environment. We use the latest technology to ensure the best results.</p>
          <div className="dental-hero-buttons">
            <a href="#contact" className="dental-btn dental-btn-primary">Book Appointment</a>
            <a href="#services" className="dental-btn dental-btn-secondary">Our Services</a>
          </div>
        </div>
        <div className="dental-hero-image">
          <div className="dental-hero-image-placeholder">
            <span className="dental-image-icon">😁</span>
            <p className="dental-image-text">Modern Dental Clinic</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="dental-services" id="services">
        <div className="dental-section-header">
          <h2 className="dental-section-title">Our Dental Services</h2>
          <p className="dental-section-subtitle">Comprehensive dental care for the whole family</p>
        </div>
        
        <div className="dental-services-grid">
          {services.map(service => (
            <div className="dental-service-card" key={service.id}>
              <div className="dental-service-icon">{service.icon}</div>
              <h3 className="dental-service-name">{service.name}</h3>
              <p className="dental-service-desc">Professional treatment using modern equipment for optimal results.</p>
              <a href="#contact" className="dental-service-link">Learn More →</a>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="dental-about" id="about">
        <div className="dental-about-content">
          <h2 className="dental-about-title">Why Choose Isaka Dental?</h2>
          <p className="dental-about-text">With over 15 years of experience, our team of certified dentists provides personalized care in a state-of-the-art facility.</p>
          
          <ul className="dental-about-features">
            <li className="dental-about-feature">
              <span className="dental-feature-icon">✅</span>
              <span className="dental-feature-text">Advanced dental technology</span>
            </li>
            <li className="dental-about-feature">
              <span className="dental-feature-icon">✅</span>
              <span className="dental-feature-text">Pain-free treatment options</span>
            </li>
            <li className="dental-about-feature">
              <span className="dental-feature-icon">✅</span>
              <span className="dental-feature-text">Emergency dental services</span>
            </li>
            <li className="dental-about-feature">
              <span className="dental-feature-icon">✅</span>
              <span className="dental-feature-text">Flexible payment plans</span>
            </li>
          </ul>
        </div>
        
        <div className="dental-about-image">
          <div className="dental-about-image-placeholder">
            <span className="dental-image-icon">👨‍⚕️</span>
            <p className="dental-image-text">Expert Dental Team</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="dental-testimonials" id="testimonials">
        <div className="dental-section-header">
          <h2 className="dental-section-title">Patient Testimonials</h2>
          <p className="dental-section-subtitle">See what our patients are saying</p>
        </div>
        
        <div className="dental-testimonial-cards">
          {testimonials.map(testimonial => (
            <div className="dental-testimonial-card" key={testimonial.id}>
              <div className="dental-testimonial-rating">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="dental-testimonial-text">"{testimonial.text}"</p>
              <h4 className="dental-testimonial-author">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Form */}
      <section className="dental-contact" id="contact">
        <div className="dental-contact-container">
          <div className="dental-contact-info">
            <h2 className="dental-contact-title">Book Your Appointment</h2>
            <p className="dental-contact-text">Schedule a consultation with our dental experts today.</p>
            
            <div className="dental-contact-details">
              <div className="dental-contact-item">
                <span className="dental-contact-icon">📍</span>
                <div>
                  <h4>Our Location</h4>
                  <p>123 Dental Street, Isaka City</p>
                </div>
              </div>
              <div className="dental-contact-item">
                <span className="dental-contact-icon">📞</span>
                <div>
                  <h4>Phone Number</h4>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="dental-contact-item">
                <span className="dental-contact-icon">🕒</span>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon-Fri: 8am-7pm, Sat: 9am-4pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="dental-appointment-form" onSubmit={handleSubmit}>
            <h3 className="dental-form-title">Request Appointment</h3>
            
            <div className="dental-form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="dental-form-input"
                required
              />
            </div>
            
            <div className="dental-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="dental-form-input"
                required
              />
            </div>
            
            <div className="dental-form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="dental-form-input"
                required
              />
            </div>
            
            <div className="dental-form-group">
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="dental-form-select"
                required
              >
                <option value="">Select Service</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>{service.name}</option>
                ))}
              </select>
            </div>
            
            <div className="dental-form-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="dental-form-input"
                required
              />
            </div>
            
            <div className="dental-form-group">
              <textarea
                name="message"
                placeholder="Additional Information"
                value={formData.message}
                onChange={handleInputChange}
                className="dental-form-textarea"
                rows="3"
              ></textarea>
            </div>
            
            <button type="submit" className="dental-btn dental-btn-submit">Book Appointment</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="dental-footer">
        <div className="dental-footer-content">
          <div className="dental-footer-logo">
            <span className="dental-logo-icon">🦷</span>
            <h3 className="dental-footer-logo-text">Isaka Dental Care</h3>
          </div>
          
          <p className="dental-footer-text">Providing exceptional dental care since 2008. Your smile is our priority.</p>
          
          <div className="dental-footer-social">
            <a href="#" className="dental-social-link" aria-label="Facebook">📘</a>
            <a href="#" className="dental-social-link" aria-label="Instagram">📷</a>
            <a href="#" className="dental-social-link" aria-label="Twitter">🐦</a>
          </div>
          
          <p className="dental-footer-copyright">© {new Date().getFullYear()} Isaka Dental Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DentalClinic;