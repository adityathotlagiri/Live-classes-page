import { Circle } from 'lucide-react';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface StopRecordingModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function StopRecordingModal({ onCancel, onConfirm }: StopRecordingModalProps) {
  useEscapeKey(onCancel, true); 
   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl animate-fade-in-up">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
          <Circle className="h-5 w-5 fill-red-500 text-red-500" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-white">Stop Recording?</h2>
        <p className="mt-1.5 text-sm text-slate-400">
          Are you sure you want to stop recording this class?
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
            Stop Recording
          </button>
        </div>
      </div>
    </div>
  );
}