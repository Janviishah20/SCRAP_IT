import React from 'react';
import { PackageOpen } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = PackageOpen, 
  title = 'No records found', 
  description = 'There are no active entries matching your selection at this moment.', 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900 sm:text-base">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500 sm:text-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
