import { useState } from 'react';
import {
  MoreVertical,
  ScreenShare,
  PenSquare,
  Users,
  SmilePlus,
  Circle,
  Square,
} from 'lucide-react';

interface MoreControlsMenuProps {
  isTeacher: boolean;
  isScreenSharing: boolean;
  whiteboardOpen: boolean;
  participantsOpen: boolean;
  isRecording: boolean;
  onToggleScreenShare: () => void;
  onToggleWhiteboard: () => void;
  onToggleParticipants: () => void;
  onToggleRecording: () => void;
  onReact: (emoji: string) => void;
}

const REACTIONS = ['👍', '❤️', '😂', '😮', '👏', '🎉'];

export default function MoreControlsMenu({
  isTeacher,
  isScreenSharing,
  whiteboardOpen,
  participantsOpen,
  isRecording,
  onToggleScreenShare,
  onToggleWhiteboard,
  onToggleParticipants,
  onToggleRecording,
  onReact,
}: MoreControlsMenuProps) {
  const [open, setOpen] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const close = () => {
    setOpen(false);
    setShowReactions(false);
  };

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={close} />
          <div className="absolute -top-3 left-1/2 z-20 w-60 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-700 bg-slate-800 p-1.5 shadow-xl animate-fade-in-up">
            {isTeacher && (
              <MenuItem
                icon={<ScreenShare className="h-4 w-4" />}
                label={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                active={isScreenSharing}
                onClick={() => {
                  onToggleScreenShare();
                  close();
                }}
              />
            )}
            <MenuItem
              icon={<PenSquare className="h-4 w-4" />}
              label="Whiteboard"
              active={whiteboardOpen}
              onClick={() => {
                onToggleWhiteboard();
                close();
              }}
            />
            <MenuItem
              icon={<Users className="h-4 w-4" />}
              label="Participants"
              active={participantsOpen}
              onClick={() => {
                onToggleParticipants();
                close();
              }}
            />

            {!showReactions ? (
              <MenuItem
                icon={<SmilePlus className="h-4 w-4" />}
                label="React"
                onClick={() => setShowReactions(true)}
              />
            ) : (
              <div className="flex items-center justify-between gap-1 px-2 py-2">
                {REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onReact(emoji);
                      close();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-base transition-transform duration-150 hover:scale-125 hover:bg-slate-700"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {isTeacher && (
              <MenuItem
                icon={
                  isRecording ? (
                    <Square className="h-4 w-4 fill-red-400" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )
                }
                label={isRecording ? 'Stop Recording' : 'Start Recording'}
                danger={isRecording}
                onClick={() => {
                  onToggleRecording();
                  close();
                }}
              />
            )}
          </div>
        </>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        title="More options"
        aria-label="More options"
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-90 sm:h-12 sm:w-12 ${
          open || isRecording
            ? 'bg-white text-slate-900'
            : 'bg-slate-700/70 text-white hover:bg-slate-600'
        }`}
      >
        {isRecording ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
        ) : (
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </button>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  active,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        danger
          ? 'text-red-400 hover:bg-red-500/10'
          : active
          ? 'bg-slate-700 text-white'
          : 'text-white hover:bg-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}