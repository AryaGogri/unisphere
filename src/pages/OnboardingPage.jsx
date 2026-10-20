import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { GlassPanel } from '../components/common/GlassPanel';
import { GlassButton } from '../components/common/GlassButton';
import { PillarOrbScene } from '../components/onboarding/PillarOrbScene';
import { PillarPicker } from '../components/onboarding/PillarPicker';
import { OnboardingSteps } from '../components/onboarding/OnboardingSteps';
import { PageTransition } from '../components/common/PageTransition';
import { CustomCursor } from '../components/common/CustomCursor';
import { Sparkles, ArrowRight } from 'lucide-react';

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedPillars, setSelectedPillars] = useState(['memory', 'exchange', 'connect']);
  const [selectedPillarOrb, setSelectedPillarOrb] = useState('memory');

  const handleTogglePillar = (id) => {
    setSelectedPillars(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setSelectedPillarOrb(id);
  };

  return (
    <PageTransition className="bg-[#070913] text-slate-100 min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 text-center">
        <GlassPanel className="p-8 sm:p-12 border-white/15">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalizing Unisphere • Step {step} of 2</span>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                What do you want Unisphere to help with?
              </h1>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Select one or more university life challenges. Unisphere will configure your spatial dashboard layer.
              </p>

              {/* 3D Pillar Orbs */}
              <PillarOrbScene
                selectedPillar={selectedPillarOrb}
                onSelectPillar={handleTogglePillar}
              />

              {/* Pillar Selector List */}
              <PillarPicker
                selectedPillars={selectedPillars}
                onTogglePillar={handleTogglePillar}
              />

              <div className="pt-4">
                <GlassButton
                  onClick={() => setStep(2)}
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  className="px-8 bg-gradient-to-r from-indigo-500 to-purple-600 font-bold"
                >
                  Continue to Personalization
                </GlassButton>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Tell us about your campus context
              </h1>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                This helps Unisphere score peer compatibility, match timetable gaps, and filter campus events.
              </p>

              <OnboardingSteps selectedPillars={selectedPillars} />
            </div>
          )}
        </GlassPanel>
      </main>
    </PageTransition>
  );
}
