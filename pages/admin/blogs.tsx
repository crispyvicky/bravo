import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import Head from 'next/head';
import type { BlogPost } from '@/types/blog';

const initialFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  date: '',
  readTime: '5 min read',
  image: '/placeholder.svg',
  tags: '',
  author: 'Team Bravoo',
  published: true,
};

type FormState = typeof initialFormState;

export default function AdminBlogs() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginFields, setLoginFields] = useState({ username: '', password: '' });

  useEffect(() => {
    checkSession();
  }, []);

  const formTitle = useMemo(() => (editingSlug ? 'Update Blog Post' : 'Create New Blog Post'), [editingSlug]);

  async function checkSession() {
    try {
      const response = await fetch('/api/admin/session');
      if (!response.ok) {
        throw new Error('Session check failed');
      }
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadPosts();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function loadPosts() {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to load posts');
      }
      const posts = await response.json();
      setBlogPosts(posts);
    } catch {
      setStatusMessage('Unable to load blog posts. Please refresh.');
    }
  }

  function updateForm<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginFields),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setStatusMessage('Logged in successfully.');
        loadPosts();
      } else {
        setStatusMessage('Invalid credentials. Please try again.');
      }
    } catch {
      setStatusMessage('Unable to reach the login service.');
    }
  }

  function startEdit(post: BlogPost) {
    setEditingSlug(post.slug);
    setFormState({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      readTime: post.readTime,
      image: post.image,
      tags: post.tags.join(', '),
      author: post.author,
      published: post.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setFormState(initialFormState);
    setEditingSlug(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const payload = {
      title: formState.title.trim(),
      slug: formState.slug.trim(),
      excerpt: formState.excerpt.trim(),
      content: formState.content.trim(),
      date: formState.date || new Date().toISOString(),
      readTime: formState.readTime,
      image: formState.image,
      tags: formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: formState.author.trim(),
      published: formState.published,
    };

    const url = editingSlug ? `/api/blogs/${editingSlug}` : '/api/blogs';
    const method = editingSlug ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage(editingSlug ? 'Blog post updated.' : 'Blog post created.');
        resetForm();
        loadPosts();
      } else {
        const data = await response.json();
        setStatusMessage(data.message ?? 'Something went wrong.');
      }
    } catch {
      setStatusMessage('Network error. Please try again.');
    }

    setLoading(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      if (response.ok) {
        setStatusMessage('Blog post deleted.');
        loadPosts();
        if (editingSlug === slug) {
          resetForm();
        }
      } else {
        const data = await response.json();
        setStatusMessage(data.message ?? 'Failed to delete post.');
      }
    } catch {
      setStatusMessage('Could not delete the blog post.');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setBlogPosts([]);
    resetForm();
  }

  if (isAuthenticated === false) {
    return (
      <>
        <Head>
          <title>Admin Login | Bravoo</title>
        </Head>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: 24 }}>
          <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: '1rem', padding: '32px', boxShadow: '0 10px 40px rgba(15, 23, 42, 0.3)' }}>
            <h1 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>Admin Login</h1>
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', marginBottom: 8 }}>Username</span>
              <input
                type="text"
                value={loginFields.username}
                onChange={(event) => setLoginFields((prev) => ({ ...prev, username: event.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5f5' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', marginBottom: 8 }}>Password</span>
              <input
                type="password"
                value={loginFields.password}
                onChange={(event) => setLoginFields((prev) => ({ ...prev, password: event.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5f5' }}
              />
            </label>
            <button type="submit" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 600 }}>
              Sign In
            </button>
            {statusMessage && <p style={{ marginTop: 16, color: '#dc2626' }}>{statusMessage}</p>}
          </form>
        </div>
      </>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading admin console...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog Admin | Bravoo</title>
      </Head>
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Blog Admin</h1>
              <p style={{ color: '#475569' }}>Manage posts, drafts, and publication status.</p>
            </div>
            <button onClick={handleLogout} style={{ padding: '10px 16px', borderRadius: 8, background: '#0f172a', color: '#fff', fontWeight: 600 }}>
              Logout
            </button>
          </header>

          {statusMessage && (
            <div style={{ marginBottom: '24px', padding: '16px', borderRadius: 12, background: '#dbeafe', color: '#1e3a8a' }}>
              {statusMessage}
            </div>
          )}

          <section style={{ background: '#fff', borderRadius: '1rem', padding: '32px', marginBottom: '32px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{formTitle}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <label>
                <span>Title</span>
                <input type="text" value={formState.title} onChange={(event) => updateForm('title', event.target.value)} required style={inputStyle} />
              </label>
              <label>
                <span>Slug</span>
                <input type="text" value={formState.slug} onChange={(event) => updateForm('slug', event.target.value)} required style={inputStyle} />
              </label>
              <label>
                <span>Excerpt</span>
                <textarea value={formState.excerpt} onChange={(event) => updateForm('excerpt', event.target.value)} required rows={3} style={inputStyle} />
              </label>
              <label>
                <span>Content (Markdown supported)</span>
                <textarea
                  value={formState.content}
                  onChange={(event) => updateForm('content', event.target.value)}
                  required
                  rows={10}
                  style={{ ...inputStyle, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  placeholder={'Write your story here...\n\nUse markdown for formatting:\n- Headings: #, ##, ###\n- Bold: **text**\n- Images: ![Alt text](/path-or-https-url)'}
                />
              </label>
              <label>
                <span>Hero Image URL</span>
                <input
                  type="text"
                  value={formState.image}
                  onChange={(event) => updateForm('image', event.target.value)}
                  style={inputStyle}
                  placeholder="/placeholder.svg or https://..."
                />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
                <label>
                  <span>Read Time</span>
                  <input type="text" value={formState.readTime} onChange={(event) => updateForm('readTime', event.target.value)} style={inputStyle} />
                </label>
                <label>
                  <span>Author</span>
                  <input type="text" value={formState.author} onChange={(event) => updateForm('author', event.target.value)} style={inputStyle} />
                </label>
                <label>
                  <span>Publish Date</span>
                  <input type="date" value={formState.date ? formState.date.substring(0, 10) : ''} onChange={(event) => updateForm('date', event.target.value)} style={inputStyle} />
                </label>
              </div>
              <label>
                <span>Tags (comma separated)</span>
                <input type="text" value={formState.tags} onChange={(event) => updateForm('tags', event.target.value)} style={inputStyle} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={formState.published} onChange={(event) => updateForm('published', event.target.checked)} />
                <span>Published</span>
              </label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" disabled={loading} style={{ padding: '12px 20px', borderRadius: 10, background: '#2563eb', color: '#fff', fontWeight: 600 }}>
                  {loading ? 'Saving...' : editingSlug ? 'Update Post' : 'Create Post'}
                </button>
                {editingSlug && (
                  <button type="button" onClick={resetForm} style={{ padding: '12px 20px', borderRadius: 10, background: '#e2e8f0', color: '#0f172a', fontWeight: 600 }}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section style={{ background: '#fff', borderRadius: '1rem', padding: '32px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Existing Posts</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={tableHeaderStyle}>Title</th>
                    <th style={tableHeaderStyle}>Slug</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Updated</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ ...tableCellStyle, textAlign: 'center', color: '#64748b' }}>
                        No blog posts yet. Create one above.
                      </td>
                    </tr>
                  ) : (
                    blogPosts.map((post) => (
                      <tr key={post.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={tableCellStyle}>{post.title}</td>
                        <td style={tableCellStyle}>{post.slug}</td>
                        <td style={tableCellStyle}>
                          <span style={{ padding: '4px 10px', borderRadius: '999px', background: post.published ? '#dcfce7' : '#fee2e2', color: post.published ? '#166534' : '#b91c1c' }}>{post.published ? 'Published' : 'Draft'}</span>
                        </td>
                        <td style={tableCellStyle}>{new Date(post.date).toLocaleDateString()}</td>
                        <td style={{ ...tableCellStyle, display: 'flex', gap: '8px' }}>
                          <button onClick={() => startEdit(post)} style={{ padding: '6px 12px', borderRadius: 8, background: '#e0f2fe', color: '#0369a1' }}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(post.slug)} style={{ padding: '6px 12px', borderRadius: 8, background: '#fee2e2', color: '#b91c1c' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid #cbd5f5',
  marginTop: 6,
};

const tableHeaderStyle: CSSProperties = {
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#475569',
  padding: '12px 16px',
};

const tableCellStyle: CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.95rem',
  color: '#0f172a',
  verticalAlign: 'middle',
};

