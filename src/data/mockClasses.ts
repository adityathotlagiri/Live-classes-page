import type { LiveClass, Participant, ChatMessage, Recording } from '@/types/liveClass';

const now = new Date();

function addMinutes(date: Date, minutes: number): string {
  return new Date(date.getTime() + minutes * 60000).toISOString();
}

export const mockClasses: LiveClass[] = [
  {
    id: 'cls-101',
    title: 'React Fundamentals',
    courseName: 'Frontend Development',
    subject: 'Web Development',
    description:
      'An introduction to React components, props, state, and hooks with hands-on examples.',
    teacher: { id: 't-1', name: 'John Smith' },
    scheduledDate: addMinutes(now, 5),
    startTime: addMinutes(now, 5),
    durationMinutes: 60,
    status: 'live',
    participantCount: 24,
  },
  {
    id: 'cls-102',
    title: 'Advanced TypeScript Patterns',
    courseName: 'Frontend Development',
    subject: 'Programming Languages',
    description:
      'Deep dive into generics, utility types, and discriminated unions in TypeScript.',
    teacher: { id: 't-2', name: 'Priya Nair' },
    scheduledDate: addMinutes(now, 60 * 24),
    startTime: addMinutes(now, 60 * 24),
    durationMinutes: 90,
    status: 'upcoming',
    participantCount: 18,
  },
  {
    id: 'cls-103',
    title: 'Database Normalization',
    courseName: 'Backend Development',
    subject: 'Databases',
    description: 'Understanding 1NF, 2NF, 3NF with practical schema design exercises.',
    teacher: { id: 't-3', name: 'Arjun Mehta' },
    scheduledDate: addMinutes(now, 60 * 48),
    startTime: addMinutes(now, 60 * 48),
    durationMinutes: 45,
    status: 'upcoming',
    participantCount: 12,
  },
  {
    id: 'cls-104',
    title: 'CSS Grid & Flexbox Mastery',
    courseName: 'Frontend Development',
    subject: 'Web Development',
    description: 'Building complex responsive layouts using modern CSS layout systems.',
    teacher: { id: 't-1', name: 'John Smith' },
    scheduledDate: addMinutes(now, -60 * 24),
    startTime: addMinutes(now, -60 * 24),
    durationMinutes: 75,
    status: 'completed',
    participantCount: 30,
    hasRecording: true,
  },
  {
    id: 'cls-105',
    title: 'Intro to Data Structures',
    courseName: 'Computer Science Basics',
    subject: 'Computer Science',
    description: 'Arrays, linked lists, stacks, and queues explained with diagrams.',
    teacher: { id: 't-4', name: 'Sneha Kulkarni' },
    scheduledDate: addMinutes(now, -60 * 48),
    startTime: addMinutes(now, -60 * 48),
    durationMinutes: 60,
    status: 'completed',
    participantCount: 27,
    hasRecording: true,
  },
  {
    id: 'cls-106',
    title: 'REST API Design Principles',
    courseName: 'Backend Development',
    subject: 'Web Development',
    description: 'Best practices for designing clean, versioned, and scalable REST APIs.',
    teacher: { id: 't-3', name: 'Arjun Mehta' },
    scheduledDate: addMinutes(now, 60 * 3),
    startTime: addMinutes(now, 60 * 3),
    durationMinutes: 60,
    status: 'cancelled',
    participantCount: 0,
  },
];

export const mockParticipants: Participant[] = [
  { id: 't-1', name: 'John Smith', role: 'teacher', micOn: true, cameraOn: true },
  { id: 's-1', name: 'Rahul Verma', role: 'student', micOn: true, cameraOn: true },
  { id: 's-2', name: 'Priya Singh', role: 'student', micOn: false, cameraOn: true },
  { id: 's-3', name: 'Arjun Rao', role: 'student', micOn: false, cameraOn: false },
  { id: 's-4', name: 'Sneha Iyer', role: 'student', micOn: true, cameraOn: false },
  { id: 's-5', name: 'Kabir Khan', role: 'student', micOn: false, cameraOn: true },
  { id: 's-6', name: 'Meera Nair', role: 'student', micOn: true, cameraOn: false },
  { id: 's-7', name: 'Vikram Shah', role: 'student', micOn: false, cameraOn: true },
  { id: 's-8', name: 'Ananya Das', role: 'student', micOn: true, cameraOn: true },
  { id: 's-9', name: 'Ananya Das', role: 'student', micOn: true, cameraOn: true },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 's-1',
    senderName: 'Rahul Verma',
    content: 'Good morning!',
    timestamp: addMinutes(now, -10),
  },
  {
    id: 'msg-2',
    senderId: 's-2',
    senderName: 'Priya Singh',
    content: 'I have a question about props drilling.',
    timestamp: addMinutes(now, -8),
  },
  {
    id: 'msg-3',
    senderId: 't-1',
    senderName: 'John Smith',
    content: "Sure Priya, we'll cover that in 5 minutes.",
    timestamp: addMinutes(now, -7),
  },
];

export const mockRecordings: Recording[] = [
  {
    id: 'rec-1',
    classId: 'cls-104',
    classTitle: 'CSS Grid & Flexbox Mastery',
    courseName: 'Frontend Development',
    teacherName: 'John Smith',
    recordedDate: addMinutes(now, -60 * 24),
    durationMinutes: 75,
  },
  {
    id: 'rec-2',
    classId: 'cls-105',
    classTitle: 'Intro to Data Structures',
    courseName: 'Computer Science Basics',
    teacherName: 'Sneha Kulkarni',
    recordedDate: addMinutes(now, -60 * 48),
    durationMinutes: 60,
  },
];