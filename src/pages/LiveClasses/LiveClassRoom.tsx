import FloatingReactions from '@/Components/LiveClass/FloatingReactions';
import { useNavigate, useParams } from 'react-router-dom';
import ClassroomHeader from '@/Components/LiveClass/ClassroomHeader';
import ClassroomControls from '@/Components/LiveClass/ClassroomControls';
import { mockClasses } from '@/data/mockClasses';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import VideoGrid from '@/Components/LiveClass/VideoGrid';
import { mockParticipants } from '@/data/mockClasses';
import ParticipantsPanel from '@/Components/LiveClass/ParticipantsPanel';
import { useChat } from '@/hooks/useChat';
import ChatPanel from '@/Components/LiveClass/ChatPanel';
import Whiteboard from '@/Components/LiveClass/Whiteboard';
import ScreenShare from '@/Components/LiveClass/ScreenShare';
import ScreenSharePermissionError from '@/Components/LiveClass/ScreenSharePermissionError';
import { useRecording } from '@/hooks/useRecording';
import StopRecordingModal from '@/Components/LiveClass/StopRecordingModal';
import { useState, useRef, useEffect } from 'react';
import LeaveClassModal from '@/Components/LiveClass/LeaveClassModal';
import EndClassModal from '@/Components/LiveClass/EndClassModal';
import ConnectionOverlay from '@/Components/LiveClass/ConnectionOverlay';
import type { ConnectionStatus } from '@/types/liveClass';
import { useLocation } from 'react-router-dom';

export default function LiveClassRoom() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const liveClass = mockClasses.find((c) => c.id === classId);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const reactionIdRef = useRef(0);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const location = useLocation();
  const initialSettings = location.state as { initialMicOn?: boolean; initialCameraOn?: boolean } | undefined;
  const { messages, unreadCount, isOpen: chatOpen, sendMessage, openChat, closeChat } =
  useChat('t-1', 'You');
  const {
    isRecording,
    elapsedSeconds: recordingSeconds,
    showStopConfirm,
    requestToggle: toggleRecording,
    confirmStop,
    cancelStop,
  } = useRecording();
  const [participantsOpen, setParticipantsOpen] = useState(true);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const {
    micOn,
    cameraOn,
    isScreenSharing,
    screenShareDenied,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    dismissScreenShareError,
  } = useMediaDevices(initialSettings?.initialMicOn, initialSettings?.initialCameraOn);
  const participants = mockParticipants.map((p) =>
    p.id === 't-1' ? { ...p, micOn, cameraOn } : p
  );
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const sessionSecondsRef = useRef(0);
  useEffect(() => {
    const timer = setTimeout(() => setConnectionStatus('connected'), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      sessionSecondsRef.current += 1;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmLeave = () => {
    navigate('/live-classes');
  };

  const handleConfirmEnd = () => {
    navigate('/class-ended', {
      state: {
        classTitle: liveClass?.title ?? 'Live Class',
        durationSeconds: sessionSecondsRef.current,
        participantCount: participants.length,
        hasRecording: isRecording || recordingSeconds > 0,
      },
    });
  };
  const isTeacher = true; // TODO: derive from logged-in user role
  const handleReact = (emoji: string) => {
    const id = reactionIdRef.current++;
    const left = 40 + Math.random() * 20; // keeps them roughly centered
    setReactions((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2200);
  };
  if (!liveClass) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>Class not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950">
      <ConnectionOverlay status={connectionStatus} />
      <ClassroomHeader
        className={liveClass.title}
        isRecording={isRecording}
        recordingSeconds={recordingSeconds}
      />

      {/* Main area — video + side panels go here in later stages */}
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 overflow-hidden">
          {screenShareDenied && (
            <ScreenSharePermissionError onDismiss={dismissScreenShareError} />
          )}

          {isScreenSharing ? (
            <ScreenShare sharerName="You" isOwnShare onStopSharing={toggleScreenShare} />
          ) : whiteboardOpen ? (
            <Whiteboard onClose={() => setWhiteboardOpen(false)} />
          ) : (
            <>
              <VideoGrid participants={participants} />
              <FloatingReactions reactions={reactions} />
            </>
          )}
        </div>

        {chatOpen && (
          <ChatPanel
            messages={messages}
            currentUserId="t-1"
            charLimit={500}
            onSend={sendMessage}
            onClose={closeChat}
          />
        )}

        {participantsOpen && (
          <ParticipantsPanel
            participants={participants}
            onClose={() => setParticipantsOpen(false)}
          />
        )}
      </div>

      <ClassroomControls
        isTeacher={isTeacher}
        micOn={micOn}
        cameraOn={cameraOn}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
        onReact={handleReact}
        chatOpen={chatOpen}
        onToggleScreenShare={toggleScreenShare}
        unreadChatCount={unreadCount}
        onToggleChat={() => (chatOpen ? closeChat() : openChat())}
        participantsOpen={participantsOpen}
        whiteboardOpen={whiteboardOpen}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
        onToggleWhiteboard={() => setWhiteboardOpen((v) => !v)}
        onToggleParticipants={() => setParticipantsOpen((v) => !v)}
        onToggleRecording={toggleRecording}
        onLeave={() => setShowLeaveModal(true)}
        onEndClass={() => setShowEndModal(true)}
      />
      {showStopConfirm && (
        <StopRecordingModal onCancel={cancelStop} onConfirm={confirmStop} />
      )}

      {showLeaveModal && (
        <LeaveClassModal
          onCancel={() => setShowLeaveModal(false)}
          onConfirm={handleConfirmLeave}
        />
      )}

      {showEndModal && (
        <EndClassModal
          onCancel={() => setShowEndModal(false)}
          onConfirm={handleConfirmEnd}
        />
      )}

    </div>
  );
}