import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

export function GlassButton({
  children,
  variant = 'default', // default | primary | danger | outline
  size = 'md', // sm | md | lg
  icon: Icon = null,
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const variantClasses = {
    default: 'glass-button',
    primary: 'glass-button glass-button-primary',
    danger: 'glass-button bg-rose-500/20 text-rose-200 border-rose-500/30 hover:bg-rose-500/30',
    outline: 'glass-button bg-transparent border-white/10 hover:bg-white/5'
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-2xl'
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
}
