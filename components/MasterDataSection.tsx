
import React from 'react';
import { Project } from '../types';
import { Database, Building2, MapPin, Zap, Info, ArrowRight } from 'lucide-react';

interface Props {
  projects: Project[];
}

const MasterDataSection: React.FC<Props> = ({ projects }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">主数据管理</h2>
          <p className="text-sm text-slate-500">统一管控 SPV 公司、项目资产及多级能流拓扑</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2">
           <Database size={14} />
           <span>同步主数据</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {projects.map(p => (
            <div key={p.id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition-all group border-b-4 border-b-slate-100 hover:border-b-emerald-500">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                     <Building2 size={24} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{p.status}</span>
               </div>
               <h3 className="font-bold text-slate-900 text-lg mb-1">{p.name}</h3>
               <div className="flex items-center text-slate-400 text-xs mb-4">
                  <MapPin size={12} className="mr-1" />
                  {p.region}
               </div>
               
               <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between">
                     <span className="text-xs text-slate-400">所属 SPV</span>
                     <span className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{p.spv}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-xs text-slate-400">电站容量</span>
                     <span className="text-xs font-bold text-slate-700">{p.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-xs text-slate-400">计费计量点</span>
                     <span className="text-xs font-bold text-blue-600">{p.details.gridPoint}</span>
                  </div>
               </div>
               
               <button className="w-full mt-6 py-2 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center space-x-2">
                  <span>查看资产视图</span>
                  <ArrowRight size={12} />
               </button>
            </div>
         ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start space-x-4">
         <Info className="text-amber-600 shrink-0" size={24} />
         <div className="text-xs text-amber-800 leading-relaxed">
            <strong>架构说明:</strong> 主数据模块已连接集团资产管理平台。任何 SPV 的银行账号变更、项目容量变更或计量表更换，将自动同步至财务结算引擎。
         </div>
      </div>
    </div>
  );
};

export default MasterDataSection;
