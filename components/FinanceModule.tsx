
import React, { useState } from 'react';

const FinanceModule: React.FC = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Financial Management</h2>
          <p className="text-slate-500 text-sm">Track expenses, collections and profitability</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <i className="fa-solid fa-file-invoice mr-2"></i> Monthly Statement
          </button>
          <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <i className="fa-solid fa-file-export mr-2"></i> Export Data
          </button>
          <button 
            onClick={() => setShowExpenseForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            <i className="fa-solid fa-plus mr-2"></i> Record Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Total Gross Revenue</p>
           <h3 className="text-4xl font-black text-slate-800 tracking-tighter">Rs. 842,000</h3>
           <div className="mt-6 flex gap-3 text-[10px] font-black">
              <span className="text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase">Cash: 60%</span>
              <span className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase">Credit: 40%</span>
           </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Operational Costs</p>
           <h3 className="text-4xl font-black text-red-600 tracking-tighter">Rs. 124,500</h3>
           <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
              <span className="bg-slate-100 px-2 py-1 rounded">Fuel</span>
              <span className="bg-slate-100 px-2 py-1 rounded">Maintenance</span>
              <span className="bg-slate-100 px-2 py-1 rounded">Payroll</span>
           </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
           <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Projected Net Profit</p>
           <h3 className="text-4xl font-black text-white tracking-tighter">Rs. 717,500</h3>
           <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">Calculated after variable deductions</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-black text-xl text-slate-800">Transaction History</h4>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <span className="text-[10px] font-black px-3 py-2 rounded-lg cursor-pointer transition-all bg-white shadow-sm">All Time</span>
            <span className="text-[10px] font-black px-3 py-2 rounded-lg cursor-pointer transition-all text-slate-400 hover:text-slate-600">This Week</span>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
           {[
             { title: "Fleet Fuel Refill (ABC-1234)", type: "Expense", amount: "Rs. 12,000", date: "Today, 10:30 AM", cat: "Fuel" },
             { title: "Ocean View Hotel Payment", type: "Collection", amount: "Rs. 45,000", date: "Today, 09:15 AM", cat: "Credit Repayment" },
             { title: "Standard Delivery - Customer #4", type: "Collection", amount: "Rs. 150", date: "Today, 08:30 AM", cat: "Cash" },
             { title: "Tire Replacement - WP-XYZ-5678", type: "Expense", amount: "Rs. 24,500", date: "Yesterday", cat: "Maintenance" },
           ].map((t, idx) => (
             <div key={idx} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors group">
               <div className="flex gap-5 items-center">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${t.type === 'Expense' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                   <i className={`fa-solid ${t.type === 'Expense' ? 'fa-arrow-up-right' : 'fa-arrow-down-left'}`}></i>
                 </div>
                 <div>
                   <p className="font-black text-slate-800">{t.title}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.date} • {t.cat}</p>
                 </div>
               </div>
               <div className="flex items-center gap-6">
                 <p className={`font-black text-lg ${t.type === 'Expense' ? 'text-red-600' : 'text-green-600'}`}>
                   {t.type === 'Expense' ? '-' : '+'}{t.amount}
                 </p>
                 <button className="text-slate-200 group-hover:text-slate-400 transition-colors"><i className="fa-solid fa-ellipsis-vertical"></i></button>
               </div>
             </div>
           ))}
        </div>
      </div>

      {showExpenseForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowExpenseForm(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-10 animate-slide-in overflow-y-auto">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-2xl font-black text-slate-800">Record Transaction</h3>
               <button onClick={() => setShowExpenseForm(false)} className="text-slate-400 hover:text-slate-800 transition-colors">
                 <i className="fa-solid fa-xmark text-xl"></i>
               </button>
             </div>
             <form className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Voucher Description</label>
                  <input required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="e.g. Monthly Electricity" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Amount (LKR)</label>
                    <input type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Category</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-xs">
                      <option>Operating Cost</option>
                      <option>Maintenance</option>
                      <option>Salary/Comm</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={() => setShowExpenseForm(false)} className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl shadow-xl hover:bg-blue-700 transition-all">
                  Post Transaction
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceModule;
