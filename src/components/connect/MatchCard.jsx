import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { CompatibilityRadar } from './CompatibilityRadar';
import { Heart, X, Sparkles, Check, ChevronDown, ChevronUp, Users, BookOpen, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';

export function MatchCard({ candidate, mode = 'study_buddy', onSwipeLeft, onSwipeRight }) {
  const [showRadar, setShowRadar] = useState(false);

  if (!candidate) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <GlassCard glow="connect" className="p-6 border-violet-500/30 relative overflow-hidden shadow-[0_20px_50px_rgba(139,92,246,0.15)]">
        {/* Compatibility Percentage Badge */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-violet-500/30 flex items-center gap-1 border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{candidate.compatibility}% Match</span>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-400/40 shadow-md"
          />
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{candidate.name}</h3>
            <p className="text-xs text-slate-300 font-medium">{candidate.course} • {candidate.year}</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-violet-300 border border-white/10 uppercase tracking-wider font-semibold">
              {mode.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Why You Match Reasons */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-4 text-xs">
          <span className="font-semibold text-violet-300 flex items-center gap-1 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Why Unisphere Matched You:
          </span>
          <ul className="space-y-1 text-slate-300 list-disc list-inside">
            {candidate.reasons?.map((reason, idx) => (
              <li key={idx} className="leading-snug">{reason}</li>
            ))}
          </ul>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Study Style</span>
            <span className="text-slate-200 font-medium truncate block">{candidate.studyStyle}</span>
          </div>
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Study Hours</span>
            <span className="text-slate-200 font-medium truncate block">{candidate.studyHours}</span>
          </div>
        </div>

        {/* Shared Interests / Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.interests?.map((interest, i) => (
            <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-200 border border-violet-500/20 font-medium">
              #{interest}
            </span>
          ))}
        </div>

        {/* Radar Toggle */}
        <button
          onClick={() => setShowRadar(!showRadar)}
          className="w-full py-1.5 text-xs text-slate-400 hover:text-violet-300 flex items-center justify-center gap-1 transition-colors border-t border-white/10 mb-4"
        >
          <span>{showRadar ? 'Hide' : 'Show'} Compatibility Radar</span>
          {showRadar ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showRadar && <CompatibilityRadar candidate={candidate} mode={mode} />}

        {/* Swipe Action Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => onSwipeLeft(candidate.id)}
            className="flex-1 py-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 flex items-center justify-center gap-2 transition-all font-semibold text-xs"
          >
            <X className="w-4 h-4" />
            <span>Pass</span>
          </button>

          <button
            onClick={() => onSwipeRight(candidate.id)}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all border border-white/20"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Connect</span>
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
