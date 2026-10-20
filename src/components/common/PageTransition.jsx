import React from 'react';
import { motion } from 'motion/react';

export function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full min-h-[calc(100vh-5rem)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
