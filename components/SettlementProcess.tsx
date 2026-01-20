
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Calculator, Activity, Layers, CheckCircle2, FileText, X, RefreshCw, Database, Printer, Download, Clock, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
  onSync: (id: string) => void;
  onSettle: (id: string) => void;
}

const SettlementProcess: React.FC<Props> = ({ records, onSync, onSettle }) => {
  const [selectedRecord, setSelectedRecord] = useState<RevenueRecord | null>(null);

  const getStatusStyle = (status: WorkflowStatus) => {
    switch (status) {
      case WorkflowStatus.SYNCED: return 'bg-blue-50 text-blue-600 border-blue-100';
      case WorkflowStatus.SETTLED: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const SettlementDetailModal = ({ record }: { record: RevenueRecord }) => (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-emerald-500 rounded-3xl shadow-lg shadow-emerald-500/20">
              <Calculator size={28} />
            </div>
            <div>
              <h3 className="font-black text-2xl uppercase tracking-tight">结算确认单 (Energy Settlement)</h3>
              <p className="text-sm text-slate-400 font-medium">编号: ST-2025-{record.id.slice(-6)} | 账期: {record.month}</p>
            </div>
          </div>
          <button onClick={() => setSelectedRecord(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="p-10 grid grid-cols-12 gap-10 bg-white">
          {/* Header Data */}
          <div className="col-span-12 grid grid-cols-3 gap-6 mb-4">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">甲方 (客户名称)</p>
               <p className="font-bold text-slate-900 truncate">{record.customerName}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">乙方 (结算主体)</p>
               <p className="font-bold text-slate-900 truncate">{record.spvName}</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 relative overflow-hidden group">
               <Zap className="absolute -right-4 -bottom-4 text-emerald-100 group-hover:scale-110 transition-transform" size={80} />
               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 relative z-10">正式结算金额 (含税)</p>
               <p className="text-3xl font-black text-emerald-700 relative z-10">¥{record.settlementAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Meter Details */}
          <div className="col-span-8 space-y-8">
            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                 <Activity size={16} className="mr-2 text-blue-500" />
                 计量表计读数详情
               </h4>
               <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50">
                     <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <th className="px-6 py-4">计费时段</th>
                       <th className="px-6 py-4 text-right">起读 (kWh)</th>
                       <th className="px-6 py-4 text-right">止读 (kWh)</th>
                       <th className="px-6 py-4 text-right">单价 (折扣后)</th>
                       <th className="px-6 py-4 text-right">金额 (RMB)</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {[
                        { period: '尖峰时段', start: 120500, end: 196820, price: 1.308, amount: 99838.01 },
                        { period: '高峰时段', start: 450200, end: 640280, price: 1.059, amount: 201450.59 },
                        { period: '平时段', start: 980100, end: 1050180, price: 0.618, amount: 43327.66 }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-700">{row.period}</td>
                          <td className="px-6 py-4 text-right font-mono text-slate-500">{row.start.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right font-mono text-slate-900">{row.end.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right font-mono text-blue-600">¥{row.price}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">¥{row.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100/50 flex items-start space-x-6">
               <div className="p-3 bg-white rounded-2xl shadow-sm">
                 <ShieldCheck className="text-blue-500" size={24} />
               </div>
               <div>
                  <h5 className="font-bold text-blue-900 mb-1">业财自动化校验引擎 (SAP Check)</h5>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    系统已自动对比运维侧 Xihe 发电量数据与暂估数据。
                    <span className="font-black ml-1 underline">检测到结算差异率: 0.24% (在合理线损范围内)</span>。
                    确认结算后，系统将通过 OData 接口在 SAP 实时触发暂估反冲。
                  </p>
               </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Printer size={120} />
              </div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">结算汇总摘要</h5>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-xs text-slate-400">总用电量</span>
                  <span className="text-xl font-black">373,800 <span className="text-[10px] font-medium text-slate-500">kWh</span></span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-xs text-slate-400">自发自用比</span>
                  <span className="text-xl font-black text-emerald-400">90.14%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-xs text-slate-400">合同电费</span>
                  <span className="text-xl font-black">¥362,543.61</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400 font-bold">客户节省 (vs 标杆)</span>
                  <span className="text-xl font-black text-blue-400">¥18,151.60</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-[10px] font-black uppercase text-white/40 rotate-12">
                   GLP SEAL
                 </div>
                 <p className="text-[9px] text-slate-500 font-medium">系统已完成财务合规检查，可执行确认。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <Printer size={16} />
                <span>打印确认单</span>
              </button>
              <button className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <Download size={16} />
                <span>下载 PDF</span>
              </button>
           </div>
           <div className="flex space-x-4">
             <button onClick={() => setSelectedRecord(null)} className="px-8 py-3 text-sm font-bold text-slate-600 hover:text-slate-900">取消</button>
             {record.status === WorkflowStatus.SYNCED && (
               <button 
                 onClick={() => { onSettle(record.id); setSelectedRecord(null); }}
                 className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 transition-all"
               >
                 确认结算并提交财务
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">结算中心 (Settlement Center)</h2>
            <p className="text-sm text-slate-500">获取分时电量真实值，自动计算并生成正式结算确认单</p>
          </div>
          <div className="flex space-x-3">
             <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
                <Clock size={16} className="text-blue-500" />
                <span className="text-xs font-bold text-slate-600">当前账期: 2025年09月</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex items-center justify-between shadow-2xl">
           <Layers className="absolute -right-20 -bottom-20 text-white/5" size={300} />
           <div className="relative z-10 max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                 <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/30">Auto-Calculation Engine</span>
              </div>
              <h4 className="text-2xl font-black mb-4">智能结算对账集成</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                 系统每日自动抓取结算关口表底码。由于结算涉及复杂的阶梯折扣与分时定价，系统将自动匹配《合同档案》条款进行正式“试算”。
                 生成结算确认单后，经用户核对确认，系统将触发正式的 SAP 应收账款生成。
              </p>
           </div>
           <button 
             onClick={() => onSync('all')}
             className="relative z-10 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-4 rounded-3xl font-black text-sm flex items-center space-x-3 transition-all active:scale-95 shadow-2xl shadow-emerald-500/30"
           >
             <RefreshCw size={20} />
             <span>全量同步当月电量</span>
           </button>
        </div>

        <div className="grid gap-6 mt-8">
          {records.map(record => (
            <div key={record.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex items-center justify-between p-8 group hover:shadow-2xl transition-all duration-500 hover:border-blue-200">
                <div className="flex items-center space-x-8">
                   <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      <Activity className="text-slate-400 group-hover:text-blue-500" size={28} />
                   </div>
                   <div>
                      <h3 className="font-black text-slate-900 text-lg mb-1">{record.projectName}</h3>
                      <div className="flex items-center space-x-3">
                         <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusStyle(record.status)}`}>
                            {record.status}
                         </span>
                         {record.syncTime && (
                           <span className="text-[10px] text-slate-400 font-bold flex items-center">
                             <Clock size={12} className="mr-1" />
                             同步于: {record.syncTime.slice(11, 16)}
                           </span>
                         )}
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center space-x-12">
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">结算预估 (含税)</p>
                      <p className="font-black text-slate-900 text-2xl">¥{record.settlementAmount.toLocaleString()}</p>
                   </div>
                   
                   <div className="flex items-center space-x-4">
                      {record.status !== WorkflowStatus.SETTLED && record.status !== WorkflowStatus.INVOICED && (
                        <button 
                          onClick={() => onSync(record.id)}
                          className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100 shadow-sm"
                          title="同步电量"
                        >
                          <RefreshCw size={20} />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-xs font-black hover:bg-slate-50 flex items-center space-x-2 transition-all shadow-sm"
                      >
                         <FileText size={18} />
                         <span>查看详情</span>
                      </button>

                      {record.status === WorkflowStatus.SYNCED && (
                        <button 
                          onClick={() => onSettle(record.id)}
                          className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-slate-800 shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
                        >
                          提交结算
                        </button>
                      )}
                   </div>
                </div>
            </div>
          ))}
        </div>

        {selectedRecord && <SettlementDetailModal record={selectedRecord} />}
    </div>
  );
};

export default SettlementProcess;
