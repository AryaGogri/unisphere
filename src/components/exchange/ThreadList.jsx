import React, { useState } from 'react';
import { PreExamBanner } from './PreExamBanner';
import { SubjectThread } from './SubjectThread';
import { NoteCard } from './NoteCard';
import { NoteUploadModal } from './NoteUploadModal';
import { GlassButton } from '../common/GlassButton';
import { useUser } from '../../context/UserContext';
import { Upload, Search, Filter } from 'lucide-react';

export function ThreadList() {
  const { exchangeThreads } = useUser();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['All', 'DBMS', 'COA', 'TCS', 'Software Eng'];

  const mockNotes = [
    {
      id: 1,
      title: 'DBMS Unit 3 & 4 Normalization Handwritten Derivations',
      author: 'Aarav Patel',
      year: 'Year 4',
      subject: 'DBMS',
      trustScore: 98,
      pages: 12,
      downloads: 142,
      topTopic: '3NF, BCNF & Lossless Decomposition Examples'
    },
    {
      id: 2,
      title: 'COA Cache Memory Mapping Protocols - Formula Sheet',
      author: 'Ananya Sharma',
      year: 'Year 3',
      subject: 'COA',
      trustScore: 95,
      pages: 5,
      downloads: 89,
      topTopic: 'Direct, Associative, Set-Associative Mapping'
    }
  ];

  const filteredThreads = exchangeThreads.filter(t => {
    const matchesSubject = selectedSubject === 'All' || t.subject === selectedSubject;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
      {/* Rule 4 Pre-Exam Trigger Banner */}
      <PreExamBanner />

      {/* Header Search & Upload Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Subject Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                selectedSubject === s
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <GlassButton
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="sm"
          icon={Upload}
          className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold shrink-0"
        >
          Share Handnote / PYQ
        </GlassButton>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics, PYQs, normalization, formula sheets..."
          className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
        />
      </div>

      {/* Verified Handwritten Notes Section */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>Top Peer Handnotes & Formula Sheets</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>

      {/* Subject Threads */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>Active Peer Exam Discussions</span>
        </h3>
        <div className="space-y-4">
          {filteredThreads.map(thread => (
            <SubjectThread key={thread.id} thread={thread} />
          ))}
        </div>
      </div>

      {/* Note Upload Modal */}
      <NoteUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
