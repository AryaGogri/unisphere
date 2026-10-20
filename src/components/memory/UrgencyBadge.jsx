import React from 'react';

export function UrgencyBadge({ urgency }) {
  const configs = {
    critical: { label: 'Due Today', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    high: { label: 'High Urgency (1d)', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    medium: { label: 'Medium (2-3d)', bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
    moderate: { label: 'Moderate (4-7d)', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    subtle: { label: 'Upcoming', bg: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
    overdue: { label: 'Overdue', bg: 'bg-red-600/30 text-red-200 border-red-500/50 animate-pulse' }
  };

  const config = configs[urgency] || configs.subtle;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${config.bg}`}>
      {config.label}
    </span>
  );
}
