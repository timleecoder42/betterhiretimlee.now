import fs from 'fs';
import path from 'path';

import { format } from 'date-fns';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  locale: string;
};

function formatDate(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function getAllPosts(locale: string): BlogPost[] {
  // Get all post directories
  const postDirs = fs
    .readdirSync(POSTS_PATH)
    .filter(file => fs.statSync(path.join(POSTS_PATH, file)).isDirectory());

  const posts = postDirs
    .map(dir => {
      try {
        const postPath = path.join(POSTS_PATH, dir, `index.${locale}.mdx`);
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
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  try {
    const postPath = path.join(POSTS_PATH, slug, `index.${locale}.mdx`);
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
