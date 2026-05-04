import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postService, Post } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Edit, Trash2, Plus, LogOut, ExternalLink, Eye, EyeOff } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          const data = await postService.getAdminPosts();
          setPosts(data);
        } catch (err) {
          console.error('Failed to fetch admin posts:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPosts();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter(p => p._id !== id));
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      const updated = await postService.updatePost(post._id, { published: !post.published });
      setPosts(posts.map(p => p._id === post._id ? updated : p));
    } catch (err) {
      alert('Failed to update post');
    }
  };

  if (authLoading || loading) return <div className="container" style={{ paddingTop: '8rem' }}>Loading Dashboard...</div>;

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--secondary-color)' }}>Welcome back, {user?.username}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/admin/new"
            className="glass-hover"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--primary-color)',
              color: 'var(--bg-color)',
              borderRadius: '0.5rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Plus size={18} /> New Post
          </Link>
          <button
            onClick={logout}
            className="glass-hover"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '0.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1.5rem' }}>Title</th>
              <th style={{ padding: '1.5rem' }}>Status</th>
              <th style={{ padding: '1.5rem' }}>Date</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: 600 }}>{post.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>{post.excerpt?.substring(0, 50)}...</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: post.published ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    color: post.published ? '#22c55e' : '#eab308'
                  }}>
                    {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--secondary-color)', fontSize: '0.875rem' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleTogglePublish(post)}
                      title={post.published ? "Unpublish" : "Publish"}
                      style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', cursor: 'pointer' }}
                    >
                      {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <Link
                      to={`/admin/edit/${post._id}`}
                      title="Edit"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      <Edit size={18} />
                    </Link>
                    <Link
                      to={`/blog/${post._id}?preview=true`}
                      title="View"
                      target="_blank"
                      style={{ color: 'var(--secondary-color)' }}
                    >
                      <ExternalLink size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      title="Delete"
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--secondary-color)' }}>
                  No posts yet. Start by creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
