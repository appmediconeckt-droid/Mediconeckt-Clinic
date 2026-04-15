import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSms.css';

const PatientSms = () => {
  const navigate = useNavigate();

  // State for doctors list
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      lastMessage: "Your test results are normal.",
      time: "10:30 AM",
      unread: 2,
      avatarColor: "doctor-avatar-green",
      online: true,
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@hospital.com",
      rating: 4.8
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      lastMessage: "Please schedule a follow-up appointment.",
      time: "Yesterday",
      unread: 0,
      avatarColor: "doctor-avatar-blue",
      online: true,
      phone: "+1 (555) 234-5678",
      email: "michael.chen@hospital.com",
      rating: 4.9
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      lastMessage: "The medication should be applied twice daily.",
      time: "Wednesday",
      unread: 1,
      avatarColor: "doctor-avatar-purple",
      online: false,
      phone: "+1 (555) 345-6789",
      email: "priya.sharma@hospital.com",
      rating: 4.7
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedic Surgeon",
      lastMessage: "X-ray shows improvement in healing.",
      time: "Monday",
      unread: 0,
      avatarColor: "doctor-avatar-orange",
      online: true,
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@hospital.com",
      rating: 4.6
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      lastMessage: "Vaccination schedule updated.",
      time: "Last week",
      unread: 0,
      avatarColor: "doctor-avatar-teal",
      online: false,
      phone: "+1 (555) 567-8901",
      email: "emily.davis@hospital.com",
      rating: 4.9
    },
    {
      id: 6,
      name: "Dr. James Miller",
      specialty: "Oncologist",
      lastMessage: "Treatment plan has been adjusted.",
      time: "2 days ago",
      unread: 3,
      avatarColor: "doctor-avatar-green",
      online: true,
      phone: "+1 (555) 678-9012",
      email: "james.miller@hospital.com",
      rating: 4.7
    },
    {
      id: 7,
      name: "Dr. Lisa Anderson",
      specialty: "Psychiatrist",
      lastMessage: "Let's discuss the therapy progress.",
      time: "Tuesday",
      unread: 0,
      avatarColor: "doctor-avatar-blue",
      online: false,
      phone: "+1 (555) 789-0123",
      email: "lisa.anderson@hospital.com",
      rating: 4.9
    },
    {
      id: 8,
      name: "Dr. David Martinez",
      specialty: "Gastroenterologist",
      lastMessage: "Endoscopy results are ready.",
      time: "Today",
      unread: 1,
      avatarColor: "doctor-avatar-purple",
      online: true,
      phone: "+1 (555) 890-1234",
      email: "david.martinez@hospital.com",
      rating: 4.8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle selecting a doctor - Navigate to chat page
  const handleSelectDoctor = (doctor) => {
    navigate(`/doctor-chat/${doctor.id}`);
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="patient-sms p-2">
      <div className="patient-sms-wrapper">

        {/* Doctor List Section */}
        <div className="doctor-list-section">

          <div className="doctor-list-header mt-3">
            <header className="app-header  d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
              <h1 >Messages</h1>

            </header>
            <div className="search-container">

              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="doctors-list-wrapper">
            {filteredDoctors.length === 0 ? (
              <div className="no-doctors-found">
                <i className="fas fa-user-md no-doctor-icon"></i>
                <h3>No doctors found</h3>
                <p>Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="doctors-list-scrollable">
                {filteredDoctors.map(doctor => (
                  <div
                    key={doctor.id}
                    className="patient-doctor-card d-flex align-items-center border rounded p-3 mb-3 bg-white"
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <div className="doctor-avatar-container me-3">
                      <div className={`doctor-avatar ${doctor.avatarColor} position-relative rounded-circle d-flex align-items-center justify-content-center text-white fw-bold`}
                        style={{ width: '60px', height: '60px' }}>
                        {getInitials(doctor.name)}
                        {doctor.online && <span className="online-status position-absolute bottom-0 end-0 bg-success rounded-circle" style={{ width: '12px', height: '12px', border: '2px solid white' }}></span>}
                      </div>
                    </div>

                    <div className="doctor-info flex-grow-1 d-flex align-items-center">
                      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center w-100">
                        {/* Doctor Name, Rating and Time */}
                        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-2 mb-md-0 flex-grow-1">
                          <h3 className="doctor-name fs-5 fw-bold mb-0 me-3">{doctor.name}</h3>
                          <div className="doctor-rating d-flex align-items-center mb-1 mb-md-0">
                            <div className="star-rating me-2">
                              {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star ${i < Math.floor(doctor.rating) ? 'text-warning' : 'text-secondary opacity-25'}`}
                                    style={{ fontSize: '0.9rem' }}
                                  ></i>
                              ))}
                            </div>
                            <span className="rating-value fw-bold me-3">{doctor.rating}</span>
                          </div>
                          <span className="message-time text-muted">{doctor.time}</span>
                        </div>

                        {/* Specialty and Contact Info */}
                        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-2 mb-md-0">
                          <span className="doctor-specialty badge bg-light text-dark me-3 mb-1 mb-md-0">{doctor.specialty}</span>
                          <div className="doctor-contact d-flex">
                            <span className="contact-item text-muted me-3">
                              <i className="fas fa-phone me-1"></i>
                              {doctor.phone}
                            </span>
                            <span className="contact-item text-muted">
                              <i className="fas fa-envelope me-1"></i>
                              {doctor.email}
                            </span>
                          </div>
                        </div>

                        {/* Last Message and Unread Badge */}
                        <div className="d-flex align-items-center justify-content-between w-100 mt-2">
                          <p className="doctor-message-preview text-muted mb-0 flex-grow-1">{doctor.lastMessage}</p>
                          {doctor.unread > 0 && (
                            <span className="unread-badge badge bg-danger rounded-pill ms-2">{doctor.unread}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSms;