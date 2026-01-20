
import React from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Zap, Send, CheckCircle2, AlertCircle, Table as TableIcon, FileSpreadsheet } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
  onAccrue: (id: string, amount: number) => void;
}

const AccrualProcess: React.FC<Props> = ({ records, onAccrue }) => {
  const pendingRecords = records.filter(r => r.status === WorkflowStatus.DRAFT);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">收入暂估 (Accrual)</h2>
          <p className="text-sm text-slate-500">基于设备实时逆变器数据，生成上月预估收入报表</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 text-xs font-bold hover:bg-emerald-100 transition-colors">
            <FileSpreadsheet size={16} />
            <span>导出暂估报表 (Excel)</span>
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="text-blue-600" />
          <p className="text-sm text-blue-800 font-medium">当前有 {pendingRecords.length} 笔收入待暂估入账 (SAP 自动化同步)</p>
        </div>
        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
          暂估周期: 2025年9月
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
                <th className="px-4 py-4 border-r border-slate-800">项目号</th>
                <th className="px-4 py-4 border-r border-slate-800 min-w-[150px]">客户名称</th>
                <th className="px-4 py-4 border-r border-slate-800">所属项目</th>
                <th className="px-4 py-4 border-r border-slate-800">运维单位</th>
                <th className="px-4 py-4 border-r border-slate-800">电费类别</th>
                <th className="px-4 py-4 border-r border-slate-800">暂估起始</th>
                <th className="px-4 py-4 border-r border-slate-800">暂估截止</th>
                <th className="px-4 py-4 border-r border-slate-800 text-right">暂估电量(kWh)</th>
                <th className="px-4 py-4 border-r border-slate-800 text-right">合规总金额</th>
                <th className="px-4 py-4 text-center">状态 / 操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-4 text-slate-500 font-mono">{record.projectId}</td>
                  <td className="px-4 py-4 text-slate-900 font-bold">{record.customerName}</td>
                  <td className="px-4 py-4 text-slate-600">{record.projectName}</td>
                  <td className="px-4 py-4 text-slate-600">{record.omUnit}</td>
                  <td className="px-4 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase">自发自用</span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 font-mono">{record.accrualStartDate}</td>
                  <td className="px-4 py-4 text-slate-500 font-mono">{record.accrualEndDate}</td>
                  <td className="px-4 py-4 text-right font-black text-slate-900">{record.accrualKwh.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right font-black text-blue-600">¥{record.accrualAmount.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      {record.status === WorkflowStatus.DRAFT ? (
                        <button 
                          onClick={() => onAccrue(record.id, record.accrualAmount)}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center space-x-1 shadow-lg shadow-blue-100"
                        >
                          <Send size={14} />
                          <span>入账</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1 text-emerald-500 font-bold">
                          <CheckCircle2 size={16} />
                          <span>已同步 SAP</span>
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group">
           <Zap className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-500" size={120} />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">暂估统计 (当月)</p>
           <div className="flex items-end space-x-2">
             <span className="text-4xl font-black">¥ 730,000</span>
             <span className="text-xs text-slate-400 mb-1.5">.01</span>
           </div>
           <p className="text-xs text-emerald-400 mt-2 font-bold flex items-center">
             <Zap size={14} className="mr-1 fill-current" />
             较上月增长 8.4%
           </p>
        </div>
        
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 flex items-center space-x-6 shadow-sm">
           <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 border border-amber-100">
             <TableIcon size={32} />
           </div>
           <div>
              <h5 className="font-bold text-slate-900 mb-1">业财核对逻辑说明</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                暂估金额通过“逆变器发电总量 × 合同折扣价”自动计算。系统将在每月第1个工作日零点自动从运维侧集成数据，
                经财务负责人一键点击“提交”，系统将自动在 SAP 生成暂估凭证。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AccrualProcess;
