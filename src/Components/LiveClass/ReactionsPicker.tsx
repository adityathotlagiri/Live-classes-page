import { useState } from 'react';
import { SmilePlus } from 'lucide-react';

const REACTIONS = ['👍', '❤️', '😂', '😮', '👏', '🎉'];

interface ReactionsPickerProps {
  onReact: (emoji: string) => void;
}

export default function ReactionsPicker({ onReact }: ReactionsPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute -top-16 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full border border-slate-700 bg-slate-800 p-2 shadow-xl animate-fade-in-up">
            {REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReact(emoji);
                  setOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform duration-150 hover:scale-125 hover:bg-slate-700"
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        title="React"
        aria-label="React"
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-90 sm:h-12 sm:w-12 ${
          open ? 'bg-white text-slate-900' : 'bg-slate-700/70 text-white hover:bg-slate-600'
        }`}
        
      >
        <SmilePlus className="h-5 w-5" />
      </button>
    </div>
  );
}