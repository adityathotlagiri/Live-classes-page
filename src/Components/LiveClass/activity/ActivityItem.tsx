import { Hand, MessageCircle, Smile, WifiOff, AlertCircle } from 'lucide-react';
import type { StudentActivity } from '@/types/engagement';

interface ActivityItemProps {
  student: StudentActivity;
}

const STATE_DOT: Record<StudentActivity['state'], string> = {
  active: 'bg-[#42CE70]',
  inactive: 'bg-slate-500',
  connection_issue: 'bg-amber-400',
};

export default function ActivityItem({ student }: ActivityItemProps) {
  const {
    studentName,
    state,
    hasRaisedHand,
    hasAnsweredPoll,
    questionsAsked,
    reactionsSent,
    needsAttention,
  } = student;

  const initials = studentName.split(' ').map((n) => n[0]).join('');

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
        needsAttention ? 'border-amber-500/30 bg-amber-500/5' : 'border-slate-800 bg-slate-800/30'
      }`}
    >
      <div className="relative shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
          {initials}
        </div>
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 ${STATE_DOT[state]}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{studentName}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          {hasRaisedHand && (
            <span className="flex items-center gap-0.5 text-[#42CE70]">
              <Hand className="h-3 w-3" /> Hand up
            </span>
          )}
          {questionsAsked > 0 && (
            <span className="flex items-center gap-0.5">
              <MessageCircle className="h-3 w-3" /> {questionsAsked}
            </span>
          )}
          {reactionsSent > 0 && (
            <span className="flex items-center gap-0.5">
              <Smile className="h-3 w-3" /> {reactionsSent}
            </span>
          )}
          {hasAnsweredPoll && <span className="text-slate-400">Answered poll</span>}
          {state === 'connection_issue' && (
            <span className="flex items-center gap-0.5 text-amber-400">
              <WifiOff className="h-3 w-3" /> Connection issue
            </span>
          )}
        </div>
      </div>

      {needsAttention && (
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" aria-label="Needs attention" />
      )}
    </div>
  );
}