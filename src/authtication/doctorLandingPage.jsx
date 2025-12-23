// File: doctorLandingPage.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./doctorLandingPage.css";
import { Link } from "react-router-dom";

export default function DoctorLandingPage() {
  const specialities = [
    {
      name: "Cardiologist",
      img: "https://img.icons8.com/color/96/heart-with-pulse.png",
      desc: "Heart and blood vessel specialists",
    },
    {
      name: "Dentist",
      img: "https://img.icons8.com/color/96/tooth.png",
      desc: "Oral health and dental care",
    },
    {
      name: "Neurologist",
      img: "https://img.icons8.com/color/96/brain.png",
      desc: "Brain and nervous system specialists",
    },
    {
      name: "Orthopedic",
      img: "https://img.icons8.com/color/96/bone.png",
      desc: "Bone and joint specialists",
    },
    {
      name: "Eye Specialist",
      img: "https://img.icons8.com/color/96/visible.png",
      desc: "Vision and eye care",
    },
    {
      name: "Skin Specialist",
      img: "https://img.icons8.com/color/96/skin-type-3.png",
      desc: "Dermatology and skin care",
    },
    {
      name: "Pediatrician",
      img: "https://img.icons8.com/color/96/baby.png",
      desc: "Child health specialists",
    },
    {
      name: "Gynecologist",
      img: "https://img.icons8.com/color/96/women-health.png",
      desc: "Women's health specialists",
    },
    {
      name: "Psychiatrist",
      img: "https://img.icons8.com/color/96/mental-health.png",
      desc: "Mental health specialists",
    },
    {
      name: "ENT Specialist",
      img: "https://img.icons8.com/color/96/ear-nose-throat.png",
      desc: "Ear, Nose and Throat",
    },
    {
      name: "Gastroenterologist",
      img: "https://img.icons8.com/color/96/stomach.png",
      desc: "Digestive system specialists",
    },
    {
      name: "Urologist",
      img: "https://img.icons8.com/color/96/kidney.png",
      desc: "Urinary system specialists",
    },
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "12 years",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Pediatrician",
      experience: "10 years",
      rating: 4.7,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Robert Kim",
      specialization: "Orthopedic",
      experience: "18 years",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
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
          <a className="navbar-brand fw-bold text-primary fs-3" href="#">
            <span className="text-primary">🩺</span> DoctorCare
          </a>

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
          {/* <div className="d-flex justify-content-center gap-3">
            <Link to="/appointment">
              <button className="btn btn-light btn-lg px-4">
                Book Appointment
              </button>
            </Link>
            <button className="btn btn-outline-light btn-lg px-4">
              Consult Online
            </button>
          </div> */}
          <div className="row mt-5 stats-row">
            <div className="col-md-3" style={{borderRadius:"100%"}}>
              <h3 className="fw-bold">500+</h3>
              <p>Expert Doctors</p>
            </div>
            <div className="col-md-3" style={{borderRadius:"100%"}}>
              <h3 className="fw-bold">50+</h3>
              <p>Specialities</p>
            </div>
            <div className="col-md-3"style={{borderRadius:"100%"}}>
              <h3 className="fw-bold">10K+</h3>
              <p>Happy Patients</p>
            </div>
            <div className="col-md-3"style={{borderRadius:"100%"}}>
              <h3 className="fw-bold">24/7</h3>
              <p>Emergency Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIALITY SECTION ================= */}
      <section id="specialities" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Medical Specialities</h2>
          <p className="text-muted">
            Choose from 50+ medical specialities with top specialists
          </p>
        </div>

        <div className="row">
          {specialities.map((item, index) => (
            <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
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
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Meet Our Expert Doctors</h2>
            <p className="text-muted">
              Highly qualified and experienced medical professionals
            </p>
          </div>

          <div className="row">
            {doctors.map((doctor, index) => (
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
                    <Link to={`/doctor/${index}`}>
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
      <section id="services" className="container py-5">
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
        <div className="container">
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
        <div className="container">
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