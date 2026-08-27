import {
  Users,
  ClipboardCheck,
  BarChart3,
  MessageCircleQuestion,
  Video,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { formatTimer } from '@/utils/liveClassUtils';

interface ClassSummaryProps {
  classTitle: string;
  teacherName: string;
  date: string;
  durationSeconds: number;
  participantCount: number;
  attendancePercent: number;
  pollParticipationPercent: number;
  questionsAsked: number;
  engagementLevel: 'Low' | 'Moderate' | 'High';
  hasRecording: boolean;
  onViewAnalytics: () => void;
  onViewAttendance: () => void;
  onViewPollResults: () => void;
  onViewQuestions: () => void;
  onViewRecording: () => void;
}

const ENGAGEMENT_COLOR: Record<ClassSummaryProps['engagementLevel'], string> = {
  Low: '#DC2626',
  Moderate: '#D97706',
  High: '#238B45',
};

export default function ClassSummary({
  classTitle,
  teacherName,
  date,
  durationSeconds,
  participantCount,
  attendancePercent,
  pollParticipationPercent,
  questionsAsked,
  engagementLevel,
  hasRecording,
  onViewAnalytics,
  onViewAttendance,
  onViewPollResults,
  onViewQuestions,
  onViewRecording,
}: ClassSummaryProps) {
  const stats = [
    { label: 'Participants', value: participantCount, icon: <Users className="h-4 w-4" /> },
    { label: 'Attendance', value: `${attendancePercent}%`, icon: <ClipboardCheck className="h-4 w-4" /> },
    { label: 'Poll Participation', value: `${pollParticipationPercent}%`, icon: <BarChart3 className="h-4 w-4" /> },
    { label: 'Questions Asked', value: questionsAsked, icon: <MessageCircleQuestion className="h-4 w-4" /> },
  ];

  const actions = [
    { label: 'Attendance', icon: <ClipboardCheck className="h-4 w-4" />, onClick: onViewAttendance },
    { label: 'Poll Results', icon: <BarChart3 className="h-4 w-4" />, onClick: onViewPollResults },
    { label: 'Questions', icon: <MessageCircleQuestion className="h-4 w-4" />, onClick: onViewQuestions },
    { label: 'Analytics', icon: <Activity className="h-4 w-4" />, onClick: onViewAnalytics },
    ...(hasRecording
      ? [{ label: 'Recording', icon: <Video className="h-4 w-4" />, onClick: onViewRecording }]
      : []),
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-white">{classTitle}</h2>
          <p className="text-xs text-slate-500">
            {teacherName} · {date} · {formatTimer(durationSeconds)}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
          style={{
            color: ENGAGEMENT_COLOR[engagementLevel],
            backgroundColor: `${ENGAGEMENT_COLOR[engagementLevel]}20`,
          }}
        >
          {engagementLevel} engagement
        </span>
      </div>

      {/* Horizontal stat bar */}
      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 bg-slate-900 px-3 py-4 text-center">
            <span className="text-[#42CE70]">{stat.icon}</span>
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] leading-tight text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

    {/* Horizontal action row */}
            <div className={`mt-4 grid grid-cols-2 gap-2 ${actions.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-800/40 px-2.5 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:border-[#238B45]/40 hover:bg-slate-800"
          >
            {action.icon}
            {action.label}
            <ArrowRight className="h-3 w-3 shrink-0 text-slate-500" />
          </button>
        ))}
      </div>
    </div>
  );
}