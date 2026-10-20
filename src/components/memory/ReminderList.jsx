import React, { useState } from 'react';
import { ReminderCard } from './ReminderCard';
import { useUser } from '../../context/UserContext';
import { EmptyState } from '../common/EmptyState';
import { Brain, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export function ReminderList() {
  const { memories } = useUser();
  const [activeTab, setActiveTab] = useState('urgent');

  const urgentMemories = memories.filter(
    m => !m.completed && (m.urgency === 'critical' || m.urgency === 'high' || m.urgency === 'medium')
  );

  const upcomingMemories = memories.filter(
    m => !m.completed && (m.urgency === 'moderate' || m.urgency === 'subtle')
  );

  const completedMemories = memories.filter(m => m.completed);

  const displayList =
    activeTab === 'urgent'
      ? urgentMemories
      : activeTab === 'upcoming'
      ? upcomingMemories
      : activeTab === 'all'
      ? memories
      : completedMemories;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('urgent')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'urgent'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Needs Attention ({urgentMemories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'upcoming'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Coming Up ({upcomingMemories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>All Stream ({memories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeTab === 'completed'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed ({completedMemories.length})</span>
        </button>
      </div>

      {/* List */}
      {displayList.length === 0 ? (
        <EmptyState
          icon={Brain}
          title="Nothing urgent right now"
          description="Your future self will thank you. Use Quick Capture above to remember assignments, CCEs, or exam notices."
        />
      ) : (
        <div className="space-y-3">
          {displayList.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      )}
    </div>
  );
}
