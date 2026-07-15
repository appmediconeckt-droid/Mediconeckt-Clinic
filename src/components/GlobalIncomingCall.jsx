import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { acceptCall, endCall, getCurrentUserId } from '../redux/chatApi';
import useCallSocket from '../hooks/useCallSocket';
import useWebRTCCall from '../hooks/useWebRTCCall';
import './GlobalIncomingCall.css';

export default function GlobalIncomingCall() {
  const location = useLocation();
  const [call, setCall] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  // The chat pages render their own in-page call UI, so stay out of their way there.
  const isChatScreen =
    location.pathname === '/patient-sms' ||
    location.pathname === '/doctor-sms' ||
    location.pathname.startsWith('/patient-chat/') ||
    location.pathname.startsWith('/doctor-chat/');

  const activeCallId = call?.id ?? call?._id ?? call?.call_id ?? call?.callId;
  const callerUserId = call?.caller_id ?? call?.callerId ?? call?.sender_id ?? call?.from_user_id;
  const activeCallType = call?.call_type ?? call?.callType ?? call?.type ?? 'voice';
  const accepted = call?.status === 'accepted';

  const rtc = useWebRTCCall({ callId: activeCallId, peerUserId: callerUserId, callType: activeCallType });

  // Attach streams to the video elements
  useEffect(() => {
    if (remoteVideoRef.current && rtc.remoteStream) remoteVideoRef.current.srcObject = rtc.remoteStream;
    if (localVideoRef.current && rtc.localStream) localVideoRef.current.srcObject = rtc.localStream;
  }, [rtc.remoteStream, rtc.localStream, accepted]);

  // Call duration timer (starts once accepted)
  useEffect(() => {
    if (!accepted) { setSeconds(0); return; }
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [accepted]);

  // Reflect mute / camera toggles onto the real tracks
  useEffect(() => {
    rtc.localStream?.getAudioTracks().forEach((t) => { t.enabled = !muted; });
  }, [muted, rtc.localStream]);

  useEffect(() => {
    rtc.localStream?.getVideoTracks().forEach((t) => { t.enabled = !videoOff; });
  }, [videoOff, rtc.localStream]);

  const closeCall = () => {
    rtc.stop();
    setCall(null);
    setMuted(false);
    setVideoOff(false);
  };

  useCallSocket({
    onRinging: (incomingCall) => {
      const currentUserId = getCurrentUserId();
      const callerId = incomingCall?.caller_id ?? incomingCall?.callerId ?? incomingCall?.sender_id;
      const receiverId = incomingCall?.receiver_id ?? incomingCall?.receiverId ?? incomingCall?.callee_id;
      // Only ring the intended receiver — never the caller themselves
      if (receiverId && String(receiverId) !== String(currentUserId)) return;
      if (!receiverId && callerId && String(callerId) === String(currentUserId)) return;
      setCall(incomingCall);
    },
    onRejected: closeCall,
    onCancelled: closeCall,
    onEnded: closeCall,
    onMissed: closeCall,
  }, !isChatScreen);

  if (!call || isChatScreen) return null;

  const type = activeCallType;
  const callerName =
    call.caller_name ?? call.callerName ?? call.sender_name ?? call.from_name ?? 'Incoming call';

  const initials = String(callerName)
    .replace(/^Dr\.?\s*/i, '')
    .split(' ').filter(Boolean).map((w) => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const accept = async () => {
    if (!activeCallId) return;
    try {
      await rtc.getLocalMedia(type);      // grab mic/cam before answering
      await acceptCall(activeCallId);      // tell the server -> caller sends the offer
      setCall((c) => (c ? { ...c, status: 'accepted' } : c));
    } catch (err) {
      console.error('[GlobalIncomingCall] accept failed:', err);
      alert('Could not access your microphone/camera.');
    }
  };

  const hangUp = async (status) => {
    const id = activeCallId;
    closeCall();
    if (id) {
      try {
        await endCall({ callId: id, status });
      } catch (err) {
        console.error('[GlobalIncomingCall] end call failed:', err);
      }
    }
  };

  // ===== Ringing: Accept / Reject popup =====
  if (!accepted) {
    return (
      <div className="gic-overlay">
        <div className="gic-popup">
          <div className="gic-avatar">
            <i className={`fa-solid ${type === 'video' ? 'fa-video' : 'fa-phone'}`} />
          </div>
          <h2 className="gic-name">{callerName}</h2>
          <p className="gic-sub">Incoming {type} call…</p>
          <div className="gic-actions">
            <button className="gic-btn gic-btn-reject" onClick={() => hangUp('rejected')}>
              <i className="fa-solid fa-phone-slash" /> Reject
            </button>
            <button className="gic-btn gic-btn-accept" onClick={accept}>
              <i className="fa-solid fa-phone" /> Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== Accepted: full-screen connected call =====
  return (
    <div className="gic-call">
      <div className="gic-call-top">
        <div>
          <div className="gic-call-who">{callerName}</div>
          <div className="gic-call-timer">{fmt(seconds)}</div>
        </div>
        <span className="gic-enc"><i className="fa-solid fa-lock" /> End-to-end call</span>
      </div>

      {type === 'video' ? (
        <div className="gic-stage">
          <video ref={remoteVideoRef} autoPlay playsInline className="gic-remote" />
          {!rtc.remoteStream && (
            <div className="gic-waiting">
              <i className="fa-solid fa-spinner fa-spin" /> Connecting video…
            </div>
          )}
          <div className="gic-pip">
            <video ref={localVideoRef} autoPlay muted playsInline />
          </div>
        </div>
      ) : (
        <div className="gic-voice">
          <div className="gic-voice-avatar">{initials}</div>
          <h2 className="gic-voice-name">{callerName}</h2>
          <div className="gic-voice-timer">
            {rtc.remoteStream ? fmt(seconds) : 'Connecting…'}
          </div>
          <audio
            autoPlay
            ref={(node) => { if (node && rtc.remoteStream) node.srcObject = rtc.remoteStream; }}
          />
        </div>
      )}

      <div className="gic-controls">
        <button
          className={`gic-ctrl ${muted ? 'off' : ''}`}
          onClick={() => setMuted((m) => !m)}
          title={muted ? 'Unmute' : 'Mute'}
        >
          <i className={`fa-solid ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`} />
        </button>

        {type === 'video' && (
          <button
            className={`gic-ctrl ${videoOff ? 'off' : ''}`}
            onClick={() => setVideoOff((v) => !v)}
            title={videoOff ? 'Turn camera on' : 'Turn camera off'}
          >
            <i className={`fa-solid ${videoOff ? 'fa-video-slash' : 'fa-video'}`} />
          </button>
        )}

        <button className="gic-ctrl end" onClick={() => hangUp('ended')} title="End call">
          <i className="fa-solid fa-phone-slash" />
        </button>
      </div>
    </div>
  );
}
