import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL, getAuthToken } from '../redux/apiConfig';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const CALL_EVENTS = [
  'chat:connected',
  'call:ringing',
  'call:accepted',
  'call:rejected',
  'call:cancelled',
  'call:ended',
  'call:missed',
  'webrtc:offer',
  'webrtc:answer',
  'webrtc:ice-candidate',
];

export default function useCallSocket(handlers = {}, enabled = true) {
  const handlersRef = useRef(handlers);
  const socketRef = useRef(null);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const token = getAuthToken();
    if (!enabled || !token) return undefined;

    const socket = io(SOCKET_URL, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[call socket] connected:', socket.id);
      handlersRef.current.onConnect?.(socket);
    });
    socket.on('connect_error', (error) => {
      console.error('[call socket] connection failed:', error.message);
      handlersRef.current.onError?.(error);
    });

    CALL_EVENTS.forEach((eventName) => {
      socket.on(eventName, (data) => {
        const callbackName = {
          'chat:connected': 'onChatConnected',
          'call:ringing': 'onRinging',
          'call:accepted': 'onAccepted',
          'call:rejected': 'onRejected',
          'call:cancelled': 'onCancelled',
          'call:ended': 'onEnded',
          'call:missed': 'onMissed',
          'webrtc:offer': 'onWebRTCOffer',
          'webrtc:answer': 'onWebRTCAnswer',
          'webrtc:ice-candidate': 'onWebRTCIceCandidate',
        }[eventName];
        handlersRef.current[callbackName]?.(data);
      });
    });

    return () => {
      CALL_EVENTS.forEach((eventName) => socket.removeAllListeners(eventName));
      socket.removeAllListeners('connect');
      socket.removeAllListeners('connect_error');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [enabled]);

  return {
    emit: (eventName, payload) => socketRef.current?.emit(eventName, payload),
    isConnected: () => Boolean(socketRef.current?.connected),
  };
}
