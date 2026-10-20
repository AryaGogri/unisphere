import React, { useState } from 'react';
import { OpportunityCard } from './OpportunityCard';
import { PostOpportunityModal } from './PostOpportunityModal';
import { ResumeDropCard } from './ResumeDropCard';
import { GlassButton } from '../common/GlassButton';
import { useUser } from '../../context/UserContext';
import { Plus, Briefcase, Code, Sparkles, Users, Award } from 'lucide-react';

export function OpportunityBoard() {
  const { opportunities } = useUser();
  const [selectedType, setSelectedType] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedForDrop, setSelectedForDrop] = useState(null);

  const categories = [
    { id: 'All', label: 'All Opportunities', icon: Sparkles },
    { id: 'Internship', label: 'Internships', icon: Briefcase },
    { id: 'Hackathon Partner', label: 'Hackathons', icon: Code },
    { id: 'Alumni Referral', label: 'Alumni Referrals', icon: Award },
    { id: 'Freelance', label: 'Campus Freelance', icon: Users }
  ];

  const filteredOpportunities = opportunities.filter(o => {
    if (selectedType === 'All') return true;
    return o.type === selectedType;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Bar with Category Filter & Create Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <GlassButton
          onClick={() => setIsPostModalOpen(true)}
          variant="primary"
          size="sm"
          icon={Plus}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold shrink-0"
        >
          Post Campus Opportunity
        </GlassButton>
      </div>

      {/* Grid of Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map(opportunity => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onResumeDrop={(opp) => setSelectedForDrop(opp)}
          />
        ))}
      </div>

      {/* Modal dialogs */}
      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />

      {selectedForDrop && (
        <ResumeDropCard
          opportunity={selectedForDrop}
          isOpen={!!selectedForDrop}
          onClose={() => setSelectedForDrop(null)}
        />
      )}
    </div>
  );
}
