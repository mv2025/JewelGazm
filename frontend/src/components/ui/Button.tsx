import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  magnetic?: boolean;
}

/**
 * Premium Luxury Button component
 * Supports magnetic hover springs, loading overlays, and custom slide sweeps on hover.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  magnetic = false,
  className,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Motion values for magnetic spring pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate distance from center of the button
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Dampen distance for subtle movement
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Preset styles
  const baseStyle = 'relative inline-flex items-center justify-center font-sans font-medium tracking-widest uppercase transition-luxury select-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none';
  
  const sizes = {
    sm: 'text-[10px] px-4 py-2 border-[0.5px]',
    md: 'text-[11px] px-8 py-3.5 border-[0.5px]',
    lg: 'text-[12px] px-10 py-4.5 border-[0.5px] tracking-wider',
  };

  const variants = {
    primary: 'bg-primary text-white border-primary hover:bg-transparent hover:text-primary dark:bg-white dark:text-primary dark:border-white dark:hover:bg-transparent dark:hover:text-white',
    secondary: 'bg-transparent text-primary border-primary/20 hover:border-primary dark:text-white dark:border-white/20 dark:hover:border-white',
    outline: 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary',
    gold: 'bg-gold text-white border-gold hover:bg-transparent hover:text-gold dark:hover:text-gold-hover',
    text: 'border-transparent bg-transparent text-primary hover:text-gold p-0 tracking-widest dark:text-white dark:hover:text-gold',
  };

  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span className={cn('flex items-center gap-2', loading && 'opacity-60')}>{children}</span>
    </>
  );

  if (magnetic && !disabled) {
    return (
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={cn(baseStyle, sizes[size], variants[variant], className)}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyle, sizes[size], variants[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
