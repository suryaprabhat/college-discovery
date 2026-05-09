# 🎓 CampusScout — College Discovery Platform

A full-stack, data-rich college discovery and comparison platform for Indian students. Discover, filter, compare, and review colleges — all in one place.

## ✨ Features

- 🔍 **Smart Search & Filtering** — Search by name, filter by state, and set budget limits
- 🏷️ **Curated Collections** — One-click filters: *Top Placements*, *Most Affordable*, *Legacy Institutes*
- 📊 **Side-by-Side Comparison** — Compare up to 3 colleges across fees, placements, courses, and top recruiters
- 📱 **Immersive College Detail Pages** — Vertical swipe-up slides with history, faculty, courses, and placement data
- 💬 **Student Discussion Section** — Real-time comment system for each college
- 🌗 **Light & Dark Mode** — Seamless theme toggle across the entire platform
- 📨 **Contact Page** — For student inquiries and institution partnerships

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4 |
| Backend | Express.js, TypeScript |
| Database | SQLite via Prisma ORM |
| Charts | Recharts |
| Icons | Lucide React |
| Theme | next-themes |

## 🚀 Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/suryaprabhat/college-discovery.git
cd college-discovery
```

### 2. Start the Backend
```bash
cd backend
npm install
npx prisma db push
npx prisma generate
npx ts-node prisma/seed_api.ts   # Seeds 100 real colleges from API
npm start
```
Backend runs on **http://localhost:3001**

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:3000**

## 📂 Project Structure

```
college-discovery/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # DB schema
│   │   └── seed_api.ts       # Seeds 100 colleges from HipoLabs API
│   └── src/
│       └── index.ts          # Express API server
└── frontend/
    └── src/app/
        ├── page.tsx           # Homepage with search & filters
        ├── colleges/[id]/     # College detail page (swipe UI)
        ├── compare/           # Side-by-side comparison hub
        └── contact/           # Contact us page
```
