import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import type { ChatMessage } from '@/types/liveClass';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface ChatPanelProps {
  messages: ChatMessage[];
  currentUserId: string;
  charLimit: number;
  onSend: (content: string) => void;
  onClose: () => void;
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default function ChatPanel({
  messages,
  currentUserId,
  charLimit,
  onSend,
  onClose,
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEscapeKey(onClose, true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const isOverLimit = input.length > charLimit;

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:static sm:z-auto sm:bg-transparent">
      <div
        role="dialog"
        aria-label="Live chat"
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 sm:w-80 sm:max-w-none"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5">
          <h2 className="text-sm font-semibold text-white">Live Chat</h2>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-slate-500">No messages yet</p>
              <p className="mt-1 text-xs text-slate-600">Say something to start the conversation</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {messages.map((msg) => {
                const isMine = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={isMine ? 'text-right' : ''}>
                    <div
                      className="mb-0.5 flex items-baseline gap-2"
                      style={{ justifyContent: isMine ? 'flex-end' : 'flex-start' }}
                    >
                      <span className="text-xs font-semibold text-emerald-400">
                        {isMine ? 'You' : msg.senderName}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    </div>
                    <div
                      className={`inline-block max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                        isMine
                          ? 'rounded-tr-sm bg-[#238B45] text-white'
                          : 'rounded-tl-sm bg-slate-800 text-slate-100'
                      }`}
                    >
                      <p className="wrap-break-word">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 p-3">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
              />
              {input.length > charLimit * 0.8 && (
                <p
                  className={`mt-1 text-right text-[10px] ${
                    isOverLimit ? 'text-red-400' : 'text-slate-500'
                  }`}
                >
                  {input.length}/{charLimit}
                </p>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isOverLimit}
              aria-label="Send message"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${
                input.trim() && !isOverLimit
                  ? 'bg-[#238B45] text-white hover:bg-[#036724]'
                  : 'cursor-not-allowed bg-slate-800 text-slate-600'
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}