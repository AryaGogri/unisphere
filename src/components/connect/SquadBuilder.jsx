import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Code2, 
  Palette, 
  Database, 
  Cpu, 
  Presentation, 
  Send, 
  Flame, 
  Trophy, 
  Calendar, 
  Search, 
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { SpatialCard } from '../common/SpatialCard';
import { GlassButton } from '../common/GlassButton';

const ROLE_ICONS = {
  frontend: Palette,
  backend: Database,
  ai_ml: Cpu,
  pitch_lead: Presentation,
  fullstack: Code2
};

const INITIAL_SQUADS = [
  {
    id: 'squad_1',
    title: 'SmartCampus AI Vision',
    hackathon: 'DevFolio HackQuest 2026',
    timeline: 'Starts in 4 days (Aug 20)',
    track: 'AI & Smart Cities',
    lead: {
      name: 'Kabir Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      role: 'Full Stack & System Lead',
      course: 'CSE Year 3'
    },
    pitch: 'Building real-time lecture audio summarizer and dynamic notice board OCR parser for university students.',
    rolesNeeded: [
      { id: 'r1', roleName: 'AI / ML Engineer', icon: 'ai_ml', skills: ['Gemini API', 'PyTorch', 'Embeddings'], filled: false, applicantCount: 3 },
      { id: 'r2', roleName: 'UI / UX Designer', icon: 'frontend', skills: ['Figma', 'Tailwind', 'Design Systems'], filled: true, filledBy: 'Diya Sengupta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
      { id: 'r3', roleName: 'Pitch & Demo Lead', icon: 'pitch_lead', skills: ['Slide Decks', 'Storytelling', 'Video'], filled: false, applicantCount: 1 }
    ],
    membersCount: 2,
    maxMembers: 4,
    compatibilityScore: 94
  },
  {
    id: 'squad_2',
    title: 'PulseRate Campus HealthTech',
    hackathon: 'Smart India Hackathon (SIH)',
    timeline: 'Final Submission: Aug 28',
    track: 'Healthcare & IoT',
    lead: {
      name: 'Diya Sengupta',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      role: 'Product Lead & AI Research',
      course: 'AI & Data Science Year 3'
    },
    pitch: 'Contactless vital signs & stress check using webcam micro-facial photoplethysmography (rPPG) during exam weeks.',
    rolesNeeded: [
      { id: 'r4', roleName: 'Backend & Cloud Architect', icon: 'backend', skills: ['FastAPI', 'PostgreSQL', 'Docker'], filled: false, applicantCount: 2 },
      { id: 'r5', roleName: 'Mobile / Frontend Dev', icon: 'frontend', skills: ['React', 'WebRTC', 'Canvas'], filled: true, filledBy: 'Aanya Kulkarni', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' }
    ],
    membersCount: 2,
    maxMembers: 3,
    compatibilityScore: 91
  },
  {
    id: 'squad_3',
    title: 'ZeroWaste Canteen Logistics',
    hackathon: 'Sustainability Innovation Cup',
    timeline: 'Registration closing tomorrow',
    track: 'Supply Chain & Green Tech',
    lead: {
      name: 'Siddharth Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Backend & DevOps',
      course: 'IT Year 3'
    },
    pitch: 'Predictive canteen food preparation analytics matching daily student timetable attendance to prevent excess waste.',
    rolesNeeded: [
      { id: 'r6', roleName: 'Frontend Engineer', icon: 'frontend', skills: ['React', 'Chart.js / Recharts', 'PWA'], filled: false, applicantCount: 4 },
      { id: 'r7', roleName: 'Data Scientist', icon: 'ai_ml', skills: ['Time-series Forecasting', 'Pandas'], filled: false, applicantCount: 2 }
    ],
    membersCount: 1,
    maxMembers: 3,
    compatibilityScore: 88
  }
];

export function SquadBuilder({ onOpenChatWithUser }) {
  const [squads, setSquads] = useState(INITIAL_SQUADS);
  const [filterTrack, setFilterTrack] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [appliedRoles, setAppliedRoles] = useState({});
  const [newSquad, setNewSquad] = useState({
    title: '',
    hackathon: 'DevFolio HackQuest 2026',
    track: 'AI & Web',
    pitch: '',
    role1Name: 'Frontend Developer',
    role1Skills: 'React, Tailwind, Framer Motion',
    role2Name: 'Backend & AI Engineer',
    role2Skills: 'Python, FastAPI, Vector Search'
  });

  const handleApply = (squadId, roleId, roleName, squadTitle, leadName) => {
    setAppliedRoles(prev => ({
      ...prev,
      [`${squadId}_${roleId}`]: true
    }));
  };

  const handleCreateSquad = (e) => {
    e.preventDefault();
    if (!newSquad.title || !newSquad.pitch) return;

    const created = {
      id: `squad_${Date.now()}`,
      title: newSquad.title,
      hackathon: newSquad.hackathon,
      timeline: 'Registration Open',
      track: newSquad.track,
      lead: {
        name: 'Tirth Mehta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'Squad Founder',
        course: 'CSE Year 3'
      },
      pitch: newSquad.pitch,
      rolesNeeded: [
        {
          id: `r_${Date.now()}_1`,
          roleName: newSquad.role1Name,
          icon: 'frontend',
          skills: newSquad.role1Skills.split(',').map(s => s.trim()),
          filled: false,
          applicantCount: 0
        },
        {
          id: `r_${Date.now()}_2`,
          roleName: newSquad.role2Name,
          icon: 'backend',
          skills: newSquad.role2Skills.split(',').map(s => s.trim()),
          filled: false,
          applicantCount: 0
        }
      ],
      membersCount: 1,
      maxMembers: 3,
      compatibilityScore: 98
    };

    setSquads([created, ...squads]);
    setShowCreateModal(false);
    setNewSquad({
      title: '',
      hackathon: 'DevFolio HackQuest 2026',
      track: 'AI & Web',
      pitch: '',
      role1Name: 'Frontend Developer',
      role1Skills: 'React, Tailwind, Framer Motion',
      role2Name: 'Backend & AI Engineer',
      role2Skills: 'Python, FastAPI, Vector Search'
    });
  };

  const filteredSquads = squads.filter(s => filterTrack === 'All' || s.track.toLowerCase().includes(filterTrack.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-violet-900/30 via-indigo-900/20 to-teal-900/20 p-5 rounded-2xl border border-violet-500/25">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-300 font-mono text-xs font-semibold uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Role-Based Hackathon Teaming</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Hackathon & Project Squad Builder
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Assemble high-synergy squads for upcoming hackathons, semester capstones, and research labs. Match missing team roles by exact verified skill stack and past performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setShowCreateModal(true)}
            className="shadow-lg shadow-violet-500/20 whitespace-nowrap"
          >
            Create a Squad
          </GlassButton>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-mono text-[11px] mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {['All', 'AI', 'Healthcare', 'Supply Chain', 'Green Tech'].map((track) => (
          <button
            key={track}
            onClick={() => setFilterTrack(track)}
            className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              filterTrack === track
                ? 'bg-violet-500/25 border-violet-400 text-white shadow-sm'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {/* Squad Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSquads.map((squad) => (
          <SpatialCard
            key={squad.id}
            glow="connect"
            depth={28}
            className="p-6 bg-slate-900/60 border-violet-500/25 rounded-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Squad Meta */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-mono uppercase font-semibold">
                      {squad.track}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      {squad.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{squad.title}</h3>
                  <span className="text-xs text-amber-300 font-medium flex items-center gap-1 mt-0.5">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    {squad.hackathon}
                  </span>
                </div>

                <div className="text-right">
                  <div className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{squad.compatibilityScore}% Synergy</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">
                    {squad.membersCount}/{squad.maxMembers} Members
                  </span>
                </div>
              </div>

              {/* Lead Info */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={squad.lead.avatar}
                    alt={squad.lead.name}
                    className="w-10 h-10 rounded-xl object-cover border border-violet-400/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{squad.lead.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 font-mono">
                        Lead
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{squad.lead.course} • {squad.lead.role}</p>
                  </div>
                </div>

                {onOpenChatWithUser && (
                  <button
                    onClick={() => onOpenChatWithUser(squad.lead)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-violet-500/20 text-slate-300 hover:text-violet-200 text-xs font-medium border border-white/10 transition-colors flex items-center gap-1"
                    title="Direct Chat with Squad Lead"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                )}
              </div>

              {/* Pitch */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                "{squad.pitch}"
              </p>

              {/* Required Open & Filled Roles */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Squad Composition & Open Slots:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {squad.rolesNeeded.map((r) => {
                    const RoleIcon = ROLE_ICONS[r.icon] || Code2;
                    const hasApplied = appliedRoles[`${squad.id}_${r.id}`];

                    return (
                      <div
                        key={r.id}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          r.filled
                            ? 'bg-white/[0.02] border-white/5 opacity-70'
                            : 'bg-gradient-to-r from-violet-500/10 to-indigo-500/5 border-violet-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`p-2 rounded-lg ${r.filled ? 'bg-white/10 text-slate-400' : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'}`}>
                            <RoleIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{r.roleName}</span>
                              {r.filled ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Filled
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono animate-pulse">
                                  Open Role
                                </span>
                              )}
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {r.skills.map((sk, idx) => (
                                <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          {r.filled ? (
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <img src={r.avatar} alt={r.filledBy} className="w-5 h-5 rounded-full object-cover" />
                              <span>{r.filledBy}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApply(squad.id, r.id, r.roleName, squad.title, squad.lead.name)}
                              disabled={hasApplied}
                              className={`w-full sm:w-auto px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                hasApplied
                                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 cursor-default'
                                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/25'
                              }`}
                            >
                              {hasApplied ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Applied</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="w-3.5 h-3.5" />
                                  <span>Join Slot</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SpatialCard>
        ))}
      </div>

      {/* Create Squad Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900 border border-violet-500/30 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-violet-300 font-bold">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-base text-white">Create New Project / Hackathon Squad</span>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/5"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateSquad} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Squad / Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UniFlow AI Agent"
                    value={newSquad.title}
                    onChange={e => setNewSquad({ ...newSquad, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Hackathon</label>
                    <input
                      type="text"
                      value={newSquad.hackathon}
                      onChange={e => setNewSquad({ ...newSquad, hackathon: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Track / Category</label>
                    <input
                      type="text"
                      value={newSquad.track}
                      onChange={e => setNewSquad({ ...newSquad, track: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Squad Pitch & Idea Summary</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="What problem are you solving and what architecture will your team use?"
                    value={newSquad.pitch}
                    onChange={e => setNewSquad({ ...newSquad, pitch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                  />
                </div>

                {/* Role 1 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-bold text-violet-300 block">Role Needed #1</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role Name (e.g. Frontend)"
                      value={newSquad.role1Name}
                      onChange={e => setNewSquad({ ...newSquad, role1Name: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={newSquad.role1Skills}
                      onChange={e => setNewSquad({ ...newSquad, role1Skills: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Role 2 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-bold text-violet-300 block">Role Needed #2</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role Name (e.g. ML Lead)"
                      value={newSquad.role2Name}
                      onChange={e => setNewSquad({ ...newSquad, role2Name: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={newSquad.role2Skills}
                      onChange={e => setNewSquad({ ...newSquad, role2Skills: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/15 font-semibold"
                  >
                    Cancel
                  </button>
                  <GlassButton
                    variant="primary"
                    size="sm"
                    icon={Plus}
                  >
                    Publish Squad Listing
                  </GlassButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
