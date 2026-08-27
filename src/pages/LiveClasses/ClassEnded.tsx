import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import ClassSummary from '@/Components/LiveClass/ClassSummary';

interface ClassEndedState {
  classId?: string;
  classTitle: string;
  durationSeconds: number;
  participantCount: number;
  hasRecording: boolean;
  teacherName?: string;
  attendancePercent?: number;
  pollParticipationPercent?: number;
  questionsAsked?: number;
  engagementLevel?: 'Low' | 'Moderate' | 'High';
}
export default function ClassEnded() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ClassEndedState | undefined;

  const data: ClassEndedState = state ?? {
    classId: undefined,
    classTitle: 'Live Class',
    durationSeconds: 0,
    participantCount: 0,
    hasRecording: false,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Decorative background — same language as your Live Classes hero */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 animate-float-slow rounded-full bg-[#42CE70]/10 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 animate-float rounded-full bg-[#238B45]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-12">
        {/* Success badge */}
        <div className="flex animate-fade-in-up flex-col items-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#238B45]/15">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#238B45]/20" />
            <CheckCircle2 className="relative h-8 w-8 text-[#42CE70]" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Class Ended</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-[#42CE70]" />
            Great session — here's how it went
          </p>
        </div>

        {/* Summary card */}
        <div className="mt-8 w-full animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <ClassSummary
            classTitle={data.classTitle}
            teacherName={data.teacherName ?? 'Teacher'}
            date={new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            durationSeconds={data.durationSeconds}
            participantCount={data.participantCount}
            attendancePercent={data.attendancePercent ?? 0}
            pollParticipationPercent={data.pollParticipationPercent ?? 0}
            questionsAsked={data.questionsAsked ?? 0}
            engagementLevel={data.engagementLevel ?? 'Moderate'}
            hasRecording={data.hasRecording}
            onViewAttendance={() =>
              data.classId ? navigate(`/live-classes/${data.classId}/review?tab=attendance`) : navigate('/live-classes')
            }
            onViewPollResults={() =>
              data.classId ? navigate(`/live-classes/${data.classId}/review?tab=polls`) : navigate('/live-classes')
            }
            onViewQuestions={() =>
              data.classId ? navigate(`/live-classes/${data.classId}/review?tab=questions`) : navigate('/live-classes')
            }
            onViewRecording={() => navigate('/recordings')}
            onViewAnalytics={() =>
              data.classId ? navigate(`/live-classes/${data.classId}/analytics`) : navigate('/live-classes')
            }
          />
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => navigate('/live-classes')}
          className="mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#238B45] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#036724] active:scale-[0.98] active:bg-[#42CE70] sm:w-auto sm:px-10"
        >
          Back to Classes
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
