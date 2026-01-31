
import React, { useState, useEffect } from 'react';
import { MOCK_ROUTES, MOCK_CUSTOMERS, MOCK_DRIVERS, MOCK_VEHICLES } from '../constants';
import { sortCustomersByProximity } from '../utils/geo';
import { Customer } from '../types';

const RouteMaster: React.FC = () => {
  const [routes, setRoutes] = useState(MOCK_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState(MOCK_ROUTES[0]);
  const [optimizedSequence, setOptimizedSequence] = useState<Customer[]>([]);
  const [showRouteForm, setShowRouteForm] = useState(false);

  const YARD_COORDS = { lat: 6.9271, lng: 79.8612 };

  useEffect(() => {
    const routeCustomers = MOCK_CUSTOMERS.filter(c => selectedRoute.customerIds.includes(c.id));
    const sorted = sortCustomersByProximity(YARD_COORDS.lat, YARD_COORDS.lng, routeCustomers);
    setOptimizedSequence(sorted);
  }, [selectedRoute]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newSequence = [...optimizedSequence];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSequence.length) return;
    
    [newSequence[index], newSequence[targetIndex]] = [newSequence[targetIndex], newSequence[index]];
    setOptimizedSequence(newSequence);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Route Planning</h2>
          <p className="text-slate-500 text-sm">Coordinate-based sequence optimization</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm"><i className="fa-solid fa-sliders mr-2"></i> Auto-Optimize</button>
           <button 
            onClick={() => setShowRouteForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <i className="fa-solid fa-plus mr-2"></i> New Route
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest ml-2">Active Routes</h3>
          <div className="space-y-3">
            {routes.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRoute(r)}
                className={`w-full text-left p-5 rounded-3xl border transition-all ${
                  selectedRoute.id === r.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                   <p className="font-bold text-lg">{r.name}</p>
                   <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${selectedRoute.id === r.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {MOCK_CUSTOMERS.filter(c => c.routeId === r.id).length} Stops
                   </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 opacity-80 text-[10px] font-bold">
                  <span className="flex items-center gap-1.5"><i className="fa-solid fa-truck"></i> {MOCK_VEHICLES.find(v => v.id === r.vehicleId)?.number}</span>
                  <span className="flex items-center gap-1.5"><i className="fa-solid fa-user-circle"></i> {MOCK_DRIVERS.find(d => d.id === r.driverId)?.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 p-10 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-2xl text-slate-800">Master Delivery Sequence</h3>
            <div className="flex items-center gap-2">
               <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><i className="fa-solid fa-print"></i></button>
               <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><i className="fa-solid fa-share-nodes"></i></button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-50"></div>
            <div className="space-y-6">
              <div className="relative pl-14">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-slate-800 border-4 border-white shadow-sm z-10"></div>
                <div>
                  <p className="text-sm font-black text-slate-800 tracking-wider">LOADING YARD (START)</p>
                  <p className="text-[10px] text-slate-400 font-bold">Lat: 6.9271 | Lng: 79.8612</p>
                </div>
              </div>

              <div className="space-y-4">
                {optimizedSequence.map((customer, index) => (
                  <div key={customer.id} className="relative pl-14 group">
                    <div className="absolute left-2.5 top-3 w-7 h-7 rounded-full bg-white border-2 border-slate-100 text-slate-300 flex items-center justify-center text-[10px] font-black z-10 group-hover:border-blue-400 group-hover:text-blue-600 transition-all">
                      {index + 1}
                    </div>
                    <div className="p-5 rounded-[24px] border border-slate-100 bg-white group-hover:shadow-xl group-hover:border-blue-100 group-hover:-translate-y-1 transition-all flex justify-between items-center">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-slate-800 text-base truncate">{customer.name}</p>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${customer.waterType === 'Drinking' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-teal-50 text-teal-600 border-teal-100'}`}>
                            {customer.waterType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium truncate mb-1">{customer.address}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                          <i className="fa-solid fa-location-dot mr-1 text-slate-200"></i>
                          {customer.lat.toFixed(4)}, {customer.lng.toFixed(4)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => moveItem(index, 'up')} 
                          disabled={index === 0}
                          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 disabled:opacity-20"
                        >
                          <i className="fa-solid fa-arrow-up"></i>
                        </button>
                        <button 
                          onClick={() => moveItem(index, 'down')}
                          disabled={index === optimizedSequence.length - 1}
                          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 disabled:opacity-20"
                        >
                          <i className="fa-solid fa-arrow-down"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRouteForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRouteForm(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 animate-slide-in overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-black text-slate-800">New Route Configuration</h3>
               <button onClick={() => setShowRouteForm(false)} className="text-slate-400 hover:text-slate-800 transition-colors">
                 <i className="fa-solid fa-xmark text-xl"></i>
               </button>
             </div>
             <form className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block ml-1 tracking-widest">Route Identifier</label>
                  <input required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="e.g. Northern Industrial Park" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block ml-1 tracking-widest">Select Truck</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none">
                      {MOCK_VEHICLES.map(v => <option key={v.id}>{v.number}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block ml-1 tracking-widest">Assign Operator</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none">
                      {MOCK_DRIVERS.map(d => <option key={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={() => setShowRouteForm(false)} className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-3xl shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all mt-10">
                  Initialize Route
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteMaster;
