import { ShieldAlert } from 'lucide-react';

export default function PermissionDenied({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <ShieldAlert className="h-8 w-8 text-slate-600" />
      <p className="text-sm font-medium text-slate-400">Access restricted</p>
      <p className="text-xs text-slate-500">{message}</p>
    </div>
  );
}