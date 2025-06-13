# 🧠 Mini Employee Mood Tracker

A full-stack web app built with **Next.js 14 (App Router)**, **TypeScript**, **TailwindCSS**, and **Shadcn/UI** to allow employees to submit their mood and view entries via a simple admin dashboard.

---

## ✨ Features

- 🌈 Submit your current mood from 6 predefined options
- 💬 Add an optional comment with your submission
- 📋 Admin dashboard to view all mood entries
- ⚡ Clean, responsive UI with TailwindCSS and Shadcn/UI components
- 🧠 API Routes for form submission and data fetching
- 🧪 In-memory data storage (no database)

---

## 📁 Pages Overview

### `/` — Home Page
- Welcome message and a CTA button to submit mood and a button to go to admin page

### `/mood` — Mood Submission
- Choose from:
  - Happy
  - Angry
  - Sad
  - Anxious
  - Tired
  - Anxious
- Optional comment field
- Submit via `POST` API route

### `/admin` — Admin Dashboard
- Table listing all submitted moods
- Displays: Mood, Comment, Timestamp, Status
- Data fetched via `GET` API route

---


## 🧑‍💻 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Vercel (Deployment)](https://vercel.com)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/ShadowAdi/mood_analyzer.git
cd mood_analyzer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app locally
```bash
npm run dev
```

### 4. Visit:
- `http://localhost:3000/` — Home
- `http://localhost:3000/mood` — Mood Submission
- `http://localhost:3000/admin` — Admin Dashboard

---

## ⚠️ Notes

- **No database used** — all mood data is stored in a simple in-memory array (`utils/MoodData.ts`).
- **No AI-generated code** used in compliance with task rules.
---

## 🌍 Deployed Link

🔗 [Vercel Url](https://mood-analyzer-beta.vercel.app/)

---

## 📃 License
MIT
