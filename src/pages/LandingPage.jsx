import React from 'react';
import { Hero3DScene } from '../components/landing/Hero3DScene';
import { ScrollStory } from '../components/landing/ScrollStory';
import { CTASection } from '../components/landing/CTASection';
import { Navbar } from '../components/common/Navbar';
import { GlassButton } from '../components/common/GlassButton';
import { CustomCursor } from '../components/common/CustomCursor';
import { PageTransition } from '../components/common/PageTransition';
import { ArrowRight, Sparkles, Brain, ShieldCheck, Layers, Users, Briefcase, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const pillarLinks = [
    { id: 'memory', name: 'Memory', icon: Brain, color: 'text-amber-400 border-amber-500/30 hover:border-amber-400 bg-amber-500/10' },
    { id: 'exchange', name: 'Exchange', icon: Layers, color: 'text-teal-400 border-teal-500/30 hover:border-teal-400 bg-teal-500/10' },
    { id: 'connect', name: 'Connect', icon: Users, color: 'text-violet-400 border-violet-500/30 hover:border-violet-400 bg-violet-500/10' },
    { id: 'opportunities', name: 'Opportunities', icon: Briefcase, color: 'text-blue-400 border-blue-500/30 hover:border-blue-400 bg-blue-500/10' },
    { id: 'explore', name: 'Explore', icon: Compass, color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10' }
  ];

  return (
    <PageTransition className="bg-[#060813] text-slate-100 overflow-x-hidden min-h-screen">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-12 pb-24 overflow-hidden">
        {/* 3D Clustered Particle Constellation Scene */}
        <Hero3DScene />

        <div className="relative z-10 max-w-4xl mx-auto space-y-7">

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.04] drop-shadow-2xl">
            Your university life, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-teal-300 to-indigo-400">
              remembered.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Deadlines disappear. Notes get lost. Plans change. Unisphere remembers what matters and connects you to the people who make campus life easier.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? "/overview" : "/login"}>
              <GlassButton variant="primary" size="lg" icon={ArrowRight} className="px-8 py-3.5 text-base font-semibold shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                {isAuthenticated ? 'Go to Overview' : 'Enter Unisphere'}
              </GlassButton>
            </Link>
            <a href="#memory">
              <GlassButton variant="outline" size="lg" icon={Brain} className="px-7 py-3.5 text-base">
                See How It Works
              </GlassButton>
            </a>
          </div>

          {/* Floating Pillar Interactive Dock */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {pillarLinks.map((p) => {
              const Icon = p.icon;
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md text-xs font-semibold transition-all duration-300 hover:scale-105 ${p.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.name}</span>
                </a>
              );
            })}
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 border-t border-white/10 max-w-lg mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Life Planning Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>5 Connected Dynamic Pillars</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Storytelling */}
      <ScrollStory />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© 2026 Unisphere Campus Operating Layer. Built for university students.</p>
      </footer>
    </PageTransition>
  );
}

