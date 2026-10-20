import React, { useState } from 'react';
import { DashboardShell } from '../components/layout/DashboardShell';
import { GlassPanel } from '../components/common/GlassPanel';
import { GlassButton } from '../components/common/GlassButton';
import { PageTransition } from '../components/common/PageTransition';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Award, User, BookOpen, Clock, DollarSign, Save, Sparkles, CheckCircle2, Database, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout, dbStatus } = useAuth();
  const [name, setName] = useState(user?.name || 'Tirth Mehta');
  const [course, setCourse] = useState(user?.course || 'Computer Science & Engineering');
  const [year, setYear] = useState(user?.year || '3');
  const [studyHours, setStudyHours] = useState(user?.studyHours || '7 PM - 11 PM');
  const [bio, setBio] = useState(user?.bio || 'Building full-stack projects, focusing on DBMS & GenAI apps.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, course, year, studyHours, bio });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardShell>
      <PageTransition className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Student Operating Profile</h1>
            <p className="text-xs text-slate-300">Manage your Unisphere trust score, study preferences, and public identity.</p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>94% Trust Verified</span>
          </div>
        </div>

        {/* Profile Card Summary */}
        <GlassPanel className="p-6 border-white/15 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={user?.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-indigo-600 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-white">{name}</h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Year {year} Student
                </span>
              </div>
              <p className="text-xs text-slate-300">{course}</p>
              <p className="text-xs text-slate-400 max-w-md">{bio}</p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {user?.skills?.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <GlassPanel className="p-6 border-white/15 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Personal & Academic Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Course / Specialization</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="1">Year 1 (Freshman)</option>
                  <option value="2">Year 2 (Sophomore)</option>
                  <option value="3">Year 3 (Junior)</option>
                  <option value="4">Year 4 (Senior)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Peak Focus / Study Hours</label>
                <select
                  value={studyHours}
                  onChange={(e) => setStudyHours(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
                >
                  <option value="Morning (7 AM - 12 PM)">Morning (7 AM - 12 PM)</option>
                  <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
                  <option value="7 PM - 11 PM">7 PM - 11 PM (Night Focus)</option>
                  <option value="Late Night (11 PM - 3 AM)">Late Night (11 PM - 3 AM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Peer Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Changes take effect across your 3D Peer Compatibility Engine immediately.
                </span>
              )}

              <GlassButton type="submit" variant="primary" size="sm" icon={Save} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                Save Preferences
              </GlassButton>
            </div>
          </GlassPanel>
        </form>

        {/* Database & Account Security Panel */}
        <GlassPanel className="p-6 border-white/15 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>MongoDB Account Security & Persistence</span>
            </h3>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{dbStatus.isConnected ? 'Connected to MongoDB Atlas' : 'Local Auth Sync Active'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Database Engine:</span>
              <span className="text-white font-mono font-semibold">Mongoose / MongoDB v7+</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Credential Security:</span>
              <span className="text-emerald-300 font-mono font-semibold">Bcrypt (Salt Rounds: 10)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Session Authorization:</span>
              <span className="text-indigo-300 font-mono font-semibold">JWT Bearer (7d Expiry)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Logged in as <strong className="text-white">{user?.email}</strong>
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out / Switch Student Account</span>
            </button>
          </div>
        </GlassPanel>
      </PageTransition>
    </DashboardShell>
  );
}
