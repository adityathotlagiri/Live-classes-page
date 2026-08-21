import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/types/liveClass';
import { mockChatMessages } from '@/data/mockClasses';

const CHAR_LIMIT = 500;

export function useChat(currentUserId: string, currentUserName: string) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length > CHAR_LIMIT) return;

      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        senderName: currentUserName,
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [currentUserId, currentUserName]
  );

  // Simulates another participant sending a message (for demoing unread badges)
  const receiveMessage = useCallback((senderId: string, senderName: string, content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setUnreadCount((prev) => (isOpen ? prev : prev + 1));
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => setIsOpen(false), []);

  return {
    messages,
    unreadCount,
    isOpen,
    sendMessage,
    receiveMessage,
    openChat,
    closeChat,
    charLimit: CHAR_LIMIT,
  };
}