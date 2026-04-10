import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SiteContent } from '../../types';

interface HeroProps {
  content: SiteContent;
}

export default function Hero({ content }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-primary"
    >
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <iframe
          src="https://www.youtube.com/embed/GyQl-XRxLPI?autoplay=1&mute=1&loop=1&playlist=GyQl-XRxLPI&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-60"
          allow="autoplay; encrypted-media"
          title="Masud Enterprise Stage Showcase"
        />
        <div className="absolute inset-0 bg-brand-primary/0" />
      </motion.div>

      {/* 3D Stage Element (Advanced) */}
      <div className="absolute inset-0 flex items-center justify-center perspective-2000 pointer-events-none">
        <motion.div 
          style={{ rotateX, scale }}
          className="w-[80vw] h-[40vh] border border-brand-accent/10 rounded-[4rem] flex items-center justify-center preserve-3d"
        >
          <div className="w-full h-full border border-brand-accent/5 rounded-[4rem] transform translate-z-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent transform -translate-z-50" />
            <div className="h-1/3 w-px bg-gradient-to-b from-transparent via-brand-accent/10 to-transparent transform -translate-z-50" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }}
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-brand-accent uppercase tracking-[0.8em] text-[10px] font-bold mb-8 block"
          >
            Riyadh's Premier Stage Builders
          </motion.span>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-display font-bold text-brand-neutral mb-8 leading-[0.85] tracking-tighter uppercase"
          >
            {content.heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'italic font-serif font-light text-brand-accent lowercase' : ''}>{word} </span>
            ))}
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-brand-neutral/30 max-w-md mx-auto text-sm font-light leading-relaxed mb-10"
          >
            {content.heroSubtitle}
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.a 
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(197,160,89,0.3)' }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-10 py-4 bg-brand-accent text-brand-primary font-bold rounded-full shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all tracking-[0.4em] uppercase text-[9px]"
            >
              Get a Quote
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              href="#stages"
              className="px-10 py-4 border border-white/10 text-brand-neutral font-bold rounded-full transition-all tracking-[0.4em] uppercase text-[9px]"
            >
              View Stage Types
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-brand-neutral/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent" />
      </motion.div>
    </section>
  );
}
