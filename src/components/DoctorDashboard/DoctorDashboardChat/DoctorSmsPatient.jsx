import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaPaperclip,
  FaPhone,
  FaPhoneSlash,
  FaSearch,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import {
  endCall as endChatCall,
  getAssetUrl,
  getChatList,
  getConversation,
  getCurrentUserId,
  sendAttachment,
  sendMessage,
  startCall as startChatCall,
  unwrapApiObject,
} from "../../../redux/chatApi";
import "./DoctorSmsPatient.css";

const getInitials = (name) =>
  String(name || "NA")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatChatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatFileSize = (value) => {
  const bytes = Number(value || 0);
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFirstValue = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");

const normalizeAttachment = (source, fallbackFile) => {
  const data = unwrapApiObject(source);
  const attachment = data.attachment || data.file || data.message || data;
  const url = getFirstValue(
    attachment.attachment_url,
    attachment.attachmentUrl,
    attachment.file_url,
    attachment.fileUrl,
    attachment.url,
    fallbackFile?.url
  );
  const name = getFirstValue(
    attachment.attachment_name,
    attachment.attachmentName,
    attachment.file_name,
    attachment.fileName,
    attachment.name,
    fallbackFile?.name
  );
  const type = getFirstValue(attachment.attachment_type, attachment.attachmentType, attachment.file_type, attachment.type, fallbackFile?.type);
  const size = getFirstValue(attachment.attachment_size, attachment.attachmentSize, attachment.file_size, attachment.size, fallbackFile?.size);

  if (!url && !name) return null;

  return {
    name: name || "Attachment",
    type: String(type || "").startsWith("image/") ? "image" : type || "document",
    size: typeof size === "number" ? formatFileSize(size) : size || "",
    url: getAssetUrl(url),
  };
};

const cleanAttachmentMessageText = (text, file) => {
  const value = String(text || "").trim();
  if (!value) return "";
  const normalized = value.replace(/\\/g, "/").toLowerCase();
  const fileUrl = String(file?.url || "").replace(/\\/g, "/").toLowerCase();
  const fileName = String(file?.name || "").toLowerCase();

  if (normalized.includes("/uploads/") || normalized === fileUrl || normalized === fileName) {
    return "";
  }

  return value;
};

const getLastMessageText = (item) => {
  const lastMessage = item.lastMessage || item.last_message || item.latest_message;
  if (typeof lastMessage === "string") return lastMessage;
  return lastMessage?.message || lastMessage?.text || item.message || item.content || "No messages yet";
};

const normalizeChatMessage = (msg, index, currentUserId) => {
  const senderId = msg.sender_id || msg.senderId || msg.from_user_id || msg.user_id;
  const senderRole = msg.sender || msg.sender_role || msg.role;
  const createdAt = msg.time || msg.created_at || msg.createdAt || new Date().toISOString();
  const file = normalizeAttachment(msg);
  const rawText = msg.message || msg.text || msg.content || "";

  return {
    id: msg.id || msg._id || `api-${index}`,
    sender: senderRole || (String(senderId) === String(currentUserId) ? "doctor" : "patient"),
    text: cleanAttachmentMessageText(rawText, file),
    file,
    time: formatChatTime(createdAt) || createdAt,
  };
};

function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [messagesByPatient, setMessagesByPatient] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [callSeconds, setCallSeconds] = useState(0);
  const messageAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setStatus("loading");
        setError("");
        const chatList = await getChatList();
        const apiPatients = chatList.map((item, index) => {
          const patient = item.patient || item.user || item;
          const lastMessage = item.lastMessage || item.last_message || item.latest_message;
          const receiverId =
            patient.id ||
            patient._id ||
            patient.patient_id ||
            item.patient_id ||
            patient.user_id ||
            item.receiver_id ||
            item.receiverId ||
            item.user_id ||
            item.userId ||
            item.id ||
            item._id ||
            index + 1;

          return {
            id: receiverId,
            receiverId,
            name: patient.full_name || patient.fullname || patient.name || patient.patient_name || item.patient_name || "Unknown Patient",
            age: patient.age || "NA",
            gender: patient.gender || "Male",
            condition: patient.condition || patient.diagnosis || item.condition || "No condition",
            status: patient.status || item.status || "Stable",
            phone: patient.contact_number || patient.phone || patient.phone_number || "",
            bloodGroup: patient.bloodGroup || patient.blood_group || "",
            previewTitle: patient.condition || patient.diagnosis || item.condition || "No condition",
            lastMessage: getLastMessageText(item),
            messageTime: formatChatTime(lastMessage?.created_at || lastMessage?.createdAt || item.updated_at || item.created_at),
            unread: item.unread || item.unread_count || patient.unread || patient.unread_count || 0,
          };
        });
        setPatients(apiPatients);
        if (apiPatients[0]?.id) setSelectedPatientId(apiPatients[0].id);
        setStatus("succeeded");
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load chat list");
        setPatients([]);
        setStatus("failed");
      }
    };

    loadPatients();
  }, []);

  useEffect(() => {
    const loadConversation = async () => {
      if (!selectedPatientId) return;

      try {
        const conversation = await getConversation(selectedPatientId);
        const currentUserId = getCurrentUserId();
        setMessagesByPatient((prev) => ({
          ...prev,
          [selectedPatientId]: conversation.map((item, index) => normalizeChatMessage(item, index, currentUserId)),
        }));
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load conversation");
        setMessagesByPatient((prev) => ({
          ...prev,
          [selectedPatientId]: [],
        }));
      }
    };

    loadConversation();
  }, [selectedPatientId]);

  const sourcePatients = patients;

  const filteredPatients = sourcePatients.filter((patient) => {
    const statusValue = String(patient.status || "").toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      patient.name.toLowerCase().includes(term) ||
      String(patient.condition || "").toLowerCase().includes(term) ||
      String(patient.lastMessage || "").toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === "unread" ||
      statusFilter === "archived" ||
      statusValue === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unreadCount = sourcePatients.reduce((sum, patient) => sum + Number(patient.unread || 0), 0);
  const criticalCount = sourcePatients.filter((patient) => String(patient.status || "").toLowerCase() === "critical").length;
  const waitingCount = sourcePatients.filter((patient) => String(patient.status || "").toLowerCase().includes("waiting")).length;
  const resolvedCount = sourcePatients.filter((patient) => String(patient.status || "").toLowerCase().includes("resolved")).length;

  const selectedPatient = useMemo(
    () => sourcePatients.find((patient) => String(patient.id) === String(selectedPatientId)) || sourcePatients[0],
    [sourcePatients, selectedPatientId]
  );

  const selectedMessages =
    messagesByPatient[selectedPatient?.id] ||
    (selectedPatient?.lastMessage && selectedPatient.lastMessage !== "No messages yet"
      ? [
        {
          id: "latest-message",
          sender: "patient",
          text: selectedPatient.lastMessage,
          time: selectedPatient.messageTime || "Today",
        },
      ]
      : []);

  useEffect(() => {
    const messageArea = messageAreaRef.current;
    if (!messageArea) return;

    window.requestAnimationFrame(() => {
      messageArea.scrollTop = messageArea.scrollHeight;
    });
  }, [selectedMessages.length, selectedPatient?.id]);

  useEffect(() => {
    if (!activeCall) {
      setCallSeconds(0);
      return undefined;
    }

    const missedTimer = activeCall.status === "ringing"
      ? window.setTimeout(() => {
        setActiveCall((call) => call ? { ...call, status: "missed" } : call);
      }, 30000)
      : null;

    const closeMissedTimer = activeCall.status === "missed"
      ? window.setTimeout(() => {
        stopLocalMedia();
        setActiveCall(null);
      }, 1800)
      : null;

    const durationTimer = window.setInterval(() => {
      setCallSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      if (missedTimer) window.clearTimeout(missedTimer);
      if (closeMissedTimer) window.clearTimeout(closeMissedTimer);
      window.clearInterval(durationTimer);
    };
  }, [activeCall]);

  useEffect(() => {
    if (videoPreviewRef.current && mediaStreamRef.current && !activeCall?.isVideoOff) {
      videoPreviewRef.current.srcObject = mediaStreamRef.current;
    }
  }, [activeCall?.isVideoOff, activeCall?.type]);

  useEffect(() => () => {
    stopLocalMedia();
  }, []);

  const getStatusClass = (value) => {
    const normalized = String(value || "stable").toLowerCase().replace(/\s+/g, "-");
    if (normalized === "critical") return "status-critical";
    if (normalized === "needs-attention") return "status-warning";
    if (normalized === "improving") return "status-improving";
    return "status-stable";
  };

  const sendLocalMessage = async (event) => {
    event.preventDefault();
    if (!message.trim() || !selectedPatient?.id || isSending) return;

    const messageText = message.trim();
    const receiverId = selectedPatient.receiverId || selectedPatient.id;
    const localMessage = {
      id: `local-${Date.now()}`,
      sender: "doctor",
      text: messageText,
      time: "Just now",
    };

    setMessagesByPatient((prev) => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), localMessage],
    }));
    setPatients((prev) =>
      prev.map((patient) =>
        String(patient.id) === String(selectedPatient.id)
          ? { ...patient, lastMessage: messageText, messageTime: "Just now" }
          : patient
      )
    );
    setMessage("");
    setError("");

    try {
      setIsSending(true);
      await sendMessage({ receiverId, message: messageText });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const stopLocalMedia = () => {
    if (!mediaStreamRef.current) return;
    mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
  };

  const startLocalMedia = async (type) => {
    stopLocalMedia();
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Camera/microphone is not supported in this browser");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: type === "video" ? { facingMode: "user" } : false,
    });
    mediaStreamRef.current = stream;
    return stream;
  };

  const startCall = async (type) => {
    if (!selectedPatient?.id) {
      setError("Please select a patient before starting a call");
      return;
    }
    const receiverId = selectedPatient.receiverId || selectedPatient.id;
    setError("");
    setCallSeconds(0);

    try {
      const localStream = await startLocalMedia(type);
      const response = await startChatCall({ receiverId, callType: type });
      const callData = unwrapApiObject(response);
      setActiveCall({
        id: getFirstValue(callData.id, callData.call_id, callData.callId, response?.call_id, response?.id),
        type,
        status: getFirstValue(callData.status, response?.status) === "accepted" ? "connected" : "ringing",
        isMuted: false,
        isVideoOff: false,
      });
      window.requestAnimationFrame(() => {
        if (type === "video" && videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = localStream;
        }
      });
    } catch (err) {
      stopLocalMedia();
      setError(err.response?.data?.message || err.message || "Failed to start call");
    }
  };

  const endCall = async (statusValue = "cancelled") => {
    const callId = activeCall?.id;
    setActiveCall(null);
    stopLocalMedia();
    if (!callId) return;

    try {
      await endChatCall({ callId, status: statusValue });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update call status");
    }
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getCallStatusText = () => {
    if (!activeCall) return "";
    if (activeCall.status === "missed") return "No answer";
    if (activeCall.status === "connected") return "Connected";
    return `Ringing... ${Math.min(callSeconds, 30)}s`;
  };

  const renderAttachment = (file) => {
    if (!file) return null;
    const imagePattern = /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i;
    const isImage =
      String(file.type || "").startsWith("image") ||
      imagePattern.test(file.name || "") ||
      imagePattern.test(file.url || "");

    return (
      <div className={`sms-file-attachment ${isImage ? "image" : ""}`}>
        {isImage && file.url && (
          <a href={file.url} target="_blank" rel="noreferrer" className="sms-file-preview" title="Open attachment">
            <img src={file.url} alt={file.name || "Attachment"} />
          </a>
        )}
        <div className="sms-file-details">
          <FaPaperclip />
          {file.url ? (
            <a href={file.url} target="_blank" rel="noreferrer">{file.name || "Attachment"}</a>
          ) : (
            <span>{file.name || "Attachment"}</span>
          )}
          {file.size && <small>{file.size}</small>}
        </div>
      </div>
    );
  };

  const toggleMute = () => {
    setActiveCall((call) => {
      if (!call) return call;
      const nextMuted = !call.isMuted;
      mediaStreamRef.current?.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
      });
      return { ...call, isMuted: nextMuted };
    });
  };

  const toggleVideo = () => {
    setActiveCall((call) => {
      if (!call) return call;
      const nextVideoOff = !call.isVideoOff;
      mediaStreamRef.current?.getVideoTracks().forEach((track) => {
        track.enabled = !nextVideoOff;
      });
      return { ...call, isVideoOff: nextVideoOff };
    });
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleAttachmentChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedPatient?.id) return;

    const receiverId = selectedPatient.receiverId || selectedPatient.id;
    const caption = message.trim();
    setError("");

    try {
      setIsSending(true);
      const localPreviewUrl = URL.createObjectURL(file);
      const fallbackFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        url: localPreviewUrl,
      };
      const response = await sendAttachment({ receiverId, message: caption, file });
      const uploadedFile = normalizeAttachment(response, fallbackFile) || {
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: formatFileSize(file.size),
        url: localPreviewUrl,
      };
      const uploadedData = unwrapApiObject(response);
      const uploadedMessage = {
        id: getFirstValue(uploadedData.id, uploadedData.message_id, uploadedData._id, `file-${Date.now()}`),
        sender: "doctor",
        text: cleanAttachmentMessageText(getFirstValue(uploadedData.message, uploadedData.text, caption, ""), uploadedFile),
        file: uploadedFile,
        time: "Just now",
      };

      setMessagesByPatient((prev) => ({
        ...prev,
        [selectedPatient.id]: [...(prev[selectedPatient.id] || []), uploadedMessage],
      }));
      setPatients((prev) =>
        prev.map((patient) =>
          String(patient.id) === String(selectedPatient.id)
            ? { ...patient, lastMessage: uploadedFile.name, messageTime: "Just now" }
            : patient
        )
      );
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to upload attachment");
    } finally {
      setIsSending(false);
      event.target.value = "";
    }
  };

  return (
    <div className="patient-list-container sms-communications-screen">
      <header className="sms-page-header">
        <h1>Patient Communications</h1>
        <p>Manage patient conversations and urgent communications.</p>
      </header>

      <section className="sms-stats-grid">
        <article><span className="sms-stat-icon critical">△</span><b>Live</b><strong>{criticalCount}</strong><h3>Critical Patients</h3><p>Require immediate attention</p></article>
        <article><span className="sms-stat-icon unread">✉</span><b className="blue">Live</b><strong>{unreadCount}</strong><h3>Unread Messages</h3><p>New patient inquiries</p></article>
        <article><span className="sms-stat-icon waiting">▣</span><b className="muted">Live</b><strong>{waitingCount}</strong><h3>Waiting for Reply</h3><p>Awaiting clinical response</p></article>
        <article><span className="sms-stat-icon resolved">✓</span><b className="green">Live</b><strong>{resolvedCount}</strong><h3>Resolved Today</h3><p>Closed conversations</p></article>
      </section>

      <div className="sms-filter-bar">
        <div className="sms-filter-tabs">
          {[
            ["all", "All"],
            ["unread", "Unread"],
            ["critical", "Critical"],
            ["needs attention", "Needs Attention"],
            ["stable", "Stable"],
            ["improving", "Improving"],
            ["archived", "Archived"],
          ].map(([value, label]) => (
            <button className={statusFilter === value ? "active" : ""} key={value} onClick={() => setStatusFilter(value)} type="button">
              {label}
              {value === "unread" && <span>{unreadCount}</span>}
            </button>
          ))}
        </div>
        <div className="sms-sort-actions">
          <button type="button">☰ Recent</button>
          <button type="button">≡ Filter</button>
        </div>
      </div>

      <div className="sms-communications-layout">
        <aside className="sms-conversations-card">
          <div className="sms-conversations-header">
            <h2>Conversations</h2>
            <button type="button">+</button>
          </div>

          <label className="sms-search-box">
            <FaSearch />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search conversations..." />
          </label>

          <div className="sms-conversation-list">
            {filteredPatients.length === 0 ? (
              <div className="no-patients"><p>{status === "loading" ? "Loading conversations..." : status === "failed" ? error : "No conversations found."}</p></div>
            ) : filteredPatients.map((patient) => (
              <button
                className={`sms-conversation-item ${String(selectedPatient?.id) === String(patient.id) ? "active" : ""}`}
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                type="button"
              >
                <div className="sms-conversation-main">
                  <div>
                    <strong>{patient.name}</strong>
                    <span className={`sms-status-pill ${getStatusClass(patient.status)}`}>{patient.status}</span>
                  </div>
                  <small>{patient.previewTitle || patient.condition}</small>
                  <p>{patient.lastMessage || "No messages yet"}</p>
                </div>
                <div className="sms-conversation-meta">
                  <span>{patient.messageTime || "Yesterday"}</span>
                  {(patient.unread || 0) > 0 && <b>{patient.unread}</b>}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="sms-chat-card">
          <div className="sms-chat-header">
            <div className="sms-chat-avatar">{getInitials(selectedPatient?.name)}</div>
            <div className="sms-chat-title">
              <h2>
                {selectedPatient?.name || "Select a patient"}
                {selectedPatient?.status && <span className={`sms-status-pill ${getStatusClass(selectedPatient.status)}`}>{selectedPatient.status}</span>}
              </h2>
              <p>
                {selectedPatient
                  ? `${selectedPatient.age}${selectedPatient.gender?.[0] || ""} - Blood ${selectedPatient.bloodGroup || "N/A"} - ${selectedPatient.condition}`
                  : "Choose a conversation to view messages"}
              </p>
            </div>
            <div className="sms-chat-actions">
              <button type="button" onClick={() => startCall("voice")} title="Voice call"><FaPhone /></button>
              <button type="button" onClick={() => startCall("video")} title="Video call"><FaVideo /></button>
            </div>
          </div>

          <div className="sms-message-area" ref={messageAreaRef}>
            <div className="sms-date-chip">{selectedPatient ? "Today" : "No conversation selected"}</div>
            {selectedMessages.slice(0, 1).map((msg) => (
              <div className={`sms-message-row ${msg.sender}`} key={msg.id}>
                <span className="sms-message-avatar">{getInitials(selectedPatient?.name)}</span>
                <div>
                  <div className="sms-message-meta">{msg.sender === "doctor" ? "You" : selectedPatient?.name} <span>{msg.time}</span></div>
                  <div className="sms-message-bubble">
                    {msg.text}
                    {msg.file && renderAttachment(msg.file)}
                  </div>
                </div>
              </div>
            ))}
            {selectedMessages.length > 1 && <div className="sms-new-divider"><span>New Messages</span></div>}
            {selectedMessages.slice(1).map((msg) => (
              <div className={`sms-message-row ${msg.sender}`} key={msg.id}>
                {msg.sender === "patient" && <span className="sms-message-avatar">{getInitials(selectedPatient?.name)}</span>}
                <div>
                  <div className="sms-message-meta">{msg.sender === "doctor" ? "You" : selectedPatient?.name} <span>{msg.time}</span></div>
                  <div className="sms-message-bubble">
                    {msg.text}
                    {msg.file && renderAttachment(msg.file)}
                  </div>
                </div>
                {msg.sender === "doctor" && <span className="sms-message-avatar doctor">YU</span>}
              </div>
            ))}
          </div>

          <div className="sms-quick-actions">
            <button type="button">▣ Schedule Appointment</button>
            <button type="button">▤ Request Reports</button>
            <button type="button">☤ Upload Prescription</button>
            <button type="button">⟳ Follow Up</button>
          </div>

          {error && <div className="sms-send-error">{error}</div>}

          <input ref={fileInputRef} type="file" className="sms-hidden-file-input" onChange={handleAttachmentChange} />

          <form className="sms-message-form" onSubmit={sendLocalMessage}>
            <button type="button" onClick={handleAttachmentClick} disabled={!selectedPatient?.id} title="Attach file"><FaPaperclip /></button>
            <button type="button">☺</button>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Type a message to ${selectedPatient?.name?.split(" ")[0] || "patient"}...`} />
            <button type="button">♩</button>
            <button className="send" type="submit" disabled={!message.trim() || isSending}><FaPaperPlane /></button>
          </form>
        </section>
      </div>

      {activeCall && (
        <div className="sms-call-overlay" role="dialog" aria-modal="true">
          <div className={`sms-call-card ${activeCall.type}`}>
            <div className="sms-call-top">
              <span>{activeCall.type === "video" ? "Video call" : "Voice call"}</span>
              <strong>{activeCall.status === "connected" ? formatCallDuration(callSeconds) : getCallStatusText()}</strong>
            </div>
            <div className="sms-call-avatar">{getInitials(selectedPatient?.name)}</div>
            <h2>{selectedPatient?.name || "Patient"}</h2>
            <p>
              {activeCall.status === "missed"
                ? "Patient did not answer. Call marked as missed."
                : activeCall.status === "ringing"
                  ? "Calling patient..."
                  : "Connected"}
            </p>

            {activeCall.type === "video" && (
              <div className="sms-video-preview">
                {activeCall.isVideoOff ? (
                  <span>Camera off</span>
                ) : (
                  <video ref={videoPreviewRef} autoPlay playsInline muted />
                )}
              </div>
            )}

            <div className="sms-call-controls">
              <button
                type="button"
                className={activeCall.isMuted ? "active" : ""}
                onClick={toggleMute}
                title={activeCall.isMuted ? "Unmute" : "Mute"}
              >
                {activeCall.isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              {activeCall.type === "video" && (
                <button
                  type="button"
                  className={activeCall.isVideoOff ? "active" : ""}
                  onClick={toggleVideo}
                  title={activeCall.isVideoOff ? "Turn camera on" : "Turn camera off"}
                >
                  {activeCall.isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                </button>
              )}
              <button type="button" className="end" onClick={() => endCall("cancelled")} title="End call">
                <FaPhoneSlash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;
