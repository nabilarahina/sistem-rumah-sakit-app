
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import DashboardHRG from './components/DashboardIFA'; // Reused file
import DashboardPMA from './components/DashboardRCA'; // Reused file
import DashboardMIA from './components/DashboardMIA';
import DashboardASA from './components/DashboardASA';
import { AgentType, ChatMessage } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { INITIAL_GREETING } from './constants';
import { Database } from 'lucide-react';

const App: React.FC = () => {
  const [currentAgent, setCurrentAgent] = useState<AgentType>(AgentType.HSC);
  const [isLoading, setIsLoading] = useState(false);
  
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
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      agentUsed: currentAgent
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const response = await sendMessageToGemini(messages, text, currentAgent);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: response.text,
      timestamp: new Date(),
      agentUsed: currentAgent,
      sources: response.sources
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const renderPanel = () => {
    switch (currentAgent) {
      case AgentType.HRG:
        return <DashboardHRG />;
      case AgentType.PMA:
        return <DashboardPMA />;
      case AgentType.MIA:
        return <DashboardMIA />;
      case AgentType.ASA:
        return <DashboardASA />;
      case AgentType.HSC:
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center p-10 text-slate-400 text-center space-y-6">
             <div className="max-w-xl">
                <h2 className="text-2xl font-semibold text-emerald-800 mb-2">Hospital System Coordinator (Pusat Perutean)</h2>
                <p className="text-slate-600 mb-8">Silakan masukkan pertanyaan atau permintaan Anda di chat. Koordinator akan mengidentifikasi maksud dan memilih agen yang paling sesuai.</p>
                
                <div className="grid grid-cols-2 gap-4 text-left text-sm">
                  <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">1. Patient Management</span>
                    Mengurus pendaftaran, transfer, dan status pasien.
                  </div>
                  <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">2. Appointment Scheduler</span>
                     Mengelola jadwal dokter dan janji temu.
                  </div>
                  <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">3. Medical Information</span>
                    Informasi medis divalidasi (Grounding).
                  </div>
                  <div className="p-4 bg-white rounded shadow-sm border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">4. Report Generator</span>
                    Laporan operasional dan keuangan (SIMRS).
                  </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 font-sans overflow-hidden">
      {/* HTML Style Header */}
      <header className="bg-emerald-900 text-white p-4 text-center border-b-4 border-green-500 shadow-md flex-shrink-0 z-30">
        <h1 className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
            <Database className="w-6 h-6" />
            Sistem Koordinasi Agen Pintar Rumah Sakit (SAAPS)
        </h1>
        <p className="text-xs md:text-sm text-emerald-200 opacity-90 mt-1">
            Infrastruktur Cerdas Pelayanan Kesehatan Berbasis Google AI Studio
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar currentAgent={currentAgent} onAgentChange={handleAgentChange} />
        
        <main className="flex-1 flex overflow-hidden">
          {/* Dynamic Panel */}
          <div className="flex-1 bg-[#f4f7f6] relative hidden md:block border-r border-slate-200 shadow-inner">
            {renderPanel()}
          </div>

          {/* Chat Interface */}
          <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 bg-white h-full relative z-10 border-l border-slate-200">
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              currentAgent={currentAgent}
            />
          </div>
        </main>
      </div>

      {/* HTML Style Footer */}
      <footer className="bg-slate-200 text-slate-600 text-center p-2 text-xs border-t border-slate-300 flex-shrink-0 z-30">
        Dirancang oleh Profesor Sistem Akuntansi - Memastikan Akurasi Data dan Efisiensi Operasional (HIS/SIMRS)
      </footer>
    </div>
  );
};

export default App;
