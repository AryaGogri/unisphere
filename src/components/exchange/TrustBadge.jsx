import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export function TrustBadge({ score = 90, badgeName = 'Gold Contributor' }) {
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  if (score >= 95) {
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  } else if (score < 85) {
    badgeColor = 'bg-teal-500/20 text-teal-300 border-teal-500/30';
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>{score}% Trust</span>
      <span>•</span>
      <span className="opacity-90">{badgeName}</span>
    </div>
  );
}
