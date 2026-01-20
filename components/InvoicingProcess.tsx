
import React, { useState } from 'react';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Receipt, Send, CheckCircle2, History, ArrowRightLeft, FileText, X, Printer, Download, ShieldCheck } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
  onInvoice: (id: string) => void;
}

const InvoicingProcess: React.FC<Props> = ({ records, onInvoice }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<RevenueRecord | null>(null);

  const InvoiceModal = ({ record }: { record: RevenueRecord }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2 text-blue-600 font-black text-sm uppercase tracking-widest">
            <Receipt size={18} />
            <span>电子发票预览 (VAT Invoice Preview)</span>
          </div>
          <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-8 overflow-y-auto">
          {/* Fapiao Header Style */}
          <div className="border-4 border-double border-red-200 p-8 rounded-lg relative">
            <div className="absolute top-4 right-8 text-red-500 border-2 border-red-500 rounded-full w-24 h-24 flex items-center justify-center rotate-12 opacity-30 font-bold text-xs text-center border-dashed">
              发票专用章<br/>GLP FINANCE
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-red-800 tracking-[0.3em]">增值税专用发票</h2>
              <div className="h-0.5 bg-red-800 w-64 mx-auto mt-1"></div>
              <div className="h-0.5 bg-red-800 w-64 mx-auto mt-0.5"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs mb-6">
              <div className="space-y-2">
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">购买方名称:</span> <span className="text-slate-900 font-bold">{record.customerName}</span></p>
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">纳税人识别号:</span> <span className="font-mono">91310000MA1FL4JU2X</span></p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">发票代码:</span> <span className="font-mono">031002300111</span></p>
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">发票号码:</span> <span className="font-mono">{record.invoiceNo || '待生成'}</span></p>
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">开票日期:</span> <span className="font-mono">{record.invoiceDate?.split('T')[0] || '2025-09-25'}</span></p>
              </div>
            </div>

            <table className="w-full text-[11px] border-collapse border border-red-200">
              <thead>
                <tr className="bg-red-50 text-red-800 font-bold">
                  <th className="border border-red-200 px-3 py-2 text-left">货物或应税劳务、服务名称</th>
                  <th className="border border-red-200 px-3 py-2 text-right">数量(kWh)</th>
                  <th className="border border-red-200 px-3 py-2 text-right">单价</th>
                  <th className="border border-red-200 px-3 py-2 text-right">金额(不含税)</th>
                  <th className="border border-red-200 px-3 py-2 text-right">税率</th>
                  <th className="border border-red-200 px-3 py-2 text-right">税额</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-red-200 px-3 py-4 text-slate-800 font-medium">*现代服务*光伏电费 ({record.projectName})</td>
                  <td className="border border-red-200 px-3 py-4 text-right font-mono">{record.accrualKwh.toLocaleString()}</td>
                  <td className="border border-red-200 px-3 py-4 text-right font-mono">{(record.accrualExclTax / record.accrualKwh).toFixed(4)}</td>
                  <td className="border border-red-200 px-3 py-4 text-right font-mono">¥{record.accrualExclTax.toLocaleString()}</td>
                  <td className="border border-red-200 px-3 py-4 text-right">13%</td>
                  <td className="border border-red-200 px-3 py-4 text-right font-mono">¥{record.accrualTax.toLocaleString()}</td>
                </tr>
                <tr className="bg-red-50/30">
                  <td className="border border-red-200 px-3 py-2 font-bold text-red-800" colSpan={3}>合计</td>
                  <td className="border border-red-200 px-3 py-2 text-right font-black">¥{record.accrualExclTax.toLocaleString()}</td>
                  <td className="border border-red-200 px-3 py-2"></td>
                  <td className="border border-red-200 px-3 py-2 text-right font-black">¥{record.accrualTax.toLocaleString()}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-red-200 px-3 py-3 font-bold text-red-800" colSpan={6}>
                    价税合计 (大写): <span className="ml-4 tracking-widest text-slate-900">人民币叁拾肆万肆仟叁佰玖拾贰元零壹分</span>
                    <span className="float-right text-base font-black">(小写) ¥{record.settlementAmount.toLocaleString()}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 text-[10px] grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="flex justify-between border-b border-red-100 pb-1"><span className="text-red-800 font-bold">销售方名称:</span> <span className="text-slate-900 font-bold">{record.spvName}</span></p>
                <p className="text-red-800 font-bold">备注: <span className="text-slate-600 font-normal ml-2">本期结算周期 {record.billingCycle}</span></p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <ShieldCheck size={18} className="text-blue-500" />
                   <h4 className="font-bold text-blue-900">SAP 业财联动凭证</h4>
                </div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">集成状态: 自动冲回中</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-blue-200/50 flex items-center justify-between">
                   <span className="text-xs text-slate-500 font-medium">暂估冲回凭证:</span>
                   <span className="text-xs font-mono font-bold text-slate-900">DOC-RV-992011</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200/50 flex items-center justify-between">
                   <span className="text-xs text-slate-500 font-medium">AR 确认凭证:</span>
                   <span className="text-xs font-mono font-bold text-slate-900">DOC-AR-881293</span>
                </div>
             </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
              <Printer size={16} />
              <span>打印预览</span>
            </button>
            <button className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
              <Download size={16} />
              <span>下载 PDF</span>
            </button>
          </div>
          <div className="flex space-x-3">
            {record.status === WorkflowStatus.SETTLED && (
              <button 
                onClick={() => {
                  onInvoice(record.id);
                  setSelectedInvoice(null);
                }}
                className="px-8 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
              >
                正式推送航信开票
              </button>
            )}
            <button onClick={() => setSelectedInvoice(null)} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300 transition-all">
              关闭窗口
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-xl font-bold text-slate-900">发票管理 & SAP 反冲</h2>
          <p className="text-sm text-slate-500">直连航信/诺诺网一键开票，系统自动冲回“暂估”凭证，入正式应收账款</p>
        </div>

        <div className="grid gap-6">
          {records.filter(r => r.status === WorkflowStatus.SETTLED || r.status === WorkflowStatus.INVOICED || r.status === WorkflowStatus.CLEARED).map(record => (
            <div key={record.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
               <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 border border-slate-100 transition-colors">
                          <Receipt className="text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900">{record.projectName}</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">结算单号: ST-2025-{record.id.split('-').pop()}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">正式结算总额 (含税)</p>
                        <p className="text-xl font-black text-slate-900">¥{record.settlementAmount?.toLocaleString()}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                           <ArrowRightLeft size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SAP 业财自动化</p>
                           <p className="text-xs font-bold text-slate-700">自动冲回暂估: -¥{record.accrualAmount.toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                           <History size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">应收科目结转</p>
                           <p className="text-xs font-bold text-slate-700">借: 应收账款 / 贷: 收入</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => setSelectedInvoice(record)}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center space-x-1.5"
                        >
                           <FileText size={14} />
                           <span>详情预览</span>
                        </button>
                        {record.status === WorkflowStatus.SETTLED ? (
                           <button 
                             onClick={() => onInvoice(record.id)}
                             className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center space-x-2 shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                           >
                              <Send size={16} />
                              <span>一键推送到航信</span>
                           </button>
                        ) : (
                           <div className="text-right flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              <div>
                                 <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">已开票</p>
                                 <p className="text-[11px] font-mono font-bold text-slate-900">{record.invoiceNo}</p>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {selectedInvoice && <InvoiceModal record={selectedInvoice} />}
    </div>
  );
};

export default InvoicingProcess;
