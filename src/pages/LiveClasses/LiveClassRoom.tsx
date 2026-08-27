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
import { useEngagement } from '@/hooks/useEngagement';
import EngagementPanel from '@/Components/LiveClass/engagement/EngagementPanel';
import { usePolls } from '@/hooks/usePolls';
import PollPanel from '@/Components/LiveClass/polls/PollPanel';
import { useAttendance } from '@/hooks/useAttendance';
import AttendancePanel from '@/Components/LiveClass/attendance/AttendancePanel';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import AnnouncementPanel from '@/Components/LiveClass/announcements/AnnouncementPanel';
import { useStudentActivity } from '@/hooks/useStudentActivity';
import StudentActivityPanel from '@/Components/LiveClass/activity/StudentActivityPanel';
import PermissionDenied from '@/Components/LiveClass/PermissionDenied';

export default function LiveClassRoom() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const liveClass = mockClasses.find((c) => c.id === classId);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const reactionIdRef = useRef(0);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const location = useLocation();
  const initialSettings = location.state as { initialMicOn?: boolean; initialCameraOn?: boolean } | undefined;
  const { messages, unreadCount, sendMessage } = useChat('t-1', 'You');
  type SidePanel = 'chat' | 'participants' | 'engagement' | 'polls' | 'attendance' | 'announcements' | 'activity' | null;
  const [openPanel, setOpenPanel] = useState<SidePanel>('participants');
  const announcementsOpen = openPanel === 'announcements';
  const activityOpen = openPanel === 'activity';
  const chatOpen = openPanel === 'chat';
  const participantsOpen = openPanel === 'participants';
  const engagementOpen = openPanel === 'engagement';
  const pollsOpen = openPanel === 'polls';
  const attendanceOpen = openPanel === 'attendance';

  const togglePanel = (panel: SidePanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };
  const {
    announcements,
    create: createAnnouncement,
    error: announcementError,
    clearError: clearAnnouncementError,
    edit: editAnnouncement,
    remove: removeAnnouncement,
    togglePin: toggleAnnouncementPin,
    toggleImportant: toggleAnnouncementImportant,
    markAsRead: markAnnouncementRead,
  } = useAnnouncements('John Smith');
  const { records: attendanceRecords, stats: attendanceStats } = useAttendance();
  const {
    events: engagementEvents,
    sendSignal,
    withdrawSignal,
    acknowledge,
    myRaisedHandEvent,
    raisedHands,
    unacknowledgedCount,
  } = useEngagement('t-1', 'You'); 
  const {
    isRecording,
    elapsedSeconds: recordingSeconds,
    showStopConfirm,
    requestToggle: toggleRecording,
    confirmStop,
    cancelStop,
  } = useRecording();
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

  const {
    activity: filteredActivity,
    filter: activityFilter,
    setFilter: setActivityFilter,
    counts: activityCounts,
  } = useStudentActivity();
  const {
    polls,
    activePoll,
    isLoading,
    mySubmissionFor,
    totalVotesFor,
    createPoll,
    startPoll,
    closePoll,
    toggleShowResults,
    submitAnswer,
  } = usePolls('t-1');
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
  const pollTotal = polls.length;
  const pollParticipation =
    pollTotal > 0
      ? Math.round((polls.filter((p) => mySubmissionFor(p.id)).length / pollTotal) * 100)
      : 0;

  navigate('/class-ended', {
    state: {
      classId: liveClass?.id,
      classTitle: liveClass?.title ?? 'Live Class',
      durationSeconds: sessionSecondsRef.current,
      participantCount: participants.length,
      hasRecording: isRecording || recordingSeconds > 0,
      teacherName: liveClass?.teacher.name ?? 'Teacher',
      attendancePercent: attendanceStats.attendancePercent,
      pollParticipationPercent: pollParticipation,
      questionsAsked: engagementEvents.filter((e) => e.type === 'question').length,
      engagementLevel:
        attendanceStats.attendancePercent > 80
          ? 'High'
          : attendanceStats.attendancePercent > 50
          ? 'Moderate'
          : 'Low',
    },
  });
};
  const isTeacher = true; 
  const handleReact = (emoji: string) => {
    const id = reactionIdRef.current++;
    const left = 40 + Math.random() * 20; 
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
            onClose={()=>setOpenPanel(null)}
          />
        )}
        {participantsOpen  && (
          <ParticipantsPanel
            participants={participants}
            onClose={() => setOpenPanel(null)}
          />
        )}
        
        {engagementOpen && (
            <EngagementPanel
              isTeacher={isTeacher}
              events={engagementEvents}
              myRaisedHandEvent={myRaisedHandEvent}
              raisedHands={raisedHands}
              onSendSignal={sendSignal}
              onWithdrawSignal={withdrawSignal}
              onAcknowledge={acknowledge}
              onClose={() => setOpenPanel(null)}
            />
        )}
        {pollsOpen  && (
          <PollPanel
            isLoading={isLoading}
            isTeacher={isTeacher}
            currentUserId="t-1"
            polls={polls}
            activePoll={activePoll}
            mySubmissionFor={mySubmissionFor}
            totalVotesFor={totalVotesFor}
            onCreate={createPoll}
            onStart={startPoll}
            onClose={closePoll}
            onToggleShowResults={toggleShowResults}
            onSubmitAnswer={submitAnswer}
            onClosePanel={() => setOpenPanel(null)}
          />
        )}
        {attendanceOpen && (
          isTeacher ? (
            <AttendancePanel records={attendanceRecords} stats={attendanceStats} onClose={() => setOpenPanel(null)} />
          ) : (
            <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
              <div className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none">
                <PermissionDenied message="Attendance is only visible to the teacher." />
              </div>
            </div>
          )
        )}
        {activityOpen && (
          isTeacher ? (
          <StudentActivityPanel
            activity={filteredActivity}
            filter={activityFilter}
            onFilterChange={setActivityFilter}
            counts={activityCounts}
            onClose={() => setOpenPanel(null)}
          />
        ):(
          <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
              <div className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none">
                <PermissionDenied message="Attendance is only visible to the teacher." />
              </div>
          </div>
        ))}
        {announcementsOpen && (
          <AnnouncementPanel
            isTeacher={isTeacher}
            announcements={announcements}
            error={announcementError}
            onClearError={clearAnnouncementError}
            onCreate={createAnnouncement}
            onEdit={editAnnouncement}
            onDelete={removeAnnouncement}
            onTogglePin={toggleAnnouncementPin}
            onToggleImportant={toggleAnnouncementImportant}
            onMarkRead={markAnnouncementRead}
            onClose={() => setOpenPanel(null)}
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
        onToggleChat={() => togglePanel('chat')}
        onToggleParticipants={() => togglePanel('participants')}
        onToggleEngagement={() => togglePanel('engagement')}
        onTogglePolls={() => togglePanel('polls')}
        onToggleAttendance={() => togglePanel('attendance')}
        onToggleAnnouncements={()=>togglePanel('announcements')}
        onToggleActivity={()=>togglePanel('activity')}
        participantsOpen={participantsOpen}
        whiteboardOpen={whiteboardOpen}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
        onToggleWhiteboard={() => setWhiteboardOpen((v) => !v)}
        onToggleRecording={toggleRecording}
        onLeave={() => setShowLeaveModal(true)}
        onEndClass={() => setShowEndModal(true)}
        engagementOpen={engagementOpen}
        unacknowledgedCount={unacknowledgedCount}
        pollsOpen={pollsOpen}
        attendanceOpen={attendanceOpen}
        announcementsOpen={announcementsOpen}
        activityOpen={activityOpen}
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