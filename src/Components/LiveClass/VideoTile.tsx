import { Mic, MicOff, VideoOff, Pin } from 'lucide-react';
import type { Participant } from '@/types/liveClass';

interface VideoTileProps {
  participant: Participant;
  isPinned?: boolean;
  onPin?: () => void;
  fill?: boolean;
}

const AVATAR_COLORS = [
  'from-emerald-500 to-emerald-700',
  'from-sky-500 to-sky-700',
  'from-violet-500 to-violet-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
];

function getColorForName(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export default function VideoTile({ participant, isPinned, onPin, fill }: VideoTileProps) {
  const { name, role, micOn, cameraOn, isSpeaking } = participant;
  const initials = name.split(' ').map((n) => n[0]).join('');

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-slate-800 transition-all duration-200 ${
        fill ? 'h-full w-full' : 'aspect-video'
      } ${isSpeaking ? 'ring-2 ring-[#42CE70]' : 'ring-1 ring-slate-700/50'}`}
    >
      {cameraOn ? (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getColorForName(
            name
          )}`}
        >
          <span className="text-2xl font-bold text-white/90 sm:text-4xl">{initials}</span>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-300 sm:h-14 sm:w-14 sm:text-lg">
            {initials}
          </div>
          <span className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
            <VideoOff className="h-3 w-3" /> Camera off
          </span>
        </div>
      )}

      {role === 'teacher' && (
        <span className="absolute left-2 top-2 rounded-md bg-[#238B45] px-2 py-0.5 text-[10px] font-semibold text-white">
          Teacher
        </span>
      )}

      {onPin && (
        <button
          onClick={onPin}
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 ${
            isPinned ? 'opacity-100 !bg-[#238B45]' : ''
          }`}
        >
          <Pin className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 sm:px-2.5 sm:py-2">
        <span className="truncate text-[11px] font-medium text-white sm:text-sm">{name}</span>
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
            micOn ? 'bg-white/10' : 'bg-red-500/80'
          }`}
        >
          {micOn ? (
            <Mic className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
          ) : (
            <MicOff className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
          )}
        </span>
      </div>
    </div>
  );
}