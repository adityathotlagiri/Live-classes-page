import { Mic, MicOff, Video, VideoOff, MessageSquare, PhoneOff } from 'lucide-react';
import MoreControlsMenu from './MoreControlsMenu';

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  badge?: number;
  onClick: () => void;
}

function ControlButton({ icon, label, active, danger, badge, onClick }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-90 sm:h-12 sm:w-12 ${
        danger
          ? 'bg-red-600 text-white hover:bg-red-700'
          : active
          ? 'bg-white text-slate-900 hover:bg-slate-200'
          : 'bg-slate-700/70 text-white hover:bg-slate-600'
      }`}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#238B45] text-[10px] font-bold text-white">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

interface ClassroomControlsProps {
  isTeacher: boolean;
  micOn: boolean;
  cameraOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  chatOpen: boolean;
  participantsOpen: boolean;
  whiteboardOpen: boolean;
  unreadChatCount: number;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onToggleWhiteboard: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  onToggleRecording: () => void;
  onReact: (emoji: string) => void;
  onLeave: () => void;
  onEndClass: () => void;
}

export default function ClassroomControls({
  isTeacher,
  micOn,
  cameraOn,
  isScreenSharing,
  isRecording,
  chatOpen,
  participantsOpen,
  whiteboardOpen,
  unreadChatCount,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onToggleWhiteboard,
  onToggleChat,
  onToggleParticipants,
  onToggleRecording,
  onReact,
  onLeave,
  onEndClass,
}: ClassroomControlsProps) {
  return (
    <footer className="flex h-20 shrink-0 items-center justify-center gap-2 border-t border-slate-800 bg-slate-900 px-3 sm:gap-3 sm:px-6">
      <ControlButton
        icon={micOn ? <Mic className="h-4 w-4 sm:h-5 sm:w-5" /> : <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />}
        label={micOn ? 'Mute' : 'Unmute'}
        active={micOn}
        danger={!micOn}
        onClick={onToggleMic}
      />
      <ControlButton
        icon={cameraOn ? <Video className="h-4 w-4 sm:h-5 sm:w-5" /> : <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" />}
        label={cameraOn ? 'Stop Camera' : 'Start Camera'}
        active={cameraOn}
        danger={!cameraOn}
        onClick={onToggleCamera}
      />
      <ControlButton
        icon={<MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />}
        label="Chat"
        active={chatOpen}
        badge={unreadChatCount}
        onClick={onToggleChat}
      />

      <MoreControlsMenu
        isTeacher={isTeacher}
        isScreenSharing={isScreenSharing}
        whiteboardOpen={whiteboardOpen}
        participantsOpen={participantsOpen}
        isRecording={isRecording}
        onToggleScreenShare={onToggleScreenShare}
        onToggleWhiteboard={onToggleWhiteboard}
        onToggleParticipants={onToggleParticipants}
        onToggleRecording={onToggleRecording}
        onReact={onReact}
      />

      <div className="mx-1 h-8 w-px bg-slate-700 sm:mx-2" />

      <ControlButton
        icon={<PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />}
        label="Leave"
        danger
        onClick={onLeave}
      />
      {isTeacher && (
        <button
          onClick={onEndClass}
          className="ml-1 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 sm:px-4 sm:py-2.5 sm:text-sm"
        >
          End Class
        </button>
      )}
    </footer>
  );
}