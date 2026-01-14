import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from '../image/Mediconect-Logo-4.png';
import backgroundImage from '../image/Background-Image-05-07-24-scaled.jpg';
import logo2 from '../image/Mediconect Logo-3.png';

export default function LandingPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  // Load role from localStorage on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleMouseEnter = useCallback((dropdown) => {
    setActiveDropdown(dropdown);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleRoleSelect = useCallback(
    (role) => {
      setIsNavigating(true);
      localStorage.setItem("userRole", role);
      setUserRole(role);
      setActiveDropdown(null);

      // Simulate navigation delay
      setTimeout(() => {
        if (role === "doctor") {
          navigate("/signup");
        } else if (role === "patient") {
          navigate("/patient");
        }
        setIsNavigating(false);
      }, 0);
    },
    [navigate]
  );

  const clearRole = useCallback(() => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  }, []);

  const handleGoToDashboard = useCallback(() => {
    setIsNavigating(true);
    // Simulate navigation delay
    setTimeout(() => {
      if (userRole === "doctor") {
        navigate("/signup");
      } else {
        navigate("/patient");
      }
      setIsNavigating(false);
    }, 0);
  }, [userRole, navigate]);

  const dropdowns = {
    services: [
      { name: "Appointments", href: "#" },
      { name: "Doctors", href: "#" },
      { name: "Labs", href: "#" },
    ],
    signup: [
      { name: "Doctor", role: "doctor" },
      { name: "Patient", role: "patient" },
    ],
  };

  return (
    <div className="w-full min-vh-100 bg-light">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-3">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-brand fs-2 fw-bold text-primary mb-0 d-flex align-items-center"
          >
            <motion.img
              src={logo}
              alt="Hospital Logo"
              width={250}
              height={50}
              className="me-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
          </motion.h1>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {/* Services Dropdown - Hover Version */}
              <li
                className="nav-item mx-2 position-relative"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  className="nav-link fs-5 fw-medium dropdown-toggle-hover"
                  href="#"
                  role="button"
                  aria-expanded={activeDropdown === "services"}
                >
                  Services
                </a>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="dropdown-menu show position-absolute mt-0 shadow-lg border-0 rounded-3"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    {dropdowns.services.map((item, index) => (
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="dropdown-item py-3 px-4 fs-6 text-start w-100 border-0 bg-transparent text-decoration-none"
                        href={item.href}
                        whileHover={{
                          backgroundColor: "#f8f9fa",
                          paddingLeft: "25px",
                        }}
                      >
                        
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </li>

              {/* Signup Dropdown - Hover Version */}
              <li
                className="nav-item mx-2 position-relative"
                onMouseEnter={() => handleMouseEnter("signup")}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  className="nav-link fs-5 fw-medium dropdown-toggle-hover"
                  href="#"
                  role="button"
                  aria-expanded={activeDropdown === "signup"}
                >
                  Signup / Login
                </a>
                {activeDropdown === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="dropdown-menu show position-absolute mt-0 shadow-lg border-0 rounded-3"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    {dropdowns.signup.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="dropdown-item py-3 px-4 fs-6 text-start w-100 border-0 bg-transparent"
                        onClick={() => handleRoleSelect(item.role)}
                        disabled={isNavigating}
                        whileHover={{
                          backgroundColor: "#f8f9fa",
                          paddingLeft: "25px",
                        }}
                      >
                        <i className="fas fa-user-plus me-2 text-primary"></i>
                        {item.name}
                        {isNavigating && item.role === userRole && (
                          <i className="fas fa-spinner fa-spin ms-2 text-primary"></i>
                        )}
                        {!isNavigating && userRole === item.role && (
                          <i className="fas fa-check text-success ms-2"></i>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section 
        className="hero-section d-flex align-items-center justify-content-center position-relative"
        style={{
          height: '100vh',
          minHeight: '600px',
          marginTop: '0px',
        }}
      >
        {/* Background Image with Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay for better text visibility */}
        <div 
          className="position-absolute w-100 h-100"
         
        />
        
        <div className="container position-relative z-1">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Role Selection Prompt */}
            {!userRole ? (
              <>
                <motion.h1 
                  variants={fadeInUp} 
                  className="display-3 fw-bold mb-4 text-white"
                >
                  Welcome to <span className="text-primary">Mediconeckt</span>
                </motion.h1>
                
                {/* <motion.p 
                  variants={fadeInUp} 
                  className="lead fs-3 mb-5 text-white fw-medium"
                >
                  Your Trusted Healthcare Partner
                </motion.p> */}
                
                <motion.p 
                  variants={fadeInUp} 
                  className="lead fs-4 mb-5 text-light"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    borderRadius: '50px'
                  }}
                >
                  Please select your role to continue
                </motion.p>
                
                <motion.div variants={fadeInUp} className="d-flex justify-content-center gap-4 flex-wrap mt-5">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold text-primary shadow-lg"
                    onClick={() => handleRoleSelect("doctor")}
                    disabled={isNavigating}
                  >
                    <i className="fas fa-user-md me-2"></i>
                    {isNavigating ? "Redirecting..." : "Continue as Doctor"}
                    {isNavigating && <i className="fas fa-spinner fa-spin ms-2"></i>}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-semibold shadow-lg"
                    onClick={() => handleRoleSelect("patient")}
                    disabled={isNavigating}
                  >
                    <i className="fas fa-user me-2"></i>
                    {isNavigating ? "Redirecting..." : "Continue as Patient"}
                    {isNavigating && <i className="fas fa-spinner fa-spin ms-2"></i>}
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.h1 
                  variants={fadeInUp} 
                  className="display-3 fw-bold mb-4 text-white"
                >
                  Welcome, <span className="text-warning">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}!</span>
                </motion.h1>
                <motion.p 
                  variants={fadeInUp} 
                  className="lead fs-3 mb-5 text-white fw-medium"
                >
                  {userRole === "doctor"
                    ? "Manage your appointments and patient records efficiently."
                    : "Book appointments, view reports, and manage your health."}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleIn}
                  className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold text-primary shadow-lg"
                  onClick={handleGoToDashboard}
                  disabled={isNavigating}
                >
                  {isNavigating ? "Redirecting..." : "Go to Dashboard"}
                  {isNavigating ? (
                    <i className="fas fa-spinner fa-spin ms-2"></i>
                  ) : (
                    <i className="fas fa-arrow-right ms-2"></i>
                  )}
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-chevron-down text-white fa-2x"></i>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light" id="features">
        <div className="container py-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center display-5 fw-bold mb-5 text-primary"
          >
            Our Features
          </motion.h2>

          <div className="row g-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-md-4"
              whileHover={{ y: -10 }}
            >
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center hover-card">
                <div className="card-body">
                  <div className="feature-icon mb-4">
                    <i className="fas fa-calendar-check fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h3 fw-semibold mb-3">
                    Online Appointments
                  </h3>
                  <p className="card-text fs-5">
                    Book your doctor slot easily and track timing updates
                    instantly.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-md-4"
              whileHover={{ y: -10 }}
            >
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center hover-card">
                <div className="card-body">
                  <div className="feature-icon mb-4">
                    <i className="fas fa-file-medical fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h3 fw-semibold mb-3">
                    Digital Medical Records
                  </h3>
                  <p className="card-text fs-5">
                    Access all your reports and prescriptions anytime, anywhere.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-md-4"
              whileHover={{ y: -10 }}
            >
              <div className="card border-0 shadow-lg h-100 rounded-4 p-4 text-center hover-card">
                <div className="card-body">
                  <div className="feature-icon mb-4">
                    <i className="fas fa-qrcode fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title h3 fw-semibold mb-3">
                    QR Based Check-in
                  </h3>
                  <p className="card-text fs-5">
                    Scan QR to book appointments and get instant queue numbers.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-5 bg-white" id="why-us">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-lg-6"
            >
              <h2 className="display-5 fw-bold mb-4 text-primary">Why Choose Mediconect?</h2>
              <p className="lead mb-4 fs-5">
                We provide seamless healthcare services with modern technology
                to make your experience smooth and fast.
              </p>
              <ul className="list-unstyled">
                {[
                  "24/7 doctor availability",
                  "Secure patient data with encryption",
                  "Easy communication between doctor & patient",
                  "Fast appointment system with QR code",
                  "Multi-specialty hospital network",
                  "Insurance & billing support"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mb-3 d-flex align-items-center"
                  >
                    <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                    <span className="fs-5">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-lg-6"
            >
              <div className="position-relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2967/2967358.png"
                  alt="health"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="position-absolute top-0 end-0 bg-primary text-white p-3 rounded-circle shadow"
                >
                  <i className="fas fa-heartbeat fa-2x"></i>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row text-center text-white">
            {[
              {
                icon: "fas fa-user-md",
                value: "500+",
                label: "Expert Doctors",
              },
              { icon: "fas fa-users", value: "50K+", label: "Happy Patients" },
              {
                icon: "fas fa-hospital",
                value: "24/7",
                label: "Service Hours",
              },
              { icon: "fas fa-star", value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="col-md-3 col-6 mb-4"
              >
                <div className="p-4">
                  <i className={`${stat.icon} fa-3x mb-3`}></i>
                  <h3 className="display-4 fw-bold">{stat.value}</h3>
                  <p className="fs-5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-5" id="contact">
        <div className="p-4">
          <div className="row g-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-md-4"
            >
              <div className="text-center text-md-start">
                <motion.img
                  src={logo2}
                  alt="Hospital Logo"
                  width={120}
                  height={120}
                  className="mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
                <h3 className="h4 fw-bold text-white mb-3">Mediconeckt</h3>
                <p className="fs-5 text-white-50">Your trusted healthcare partner.</p>
                <p className="text-white-50">
                  Bridging the gap between patients and healthcare providers through technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-md-2"
            >
              <h4 className="h4 fw-semibold mb-3">Quick Links</h4>
              <ul className="list-unstyled">
                {["Home", "Doctors", "Services", "About", "Contact"].map(
                  (link, index) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      className="mb-2"
                    >
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-decoration-none text-white-50 fs-5 hover-text-primary"
                      >
                        {link}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-md-3"
            >
              <h4 className="h4 fw-semibold mb-3">Contact Us</h4>
              <ul className="list-unstyled fs-5">
                <li className="mb-3 d-flex align-items-start">
                  <i className="fas fa-envelope me-3 mt-1"></i>
                  <span>support@mediconect.com</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="fas fa-phone me-3"></i>
                  <span>+91 9876543210</span>
                </li>
                <li className="d-flex align-items-start">
                  <i className="fas fa-map-marker-alt me-3 mt-1"></i>
                  <span>123 Health Street, Medical City, India</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-md-3"
            >
              <h4 className="h4 fw-semibold mb-3">Newsletter</h4>
              <p className="text-white-50 mb-3">
                Subscribe to get updates on health tips and new features.
              </p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  type="button"
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
              </div>
              <div className="social-icons mt-4">
                <p className="mb-2">Follow us:</p>
                {["facebook", "twitter", "instagram", "linkedin", "youtube"].map(
                  (social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="text-white me-3 fs-5"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-5 pt-4 border-top border-secondary"
          >
            <p className="mb-0 text-white-50">
              © {new Date().getFullYear()} Mediconect. All Rights Reserved. | 
              <a href="#" className="text-white-50 ms-2 text-decoration-none">Privacy Policy</a> | 
              <a href="#" className="text-white-50 ms-2 text-decoration-none">Terms of Service</a>
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column align-items-center justify-content-center"
          style={{ zIndex: 9999 }}
        >
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary"
          >
            Redirecting...
          </motion.h3>
        </motion.div>
      )}

      {/* Demo Info Alert */}
      {userRole && !isNavigating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded-3 shadow-lg"
          
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-user-circle me-2"></i>
            <span className="me-3">
              <strong>{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Mode</strong>
            </span>
            <button
              onClick={clearRole}
              className="btn btn-sm btn-light"
            >
              Change Role
            </button>
          </div>
        </motion.div>
      )}

      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .hover-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .hover-card:hover {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }

        .hover-text-primary:hover {
          color: #0d6efd !important;
        }

        .feature-icon {
          transition: transform 0.3s ease;
        }

        .hover-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        /* Custom dropdown hover styles */
        .dropdown-toggle-hover {
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .dropdown-toggle-hover:hover {
          color: #0d6efd !important;
        }

        .dropdown-menu {
          animation: fadeIn 0.2s ease;
        }

        .dropdown-item {
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .social-icons a {
          transition: color 0.3s ease;
        }

        .social-icons a:hover {
          color: #0d6efd !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-section p {
            font-size: 1.1rem !important;
          }
          
          .btn-lg {
            padding: 0.8rem 1.5rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}