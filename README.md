🚀 SmartServe AI Platform
An AI-powered digital service platform designed to streamline user interaction with services through intelligent automation, real-time assistance, and a modern UI experience.
SmartServe combines AI chat capabilities, voice interaction, and dynamic service recommendations into a single seamless web application.
📌 Overview
SmartServe is built to enhance how users discover and interact with digital services. It leverages modern frontend technologies along with AI integration to deliver a smart, responsive, and intuitive experience.
✨ Key Features
🤖 AI Assistant
Integrated with Google Gemini AI (@google/genai)
Real-time intelligent responses
Helps users discover services and answer queries instantly
🎙️ Voice Interaction
Voice-enabled communication for enhanced accessibility
Hands-free interaction with the AI assistant
🧠 Smart Recommendations
Dynamically suggests services based on user needs
Improves user engagement and decision-making
📊 Interactive Dashboard
Clean and modern UI
Displays services and user interaction data
Smooth navigation and responsive design
⚡ Fast & Scalable
Built with Vite + React 19
Optimized for performance and scalability
🛠️ Tech Stack
Frontend
React 19
TypeScript
Vite
Tailwind CSS
Framer Motion (via motion)
Lucide Icons
Backend (Lightweight)
Express.js
dotenv (environment configuration)
AI Integration
Google Gemini API (@google/genai)
📁 Project Structure

SmartServe-AI-Platform/
│
├── src/
│   ├── App.tsx          # Main application logic
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles (Tailwind)
│   ├── types.ts         # Type definitions
│   └── services/
│       └── data.ts      # Service data & logic
│
├── index.html           # Root HTML
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
├── .env.example         # Environment variables template
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
Bash
git clone https://github.com/SRINAMITH/SmartServe-AI-Platform.git
cd SmartServe-AI-Platform
2️⃣ Install Dependencies
Bash
npm install
3️⃣ Setup Environment Variables
Create a .env file based on .env.example:
Environment
GEMINI_API_KEY=your_api_key_here
4️⃣ Run the Development Server
Bash
npm run dev
App will run at:

http://localhost:3000
5️⃣ Build for Production
Bash
npm run build
Preview Production Build
Bash
npm run preview
🎯 Use Cases
Digital service platforms
AI customer support systems
Smart assistant dashboards
SaaS product interfaces
🚧 Future Enhancements
🔐 User authentication system
📱 Mobile app integration
📊 Advanced analytics dashboard
🌐 Multi-language support
🧠 Improved AI personalization
🤝 Contributing
Contributions are welcome!
Bash
# Fork the repo
# Create your branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push
git push origin feature/your-feature- **🌓 Dark/Light Mode**: Fully responsive UI with a persistent theme toggle for optimal viewing in any environment.
- **📱 Responsive Design**: Optimized for all devices, from mobile phones to large desktop monitors.
- **💾 Local Persistence**: Uses `localStorage` to keep your chat and search history safe across sessions.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI (@google/genai)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smartserve-ai.git
   cd smartserve-ai
