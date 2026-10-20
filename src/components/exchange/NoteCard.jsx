import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { TrustBadge } from './TrustBadge';
import { useUser } from '../../context/UserContext';
import { FileText, Download, ThumbsUp, Tag, Sparkles, TrendingUp } from 'lucide-react';

export function NoteCard({ note }) {
  const { upvoteNote } = useUser();

  return (
    <GlassCard className="p-4 border-white/10 hover:border-teal-500/30 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
            {note.subject}
          </span>
          <TrustBadge score={note.trustScore} />
        </div>

        <h4 className="text-sm font-semibold text-white mb-1.5 leading-snug line-clamp-2">
          {note.title}
        </h4>

        <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
          <span>By {note.uploader}</span>
          <span>•</span>
          <span className="text-teal-300 font-medium">{note.uploadDate}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
        <button
          onClick={() => upvoteNote(note.id)}
          className="flex items-center gap-1 text-slate-300 hover:text-teal-300 transition-colors"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-teal-400" />
          <span>{note.upvotes} Upvotes</span>
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert(`Downloading ${note.title} (${note.size})`);
          }}
          className="glass-button text-[11px] px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border-teal-500/30"
        >
          <Download className="w-3 h-3" />
          <span>Download ({note.size})</span>
        </a>
      </div>
    </GlassCard>
  );
}
