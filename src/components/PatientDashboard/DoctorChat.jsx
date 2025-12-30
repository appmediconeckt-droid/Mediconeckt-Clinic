import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DoctorChat.css';

const DoctorChat = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    // Mock data for doctors
    const doctorsData = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            lastMessage: "Your test results are normal.",
            time: "10:30 AM",
            unread: 2,
            avatarColor: "dc-avatar-green",
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
            avatarColor: "dc-avatar-blue",
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
            avatarColor: "dc-avatar-purple",
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
            avatarColor: "dc-avatar-orange",
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
            avatarColor: "dc-avatar-teal",
            online: false,
            phone: "+1 (555) 567-8901",
            email: "emily.davis@hospital.com",
            rating: 4.9
        }
    ];

    // Messages data
    const messagesData = {
        1: [
            { id: 1, text: "Hello, I have a question about my prescription.", time: "10:15 AM", sender: "patient" },
            { id: 2, text: "Hello! I'm Dr. Sarah Johnson. How can I help you?", time: "10:20 AM", sender: "doctor" },
            { id: 3, text: "I'm experiencing some side effects from the medication.", time: "10:22 AM", sender: "patient" },
            { id: 4, text: "What kind of side effects are you experiencing?", time: "10:25 AM", sender: "doctor" },
            { id: 5, text: "Mostly nausea and dizziness.", time: "10:27 AM", sender: "patient" },
            { id: 6, text: "That's common. Try taking it with food. If it continues, we may adjust the dosage.", time: "10:30 AM", sender: "doctor" }
        ],
        2: [
            { id: 1, text: "Good morning, I wanted to discuss my MRI results.", time: "9:45 AM", sender: "patient" },
            { id: 2, text: "Good morning. The MRI shows normal brain activity.", time: "10:00 AM", sender: "doctor" }
        ],
        3: [
            { id: 1, text: "The skin rash is getting better with the cream.", time: "Yesterday", sender: "patient" },
            { id: 2, text: "That's great to hear! Continue using it for 2 more weeks.", time: "Yesterday", sender: "doctor" }
        ],
        4: [
            { id: 1, text: "When can I start physical therapy?", time: "Monday", sender: "patient" },
            { id: 2, text: "We can start next week. I'll send you the schedule.", time: "Monday", sender: "doctor" }
        ],
        5: [
            { id: 1, text: "My child has a fever of 101°F.", time: "Last week", sender: "patient" },
            { id: 2, text: "Give them children's Tylenol and monitor. Call if it goes above 103°F.", time: "Last week", sender: "doctor" }
        ]
    };

    const [activeDoctor, setActiveDoctor] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Find doctor by ID
    useEffect(() => {
        const doctor = doctorsData.find(d => d.id === parseInt(doctorId));
        if (doctor) {
            setActiveDoctor(doctor);
            setMessages(messagesData[doctor.id] || []);
        } else {
            navigate('/doctor-sms');
        }
    }, [doctorId, navigate]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = document.querySelector('.dc-textarea');
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    }, [newMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim() === "" || !activeDoctor) return;

        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: "patient"
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setNewMessage("");

        // Simulate doctor typing
        setIsTyping(true);
        
        // Simulate doctor reply after 1-2 seconds
        setTimeout(() => {
            setIsTyping(false);
            
            const doctorReply = {
                id: messages.length + 2,
                text: getRandomDoctorResponse(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: "doctor"
            };

            setMessages(prev => [...prev, doctorReply]);
        }, 1500 + Math.random() * 1000);
    };

    // Get random doctor response
    const getRandomDoctorResponse = () => {
        const responses = [
            "Thanks for sharing. I'll review this and get back to you soon.",
            "I understand your concern. Let me check your records.",
            "That's a good question. Here's what I recommend...",
            "I've noted your symptoms. Continue monitoring and let me know if there are changes.",
            "Based on what you've described, I suggest we schedule a follow-up appointment.",
            "I appreciate you sharing this information. It helps me provide better care.",
            "Let me consult with a specialist about this and get back to you.",
            "I'll send you a prescription update based on our discussion.",
            "Please continue with the current treatment and update me in 2 days.",
            "I've scheduled additional tests for next week to investigate further."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Handle key press for sending message
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Format date for message grouping
    const formatMessageDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Handle back button click
    const handleBackClick = () => {
        navigate('/doctor-sms');
    };

    if (!activeDoctor) {
        return (
            <div className="dc-loading">
                <div className="dc-loading-spinner"></div>
                <p>Loading chat...</p>
            </div>
        );
    }

    return (
        <div className="dc-chat-app">
            <div className="dc-chat-wrapper">
                {/* Fixed Header */}
                <div className="dc-chat-header">
                    <div className="dc-header-left">
                        <button className="dc-back-btn" onClick={handleBackClick}>
                            <i className="fas fa-chevron-left"></i>
                            <span>Back</span>
                        </button>
                        <div className={`dc-doctor-avatar ${activeDoctor.avatarColor}`}>
                            {getInitials(activeDoctor.name)}
                            {activeDoctor.online && <span className="dc-online-dot"></span>}
                        </div>
                        <div className="dc-doctor-info">
                            <h3 className="dc-doctor-name">{activeDoctor.name}</h3>
                            <div className="dc-doctor-meta">
                                <span className="dc-doctor-specialty">{activeDoctor.specialty}</span>
                                <span className="dc-status">
                                    <i className={`fas fa-circle ${activeDoctor.online ? 'dc-online' : 'dc-offline'}`}></i>
                                    {activeDoctor.online ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dc-header-right">
                        <button className="dc-call-btn dc-video-btn">
                            <i className="fas fa-video"></i>
                        </button>
                        <button className="dc-call-btn dc-voice-btn">
                            <i className="fas fa-phone"></i>
                        </button>
                        <button className="dc-menu-btn">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>

                {/* Scrollable Messages Area */}
                <div className="dc-messages-area">
                    <div className="dc-messages-container">
                        {messages.length === 0 ? (
                            <div className="dc-no-messages">
                                <div className="dc-welcome-illustration">
                                    <i className="fas fa-comments"></i>
                                </div>
                                <h3>Start a Conversation</h3>
                                <p>Send your first message to {activeDoctor.name}</p>
                            </div>
                        ) : (
                            <div className="dc-messages-list">
                                <div className="dc-date-divider">
                                    <span>{formatMessageDate(new Date())}</span>
                                </div>
                                
                                {messages.map(message => (
                                    <div
                                        key={message.id}
                                        className={`dc-message ${message.sender === 'patient' ? 'dc-outgoing' : 'dc-incoming'}`}
                                    >
                                        {message.sender === 'doctor' && (
                                            <div className={`dc-message-avatar ${activeDoctor.avatarColor}`}>
                                                {getInitials(activeDoctor.name)}
                                            </div>
                                        )}
                                        
                                        <div className="dc-message-content">
                                            <div className="dc-message-bubble">
                                                <p className="dc-message-text">{message.text}</p>
                                            </div>
                                            <div className="dc-message-footer">
                                                <span className="dc-message-time">{message.time}</span>
                                                {message.sender === 'patient' && (
                                                    <span className="dc-message-status">
                                                        <i className="fas fa-check"></i>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {message.sender === 'patient' && (
                                            <div className="dc-patient-avatar">
                                                <i className="fas fa-user"></i>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="dc-typing-indicator">
                                        <div className={`dc-message-avatar ${activeDoctor.avatarColor}`}>
                                            {getInitials(activeDoctor.name)}
                                        </div>
                                        <div className="dc-typing-bubble">
                                            <div className="dc-typing-dots">
                                                <div className="dc-typing-dot"></div>
                                                <div className="dc-typing-dot"></div>
                                                <div className="dc-typing-dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Scroll anchor */}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Input Area */}
                <div className="dc-input-area">
                    <div className="dc-input-tools">
                        <button className="dc-tool-btn">
                            <i className="fas fa-paperclip"></i>
                        </button>
                        <button className="dc-tool-btn">
                            <i className="fas fa-camera"></i>
                        </button>
                        <button className="dc-tool-btn">
                            <i className="fas fa-file-medical"></i>
                        </button>
                    </div>
                    
                    <div className="dc-textarea-wrapper">
                        <textarea
                            className="dc-textarea"
                            placeholder="Type your message here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows="1"
                        />
                        {newMessage.trim() === "" && (
                            <div className="dc-quick-replies">
                                <button 
                                    className="dc-quick-reply"
                                    onClick={() => setNewMessage("Can you explain my prescription?")}
                                >
                                    Prescription help
                                </button>
                                <button 
                                    className="dc-quick-reply"
                                    onClick={() => setNewMessage("I need to schedule an appointment")}
                                >
                                    Schedule appointment
                                </button>
                                <button 
                                    className="dc-quick-reply"
                                    onClick={() => setNewMessage("I'm experiencing side effects")}
                                >
                                    Side effects
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <button
                        className="dc-send-btn"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorChat;