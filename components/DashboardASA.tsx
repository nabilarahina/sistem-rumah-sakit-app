
import React from 'react';
import { DoctorSchedule } from '../types';
import { Calendar, Clock, UserMd, CheckCircle } from 'lucide-react';

const mockSchedules: DoctorSchedule[] = [
  { id: 'DR-1', name: 'Dr. Sarah Sp.PD', specialty: 'Penyakit Dalam', availableSlots: ['09:00', '10:00', '11:30'] },
  { id: 'DR-2', name: 'Dr. Budi Sp.A', specialty: 'Anak', availableSlots: ['13:00', '14:00'] },
  { id: 'DR-3', name: 'Dr. Iwan Sp.JP', specialty: 'Jantung', availableSlots: ['08:00', '08:30'] },
];

const DashboardASA: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-indigo-600" />
            Appointment Scheduler
          </h2>
          <p className="text-sm text-slate-500">Jadwal Dokter & Janji Temu</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium border border-indigo-100">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockSchedules.map((doc) => (
            <div key={doc.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                        <UserMd size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{doc.name}</h3>
                        <p className="text-sm text-slate-500">{doc.specialty}</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {doc.availableSlots.map(slot => (
                        <button key={slot} className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm hover:bg-green-100 transition-colors">
                            <Clock size={12} /> {slot}
                        </button>
                    ))}
                </div>
            </div>
        ))}
      </div>

      <div className="bg-slate-100 p-4 rounded-lg text-center text-slate-500 text-sm border border-slate-200 border-dashed">
         Sistem terintegrasi dengan HIS. Perubahan jadwal akan diperbarui secara real-time.
      </div>
    </div>
  );
};

export default DashboardASA;
