import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr_tirth_386',
  name: 'Tirth Mehta',
  email: 'tirthmehta386@gmail.com',
  course: 'Computer Science & Engineering',
  department: 'Computer Science & Engineering',
  year: '3',
  studentId: 'NIT-2023-CS-084',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  subjects: ['DBMS', 'COA', 'TCS', 'Mathematics III', 'Operating Systems'],
  skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'Tailwind'],
  interests: ['Hackathons', 'AI Research', 'Coffee Brewing', 'Badminton', 'UI Design'],
  studyHours: '7 PM - 11 PM',
  studyStyle: 'Quiet library focus & whiteboard sessions',
  sleepSchedule: 'Night owl (1 AM - 8 AM)',
  cleanliness: 5,
  roommateBudget: '₹8,000 - ₹12,000/mo',
  socialStyle: 'Chill weekend cafes & coding hackathons',
  availability: '12 hrs/week',
  projectInterest: 'AI-assisted Campus Tools & Web3',
  weeklyLeisureBudget: 500,
  trustScore: 94,
  contributionBadge: 'Gold Contributor',
  onboarded: true
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('unisphere_token') || 'demo_token_386');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('unisphere_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [dbStatus, setDbStatus] = useState({ isConnected: false, readyState: 0, host: 'Connecting...' });

  // Fetch DB status
  const checkDbStatus = async () => {
    try {
      const res = await fetch('/api/auth/status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data.database);
      }
    } catch (err) {
      // Fallback
    }
  };

  useEffect(() => {
    checkDbStatus();
    const interval = setInterval(checkDbStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  // Sync token & user to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('unisphere_token', token);
    } else {
      localStorage.removeItem('unisphere_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('unisphere_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('unisphere_user');
    }
  }, [user]);

  // Verify and fetch latest user profile on mount
  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem('unisphere_token');
      if (!savedToken) return;

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Retain local session
      }
    };

    verifySession();
  }, []);

  // Login action
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      setIsLoading(false);
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Register action
  const register = async (registrationData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      setIsLoading(false);
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout action
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('unisphere_token');
    localStorage.removeItem('unisphere_user');
  };

  // Update profile
  const updateUserProfile = async (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));

    if (token) {
      try {
        await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedFields)
        });
      } catch (err) {
        console.error('Failed to sync profile update to MongoDB:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        authError,
        dbStatus,
        login,
        register,
        logout,
        updateUserProfile,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
