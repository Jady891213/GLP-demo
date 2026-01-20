
import React, { useState } from 'react';
import { Project } from '../types';
// Added missing Calculator icon import
import { FileText, Shield, ExternalLink, Download, X, Scale, Clock, CreditCard, Building2, Calculator } from 'lucide-react';

interface Props {
  projects: Project[];
}

const ContractSection: React.FC<Props> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">项目 & 合同台账</h2>
          <p className="text-sm text-slate-500">核心管理维度：SPV公司 + 对应电站项目</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 flex items-center space-x-2 shadow-lg shadow-emerald-100 transition-all active:scale-95">
          <FileText size={18} />
          <span>录入新项目</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">项目 ID / 名称</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SPV 结算主体</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">核心规则</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{project.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{project.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Building2 size={14} className="text-blue-500" />
                    <span className="text-xs font-semibold text-slate-700">{project.spv}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex flex-col">
                    <span className="text-xs font-bold text-emerald-600">{project.rule.type}</span>
                    <span className="text-[10px] text-slate-400 max-w-xs truncate">{project.rule.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>查看详情</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contract Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg">
                  <Scale className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedProject.name}</h3>
                  <p className="text-xs text-slate-400">合同条款及结算规则详情</p>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/30">
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Building2 size={14} className="mr-2" />
                    协议主体
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">甲方 (客户)</p>
                      <p className="text-sm font-bold text-slate-800">{selectedProject.details.partyA}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">乙方 (SPV公司)</p>
                      <p className="text-sm font-bold text-slate-800">{selectedProject.details.partyB}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Shield size={14} className="mr-2" />
                    计量规则
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">关口计量点</p>
                      <p className="text-xs font-bold text-slate-800">{selectedProject.details.gridPoint}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">计量方式</p>
                      <p className="text-xs font-bold text-slate-800">{selectedProject.details.meteringMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Calculator size={14} className="mr-2" />
                    结算与支付
                  </h4>
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
                    <div>
                       <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">电费计算公式</p>
                       <p className="text-sm font-mono font-black text-emerald-900">{selectedProject.details.billingFormula}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-emerald-200/50">
                       <div>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">抄表日</p>
                          <p className="text-sm font-bold text-emerald-900 flex items-center">
                            <Clock size={14} className="mr-1.5" />
                            {selectedProject.details.billingDay}
                          </p>
                       </div>
                       <div>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">付款时限</p>
                          <p className="text-sm font-bold text-emerald-900 flex items-center">
                            <CreditCard size={14} className="mr-1.5" />
                            {selectedProject.details.paymentDay}
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                   <p className="text-xs text-amber-900 leading-relaxed font-medium italic">
                     "本合同内，如遇国家价格主管部门调整上网电价和发电补贴标准，按调整后标准执行。所有结算单将自动根据系统集成之实时标杆价进行多维度交叉演算。"
                   </p>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-6 bg-slate-100 flex items-center justify-between border-t border-slate-200">
               <div className="flex items-center space-x-2 text-slate-500">
                  <FileText size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">最后签署日期: 2023-12-25</span>
               </div>
               <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center space-x-2">
                     <Download size={14} />
                     <span>下载合同扫描件</span>
                  </button>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
                     编辑条款
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
        <div className="p-1 bg-blue-100 rounded text-blue-600">
          <Shield size={16} />
        </div>
        <div className="text-xs text-blue-800 leading-relaxed">
          <strong>专家提示：</strong> 业财一体化平台已直连合同库系统。任何条款变更（如折扣率、阶梯价变化）将实时同步至“结算引擎”，自动触发受影响月份的差额追补或收入调整。
        </div>
      </div>
    </div>
  );
};

export default ContractSection;
