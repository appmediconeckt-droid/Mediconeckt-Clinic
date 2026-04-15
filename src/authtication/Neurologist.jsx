import React, { useState } from 'react';
import './NeuroCareClinic.css';

const NeuroCareClinic = () => {
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
    { id: 1, name: 'Migraine & Headaches', icon: '🧠' },
    { id: 2, name: 'Epilepsy', icon: '⚡' },
    { id: 3, name: 'Stroke Care', icon: '🩺' },
    { id: 4, name: 'Parkinson\'s Disease', icon: '🤝' },
    { id: 5, name: 'Multiple Sclerosis', icon: '🌀' },
    { id: 6, name: 'Neuropathy', icon: '🦶' },
    { id: 7, name: 'Memory Disorders', icon: '📝' },
    { id: 8, name: 'Sleep Disorders', icon: '😴' }
  ];

  const treatments = [
    { id: 1, name: 'EEG Monitoring', desc: 'Advanced brain wave analysis' },
    { id: 2, name: 'MRI & CT Scan', desc: 'High-resolution imaging' },
    { id: 3, name: 'EMG/NCS', desc: 'Nerve conduction studies' },
    { id: 4, name: 'Botox Therapy', desc: 'For chronic migraines' },
    { id: 5, name: 'Deep Brain Stimulation', desc: 'For movement disorders' },
    { id: 6, name: 'Cognitive Therapy', desc: 'Memory and cognitive training' }
  ];

  const testimonials = [
    { id: 1, name: 'Dr. Robert Chen', role: 'Neurologist', text: '15+ years specializing in epilepsy and seizure disorders', exp: '15 years' },
    { id: 2, name: 'Dr. Sarah Williams', role: 'Neurophysiologist', text: 'Expert in EEG and sleep disorder diagnostics', exp: '12 years' },
    { id: 3, name: 'Dr. Michael Patel', role: 'Movement Disorder Specialist', text: 'Advanced treatments for Parkinson\'s disease', exp: '18 years' }
  ];

  const patientStories = [
    { id: 1, name: 'James Wilson', condition: 'Migraine', text: 'After years of suffering, the team at NeuroCare helped me regain control of my life.', rating: 5 },
    { id: 2, name: 'Maria Gonzalez', condition: 'Neuropathy', text: 'The personalized treatment plan made a significant difference in my quality of life.', rating: 5 },
    { id: 3, name: 'David Kim', condition: 'Epilepsy', text: 'Professional care and advanced technology gave me new hope.', rating: 4 }
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
      condition: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="neurocare-container">
      {/* Navigation */}
      <nav className="neurocare-navbar">
        <div className="neurocare-navbar-inner">
          <div className="neurocare-logo">
            <span className="neurocare-logo-icon">🧠</span>
            <h1 className="neurocare-logo-text">NeuroCare Specialists</h1>
          </div>
          
          <button 
            className="neurocare-menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="neurocare-menu-icon"></span>
            <span className="neurocare-menu-icon"></span>
            <span className="neurocare-menu-icon"></span>
          </button>
          
          <ul className={`neurocare-nav-links ${menuOpen ? 'neurocare-nav-active' : ''}`}>
            <li><a href="#home" className="neurocare-nav-item">Home</a></li>
            <li><a href="#conditions" className="neurocare-nav-item">Conditions</a></li>
            <li><a href="#treatments" className="neurocare-nav-item">Treatments</a></li>
            <li><a href="#team" className="neurocare-nav-item">Our Team</a></li>
            <li><a href="#contact" className="neurocare-nav-item neurocare-nav-cta">Book Consultation</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="neurocare-hero" id="home">
        <div className="neurocare-hero-background"></div>
        <div className="neurocare-hero-content">
          <div className="neurocare-hero-text">
            <h2 className="neurocare-hero-title">Advanced Neurology Care for Better Brain Health</h2>
            <p className="neurocare-hero-subtitle">World-class neurological expertise combined with cutting-edge technology for accurate diagnosis and effective treatment.</p>
            <div className="neurocare-hero-buttons">
              <a href="#contact" className="neurocare-btn neurocare-btn-primary">Book Consultation</a>
              <a href="#conditions" className="neurocare-btn neurocare-btn-secondary">View Conditions</a>
            </div>
          </div>
          <div className="neurocare-hero-stats">
            <div className="neurocare-stat">
              <span className="neurocare-stat-number">5000+</span>
              <span className="neurocare-stat-label">Patients Treated</span>
            </div>
            <div className="neurocare-stat">
              <span className="neurocare-stat-number">15+</span>
              <span className="neurocare-stat-label">Years Experience</span>
            </div>
            <div className="neurocare-stat">
              <span className="neurocare-stat-number">98%</span>
              <span className="neurocare-stat-label">Patient Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="neurocare-conditions" id="conditions">
        <div className="neurocare-section-header">
          <h2 className="neurocare-section-title">Neurological Conditions We Treat</h2>
          <p className="neurocare-section-subtitle">Comprehensive care for a wide range of neurological disorders</p>
        </div>
        
        <div className="neurocare-conditions-grid">
          {conditions.map(condition => (
            <div className="neurocare-condition-card" key={condition.id}>
              <div className="neurocare-condition-icon">{condition.icon}</div>
              <h3 className="neurocare-condition-name">{condition.name}</h3>
              <p className="neurocare-condition-desc">Expert diagnosis and personalized treatment plans</p>
              <a href="#contact" className="neurocare-condition-link">Learn More →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments Section */}
      <section className="neurocare-treatments" id="treatments">
        <div className="neurocare-treatments-container">
          <div className="neurocare-treatments-content">
            <h2 className="neurocare-treatments-title">Advanced Diagnostic & Treatment Options</h2>
            <p className="neurocare-treatments-text">We utilize state-of-the-art technology and evidence-based treatments to provide the best possible care for our patients.</p>
            
            <div className="neurocare-treatments-list">
              {treatments.map(treatment => (
                <div className="neurocare-treatment-item" key={treatment.id}>
                  <div className="neurocare-treatment-marker"></div>
                  <div>
                    <h4 className="neurocare-treatment-name">{treatment.name}</h4>
                    <p className="neurocare-treatment-desc">{treatment.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="neurocare-treatments-visual">
            <div className="neurocare-visual-placeholder">
              <span className="neurocare-visual-icon">🔬</span>
              <p className="neurocare-visual-text">Advanced Neuro Diagnostics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="neurocare-team" id="team">
        <div className="neurocare-section-header">
          <h2 className="neurocare-section-title">Meet Our Expert Neurologists</h2>
          <p className="neurocare-section-subtitle">Board-certified specialists with extensive experience</p>
        </div>
        
        <div className="neurocare-team-grid">
          {testimonials.map(doctor => (
            <div className="neurocare-team-card" key={doctor.id}>
              <div className="neurocare-team-avatar">
                <span className="neurocare-avatar-icon">👨‍⚕️</span>
              </div>
              <h3 className="neurocare-team-name">{doctor.name}</h3>
              <p className="neurocare-team-role">{doctor.role}</p>
              <p className="neurocare-team-exp">Experience: {doctor.exp}</p>
              <p className="neurocare-team-bio">{doctor.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Stories */}
      <section className="neurocare-stories">
        <div className="neurocare-section-header">
          <h2 className="neurocare-section-title">Patient Success Stories</h2>
          <p className="neurocare-section-subtitle">Real experiences from our patients</p>
        </div>
        
        <div className="neurocare-stories-container">
          {patientStories.map(story => (
            <div className="neurocare-story-card" key={story.id}>
              <div className="neurocare-story-rating">
                {'★'.repeat(story.rating)}
                {'☆'.repeat(5 - story.rating)}
              </div>
              <p className="neurocare-story-text">"{story.text}"</p>
              <div className="neurocare-story-footer">
                <h4 className="neurocare-story-name">{story.name}</h4>
                <span className="neurocare-story-condition">{story.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Section */}
      <section className="neurocare-appointment" id="contact">
        <div className="neurocare-appointment-container">
          <div className="neurocare-appointment-info">
            <h2 className="neurocare-appointment-title">Schedule Your Consultation</h2>
            <p className="neurocare-appointment-text">Take the first step towards better neurological health. Our team is here to help.</p>
            
            <div className="neurocare-appointment-details">
              <div className="neurocare-detail-item">
                <span className="neurocare-detail-icon">🏥</span>
                <div>
                  <h4>State-of-the-Art Facility</h4>
                  <p>Advanced diagnostic equipment in a comfortable setting</p>
                </div>
              </div>
              <div className="neurocare-detail-item">
                <span className="neurocare-detail-icon">⏰</span>
                <div>
                  <h4>Timely Appointments</h4>
                  <p>Minimal waiting time for consultations and tests</p>
                </div>
              </div>
              <div className="neurocare-detail-item">
                <span className="neurocare-detail-icon">🤝</span>
                <div>
                  <h4>Personalized Care</h4>
                  <p>Individualized treatment plans for each patient</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="neurocare-consultation-form" onSubmit={handleSubmit}>
            <h3 className="neurocare-form-title">Request Consultation</h3>
            
            <div className="neurocare-form-row">
              <div className="neurocare-form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="neurocare-form-input"
                  required
                />
              </div>
              
              <div className="neurocare-form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="neurocare-form-input"
                  required
                />
              </div>
            </div>
            
            <div className="neurocare-form-row">
              <div className="neurocare-form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="neurocare-form-input"
                  required
                />
              </div>
              
              <div className="neurocare-form-group">
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="neurocare-form-select"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition.id} value={condition.name}>{condition.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="neurocare-form-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="neurocare-form-input"
                required
              />
            </div>
            
            <div className="neurocare-form-group">
              <textarea
                name="message"
                placeholder="Tell us about your symptoms or concerns..."
                value={formData.message}
                onChange={handleInputChange}
                className="neurocare-form-textarea"
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="neurocare-btn neurocare-btn-submit">
              Request Consultation
            </button>
            
            <p className="neurocare-form-note">
              Our team will contact you within 24 hours to confirm your appointment.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="neurocare-footer">
        <div className="neurocare-footer-content">
          <div className="neurocare-footer-main">
            <div className="neurocare-footer-logo">
              <span className="neurocare-logo-icon">🧠</span>
              <div>
                <h3 className="neurocare-footer-logo-text">NeuroCare Specialists</h3>
                <p className="neurocare-footer-tagline">Advancing Neurology, Changing Lives</p>
              </div>
            </div>
            
            <div className="neurocare-footer-links">
              <div className="neurocare-footer-column">
                <h4>Quick Links</h4>
                <a href="#home" className="neurocare-footer-link">Home</a>
                <a href="#conditions" className="neurocare-footer-link">Conditions</a>
                <a href="#treatments" className="neurocare-footer-link">Treatments</a>
                <a href="#team" className="neurocare-footer-link">Our Team</a>
              </div>
              
              <div className="neurocare-footer-column">
                <h4>Contact Info</h4>
                <p className="neurocare-contact-info">📍 123 Neurology Way, Medical District</p>
                <p className="neurocare-contact-info">📞 (555) 123-4567</p>
                <p className="neurocare-contact-info">✉️ info@neurocare.example.com</p>
              </div>
              
              <div className="neurocare-footer-column">
                <h4>Hours</h4>
                <p className="neurocare-hours">Mon-Fri: 8am-6pm</p>
                <p className="neurocare-hours">Sat: 9am-2pm</p>
                <p className="neurocare-hours">Emergency: 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="neurocare-footer-bottom">
            <p className="neurocare-copyright">
              © {new Date().getFullYear()} NeuroCare Specialists. All rights reserved.
            </p>
            
            <div className="neurocare-footer-social">
              <a href="#" className="neurocare-social-link" aria-label="Follow on Facebook">📘</a>
              <a href="#" className="neurocare-social-link" aria-label="Follow on Twitter">🐦</a>
              <a href="#" className="neurocare-social-link" aria-label="Follow on LinkedIn">💼</a>
              <a href="#" className="neurocare-social-link" aria-label="Follow on Instagram">📷</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeuroCareClinic;