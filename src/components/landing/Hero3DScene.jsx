import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Hero3DScene / Dark Aurora Background:
 * A premium, minimal, atmospheric dark aurora background with soft, large blurred gradient blobs.
 * Features:
 * - Deep violet/purple glow on the upper-left
 * - Electric blue glow around the lower-left
 * - Soft cyan/teal glow on the upper-right
 * - Emerald/teal glow on the lower-right
 * - Ultra-subtle indigo/violet glow behind the center headline
 * - Subtle warm amber glow near the Memory pill
 * - Smooth continuous ambient floating drift (10-30px) and scale changes
 * - Zero wireframe meshes, zero dense line-nets, zero crypto/AI slop
 */
export function Hero3DScene() {
  const prefersReducedMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized from -1 to 1, scaled to a gentle 15px max parallax
      targetX = ((e.clientX / innerWidth) - 0.5) * 20;
      targetY = ((e.clientY / innerHeight) - 0.5) * 20;
    };

    const loop = () => {
      // Smooth lerp damping
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMouseOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Deep Navy / Black Canvas Background */}
      <div className="absolute inset-0 bg-[#060813]" />

      {/* Atmospheric Aurora Layer Container with subtle Parallax */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
        }}
      >
        {/* Blob 1: Deep Violet / Purple Glow (Upper-Left) */}
        <div
          className="aurora-blob aurora-anim-1 -top-[12%] -left-[6%] sm:-top-[8%] sm:left-[2%] w-[420px] sm:w-[680px] lg:w-[800px] h-[420px] sm:h-[680px] lg:h-[800px] opacity-75 sm:opacity-85"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(124, 58, 237, 0.08) 45%, transparent 70%)',
            filter: 'blur(90px) sm:blur(130px)'
          }}
        />

        {/* Blob 2: Electric Blue Glow (Lower-Left) */}
        <div
          className="aurora-blob aurora-anim-2 -bottom-[10%] left-[4%] sm:bottom-[2%] sm:left-[8%] w-[380px] sm:w-[620px] lg:w-[720px] h-[380px] sm:h-[620px] lg:h-[720px] opacity-70 sm:opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(37, 99, 235, 0.06) 50%, transparent 72%)',
            filter: 'blur(85px) sm:blur(120px)'
          }}
        />

        {/* Blob 3: Soft Cyan / Teal Glow (Upper-Right) */}
        <div
          className="aurora-blob aurora-anim-3 -top-[10%] -right-[6%] sm:-top-[6%] sm:right-[3%] w-[420px] sm:w-[660px] lg:w-[780px] h-[420px] sm:h-[660px] lg:h-[780px] opacity-75 sm:opacity-85"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.16) 0%, rgba(6, 182, 212, 0.07) 48%, transparent 70%)',
            filter: 'blur(90px) sm:blur(130px)'
          }}
        />

        {/* Blob 4: Emerald / Teal Glow (Lower-Right) */}
        <div
          className="aurora-blob aurora-anim-4 -bottom-[12%] -right-[4%] sm:bottom-[0%] sm:right-[6%] w-[380px] sm:w-[580px] lg:w-[680px] h-[380px] sm:h-[580px] lg:h-[680px] opacity-70 sm:opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(20, 184, 166, 0.06) 50%, transparent 70%)',
            filter: 'blur(85px) sm:blur(125px)'
          }}
        />

        {/* Blob 5: Subtle Warm Amber Glow (Memory Accent - Left/Center) */}
        <div
          className="aurora-blob aurora-anim-5 top-[24%] left-[12%] sm:top-[28%] sm:left-[16%] w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] opacity-60 sm:opacity-75"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.11) 0%, rgba(217, 119, 6, 0.03) 45%, transparent 70%)',
            filter: 'blur(75px) sm:blur(110px)'
          }}
        />

        {/* Blob 6: Ultra-Subtle Indigo/Violet Center Glow (Behind Headline) */}
        <div
          className="aurora-blob aurora-anim-center top-[42%] left-1/2 w-[340px] sm:w-[550px] lg:w-[680px] h-[260px] sm:h-[380px] lg:h-[450px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.07) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 75%)',
            filter: 'blur(70px) sm:blur(100px)'
          }}
        />
      </div>

      {/* Center Dark Radial Vignette to guarantee pristine AA/AAA contrast for the headline */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(6, 8, 19, 0.45) 0%, rgba(6, 8, 19, 0.1) 60%, transparent 100%)'
        }}
      />

      {/* Subtle Micro-grain Texture Overlay (Clean linear-style anti-banding finish) */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

export default Hero3DScene;
