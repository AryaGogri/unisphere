import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { UrgencyBadge } from './UrgencyBadge';
import { useUser } from '../../context/UserContext';
import { Check, Trash2, Calendar, Clock, Sparkles, Tag, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function ReminderCard({ reminder }) {
  const { toggleMemoryComplete, deleteMemory } = useUser();

  const isUrgent = reminder.urgency === 'critical' || reminder.urgency === 'high';

  return (
    <GlassCard
      glow={isUrgent ? 'memory' : null}
      className={`p-4 transition-all ${
        reminder.completed ? 'opacity-50 grayscale-[40%]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <button
            onClick={() => toggleMemoryComplete(reminder.id)}
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              reminder.completed
                ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                : 'border-white/30 hover:border-amber-400 bg-white/5'
            }`}
          >
            {reminder.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <div className="flex flex-col min-w-0">
            <h4 className={`text-sm font-semibold text-white tracking-tight ${reminder.completed ? 'line-through text-slate-400' : ''}`}>
              {reminder.title}
            </h4>

            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                <Tag className="w-3 h-3 text-amber-400" />
                {reminder.subject}
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-medium border border-white/10">
                {reminder.category}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-amber-300/90 font-medium">
                <Clock className="w-3 h-3" />
                {reminder.formattedDate}
              </span>
            </div>

            {reminder.source && (
              <span className="text-[10px] text-slate-400 mt-1 font-mono">
                Source: {reminder.source} ({reminder.confidence}% confidence)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <UrgencyBadge urgency={reminder.urgency} />
          <button
            onClick={() => deleteMemory(reminder.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Delete memory"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
