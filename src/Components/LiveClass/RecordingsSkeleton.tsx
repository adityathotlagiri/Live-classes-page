export default function RecordingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="aspect-video animate-pulse bg-slate-200" />
          <div className="p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}