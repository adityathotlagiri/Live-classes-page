import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, ArrowLeft } from 'lucide-react';
import { mockClasses } from '@/data/mockClasses';
interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

function ToggleRow({ icon, label, isOn, onToggle }: ToggleRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 px-3 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`shrink-0 ${isOn ? 'text-[#42CE70]' : 'text-slate-500'}`}>{icon}</span>
        <span className="truncate text-sm font-medium text-slate-200">{label}</span>
      </div>

      <button
        onClick={onToggle}
        aria-label={`Turn ${label} ${isOn ? 'off' : 'on'}`}
        className={`relative h-6.5 w-10 shrink-0 rounded-full pb-0.5 pt-0.5 pl-0.5 transition-colors duration-200 ${
          isOn ? 'bg-[#238B45]' : 'bg-slate-700'
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
            isOn ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
export default function JoinClass() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const liveClass = mockClasses.find((c) => c.id === classId);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [name] = useState('You'); // swap for real logged-in user name later

  if (!liveClass) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>Class not found.</p>
      </div>
    );
  }

  const handleJoin = () => {
    navigate(`/live-classes/${liveClass.id}/room`, {
      state: { initialMicOn: micOn, initialCameraOn: cameraOn },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex h-14 items-center border-b border-slate-800 px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-10 lg:flex-row lg:gap-16">
                {/* Preview tile */}
        <div className="w-full max-w-md">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-slate-700">
            {cameraOn ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-800">
                <span className="text-4xl font-bold text-white/90">
                  {name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-800">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-semibold text-slate-300">
                  {name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="text-xs text-slate-500">Camera is off</span>
              </div>
            )}
          </div>

          {/* Toggle switches below the preview */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <ToggleRow
              icon={micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              label="Microphone"
              isOn={micOn}
              onToggle={() => setMicOn((v) => !v)}
            />
            <ToggleRow
              icon={cameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              label="Camera"
              isOn={cameraOn}
              onToggle={() => setCameraOn((v) => !v)}
            />
          </div>
        </div>

        {/* Join panel */}
        <div className="w-full max-w-sm text-center lg:text-left">
          <h1 className="text-2xl font-bold text-white">Ready to join?</h1>
          <p className="mt-1.5 text-sm text-slate-400">{liveClass.title}</p>
          <p className="text-xs text-slate-500">{liveClass.courseName} · Teacher: {liveClass.teacher.name}</p>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs text-slate-400 lg:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {liveClass.participantCount} people already in this class
          </div>

          <button
            onClick={handleJoin}
            className="mt-6 w-full rounded-xl bg-[#238B45] py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#036724] active:bg-[#42CE70] active:scale-[0.98]"
          >
            Join Now
          </button>

          <p className="mt-3 text-xs text-slate-500">
            By joining, you agree to follow classroom etiquette. You can change your mic and camera anytime once inside.
          </p>
        </div>
      </div>
    </div>
  );
}