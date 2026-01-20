
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Calculator, Clock, TrendingDown, Activity, Layers, ArrowRightLeft, CheckCircle2, FileText, X, User, ShieldCheck } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
  onSettle: (id: string, amount: number) => void;
}

const SettlementProcess: React.FC<Props> = ({ records, onSettle }) => {
  const [selectedRecord, setSelectedRecord] = useState<RevenueRecord | null>(null);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">结算中心</h2>
            <p className="text-sm text-slate-500">获取真实“尖、峰、平、谷”分时电量，集成多系统数据进行自动校验</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl">
             <Layers size={16} className="text-blue-600" />
             <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">数据集成源: 协合/远景</span>
          </div>
        </div>

        <div className="grid gap-6">
          {records.filter(r => r.status !== WorkflowStatus.DRAFT).map(record => (
            <div key={record.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex items-center justify-between p-6 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-6">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                      <Activity className="text-slate-400 group-hover:text-emerald-500" size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900">{record.projectName}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{record.month} 周期</p>
                   </div>
                </div>
                
                <div className="flex items-center space-x-12">
                   <div className="hidden md:block">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">结算金额合计</p>
                      <p className="font-black text-slate-900 text-xl">¥ {record.settlementAmount.toLocaleString()}</p>
                   </div>
                   <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center space-x-2 transition-all"
                      >
                         <FileText size={16} />
                         <span>查看结算单</span>
                      </button>
                      {record.status === WorkflowStatus.ACCRUED && (
                        <button 
                          onClick={() => onSettle(record.id, record.settlementAmount)}
                          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 active:scale-95 transition-all"
                        >
                          确认结算
                        </button>
                      )}
                   </div>
                </div>
            </div>
          ))}
        </div>

        {/* Professional Settlement Bill Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                   <div className="flex items-center space-x-2 text-emerald-600 font-black text-sm uppercase tracking-tighter">
                      <FileText size={18} />
                      <span>电费结算单 - 自发自用</span>
                   </div>
                   <div className="flex items-center space-x-4">
                      <button className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1 rounded-lg bg-white hover:bg-blue-50">
                        查看工单
                      </button>
                      <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
                        <X size={24} />
                      </button>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                   {/* Bill Header Info */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                      <div className="p-4 border-r border-b border-slate-200 flex flex-col justify-center bg-slate-50/50">
                         <span className="text-slate-400 font-bold mb-1">项目名称</span>
                      </div>
                      <div className="p-4 border-r border-b border-slate-200 flex items-center font-bold text-slate-800">
                         {selectedRecord.projectName}
                      </div>
                      <div className="p-4 border-r border-b border-slate-200 flex flex-col justify-center bg-slate-50/50">
                         <span className="text-slate-400 font-bold mb-1">抄表人</span>
                      </div>
                      <div className="p-4 border-b border-slate-200 flex items-center font-bold text-slate-800">
                         王增峰({selectedRecord.omUnit})
                      </div>
                      
                      <div className="p-4 border-r border-slate-200 flex flex-col justify-center bg-slate-50/50">
                         <span className="text-slate-400 font-bold mb-1">结算月份</span>
                      </div>
                      <div className="p-4 border-r border-slate-200 flex items-center font-bold text-emerald-600">
                         {selectedRecord.month}
                      </div>
                      <div className="p-4 border-r border-slate-200 flex flex-col justify-center bg-slate-50/50">
                         <span className="text-slate-400 font-bold mb-1">审核人</span>
                      </div>
                      <div className="p-4 flex items-center font-bold text-slate-800">
                         张士豪({selectedRecord.omUnit})
                      </div>
                   </div>

                   {/* Stats Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: General Energy Info */}
                      <div className="space-y-4">
                         <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-t-lg font-black text-[10px] uppercase tracking-widest inline-block">电表底码详情</div>
                         <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-xs text-left">
                               <tbody className="divide-y divide-slate-100">
                                  <tr className="bg-slate-50/50">
                                     <td className="px-4 py-3 text-slate-500 font-bold">总发电量</td>
                                     <td className="px-4 py-3 text-right font-black text-slate-900">{selectedRecord.totalGeneration.toLocaleString()}</td>
                                  </tr>
                                  <tr>
                                     <td className="px-4 py-3 text-slate-500 font-bold">自用电量</td>
                                     <td className="px-4 py-3 text-right font-black text-slate-900">{selectedRecord.selfUseKwh.toLocaleString()}</td>
                                  </tr>
                                  <tr className="bg-slate-50/50">
                                     <td className="px-4 py-3 text-slate-500 font-bold">反向设备用电</td>
                                     <td className="px-4 py-3 text-right font-black text-slate-900">{selectedRecord.reverseUseKwh.toLocaleString()}</td>
                                  </tr>
                                  <tr>
                                     <td className="px-4 py-3 text-slate-500 font-bold">上网电量</td>
                                     <td className="px-4 py-3 text-right font-black text-slate-900">{selectedRecord.gridExportKwh.toLocaleString()}</td>
                                  </tr>
                                  <tr className="bg-slate-50/50">
                                     <td className="px-4 py-3 text-slate-500 font-bold">消纳比</td>
                                     <td className="px-4 py-3 text-right font-black text-emerald-600">{selectedRecord.consumptionRatio}</td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                      </div>

                      {/* Right: Summary Figures */}
                      <div className="flex flex-col space-y-4">
                         <div className="flex-1 grid grid-cols-1 gap-3">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-between items-center shadow-inner">
                               <span className="text-slate-500 font-bold">应收电费(元)</span>
                               <span className="text-2xl font-black text-slate-900">{selectedRecord.receivableAmount.toLocaleString()}</span>
                            </div>
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 flex justify-between items-center shadow-lg shadow-emerald-50 relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-2 opacity-10"><CheckCircle2 size={48} /></div>
                               <span className="text-emerald-700 font-black">实收电费(元)</span>
                               <span className="text-3xl font-black text-emerald-600">{selectedRecord.settlementAmount.toLocaleString()}</span>
                            </div>
                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex justify-between items-center shadow-inner">
                               <span className="text-amber-700 font-bold">节省电费(元)</span>
                               <span className="text-2xl font-black text-amber-600">{selectedRecord.savingsAmount.toLocaleString()}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* TOU Table */}
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="bg-blue-600 text-white px-3 py-1.5 rounded-t-lg font-black text-[10px] uppercase tracking-widest inline-block">结算电量电费</div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">分时电价 折扣: 95%</div>
                      </div>
                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
                         <table className="w-full text-xs text-left border-collapse">
                            <thead>
                               <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500">
                                  <th className="px-6 py-4">时段</th>
                                  <th className="px-6 py-4 text-right">电量(kWh)</th>
                                  <th className="px-6 py-4 text-right">电价(元/kWh)</th>
                                  <th className="px-6 py-4 text-right">折后电价(元/kWh)</th>
                                  <th className="px-6 py-4 text-right">电费(元)</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {[
                                 { name: '尖', ...selectedRecord.actualKwhDetail.sharp, color: 'text-rose-500' },
                                 { name: '峰', ...selectedRecord.actualKwhDetail.peak, color: 'text-amber-500' },
                                 { name: '平', ...selectedRecord.actualKwhDetail.flat, color: 'text-blue-500' },
                                 { name: '谷', ...selectedRecord.actualKwhDetail.valley, color: 'text-emerald-500' },
                               ].map((tou, idx) => (
                                 <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4"><span className={`font-black ${tou.color}`}>{tou.name}</span></td>
                                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-800">{tou.kwh.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-500">{tou.price.toFixed(4)}</td>
                                    <td className="px-6 py-4 text-right font-mono font-bold text-blue-600">{tou.discountedPrice.toFixed(5)}</td>
                                    <td className="px-6 py-4 text-right font-black text-slate-900">¥{tou.amount.toLocaleString()}</td>
                                 </tr>
                               ))}
                               <tr className="bg-slate-900 text-white font-bold">
                                  <td className="px-6 py-4">设备用电电价</td>
                                  <td className="px-6 py-4 text-right">-{selectedRecord.reverseUseKwh}</td>
                                  <td className="px-6 py-4 text-right"></td>
                                  <td className="px-6 py-4 text-right font-mono">1.058</td>
                                  <td className="px-6 py-4 text-right font-black">-488.37</td>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                   <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                         <ShieldCheck className="text-emerald-500" size={16} />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">已通过运维数据三方核对</span>
                      </div>
                      <div className="flex items-center space-x-2">
                         <ShieldCheck className="text-emerald-500" size={16} />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">已同步 SAP 财务暂估冲回预置</span>
                      </div>
                   </div>
                   <div className="flex space-x-3">
                      <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50">
                        打印报表
                      </button>
                      <button className="px-8 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100">
                        提交确认
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
        
        <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
           <Layers className="absolute -right-10 -bottom-10 text-white/5" size={200} />
           <div className="max-w-2xl">
              <h4 className="text-lg font-bold mb-2">多系统集成对账机制</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                系统每月自动从“协合运维系统”集成 96 点分时数据。通过双向核对，系统可自动识别异常波动（如电表硬件故障或线路损耗异常），并在结算前自动推送告警。
              </p>
              <div className="flex space-x-6">
                 <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">数据自动稽核</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">差异化预警</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SAP 凭证联动</span>
                 </div>
              </div>
           </div>
        </div>
    </div>
  );
};

export default SettlementProcess;
