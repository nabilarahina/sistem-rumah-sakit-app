import React from 'react';
import { Heart, BookOpen, AlertCircle } from 'lucide-react';

const DashboardMIA: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50 text-center space-y-8">
      <div className="max-w-md space-y-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-12 h-12 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800">Medical Information Agent</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-left space-y-4">
             <div className="flex gap-3 items-start">
                <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-slate-800">Important Disclaimer</h3>
                    <p className="text-slate-600 text-sm mt-1">
                        I am an AI assistant designed to provide general medical information and organize clinical data. 
                        <b> I cannot provide medical diagnoses, prescribe medication, or offer personalized treatment plans.</b>
                    </p>
                </div>
             </div>
             <hr className="border-slate-100" />
             <div className="flex gap-3 items-start">
                <BookOpen className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-slate-800">Capabilities</h3>
                    <ul className="text-slate-600 text-sm mt-1 list-disc list-inside space-y-1">
                        <li>Summarize medical guidelines.</li>
                        <li>Explain medical terminology.</li>
                        <li>Search internal knowledge base (MedGemma grounded).</li>
                    </ul>
                </div>
             </div>
        </div>

        <p className="text-slate-400 text-sm">
            Please use the chat interface to ask your questions.
        </p>
      </div>
    </div>
  );
};

export default DashboardMIA;
