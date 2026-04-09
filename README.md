# 🎓 Selectra AI
### *Prepare Smart. Get Selected.*

Selectra AI is an immersive, high-performance **Placement Readiness Platform** designed to transform how B.Tech students prepare for high-stakes technical interviews. By leveraging the **Gemini 2.5 Flash** engine, it provides a feedback-driven ecosystem for mastering DSA, system design, and behavioral excellence.

![Platform Banner](https://img.shields.io/badge/Selectra_AI-Premium-blueviolet?style=for-the-badge&logo=openai)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-black?style=for-the-badge&logo=vercel)

---

## 🔥 Professional Suite

### 🎙️ Virtual Interview Cabin
Experience ultra-realistic mock interviews with our **Speech-to-Text & TTS integration**. Featuring a responsive AI avatar and a live code-redactor panels, Sarah (our AI Interviewer) provides nuanced feedback on your technical accuracy and communication style.

### ⚔️ Coding Arena (Premium)
A LeetCode-style workspace supporting **C, C++, Java, and Python**. It includes a full test-case validation suite, a real-time console, and a problem-difficulty filter.

### 🍃 Wellness & Focus Mode
Coding is a marathon. Our Wellness Hub features a **Pomodoro Productivity Timer**, **Box Breathing** exercises, and a curated library of 6+ **HQ Ambient Sounds** (Rain, Ocean, Zen Flute, etc.) to keep you in the flow state.

### 📅 RPG-Style Study Planner
Gamify your growth. Track your streaks, completed objectives, and daily XP as you move through our structured learning paths: **DSA Mastery, DBMS Core, OS Architecture, and System Design.**

### 📈 Global Leaderboard
Compete with your cohort. Our 3D Winner's Podium highlights the top performers, synced with a real-time XP and badge system.

---

## 🛠️ Technical Architecture

- **Frontend**: Vanilla ES6+ Modular JS, HTML5 Semantic Elements, Premium Glassmorphism CSS.
- **Backend (Serverless)**: Node.js Express architecture optimized for Vercel Functions.
- **Intelligence**: Google Gemini AI (rotated keys for high availability).
- **Storage**: MongoDB Atlas (Vector/Document storage for progress tracking).
- **Editor**: CodeMirror 5 Integration with custom LeetCode themes.

---

## 📂 Consolidated Structure

```text
selectra-ai/
├── api/                # Vercel Serverless Functions (Backend Logic)
│   ├── index.js        # Entry point for Express.js API
│   ├── models/         # Mongoose Data Models
│   └── data/           # Server-side test bank
├── core/               # Unified Frontend
│   ├── js/             # Modular JS Engines (Wellness, Arena, etc.)
│   ├── css/            # Premium Design tokens & Component styles
│   └── data/           # Client-side course material
├── sounds/             # High-Quality Ambient Audio Assets
├── assets/             # Branding & AI Avatar assets
└── vercel.json         # Orchestration & Deployment Config
```

---

## 🚀 One-Click Deployment

This project is optimized for **Vercel**. 

1. **Connect your GitHub Repo** to Vercel.
2. **Add Environment Variables**:
   - `GEMINI_API_KEYS`: Comma-separated list of Gemini API keys.
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: Random string for secure auth.
   - `DEEPGRAM_KEY`: For voice-to-text functionality.
3. **Deploy**! Vercel will automatically handle the static frontend and the serverless backend.

---

## 🤝 Contributing & License

Designed with ❤️ for students.  
**License**: MIT  
**Author**: Alok Nawani & DeepMind AI Assistants
