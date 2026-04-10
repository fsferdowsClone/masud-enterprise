import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPost } from '../../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Skeleton from '../ui/Skeleton';
import { X, Calendar, User, Clock, Twitter, Linkedin, Facebook, Link, Share2 } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import MagneticButton from '../ui/MagneticButton';

function ParallaxImage({ src, alt, isVideo = false }: { src: string, alt: string, isVideo?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div 
        style={{ y, height: '120%', top: '-10%' }}
        className="absolute inset-0 w-full"
      >
        {isVideo ? (
          <div className="absolute inset-0 z-0">
            <iframe
              src="https://www.youtube.com/embed/8j0lexPIhjM?autoplay=1&mute=1&loop=1&playlist=8j0lexPIhjM&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&playsinline=1"
              className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
              allow="autoplay; encrypted-media"
              title="Featured Video"
            />
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
        )}
      </motion.div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
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
            content: 'How steel fabrication is evolving to meet the demands of massive entertainment projects in Saudi Arabia. We are seeing a shift towards modular, high-capacity systems that can be deployed rapidly across the Kingdom.',
            imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800',
            publishedAt: new Date().toISOString(),
            author: 'Masud Admin'
          },
          {
            id: '2',
            title: 'Safety First: Steel vs Aluminum',
            content: 'Why we choose high-grade steel for our stage constructions to ensure maximum safety for performers and audience. Steel offers superior structural integrity and load-bearing capabilities for complex Riyadh events.',
            imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
            publishedAt: new Date().toISOString(),
            author: 'Technical Team'
          }
        ]);
      } else {
        setPosts(data);
      }
      setLoading(false);
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
          {loading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="space-y-10">
                <Skeleton className="aspect-[16/10] rounded-[3rem]" />
                <div className="space-y-6">
                  <Skeleton variant="text" className="w-32" />
                  <Skeleton variant="text" className="h-10 w-full" />
                  <Skeleton variant="text" className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : (
            posts.map((post, idx) => (
              <div key={post.id}>
                <GlowCard className="rounded-[3rem]">
                  <motion.article 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group cursor-pointer relative p-4"
                    onClick={() => setSelectedPost(post)}
                  >
                  <div className="aspect-[16/10] overflow-hidden rounded-[3rem] mb-10 relative luxury-card bg-brand-surface">
                    <ParallaxImage 
                      src={post.imageUrl} 
                      alt={post.title} 
                      isVideo={idx === 0} 
                    />
                    
                    <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    
                    {/* Skeleton Shimmer feel on hover */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    />
                  </div>
                  
                  <div className="space-y-6 px-4 pb-4">
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
              </GlowCard>
            </div>
          ))
        )}
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-primary/95 backdrop-blur-xl"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-brand-neutral rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-brand-primary/10 hover:bg-brand-primary/20 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6 text-brand-primary" />
              </button>

              {/* Modal Content */}
              <div className="overflow-y-auto custom-scrollbar">
                <div className="aspect-video w-full relative">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral via-transparent to-transparent" />
                </div>

                <div className="p-8 md:p-12 -mt-20 relative z-10">
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-brand-accent">
                      <User className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-primary/40">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {selectedPost.publishedAt ? new Date(selectedPost.publishedAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-primary/40">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">5 Min Read</span>
                    </div>
                  </div>

                  {/* Social Sharing */}
                  <div className="flex items-center gap-4 mb-12 pb-8 border-b border-brand-primary/5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/30 mr-2">Share Article:</span>
                    <div className="flex gap-3">
                      {[
                        { icon: <Twitter className="w-4 h-4" />, name: 'Twitter', url: (title: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}` },
                        { icon: <Linkedin className="w-4 h-4" />, name: 'LinkedIn', url: (title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                        { icon: <Facebook className="w-4 h-4" />, name: 'Facebook', url: (title: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
                      ].map((social) => (
                        <div key={social.name}>
                          <MagneticButton onClick={() => { window.open(social.url(selectedPost.title), '_blank'); }}>
                            <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary/60 hover:bg-brand-accent hover:text-brand-primary transition-all shadow-sm">
                              {social.icon}
                            </div>
                          </MagneticButton>
                        </div>
                      ))}
                      <MagneticButton onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}>
                        <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary/60 hover:bg-brand-accent hover:text-brand-primary transition-all shadow-sm">
                          <Link className="w-4 h-4" />
                        </div>
                      </MagneticButton>
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-serif text-brand-primary mb-8 leading-tight tracking-tight">
                    {selectedPost.title}
                  </h2>

                  <div className="prose prose-lg max-w-none text-brand-primary/70 font-light leading-relaxed space-y-6">
                    <p className="text-xl md:text-2xl text-brand-primary/90 font-normal italic mb-8 border-l-4 border-brand-accent pl-6">
                      {selectedPost.content.substring(0, 150)}...
                    </p>
                    <p>{selectedPost.content}</p>
                    <p>
                      Our engineering team in Riyadh continues to push the boundaries of what's possible in steel fabrication. 
                      By leveraging advanced CAD modeling and precision manufacturing, we ensure that every stage we build 
                      meets the highest international safety standards while providing the aesthetic flexibility required 
                      for world-class events.
                    </p>
                    <p>
                      As we look towards the future of entertainment in Saudi Arabia, Masud Enterprise remains committed 
                      to providing the structural foundation for the Kingdom's most ambitious projects.
                    </p>
                  </div>

                  <div className="mt-16 pt-12 border-t border-brand-primary/5 flex justify-between items-center">
                    <div className="flex gap-4">
                      {['Steel', 'Engineering', 'Riyadh'].map(tag => (
                        <span key={tag} className="px-4 py-1 bg-brand-primary/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary/40">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="px-8 py-3 bg-brand-primary text-brand-neutral rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-brand-primary transition-all"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
