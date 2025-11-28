export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: string;
  published: boolean;
}

export type BlogPostInput = Omit<BlogPost, 'id'> & { id?: string };

