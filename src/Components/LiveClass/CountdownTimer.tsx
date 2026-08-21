import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(targetDate);

  if (isOver) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-center">
        <p className="text-sm font-medium text-[#036724]">This class is starting now</p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-medium text-slate-500">Class starts in</p>
      <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                {String(unit.value).padStart(2, '0')}
              </div>
              <span className="mt-1.5 text-xs text-slate-400">{unit.label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="pb-5 text-xl font-bold text-slate-300">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}