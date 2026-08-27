import { Check } from 'lucide-react';
import type { Poll } from '@/types/engagement';

interface PollActiveViewProps {
  poll: Poll;
  isTeacher: boolean;
  hasSubmitted: boolean;
  mySelectedOptionId?: string;
  totalVotes: number;
  onSubmit: (optionId: string) => void;
}

export default function PollActiveView({
  poll,
  isTeacher,
  hasSubmitted,
  mySelectedOptionId,
  totalVotes,
  onSubmit,
}: PollActiveViewProps) {
  const showResults = isTeacher || poll.showResultsToStudents || hasSubmitted;

  return (
    <div className="rounded-xl border border-[#238B45]/40 bg-[#238B45]/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-[#238B45]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#42CE70]">
          Live Poll
        </span>
        <span className="text-xs text-slate-500">{totalVotes} votes</span>
      </div>

      <p className="mb-3 text-sm font-medium text-white">{poll.question}</p>

      <div className="space-y-2">
        {poll.options.map((opt) => {
          const percent = totalVotes > 0 ? Math.round((opt.voteCount / totalVotes) * 100) : 0;
          const isMine = opt.id === mySelectedOptionId;

          if (showResults) {
            return (
              <div key={opt.id} className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
                <div
                  className="absolute inset-y-0 left-0 bg-[#238B45]/20 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
                <div className="relative flex items-center justify-between px-3 py-2.5">
                  <span className="flex items-center gap-1.5 text-sm text-white">
                    {isMine && <Check className="h-3.5 w-3.5 text-[#42CE70]" />}
                    {opt.text}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{percent}%</span>
                </div>
              </div>
            );
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSubmit(opt.id)}
              disabled={hasSubmitted}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-left text-sm text-white transition-colors hover:border-[#238B45] hover:bg-slate-800"
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {!isTeacher && hasSubmitted && (
        <p className="mt-3 text-xs text-[#42CE70]">✓ Your answer has been submitted</p>
      )}
      {!isTeacher && !hasSubmitted && !showResults && (
        <p className="mt-3 text-xs text-slate-500">Select an option to submit your answer</p>
      )}
    </div>
  );
}