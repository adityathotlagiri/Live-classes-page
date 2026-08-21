import { useEffect, useState } from 'react';
import { getCountdown } from '@/utils/liveClassUtils';

export function useCountdown(targetDateStr: string) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDateStr));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDateStr));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return countdown;
}