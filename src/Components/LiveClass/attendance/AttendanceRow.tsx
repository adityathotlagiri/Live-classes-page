import { Clock, LogIn, LogOut } from 'lucide-react';
import type { AttendanceRecord, AttendanceStatus } from '@/types/engagement';

interface AttendanceRowProps {
  record: AttendanceRecord;
}

const STATUS_STYLES: Record<AttendanceStatus, string> = {
  present: 'bg-[#238B45]/15 text-[#42CE70] border-[#238B45]/30',
  absent: 'bg-red-500/15 text-red-400 border-red-500/30',
  late: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  left_early: 'bg-slate-600/20 text-slate-400 border-slate-600/40',
};

const STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  left_early: 'Left Early',
};

function formatClockTime(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function AttendanceRow({ record }: AttendanceRowProps) {
  const { studentName, status, joinTime, leaveTime, durationMinutes } = record;
  const initials = studentName.split(' ').map((n) => n[0]).join('');

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-800/50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{studentName}</p>
        <div className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <LogIn className="h-3 w-3" /> {formatClockTime(joinTime)}
          </span>
          <span className="flex items-center gap-1">
            <LogOut className="h-3 w-3" /> {formatClockTime(leaveTime)}
          </span>
          {durationMinutes !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {durationMinutes}m
            </span>
          )}
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}
      >
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
}