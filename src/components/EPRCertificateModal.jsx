import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, ShieldCheck, Printer, QrCode, CheckCircle2, Building2 } from 'lucide-react';

export default function EPRCertificateModal() {
  const { activeEPRModalData, setActiveEPRModalData } = useApp();

  if (!activeEPRModalData) return null;

  const { certificateNumber, recycler, lot, cpcbReg, issueDate, co2Offset, heavyMetalsDiverted } = activeEPRModalData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 rounded-2xl shadow-xl overflow-hidden my-8 text-slate-900">
        
        {/* Top Action Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Government of India CPCB EPR Compliance Record</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 rounded-xl transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print / Download PDF</span>
            </button>
            <button 
              onClick={() => setActiveEPRModalData(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 bg-slate-50 relative">
          
          <div className="border-2 border-emerald-700/20 rounded-xl p-6 sm:p-8 bg-white relative z-10 space-y-6 shadow-xs">
            
            {/* Header / National Accreditation */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 mb-2 shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                Central Pollution Control Board (CPCB) India
              </h2>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Extended Producer Responsibility (EPR) Certificate
              </h1>
              <p className="text-xs text-slate-500">
                Issued under E-Waste (Management) Rules, 2022 & Sustainable Circular Economy Norms
              </p>
              <div className="inline-block mt-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-mono font-bold text-emerald-800">
                Certificate ID: {certificateNumber}
              </div>
            </div>

            {/* Recipient & Lot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Authorized Recycler Facility</span>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-sm font-bold text-slate-900">{recycler.companyName}</span>
                </div>
                <div className="text-slate-700 space-y-1 pt-1">
                  <p><strong className="text-slate-500">CPCB Reg No:</strong> <span className="font-mono text-emerald-800 font-bold">{cpcbReg}</span></p>
                  <p><strong className="text-slate-500">Smelter Facility:</strong> {recycler.factoryLocation}</p>
                  <p><strong className="text-slate-500">Authorized Officer:</strong> {recycler.name}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Origin & Scrap Source</span>
                <div className="text-sm font-bold text-slate-900">{lot.lotTitle}</div>
                <div className="text-slate-700 space-y-1 pt-1">
                  <p><strong className="text-slate-500">Collected By:</strong> {lot.kabadiwalaName}</p>
                  <p><strong className="text-slate-500">Aggregation Hub:</strong> {lot.location}</p>
                  <p><strong className="text-slate-500">Net Scrap Weight:</strong> <span className="font-bold text-emerald-800">{lot.totalWeightKg} kg</span></p>
                  <p><strong className="text-slate-500">Procured Amount:</strong> Rs. {lot.soldPrice?.toLocaleString('en-IN') || lot.totalLotPrice?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Environmental Impact Credits */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Verified Circular Economy & ESG Credits
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-white border border-emerald-200">
                  <span className="text-base sm:text-lg font-bold text-emerald-800 block">{co2Offset} kg</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">CO2 Offset</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-emerald-200">
                  <span className="text-base sm:text-lg font-bold text-slate-900 block">{heavyMetalsDiverted} kg</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Heavy Metals Diverted</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-emerald-200">
                  <span className="text-base sm:text-lg font-bold text-emerald-800 block">100%</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Circular Smelted</span>
                </div>
              </div>
            </div>

            {/* Sign-off & QR Code */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-800 border border-slate-200 shrink-0">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <span className="block text-slate-900 font-bold">Scan to Verify CPCB Authenticity</span>
                  <span>Issued Date: {issueDate}</span>
                  <span className="block text-emerald-800 font-medium">Digital Audit Trail Verified</span>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block border-b-2 border-slate-300 pb-1 px-4 text-xs font-serif italic text-slate-700">
                  Digitally Authorized Officer
                </div>
                <span className="block text-[10px] text-slate-500 mt-1">
                  National E-Waste Circular Exchange (SCRAPIT)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 text-center">
          <button 
            onClick={() => setActiveEPRModalData(null)}
            className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Close & Back to Portal
          </button>
        </div>

      </div>
    </div>
  );
}
