import React, { useState } from 'react';
import { GlassModal } from '../common/GlassModal';
import { GlassButton } from '../common/GlassButton';
import { useUser } from '../../context/UserContext';
import { Upload, FileText, Tag, Check } from 'lucide-react';

export function NoteUploadModal({ isOpen, onClose }) {
  const { addNote } = useUser();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('DBMS');
  const [tags, setTags] = useState('Handwritten, Solved PYQs, Unit 2');
  const [fileAttached, setFileAttached] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addNote({
      title,
      subject,
      tags: tags.split(',').map(t => t.trim()),
      size: '2.4 MB'
    });

    setTitle('');
    setFileAttached(false);
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Contribute Peer Study Notes">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-medium mb-1">Note Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., DBMS Unit 1-3 Handwritten Notes & 2024 Solved PYQs"
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="DBMS">DBMS</option>
              <option value="COA">COA</option>
              <option value="TCS">TCS</option>
              <option value="Mathematics III">Mathematics III</option>
              <option value="Operating Systems">Operating Systems</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Formula Sheet, Solved PYQ"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* File Attachment Box */}
        <div
          onClick={() => setFileAttached(true)}
          className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            fileAttached
              ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
              : 'border-white/15 bg-white/5 hover:bg-white/10 text-slate-400'
          }`}
        >
          {fileAttached ? (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-teal-400" />
              <span className="font-semibold text-white">Lecture_Notes_Unit1_2.pdf (2.4 MB) attached</span>
            </div>
          ) : (
            <>
              <Upload className="w-6 h-6 text-teal-400 mb-2" />
              <span className="text-slate-200 font-semibold">Click to select PDF or image notes</span>
              <span className="text-[10px] text-slate-400 mt-1">Maximum file size: 25 MB</span>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <GlassButton type="button" onClick={onClose} variant="outline" size="sm">
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary" size="sm" icon={Upload} className="bg-teal-500 text-slate-950 hover:bg-teal-400 border-teal-300">
            Publish Notes
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
