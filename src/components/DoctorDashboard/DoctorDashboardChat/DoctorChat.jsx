import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPaperPlane, 
  FaPaperclip, 
  FaImage, 
  FaFilePdf, 
  FaFileMedical,
  FaDownload,
  FaVideo,
  FaPhone,
  FaEllipsisV,
  FaUserMd,
  FaStethoscope,
  FaCheck,
  FaCheckDouble,
  FaSmile,
  FaMicrophone,
  FaSearch
} from 'react-icons/fa';

import './DoctorChat.css';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    status: 'Stable',
    lastVisit: '2024-01-15',
    phone: '+1 (555) 123-4567',
    avatarColor: '#00a884',
    bloodGroup: 'O+',
    lastSeen: '10:30 AM'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    condition: 'Diabetes Type 2',
    status: 'Needs Attention',
    lastVisit: '2024-01-14',
    phone: '+1 (555) 234-5678',
    avatarColor: '#e74c3c',
    bloodGroup: 'A-',
    lastSeen: 'Yesterday'
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    condition: 'Arthritis',
    status: 'Improving',
    lastVisit: '2024-01-12',
    phone: '+1 (555) 345-6789',
    avatarColor: '#2ecc71',
    bloodGroup: 'B+',
    lastSeen: '2 days ago'
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 29,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    lastVisit: '2024-01-10',
    phone: '+1 (555) 456-7890',
    avatarColor: '#9b59b6',
    bloodGroup: 'AB+',
    lastSeen: 'Online'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male',
    condition: 'Heart Disease',
    status: 'Critical',
    lastVisit: '2024-01-13',
    phone: '+1 (555) 567-8901',
    avatarColor: '#f39c12',
    bloodGroup: 'O-',
    lastSeen: 'Just now'
  }
];

