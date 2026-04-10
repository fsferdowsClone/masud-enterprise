import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';

const PORTAL_DATA = [
  {
    title: "The Era of Change",
    subtitle: "Riyadh is transforming into a global hub for innovation and culture.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    stat: "2030"
  },
  {
    title: "Global Connectivity",
    subtitle: "Connecting the world through visionary architecture and design.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    stat: "EXPO"
  },
  {
    title: "Sustainable Future",
    subtitle: "Building a legacy that respects our environment and our heritage.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
    stat: "100%"
  }
];

export default function VisionaryPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-brand-primary overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Immersive Background Video - Expo 2030 */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]),
            scale: useTransform(smoothProgress, [0, 1], [1.1, 1])
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <iframe
            src="https://www.youtube.com/embed/Vs_Fmf7Bzt8?autoplay=1&mute=1&loop=1&playlist=Vs_Fmf7Bzt8&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 grayscale-[0.5] contrast-[1.2]"
            allow="autoplay; encrypted-media"
            title="Riyadh Expo 2030"
          />
          <div className="absolute inset-0 bg-brand-primary/20" />
        </motion.div>

        {/* Background Depth Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <PortalRing key={i} index={i} progress={smoothProgress} />
          ))}
        </div>

        {/* Floating Data Cards */}
        {PORTAL_DATA.map((item, index) => (
          <PortalCard 
            key={index} 
            item={item} 
            index={index} 
            total={PORTAL_DATA.length} 
            progress={smoothProgress} 
          />
        ))}

        {/* Center Focal Point & Era of Change Title */}
        <div className="relative z-50 pointer-events-none text-center">
          <motion.div 
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0]),
              scale: useTransform(smoothProgress, [0, 0.4], [0.8, 1.2]),
              y: useTransform(smoothProgress, [0, 0.4], [20, -20])
            }}
          >
            <span className="text-brand-accent uppercase tracking-[1.5em] text-[10px] font-bold block mb-6">Riyadh 2030</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold leading-none tracking-tighter uppercase relative">
              <span className="absolute inset-0 bg-gradient-to-r from-brand-accent via-white to-brand-accent bg-[length:200%_auto] animate-aurora-text bg-clip-text text-transparent">
                THE ERA
              </span>
              <span className="opacity-0">THE ERA</span>
              <br /> 
              <span className="italic font-serif font-light text-brand-accent lowercase">of Change</span>
            </h2>
          </motion.div>

          <motion.div 
            style={{
              opacity: useTransform(smoothProgress, [0.4, 0.5, 0.9, 1], [0, 1, 1, 0]),
              scale: useTransform(smoothProgress, [0.4, 1], [0.9, 1.1])
            }}
            className="mt-12"
          >
            <div className="w-24 h-24 rounded-full border border-brand-accent/20 flex items-center justify-center backdrop-blur-sm mx-auto">
              <div className="w-12 h-12 rounded-full bg-brand-accent/10 animate-pulse" />
            </div>
            <span className="text-brand-accent uppercase tracking-[1em] text-[10px] font-bold block mt-8">Engineering The Future</span>
          </motion.div>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 z-40 bg-radial-vignette pointer-events-none" />
      </div>
    </section>
  );
}

function PortalRing({ index, progress }: any) {
  const start = index * 0.1;
  const opacity = useTransform(
    progress, 
    [
      start, 
      Math.min(1, start + 0.2), 
      Math.min(1, start + 0.4), 
      Math.min(1, start + 0.5)
    ], 
    [0, 0.2, 0.2, 0]
  );
  const scale = useTransform(progress, [start, Math.min(1, start + 0.5)], [0.5, 4]);
  const blur = useTransform(progress, [start, Math.min(1, start + 0.5)], ["0px", "20px"]);

  return (
    <motion.div
      style={{ scale, opacity, filter: `blur(${blur})` }}
      className="absolute w-[60vw] h-[60vw] border border-brand-accent/10 rounded-full"
    />
  );
}

function PortalCard({ item, index, total, progress }: any) {
  const start = (index / total) * 0.8;
  const end = Math.min(1, ((index + 1) / total) * 0.8 + 0.2);
  const gap = end - start;
  
  const z = useTransform(progress, [start, end], [1000, -1000]);
  const opacity = useTransform(
    progress, 
    [
      start, 
      Math.min(end - 0.001, start + gap * 0.2), 
      Math.max(start + 0.001, end - gap * 0.2), 
      end
    ], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress, 
    [
      start, 
      Math.min(end, start + gap * 0.4), 
      end
    ], 
    [0.5, 1, 1.5]
  );
  const rotateY = useTransform(progress, [start, end], [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]);
  const imageY = useTransform(progress, [start, end], ["-10%", "10%"]);

  return (
    <motion.div
      style={{ 
        z, 
        opacity, 
        scale, 
        rotateY,
        perspective: 2000,
        transformStyle: 'preserve-3d'
      }}
      className="absolute w-[300px] md:w-[450px] aspect-[16/10] z-30"
    >
      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full h-full luxury-card rounded-[2.5rem] overflow-hidden relative group"
      >
        <motion.img 
          style={{ y: imageY }}
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-[120%] object-cover brightness-50 group-hover:brightness-75 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent" />
        
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-2 block">Core Value</span>
              <h3 className="text-3xl font-serif text-brand-neutral tracking-tight">{item.title}</h3>
            </div>
            <span className="text-5xl font-display font-bold text-brand-accent/20 tracking-tighter">{item.stat}</span>
          </div>
          <p className="text-sm text-brand-neutral/40 font-light leading-relaxed max-w-[80%]">{item.subtitle}</p>
        </div>

        {/* Glowing Border Effect */}
        <div className="absolute inset-0 border border-brand-accent/10 rounded-[2.5rem] group-hover:border-brand-accent/30 transition-colors duration-700" />
      </motion.div>
    </motion.div>
  );
}
