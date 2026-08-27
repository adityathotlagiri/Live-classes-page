import { Pin, Star, Edit2, Trash2 } from 'lucide-react';
import type { Announcement } from '@/types/engagement';

interface AnnouncementCardProps {
  announcement: Announcement;
  isTeacher: boolean;
  onMarkRead: (id: string) => void;
  onTogglePin?: (id: string) => void;
  onToggleImportant?: (id: string) => void;
  onEdit?: (announcement: Announcement) => void;
  onDelete?: (id: string) => void;
}

function timeAgo(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function AnnouncementCard({
  announcement,
  isTeacher,
  onMarkRead,
  onTogglePin,
  onToggleImportant,
  onEdit,
  onDelete,
}: AnnouncementCardProps) {
  const { id, title, message, teacherName, timestamp, priority, pinned, readByCurrentUser } =
    announcement;
  const isImportant = priority === 'important';

  return (
    <div
      onClick={() => !isTeacher && !readByCurrentUser && onMarkRead(id)}
      className={`rounded-xl border p-3.5 transition-colors ${
        isImportant
          ? 'border-amber-500/40 bg-amber-500/5'
          : 'border-slate-700 bg-slate-800/50'
      } ${!isTeacher && !readByCurrentUser ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {pinned && <Pin className="h-3 w-3 shrink-0 fill-[#42CE70] text-[#42CE70]" />}
          {isImportant && <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />}
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        {!isTeacher && !readByCurrentUser && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#42CE70]" />
        )}
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{message}</p>

      <div className="mt-2.5 flex items-center justify-between">
        <p className="text-[11px] text-slate-500">
          {teacherName} · {timeAgo(timestamp)}
        </p>

        {isTeacher && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin?.(id);
              }}
              aria-label={pinned ? 'Unpin announcement' : 'Pin announcement'}
              className={`flex h-6 w-6 items-center justify-center rounded-md ${
                pinned ? 'text-[#42CE70]' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleImportant?.(id);
              }}
              aria-label={isImportant ? 'Mark as normal priority' : 'Mark as important'}
              className={`flex h-6 w-6 items-center justify-center rounded-md ${
                isImportant ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(announcement);
              }}
              aria-label="Edit announcement"
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:text-slate-300"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(id);
              }}
              aria-label="Delete announcement"
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}