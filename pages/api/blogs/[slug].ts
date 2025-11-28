import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { deleteBlog, getBlogBySlug, updateBlog } from '@/utils/blogService';
import { requireAdmin } from '@/utils/adminAuth';

const updateSchema = z
  .object({
    title: z.string().min(5).optional(),
    slug: z
      .string()
      .min(3)
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    excerpt: z.string().min(20).optional(),
    content: z.string().min(100).optional(),
    date: z.string().optional(),
    readTime: z.string().optional(),
    image: z
      .string()
      .regex(/^(https?:\/\/|\/)/, 'Image must be a full URL or start with "/"')
      .optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: 'No update fields provided' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid slug' });
  }

  try {
    if (req.method === 'GET') {
      const post = await getBlogBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return res.status(200).json(post);
    }

    if (req.method === 'PUT') {
      if (!requireAdmin(req, res)) {
        return;
      }

      const payload = updateSchema.parse(req.body);
      const updated = await updateBlog(slug, payload);
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      if (!requireAdmin(req, res)) {
        return;
      }

      await deleteBlog(slug);
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return res.status(400).json({ message });
  }
}

