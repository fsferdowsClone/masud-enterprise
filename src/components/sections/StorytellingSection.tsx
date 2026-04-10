import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

const EXPO_IMAGES = [
  "https://images.unsplash.com/photo-1540575861501-7c90b707a27d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200"
];

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const curtainY = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "-100%", "-100%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const curtainScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-brand-primary">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Technical Blueprint Grid */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.15, 0.15, 0]),
            scale: useTransform(scrollYProgress, [0, 1], [1.2, 1])
          }}
          className="absolute inset-0 z-5 pointer-events-none"
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)', backgroundSize: '200px 200px', opacity: 0.2 }} />
        </motion.div>

        {/* Floating Technical Annotations */}
        <div className="absolute inset-0 z-25 pointer-events-none">
          <FloatingAnnotation 
            text="STRUCTURAL LOAD: 50T" 
            progress={scrollYProgress} 
            range={[0.2, 0.4]} 
            position={{ top: '20%', left: '15%' }} 
          />
          <FloatingAnnotation 
            text="MODULAR TOLERANCE: ±0.5mm" 
            progress={scrollYProgress} 
            range={[0.4, 0.6]} 
            position={{ bottom: '25%', right: '10%' }} 
          />
          <FloatingAnnotation 
            text="RIYADH EXPO 2026 READY" 
            progress={scrollYProgress} 
            range={[0.6, 0.8]} 
            position={{ top: '40%', right: '15%' }} 
          />
          <FloatingAnnotation 
            text="STEEL GRADE: S355JR" 
            progress={scrollYProgress} 
            range={[0.7, 0.9]} 
            position={{ bottom: '30%', left: '10%' }} 
          />
        </div>

        {/* Parallax Curtain Reveal */}
        <motion.div 
          style={{ y: curtainY, opacity: curtainOpacity, scale: curtainScale }}
          className="absolute inset-0 z-30 bg-brand-primary flex flex-col items-center justify-center p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <span className="text-brand-accent uppercase tracking-[1.2em] text-[10px] font-bold mb-8 block">The Narrative</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-brand-neutral tracking-[0.4em] leading-tight uppercase">
              THE JOURNEY <br /> 
              <span className="text-brand-accent italic font-serif text-2xl md:text-4xl tracking-widest lowercase block mt-4">Begins Here</span>
            </h2>
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-32 h-px bg-brand-accent mt-12 origin-center"
          />
        </motion.div>

        {/* The "Video to JPG" Sequence Effect */}
        {EXPO_IMAGES.map((src, index) => (
          <div key={index}>
            <ImageLayer 
              src={src} 
              index={index} 
              total={EXPO_IMAGES.length} 
              progress={scrollYProgress} 
            />
          </div>
        ))}

        {/* Overlay Text */}
        <div className="relative z-20 text-center px-6 pointer-events-none">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 1], [100, -100]),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
            }}
          >
            <span className="text-brand-accent uppercase tracking-[1em] text-[10px] font-bold mb-8 block">The 2026 Vision</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-brand-neutral leading-[0.85] tracking-tighter uppercase">
              IMMERSIVE <br /> <span className="italic font-serif font-light text-brand-accent lowercase">Storytelling</span>
            </h2>
          </motion.div>
        </div>

        {/* Circular Mask Reveal feel */}
        <motion.div 
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.1, 0.1, 0])
          }}
          className="absolute inset-0 border-[10vw] border-brand-primary z-15 rounded-full pointer-events-none"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-primary/80 via-transparent to-brand-primary/80 pointer-events-none" />

        {/* Final Vision Text */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]),
            scale: useTransform(scrollYProgress, [0.85, 0.95], [0.8, 1])
          }}
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <span className="text-brand-accent uppercase tracking-[1.5em] text-[10px] font-bold mb-6 block">The Future of Riyadh</span>
            <h3 className="text-4xl md:text-6xl font-serif text-brand-neutral tracking-tight">PRECISION <br /> <span className="italic text-brand-accent">Redefined</span></h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingAnnotation({ text, progress, range, position }: { text: string, progress: any, range: [number, number], position: any }) {
  const gap = range[1] - range[0];
  const opacity = useTransform(
    progress, 
    [
      range[0], 
      Math.min(range[1] - 0.001, range[0] + gap * 0.2), 
      Math.max(range[0] + 0.001, range[1] - gap * 0.2), 
      range[1]
    ], 
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, range, [20, -20]);

  return (
    <motion.div
      style={{ opacity, y, ...position }}
      className="absolute flex items-center gap-4"
    >
      <div className="w-8 h-px bg-brand-accent/40" />
      <span className="text-[9px] font-mono text-brand-accent tracking-[0.3em] whitespace-nowrap uppercase">
        {text}
      </span>
    </motion.div>
  );
}

function ImageLayer({ src, index, total, progress }: { src: string, index: number, total: number, progress: any }) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const gap = end - start;
  
  // Richer effects: chromatic aberration simulation, better scale/rotate
  const opacity = useTransform(
    progress, 
    [
      Math.max(0, start - gap * 0.2), 
      Math.min(end - 0.001, start + gap * 0.1), 
      Math.max(start + 0.001, end - gap * 0.1), 
      Math.min(1, end + gap * 0.2)
    ], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.4, 1.1]);
  const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -10 : 10, 0]);
  const blur = useTransform(
    progress, 
    [
      start, 
      Math.min(end - 0.001, start + gap * 0.15), 
      Math.max(start + 0.001, end - gap * 0.15), 
      end
    ], 
    ["40px", "0px", "0px", "40px"]
  );
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? -50 : 50, 0]);
  const clipPath = useTransform(
    progress,
    [
      start, 
      Math.min(end - 0.001, start + 0.2 * gap), 
      Math.max(start + 0.001, end - 0.2 * gap), 
      end
    ],
    [
      "inset(20% 20% 20% 20% round 5rem)",
      "inset(0% 0% 0% 0% round 0rem)",
      "inset(0% 0% 0% 0% round 0rem)",
      "inset(20% 20% 20% 20% round 5rem)"
    ]
  );

  return (
    <motion.div
      style={{ opacity, scale, rotate, x, filter: `blur(${blur})`, clipPath }}
      className="absolute inset-0 w-full h-full preserve-3d"
    >
      <img 
        src={src} 
        alt={`Expo ${index}`} 
        className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
      {/* Chromatic Aberration Overlay */}
      <motion.div 
        style={{ 
          opacity: useTransform(
            progress, 
            [
              start, 
              Math.min(end - 0.001, start + gap * 0.1), 
              Math.max(start + 0.001, end - gap * 0.1), 
              end
            ], 
            [0, 0.4, 0.4, 0]
          ),
          x: useTransform(progress, [start, end], [10, -10])
        }}
        className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-blue-500/30 mix-blend-screen pointer-events-none"
      />
    </motion.div>
  );
}
