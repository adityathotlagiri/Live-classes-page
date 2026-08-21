import { useNavigate } from 'react-router-dom';
import { Search, Video, ArrowLeft, ArrowUpDown } from 'lucide-react';
import RecordingCard from '@/Components/LiveClass/RecordingCard';
import EmptyState from '@/Components/LiveClass/EmptyState';
import { mockRecordings } from '@/data/mockClasses';
import type { Recording } from '@/types/liveClass';
import { useEffect, useMemo, useState } from 'react';
import RecordingsSkeleton from '@/Components/LiveClass/RecordingsSkeleton';

type SortOption = 'newest' | 'oldest' | 'longest' | 'shortest';

const PAGE_SIZE = 6;

export default function Recordings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = mockRecordings.filter(
      (r) =>
        r.classTitle.toLowerCase().includes(search.toLowerCase()) ||
        r.courseName.toLowerCase().includes(search.toLowerCase()) ||
        r.teacherName.toLowerCase().includes(search.toLowerCase())
    );

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime();
        case 'oldest':
          return new Date(a.recordedDate).getTime() - new Date(b.recordedDate).getTime();
        case 'longest':
          return b.durationMinutes - a.durationMinutes;
        case 'shortest':
          return a.durationMinutes - b.durationMinutes;
        default:
          return 0;
      }
    });

    return list;
  }, [search, sort]);

  const visibleRecordings = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handlePlay = (recording: Recording) => {
    navigate(`/recordings/${recording.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/live-classes')}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Live Classes
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#238B45]/10">
            <Video className="h-5 w-5 text-[#238B45]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Recording History</h1>
            <p className="text-sm text-slate-500">Catch up on classes you may have missed.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search recordings..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#238B45] focus:ring-2 focus:ring-[#238B45]/20"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-[#238B45] sm:w-48"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="longest">Longest first</option>
              <option value="shortest">Shortest first</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <RecordingsSkeleton />
          ) : filteredAndSorted.length === 0 ? (
            <EmptyState
              icon={Video}
              title="No recordings found"
              description={
                search ? 'Try a different search term.' : 'Recordings from completed classes will appear here.'
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleRecordings.map((recording, index) => (
                  <div
                    key={recording.id}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <RecordingCard recording={recording} onPlay={handlePlay} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#238B45] hover:text-[#238B45]"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}