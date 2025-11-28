import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '@/types/blog';
import { getAllBlogs, getBlogBySlug } from '@/utils/blogService';

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const siteUrl = 'https://bravoo.in';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <>
      <Head>
        <title>{post.title} | Bravoo</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="relative min-h-screen bg-background">
        <Header />
        <main style={{ background: '#fff', color: '#1f2937', padding: '64px 0', minHeight: 'calc(100vh - 200px)' }}>
          <article style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
            <Link 
              href="/blog" 
              style={{ 
                color: '#2563eb', 
                display: 'inline-block', 
                marginBottom: '24px', 
                marginTop: '8px',
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: 500, 
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#2563eb'; }}
            >
              ← Back to all blogs
            </Link>
            <h1 className="font-inter font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', color: '#6b7280' }}>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '1rem', marginBottom: '32px' }} />
            <div style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p style={{ marginBottom: '1.5rem' }}>{children}</p>,
                  img: ({ src, alt }) => (
                    <img
                      src={src ?? ''}
                      alt={alt ?? ''}
                      style={{ maxWidth: '100%', borderRadius: '0.75rem', margin: '24px 0' }}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <div style={{ marginTop: '32px' }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{ display: 'inline-block', background: '#eef2ff', color: '#3730a3', padding: '4px 12px', borderRadius: '999px', marginRight: '8px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllBlogs();
  return {
    paths: posts.filter((post) => post.published).map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  const post = await getBlogBySlug(slug);

  if (!post || !post.published) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

