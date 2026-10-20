import React from 'react';
import { Brain, Layers, Users, Briefcase, Compass, Check } from 'lucide-react';

export function PillarPicker({ selectedPillars, onTogglePillar }) {
  const options = [
    {
      id: 'memory',
      title: 'I keep forgetting assignment deadlines & exam dates',
      pillar: 'Memory',
      icon: Brain,
      color: 'border-amber-500/40 text-amber-300'
    },
    {
      id: 'exchange',
      title: 'I need better study notes & repeat PYQs before exams',
      pillar: 'Exchange',
      icon: Layers,
      color: 'border-teal-500/40 text-teal-300'
    },
    {
      id: 'connect',
      title: 'I need a study buddy, roommate, or project partner',
      pillar: 'Connect',
      icon: Users,
      color: 'border-violet-500/40 text-violet-300'
    },
    {
      id: 'opportunities',
      title: 'I want internship opportunities, referrals, and hackathons',
      pillar: 'Opportunities',
      icon: Briefcase,
      color: 'border-blue-500/40 text-blue-300'
    },
    {
      id: 'explore',
      title: 'I want to discover quiet study cafes and campus events',
      pillar: 'Explore',
      icon: Compass,
      color: 'border-emerald-500/40 text-emerald-300'
    }
  ];

  return (
    <div className="space-y-3 my-6 max-w-xl mx-auto">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = selectedPillars.includes(opt.id);

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onTogglePillar(opt.id)}
            className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
              isSelected
                ? `bg-white/10 ${opt.color} shadow-lg shadow-black/20`
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-mono uppercase text-slate-400 block">{opt.pillar}</span>
                <span className="text-sm font-semibold text-white">{opt.title}</span>
              </div>
            </div>

            <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
              isSelected ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-white/20'
            }`}>
              {isSelected && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
