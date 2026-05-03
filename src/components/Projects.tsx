import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  description: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce OS",
    category: "Full-Stack Development",
    description: "A high-performance headless commerce engine built with Next.js and GraphQL.",
    color: "#0ea5e9"
  },
  {
    title: "AI Analytics Pro",
    category: "Machine Learning UI",
    description: "Real-time data visualization platform with predictive analysis capabilities.",
    color: "#8b5cf6"
  },
  {
    title: "CloudStream",
    category: "Distributed Systems",
    description: "Low-latency video streaming infrastructure for global delivery.",
    color: "#10b981"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <div 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 10%'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="glass"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          padding: '4rem',
          maxWidth: '1200px',
          width: '100%'
        }}
      >
        <div>
          <span style={{ color: project.color, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>
            {project.category}
          </span>
          <h2 style={{ fontSize: '4rem', margin: '1rem 0' }}>{project.title}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '2rem' }}>{project.description}</p>
          <button 
            className="glass glass-hover" 
            style={{ 
              padding: '1rem 2rem', 
              border: `1px solid ${project.color}`,
              background: 'transparent',
              color: 'white',
              cursor: 'none'
            }}
          >
            View Case Study
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          <motion.div 
            style={{ 
              width: '100%', 
              height: '400px', 
              background: `linear-gradient(135deg, ${project.color}33, transparent)`,
              borderRadius: '1rem',
              border: `1px solid ${project.color}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '5rem', filter: 'grayscale(1)', opacity: 0.2 }}>0{index + 1}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#0f172a", "#0c1e33", "#1a1233", "#0c1a26"]
  );

  return (
    <motion.section 
      id="projects" 
      ref={containerRef}
      style={{ backgroundColor, position: 'relative' }}
    >
      <div style={{ padding: '10vh 10% 0 10%' }}>
        <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5 }}>Selected Works</h2>
      </div>
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </motion.section>
  );
};

export default Projects;
