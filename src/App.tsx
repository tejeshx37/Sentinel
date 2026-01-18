import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Insights } from './components/Insights';
import { AIChat } from './components/AIChat';
import { Missions } from './components/Missions';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      type: 'ai' as const,
      content: 'Hello! I\'m your AI Financial Assistant. I can help you understand your spending patterns, create budgets, and answer any financial questions. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] to-[#121214] text-white overflow-hidden">
      {/* Mobile Frame */}
      <div className="max-w-[390px] h-[844px] mx-auto relative flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {activePage === 'home' && <Dashboard />}
          {activePage === 'insights' && <Insights />}
          {activePage === 'missions' && <Missions />}
          {activePage === 'ai-chat' && <AIChat messages={chatMessages} setMessages={setChatMessages} />}
          {activePage === 'profile' && <Profile />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activePage={activePage} onNavigate={setActivePage} />
      </div>
    </div>
  );
}