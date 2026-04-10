import { useState, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Stages from './components/sections/Stages';
import StorytellingSection from './components/sections/StorytellingSection';
import Gallery from './components/sections/Gallery';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import VisionaryPortal from './components/sections/VisionaryPortal';
import AdminPanel from './components/admin/AdminPanel';
import { useSiteContent } from './hooks/useSiteContent';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

import LuxDivider from './components/ui/LuxDivider';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { content, loading } = useSiteContent();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const spotlightY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  if (loading || !content) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-neutral">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary/40">Masud Enterprise</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative selection:bg-brand-accent selection:text-brand-primary">
      <div className="noise-overlay" />
      
      {/* Cursor Spotlight */}
      <motion.div 
        style={{
          left: spotlightX,
          top: spotlightY,
          transform: 'translate(-50%, -50%)'
        }}
        className="fixed w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-[9998] hidden md:block"
      />

      <Navbar onAdminClick={() => setShowAdmin(true)} />
      
      <main>
        <Hero content={content} />
        
        {/* About Section - Advanced Editorial Upgrade */}
        <section className="relative py-32 px-6 bg-brand-primary text-brand-neutral overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
            >
              <div className="lg:col-span-8">
                <motion.span 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-brand-accent uppercase tracking-[1em] text-[10px] font-bold mb-12 block"
                >
                  The Legacy
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-16 tracking-tight">
                  {content.aboutText.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ 
                        duration: 0.8, 
                        delay: i * 0.03,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block mr-[0.3em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
                
                <div className="flex items-center gap-12">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="w-32 h-px bg-brand-accent origin-left"
                  />
                  <p className="text-brand-neutral/50 text-lg font-light max-w-md leading-relaxed italic font-serif">
                    "Engineering excellence is not an act, but a habit of precision."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 lg:pt-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="relative aspect-[3/4] rounded-[4rem] overflow-hidden group shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110"
                    alt="Engineering Precision"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent" />
                </motion.div>
                <p className="mt-8 text-brand-neutral/40 text-xs font-bold uppercase tracking-[0.4em] text-right">
                  Est. Riyadh 2026
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Background Mask Accent */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 2 }}
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none select-none"
          >
            <span className="text-[30vw] font-display font-bold text-brand-accent leading-none opacity-20">MASUD</span>
          </motion.div>
        </section>

        <Stages />
        <LuxDivider />
        <StorytellingSection />
        <LuxDivider />
        <VisionaryPortal />
        <LuxDivider />
        <ProcessSection />
        <LuxDivider />
        <Gallery />
        <LuxDivider />
        <Blog />
        <LuxDivider />
        <Contact />
      </main>

      <footer className="py-12 px-6 bg-brand-primary text-brand-neutral border-t border-brand-neutral/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-lg font-serif font-bold tracking-tighter">
              MASUD <span className="text-brand-accent">ENTERPRISE</span>
            </span>
            <p className="text-xs text-brand-neutral/40 mt-2">© 2026 Masud Enterprise. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-brand-neutral/40">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {showAdmin && <AdminPanel onExit={() => setShowAdmin(false)} />}
    </div>
  );
}

function ProcessSection() {
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  // Expanding effect: scale and border radius transition
  const processScale = useTransform(processScroll, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.9]);
  const processRadius = useTransform(processScroll, [0, 0.4], ["150px", "0px"]);
  const processOpacity = useTransform(processScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const processY = useTransform(processScroll, [0, 1], [100, -100]);

  return (
    <motion.section 
      ref={processRef}
      style={{ 
        scale: processScale, 
        borderRadius: processRadius,
        opacity: processOpacity,
        y: processY
      }}
      className="relative py-20 px-6 bg-brand-neutral overflow-hidden z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]"
    >
      {/* Background Video - More Visible */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <iframe
          src="https://www.youtube.com/embed/iMAfIRaLl3k?autoplay=1&mute=1&loop=1&playlist=iMAfIRaLl3k&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          title="Process Video"
        />
        <div className="absolute inset-0 bg-brand-neutral/0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          style={{
            scale: useTransform(processScroll, [0.2, 0.5], [0.9, 1]),
            rotate: useTransform(processScroll, [0.2, 0.5], [-3, 0])
          }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" 
            alt="Steel Fabrication"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
        </motion.div>
        <motion.div
          style={{
            opacity: useTransform(processScroll, [0.3, 0.6], [0, 1]),
            x: useTransform(processScroll, [0.3, 0.6], [20, 0])
          }}
        >
          <span className="text-brand-accent uppercase tracking-[1em] text-[10px] font-bold mb-4 block">The Process</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-primary mb-8 leading-[0.9] tracking-tighter uppercase">
            FROM RIYADH <br /> 
            <span className="italic font-serif font-light text-brand-accent lowercase">to the World</span>
          </h2>
          <div className="space-y-6">
            <ProcessStep number="01" title="Steel Fabrication" text="We use high-grade industrial steel to ensure maximum safety and durability for every stage." />
            <ProcessStep number="02" title="Modular Design" text="Our stages are designed for rapid assembly and disassembly, perfect for tight event schedules." />
            <ProcessStep number="03" title="Safe Delivery" text="We handle the logistics and delivery to your venue in Riyadh or anywhere in the Kingdom." />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ProcessStep({ number, title, text }: { number: string, title: string, text: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-4xl font-serif text-brand-accent/20 font-bold">{number}</span>
      <div>
        <h4 className="text-xl font-serif mb-2">{title}</h4>
        <p className="text-sm text-brand-primary/60 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
