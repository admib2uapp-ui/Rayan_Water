
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_ROUTES, MOCK_CUSTOMERS } from '../constants';

interface DashboardProps {
  onNavigate: (module: string) => void;
}

const data = [
  { name: 'Mon', sales: 4000, credit: 2400 },
  { name: 'Tue', sales: 3000, credit: 1398 },
  { name: 'Wed', sales: 2000, credit: 9800 },
  { name: 'Thu', sales: 2780, credit: 3908 },
  { name: 'Fri', sales: 1890, credit: 4800 },
  { name: 'Sat', sales: 2390, credit: 3800 },
  { name: 'Sun', sales: 3490, credit: 4300 },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const kpis = [
    { label: "Today's Revenue", value: "Rs. 142,500", icon: "fa-money-bill-trend-up", color: "text-green-600", bg: "bg-green-100", target: 'finance' },
    { label: "Pending Deliveries", value: "24 / 85", icon: "fa-truck-loading", color: "text-blue-600", bg: "bg-blue-100", target: 'deliveries' },
    { label: "Active Routes", value: "8 Routes", icon: "fa-map", color: "text-purple-600", bg: "bg-purple-100", target: 'routes' },
    { label: "Total Outstanding", value: "Rs. 450,200", icon: "fa-wallet", color: "text-amber-600", bg: "bg-amber-100", target: 'customers' },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Date Range</label>
            <div className="flex gap-2">
              <input type="date" className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
              <input type="date" className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Route</label>
            <select className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none min-w-[140px]">
              <option>All Routes</option>
              {MOCK_ROUTES.map(r => <option key={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Customer</label>
            <select className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none min-w-[160px]">
              <option>All Customers</option>
              {MOCK_CUSTOMERS.slice(0, 10).map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Status</label>
            <select className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Delivery Status</label>
            <select className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
              <option>All Deliveries</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Skipped</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
            <i className="fa-solid fa-filter"></i> Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx} 
            onClick={() => onNavigate(kpi.target)}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${kpi.bg} ${kpi.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${kpi.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-bold text-slate-400">+12%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Weekly Sales Analytics</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="credit" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Delivery Efficiency</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} dot={{r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
