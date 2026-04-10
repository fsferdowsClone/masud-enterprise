import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export default function Skeleton({ className = "", variant = 'rect' }: SkeletonProps) {
  const baseClass = "bg-brand-primary/5 relative overflow-hidden";
  const variantClass = variant === 'circle' ? "rounded-full" : variant === 'text' ? "rounded-md h-4 w-full" : "rounded-2xl";

  return (
    <div className={`${baseClass} ${variantClass} ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent skew-x-12"
      />
    </div>
  );
}
