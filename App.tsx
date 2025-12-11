import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import DashboardIFA from './components/DashboardIFA';
import DashboardRCA from './components/DashboardRCA';
import DashboardMIA from './components/DashboardMIA';
import { AgentType, ChatMessage } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { INITIAL_GREETING } from './constants';

const App: React.FC = () => {
  const [currentAgent, setCurrentAgent] = useState<AgentType>(AgentType.HSC);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize messages with a greeting from HSC
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      content: INITIAL_GREETING[AgentType.HSC],
      timestamp: new Date(),
      agentUsed: AgentType.HSC
    }
  ]);

  const handleAgentChange = (newAgent: AgentType) => {
    setCurrentAgent(newAgent);
    // Optional: Add a system message when switching context
    const switchMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'model',
      content: INITIAL_GREETING[newAgent],
      timestamp: new Date(),
      agentUsed: newAgent
    };
    setMessages(prev => [...prev, switchMsg]);
  };

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      agentUsed: currentAgent
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Call Gemini Service
    const responseText = await sendMessageToGemini(messages, text, currentAgent);

    // 3. Add AI Response
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseText,
      timestamp: new Date(),
      agentUsed: currentAgent
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  // Render the specific visual panel based on Agent
  const renderPanel = () => {
    switch (currentAgent) {
      case AgentType.IFA:
        return <DashboardIFA />;
      case AgentType.RCA:
        return <DashboardRCA />;
      case AgentType.MIA:
        return <DashboardMIA />;
      case AgentType.HSC:
      default:
        // HSC just shows a welcome screen or empty state if we want, 
        // but let's make it a clean landing page area
        return (
          <div className="h-full flex items-center justify-center p-10 text-slate-400 text-center">
             <div>
                <h1 className="text-4xl font-light text-slate-300 mb-4">Hospital System Coordinator</h1>
                <p>Select an agent from the sidebar or start chatting to route your inquiry.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 font-sans">
      <Sidebar currentAgent={currentAgent} onAgentChange={handleAgentChange} />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Dynamic Panel (Visualizer) - Takes up 60% of width on large screens */}
        <div className="flex-1 bg-slate-50 relative hidden md:block border-r border-slate-200">
          {renderPanel()}
        </div>

        {/* Chat Interface - Takes up 40% of width, or full width on mobile */}
        <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 bg-white h-full relative z-10">
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            currentAgent={currentAgent}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
