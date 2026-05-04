import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { postService } from '../services/api';
import type { Post } from '../services/api';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="container" style={{ paddingTop: '8rem' }}>Loading...</div>;
  if (!post) return <div className="container" style={{ paddingTop: '8rem' }}>Post not found</div>;

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <Link
        to="/blog"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--secondary-color)',
          marginBottom: '2rem',
          width: 'fit-content'
        }}
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            {post.tags?.map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Tag size={16} />
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>{post.title}</h1>
          {post.excerpt && (
            <p style={{ fontSize: '1.25rem', color: 'var(--secondary-color)', fontStyle: 'italic' }}>
              {post.excerpt}
            </p>
          )}
        </header>

        <div
          className="glass"
          style={{
            padding: '3rem',
            lineHeight: 1.8,
            fontSize: '1.125rem',
            whiteSpace: 'pre-wrap'
          }}
        >
          {post.content}
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;
