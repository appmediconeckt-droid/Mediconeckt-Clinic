import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaFileMedical,
  FaInstagram,
  FaLinkedinIn,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQrcode,
  FaStar,
  FaHospital,
  FaUserMd,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import logo from "../image/Mediconect-Logo-4.png";
import medicalPhoto from "../image/Maillanding.jpg";
import heroNurse from "../image/landing-nurse-transparent.png";
import "./MainLendingpage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSignup = (role, path) => {
    localStorage.setItem("signupRole", role);
    navigate(`${path}?role=${role}`);
  };

  const features = [
    {
      icon: <FaCalendarCheck />,
      title: "Online Appointments",
      text: "Book your doctor slot easily and track timing updates instantly.",
    },
    {
      icon: <FaFileMedical />,
      title: "Digital Medical Record",
      text: "Access all your reports and prescriptions anytime, anywhere.",
    },
    {
      icon: <FaQrcode />,
      title: "QR Based Check-In",
      text: "Book your doctor slot easily and track timing updates instantly.",
    },
  ];

  const reasons = [
    { icon: <FaClock />, text: "24/7 doctor availability", active: true },
    { icon: <FaLock />, text: "Secure patient data with encryption" },
    { icon: <FaUsers />, text: "Easy communication between doctor & patient" },
    { icon: <FaCalendarCheck />, text: "Fast appointment system with QR code" },
    { icon: <FaHospital />, text: "Multi-specialty hospital network" },
    { icon: <FaCheckCircle />, text: "Insurance & billing support" },
  ];

  const stats = [
    { icon: <FaUserMd />, value: "500+", label: "Expert Doctors" },
    { icon: <FaUsers />, value: "50k+", label: "Happy Patients" },
    { icon: <FaHospital />, value: "24/7", label: "Service Hours" },
    { icon: <FaStar />, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="mc-landing-page" id="top">
      <div className="mc-landing-shell">
        <header className="mc-site-header">
          <a className="mc-brand" href="https://mediconeckt.com/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Mediconeckt" />
          </a>

          <nav className="mc-nav-pills" aria-label="Primary navigation">
            <a className="mc-nav-link mc-nav-link-active" href="#top">
              <span>Home</span>
            </a>
            <a className="mc-nav-link" href="#features">Services</a>
            <a className="mc-nav-link" href="#why">Specialty</a>
            <a className="mc-nav-link" href="#why">About us</a>
            <a className="mc-nav-link" href="#contact">Contact</a>
          </nav>

          <div className="mc-header-actions">
            <div className="mc-account-wrap">
              <button
                className="mc-create-btn"
                type="button"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
              >
                Create Account
              </button>
              {accountOpen && (
                <div className="mc-account-menu">
                  <button type="button" onClick={() => handleSignup("doctor", "/signup")}>
                    Doctor
                  </button>
                  <button type="button" onClick={() => handleSignup("patient", "/patientsignup")}>
                    Patient
                  </button>
                </div>
              )}
            </div>
            <button className="mc-login-btn" type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </header>

        <section className="mc-hero">
          <div className="mc-hero-content">
            <h1>Mediconeckt</h1>
            <div className="mc-hero-copy">
              <p>Welcome to Mediconeckt</p>
              <span>Your Trusted HealthCare Partner</span>
            </div>
          </div>

          <div className="mc-hero-figure" aria-hidden="true">
            <div className="mc-hero-photo">
              <img src={heroNurse} alt="" />
            </div>
          </div>

          <div className="mc-hero-actions">
            <button className="mc-hero-account" type="button" onClick={() => navigate("/signup")}>
              <FaHospital />
              <span>Create your Account</span>
            </button>
            <button className="mc-hero-arrow" type="button" onClick={() => navigate("/signup")} aria-label="Create account">
              <FaArrowRight />
            </button>
          </div>
        </section>

        <section className="mc-features" id="features">
          <h2>Our Features</h2>
          <div className="mc-feature-grid">
            {features.map((feature) => (
              <article className="mc-feature-card" key={feature.title}>
                <div className="mc-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mc-why" id="why">
          <div className="mc-why-copy">
            <h2>Why Choose Mediconeckt</h2>
            <p>
              We provide seamless healthcare services with modern technology to make your
              experience smooth and fast.
            </p>
            <div className="mc-reason-list">
              {reasons.map((reason) => (
                <div className={`mc-reason ${reason.active ? "mc-reason-active" : ""}`} key={reason.text}>
                  <span>{reason.icon}</span>
                  <strong>{reason.text}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="mc-why-image">
            <img src={medicalPhoto} alt="Doctor consultation" />
          </div>
        </section>

        <section className="mc-stats" aria-label="Mediconeckt stats">
          {stats.map((stat) => (
            <article className="mc-stat" key={stat.label}>
              <span>{stat.icon}</span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </section>

        <footer className="mc-footer" id="contact">
          <div className="mc-footer-brand">
            <img src={logo} alt="Mediconeckt" />
            <p>Your trusted healthcare partner.</p>
            <small>Bridging the gap between patients and healthcare providers through technology.</small>
            <div className="mc-socials">
              <span><FaFacebookF /></span>
              <span><FaYoutube /></span>
              <span><FaInstagram /></span>
              <span><FaLinkedinIn /></span>
            </div>
          </div>

          <div className="mc-footer-links">
            <h3>Useful Links</h3>
            <button type="button" onClick={() => navigate("/doctor")}>Career</button>
            <button type="button" onClick={() => navigate("/login")}>Contact us</button>
            <button type="button" onClick={() => navigate("/signup")}>Una Doctor</button>
          </div>

          <div className="mc-footer-contact">
            <h3>Contact Us</h3>
            <p><FaMapMarkerAlt /> 23 New Street, Indore</p>
            <p><FaEnvelope /> akshat@gmail.com</p>
            <p><FaPhoneAlt /> 1234567890</p>
          </div>

          <button className="mc-back-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back To Top
            <FaArrowRight />
          </button>

          <div className="mc-footer-bottom">
            <span>Copyrights © 2026 mediconeckt</span>
            <span>Terms of Use | Privacy Policy</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
