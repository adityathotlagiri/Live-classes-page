import { useState } from 'react';
import { X, Megaphone, Plus, AlertTriangle } from 'lucide-react';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementComposer from './AnnouncementComposer';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import type { Announcement, AnnouncementPriority } from '@/types/engagement';

interface AnnouncementPanelProps {
  isTeacher: boolean;
  announcements: Announcement[];
  error: string | null;
  onClearError: () => void;
  onCreate: (title: string, message: string, priority: AnnouncementPriority) => void;
  onEdit: (id: string, title: string, message: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

export default function AnnouncementPanel({
  isTeacher,
  announcements,
  error,
  onClearError,
  onCreate,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleImportant,
  onMarkRead,
  onClose,
}: AnnouncementPanelProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  useEscapeKey(onClose, true);

  const showComposer = isComposing || editingAnnouncement !== null;

  const handleCreate = (title: string, message: string, priority: AnnouncementPriority) => {
    onCreate(title, message, priority);
    setIsComposing(false);
  };

  const handleSaveEdit = (id: string, title: string, message: string) => {
    onEdit(id, title, message);
    setEditingAnnouncement(null);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Announcements"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">Announcements</h2>
          <button
            onClick={onClose}
            aria-label="Close announcements panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-3 flex items-start gap-2 rounded-lg border border-red-800 bg-red-950/60 p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
            <p className="flex-1 text-xs text-red-200">{error}</p>
            <button
              onClick={onClearError}
              className="shrink-0 text-xs font-medium text-red-300 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {isTeacher && !showComposer && (
            <button
              onClick={() => setIsComposing(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 py-3 text-sm font-medium text-slate-300 hover:border-[#238B45] hover:text-[#42CE70]"
            >
              <Plus className="h-4 w-4" />
              New Announcement
            </button>
          )}

          {showComposer && (
            <AnnouncementComposer
              editingAnnouncement={editingAnnouncement}
              onCreate={handleCreate}
              onSaveEdit={handleSaveEdit}
              onCancel={() => {
                setIsComposing(false);
                setEditingAnnouncement(null);
              }}
            />
          )}

          {announcements.length === 0 && !showComposer ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <Megaphone className="h-6 w-6 text-slate-600" />
              <p className="text-xs text-slate-500">No announcements yet</p>
            </div>
          ) : (
            announcements.map((a) => (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                isTeacher={isTeacher}
                onMarkRead={onMarkRead}
                onTogglePin={onTogglePin}
                onToggleImportant={onToggleImportant}
                onEdit={setEditingAnnouncement}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}