import React from 'react';

/**
 * Modern Custom Brand Logo for SCRAPIT
 * Features a circular economy loop with dual dynamic arrows forming a stylized 'S'
 * with modern emerald/teal gradients and tech accents.
 */
export default function BrandLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-3xl'
  };

  const containerClass = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/25 ring-1 ring-white/20 transition-all duration-300 hover:shadow-emerald-600/40 hover:scale-[1.02] ${containerClass} ${className}`}
    >
      <svg 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-[62%] h-[62%]"
      >
        <defs>
          <linearGradient id="scrapitInnerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Top Loop: Sweeping circular arrow forming top of 'S' */}
        <path 
          d="M26 14C24.5 10 20.5 7.5 16 7.5C10.8 7.5 6.5 11.8 6.5 17C6.5 18.2 6.7 19.3 7.2 20.3" 
          stroke="white" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
        />
        {/* Top Arrowhead */}
        <path 
          d="M23 16L27 13.5L25 9.5" 
          stroke="white" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Bottom Loop: Sweeping circular arrow forming bottom of 'S' */}
        <path 
          d="M10 22C11.5 26 15.5 28.5 20 28.5C25.2 28.5 29.5 24.2 29.5 19C29.5 17.8 29.3 16.7 28.8 15.7" 
          stroke="white" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
        />
        {/* Bottom Arrowhead */}
        <path 
          d="M13 20L9 22.5L11 26.5" 
          stroke="white" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Center Digital Leaf / Tech Node Core */}
        <path 
          d="M14 18C14 14.5 18 14 20 12C20 15.5 16 16 14 18Z" 
          fill="url(#scrapitInnerGlow)" 
        />
        <path 
          d="M22 18C22 21.5 18 22 16 24C16 20.5 20 20 22 18Z" 
          fill="url(#scrapitInnerGlow)" 
        />
        <circle cx="18" cy="18" r="1.75" fill="white" />
      </svg>
    </div>
  );
}
