
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import CustomerMaster from './components/CustomerMaster';
import FleetDrivers from './components/FleetDrivers';
import RouteMaster from './components/RouteMaster';
import DailyDelivery from './components/DailyDelivery';
import FinanceModule from './components/FinanceModule';
import Settings from './components/Settings';
import { DRIVER_REMARKS } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [remarks, setRemarks] = useState<string[]>(DRIVER_REMARKS);
  const [companyName, setCompanyName] = useState('HydroFlow ERP');
  const [logoUrl, setLogoUrl] = useState('');

  const renderContent = () => {
    switch(activeModule) {
      case 'dashboard': return <Dashboard onNavigate={setActiveModule} />;
      case 'customers': return <CustomerMaster />;
      case 'fleet': return <FleetDrivers />;
      case 'routes': return <RouteMaster />;
      case 'deliveries': return <DailyDelivery customRemarks={remarks} />;
      case 'finance': return <FinanceModule />;
      case 'checklist': return <Checklist />;
      case 'settings': return (
        <Settings 
          remarks={remarks} 
          onUpdateRemarks={setRemarks} 
          companyName={companyName}
          onUpdateCompanyName={setCompanyName}
          logoUrl={logoUrl}
          onUpdateLogoUrl={setLogoUrl}
        />
      );
      default: return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
            <i className="fa-solid fa-hammer text-4xl"></i>
          </div>
          <h2 className="text-xl font-bold">Under Development</h2>
          <p className="text-center max-w-sm">This module ({activeModule}) is currently being crafted.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
      `}</style>
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        companyName={companyName}
        logoUrl={logoUrl}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2">
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-6 w-auto object-contain mr-2" />}
            <span className="text-slate-400 text-sm capitalize">{companyName}</span>
            <i className="fa-solid fa-chevron-right text-[10px] text-slate-300 mx-2"></i>
            <span className="font-bold text-slate-700 capitalize">{activeModule.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-all">
              <i className="fa-solid fa-bell text-slate-400 group-hover:text-blue-600 transition-colors"></i>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div 
              onClick={() => setActiveModule('settings')}
              className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded-2xl transition-all"
            >
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Rayan Fernando</p>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 overflow-hidden shadow-sm group-hover:border-blue-300 transition-all">
                <i className="fa-solid fa-user-tie text-xl"></i>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth bg-slate-50/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
