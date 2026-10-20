import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User.js';
import { getDBStatus } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'unisphere_jwt_secure_secret_key_2026';

// In-memory persistent fallback cache for seamless local testing if external MongoDB connection is pending
const fallbackUserStore: Map<string, any> = new Map();

// Seed standard demo user
const DEFAULT_DEMO_USER = {
  id: 'usr_tirth_386',
  name: 'Tirth Mehta',
  email: 'tirthmehta386@gmail.com',
  passwordHash: bcrypt.hashSync('Student@123', 10),
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
  onboarded: true,
  createdAt: new Date().toISOString()
};

fallbackUserStore.set(DEFAULT_DEMO_USER.email.toLowerCase(), DEFAULT_DEMO_USER);

function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
}

// Middleware: Authenticate Token
export const requireAuth = async (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'User account no longer exists.' });
      }
      (req as any).user = user.toSafeJSON();
    } else {
      const cached = fallbackUserStore.get(decoded.email.toLowerCase());
      if (!cached) {
        return res.status(401).json({ error: 'Session expired. Please log in again.' });
      }
      const safe = { ...cached };
      delete safe.passwordHash;
      (req as any).user = safe;
    }

    next();
  } catch (err: any) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
};

// GET /api/auth/status: Database & Connection Health Check
router.get('/status', (req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'ok',
    database: dbStatus,
    activeUserCount: mongoose.connection.readyState === 1 ? 'Synced with Cloud MongoDB' : fallbackUserStore.size,
    timestamp: new Date().toISOString()
  });
});

// POST /api/auth/register: Create New Student Account in MongoDB
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, course, year, department, studentId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required fields.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
      }

      const newUser = new User({
        name,
        email: normalizedEmail,
        passwordHash: password, // Mongoose pre-save hook hashes this
        course: course || 'Computer Science & Engineering',
        department: department || 'Engineering',
        year: year || '1',
        studentId: studentId || `STU-${Date.now().toString().slice(-4)}`
      });

      await newUser.save();
      const token = generateToken(newUser._id.toString(), newUser.email);
      const safeUser = newUser.toSafeJSON();

      // Mirror to fallback cache
      fallbackUserStore.set(normalizedEmail, { ...safeUser, passwordHash: newUser.passwordHash });

      return res.status(201).json({
        message: 'Account successfully registered and saved to MongoDB.',
        token,
        user: safeUser
      });
    } else {
      if (fallbackUserStore.has(normalizedEmail)) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const id = `usr_${Date.now()}`;

      const created = {
        id,
        name,
        email: normalizedEmail,
        passwordHash,
        course: course || 'Computer Science & Engineering',
        department: department || 'Engineering',
        year: year || '1',
        studentId: studentId || `STU-${Date.now().toString().slice(-4)}`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        subjects: ['Engineering Math', 'Data Structures', 'Web Tech'],
        skills: ['JavaScript', 'Python', 'React'],
        interests: ['Tech', 'Coding'],
        studyHours: '6 PM - 10 PM',
        trustScore: 90,
        contributionBadge: 'New Scholar',
        onboarded: true,
        createdAt: new Date().toISOString()
      };

      fallbackUserStore.set(normalizedEmail, created);

      const token = generateToken(id, normalizedEmail);
      const safeUser = { ...created };
      delete (safeUser as any).passwordHash;

      return res.status(201).json({
        message: 'Account registered successfully.',
        token,
        user: safeUser
      });
    }
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message || 'Registration failed due to a server error.' });
  }
});

// POST /api/auth/login: Authenticate against MongoDB Credentials
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user._id.toString(), user.email);
      return res.json({
        message: 'Authentication successful.',
        token,
        user: user.toSafeJSON()
      });
    } else {
      const cached = fallbackUserStore.get(normalizedEmail);
      if (!cached) {
        return res.status(401).json({ error: 'Account not found. Please register first or verify credentials.' });
      }

      const isMatch = await bcrypt.compare(password, cached.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password. Check credentials and try again.' });
      }

      const token = generateToken(cached.id, cached.email);
      const safeUser = { ...cached };
      delete safeUser.passwordHash;

      return res.json({
        message: 'Authentication successful.',
        token,
        user: safeUser
      });
    }
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Login failed due to a server error.' });
  }
});

// GET /api/auth/me: Retrieve Current Authenticated User Session
router.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json({
    user: (req as any).user
  });
});

// PUT /api/auth/profile: Update User Profile Metadata
router.put('/profile', requireAuth, async (req: Request, res: Response) => {
  try {
    const authUser = (req as any).user;
    const updates = req.body;

    // Prevent direct password alteration through profile endpoint
    delete updates.password;
    delete updates.passwordHash;
    delete updates._id;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findByIdAndUpdate(authUser.id, { $set: updates }, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json({ message: 'Profile updated in MongoDB.', user: user.toSafeJSON() });
    } else {
      const cached = fallbackUserStore.get(authUser.email.toLowerCase());
      if (cached) {
        const updated = { ...cached, ...updates };
        fallbackUserStore.set(authUser.email.toLowerCase(), updated);
        const safe = { ...updated };
        delete safe.passwordHash;
        return res.json({ message: 'Profile updated successfully.', user: safe });
      }
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update profile.' });
  }
});

export const authRouter = router;
