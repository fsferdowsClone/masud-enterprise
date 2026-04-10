import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import MagneticButton from '../ui/MagneticButton';

interface NavbarProps {
  onAdminClick: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Stages', href: '#stages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-8 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-nav flex items-center justify-between w-full max-w-7xl px-8 py-4 rounded-full pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tighter text-brand-neutral">
            MASUD <span className="text-brand-accent italic font-serif">ENTERPRISE</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative text-[9px] font-bold uppercase tracking-[0.3em] text-brand-neutral/40 hover:text-brand-accent transition-colors py-2"
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-brand-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
          <MagneticButton onClick={onAdminClick}>
            <div className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-brand-neutral/30 hover:text-brand-neutral transition-colors">
              Admin
            </div>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-neutral" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-28 left-6 right-6 glass-nav rounded-[2rem] p-10 md:hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-brand-neutral hover:text-brand-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setIsOpen(false); onAdminClick(); }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent pt-6 border-t border-white/5"
            >
              Admin Access
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
