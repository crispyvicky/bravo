import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { BlogPost } from '@/types/blog';
import { getAllBlogs } from '@/utils/blogService';
// import Ribbons from '@/components/ribbons';

interface BlogsProps {
  blogPosts: BlogPost[];
}

export default function Blogs({ blogPosts }: BlogsProps) {
  const router = useRouter();

  const siteUrl = 'https://bravoo.in';
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Battle Stories - Bravoo Blog',
    url: `${siteUrl}/blog`,
    description:
      'Battle stories, quest logs, and boss fight strategies from the Bravoo team to help you build and scale products.',
    blogPost: blogPosts.map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const imageUrl = post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`;
      return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url,
        image: [imageUrl],
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
        },
      };
    }),
  };

  return (
    <>
      <Head>
        <title>Battle Stories - Development Blog & Quest Logs | Bravoo</title>
        <meta name="description" content="Read epic tales from the development battlefield. Level up your skills with our quest logs, boss fight strategies, and victory stories." />
        <meta name="keywords" content="development blog, tech articles, startup advice, engineering tips, development stories" />
        <link rel="canonical" href="https://bravoo.in/blog" />
        <meta property="og:title" content="Battle Stories - Development Blog & Quest Logs" />
        <meta property="og:description" content="Read epic tales from the development battlefield and level up your skills." />
        <meta property="og:url" content="https://bravoo.in/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Battle Stories - Development Blog & Quest Logs" />
        <meta name="twitter:description" content="Read epic tales from the development battlefield and level up your skills." />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
        />
      </Head>

      <div className="relative min-h-screen bg-background">
       {/* <Ribbons /> */}
        <Header />
        <main className="blogs-page" style={{ background: '#fff', color: '#1f2937', padding: '64px 0' }}>
          <div className="blogs-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            {/* Hero Section */}
            <section className="blogs-hero" style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}>
              <h1
                className="blogs-title font-inter font-bold"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '24px', background: 'linear-gradient(135deg, #2563eb, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', cursor: 'default' }}
                onDoubleClick={() => router.push('/admin/blogs')}
                title=""
              >
                Battle Stories ⚔️
              </h1>
              <p className="blogs-subtitle font-inter" style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#6b7280', maxWidth: 600, margin: '0 auto' }}>
                Epic tales from the development battlefield. Level up your skills with our quest logs, boss fight strategies, and victory stories.
              </p>
            </section>

            {/* Blog Posts Grid */}
            <section className="blogs-grid">
              {blogPosts.length === 0 ? (
                <p className="font-inter" style={{ textAlign: 'center', color: '#6b7280' }}>
                  No published stories yet. Check back soon!
                </p>
              ) : (
                <div className="grid" style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  {blogPosts.map((post) => (
                    <article key={post.id} className="blog-card card-surface" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '32px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                      <div className="blog-image" style={{ marginBottom: '24px' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '0.5rem' }} />
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta" style={{ marginBottom: '16px' }}>
                          <span className="blog-date font-inter" style={{ fontSize: '0.875rem', color: '#6b7280' }}>{new Date(post.date).toLocaleDateString()}</span>
                          <span className="blog-read-time font-inter" style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '16px' }}>{post.readTime}</span>
                        </div>
                        <h2 className="blog-post-title font-inter font-semibold" style={{ fontSize: '1.5rem', lineHeight: 1.4, marginBottom: '16px', color: '#1f2937' }}>
                          <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s ease' }}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="blog-excerpt font-inter" style={{ fontSize: '1rem', lineHeight: 1.6, color: '#374151', marginBottom: '24px' }}>
                          {post.excerpt}
                        </p>
                        <div className="blog-tags" style={{ marginBottom: '24px' }}>
                          {post.tags.map((tag, index) => (
                            <span key={index} className="blog-tag" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', marginRight: '8px', marginBottom: '8px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="blog-link font-inter font-medium" style={{ color: '#2563eb', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                          Read Full Story →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Call to Action */}
            <section className="blogs-cta" style={{ textAlign: 'center', marginTop: '64px', padding: '48px 0', background: 'linear-gradient(135deg, #2563eb, #10b981)', borderRadius: '1rem', color: '#fff' }}>
              <h2 className="cta-title font-inter font-bold" style={{ fontSize: '2rem', marginBottom: '16px' }}>Got a Quest Story to Share?</h2>
              <p className="cta-text font-inter" style={{ fontSize: '1.125rem', marginBottom: '32px', maxWidth: 600, margin: '0 auto 32px' }}>
                Join our guild and share your epic development battles. Let's level up together!
              </p>
              <Link href="/start-quest" className="btn-cta font-inter font-semibold" style={{ background: '#fff', color: '#2563eb', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }}>
                Start Your Quest
              </Link>
            </section>

            {/* Subtle admin entry point */}
            <div style={{ marginTop: '24px', textAlign: 'right', fontSize: '0.75rem' }}>
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                ···
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogPosts: blogs.filter((post) => post.published),
    },
    revalidate: 60,
  };
};

