import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } },
  };

  return (
    <section 
      id="hero"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, var(--primary-color), transparent)',
          filter: 'blur(80px)',
          opacity: 0.2,
          zIndex: -1,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p 
          variants={item}
          style={{ 
            color: 'var(--primary-color)', 
            fontWeight: 600, 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase',
            marginBottom: '1rem' 
          }}
        >
          Full-Stack Web Developer
        </motion.p>
        
        <motion.h1 
          variants={item}
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 8rem)', 
            lineHeight: 0.9, 
            marginBottom: '2rem' 
          }}
        >
          CRAFTING<br />
          <span style={{ color: 'var(--secondary-color)' }}>DIGITAL</span><br />
          EXPERIENCES
        </motion.h1>

        <motion.div variants={item} className="glass" style={{ padding: '1.5rem 2.5rem', width: 'fit-content' }}>
          <p style={{ maxWidth: '500px', fontSize: '1.1rem', opacity: 0.8 }}>
            Specializing in high-performance web applications with a focus on immersive UI/UX and scalable architecture.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.5
        }}
      >
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '1px', height: '40px', background: 'var(--primary-color)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
