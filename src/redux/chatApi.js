import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

const CHAT_BASE_URL = `${API_BASE_URL}/chat`;
const API_ORIGIN_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export const getStoredAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem('authUser') || 'null');
  } catch (error) {
    return null;
  }
};

export const getCurrentUserId = (authUser) => {
  const user = authUser || getStoredAuthUser();
  return user?.id || user?._id || user?.user_id || user?.patient_id || user?.doctor_id;
};

export const unwrapApiArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.messages)) return payload.messages;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.chats)) return payload.chats;
  if (Array.isArray(payload?.conversations)) return payload.conversations;
  return [];
};

export const unwrapApiObject = (payload) => {
  if (payload?.data?.data && !Array.isArray(payload.data.data)) return payload.data.data;
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  if (payload?.message && typeof payload.message === 'object') return payload.message;
  if (payload?.attachment && typeof payload.attachment === 'object') return payload.attachment;
  if (payload?.call && typeof payload.call === 'object') return payload.call;
  return payload || {};
};

export const getAssetUrl = (path) => {
  if (!path) return '';
  let normalizedPath = String(path).replace(/\\/g, '/');
  if (/^https?:\/\//i.test(normalizedPath) || normalizedPath.startsWith('blob:')) return normalizedPath;
  // APIs sometimes return an absolute server filesystem path. Only the public
  // uploads/files portion belongs in a browser URL.
  const publicPathMatch = normalizedPath.match(/\/(uploads?|attachments?|files?|media)\/.*$/i);
  if (publicPathMatch) normalizedPath = publicPathMatch[0];
  return `${API_ORIGIN_URL}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`;
};

export const getChatDoctors = async () => {
  const response = await axios.get(`${CHAT_BASE_URL}/doctors`, {
    headers: getAuthHeaders(),
  });
  return unwrapApiArray(response.data);
};

export const getChatList = async () => {
  const response = await axios.get(`${CHAT_BASE_URL}/list`, {
    headers: getAuthHeaders(),
  });
  return unwrapApiArray(response.data);
};

export const getConversation = async (userId) => {
  const response = await axios.get(`${CHAT_BASE_URL}/conversation/${userId}`, {
    headers: getAuthHeaders(),
  });
  return unwrapApiArray(response.data);
};

export const sendMessage = async ({ receiverId, message }) => {
  const response = await axios.post(
    `${CHAT_BASE_URL}/send`,
    {
      receiver_id: receiverId,
      message,
    },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const sendAttachment = async ({ receiverId, message, file }) => {
  const formData = new FormData();
  formData.append('receiver_id', receiverId);
  if (message) formData.append('message', message);
  formData.append('attachment', file);
  const headers = { ...getAuthHeaders() };
  delete headers['Content-Type'];
  delete headers['content-type'];

  const response = await axios.post(`${CHAT_BASE_URL}/send-attachment`, formData, {
    headers,
  });

  return response.data;
};

export const startCall = async ({ receiverId, callType }) => {
  const response = await axios.post(
    `${CHAT_BASE_URL}/calls/start`,
    {
      receiver_id: receiverId,
      call_type: callType,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const acceptCall = async (callId) => {
  const response = await axios.patch(
    `${CHAT_BASE_URL}/calls/${callId}/accept`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const endCall = async ({ callId, status = 'ended' }) => {
  const response = await axios.patch(
    `${CHAT_BASE_URL}/calls/${callId}/end`,
    { status },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const getCallHistory = async (userId) => {
  const response = await axios.get(`${CHAT_BASE_URL}/calls/history/${userId}`, {
    headers: getAuthHeaders(),
  });

  return unwrapApiArray(response.data);
};

export const sendAiMessage = async (message) => {
  const response = await axios.post(
    `${CHAT_BASE_URL}/ai/send`,
    {
      message,
      text: message,
      prompt: message,
    },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};
