import { BlogList } from '@/components/blog/blog-list';
import { SUPPORTED_LOCALES } from '@/constants/config';
import { getAllPosts } from '@/lib/blog';

export const revalidate = 3600; // 1 hour in seconds

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  return <BlogList posts={posts} />;
}
