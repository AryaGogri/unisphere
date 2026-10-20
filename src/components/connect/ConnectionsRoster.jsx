import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  ShieldCheck,
  Flame,
  Award,
  BookOpen,
  Home,
  Code2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { SpatialCard } from '../common/SpatialCard';

export function ConnectionsRoster({ connections, onOpenChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = connections.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-400" />
            <span>Active Connections ({connections.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Classmates, study buddies, and squad teammates you have mutually connected with.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search connections or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All Peers' },
          { id: 'study_buddy', label: 'Study Buddies' },
          { id: 'project', label: 'Project Squads' },
          { id: 'roommate', label: 'Roommates' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-full border transition-all ${
              activeCategory === tab.id
                ? 'bg-violet-500/25 border-violet-400 text-white font-semibold'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Active Connected Peers */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((peer) => (
            <SpatialCard
              key={peer.id}
              glow="connect"
              depth={22}
              className="p-5 bg-slate-900/70 border-violet-500/20 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Peer Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-12 h-12 rounded-xl object-cover border border-violet-400/40"
                      />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 absolute -bottom-0.5 -right-0.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">{peer.name}</h3>
                      <p className="text-[11px] text-slate-400">{peer.course} • {peer.year}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold block">
                      {peer.compatibility}% Match
                    </span>
                  </div>
                </div>

                {/* Common Focus & Study hours */}
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5 space-y-1 text-xs mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Study Hours:</span>
                    <span className="text-slate-200 font-mono">{peer.studyHours || '7 PM - 11 PM'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Overlap Window:</span>
                    <span className="text-emerald-300 font-mono">Wed 2PM-5PM</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {peer.skills?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chat action button */}
              <button
                onClick={() => onOpenChat(peer)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-violet-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Chat & Coordinate</span>
              </button>
            </SpatialCard>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
          <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-white">No connections match this filter</p>
          <p className="text-xs text-slate-400 mt-1">
            Swipe right in the Match Engine or join Squads to grow your verified peer network.
          </p>
        </div>
      )}
    </div>
  );
}
