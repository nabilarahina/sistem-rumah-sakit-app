export enum AgentType {
  HSC = 'HSC', // Hospital System Coordinator (Router)
  MIA = 'MIA', // Medical Information Agent
  IFA = 'IFA', // Inventory & Finance Agent
  RCA = 'RCA', // RME Compliance Agent
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
  integrated: boolean; // Connected to Farmasi/Lab
  backupStatus: 'Secure' | 'Pending';
}