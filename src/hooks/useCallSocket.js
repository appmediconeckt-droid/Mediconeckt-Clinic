import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL, getAuthToken } from '../redux/apiConfig';

const CALL_EVENTS = [
  'chat:connected',
  'call:ringing',
  'call:accepted',
  'call:rejected',
  'call:cancelled',
  'call:ended',
  'call:missed',
];

export default function useCallSocket(handlers = {}, enabled = true) {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const token = getAuthToken();
    if (!enabled || !token) return undefined;

    const socket = io(API_BASE_URL, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

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
        }[eventName];
        handlersRef.current[callbackName]?.(data);
      });
    });

    return () => {
      CALL_EVENTS.forEach((eventName) => socket.removeAllListeners(eventName));
      socket.removeAllListeners('connect');
      socket.removeAllListeners('connect_error');
      socket.disconnect();
    };
  }, [enabled]);
}
