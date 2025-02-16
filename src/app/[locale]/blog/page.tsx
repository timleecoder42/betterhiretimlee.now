import { setRequestLocale } from 'next-intl/server';

import { BlogList } from '@/components/blog/blog-list';
import { getAllPosts } from '@/lib/blog';
import type { PageProps } from '@/types/common';

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const posts = await getAllPosts(locale);

  return <BlogList posts={posts} />;
}
