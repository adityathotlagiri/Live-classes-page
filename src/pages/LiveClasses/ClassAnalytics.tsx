import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, ClipboardCheck, TrendingUp, BarChart3, MessageCircleQuestion, Activity } from 'lucide-react';
import StatCard from '@/Components/LiveClass/StatCard';
import AttendanceChart from '@/Components/LiveClass/analytics/charts/AttendanceChart';
import ParticipationChart from '@/Components/LiveClass/analytics/charts/ParticipationChart';
import PollResponseChart from '@/Components/LiveClass/analytics/charts/PollResponseChart';
import EngagementTrendChart from '@/Components/LiveClass/analytics/charts/EngagementTrendChart';
import {
  mockClassAnalytics,
  mockAttendanceTrend,
  mockEngagementTrend,
  mockPolls,
} from '@/data/mockEngagementData';
import { mockClasses } from '@/data/mockClasses';

export default function ClassAnalytics() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const liveClass = mockClasses.find((c) => c.id === classId);

  const analytics = mockClassAnalytics;

  const participationData = [
    { label: 'Raised Hand', value: 3 },
    { label: 'Questions', value: analytics.questionsAsked },
    { label: 'Reactions', value: 5 },
    { label: 'Poll Votes', value: 2 },
  ];

  // Flatten every option across every poll into one chart-friendly array
  const pollResponseData = mockPolls.flatMap((poll) =>
    poll.options.map((opt) => ({ name: opt.text, value: opt.voteCount }))
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#238B45]/10">
            <Activity className="h-5 w-5 text-[#42CE70]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">Class Analytics</h1>
            <p className="text-sm text-slate-500">{liveClass?.title ?? 'Live Class'}</p>
          </div>
        </div>

        {/* Top stat row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            label="Participants"
            value={analytics.totalParticipants}
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            label="Attendance"
            value={`${analytics.attendanceRate}%`}
            icon={<ClipboardCheck className="h-4 w-4" />}
          />
          <StatCard
            label="Participation"
            value={`${analytics.participationRate}%`}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            label="Poll Response"
            value={`${analytics.pollResponseRate}%`}
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <StatCard
            label="Questions"
            value={analytics.questionsAsked}
            icon={<MessageCircleQuestion className="h-4 w-4" />}
          />
          <StatCard
            label="Avg Engagement"
            value={`${analytics.averageEngagement}%`}
            icon={<Activity className="h-4 w-4" />}
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Attendance Over Time">
            <AttendanceChart data={mockAttendanceTrend} />
          </ChartCard>

          <ChartCard title="Student Participation">
            <ParticipationChart data={participationData} />
          </ChartCard>

          <ChartCard title="Poll Responses">
            <PollResponseChart data={pollResponseData} />
          </ChartCard>

          <ChartCard title="Engagement Trend">
            <EngagementTrendChart data={mockEngagementTrend} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <h2 className="mb-3 text-sm font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}