import { BlogList } from '@/components/blog/blog-list';
import { REVALIDATE_TIME, SUPPORTED_LOCALES } from '@/constants/config';
import { getAllPosts } from '@/lib/blog';

export const revalidate = REVALIDATE_TIME;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  return <BlogList posts={posts} />;
}
