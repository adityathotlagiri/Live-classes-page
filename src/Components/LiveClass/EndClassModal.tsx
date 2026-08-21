import { useEscapeKey } from '@/hooks/useEscapeKey';
import { AlertTriangle } from 'lucide-react';

interface EndClassModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function EndClassModal({ onCancel, onConfirm }: EndClassModalProps) {
  useEscapeKey(onCancel, true);  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-sm rounded-2xl border border-red-900/50 bg-slate-900 p-6 shadow-2xl animate-fade-in-up">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-white">End Class?</h2>
        <p className="mt-1.5 text-sm text-slate-400">
          Ending the class will disconnect all participants.
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
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 active:scale-[0.98]"
          >
            End Class
          </button>
        </div>
      </div>
    </div>
  );
}