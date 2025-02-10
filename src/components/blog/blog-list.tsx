'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { BlogPost } from '@/types/blog';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('Blog');

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="mx-auto max-w-2xl">
          <div className="mb-16">
            <h1 className="mb-3 text-3xl font-medium">{t('title')}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t('description')}</p>
          </div>
          <motion.div variants={container} initial="hidden" animate="show">
            {posts.map(post => (
              <motion.article
                key={post.slug}
                variants={item}
                className="border-b border-gray-200 dark:border-gray-800 last:border-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline py-6 px-4 -mx-4 transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <time className="w-32 shrink-0 text-lg text-gray-400 dark:text-gray-500">
                    {post.date}
                  </time>
                  <h2 className="text-lg tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-primary">
                    {post.title}
                  </h2>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
