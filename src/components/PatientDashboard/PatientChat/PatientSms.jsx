import React, { useState, useEffect, useRef } from 'react';
import {
  acceptCall as apiAcceptCall,
  getChatList,
  getChatDoctors,
  getConversation,
  sendMessage,
  sendAttachment,
  getCurrentUserId,
  getAssetUrl,
  unwrapApiObject,
  startCall as apiStartCall,
  endCall as apiEndCall,
} from '../../../redux/chatApi';
import useCallSocket from '../../../hooks/useCallSocket';
import useWebRTCCall from '../../../hooks/useWebRTCCall';
import './PatientSms.css';

const PatientSms = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Call state
  const [callType, setCallType] = useState(null);   // null | 'video' | 'voice'
  const [callId, setCallId] = useState(null);       // server call id from /calls/start
  const [callStatus, setCallStatus] = useState(null); // ringing | accepted | ended
  const [callDirection, setCallDirection] = useState(null); // incoming | outgoing
  const [callSeconds, setCallSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const selfVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const camVideoRef = useRef(null);
  const camStreamRef = useRef(null);
  const chatBodyRef = useRef(null);
  const rtc = useWebRTCCall({ callId, peerUserId: selectedId, callType });

  useEffect(() => {
    if (selfVideoRef.current && rtc.localStream) selfVideoRef.current.srcObject = rtc.localStream;
    if (remoteVideoRef.current && rtc.remoteStream) remoteVideoRef.current.srcObject = rtc.remoteStream;
  }, [rtc.localStream, rtc.remoteStream, callType]);

  useEffect(() => {
    if (callStatus === 'accepted' && callDirection === 'outgoing') rtc.startOffer();
  }, [callStatus, callDirection, callId]);

  useCallSocket({
    onRinging: (call) => {
      const currentUserId = getCurrentUserId();
      const callerId = call?.caller_id ?? call?.callerId ?? call?.sender_id ?? call?.user_id;
      const receiverId = call?.receiver_id ?? call?.receiverId ?? call?.callee_id ?? call?.calleeId;
      if (receiverId && String(receiverId) !== String(currentUserId)) return;
      if (!receiverId && callerId && String(callerId) === String(currentUserId)) return;
      if (callerId) setSelectedId(callerId);
      setCallId(call?.id ?? call?._id ?? call?.call_id ?? call?.callId ?? null);
      setCallType(call?.call_type ?? call?.callType ?? call?.type ?? 'voice');
      setCallStatus('ringing');
      setCallDirection('incoming');
    },
    onAccepted: () => setCallStatus('accepted'),
    onRejected: () => { setCallType(null); setCallStatus(null); setCallDirection(null); },
    onCancelled: () => { setCallType(null); setCallStatus(null); setCallDirection(null); },
    onEnded: () => { setCallType(null); setCallStatus(null); setCallDirection(null); },
    onMissed: () => { setCallType(null); setCallStatus(null); setCallDirection(null); },
  });
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // data URL — preview before sending

  // Input extras
  const [showEmoji, setShowEmoji] = useState(false);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const emojis = ["😊", "😀", "😅", "😍", "👍", "🙏", "❤️", "😷", "🤒", "🤕", "💊", "🩺", "✅", "🎉", "👏", "🙌", "😢", "😪", "🤢", "🔥", "⭐", "📎", "📄", "🕒"];

  // --- Real chat data ---
  const currentUserId = getCurrentUserId();
  const [conversations, setConversations] = useState([]);
  const [convStatus, setConvStatus] = useState('loading'); // loading | succeeded | failed
  const [convError, setConvError] = useState('');
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [sending, setSending] = useState(false);

  const avatarColors = ['#0d9488', '#2563eb', '#7c3aed', '#ea580c', '#db2777', '#0891b2'];

  const titleCase = (s) =>
    String(s || '').split(' ').filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const initialsOf = (name = '') =>
    name.replace(/^Dr\.?\s*/i, '').split(' ').filter(Boolean)
      .map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'DR';

  // "2026-07-15T10:42:00Z" -> "10:42 AM" (today) or "Jul 15"
  const stamp = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    const isToday = d.toDateString() === new Date().toDateString();
    return isToday
      ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const mapConversation = (c, i) => {
    // /chat/send and /chat/conversation/:user_id both need the OTHER USER's id —
    // prefer explicit user ids over a generic `id` (which may be a chat/conversation id).
    const id =
      c.user_id ?? c.doctor_id ?? c.other_user_id ?? c.receiver_id ??
      c.participant_id ?? c.id ?? c._id;
    const rawName = c.full_name || c.name || c.doctor_name || 'Doctor';
    const name = titleCase(rawName);
    return {
      id,
      name: /^dr\.?\s/i.test(name) ? name : `Dr. ${name}`,
      initials: initialsOf(name),
      color: avatarColors[i % avatarColors.length],
      role: titleCase(c.specialization || c.specialty || c.department || 'Doctor'),
      preview: c.last_message || c.message || c.preview || 'Start a conversation',
      time: stamp(c.last_message_time || c.updated_at || c.created_at),
      unread: Number(c.unread_count ?? c.unread ?? 0),
      online: Boolean(c.is_online ?? c.online),
      type: 'Appointments',
    };
  };

  // Treat it as an image if the mime says so OR the url/name looks like one (Cloudinary etc.)
  const looksLikeImage = (type, url, name) => {
    const t = String(type || '').toLowerCase();
    if (t.startsWith('image/') || t === 'image' || t === 'photo') return true;
    const target = `${url || ''} ${name || ''}`;
    return /\.(png|jpe?g|gif|webp|bmp|svg|heic|avif)(\?|#|$)/i.test(target) ||
           /\/image\/upload\//i.test(String(url || '')); // cloudinary image delivery url
  };

  // Pull the attachment url out of whatever shape the API uses (string, object, cloudinary…)
  const extractAttachmentUrl = (m) => {
    const cand =
      m.attachment_url ?? m.file_url ?? m.media_url ?? m.image_url ??
      m.attachment_path ?? m.file_path ?? m.attachment ?? m.file ?? m.media ?? m.url ?? m.path;
    if (!cand) return null;
    if (typeof cand === 'string') return cand;
    if (typeof cand === 'object') {
      return cand.secure_url || cand.url || cand.path || cand.location || cand.src || null;
    }
    return null;
  };

  const mapMessage = (m, i) => {
    const senderId = m.sender_id ?? m.senderId ?? m.from_user_id ?? m.user_id;
    const mine = String(senderId) === String(currentUserId);
    const url = extractAttachmentUrl(m);
    const rawType = m.attachment_type || m.file_type || m.mime_type || m.type;
    const text = m.message || m.text || m.content || '';
    const name = m.attachment_name || m.file_name || (url ? text || 'Attachment' : 'Attachment');

    if (i === 0) console.log('[PatientSms] sample raw message keys:', Object.keys(m), m);

    const isImg = looksLikeImage(rawType, url, name);
    // If the text is just the file name, don't repeat it under the image
    const textIsFileName = url && text && text.trim() === String(name).trim();

    return {
      id: m.id ?? m._id ?? `srv-${i}`,
      from: mine ? 'me' : 'doctor',
      name: m.sender_name,
      time: stamp(m.created_at || m.createdAt || m.time),
      text: textIsFileName ? '' : text,
      attachment: url
        ? {
            type: isImg ? 'image' : 'file',
            name,
            url: getAssetUrl(url),
            size: m.attachment_size ? `${Math.round(Number(m.attachment_size) / 1024)} KB` : '',
          }
        : null,
    };
  };

  // Load the conversation list
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setConvStatus('loading');
      setConvError('');
      try {
        let list = await getChatList();
        if (!list.length) list = await getChatDoctors(); // fall back to all doctors
        console.log('[PatientSms] chat list ->', list);
        const mapped = list.map(mapConversation);
        if (cancelled) return;
        setConversations(mapped);
        setSelectedId((prev) => prev ?? mapped[0]?.id ?? null);
        setConvStatus('succeeded');
      } catch (err) {
        console.error('[PatientSms] chat list failed:', err.response?.status, err.response?.data || err);
        if (!cancelled) {
          setConvError(err.response?.data?.message || err.message || 'Failed to load chats');
          setConvStatus('failed');
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const loadMessages = async (id) => {
    if (!id) return;
    setMsgLoading(true);
    setMsgError('');
    try {
      const raw = await getConversation(id);
      console.log('[PatientSms] GET /chat/conversation/' + id, '-> raw:', raw, '| myUserId:', currentUserId);
      setMessages(raw.map(mapMessage));
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      console.error('[PatientSms] GET /chat/conversation/' + id, 'failed:', status, body || err);
      setMsgError(`Couldn't load messages (${status || 'network error'}): ${body?.message || err.message}`);
      setMessages([]);
    } finally {
      setMsgLoading(false);
    }
  };

  // Load messages whenever the selected chat changes
  useEffect(() => {
    if (selectedId) loadMessages(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Safe placeholder so the panel never crashes before chats load / when there are none
  const activeConv =
    conversations.find((c) => c.id === selectedId) ||
    conversations[0] || {
      id: null,
      name: convStatus === 'loading' ? 'Loading…' : 'No conversations',
      initials: '—',
      color: '#9ca3af',
      role: '',
      online: false,
    };

  const handleSend = async () => {
    if (!messageText.trim() || !selectedId || sending) return;
    const text = messageText.trim();

    // optimistic bubble
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
    setSending(true);
    try {
      console.log('[PatientSms] POST /chat/send', { receiver_id: selectedId, message: text });
      const res = await sendMessage({ receiverId: selectedId, message: text });
      console.log('[PatientSms] send ->', res);
      await loadMessages(selectedId); // re-sync with the server
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      console.error('[PatientSms] POST /chat/send failed:', status, body || err);
      alert(
        `Send failed (${status || 'network error'}): ` +
        (body?.message || body?.error || JSON.stringify(body || {}) || err.message)
      );
    } finally {
      setSending(false);
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

  // Upload a file/photo through /chat/send-attachment
  const uploadAttachment = async (file) => {
    if (!file || !selectedId) return;
    const url = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");

    // optimistic bubble
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: "me",
        time: nowTime(),
        attachment: {
          type: isImage ? "image" : "file",
          name: file.name,
          url,
          size: `${(file.size / 1024).toFixed(0)} KB`,
        },
      },
    ]);

    try {
      await sendAttachment({ receiverId: selectedId, message: '', file });
      await loadMessages(selectedId);
    } catch (err) {
      console.error('[PatientSms] attachment failed:', err.response?.status, err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to send attachment');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) uploadAttachment(file);
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

  // Confirm the preview — upload it as an image message
  const sendCapturedPhoto = async () => {
    if (!capturedPhoto) return;
    const dataUrl = capturedPhoto;
    setCapturedPhoto(null);
    setShowCamera(false);
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `photo-${Date.now()}.png`, { type: 'image/png' });
      await uploadAttachment(file);
    } catch (err) {
      console.error('[PatientSms] photo upload failed:', err);
      alert('Failed to send photo');
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
    rtc.localStream?.getAudioTracks().forEach((t) => { t.enabled = !muted; });
  }, [muted, rtc.localStream]);
  useEffect(() => {
    streamRef.current?.getVideoTracks().forEach((t) => { t.enabled = !videoOff; });
    rtc.localStream?.getVideoTracks().forEach((t) => { t.enabled = !videoOff; });
  }, [videoOff, rtc.localStream]);

  const formatDuration = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Show "Ringing…" until the call is accepted, then the running duration
  const callLabel = callStatus === 'ringing' ? 'Ringing…' : formatDuration(callSeconds);

  // Start a real call via /chat/calls/start
  const startCall = async (type) => {
    if (!selectedId) return;
    setMuted(false);
    setVideoOff(false);
    setSpeakerOn(true);
    setCallType(type);      // open the call UI immediately
    setCallStatus('ringing');
    setCallDirection('outgoing');
    try {
      const res = await apiStartCall({ receiverId: selectedId, callType: type });
      const call = unwrapApiObject(res);
      const id = call.id ?? call._id ?? call.call_id;
      console.log('[PatientSms] call started ->', call);
      setCallId(id ?? null);
      setCallStatus(call.status || 'ringing');
    } catch (err) {
      console.error('[PatientSms] start call failed:', err.response?.status, err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to start call');
      setCallType(null);
      setCallStatus(null);
    }
  };

  // End the call via /chat/calls/:call_id/end
  const endCall = async () => {
    const id = callId;
    setCallType(null);
    setCallStatus(null);
    setCallId(null);
    const status = callDirection === 'incoming' && callStatus === 'ringing' ? 'rejected' : 'ended';
    setCallDirection(null);
    if (!id) return;
    try {
      await apiEndCall({ callId: id, status });
      console.log('[PatientSms] call ended', id);
    } catch (err) {
      console.error('[PatientSms] end call failed:', err.response?.status, err.response?.data || err);
    }
  };

  const acceptIncomingCall = async () => {
    if (!callId) return;
    try {
      await rtc.getLocalMedia(callType);
      await apiAcceptCall(callId);
      setCallStatus('accepted');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept call');
    }
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
            {convStatus === 'loading' && (
              <div className="msg-conv-state">Loading chats…</div>
            )}
            {convStatus === 'failed' && (
              <div className="msg-conv-state msg-conv-state-err">{convError}</div>
            )}
            {convStatus === 'succeeded' && filteredConversations.length === 0 && (
              <div className="msg-conv-state">No conversations found</div>
            )}
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
            {msgLoading && <div className="msg-conv-state">Loading messages…</div>}
            {msgError && <div className="msg-conv-state msg-conv-state-err">{msgError}</div>}
            {!msgLoading && !msgError && messages.length === 0 && (
              <div className="msg-conv-state">No messages yet — say hello 👋</div>
            )}

            {messages.length > 0 && <div className="msg-day"><span>Today</span></div>}

            {messages.map((m) => {
              const dir = m.from === 'doctor' ? 'in' : 'out';
              return (
                <div className={`msg-row msg-row-${dir}`} key={m.id}>
                  {dir === 'in' && renderAvatar(activeConv, 'sm')}
                  <div className="msg-bubble-wrap">
                    <div className="msg-bubble-meta">
                      {dir === 'in' ? (m.name || activeConv.name) : 'You'} • {m.time}
                    </div>

                    {/* Attachment (image or file) — shown for both sides */}
                    {m.attachment && (
                      m.attachment.type === 'image' ? (
                        <a
                          className={`msg-bubble msg-bubble-${dir} msg-bubble-img`}
                          href={m.attachment.url}
                          target="_blank"
                          rel="noreferrer"
                          title="Click to open full size"
                        >
                          <img src={m.attachment.url} alt={m.attachment.name} />
                        </a>
                      ) : (
                        <a
                          className={`msg-bubble msg-bubble-${dir} msg-bubble-file`}
                          href={m.attachment.url}
                          target="_blank"
                          rel="noreferrer"
                          download={m.attachment.name}
                        >
                          <i className="fa-solid fa-file-lines"></i>
                          <span className="msg-file-info">
                            <span className="msg-file-name">{m.attachment.name}</span>
                            <span className="msg-file-size">{m.attachment.size}</span>
                          </span>
                          <i className="fa-solid fa-download"></i>
                        </a>
                      )
                    )}

                    {/* Text (only when there is any) */}
                    {m.text && <div className={`msg-bubble msg-bubble-${dir}`}>{m.text}</div>}
                  </div>
                </div>
              );
            })}

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

            <input ref={fileInputRef} type="file" hidden onChange={handleFileSelect} />

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
          <div className="call-screen-title">{callType === 'video' ? 'Video Call' : 'Voice Call'}</div>
          {callType === 'voice' && <audio autoPlay ref={(node) => { if (node && rtc.remoteStream) node.srcObject = rtc.remoteStream; }} />}
          {callType === 'video' ? (
            <div className="wa-video">
              {/* Remote (doctor) fills the screen */}
              <div className="wa-remote">
                <video ref={remoteVideoRef} autoPlay playsInline className="wa-remote-video" style={{ width: '100%', height: '100%', objectFit: 'cover', display: rtc.remoteStream ? 'block' : 'none' }} />
                <div className="wa-remote-avatar" style={{ background: activeConv.color }}>{activeConv.initials}</div>
                <div className="wa-remote-name">{activeConv.name}</div>
                <div className="wa-remote-sub">{callLabel}</div>
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
                {callDirection === 'incoming' && callStatus === 'ringing' && (
                  <button className="wa-ctrl incoming-accept" onClick={acceptIncomingCall} title="Accept incoming call"><i className="fa-solid fa-phone"></i><span>Accept Call</span></button>
                )}
                <button className={`wa-ctrl ${speakerOn ? '' : 'off'}`} onClick={() => setSpeakerOn(!speakerOn)}>
                  <i className={`fa-solid ${speakerOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
                </button>
                <button className={`wa-ctrl ${videoOff ? 'off' : ''}`} onClick={() => setVideoOff(!videoOff)}>
                  <i className={`fa-solid ${videoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
                </button>
                <button className={`wa-ctrl ${muted ? 'off' : ''}`} onClick={() => setMuted(!muted)}>
                  <i className={`fa-solid ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                </button>
                <button className={`wa-ctrl end ${callDirection === 'incoming' && callStatus === 'ringing' ? 'incoming-reject' : ''}`} onClick={endCall}><i className="fa-solid fa-phone-slash"></i>{callDirection === 'incoming' && callStatus === 'ringing' && <span>Reject Call</span>}</button>
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
                <div className="call-voice-timer">{callLabel}</div>
                <div className={`call-wave ${muted ? 'muted' : ''}`}>
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div className="call-controls">
                {callDirection === 'incoming' && callStatus === 'ringing' && (
                  <button className="call-ctrl incoming-accept" onClick={acceptIncomingCall} title="Accept incoming call"><i className="fa-solid fa-phone"></i><span>Accept Call</span></button>
                )}
                <button className={`call-ctrl ${muted ? 'off' : ''}`} onClick={() => setMuted(!muted)}>
                  <i className={`fa-solid ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                </button>
                <button className={`call-ctrl ${speakerOn ? '' : 'off'}`} onClick={() => setSpeakerOn(!speakerOn)}>
                  <i className={`fa-solid ${speakerOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
                </button>
                <button className={`call-ctrl end ${callDirection === 'incoming' && callStatus === 'ringing' ? 'incoming-reject' : ''}`} onClick={endCall}><i className="fa-solid fa-phone-slash"></i>{callDirection === 'incoming' && callStatus === 'ringing' && <span>Reject Call</span>}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSms;
