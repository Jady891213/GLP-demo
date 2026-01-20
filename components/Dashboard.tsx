
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { RevenueRecord, WorkflowStatus } from '../types';
import { Zap, Calculator, Receipt, Banknote, TrendingUp } from 'lucide-react';

interface Props {
  records: RevenueRecord[];
}

const Dashboard: React.FC<Props> = ({ records }) => {
  const chartData = [
    { name: '1月', revenue: 318500, accrual: 315000 },
    { name: '2月', revenue: 336000, accrual: 336000 },
    { name: '3月', revenue: 0, accrual: 325000 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const stats = [
    { label: '本月暂估收入', value: '¥336,000', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '待结算单据', value: '1 笔', icon: Calculator, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '待回款总额', value: '¥336,000', icon: Banknote, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '资产并网容量', value: '1.2GW', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">月度收入对比 (暂估 vs 实际)</h3>
            <div className="flex items-center space-x-4 text-xs font-medium uppercase tracking-wider text-slate-400">
               <div className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded-full mr-1.5"></span> 实际收入</div>
               <div className="flex items-center"><span className="w-3 h-3 bg-slate-200 rounded-full mr-1.5"></span> 暂估收入</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `¥${v/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="accrual" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">收入构成 (SPV维度)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{name: '普枫', value: 40}, {name: '普又', value: 30}, {name: '国能', value: 30}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {['普枫新能源 (40%)', '普又新能源 (30%)', '国能项目 (30%)'].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2`} style={{backgroundColor: COLORS[i]}}></span>
                  <span className="text-slate-600">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
