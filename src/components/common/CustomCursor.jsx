import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useCursorTracker } from '../../hooks/useCursorTracker';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const { cursorX, cursorY } = useCursorTracker();
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('.cursor-pointer') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer trailing glass lens */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isHovered ? 0.9 : 0.4
        }}
        transition={{ duration: 0.15 }}
        className="absolute w-8 h-8 rounded-full border border-white/30 backdrop-blur-[2px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      />

      {/* Inner precise dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered ? 0.5 : 1
        }}
        className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
      />
    </div>
  );
}
