import React, { useState, useEffect, useRef } from 'react';
import './PatientSms.css';
import { getAttachmentUrl, getChatDoctors, getConversation, getCurrentUserId, sendAttachment, sendMessage, unwrapApiObject } from '../../../redux/chatApi';

const PatientSms = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [messageText, setMessageText] = useState('');

  // Call state
  const [callType, setCallType] = useState(null);   // null | 'video' | 'voice'
  const [callSeconds, setCallSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const selfVideoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const camVideoRef = useRef(null);
  const camStreamRef = useRef(null);
  const chatBodyRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // data URL — preview before sending

  // Input extras
  const [showEmoji, setShowEmoji] = useState(false);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const emojis = ["😊", "😀", "😅", "😍", "👍", "🙏", "❤️", "😷", "🤒", "🤕", "💊", "🩺", "✅", "🎉", "👏", "🙌", "😢", "😪", "🤢", "🔥", "⭐", "📎", "📄", "🕒"];

  // --- Mock conversations (static, matches screenshot) ---
  const [conversations, setConversations] = useState([]);

  // --- Mock messages for the selected conversation ---
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let active = true;
    const loadDoctors = async () => {
      try {
        const doctorList = await getChatDoctors();
        if (!active) return;
        const normalizedDoctors = doctorList.map((item, index) => {
          const doctor = item.doctor || item.user || item;
          const id = doctor.id || doctor._id || doctor.doctor_id || item.doctor_id || doctor.user_id;
          const name = doctor.full_name || doctor.fullname || doctor.name || doctor.doctor_name || item.doctor_name || 'Doctor';
          return {
            id,
            name,
            initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
            color: ['#0d9488', '#2563eb', '#7c3aed', '#dc2626'][index % 4],
            role: doctor.speciality || doctor.specialization || doctor.specialty || item.specialty || 'Doctor',
            preview: item.lastMessage?.message || item.last_message?.message || item.lastMessage || item.last_message || 'Start a conversation',
            time: item.last_message_time || item.updated_at || '',
            unread: item.unread || item.unread_count || 0,
            online: Boolean(doctor.online || doctor.is_online),
            type: 'Appointments',
          };
        }).filter((doctor) => doctor.id);
        setConversations(normalizedDoctors);
        setSelectedId((current) => normalizedDoctors.some((doctor) => String(doctor.id) === String(current))
          ? current
          : (normalizedDoctors[0]?.id || ''));
      } catch {
        if (active) setConversations([]);
      }
    };
    loadDoctors();
    const timer = window.setInterval(loadDoctors, 10000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadMessages = async () => {
      if (!selectedId) {
        setMessages([]);
        return;
      }
      try {
        const conversation = await getConversation(selectedId);
        if (!active) return;
        const currentUserId = getCurrentUserId();
        setMessages(conversation.map((msg, index) => {
          const senderId = msg.sender_id || msg.senderId || msg.from_user_id || msg.user_id;
          const senderRole = String(msg.sender_role || msg.role || (typeof msg.sender === 'string' ? msg.sender : '')).toLowerCase();
          const isPatient = senderRole.includes('patient') || (!senderRole && String(senderId) === String(currentUserId));
          const createdAt = msg.created_at || msg.createdAt || msg.time;
          const attachmentUrl = getAttachmentUrl(msg);
          const attachmentType = msg.attachment_type || msg.attachmentType || '';
          const rawText = msg.message || msg.text || msg.content || '';
          return {
            id: msg.id || msg._id || `message-${index}`,
            from: isPatient ? 'me' : 'doctor',
            name: msg.sender_name || msg.senderName,
            time: createdAt ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            text: attachmentUrl && rawText === attachmentUrl ? '' : rawText,
            attachment: attachmentUrl ? {
              type: String(msg.message_type || attachmentType).toLowerCase().includes('image') ? 'image' : 'file',
              name: msg.attachment_name || msg.attachmentName || 'Attachment',
              url: attachmentUrl,
              size: msg.attachment_size || '',
            } : undefined,
          };
        }));
      } catch {
        if (active) setMessages([]);
      }
    };
    loadMessages();
    const timer = window.setInterval(loadMessages, 5000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [selectedId]);

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

  const activeConv = conversations.find((c) => String(c.id) === String(selectedId)) || conversations[0] || {
    id: '',
    name: 'Select a doctor',
    initials: 'DR',
    color: '#64748b',
    role: 'Doctor',
    online: false,
  };

  const handleSend = async () => {
    if (!messageText.trim() || !activeConv?.id) return;
    const text = messageText.trim();
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text,
      },
    ]);
    setMessageText('');
    try {
      await sendMessage({ receiverId: activeConv.id, message: text });
    } catch (error) {
      setMessages((prev) => prev.filter((item) => !String(item.id).startsWith('local-')));
      window.alert(error.response?.data?.message || error.message || 'Message send nahi ho paya. Please try again.');
    }
  };

  // Auto-scroll chat to the latest message (like WhatsApp)
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, selectedId]);

  const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const addEmoji = (e) => {
    setMessageText((prev) => prev + e);
  };

  const handleFileSelect = async (e, kind) => {
    const file = e.target.files?.[0];
    if (!file || !activeConv.id) return;
    const url = URL.createObjectURL(file);
    const isImage = kind === "image" || file.type.startsWith("image/");
    const localId = `attachment-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: localId,
        from: "me",
        time: nowTime(),
        attachment: { type: isImage ? "image" : "file", name: file.name, url, size: (file.size / 1024).toFixed(0) + " KB" },
      },
    ]);
    e.target.value = "";
    try {
      const response = await sendAttachment({
        receiverId: activeConv.id,
        file,
        messageType: isImage ? 'image' : 'file',
      });
      const saved = unwrapApiObject(response);
      setMessages((prev) => prev.map((item) => item.id === localId ? {
        ...item,
        id: saved.id || saved._id || localId,
        text: saved.message && saved.message !== saved.attachment_url ? saved.message : '',
        attachment: {
          type: String(saved.message_type || saved.attachment_type || '').includes('image') ? 'image' : (isImage ? 'image' : 'file'),
          name: saved.attachment_name || file.name,
          url: getAttachmentUrl(saved) || url,
          size: (file.size / 1024).toFixed(0) + ' KB',
        },
      } : item));
      if (getAttachmentUrl(saved)) URL.revokeObjectURL(url);
    } catch (error) {
      setMessages((prev) => prev.filter((item) => item.id !== localId));
      URL.revokeObjectURL(url);
      window.alert(error.response?.data?.message || error.message || 'Image send nahi ho payi.');
    }
  };

  const startNewChat = (id) => {
    setSelectedId(id);
    setShowNewMsg(false);
  };

  // Live camera capture
  useEffect(() => {
    if (!showCamera) return;
    let cancelled = false;
    navigator.mediaDevices?.getUserMedia({ video: true })
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        camStreamRef.current = stream;
        if (camVideoRef.current) camVideoRef.current.srcObject = stream;
      })
      .catch(() => { alert("Camera not available or permission denied."); setShowCamera(false); });
    return () => {
      cancelled = true;
      camStreamRef.current?.getTracks().forEach((t) => t.stop());
      camStreamRef.current = null;
    };
  }, [showCamera]);

  // Capture a still into a preview — does NOT send yet
  const capturePhoto = () => {
    const video = camVideoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    setCapturedPhoto(canvas.toDataURL("image/png"));
  };

  // Discard the captured still and go back to the live camera
  const retakePhoto = () => setCapturedPhoto(null);

  // Confirm the preview — send it as an image message
  const sendCapturedPhoto = async () => {
    if (!capturedPhoto || !activeConv.id) return;
    try {
      const blob = await fetch(capturedPhoto).then((response) => response.blob());
      const file = new File([blob], 'photo.png', { type: 'image/png' });
      const response = await sendAttachment({ receiverId: activeConv.id, file, messageType: 'image' });
      const saved = unwrapApiObject(response);
      setMessages((prev) => [...prev, {
        id: saved.id || saved._id || `camera-${Date.now()}`,
        from: 'me',
        time: nowTime(),
        attachment: {
          type: 'image',
          name: saved.attachment_name || 'photo.png',
          url: getAttachmentUrl(saved) || capturedPhoto,
        },
      }]);
      setCapturedPhoto(null);
      setShowCamera(false);
    } catch (error) {
      window.alert(error.response?.data?.message || error.message || 'Photo send nahi ho payi.');
    }
  };

  // Close the camera entirely (also clears any preview)
  const closeCamera = () => {
    setCapturedPhoto(null);
    setShowCamera(false);
  };

  // Call timer
  useEffect(() => {
    if (!callType) return;
    setCallSeconds(0);
    const t = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [callType]);

  // Live camera / mic stream
  useEffect(() => {
    if (!callType) return;
    let cancelled = false;
    const constraints = callType === 'video' ? { video: true, audio: true } : { audio: true };
    navigator.mediaDevices?.getUserMedia(constraints)
      .then((stream) => {
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (selfVideoRef.current) selfVideoRef.current.srcObject = stream;
      })
      .catch(() => { /* camera/mic blocked — fall back to avatar */ });
    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [callType]);

  // Reflect mute / camera toggles on the real tracks
  useEffect(() => {
    streamRef.current?.getAudioTracks().forEach((t) => { t.enabled = !muted; });
  }, [muted]);
  useEffect(() => {
    streamRef.current?.getVideoTracks().forEach((t) => { t.enabled = !videoOff; });
  }, [videoOff]);

  const formatDuration = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const startCall = (type) => {
    setMuted(false);
    setVideoOff(false);
    setSpeakerOn(true);
    setCallType(type);
  };
  const endCall = () => setCallType(null);

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
          <div className="msg-filter-box">
            <button className="msg-filter-btn" aria-label="Filter" onClick={() => setShowFilter(!showFilter)}><i className="fa-solid fa-filter"></i></button>
            {showFilter && (
              <div className="msg-filter-menu">
                {["All", "Unread", "Appointments", "Reports"].map((t) => (
                  <div key={t} className={`msg-filter-opt ${activeTab === t ? "sel" : ""}`} onClick={() => { setActiveTab(t); setShowFilter(false); }}>
                    {t}{activeTab === t && <i className="fa-solid fa-check"></i>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="msg-new-btn" onClick={() => setShowNewMsg(true)}><i className="fa-regular fa-pen-to-square"></i> New Message</button>
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
                  {activeConv.role} • St. Mary's Hospital
                </div>
              </div>
            </div>
            <div className="msg-chat-actions">
              <button className="msg-chat-btn" onClick={() => startCall('voice')}><i className="fa-solid fa-phone"></i> Voice Call</button>
              <button className="msg-chat-btn" onClick={() => startCall('video')}><i className="fa-solid fa-video"></i> Video Call</button>
            </div>
          </div>

          <div className="msg-chat-body" ref={chatBodyRef}>
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
                    {m.attachment ? (
                      m.attachment.type === "image" ? (
                        <div className="msg-bubble msg-bubble-out msg-bubble-img">
                          <img src={m.attachment.url} alt={m.attachment.name} />
                        </div>
                      ) : (
                        <a className="msg-bubble msg-bubble-out msg-bubble-file" href={m.attachment.url} download={m.attachment.name}>
                          <i className="fa-solid fa-file-lines"></i>
                          <span className="msg-file-info">
                            <span className="msg-file-name">{m.attachment.name}</span>
                            <span className="msg-file-size">{m.attachment.size}</span>
                          </span>
                          <i className="fa-solid fa-download"></i>
                        </a>
                      )
                    ) : (
                      <div className="msg-bubble msg-bubble-out">{m.text}</div>
                    )}
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
            <div className="msg-emoji-box">
              <button className={`msg-input-icon ${showEmoji ? "on" : ""}`} onClick={() => setShowEmoji(!showEmoji)}>
                <i className="fa-regular fa-face-smile"></i>
              </button>
              {showEmoji && (
                <div className="msg-emoji-picker">
                  {emojis.map((e) => (
                    <button key={e} className="msg-emoji" onClick={() => addEmoji(e)}>{e}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="msg-input-icon" onClick={() => fileInputRef.current?.click()} title="Attach file"><i className="fa-solid fa-paperclip"></i></button>
            <button className="msg-input-icon" onClick={() => setShowCamera(true)} title="Open camera"><i className="fa-solid fa-camera"></i></button>

            <input ref={fileInputRef} type="file" hidden onChange={(e) => handleFileSelect(e, "file")} />

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

      {/* ===== Camera capture modal ===== */}
      {showCamera && (
        <div className="msg-modal-overlay" onClick={closeCamera}>
          <div className="cam-modal" onClick={(e) => e.stopPropagation()}>
            <div className="msg-modal-head">
              <h3>{capturedPhoto ? "Preview Photo" : "Take a Photo"}</h3>
              <button className="msg-modal-close" onClick={closeCamera}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="cam-preview">
              {/* Keep the video mounted so the stream stays alive; hide it while previewing */}
              <video ref={camVideoRef} autoPlay playsInline muted style={{ display: capturedPhoto ? 'none' : 'block' }}></video>
              {capturedPhoto && <img src={capturedPhoto} alt="Captured preview" className="cam-shot" />}
            </div>
            {capturedPhoto ? (
              <div className="cam-actions">
                <button className="pset-btn-outline cam-cancel" onClick={retakePhoto}>
                  <i className="fa-solid fa-rotate-left"></i> Retake
                </button>
                <button className="cam-capture" onClick={sendCapturedPhoto}>
                  <i className="fa-solid fa-paper-plane"></i> Send
                </button>
              </div>
            ) : (
              <div className="cam-actions">
                <button className="pset-btn-outline cam-cancel" onClick={closeCamera}>Cancel</button>
                <button className="cam-capture" onClick={capturePhoto}>
                  <i className="fa-solid fa-camera"></i> Capture
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== New Message modal ===== */}
      {showNewMsg && (
        <div className="msg-modal-overlay" onClick={() => setShowNewMsg(false)}>
          <div className="msg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="msg-modal-head">
              <h3>New Message</h3>
              <button className="msg-modal-close" onClick={() => setShowNewMsg(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <p className="msg-modal-sub">Select a provider to start a conversation</p>
            <div className="msg-modal-list">
              {conversations.map((c) => (
                <div key={c.id} className="msg-modal-item" onClick={() => startNewChat(c.id)}>
                  {renderAvatar(c, "md")}
                  <div>
                    <div className="msg-conv-name">{c.name}</div>
                    <div className="msg-conv-role">{c.role}</div>
                  </div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== Call overlay ===== */}
      {callType && (
        <div className={`call-overlay ${callType}`}>
          {callType === 'video' ? (
            <div className="wa-video">
              {/* Remote (doctor) fills the screen */}
              <div className="wa-remote">
                <div className="wa-remote-avatar" style={{ background: activeConv.color }}>{activeConv.initials}</div>
                <div className="wa-remote-name">{activeConv.name}</div>
                <div className="wa-remote-sub">{formatDuration(callSeconds)}</div>
              </div>

              {/* Top bar */}
              <div className="wa-topbar">
                <span className="wa-enc"><i className="fa-solid fa-lock"></i> End-to-end encrypted</span>
              </div>

              {/* Self PiP — your real webcam */}
              <div className="wa-pip">
                <video
                  ref={selfVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="wa-pip-video"
                  style={{ display: videoOff ? 'none' : 'block' }}
                />
                {videoOff && <div className="wa-pip-off"><i className="fa-solid fa-video-slash"></i></div>}
              </div>

              {/* Bottom control bar */}
              <div className="wa-controls">
                <button className={`wa-ctrl ${speakerOn ? '' : 'off'}`} onClick={() => setSpeakerOn(!speakerOn)}>
                  <i className={`fa-solid ${speakerOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
                </button>
                <button className={`wa-ctrl ${videoOff ? 'off' : ''}`} onClick={() => setVideoOff(!videoOff)}>
                  <i className={`fa-solid ${videoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
                </button>
                <button className={`wa-ctrl ${muted ? 'off' : ''}`} onClick={() => setMuted(!muted)}>
                  <i className={`fa-solid ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                </button>
                <button className="wa-ctrl end" onClick={endCall}><i className="fa-solid fa-phone-slash"></i></button>
              </div>
            </div>
          ) : (
            <div className="call-voice">
              <span className="call-secure top"><i className="fa-solid fa-lock"></i> Encrypted Voice Call</span>
              <div className="call-voice-center">
                <div className="call-voice-avatar" style={{ background: activeConv.color }}>
                  {activeConv.initials}
                  <span className="call-pulse"></span>
                  <span className="call-pulse call-pulse2"></span>
                </div>
                <h2 className="call-voice-name">{activeConv.name}</h2>
                <p className="call-voice-role">{activeConv.role}</p>
                <div className="call-voice-timer">{formatDuration(callSeconds)}</div>
                <div className={`call-wave ${muted ? 'muted' : ''}`}>
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className="call-controls">
                <button className={`call-ctrl ${muted ? 'off' : ''}`} onClick={() => setMuted(!muted)}>
                  <i className={`fa-solid ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                </button>
                <button className={`call-ctrl ${speakerOn ? '' : 'off'}`} onClick={() => setSpeakerOn(!speakerOn)}>
                  <i className={`fa-solid ${speakerOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
                </button>
                <button className="call-ctrl end" onClick={endCall}><i className="fa-solid fa-phone-slash"></i></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSms;
