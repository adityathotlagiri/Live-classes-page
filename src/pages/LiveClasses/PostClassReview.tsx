import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, BarChart3, MessageCircleQuestion } from 'lucide-react';
import AttendanceRow from '@/Components/LiveClass/attendance/AttendanceRow';
import PollResults from '@/Components/LiveClass/polls/PollResults';
import { mockAttendance, mockPolls, mockEngagementEvents } from '@/data/mockEngagementData';
import { mockClasses } from '@/data/mockClasses';

type ReviewTab = 'attendance' | 'polls' | 'questions';

export default function PostClassReview() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const liveClass = mockClasses.find((c) => c.id === classId);

  const activeTab = (searchParams.get('tab') as ReviewTab) ?? 'attendance';
  const setTab = (tab: ReviewTab) => setSearchParams({ tab });

  const questions = mockEngagementEvents.filter((e) => e.type === 'question');

  const TABS: { key: ReviewTab; label: string; icon: React.ReactNode }[] = [
    { key: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="h-4 w-4" /> },
    { key: 'polls', label: 'Poll Results', icon: <BarChart3 className="h-4 w-4" /> },
    { key: 'questions', label: 'Questions', icon: <MessageCircleQuestion className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-xl font-bold text-white sm:text-2xl">Class Review</h1>
        <p className="mb-6 text-sm text-slate-500">{liveClass?.title ?? 'Live Class'}</p>

        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#238B45] text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === 'attendance' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
              {mockAttendance.map((record) => (
                <AttendanceRow key={record.studentId} record={record} />
              ))}
            </div>
          )}

          {activeTab === 'polls' && (
            <div className="space-y-3">
              {mockPolls.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">No polls were run in this class.</p>
              ) : (
                mockPolls.map((poll) => (
                  <PollResults
                    key={poll.id}
                    poll={poll}
                    totalVotes={poll.options.reduce((s, o) => s + o.voteCount, 0)}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-2">
              {questions.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">No questions were asked.</p>
              ) : (
                questions.map((q) => (
                  <div key={q.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                    <p className="text-sm font-medium text-white">{q.studentName}</p>
                    <p className="mt-1 text-sm text-slate-300">{q.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}