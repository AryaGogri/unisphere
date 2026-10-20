import mongoose from 'mongoose';

let isConnected = false;
let lastError: string | null = null;

export async function connectDB(): Promise<boolean> {
  if (isConnected && mongoose.connection.readyState === 1) return true;

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<username>')) {
    lastError = 'MONGODB_URI not configured or contains placeholder credentials';
    console.warn('⚠️ [MongoDB] MONGODB_URI not provided or contains placeholder credentials. Running with robust fallback store.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });
    isConnected = !!conn.connections[0].readyState;
    lastError = null;
    console.log(`✅ [MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    isConnected = false;
    const msg = error?.message || String(error);
    if (msg.includes('bad auth') || msg.includes('authentication failed')) {
      lastError = 'Authentication failed. Please verify your MongoDB Atlas Database Access username and password.';
      console.warn('⚠️ [MongoDB] Authentication failed: The username or password in MONGODB_URI does not match MongoDB Atlas credentials.');
    } else {
      lastError = msg;
      console.warn('⚠️ [MongoDB] Connection warning:', msg);
    }
    return false;
  }
}

export function getDBStatus() {
  return {
    isConnected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || 'Not connected',
    name: mongoose.connection.name || 'unisphere',
    error: lastError,
    hasCustomURI: !!(process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>'))
  };
}
