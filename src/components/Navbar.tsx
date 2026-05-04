import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Horizontal Navbar - Visible only when NOT scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="glass"
            style={{
              position: 'fixed',
              top: '1.5rem',
              left: '50%',
              width: 'max-content',
              maxWidth: '90%',
              padding: '0.75rem 2rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              zIndex: 1000,
              borderRadius: '3rem',
            }}
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="glass-hover" style={{ fontWeight: 500 }}>
                {link.name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating Hamburger Button - Visible only when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="glass glass-hover"
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              color: 'white',
              cursor: 'inherit',
            }}
          >
            <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Bar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 2000,
              }}
            />
            {/* Sidebar */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(300px, 80%)',
                zIndex: 2001,
                borderRadius: '0',
                borderLeft: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  alignSelf: 'flex-end',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  marginBottom: '4rem',
                  cursor: 'inherit'
                }}
              >
                <X size={32} />
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--text-color)',
                    }}
                  >
                    <span style={{ color: 'var(--primary-color)', fontSize: '1rem', marginRight: '1rem' }}>0{i+1}</span>
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
