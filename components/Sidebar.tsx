
import React from 'react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  companyName: string;
  logoUrl?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, companyName, logoUrl }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
    { id: 'customers', label: 'Customers', icon: 'fa-users' },
    { id: 'fleet', label: 'Fleet & Drivers', icon: 'fa-truck' },
    { id: 'routes', label: 'Routes', icon: 'fa-map-location-dot' },
    { id: 'deliveries', label: 'Daily Delivery', icon: 'fa-clipboard-list' },
    { id: 'finance', label: 'Finance', icon: 'fa-file-invoice-dollar' },
    { id: 'checklist', label: 'Checklist', icon: 'fa-check-double' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-700">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="L" className="w-8 h-8 object-contain rounded" />
          ) : (
            <i className="fa-solid fa-droplet text-blue-400"></i>
          )}
          <span className="truncate">{companyName.split(' ')[0]}</span>
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeModule === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-center`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
        
        <div className="pt-4 mt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveModule('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeModule === 'settings' 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-gear w-6 text-center"></i>
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-inner">R</div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Rayan</p>
            <p className="text-[10px] text-slate-400 truncate">Owner Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
