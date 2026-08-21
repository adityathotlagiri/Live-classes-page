import { X, Mic, MicOff, Video, VideoOff, Search } from 'lucide-react';
import { useState } from 'react';
import type { Participant } from '@/types/liveClass';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface ParticipantsPanelProps {
  participants: Participant[];
  onClose: () => void;
}

export default function ParticipantsPanel({ participants, onClose }: ParticipantsPanelProps) {
  const [search, setSearch] = useState('');

  useEscapeKey(onClose, true);

  const teacher = participants.find((p) => p.role === 'teacher');
  const students = participants
    .filter((p) => p.role === 'student')
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Participants"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-72 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">
            Participants <span className="text-slate-500">({participants.length})</span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close participants panel"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-800 p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search participants..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {teacher && (
            <div className="mb-4">
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Teacher
              </p>
              <ParticipantRow participant={teacher} />
            </div>
          )}

          <div>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Students ({students.length})
            </p>
            <div className="space-y-1">
              {students.length === 0 ? (
                <p className="px-1 py-4 text-center text-xs text-slate-500">
                  No participants found
                </p>
              ) : (
                students.map((p) => <ParticipantRow key={p.id} participant={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const { name, role, micOn, cameraOn } = participant;
  const initials = name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-slate-800">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
          role === 'teacher' ? 'bg-[#238B45]' : 'bg-slate-700'
        }`}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-white sm:text-sm">{name}</p>
        {role === 'teacher' && <p className="text-[10px] text-emerald-400">Teacher</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {micOn ? (
          <Mic className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <MicOff className="h-3.5 w-3.5 text-red-400" />
        )}
        {cameraOn ? (
          <Video className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <VideoOff className="h-3.5 w-3.5 text-red-400" />
        )}
      </div>
    </div>
  );
}