import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface PollCreatorProps {
  onCreate: (question: string, options: string[]) => void;
  onCancel: () => void;
}

export default function PollCreator({ onCreate, onCancel }: PollCreatorProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const addOption = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [...prev, '']);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return; // a poll needs at least 2 options
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const validOptions = options.map((o) => o.trim()).filter(Boolean);
  const canCreate = question.trim().length > 0 && validOptions.length >= 2;

  const handleCreate = () => {
    if (!canCreate) return;
    onCreate(question.trim(), validOptions);
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
      <label className="mb-1.5 block text-xs font-medium text-slate-400">Question</label>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What would you like to ask?"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
      />

      <label className="mb-1.5 mt-3 block text-xs font-medium text-slate-400">Options</label>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#238B45]"
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(i)}
                aria-label={`Remove option ${i + 1}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-700 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {options.length < 6 && (
        <button
          onClick={addOption}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#42CE70] hover:text-[#238B45]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add option
        </button>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-slate-700 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={!canCreate}
          className="flex-1 rounded-lg bg-[#238B45] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#036724] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}