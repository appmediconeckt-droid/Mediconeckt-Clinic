import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorLandingPage.css";
import { Link } from "react-router-dom";

export default function DoctorLandingPage() {
  // Doctor-specific specialities
  const doctorSpecialities = [
    { 
      name: "Cardiology", 
      icon: "❤️",
      desc: "Heart care & cardiovascular treatments"
    },
    { 
      name: "Neurology", 
      icon: "🧠",
      desc: "Brain & nervous system disorders"
    },
    { 
      name: "Orthopedics", 
      icon: "🦴",
      desc: "Bones, joints & musculoskeletal"
    },
    { 
      name: "Pediatrics", 
      icon: "👶",
      desc: "Child healthcare & development"
    },
    { 
      name: "Dermatology", 
      icon: "🔬",
      desc: "Skin conditions & treatments"
    },
    { 
      name: "Surgery", 
      icon: "⚕️",
      desc: "Surgical procedures & operations"
    },
  ];

  // Doctor resources
  const doctorResources = [
    {
      title: "Patient Management",
      desc: "Efficient patient tracking and records",
      icon: "📋"
    },
    {
      title: "E-Prescriptions",
      desc: "Digital prescription management",
      icon: "💊"
    },
    {
      title: "Medical Library",
      desc: "Access to latest research & journals",
      icon: "📚"
    },
    {
      title: "Telemedicine Tools",
      desc: "Virtual consultation platform",
      icon: "🎥"
    },
    {
      title: "Billing System",
      desc: "Streamlined medical billing",
      icon: "💰"
    },
    {
      title: "Schedule Manager",
      desc: "Appointment scheduling system",
      icon: "📅"
    }
  ];

  // Practice statistics for doctors
  const practiceStats = [
    { value: "24/7", label: "Support Available" },
    { value: "500+", label: "Medical Journals" },
    { value: "Secure", label: "Patient Data" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

  // Featured medical tools
  const medicalTools = [
    {
      name: "Diagnostic Assistant",
      category: "AI Tool",
      rating: 4.9,
      description: "AI-powered diagnostic support system"
    },
    {
      name: "Treatment Planner",
      category: "Planning Tool",
      rating: 4.7,
      description: "Personalized treatment plan generator"
    },
    {
      name: "Drug Interactions",
      category: "Safety Tool",
      rating: 4.8,
      description: "Real-time medication interaction checker"
    },
    {
      name: "Clinical Guidelines",
      category: "Reference",
      rating: 4.6,
      description: "Latest clinical practice guidelines"
    }
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-doctor bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand doctor-brand" to="/">
            <span className="doctor-brand-icon">🏥</span> Doctor
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#doctorNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse mt-3" id="doctorNavbar">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <a className="nav-link active" href="#doctor-home">
                  Dashboard
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="#doctor-specialities">
                  Specialities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#doctor-tools">
                  Medical Tools
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#doctor-resources">
                  Resources
                </a>
              </li>
              {/* <li className="nav-item dropdown doctor-dropdown">
                <span className="nav-link dropdown-toggle">My Practice</span>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Patient Records
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Appointments
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Medical History
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Billing & Reports
                    </a>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item ms-3 mb-3">
                <Link to="/login">
                  <button className="btn btn-outline-primary doctor-btn-outline">
                 Login
                  </button>
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link to="/signup">
                  <button className="btn btn-primary doctor-btn-primary">
                    Signup
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= DOCTOR HERO SECTION ================= */}
      <section id="doctor-home" className="doctor-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="doctor-hero-title">
                Professional Medical Platform <span className="text-primary">for Doctors</span>
              </h1>
              <p className="doctor-hero-subtitle">
                Advanced tools, secure patient management, and professional resources 
                designed specifically for medical practitioners.
              </p>
              <div className="doctor-hero-buttons mt-4">
                <Link to="/login">
                  <button className="btn btn-primary btn-lg doctor-btn-primary me-3">
                    Access Dashboard
                  </button>
                </Link>
                <Link to="/features">
                  <button className="btn btn-outline-primary btn-lg doctor-btn-outline">
                    Explore Features
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="doctor-hero-image">
                <div className="doctor-stats-card">
                  <div className="row text-center">
                    {practiceStats.map((stat, index) => (
                      <div className="col-6 mb-4" key={index}>
                        <div className="doctor-stat-item">
                          <h3 className="doctor-stat-value">{stat.value}</h3>
                          <p className="doctor-stat-label">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEDICAL SPECIALITIES ================= */}
      <section id="doctor-specialities" className="doctor-specialities py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="doctor-section-title">Medical Specialities</h2>
            <p className="doctor-section-subtitle">
              Connect with specialists across various medical disciplines
            </p>
          </div>

          <div className="row">
            {doctorSpecialities.map((speciality, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="doctor-speciality-card">
                  <div className="doctor-speciality-icon">
                    <span style={{ fontSize: "2.5rem" }}>{speciality.icon}</span>
                  </div>
                  <div className="doctor-speciality-content">
                    <h5 className="doctor-speciality-name">{speciality.name}</h5>
                    <p className="doctor-speciality-desc">{speciality.desc}</p>
                    <a href="#" className="doctor-speciality-link">
                      Explore Network →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MEDICAL TOOLS SECTION ================= */}
      <section id="doctor-tools" className="doctor-tools bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="doctor-section-title">Advanced Medical Tools</h2>
            <p className="doctor-section-subtitle">
              AI-powered tools to enhance diagnostic accuracy and treatment planning
            </p>
          </div>

          <div className="row">
            {medicalTools.map((tool, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="doctor-tool-card">
                  <div className="doctor-tool-header">
                    <span className="doctor-tool-category">{tool.category}</span>
                    <div className="doctor-tool-rating">
                      ⭐ {tool.rating}
                    </div>
                  </div>
                  <h5 className="doctor-tool-name">{tool.name}</h5>
                  <p className="doctor-tool-desc">{tool.description}</p>
                  <div className="doctor-tool-actions">
                    <button className="btn btn-sm doctor-tool-btn">
                      Try Demo
                    </button>
                    <button className="btn btn-sm doctor-tool-btn-outline">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTOR RESOURCES ================= */}
      <section id="doctor-resources" className="doctor-resources py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="doctor-section-title">Practice Management Resources</h2>
            <p className="doctor-section-subtitle">
              Everything you need to manage your medical practice efficiently
            </p>
          </div>

          <div className="row">
            {doctorResources.map((resource, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="doctor-resource-card">
                  <div className="doctor-resource-icon">
                    <span style={{ fontSize: "2.5rem" }}>{resource.icon}</span>
                  </div>
                  <div className="doctor-resource-content">
                    <h5 className="doctor-resource-title">{resource.title}</h5>
                    <p className="doctor-resource-desc">{resource.desc}</p>
                    <a href="#" className="doctor-resource-link">
                      Access Tool →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROFESSIONAL FEATURES ================= */}
      <section className="doctor-features bg-primary text-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="doctor-features-title">Why Join Our Network?</h2>
          </div>

          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="doctor-feature-icon">
                <span>🔒</span>
              </div>
              <h5>HIPAA Compliant</h5>
              <p className="small">
                Fully secure and compliant with medical data regulations
              </p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="doctor-feature-icon">
                <span>📈</span>
              </div>
              <h5>Practice Growth</h5>
              <p className="small">
                Tools to expand your practice and patient reach
              </p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="doctor-feature-icon">
                <span>🤝</span>
              </div>
              <h5>Peer Network</h5>
              <p className="small">
                Connect with medical professionals worldwide
              </p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="doctor-feature-icon">
                <span>🎓</span>
              </div>
              <h5>CME Credits</h5>
              <p className="small">
                Earn continuing medical education credits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DOCTOR FOOTER ================= */}
      <footer className="doctor-footer bg-dark text-white pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h4 className="doctor-footer-brand">
                <span className="doctor-footer-icon">🏥</span> Mediconeckt
              </h4>
              <p className="doctor-footer-about">
                A professional platform designed exclusively for medical practitioners, 
                providing tools, resources, and networking opportunities.
              </p>
              <div className="doctor-social-icons mt-4">
                <a href="#" className="doctor-social-link">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="doctor-social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="doctor-social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="doctor-social-link">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="doctor-footer-heading">For Doctors</h5>
              <ul className="doctor-footer-links">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Patient Management</a></li>
                <li><a href="#">Medical Tools</a></li>
                <li><a href="#">Resources</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="doctor-footer-heading">Legal</h5>
              <ul className="doctor-footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">HIPAA Compliance</a></li>
                <li><a href="#">Data Security</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="doctor-footer-heading">Contact</h5>
              <ul className="doctor-footer-contact">
                <li>
                  <i className="bi bi-telephone"></i>
                  <span>Doctor Support: 1-800-DOC-Help</span>
                </li>
                <li>
                  <i className="bi bi-envelope"></i>
                  <span>doctors@medconnectpro.com</span>
                </li>
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <span>Medical Plaza, Suite 500</span>
                </li>
                <li>
                  <i className="bi bi-clock"></i>
                  <span>24/7 Technical Support</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="doctor-footer-divider" />

          <div className="doctor-footer-bottom">
            <div className="row">
              <div className="col-md-6 text-center text-md-start">
                <p className="mb-0">© 2024 MedConnect Pro. For Medical Professionals Only.</p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <a href="#" className="doctor-footer-bottom-link">Privacy Policy</a>
                <a href="#" className="doctor-footer-bottom-link">Terms</a>
                <a href="#" className="doctor-footer-bottom-link">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}