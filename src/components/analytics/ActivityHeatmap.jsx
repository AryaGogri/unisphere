import React from 'react';

export function ActivityHeatmap() {
  const weeks = Array.from({ length: 12 });
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="w-full my-2">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((_, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {days.map((d, dIdx) => {
              const level = (wIdx + dIdx) % 4;
              const colors = ['bg-white/5', 'bg-indigo-900/40', 'bg-indigo-600/60', 'bg-indigo-400'];
              return (
                <div
                  key={dIdx}
                  title={`Week ${wIdx + 1}, ${d}: ${level * 3} captures & notes`}
                  className={`w-3.5 h-3.5 rounded-sm ${colors[level]} border border-white/5`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
