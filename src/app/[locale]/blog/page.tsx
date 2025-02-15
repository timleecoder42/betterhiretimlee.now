import { BlogList } from '@/components/blog/blog-list';
import { SUPPORTED_LOCALES } from '@/constants/config';
import { getAllPosts } from '@/lib/blog';
import type { PageProps } from '@/types/common';

// Add revalidation period - 1 hour
export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  const posts = await getAllPosts(locale);

  return <BlogList posts={posts} />;
}
