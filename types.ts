
export enum WorkflowStatus {
  DRAFT = '草稿',
  ACCRUED = '已暂估',
  SETTLED = '已结算',
  INVOICED = '已开票',
  CLEARED = '已核销'
}

export interface ContractRule {
  type: string;
  discount: number; // e.g., 0.9 for 90%
  description: string;
}

export interface ContractDetails {
  partyA: string;
  partyB: string;
  gridPoint: string; // 关口计量点
  meteringMethod: string; // 计量方式 (e.g. 高供高计)
  billingFormula: string; // P = Q * A
  billingDay: string; // 抄表日
  paymentDay: string; // 付款日
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
}

export interface SubjectMapping {
  id: string;
  businessType: string;
  subjectCode: string;
  subjectName: string;
  direction: 'Debit' | 'Credit';
  description: string;
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
  billingCycle: string; // e.g. "2025.07.31 - 2025.08.31"
  projectId: string;
  projectName: string;
  spvName: string;
  omUnit: string; // 运维单位
  customerName: string;
  status: WorkflowStatus;
  
  // Accrual data
  accrualKwh: number;
  accrualAmount: number;
  accrualExclTax: number;
  accrualTax: number;
  accrualDate?: string;
  accrualStartDate: string;
  accrualEndDate: string;
  
  // Actual settlement data
  actualKwhDetail: TouDataExtended;
  totalGeneration: number;   // 总发电量
  selfUseKwh: number;       // 自用电量
  reverseUseKwh: number;    // 反向设备用电
  gridExportKwh: number;    // 上网电量
  consumptionRatio: string; // 消纳比
  
  settlementAmount: number; // 实收电费
  receivableAmount: number; // 应收电费
  savingsAmount: number;    // 节省电费
  settlementDate?: string;
  
  // Invoicing
  invoiceNo?: string;
  invoiceDate?: string;
  
  // Clearing
  paymentAmount?: number;
  clearingDate?: string;
}
