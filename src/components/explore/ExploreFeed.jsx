import React, { useState } from 'react';
import { FilterChips } from './FilterChips';
import { EventCard } from './EventCard';
import { MapPreview } from './MapPreview';
import { useUser } from '../../context/UserContext';
import { EmptyState } from '../common/EmptyState';
import { Compass, DollarSign, Clock, Map, List, Navigation } from 'lucide-react';

export function ExploreFeed() {
  const { exploreEvents, userBudget, setUserBudget } = useUser();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showMap, setShowMap] = useState(true); // Default open map for immediate discovery
  const [selectedEventId, setSelectedEventId] = useState(null);

  const filteredEvents = exploreEvents.filter(e => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Today') return e.time.includes('Today');
    if (activeFilter === 'Nearby') return parseFloat(e.distance) <= 0.5;
    if (activeFilter === 'Cheap') return e.isFree || e.price.includes('₹120') || e.price.includes('₹140');
    if (activeFilter === 'Food') return e.category === 'Food';
    if (activeFilter === 'Events') return e.category === 'Events';
    if (activeFilter === 'Study Spots') return e.category === 'Study Spots';
    return true;
  });

  const handleGetDirections = (event) => {
    setSelectedEventId(event.id);
    setShowMap(true);
    // Smooth scroll into view of map if needed
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Header controls & Rule 4 / 5 Intelligence Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Campus & City Discovery</h2>
          <p className="text-xs text-slate-400">Tailored to your timetable gaps and leisure budget</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Rule 5 Budget Filter Slider */}
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">Weekly Budget:</span>
            <span className="text-emerald-300 font-bold">₹{userBudget}</span>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={userBudget}
              onChange={(e) => setUserBudget(Number(e.target.value))}
              className="w-20 accent-emerald-400 cursor-pointer"
            />
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="glass-button text-xs px-3.5 py-2 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold flex items-center gap-1.5"
          >
            {showMap ? <List className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
            <span>{showMap ? 'Hide Map' : 'Open Campus Map'}</span>
          </button>
        </div>
      </div>

      {/* Free Time Window Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Free Timetable Window Detected: </strong>
            Wednesday 2 PM – 5 PM. 3 activities happening nearby during your gap!
          </span>
        </div>
      </div>

      <FilterChips activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

      {/* Enhanced Map View with Interactive Hotspots & Directions */}
      {showMap && (
        <MapPreview 
          events={filteredEvents} 
          selectedEventId={selectedEventId}
          onSelectEvent={(id) => setSelectedEventId(id)}
        />
      )}

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="Nothing nearby matching this filter"
          description="Try expanding your radius or adjusting your weekly budget slider above."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onGetDirections={handleGetDirections}
              isSelected={selectedEventId === event.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
