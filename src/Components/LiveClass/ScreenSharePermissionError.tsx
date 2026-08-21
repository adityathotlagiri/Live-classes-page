import { MonitorX } from 'lucide-react';

interface ScreenSharePermissionErrorProps {
  onDismiss: () => void;
}

export default function ScreenSharePermissionError({
  onDismiss,
}: ScreenSharePermissionErrorProps) {
  return (
    <div className="absolute inset-x-0 top-4 z-30 flex justify-center px-4">
      <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-800 bg-red-950/90 p-4 shadow-xl backdrop-blur-sm animate-fade-in-up">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15">
          <MonitorX className="h-4.5 w-4.5 text-red-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-100">
            Screen sharing permission was denied.
          </p>
          <p className="mt-0.5 text-xs text-red-300">
            Please allow screen sharing in your browser settings and try again.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 text-xs font-medium text-red-300 hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}