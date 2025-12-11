
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { InventoryItem, CashFlowData } from '../types';
import { TrendingUp, FileText, Package, DollarSign } from 'lucide-react';

const mockCashFlow: CashFlowData[] = [
  { month: 'Jan', revenue: 4200, expenses: 2400 },
  { month: 'Feb', revenue: 3500, expenses: 2100 },
  { month: 'Mar', revenue: 5000, expenses: 2800 }, 
  { month: 'Apr', revenue: 4780, expenses: 2908 },
];

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Paracetamol', category: 'Drug', stockLevel: 150, threshold: 200, unitPrice: 0.5 },
  { id: '2', name: 'Amoxicillin', category: 'Drug', stockLevel: 80, threshold: 100, unitPrice: 2.0 },
  { id: '3', name: 'Infus Set', category: 'Consumable', stockLevel: 1200, threshold: 500, unitPrice: 1.5 },
];

const DashboardHRG: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Hospital Report Generator
          </h2>
          <p className="text-sm text-slate-500">Sistem Informasi Manajemen Rumah Sakit (SIMRS) & SIA</p>
        </div>
        <div className="text-right">
           <span className="text-xs font-bold text-emerald-700 block">RSI Ibnu Sina</span>
           <span className="text-xs text-slate-400">Periode: Q2 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Financial Report */}
         <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <TrendingUp size={18} /> Laporan Keuangan (Cash Flow)
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockCashFlow}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} name="Penerimaan" />
                    <Line type="monotone" dataKey="expenses" stroke="#e11d48" strokeWidth={2} name="Pengeluaran" />
                  </LineChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Inventory Report */}
         <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Package size={18} /> Laporan Inventaris Farmasi
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockInventory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 11}} />
                    <Tooltip />
                    <Bar dataKey="stockLevel" fill="#10b981" name="Stok Saat Ini" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="threshold" fill="#fcd34d" name="Batas Min." radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r shadow-sm">
        <h4 className="font-bold text-emerald-800 text-sm mb-1">Analisis Efisiensi (AI Generated)</h4>
        <p className="text-sm text-emerald-700">
            Efisiensi penagihan meningkat 12% bulan ini. Disarankan melakukan restock Amoxicillin karena mendekati ambang batas aman. Rasio pendapatan terhadap beban operasional sehat.
        </p>
      </div>
    </div>
  );
};

export default DashboardHRG;
