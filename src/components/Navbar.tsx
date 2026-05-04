import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#hero' : '/' },
    { name: 'Work', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#') && isHomePage) {
      // Smooth scroll handled by CSS
    } else if (href.startsWith('/#') && !isHomePage) {
      navigate(href.replace('/#', '/'));
      setTimeout(() => {
        const id = href.split('#')[1];
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
              link.href.startsWith('#') || (link.href.startsWith('/#') && !isHomePage) ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => handleNavClick(link.href)}
                  className="glass-hover" 
                  style={{ fontWeight: 500 }}
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="glass-hover" 
                  style={{ fontWeight: 500 }}
                >
                  {link.name}
                </Link>
              )
            ))}
            {user && (
              <Link to="/admin" className="glass-hover" style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                Admin
              </Link>
            )}
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
                   link.href.startsWith('#') || (link.href.startsWith('/#') && !isHomePage) ? (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--text-color)',
                      }}
                    >
                      {link.name}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: 'var(--text-color)',
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                ))}
                {user && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--primary-color)',
                      }}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </div>
              
              {user && (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  style={{
                    marginTop: 'auto',
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={20} /> Logout
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
