import React, { useState } from 'react';
import './Physiotherapist.css';

const PhysiotherapyClinic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    condition: '',
    painLevel: '3',
    preferredTime: '',
    message: '',
    appointmentType: 'new'
  });

  const treatments = [
    { 
      id: 1, 
      name: 'Manual Therapy', 
      icon: '✋', 
      color: '#3B82F6', 
      desc: 'Hands-on techniques to relieve pain and restore mobility',
      duration: '60 min'
    },
    { 
      id: 2, 
      name: 'Sports Rehabilitation', 
      icon: '🏃', 
      color: '#10B981', 
      desc: 'Specialized care for athletes and sports injuries',
      duration: '45-90 min'
    },
    { 
      id: 3, 
      name: 'Post-Surgical Rehab', 
      icon: '🩺', 
      color: '#8B5CF6', 
      desc: 'Recovery programs after orthopedic surgeries',
      duration: '60 min'
    },
    { 
      id: 4, 
      name: 'Neurological Physio', 
      icon: '🧠', 
      color: '#EF4444', 
      desc: 'Therapy for stroke, MS, Parkinson\'s and nerve disorders',
      duration: '60 min'
    },
    { 
      id: 5, 
      name: 'Pediatric Physio', 
      icon: '👶', 
      color: '#F59E0B', 
      desc: 'Developmental and movement therapy for children',
      duration: '45 min'
    },
    { 
      id: 6, 
      name: 'Dry Needling', 
      icon: '📍', 
      color: '#EC4899', 
      desc: 'Trigger point therapy for muscle pain relief',
      duration: '30 min'
    },
    { 
      id: 7, 
      name: 'Clinical Pilates', 
      icon: '🧘', 
      color: '#06B6D4', 
      desc: 'Rehab-focused exercise system for core stability',
      duration: '60 min'
    },
    { 
      id: 8, 
      name: 'Vestibular Rehab', 
      icon: '🌀', 
      color: '#84CC16', 
      desc: 'Balance and dizziness disorder treatment',
      duration: '45 min'
    }
  ];

  const therapists = [
    { 
      id: 1, 
      name: 'Dr. Sarah Mitchell', 
      specialty: 'Sports & Orthopedic Physio', 
      experience: '15 years', 
      image: '👩‍⚕️', 
      education: 'DPT, OCS, CSCS',
      focus: ['Sports Injuries', 'Post-Surgical Rehab', 'Manual Therapy']
    },
    { 
      id: 2, 
      name: 'Dr. James Wilson', 
      specialty: 'Neurological Specialist', 
      experience: '12 years', 
      image: '👨‍⚕️', 
      education: 'DPT, NCS',
      focus: ['Stroke Recovery', 'Balance Disorders', 'MS/PD Rehab']
    },
    { 
      id: 3, 
      name: 'Dr. Maria Rodriguez', 
      specialty: 'Pediatric & Women\'s Health', 
      experience: '10 years', 
      image: '👩‍⚕️', 
      education: 'DPT, PCS',
      focus: ['Child Development', 'Pre/Post Natal', 'Pelvic Health']
    }
  ];

  const conditions = [
    { id: 1, name: 'Back Pain', icon: '🔙', category: 'Spinal' },
    { id: 2, name: 'Arthritis', icon: '🦴', category: 'Joint' },
    { id: 3, name: 'Sports Injuries', icon: '⚽', category: 'Sports' },
    { id: 4, name: 'Stroke Recovery', icon: '🧠', category: 'Neurological' },
    { id: 5, name: 'Post-Surgical Rehab', icon: '🩹', category: 'Rehabilitation' },
    { id: 6, name: 'Workplace Injuries', icon: '💼', category: 'Occupational' }
  ];

  const testimonials = [
    { 
      id: 1, 
      name: 'Michael Chen', 
      age: 42, 
      text: 'After 2 years of chronic back pain, the manual therapy and exercise program changed my life. I\'m back to running!', 
      rating: 5, 
      condition: 'Chronic Back Pain',
      duration: '3 months'
    },
    { 
      id: 2, 
      name: 'Emma Johnson', 
      age: 28, 
      text: 'Amazing recovery from my ACL surgery. The sports rehab program got me back to competitive soccer in record time.', 
      rating: 5, 
      condition: 'ACL Reconstruction',
      duration: '6 months'
    },
    { 
      id: 3, 
      name: 'Robert Davis', 
      age: 65, 
      text: 'Stroke rehabilitation gave me back my independence. The therapists were patient, knowledgeable, and truly caring.', 
      rating: 4, 
      condition: 'Stroke Recovery',
      duration: '4 months'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Patients Treated', icon: '👥' },
    { number: '98%', label: 'Recovery Success Rate', icon: '📈' },
    { number: '500+', label: 'Athletes Rehabilitated', icon: '🏆' },
    { number: '24/7', label: 'Tele-Rehab Available', icon: '💻' }
  ];

  const facilities = [
    { id: 1, name: 'Hydrotherapy Pool', icon: '💧', desc: 'Heated pool for aquatic therapy' },
    { id: 2, name: 'Gym Equipment', icon: '🏋️', desc: 'Full rehabilitation gym with modern equipment' },
    { id: 3, name: 'Private Treatment Rooms', icon: '🚪', desc: 'Individual rooms for personalized care' },
    { id: 4, name: 'Balance Lab', icon: '⚖️', desc: 'Advanced balance assessment technology' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your physiotherapy consultation request. Our team will contact you within 24 hours to schedule your assessment.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      condition: '',
      painLevel: '3',
      preferredTime: '',
      message: '',
      appointmentType: 'new'
    });
  };

  return (
    <div className="physio-container">
      {/* Navigation */}
      <nav className="physio-navbar">
        <div className="physio-nav-container">
          <div className="physio-logo">
            <span className="physio-logo-icon">💪🧘‍♀️🚶‍♂️</span>
            <div className="physio-logo-text">
              <h1 className="physio-logo-title">PhysioCare Clinic</h1>
              <p className="physio-logo-subtitle">Movement • Recovery • Wellness</p>
            </div>
          </div>
          
          <button 
            className={`physio-menu-btn ${menuOpen ? 'physio-menu-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="physio-menu-line physio-line-1"></span>
            <span className="physio-menu-line physio-line-2"></span>
            <span className="physio-menu-line physio-line-3"></span>
          </button>
          
          <div className={`physio-nav-menu ${menuOpen ? 'physio-nav-show' : ''}`}>
            <ul className="physio-nav-list">
              <li><a href="#home" className="physio-nav-link" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#treatments" className="physio-nav-link" onClick={() => setMenuOpen(false)}>Treatments</a></li>
              <li><a href="#conditions" className="physio-nav-link" onClick={() => setMenuOpen(false)}>Conditions</a></li>
              <li><a href="#therapists" className="physio-nav-link" onClick={() => setMenuOpen(false)}>Our Therapists</a></li>
              <li><a href="#facilities" className="physio-nav-link" onClick={() => setMenuOpen(false)}>Facilities</a></li>
              <li><a href="#assessment" className="physio-nav-cta" onClick={() => setMenuOpen(false)}>Book Assessment</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="physio-hero" id="home">
        <div className="physio-hero-background">
          <div className="physio-hero-gradient"></div>
          <div className="physio-hero-pattern"></div>
        </div>
        
        <div className="physio-hero-content">
          <div className="physio-hero-text">
            <span className="physio-hero-badge">Expert Physiotherapy Since 2005</span>
            <h2 className="physio-hero-title">Regain Your Strength, Restore Your Movement</h2>
            <p className="physio-hero-description">
              Comprehensive physiotherapy services from pain management to full functional recovery. 
              Personalized treatment plans for sports injuries, neurological conditions, post-surgical rehab, and chronic pain.
            </p>
            <div className="physio-hero-actions">
              <a href="#assessment" className="physio-btn physio-btn-primary">
                <span className="physio-btn-icon">📋</span>
                Book Initial Assessment
              </a>
              <a href="#treatments" className="physio-btn physio-btn-secondary">
                <span className="physio-btn-icon">💡</span>
                View Treatments
              </a>
            </div>
          </div>
          
          <div className="physio-hero-visual">
            <div className="physio-visual-main">
              <div className="physio-visual-element physio-element-1">
                <span className="physio-element-icon">🏋️</span>
              </div>
              <div className="physio-visual-element physio-element-2">
                <span className="physio-element-icon">🧘</span>
              </div>
              <div className="physio-visual-element physio-element-3">
                <span className="physio-element-icon">🚶</span>
              </div>
              <div className="physio-visual-element physio-element-4">
                <span className="physio-element-icon">💪</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="physio-hero-stats">
          {stats.map((stat, index) => (
            <div className="physio-stat-card" key={index}>
              <div className="physio-stat-content">
                <span className="physio-stat-icon">{stat.icon}</span>
                <span className="physio-stat-number">{stat.number}</span>
                <span className="physio-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments Section */}
      <section className="physio-treatments" id="treatments">
        <div className="physio-section-header">
          <span className="physio-section-badge">Our Services</span>
          <h2 className="physio-section-title">Specialized Physiotherapy Treatments</h2>
          <p className="physio-section-subtitle">Evidence-based interventions for optimal recovery</p>
        </div>
        
        <div className="physio-treatments-grid">
          {treatments.map(treatment => (
            <div className="physio-treatment-card" key={treatment.id}>
              <div 
                className="physio-treatment-icon-wrapper"
                style={{ backgroundColor: `${treatment.color}15` }}
              >
                <span 
                  className="physio-treatment-icon"
                  style={{ color: treatment.color }}
                >
                  {treatment.icon}
                </span>
              </div>
              <h3 className="physio-treatment-name">{treatment.name}</h3>
              <p className="physio-treatment-description">{treatment.desc}</p>
              <div className="physio-treatment-meta">
                <span className="physio-treatment-duration">⏱️ {treatment.duration}</span>
                <a href="#assessment" className="physio-treatment-link">
                  Book Now
                  <span className="physio-link-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions Section */}
      <section className="physio-conditions" id="conditions">
        <div className="physio-conditions-container">
          <div className="physio-conditions-content">
            <span className="physio-conditions-badge">Common Conditions</span>
            <h2 className="physio-conditions-title">We Treat These & Many More</h2>
            <p className="physio-conditions-description">
              Comprehensive assessment and treatment for a wide range of musculoskeletal, neurological, and sports-related conditions.
            </p>
            
            <div className="physio-conditions-grid">
              {conditions.map(condition => (
                <div className="physio-condition-card" key={condition.id}>
                  <div className="physio-condition-icon">
                    {condition.icon}
                  </div>
                  <div className="physio-condition-info">
                    <h4 className="physio-condition-name">{condition.name}</h4>
                    <div className="physio-condition-category">{condition.category}</div>
                    <p className="physio-condition-desc">Individualized treatment plans available</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="physio-conditions-visual">
            <div className="physio-approach">
              <div className="physio-approach-header">
                <span className="physio-approach-icon">🎯</span>
                <h3 className="physio-approach-title">Our Approach</h3>
              </div>
              <div className="physio-approach-list">
                <div className="physio-approach-item">
                  <div className="physio-approach-item-icon">1</div>
                  <div className="physio-approach-item-content">
                    <h4>Comprehensive Assessment</h4>
                    <p>Detailed evaluation of your condition and movement patterns</p>
                  </div>
                </div>
                <div className="physio-approach-item">
                  <div className="physio-approach-item-icon">2</div>
                  <div className="physio-approach-item-content">
                    <h4>Personalized Plan</h4>
                    <p>Custom treatment strategy based on your goals</p>
                  </div>
                </div>
                <div className="physio-approach-item">
                  <div className="physio-approach-item-icon">3</div>
                  <div className="physio-approach-item-content">
                    <h4>Hands-On Therapy</h4>
                    <p>Manual techniques to relieve pain and improve mobility</p>
                  </div>
                </div>
                <div className="physio-approach-item">
                  <div className="physio-approach-item-icon">4</div>
                  <div className="physio-approach-item-content">
                    <h4>Exercise Prescription</h4>
                    <p>Targeted exercises for strength, flexibility, and function</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="physio-facilities" id="facilities">
        <div className="physio-section-header">
          <span className="physio-section-badge">Our Clinic</span>
          <h2 className="physio-section-title">State-of-the-Art Facilities</h2>
          <p className="physio-section-subtitle">Modern equipment and comfortable environment for optimal recovery</p>
        </div>
        
        <div className="physio-facilities-grid">
          {facilities.map(facility => (
            <div className="physio-facility-card" key={facility.id}>
              <div className="physio-facility-icon">
                <span className="physio-facility-icon-inner">{facility.icon}</span>
              </div>
              <h3 className="physio-facility-name">{facility.name}</h3>
              <p className="physio-facility-description">{facility.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="physio-technology">
          <div className="physio-technology-content">
            <h3 className="physio-technology-title">Advanced Rehabilitation Technology</h3>
            <div className="physio-technology-features">
              <div className="physio-technology-feature">
                <span className="physio-tech-icon">📊</span>
                <span>Gait analysis system</span>
              </div>
              <div className="physio-technology-feature">
                <span className="physio-tech-icon">🎯</span>
                <span>Laser therapy for pain relief</span>
              </div>
              <div className="physio-technology-feature">
                <span className="physio-tech-icon">⚡</span>
                <span>Electrotherapy equipment</span>
              </div>
              <div className="physio-technology-feature">
                <span className="physio-tech-icon">🤖</span>
                <span>Robotic assisted therapy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="physio-therapists" id="therapists">
        <div className="physio-section-header">
          <span className="physio-section-badge">Meet Our Team</span>
          <h2 className="physio-section-title">Expert Physiotherapists</h2>
          <p className="physio-section-subtitle">Board-certified specialists with advanced training</p>
        </div>
        
        <div className="physio-therapists-grid">
          {therapists.map(therapist => (
            <div className="physio-therapist-card" key={therapist.id}>
              <div className="physio-therapist-header">
                <div className="physio-therapist-image">
                  <div className="physio-therapist-avatar">
                    <span className="physio-avatar-icon">{therapist.image}</span>
                  </div>
                  <div className="physio-therapist-badge">
                    <span className="physio-badge-icon">⭐</span>
                    Specialist
                  </div>
                </div>
                
                <div className="physio-therapist-info">
                  <h3 className="physio-therapist-name">{therapist.name}</h3>
                  <p className="physio-therapist-education">{therapist.education}</p>
                  <p className="physio-therapist-specialty">{therapist.specialty}</p>
                  
                  <div className="physio-therapist-details">
                    <div className="physio-therapist-detail">
                      <span className="physio-detail-icon">📅</span>
                      <span>{therapist.experience} experience</span>
                    </div>
                    <div className="physio-therapist-detail">
                      <span className="physio-detail-icon">🎓</span>
                      <span>Advanced Certifications</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="physio-therapist-expertise">
                <h4>Areas of Focus</h4>
                <div className="physio-expertise-tags">
                  {therapist.focus.map((focus, index) => (
                    <span className="physio-expertise-tag" key={index}>{focus}</span>
                  ))}
                </div>
              </div>
              
              <div className="physio-therapist-philosophy">
                <span className="physio-philosophy-icon">💬</span>
                <p className="physio-philosophy-text">"Empowering patients through movement and education for sustainable recovery."</p>
              </div>
              
              <a href="#assessment" className="physio-therapist-consult">
                Consult with Dr. {therapist.name.split(' ')[2]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="physio-testimonials">
        <div className="physio-testimonials-container">
          <div className="physio-testimonials-header">
            <span className="physio-testimonials-badge">Success Stories</span>
            <h2 className="physio-testimonials-title">Patient Recovery Journeys</h2>
            <p className="physio-testimonials-subtitle">Hear from patients who regained their mobility and quality of life</p>
          </div>
          
          <div className="physio-testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="physio-testimonial-card" key={testimonial.id}>
                <div className="physio-testimonial-header">
                  <div className="physio-testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`physio-rating-star ${i < testimonial.rating ? 'physio-star-active' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="physio-testimonial-condition">
                    {testimonial.condition}
                  </div>
                </div>
                
                <p className="physio-testimonial-text">"{testimonial.text}"</p>
                
                <div className="physio-testimonial-progress">
                  <div className="physio-progress-label">Treatment Duration</div>
                  <div className="physio-progress-value">{testimonial.duration}</div>
                </div>
                
                <div className="physio-testimonial-author">
                  <div className="physio-author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="physio-author-info">
                    <h4 className="physio-author-name">{testimonial.name}</h4>
                    <div className="physio-author-details">
                      <span className="physio-author-age">Age {testimonial.age}</span>
                      <span className="physio-author-success">Full recovery achieved</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="physio-assessment" id="assessment">
        <div className="physio-assessment-container">
          <div className="physio-assessment-form">
            <div className="physio-form-header">
              <h2 className="physio-form-title">Book Your Initial Assessment</h2>
              <p className="physio-form-subtitle">Start your journey to recovery with our comprehensive evaluation</p>
            </div>
            
            <form onSubmit={handleSubmit} className="physio-booking-form">
              <div className="physio-form-row">
                <div className="physio-form-group">
                  <label className="physio-form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="physio-form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="physio-form-group">
                  <label className="physio-form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="physio-form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="physio-form-row">
                <div className="physio-form-group">
                  <label className="physio-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="physio-form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="physio-form-group">
                  <label className="physio-form-label">Age Group *</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="physio-form-select"
                    required
                  >
                    <option value="">Select age group</option>
                    <option value="child">Child (0-12)</option>
                    <option value="teen">Teenager (13-17)</option>
                    <option value="adult">Adult (18-64)</option>
                    <option value="senior">Senior (65+)</option>
                  </select>
                </div>
              </div>
              
              <div className="physio-form-row">
                <div className="physio-form-group">
                  <label className="physio-form-label">Primary Condition *</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="physio-form-select"
                    required
                  >
                    <option value="">Select primary condition</option>
                    <option value="back">Back Pain/Injury</option>
                    <option value="neck">Neck Pain/Whiplash</option>
                    <option value="shoulder">Shoulder Injury</option>
                    <option value="knee">Knee Pain/Injury</option>
                    <option value="sports">Sports Injury</option>
                    <option value="post-surgery">Post-Surgical Recovery</option>
                    <option value="arthritis">Arthritis/Joint Pain</option>
                    <option value="neurological">Neurological Condition</option>
                    <option value="balance">Balance/Dizziness</option>
                    <option value="chronic">Chronic Pain</option>
                    <option value="work">Workplace Injury</option>
                    <option value="other">Other Condition</option>
                  </select>
                </div>
                
                <div className="physio-form-group">
                  <label className="physio-form-label">Appointment Type *</label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    className="physio-form-select"
                    required
                  >
                    <option value="new">Initial Assessment</option>
                    <option value="followup">Follow-up Session</option>
                    <option value="review">Treatment Review</option>
                  </select>
                </div>
              </div>
              
              <div className="physio-form-group">
                <label className="physio-form-label">Current Pain Level (1-10)</label>
                <div className="physio-pain-scale">
                  <input
                    type="range"
                    name="painLevel"
                    min="1"
                    max="10"
                    value={formData.painLevel}
                    onChange={handleInputChange}
                    className="physio-pain-slider"
                  />
                  <div className="physio-pain-labels">
                    <span>1 (Mild)</span>
                    <span className="physio-pain-value">{formData.painLevel}</span>
                    <span>10 (Severe)</span>
                  </div>
                </div>
              </div>
              
              <div className="physio-form-group">
                <label className="physio-form-label">Symptoms Description</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="physio-form-textarea"
                  placeholder="Please describe your symptoms, when they started, what makes them better/worse, and any previous treatments..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="physio-form-urgency">
                <label className="physio-urgency-label">
                  <input type="checkbox" />
                  <span className="physio-urgency-text">
                    This is a work-related injury (Workers' Compensation)
                  </span>
                </label>
                <label className="physio-urgency-label">
                  <input type="checkbox" />
                  <span className="physio-urgency-text">
                    I require wheelchair accessible facilities
                  </span>
                </label>
              </div>
              
              <button type="submit" className="physio-btn physio-btn-submit">
                <span className="physio-submit-icon">📋</span>
                Request Initial Assessment
              </button>
              
              <p className="physio-form-notice">
                We'll contact you within 24 hours to schedule your 60-minute comprehensive assessment. 
                Please bring any relevant medical reports or imaging to your appointment.
              </p>
            </form>
          </div>
          
          <div className="physio-assessment-info">
            <div className="physio-info-card">
              <div className="physio-info-header">
                <h3 className="physio-info-title">What to Expect at Your First Visit</h3>
                <p className="physio-info-subtitle">Comprehensive care from day one</p>
              </div>
              
              <div className="physio-info-features">
                <div className="physio-info-feature">
                  <div className="physio-feature-icon">
                    <span>📝</span>
                  </div>
                  <div>
                    <h4>Detailed Assessment</h4>
                    <p>60-minute comprehensive evaluation</p>
                  </div>
                </div>
                
                <div className="physio-info-feature">
                  <div className="physio-feature-icon">
                    <span>🎯</span>
                  </div>
                  <div>
                    <h4>Personalized Plan</h4>
                    <p>Customized treatment strategy</p>
                  </div>
                </div>
                
                <div className="physio-info-feature">
                  <div className="physio-feature-icon">
                    <span>🤝</span>
                  </div>
                  <div>
                    <h4>One-on-One Therapy</h4>
                    <p>Direct care from your physiotherapist</p>
                  </div>
                </div>
              </div>
              
              <div className="physio-clinic-hours">
                <h4 className="physio-hours-title">Clinic Hours</h4>
                <div className="physio-hours-grid">
                  <div className="physio-hour-item">
                    <span className="physio-hour-day">Monday - Thursday</span>
                    <span className="physio-hour-time">7:00 AM - 8:00 PM</span>
                  </div>
                  <div className="physio-hour-item">
                    <span className="physio-hour-day">Friday</span>
                    <span className="physio-hour-time">7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="physio-hour-item">
                    <span className="physio-hour-day">Saturday</span>
                    <span className="physio-hour-time">8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="physio-hour-item physio-telehealth">
                    <span className="physio-hour-day">Telehealth Available</span>
                    <span className="physio-hour-time">7 days a week</span>
                  </div>
                </div>
              </div>
              
              <div className="physio-insurance">
                <h4 className="physio-insurance-title">Insurance & Payment</h4>
                <div className="physio-insurance-features">
                  <div className="physio-insurance-feature">
                    <span className="physio-insurance-icon">✅</span>
                    <span>Most insurance plans accepted</span>
                  </div>
                  <div className="physio-insurance-feature">
                    <span className="physio-insurance-icon">✅</span>
                    <span>Direct billing available</span>
                  </div>
                  <div className="physio-insurance-feature">
                    <span className="physio-insurance-icon">✅</span>
                    <span>Workers' Compensation</span>
                  </div>
                  <div className="physio-insurance-feature">
                    <span className="physio-insurance-icon">✅</span>
                    <span>Motor vehicle accident claims</span>
                  </div>
                </div>
              </div>
              
              <div className="physio-contact-details">
                <div className="physio-contact-item">
                  <span className="physio-contact-icon">📍</span>
                  <div>
                    <h4>Our Location</h4>
                    <p>456 Movement Center, Suite 300</p>
                  </div>
                </div>
                
                <div className="physio-contact-item">
                  <span className="physio-contact-icon">📞</span>
                  <div>
                    <h4>Clinic Line</h4>
                    <p>(555) 456-PHYSIO</p>
                  </div>
                </div>
                
                <div className="physio-contact-item">
                  <span className="physio-contact-icon">🕒</span>
                  <div>
                    <h4>Extended Hours</h4>
                    <p>Early morning & evening appointments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="physio-footer">
        <div className="physio-footer-container">
          <div className="physio-footer-main">
            <div className="physio-footer-brand">
              <div className="physio-footer-logo">
                <span className="physio-footer-icon">💪🧘‍♀️🚶‍♂️</span>
                <div>
                  <h3 className="physio-footer-title">PhysioCare Clinic</h3>
                  <p className="physio-footer-tagline">Movement Medicine for Life</p>
                </div>
              </div>
              <p className="physio-footer-description">
                Providing exceptional evidence-based physiotherapy with compassion and expertise since 2005.
              </p>
              
              <div className="physio-footer-social">
                <a href="#" className="physio-social-link" aria-label="Facebook">
                  <span className="physio-social-icon">📘</span>
                </a>
                <a href="#" className="physio-social-link" aria-label="Instagram">
                  <span className="physio-social-icon">📷</span>
                </a>
                <a href="#" className="physio-social-link" aria-label="YouTube">
                  <span className="physio-social-icon">📺</span>
                </a>
                <a href="#" className="physio-social-link" aria-label="LinkedIn">
                  <span className="physio-social-icon">💼</span>
                </a>
              </div>
            </div>
            
            <div className="physio-footer-links">
              <div className="physio-footer-column">
                <h4 className="physio-column-title">Quick Links</h4>
                <a href="#home" className="physio-footer-link">Home</a>
                <a href="#treatments" className="physio-footer-link">Treatments</a>
                <a href="#conditions" className="physio-footer-link">Conditions</a>
                <a href="#therapists" className="physio-footer-link">Our Therapists</a>
                <a href="#facilities" className="physio-footer-link">Facilities</a>
              </div>
              
              <div className="physio-footer-column">
                <h4 className="physio-column-title">Services</h4>
                <a href="#" className="physio-footer-link">Sports Physio</a>
                <a href="#" className="physio-footer-link">Orthopedic Rehab</a>
                <a href="#" className="physio-footer-link">Neurological Therapy</a>
                <a href="#" className="physio-footer-link">Pediatric Physio</a>
                <a href="#" className="physio-footer-link">Women's Health</a>
              </div>
              
              <div className="physio-footer-column">
                <h4 className="physio-column-title">Contact Info</h4>
                <p className="physio-contact-info">📍 456 Movement Center, Suite 300</p>
                <p className="physio-contact-info">📞 (555) 456-PHYSIO</p>
                <p className="physio-contact-info">📧 info@physiocare.example</p>
                <p className="physio-contact-info">💻 Telehealth available</p>
                <p className="physio-contact-info">🕒 Mon-Thu: 7am-8pm, Fri: 7am-6pm, Sat: 8am-4pm</p>
              </div>
            </div>
          </div>
          
          <div className="physio-footer-bottom">
            <p className="physio-copyright">
              © {new Date().getFullYear()} PhysioCare Clinic. All rights reserved.
            </p>
            <div className="physio-footer-legal">
              <a href="#" className="physio-legal-link">Privacy Policy</a>
              <a href="#" className="physio-legal-link">Terms of Service</a>
              <a href="#" className="physio-legal-link">Patient Rights</a>
              <a href="#" className="physio-legal-link">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhysiotherapyClinic;