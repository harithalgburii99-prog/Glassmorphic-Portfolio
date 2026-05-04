import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'max-content',
        maxWidth: '95%',
        padding: '0.6rem 1.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        zIndex: 1000,
        borderRadius: '2rem',
        fontSize: '0.9rem'
      }}
    >
      <a href="#hero" className="glass-hover" style={{ fontWeight: 600 }}>Home</a>
      <a href="#projects" className="glass-hover">Work</a>
      <a href="#about" className="glass-hover">About</a>
      <a href="#contact" className="glass-hover">Contact</a>
    </motion.nav>
  );
};

export default Navbar;
