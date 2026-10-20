import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  BookOpen, 
  KeyRound,
  Server
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageTransition } from '../components/common/PageTransition';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isLoading, authError, dbStatus, setAuthError } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('tirthmehta386@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Student@123');

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    course: 'Computer Science & Engineering',
    year: '3',
    department: 'Computer Science & Engineering',
    studentId: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (!loginEmail || !loginPassword) return;

    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      setSuccessMessage('Authentication successful. Loading your campus environment...');
      setTimeout(() => {
        navigate('/overview');
      }, 700);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    const result = await register(registerForm);
    if (result.success) {
      setSuccessMessage('Account created and saved to MongoDB. Redirecting to onboarding...');
      setTimeout(() => {
        navigate('/overview');
      }, 700);
    }
  };

  const handleFillDemo = () => {
    setLoginEmail('tirthmehta386@gmail.com');
    setLoginPassword('Student@123');
    setAuthError(null);
  };

  return (
    <PageTransition className="min-h-screen bg-[#060813] text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-600/15 blur-[120px] pointer-events-none" />

      {/* Top Bar with Brand and Database Status */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 py-2">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-[#080c1e] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-tight leading-none block">Unisphere</span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">Campus Operating Layer</span>
          </div>
        </Link>

        {/* Live MongoDB Status Indicator */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs shadow-md">
          <Database className={`w-3.5 h-3.5 ${dbStatus.isConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className={`w-2 h-2 rounded-full ${dbStatus.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {dbStatus.isConnected ? 'MongoDB Connected' : 'MongoDB Auth Active'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="w-full max-w-lg mx-auto z-10 my-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Student Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Sign in to Unisphere' : 'Create Student Account'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {mode === 'login' 
                ? 'Access your unified campus memory, timetable, squad matches, and exchange listings.' 
                : 'Register your university profile to connect with classmates and campus squads.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/70 border border-white/10 rounded-2xl mb-6 text-xs font-semibold">
            <button
              onClick={() => {
                setMode('login');
                setAuthError(null);
                setSuccessMessage('');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setAuthError(null);
                setSuccessMessage('');
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Error & Success Banners */}
          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Sign In Form */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>University Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[11px] font-mono text-indigo-300 hover:text-indigo-200 underline"
                  >
                    Use Demo Student Credentials
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Campus Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Registration Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Full Legal Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tirth Mehta"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>University / Student Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@nit.edu or student@gmail.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Course / Major</label>
                  <select
                    value={registerForm.course}
                    onChange={(e) => setRegisterForm({ ...registerForm, course: e.target.value, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="Computer Science & Engineering">CS & Engineering</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Electronics & Communication">Electronics & Comm</option>
                    <option value="Electrical Engineering">Electrical Engg</option>
                    <option value="Mechanical Engineering">Mechanical Engg</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Academic Year</label>
                  <select
                    value={registerForm.year}
                    onChange={(e) => setRegisterForm({ ...registerForm, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="1">1st Year (Freshman)</option>
                    <option value="2">2nd Year (Sophomore)</option>
                    <option value="3">3rd Year (Junior)</option>
                    <option value="4">4th Year (Senior)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min. 6 characters"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Register to MongoDB & Launch</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security & Database Features Info */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bcrypt Password Hashing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>JWT Bearer Auth</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>MongoDB Mongoose Model</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Encrypted Field Privacy</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 z-10">
        <p>Unisphere Campus Operating Layer • MERN Stack with MongoDB Atlas Integration</p>
      </footer>
    </PageTransition>
  );
}
