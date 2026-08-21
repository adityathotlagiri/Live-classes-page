import type { ClassStatus } from '@/types/liveClass';

// Format "2026-08-25T10:00:00" -> "25 Aug 2026"
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Format "2026-08-25T10:00:00" -> "10:00 AM"
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// 90 -> "1h 30m"
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// seconds -> "00:24:18"
export function formatTimer(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((unit) => String(unit).padStart(2, '0')).join(':');
}

// Returns { days, hours, minutes, seconds } until target date
export function getCountdown(targetDateStr: string) {
  const target = new Date(targetDateStr).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isOver: diff <= 0 };
}

export function getStatusBadgeStyles(status: ClassStatus): string {
  switch (status) {
    case 'live':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'completed':
      return 'bg-slate-100 text-slate-600 border border-slate-200';
    case 'cancelled':
      return 'bg-amber-100 text-amber-700 border border-amber-200';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export function getActionLabel(status: ClassStatus): string {
  switch (status) {
    case 'upcoming':
      return 'View Details';
    case 'live':
      return 'Join Class';
    case 'completed':
      return 'View Recording';
    case 'cancelled':
      return 'View Status';
    default:
      return 'View';
  }
}