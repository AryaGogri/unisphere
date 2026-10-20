import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Sparkles, ArrowRight, MessageSquare, Flame } from 'lucide-react';

export function PreExamBanner({ subject = 'DBMS', examName = 'DBMS Internal 1', daysLeft = 4 }) {
  return (
    <GlassCard glow="exchange" className="p-5 border-teal-500/30 mb-8 bg-gradient-to-r from-teal-950/40 via-slate-900/60 to-slate-950/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 uppercase tracking-wider border border-teal-500/30">
                Pre-Exam Exchange Focus
              </span>
              <span className="text-xs text-amber-300 font-semibold">{daysLeft} days remaining</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {subject}: {examName}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              24 students actively discussing repeat PYQs & normalization derivations
            </p>
          </div>
        </div>

        <a
          href="#threads"
          className="glass-button text-xs px-4 py-2 bg-teal-500/80 hover:bg-teal-500 text-slate-950 font-semibold border-teal-300/40 shrink-0 self-start sm:self-center"
        >
          <span>Open Exam Thread</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </GlassCard>
  );
}
