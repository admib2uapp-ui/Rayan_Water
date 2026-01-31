
import React, { useState } from 'react';
import { MOCK_ROUTES, MOCK_CUSTOMERS, DRIVER_REMARKS } from '../constants';

interface DailyDeliveryProps {
  customRemarks?: string[];
}

const DailyDelivery: React.FC<DailyDeliveryProps> = ({ customRemarks }) => {
  const [activeStep, setActiveStep] = useState(0);
  const route = MOCK_ROUTES[0];
  const customers = MOCK_CUSTOMERS.filter(c => route.customerIds.includes(c.id));
  const [showConfirm, setShowConfirm] = useState(false);
  const [remark, setRemark] = useState('');

  const currentCustomer = customers[activeStep];
  const activeRemarks = customRemarks || DRIVER_REMARKS;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
             <h2 className="text-xl font-black text-slate-800">ACTIVE TASK</h2>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg shadow-blue-500/20">
            {activeStep + 1} / {customers.length}
          </span>
        </div>
        
        <div className="bg-blue-600 rounded-[32px] p-8 text-white mb-8 shadow-2xl shadow-blue-500/30 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-blue-100 text-[10px] font-black uppercase tracking-[3px] mb-2">Delivery Stop</p>
          <h3 className="text-3xl font-black mb-4">{currentCustomer.name}</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-4 text-sm bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <i className="fa-solid fa-map-pin mt-1 text-blue-200"></i>
              <div>
                <p className="font-bold">{currentCustomer.address}</p>
                <p className="text-[10px] text-blue-200 font-bold tracking-widest mt-1">COORD: {currentCustomer.lat.toFixed(6)}, {currentCustomer.lng.toFixed(6)}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${currentCustomer.lat},${currentCustomer.lng}`}
              target="_blank"
              className="flex-1 bg-white text-blue-600 py-4 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:scale-[1.03] transition-all shadow-xl"
            >
              <i className="fa-solid fa-location-arrow"></i> Navigate
            </a>
            <button className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all text-xl">
              <i className="fa-solid fa-phone"></i>
            </button>
          </div>
        </div>

        {!showConfirm ? (
          <button 
            onClick={() => setShowConfirm(true)}
            className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-lg shadow-2xl shadow-slate-300 hover:bg-slate-800 transition-all"
          >
            I've Arrived at Site
          </button>
        ) : (
          <div className="space-y-6 animate-slide-in">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 border-2 border-slate-100 rounded-3xl bg-slate-50">
                <label className="text-[10px] font-black text-slate-400 block mb-2 tracking-[2px]">BOTTLES</label>
                <input type="number" className="w-full bg-transparent font-black text-3xl outline-none text-slate-800" defaultValue="1" />
              </div>
              <div className="p-5 border-2 border-slate-100 rounded-3xl bg-slate-50">
                <label className="text-[10px] font-black text-slate-400 block mb-2 tracking-[2px]">LKR AMOUNT</label>
                <input type="number" className="w-full bg-transparent font-black text-3xl outline-none text-slate-800" defaultValue={currentCustomer.pricePerUnit} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 mb-3 block tracking-widest">Select Remark (Optional)</label>
                <select 
                  value={remark} 
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full p-4 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none bg-slate-50 focus:border-blue-500 transition-colors"
                >
                  <option value="">Status: Delivered Successfully</option>
                  {activeRemarks.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 mb-3 block tracking-widest">Payment Collection</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Cash', 'Credit', 'QR'].map(m => (
                    <button key={m} className="py-3 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-blue-600 transition-all">
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowConfirm(false);
                setRemark('');
                if (activeStep < customers.length - 1) setActiveStep(activeStep + 1);
              }}
              className="w-full py-5 bg-green-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-green-100 mt-6 hover:bg-green-700 active:scale-95 transition-all"
            >
              Verify & Log Delivery
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-200">
        <h4 className="text-[10px] font-black text-slate-400 uppercase mb-6 px-2 tracking-[4px]">Upcoming Stops</h4>
        <div className="space-y-3">
          {customers.map((c, idx) => (
            <div key={c.id} className={`flex items-center gap-5 p-4 rounded-3xl border transition-all ${idx < activeStep ? 'opacity-30 border-slate-50' : 'border-slate-50 hover:bg-slate-50'}`}>
               <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${idx === activeStep ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {idx + 1}
               </span>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-800 truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold truncate">GPS: {c.lat.toFixed(4)}, {c.lng.toFixed(4)}</p>
               </div>
               {idx < activeStep && <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>}
               {idx === activeStep && <i className="fa-solid fa-truck-fast text-blue-600 animate-bounce"></i>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyDelivery;
