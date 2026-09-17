import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { safeStorage } from '../utils/storage';

export default function PrivacyNotice({ onOpenLegal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = safeStorage.getItem('kc_privacy_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    safeStorage.setItem('kc_privacy_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    safeStorage.setItem('kc_privacy_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900">Privacy & Session Data Notice</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              We store session preferences and digital scale logs locally on your device to maintain verified chain-of-custody for e-waste disposal under CPCB norms.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Essential Only
              </button>
              {onOpenLegal && (
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="text-xs font-medium text-emerald-800 underline hover:text-emerald-900 ml-auto"
                >
                  Privacy Policy
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
            aria-label="Dismiss notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
