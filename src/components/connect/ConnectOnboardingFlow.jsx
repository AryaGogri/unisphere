import React from 'react';
import { BookOpen, Home, Smile, Code2 } from 'lucide-react';

export function ConnectOnboardingFlow({ currentMode, onSelectMode }) {
  const modes = [
    { id: 'study_buddy', label: 'Study Buddy', icon: BookOpen, desc: 'Shared subjects & study hours' },
    { id: 'roommate', label: 'Roommate', icon: Home, desc: 'Sleep schedule, cleanliness & budget' },
    { id: 'social', label: 'Social Friends', icon: Smile, desc: 'Hobbies, clubs & weekend vibes' },
    { id: 'project', label: 'Project Partner', icon: Code2, desc: 'Tech stack, skills & hackathons' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = currentMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelectMode(m.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              isActive
                ? 'bg-violet-500/20 border-violet-400 text-white shadow-lg shadow-violet-500/10'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${isActive ? 'bg-violet-500 text-white' : 'bg-white/10 text-slate-300'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white mb-0.5">{m.label}</h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">{m.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
