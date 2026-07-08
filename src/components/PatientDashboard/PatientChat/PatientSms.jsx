import React, { useState } from 'react';
import './PatientSms.css';

const PatientSms = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(1);
  const [messageText, setMessageText] = useState('');

  // --- Mock conversations (static, matches screenshot) ---
  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      initials: 'SM',
      color: '#0d9488',
      role: 'Cardiology',
      preview: "Hello! I've reviewed your latest bloo...",
      time: '10:42 AM',
      unread: 1,
      online: true,
      type: 'Appointments',
    },
    {
      id: 2,
      name: 'Dr. James Cl',
      initials: 'JC',
      color: '#2563eb',
      role: 'General Practice',
      preview: 'Your prescription has been sent to the...',
      time: 'Yesterday',
      unread: 0,
      online: false,
      type: 'Appointments',
    },
    {
      id: 3,
      name: 'Lab Results',
      initials: '',
      color: '#e5e7eb',
      isLab: true,
      role: "St. Mary's Diagnostics",
      preview: 'Automated: Your recent lipid panel re...',
      time: 'Mon',
      unread: 0,
      online: false,
      type: 'Reports',
    },
  ];

  // --- Mock messages for the selected conversation ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'doctor',
      name: 'Dr. Sarah Mitchell',
      time: '10:42 AM',
      text: "Hello! I've reviewed your latest blood reports. Everything looks normal. The cholesterol levels have significantly improved since our last visit.",
    },
    {
      id: 2,
      from: 'me',
      time: '10:45 AM',
      text: "That's great news, thank you doctor. Do I need to continue the current medication at the same dosage?",
    },
  ]);

  const tabs = ['All', 'Unread', 'Appointments', 'Reports'];

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesTab = true;
    if (activeTab === 'Unread') matchesTab = c.unread > 0;
    else if (activeTab === 'Appointments') matchesTab = c.type === 'Appointments';
    else if (activeTab === 'Reports') matchesTab = c.type === 'Reports';
    return matchesSearch && matchesTab;
  });

  const activeConv = conversations.find((c) => c.id === selectedId) || conversations[0];

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        from: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: messageText.trim(),
      },
    ]);
    setMessageText('');
  };

  const renderAvatar = (c, size) => (
    c.isLab ? (
      <div className={`msg-avatar msg-avatar-lab ${size}`}><i className="fa-solid fa-flask-vial"></i></div>
    ) : (
      <div className={`msg-avatar ${size}`} style={{ background: c.color }}>{c.initials}</div>
    )
  );

  return (
    <div className="msg-page">

      {/* ===== Top bar ===== */}
      <div className="msg-topbar">
        <div className="msg-topbar-left">
          <h1 className="msg-title">Messages</h1>
          <p className="msg-subtitle">Securely communicate with your healthcare providers.</p>
        </div>
        <div className="msg-topbar-actions">
          <button className="msg-filter-btn" aria-label="Filter"><i className="fa-solid fa-filter"></i></button>
          <button className="msg-new-btn"><i className="fa-regular fa-pen-to-square"></i> New Message</button>
        </div>
      </div>

      {/* ===== Split layout ===== */}
      <div className="msg-layout">

        {/* ---- Left: conversation list ---- */}
        <div className="msg-list-panel">
          <div className="msg-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search doctors or conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="msg-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`msg-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="msg-conversations">
            {filteredConversations.map((c) => (
              <div
                key={c.id}
                className={`msg-conv ${selectedId === c.id ? 'active' : ''}`}
                onClick={() => setSelectedId(c.id)}
              >
                <div className="msg-conv-avatar">
                  {renderAvatar(c, 'md')}
                  {c.online && <span className="msg-online-dot"></span>}
                </div>
                <div className="msg-conv-body">
                  <div className="msg-conv-top">
                    <span className="msg-conv-name">{c.name}</span>
                    <span className="msg-conv-right">
                      <span className="msg-conv-time">{c.time}</span>
                      {c.unread > 0 && <span className="msg-unread">{c.unread}</span>}
                    </span>
                  </div>
                  <div className="msg-conv-role">{c.role}</div>
                  <div className="msg-conv-preview">{c.preview}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: chat ---- */}
        <div className="msg-chat-panel">
          <div className="msg-chat-header">
            <div className="msg-chat-doctor">
              {renderAvatar(activeConv, 'md')}
              <div className="msg-chat-doctor-info">
                <div className="msg-chat-name">
                  {activeConv.name}
                  {!activeConv.isLab && <i className="fa-solid fa-circle-check msg-verified"></i>}
                </div>
                <div className="msg-chat-meta">
                  {activeConv.role} • St. Mary's Hospital • <i className="fa-solid fa-star"></i> 4.9
                </div>
              </div>
            </div>
            <div className="msg-chat-actions">
              <button className="msg-chat-btn"><i className="fa-regular fa-user"></i> View Profile</button>
              <button className="msg-chat-btn"><i className="fa-solid fa-video"></i> Video Consult</button>
              <button className="msg-chat-btn msg-chat-btn-primary"><i className="fa-regular fa-calendar-check"></i> Book Appointment</button>
            </div>
          </div>

          <div className="msg-chat-body">
            <div className="msg-day"><span>Today</span></div>

            {messages.map((m) => (
              m.from === 'doctor' ? (
                <div className="msg-row msg-row-in" key={m.id}>
                  {renderAvatar(activeConv, 'sm')}
                  <div className="msg-bubble-wrap">
                    <div className="msg-bubble-meta">{m.name} • {m.time}</div>
                    <div className="msg-bubble msg-bubble-in">{m.text}</div>
                  </div>
                </div>
              ) : (
                <div className="msg-row msg-row-out" key={m.id}>
                  <div className="msg-bubble-wrap">
                    <div className="msg-bubble-meta">You • {m.time}</div>
                    <div className="msg-bubble msg-bubble-out">{m.text}</div>
                  </div>
                </div>
              )
            ))}

            <div className="msg-row msg-row-in">
              {renderAvatar(activeConv, 'sm')}
              <div className="msg-typing">
                {activeConv.name} is typing <span className="msg-dots"><i></i><i></i><i></i></span>
              </div>
            </div>
          </div>

          <div className="msg-input">
            <button className="msg-input-icon"><i className="fa-regular fa-face-smile"></i></button>
            <button className="msg-input-icon"><i className="fa-solid fa-paperclip"></i></button>
            <button className="msg-input-icon"><i className="fa-regular fa-file"></i></button>
            <button className="msg-input-icon"><i className="fa-solid fa-camera"></i></button>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="msg-input-icon"><i className="fa-solid fa-microphone"></i></button>
            <button className="msg-send" onClick={handleSend}><i className="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSms;
