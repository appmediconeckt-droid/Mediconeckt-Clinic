import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSms.css';
import { getChatDoctors } from '../../../redux/chatApi';

const PatientSms = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const formatChatTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLastMessageText = (item) => {
    const lastMessage = item.lastMessage || item.last_message || item.latest_message;
    if (typeof lastMessage === 'string') return lastMessage;
    return lastMessage?.message || lastMessage?.text || item.message || item.content || 'No messages yet';
  };

  const getLastMessageTime = (item, doctor) => {
    const lastMessage = item.lastMessage || item.last_message || item.latest_message;
    return formatChatTime(
      lastMessage?.created_at ||
      lastMessage?.createdAt ||
      lastMessage?.time ||
      item.last_message_time ||
      item.created_at ||
      item.updated_at ||
      doctor.time ||
      doctor.last_message_time
    );
  };

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setStatus('loading');
        setError('');
        const doctorsData = await getChatDoctors();
        setDoctors(doctorsData.map((item, index) => {
          const doctor = item.doctor || item.user || item;
          return {
          id: doctor.id || doctor._id || doctor.doctor_id || item.doctor_id || doctor.user_id,
          name: doctor.full_name || doctor.fullname || doctor.name || doctor.doctor_name || item.doctor_name || 'Doctor',
          specialty: doctor.speciality || doctor.specialization || doctor.specialty || item.specialty || 'Doctor',
          lastMessage: getLastMessageText(item),
          time: getLastMessageTime(item, doctor),
          unread: item.unread || item.unread_count || doctor.unread || doctor.unread_count || 0,
          avatarColor: ['doctor-avatar-green', 'doctor-avatar-blue', 'doctor-avatar-purple', 'doctor-avatar-orange', 'doctor-avatar-teal'][index % 5],
          online: Boolean(doctor.online || doctor.is_online),
          phone: doctor.phone || doctor.phone_number || '',
          email: doctor.email || '',
          rating: doctor.rating || 0,
        };
        }));
        setStatus('succeeded');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load doctors');
        setStatus('failed');
      }
    };

    loadDoctors();
  }, []);

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
    <div className="patient-sms-container">
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
            {status === 'loading' ? (
              <div className="no-doctors-found">
                <i className="fas fa-spinner no-doctor-icon"></i>
                <h3>Loading doctors...</h3>
              </div>
            ) : status === 'failed' ? (
              <div className="no-doctors-found">
                <i className="fas fa-exclamation-circle no-doctor-icon"></i>
                <h3>Unable to load doctors</h3>
                <p>{error}</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
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
                    className="patient-doctor-card"
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <div className="doctor-avatar-container">
                      <div className={`doctor-avatar ${doctor.avatarColor}`}>
                        {getInitials(doctor.name)}
                        {doctor.online && <span className="online-status"></span>}
                      </div>
                    </div>
                    
                    <div className="doctor-info">
                      <div className="doctor-name-container">
                        <h3 className="doctor-name">{doctor.name}</h3>
                        <span className="message-time">{doctor.time}</span>
                      </div>
                      
                      <div className="doctor-specialty-container">
                        <span className="doctor-specialty">{doctor.specialty}</span>
                        <div className="doctor-rating">
                          <div className="star-rating">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`fas fa-star ${i < Math.floor(doctor.rating) ? 'filled' : 'empty'}`}
                              ></i>
                            ))}
                          </div>
                          <span className="rating-value">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="doctor-message-preview">
                        <p className="last-message">{doctor.lastMessage}</p>
                        {doctor.unread > 0 && (
                          <span className="unread-badge">{doctor.unread}</span>
                        )}
                      </div>
                      
                      <div className="doctor-contact">
                        <span className="contact-item">
                          <i className="fas fa-phone"></i>
                          {doctor.phone}
                        </span>
                        <span className="contact-item">
                          <i className="fas fa-envelope"></i>
                          {doctor.email}
                        </span>
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
