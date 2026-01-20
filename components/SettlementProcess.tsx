
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Calculator, Activity, Layers, CheckCircle2, FileText, X, RefreshCw, Database, ArrowRightLeft } from 'lucide-react';

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

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">结算中心</h2>
            <p className="text-sm text-slate-500">获取分时电量真实值，自动计算并生成结算确认单</p>
          </div>
          <div className="flex space-x-3">
             <div className="flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl">
                <Database size={16} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">数据源: 协合 (Xihe)</span>
             </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex items-center justify-between">
           <Layers className="absolute -right-10 -bottom-10 text-white/5" size={200} />
           <div className="relative z-10 max-w-xl">
              <h4 className="text-lg font-bold mb-2">电量对账集成引擎</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                 系统每日自动抓取结算关口表底码。由于结算涉及阶梯折扣与分时定价，系统将自动匹配合同条款进行“试算”，
                 生成结算草案后由用户进行核对确认。
              </p>
           </div>
           <button 
             onClick={() => onSync('all')}
             className="relative z-10 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-2xl font-black text-sm flex items-center space-x-3 transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
           >
             <RefreshCw size={18} />
             <span>全量同步当月电量</span>
           </button>
        </div>

        <div className="grid gap-6">
          {records.map(record => (
            <div key={record.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-between p-6 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-6">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                      <Activity className="text-slate-400 group-hover:text-blue-500" size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900">{record.projectName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                         <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${getStatusStyle(record.status)}`}>
                            {record.status}
                         </span>
                         {record.syncTime && (
                           <span className="text-[10px] text-slate-400 font-medium">上次同步: {record.syncTime.slice(11, 16)}</span>
                         )}
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center space-x-8">
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">应收金额 (试算)</p>
                      <p className="font-black text-slate-900 text-xl">¥ {record.settlementAmount.toLocaleString()}</p>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                      {record.status !== WorkflowStatus.SETTLED && record.status !== WorkflowStatus.INVOICED && (
                        <button 
                          onClick={() => onSync(record.id)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
                          title="同步电量"
                        >
                          <RefreshCw size={18} />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center space-x-2 transition-all"
                      >
                         <FileText size={16} />
                         <span>查看详情</span>
                      </button>

                      {record.status === WorkflowStatus.SYNCED && (
                        <button 
                          onClick={() => onSettle(record.id)}
                          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all"
                        >
                          生成结算单
                        </button>
                      )}
                   </div>
                </div>
            </div>
          ))}
        </div>

        {/* Detailed Bill Modal (Placeholder for logic) */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                   <div className="flex items-center space-x-3">
                      <Calculator className="text-emerald-500" />
                      <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">结算对账单 - {selectedRecord.projectName}</h3>
                   </div>
                   <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-slate-900">
                      <X size={24} />
                   </button>
                </div>
                <div className="p-10 grid grid-cols-2 gap-12 bg-white">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">能源底码详情</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
                         <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-xs text-slate-500">自发自用量 (kWh)</span>
                            <span className="text-sm font-black text-slate-900">{selectedRecord.selfUseKwh.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-xs text-slate-500">反向用电量 (kWh)</span>
                            <span className="text-sm font-black text-slate-900">{selectedRecord.reverseUseKwh.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">综合消纳比</span>
                            <span className="text-sm font-black text-emerald-600">{selectedRecord.consumptionRatio}</span>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-blue-500 pl-3">财务结算试算</h4>
                      <div className="bg-blue-50 p-6 rounded-2xl space-y-4 border border-blue-100">
                         <div className="flex justify-between items-center">
                            <span className="text-xs text-blue-800">试算金额 (含税)</span>
                            <span className="text-2xl font-black text-blue-900">¥ {selectedRecord.settlementAmount.toLocaleString()}</span>
                         </div>
                         <p className="text-[10px] text-blue-600 font-medium leading-relaxed italic border-t border-blue-200 pt-3">
                            "根据合同 PRJ-2025-SH-01 条款：执行上海大工业峰谷电价之 95% 结算。系统已自动排除设备内部损耗电量。"
                         </p>
                      </div>
                   </div>
                </div>
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
                   <button onClick={() => setSelectedRecord(null)} className="px-6 py-2 text-xs font-bold text-slate-600">关闭</button>
                   {selectedRecord.status === WorkflowStatus.SYNCED && (
                      <button 
                        onClick={() => { onSettle(selectedRecord.id); setSelectedRecord(null); }}
                        className="bg-emerald-600 text-white px-8 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700"
                      >
                         确认结算并生成单据
                      </button>
                   )}
                </div>
             </div>
          </div>
        )}
    </div>
  );
};

export default SettlementProcess;
