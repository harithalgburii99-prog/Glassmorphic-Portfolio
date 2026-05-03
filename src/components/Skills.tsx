import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Layout, Smartphone, Globe } from 'lucide-react';

const skills = [
  { name: "Frontend", icon: <Layout />, items: ["React", "TypeScript", "Next.js", "Framer Motion"] },
  { name: "Backend", icon: <Server />, items: ["Node.js", "Express", "Python", "FastAPI"] },
  { name: "Database", icon: <Database />, items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { name: "Mobile", icon: <Smartphone />, items: ["React Native", "Flutter"] },
  { name: "Cloud", icon: <Globe />, items: ["AWS", "Docker", "Railway", "Vercel"] },
  { name: "Tooling", icon: <Code />, items: ["Git", "Jest", "Vite", "ESLint"] },
];

const Skills: React.FC = () => {
  return (
    <section id="about" style={{ padding: '10vh 10%', position: 'relative' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Expertise</h2>
        <p style={{ maxWidth: '600px', opacity: 0.7 }}>
          Building robust and scalable solutions with a modern tech stack. 
          Focusing on maintainable code and exceptional user experiences.
        </p>
      </div>

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass glass-hover"
            style={{ padding: '2rem' }}
          >
            <div style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              {skill.icon}
            </div>
            <h3 style={{ marginBottom: '1rem' }}>{skill.name}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skill.items.map(item => (
                <span 
                  key={item} 
                  style={{ 
                    fontSize: '0.8rem', 
                    padding: '0.3rem 0.8rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
