import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { MapPin, Clock, Bookmark, Heart, Flame, DollarSign, Share2, Navigation } from 'lucide-react';

export function EventCard({ event, onGetDirections, isSelected }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <GlassCard 
      glow="explore" 
      className={`p-0 border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between ${
        isSelected ? 'ring-2 ring-emerald-400 border-emerald-400/50 shadow-lg shadow-emerald-500/10' : ''
      }`}
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Price Tag */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 font-bold text-xs border border-emerald-500/30">
            {event.price}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isSaved ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950/70 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Popularity Badge */}
          <div className="absolute bottom-2 left-3 text-[11px] font-semibold text-amber-300 drop-shadow">
            {event.popularity}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="text-emerald-400 font-semibold">{event.category}</span>
            <span>•</span>
            <span className="truncate">{event.subcategory}</span>
          </div>

          <h3 className="text-base font-bold text-white mb-2 leading-snug">{event.title}</h3>
          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {event.description}
          </p>

          {/* Time & Distance */}
          <div className="flex flex-col gap-1 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/5 mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{event.distance}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onGetDirections ? onGetDirections(event) : null}
          className="glass-button w-full text-xs py-2 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-500/40 hover:to-teal-500/40 text-emerald-200 border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 font-semibold"
        >
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span>Get Directions & Details</span>
        </button>
      </div>
    </GlassCard>
  );
}
