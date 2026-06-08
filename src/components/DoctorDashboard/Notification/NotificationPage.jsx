import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./NotificationPage.css";

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

const getDoctorId = (user = {}) => (
  user.doctor_id ||
  user.doctorId ||
  user.id ||
  user._id ||
  user.user_id ||
  user.userId ||
  ""
);

const formatNotificationTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeType = (value = "") => {
  const type = String(value || "notification").toLowerCase();
  if (type.includes("appoint")) return "appointment";
  if (type.includes("report") || type.includes("prescription") || type.includes("document")) return "report";
  if (type.includes("pay")) return "payment";
  if (type.includes("message") || type.includes("chat")) return "message";
  if (type.includes("emergency") || type.includes("alert")) return "emergency";
  if (type.includes("follow") || type.includes("reminder")) return "followup";
  return "notification";
};

const normalizeNotification = (item, index) => {
  const title = item.title || item.type || item.notification_type || item.subject || "Notification";
  const type = normalizeType(item.type || item.notification_type || title);

  return {
    id: item.id || item.notification_id || item._id || index,
    title,
    message: item.message || item.description || item.body || item.content || "No details available.",
    time: formatNotificationTime(item.created_at || item.createdAt || item.time || item.updated_at),
    read: Boolean(item.is_read ?? item.read ?? item.seen ?? false),
    type,
  };
};

export default function NotificationPage() {
  const authUser = useSelector((state) => state.auth?.user);
  const user = useMemo(() => authUser || getStoredAuthUser() || {}, [authUser]);
  const userId = useMemo(() => getDoctorId(user), [user]);
  const userRole = String(user.role || "doctor").toLowerCase();

  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const loadNotifications = useCallback(async (signal) => {
    if (!userId) {
      setError("Doctor id not found. Please login again.");
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
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
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
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));

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
    setNotifications((prev) => prev.filter((item) => item.id !== id));

    try {
      await axios.delete(`${NOTIFICATION_BASE_URL}/${id}`, { headers: getAuthHeaders() });
    } catch (err) {
      setNotifications(current);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to delete notification");
    }
  };

  return (
    <div className="doctor-notifications-page">
      <div className="doctor-notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>{unreadCount} unread notification{unreadCount === 1 ? "" : "s"}</p>
        </div>
        <button
          type="button"
          className="doctor-notifications-mark-all"
          onClick={markAllAsRead}
          disabled={!notifications.length || unreadCount === 0}
        >
          <i className="fas fa-check-double"></i>
          Mark all as read
        </button>
      </div>

      {error && <div className="doctor-notifications-error">{error}</div>}

      {status === "loading" ? (
        <div className="doctor-notifications-state">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="doctor-notifications-state">No notifications yet.</div>
      ) : (
        <div className="doctor-notifications-list">
          {notifications.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className={`doctor-notifications-card ${item.type} ${item.read ? "read" : "unread"}`}
              onClick={() => !item.read && markAsRead(item.id)}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && !item.read) {
                  markAsRead(item.id);
                }
              }}
            >
              <div className="doctor-notifications-info">
                <span className="doctor-notifications-dot"></span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                </div>
              </div>
              <div className="doctor-notifications-meta">
                <span className="doctor-notifications-time">{item.time}</span>
                {!item.read && <span className="doctor-notifications-new">NEW</span>}
                <span
                  role="button"
                  tabIndex={0}
                  className="doctor-notifications-delete"
                  aria-label="Delete notification"
                  onClick={(event) => deleteNotification(item.id, event)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") deleteNotification(item.id, event);
                  }}
                >
                  <i className="fas fa-times"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
