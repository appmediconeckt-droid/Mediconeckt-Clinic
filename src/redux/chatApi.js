import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

const CHAT_BASE_URL = `${API_BASE_URL}/chat`;

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
