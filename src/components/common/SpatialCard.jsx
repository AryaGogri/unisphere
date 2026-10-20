import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * SpatialCard implements a spatial 3D user interface for cards.
 * Features:
 * - Dynamic 3D tilt tracking cursor coordinates
 * - Multi-layer Z-elevation (preserve-3d)
 * - Dynamic specular light sheen that follows cursor position
 * - Dynamic directional drop shadows based on tilt
 * - Micro-beveled spatial edge highlights
 * - Pillar-themed chromatic luminescence
 * - Graceful spring smoothing and mobile/reduced-motion fallback
 */
export function SpatialCard({
  children,
  className = '',
  glow = null, // 'memory' | 'exchange' | 'connect' | 'opportunity' | 'explore' | 'neutral'
  intensity = 1,
  depth = 30, // max translateZ in px
  onClick,
  interactive = true,
  ...props
}) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentages
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const glowStyles = {
    memory: {
      glow: 'rgba(245, 158, 11, 0.22)',
      border: 'rgba(245, 158, 11, 0.4)',
      accent: '#f59e0b',
      sheen: 'rgba(245, 158, 11, 0.15)'
    },
    exchange: {
      glow: 'rgba(20, 184, 166, 0.22)',
      border: 'rgba(20, 184, 166, 0.4)',
      accent: '#14b8a6',
      sheen: 'rgba(20, 184, 166, 0.15)'
    },
    connect: {
      glow: 'rgba(139, 92, 246, 0.25)',
      border: 'rgba(139, 92, 246, 0.45)',
      accent: '#8b5cf6',
      sheen: 'rgba(139, 92, 246, 0.18)'
    },
    opportunity: {
      glow: 'rgba(59, 130, 246, 0.22)',
      border: 'rgba(59, 130, 246, 0.4)',
      accent: '#3b82f6',
      sheen: 'rgba(59, 130, 246, 0.15)'
    },
    explore: {
      glow: 'rgba(16, 185, 129, 0.22)',
      border: 'rgba(16, 185, 129, 0.4)',
      accent: '#10b981',
      sheen: 'rgba(16, 185, 129, 0.15)'
    },
    neutral: {
      glow: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.2)',
      accent: '#a5b4fc',
      sheen: 'rgba(255, 255, 255, 0.12)'
    }
  };

  const currentTheme = glow ? glowStyles[glow] || glowStyles.neutral : null;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReducedMotion || !interactive) return;

    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = Math.min(100, Math.max(0, (clientX / rect.width) * 100));
    const yPct = Math.min(100, Math.max(0, (clientY / rect.height) * 100));

    // Calculate rotation (-8 to +8 deg standard)
    const maxRotate = 8 * intensity;
    const rotateX = ((clientY / rect.height) - 0.5) * -maxRotate * 2;
    const rotateY = ((clientX / rect.width) - 0.5) * maxRotate * 2;

    setMousePos({ x: xPct, y: yPct });
    setRotate({ x: rotateX, y: rotateY });
  }, [intensity, prefersReducedMotion, interactive]);

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  if (prefersReducedMotion || !interactive) {
    return (
      <div
        onClick={onClick}
        className={twMerge(
          'relative rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl transition-all duration-200',
          currentTheme && 'shadow-lg',
          className
        )}
        style={currentTheme ? { borderColor: currentTheme.border, boxShadow: `0 10px 30px ${currentTheme.glow}` } : {}}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: '1200px' }}
      className="spatial-card-wrapper transition-transform duration-300"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          translateZ: isHovered ? 12 : 0,
          scale: isHovered ? 1.015 : 1
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.6
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px ${currentTheme ? currentTheme.glow : 'rgba(99, 102, 241, 0.15)'}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`
            : '0 16px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        className={twMerge(
          'relative rounded-2xl bg-[#0d1224]/75 border border-white/10 backdrop-blur-2xl overflow-hidden cursor-pointer transition-colors duration-300',
          isHovered && 'border-white/25',
          className
        )}
        {...props}
      >
        {/* Dynamic Specular Sheen Layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}% ${mousePos.y}%, ${currentTheme ? currentTheme.sheen : 'rgba(255, 255, 255, 0.12)'}, transparent 60%)`
          }}
        />

        {/* Dynamic Specular Edge Catch */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
        />

        {/* Deep chromatic corner aura */}
        {currentTheme && (
          <div
            className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-40 blur-2xl transition-opacity duration-500"
            style={{
              background: currentTheme.accent,
              opacity: isHovered ? 0.65 : 0.3
            }}
          />
        )}

        {/* Spatial Content Layer with Z-Elevation */}
        <div
          className="relative z-10 w-full h-full"
          style={{
            transform: isHovered ? `translateZ(${depth}px)` : 'translateZ(0px)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
