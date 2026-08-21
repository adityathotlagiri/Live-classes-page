import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Participant } from '@/types/liveClass';
import VideoTile from './VideoTile';
import { useIsMobile } from '@/hooks/useIsMobile';

interface VideoGridProps {
  participants: Participant[];
}

export default function VideoGrid({ participants }: VideoGridProps) {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();

  const tilesPerPage = isMobile ? 3 : 9;
  const gridClasses = isMobile ? 'grid-cols-1' : 'grid-cols-3';

  const pinned = participants.find((p) => p.id === pinnedId);
  const others = pinned ? participants.filter((p) => p.id !== pinnedId) : participants;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(0);
  }, [isMobile]);

  if (pinned) {
    return (
      <div className="flex h-full w-full flex-col gap-3 p-3 sm:p-4">
        <div className="flex-1">
          <VideoTile participant={pinned} isPinned onPin={() => setPinnedId(null)} fill />
        </div>
        {others.length > 0 && (
          <div className="flex h-24 shrink-0 gap-2 overflow-x-auto sm:h-28">
            {others.map((p) => (
              <div key={p.id} className="aspect-video h-full shrink-0">
                <VideoTile participant={p} onPin={() => setPinnedId(p.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const totalPages = Math.ceil(participants.length / tilesPerPage);
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));
  const start = currentPage * tilesPerPage;
  const pageParticipants = participants.slice(start, start + tilesPerPage);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-3 sm:p-4">
      {/* Desktop-only: arrows float at the vertical edges of the whole panel */}
      {totalPages > 1 && !isMobile && (
        <>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            aria-label="Previous participants"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-slate-700 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            aria-label="Next participants"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-slate-700 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Content column: grid pinned to top, dots pinned to bottom — same position on every page */}
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
        <div className="flex-1 overflow-hidden">
          <div className={`grid h-full w-full ${gridClasses} auto-rows-fr gap-2 sm:gap-3`}>
            {pageParticipants.map((p) => (
              <div key={p.id} className="aspect-video">
                <VideoTile participant={p} onPin={() => setPinnedId(p.id)} fill />
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex shrink-0 items-center justify-center gap-3 pt-3">
            {isMobile && (
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                aria-label="Previous participants"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === currentPage ? 'w-5 bg-[#238B45]' : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {isMobile && (
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                aria-label="Next participants"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}