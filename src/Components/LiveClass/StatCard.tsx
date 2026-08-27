interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor?: string;
}

export default function StatCard({ label, value, icon, accentColor = '#238B45' }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5">
      <div className="flex items-center gap-1.5">
        <span className="shrink-0" style={{ color: accentColor }}>
          {icon}
        </span>
        <span className="truncate text-xs text-slate-500">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}