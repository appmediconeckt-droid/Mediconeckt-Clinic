import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./doctorLandingPage.css";
import { Link } from "react-router-dom";

export default function PatientLandingPage() {
    const [activeSection, setActiveSection] = useState("home");

    const specialities = [
        { name: "Cardiologist", img: "https://img.icons8.com/color/96/heart-with-pulse.png", desc: "Heart care experts" },
        { name: "Dentist", img: "https://img.icons8.com/color/96/tooth.png", desc: "Dental treatments" },
        { name: "Neurologist", img: "https://img.icons8.com/color/96/brain.png", desc: "Brain & nerves" },
        { name: "Orthopedic", img: "https://img.icons8.com/color/96/bone.png", desc: "Bones & joints" },
        { name: "Eye Specialist", img: "https://img.icons8.com/color/96/visible.png", desc: "Eye care" },
        { name: "Skin Specialist", img: "https://img.icons8.com/color/96/skin-type-3.png", desc: "Skin treatments" },
        { name: "Pediatrician", img: "https://img.icons8.com/color/96/baby-feet.png", desc: "Child healthcare" },
        { name: "Gynecologist", img: "https://img.icons8.com/color/96/woman-obstetrician.png", desc: "Women's health" },
        { name: "Psychiatrist", img: "https://img.icons8.com/color/96/mental-health.png", desc: "Mental health" },
        { name: "ENT Specialist", img: "https://img.icons8.com/color/96/ear.png", desc: "Ear, Nose, Throat" },
        { name: "Physiotherapist", img: "https://img.icons8.com/color/96/physiotherapy.png", desc: "Physical therapy" },
        { name: "General Physician", img: "https://img.icons8.com/color/96/doctor.png", desc: "Primary care" },
    ];

    const services = [
        { title: "Book Appointment", desc: "Instant doctor appointment", icon: "📅", link: "/appointment" },
        { title: "Online Consultation", desc: "Video/chat consultation", icon: "💻", link: "/consultation" },
        { title: "My Reports", desc: "Access lab reports", icon: "📄", link: "/reports" },
        { title: "Medicine Orders", desc: "Order medicines online", icon: "💊", link: "/pharmacy" },
        { title: "Emergency Help", desc: "24/7 emergency support", icon: "🚑", link: "/emergency" },
        { title: "Health Packages", desc: "Affordable health plans", icon: "🏥", link: "/packages" },
        { title: "Health Records", desc: "Digital health records", icon: "📁", link: "/records" },
        { title: "Ambulance Service", desc: "Quick ambulance booking", icon: "🚨", link: "/ambulance" },
        { title: "Second Opinion", desc: "Expert second opinions", icon: "👨‍⚕️", link: "/second-opinion" },
    ];

    const topDoctors = [
        { name: "Dr. Rajesh Sharma", speciality: "Cardiologist", rating: 4.8, exp: "15 years", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Dr. Priya Patel", speciality: "Dermatologist", rating: 4.9, exp: "12 years", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Dr. Amit Verma", speciality: "Orthopedic", rating: 4.7, exp: "18 years", img: "https://randomuser.me/api/portraits/men/67.jpg" },
        { name: "Dr. Neha Singh", speciality: "Pediatrician", rating: 4.9, exp: "10 years", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    ];

    const testimonials = [
        { name: "Rahul Mehta", feedback: "Excellent service! Got my appointment instantly.", rating: 5 },
        { name: "Sunita Reddy", feedback: "Online consultation saved my time and effort.", rating: 5 },
        { name: "Karan Malhotra", feedback: "Medicine delivery was quick and reliable.", rating: 4 },
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
                        <span className="brand-icon">🩺</span> PatientCare
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                                    href="#home"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === 'specialities' ? 'active' : ''}`}
                                    href="#specialities"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('specialities'); }}
                                >
                                    Specialities
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                                    href="#services"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                                >
                                    Services
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === 'doctors' ? 'active' : ''}`}
                                    href="#doctors"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('doctors'); }}
                                >
                                    Doctors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
                                    href="#testimonials"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}
                                >
                                    Reviews
                                </a>
                            </li>

                            <li className="nav-item ms-3">
                                <Link to="/login">
                                    <button className="btn btn-outline-primary px-4">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link to="/patientsignup">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <section id="home" className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <h1 className="hero-title">Your Health, Our Priority</h1>
                            <p className="hero-subtitle">
                                Book appointments instantly, consult top doctors online, and manage your health records securely - all in one place.
                            </p>

                            <div className="hero-search">
                                <div className="input-group input-group-lg" >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search doctors, hospitals, symptoms..."
                                        style={{ marginTop: "0px" }}
                                    />
                                    <button className="btn btn-primary" type="button">
                                        <i className="bi bi-search"></i> Search
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                <Link to="/appointment">
                                    <button className="btn btn-primary btn-lg px-4 py-3">
                                        <i className="bi bi-calendar-check me-2"></i>
                                        Book Appointment
                                    </button>
                                </Link>
                                <Link to="/consultation">
                                    <button className="btn btn-outline-primary btn-lg px-4 py-3">
                                        <i className="bi bi-camera-video me-2"></i>
                                        Video Consult
                                    </button>
                                </Link>
                            </div>

                            <div className="row mt-5 pt-4 stats-container">
                                <div className="col-6 col-md-3">
                                    <h3 className="stats-number">10K+</h3>
                                    <p className="stats-label">Happy Patients</p>
                                </div>
                                <div className="col-6 col-md-3">
                                    <h3 className="stats-number">500+</h3>
                                    <p className="stats-label">Expert Doctors</p>
                                </div>
                                <div className="col-6 col-md-3">
                                    <h3 className="stats-number">24/7</h3>
                                    <p className="stats-label">Support</p>
                                </div>
                                <div className="col-6 col-md-3">
                                    <h3 className="stats-number">50+</h3>
                                    <p className="stats-label">Cities</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="hero-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                                    alt="Doctor Consultation"
                                    className="img-fluid rounded shadow"
                                    style={{ width: '700px', height: '500px', objectFit: 'cover', borderRadius: '20px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="how-it-works py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Get medical help in 3 simple steps</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4 text-center mb-4">
                            <div className="step-card p-4">
                                <div className="step-number">1</div>
                                <i className="bi bi-search step-icon"></i>
                                <h4 className="mt-3">Find a Doctor</h4>
                                <p>Search by speciality, symptoms or doctor name</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="step-card p-4">
                                <div className="step-number">2</div>
                                <i className="bi bi-calendar-check step-icon"></i>
                                <h4 className="mt-3">Book Appointment</h4>
                                <p>Choose time slot and book instantly</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="step-card p-4">
                                <div className="step-number">3</div>
                                <i className="bi bi-chat-dots step-icon"></i>
                                <h4 className="mt-3">Consult Online</h4>
                                <p>Video consultation from home</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SPECIALITIES ================= */}
            <section id="specialities" className="specialities-section py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Find Doctors by Speciality</h2>
                        <p className="section-subtitle">Choose from 50+ medical specialities</p>
                    </div>

                    <div className="row">
                        {specialities.map((item, i) => (
                            <div className="col-6 col-md-4 col-lg-2 mb-4" key={i}>
                                <div className="speciality-card text-center p-3 h-100">
                                    <div className="speciality-icon mb-3">
                                        <img src={item.img} alt={item.name} width="60" />
                                    </div>
                                    <h6 className="fw-bold">{item.name}</h6>
                                    <small className="text-muted">{item.desc}</small>
                                    <button className="btn btn-sm btn-outline-primary mt-2">
                                        Find Doctors
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/all-specialities">
                            <button className="btn btn-primary px-5">
                                View All Specialities
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <section id="services" className="services-section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Our Patient Services</h2>
                        <p className="section-subtitle">Comprehensive healthcare services at your fingertips</p>
                    </div>

                    <div className="row">
                        {services.map((service, i) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={i}>
                                <Link to={service.link} className="text-decoration-none">
                                    <div className="service-card shadow-sm h-100 p-4">
                                        <div className="service-icon mb-3">
                                            <span style={{ fontSize: "2.5rem" }}>{service.icon}</span>
                                        </div>
                                        <h5 className="service-title">{service.title}</h5>
                                        <p className="service-desc">{service.desc}</p>
                                        <div className="service-link">
                                            <i className="bi bi-arrow-right"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= TOP DOCTORS ================= */}
            <section id="doctors" className="doctors-section py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Our Top Doctors</h2>
                        <p className="section-subtitle">Verified and experienced medical professionals</p>
                    </div>

                    <div className="row">
                        {topDoctors.map((doctor, i) => (
                            <div className="col-md-6 col-lg-3 mb-4" key={i}>
                                <div className="doctor-card shadow-sm h-100">
                                    <div className="doctor-image">
                                        <img src={doctor.img} alt={doctor.name} />
                                    </div>
                                    <div className="doctor-info p-3">
                                        <h5 className="doctor-name">{doctor.name}</h5>
                                        <p className="doctor-speciality">{doctor.speciality}</p>
                                        <div className="doctor-rating mb-2">
                                            <span className="text-warning">
                                                {'★'.repeat(Math.floor(doctor.rating))}
                                                {'☆'.repeat(5 - Math.floor(doctor.rating))}
                                            </span>
                                            <span className="ms-2">{doctor.rating}/5</span>
                                        </div>
                                        <p className="doctor-exp"><i className="bi bi-briefcase me-1"></i> {doctor.exp} experience</p>
                                        <button className="btn btn-primary w-100 mt-2">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/all-doctors">
                            <button className="btn btn-outline-primary px-5">
                                View All Doctors
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section id="testimonials" className="testimonials-section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Patient Testimonials</h2>
                        <p className="section-subtitle">What our patients say about us</p>
                    </div>

                    <div className="row">
                        {testimonials.map((testimonial, i) => (
                            <div className="col-md-4 mb-4" key={i}>
                                <div className="testimonial-card p-4 h-100">
                                    <div className="rating mb-3">
                                        {'★'.repeat(testimonial.rating)}
                                        {'☆'.repeat(5 - testimonial.rating)}
                                    </div>
                                    <p className="testimonial-text">"{testimonial.feedback}"</p>
                                    <div className="testimonial-author mt-3">
                                        <div className="d-flex align-items-center">
                                            <div className="author-avatar me-3">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=random`}
                                                    alt={testimonial.name}
                                                    width="40"
                                                />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">{testimonial.name}</h6>
                                                <small className="text-muted">Patient</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= DOWNLOAD APP ================= */}
            <section className="app-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="mb-3">Download Our Mobile App</h2>
                            <p className="mb-4">Book appointments, consult doctors, order medicines and manage your health on the go.</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-dark btn-lg">
                                    <i className="bi bi-apple me-2"></i>
                                    App Store
                                </button>
                                <button className="btn btn-dark btn-lg">
                                    <i className="bi bi-google-play me-2"></i>
                                    Play Store
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 text-end">
                            <img
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Mobile App"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: "300px" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="footer-section">
                <div className="container pt-5 pb-4">
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <h4 className="footer-brand mb-3">
                                <span className="brand-icon">🩺</span> PatientCare
                            </h4>
                            <p className="footer-about">
                                Your trusted digital healthcare partner providing quality medical services with care and compassion.
                            </p>
                            <div className="social-icons mt-4">
                                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 mb-4">
                            <h5 className="footer-heading">Quick Links</h5>
                            <ul className="footer-links">
                                <li><a href="#home">Home</a></li>
                                <li><a href="#specialities">Specialities</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#doctors">Doctors</a></li>
                                <li><a href="#testimonials">Reviews</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-4 mb-4">
                            <h5 className="footer-heading">Services</h5>
                            <ul className="footer-links">
                                <li><a href="#">Book Appointment</a></li>
                                <li><a href="#">Online Consultation</a></li>
                                <li><a href="#">Medicine Delivery</a></li>
                                <li><a href="#">Lab Tests</a></li>
                                <li><a href="#">Emergency Care</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-4 mb-4">
                            <h5 className="footer-heading">Contact Us</h5>
                            <ul className="footer-contact">
                                <li><i className="bi bi-geo-alt"></i> 123 Medical Street, Health City</li>
                                <li><i className="bi bi-telephone"></i> +91 98765 43210</li>
                                <li><i className="bi bi-envelope"></i> support@patientcare.com</li>
                                <li><i className="bi bi-clock"></i> 24/7 Emergency Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom text-center mt-4 pt-4 border-top">
                        <p className="mb-0">© 2025 PatientCare. All Rights Reserved.</p>
                        <div className="mt-2">
                            <a href="#" className="footer-bottom-link">Privacy Policy</a> |
                            <a href="#" className="footer-bottom-link"> Terms of Service</a> |
                            <a href="#" className="footer-bottom-link"> Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}