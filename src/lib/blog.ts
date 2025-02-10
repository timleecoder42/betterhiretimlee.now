import fs from 'fs';
import path from 'path';

import { format } from 'date-fns';
import matter from 'gray-matter';

import { POSTS_PATH } from '@/constants/server';
import type { BlogPost } from '@/types/blog';

function formatDate(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  // Get all post directories
  const postDirs = fs
    .readdirSync(POSTS_PATH)
    .filter(file => fs.statSync(path.join(POSTS_PATH, file)).isDirectory());

  const posts = await Promise.all(
    postDirs.map(async dir => {
      try {
        const postPath = path.join(POSTS_PATH, dir, `${locale}.mdx`);
        if (!fs.existsSync(postPath)) return null;

        const source = fs.readFileSync(postPath, 'utf8');
        const { data, content } = matter(source);

        const post: BlogPost = {
          slug: dir,
          title: data.title,
          date: formatDate(new Date(data.date)),
          content,
          excerpt: data.excerpt,
          locale,
        };

        return post;
      } catch {
        return null;
      }
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const postPath = path.join(POSTS_PATH, slug, `${locale}.mdx`);
    if (!fs.existsSync(postPath)) return null;

    const source = fs.readFileSync(postPath, 'utf8');
    const { data, content } = matter(source);

    const post: BlogPost = {
      slug,
      title: data.title,
      date: formatDate(new Date(data.date)),
      content,
      excerpt: data.excerpt,
      locale,
    };

    return post;
  } catch {
    return null;
  }
}
