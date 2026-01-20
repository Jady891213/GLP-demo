
import React from 'react';
import { BookOpen, ArrowRightLeft, Database, Settings2, ShieldCheck, Zap, Info, ChevronRight, Calculator } from 'lucide-react';

const AccountingEngine: React.FC = () => {
  const rules = [
    {
      id: 'EVT-001',
      eventName: '收入暂估 (Revenue Accrual)',
      description: '每月结账期间基于运维电量自动预估收入',
      entries: [
        { dir: 'Debit', code: '1122.0101', name: '应收账款-暂估', formula: '暂估总金额 (含税)' },
        { dir: 'Credit', code: '6001.0101', name: '主营业务收入-光伏电费', formula: '暂估总金额 / (1+税率)' },
        { dir: 'Credit', code: '2221.0199', name: '应交税费-待转销项税额', formula: '暂估总金额 - 不含税金额' }
      ]
    },
    {
      id: 'EVT-002',
      eventName: '结算确认 (Settlement Confirmation)',
      description: '正式结算单确认后，自动冲回暂估并入正式应收',
      entries: [
        { dir: 'Debit', code: '1122.0101', name: '应收账款-暂估 (反冲)', formula: '-1 * 原暂估金额' },
        { dir: 'Debit', code: '1122.0201', name: '应收账款-正式', formula: '正式结算金额' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">会计引擎配置 (Accounting Engine)</h2>
            <p className="text-sm text-slate-500">定义业务事件与 SAP 财务分录的自动映射规则</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center space-x-2 shadow-xl shadow-slate-900/10">
              <Settings2 size={18} />
              <span>配置全局科目库</span>
          </button>
       </div>

       <div className="grid grid-cols-1 gap-8">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
               <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center space-x-6">
                     <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <Zap size={28} />
                     </div>
                     <div>
                        <h4 className="font-black text-slate-900 text-xl flex items-center">
                           {rule.eventName}
                           <span className="ml-4 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Active Rule</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{rule.description}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <span>Event ID:</span>
                     <span className="text-slate-900 font-mono">{rule.id}</span>
                  </div>
               </div>

               <div className="p-10">
                  <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
                     <table className="w-full text-left text-xs border-collapse relative z-10">
                        <thead>
                           <tr className="border-b border-white/10 text-white/40 font-black uppercase tracking-widest text-[9px]">
                              <th className="px-8 py-6">分录方向</th>
                              <th className="px-8 py-6">SAP 科目代码</th>
                              <th className="px-8 py-6">科目名称</th>
                              <th className="px-8 py-6 text-center"><ArrowRightLeft size={14} className="mx-auto" /></th>
                              <th className="px-8 py-6">取数公式 (Variable Mapping)</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {rule.entries.map((entry, idx) => (
                              <tr key={idx} className="hover:bg-white/5 transition-colors group/row">
                                 <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border ${
                                       entry.dir === 'Debit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                       {entry.dir === 'Debit' ? '借方 (Dr)' : '贷方 (Cr)'}
                                    </span>
                                 </td>
                                 <td className="px-8 py-6 font-mono font-bold text-white group-hover/row:text-blue-400 transition-colors">{entry.code}</td>
                                 <td className="px-8 py-6 text-slate-400 font-medium">{entry.name}</td>
                                 <td className="px-8 py-6 text-center">
                                    <ChevronRight className="text-slate-700 mx-auto" size={14} />
                                 </td>
                                 <td className="px-8 py-6">
                                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 font-mono text-[10px] text-emerald-400">
                                       {entry.formula}
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                     <div className="flex items-center space-x-3 text-slate-500">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">已完成 2024 年财务审计合规性检查</span>
                     </div>
                     <div className="flex space-x-3">
                        <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-200 transition-all">
                           模拟试算
                        </button>
                        <button className="px-8 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all">
                           保存并发布
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="bg-blue-50 border border-blue-200 rounded-[2.5rem] p-10 flex items-start space-x-8 shadow-sm">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-blue-500 shrink-0">
             <Calculator size={32} />
          </div>
          <div>
             <h4 className="font-black text-slate-900 text-xl mb-3 flex items-center">
                <BookOpen className="mr-3" />
                逻辑治理说明: 业财双闭环
             </h4>
             <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
               本会计引擎是“业财一体化”的核心中枢。它将原本隔离的运维电量（物理事件）实时转化为会计分录（经济业务）。
               在<span className="font-black text-slate-900">【暂估环节】</span>，引擎自动识别 SPV 与 客户关系，调用最新的 SAP 会计期间状态。
               在<span className="font-black text-slate-900">【结算环节】</span>，引擎自动计算“暂估与实际”的差额，并自动在 SAP 执行反冲与重计，确保总账科目 100% 准确。
             </p>
          </div>
       </div>
    </div>
  );
};

export default AccountingEngine;
