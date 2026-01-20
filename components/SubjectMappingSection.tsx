
import React from 'react';
import { SubjectMapping } from '../types';
import { ListChecks, ArrowRightLeft, Database, Search } from 'lucide-react';

interface Props {
  mappings: SubjectMapping[];
}

const SubjectMappingSection: React.FC<Props> = ({ mappings }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">科目映射 (Subject Mapping)</h2>
          <p className="text-sm text-slate-500">定义业务流程与 SAP 财务科目的自动化链接关系</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" placeholder="搜索映射关系..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none w-64" />
           </div>
           <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Database size={14} />
              <span>配置规则</span>
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">业务环节</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center">映射</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">SAP 科目代码</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">科目名称</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">借/贷方向</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mappings.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-900">{m.businessType}</span>
                </td>
                <td className="px-6 py-4 text-center">
                   <ArrowRightLeft className="text-slate-300 group-hover:text-emerald-500 transition-colors mx-auto" size={14} />
                </td>
                <td className="px-6 py-4">
                   <span className="text-xs font-mono font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{m.subjectCode}</span>
                </td>
                <td className="px-6 py-4">
                   <span className="text-xs font-semibold text-slate-700">{m.subjectName}</span>
                </td>
                <td className="px-6 py-4">
                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${m.direction === 'Debit' ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50'}`}>
                      {m.direction === 'Debit' ? '借方 (Dr)' : '贷方 (Cr)'}
                   </span>
                </td>
                <td className="px-6 py-4">
                   <span className="text-[10px] text-slate-400 font-medium">{m.description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start space-x-4">
         <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
            <ListChecks size={24} />
         </div>
         <div className="flex-1">
            <h5 className="font-bold text-emerald-900 mb-1">自动会计凭证生成逻辑 (Automated Journal Entries)</h5>
            <p className="text-xs text-emerald-800 leading-relaxed">
              系统根据以上配置的“科目映射”规则，在结算单审批、开票、回款等环节自动触发 SAP OData 接口，生成对应的财务凭证。无需人工干预，确保了业财数据的实时一致性与 100% 审计合规。
            </p>
         </div>
      </div>
    </div>
  );
};

export default SubjectMappingSection;
