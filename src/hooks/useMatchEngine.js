import { useMemo, useState } from 'react';
import { calculateMatchScore } from '../utils/matchScoring';

export function useMatchEngine(currentUserProfile, candidatesList = [], initialMode = 'study_buddy') {
  const [matchMode, setMatchMode] = useState(initialMode);
  const [matchedIds, setMatchedIds] = useState([]);
  const [passedIds, setPassedIds] = useState([]);

  const scoredCandidates = useMemo(() => {
    if (!candidatesList || candidatesList.length === 0) return [];

    return candidatesList
      .filter(c => !matchedIds.includes(c.id) && !passedIds.includes(c.id))
      .map(candidate => {
        const matchResult = calculateMatchScore(currentUserProfile, candidate, matchMode);
        return {
          ...candidate,
          compatibility: matchResult.score,
          reasons: matchResult.reasons
        };
      })
      .sort((a, b) => b.compatibility - a.compatibility);
  }, [currentUserProfile, candidatesList, matchMode, matchedIds, passedIds]);

  const handleSwipeRight = (candidateId) => {
    setMatchedIds(prev => [...prev, candidateId]);
  };

  const handleSwipeLeft = (candidateId) => {
    setPassedIds(prev => [...prev, candidateId]);
  };

  const resetDeck = () => {
    setMatchedIds([]);
    setPassedIds([]);
  };

  return {
    mode: matchMode,
    setMode: setMatchMode,
    candidates: scoredCandidates,
    matchedIds,
    handleSwipeRight,
    handleSwipeLeft,
    resetDeck,
    currentTopCandidate: scoredCandidates[0] || null
  };
}
