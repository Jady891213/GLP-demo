
export enum WorkflowStatus {
  DRAFT = '草稿',
  ACCRUED = '已暂估',
  SYNCED = '已同步数据', // Data from O&M pulled
  SETTLED = '已结算',    // Bill generated and confirmed
  INVOICED = '已开票',
  CLEARED = '已核销'
}

export interface ContractRule {
  type: string;
  discount: number;
  description: string;
}

export interface ContractDetails {
  partyA: string;
  partyB: string;
  gridPoint: string;
  meteringMethod: string;
  billingFormula: string;
  billingDay: string;
  paymentDay: string;
  taxRate: string;
}

export interface Project {
  id: string;
  name: string;
  spv: string;
  capacity: string;
  client: string;
  rule: ContractRule;
  details: ContractDetails;
  region: string;
  status: 'Active' | 'Under Construction';
}

export interface TouPricingDetail {
  kwh: number;
  price: number;
  discountedPrice: number;
  amount: number;
}

export interface TouDataExtended {
  sharp: TouPricingDetail;
  peak: TouPricingDetail;
  flat: TouPricingDetail;
  valley: TouPricingDetail;
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
  accrualStartDate: string;
  accrualEndDate: string;
  
  // Settlement data
  actualKwhDetail: TouDataExtended;
  totalGeneration: number;
  selfUseKwh: number;
  reverseUseKwh: number;
  gridExportKwh: number;
  consumptionRatio: string;
  
  settlementAmount: number;
  receivableAmount: number;
  savingsAmount: number;
  settlementDate?: string;
  
  invoiceNo?: string;
  invoiceDate?: string;
  paymentAmount?: number;
  clearingDate?: string;
  
  syncTime?: string; // When O&M data was pulled
}

export interface IntegrationStatus {
  system: string;
  status: 'Online' | 'Offline' | 'Warning';
  lastSync: string;
  latency: string;
}

// Added missing SubjectMapping interface for the accounting module
export interface SubjectMapping {
  id: string;
  businessType: string;
  subjectCode: string;
  subjectName: string;
  direction: 'Debit' | 'Credit';
  description: string;
}
