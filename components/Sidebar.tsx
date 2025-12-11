import React from 'react';
import { AgentType } from '../types';
import { Activity, LayoutDashboard, Database, ShieldCheck, HeartPulse } from 'lucide-react';

interface SidebarProps {
  currentAgent: AgentType;
  onAgentChange: (agent: AgentType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentAgent, onAgentChange }) => {
  const menuItems = [
    { type: AgentType.HSC, label: 'Coordinator', icon: LayoutDashboard, desc: 'Central Routing' },
    { type: AgentType.MIA, label: 'Medical Info', icon: HeartPulse, desc: 'Non-Diagnostic Info' },
    { type: AgentType.IFA, label: 'Accounting & Inv.', icon: Activity, desc: 'SIA & Stocks' },
    { type: AgentType.RCA, label: 'Compliance', icon: ShieldCheck, desc: 'RME & Regs' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl z-20">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2 font-bold text-xl text-teal-400">
          <Database className="w-6 h-6" />
          <span>MediSys AI</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Hospital Information System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentAgent === item.type;
          return (
            <button
              key={item.type}
              onClick={() => onAgentChange(item.type)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group
                ${isActive 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-[10px] opacity-70">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded p-3 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Gemini 2.5 Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
