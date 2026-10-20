import React from 'react';
import { Calendar, MapPin, DollarSign, Utensils, Sparkles, BookOpen } from 'lucide-react';

export function FilterChips({ activeFilter, onSelectFilter }) {
  const filters = [
    { id: 'All', label: 'All Discovery', icon: Sparkles },
    { id: 'Today', label: 'Today', icon: Calendar },
    { id: 'Nearby', label: 'Nearby (<1km)', icon: MapPin },
    { id: 'Cheap', label: 'Cheap / Free', icon: DollarSign },
    { id: 'Food', label: 'Food & Drinks', icon: Utensils },
    { id: 'Events', label: 'Events & Workshops', icon: Sparkles },
    { id: 'Study Spots', label: 'Quiet Study Spots', icon: BookOpen }
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      {filters.map((f) => {
        const Icon = f.icon;
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onSelectFilter(f.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}
