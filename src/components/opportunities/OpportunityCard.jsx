import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { Briefcase, MapPin, Calendar, DollarSign, Share2, Sparkles, Send, FileText } from 'lucide-react';

export function OpportunityCard({ opportunity, onResumeDrop }) {
  return (
    <GlassCard glow="opportunity" className="p-5 border-white/10 hover:border-blue-500/30 transition-all mb-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              {opportunity.type}
            </span>
            {opportunity.referralAvailable && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Share2 className="w-3 h-3" />
                Referral Available
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">{opportunity.title}</h3>
          <p className="text-xs text-slate-300 font-medium">{opportunity.company}</p>
        </div>

        {opportunity.relevance && (
          <div className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 text-[11px] font-semibold border border-blue-500/20 shrink-0">
            {opportunity.relevance}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
        {opportunity.description}
      </p>

      {/* Meta details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 mb-4 bg-slate-950/40 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">{opportunity.stipend}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">{opportunity.location}</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate">Deadline: {opportunity.deadline}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opportunity.skills?.map((skill, i) => (
          <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 font-medium">
            {skill}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
        <span className="text-slate-400 text-[11px]">Posted by {opportunity.author}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onResumeDrop(opportunity)}
            className="glass-button text-xs px-3 py-1.5 bg-white/5 hover:bg-white/15 text-slate-200"
          >
            <FileText className="w-3.5 h-3.5 text-blue-300" />
            <span>Resume Drop</span>
          </button>
          <GlassButton
            onClick={() => alert(`Applied for ${opportunity.title}`)}
            variant="primary"
            size="sm"
            icon={Send}
            className="bg-blue-600 hover:bg-blue-500 text-white border-blue-400/30"
          >
            Apply Now
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
}
