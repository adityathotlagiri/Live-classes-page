import { useState, useCallback } from 'react';
import type { EngagementEvent, EngagementSignal } from '@/types/engagement';
import { mockEngagementEvents } from '@/data/mockEngagementData';

export function useEngagement(currentUserId: string, currentUserName: string) {
  const [events, setEvents] = useState<EngagementEvent[]>(mockEngagementEvents);

  const sendSignal = useCallback(
    (type: EngagementSignal, message?: string) => {
      const newEvent: EngagementEvent = {
        id: `eng-${Date.now()}`,
        studentId: currentUserId,
        studentName: currentUserName,
        type,
        message,
        timestamp: new Date().toISOString(),
        acknowledged: false,
      };
      setEvents((prev) => [...prev, newEvent]);
    },
    [currentUserId, currentUserName]
  );

  // Lets a student lower their own raised hand, or a teacher clear it
  const withdrawSignal = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }, []);

  const acknowledge = useCallback((eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, acknowledged: true } : e))
    );
  }, []);

  // Convenience: is the CURRENT user's hand currently raised?
  const myRaisedHandEvent = events.find(
    (e) => e.studentId === currentUserId && e.type === 'raised_hand'
  );

  const raisedHands = events.filter((e) => e.type === 'raised_hand');
  const unacknowledgedCount = raisedHands.filter((e) => !e.acknowledged).length;

  return {
    events,
    sendSignal,
    withdrawSignal,
    acknowledge,
    myRaisedHandEvent,
    raisedHands,
    unacknowledgedCount,
  };
}