import { useState, useCallback } from 'react';
import type { Announcement, AnnouncementPriority } from '@/types/engagement';
import { mockAnnouncements } from '@/data/mockEngagementData';

export function useAnnouncements(teacherName: string) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    (title: string, message: string, priority: AnnouncementPriority) => {
      if (message.length > 500) {
        setError('Message is too long. Please shorten it and try again.');
        return;
      }
      setError(null);
      const newAnnouncement: Announcement = {
        id: `ann-${Date.now()}`,
        title,
        message,
        teacherName,
        timestamp: new Date().toISOString(),
        priority,
        pinned: false,
        readByCurrentUser: true,
      };
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
    },
    [teacherName]
  );

  const edit = useCallback((id: string, title: string, message: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, title, message } : a))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  }, []);

  const toggleImportant = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, priority: a.priority === 'important' ? 'normal' : 'important' }
          : a
      )
    );
  }, []);

  const markAsRead = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, readByCurrentUser: true } : a))
    );
  }, []);

  const sorted = [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const unreadCount = announcements.filter((a) => !a.readByCurrentUser).length;

  return {
    announcements: sorted,
    unreadCount,
    error,
    clearError: () => setError(null),
    create,
    edit,
    remove,
    togglePin,
    toggleImportant,
    markAsRead,
  };
}