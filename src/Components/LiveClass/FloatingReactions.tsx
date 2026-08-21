interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
}

interface FloatingReactionsProps {
  reactions: FloatingReaction[];
}

export default function FloatingReactions({ reactions }: FloatingReactionsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {reactions.map((r) => (
        <span
          key={r.id}
          className="absolute bottom-4 animate-float-up text-4xl"
          style={{ left: `${r.left}%` }}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  );
}