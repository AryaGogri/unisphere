import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { AttendanceChart } from './AttendanceChart';
import { ActivityHeatmap } from './ActivityHeatmap';
import { TrendingUp, Award, Clock } from 'lucide-react';

export function AnalyticsPanel() {
  return (
    <GlassPanel className="p-6 border-white/15 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Academic Activity & Attendance Analytics</h3>
          <p className="text-xs text-slate-400">Passive tracking of lecture attendance trends & contribution rhythm</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="text-xs font-semibold text-amber-300 block mb-2">Subject Attendance Trend (%)</span>
          <AttendanceChart />
        </div>

        <div>
          <span className="text-xs font-semibold text-indigo-300 block mb-2">Study Memory Activity Heatmap (Last 12 Weeks)</span>
          <ActivityHeatmap />
          <div className="text-[11px] text-slate-400 mt-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Consistent memory logger badge active • 94% Trust Rating</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
