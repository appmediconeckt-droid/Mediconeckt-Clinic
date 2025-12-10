import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function LandingPage() {
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const dropdowns = {
    services: [
      { name: "Appointments", href: "#" },
      { name: "Doctors", href: "#" },
      { name: "Labs", href: "#" },
    ],
    // login: [
    //   { name: "Doctor Login", href: "#" },
    //   { name: "Patient Login", href: "#" },
    // ],
    signup: [
      { name: "Doctor ", href: "/doctor" },
      { name: "Patient ", href: "#" },
    ],
  };

  return (
    <div className="w-full min-vh-100 bg-light">
      {/* NAVBAR with Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-3">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-brand fs-2 fw-bold text-primary mb-0"
          >
            <i className="fas fa-hospital me-2"></i>Hospital Portal
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
                        transition={{ delay: index * 0.1 }}
                        className="dropdown-item py-3 px-4 fs-6"
                        href={item.href}
                        whileHover={{
                          backgroundColor: "#f8f9fa",
                          paddingLeft: "25px",
                        }}
                      >
                        <i className="fas fa-chevron-right me-2 text-primary"></i>
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </li>

              {/* Login Dropdown - Hover Version */}
              {/* <li
                className="nav-item mx-2 position-relative"
                onMouseEnter={() => handleMouseEnter("login")}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  className="nav-link fs-5 fw-medium dropdown-toggle-hover"
                  href="#"
                  role="button"
                  aria-expanded={activeDropdown === "login"}
                >
                  Login
                </a>
                {activeDropdown === "login" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="dropdown-menu show position-absolute mt-0 shadow-lg border-0 rounded-3"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    {dropdowns.login.map((item, index) => (
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="dropdown-item py-3 px-4 fs-6"
                        href={item.href}
                        whileHover={{
                          backgroundColor: "#f8f9fa",
                          paddingLeft: "25px",
                        }}
                      >
                        <i className="fas fa-sign-in-alt me-2 text-primary"></i>
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </li> */}

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
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="dropdown-item py-3 px-4 fs-6"
                        href={item.href}
                        whileHover={{
                          backgroundColor: "#f8f9fa",
                          paddingLeft: "25px",
                        }}
                      >
                        <i className="fas fa-user-plus me-2 text-primary"></i>
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        className="hero-section min-vh-100 d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          
        }}
      >
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center text-white"
          >
            <motion.h1 variants={fadeInUp} className="display-3 fw-bold mb-4">
              Your Health, Our Priority
            </motion.h1>
            <motion.p variants={fadeInUp} className="lead fs-4 mb-5 opacity-90">
              Book appointments, view reports, connect with doctors, and manage
              your health efficiently.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={scaleIn}
              className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold text-primary shadow-lg"
            >
              Get Started <i className="fas fa-arrow-right ms-2"></i>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center display-5 fw-bold mb-5"
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
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-lg-6"
            >
              <h2 className="display-5 fw-bold mb-4">Why Choose Us?</h2>
              <p className="lead mb-4">
                We provide seamless healthcare services with modern technology
                to make your experience smooth and fast.
              </p>
              <ul className="list-unstyled">
                {[
                  "24/7 doctor availability",
                  "Secure patient data",
                  "Easy communication between doctor & patient",
                  "Fast appointment system with QR code",
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
      <footer className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row g-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-md-4"
            >
              <h3 className="h2 fw-semibold mb-3">
                <i className="fas fa-hospital me-2"></i>Hospital Portal
              </h3>
              <p className="fs-5">Your trusted healthcare partner.</p>
              <div className="social-icons mt-4">
                {["facebook", "twitter", "instagram", "linkedin"].map(
                  (social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="text-white me-3 fs-4"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </motion.a>
                  )
                )}
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
                {["Home", "Doctors", "Services", "Contact"].map(
                  (link, index) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      className="mb-2"
                    >
                      <a
                        href="#"
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
                <li className="mb-3 d-flex align-items-center">
                  <i className="fas fa-envelope me-3"></i>
                  <span>support@hospital.com</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="fas fa-phone me-3"></i>
                  <span>+91 9876543210</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="fas fa-map-marker-alt me-3"></i>
                  <span>123 Health Street, Medical City</span>
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
                Subscribe to get updates on health tips.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
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
              © 2025 Hospital Portal. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 50px 50px;
          animation: float 20s linear infinite;
        }

        .hover-card {
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
          animation: fadeIn 0.3s ease;
        }

        .dropdown-item {
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(-50px, -50px) rotate(360deg);
          }
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
      `}</style>
    </div>
  );
}
