import React from 'react';
import { SpatialCard } from './SpatialCard';

export function GlassCard({
  children,
  className = '',
  glow = null,
  onClick,
  intensity = 1,
  depth = 24,
  interactive = true,
  ...props
}) {
  return (
    <SpatialCard
      glow={glow}
      onClick={onClick}
      intensity={intensity}
      depth={depth}
      interactive={interactive}
      className={className}
      {...props}
    >
      {children}
    </SpatialCard>
  );
}

export { SpatialCard };

