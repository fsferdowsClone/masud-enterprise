import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export default function LuxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);

  return (
    <div ref={ref} className="relative h-px w-full bg-brand-neutral/5 overflow-hidden">
      <motion.div 
        style={{ x }}
        className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"
      />
    </div>
  );
}
