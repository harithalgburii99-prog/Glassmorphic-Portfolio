import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" style={{ padding: '10vh 5%', background: 'linear-gradient(to bottom, transparent, #0c1a26)' }}>
      <div className="glass" style={{ padding: 'clamp(2rem, 8vw, 6rem)', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '2rem' }}
        >
          Let's create something<br />
          <span style={{ color: 'var(--primary-color)' }}>extraordinary.</span>
        </motion.h2>
        
        <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', opacity: 0.7, marginBottom: '4rem' }}>
          Ready to start your next project? Drop me a line and let's talk.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.5 }}>Your Name</label>
              <input 
                type="text" 
                placeholder="What should I call you?"
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid var(--glass-border)',
                  padding: '1rem 0',
                  color: 'white',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.5 }}>Your Email</label>
              <input 
                type="email" 
                placeholder="Where can I reach you?"
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid var(--glass-border)',
                  padding: '1rem 0',
                  color: 'white',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.5 }}>Message</label>
            <textarea 
              placeholder="Tell me about your project..."
              rows={4}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                borderBottom: '1px solid var(--glass-border)',
                padding: '1rem 0',
                color: 'white',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                outline: 'none',
                resize: 'none',
                width: '100%'
              }}
            />
          </div>
          <button 
            type="submit" 
            className="glass glass-hover" 
            style={{ 
              padding: '1.2rem', 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              fontWeight: 600, 
              color: 'var(--primary-color)',
              background: 'transparent',
              marginTop: '1rem',
              cursor: 'inherit'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <footer style={{ marginTop: '10vh', textAlign: 'center', opacity: 0.3, fontSize: '0.8rem' }}>
        <p>&copy; {new Date().getFullYear()} Full-Stack Developer. Built with React & Framer Motion.</p>
      </footer>
    </section>
  );
};

export default Contact;
