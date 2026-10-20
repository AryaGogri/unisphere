import React from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { ExploreFeed } from '../components/explore/ExploreFeed';
import { PageTransition } from '../components/common/PageTransition';
import { Compass } from 'lucide-react';

export function ExplorePage() {
  return (
    <DashboardShell>
      <PageTransition className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">Explore Pillar</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Campus & Nearby City Discovery
            </h1>
            <p className="text-xs text-slate-300">
              Find activities tailored to your free timetable windows, study habits, and weekly leisure budget.
            </p>
          </div>
        </div>

        {/* Explore Feed with Map Toggle & Budget Slider */}
        <ExploreFeed />
      </PageTransition>
    </DashboardShell>
  );
}
