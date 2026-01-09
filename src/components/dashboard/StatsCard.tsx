interface StatsCardProps {
  count: number;
}

export function StatsCard({ count }: StatsCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            Active Review Requests
          </p>
          <p className="text-3xl font-bold text-white mt-2">{count}</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

