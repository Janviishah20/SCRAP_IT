import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Scale } from 'lucide-react';

export default function PrivacyAndTermsModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Legal, Privacy & Compliance</h2>
              <p className="text-xs text-slate-500">CPCB E-Waste Rules 2022 & Digital Personal Data Protection Act 2023</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
              activeTab === 'privacy'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
              activeTab === 'terms'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6 text-xs text-slate-600 leading-relaxed space-y-4">
          {activeTab === 'privacy' ? (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <p className="font-semibold">Compliance Note:</p>
                <p className="mt-0.5 text-[11px]">
                  This Privacy Policy adheres to the provisions of the Digital Personal Data Protection (DPDP) Act, 2023 and the Information Technology Act, 2000 of India.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
                <p className="mt-1">When booking a scrap pickup or registering as a collection partner, we collect:</p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li><strong>Personal Identifiers:</strong> Name, contact phone number, and physical pickup address with landmark.</li>
                  <li><strong>Scrap Documentation:</strong> Uploaded images of scrap materials, estimated item counts, and scrap categories.</li>
                  <li><strong>Transaction Records:</strong> IoT digital weighing log, verified gross/tare weights, and UPI payment reference identifiers.</li>
                  <li><strong>Technical Data:</strong> Browser session information, geolocation coordinates for route optimization, and localized cache for offline weighing sync.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Purpose of Data Processing</h3>
                <p className="mt-1">Your data is processed strictly for:</p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Dispatching authorized local kabadiwala partners to your doorstep.</li>
                  <li>Generating anti-tampering digital weighing receipts.</li>
                  <li>Auditing chain-of-custody documentation required by the Central Pollution Control Board (CPCB) for Extended Producer Responsibility (EPR) certification.</li>
                  <li>Processing instant UPI disbursements directly to your verified VPA.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Data Retention & Sharing</h3>
                <p className="mt-1">
                  We do not sell personal data to third parties. Verified e-waste recycling records are securely archived for 5 years in compliance with CPCB environmental inspection protocols.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">4. Contact Grievance Officer</h3>
                <p className="mt-1">
                  For data correction or erasure requests, contact our designated Grievance Officer at <a href="mailto:grievance@scrapit.in" className="text-emerald-800 underline font-semibold">grievance@scrapit.in</a> or by phone at <a href="tel:+911149208000" className="text-emerald-800 underline font-semibold">+91 11 4920 8000</a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                <p className="font-semibold">Statutory Reference:</p>
                <p className="mt-0.5 text-[11px]">
                  All transactions and handovers facilitated by SCRAPIT are governed by the E-Waste (Management) Rules, 2022 notified by the Ministry of Environment, Forest and Climate Change (MoEFCC), Government of India.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Scrap Weighing & Anti-Tamper Guarantee</h3>
                <p className="mt-1">
                  All collection partners are required to utilize certified, calibrated Bluetooth/IoT digital scales. Mechanical spring scales are strictly banned from platform fulfillment. The weight logged on the digital receipt represents the final legally binding settlement figure.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Prohibited & Hazardous Materials</h3>
                <p className="mt-1">
                  Users agree not to offer radioactive materials, biohazardous clinical waste, unexploded pressure canisters, or un-dismantled industrial chemicals. Lithium-ion batteries must be declared separately to ensure fire-safe transport containers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Rate Index & Instant Settlement</h3>
                <p className="mt-1">
                  Scrap prices shown on the live rate card reflect daily wholesale benchmark indexes in regional hubs (e.g. Mayapuri, Mandi Gobindgarh). Payment is settled via direct UPI or verified cash voucher prior to the collector departing your premises.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">4. B2B Lots & Recycler Certification</h3>
                <p className="mt-1">
                  Aggregated lots purchased by smelters generate automated CPCB Extended Producer Responsibility (EPR) credit certificates. Falsification of metal yields or batch weights will result in immediate suspension of platform credentials and reporting to state pollution boards.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Last updated: September 2026</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-700 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
