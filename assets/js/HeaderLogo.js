import React from 'react';

export default function HeaderLogo() {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/assets/img/logo.png"
        alt="MovieKinsey Analytics Logo" 
        className="h-8 w-auto object-contain"
      />
      <span className="font-bold text-xl">MovieKinsey Analytics®</span>
    </div>
  );
}