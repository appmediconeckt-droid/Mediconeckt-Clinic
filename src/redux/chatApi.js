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
  const collectionKeys = [
    'messages',
    'doctors',
    'patients',
    'users',
    'chats',
    'chatList',
    'chat_list',
    'conversation',
    'conversations',
    'results',
    'items',
  ];

  const findArray = (value, depth = 0) => {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== 'object' || depth > 3) return null;

    if (value.data !== undefined) {
      const dataArray = findArray(value.data, depth + 1);
      if (dataArray) return dataArray;
    }

    for (const key of collectionKeys) {
      if (value[key] === undefined) continue;
      const collection = findArray(value[key], depth + 1);
      if (collection) return collection;
    }

    return null;
  };

  return findArray(payload) || [];
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
  // A filename is metadata, not a fetchable asset URL. Turning it into
  // https://api-host/file.png causes a guaranteed 404 at the server root.
  if (!normalizedPath.includes('/')) return '';
  // APIs sometimes return an absolute server filesystem path. Only the public
  // uploads/files portion belongs in a browser URL.
  const publicPathMatch = normalizedPath.match(/\/(uploads?|attachments?|files?|media)\/.*$/i);
  if (publicPathMatch) normalizedPath = publicPathMatch[0];
  return `${API_ORIGIN_URL}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`;
};

export const getAttachmentUrl = (message) => {
  const attachment = message?.attachment || message?.file || message?.media || {};
  const candidate =
    message?.attachment_url ||
    message?.attachmentUrl ||
    message?.secure_url ||
    message?.secureUrl ||
    message?.cloudinary_url ||
    message?.cloudinaryUrl ||
    attachment?.attachment_url ||
    attachment?.attachmentUrl ||
    attachment?.secure_url ||
    attachment?.secureUrl ||
    attachment?.cloudinary_url ||
    attachment?.cloudinaryUrl ||
    attachment?.url ||
    attachment?.path ||
    '';
  return getAssetUrl(candidate);
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

export const sendAttachment = async ({ receiverId, message, file, messageType }) => {
  const formData = new FormData();
  formData.append('receiver_id', receiverId);
  if (message) formData.append('message', message);
  formData.append('message_type', messageType || (file?.type?.startsWith('image/') ? 'image' : 'file'));
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