// Mock chat messages
const mockChats = {
  1: [
    { 
      id: 1, 
      text: 'Hello Doctor, I am feeling dizzy today.', 
      sender: 'patient', 
      time: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    { 
      id: 2, 
      text: 'Please take your prescribed medicine and rest. How is your blood pressure?', 
      sender: 'doctor', 
      time: '10:35 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      text: 'My latest blood report',
      sender: 'patient',
      time: '11:00 AM',
      type: 'file',
      file: { 
        name: 'blood_report_jan2024.pdf', 
        type: 'pdf', 
        size: '2.4 MB',
        url: '#'
      }
    },
    { 
      id: 4, 
      text: 'Monitor your BP and let me know in 2 hours. Please send me your readings.', 
      sender: 'doctor', 
      time: '11:05 AM',
      type: 'text',
      status: 'sent'
    },
    {
      id: 5,
      text: 'BP readings chart for this week',
      sender: 'doctor',
      time: '11:10 AM',
      type: 'file',
      file: { 
        name: 'bp_monitoring_chart.png', 
        type: 'image', 
        size: '1.2 MB',
        url: '#'
      }
    },
    { 
      id: 6, 
      text: 'Okay Doctor, will do. Thank you!', 
      sender: 'patient', 
      time: '11:15 AM',
      type: 'text'
    },
  ],
  2: [
    { 
      id: 1, 
      text: 'My blood sugar reading today is 250 mg/dL.', 
      sender: 'patient', 
      time: '09:00 AM',
      type: 'text'
    },
    { 
      id: 2, 
      text: 'Please avoid sweets and take insulin as prescribed. Check again in 1 hour.', 
      sender: 'doctor', 
      time: '09:15 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      text: 'Updated insulin prescription',
      sender: 'doctor',
      time: '09:20 AM',
      type: 'file',
      file: { 
        name: 'insulin_prescription_jan.pdf', 
        type: 'pdf', 
        size: '1.8 MB',
        url: '#'
      }
    },
  ],
  3: [
    { 
      id: 1, 
      text: 'Joint pain is much better today after the new medication.', 
      sender: 'patient', 
      time: 'Yesterday',
      type: 'text'
    },
    { 
      id: 2, 
      text: 'Good to hear. Continue with the exercises I recommended.', 
      sender: 'doctor', 
      time: 'Yesterday',
      type: 'text',
      status: 'read'
    },
  ],
  4: [
    { 
      id: 1, 
      text: 'Breathing is normal now, thank you doctor! 😊', 
      sender: 'patient', 
      time: '2 days ago',
      type: 'text'
    },
    {
      id: 2,
      text: 'Latest X-Ray results show improvement',
      sender: 'doctor',
      time: '2 days ago',
      type: 'file',
      file: { 
        name: 'chest_xray_results.jpg', 
        type: 'image', 
        size: '3.5 MB',
        url: '#'
      }
    },
  ],
  5: [
    { 
      id: 1, 
      text: 'Chest pain has started again, need advice.', 
      sender: 'patient', 
      time: 'Today',
      type: 'text'
    },
    { 
      id: 2, 
      text: 'Please come to emergency immediately! I will alert the cardiac team.', 
      sender: 'doctor', 
      time: 'Today',
      type: 'text',
      status: 'delivered'
    },
    {
      id: 3,
      text: 'ECG Report from this morning',
      sender: 'patient',
      time: 'Today',
      type: 'file',
      file: { 
        name: 'ecg_report_emergency.pdf', 
        type: 'pdf', 
        size: '4.1 MB',
        url: '#'
      }
    },
  ]
};

const DoctorChat = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [typing, setTyping] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Find current patient
  const currentPatient = mockPatients.find(p => p.id === parseInt(patientId));

  useEffect(() => {
    // Load chat messages for this patient
    if (patientId && mockChats[patientId]) {
      setMessages(mockChats[patientId]);
    }
  
    // Simulate online status
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 10000);
  
    // Simulate typing indicator
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7 && messages.length > 0) {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    }, 10000);
  
    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [patientId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowFileOptions(false);
      
      // Auto-reply simulation after 1-3 seconds
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: getRandomReply(),
          sender: 'patient',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const getRandomReply = () => {
    const replies = [
      'Thank you doctor, I will do that.',
      'Understood, will follow your advice.',
      'Okay, thank you for the guidance.',
      'Noted, I will update you tomorrow.',
      'Thank you for your response.',
      'I appreciate your help, doctor.'
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleFileSelect = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt';
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type === 'application/pdf' ? 'pdf' : 'document';
      const fileName = file.name;

      const newMessage = {
        id: messages.length + 1,
        text: ``,
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        file: {
          name: fileName,
          type: fileType,
          size: fileSize,
          url: URL.createObjectURL(file)
        },
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setShowFileOptions(false);
    }
  };

  const handleDownloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (timeString) => {
    if (timeString.toLowerCase() === 'today') {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (timeString.toLowerCase() === 'yesterday') {
      return 'Yesterday';
    }

    if (timeString.includes('days ago')) {
      return timeString;
    }

    return timeString;
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <FaFilePdf />;
      case 'image': return <FaImage />;
      default: return <FaFileMedical />;
    }
  };

  const getFileColor = (fileType) => {
    switch (fileType) {
      case 'pdf': return '#e74c3c';
      case 'image': return '#00a884';
      default: return '#3b82f6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <FaCheck />;
      case 'delivered': return <FaCheckDouble />;
      case 'read': return <FaCheckDouble style={{ color: '#00a884' }} />;
      default: return null;
    }
  };

  const handleVideoCall = () => {
    alert(`Initiating video call with ${currentPatient?.name}`);
  };

  const handleVoiceCall = () => {
    alert(`Calling ${currentPatient?.phone}`);
  };

  const handleBackClick = () => {
    navigate('/patient-sms');
  };

  if (!currentPatient) {
    return (
      <div className="drchat-patient-not-found">
        <div className="drchat-not-found-content">
          <h2>Patient Not Found</h2>
          <p>The patient you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBackClick} className="drchat-back-btn">
            <FaArrowLeft /> Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="drchat-container mt-5 ">
      {/* Header */}
      <header className="drchat-header mt-2">
        <div className="drchat-header-content">
          <button onClick={handleBackClick} className="drchat-back-btn">
            <FaArrowLeft />
          </button>
          
          <div className="drchat-patient-profile">
            <div className="drchat-avatar-container">
              <div 
                className="drchat-patient-avatar" 
                style={{ backgroundColor: currentPatient.avatarColor }}
              >
                {currentPatient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`drchat-online-status ${isOnline ? 'online' : 'offline'}`} />
            </div>
            <div className="drchat-patient-info">
              <h2 className="drchat-patient-name">{currentPatient.name}</h2>
              <div className="drchat-patient-status-text">
                {typing ? (
                  <span className="drchat-typing-indicator">typing...</span>
                ) : isOnline ? (
                  <span className="drchat-online-text">online</span>
                ) : (
                  <span className="drchat-last-seen">last seen {currentPatient.lastSeen}</span>
                )}
              </div>
            </div>
          </div>

          <div className="drchat-header-actions">
            <button 
              className="drchat-action-btn drchat-search-btn"
              title="Search"
              aria-label="Search"
            >
              <FaSearch />
            </button>
            <button 
              className="drchat-action-btn drchat-video-btn"
              onClick={handleVideoCall}
              title="Video Call"
              aria-label="Video Call"
            >
              <FaVideo />
            </button>
            <button 
              className="drchat-action-btn drchat-menu-btn" 
              title="More options"
              aria-label="More options"
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="drchat-chatdoctor-area ">
        <div className="drchat-messages-wrapper" >
          <div className="drchat-messages-container" ref={messagesContainerRef}>
            {/* Date Separator */}
            <div className="drchat-date-separator">
              <span>Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Welcome Message */}
            <div className="drchat-welcome-message">
              <div className="drchat-welcome-content">
                <div 
                  className="drchat-welcome-avatar"
                  style={{ backgroundColor: currentPatient.avatarColor }}
                >
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="drchat-welcome-text">
                  <h3>{currentPatient.name}</h3>
                  <p>{currentPatient.age}y • {currentPatient.gender} • {currentPatient.condition}</p>
                  <small>Blood Group: {currentPatient.bloodGroup}</small>
                </div>
              </div>
              <p className="drchat-welcome-note">
                This is the beginning of your conversation with {currentPatient.name}. 
                All messages are encrypted for privacy.
              </p>
            </div>

            {/* Messages List */}
            <div className="drchat-messages-list">
              {messages.length === 0 ? (
                <div className="drchat-empty-state">
                  <div className="drchat-empty-icon">
                    <FaStethoscope />
                  </div>
                  <h3>No Messages Yet</h3>
                  <p>Start the conversation with {currentPatient.name}</p>
                  <small>Your messages will appear here</small>
                </div>
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`drchat-message drchat-message-${msg.sender}`}
                      data-message-index={index}
                    >
                      <div className="drchat-message-content">
                        {msg.text && <p className="drchat-message-text">{msg.text}</p>}
                        
                        {msg.type === 'file' && msg.file && (
                          <div 
                            className="drchat-file-attachment"
                            style={{ borderLeftColor: getFileColor(msg.file.type) }}
                            onClick={() => handleDownloadFile(msg.file.url, msg.file.name)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && handleDownloadFile(msg.file.url, msg.file.name)}
                          >
                            <div className="drchat-file-icon" style={{ color: getFileColor(msg.file.type) }}>
                              {getFileIcon(msg.file.type)}
                            </div>
                            <div className="drchat-file-details">
                              <h4 className="drchat-file-name">{msg.file.name}</h4>
                              <div className="drchat-file-meta">
                                <span className="drchat-file-type">{msg.file.type.toUpperCase()}</span>
                                <span className="drchat-file-size">{msg.file.size}</span>
                              </div>
                            </div>
                            <button 
                              className="drchat-file-download"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadFile(msg.file.url, msg.file.name);
                              }}
                              title="Download file"
                              aria-label={`Download ${msg.file.name}`}
                            >
                              <FaDownload />
                            </button>
                          </div>
                        )}
                        
                        <div className="drchat-message-footer">
                          <span className="drchat-message-time">{formatTime(msg.time)}</span>
                          {msg.sender === 'doctor' && msg.status && (
                            <span className="drchat-message-status">
                              {getStatusIcon(msg.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {typing && (
                    <div className="drchat-message drchat-message-patient">
                      <div className="drchat-message-content">
                        <div className="drchat-typing-bubble">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} className="drchat-scroll-anchor" />
                </>
              )}
            </div>
          </div>

          {/* File Options Popup */}
          {showFileOptions && (
            <div className="drchat-file-options">
              <div className="drchat-file-options-content">
                <h4>Attach File</h4>
                <button 
                  className="drchat-file-option"
                  onClick={() => handleFileSelect('image')}
                  aria-label="Attach Image"
                >
                  <FaImage />
                  <span>Image</span>
                </button>
                <button 
                  className="drchat-file-option"
                  onClick={() => handleFileSelect('document')}
                  aria-label="Attach Document"
                >
                  <FaFilePdf />
                  <span>Document</span>
                </button>
                <button 
                  className="drchat-file-option"
                  onClick={() => handleFileSelect('medical')}
                  aria-label="Attach Medical Record"
                >
                  <FaFileMedical />
                  <span>Medical Record</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          aria-label="File upload"
        />
      </div>

      {/* Message Input */}
      <footer className="drchat-footer mb-5">
        <div className="drchat-input-wrapper">
          <form className="drchat-input-form" onSubmit={handleSendMessage}>
            <button
              type="button"
              className="drchat-attach-btn"
              onClick={() => setShowFileOptions(!showFileOptions)}
              aria-label="Attach file"
              aria-expanded={showFileOptions}
            >
              <FaPaperclip />
            </button>

            <div className="drchat-input-container">
              <input
                type="text"
                className="drchat-message-input"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Type message"
                autoComplete="off"
              />
              <button
                type="button"
                className="drchat-emoji-btn"
                aria-label="Emoji"
              >
                <FaSmile />
              </button>
            </div>

            {message.trim() ? (
              <button
                type="submit"
                className="drchat-send-btn"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            ) : (
              <button
                type="button"
                className="drchat-mic-btn"
                aria-label="Voice message"
              >
                <FaMicrophone />
              </button>
            )}
          </form>
        </div>
      </footer>
    </div>
  );
};

export default DoctorChat;