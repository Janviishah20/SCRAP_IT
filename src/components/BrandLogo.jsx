import React from 'react';
import { Recycle } from 'lucide-react';

/**
 * Brand Logo for SCRAPIT
 * Matches the user-specified green rounded badge with the white Recycle icon.
 */
export default function BrandLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: {
      container: 'w-8 h-8 rounded-xl',
      icon: 'w-4 h-4'
    },
    md: {
      container: 'w-10 h-10 rounded-xl',
      icon: 'w-5 h-5'
    },
    lg: {
      container: 'w-12 h-12 rounded-xl',
      icon: 'w-6 h-6'
    },
    xl: {
      container: 'w-16 h-16 rounded-2xl',
      icon: 'w-8 h-8'
    }
  };

  const selected = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-sm shadow-emerald-800/30 transition-all duration-200 hover:brightness-105 ${selected.container} ${className}`}
      title="SCRAPIT"
    >
      <Recycle className={`${selected.icon} text-white stroke-[2.2]`} />
    </div>
  );
}
