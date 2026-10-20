import React from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { OpportunityBoard } from '../components/opportunities/OpportunityBoard';
import { PageTransition } from '../components/common/PageTransition';
import { Briefcase } from 'lucide-react';

export function OpportunitiesPage() {
  return (
    <DashboardShell>
      <PageTransition className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">Opportunities Pillar</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Peer & Alumni Opportunity Drops
            </h1>
            <p className="text-xs text-slate-300">
              Campus internships, hackathon team requests, freelance developer roles, and direct alumni referrals.
            </p>
          </div>
        </div>

        {/* Opportunity Filter & Listing Board */}
        <OpportunityBoard />
      </PageTransition>
    </DashboardShell>
  );
}
