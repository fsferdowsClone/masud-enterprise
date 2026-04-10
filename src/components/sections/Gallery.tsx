import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { GalleryItem } from '../../types';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.4, 0.4, 0]);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      if (data.length === 0) {
        setItems([
          { id: '1', title: 'Riyadh Music Festival', imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800', category: 'Concert', createdAt: null },
          { id: '2', title: 'Global Tech Expo', imageUrl: 'https://images.unsplash.com/photo-1540575861501-7c90b707a27d?auto=format&fit=crop&q=80&w=800', category: 'Exhibition', createdAt: null },
          { id: '3', title: 'Royal Wedding Hall', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'Wedding', createdAt: null },
          { id: '4', title: 'Corporate Gala', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', category: 'Corporate', createdAt: null },
        ]);
      } else {
        setItems(data);
      }
    });
    return () => unsub();
  }, []);

  const categories = ['All', 'Concert', 'Exhibition', 'Wedding', 'Corporate'];
  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="relative py-24 px-6 bg-brand-primary text-brand-neutral overflow-hidden"
    >
      {/* Background Video & Image */}
      <motion.div 
        style={{ opacity: videoOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          alt="Gallery Background"
          referrerPolicy="no-referrer"
        />
        <iframe
          src="https://www.youtube.com/embed/0Ac0u58jeCA?autoplay=1&mute=1&loop=1&playlist=0Ac0u58jeCA&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 opacity-40"
          allow="autoplay; encrypted-media"
          title="Riyadh Projects"
        />
        <div className="absolute inset-0 bg-brand-primary/0" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-accent uppercase tracking-[0.8em] text-[10px] font-bold mb-6 block">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter">OUR RIYADH PROJECTS</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                  filter === cat 
                    ? 'bg-brand-accent border-brand-accent text-brand-primary' 
                    : 'border-white/10 text-brand-neutral/40 hover:border-white/20 hover:text-brand-neutral'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, idx) => (
            <div key={item.id}>
              <GalleryCard item={item} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, idx }: { item: GalleryItem; idx: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Advanced 3D animations
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [idx % 2 === 0 ? -10 : 10, 0, idx % 2 === 0 ? 10 : -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ rotateX, rotateY, scale }}
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-brand-surface perspective-2000 preserve-3d shadow-2xl"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%]">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75"
          referrerPolicy="no-referrer"
        />
        {/* Hover Lens Effect */}
        <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-10 h-10 rounded-xl overflow-hidden mb-6 border border-white/10 shadow-2xl hidden md:block"
        >
          <img src={item.imageUrl} className="w-full h-full object-cover" alt="Thumbnail" referrerPolicy="no-referrer" />
        </motion.div>
        <span className="text-brand-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-3 block">Project</span>
        <h4 className="text-xl md:text-2xl font-serif text-brand-neutral mb-2 tracking-tight">{item.title}</h4>
        <p className="text-[9px] text-brand-neutral/40 font-bold uppercase tracking-[0.3em]">{item.category}</p>
      </div>
      
      {/* Border Highlight */}
      <div className="absolute inset-0 border border-white/5 rounded-[3rem] group-hover:border-brand-accent/20 transition-colors duration-500" />
    </motion.div>
  );
}
