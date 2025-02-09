import { notFound } from 'next/navigation';

import { BlogPost } from '@/components/blog/blog-post';
import { getPostBySlug } from '@/lib/blog';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}

export const dynamic = 'force-dynamic';
