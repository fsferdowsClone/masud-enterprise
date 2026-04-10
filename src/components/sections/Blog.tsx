import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPost } from '../../types';
import { motion } from 'motion/react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'), limit(3));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      if (data.length === 0) {
        setPosts([
          {
            id: '1',
            title: 'The Future of Event Stages in Riyadh',
            content: 'How steel fabrication is evolving to meet the demands of massive entertainment projects in Saudi Arabia.',
            imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800',
            publishedAt: null,
            author: 'Masud Admin'
          },
          {
            id: '2',
            title: 'Safety First: Steel vs Aluminum',
            content: 'Why we choose high-grade steel for our stage constructions to ensure maximum safety for performers and audience.',
            imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
            publishedAt: null,
            author: 'Technical Team'
          }
        ]);
      } else {
        setPosts(data);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section 
      id="blog" 
      ref={containerRef}
      className="relative py-32 px-6 bg-brand-neutral overflow-hidden"
    >

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <span className="text-brand-accent uppercase tracking-[0.8em] text-[10px] font-bold mb-6 block">Insights</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-primary tracking-tighter leading-[0.9]">LATEST FROM <br /> <span className="italic font-serif font-light text-brand-accent">Masud</span></h2>
          </div>
          <button className="hidden md:block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary/30 hover:text-brand-primary transition-colors border-b border-brand-primary/10 pb-2">
            View All Posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer relative"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[3rem] mb-10 relative luxury-card bg-brand-surface">
                {idx === 0 ? (
                  /* Video replaces the first image */
                  <div className="absolute inset-0 z-0">
                    <iframe
                      src="https://www.youtube.com/embed/8j0lexPIhjM?autoplay=1&mute=1&loop=1&playlist=8j0lexPIhjM&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
                      className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
                      allow="autoplay; encrypted-media"
                      title="Featured Video"
                    />
                    <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                    {/* Subtle Picture Overlay */}
                    <img 
                      src={post.imageUrl} 
                      className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
                      alt="Overlay"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Skeleton Shimmer feel on hover */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-brand-accent uppercase tracking-[0.5em] text-[10px] font-bold">{post.author}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/20" />
                  <span className="text-brand-primary/30 uppercase tracking-[0.3em] text-[10px] font-bold">5 Min Read</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif group-hover:text-brand-accent transition-colors duration-500 leading-tight tracking-tight">
                  {post.title}
                </h3>
                <p className="text-brand-primary/50 line-clamp-2 leading-relaxed font-light text-lg">
                  {post.content}
                </p>
                
                <div className="pt-4">
                  <motion.div 
                    className="w-12 h-px bg-brand-accent group-hover:w-24 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
