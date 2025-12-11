
import React from 'react';
import { AgentType } from '../types';
import { CalendarDays, ClipboardList, Activity, FileBarChart, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  currentAgent: AgentType;
  onAgentChange: (agent: AgentType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentAgent, onAgentChange }) => {
  const menuItems = [
    { type: AgentType.HSC, label: 'Coordinator', icon: LayoutDashboard, desc: 'Pusat Perutean' },
    { type: AgentType.PMA, label: 'Patient Mgmt', icon: ClipboardList, desc: 'Pendaftaran & Status' },
    { type: AgentType.ASA, label: 'Scheduler', icon: CalendarDays, desc: 'Jadwal Dokter' },
    { type: AgentType.MIA, label: 'Medical Info', icon: Activity, desc: 'Info Medis Valid' },
    { type: AgentType.HRG, label: 'Report Gen', icon: FileBarChart, desc: 'Laporan SIMRS/SIA' },
  ];

  return (
    <div className="w-64 bg-emerald-50 text-emerald-900 flex flex-col h-full shadow-xl z-20 border-r border-emerald-200">
      <div className="p-6 border-b border-emerald-200 bg-emerald-100">
        <h3 className="font-bold text-lg text-emerald-900">Sub-Agen Fungsional</h3>
        <p className="text-xs text-emerald-700 mt-1">SAAPS Modules</p>
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
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-emerald-700 hover:bg-emerald-200'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              <div>
                <div className="font-bold text-sm">{item.label}</div>
                <div className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-emerald-600 opacity-80'}`}>{item.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-emerald-200 bg-emerald-50">
        <div className="bg-emerald-100 rounded p-3 text-xs text-emerald-800 border border-emerald-200">
          <p className="font-semibold mb-1">Status Sistem</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online (v2.5)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
