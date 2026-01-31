
import React, { useState } from 'react';
import { MOCK_VEHICLES, MOCK_DRIVERS } from '../constants';
import { Vehicle, Driver } from '../types';

const FleetDrivers: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [editingItem, setEditingItem] = useState<{ type: 'v' | 'd', data: any } | null>(null);
  
  const [deleteWarning, setDeleteWarning] = useState<{ type: 'v' | 'd', id: string } | null>(null);

  const toggleVehicleStatus = (id: string) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Repair' : 'Active' } : v));
  };

  const toggleDriverStatus = (id: string) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, status: d.status === 'Available' ? 'Leave' : 'Available' } : d));
  };

  const handleDelete = () => {
    if (!deleteWarning) return;
    if (deleteWarning.type === 'v') {
      setVehicles(vehicles.filter(v => v.id !== deleteWarning.id));
    } else {
      setDrivers(drivers.filter(d => d.id !== deleteWarning.id));
    }
    setDeleteWarning(null);
  };

  const startEdit = (type: 'v' | 'd', data: any) => {
    setEditingItem({ type, data });
    if (type === 'v') setShowVehicleForm(true);
    else setShowDriverForm(true);
  };

  const closeForms = () => {
    setShowVehicleForm(false);
    setShowDriverForm(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicles Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Vehicle Master</h3>
            <button 
              onClick={() => setShowVehicleForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Vehicle
            </button>
          </div>
          <div className="grid gap-4">
            {vehicles.map(v => (
              <div key={v.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group relative overflow-hidden">
                {v.status !== 'Active' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>}
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-4 rounded-xl text-slate-500">
                    <i className="fa-solid fa-truck-moving text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{v.number}</p>
                    <p className="text-xs text-slate-500">Cap: {v.capacityValue} {v.capacityUnit} | {v.fuelType}</p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Mileage: {v.avgMileage} km/l</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {v.status}
                    </span>
                  </div>
                  <div className="relative group/menu">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-20 invisible group-hover/menu:visible opacity-0 group-hover/menu:opacity-100 transition-all scale-95 group-hover/menu:scale-100">
                       <button onClick={() => toggleVehicleStatus(v.id)} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">Toggle Status</button>
                       <button onClick={() => startEdit('v', v)} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">Edit Record</button>
                       <div className="h-px bg-slate-50 my-1"></div>
                       <button onClick={() => setDeleteWarning({ type: 'v', id: v.id })} className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drivers Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Driver Master</h3>
            <button 
              onClick={() => setShowDriverForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Driver
            </button>
          </div>
          <div className="grid gap-4">
            {drivers.map(d => (
              <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl border border-blue-100">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{d.name}</p>
                    <p className="text-xs text-slate-500">NIC: {d.nic} | Ph: {d.phone}</p>
                    <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">License No: {d.licenseNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${d.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {d.status}
                  </span>
                  <div className="relative group/menu">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-20 invisible group-hover/menu:visible opacity-0 group-hover/menu:opacity-100 transition-all scale-95 group-hover/menu:scale-100">
                       <button onClick={() => toggleDriverStatus(d.id)} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">Toggle Status</button>
                       <button onClick={() => startEdit('d', d)} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">Edit Record</button>
                       <div className="h-px bg-slate-50 my-1"></div>
                       <button onClick={() => setDeleteWarning({ type: 'd', id: d.id })} className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteWarning(null)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-slide-in">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <h4 className="text-xl font-bold text-center text-slate-800 mb-2">Delete Record?</h4>
            <p className="text-slate-500 text-center text-sm mb-8">This will permanently remove the record from the active directory.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteWarning(null)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Form Overlay */}
      {showVehicleForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeForms}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 animate-slide-in overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">{editingItem ? 'Edit Vehicle' : 'New Vehicle Registration'}</h3>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Plate Number</label>
                <input defaultValue={editingItem?.data.number} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="WP-ABC-1234" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Capacity</label>
                  <input defaultValue={editingItem?.data.capacityValue} type="number" className="w-full p-3 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Unit</label>
                  <select defaultValue={editingItem?.data.capacityUnit} className="w-full p-3 bg-slate-50 border rounded-xl">
                    <option>Liters</option>
                    <option>Bottles</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Fuel Type</label>
                <select defaultValue={editingItem?.data.fuelType} className="w-full p-3 bg-slate-50 border rounded-xl">
                  <option>Diesel</option>
                  <option>Petrol</option>
                  <option>Electric</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Average Mileage (km/l)</label>
                <input defaultValue={editingItem?.data.avgMileage} type="number" className="w-full p-3 bg-slate-50 border rounded-xl" />
              </div>
              <button type="button" onClick={closeForms} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl mt-4 shadow-lg shadow-blue-100">
                {editingItem ? 'Update Vehicle' : 'Save Vehicle'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Driver Form Overlay */}
      {showDriverForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeForms}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 animate-slide-in overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">{editingItem ? 'Edit Driver' : 'New Driver Onboarding'}</h3>
            <form className="space-y-4">
              <input defaultValue={editingItem?.data.name} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="Full Name" />
              <input defaultValue={editingItem?.data.nic} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="NIC Number" />
              <input defaultValue={editingItem?.data.phone} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="Phone Number" />
              <input defaultValue={editingItem?.data.licenseNo} className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="License Number" />
              <div>
                <label className="text-xs font-bold text-slate-400 ml-1">License Expiry</label>
                <input defaultValue={editingItem?.data.licenseExpiry} type="date" className="w-full p-3 bg-slate-50 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input defaultValue={editingItem?.data.dailySalary} type="number" className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="Daily Salary" />
                <input defaultValue={editingItem?.data.commissionPct} type="number" className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="Commission %" />
              </div>
              <button type="button" onClick={closeForms} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl mt-4 shadow-lg shadow-blue-100">
                {editingItem ? 'Update Driver' : 'Complete Onboarding'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetDrivers;
