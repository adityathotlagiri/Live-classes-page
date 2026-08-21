import { useState, useEffect, useCallback, useRef } from 'react';

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const requestToggle = useCallback(() => {
    if (isRecording) {
      setShowStopConfirm(true);
    } else {
      setIsRecording(true);
      setElapsedSeconds(0);
    }
  }, [isRecording]);

  const confirmStop = useCallback(() => {
    setIsRecording(false);
    setShowStopConfirm(false);
  }, []);

  const cancelStop = useCallback(() => setShowStopConfirm(false), []);

  return {
    isRecording,
    elapsedSeconds,
    showStopConfirm,
    requestToggle,
    confirmStop,
    cancelStop,
  };
}