export type ClassStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export type UserRole = 'teacher' | 'student';

export interface Teacher {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface LiveClass {
  id: string;
  title: string;
  courseName: string;
  subject: string;
  description: string;
  teacher: Teacher;
  scheduledDate: string;   // ISO date string
  startTime: string;       // ISO datetime string
  durationMinutes: number;
  status: ClassStatus;
  participantCount: number;
  hasRecording?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  micOn: boolean;
  cameraOn: boolean;
  isSpeaking?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string; // ISO datetime string
}

export interface Recording {
  id: string;
  classId: string;
  classTitle: string;
  courseName: string;
  teacherName: string;
  recordedDate: string;
  durationMinutes: number;
  thumbnailUrl?: string;
}

export type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

export type PermissionStatus = 'unknown' | 'granted' | 'denied';

export interface MediaPermissions {
  camera: PermissionStatus;
  microphone: PermissionStatus;
  screenShare: PermissionStatus;
}