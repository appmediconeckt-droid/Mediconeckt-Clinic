import { useCallback, useEffect, useRef, useState } from 'react';
import useCallSocket from './useCallSocket';

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

export default function useWebRTCCall({ callId, peerUserId, callType = 'voice', onCallEvent }) {
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const stop = useCallback(() => {
    peerRef.current?.close();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    pendingCandidatesRef.current = [];
    setLocalStream(null);
    setRemoteStream(null);
  }, []);

  const getLocalMedia = useCallback(async (type = callType) => {
    if (localStreamRef.current) return localStreamRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' });
    localStreamRef.current = stream;
    setLocalStream(stream);
    return stream;
  }, [callType]);

  const setAudioMuted = useCallback((muted) => {
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
    peerRef.current?.getSenders().forEach((sender) => {
      if (sender.track?.kind === 'audio') sender.track.enabled = !muted;
    });
  }, []);

  const setVideoOff = useCallback((off) => {
    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !off;
    });
    peerRef.current?.getSenders().forEach((sender) => {
      if (sender.track?.kind === 'video') sender.track.enabled = !off;
    });
  }, []);

  const signaling = useCallSocket({
    onWebRTCOffer: async (payload) => {
      if (callId && String(payload.call_id ?? payload.callId) !== String(callId)) return;
      try {
        const stream = await getLocalMedia(payload.call_type ?? payload.callType ?? callType);
        const peer = createPeer(payload.sender_id ?? payload.senderId ?? payload.caller_id, payload.call_id ?? payload.callId);
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        await peer.setRemoteDescription(new RTCSessionDescription(payload.offer));
        await flushCandidates(peer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        signaling.emit('webrtc:answer', { call_id: payload.call_id ?? payload.callId, receiver_id: payload.sender_id ?? payload.senderId ?? payload.caller_id, answer });
      } catch (error) { onCallEvent?.('error', error); }
    },
    onWebRTCAnswer: async (payload) => {
      if (!peerRef.current || (callId && String(payload.call_id ?? payload.callId) !== String(callId))) return;
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(payload.answer));
      await flushCandidates(peerRef.current);
    },
    onWebRTCIceCandidate: async (payload) => {
      if (callId && String(payload.call_id ?? payload.callId) !== String(callId)) return;
      const candidate = payload.candidate;
      if (!candidate) return;
      if (peerRef.current?.remoteDescription) await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      else pendingCandidatesRef.current.push(candidate);
    },
  });

  const flushCandidates = async (peer) => {
    const candidates = pendingCandidatesRef.current.splice(0);
    for (const candidate of candidates) await peer.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const createPeer = (targetUserId = peerUserId, activeCallId = callId) => {
    peerRef.current?.close();
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peer.onicecandidate = ({ candidate }) => {
      if (candidate) signaling.emit('webrtc:ice-candidate', { call_id: activeCallId, receiver_id: targetUserId, candidate });
    };
    peer.ontrack = ({ streams }) => {
      const stream = streams[0];
      remoteStreamRef.current = stream;
      setRemoteStream(stream);
    };
    peer.onconnectionstatechange = () => onCallEvent?.(peer.connectionState, peer);
    peerRef.current = peer;
    return peer;
  };

  const startOffer = useCallback(async () => {
    if (!callId || !peerUserId) return;
    const stream = await getLocalMedia(callType);
    const peer = createPeer(peerUserId, callId);
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    signaling.emit('webrtc:offer', { call_id: callId, receiver_id: peerUserId, call_type: callType, offer });
  }, [callId, peerUserId, callType, getLocalMedia]);

  useEffect(() => stop, [stop]);

  return { localStream, remoteStream, getLocalMedia, setAudioMuted, setVideoOff, startOffer, stop };
}
