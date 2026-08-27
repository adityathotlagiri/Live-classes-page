import { X, Activity } from 'lucide-react';
import ActivityItem from './ActivityItem';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import type { StudentActivity } from '@/types/engagement';
import type { ActivityFilter } from '@/hooks/useStudentActivity';

interface StudentActivityPanelProps {
  activity: StudentActivity[];
  filter: ActivityFilter;
  onFilterChange: (filter: ActivityFilter) => void;
  counts: Record<ActivityFilter, number>;
  onClose: () => void;
}

const FILTERS: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'needs_attention', label: 'Needs Attention' },
  { key: 'raised_hand', label: 'Raised Hand' },
];

export default function StudentActivityPanel({
  activity,
  filter,
  onFilterChange,
  counts,
  onClose,
}: StudentActivityPanelProps) {
  useEscapeKey(onClose, true);

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Student activity"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">Student Activity</h2>
          <button
            onClick={onClose}
            aria-label="Close student activity panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-b border-slate-800 p-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'bg-[#238B45] text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f.label} <span className="opacity-70">{counts[f.key]}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Activity className="h-6 w-6 text-slate-600" />
              <p className="text-xs text-slate-500">No students match this filter</p>
            </div>
          ) : (
            activity.map((student) => (
              <ActivityItem key={student.studentId} student={student} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}