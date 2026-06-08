import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./PatientNotification.css";

const NOTIFICATION_BASE_URL = `${API_BASE_URL}/notifications`;

const getStoredAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem("authUser") || "null");
  } catch {
    return null;
  }
};

const unwrapApiArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.notifications)) return payload.notifications;
  if (Array.isArray(payload?.data?.notifications)) return payload.data.notifications;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const getPatientId = (user = {}) => (
  user.patient_id ||
  user.patientId ||
  user.id ||
  user._id ||
  user.user_id ||
  user.userId ||
  ""
);

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizeType = (value = "") => {
  const type = String(value || "notification").toLowerCase();
  if (type.includes("confirm")) return "confirmation";
  if (type.includes("reminder") || type.includes("follow")) return "reminder";
  if (type.includes("appoint")) return "appointment";
  if (type.includes("pay")) return "payment";
  return "notification";
};

const getIconClass = (type) => {
  switch (type) {
    case "confirmation": return "fa-check-circle";
    case "reminder": return "fa-bell";
    case "appointment": return "fa-calendar-check";
    case "payment": return "fa-credit-card";
    default: return "fa-info-circle";
  }
};

const normalizeNotification = (item, index) => {
  const createdAt = item.created_at || item.createdAt || item.time || item.updated_at;
  const title = item.title || item.type || item.notification_type || item.subject || "Notification";
  const type = normalizeType(item.type || item.notification_type || title);

  return {
    id: item.id || item.notification_id || item._id || index,
    type,
    title,
    description: item.message || item.description || item.body || item.content || "No details available.",
    time: formatTime(createdAt),
    date: formatDate(createdAt),
    read: Boolean(item.is_read ?? item.read ?? item.seen ?? false),
  };
};

const PatientNotification = () => {
  const authUser = useSelector((state) => state.auth?.user);
  const user = useMemo(() => authUser || getStoredAuthUser() || {}, [authUser]);
  const userId = useMemo(() => getPatientId(user), [user]);
  const userRole = String(user.role || "patient").toLowerCase();

  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const loadNotifications = useCallback(async (signal) => {
    if (!userId) {
      setError("Patient id not found. Please login again.");
      setStatus("failed");
      return;
    }

    try {
      setStatus("loading");
      setError("");
      const response = await axios.get(`${NOTIFICATION_BASE_URL}/${userId}/${userRole}`, {
        headers: getAuthHeaders(),
        signal,
      });
      setNotifications(unwrapApiArray(response.data).map(normalizeNotification));
      setStatus("succeeded");
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to load notifications");
      setStatus("failed");
    }
  }, [userId, userRole]);

  useEffect(() => {
    const controller = new AbortController();
    loadNotifications(controller.signal);
    return () => controller.abort();
  }, [loadNotifications]);

  const markAsRead = async (id) => {
    const current = notifications;
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    try {
      await axios.put(`${NOTIFICATION_BASE_URL}/${id}/read`, {}, { headers: getAuthHeaders() });
    } catch (err) {
      setNotifications(current);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    const current = notifications;
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));

    try {
      await axios.put(
        `${NOTIFICATION_BASE_URL}/mark-all-read`,
        { user_id: userId, user_role: userRole },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      setNotifications(current);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to mark all notifications as read");
    }
  };

  const deleteNotification = async (id, event) => {
    event.stopPropagation();
    const current = notifications;
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));

    try {
      await axios.delete(`${NOTIFICATION_BASE_URL}/${id}`, { headers: getAuthHeaders() });
    } catch (err) {
      setNotifications(current);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to delete notification");
    }
  };

  return (
    <div className="patient-notification-container p-4">
      <header className="app-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h1>Notifications</h1>
      </header>

      <div className="patient-notification-main">
        <div className="patient-notification-panel">
          <div className="patient-notification-panel-header">
            <div className="patient-notification-header-left">
              <h2 className="patient-notification-panel-title">All Notifications</h2>
              <span className="patient-notification-unread-count">{unreadCount} unread</span>
            </div>

            <div className="patient-notification-header-actions">
              <button
                type="button"
                className="patient-notification-action-btn mark-all-btn"
                onClick={markAllAsRead}
                disabled={!notifications.length || unreadCount === 0}
              >
                <i className="fas fa-check-double"></i> Mark all as read
              </button>
            </div>
          </div>

          {error && <div className="patient-notification-error">{error}</div>}

          {status === "loading" ? (
            <div className="patient-notification-loading">
              <div className="patient-notification-spinner"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="patient-notification-empty">
              <div className="empty-icon">
                <i className="fas fa-bell-slash"></i>
              </div>
              <h3>No notifications yet</h3>
              <p>You are all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="patient-notification-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`patient-notification-item ${notification.read ? "read" : "unread"}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="patient-notification-item-icon">
                    <div className={`notification-icon ${notification.type}`}>
                      <i className={`fas ${getIconClass(notification.type)}`}></i>
                    </div>
                  </div>

                  <div className="patient-notification-item-content">
                    <div className="patient-notification-item-header">
                      <h3 className="patient-notification-item-title">{notification.title}</h3>
                      {notification.time && (
                        <span className="patient-notification-item-time">{notification.time}</span>
                      )}
                    </div>
                    <p className="patient-notification-item-description">{notification.description}</p>
                    <div className="patient-notification-item-footer">
                      <span className="patient-notification-item-date">{notification.date || "Recent"}</span>
                      <span className={`patient-notification-item-type ${notification.type}`}>
                        {notification.type}
                      </span>
                    </div>
                  </div>

                  <div className="patient-notification-item-actions">
                    {!notification.read && <span className="unread-badge">NEW</span>}
                    <button
                      type="button"
                      className="patient-notification-delete-btn"
                      onClick={(event) => deleteNotification(notification.id, event)}
                      aria-label="Delete notification"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="patient-notification-footer">
        <p className="patient-footer-text">
          <i className="fas fa-info-circle"></i> Notifications are automatically cleared after 30 days
        </p>
      </footer>
    </div>
  );
};

export default PatientNotification;
