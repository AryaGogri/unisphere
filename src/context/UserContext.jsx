import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseFuzzyDate, calculateUrgencyLevel } from '../utils/dateParser';

const UserContext = createContext();

const INITIAL_MEMORIES = [
  {
    id: 'mem_1',
    title: 'DBMS Assignment 2 Submission',
    category: 'Assignment',
    subject: 'DBMS',
    date: '2026-08-14',
    time: '23:59',
    formattedDate: 'Fri, Aug 14 at 23:59',
    urgency: 'high',
    source: 'Quick Capture',
    confidence: 98,
    completed: false
  },
  {
    id: 'mem_2',
    title: 'CCE Practical Evaluation on Normalization & Indexing',
    category: 'CCE',
    subject: 'DBMS',
    date: '2026-08-17',
    time: '10:00',
    formattedDate: 'Mon, Aug 17 at 10:00',
    urgency: 'medium',
    source: 'Notice Board Photo',
    confidence: 95,
    completed: false
  },
  {
    id: 'mem_3',
    title: 'CIAP Report Submission before Practical',
    category: 'Submission',
    subject: 'COA',
    date: '2026-08-18',
    time: '14:00',
    formattedDate: 'Tue, Aug 18 at 14:00',
    urgency: 'moderate',
    source: 'Quick Voice',
    confidence: 92,
    completed: false
  },
  {
    id: 'mem_4',
    title: 'DBMS Internal Exam 1',
    category: 'Exam',
    subject: 'DBMS',
    date: '2026-08-17',
    time: '09:30',
    formattedDate: 'Mon, Aug 17 at 09:30',
    urgency: 'high',
    source: 'Classroom Notice',
    confidence: 99,
    completed: false
  },
  {
    id: 'mem_5',
    title: 'Self Learning Activity (SLA) Presentation',
    category: 'Self Learning Activity',
    subject: 'Mathematics III',
    date: '2026-08-25',
    time: '11:15',
    formattedDate: 'Tue, Aug 25 at 11:15',
    urgency: 'subtle',
    source: 'Syllabus Tracker',
    confidence: 90,
    completed: false
  }
];

const INITIAL_TIMETABLE = {
  uploaded: true,
  fileName: 'Semester_5_Timetable_CSE.pdf',
  uploadedAt: '2026-08-01',
  schedule: [
    { day: 'Monday', time: '09:00 - 10:00', subject: 'DBMS', room: 'Lab 304', faculty: 'Dr. Sharma', type: 'Lecture' },
    { day: 'Monday', time: '10:15 - 12:15', subject: 'COA', room: 'LH-102', faculty: 'Prof. Verma', type: 'Lecture' },
    { day: 'Monday', time: '14:00 - 16:00', subject: 'Operating Systems', room: 'OS Lab', faculty: 'Dr. Nair', type: 'Practical' },
    { day: 'Tuesday', time: '09:00 - 10:00', subject: 'TCS', room: 'LH-102', faculty: 'Dr. Patel', type: 'Lecture' },
    { day: 'Tuesday', time: '10:15 - 11:15', subject: 'Mathematics III', room: 'LH-105', faculty: 'Prof. Das', type: 'Lecture' },
    { day: 'Tuesday', time: '11:15 - 14:00', subject: 'Free Slot', room: 'Campus Lawn', type: 'Free', window: '2.75 hrs' },
    { day: 'Wednesday', time: '10:00 - 12:00', subject: 'DBMS Practical', room: 'Lab 304', faculty: 'Dr. Sharma', type: 'Practical' },
    { day: 'Wednesday', time: '14:00 - 17:00', subject: 'Free Slot', room: 'Library / Cafe', type: 'Free', window: '3 hrs' },
    { day: 'Thursday', time: '09:00 - 11:00', subject: 'COA Lab', room: 'Hardware Lab', faculty: 'Prof. Verma', type: 'Practical' },
    { day: 'Friday', time: '11:00 - 12:00', subject: 'TCS Tutorial', room: 'LH-102', faculty: 'Dr. Patel', type: 'Tutorial' }
  ]
};

