import { BarChart3 } from 'lucide-react';
import type { Poll } from '@/types/engagement';

interface PollResultsProps {
  poll: Poll;
  totalVotes: number;
}

export default function PollResults({ poll, totalVotes }: PollResultsProps) {
  const winningOptionId = poll.options.reduce(
    (best, opt) => (opt.voteCount > best.voteCount ? opt : best),
    poll.options[0]
  ).id;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Poll Closed · {totalVotes} votes
        </span>
      </div>

      <p className="mb-3 text-sm font-medium text-white">{poll.question}</p>

      <div className="space-y-2">
        {poll.options.map((opt) => {
          const percent = totalVotes > 0 ? Math.round((opt.voteCount / totalVotes) * 100) : 0;
          const isWinner = opt.id === winningOptionId && opt.voteCount > 0;

          return (
            <div
              key={opt.id}
              className={`relative overflow-hidden rounded-lg border bg-slate-900 ${
                isWinner ? 'border-[#238B45]' : 'border-slate-700'
              }`}
            >
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                  isWinner ? 'bg-[#238B45]/25' : 'bg-slate-700/40'
                }`}
                style={{ width: `${percent}%` }}
              />
              <div className="relative flex items-center justify-between px-3 py-2.5">
                <span className="text-sm text-white">{opt.text}</span>
                <span className="text-xs font-semibold text-slate-300">
                  {percent}% ({opt.voteCount})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}