
import React from 'react';
import { Cpu, CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { INTEGRATION_LOGS } from '../constants';

const IntegrationSection: React.FC = () => {
  return (
    <div className="space-y-8">
       <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">系统集成监控</h2>
          <p className="text-sm text-slate-500">监控 SAP、运维系统及税务平台的 API 连通性与数据流转状态</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {INTEGRATION_LOGS.map((log, idx) => (
             <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${log.status === 'Online' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                   {log.system === 'SAP S/4HANA' ? <Layers size={32} /> : log.system.includes('Xihe') ? <Zap size={32} /> : <Cpu size={32} />}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{log.system}</h3>
                <div className="flex items-center space-x-2 mb-4">
                   <div className={`w-2 h-2 rounded-full ${log.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{log.status}</span>
                </div>
                <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                   <div>耗时: {log.latency}</div>
                   <div>成功率: 99.9%</div>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
           <ShieldCheck className="absolute -right-12 -bottom-12 text-white/5" size={240} />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                 <h4 className="text-xl font-bold mb-4 flex items-center">
                    <RefreshCw className="mr-3 text-emerald-500" />
                    数据治理与同步策略
                 </h4>
                 <div className="space-y-4">
                    <div className="flex space-x-4">
                       <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-black">1</div>
                       <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-white">电量实时拉取:</strong> 每 15 分钟从 Xihe 系统拉取各关口表分时数值，自动过滤异常波动。</p>
                    </div>
                    <div className="flex space-x-4">
                       <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 font-black">2</div>
                       <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-white">SAP 凭证异步回写:</strong> 结算确认后，通过 OData 接口在 SAP 自动生成暂估冲回与 AR 凭证。</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                 <h5 className="text-sm font-bold mb-4 uppercase tracking-widest text-emerald-500">API 安全矩阵</h5>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] border-b border-white/10 pb-2">
                       <span className="text-slate-400">身份验证</span>
                       <span className="font-mono text-white">OAuth 2.0 / JWT</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] border-b border-white/10 pb-2">
                       <span className="text-slate-400">加密算法</span>
                       <span className="font-mono text-white">AES-256 GCM</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="text-slate-400">容灾模式</span>
                       <span className="font-mono text-white">Multi-Region Failover</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
    </div>
  );
};

export default IntegrationSection;
