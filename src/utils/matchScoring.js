/**
 * Reusable Compatibility Matching Engine for Unisphere
 * Contexts supported:
 * 1. Roommate
 * 2. Study Buddy
 * 3. Social / Club Friends
 * 4. Project / Teammate
 */

export function calculateMatchScore(userProfile, candidateProfile, mode = 'study_buddy') {
  if (!userProfile || !candidateProfile) return { score: 70, reasons: ['General campus peer match'] };

  let totalScore = 0;
  let maxScore = 100;
  const reasons = [];

  switch (mode) {
    case 'roommate': {
      // 1. Sleep Schedule (25 points)
      if (userProfile.sleepSchedule === candidateProfile.sleepSchedule) {
        totalScore += 25;
        reasons.push(`Both are ${userProfile.sleepSchedule || 'night owls'}`);
      } else {
        totalScore += 10;
      }

      // 2. Cleanliness (25 points)
      const cleanlinessDiff = Math.abs((userProfile.cleanliness || 4) - (candidateProfile.cleanliness || 4));
      if (cleanlinessDiff === 0) {
        totalScore += 25;
        reasons.push('Matching cleanliness standards');
      } else if (cleanlinessDiff === 1) {
        totalScore += 18;
      } else {
        totalScore += 8;
      }

      // 3. Budget alignment (20 points)
      if (userProfile.roommateBudget === candidateProfile.roommateBudget) {
        totalScore += 20;
        reasons.push('Similar budget range');
      } else {
        totalScore += 10;
      }

      // 4. Lifestyle / Smoking / Guests (20 points)
      if (userProfile.smokingPreference === candidateProfile.smokingPreference) {
        totalScore += 15;
      }
      if (userProfile.locationPreference === candidateProfile.locationPreference) {
        totalScore += 15;
        reasons.push(`Both prefer ${candidateProfile.locationPreference || 'near campus'}`);
      }

      break;
    }

    case 'study_buddy': {
      // 1. Shared Subjects (40 points)
      const userSubjects = userProfile.subjects || [];
      const candSubjects = candidateProfile.subjects || [];
      const sharedSubjects = userSubjects.filter(s => candSubjects.includes(s));

      if (sharedSubjects.length > 0) {
        totalScore += Math.min(40, sharedSubjects.length * 20);
        reasons.push(`Both study ${sharedSubjects.join(', ')}`);
      }

      // 2. Preferred Study Hours (30 points)
      if (userProfile.studyHours === candidateProfile.studyHours) {
        totalScore += 30;
        reasons.push(`Both study ${userProfile.studyHours || 'after 7 PM'}`);
      } else {
        totalScore += 15;
      }

      // 3. Study Environment / Style (20 points)
      if (userProfile.studyStyle === candidateProfile.studyStyle) {
        totalScore += 20;
        reasons.push(`Both prefer ${candidateProfile.studyStyle || 'quiet library sessions'}`);
      } else {
        totalScore += 10;
      }

      // 4. Academic Goals (10 points)
      if (userProfile.academicGoal === candidateProfile.academicGoal) {
        totalScore += 10;
        reasons.push('Shared target GPA goals');
      }

      break;
    }

    case 'social': {
      // 1. Shared Hobbies / Interests (50 points)
      const userInterests = userProfile.interests || [];
      const candInterests = candidateProfile.interests || [];
      const sharedInterests = userInterests.filter(i => candInterests.includes(i));

      if (sharedInterests.length > 0) {
        totalScore += Math.min(50, sharedInterests.length * 15);
        reasons.push(`Shared interests in ${sharedInterests.slice(0, 3).join(', ')}`);
      } else {
        totalScore += 15;
      }

      // 2. Personality / Social Vibe (30 points)
      if (userProfile.socialStyle === candidateProfile.socialStyle) {
        totalScore += 30;
        reasons.push(`Both enjoy ${candidateProfile.socialStyle || 'chill weekend meetups'}`);
      } else {
        totalScore += 15;
      }

      // 3. Campus Clubs / Activities (20 points)
      const userClubs = userProfile.clubs || [];
      const candClubs = candidateProfile.clubs || [];
      const sharedClubs = userClubs.filter(c => candClubs.includes(c));
      if (sharedClubs.length > 0) {
        totalScore += 20;
        reasons.push(`Members of ${sharedClubs[0]}`);
      } else {
        totalScore += 10;
      }

      break;
    }

    case 'project': {
      // 1. Complementary Tech Stack / Skills (40 points)
      const userSkills = userProfile.skills || [];
      const candSkills = candidateProfile.skills || [];
      const sharedSkills = userSkills.filter(s => candSkills.includes(s));
      const complementary = candSkills.filter(s => !userSkills.includes(s));

      if (sharedSkills.length > 0) {
        totalScore += 20;
        reasons.push(`Shared skills: ${sharedSkills.slice(0, 2).join(', ')}`);
      }
      if (complementary.length > 0) {
        totalScore += 20;
        reasons.push(`Complementary expertise in ${complementary.slice(0, 2).join(', ')}`);
      }

      // 2. Project Interests (30 points)
      if (userProfile.projectInterest === candidateProfile.projectInterest) {
        totalScore += 30;
        reasons.push(`Both working on ${candidateProfile.projectInterest || 'AI & Full-stack hackathons'}`);
      } else {
        totalScore += 15;
      }

      // 3. Availability & Course Year (30 points)
      if (userProfile.year === candidateProfile.year) {
        totalScore += 15;
        reasons.push(`Both in Year ${candidateProfile.year}`);
      } else {
        totalScore += 10;
      }
      if (userProfile.availability === candidateProfile.availability) {
        totalScore += 15;
        reasons.push(`Matching weekly availability (${candidateProfile.availability || '10+ hrs/week'})`);
      }

      break;
    }

    default:
      totalScore = 75;
      reasons.push('Strong general student alignment');
  }

  // Ensure reasonable bounds (e.g. 65% - 98%)
  const finalScore = Math.min(98, Math.max(65, Math.round(totalScore)));

  return {
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : ['High overall campus affinity']
  };
}
