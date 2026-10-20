import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { TrustBadge } from './TrustBadge';
import { ThumbsUp, MessageSquare, Pin, Send, ChevronDown, ChevronUp } from 'lucide-react';

export function SubjectThread({ thread }) {
  const [upvotes, setUpvotes] = useState(thread.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: 'Siddharth V.', text: 'Definitely practice 3NF to BCNF decomposition! 3 marks question guaranteed.', time: '1 hr ago' },
    { id: 2, author: 'Ananya R.', text: 'The 2024 repeat paper solution PDF is pinned in Notes section above.', time: '30 mins ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    } else {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments(prev => [
      ...prev,
      { id: Date.now(), author: 'Tirth Mehta', text: newComment, time: 'Just now' }
    ]);
    setNewComment('');
  };

  return (
    <GlassCard className="p-5 border-white/10 hover:border-teal-500/30 transition-all mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
            {thread.subject}
          </span>
          <span className="text-xs text-slate-400">• {thread.createdAt}</span>
        </div>
        <TrustBadge score={thread.trustScore} />
      </div>

      <h3 className="text-base font-semibold text-white mb-2 leading-snug">{thread.title}</h3>

      {/* Pinned Exam Topics */}
      {thread.pinnedTopics && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300 mb-1.5">
            <Pin className="w-3.5 h-3.5 text-teal-400" />
            <span>High-Priority Exam Topics Highlighted by Peers:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {thread.pinnedTopics.map((topic, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-teal-500/10 text-slate-200 border border-teal-500/20">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/40 p-3 rounded-xl border border-white/5">
        <span className="font-semibold text-slate-200">{thread.author} ({thread.authorYear}): </span>
        "{thread.topComment}"
      </p>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
              hasUpvoted
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{upvotes} Helpful</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
            <span>{comments.length} Discussion Replies</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Discussion Comments */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="p-2.5 rounded-xl bg-white/5 text-xs text-slate-300">
              <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                <span>{c.author}</span>
                <span className="text-[10px] text-slate-400 font-normal">{c.time}</span>
              </div>
              <p>{c.text}</p>
            </div>
          ))}

          <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your exam insight or doubt..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              className="glass-button text-xs px-3 py-2 bg-teal-500 text-slate-950 font-semibold"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </GlassCard>
  );
}
