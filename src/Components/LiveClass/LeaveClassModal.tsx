import { LogOut } from 'lucide-react';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface LeaveClassModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LeaveClassModal({ onCancel, onConfirm }: LeaveClassModalProps) {
  useEscapeKey(onCancel, true);  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl animate-fade-in-up">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/50">
          <LogOut className="h-5 w-5 text-slate-300" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-white">Leave Class?</h2>
        <p className="mt-1.5 text-sm text-slate-400">
          Are you sure you want to leave this live class?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-white active:scale-[0.98]"
          >
            Leave Class
          </button>
        </div>
      </div>
    </div>
  );
}