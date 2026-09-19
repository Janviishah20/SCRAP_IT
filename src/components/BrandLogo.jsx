import React from 'react';
import logoImg from '../assets/logo.png';

/**
 * Brand Logo for SCRAPIT
 * Displays the official custom eco S-recycle emblem logo.
 */
export default function BrandLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 select-none ${selectedSize} ${className}`}
      title="SCRAPIT"
    >
      <img 
        src={logoImg} 
        alt="SCRAPIT Logo" 
        className="w-full h-full object-contain drop-shadow-xs"
        loading="eager"
      />
    </div>
  );
}

