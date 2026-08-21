import { Play, Clock, Calendar } from 'lucide-react';
import type { Recording } from '@/types/liveClass';
import { formatDate, formatDuration } from '@/utils/liveClassUtils';

interface RecordingCardProps {
  recording: Recording;
  onPlay: (recording: Recording) => void;
}

const THUMBNAIL_GRADIENTS = [
  'from-emerald-500 to-emerald-800',
  'from-sky-500 to-sky-800',
  'from-violet-500 to-violet-800',
  'from-amber-500 to-amber-800',
  'from-rose-500 to-rose-800',
];

function getGradient(id: string) {
  const index = id.charCodeAt(id.length - 1) % THUMBNAIL_GRADIENTS.length;
  return THUMBNAIL_GRADIENTS[index];
}

export default function RecordingCard({ recording, onPlay }: RecordingCardProps) {
  const { classTitle, courseName, teacherName, recordedDate, durationMinutes } = recording;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div
        className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${getGradient(
          recording.id
        )}`}
      >
        <button
          onClick={() => onPlay(recording)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition-transform duration-200 group-hover:scale-110 active:scale-95"
        >
          <Play className="h-6 w-6 translate-x-0.5 fill-current" />
        </button>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {formatDuration(durationMinutes)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-slate-900">{classTitle}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500">{courseName}</p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(recordedDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(durationMinutes)}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400">By {teacherName}</p>
      </div>
    </div>
  );
}