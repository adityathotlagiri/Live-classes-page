import { Hand, Check, X } from 'lucide-react';
import type { EngagementEvent } from '@/types/engagement';

interface RaisedHandsListProps {
  raisedHands: EngagementEvent[];
  onAcknowledge: (eventId: string) => void;
  onDismiss: (eventId: string) => void;
}

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

export default function RaisedHandsList({
  raisedHands,
  onAcknowledge,
  onDismiss,
}: RaisedHandsListProps) {
  if (raisedHands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <Hand className="h-6 w-6 text-slate-600" />
        <p className="text-xs text-slate-500">No one has raised their hand yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {raisedHands.map((event) => (
        <div
          key={event.id}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
            event.acknowledged
              ? 'border-slate-800 bg-slate-800/30'
              : 'border-[#238B45]/40 bg-[#238B45]/10'
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
            {event.studentName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{event.studentName}</p>
            <p className="text-xs text-slate-500">{timeAgo(event.timestamp)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {!event.acknowledged && (
              <button
                onClick={() => onAcknowledge(event.id)}
                aria-label={`Acknowledge ${event.studentName}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#238B45] text-white transition-colors hover:bg-[#036724]"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={() => onDismiss(event.id)}
              aria-label={`Dismiss ${event.studentName}'s raised hand`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-colors hover:bg-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}