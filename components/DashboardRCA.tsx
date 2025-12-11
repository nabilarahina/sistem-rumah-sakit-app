import React from 'react';
import { PatientRecord } from '../types';
import { Shield, CheckCircle, Clock, Server, Link } from 'lucide-react';

const mockPatients: PatientRecord[] = [
  { id: 'P-1001', name: 'John Doe', lastVisit: '2023-10-24', integrated: true, backupStatus: 'Secure' },
  { id: 'P-1002', name: 'Jane Smith', lastVisit: '2023-10-25', integrated: true, backupStatus: 'Secure' },
  { id: 'P-1003', name: 'Ahmad Dahlan', lastVisit: '2023-10-26', integrated: false, backupStatus: 'Pending' },
  { id: 'P-1004', name: 'Siti Aminah', lastVisit: '2023-10-26', integrated: true, backupStatus: 'Secure' },
];

const DashboardRCA: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-teal-600" />
          RME Compliance Dashboard
        </h2>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-400">Permenkes 24/2022 Compliant</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <Link className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm text-slate-500 font-medium">System Integration</h4>
                <p className="text-lg font-bold text-slate-800">98% Connected</p>
                <p className="text-xs text-slate-400">Farmasi, Lab, SATUSEHAT</p>
            </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <Server className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm text-slate-500 font-medium">Data Backup</h4>
                <p className="text-lg font-bold text-slate-800">Last: 20 mins ago</p>
                <p className="text-xs text-slate-400">Encrypted Off-site Storage</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700">Recent Patient Records & Sync Status</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-xs">
                <tr>
                    <th className="px-6 py-3">Patient ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Last Visit</th>
                    <th className="px-6 py-3">Interoperability</th>
                    <th className="px-6 py-3">Backup</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {mockPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{patient.id}</td>
                        <td className="px-6 py-4">{patient.name}</td>
                        <td className="px-6 py-4">{patient.lastVisit}</td>
                        <td className="px-6 py-4">
                            {patient.integrated ? (
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" /> Synced
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-amber-500">
                                    <Clock className="w-4 h-4" /> Pending
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${patient.backupStatus === 'Secure' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {patient.backupStatus}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
       <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-orange-800 font-semibold mb-1 text-sm">Compliance Alert</h4>
        <p className="text-orange-700 text-sm">
          Patient <b>P-1003</b> record sync failed due to network timeout at 10:45 AM. RME agent is retrying connection to Ministry of Health SATUSEHAT node.
        </p>
      </div>
    </div>
  );
};

export default DashboardRCA;
