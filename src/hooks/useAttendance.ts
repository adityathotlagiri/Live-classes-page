import { useMemo } from 'react';
import { mockAttendance } from '@/data/mockEngagementData';
import type { AttendanceRecord } from '@/types/engagement';

export function useAttendance() {
  const records: AttendanceRecord[] = mockAttendance;

  const stats = useMemo(() => {
    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const late = records.filter((r) => r.status === 'late').length;
    const leftEarly = records.filter((r) => r.status === 'left_early').length;
    const attendancePercent = total > 0 ? Math.round(((total - absent) / total) * 100) : 0;

    return { total, present, absent, late, leftEarly, attendancePercent };
  }, [records]);

  return { records, stats };
}