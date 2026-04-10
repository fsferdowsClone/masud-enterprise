import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { StageType } from '../../types';
import { ChevronRight } from 'lucide-react';

export default function Stages() {
  const [stages, setStages] = useState<StageType[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'stages'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as StageType));
      if (data.length === 0) {
        // Mock data if empty
        setStages([
          {
            id: '1',
            name: 'Concert Master',
            description: 'Heavy-duty steel construction for large scale outdoor events.',
            imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800',
            features: ['Load capacity: 50 tons', 'Modular design', 'Weather resistant']
          },
          {
            id: '2',
            name: 'Corporate Elite',
            description: 'Sleek, polished finish for indoor corporate exhibitions.',
            imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
            features: ['Hidden wiring', 'Carpeted finish', 'Quick assembly']
          },
          {
            id: '3',
            name: 'Wedding Pavilion',
            description: 'Elegant steel frames for luxury wedding setups.',
            imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
            features: ['Floral attachment points', 'White powder coat', 'Custom sizing']
          }
        ]);
      } else {
        setStages(data);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <section 
      id="stages" 
      ref={containerRef}
      className="relative py-32 px-6 bg-brand-primary overflow-hidden"
    >
      {/* Background Video */}
      <motion.div 
        style={{ opacity: videoOpacity, scale: videoScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <iframe
          src="https://www.youtube.com/embed/fbL9QdWWJzo?autoplay=1&mute=1&loop=1&playlist=fbL9QdWWJzo&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-50"
          allow="autoplay; encrypted-media"
          title="Stage Engineering"
        />
        <div className="absolute inset-0 bg-brand-primary/0" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-brand-accent uppercase tracking-[0.8em] text-[10px] font-bold mb-4 block">Engineering Excellence</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-neutral leading-[0.9] tracking-tighter uppercase">Precision <br /> <span className="italic font-serif font-light text-brand-accent lowercase">Engineered Stages</span></h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-neutral/30 max-w-sm text-sm font-light leading-relaxed"
          >
            We provide end-to-end steel fabrication and delivery services across Riyadh, setting the standard for 2026.
          </motion.p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto pb-12 gap-6 no-scrollbar snap-x snap-mandatory">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="min-w-[280px] md:min-w-[350px] snap-center">
                <StageCard stage={stage} index={idx} />
              </div>
            ))}
          </div>
          
          {/* Custom Scroll Indicator */}
          <div className="absolute -bottom-4 left-0 w-full h-px bg-white/5">
            <motion.div 
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-brand-accent origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface StageCardProps {
  stage: StageType;
  index: number;
}

function StageCard({ stage, index }: StageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[380px] w-full perspective-2000 cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Bento Hover Glow */}
      <div className="absolute -inset-4 bg-brand-accent/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.02 : 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 20 }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden luxury-card rounded-[2rem] overflow-hidden border-white/5 bg-brand-surface/60 backdrop-blur-md">
          <div className="h-1/2 overflow-hidden relative">
            <img 
              src={stage.imageUrl} 
              alt={stage.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
            {/* Chrome Glint */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </div>
          <div className="p-8">
            <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">Stage Type</span>
            <h3 className="text-2xl font-serif mb-3 text-brand-neutral tracking-tight">{stage.name}</h3>
            <p className="text-xs text-brand-neutral/30 line-clamp-2 font-light leading-relaxed">{stage.description}</p>
            <div className="mt-6 flex items-center text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em]">
              Technical Specs <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden luxury-card rounded-[2rem] p-8 flex flex-col justify-between bg-brand-neutral text-brand-primary rotate-y-180 border-brand-accent/20 shadow-[0_20px_80px_rgba(197,160,89,0.1)]"
        >
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent mb-3 block">Engineering Data</span>
            <h3 className="text-2xl font-serif mb-6 tracking-tighter">{stage.name}</h3>
            <ul className="space-y-4">
              {stage.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-xs font-medium group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1 shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.6)] group-hover/item:scale-150 transition-transform" />
                  <span className="text-brand-primary/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-brand-primary text-brand-neutral rounded-full hover:bg-brand-accent hover:text-brand-primary transition-all font-bold text-[10px] tracking-[0.2em] uppercase shadow-xl"
          >
            Request Engineering File
          </motion.button>
          
          {/* Subtle Background Pattern */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <path d="M0 0h100v100H0z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
