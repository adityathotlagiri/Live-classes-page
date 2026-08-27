import { useState } from 'react';
import { X, ClipboardList, Plus } from 'lucide-react';
import PollCreator from './PollCreator';
import PollActiveView from './PollActiveView';
import PollResults from './PollResults';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import type { Poll, PollSubmission } from '@/types/engagement';
import SuccessToast from '../SuccessToast';

interface PollPanelProps {
  isTeacher: boolean;
  currentUserId: string;
  polls: Poll[];
  activePoll: Poll | undefined;
  isLoading: boolean;
  mySubmissionFor: (pollId: string) => PollSubmission | undefined;
  totalVotesFor: (poll: Poll) => number;
  onCreate: (question: string, options: string[]) => string;
  onStart: (pollId: string) => void;
  onClose: (pollId: string) => void;
  onToggleShowResults: (pollId: string) => void;
  onSubmitAnswer: (pollId: string, optionId: string) => void;
  onClosePanel: () => void;
}

export default function PollPanel({
  isTeacher,
  polls,
  activePoll,
  isLoading,
  mySubmissionFor,
  totalVotesFor,
  onCreate,
  onStart,
  onClose,
  onToggleShowResults,
  onSubmitAnswer,
  onClosePanel,
}: PollPanelProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEscapeKey(onClosePanel, true);

  const closedPolls = polls.filter((p) => p.status === 'closed').reverse();
  const draftPolls = polls.filter((p) => p.status === 'draft');

  const handleCreate = (question: string, options: string[]) => {
    onCreate(question, options);
    setIsCreating(false);
    setSuccessMsg('Poll created!');
  };

  const handleStart = (pollId: string) => {
    onStart(pollId);
    setSuccessMsg('Poll started!');
  };

  const handleSubmit = (optionId: string) => {
    if (!activePoll) return;
    onSubmitAnswer(activePoll.id, optionId);
    setSuccessMsg('Answer submitted!');
  };

  const handleClosePoll = (pollId: string) => {
    onClose(pollId);
    setSuccessMsg('Poll closed!');
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Live polls"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">Polls</h2>
          <button
            onClick={onClosePanel}
            aria-label="Close polls panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-28 animate-pulse rounded-xl bg-slate-800" />
              <div className="h-28 animate-pulse rounded-xl bg-slate-800" />
            </div>
          ) : (
            <>
              {isTeacher && !activePoll && !isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 py-3 text-sm font-medium text-slate-300 hover:border-[#238B45] hover:text-[#42CE70]"
                >
                  <Plus className="h-4 w-4" />
                  Create Poll
                </button>
              )}

              {isTeacher && isCreating && (
                <PollCreator onCreate={handleCreate} onCancel={() => setIsCreating(false)} />
              )}

              {isTeacher &&
                draftPolls.map((poll) => (
                  <div key={poll.id} className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                    <p className="mb-3 text-sm font-medium text-white">{poll.question}</p>
                    <p className="mb-3 text-xs text-slate-500">{poll.options.length} options · Draft</p>
                    <button
                      onClick={() => handleStart(poll.id)}
                      className="w-full rounded-lg bg-[#238B45] py-2 text-xs font-semibold text-white hover:bg-[#036724]"
                    >
                      Start Poll
                    </button>
                  </div>
                ))}

              {activePoll && (
                <div className="space-y-2">
                  <PollActiveView
                    poll={activePoll}
                    isTeacher={isTeacher}
                    hasSubmitted={!!mySubmissionFor(activePoll.id)}
                    mySelectedOptionId={mySubmissionFor(activePoll.id)?.optionId}
                    totalVotes={totalVotesFor(activePoll)}
                    onSubmit={handleSubmit}
                  />

                  {isTeacher && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onToggleShowResults(activePoll.id)}
                        className="flex-1 rounded-lg border border-slate-700 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                      >
                        {activePoll.showResultsToStudents ? 'Hide results' : 'Show results to students'}
                      </button>
                      <button
                        onClick={() => handleClosePoll(activePoll.id)}
                        className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Close Poll
                      </button>
                    </div>
                  )}
                </div>
              )}

              {closedPolls.length > 0 && (
                <div className="border-t border-slate-800 pt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Past polls
                  </p>
                  <div className="space-y-3">
                    {closedPolls.map((poll) => (
                      <PollResults key={poll.id} poll={poll} totalVotes={totalVotesFor(poll)} />
                    ))}
                  </div>
                </div>
              )}

              {!activePoll && draftPolls.length === 0 && closedPolls.length === 0 && !isCreating && (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                  <ClipboardList className="h-6 w-6 text-slate-600" />
                  <p className="text-xs text-slate-500">
                    {isTeacher ? 'No polls yet — create one to get started' : 'No active poll right now'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {successMsg && <SuccessToast message={successMsg} onDone={() => setSuccessMsg(null)} />}
    </div>
  );
}