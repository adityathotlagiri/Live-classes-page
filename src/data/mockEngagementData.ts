import type {
  EngagementEvent,
  Poll,
  PollSubmission,
  AttendanceRecord,
  StudentActivity,
  Announcement,
  ClassAnalytics,
  AttendanceTrendPoint,
  EngagementTrendPoint,
} from '@/types/engagement';

const now = new Date();
function minutesAgo(mins: number): string {
  return new Date(now.getTime() - mins * 60000).toISOString();
}

export const mockEngagementEvents: EngagementEvent[] = [
  {
    id: 'eng-1',
    studentId: 's-2',
    studentName: 'Priya Singh',
    type: 'question',
    message: 'Can you explain useEffect cleanup again?',
    timestamp: minutesAgo(3),
    acknowledged: false,
  },
  {
    id: 'eng-2',
    studentId: 's-1',
    studentName: 'Rahul Verma',
    type: 'raised_hand',
    timestamp: minutesAgo(2),
    acknowledged: false,
  },
  {
    id: 'eng-3',
    studentId: 's-4',
    studentName: 'Sneha Iyer',
    type: 'confused',
    timestamp: minutesAgo(5),
    acknowledged: true,
  },
];

export const mockPolls: Poll[] = [
  {
    id: 'poll-1',
    question: 'Which hook would you use to memoize a value?',
    options: [
      { id: 'opt-1', text: 'useEffect', voteCount: 3 },
      { id: 'opt-2', text: 'useMemo', voteCount: 14 },
      { id: 'opt-3', text: 'useCallback', voteCount: 5 },
    ],
    status: 'active',
    createdAt: minutesAgo(4),
    showResultsToStudents: false,
  },
];

export const mockPollSubmissions: PollSubmission[] = [
  { pollId: 'poll-1', studentId: 's-1', optionId: 'opt-2', submittedAt: minutesAgo(2) },
  { pollId: 'poll-1', studentId: 's-3', optionId: 'opt-2', submittedAt: minutesAgo(1) },
];

export const mockAttendance: AttendanceRecord[] = [
  { studentId: 's-1', studentName: 'Rahul Verma', status: 'present', joinTime: minutesAgo(30), durationMinutes: 30 },
  { studentId: 's-2', studentName: 'Priya Singh', status: 'present', joinTime: minutesAgo(28), durationMinutes: 28 },
  { studentId: 's-3', studentName: 'Arjun Rao', status: 'late', joinTime: minutesAgo(15), durationMinutes: 15 },
  { studentId: 's-4', studentName: 'Sneha Iyer', status: 'present', joinTime: minutesAgo(30), durationMinutes: 30 },
  { studentId: 's-5', studentName: 'Kabir Khan', status: 'left_early', joinTime: minutesAgo(30), leaveTime: minutesAgo(10), durationMinutes: 20 },
  { studentId: 's-6', studentName: 'Meera Nair', status: 'absent' },
];

export const mockStudentActivity: StudentActivity[] = [
  { studentId: 's-1', studentName: 'Rahul Verma', state: 'active', hasRaisedHand: true, hasAnsweredPoll: true, questionsAsked: 0, reactionsSent: 2, needsAttention: false },
  { studentId: 's-2', studentName: 'Priya Singh', state: 'active', hasRaisedHand: false, hasAnsweredPoll: false, questionsAsked: 1, reactionsSent: 0, needsAttention: false },
  { studentId: 's-3', studentName: 'Arjun Rao', state: 'inactive', hasRaisedHand: false, hasAnsweredPoll: true, questionsAsked: 0, reactionsSent: 0, needsAttention: true },
  { studentId: 's-4', studentName: 'Sneha Iyer', state: 'connection_issue', hasRaisedHand: false, hasAnsweredPoll: false, questionsAsked: 0, reactionsSent: 0, needsAttention: true },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Assignment deadline extended',
    message: 'The React fundamentals assignment is now due next Monday instead of Friday.',
    teacherName: 'John Smith',
    timestamp: minutesAgo(10),
    priority: 'important',
    pinned: true,
    readByCurrentUser: false,
  },
  {
    id: 'ann-2',
    title: 'Poll coming up',
    message: 'A short poll will start in a few minutes — please stay attentive.',
    teacherName: 'John Smith',
    timestamp: minutesAgo(6),
    priority: 'normal',
    pinned: false,
    readByCurrentUser: true,
  },
];

export const mockClassAnalytics: ClassAnalytics = {
  totalParticipants: 6,
  attendanceRate: 83,
  participationRate: 67,
  pollResponseRate: 33,
  questionsAsked: 1,
  averageEngagement: 71,
};

export const mockAttendanceTrend: AttendanceTrendPoint[] = [
  { label: '0m', presentCount: 6 },
  { label: '10m', presentCount: 6 },
  { label: '20m', presentCount: 5 },
  { label: '30m', presentCount: 5 },
];

export const mockEngagementTrend: EngagementTrendPoint[] = [
  { label: '0m', engagementScore: 40 },
  { label: '10m', engagementScore: 55 },
  { label: '20m', engagementScore: 71 },
  { label: '30m', engagementScore: 65 },
];