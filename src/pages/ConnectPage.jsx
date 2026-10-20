import React, { useState } from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { MatchDeckSwipe } from '../components/connect/MatchDeckSwipe';
import { ConnectOnboardingFlow } from '../components/connect/ConnectOnboardingFlow';
import { SquadBuilder } from '../components/connect/SquadBuilder';
import { ConnectionsRoster } from '../components/connect/ConnectionsRoster';
import { DirectChatModal } from '../components/connect/DirectChatModal';
import { PageTransition } from '../components/common/PageTransition';
import { Users, Trophy, MessageSquare, Sparkles, UserCheck, Flame } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { AnimatePresence } from 'motion/react';

export function ConnectPage() {
  const { candidates } = useUser();
  const [activeTab, setActiveTab] = useState('match'); // 'match' | 'squads' | 'connections'
  const [matchMode, setMatchMode] = useState('study_buddy'); // 'study_buddy' | 'roommate' | 'social' | 'project'
  
  // Default connected roster with enriched metadata
  const [connections, setConnections] = useState([
    {
      id: 'conn_1',
      name: 'Kabir Sharma',
      course: 'Computer Science',
      year: 'Year 3',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      category: 'study_buddy',
      compatibility: 94,
      studyHours: '7 PM - 11 PM',
      skills: ['React', 'Python', 'Docker', 'PostgreSQL']
    },
    {
      id: 'conn_2',
      name: 'Diya Sengupta',
      course: 'Data Science & AI',
      year: 'Year 3',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      category: 'project',
      compatibility: 92,
      studyHours: '7 PM - 11 PM',
      skills: ['PyTorch', 'FastAPI', 'React Native', 'Figma']
    },
    {
      id: 'conn_3',
      name: 'Aanya Kulkarni',
      course: 'Artificial Intelligence',
      year: 'Year 2',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      category: 'roommate',
      compatibility: 89,
      studyHours: '6 PM - 10 PM',
      skills: ['TensorFlow', 'UI/UX', 'Tailwind', 'Flutter']
    }
  ]);

  const [activeChatUser, setActiveChatUser] = useState(null);

  const handleOpenChat = (user) => {
    setActiveChatUser(user);
  };

  const handleNewConnection = (candidate) => {
    if (!connections.some(c => c.id === candidate.id)) {
      setConnections(prev => [
        {
          ...candidate,
          category: matchMode
        },
        ...prev
      ]);
    }
  };

  return (
    <DashboardShell>
      <PageTransition className="space-y-6">
        {/* Header with Navigation Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-violet-400 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">Connect Pillar</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Peer Compatibility & Squad Network
            </h1>
            <p className="text-xs text-slate-300">
              Find verified roommates, study buddies, project teammates, and assemble hackathon squads with integrated direct coordination.
            </p>
          </div>

          {/* Connect View Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-white/10 self-start sm:self-auto shadow-inner">
            <button
              onClick={() => setActiveTab('match')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'match'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Match Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('squads')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'squads'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Squad Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'connections'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Connections ({connections.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 3D Match Engine */}
        {activeTab === 'match' && (
          <div className="space-y-6">
            <ConnectOnboardingFlow
              currentMode={matchMode}
              onSelectMode={setMatchMode}
            />

            <MatchDeckSwipe
              mode={matchMode}
              onMutualConnect={handleNewConnection}
              onOpenChat={handleOpenChat}
            />
          </div>
        )}

        {/* Tab 2: Hackathon & Project Squad Builder */}
        {activeTab === 'squads' && (
          <SquadBuilder onOpenChatWithUser={handleOpenChat} />
        )}

        {/* Tab 3: Connected Peers Roster */}
        {activeTab === 'connections' && (
          <ConnectionsRoster
            connections={connections}
            onOpenChat={handleOpenChat}
          />
        )}

        {/* Real-Time Direct Chat Modal */}
        <AnimatePresence>
          {activeChatUser && (
            <DirectChatModal
              connection={activeChatUser}
              onClose={() => setActiveChatUser(null)}
            />
          )}
        </AnimatePresence>
      </PageTransition>
    </DashboardShell>
  );
}
