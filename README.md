# 🌐 Unisphere — Campus Operating Layer

> **The calm, intelligent memory and connection layer for university life.**  
> Deadlines disappear. Notes get lost. Plans change. Unisphere remembers what matters and seamlessly connects you to the people and opportunities that make campus life easier.

---

## ✨ Overview

**Unisphere** is a unified, full-stack operating layer designed specifically for university students. Built with a high-performance modern stack (React 19, Three.js, Express, and MongoDB), Unisphere transforms fragmented campus life into a cohesive, intelligent experience across five core pillars:

- 🧠 **Memory Layer** — Frictionless quick-capture for deadlines, submissions, and reminders with automated urgency scoring and zero-stress prioritization.
- 📚 **Exchange Layer** — Course-specific discussion boards, previous year questions (PYQs), curated handnotes, and pre-exam study groups.
- 🤝 **Connect & Squad Builder** — Compatibility-driven study buddy and roommate matching based on work habits, sleep schedules, tech skills, and peer trust scores.
- 💼 **Opportunities Hub** — Discover curated hackathons, research lab openings, projects, and internships across campus.
- 🧭 **Explore Layer** — Real-time campus events, tech workshops, cultural fests, and student club activities.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vite.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Visuals & 3D**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [Motion](https://motion.dev/)
- **Icons & UI**: [Lucide React](https://lucide.dev/), Custom Glassmorphic Design System
- **Backend**: [Express 4](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx)
- **Database**: [Mongoose / MongoDB](https://mongoosejs.com/) with an automatic in-memory fallback store for rapid zero-setup local development
- **Authentication**: JWT authentication with bcrypt password hashing

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or any compatible package manager

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/unisphere.git
cd unisphere
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment (Optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Local server port | `3000` |
| `MONGODB_URI` | MongoDB Atlas or local connection string | *(Uses in-memory fallback store if unset)* |
| `JWT_SECRET` | Secret key for JWT session tokens | Default dev secret |
| `GEMINI_API_KEY` | Optional Google Gemini API key | Optional |

> **Note**: You can run Unisphere immediately without configuring MongoDB. It will automatically use the built-in demo memory store!

### 4. Run the development server

```bash
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Demo Credentials

When running with the default demo store, you can log in with:

- **Email**: `tirthmehta386@gmail.com`
- **Password**: `Student@123`

You can also register a new account on the login page at any time.

---

## 📦 Project Structure

```text
unisphere/
├── server/                 # Express backend API & MongoDB models
│   ├── db.ts               # Database connection manager with fallback
│   ├── models/             # Mongoose schemas (User, etc.)
│   └── routes/             # Authentication & data routes
├── src/                    # Frontend React 19 application
│   ├── components/         # Modular UI & pillar components
│   │   ├── common/         # Glass buttons, Navbar, custom cursor, particles
│   │   ├── connect/        # Squad builder & compatibility cards
│   │   ├── landing/        # 3D interactive hero, storytelling sections
│   │   ├── layout/         # Dashboard shell, glass sidebar, mobile nav
│   │   └── memory/         # Quick capture inputs & memory cards
│   ├── context/            # AuthContext & UserContext state providers
│   ├── pages/              # Overview, Memory, Exchange, Connect, Profile...
│   ├── App.tsx             # Client-side router configuration
│   ├── index.css           # Tailwind CSS & global styling tokens
│   └── main.tsx            # Application entrypoint
├── index.html              # HTML shell & SEO meta configuration
├── server.ts               # Full-stack server combining Express + Vite
└── vite.config.ts          # Vite configuration
```

---

## 📜 Available Scripts

- `npm run dev` — Starts the full-stack development server with Vite HMR
- `npm run build` — Compiles the React frontend and bundles the Express server
- `npm run start` — Runs the production build (`dist/server.cjs`)
- `npm run lint` — Runs TypeScript compiler checks without emitting files

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
