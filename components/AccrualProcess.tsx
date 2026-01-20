
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
// Fixed missing icon imports: ShieldCheck, Database, X
import { Zap, Send, CheckCircle2, AlertCircle, FileSpreadsheet, TrendingUp, TrendingDown, Clock, Search, BarChart3, ChevronDown, Eye, ShieldCheck, Database, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Props {
  records: RevenueRecord[];
  onAccrue: (id: string, amount: number) => void;
}

const AccrualProcess: React.FC<Props> = ({ records, onAccrue }) => {
  const [selectedRecord, setSelectedRecord] = useState<RevenueRecord | null>(null);
  const [billingPeriod, setBillingPeriod] = useState('2025-09');

  const stats = [
    { label: '本月暂估收入', value: '¥730,000', mom: '+8.4%', trend: 'up' },
    { label: '去年同期对比', value: '¥680,000', mom: '+12.5%', trend: 'up' },
    { label: '暂估准确率', value: '98.2%', mom: '-0.4%', trend: 'down' },
  ];

  // Mock raw inverter trend data
  const rawTrendData = [
    { day: '01', kwh: 12000, revenue: 11000 },
    { day: '05', kwh: 15000, revenue: 13800 },
    { day: '10', kwh: 14000, revenue: 12900 },
    { day: '15', kwh: 18000, revenue: 16500 },
    { day: '20', kwh: 16000, revenue: 14800 },
    { day: '25', kwh: 17500, revenue: 16100 },
    { day: '30', kwh: 19000, revenue: 17500 },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">收入暂估 (Revenue Accrual)</h2>
          <p className="text-sm text-slate-500">基于逆变器实时采集电量，自动映射会计期间进行月度结账预估</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Clock size={16} /></span>
              <select 
                value={billingPeriod}
                onChange={(e) => setBillingPeriod(e.target.value)}
                className="pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black appearance-none focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm cursor-pointer"
              >
                <option value="2025-09">账期: 2025年09月</option>
                <option value="2025-08">账期: 2025年08月</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
           </div>
           <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
            <FileSpreadsheet size={18} />
            <span>导出暂估单 (Excel)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              <div className={`flex items-center mt-2 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {stat.mom} <span className="text-slate-400 ml-1 font-medium">vs 上期</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               {i === 0 ? <Zap className="text-emerald-500" /> : i === 1 ? <BarChart3 className="text-blue-500" /> : <ShieldCheck className="text-purple-500" />}
            </div>
          </div>
        ))}
      </div>

      {/* Raw Data Trend Chart */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-100">
                 <Zap size={24} />
              </div>
              <div>
                 <h4 className="font-black text-slate-900 text-lg">发电量原始趋势 (逆变器实时)</h4>
                 <p className="text-xs text-slate-400">数据源: 协合运维 / 频率: 15Min一次</p>
              </div>
           </div>
           <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> 原始发电 (kWh)</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span> 暂估收入 (RMB)</div>
           </div>
        </div>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rawTrendData}>
                <defs>
                   <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="kwh" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorKwh)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Accrual List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
                <th className="px-6 py-6 border-r border-slate-800">项目识别码</th>
                <th className="px-6 py-6 border-r border-slate-800">对应客户</th>
                <th className="px-6 py-6 border-r border-slate-800">暂估电量 (kWh)</th>
                <th className="px-6 py-6 border-r border-slate-800 text-right">暂估金额 (RMB)</th>
                <th className="px-6 py-6 border-r border-slate-800 text-right">环比 (MoM)</th>
                <th className="px-6 py-6 border-r border-slate-800 text-right">同比 (YoY)</th>
                <th className="px-6 py-6 text-center">系统指令</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-6 font-mono text-slate-500">{record.projectId}</td>
                  <td className="px-6 py-6">
                     <p className="font-black text-slate-900 text-sm mb-0.5">{record.customerName}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">{record.projectName}</p>
                  </td>
                  <td className="px-6 py-6 font-black text-slate-900 text-base">{record.accrualKwh.toLocaleString()}</td>
                  <td className="px-6 py-6 text-right font-black text-blue-600 text-base">¥{record.accrualAmount.toLocaleString()}</td>
                  <td className="px-6 py-6 text-right font-bold text-emerald-500">+4.2%</td>
                  <td className="px-6 py-6 text-right font-bold text-blue-500">+11.5%</td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center space-x-2">
                       <button 
                         onClick={() => setSelectedRecord(record)}
                         className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                         title="查看原始数据"
                       >
                         <Eye size={16} />
                       </button>
                      {record.status === WorkflowStatus.DRAFT ? (
                        <button 
                          onClick={() => onAccrue(record.id, record.accrualAmount)}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center space-x-2"
                        >
                          <Send size={14} />
                          <span>一键入账</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
                          <CheckCircle2 size={16} />
                          <span>SAP 已记账</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Data Detail Modal */}
      {selectedRecord && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
               <div className="px-10 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                     <Database className="text-blue-500" />
                     <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">原始逆变器数据备查 - {selectedRecord.projectName}</h3>
                  </div>
                  <button onClick={() => setSelectedRecord(null)}><X size={24} className="text-slate-400" /></button>
               </div>
               <div className="p-10 space-y-6">
                  <div className="bg-slate-900 text-white p-6 rounded-3xl grid grid-cols-4 gap-4">
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">平均功率</p>
                        <p className="text-xl font-black">4.2 MW</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">峰值效率</p>
                        <p className="text-xl font-black text-emerald-400">98.4%</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">逆变器在线率</p>
                        <p className="text-xl font-black text-blue-400">100%</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">数据同步状态</p>
                        <p className="text-xl font-black text-amber-400">Real-time</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">月度日均发电量 (前10天)</h5>
                        <div className="space-y-2">
                           {[1200, 1450, 980, 2100, 1800].map((v, i) => (
                              <div key={i} className="flex justify-between items-center text-xs">
                                 <span className="text-slate-400">Day {i+1}</span>
                                 <span className="font-mono font-bold text-slate-700">{v.toLocaleString()} kWh</span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center text-center">
                        <AlertCircle className="mx-auto text-blue-500 mb-2" size={32} />
                        <p className="text-xs text-blue-800 font-bold">业财审计合规提醒</p>
                        <p className="text-[10px] text-blue-600 leading-relaxed mt-2">
                          所有暂估数据均具备完整的“能流追溯”链条。从底层 Modbus 协议采集到财务结算引擎，均具备不可篡改之电子存证。
                        </p>
                     </div>
                  </div>
               </div>
               <div className="px-10 py-6 border-t border-slate-100 flex justify-end">
                  <button onClick={() => setSelectedRecord(null)} className="px-8 py-2 bg-slate-900 text-white rounded-xl text-xs font-black">确认并返回</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AccrualProcess;
