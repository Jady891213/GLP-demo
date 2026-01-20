
import React, { useState, useCallback } from 'react';
import { LayoutDashboard, FileText, Calculator, Receipt, Banknote, ShieldCheck, ChevronRight, Zap, RefreshCw, Database, Cpu } from 'lucide-react';
import { WorkflowStatus, RevenueRecord } from './types';
import { MOCK_PROJECTS, INITIAL_RECORDS } from './constants';
import Dashboard from './components/Dashboard';
import ContractSection from './components/ContractSection';
import AccrualProcess from './components/AccrualProcess';
import SettlementProcess from './components/SettlementProcess';
import InvoicingProcess from './components/InvoicingProcess';
import ClearingProcess from './components/ClearingProcess';
import MasterDataSection from './components/MasterDataSection';
import IntegrationSection from './components/IntegrationSection';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contract' | 'masterData' | 'integration' | 'accrual' | 'settlement' | 'invoice' | 'clearing'>('dashboard');
  const [records, setRecords] = useState<RevenueRecord[]>(INITIAL_RECORDS);
  const [loading, setLoading] = useState(false);

  const updateRecordStatus = useCallback((id: string, updates: Partial<RevenueRecord>) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const simulateProcess = async (label: string, action: () => void) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    action();
    setLoading(false);
  };

  const navItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'masterData', label: '主数据管理', icon: Database },
    { id: 'contract', label: '合同档案', icon: FileText },
    { id: 'integration', label: '系统集成', icon: Cpu },
    { id: 'accrual', label: '收入暂估', icon: Zap },
    { id: 'settlement', label: '结算中心', icon: Calculator },
    { id: 'invoice', label: '发票管理', icon: Receipt },
    { id: 'clearing', label: '核销催收', icon: Banknote },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard records={records} />;
      case 'masterData': return <MasterDataSection projects={MOCK_PROJECTS} />;
      case 'contract': return <ContractSection projects={MOCK_PROJECTS} />;
      case 'integration': return <IntegrationSection />;
      case 'accrual': return <AccrualProcess records={records} onAccrue={(id, amt) => simulateProcess('暂估记账', () => updateRecordStatus(id, { status: WorkflowStatus.ACCRUED, accrualAmount: amt }))} />;
      case 'settlement': return (
        <SettlementProcess 
          records={records} 
          onSync={(id) => simulateProcess('同步电量', () => updateRecordStatus(id, { status: WorkflowStatus.SYNCED, syncTime: new Date().toISOString() }))}
          onSettle={(id) => simulateProcess('生成结算单', () => updateRecordStatus(id, { status: WorkflowStatus.SETTLED, settlementDate: new Date().toISOString() }))} 
        />
      );
      case 'invoice': return <InvoicingProcess records={records} onInvoice={(id) => simulateProcess('航信开票', () => updateRecordStatus(id, { status: WorkflowStatus.INVOICED, invoiceNo: `INV${Date.now().toString().slice(-8)}`, invoiceDate: new Date().toISOString() }))} />;
      case 'clearing': return <ClearingProcess records={records} onClear={(id, amt) => simulateProcess('流水对账', () => updateRecordStatus(id, { status: WorkflowStatus.CLEARED, paymentAmount: amt, clearingDate: new Date().toISOString() }))} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">GLP新能源</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Business & Finance</p>
          </div>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-2xl p-3 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700 overflow-hidden border border-slate-600">
              <img src="https://picsum.photos/100/100?random=1" alt="Avatar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">财务管理员</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>首页</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold tracking-wide">
              {navItems.find(n => n.id === activeTab)?.label}
            </span>
          </div>
          <div className="flex items-center space-x-6">
             {loading && (
               <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs">
                 <RefreshCw size={14} className="animate-spin" />
                 <span>系统通信中 (SAP/Xihe API)...</span>
               </div>
             )}
             <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
               <ShieldCheck size={16} className="text-emerald-500" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TLS 1.3 Secure</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
