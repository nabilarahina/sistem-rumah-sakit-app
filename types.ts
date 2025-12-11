
export enum AgentType {
  HSC = 'HSC', // Hospital System Coordinator (Router)
  PMA = 'PMA', // Patient Management Agent
  ASA = 'ASA', // Appointment Scheduler Agent
  MIA = 'MIA', // Medical Information Agent
  HRG = 'HRG', // Hospital Report Generator Agent (formerly IFA)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  agentUsed: AgentType;
  sources?: Array<{ title: string; uri: string }>;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Drug' | 'Equipment' | 'Consumable';
  stockLevel: number;
  threshold: number;
  unitPrice: number;
}

export interface CashFlowData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface PatientRecord {
  id: string;
  name: string;
  lastVisit: string;
  status: 'Inpatient' | 'Outpatient' | 'Discharged';
  ward?: string;
}

export interface DoctorSchedule {
  id: string;
  name: string;
  specialty: string;
  availableSlots: string[];
}
