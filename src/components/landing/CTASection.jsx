import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { GlassButton } from '../common/GlassButton';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function CTASection() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="py-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
      <GlassPanel className="p-10 sm:p-14 border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 relative overflow-hidden shadow-[0_30px_90px_rgba(99,102,241,0.2)]">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for a Calm, Intelligent Campus Experience?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Stop planning your life. Let Unisphere remember it.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of university students who never miss a deadline, find compatible study buddies, and discover campus opportunities seamlessly.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? "/overview" : "/login"}>
              <GlassButton variant="primary" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                {isAuthenticated ? 'Open Overview' : 'Enter Unisphere Now'}
              </GlassButton>
            </Link>
            <Link to="/memory">
              <GlassButton variant="outline" size="lg" icon={Brain} className="w-full sm:w-auto">
                Explore Demo Layer
              </GlassButton>
            </Link>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
