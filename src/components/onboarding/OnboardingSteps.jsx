import React, { useState } from 'react';
import { GlassButton } from '../common/GlassButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export function OnboardingSteps({ selectedPillars }) {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3');
  const [studyHours, setStudyHours] = useState('7 PM - 11 PM');
  const [weeklyLeisureBudget, setWeeklyLeisureBudget] = useState(500);

  const handleFinish = (e) => {
    e.preventDefault();
    updateUserProfile({
      course,
      year,
      studyHours,
      weeklyLeisureBudget,
      onboarded: true
    });
    navigate('/memory');
  };

  return (
    <form onSubmit={handleFinish} className="space-y-4 max-w-xl mx-auto text-left text-xs">
      <div>
        <label className="block text-slate-300 font-semibold mb-1">Your Course / Degree</label>
        <input
          type="text"
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="e.g. Computer Science, Mechanical, Data Science"
          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Academic Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
          >
            <option value="1">Year 1 (Freshman)</option>
            <option value="2">Year 2 (Sophomore)</option>
            <option value="3">Year 3 (Junior)</option>
            <option value="4">Year 4 (Senior)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Preferred Study Hours</label>
          <select
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
          >
            <option value="Morning (7 AM - 12 PM)">Morning (7 AM - 12 PM)</option>
            <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
            <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
            <option value="7 PM - 11 PM">7 PM - 11 PM (Night Focus)</option>
            <option value="Late Night (11 PM - 3 AM)">Late Night (11 PM - 3 AM)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-slate-300 font-semibold mb-1">Weekly Leisure Budget (₹)</label>
        <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-xl p-3">
          <span className="text-emerald-400 font-bold">₹{weeklyLeisureBudget}</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={weeklyLeisureBudget}
            onChange={(e) => setWeeklyLeisureBudget(Number(e.target.value))}
            className="flex-1 accent-indigo-400 cursor-pointer"
          />
        </div>
        <span className="text-[10px] text-slate-400 mt-1 block">Used by Explore Pillar to prioritize student-friendly cafes and cheap food options.</span>
      </div>

      <div className="pt-4">
        <GlassButton
          type="submit"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          className="w-full justify-center bg-gradient-to-r from-indigo-500 to-purple-600 font-bold"
        >
          Initialize Unisphere Operating Layer
        </GlassButton>
      </div>
    </form>
  );
}
