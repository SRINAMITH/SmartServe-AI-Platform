import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Search, 
  LayoutDashboard, 
  ShieldCheck, 
  Cloud, 
  Code, 
  TrendingUp, 
  Briefcase, 
  Lock, 
  Smartphone, 
  Search as SearchIcon,
  Moon, 
  Sun, 
  Mic, 
  Send, 
  History, 
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Message, Service, QueryHistory } from './types';
import { services, getRecommendations } from './services/data';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const iconMap: Record<string, any> = {
  ShieldCheck,
  Cloud,
  Code,
  TrendingUp,
  Briefcase,
  Lock,
  Smartphone,
  Search: SearchIcon,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'assistant' | 'dashboard' | 'contact'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Recommendation state
  const [recQuery, setRecQuery] = useState('');
  const [recommendedServices, setRecommendedServices] = useState<Service[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    const savedHistory = localStorage.getItem('query_history');
    if (savedHistory) setQueryHistory(JSON.parse(savedHistory));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('query_history', JSON.stringify(queryHistory));
  }, [queryHistory]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are a helpful AI assistant for SmartServe, a digital service platform. Provide concise, professional, and friendly answers about technology, business services, and general inquiries.",
        },
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I couldn't process that. How else can I help?",
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recQuery.trim()) return;

    const results = getRecommendations(recQuery);
    setRecommendedServices(results);

    const newHistory: QueryHistory = {
      id: Date.now().toString(),
      query: recQuery,
      recommendation: results.length > 0 ? results[0].name : 'No direct match',
      timestamp: Date.now(),
    };
    setQueryHistory(prev => [newHistory, ...prev].slice(0, 10));
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => { setActiveTab(id); setIsMenuOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-blue-600 p-2 rounded-xl">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                SmartServe
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <NavItem id="home" label="Home" icon={Briefcase} />
              <NavItem id="services" label="Services" icon={Search} />
              <NavItem id="assistant" label="AI Assistant" icon={Bot} />
              <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
              <NavItem id="contact" label="Contact" icon={Phone} />
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
                <NavItem id="home" label="Home" icon={Briefcase} />
                <NavItem id="services" label="Services" icon={Search} />
                <NavItem id="assistant" label="AI Assistant" icon={Bot} />
                <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavItem id="contact" label="Contact" icon={Phone} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <section className="text-center py-12 md:py-24 space-y-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4"
                >
                  Revolutionizing Digital Services with AI
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                  Intelligent Solutions for <br />
                  <span className="text-blue-600 dark:text-blue-400">Modern Businesses</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Experience the next generation of service delivery. Our AI-powered platform helps you find, manage, and optimize the services you need to grow.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('assistant')}
                    className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    Try AI Assistant <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    Explore Services
                  </button>
                </div>
              </section>

              {/* Features Grid */}
              <section className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'AI Chatbot', desc: 'Get instant answers to your service-related questions with our advanced AI.', icon: Bot, color: 'bg-blue-500' },
                  { title: 'Smart Recommendations', desc: 'Our algorithm suggests the best services based on your specific needs.', icon: Sparkles, color: 'bg-indigo-500' },
                  { title: 'Unified Dashboard', desc: 'Track all your interactions and service history in one clean interface.', icon: LayoutDashboard, color: 'bg-purple-500' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Smart Recommendations</h2>
                <p className="text-gray-600 dark:text-gray-400">Tell us what you need, and we'll find the perfect service for you.</p>
              </div>

              <form onSubmit={handleRecommendation} className="max-w-2xl mx-auto relative">
                <input
                  type="text"
                  value={recQuery}
                  onChange={(e) => setRecQuery(e.target.value)}
                  placeholder="e.g., 'I need help with cybersecurity' or 'cloud migration'"
                  className="w-full px-6 py-5 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-lg shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Search size={20} /> Find
                </button>
              </form>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(recommendedServices.length > 0 ? recommendedServices : services).map((service) => {
                  const Icon = iconMap[service.icon] || Code;
                  return (
                    <motion.div
                      layout
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{service.category}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                      <button className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Learn More <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'assistant' && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                      <Bot size={28} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">SmartServe AI</h2>
                    <p className="text-xs text-green-500 font-semibold uppercase tracking-wider">Online & Ready</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMessages([])}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Clear Chat"
                >
                  <History size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <MessageSquare size={48} />
                    <p className="max-w-xs">Start a conversation with our AI assistant to learn about our services.</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        msg.sender === 'user' ? 'bg-gray-200 dark:bg-gray-800 text-gray-600' : 'bg-blue-600 text-white'
                      }`}>
                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`text-[10px] mt-2 block opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                      <div className="flex gap-1">
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={startVoiceInput}
                    className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-blue-600 transition-all"
                  >
                    <Mic size={20} />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-4 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-bold">User Dashboard</h2>
                  <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your activity.</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  Pro Account
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Queries', value: messages.filter(m => m.sender === 'user').length, icon: MessageSquare, color: 'text-blue-500' },
                  { label: 'Recommendations', value: queryHistory.length, icon: Sparkles, color: 'text-indigo-500' },
                  { label: 'Saved Services', value: '12', icon: CheckCircle2, color: 'text-green-500' },
                  { label: 'Account Age', value: '14 Days', icon: History, color: 'text-purple-500' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                    <stat.icon className={`${stat.color} mb-4`} size={24} />
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <History size={20} className="text-blue-600" /> Recent Search History
                  </h3>
                  <div className="space-y-4">
                    {queryHistory.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No search history yet.</p>
                    ) : (
                      queryHistory.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                          <div>
                            <p className="font-bold text-sm">"{item.query}"</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Rec: {item.recommendation}</p>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles size={20} className="text-indigo-600" /> Recommended for You
                  </h3>
                  <div className="space-y-4">
                    {services.slice(0, 4).map((service) => {
                      const Icon = iconMap[service.icon] || Code;
                      return (
                        <div key={service.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.category}</p>
                          </div>
                          <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-gray-600 dark:text-gray-400">Have questions? We're here to help you navigate our intelligent service platform.</p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Mail, label: 'Email Us', value: 'tsrinamithwarrox@gmail.com' },
                    { icon: Phone, label: 'Call Us', value: '9182133499' },
                    { icon: MapPin, label: 'Visit Us', value: 'Pragati Engineering College, Surampaalem' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                        <p className="font-bold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            <span className="font-bold text-lg">SmartServe AI</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 SmartServe AI Platform. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
