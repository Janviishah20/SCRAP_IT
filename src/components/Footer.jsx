import React from 'react';
import { useApp } from '../context/AppContext';
import { Recycle, ShieldCheck, Scale, Leaf, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { openAuth, setIsRateModalOpen, openLegalModal } = useApp();

  return (
    <footer className="mt-20 border-t border-emerald-100 bg-gradient-to-b from-white to-slate-100/90 text-slate-600 text-xs relative">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                KABADIWALA<span className="text-emerald-700"> CONNECT</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Organizing India's informal scrap ecosystem with calibrated digital scales, transparent benchmark pricing, and verifiable circular e-waste flows.
            </p>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CPCB E-Waste Rules 2022 Compliant</span>
            </div>
          </div>

          {/* Col 2: Portals & Access */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Portals & Workflows</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openAuth('citizen')} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                  <span>Household Scrap Pickup</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => openAuth('kabadiwala')} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                  <span>Collector Partner Hub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => openAuth('recycler')} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                  <span>Authorized Recycler B2B Exchange</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setIsRateModalOpen(true)} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                  <span>Daily Verified Rate Index</span>
                  <Scale className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Anti-Cheating Standards & Operational Centers */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Standards & Locations</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>• Calibrated IoT Digital Weighing</li>
              <li>• Photo-based Vehicle Capacity Planning</li>
              <li>• Direct UPI Disbursement on Handover</li>
              <li>• Serialized CPCB EPR Certificates</li>
            </ul>
            <div className="pt-2 text-[11px] text-slate-500 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>Operational in Delhi NCR: Okhla, Mayapuri & Noida Sectors 50-78</span>
            </div>
          </div>

          {/* Col 4: Verified Contact & Grievance (Items #36, #47) */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">Support & Grievance</h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="mailto:support@kabadiwalaconnect.in" className="hover:text-emerald-800 hover:underline">
                  support@kabadiwalaconnect.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="tel:+911149208000" className="hover:text-emerald-800 hover:underline font-mono">
                  +91 11 4920 8000
                </a>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/80">
                Helpline active Mon-Sat: 9:00 AM to 6:00 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* Legal & Compliance Bottom Strip (Items #26, #27, #37, #48) */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Kabadiwala Connect Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => openLegalModal('privacy')}
              className="hover:text-slate-900 transition underline underline-offset-2"
            >
              Privacy Policy (DPDP Act)
            </button>
            <button 
              onClick={() => openLegalModal('terms')}
              className="hover:text-slate-900 transition underline underline-offset-2"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => openLegalModal('terms')}
              className="hover:text-slate-900 transition"
            >
              EPR Compliance Notice
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
