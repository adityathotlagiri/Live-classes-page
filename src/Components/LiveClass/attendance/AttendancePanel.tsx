import { X, Users } from 'lucide-react';
import AttendanceRow from './AttendanceRow';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import type { AttendanceRecord } from '@/types/engagement';

interface AttendancePanelProps {
  records: AttendanceRecord[];
  stats: {
    total: number;
    present: number;
    absent: number;
    late: number;
    leftEarly: number;
    attendancePercent: number;
  };
  onClose: () => void;
}

export default function AttendancePanel({ records, stats, onClose }: AttendancePanelProps) {
  useEscapeKey(onClose, true);

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Attendance"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">Attendance</h2>
          <button
            onClick={onClose}
            aria-label="Close attendance panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-800 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">Attendance rate</span>
            <span className="text-lg font-bold text-[#42CE70]">{stats.attendancePercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-[#238B45] transition-all duration-500"
              style={{ width: `${stats.attendancePercent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            <MiniStat label="Present" value={stats.present} color="text-[#42CE70]" />
            <MiniStat label="Late" value={stats.late} color="text-amber-400" />
            <MiniStat label="Left Early" value={stats.leftEarly} color="text-slate-400" />
            <MiniStat label="Absent" value={stats.absent} color="text-red-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Users className="h-6 w-6 text-slate-600" />
              <p className="text-xs text-slate-500">No attendance data available</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {records.map((record) => (
                <AttendanceRow key={record.studentId} record={record} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <p className={`text-base font-bold ${color}`}>{value}</p>
      <p className="text-[9px] uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}