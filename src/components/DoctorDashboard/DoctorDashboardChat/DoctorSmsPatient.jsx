import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaPaperclip, FaPhone, FaSearch, FaVideo } from "react-icons/fa";
import { getChatList, getConversation, getCurrentUserId, sendMessage } from "../../../redux/chatApi";
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

const getLastMessageText = (item) => {
  const lastMessage = item.lastMessage || item.last_message || item.latest_message;
  if (typeof lastMessage === "string") return lastMessage;
  return lastMessage?.message || lastMessage?.text || item.message || item.content || "No messages yet";
};

const normalizeChatMessage = (msg, index, currentUserId) => {
  const senderId = msg.sender_id || msg.senderId || msg.from_user_id || msg.user_id;
  const senderRole = msg.sender || msg.sender_role || msg.role;
  const createdAt = msg.time || msg.created_at || msg.createdAt || new Date().toISOString();

  return {
    id: msg.id || msg._id || `api-${index}`,
    sender: senderRole || (String(senderId) === String(currentUserId) ? "doctor" : "patient"),
    text: msg.message || msg.text || msg.content || "",
    time: formatChatTime(createdAt) || createdAt,
  };
};

function PatientList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [messagesByPatient, setMessagesByPatient] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageAreaRef = useRef(null);

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
              <button type="button"><FaPhone /></button>
              <button type="button"><FaVideo /></button>
              <button className="view-profile" onClick={() => selectedPatient?.id && navigate(`/patient-chat/${selectedPatient.id}`)} type="button" disabled={!selectedPatient?.id}>View Profile</button>
            </div>
          </div>

          <div className="sms-message-area" ref={messageAreaRef}>
            <div className="sms-date-chip">{selectedPatient ? "Today" : "No conversation selected"}</div>
            {selectedMessages.slice(0, 1).map((msg) => (
              <div className={`sms-message-row ${msg.sender}`} key={msg.id}>
                <span className="sms-message-avatar">{getInitials(selectedPatient?.name)}</span>
                <div>
                  <div className="sms-message-meta">{msg.sender === "doctor" ? "You" : selectedPatient?.name} <span>{msg.time}</span></div>
                  <div className="sms-message-bubble">{msg.text}</div>
                </div>
              </div>
            ))}
            {selectedMessages.length > 1 && <div className="sms-new-divider"><span>New Messages</span></div>}
            {selectedMessages.slice(1).map((msg) => (
              <div className={`sms-message-row ${msg.sender}`} key={msg.id}>
                {msg.sender === "patient" && <span className="sms-message-avatar">{getInitials(selectedPatient?.name)}</span>}
                <div>
                  <div className="sms-message-meta">{msg.sender === "doctor" ? "You" : selectedPatient?.name} <span>{msg.time}</span></div>
                  <div className="sms-message-bubble">{msg.text}</div>
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

          <form className="sms-message-form" onSubmit={sendLocalMessage}>
            <button type="button"><FaPaperclip /></button>
            <button type="button">☺</button>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Type a message to ${selectedPatient?.name?.split(" ")[0] || "patient"}...`} />
            <button type="button">♩</button>
            <button className="send" type="submit" disabled={!message.trim() || isSending}><FaPaperPlane /></button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default PatientList;
