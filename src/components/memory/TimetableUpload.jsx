import React, { useState, useRef } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { useUser } from '../../context/UserContext';
import { FileText, Upload, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function TimetableUpload() {
  const { timetable, setTimetable } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setTimetable(prev => ({
          ...prev,
          uploaded: true,
          fileName: file.name,
          uploadedAt: new Date().toISOString().split('T')[0]
        }));
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <GlassCard className="p-6 border-white/15 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Timetable Intelligence</h3>
            <p className="text-xs text-slate-400">PDF auto-parser & missed lecture detector</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,image/*"
            className="hidden"
          />
          <GlassButton
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            size="sm"
            icon={Upload}
          >
            {isUploading ? 'Parsing PDF...' : 'Upload Timetable PDF'}
          </GlassButton>
        </div>
      </div>

      {/* Missed Lecture Intelligent Memory Alert */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-amber-200">Intelligent Alert: </span>
          <span className="text-slate-300">
            Detected DBMS lecture at 10 AM today. If you missed it, there is an upcoming DBMS Internal in 4 days.
          </span>
          <a href="#exchange-notes" className="underline font-medium text-amber-300 ml-2 hover:text-amber-200">
            View today's DBMS notes in Exchange →
          </a>
        </div>
      </div>

      {/* Schedule Grid Display */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 min-w-[600px] gap-2 text-xs">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
            <div key={day} className="flex flex-col gap-2">
              <div className="font-semibold text-slate-400 text-center py-1 bg-white/5 rounded-lg border border-white/5">
                {day}
              </div>
              {timetable?.schedule
                ?.filter(s => s.day.startsWith(day))
                ?.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                      slot.type === 'Free'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : slot.type === 'Practical'
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-200'
                        : 'bg-white/5 border-white/10 text-slate-200'
                    }`}
                  >
                    <div className="font-semibold truncate">{slot.subject}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{slot.room}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
