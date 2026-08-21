import { MonitorX, ScreenShareOff } from 'lucide-react';

interface ScreenShareProps {
  sharerName: string;
  isOwnShare: boolean;
  onStopSharing: () => void;
}

export default function ScreenShare({ sharerName, isOwnShare, onStopSharing }: ScreenShareProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 p-4">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 aspect-video">
        {/* Placeholder for the actual shared screen stream */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#238B45]/15">
            <MonitorX className="h-7 w-7 text-[#42CE70]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {isOwnShare ? 'You are sharing your screen' : `${sharerName} is sharing their screen`}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Screen content will render here once connected to a real stream
            </p>
          </div>
        </div>
      </div>

      {isOwnShare && (
        <button
          onClick={onStopSharing}
          className="mt-4 flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 active:scale-[0.98]"
        >
          <ScreenShareOff className="h-4 w-4" />
          Stop Sharing
        </button>
      )}
    </div>
  );
}