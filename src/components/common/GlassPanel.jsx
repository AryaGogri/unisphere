import React from 'react';
import { twMerge } from 'tailwind-merge';

export function GlassPanel({ children, className = '', ...props }) {
  return (
    <div className={twMerge('glass-panel p-6', className)} {...props}>
      {children}
    </div>
  );
}
