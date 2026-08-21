import { Signal, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatTimer } from '@/utils/liveClassUtils';

interface ClassroomHeaderProps {
  className: string;
  isRecording?: boolean;
  recordingSeconds?: number;
}

export default function ClassroomHeader({
  className,
  isRecording,
  recordingSeconds = 0,
}: ClassroomHeaderProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <h1 className="truncate text-sm font-semibold text-white sm:text-base">{className}</h1>
        <span className="hidden items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-medium text-red-400 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isRecording && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            REC {formatTimer(recordingSeconds)}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {formatTimer(elapsed)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <Signal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Good connection</span>
        </div>
      </div>
    </header>
  );
}