const INITIAL_EXCHANGE_THREADS = [
  {
    id: 'thread_1',
    subject: 'DBMS',
    title: 'DBMS Internal 1 — What should I study first?',
    author: 'Aarav Patel',
    authorYear: 'Year 3',
    trustScore: 88,
    createdAt: '2 hours ago',
    upvotes: 42,
    repliesCount: 18,
    pinnedTopics: ['Normalization (1NF to BCNF)', 'Transactions & ACID properties', 'ER Diagrams to Relational Schema', 'SQL Join Queries & Indexing'],
    topComment: 'Focus heavily on BCNF vs 3NF decomposition derivations! Sir asked 3 repeated questions from 2024 PYQ.'
  },
  {
    id: 'thread_2',
    subject: 'COA',
    title: 'COA — Cache Memory Mapping repeated PYQ solutions',
    author: 'Priya Sundaram',
    authorYear: 'Year 3',
    trustScore: 94,
    createdAt: '5 hours ago',
    upvotes: 35,
    repliesCount: 12,
    pinnedTopics: ['Direct vs Associative Mapping', 'Pipeline Hazards', 'IEEE 754 Floating Point'],
    topComment: 'Handwritten numerical step-by-step for 2-way Set Associative Cache attached in notes.'
  },
  {
    id: 'thread_3',
    subject: 'TCS',
    title: 'TCS — Pumping Lemma for Context Free Languages made easy',
    author: 'Rohan Joshi',
    authorYear: 'Year 3',
    trustScore: 91,
    createdAt: '1 day ago',
    upvotes: 56,
    repliesCount: 24,
    pinnedTopics: ['DFA Minimization', 'Pumping Lemma Steps', 'Turing Machine States'],
    topComment: 'The 5-step template formula for Pumping Lemma guarantees full marks.'
  }
];

const INITIAL_NOTES = [
  {
    id: 'note_1',
    title: 'DBMS Comprehensive Unit 1-3 Handnotes + Solved PYQs',
    subject: 'DBMS',
    uploader: 'Ananya Roy',
    uploaderRole: 'Class Topper & Tech Lead',
    trustScore: 96,
    uploadDate: '3 days ago',
    upvotes: 128,
    downloads: 342,
    fileType: 'PDF',
    size: '4.2 MB',
    tags: ['Handwritten', 'Solved PYQ', 'Internal 1 Special'],
    decayFactor: 0.98
  },
  {
    id: 'note_2',
    title: 'COA Microarchitecture Cheat Sheet & Block Diagrams',
    subject: 'COA',
    uploader: 'Karan Malhotra',
    uploaderRole: 'Research Assistant',
    trustScore: 92,
    uploadDate: '5 days ago',
    upvotes: 89,
    downloads: 210,
    fileType: 'PDF',
    size: '2.8 MB',
    tags: ['Diagrams', 'Formula Sheet'],
    decayFactor: 0.92
  },
  {
    id: 'note_3',
    title: 'Mathematics III Short Formulas & Fourier Series Steps',
    subject: 'Mathematics III',
    uploader: 'Sneha Gupta',
    uploaderRole: 'Peer Tutor',
    trustScore: 90,
    uploadDate: '1 week ago',
    upvotes: 74,
    downloads: 180,
    fileType: 'PDF',
    size: '1.5 MB',
    tags: ['Formula Sheet', 'Exam Ready'],
    decayFactor: 0.85
  }
];

