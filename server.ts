import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { connectDB, getDBStatus } from './server/db.js';
import { authRouter } from './server/routes/auth.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initiate MongoDB Connection Pool asynchronously
  connectDB().catch(err => console.error('[Server] DB init error:', err));

  // --- API Routes ---
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Unisphere Backend API',
      database: getDBStatus(),
      timestamp: new Date().toISOString()
    });
  });

  // Authentication & User DB routes
  app.use('/api/auth', authRouter);

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Unisphere Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Startup Error:', err);
});
