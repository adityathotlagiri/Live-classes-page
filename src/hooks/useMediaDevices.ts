import { useState, useCallback } from 'react';
import type { MediaPermissions } from '@/types/liveClass';

export function useMediaDevices(initialMic = true, initialCamera = true) {
  const [micOn, setMicOn] = useState(initialMic);
  const [cameraOn, setCameraOn] = useState(initialCamera);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareDenied, setScreenShareDenied] = useState(false);
  const [permissions, setPermissions] = useState<MediaPermissions>({
    camera: 'granted',
    microphone: 'granted',
    screenShare: 'unknown',
  });

  const toggleMic = useCallback(() => {
    if (permissions.microphone === 'denied') return;
    setMicOn((v) => !v);
  }, [permissions.microphone]);

  const toggleCamera = useCallback(() => {
    if (permissions.camera === 'denied') return;
    setCameraOn((v) => !v);
  }, [permissions.camera]);

  const toggleScreenShare = useCallback(() => {
    if (isScreenSharing) {
      setIsScreenSharing(false);
      return;
    }
    // Simulated permission prompt — swap this for real getDisplayMedia() later
    setScreenShareDenied(false);
    setIsScreenSharing(true);
  }, [isScreenSharing]);

  const simulateDenied = useCallback((device: 'camera' | 'microphone' | 'screenShare') => {
    setPermissions((prev) => ({ ...prev, [device]: 'denied' }));
    if (device === 'camera') setCameraOn(false);
    if (device === 'microphone') setMicOn(false);
    if (device === 'screenShare') {
      setScreenShareDenied(true);
      setIsScreenSharing(false);
    }
  }, []);

  return {
    micOn,
    cameraOn,
    isScreenSharing,
    screenShareDenied,
    permissions,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    simulateDenied,
    dismissScreenShareError: () => setScreenShareDenied(false),
  };
}