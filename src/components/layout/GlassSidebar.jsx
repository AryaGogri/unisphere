import React from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Layers, Users, Briefcase, Compass, User, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function GlassSidebar() {
  const { user } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/overview', icon: LayoutDashboard, color: 'text-indigo-400' },
    { label: 'Memory', path: '/memory', icon: Brain, color: 'text-amber-400', badge: 'Active' },
    { label: 'Exchange', path: '/exchange', icon: Layers, color: 'text-teal-400' },
    { label: 'Connect', path: '/connect', icon: Users, color: 'text-violet-400' },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Explore', path: '/explore', icon: Compass, color: 'text-emerald-400' },
    { label: 'Profile', path: '/profile', icon: User, color: 'text-slate-400' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-slate-950/60 backdrop-blur-2xl border-r border-white/10 p-5 z-30 justify-between">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">Unisphere</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">Operating Layer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/15 shadow-lg shadow-black/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Mini Profile */}
      <div className="p-3 glass-panel border border-white/10 flex items-center justify-between gap-2">
        <NavLink to="/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border border-indigo-400/30 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">{user?.name}</span>
            <span className="text-[10px] text-slate-400 truncate">{user?.course || 'Year 3 CSE'}</span>
          </div>
        </NavLink>

        <NavLink
          to="/login"
          title="Switch Account / Login"
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <User className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </aside>
  );
}
