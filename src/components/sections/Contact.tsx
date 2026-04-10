import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-brand-neutral">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-brand-accent uppercase tracking-[0.8em] text-[10px] font-bold mb-8 block">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-primary mb-10 tracking-tighter leading-[0.9]">START YOUR <br /> <span className="italic font-serif font-light text-brand-accent">Project</span></h2>
          <p className="text-brand-primary/40 mb-16 max-w-sm leading-relaxed font-light text-lg">
            Ready to build a world-class stage? Contact our Riyadh team for a consultation and custom quote.
          </p>

          <div className="space-y-10">
            <ContactInfo icon={<Phone className="w-5 h-5" />} label="Phone" value="+966 50 123 4567" />
            <ContactInfo icon={<Mail className="w-5 h-5" />} label="Email" value="sales@masudenterprise.com" />
            <ContactInfo icon={<MapPin className="w-5 h-5" />} label="Office" value="Industrial City, Riyadh, KSA" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="luxury-card rounded-[3rem] p-12 bg-white/50 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/30">Full Name</label>
                <input 
                  required
                  type="text"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/5 py-4 focus:border-brand-accent outline-none transition-colors text-brand-primary font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/30">Email Address</label>
                <input 
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-transparent border-b border-brand-primary/5 py-4 focus:border-brand-accent outline-none transition-colors text-brand-primary font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/30">Phone Number</label>
              <input 
                type="tel"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full bg-transparent border-b border-brand-primary/5 py-4 focus:border-brand-accent outline-none transition-colors text-brand-primary font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/30">Project Details</label>
              <textarea 
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-transparent border-b border-brand-primary/5 py-4 focus:border-brand-accent outline-none transition-colors resize-none text-brand-primary font-medium"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'submitting'}
              className="w-full py-6 bg-brand-primary text-brand-neutral rounded-full font-bold flex items-center justify-center gap-3 hover:bg-brand-accent hover:text-brand-primary transition-all disabled:opacity-50 uppercase text-[10px] tracking-[0.4em] shadow-2xl"
            >
              {status === 'submitting' ? 'Sending...' : (
                <>Send Inquiry <Send className="w-4 h-4" /></>
              )}
            </motion.button>

            {status === 'success' && (
              <p className="text-center text-green-600 text-sm font-medium">Thank you! We'll contact you shortly.</p>
            )}
            {status === 'error' && (
              <p className="text-center text-red-600 text-sm font-medium">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40 mb-1">{label}</p>
        <p className="text-brand-primary font-medium">{value}</p>
      </div>
    </div>
  );
}
