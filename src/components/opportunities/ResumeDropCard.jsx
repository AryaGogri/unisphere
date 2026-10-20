import React, { useState } from 'react';
import { GlassModal } from '../common/GlassModal';
import { GlassButton } from '../common/GlassButton';
import { FileText, Upload, CheckCircle2, Send } from 'lucide-react';

export function ResumeDropCard({ opportunity, isOpen, onClose }) {
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUploaded(false);
      onClose();
    }, 2000);
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={`Resume Drop: ${opportunity?.title || 'Opportunity'}`}>
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-white">Resume Dropped Successfully!</h3>
          <p className="text-xs text-slate-300">
            Your resume and Unisphere trust profile have been sent directly to {opportunity?.author}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-slate-300">
            <span className="font-semibold text-blue-300">Applying to: </span>
            {opportunity?.title} ({opportunity?.company})
          </div>

          <div
            onClick={() => setUploaded(true)}
            className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              uploaded
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                : 'border-white/15 bg-white/5 hover:bg-white/10 text-slate-400'
            }`}
          >
            {uploaded ? (
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                <span className="font-semibold text-white">Tirth_Mehta_CSE_Resume_2026.pdf attached</span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-slate-200 font-semibold">Click to select or drag PDF resume</span>
                <span className="text-[10px] text-slate-400 mt-1">Include projects & tech stack</span>
              </>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <GlassButton type="button" onClick={onClose} variant="outline" size="sm">
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              disabled={!uploaded}
              variant="primary"
              size="sm"
              icon={Send}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Confirm Resume Drop
            </GlassButton>
          </div>
        </form>
      )}
    </GlassModal>
  );
}
