import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundView() {
  const { setCurrentView, switchRole } = useApp();

  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
        <AlertCircle className="h-8 w-8" />
      </div>
      <span className="mt-6 block font-mono text-sm font-bold text-amber-700">404 ERROR</span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Page or Workflow Not Found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
        The scrap dispatch record, pickup request, or portal view you were looking for does not exist or has been relocated.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          <Home className="h-4 w-4" />
          <span>Return to Homepage</span>
        </button>
        <button
          onClick={() => {
            switchRole('citizen');
            setCurrentView('portal');
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Open Citizen Dashboard</span>
        </button>
      </div>
    </div>
  );
}
