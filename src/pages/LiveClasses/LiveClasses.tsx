import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoOff } from 'lucide-react';
import ClassCard from '@/Components/LiveClass/ClassCard';
import ClassFilters, { type FilterTab } from '@/Components/LiveClass/ClassFilters';
import EmptyState from '@/Components/LiveClass/EmptyState';
import { mockClasses } from '@/data/mockClasses';
import type { LiveClass } from '@/types/liveClass';

export default function LiveClasses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredClasses = useMemo(() => {
    return mockClasses.filter((cls) => {
      const matchesTab = activeTab === 'all' || cls.status === activeTab;
      const matchesSearch =
        cls.title.toLowerCase().includes(search.toLowerCase()) ||
        cls.courseName.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const counts: Record<FilterTab, number> = {
    all: mockClasses.length,
    upcoming: mockClasses.filter((c) => c.status === 'upcoming').length,
    live: mockClasses.filter((c) => c.status === 'live').length,
    completed: mockClasses.filter((c) => c.status === 'completed').length,
    cancelled: mockClasses.filter((c) => c.status === 'cancelled').length,
  };

  const handleAction = (liveClass: LiveClass) => {
    if (liveClass.status === 'live') {
      navigate(`/live-classes/${liveClass.id}/join`);
    } else if (liveClass.status === 'completed') {
      navigate(`/recordings`);
    } else {
      navigate(`/live-classes/${liveClass.id}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative background layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 animate-float-slow rounded-full bg-[#42CE70]/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 animate-float rounded-full bg-[#238B45]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-slow rounded-full bg-[#036724]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="mb-8 animate-fade-in-up rounded-3xl border border-emerald-100/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        {/* Hero header */}
        <div className="mb-8 rounded-3xl border border-emerald-100/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-[#036724]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#238B45]" />
                Module 6 · Virtual Classroom
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Live <span className="text-[#238B45]">Classes</span>
              </h1>
              <p className="mt-1.5 max-w-md text-sm text-slate-500">
                Join live sessions, catch up on upcoming classes, or revisit completed ones —
                all in one place.
              </p>
            </div>

            <div className="flex gap-6 sm:gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#238B45]">{counts.live}</p>
                <p className="text-xs text-slate-500">Live now</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{counts.upcoming}</p>
                <p className="text-xs text-slate-500">Upcoming</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{counts.completed}</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <ClassFilters
          searchValue={search}
          onSearchChange={setSearch}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : filteredClasses.length === 0 ? (
            <EmptyState
              icon={VideoOff}
              title="No classes found"
              description={
                search
                  ? 'Try a different search term or clear your filters.'
                  : 'Your scheduled classes will appear here.'
              }
            />
          ) : (
            <div key={activeTab} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((cls, index) => (
                <div
                  key={cls.id}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <ClassCard liveClass={cls} onAction={handleAction} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}