const INITIAL_CANDIDATES = [
  {
    id: 'cand_1',
    name: 'Kabir Sharma',
    course: 'Computer Science',
    year: 'Year 3',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    subjects: ['DBMS', 'COA', 'TCS'],
    skills: ['React', 'Python', 'Docker', 'PostgreSQL'],
    interests: ['AI Hackathons', 'Specialty Coffee', 'Synthwave', 'Gaming'],
    studyHours: '7 PM - 11 PM',
    studyStyle: 'Quiet library focus & whiteboard sessions',
    sleepSchedule: 'Night owl (1 AM - 8 AM)',
    cleanliness: 5,
    roommateBudget: '₹8,000 - ₹12,000/mo',
    socialStyle: 'Chill weekend cafes & coding hackathons',
    availability: '12 hrs/week',
    projectInterest: 'AI-assisted Campus Tools & Web3',
    locationPreference: 'Near North Gate'
  },
  {
    id: 'cand_2',
    name: 'Diya Sengupta',
    course: 'Data Science & AI',
    year: 'Year 3',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    subjects: ['DBMS', 'Mathematics III', 'Python for AI'],
    skills: ['PyTorch', 'FastAPI', 'React Native', 'Figma'],
    interests: ['UI Design', 'Badminton', 'Indie Music', 'Photography'],
    studyHours: '7 PM - 11 PM',
    studyStyle: 'Quiet library focus & whiteboard sessions',
    sleepSchedule: 'Early bird (6 AM - 11 PM)',
    cleanliness: 4,
    roommateBudget: '₹10,000 - ₹15,000/mo',
    socialStyle: 'Chill weekend cafes & coding hackathons',
    availability: '15 hrs/week',
    projectInterest: 'AI-assisted Campus Tools & Web3',
    locationPreference: 'Near Main Gate'
  },
  {
    id: 'cand_3',
    name: 'Siddharth Varma',
    course: 'Information Technology',
    year: 'Year 3',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    subjects: ['Operating Systems', 'COA', 'Web Dev'],
    skills: ['Rust', 'Node.js', 'Kubernetes', 'Go'],
    interests: ['Open Source', 'Chess', 'Rock Climbing', 'Tech Blogs'],
    studyHours: '4 PM - 8 PM',
    studyStyle: 'Group discussion & problem solving',
    sleepSchedule: 'Night owl (1 AM - 8 AM)',
    cleanliness: 4,
    roommateBudget: '₹8,000 - ₹12,000/mo',
    socialStyle: 'Board game nights & hiking',
    availability: '10 hrs/week',
    projectInterest: 'DevOps & Distributed Systems',
    locationPreference: 'Near North Gate'
  },
  {
    id: 'cand_4',
    name: 'Aanya Kulkarni',
    course: 'Artificial Intelligence',
    year: 'Year 2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    subjects: ['DBMS', 'Mathematics III', 'Data Structures'],
    skills: ['TensorFlow', 'UI/UX', 'Tailwind', 'Flutter'],
    interests: ['AI Research', 'Coffee Brewing', 'Badminton', 'Digital Art'],
    studyHours: '7 PM - 11 PM',
    studyStyle: 'Quiet library focus & whiteboard sessions',
    sleepSchedule: 'Flexible',
    cleanliness: 5,
    roommateBudget: '₹9,000 - ₹13,000/mo',
    socialStyle: 'Cafe hopping & design workshops',
    availability: '14 hrs/week',
    projectInterest: 'HealthTech & Generative AI',
    locationPreference: 'Hostel Block B'
  }
];

const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp_1',
    title: 'Frontend Developer Intern (React + Vite)',
    type: 'Internship',
    company: 'NexTech Campus Labs',
    location: 'Remote / Campus Incubator',
    stipend: '₹18,000 / month',
    deadline: 'Aug 22, 2026',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    author: 'Rahul Verma (Alumni \'25)',
    referralAvailable: true,
    relevance: '95% match with your React & Tailwind skills',
    description: 'Building next-gen student collaboration web applications. Looking for 3rd year CSE student for 3-month spring tenure.'
  },
  {
    id: 'opp_2',
    title: 'National AI Hackathon Teammate Wanted (LLM Track)',
    type: 'Hackathon Partner',
    company: 'DevFolio HackQuest 2026',
    location: 'Hybrid (Campus Lab Final)',
    stipend: '₹1.5 Lakh Prize Pool',
    deadline: 'Aug 18, 2026',
    skills: ['Python', 'FastAPI', 'Gemini API', 'Vector DB'],
    author: 'Devansh Roy',
    referralAvailable: false,
    relevance: '92% match based on your Machine Learning interest',
    description: 'We have UI/UX and Backend ready. Need 1 ML engineer to integrate vector search and prompt pipelines.'
  },
  {
    id: 'opp_3',
    title: 'Full-Stack Freelance: Campus Canteen Pre-order Web App',
    type: 'Freelance Project',
    company: 'University Student Council',
    location: 'Campus Contract',
    stipend: '₹25,000 Fixed Project Fee',
    deadline: 'Aug 28, 2026',
    skills: ['Node.js', 'Express', 'React', 'MongoDB'],
    author: 'Prof. S. K. Mehta',
    referralAvailable: true,
    relevance: '88% match with your MERN stack profile',
    description: 'Create a lightweight QR canteen ordering system for the main food court to reduce lunch rush queues.'
  }
];

