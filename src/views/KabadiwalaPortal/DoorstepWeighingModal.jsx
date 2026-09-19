import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Scale, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck, 
  QrCode, 
  Smartphone
} from 'lucide-react';

export default function DoorstepWeighingModal() {
  const { 
    isWeighingModalOpen, 
    setIsWeighingModalOpen, 
    activeRequestForWeighing, 
    completePickup 
  } = useApp();

  if (!isWeighingModalOpen || !activeRequestForWeighing) return null;

  const req = activeRequestForWeighing;

  const [itemsList, setItemsList] = useState(() => {
    return req.itemsSummary.map(item => ({
      ...item,
      verifiedQty: item.qty,
      verifiedRate: item.estRate || 300
    }));
  });

  const [paymentMode, setPaymentMode] = useState('upi');
  const [upiId, setUpiId] = useState(`${req.citizenPhone.replace(/[^0-9]/g, '').slice(-10)}@oksbi`);

  const totalVerifiedWeight = itemsList.reduce((acc, curr) => acc + (Number(curr.verifiedQty) || 0), 0);
  const totalVerifiedPayout = itemsList.reduce((acc, curr) => acc + (Number(curr.verifiedQty) || 0) * (Number(curr.verifiedRate) || 0), 0);

  const handleQtyChange = (idx, value) => {
    const updated = [...itemsList];
    updated[idx].verifiedQty = Math.max(0.1, parseFloat(value) || 0);
    setItemsList(updated);
  };

  const handleComplete = (e) => {
    e.preventDefault();

    const txnRef = paymentMode === 'upi' 
      ? `UPI/IND/${Math.floor(10000000 + Math.random() * 90000000)}` 
      : `CASH-REC-${Math.floor(1000 + Math.random() * 9000)}`;

    completePickup(
      req.id,
      totalVerifiedWeight,
      totalVerifiedPayout,
      txnRef,
      itemsList
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8 text-slate-900">
        
        {/* Header with Digital Scale IoT status */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Doorstep Digital Scale Calibration</h2>
                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Wifi className="w-3 h-3 text-emerald-700" />
                  DS-44 Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Customer: <strong className="text-slate-800">{req.citizenName}</strong> ({req.id})
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsWeighingModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Calibration Guarantee */}
        <div className="bg-slate-100/70 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Tare Zero Calibrated • Tamper-Proof Weighing</span>
          </div>
          <span className="text-emerald-800 font-mono text-[11px] font-bold">Accuracy: ±0.05 kg</span>
        </div>

        <form onSubmit={handleComplete} className="p-6 space-y-6">
          
          {/* Item-by-item verified weights */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Item Weights Measured on Doorstep:
            </span>

            <div className="space-y-2 max-h-52 overflow-y-auto">
              {itemsList.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">{item.name}</span>
                    <span className="text-[11px] text-emerald-800 font-semibold">Rs. {item.verifiedRate}/{item.unit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-300">
                      <span className="text-[11px] text-slate-500">Weight:</span>
                      <input 
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={item.verifiedQty}
                        onChange={e => handleQtyChange(idx, e.target.value)}
                        className="w-16 bg-transparent text-right text-xs font-bold text-emerald-800 focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-600 font-medium">{item.unit}</span>
                    </div>

                    <div className="text-right w-24">
                      <span className="text-xs font-bold text-slate-900 block font-mono">
                        Rs. {Math.round(item.verifiedQty * item.verifiedRate).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scale Totals Display (Solid, clean contrast) */}
          <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Total Digital Scale Weight
              </span>
              <span className="text-2xl font-bold font-mono text-white">
                {totalVerifiedWeight.toFixed(1)} <span className="text-sm font-normal text-slate-300">kg</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Total Settlement Payout
              </span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                Rs. {Math.round(totalVerifiedPayout).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Payment Mode Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Instant Doorstep Payment Mode:
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                  paymentMode === 'upi' 
                    ? 'bg-emerald-50 border-emerald-700 text-slate-900' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-800" />
                <div>
                  <span className="text-xs font-bold block text-slate-900">Instant UPI Transfer</span>
                  <span className="text-[10px] text-slate-500">Direct VPA Disbursement</span>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setPaymentMode('cash')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                  paymentMode === 'cash' 
                    ? 'bg-emerald-50 border-emerald-700 text-slate-900' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-slate-700" />
                <div>
                  <span className="text-xs font-bold block text-slate-900">Cash Handover</span>
                  <span className="text-[10px] text-slate-500">With Digital Receipt</span>
                </div>
              </button>
            </div>

            {paymentMode === 'upi' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Citizen UPI ID:</span>
                <span className="font-mono text-emerald-800 font-bold">{upiId}</span>
              </div>
            )}
          </div>

          {/* Final Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 border-t border-slate-200">
            <button 
              type="button"
              onClick={() => setIsWeighingModalOpen(false)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition text-center"
            >
              Cancel
            </button>

            <button 
              type="submit"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Disburse Rs. {Math.round(totalVerifiedPayout).toLocaleString('en-IN')}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
