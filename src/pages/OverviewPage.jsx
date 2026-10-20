import React from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { QuickCaptureInput } from '../components/memory/QuickCaptureInput';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { PageTransition } from '../components/common/PageTransition';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { Brain, Layers, Users, Briefcase, Compass, ArrowRight, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OverviewPage() {
  const { user } = useAuth();
  const { memories, exchangeThreads, candidates, opportunities, exploreEvents } = useUser();

  const urgentMemories = memories.filter(m => !m.completed && (m.urgency === 'critical' || m.urgency === 'high'));

  return (
    <DashboardShell>
      <PageTransition className="space-y-8">
        {/* Top Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good day, {user?.name?.split(' ')[0] || 'Tirth'}.
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Here's what changed across your campus layer since you last checked.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Campus Sync Active</span>
            </span>
          </div>
        </div>

        {/* Quick Capture Component */}
        <QuickCaptureInput />

        {/* 5 Connected Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 — Memory */}
          <GlassCard glow="memory" className="p-6 border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Brain className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Memory</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {urgentMemories.length} Urgent
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">3 items need your attention</h3>
              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                {memories.slice(0, 2).map((m) => (
                  <li key={m.id} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <span className="truncate font-medium">{m.title}</span>
                    <span className="text-[10px] text-amber-300 shrink-0 ml-2">{m.formattedDate}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/memory">
              <GlassButton size="sm" icon={ArrowRight} className="w-full justify-between bg-amber-500/20 text-amber-200 border-amber-500/30">
                <span>Open Memory Layer</span>
              </GlassButton>
            </Link>
          </GlassCard>

          {/* Pillar 2 — Exchange */}
          <GlassCard glow="exchange" className="p-6 border-teal-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-teal-400">
                  <Layers className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Exchange</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                  Pre-Exam Active
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">DBMS Internal in 4 days</h3>
              <p className="text-xs text-slate-300 mb-4">
                24 students discussing repeat PYQs & normalization derivations
              </p>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-teal-200 mb-6">
                <span className="font-semibold block text-slate-200">Top Handnote:</span>
                "{exchangeThreads[0]?.title}"
              </div>
            </div>

            <Link to="/exchange">
              <GlassButton size="sm" icon={ArrowRight} className="w-full justify-between bg-teal-500/20 text-teal-200 border-teal-500/30">
                <span>View Exam Threads</span>
              </GlassButton>
            </Link>
          </GlassCard>

          {/* Pillar 3 — Connect */}
          <GlassCard glow="connect" className="p-6 border-violet-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-violet-400">
                  <Users className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Connect</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30">
                  {candidates.length} Matches
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">4 new potential peer matches</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-6">
                <img
                  src={candidates[0]?.avatar}
                  alt={candidates[0]?.name}
                  className="w-10 h-10 rounded-full object-cover border border-violet-400"
                />
                <div className="text-xs min-w-0">
                  <span className="font-semibold text-white block truncate">{candidates[0]?.name} (92% Match)</span>
                  <span className="text-slate-400 block truncate">Studies DBMS after 7 PM • Quiet focus</span>
                </div>
              </div>
            </div>

            <Link to="/connect">
              <GlassButton size="sm" icon={ArrowRight} className="w-full justify-between bg-violet-500/20 text-violet-200 border-violet-500/30">
                <span>Open Peer Deck</span>
              </GlassButton>
            </Link>
          </GlassCard>

          {/* Pillar 4 — Opportunities */}
          <GlassCard glow="opportunity" className="p-6 border-blue-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Opportunities</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  {opportunities.length} Available
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">2 internships match your skills</h3>
              <p className="text-xs text-slate-300 mb-6">
                "{opportunities[0]?.title}" by {opportunities[0]?.author} (Referral Available)
              </p>
            </div>

            <Link to="/opportunities">
              <GlassButton size="sm" icon={ArrowRight} className="w-full justify-between bg-blue-500/20 text-blue-200 border-blue-500/30">
                <span>Browse Opportunities</span>
              </GlassButton>
            </Link>
          </GlassCard>

          {/* Pillar 5 — Explore */}
          <GlassCard glow="explore" className="p-6 border-emerald-500/30 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Compass className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase">Explore</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Free Window 2PM-5PM
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">7 things happening nearby today</h3>
              <p className="text-xs text-slate-300 mb-4">
                Free GenAI Workshop at Computer Auditorium (0.4 km) • Free pizza & certificates
              </p>
            </div>

            <Link to="/explore">
              <GlassButton size="sm" icon={ArrowRight} className="w-full justify-between bg-emerald-500/20 text-emerald-200 border-emerald-500/30">
                <span>Open Explore Map</span>
              </GlassButton>
            </Link>
          </GlassCard>
        </div>
      </PageTransition>
    </DashboardShell>
  );
}
