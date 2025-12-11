
import React from 'react';
import { PatientRecord } from '../types';
import { Users, Bed, Activity, ArrowRightLeft } from 'lucide-react';

const mockPatients: PatientRecord[] = [
  { id: 'RM-001', name: 'Budi Santoso', lastVisit: '2023-10-24', status: 'Inpatient', ward: 'Melati 301' },
  { id: 'RM-002', name: 'Siti Aminah', lastVisit: '2023-10-25', status: 'Outpatient', ward: '-' },
  { id: 'RM-003', name: 'Andi Wijaya', lastVisit: '2023-10-26', status: 'Discharged', ward: '-' },
];

const DashboardPMA: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-blue-600" />
            Patient Management
          </h2>
          <p className="text-sm text-slate-500">Pendaftaran, Transfer & Status Pasien</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
            Total Inpatient: 142
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <Bed className="text-blue-500 mb-2" />
            <span className="text-2xl font-bold text-slate-800">12</span>
            <span className="text-xs text-slate-400">Bed Available (VIP)</span>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <Activity className="text-green-500 mb-2" />
            <span className="text-2xl font-bold text-slate-800">45</span>
            <span className="text-xs text-slate-400">New Registrations</span>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <ArrowRightLeft className="text-orange-500 mb-2" />
            <span className="text-2xl font-bold text-slate-800">8</span>
            <span className="text-xs text-slate-400">Pending Transfers</span>
         </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700">Daftar Pasien Terkini</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                    <th className="px-6 py-3">No. RM</th>
                    <th className="px-6 py-3">Nama Pasien</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Lokasi / Ward</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {mockPatients.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{p.id}</td>
                        <td className="px-6 py-4">{p.name}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold
                                ${p.status === 'Inpatient' ? 'bg-blue-100 text-blue-700' : 
                                  p.status === 'Outpatient' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                {p.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">{p.ward}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPMA;
