import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./doctorLandingPage.css";
import { Link } from "react-router-dom";

export default function DoctorLandingPage() {
  const specialities = [
    { 
      name: "Cardiologist", 
      img: "https://img.icons8.com/color/96/heart-with-pulse.png", 
      desc: "Heart care experts",
      link: "/cardiologist" 
    },
    { 
      name: "Dentist", 
      img: "https://img.icons8.com/color/96/tooth.png", 
      desc: "Dental treatments",
      link: "/dentist" 
    },
    { 
      name: "Neurologist", 
      img: "https://img.icons8.com/color/96/brain.png", 
      desc: "Brain & nerves",
      link: "/neurologist" 
    },
    { 
      name: "Orthopedic", 
      img: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png", 
      desc: "Bones & joints",
      link: "/orthopedic" 
    },
    { 
      name: "Eye Specialist", 
      img: "https://img.icons8.com/color/96/visible.png", 
      desc: "Eye care",
      link: "/eye-specialist" 
    },
    { 
      name: "Skin Specialist", 
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png", 
      desc: "Skin treatments",
      link: "/skin-specialist" 
    },
    { 
      name: "Pediatrician", 
      img: "https://img.icons8.com/color/96/baby-feet.png", 
      desc: "Child healthcare",
      link: "/pediatrician" 
    },
    { 
      name: "Gynecologist", 
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774296.png", 
      desc: "Women's health",
      link: "/gynecologist" 
    },
    { 
      name: "Psychiatrist", 
      img: "https://img.icons8.com/color/96/mental-health.png", 
      desc: "Mental health",
      link: "/psychiatrist" 
    },
    { 
      name: "ENT Specialist", 
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774301.png", 
      desc: "Ear, Nose, Throat",
      link: "/ent-specialist" 
    },
    { 
      name: "Physiotherapist", 
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774314.png", 
      desc: "Physical therapy",
      link: "/physiotherapist" 
    },
    { 
      name: "General Physician", 
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774294.png", 
      desc: "Primary care",
      link: "/general-physician" 
    },
  ];

  const Doctors = [
    {
      id: 0,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      rating: 4.8,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      description: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart-related conditions. She specializes in interventional cardiology and preventive heart care.",
      education: [
        "MD - Harvard Medical School",
        "Fellowship in Cardiology - Johns Hopkins Hospital",
        "Board Certified in Cardiovascular Disease"
      ],
      contact: {
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@medicalclinic.com",
        clinicAddress: "123 Medical Center Blvd, Suite 405, New York, NY 10001"
      },
      availability: {
        days: ["Monday", "Wednesday", "Friday", "Saturday"],
        timings: "9:00 AM - 5:00 PM",
        nextAvailable: "Tomorrow at 10:00 AM"
      },
      appointmentTypes: [
        { type: "In-Clinic Visit", duration: "30 min", price: "$150" },
        { type: "Video Consultation", duration: "20 min", price: "$120" },
        { type: "Voice Call", duration: "15 min", price: "$80" },
        { type: "Emergency Consultation", duration: "45 min", price: "$250" }
      ],
      specialties: ["Coronary Artery Disease", "Heart Failure", "Hypertension", "Arrhythmia"],
      languages: ["English", "Spanish", "French"],
      reviews: [
        { patient: "Robert Chen", rating: 5, comment: "Excellent doctor, very thorough and caring." },
        { patient: "Maria Garcia", rating: 4.5, comment: "Great experience, explained everything clearly." }
      ]
    },
    {
      id: 1,
      name: "Dr. Michael Rodriguez",
      specialization: "Neurologist",
      rating: 4.9,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      description: "Dr. Michael Rodriguez is a renowned neurologist specializing in movement disorders and neurodegenerative diseases. He has published over 50 research papers in international journals.",
      education: [
        "MD - Stanford University School of Medicine",
        "PhD in Neuroscience - MIT",
        "Fellowship in Movement Disorders - Mayo Clinic"
      ],
      contact: {
        phone: "+1 (555) 987-6543",
        email: "m.rodriguez@neurocare.com",
        clinicAddress: "456 Brain Health Ave, Suite 210, Boston, MA 02115"
      },
      availability: {
        days: ["Tuesday", "Thursday", "Friday"],
        timings: "10:00 AM - 6:00 PM",
        nextAvailable: "Next Tuesday at 2:00 PM"
      },
      appointmentTypes: [
        { type: "In-Clinic Visit", duration: "45 min", price: "$200" },
        { type: "Video Consultation", duration: "30 min", price: "$150" },
        { type: "Follow-up Consultation", duration: "20 min", price: "$100" }
      ],
      specialties: ["Parkinson's Disease", "Alzheimer's", "Migraine", "Epilepsy"],
      languages: ["English", "Spanish"],
      reviews: [
        { patient: "James Wilson", rating: 5, comment: "Life-changing treatment for my Parkinson's." },
        { patient: "Lisa Thompson", rating: 5, comment: "Very knowledgeable and patient." }
      ]
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Pediatrician",
      rating: 4.7,
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      description: "Dr. Priya Sharma is a compassionate pediatrician dedicated to children's health and wellbeing. She believes in preventive care and building strong relationships with her young patients and their families.",
      education: [
        "MD - University of California, San Francisco",
        "Residency in Pediatrics - Boston Children's Hospital",
        "Board Certified in Pediatrics"
      ],
      contact: {
        phone: "+1 (555) 456-7890",
        email: "priya.sharma@childcareclinic.com",
        clinicAddress: "789 Children's Way, Suite 105, Chicago, IL 60611"
      },
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
        timings: "8:00 AM - 4:00 PM",
        nextAvailable: "Today at 3:00 PM"
      },
      appointmentTypes: [
        { type: "Well-Child Visit", duration: "30 min", price: "$120" },
        { type: "Sick Visit", duration: "20 min", price: "$100" },
        { type: "Video Consultation", duration: "15 min", price: "$80" },
        { type: "Vaccination Appointment", duration: "15 min", price: "$60" }
      ],
      specialties: ["Newborn Care", "Vaccinations", "Childhood Asthma", "Developmental Screening"],
      languages: ["English", "Hindi", "Gujarati"],
      reviews: [
        { patient: "Amanda Lee", rating: 4.5, comment: "My kids love visiting Dr. Sharma!" },
        { patient: "David Miller", rating: 5, comment: "Always patient and understanding with children." }
      ]
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      specialization: "Orthopedic Surgeon",
      rating: 4.6,
      experience: "18 years",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face",
      description: "Dr. James Wilson is an experienced orthopedic surgeon specializing in sports injuries and joint replacement surgeries. He has served as the team doctor for several professional sports teams.",
      education: [
        "MD - Duke University School of Medicine",
        "Orthopedic Surgery Residency - Hospital for Special Surgery",
        "Fellowship in Sports Medicine - Andrews Sports Medicine Center"
      ],
      contact: {
        phone: "+1 (555) 234-5678",
        email: "j.wilson@orthocare.com",
        clinicAddress: "321 Sports Medicine Plaza, Suite 500, Los Angeles, CA 90024"
      },
      availability: {
        days: ["Monday", "Wednesday", "Thursday"],
        timings: "7:00 AM - 3:00 PM",
        nextAvailable: "Next Wednesday at 11:00 AM"
      },
      appointmentTypes: [
        { type: "Surgical Consultation", duration: "45 min", price: "$250" },
        { type: "Follow-up Visit", duration: "20 min", price: "$120" },
        { type: "Video Consultation", duration: "25 min", price: "$150" },
        { type: "Second Opinion", duration: "60 min", price: "$300" }
      ],
      specialties: ["Knee Replacement", "ACL Reconstruction", "Shoulder Surgery", "Arthroscopy"],
      languages: ["English"],
      reviews: [
        { patient: "Tom Harris", rating: 5, comment: "Successful knee surgery, back to running in 6 months!" },
        { patient: "Susan Clark", rating: 4, comment: "Professional and skilled surgeon." }
      ]
    }
  ];

  const services = [
    {
      title: "Online Consultation",
      desc: "Virtual appointments from home",
      icon: "💻",
    },
    { title: "Emergency Care", desc: "24/7 emergency services", icon: "🚑" },
    {
      title: "Health Checkups",
      desc: "Comprehensive full body checkup",
      icon: "🏥",
    },
    { title: "Lab Tests", desc: "Accurate diagnostic tests", icon: "🔬" },
    {
      title: "Medicine Delivery",
      desc: "Home delivery of medicines",
      icon: "📦",
    },
    { title: "Second Opinion", desc: "Expert second opinions", icon: "👨‍⚕️" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
            <span className="text-primary">🩺</span> DoctorCare
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#specialities">
                  Specialities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#doctors">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>

              {/* Services Dropdown */}
              <li className="nav-item dropdown hover-dropdown">
                <span className="nav-link dropdown-toggle">More Services</span>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      General Checkup
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Heart Specialist
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dental Care
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Eye Care
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Physiotherapy
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Nutritionist
                    </a>
                  </li>
                </ul>
              </li>

              {/* Login/Signup Buttons */}
              <li className="nav-item ms-2">
                <Link to="/login">
                  <button className="btn btn-outline-primary">Login</button>
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="hero d-flex align-items-center justify-content-center text-white"
      >
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-3">Your Health, Our Priority</h1>
          <p className="lead mb-4">
            Find trusted doctors & book appointments instantly. 5000+ happy
            patients monthly.
          </p>
          <div className="row mt-5 stats-row">
            <div className="col-md-3" style={{ borderRadius: "100%" }}>
              <h3 className="fw-bold">500+</h3>
              <p>Expert Doctors</p>
            </div>
            <div className="col-md-3" style={{ borderRadius: "100%" }}>
              <h3 className="fw-bold">50+</h3>
              <p>Specialities</p>
            </div>
            <div className="col-md-3" style={{ borderRadius: "100%" }}>
              <h3 className="fw-bold">10K+</h3>
              <p>Happy Patients</p>
            </div>
            <div className="col-md-3" style={{ borderRadius: "100%" }}>
              <h3 className="fw-bold">24/7</h3>
              <p>Emergency Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIALITY SECTION ================= */}
      <section id="specialities" className="p-4 py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Medical Specialities</h2>
          <p className="text-muted">
            Choose from 50+ medical specialities with top specialists
          </p>
        </div>

        <div className="row">
          {specialities.map((item, index) => (
            <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
              <Link to={item.link} style={{textDecoration:"none"}}>
                <div className="card speciality-card text-center p-3 shadow-sm border-0 h-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="img-fluid mx-auto"
                    width="70"
                    height="70"
                  />
                  <h6 className="mt-3 mb-2 fw-bold">{item.name}</h6>
                  <small className="text-muted">{item.desc}</small>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-primary">
            View All Specialities →
          </button>
        </div>
      </section>

      {/* ================= FEATURED DOCTORS SECTION ================= */}
      <section id="doctors" className="bg-light py-5">
        <div className="p-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Meet Our Expert Doctors</h2>
            <p className="text-muted">
              Highly qualified and experienced medical professionals
            </p>
          </div>

          <div className="row">
            {Doctors.map((doctor, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card doctor-card shadow-sm border-0 h-100">
                  <div className="text-center pt-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="rounded-circle"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{doctor.name}</h5>
                    <p className="card-text text-primary">
                      {doctor.specialization}
                    </p>
                    <div className="d-flex justify-content-between text-muted small">
                      <span>⭐ {doctor.rating}/5</span>
                      <span>{doctor.experience} exp</span>
                    </div>
                    <Link to={`/doctor-details/${doctor.id}`}>
                      <button className="btn btn-primary btn-sm mt-3 w-100">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="p-4 py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Healthcare Services</h2>
          <p className="text-muted">
            Comprehensive medical services for all your needs
          </p>
        </div>

        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card service-card shadow-sm border-0 h-100 p-4">
                <div
                  className="service-icon mb-3"
                  style={{ fontSize: "2.5rem" }}
                >
                  {service.icon}
                </div>
                <h5>{service.title}</h5>
                <p className="text-muted">{service.desc}</p>
                <a href="#" className="text-primary text-decoration-none">
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="bg-primary text-white py-5">
        <div className="p-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose DoctorCare?</h2>
            <p>We provide exceptional healthcare with patient-first approach</p>
          </div>

          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div
                className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <span style={{ fontSize: "2rem" }}>👨‍⚕️</span>
              </div>
              <h5>Expert Doctors</h5>
              <p className="small">
                Board-certified specialists with 10+ years experience
              </p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div
                className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <span style={{ fontSize: "2rem" }}>⚡</span>
              </div>
              <h5>Instant Appointment</h5>
              <p className="small">Book appointments in less than 2 minutes</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div
                className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <span style={{ fontSize: "2rem" }}>🏥</span>
              </div>
              <h5>Advanced Facilities</h5>
              <p className="small">Modern equipment & certified laboratories</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div
                className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <span style={{ fontSize: "2rem" }}>💰</span>
              </div>
              <h5>Affordable Care</h5>
              <p className="small">Insurance accepted & transparent pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="p-4">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h4 className="mb-3">
                <span className="text-primary">🩺</span> DoctorCare
              </h4>
              <p className="text-light">
                Providing quality healthcare services with compassion and
                excellence since 2010.
              </p>
              <div className="social-icons mt-4">
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#home" className="text-light text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#specialities"
                    className="text-light text-decoration-none"
                  >
                    Specialities
                  </a>
                </li>
                <li>
                  <a
                    href="#doctors"
                    className="text-light text-decoration-none"
                  >
                    Doctors
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-light text-decoration-none"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3">Services</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Online Consultation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Emergency Care
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Health Checkup
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Medicine Delivery
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="mb-3">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2">📞 +1 (555) 123-4567</li>
                <li className="mb-2">✉️ info@doctorcare.com</li>
                <li className="mb-2">📍 123 Medical Street, Health City</li>
                <li>🕒 24/7 Emergency Service</li>
              </ul>
            </div>
          </div>

          <hr className="bg-light mt-4" />

          <div className="row mt-4">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">© 2025 DoctorCare. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-light text-decoration-none me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-light text-decoration-none me-3">
                Terms of Service
              </a>
              <a href="#" className="text-light text-decoration-none">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}