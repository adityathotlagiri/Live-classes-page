import { useState } from 'react';
import { Hand, MessageCircleQuestion, PartyPopper, HelpCircle, Frown, X } from 'lucide-react';
import EngagementButton from './EngagementButton';
import RaisedHandsList from './RaisedHandsList';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import type { EngagementEvent } from '@/types/engagement';

interface EngagementPanelProps {
  isTeacher: boolean;
  events: EngagementEvent[];
  myRaisedHandEvent: EngagementEvent | undefined;
  raisedHands: EngagementEvent[];
  onSendSignal: (type: 'raised_hand' | 'question' | 'applause' | 'need_help' | 'confused', message?: string) => void;
  onWithdrawSignal: (eventId: string) => void;
  onAcknowledge: (eventId: string) => void;
  onClose: () => void;
}

export default function EngagementPanel({
  isTeacher,
  events,
  myRaisedHandEvent,
  raisedHands,
  onSendSignal,
  onWithdrawSignal,
  onAcknowledge,
  onClose,
}: EngagementPanelProps) {
  const [questionText, setQuestionText] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  useEscapeKey(onClose, true);

  const handleSubmitQuestion = () => {
    if (!questionText.trim()) return;
    onSendSignal('question', questionText.trim());
    setQuestionText('');
    setShowQuestionInput(false);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Engagement panel"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">
            {isTeacher ? 'Engagement' : 'Participate'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close engagement panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!isTeacher && (
            <>
              <div className="grid grid-cols-3 gap-2">
                <EngagementButton
                  icon={<Hand className="h-5 w-5" />}
                  label={myRaisedHandEvent ? 'Lower hand' : 'Raise hand'}
                  active={!!myRaisedHandEvent}
                  activeColor="#238B45"
                  onClick={() =>
                    myRaisedHandEvent
                      ? onWithdrawSignal(myRaisedHandEvent.id)
                      : onSendSignal('raised_hand')
                  }
                />
                <EngagementButton
                  icon={<MessageCircleQuestion className="h-5 w-5" />}
                  label="Ask"
                  onClick={() => setShowQuestionInput((v) => !v)}
                />
                <EngagementButton
                  icon={<PartyPopper className="h-5 w-5" />}
                  label="Applause"
                  activeColor="#238B45"
                  onClick={() => onSendSignal('applause')}
                />
                <EngagementButton
                  icon={<HelpCircle className="h-5 w-5" />}
                  label="Need help"
                  activeColor="#D97706"
                  onClick={() => onSendSignal('need_help')}
                />
                <EngagementButton
                  icon={<Frown className="h-5 w-5" />}
                  label="Confused"
                  activeColor="#DC2626"
                  onClick={() => onSendSignal('confused')}
                />
              </div>

              {showQuestionInput && (
                <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800 p-3">
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question..."
                    rows={2}
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
                  />
                  <button
                    onClick={handleSubmitQuestion}
                    disabled={!questionText.trim()}
                    className="mt-2 w-full rounded-lg bg-[#238B45] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#036724] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Submit Question
                  </button>
                </div>
              )}

              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Recent activity
                </p>
                {events.length === 0 ? (
                  <p className="text-xs text-slate-500">No activity yet</p>
                ) : (
                  <div className="space-y-2">
                    {[...events].reverse().slice(0, 5).map((e) => (
                      <p key={e.id} className="text-xs text-slate-400">
                        <span className="font-medium text-slate-300">{e.studentName}</span>{' '}
                        {signalLabel(e.type)}
                        {e.message ? `: "${e.message}"` : ''}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {isTeacher && (
            <>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Raised hands
              </p>
              <RaisedHandsList
                raisedHands={raisedHands}
                onAcknowledge={onAcknowledge}
                onDismiss={onWithdrawSignal}
              />

              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Other signals
                </p>
                {events.filter((e) => e.type !== 'raised_hand').length === 0 ? (
                  <p className="text-xs text-slate-500">No other activity yet</p>
                ) : (
                  <div className="space-y-2">
                    {events
                      .filter((e) => e.type !== 'raised_hand')
                      .reverse()
                      .map((e) => (
                        <p key={e.id} className="text-xs text-slate-400">
                          <span className="font-medium text-slate-300">{e.studentName}</span>{' '}
                          {signalLabel(e.type)}
                          {e.message ? `: "${e.message}"` : ''}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function signalLabel(type: EngagementEvent['type']): string {
  switch (type) {
    case 'raised_hand':
      return 'raised their hand';
    case 'question':
      return 'asked a question';
    case 'applause':
      return 'applauded';
    case 'need_help':
      return 'needs help';
    case 'confused':
      return 'is confused';
    default:
      return '';
  }
}