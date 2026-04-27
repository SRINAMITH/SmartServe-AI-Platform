# 🚀 SmartServe AI

SmartServe AI is a modern AI-powered service platform that helps users discover, interact with, and manage digital services through a conversational interface and intelligent recommendations.

---

## ✨ Features

### 🤖 AI Assistant
- Powered by Google Gemini (`@google/genai`)
- Real-time chat interface
- Context-aware responses
- Typing simulation for better UX

### 🔍 Smart Service Recommendations
- Keyword-based filtering system
- Matches user queries with service catalog
- Stores recent queries in local history

### 📊 Dashboard
- Tracks:
  - Total queries
  - Recommendation history
  - User activity
- Lightweight analytics via localStorage

### 🎤 Voice Input
- Uses Web Speech API (`webkitSpeechRecognition`)
- Converts speech → text input

### 🌙 Dark Mode
- Persistent theme using localStorage
- Smooth UI transitions

---

## 🧱 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React 19 |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Language | TypeScript |
| AI | Google Gemini API |
| Icons | Lucide React |
| Animation | Motion |

---

## 📁 Project Structure
root/
├── src/
│ ├── App.tsx # Main application logic & UI
│ ├── main.tsx # React entry point
│ ├── index.css # Tailwind styles
│ ├── data.ts # Service dataset + recommendation logic
│ ├── types.ts # TypeScript interfaces
│
├── index.html # App root HTML
├── vite.config.ts # Vite + env config
├── tsconfig.json # TypeScript config
├── package.json # Dependencies & scripts
├── metadata.json # App metadata & permissions
└── .env.example # Environment variables template


---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/smartserve-ai.git
cd smartserve-ai
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file:

GEMINI_API_KEY=your_api_key_here

Required for AI responses.

▶️ Running the Project
Development
npm run dev

Runs on:

http://localhost:3000
Production Build
npm run build
npm run preview
🧠 How It Works
AI Chat Flow
User sends input
Request sent to Gemini API
Response rendered in chat UI
Stored in localStorage (chat_history)
Recommendation Engine
Simple string matching:
service.name.includes(query)
service.description.includes(query)
service.category.includes(query)
State Persistence
chat_history
query_history
theme

All stored in browser localStorage.

🔐 Environment & Security
API key injected via Vite config
Fully client-side (no backend)
No sensitive data stored externally
