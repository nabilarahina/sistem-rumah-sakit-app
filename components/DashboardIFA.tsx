import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { InventoryItem, CashFlowData } from '../types';
import { TrendingUp, AlertTriangle, PackageCheck, DollarSign, Building2 } from 'lucide-react';

const mockCashFlow: CashFlowData[] = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 5800 }, // Deficit
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 },
];

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Drug', stockLevel: 120, threshold: 200, unitPrice: 0.5 },
  { id: '2', name: 'Amoxicillin', category: 'Drug', stockLevel: 45, threshold: 100, unitPrice: 2.0 },
  { id: '3', name: 'Surgical Masks', category: 'Consumable', stockLevel: 5000, threshold: 1000, unitPrice: 0.1 },
  { id: '4', name: 'Syringes 5ml', category: 'Consumable', stockLevel: 300, threshold: 500, unitPrice: 0.2 },
];

const DashboardIFA: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="text-teal-600" />
            Accounting System (SIA)
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <Building2 size={12} /> RSI Ibnu Sina Main Ledger
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-400">COSO Framework Active</span>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Net Cash Flow (Q3)</p>
              <p className="text-xl font-bold text-slate-800">+$124,500</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Stock Alerts</p>
              <p className="text-xl font-bold text-slate-800">2 Critical</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Billing Efficiency</p>
              <p className="text-xl font-bold text-slate-800">99.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-80">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Revenue vs Expenses (In Millions)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCashFlow}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#e11d48" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Stock Levels (COSO Audit Trail)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockInventory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11}} />
                <Tooltip />
                <Legend />
                <Bar dataKey="stockLevel" fill="#64748b" name="Current Stock" radius={[0, 4, 4, 0]} />
                <Bar dataKey="threshold" fill="#f43f5e" name="Min Threshold" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* AI Insight Box */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <h4 className="text-teal-800 font-semibold mb-1 text-sm">AI Financial Analysis</h4>
        <p className="text-teal-700 text-sm">
          <b>Amoxicillin</b> is below threshold. As per COSO procurement protocols, initiate PO-492 with dual-authorization. Q3 revenue spike correlates with the new digital billing system implementation, reducing manual entry errors by 85%.
        </p>
      </div>
    </div>
  );
};

export default DashboardIFA;