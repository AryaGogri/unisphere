import React, { useState, useRef } from 'react';
import { Camera, Mic, Send, Sparkles, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';

export function QuickCaptureInput() {
  const { addMemory } = useUser();
  const [inputText, setInputText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('DBMS');
  const [selectedCategory, setSelectedCategory] = useState('Assignment');
  const [isRecording, setIsRecording] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [captureFeedback, setCaptureFeedback] = useState(null);
  const fileInputRef = useRef();

  const handleCapture = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !photoPreview) return;

    const newMem = addMemory({
      text: inputText,
      subject: selectedSubject,
      category: selectedCategory,
      source: photoPreview ? 'Notice Board Photo' : isRecording ? 'Voice Note' : 'Quick Text Capture',
      photoUrl: photoPreview
    });

    setCaptureFeedback(`Remembered: "${newMem.title}" (${newMem.formattedDate})`);
    setInputText('');
    setPhotoPreview(null);
    setIsRecording(false);

    setTimeout(() => {
      setCaptureFeedback(null);
    }, 4000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        if (!inputText) setInputText('Notice Board Photo Capture');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice capture transcript
      setTimeout(() => {
        setInputText('DBMS assignment due next Friday before 11:59 PM');
        setIsRecording(false);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full glass-panel p-5 border border-amber-500/20 shadow-[0_10px_30px_rgba(245,158,11,0.08)] mb-8">
      <div className="flex items-center gap-2 mb-3 text-amber-400">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider">Passive Quick Capture</span>
      </div>

      <form onSubmit={handleCapture} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='e.g., "DBMS assignment due Friday", "Sir said CCE next Tuesday", "Photo of notice board"'
            className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all pr-24"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleVoiceRecording}
              title="Voice Capture"
              className={`p-2 rounded-lg transition-colors ${
                isRecording ? 'bg-rose-500/30 text-rose-300 animate-pulse' : 'text-slate-400 hover:text-amber-300 hover:bg-white/10'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Photo Capture Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Photo Capture"
              className="p-2 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Photo Preview Thumbnail */}
        {photoPreview && (
          <div className="relative w-24 h-20 rounded-lg overflow-hidden border border-white/20">
            <img src={photoPreview} alt="Captured" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setPhotoPreview(null)}
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        )}

        {/* Category & Subject Tag Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-amber-400/40"
            >
              <option value="DBMS">DBMS</option>
              <option value="COA">COA</option>
              <option value="TCS">TCS</option>
              <option value="Mathematics III">Mathematics III</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="General">General</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-amber-400/40"
            >
              <option value="Assignment">Assignment</option>
              <option value="CCE">CCE</option>
              <option value="CIAP">CIAP</option>
              <option value="Exam">Exam</option>
              <option value="Practical">Practical</option>
              <option value="Self Learning Activity">Self Learning Activity</option>
              <option value="Submission">Submission</option>
              <option value="Event">Event</option>
            </select>
          </div>

          <button
            type="submit"
            className="glass-button glass-button-primary text-xs px-4 py-1.5 bg-amber-500/80 hover:bg-amber-500 text-slate-950 font-semibold border-amber-300/40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Remember This</span>
          </button>
        </div>
      </form>

      {/* Confirmation Feedback Banner */}
      <AnimatePresence>
        {captureFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200"
          >
            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{captureFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
