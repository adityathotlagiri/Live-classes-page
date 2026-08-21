export default function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-16 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
        <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}