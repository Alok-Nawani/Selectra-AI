# Selectra AI: Prepare Smart. Get Selected.

Selectra AI is an AI-powered Placement Readiness Platform designed for B.Tech students to systematically prepare for technical interviews. It bridges the gap between learning and real-world interviews through structured paths, mock simulations, and adaptive feedback.

## 🚀 Features

- **Structured Learning Hub**: Subject-wise tracks for DSA, DBMS, OS, CN, OOP, AI/ML.
- **AI-Powered Assignments**: Auto-generated quizzes and assignments via Gemini AI.
- **Voice-Based Mock Interviews**: Realistic interview simulations using Speech-to-Text and Text-to-Speech.
- **Coding Arena**: Integrated code editor with test case validation.
- **Resume & JD Analyzer**: Personalized interview preparation based on your resume and job description.
- **Adaptive Difficulty**: Dynamic adjustment of question complexity based on performance.
- **Readiness Dashboard**: Comprehensive skill heatmap and improvement roadmap.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **AI Engine**: Google Gemini API
- **Voice**: Web Speech API (Browser native)
- **Editor**: CodeMirror

## 📂 Project Structure

```
selectra-ai/
 ├── frontend/          # Client-side code (HTML, CSS, JS)
 ├── backend/           # Server-side logic (Node.js, Express)
 ├── assets/            # Images, icons, static assets
 ├── data/              # Mock data, JSON storage
 └── README.md          # Project documentation
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Google Gemini API Key

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    cd backend
    npm install
    ```

3.  **Configure Environment**:
    - Create a `.env` file in the `backend` directory.
    - Add your Gemini API key:
      ```env
      GEMINI_API_KEY=your_api_key_here
      PORT=3000
      ```

4.  **Run the Backend**:
    ```bash
    cd backend
    npm start
    ```

5.  **Run the Frontend**:
    - Open `frontend/index.html` in your browser, or serve it using a lightweight server like separate live-server or via the backend static file serving (if configured).

##  Deployment

- **Frontend**: Host on Netlify/Vercel or serve via Backend.
- **Backend**: Deploy on Render/Heroku/Railway.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📜 License

MIT License
