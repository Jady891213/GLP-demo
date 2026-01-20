
import { Project, WorkflowStatus, RevenueRecord, IntegrationStatus } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PRJ-2025-SH-01',
    name: '上海宝山分布式光伏项目',
    spv: '上海普枫新能源有限公司',
    capacity: '5.2MW',
    client: '上海普洛斯宝山物流有限公司',
    region: '华东区域',
    status: 'Active',
    rule: {
      type: '自发自用/分时折扣',
      discount: 0.95,
      description: '按当地大工业峰谷电价的95%结算'
    },
    details: {
      partyA: '上海普洛斯宝山物流有限公司',
      partyB: '上海普枫新能源有限公司',
      gridPoint: '高压配电房 1# 进线柜',
      meteringMethod: '高供高计',
      billingFormula: 'P = Σ(时段电量 × 时段标杆价 × 95%)',
      billingDay: '每月 1 日',
      paymentDay: '次月 30 日前',
      taxRate: '13%'
    }
  },
  {
    id: 'PRJ-2025-NJ-02',
    name: '南京江宁南项目',
    spv: '江苏普枫电力有限公司',
    capacity: '4.8MW',
    client: '南京普洛斯仓储设施有限公司',
    region: '华东区域',
    status: 'Active',
    rule: {
      type: '全额上网',
      discount: 1.0,
      description: '上网标杆电价 100% 结算'
    },
    details: {
      partyA: '国网江苏省电力有限公司',
      partyB: '江苏普枫电力有限公司',
      gridPoint: '110kV 变电站关口点',
      meteringMethod: '高供高计',
      billingFormula: 'P = 发电量 × 脱硫燃煤基准价',
      billingDay: '每月 25 日',
      paymentDay: '账单确认后 15 工作日内',
      taxRate: '13%'
    }
  }
];

export const INTEGRATION_LOGS: IntegrationStatus[] = [
  { system: 'SAP S/4HANA', status: 'Online', lastSync: '2025-09-25 09:00', latency: '24ms' },
  { system: '协合运维系统 (Xihe)', status: 'Online', lastSync: '2025-09-25 08:30', latency: '110ms' },
  { system: '远景能源 (Envision)', status: 'Online', lastSync: '2025-09-25 08:45', latency: '95ms' },
  { system: '航信开票系统', status: 'Online', lastSync: '2025-09-24 17:00', latency: '350ms' }
];

export const INITIAL_RECORDS: RevenueRecord[] = [
  {
    id: 'REV-202508-01',
    month: '2025年08月',
    billingCycle: '2025年07月31日 - 2025年08月31日',
    projectId: 'PRJ-2025-SH-01',
    projectName: '上海宝山',
    spvName: '上海普枫新能源有限公司',
    omUnit: '绿能中环',
    customerName: '中惠（南京）幕墙科技有限公司',
    status: WorkflowStatus.ACCRUED,
    accrualKwh: 373800,
    accrualAmount: 344392.01,
    accrualExclTax: 304771.69,
    accrualTax: 39620.32,
    accrualStartDate: '2025/9/1',
    accrualEndDate: '2025/9/25',
    totalGeneration: 373800,
    selfUseKwh: 336938.4,
    reverseUseKwh: 461.6,
    gridExportKwh: 36400,
    consumptionRatio: '90.14%',
    actualKwhDetail: {
      sharp: { kwh: 76320, price: 1.3770, discountedPrice: 1.30815, amount: 99838.01 },
      peak: { kwh: 190080, price: 1.1156, discountedPrice: 1.05982, amount: 201450.59 },
      flat: { kwh: 70080, price: 0.6508, discountedPrice: 0.61826, amount: 43327.66 },
      valley: { kwh: 920, price: 0.3022, discountedPrice: 0.28709, amount: 264.12 }
    },
    receivableAmount: 362543.61,
    settlementAmount: 344392.01,
    savingsAmount: 18151.6
  },
  {
    id: 'REV-202509-02',
    month: '2025年09月',
    billingCycle: '2025年08月31日 - 2025年09月30日',
    projectId: 'PRJ-2025-NJ-02',
    projectName: '南京江宁南',
    spvName: '江苏普枫电力有限公司',
    omUnit: '钧茂',
    customerName: '南京普洛斯仓储设施有限公司',
    status: WorkflowStatus.DRAFT,
    accrualKwh: 420500,
    accrualAmount: 385600.00,
    accrualExclTax: 341238.94,
    accrualTax: 44361.06,
    accrualStartDate: '2025/9/2',
    accrualEndDate: '2025/9/25',
    totalGeneration: 420500,
    selfUseKwh: 380500,
    reverseUseKwh: 500.0,
    gridExportKwh: 40000,
    consumptionRatio: '90.48%',
    actualKwhDetail: {
      sharp: { kwh: 80000, price: 1.3770, discountedPrice: 1.30815, amount: 104652.00 },
      peak: { kwh: 200000, price: 1.1156, discountedPrice: 1.05982, amount: 211964.00 },
      flat: { kwh: 139580, price: 0.6508, discountedPrice: 0.61826, amount: 86300.00 },
      valley: { kwh: 920, price: 0.3022, discountedPrice: 0.28709, amount: 264.12 }
    },
    receivableAmount: 405900.00,
    settlementAmount: 385600.00,
    savingsAmount: 20300.0
  }
];
