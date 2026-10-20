import React from 'react';
import { motion } from 'motion/react';
import { Brain, Layers, Users, Briefcase, Compass, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SpatialCard } from '../common/SpatialCard';

export function ScrollStory() {
  const pillars = [
    {
      id: 'memory',
      glow: 'memory',
      title: 'Remember what you forgot.',
      subtitle: 'MEMORY PILLAR',
      color: 'from-amber-500/20 via-amber-600/10 to-transparent border-amber-500/30 text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      icon: Brain,
      desc: 'Passively captures text, photos of notice boards, and voice notes. Automatically parses fuzzy dates like "next Monday" or "after Diwali" and escalates urgency so you never miss a submission.',
      bullets: ['Fuzzy date & time NLP parser', 'Urgency escalation pipeline', 'Timetable PDF auto-parsing'],
      preview: {
        title: 'DBMS Assignment 3 Due',
        meta: 'Auto-extracted from blackboard photo',
        urgency: 'URGENT: 2 Days Left',
        confidence: '98.4% Confidence'
      }
    },
    {
      id: 'exchange',
      glow: 'exchange',
      title: 'Know what actually matters.',
      subtitle: 'EXCHANGE PILLAR',
      color: 'from-teal-500/20 via-teal-600/10 to-transparent border-teal-500/30 text-teal-300',
      badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      icon: Layers,
      desc: 'Academic peer knowledge exchange. Discussion threads automatically surface what topics repeat in PYQs before exam day, backed by contributor trust scores and relevance decay.',
      bullets: ['Pre-exam thread banners', 'Trust score badges for notes', 'Relevance decay algorithm'],
      preview: {
        title: 'Operating Systems Normalization',
        meta: 'Repeated in 4 of last 5 year endsems',
        urgency: 'Exam in 3 Days',
        confidence: '94% PYQ Match'
      }
    },
    {
      id: 'connect',
      glow: 'connect',
      title: 'Find people who fit.',
      subtitle: 'CONNECT PILLAR',
      color: 'from-violet-500/20 via-violet-600/10 to-transparent border-violet-500/30 text-violet-300',
      badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      icon: Users,
      desc: 'One unified compatibility matching engine for Roommates, Study Buddies, Social Friends, and Project Teammates with explainable match percentages and mutual opt-in.',
      bullets: ['4-in-1 matching engine', 'Compatibility radar breakdown', '3D mutual match reveal'],
      preview: {
        title: 'Ananya Sharma',
        meta: 'Shared Study Hours (7PM-11PM) • Quiet Focus',
        urgency: '92% Compatibility',
        confidence: 'Mutual Study Buddy'
      }
    },
    {
      id: 'opportunities',
      glow: 'opportunity',
      title: 'Discover what is next.',
      subtitle: 'OPPORTUNITIES PILLAR',
      color: 'from-blue-500/20 via-blue-600/10 to-transparent border-blue-500/30 text-blue-300',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      icon: Briefcase,
      desc: 'Peer-created internships, hackathon teammate requests, freelance campus contracts, and alumni referral drops matched directly to your skill profile.',
      bullets: ['Skill relevance scoring', 'Alumni referral tagging', 'Direct resume drop pipeline'],
      preview: {
        title: 'Full Stack Dev Intern',
        meta: 'Nexus Robotics Lab • Alumni Referral Ready',
        urgency: 'Deadline: 4 Days',
        confidence: 'Skill Match: React + Python'
      }
    },
    {
      id: 'explore',
      glow: 'explore',
      title: 'See what is happening around you.',
      subtitle: 'EXPLORE PILLAR',
      color: 'from-emerald-500/20 via-emerald-600/10 to-transparent border-emerald-500/30 text-emerald-300',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      icon: Compass,
      desc: 'Daily campus discovery loop tailored to your free timetable windows and weekly leisure budget. Uncover quiet study cafes, pop-up workshops, and affordable food spots.',
      bullets: ['Free timetable slot match', 'Weekly leisure budget slider', 'Interactive campus spatial map'],
      preview: {
        title: 'Free GenAI Hands-on Workshop',
        meta: 'Computer Auditorium • Free Snacks & Swag',
        urgency: 'Fits Your 2PM-5PM Gap',
        confidence: '0.4 km away'
      }
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-28">
      {pillars.map((pillar, idx) => {
        const Icon = pillar.icon;
        const isEven = idx % 2 === 0;

        return (
          <motion.div
            key={pillar.id}
            id={pillar.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
          >
            {/* Story Text */}
            <div className="flex-1 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase font-semibold ${pillar.badgeBg}`}>
                <Icon className="w-3.5 h-3.5" />
                <span>{pillar.subtitle}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {pillar.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {pillar.desc}
              </p>

              <ul className="space-y-2.5 pt-2">
                {pillar.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  to={`/${pillar.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
                >
                  <span>Explore the {pillar.subtitle.split(' ')[0]} Layer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Spatial 3D Interactive Card Preview */}
            <div className="flex-1 w-full max-w-lg">
              <SpatialCard
                glow={pillar.glow}
                depth={36}
                intensity={1.2}
                className={`p-8 bg-gradient-to-br ${pillar.color} border shadow-2xl rounded-3xl relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950/80 border border-white/20 flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 uppercase tracking-wider">
                      PILLAR 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                <div className="bg-slate-950/70 p-5 rounded-2xl border border-white/10 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{pillar.preview.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10">
                      {pillar.preview.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.preview.meta}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-indigo-300">
                      <Zap className="w-3 h-3" />
                      {pillar.preview.confidence}
                    </span>
                    <span className="text-slate-500">Auto-Synced</span>
                  </div>
                </div>
              </SpatialCard>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

