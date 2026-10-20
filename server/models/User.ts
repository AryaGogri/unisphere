import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  isVerified?: boolean;
  university?: string;
  course?: string;
  department?: string;
  year?: string;
  studentId?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  subjects: string[];
  studyHours?: string;
  studyStyle?: string;
  sleepSchedule?: string;
  cleanliness?: number;
  roommateBudget?: string;
  socialStyle?: string;
  availability?: string;
  projectInterest?: string;
  weeklyLeisureBudget?: number;
  trustScore?: number;
  contributionBadge?: string;
  onboarded?: boolean;
  freeSlots?: Array<{ day: string; startTime: string; endTime: string }>;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toSafeJSON(): Record<string, any>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: 2,
      maxlength: 60
    },
    email: {
      type: String,
      required: [true, 'University email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    university: {
      type: String,
      default: 'National Institute of Technology'
    },
    course: {
      type: String,
      default: 'Computer Science & Engineering'
    },
    department: {
      type: String,
      default: 'Computer Science & Engineering'
    },
    year: {
      type: String,
      default: '3'
    },
    studentId: {
      type: String,
      default: 'NIT-2023-CS-084'
    },
    bio: {
      type: String,
      maxlength: 300,
      default: 'Computer Science student passionate about full-stack engineering, AI agents, and collaborative campus hackathons.'
    },
    skills: {
      type: [String],
      default: ['React', 'Node.js', 'Python', 'Machine Learning', 'Tailwind']
    },
    interests: {
      type: [String],
      default: ['Hackathons', 'AI Research', 'Coffee Brewing', 'Badminton', 'UI Design']
    },
    subjects: {
      type: [String],
      default: ['DBMS', 'COA', 'TCS', 'Mathematics III', 'Operating Systems']
    },
    studyHours: {
      type: String,
      default: '7 PM - 11 PM'
    },
    studyStyle: {
      type: String,
      default: 'Quiet library focus & whiteboard sessions'
    },
    sleepSchedule: {
      type: String,
      default: 'Night owl (1 AM - 8 AM)'
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    roommateBudget: {
      type: String,
      default: '₹8,000 - ₹12,000/mo'
    },
    socialStyle: {
      type: String,
      default: 'Chill weekend cafes & coding hackathons'
    },
    availability: {
      type: String,
      default: '12 hrs/week'
    },
    projectInterest: {
      type: String,
      default: 'AI-assisted Campus Tools & Web3'
    },
    weeklyLeisureBudget: {
      type: Number,
      default: 500
    },
    trustScore: {
      type: Number,
      default: 94
    },
    contributionBadge: {
      type: String,
      default: 'Gold Contributor'
    },
    onboarded: {
      type: Boolean,
      default: true
    },
    freeSlots: [
      {
        day: String,
        startTime: String,
        endTime: String
      }
    ],
    lastLogin: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Pre-save bcrypt hashing hook
UserSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Safe JSON serialization helper
UserSchema.methods.toSafeJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id
  };
};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
