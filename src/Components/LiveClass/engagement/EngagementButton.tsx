interface EngagementButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick: () => void;
}

export default function EngagementButton({
  icon,
  label,
  active,
  activeColor = '#238B45',
  onClick,
}: EngagementButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-all duration-200 active:scale-95 ${
        active
          ? 'border-transparent text-white'
          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
      }`}
      style={active ? { backgroundColor: activeColor } : undefined}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}