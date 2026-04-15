import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from '../image/Mediconect-Logo-4.png';
import logo2 from '../image/Mediconect Logo-3.png';
import logo3 from '../image/Maillanding.jpg';

export default function LandingPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
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
    if (!isMobile) {
      setActiveDropdown(dropdown);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  }, [isMobile]);

  const handleMobileDropdown = useCallback((dropdown) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  }, [isMobile, activeDropdown]);

  const handleNavigation = useCallback((path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 300);
  }, [navigate]);

  const handleRoleSignup = useCallback((role, path) => {
    setIsNavigating(true);
    localStorage.setItem('signupRole', role);
    setTimeout(() => {
      navigate(`${path}?role=${role.toLowerCase()}`);
      setIsNavigating(false);
    }, 300);
  }, [navigate]);

  const dropdowns = {
    services: [
      { name: "Appointments", href: "#features" },
      { name: "Doctors", href: "#why-us" },
      { name: "Labs", href: "#contact" },
    ],
    auth: [
      { name: "Doctor", role: "doctor", path: "/signup" },
      { name: "Patient", role: "patient", path: "/patient" },
    ],
  };

  return (
    <div className="w-full min-vh-100 bg-light" style={{ overflowX: 'hidden' }}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-2 py-lg-3" style={{ zIndex: 1030 }}>
        <div className="container-fluid px-3 px-lg-4">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-brand d-flex align-items-center"
          >
            <motion.img
              src={logo}
              alt="Mediconect Logo"
              className="img-fluid"
              style={{ 
                maxWidth: isMobile ? '150px' : '200px',
                height: 'auto'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
          </motion.div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setActiveDropdown(null)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {/* Home Link */}
              <li className="nav-item mx-lg-2 my-2 my-lg-0">
                <a 
                  href="#"
                  className="nav-link fs-5 fw-medium text-dark"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Home
                </a>
              </li>

              {/* Services Dropdown */}
              <li className="nav-item mx-lg-2 my-2 my-lg-0 position-relative">
                <div className="d-flex align-items-center">
                  <a
                    className="nav-link fs-5 fw-medium dropdown-toggle text-dark"
                    href="#"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileDropdown("services");
                    }}
                    onMouseEnter={() => handleMouseEnter("services")}
                  >
                    Services
                  </a>
                </div>
                
                {/* Dropdown Menu - Desktop (Hover) & Mobile (Click) */}
                <div 
                  className={`dropdown-menu ${activeDropdown === "services" ? 'show' : ''} ${isMobile ? 'position-static' : 'position-absolute'}`}
                  onMouseEnter={() => handleMouseEnter("services")}
                  onMouseLeave={handleMouseLeave}
                  style={!isMobile ? {
                    minWidth: "200px",
                    zIndex: 1000,
                    marginTop: activeDropdown === "services" ? '0' : '-10px'
                  } : {}}
                >
                  {dropdowns.services.map((item, index) => (
                    <motion.a
                      key={index}
                      initial={!isMobile ? { opacity: 0, x: -10 } : false}
                      animate={!isMobile ? { opacity: 1, x: 0 } : false}
                      transition={{ delay: index * 0.05 }}
                      className="dropdown-item py-3 px-4 fs-6 text-start w-100"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveDropdown(null);
                      }}
                      whileHover={!isMobile ? {
                        backgroundColor: "#f8f9fa",
                        paddingLeft: "25px",
                      } : {}}
                    >
                      <i className="fas fa-chevron-right me-2 text-primary"></i>
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </li>

              {/* Create Account Dropdown */}
              <li className="nav-item mx-lg-2 my-2 my-lg-0 position-relative">
                <div className="d-flex align-items-center">
                  <a
                    className="nav-link fs-5 fw-medium dropdown-toggle text-dark"
                    href="#"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileDropdown("auth");
                    }}
                    onMouseEnter={() => handleMouseEnter("auth")}
                  >
                    Create Account
                  </a>
                </div>
                
                {/* Dropdown Menu - Desktop (Hover) & Mobile (Click) */}
                <div 
                  className={`dropdown-menu ${activeDropdown === "auth" ? 'show' : ''} ${isMobile ? 'position-static' : 'position-absolute'}`}
                  onMouseEnter={() => handleMouseEnter("auth")}
                  onMouseLeave={handleMouseLeave}
                  style={!isMobile ? {
                    minWidth: "200px",
                    zIndex: 1000,
                    marginTop: activeDropdown === "auth" ? '0' : '-10px'
                  } : {}}
                >
                  {dropdowns.auth.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={!isMobile ? { opacity: 0, x: -10 } : false}
                      animate={!isMobile ? { opacity: 1, x: 0 } : false}
                      transition={{ delay: index * 0.05 }}
                      className="dropdown-item py-3 px-4 fs-6 text-start w-100 border-0 bg-transparent"
                      onClick={() => handleRoleSignup(item.role, item.path)}
                      disabled={isNavigating}
                      whileHover={!isMobile ? {
                        backgroundColor: "#f8f9fa",
                        paddingLeft: "25px",
                      } : {}}
                    >
                      {item.role === "doctor" ? (
                        <i className="fas fa-user-md me-2 text-primary"></i>
                      ) : (
                        <i className="fas fa-user-injured me-2 text-primary"></i>
                      )}
                      {item.name}
                      {isNavigating && (
                        <i className="fas fa-spinner fa-spin ms-2 text-primary"></i>
                      )}
                    </motion.button>
                  ))}
                </div>
              </li>

              {/* Login Button */}
              <li className="nav-item mx-lg-2 my-2 my-lg-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg px-4 py-2 rounded-pill fw-semibold"
                  onClick={() => handleNavigation("/login")}
                  disabled={isNavigating}
                  style={{
                    background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
                    color: 'white',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    width: isMobile ? '100%' : 'auto',
                    minWidth: '120px'
                  }}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  {isNavigating ? "Redirecting..." : "Login"}
                  {isNavigating && <i className="fas fa-spinner fa-spin ms-2"></i>}
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
        className="hero-section d-flex align-items-center justify-content-center position-relative pt-5"
        style={{
          height: '100vh',
          minHeight: '600px',
          paddingTop: '80px'
        }}
      >
        {/* Background Image with Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url(${logo3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          }}
        />
        
        {/* Dark Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        />
        
        <div className="container position-relative z-1 px-3 px-md-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center px-2"
          >
            <motion.h1 
              variants={fadeInUp} 
              className="display-4 display-md-3 fw-bold mb-3 mb-md-4 text-white"
            >
              Welcome to <span className="text-primary">Mediconect</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp} 
              className="lead fs-5 fs-md-4 mb-4 mb-md-5 text-light px-2"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px'
              }}
            >
              Your Trusted Healthcare Partner
            </motion.p>
            
            <motion.p 
              variants={fadeInUp} 
              className="mt-4 mt-md-5 text-light fs-6 fs-md-5 px-2"
            >
              Select your role during login to access personalized features
            </motion.p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="position-absolute bottom-0 start-50 translate-middle-x mb-3 mb-md-4 z-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: isMobile ? 'none' : 'block' }}
        >
          <i className="fas fa-chevron-down text-white fa-2x"></i>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light" id="features" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <div className="container py-4 py-md-5 px-3 px-md-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center display-6 display-md-5 fw-bold mb-4 mb-md-5 text-primary mt-5"
          >
            Our Features
          </motion.h2>

          <div className="row g-3 g-md-4 justify-content-center">
            {[
              {
                icon: "fas fa-calendar-check",
                title: "Online Appointments",
                desc: "Book your doctor slot easily and track timing updates instantly."
              },
              {
                icon: "fas fa-file-medical",
                title: "Digital Medical Records",
                desc: "Access all your reports and prescriptions anytime, anywhere."
              },
              {
                icon: "fas fa-qrcode",
                title: "QR Based Check-in",
                desc: "Scan QR to book appointments and get instant queue numbers."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0"
                whileHover={{ y: -10 }}
              >
                <div className="card border-0 shadow h-100 rounded-4 p-3 p-md-4 text-center hover-card">
                  <div className="card-body d-flex flex-column">
                    <div className="feature-icon mb-3 mb-md-4">
                      <i className={`${feature.icon} text-primary`} style={{fontSize: isMobile ? "60px" : "80px"}}></i>
                    </div>
                    <h3 className="card-title h4 h3-md fw-semibold mb-2 mb-md-3">
                      {feature.title}
                    </h3>
                    <p className="card-text fs-6 fs-md-5 flex-grow-1">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-5 bg-white" id="why-us" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <div className="container py-4 py-md-5 px-3 px-md-4">
          <div className="row align-items-center g-4 g-md-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="col-lg-6 order-2 order-lg-1"
            >
              <h2 className="display-6 display-md-5 fw-bold mb-3 mb-md-4 text-primary">Why Choose Mediconect?</h2>
              <p className="lead mb-3 mb-md-4 fs-6 fs-md-5">
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
                    className="mb-2 mb-md-3 d-flex align-items-center"
                  >
                    <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                    <span className="fs-6 fs-md-5">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0"
            >
              <div className="position-relative text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2967/2967358.png"
                  alt="health"
                  className="img-fluid rounded-4 shadow"
                  style={{ maxWidth: isMobile ? '80%' : '100%' }}
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
                  className="position-absolute top-0 end-0 bg-primary text-white p-2 p-md-3 rounded-circle shadow"
                  style={{ 
                    transform: 'translate(25%, -25%)',
                    fontSize: isMobile ? '1rem' : '1.5rem'
                  }}
                >
                  <i className="fas fa-heartbeat"></i>
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
        <div className="container py-4 py-md-5 px-3 px-md-4">
          <div className="row text-center text-white">
            {[
              {
                icon: "fas fa-user-md",
                value: "500+",
                label: "Expert Doctors",
              },
              { 
                icon: "fas fa-users", 
                value: "50K+", 
                label: "Happy Patients" 
              },
              {
                icon: "fas fa-hospital",
                value: "24/7",
                label: "Service Hours",
              },
              { 
                icon: "fas fa-star", 
                value: "98%", 
                label: "Satisfaction Rate" 
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="col-6 col-md-3 mb-3 mb-md-4"
              >
                <div className="p-2 p-md-3 p-lg-4">
                  <i className={`${stat.icon} mb-2 mb-md-3`} style={{ fontSize: isMobile ? '2rem' : '2.5rem' }}></i>
                  <h3 className="display-5 display-md-4 fw-bold mb-1 mb-md-2">{stat.value}</h3>
                  <p className="fs-6 fs-md-5 mb-0">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4 py-md-5" id="contact" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <div className="container px-3 px-md-4">
          <div className="row g-3 g-md-4">
            {/* Logo and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0"
            >
              <div className="text-center text-md-start">
                <motion.img
                  src={logo2}
                  alt="Mediconect Logo"
                  className="mb-3"
                  style={{ 
                    width: isMobile ? '80px' : '100px',
                    height: 'auto'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
                <h3 className="h4 fw-bold text-white mb-2">Mediconect</h3>
                <p className="fs-6 text-white-50 mb-2">Your trusted healthcare partner.</p>
                <p className="text-white-50 fs-6">
                  Bridging the gap between patients and healthcare providers through technology.
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-6 col-md-3 col-lg-2"
            >
              <h4 className="h5 fw-semibold mb-2 mb-md-3">Quick Links</h4>
              <ul className="list-unstyled">
                {["Home", "Services", "Features", "Why Us", "Contact"].map(
                  (link, index) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      className="mb-1 mb-md-2"
                    >
                      <a
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        className="text-decoration-none text-white-50 fs-6 hover-text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          const section = document.querySelector(`#${link.toLowerCase().replace(' ', '-')}`);
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {link}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-6 col-md-3 col-lg-3"
            >
              <h4 className="h5 fw-semibold mb-2 mb-md-3">Contact Us</h4>
              <ul className="list-unstyled fs-6">
                <li className="mb-2 mb-md-3 d-flex align-items-start">
                  <i className="fas fa-envelope me-2 mt-1" style={{ minWidth: '20px' }}></i>
                  <span>support@mediconect.com</span>
                </li>
                <li className="mb-2 mb-md-3 d-flex align-items-center">
                  <i className="fas fa-phone me-2" style={{ minWidth: '20px' }}></i>
                  <span>+91 9876543210</span>
                </li>
                <li className="d-flex align-items-start">
                  <i className="fas fa-map-marker-alt me-2 mt-1" style={{ minWidth: '20px' }}></i>
                  <span>123 Health Street, Medical City, India</span>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-12 col-md-12 col-lg-3"
            >
              <h4 className="h5 fw-semibold mb-2 mb-md-3">Newsletter</h4>
              <p className="text-white-50 mb-2 mb-md-3 fs-6">
                Subscribe to get updates on health tips and new features.
              </p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm"
                  type="button"
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
              </div>
              <div className="social-icons mt-3">
                <p className="mb-2 fs-6">Follow us:</p>
                {["facebook", "twitter", "instagram", "linkedin"].map(
                  (social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.2, y: -3 }}
                      className="text-white me-3 fs-5"
                      style={{ display: 'inline-block' }}
                    >
                      <i className={`fab fa-${social}`}></i>
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-4 pt-3 border-top border-secondary"
          >
            <p className="mb-0 text-white-50 fs-6">
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
          exit={{ opacity: 0 }}
          className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column align-items-center justify-content-center"
          style={{ zIndex: 9999 }}
        >
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary h4"
          >
            Redirecting...
          </motion.h3>
        </motion.div>
      )}

      
       
     
    </div>
  );
}