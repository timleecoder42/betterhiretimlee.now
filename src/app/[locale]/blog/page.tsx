import { BlogList } from '@/components/blog/blog-list';
import { getAllPosts } from '@/lib/blog';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  return <BlogList posts={posts} />;
}

export const dynamic = 'force-dynamic';
