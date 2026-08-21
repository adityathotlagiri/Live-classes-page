import { Calendar, Clock, Users, Video } from 'lucide-react';
import type { LiveClass } from '@/types/liveClass';
import {
  formatDate,
  formatTime,
  formatDuration,
  getActionLabel,
} from '@/utils/liveClassUtils';

interface ClassCardProps {
  liveClass: LiveClass;
  onAction: (liveClass: LiveClass) => void;
}

const STATUS_BADGE: Record<string, string> = {
  live: 'bg-white/20 text-white border border-white/30 backdrop-blur-sm',
  upcoming: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  completed: 'bg-slate-100 text-slate-600 border border-slate-200',
  cancelled: 'bg-amber-50 text-amber-700 border border-amber-200',
};

export default function ClassCard({ liveClass, onAction }: ClassCardProps) {
  const { title, courseName, teacher, scheduledDate, startTime, durationMinutes, status, participantCount } =
    liveClass;

  const isLive = status === 'live';
  const isCancelled = status === 'cancelled';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isLive
          ? 'animate-pulse-glow border-transparent bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 text-white shadow-red-200'
          : 'border-slate-200 bg-white hover:border-emerald-200'
      }`}
    >
      {isLive && (
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[status]}`}
          >
            {isLive && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

          <h3
            className={`mt-2.5 truncate text-base font-semibold ${
              isLive ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title}
          </h3>
          <p className={`mt-0.5 text-sm ${isLive ? 'text-white/80' : 'text-slate-500'}`}>
            {courseName}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            isLive ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {teacher.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
      </div>

      <div
        className={`mt-4 space-y-2 text-sm ${isLive ? 'text-white/90' : 'text-slate-600'}`}
      >
        <div className="flex items-center gap-2">
          <Calendar className={`h-4 w-4 ${isLive ? 'text-white/70' : 'text-slate-400'}`} />
          <span>{formatDate(scheduledDate)}</span>
          <span className={isLive ? 'text-white/40' : 'text-slate-300'}>•</span>
          <Clock className={`h-4 w-4 ${isLive ? 'text-white/70' : 'text-slate-400'}`} />
          <span>{formatTime(startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Video className={`h-4 w-4 ${isLive ? 'text-white/70' : 'text-slate-400'}`} />
          <span>{formatDuration(durationMinutes)}</span>
          <span className={isLive ? 'text-white/40' : 'text-slate-300'}>•</span>
          <Users className={`h-4 w-4 ${isLive ? 'text-white/70' : 'text-slate-400'}`} />
          <span>{participantCount} participants</span>
        </div>
        <p className={isLive ? 'text-white/80' : 'text-slate-500'}>Teacher: {teacher.name}</p>
      </div>

      <button
        onClick={() => onAction(liveClass)}
        disabled={isCancelled}
        className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
          isLive
            ? 'bg-white text-red-600 hover:bg-red-50'
            : isCancelled
            ? 'cursor-not-allowed bg-slate-100 text-slate-400'
            : 'bg-[#238B45] text-white hover:bg-[#036724] active:bg-[#42CE70] focus:outline-none focus:ring-2 focus:ring-[#238B45]/40 focus:ring-offset-1'
        }`}
      >
        {getActionLabel(status)}
      </button>
    </div>
  );
}