// DoctorChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane, FaPhone, FaUserMd, FaStethoscope, FaFile, FaPaperclip, FaImage, FaFilePdf, FaFileMedical } from 'react-icons/fa';
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
    avatarColor: '#3498db',
    bloodGroup: 'O+'
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
    bloodGroup: 'A-'
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
    bloodGroup: 'B+'
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
    bloodGroup: 'AB+'
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
    bloodGroup: 'O-'
  }
];

const PatientChat = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const fileInputRef = useRef(null);
  
  // Ref for auto-scrolling to latest message
  const messagesEndRef = useRef(null);
  
  // Find current patient
  const currentPatient = mockPatients.find(p => p.id === parseInt(patientId));

  // Mock chat messages with file examples
  const mockChats = {
    1: [
      { id: 1, text: 'Hello Doctor, I am feeling dizzy today.', sender: 'patient', time: '10:30 AM' },
      { id: 2, text: 'Please take your prescribed medicine and rest.', sender: 'doctor', time: '10:35 AM' },
      { 
        id: 3, 
        text: 'My latest blood report', 
        sender: 'patient', 
        time: '11:00 AM',
        file: { name: 'blood_report.pdf', type: 'pdf', size: '2.4 MB' }
      },
      { id: 4, text: 'Monitor your BP and let me know in 2 hours.', sender: 'doctor', time: '11:05 AM' },
      { 
        id: 5, 
        text: 'BP readings chart', 
        sender: 'doctor', 
        time: '11:10 AM',
        file: { name: 'bp_chart.png', type: 'image', size: '1.2 MB' }
      },
    ],
    2: [
      { id: 1, text: 'My blood sugar is 250 mg/dL.', sender: 'patient', time: '09:00 AM' },
      { id: 2, text: 'Please avoid sweets and take insulin as prescribed.', sender: 'doctor', time: '09:15 AM' },
      { 
        id: 3, 
        text: 'Insulin prescription', 
        sender: 'doctor', 
        time: '09:20 AM',
        file: { name: 'prescription.pdf', type: 'pdf', size: '1.8 MB' }
      },
    ],
    3: [
      { id: 1, text: 'Joint pain is much better today.', sender: 'patient', time: 'Yesterday' },
      { id: 2, text: 'Good to hear. Continue with exercises.', sender: 'doctor', time: 'Yesterday' },
    ],
    4: [
      { id: 1, text: 'Breathing is normal now, thank you doctor.', sender: 'patient', time: '2 days ago' },
      { 
        id: 2, 
        text: 'X-Ray results', 
        sender: 'doctor', 
        time: '2 days ago',
        file: { name: 'xray_results.jpg', type: 'image', size: '3.5 MB' }
      },
    ],
    5: [
      { id: 1, text: 'Chest pain has started again.', sender: 'patient', time: 'Today' },
      { id: 2, text: 'Come to emergency immediately!', sender: 'doctor', time: 'Today' },
      { 
        id: 3, 
        text: 'ECG Report', 
        sender: 'patient', 
        time: 'Today',
        file: { name: 'ecg_report.pdf', type: 'pdf', size: '4.1 MB' }
      },
    ]
  };

  useEffect(() => {
    // Load chat messages for this patient
    if (patientId && mockChats[patientId]) {
      setMessages(mockChats[patientId]);
    }
  }, [patientId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowFileOptions(false);
    }
  };

  const handleFileSelect = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '.pdf,.doc,.docx';
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const fileType = file.type.startsWith('image/') ? 'image' : 'document';
      const fileName = file.name;
      
      const newMessage = {
        id: messages.length + 1,
        text: `File: ${fileName}`,
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: {
          name: fileName,
          type: fileType,
          size: fileSize
        }
      };
      setMessages([...messages, newMessage]);
      setShowFileOptions(false);
    }
  };

  const formatTime = (timeString) => {
    const now = new Date();
    
    if (timeString.toLowerCase() === 'today') {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    if (timeString.toLowerCase() === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    if (timeString.includes('days ago')) {
      const days = parseInt(timeString);
      const pastDate = new Date(now);
      pastDate.setDate(pastDate.getDate() - days);
      return pastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return timeString;
  };

  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'pdf': return <FaFilePdf />;
      case 'image': return <FaImage />;
      default: return <FaFile />;
    }
  };

  const getFileColor = (fileType) => {
    switch(fileType) {
      case 'pdf': return '#e74c3c';
      case 'image': return '#3498db';
      default: return '#2ecc71';
    }
  };

  if (!currentPatient) {
    return (
      <div className="patient-not-found">
        <h2>Patient not found</h2>
        <button onClick={() => navigate('/patient-sms')} className="back-btn">
          <FaArrowLeft /> Back to Patient List
        </button>
      </div>
    );
  }

  return (
    <div className="patient-chat-container">
      {/* Header */}
      <div className="chat-header">
        <button onClick={() => navigate('/patient-sms')} className="back-btn">
          <FaArrowLeft /> Back to List
        </button>
        
        <div className="patient-profile-header">
          <div className="patient-avatar-large" style={{ backgroundColor: currentPatient.avatarColor }}>
            {currentPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="patient-header-info">
            <h2>{currentPatient.name}</h2>
            <div className="patient-header-details">
              <span className="patient-age-gender">{currentPatient.age}y, {currentPatient.gender}</span>
              <span className="patient-condition">{currentPatient.condition}</span>
              <span className={`patient-status ${currentPatient.status.toLowerCase().replace(' ', '-')}`}>
                {currentPatient.status}
              </span>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button className="call-btn">
            <FaPhone /> Call
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages-container">
        <div className="chat-date">
          <span>Today</span>
        </div>
        
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="no-messages">
              <div className="empty-chat-icon">
                <FaStethoscope />
              </div>
              <p>No messages yet. Start the conversation!</p>
              <small className="empty-chat-hint">Your messages will appear here</small>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div 
                  key={msg.id} 
                  className={`message ${msg.sender}`}
                  style={{ '--message-index': index }}
                >
                  <div className="message-content">
                    <p>{msg.text}</p>
                    
                    {msg.file && (
                      <div className="file-attachment" style={{ borderColor: getFileColor(msg.file.type) }}>
                        <div className="file-icon" style={{ color: getFileColor(msg.file.type) }}>
                          {getFileIcon(msg.file.type)}
                        </div>
                        <div className="file-info">
                          <span className="file-name">{msg.file.name}</span>
                          <span className="file-size">{msg.file.size}</span>
                        </div>
                        <button className="file-download-btn">
                          <FaFileMedical />
                        </button>
                      </div>
                    )}
                    
                    <span className="message-time">{formatTime(msg.time)}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* File Options Popup */}
      {showFileOptions && (
        <div className="file-options-popup">
          <div className="file-options-content">
            <button className="file-option-btn" onClick={() => handleFileSelect('image')}>
              <FaImage /> Image
            </button>
            <button className="file-option-btn" onClick={() => handleFileSelect('document')}>
              <FaFilePdf /> Document
            </button>
            <button className="file-option-btn" onClick={() => handleFileSelect('medical')}>
              <FaFileMedical /> Medical Record
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Message Input */}
      <form className="message-input-form" onSubmit={handleSendMessage}>
        <button 
          type="button" 
          className="attach-btn"
          onClick={() => setShowFileOptions(!showFileOptions)}
          aria-label="Attach file"
        >
          <FaPaperclip />
        </button>
        
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
          autoFocus
        />
        
        <button 
          type="submit" 
          className="send-btn" 
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default PatientChat;