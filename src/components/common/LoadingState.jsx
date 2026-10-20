import React from 'react';

export function LoadingState({ message = 'Loading spatial memory layer...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping" />
        <div className="relative w-12 h-12 rounded-2xl border border-white/20 glass-panel flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-300">{message}</p>
    </div>
  );
}
