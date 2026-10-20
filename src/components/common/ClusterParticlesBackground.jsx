import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ClusterParticlesBackground: High-performance 2D Canvas Clustered Floating Particle System.
 * Renders multiple floating orbital clusters with delicate constellation connections and cursor reactivity.
 */
export function ClusterParticlesBackground({ className = '', opacity = 0.55 }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initClusters();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracker
    const mouse = { x: width / 2, y: height / 2, radius: 140, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Pillar color themes
    const CLUSTER_THEMES = [
      { color: '245, 158, 11', name: 'memory' },      // Amber
      { color: '20, 184, 166', name: 'exchange' },    // Teal
      { color: '139, 92, 246', name: 'connect' },     // Violet
      { color: '59, 130, 246', name: 'opportunity' }, // Blue
      { color: '16, 185, 129', name: 'explore' }      // Emerald
    ];

    let clusters = [];

    function initClusters() {
      clusters = [];
      const clusterCount = Math.min(5, Math.max(3, Math.floor(width / 320)));

      for (let i = 0; i < clusterCount; i++) {
        const theme = CLUSTER_THEMES[i % CLUSTER_THEMES.length];
        const center = {
          x: (width / (clusterCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100,
          y: height * 0.25 + (i % 2 === 0 ? 0 : height * 0.45) + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 120 + Math.random() * 40
        };

        const particles = [];
        const pCount = Math.floor(22 + Math.random() * 12);

        for (let j = 0; j < pCount; j++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * center.radius;
          particles.push({
            relX: Math.cos(angle) * dist,
            relY: Math.sin(angle) * dist,
            orbitSpeed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
            angle: angle,
            dist: dist,
            size: 1 + Math.random() * 2.2,
            alpha: 0.3 + Math.random() * 0.6,
            pulse: Math.random() * Math.PI
          });
        }

        clusters.push({ center, theme, particles });
      }
    }

    initClusters();

    // Render loop
    let lastTime = 0;
    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      clusters.forEach((cluster) => {
        const { center, theme, particles } = cluster;

        // Drift cluster center
        center.x += center.vx;
        center.y += center.vy;

        // Gentle bounce off screen bounds
        if (center.x < 100 || center.x > width - 100) center.vx *= -1;
        if (center.y < 100 || center.y > height - 100) center.vy *= -1;

        // Render subtle cluster atmospheric ambient aura
        const gradient = ctx.createRadialGradient(
          center.x, center.y, 10,
          center.x, center.y, center.radius * 1.6
        );
        gradient.addColorStop(0, `rgba(${theme.color}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${theme.color}, 0.02)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, center.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Calculate absolute positions of particles
        const absParticles = particles.map((p) => {
          p.angle += p.orbitSpeed;
          p.pulse += 0.02;

          let px = center.x + Math.cos(p.angle) * p.dist;
          let py = center.y + Math.sin(p.angle) * p.dist;

          // Mouse push/pull physics
          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            if (distToMouse < mouse.radius && distToMouse > 0) {
              const force = (1 - distToMouse / mouse.radius) * 18;
              px += (dx / distToMouse) * force;
              py += (dy / distToMouse) * force;
            }
          }

          return { x: px, y: py, size: p.size, alpha: p.alpha * (0.7 + Math.sin(p.pulse) * 0.3) };
        });

        // Draw dynamic filament lines between close particles within cluster
        for (let i = 0; i < absParticles.length; i++) {
          for (let j = i + 1; j < absParticles.length; j++) {
            const p1 = absParticles[i];
            const p2 = absParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 65) {
              const lineAlpha = (1 - dist / 65) * 0.22;
              ctx.strokeStyle = `rgba(${theme.color}, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw particle points
        absParticles.forEach((p) => {
          ctx.fillStyle = `rgba(${theme.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Core micro-sparkle
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
}
