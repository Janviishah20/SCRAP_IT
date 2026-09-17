import React from 'react';

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-100 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
        <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-4 w-20 bg-slate-200 rounded"></div>
        <div className="h-8 w-28 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
      <div className="h-3 w-20 bg-slate-100 rounded"></div>
      <div className="h-7 w-28 bg-slate-200 rounded"></div>
    </div>
  );
}

export default function SkeletonLoader({ count = 3, type = 'card' }) {
  return (
    <div className={type === 'stat' ? 'grid grid-cols-2 sm:grid-cols-4 gap-4' : 'space-y-3'}>
      {Array.from({ length: count }).map((_, index) => (
        type === 'stat' ? <StatSkeleton key={index} /> : <CardSkeleton key={index} />
      ))}
    </div>
  );
}
