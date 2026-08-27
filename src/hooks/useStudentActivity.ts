import { useState, useMemo } from 'react';
import { mockStudentActivity } from '@/data/mockEngagementData';
import type { StudentActivity } from '@/types/engagement';

export type ActivityFilter = 'all' | 'active' | 'inactive' | 'needs_attention' | 'raised_hand';

export function useStudentActivity() {
  const [activity] = useState<StudentActivity[]>(mockStudentActivity);
  const [filter, setFilter] = useState<ActivityFilter>('all');

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return activity.filter((s) => s.state === 'active');
      case 'inactive':
        return activity.filter((s) => s.state === 'inactive');
      case 'needs_attention':
        return activity.filter((s) => s.needsAttention);
      case 'raised_hand':
        return activity.filter((s) => s.hasRaisedHand);
      default:
        return activity;
    }
  }, [activity, filter]);

  const counts = useMemo(
    () => ({
      all: activity.length,
      active: activity.filter((s) => s.state === 'active').length,
      inactive: activity.filter((s) => s.state === 'inactive').length,
      needs_attention: activity.filter((s) => s.needsAttention).length,
      raised_hand: activity.filter((s) => s.hasRaisedHand).length,
    }),
    [activity]
  );

  return { activity: filtered, allActivity: activity, filter, setFilter, counts };
}