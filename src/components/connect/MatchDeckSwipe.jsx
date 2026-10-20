import React, { useState } from 'react';
import { MatchCard } from './MatchCard';
import { MatchRevealScene } from './MatchRevealScene';
import { EmptyState } from '../common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useMatchEngine } from '../../hooks/useMatchEngine';
import { Users, RotateCcw } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export function MatchDeckSwipe({ mode = 'study_buddy', onMutualConnect, onOpenChat }) {
  const { user } = useAuth();
  const { candidates: initialCandidates } = useUser();
  const [revealedMatch, setRevealedMatch] = useState(null);

  const {
    candidates,
    handleSwipeRight,
    handleSwipeLeft,
    resetDeck,
    currentTopCandidate
  } = useMatchEngine(user, initialCandidates, mode);

  const onConnectRight = (id) => {
    const candidate = candidates.find(c => c.id === id);
    handleSwipeRight(id);

    // Trigger mutual match reveal micro-interaction & save to roster
    if (candidate) {
      setRevealedMatch(candidate);
      if (onMutualConnect) {
        onMutualConnect(candidate);
      }
    }
  };

  return (
    <div className="w-full relative min-h-[480px] flex flex-col items-center justify-center">
      {currentTopCandidate ? (
        <MatchCard
          candidate={currentTopCandidate}
          mode={mode}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={onConnectRight}
        />
      ) : (
        <div className="w-full max-w-md">
          <EmptyState
            icon={Users}
            title="You've reviewed all available peer matches!"
            description="We're constantly analyzing campus activity to find new compatible study buddies, roommates, and project partners."
            actionText="Refresh Profile Deck"
            onAction={resetDeck}
          />
        </div>
      )}

      {/* Mutual Match 3D Reveal Micro-interaction Modal */}
      <AnimatePresence>
        {revealedMatch && (
          <MatchRevealScene
            candidate={revealedMatch}
            onClose={() => setRevealedMatch(null)}
            onStartChat={onOpenChat}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
