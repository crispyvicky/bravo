import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { BlogPost, BlogPostInput } from '@/types/blog';

const BLOG_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');

async function ensureBlogFile() {
  try {
    await fs.access(BLOG_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(BLOG_FILE_PATH), { recursive: true });
    await fs.writeFile(BLOG_FILE_PATH, JSON.stringify([], null, 2));
  }
}

async function readBlogData(): Promise<BlogPost[]> {
  await ensureBlogFile();
  const file = await fs.readFile(BLOG_FILE_PATH, 'utf-8');
  return JSON.parse(file) as BlogPost[];
}

async function writeBlogData(posts: BlogPost[]) {
  await fs.writeFile(BLOG_FILE_PATH, JSON.stringify(posts, null, 2));
}

export async function getAllBlogs() {
  const posts = await readBlogData();
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogBySlug(slug: string) {
  const posts = await readBlogData();
  return posts.find((post) => post.slug === slug);
}

export async function createBlog(payload: BlogPostInput) {
  const posts = await readBlogData();
  const exists = posts.some((post) => post.slug === payload.slug);
  if (exists) {
    throw new Error('Slug already exists');
  }

  const newPost: BlogPost = {
    id: payload.id ?? randomUUID(),
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    content: payload.content,
    date: payload.date ?? new Date().toISOString(),
    readTime: payload.readTime ?? '5 min read',
    image: payload.image ?? '/placeholder.svg',
    tags: payload.tags ?? [],
    author: payload.author ?? 'Team Bravoo',
    published: payload.published ?? false,
  };

  posts.push(newPost);
  await writeBlogData(posts);
  return newPost;
}

export async function updateBlog(slug: string, payload: Partial<BlogPostInput>) {
  const posts = await readBlogData();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    throw new Error('Blog not found');
  }

  if (payload.slug && payload.slug !== slug) {
    const slugTaken = posts.some((post) => post.slug === payload.slug);
    if (slugTaken) {
      throw new Error('Slug already exists');
    }
  }

  const updatedPost: BlogPost = {
    ...posts[index],
    ...payload,
    slug: payload.slug ?? posts[index].slug,
    date: payload.date ?? posts[index].date,
  };

  posts[index] = updatedPost;
  await writeBlogData(posts);
  return updatedPost;
}

export async function deleteBlog(slug: string) {
  const posts = await readBlogData();
  const filtered = posts.filter((post) => post.slug !== slug);

  if (filtered.length === posts.length) {
    throw new Error('Blog not found');
  }

  await writeBlogData(filtered);
}

