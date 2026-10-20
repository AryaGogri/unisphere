import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Paperclip, 
  Phone, 
  Video, 
  Check, 
  CheckCheck, 
  Coffee, 
  Code2, 
  BookOpen, 
  Smile, 
  Flame,
  X,
  MoreVertical,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export function DirectChatModal({ connection, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'them',
      text: `Hey! I saw we matched on Unisphere Connect with a high synergy score. Are you free to collaborate?`,
      time: '10:14 AM'
    },
    {
      id: 'm2',
      sender: 'me',
      text: `Hey ${connection.name.split(' ')[0]}! Yes, I was checking out your skill profile. Let's sync up!`,
      time: '10:16 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate smart auto-reply based on context
    setTimeout(() => {
      const replies = [
        "Sounds awesome! How about we meet at the Library 2nd floor during our common free slot?",
        "Awesome! Let me review the GitHub repo and share my initial thoughts.",
        "Perfect timing! Let's get our squad slots finalized before the deadline."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [
        ...prev,
        {
          id: `msg_reply_${Date.now()}`,
          sender: 'them',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleQuickSuggest = (text) => {
    setInputText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-[#090d1f] border border-violet-500/30 rounded-3xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={connection.avatar}
                alt={connection.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-violet-400/40 shadow"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090d1f]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">{connection.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {connection.compatibility ? `${connection.compatibility}% Match` : 'Squad Mate'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {connection.course || 'University Student'} • Active now
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Free Schedule Overlap Bar */}
        <div className="bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-slate-900/50 px-4 py-2 border-b border-white/5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-violet-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Common Free Slot: <strong>Wed 2:00 PM - 5:00 PM</strong> (Library Hub)</span>
          </div>
          <button
            onClick={() => handleQuickSuggest("Let's meet during our common free slot on Wednesday at 2 PM!")}
            className="text-[10px] text-indigo-300 hover:text-white underline font-mono"
          >
            Invite to slot
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-violet-500/20'
                      : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`mt-1 text-[9px] font-mono flex items-center gap-1 ${
                      isMe ? 'text-indigo-200 justify-end' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-indigo-200" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Smart Quick Replies */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] bg-slate-950/40">
          <span className="text-slate-500 text-[10px] font-mono shrink-0">Quick prompts:</span>
          {[
            "Let's review the Hackathon problem statement",
            "Are you free for a quick 10-min huddle?",
            "Can you share your GitHub or portfolio?",
            "Let's form a 3-member team!"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickSuggest(prompt)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-400/40 text-slate-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${connection.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-violet-500 hover:to-indigo-500 transition-all shadow-md shadow-violet-500/25"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
