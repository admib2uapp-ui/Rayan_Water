
import React, { useState } from 'react';
import { MOCK_CUSTOMERS, MOCK_ROUTES } from '../constants';
import { Customer } from '../types';

const CustomerMaster: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [showForm, setShowForm] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', whatsapp: '', nic: '', dob: '', address: '', waterType: 'Drinking', price: '150', routeId: 'R1', creditLimit: '5000', creditAllowed: true
  });

  const startEdit = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      phone: c.phone,
      whatsapp: c.whatsapp || '',
      nic: c.nic || '',
      dob: c.dob || '',
      address: c.address,
      waterType: c.waterType,
      price: c.pricePerUnit.toString(),
      routeId: c.routeId,
      creditLimit: c.creditLimit.toString(),
      creditAllowed: c.creditAllowed
    });
    setShowForm(true);
  };

  const deleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocating(true);

    const processSubmission = (lat: number, lng: number) => {
      const customerData: Customer = {
        id: editingCustomer ? editingCustomer.id : `C${customers.length + 20}`,
        name: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        nic: formData.nic,
        dob: formData.dob,
        address: formData.address,
        lat: lat,
        lng: lng,
        routeId: formData.routeId,
        waterType: formData.waterType as any,
        pricePerUnit: Number(formData.price),
        creditAllowed: formData.creditAllowed,
        creditLimit: Number(formData.creditLimit),
        balance: editingCustomer ? editingCustomer.balance : 0,
        status: editingCustomer ? editingCustomer.status : 'Active'
      };

      if (editingCustomer) {
        setCustomers(customers.map(c => c.id === editingCustomer.id ? customerData : c));
      } else {
        setCustomers([customerData, ...customers]);
      }

      setShowForm(false);
      setEditingCustomer(null);
      setIsLocating(false);
    };

    if (editingCustomer) {
      processSubmission(editingCustomer.lat, editingCustomer.lng);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => processSubmission(pos.coords.latitude, pos.coords.longitude),
          () => processSubmission(6.9271, 79.8612),
          { enableHighAccuracy: true }
        );
      } else {
        processSubmission(6.9271, 79.8612);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Customer Directory</h2>
          <p className="text-slate-500 text-sm">Profile management & credit control</p>
        </div>
        <button 
          onClick={() => { setEditingCustomer(null); setShowForm(true); }}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <i className="fa-solid fa-user-plus"></i> New Customer
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4">Profile & Route</th>
                <th className="px-6 py-4">Identifiers</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Financials</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((c) => (
                <tr key={c.id} className={`hover:bg-slate-50/50 transition-colors group ${c.status === 'Inactive' ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{c.name}</p>
                    <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded-full text-blue-600 font-bold uppercase">{c.routeId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-600">NIC: {c.nic || 'N/A'}</p>
                    <p className="text-[10px] text-slate-400">DOB: {c.dob || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-700">{c.phone}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{c.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-black ${c.balance > 0 ? 'text-red-500' : 'text-slate-800'}`}>Rs. {c.balance}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Lim: {c.creditLimit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(c)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"><i className="fa-solid fa-pen text-xs"></i></button>
                      <button onClick={() => toggleCustomerStatus(c.id)} className={`w-8 h-8 rounded-lg ${c.status === 'Active' ? 'bg-amber-50 text-amber-600 hover:bg-amber-600' : 'bg-green-50 text-green-600 hover:bg-green-600'} hover:text-white transition-all`} title={c.status === 'Active' ? 'Deactivate' : 'Activate'}>
                        <i className={`fa-solid ${c.status === 'Active' ? 'fa-ban' : 'fa-check'} text-xs`}></i>
                      </button>
                      <button onClick={() => deleteCustomer(c.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"><i className="fa-solid fa-trash-can text-xs"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl p-8 animate-slide-in overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold text-slate-800">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
               <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-800 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                    <input required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Customer Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Phone</label>
                    <input required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">WhatsApp</label>
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Delivery Address</label>
                  <textarea required rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Route Assignment</label>
                    <select className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none" value={formData.routeId} onChange={e => setFormData({...formData, routeId: e.target.value})}>
                      {MOCK_ROUTES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Water Type</label>
                    <select className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none" value={formData.waterType} onChange={e => setFormData({...formData, waterType: e.target.value})}>
                      <option>Drinking</option><option>RO</option><option>Well</option><option>Industrial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase">Enable Credit Line</label>
                    <button type="button" onClick={() => setFormData({...formData, creditAllowed: !formData.creditAllowed})} className={`w-12 h-6 rounded-full transition-all relative ${formData.creditAllowed ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.creditAllowed ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>

                <button 
                  disabled={isLocating}
                  type="submit" 
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
                >
                  {isLocating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                  {editingCustomer ? 'Update Record' : 'Save Customer & Record Location'}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMaster;
