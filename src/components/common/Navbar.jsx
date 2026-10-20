import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers, Brain, Users, Compass, Briefcase, Activity } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-[#060813]/60 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={isLanding ? "/" : "/overview"} className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition-shadow">
            <div className="w-full h-full bg-[#080c1e] rounded-[11px] flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight leading-none group-hover:text-indigo-200 transition-colors">
              Unisphere
            </span>
            <span className="text-[10px] font-mono font-medium text-slate-400 tracking-wider uppercase mt-0.5">
              Campus Operating Layer
            </span>
          </div>
        </Link>

        {isLanding ? (
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-medium text-slate-300">
            <a href="#memory" className="px-3 py-1 rounded-full hover:text-amber-300 hover:bg-white/5 transition-all">Memory</a>
            <a href="#exchange" className="px-3 py-1 rounded-full hover:text-teal-300 hover:bg-white/5 transition-all">Exchange</a>
            <a href="#connect" className="px-3 py-1 rounded-full hover:text-violet-300 hover:bg-white/5 transition-all">Connect</a>
            <a href="#opportunities" className="px-3 py-1 rounded-full hover:text-blue-300 hover:bg-white/5 transition-all">Opportunities</a>
            <a href="#explore" className="px-3 py-1 rounded-full hover:text-emerald-300 hover:bg-white/5 transition-all">Explore</a>
          </nav>
        ) : null}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Layer Active</span>
          </div>

          {isLanding ? (
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Link to="/overview">
                  <GlassButton variant="primary" size="sm" icon={ArrowRight} className="shadow-md shadow-indigo-500/20">
                    Open Overview
                  </GlassButton>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/login">
                    <GlassButton variant="primary" size="sm" icon={ArrowRight} className="shadow-md shadow-indigo-500/20">
                      Enter Unisphere
                    </GlassButton>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <Link to="/overview">
              <GlassButton variant="outline" size="sm" icon={Brain}>
                Overview
              </GlassButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

