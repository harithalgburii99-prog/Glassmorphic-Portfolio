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
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        maxWidth: '90%',
        padding: '0.75rem 2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        zIndex: 1000,
        borderRadius: '2rem',
      }}
    >
      <a href="#hero" className="glass-hover" style={{ fontWeight: 600 }}>Home</a>
      <a href="#projects" className="glass-hover">Projects</a>
      <a href="#about" className="glass-hover">About</a>
      <a href="#contact" className="glass-hover">Contact</a>
    </motion.nav>
  );
};

export default Navbar;
