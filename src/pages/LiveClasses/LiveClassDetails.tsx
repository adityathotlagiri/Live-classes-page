import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailsSkeleton from '@/Components/LiveClass/DetailsSkeleton';

import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Video,
} from 'lucide-react';
import { mockClasses } from '@/data/mockClasses';
import CountdownTimer from '@/Components/LiveClass/CountdownTimer';
import { formatDate, formatTime, formatDuration, getStatusBadgeStyles } from '@/utils/liveClassUtils';
import { useCountdown } from '@/hooks/useCountdown';

export default function LiveClassDetails() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const liveClass = mockClasses.find((c) => c.id === classId);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [classId]);
  const { isOver } = useCountdown(liveClass?.startTime ?? ''); 
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <DetailsSkeleton />
      </div>
    );
  }

  if (!liveClass) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">Class not found</p>
          <button
            onClick={() => navigate('/live-classes')}
            className="mt-3 text-sm font-medium text-[#238B45] hover:text-[#036724]"
          >
            Back to Live Classes
          </button>
        </div>
      </div>
    );
  }

  const canJoin = liveClass.status === 'live' || (liveClass.status === 'upcoming' && isOver);
  const isUpcoming = liveClass.status === 'upcoming';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/live-classes')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Live Classes
        </button>

        <div className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeStyles(
              liveClass.status
            )}`}
          >
            {liveClass.status.charAt(0).toUpperCase() + liveClass.status.slice(1)}
          </span>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            {liveClass.title}
          </h1>
          <p className="mt-1 text-slate-500">{liveClass.courseName} · {liveClass.subject}</p>

          <p className="mt-4 leading-relaxed text-slate-600">{liveClass.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Calendar className="h-5 w-5 text-[#238B45]" />
              <div>
                <p className="text-xs text-slate-400">Date</p>
                <p className="text-sm font-medium text-slate-700">{formatDate(liveClass.scheduledDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Clock className="h-5 w-5 text-[#238B45]" />
              <div>
                <p className="text-xs text-slate-400">Start Time</p>
                <p className="text-sm font-medium text-slate-700">{formatTime(liveClass.startTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Video className="h-5 w-5 text-[#238B45]" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-medium text-slate-700">{formatDuration(liveClass.durationMinutes)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Users className="h-5 w-5 text-[#238B45]" />
              <div>
                <p className="text-xs text-slate-400">Participants</p>
                <p className="text-sm font-medium text-slate-700">{liveClass.participantCount} joined</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-[#036724]">
              {liveClass.teacher.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> Instructor
              </p>
              <p className="text-sm font-semibold text-slate-800">{liveClass.teacher.name}</p>
            </div>
          </div>

          {isUpcoming && !isOver && (
            <div className="mt-6">
              <CountdownTimer targetDate={liveClass.startTime} />
            </div>
          )}

          <button
            onClick={() => navigate(`/live-classes/${liveClass.id}/join`)}
            disabled={!canJoin}
            className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
              canJoin
                ? 'bg-[#238B45] text-white hover:bg-[#036724] active:bg-[#42CE70] focus:outline-none focus:ring-2 focus:ring-[#238B45]/40 focus:ring-offset-1'
                : 'cursor-not-allowed bg-slate-100 text-slate-400'
            }`}
          >
            {canJoin ? 'Join Class' : 'Join button unlocks when class starts'}
          </button>
        </div>
      </div>
    </div>
  );
}