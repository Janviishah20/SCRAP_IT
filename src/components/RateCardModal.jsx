import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, Calculator, Scale, AlertCircle, ArrowRight } from 'lucide-react';

export default function RateCardModal() {
  const { isRateModalOpen, setIsRateModalOpen, categories, setIsCreatePickupModalOpen, openAuth, isAuthenticated } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Quick calculator state
  const [calcItem, setCalcItem] = useState('ew_pcb_grade_a');
  const [calcQty, setCalcQty] = useState(10);

  if (!isRateModalOpen) return null;

  // Flatten items for calculator and search
  const allItems = categories.flatMap(cat => cat.items.map(item => ({ ...item, categoryName: cat.name, categoryId: cat.id })));
  
  const selectedItemObj = allItems.find(i => i.id === calcItem) || allItems[0];
  const calculatedTotal = (selectedItemObj?.rate || 0) * (Number(calcQty) || 0);

  const filteredCategories = categories.map(cat => {
    const matched = cat.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, items: matched };
  }).filter(cat => activeTab === 'all' || cat.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8 text-slate-900">
        
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Fair Market Scrap Rates</h2>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                  Verified Index 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">Accurate digital weights guaranteed. Zero deductions or mechanical scale rigging.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsRateModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-Cheating Value Guarantee Alert */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="font-bold">Consumer Advisory: </span>
            Traditional street buyers often quote higher prices per kg but rig mechanical spring balances by 20% to 30%. 
            Our partners use <strong className="font-semibold text-slate-900">CPCB calibrated digital scales</strong> with instant digital UPI receipts.
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="p-6 pb-2 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search scrap item (e.g. Copper, Laptop, PCB)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-700 transition"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'all' 
                    ? 'bg-emerald-700 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Scrap
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    activeTab === cat.id 
                      ? 'bg-emerald-700 text-white shadow-2xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rate Cards Grid */}
        <div className="p-6 pt-2 max-h-[46vh] overflow-y-auto space-y-6">
          {filteredCategories.map(cat => (
            <div key={cat.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-xs tracking-wider uppercase">{cat.name}</h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {cat.badge}
                  </span>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">{cat.description}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {cat.items.map(item => (
                  <div 
                    key={item.id}
                    className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-sm font-bold text-emerald-800 shrink-0 font-mono">
                        Rs. {item.rate}<span className="text-[11px] font-normal text-slate-500">/{item.unit}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Quick Fair-Price Calculator Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Instant Rate Calculator</h4>
              <div className="flex items-center gap-2 mt-1.5">
                <select 
                  value={calcItem}
                  onChange={e => setCalcItem(e.target.value)}
                  className="bg-white border border-slate-300 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  {allItems.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.name} (Rs. {i.rate}/{i.unit})
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1">
                  <input 
                    type="number"
                    min="1"
                    value={calcQty}
                    onChange={e => setCalcQty(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-white border border-slate-300 text-xs text-slate-900 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                  <span className="text-xs text-slate-500 font-medium">{selectedItemObj?.unit}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Estimated Payout</span>
              <span className="text-xl font-bold text-emerald-800 font-mono">Rs. {calculatedTotal.toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={() => {
                setIsRateModalOpen(false);
                if (isAuthenticated) {
                  setIsCreatePickupModalOpen(true);
                } else {
                  openAuth('citizen');
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <span>Schedule Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
