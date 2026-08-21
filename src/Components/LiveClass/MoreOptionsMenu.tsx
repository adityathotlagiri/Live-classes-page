import { useState } from 'react';
import { MoreVertical, Circle, Square } from 'lucide-react';

interface MoreOptionsMenuProps {
  isTeacher: boolean;
  isRecording: boolean;
  onToggleRecording: () => void;
}

export default function MoreOptionsMenu({
  isTeacher,
  isRecording,
  onToggleRecording,
}: MoreOptionsMenuProps) {
  const [open, setOpen] = useState(false);

  if (!isTeacher) return null;

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute -top-3 left-1/2 z-20 w-56 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-700 bg-slate-800 p-1.5 shadow-xl animate-fade-in-up">
            <button
              onClick={() => {
                onToggleRecording();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isRecording
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-white hover:bg-slate-700'
              }`}
            >
              {isRecording ? (
                <Square className="h-4 w-4 fill-red-400" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        title="More options"
        aria-label="More options"
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-90 sm:h-12 sm:w-12 ${
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
          <MoreVertical className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}