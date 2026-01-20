
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Banknote, Search, CheckCircle2, ShieldCheck, Clock, Link as LinkIcon, ArrowRightLeft, Database, X, Printer, Download, FileCheck } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
  onClear: (id: string, amount: number) => void;
}

interface BankFlow {
  id: string;
  payer: string;
  amount: number;
  date: string;
  ref: string;
  matched: boolean;
}

const ClearingProcess: React.FC<Props> = ({ records, onClear }) => {
  const [selectedAR, setSelectedAR] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [showVoucher, setShowVoucher] = useState<RevenueRecord | null>(null);
  const [bankFlows, setBankFlows] = useState<BankFlow[]>([
    { id: 'BF-001', payer: '上海普洛斯宝山物流有限公司', amount: 344392.01, date: '2025-09-04', ref: 'PAY-BK-SH9011', matched: false },
    { id: 'BF-002', payer: '南京普洛斯仓储设施有限公司', amount: 385600.00, date: '2025-09-10', ref: 'PAY-BK-NJ8273', matched: false },
    { id: 'BF-003', payer: '绿能环保(测试方)', amount: 50000.00, date: '2025-09-12', ref: 'PAY-BK-TEST01', matched: false },
  ]);

  const clearingRecords = records.filter(r => r.status === WorkflowStatus.INVOICED || r.status === WorkflowStatus.CLEARED);

  const handleManualMatch = () => {
    if (!selectedAR || !selectedFlow) return;
    const record = clearingRecords.find(r => r.id === selectedAR);
    const flow = bankFlows.find(f => f.id === selectedFlow);
    
    if (record && flow) {
       onClear(record.id, flow.amount);
       setBankFlows(prev => prev.map(f => f.id === flow.id ? { ...f, matched: true } : f));
       setSelectedAR(null);
       setSelectedFlow(null);
    }
  };

  const ClearingVoucherModal = ({ record }: { record: RevenueRecord }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <FileCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">业财核销确认单</h3>
              <p className="text-[10px] opacity-80">Clearing & Settlement Voucher</p>
            </div>
          </div>
          <button onClick={() => setShowVoucher(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 bg-white space-y-8">
           <div className="flex justify-between border-b-2 border-slate-100 pb-6">
              <div className="space-y-1">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">核销单号</p>
                 <p className="font-mono font-bold text-slate-900">VCH-CLE-202509-{record.id.split('-').pop()}</p>
              </div>
              <div className="text-right space-y-1">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">核销日期</p>
                 <p className="font-mono font-bold text-slate-900">{record.clearingDate?.split('T')[0] || '2025-09-25'}</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-blue-500 pl-3">应收账款 (AR)</h4>
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-800">{record.customerName}</p>
                    <p className="text-[10px] text-slate-500">发票号码: {record.invoiceNo}</p>
                    <div className="pt-2 flex justify-between items-end">
                       <span className="text-[10px] text-slate-400 font-medium">应收金额</span>
                       <span className="text-lg font-black text-slate-900">¥{record.settlementAmount.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">银行流水 (Flow)</h4>
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-800">{record.customerName}</p>
                    <p className="text-[10px] text-slate-500">流水参考号: PAY-BK-SH9011</p>
                    <div className="pt-2 flex justify-between items-end">
                       <span className="text-[10px] text-slate-400 font-medium">到账金额</span>
                       <span className="text-lg font-black text-emerald-600">¥{record.paymentAmount?.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm mb-4">
                 <ShieldCheck size={18} />
                 <span>SAP 对账凭证已自动生成</span>
              </div>
              <div className="grid grid-cols-2 gap-6 text-[10px]">
                 <div className="flex justify-between border-b border-emerald-200 pb-1">
                    <span className="text-emerald-600">借: 银行存款</span>
                    <span className="font-mono text-slate-900 font-bold">¥{record.paymentAmount?.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between border-b border-emerald-200 pb-1">
                    <span className="text-emerald-600">贷: 应收账款</span>
                    <span className="font-mono text-slate-900 font-bold">¥{record.paymentAmount?.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center space-x-2 text-slate-500">
              <Database size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">数据已同步至总账系统 (General Ledger)</span>
           </div>
           <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                 <Printer size={16} />
                 <span>打印</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all">
                 <Download size={16} />
                 <span>导出 PDF</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">核销与催收 (Clearing Workspace)</h2>
            <p className="text-sm text-slate-500">通过智能对账引擎，将银行流水与正式发票进行匹配核销</p>
          </div>
          <div className="flex space-x-3">
             <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                <ShieldCheck size={18} className="text-emerald-500 mr-2" />
                <span className="text-xs font-bold text-slate-600">自动对账率: 92%</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
           {/* Left: Pending Invoices (AR) */}
           <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                   <ArrowRightLeft size={16} className="mr-2 text-blue-500" />
                   待收回发票 (正式 AR)
                 </h3>
                 <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                   {clearingRecords.filter(r => r.status === WorkflowStatus.INVOICED).length} 笔待处理
                 </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {clearingRecords.map(record => (
                       <div 
                         key={record.id} 
                         onClick={() => record.status !== WorkflowStatus.CLEARED && setSelectedAR(record.id === selectedAR ? null : record.id)}
                         className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                           record.status === WorkflowStatus.CLEARED 
                             ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
                             : record.id === selectedAR 
                               ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 shadow-lg translate-x-1' 
                               : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                         }`}
                       >
                          <div className="flex items-start justify-between">
                             <div className="flex-1">
                                <p className="text-xs font-black text-slate-900 mb-1">{record.projectName}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{record.spvName}</p>
                             </div>
                             {record.status === WorkflowStatus.CLEARED && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setShowVoucher(record); }}
                                  className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all"
                                >
                                   <CheckCircle2 size={16} />
                                </button>
                             )}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                             <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                                <span>INV: {record.invoiceNo}</span>
                             </div>
                             <p className="font-black text-slate-900">¥{record.settlementAmount.toLocaleString()}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right: Bank Flows */}
           <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                   <Banknote size={16} className="mr-2 text-emerald-500" />
                   实时银行流水 (SPV 到账)
                 </h3>
                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                   {bankFlows.filter(f => !f.matched).length} 笔待对账
                 </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex-1 flex flex-col">
                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {bankFlows.map(flow => (
                       <div 
                         key={flow.id} 
                         onClick={() => !flow.matched && setSelectedFlow(flow.id === selectedFlow ? null : flow.id)}
                         className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                           flow.matched 
                             ? 'bg-slate-800/50 border-slate-800 opacity-40' 
                             : flow.id === selectedFlow 
                               ? 'bg-emerald-900/50 border-emerald-500 ring-2 ring-emerald-400/30 shadow-lg -translate-x-1' 
                               : 'bg-slate-800/80 border-slate-700 hover:border-emerald-600'
                         }`}
                       >
                          <div className="flex items-start justify-between">
                             <div className="flex-1">
                                <p className="text-xs font-bold text-white mb-1">{flow.payer}</p>
                                <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">REF: {flow.ref}</p>
                             </div>
                             <p className="text-[10px] font-mono text-slate-500">{flow.date}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                             <div className="flex items-center space-x-1 text-emerald-500">
                                <ShieldCheck size={12} />
                                <span className="text-[9px] font-black uppercase tracking-widest">已验证流水</span>
                             </div>
                             <p className="font-black text-emerald-400 text-lg">¥{flow.amount.toLocaleString()}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Floating Matching Action Bar */}
        {(selectedAR || selectedFlow) && (
           <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[600px] bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-blue-900/40 animate-in slide-in-from-bottom-12 duration-500 z-40">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-6">
                    <div className={`p-3 rounded-2xl transition-all ${selectedAR ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                       <ArrowRightLeft size={24} />
                    </div>
                    <div className="flex flex-col">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">手动对账匹配</p>
                       <p className="text-sm text-white font-medium">
                          {selectedAR && selectedFlow ? '已就绪，可执行核销' : '请在左右侧分别选择发票与流水'}
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => { setSelectedAR(null); setSelectedFlow(null); }}
                      className="text-slate-400 hover:text-white transition-colors p-2"
                    >
                       <X size={20} />
                    </button>
                    <button 
                      disabled={!selectedAR || !selectedFlow}
                      onClick={handleManualMatch}
                      className={`px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center space-x-2 ${
                        selectedAR && selectedFlow 
                          ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 active:scale-95' 
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                       <LinkIcon size={18} />
                       <span>执行业财核销 (SAP)</span>
                    </button>
                 </div>
              </div>
           </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex items-start space-x-6">
           <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-blue-500">
              <Database size={32} />
           </div>
           <div>
              <h4 className="font-bold text-slate-900 mb-2 text-lg">智能对账与合规管控</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 max-w-3xl">
                系统通过算法自动识别付款方名称、到账金额与待收回发票的匹配度。
                执行核销后，系统将自动在 SAP 财务侧生成“收款核销”凭证，结清应收账款。
                对于逾期 30 天以上的未匹配项目，系统将自动触发“催收通知书”推送至对应客户负责人邮箱。
              </p>
              <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>流水实时监听</span>
                 </div>
                 <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>多维度模糊匹配</span>
                 </div>
                 <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>SAP OData 凭证联动</span>
                 </div>
              </div>
           </div>
        </div>

        {showVoucher && <ClearingVoucherModal record={showVoucher} />}
    </div>
  );
};

export default ClearingProcess;
