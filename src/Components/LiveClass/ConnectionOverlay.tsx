import { Loader2, Wifi, WifiOff } from 'lucide-react';
import type { ConnectionStatus } from '@/types/liveClass';

interface ConnectionOverlayProps {
  status: ConnectionStatus;
}

export default function ConnectionOverlay({ status }: ConnectionOverlayProps) {
  if (status === 'connected') return null;

  const config = {
    connecting: {
      icon: <Loader2 className="h-6 w-6 animate-spin text-[#42CE70]" />,
      text: 'Connecting to live class...',
    },
    reconnecting: {
      icon: <WifiOff className="h-6 w-6 animate-pulse text-amber-400" />,
      text: 'Reconnecting...',
    },
    error: {
      icon: <WifiOff className="h-6 w-6 text-red-400" />,
      text: 'Unable to join the live class. Please check your internet connection and try again.',
    },
    idle: {
      icon: <Wifi className="h-6 w-6 text-slate-400" />,
      text: 'Preparing to connect...',
    },
  }[status];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-slate-950">
      {config.icon}
      <p className="max-w-xs text-center text-sm text-slate-300">{config.text}</p>
    </div>
  );
}