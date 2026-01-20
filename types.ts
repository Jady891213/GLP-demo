
export enum WorkflowStatus {
  DRAFT = '草稿',
  ACCRUED = '已暂估',
  SYNCED = '已同步数据',
  SETTLED = '已结算',
  INVOICED = '已开票',
  CLEARED = '已核销'
}

export interface AccountingRule {
  id: string;
  eventName: string;
  entries: {
    direction: 'Debit' | 'Credit';
    subjectCode: string;
    subjectName: string;
    amountFormula: string;
  }[];
}

export interface RevenueRecord {
  id: string;
  month: string;
  billingCycle: string;
  projectId: string;
  projectName: string;
  spvName: string;
  omUnit: string;
  customerName: string;
  status: WorkflowStatus;
  
  // Accrual data
  accrualKwh: number;
  accrualAmount: number;
  accrualExclTax: number;
  accrualTax: number;
  momGrowth?: number; // Month-over-Month
  yoyGrowth?: number; // Year-over-Year
  accrualStartDate?: string;
  accrualEndDate?: string;
  
  // Raw data from inverters
  rawGenerationData?: { day: string; kwh: number }[];
  
  // Settlement data
  actualKwhDetail?: any;
  totalGeneration?: number;
  selfUseKwh?: number;
  reverseUseKwh?: number;
  gridExportKwh?: number;
  consumptionRatio?: string;
  settlementAmount: number;
  settlementDate?: string;
  syncTime?: string;
  
  invoiceNo?: string;
  invoiceDate?: string;
  paymentAmount?: number;
  clearingDate?: string;
  receivableAmount?: number;
  savingsAmount?: number;
}

export interface Project {
  id: string;
  name: string;
  spv: string;
  capacity: string;
  client: string;
  rule: any;
  details: any;
  region: string;
  status: string;
}

// Added missing IntegrationStatus interface
export interface IntegrationStatus {
  system: string;
  status: 'Online' | 'Offline';
  lastSync: string;
  latency: string;
}

// Added missing SubjectMapping interface
export interface SubjectMapping {
  id: string;
  businessType: string;
  subjectCode: string;
  subjectName: string;
  direction: 'Debit' | 'Credit';
  description: string;
}
