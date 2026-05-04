import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { postService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const post = await postService.getPost(id);
          setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            tags: post.tags?.join(', ') || '',
            published: post.published,
          });
        } catch (error) {
          console.error('Failed to fetch post for editing:', error);
          alert('Failed to fetch post');
          navigate('/admin');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
        }, [id, navigate]);

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        };

        try {
        if (id) {
        await postService.updatePost(id, postData);
        } else {
        await postService.createPost(postData);
        }
        navigate('/admin');
        } catch (error) {
        console.error('Failed to save post:', error);
        alert('Failed to save post');
        } finally {
        setSaving(false);
        }
        };


  if (authLoading || loading) return <div className="container" style={{ paddingTop: '8rem' }}>Loading Editor...</div>;

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <Link
        to="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--secondary-color)',
          marginBottom: '2rem',
          width: 'fit-content'
        }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-color)' }}>
          {id ? 'Edit Post' : 'Create New Post'}
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary-color)' }}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Post Title"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 600
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary-color)' }}>Excerpt (Optional)</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary-color)' }}>Content (Markdown supported style)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="Write your post content here..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none',
                  minHeight: '400px',
                  resize: 'vertical',
                  lineHeight: 1.6
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary-color)' }}>Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, TypeScript, Project"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: formData.published ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: formData.published ? '#22c55e' : 'var(--secondary-color)',
                    border: '1px solid',
                    borderColor: formData.published ? '#22c55e' : 'var(--glass-border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {formData.published ? <Eye size={18} /> : <EyeOff size={18} />}
                  {formData.published ? 'Published' : 'Draft'}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="glass-hover"
            style={{
              padding: '1rem',
              background: 'var(--primary-color)',
              color: 'var(--bg-color)',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1.125rem'
            }}
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Editor;
