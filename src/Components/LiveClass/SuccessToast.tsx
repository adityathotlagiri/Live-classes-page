import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function SuccessToast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-fade-in-up rounded-full border border-[#238B45]/40 bg-slate-900 px-4 py-2.5 shadow-xl">
      <p className="flex items-center gap-2 text-xs font-medium text-white">
        <CheckCircle2 className="h-4 w-4 text-[#42CE70]" />
        {message}
      </p>
    </div>
  );
}