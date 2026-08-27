// ── Student Engagement ──────────────────────────────────────
export type EngagementSignal = 'raised_hand' | 'question' | 'confused' | 'need_help' | 'applause';

export interface EngagementEvent {
  id: string;
  studentId: string;
  studentName: string;
  type: EngagementSignal;
  message?: string;       // used for "Ask Question" text
  timestamp: string;
  acknowledged: boolean;  // teacher has seen/responded to it
}

// ── Live Polls ───────────────────────────────────────────────
export type PollStatus = 'draft' | 'active' | 'closed';

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  status: PollStatus;
  createdAt: string;
  closedAt?: string;
  showResultsToStudents: boolean;
}

// Tracks which student answered which poll with which option —
// separate from Poll itself since a student's submission state
// (submitted / not yet) is per-student, not part of the poll data.
export interface PollSubmission {
  pollId: string;
  studentId: string;
  optionId: string;
  submittedAt: string;
}

// ── Attendance ───────────────────────────────────────────────
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'left_early';

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  joinTime?: string;
  leaveTime?: string;
  durationMinutes?: number;
}

// ── Student Activity ─────────────────────────────────────────
export type ActivityState = 'active' | 'inactive' | 'connection_issue';

export interface StudentActivity {
  studentId: string;
  studentName: string;
  state: ActivityState;
  hasRaisedHand: boolean;
  hasAnsweredPoll: boolean;
  questionsAsked: number;
  reactionsSent: number;
  needsAttention: boolean;
}

// ── Announcements ────────────────────────────────────────────
export type AnnouncementPriority = 'normal' | 'important';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  teacherName: string;
  timestamp: string;
  priority: AnnouncementPriority;
  pinned: boolean;
  readByCurrentUser: boolean;
}

// ── Class Summary / Analytics ────────────────────────────────
export interface ClassAnalytics {
  totalParticipants: number;
  attendanceRate: number;      // 0-100
  participationRate: number;   // 0-100
  pollResponseRate: number;    // 0-100
  questionsAsked: number;
  averageEngagement: number;   // 0-100
}

export interface AttendanceTrendPoint {
  label: string;   // e.g. "10 min" or a timestamp
  presentCount: number;
}

export interface EngagementTrendPoint {
  label: string;
  engagementScore: number; // 0-100
}