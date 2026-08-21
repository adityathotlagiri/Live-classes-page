import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, Users, Video, ArrowRight } from 'lucide-react';
import { formatTimer } from '@/utils/liveClassUtils';

interface ClassEndedState {
  classTitle: string;
  durationSeconds: number;
  participantCount: number;
  hasRecording: boolean;
}

export default function ClassEnded() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ClassEndedState | undefined;

  // Fallback in case someone lands here directly without state
  const data: ClassEndedState = state ?? {
    classTitle: 'Live Class',
    durationSeconds: 0,
    participantCount: 0,
    hasRecording: false,
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md animate-fade-in-up rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#238B45]/15">
          <CheckCircle2 className="h-8 w-8 text-[#42CE70]" />
        </div>

        <h1 className="mt-5 text-xl font-bold text-white">Class Ended</h1>
        <p className="mt-1.5 text-sm text-slate-400">The live class has ended.</p>

        <div className="mt-6 rounded-2xl bg-slate-800/60 p-4 text-left">
          <p className="mb-3 text-sm font-semibold text-white">{data.classTitle}</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-slate-500" />
              Duration: {formatTimer(data.durationSeconds)}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Users className="h-4 w-4 text-slate-500" />
              Participants: {data.participantCount}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Video className="h-4 w-4 text-slate-500" />
              Recording: {data.hasRecording ? 'Available' : 'Not recorded'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          {data.hasRecording && (
            <button
              onClick={() => navigate('/recordings')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
            >
              View Recording
            </button>
          )}
          <button
            onClick={() => navigate('/live-classes')}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#238B45] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#036724] active:bg-[#42CE70]"
          >
            Back to Classes
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}