import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';
import type { Post } from '../services/api';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Blog</h1>
        <p style={{ color: 'var(--secondary-color)', marginBottom: '3rem', maxWidth: '600px' }}>
          Recent projects, thoughts on development, and technical updates.
        </p>
      </motion.div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading posts...</div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="glass"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                {post.tags?.[0] && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Tag size={14} />
                    {post.tags[0]}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{post.title}</h2>
              <p style={{ color: 'var(--secondary-color)', marginBottom: '2rem', flexGrow: 1 }}>
                {post.excerpt || post.content.substring(0, 150) + '...'}
              </p>
              <Link
                to={`/blog/${post._id}`}
                className="glass-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                  width: 'fit-content',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                }}
              >
                Read More <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--secondary-color)' }}>
              No posts found. Check back later!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
