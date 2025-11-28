import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createBlog, getAllBlogs } from '@/utils/blogService';
import { requireAdmin } from '@/utils/adminAuth';

const blogSchema = z.object({
  title: z.string().min(5),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and dashes'),
  excerpt: z.string().min(20),
  content: z.string().min(100),
  date: z.string().optional(),
  readTime: z.string().optional(),
  // allow either full URLs (https://...) or root-relative paths (/images/...)
  image: z
    .string()
    .regex(/^(https?:\/\/|\/)/, 'Image must be a full URL or start with "/"')
    .optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional(),
  published: z.boolean().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const posts = await getAllBlogs();
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) {
        return;
      }

      const payload = blogSchema.parse(req.body);
      const newPost = await createBlog(payload);
      return res.status(201).json(newPost);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return res.status(400).json({ message });
  }
}

