import React from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { QuickCaptureInput } from '../components/memory/QuickCaptureInput';
import { ReminderList } from '../components/memory/ReminderList';
import { TimetableUpload } from '../components/memory/TimetableUpload';
import { AnalyticsPanel } from '../components/analytics/AnalyticsPanel';
import { PageTransition } from '../components/common/PageTransition';
import { Brain, Calendar, Sparkles } from 'lucide-react';

export function MemoryPage() {
  return (
    <DashboardShell>
      <PageTransition className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Brain className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">Memory Pillar</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Spatial Memory Stream
            </h1>
            <p className="text-xs text-slate-300">
              Unisphere passively remembers deadlines, CCE notices, and exam schedules so you never have to maintain a manual system.
            </p>
          </div>
        </div>

        {/* Quick Capture Input */}
        <QuickCaptureInput />

        {/* Timetable Intelligence Component */}
        <TimetableUpload />

        {/* Main Chronological Stream & Tabbed Reminders */}
        <ReminderList />

        {/* Academic Analytics Panel */}
        <AnalyticsPanel />
      </PageTransition>
    </DashboardShell>
  );
}
