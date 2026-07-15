import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { acceptCall, endCall, getCurrentUserId } from '../redux/chatApi';
import useCallSocket from '../hooks/useCallSocket';
import useWebRTCCall from '../hooks/useWebRTCCall';

export default function GlobalIncomingCall() {
  const location = useLocation();
  const [call, setCall] = useState(null);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const isChatScreen = location.pathname === '/patient-sms' || location.pathname === '/doctor-sms';
  const activeCallId = call?.id ?? call?._id ?? call?.call_id ?? call?.callId;
  const callerUserId = call?.caller_id ?? call?.callerId ?? call?.sender_id;
  const activeCallType = call?.call_type ?? call?.callType ?? call?.type ?? 'voice';
  const rtc = useWebRTCCall({ callId: activeCallId, peerUserId: callerUserId, callType: activeCallType });

  useEffect(() => {
    if (remoteVideoRef.current && rtc.remoteStream) remoteVideoRef.current.srcObject = rtc.remoteStream;
    if (localVideoRef.current && rtc.localStream) localVideoRef.current.srcObject = rtc.localStream;
  }, [rtc.remoteStream, rtc.localStream]);

  useCallSocket({
    onRinging: (incomingCall) => {
      const currentUserId = getCurrentUserId();
      const callerId = incomingCall?.caller_id ?? incomingCall?.callerId ?? incomingCall?.sender_id;
      const receiverId = incomingCall?.receiver_id ?? incomingCall?.receiverId ?? incomingCall?.callee_id;
      if (receiverId && String(receiverId) !== String(currentUserId)) return;
      if (!receiverId && callerId && String(callerId) === String(currentUserId)) return;
      setCall(incomingCall);
    },
    onRejected: () => setCall(null),
    onCancelled: () => setCall(null),
    onEnded: () => setCall(null),
    onMissed: () => setCall(null),
  }, !isChatScreen);

  if (!call || isChatScreen) return null;
  const callId = call.id ?? call._id ?? call.call_id ?? call.callId;
  const type = call.call_type ?? call.callType ?? call.type ?? 'voice';
  const callerName = call.caller_name ?? call.callerName ?? call.sender_name ?? 'Patient';

  const accept = async () => {
    if (!callId) return;
    await rtc.getLocalMedia(type);
    await acceptCall(callId);
    setCall((current) => current ? { ...current, status: 'accepted' } : current);
  };
  const reject = async () => {
    if (callId) await endCall({ callId, status: 'rejected' });
    setCall(null);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(15,23,42,.6)', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: 360, maxWidth: '92vw', padding: 28, borderRadius: 22, background: '#fff', textAlign: 'center', boxShadow: '0 24px 70px rgba(0,0,0,.3)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 14px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#dbeafe', color: '#1455c0', fontSize: 30 }}>
          <i className={`fa-solid ${type === 'video' ? 'fa-video' : 'fa-phone'}`} />
        </div>
        <h2 style={{ margin: '0 0 6px' }}>{callerName}</h2>
        <p style={{ margin: '0 0 24px', color: '#64748b' }}>Incoming {type} call</p>
        {call.status === 'accepted' && type === 'video' && (
          <div style={{ position: 'relative', height: 220, marginBottom: 18, overflow: 'hidden', borderRadius: 16, background: '#0f172a' }}>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <video ref={localVideoRef} autoPlay muted playsInline style={{ position: 'absolute', right: 10, bottom: 10, width: 90, height: 68, objectFit: 'cover', borderRadius: 10 }} />
          </div>
        )}
        {call.status === 'accepted' && type === 'voice' && <audio autoPlay ref={(node) => { if (node && rtc.remoteStream) node.srcObject = rtc.remoteStream; }} />}
        {call.status === 'accepted' ? (
          <button onClick={reject} style={{ border: 0, borderRadius: 999, padding: '12px 24px', background: '#dc2626', color: '#fff' }}>End Call</button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
            <button onClick={reject} style={{ border: 0, borderRadius: 999, padding: '12px 22px', background: '#dc2626', color: '#fff' }}>Reject</button>
            <button onClick={accept} style={{ border: 0, borderRadius: 999, padding: '12px 22px', background: '#16a34a', color: '#fff' }}>Accept</button>
          </div>
        )}
      </div>
    </div>
  );
}
