import { useState } from 'react';
import type { AnnouncementPriority, Announcement } from '@/types/engagement';

interface AnnouncementComposerProps {
  editingAnnouncement: Announcement | null;
  onCreate: (title: string, message: string, priority: AnnouncementPriority) => void;
  onSaveEdit: (id: string, title: string, message: string) => void;
  onCancel: () => void;
}

export default function AnnouncementComposer({
  editingAnnouncement,
  onCreate,
  onSaveEdit,
  onCancel,
}: AnnouncementComposerProps) {
  const [title, setTitle] = useState(editingAnnouncement?.title ?? '');
  const [message, setMessage] = useState(editingAnnouncement?.message ?? '');
  const [priority, setPriority] = useState<AnnouncementPriority>(
    editingAnnouncement?.priority ?? 'normal'
  );

  const isEditing = !!editingAnnouncement;
  const canSubmit = title.trim().length > 0 && message.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (isEditing) {
      onSaveEdit(editingAnnouncement.id, title.trim(), message.trim());
    } else {
      onCreate(title.trim(), message.trim(), priority);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Announcement title"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your announcement..."
        rows={3}
        className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
      />

      {!isEditing && (
        <label className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={priority === 'important'}
            onChange={(e) => setPriority(e.target.checked ? 'important' : 'normal')}
            className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 accent-[#238B45]"
          />
          Mark as important
        </label>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-slate-700 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-1 rounded-lg bg-[#238B45] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#036724] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isEditing ? 'Save Changes' : 'Post Announcement'}
        </button>
      </div>
    </div>
  );
}