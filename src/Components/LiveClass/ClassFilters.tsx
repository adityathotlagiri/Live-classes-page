import { Search, X } from 'lucide-react';
import type { ClassStatus } from '@/types/liveClass';

export type FilterTab = 'all' | ClassStatus;

interface ClassFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'live', label: 'Live' },
  { key: 'completed', label: 'Completed' },
];

export default function ClassFilters({
  searchValue,
  onSearchChange,
  activeTab,
  onTabChange,
  counts,
}: ClassFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid grid-cols-2 gap-2 xs:grid-cols-4 sm:flex sm:gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] sm:shrink-0 sm:px-4 ${
              activeTab === tab.key
                ? 'bg-[#238B45] text-white shadow-sm shadow-emerald-200 hover:bg-[#036724]'
                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-[#238B45]'
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 ${
                activeTab === tab.key ? 'text-emerald-100' : 'text-slate-400'
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by class or course..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition-colors focus:border-[#238B45] focus:ring-2 focus:ring-[#238B45]/20"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}