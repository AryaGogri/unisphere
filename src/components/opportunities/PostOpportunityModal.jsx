import React, { useState } from 'react';
import { GlassModal } from '../common/GlassModal';
import { GlassButton } from '../common/GlassButton';
import { useUser } from '../../context/UserContext';
import { Plus, Briefcase, Share2 } from 'lucide-react';

export function PostOpportunityModal({ isOpen, onClose }) {
  const { addOpportunity } = useUser();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Internship');
  const [company, setCompany] = useState('');
  const [stipend, setStipend] = useState('');
  const [location, setLocation] = useState('Remote / Campus');
  const [deadline, setDeadline] = useState('');
  const [skills, setSkills] = useState('React, Node.js, Python');
  const [description, setDescription] = useState('');
  const [referralAvailable, setReferralAvailable] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addOpportunity({
      title,
      type,
      company: company || 'Peer Campus Project',
      stipend: stipend || 'Stipend Negotiable',
      location,
      deadline: deadline || 'In 2 weeks',
      skills: skills.split(',').map(s => s.trim()),
      description,
      referralAvailable
    });

    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Post Campus Opportunity or Referral">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-300 font-medium mb-1">Opportunity Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer Intern or Hackathon ML Lead Needed"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="Internship">Internship</option>
              <option value="Hackathon Partner">Hackathon Partner</option>
              <option value="Freelance Project">Freelance Project</option>
              <option value="Research Assistant">Research Assistant</option>
              <option value="Referral Offer">Referral Offer</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Campus Labs or Startup Name"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Stipend / Prize / Fee</label>
            <input
              type="text"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              placeholder="e.g. ₹15,000 / month"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Deadline</label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. Aug 30, 2026"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Required Skills (comma separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, Node.js, Python"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the opportunity responsibilities and eligibility..."
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1 text-slate-300">
          <input
            type="checkbox"
            checked={referralAvailable}
            onChange={(e) => setReferralAvailable(e.target.checked)}
            className="rounded border-white/20 bg-slate-950 text-blue-500 focus:ring-0"
          />
          <span>I can provide an employee/alumni referral for qualified applicants</span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <GlassButton type="button" onClick={onClose} variant="outline" size="sm">
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary" size="sm" icon={Plus} className="bg-blue-600 hover:bg-blue-500 text-white">
            Publish Opportunity
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
