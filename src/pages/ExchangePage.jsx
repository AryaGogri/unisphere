import React from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { ThreadList } from '../components/exchange/ThreadList';
import { PageTransition } from '../components/common/PageTransition';
import { Layers } from 'lucide-react';

export function ExchangePage() {
  return (
    <DashboardShell>
      <PageTransition className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 mb-1">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">Exchange Pillar</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Academic Peer Exchange & Pre-Exam Threads
            </h1>
            <p className="text-xs text-slate-300">
              Crowdsourced handwritten notes, repeating PYQ derivations, and verified classmate study resources.
            </p>
          </div>
        </div>

        {/* Peer Exchange Feed & Thread Creation Modal */}
        <ThreadList />
      </PageTransition>
    </DashboardShell>
  );
}