const INITIAL_EXPLORE_EVENTS = [
  {
    id: 'exp_1',
    title: 'Free GenAI & Agentic AI Hands-on Workshop',
    category: 'Events',
    subcategory: 'Workshop',
    time: 'Today 5:30 PM - 7:00 PM',
    distance: '0.4 km (Computer Auditorium)',
    price: 'Free',
    isFree: true,
    popularity: '🔥 140 students attending',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    tags: ['Free', 'AI', 'Certificates'],
    description: 'Learn how to build real-world AI Studio applets and agents. Free pizza and swag provided by Google Student Club!'
  },
  {
    id: 'exp_2',
    title: 'Artisan Espresso & Silent Study Corner',
    category: 'Study Spots',
    subcategory: 'Cafe',
    time: 'Open till 11:00 PM',
    distance: '0.8 km (East Gate Road)',
    price: '₹120 avg cold brew',
    isFree: false,
    popularity: '⭐ 4.8 (85 student reviews)',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    tags: ['Quiet', 'Fast WiFi', 'Power Sockets'],
    description: 'High-speed 300Mbps fiber internet, ergonomic chairs, power outlets at every table, and student discount on cold brew.'
  },
  {
    id: 'exp_3',
    title: 'Campus Flea Market & Acoustic Music Night',
    category: 'Events',
    subcategory: 'Flea Market',
    time: 'Wed 2:00 PM - 5:00 PM (Matches your free slot!)',
    distance: '0.2 km (Central Amphitheatre)',
    price: 'Free Entry',
    isFree: true,
    popularity: '✨ Popular on campus',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    tags: ['Free', 'Music', 'Food Stalls'],
    description: 'Handmade student crafts, thrift clothes, vinyl records, live student acoustic performances, and budget street snacks.'
  },
  {
    id: 'exp_4',
    title: 'Student Discount Bowl Meal Combo at Urban Spices',
    category: 'Food',
    subcategory: 'Affordable Food',
    time: '11 AM - 10 PM',
    distance: '0.5 km (North Campus Gate)',
    price: '₹140 for unlimited thali',
    isFree: false,
    popularity: '🍛 Budget Favorite',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['Cheap', 'Food', 'Student Pass'],
    description: 'Wholesome homestyle North Indian & South Indian bowls with valid college ID card.'
  }
];

export const UserProvider = ({ children }) => {
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('unisphere_memories');
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem('unisphere_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [exchangeThreads, setExchangeThreads] = useState(INITIAL_EXCHANGE_THREADS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [candidates] = useState(INITIAL_CANDIDATES);
  const [matches, setMatches] = useState([]);
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [exploreEvents, setExploreEvents] = useState(INITIAL_EXPLORE_EVENTS);
  const [userBudget, setUserBudget] = useState(500); // INR

  // Save memories to localStorage
  useEffect(() => {
    localStorage.setItem('unisphere_memories', JSON.stringify(memories));
  }, [memories]);

  // Add new quick capture memory
  const addMemory = (inputData) => {
    const parsed = parseFuzzyDate(inputData.text);
    
    const newMemory = {
      id: `mem_${Date.now()}`,
      title: inputData.title || inputData.text,
      category: inputData.category || 'Assignment',
      subject: inputData.subject || 'DBMS',
      date: parsed.date || new Date().toISOString().split('T')[0],
      time: parsed.time || '23:59',
      formattedDate: parsed.formatted || 'Due Soon',
      urgency: parsed.urgency || 'high',
      source: inputData.source || 'Quick Capture',
      confidence: inputData.confidence || 95,
      completed: false,
      photoUrl: inputData.photoUrl || null,
      voiceNoteUrl: inputData.voiceNoteUrl || null
    };

    setMemories(prev => [newMemory, ...prev]);
    return newMemory;
  };

  const toggleMemoryComplete = (id) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const deleteMemory = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  // Add new note
  const addNote = (noteData) => {
    const newNote = {
      id: `note_${Date.now()}`,
      title: noteData.title,
      subject: noteData.subject,
      uploader: noteData.uploader || 'Tirth Mehta',
      uploaderRole: 'Contributor',
      trustScore: 92,
      uploadDate: 'Just now',
      upvotes: 1,
      downloads: 0,
      fileType: 'PDF',
      size: noteData.size || '1.8 MB',
      tags: noteData.tags || ['Handwritten', 'Class Notes'],
      decayFactor: 1.0
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const upvoteNote = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, upvotes: n.upvotes + 1 } : n));
  };

  // Add opportunity
  const addOpportunity = (oppData) => {
    const newOpp = {
      id: `opp_${Date.now()}`,
      ...oppData,
      author: 'Tirth Mehta',
      relevance: 'Created by you'
    };
    setOpportunities(prev => [newOpp, ...prev]);
  };

  // Cross-pillar intelligence calculations
  const upcomingExams = memories.filter(m => m.category === 'Exam' || m.category === 'CCE' || m.urgency === 'high');
  const missedClasses = [
    { subject: 'DBMS', date: 'Today 10:00 AM', reason: 'Timetable gap detected' }
  ];

  return (
    <UserContext.Provider value={{
      memories,
      addMemory,
      toggleMemoryComplete,
      deleteMemory,
      timetable,
      setTimetable,
      exchangeThreads,
      notes,
      addNote,
      upvoteNote,
      candidates,
      matches,
      setMatches,
      opportunities,
      addOpportunity,
      exploreEvents,
      userBudget,
      setUserBudget,
      upcomingExams,
      missedClasses
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
