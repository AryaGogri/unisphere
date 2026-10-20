import React from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Layers, Users, Briefcase, Compass, LayoutDashboard } from 'lucide-react';

export function MobileNav() {
  const items = [
    { label: 'Overview', path: '/overview', icon: LayoutDashboard },
    { label: 'Memory', path: '/memory', icon: Brain },
    { label: 'Exchange', path: '/exchange', icon: Layers },
    { label: 'Connect', path: '/connect', icon: Users },
    { label: 'Opps', path: '/opportunities', icon: Briefcase },
    { label: 'Explore', path: '/explore', icon: Compass }
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-medium transition-all ${
                  isActive ? 'text-indigo-400 bg-white/10' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
