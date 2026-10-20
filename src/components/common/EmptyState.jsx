import React from 'react';
import { GlassCard } from './GlassCard';

export function EmptyState({ icon: Icon, title, description, actionText, onAction }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border-dashed border-white/15">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-indigo-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="glass-button text-xs px-4 py-2 hover:bg-white/15 transition-all"
        >
          {actionText}
        </button>
      )}
    </GlassCard>
  );
}
