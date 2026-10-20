import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Clock, 
  Footprints, 
  Bike, 
  Car, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Share2, 
  Layers, 
  Sparkles, 
  Bookmark,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  Flame,
  Volume2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export function MapPreview({ events, selectedEventId, onSelectEvent, onOpenDirections }) {
  const [activeLayer, setActiveLayer] = useState('all'); // 'all' | 'spots' | 'food' | 'events'
  const [mapZoom, setMapZoom] = useState(1);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);

  // Synchronize when selectedEventId is passed from parent
  React.useEffect(() => {
    if (selectedEventId) {
      const match = events.find(e => e.id === selectedEventId);
      if (match) {
        setSelectedPin(match);
      }
    }
  }, [selectedEventId, events]);

  // Coordinates mapping for campus spots (normalized percentages on campus map)
  const pinCoordinates = {
    exp_1: { x: 42, y: 32, label: 'Computer Auditorium', zone: 'Academic Block A' },
    exp_2: { x: 78, y: 48, label: 'East Gate Road', zone: 'Commercial Lane' },
    exp_3: { x: 50, y: 64, label: 'Central Amphitheatre', zone: 'Campus Quad' },
    exp_4: { x: 22, y: 72, label: 'North Campus Gate', zone: 'Student Food Street' },
    default: { x: 60, y: 25, label: 'Campus Spot', zone: 'Main Campus' }
  };

  const handlePinClick = (event) => {
    setSelectedPin(event);
    if (onSelectEvent) onSelectEvent(event.id);
  };

  const handleStartDirection = (event, mode = 'walking') => {
    setActiveRoute({
      event,
      mode,
      origin: 'Current Location (Hostel Block B)',
      eta: mode === 'walking' ? '6 mins' : mode === 'bicycle' ? '2 mins' : '1 min',
      distance: event.distance,
      steps: [
        { instruction: 'Head north from Hostel Block B towards Student Center walkway', distance: '120m' },
        { instruction: `Turn right along the main boulevard towards ${event.distance.split('(')[1]?.replace(')', '') || event.title}`, distance: '250m' },
        { instruction: `Arrive at destination: ${event.title}`, distance: 'Destination' }
      ]
    });
  };

  const filteredEvents = events.filter(e => {
    if (activeLayer === 'all') return true;
    if (activeLayer === 'spots') return e.category === 'Study Spots';
    if (activeLayer === 'food') return e.category === 'Food';
    if (activeLayer === 'events') return e.category === 'Events';
    return true;
  });

  return (
    <div className="space-y-4 mb-8">
      <GlassCard className="p-0 overflow-hidden border-emerald-500/30 relative bg-[#070b16] shadow-2xl rounded-3xl">
        {/* Top Floating Control HUD */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Status Chip */}
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 text-xs font-semibold text-white shadow-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-300">Live Campus GIS</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 font-normal">{filteredEvents.length} Active Hotspots</span>
          </div>

          {/* Map Layer Filter Pills & Controls */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-xl p-1 rounded-2xl border border-white/15 shadow-xl">
            {[
              { id: 'all', label: 'All Hotspots' },
              { id: 'events', label: 'Events' },
              { id: 'spots', label: 'Study Spots' },
              { id: 'food', label: 'Food Hubs' }
            ].map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                  activeLayer === layer.id
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {layer.label}
              </button>
            ))}

            <div className="h-4 w-px bg-white/15 mx-1" />

            <button
              onClick={() => setMapZoom(z => (z === 1 ? 1.15 : 1))}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={mapZoom === 1 ? 'Zoom In' : 'Reset Zoom'}
            >
              {mapZoom === 1 ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Interactive Map Visual Stage */}
        <div 
          className="relative w-full h-[420px] overflow-hidden transition-transform duration-500 ease-out"
          style={{ transform: `scale(${mapZoom})` }}
        >
          {/* Custom SVG Stylized Map Layout */}
          <svg className="absolute inset-0 w-full h-full object-cover" preserveAspectRatio="none">
            <defs>
              <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
              </linearGradient>

              <linearGradient id="activeRouteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>

              {/* Glowing Blur Filter */}
              <filter id="glowRoute" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="#070b16" />
            <rect width="100%" height="100%" fill="url(#campusGrid)" />

            {/* Campus Greenery & Quads Zones */}
            <path
              d="M 180,60 Q 320,40 440,110 T 680,80 Q 760,160 700,240 T 480,260 Q 340,320 220,270 Z"
              fill="rgba(16, 185, 129, 0.04)"
              stroke="rgba(16, 185, 129, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 60,260 Q 180,230 260,290 T 320,380 Q 200,420 100,390 Z"
              fill="rgba(59, 130, 246, 0.04)"
              stroke="rgba(59, 130, 246, 0.12)"
              strokeWidth="1.5"
            />

            {/* Major Campus Avenues and Walkways */}
            <path
              d="M -20,210 C 240,180 500,250 820,180"
              fill="none"
              stroke="url(#roadGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 320,-20 C 340,160 380,280 410,440"
              fill="none"
              stroke="url(#roadGradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 140,440 C 220,310 540,140 680,-20"
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="5"
              strokeDasharray="6 6"
            />

            {/* Active Route Waypoint Line when direction mode is on */}
            {activeRoute && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                d="M 160,320 Q 300,280 420,135"
                fill="none"
                stroke="url(#activeRouteGlow)"
                strokeWidth="4"
                strokeDasharray="6 4"
                filter="url(#glowRoute)"
              />
            )}
          </svg>

          {/* User Starting Location Pin ("You are here") */}
          <div 
            className="absolute left-[18%] bottom-[24%] z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            title="Your Current Location: Hostel Block B"
          >
            <div className="px-2 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-[10px] font-mono text-indigo-200 mb-1 backdrop-blur-md whitespace-nowrap shadow-lg">
              You are here (Hostel B)
            </div>
            <div className="relative flex items-center justify-center">
              <span className="w-5 h-5 rounded-full bg-indigo-500/30 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-[0_0_15px_rgba(99,102,241,1)]" />
            </div>
          </div>

          {/* Dynamic Interactive Event Pins on Map */}
          {filteredEvents.map((event) => {
            const coords = pinCoordinates[event.id] || pinCoordinates.default;
            const isSelected = selectedPin?.id === event.id;
            const isHovered = hoveredEvent === event.id;

            const categoryColor = 
              event.category === 'Events' ? 'from-emerald-500 to-teal-600 border-emerald-300' :
              event.category === 'Study Spots' ? 'from-amber-500 to-orange-600 border-amber-300' :
              'from-rose-500 to-pink-600 border-rose-300';

            const badgeBg =
              event.category === 'Events' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40' :
              event.category === 'Study Spots' ? 'bg-amber-950/90 text-amber-300 border-amber-500/40' :
              'bg-rose-950/90 text-rose-300 border-rose-500/40';

            return (
              <div
                key={event.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                style={{ 
                  left: `${coords.x}%`, 
                  top: `${coords.y}%`,
                  transform: isSelected ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)'
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Floating Callout on Pin */}
                <div 
                  onClick={() => handlePinClick(event)}
                  className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${badgeBg} ${
                    isSelected ? 'ring-2 ring-white shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105' : 'hover:scale-105'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${categoryColor} shadow animate-pulse`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-white leading-none whitespace-nowrap">
                      {event.title.length > 22 ? event.title.substring(0, 22) + '...' : event.title}
                    </span>
                    <span className="text-[9px] text-slate-300 font-mono mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {event.distance}
                    </span>
                  </div>
                </div>

                {/* Animated Drop Pin Target */}
                <div 
                  onClick={() => handlePinClick(event)}
                  className="w-2 h-2 mx-auto mt-0.5 rounded-full bg-white shadow-[0_0_10px_#fff]"
                />
              </div>
            );
          })}
        </div>

        {/* Selected Location Bottom Drawer / Quick Details */}
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 bg-slate-900/95 border-t border-white/15 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20"
          >
            <div className="flex items-start gap-3.5">
              <img
                src={selectedPin.image}
                alt={selectedPin.title}
                className="w-16 h-16 rounded-2xl object-cover border border-white/10 shrink-0 shadow-lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono uppercase font-bold">
                    {selectedPin.category}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {selectedPin.price}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    • {selectedPin.popularity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{selectedPin.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-1">{selectedPin.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {selectedPin.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {selectedPin.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => handleStartDirection(selectedPin, 'walking')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Turn-by-Turn Route</span>
              </button>

              <button
                onClick={() => setSelectedPin(null)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Turn-by-Turn Navigation Modal */}
      <AnimatePresence>
        {activeRoute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0a0f1d] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Route Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Directions to {activeRoute.event.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">
                      ETA: {activeRoute.eta} ({activeRoute.distance})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRoute(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Transit Modes */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mode: 'walking', icon: Footprints, label: 'Walking', time: '6 mins' },
                  { mode: 'bicycle', icon: Bike, label: 'Campus Cycle', time: '2 mins' },
                  { mode: 'shuttle', icon: Car, label: 'Buggy Shuttle', time: '1 min' }
                ].map((m) => {
                  const Icon = m.icon;
                  const isActive = activeRoute.mode === m.mode;
                  return (
                    <button
                      key={m.mode}
                      onClick={() => handleStartDirection(activeRoute.event, m.mode)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isActive
                          ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs">{m.label}</div>
                      <div className="text-[10px] text-emerald-300 font-mono">{m.time}</div>
                    </button>
                  );
                })}
              </div>

              {/* Route Waypoints & Steps */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Start: <strong>Hostel Block B (Your Location)</strong></span>
                </div>

                <div className="border-l-2 border-emerald-500/40 ml-1.5 pl-4 py-2 space-y-3">
                  {activeRoute.steps.map((step, idx) => (
                    <div key={idx} className="text-xs space-y-0.5">
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>Step {idx + 1}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{step.distance}</span>
                      </div>
                      <p className="text-slate-300">{step.instruction}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Arrive: <strong>{activeRoute.event.title}</strong></span>
                </div>
              </div>

              {/* Destination Highlight Snapshot */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <div className="text-slate-400">Timetable Synergy:</div>
                  <div className="text-emerald-300 font-medium">Matches Wed 2 PM - 5 PM Free Slot</div>
                </div>
                <button
                  onClick={() => {
                    alert(`Saved directions to ${activeRoute.event.title} in your Unisphere Memory.`);
                    setActiveRoute(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 font-semibold"
                >
                  Save to Memory
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveRoute(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs"
                >
                  Start Live Navigation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
