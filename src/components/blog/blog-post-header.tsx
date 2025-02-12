'use client';

import { motion } from 'framer-motion';

interface BlogPostHeaderProps {
  title: string;
  date: string;
}

export function BlogPostHeader({ title, date }: BlogPostHeaderProps) {
  return (
    <header className="mb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-lg text-gray-400 dark:text-gray-500"
      >
        <time className="font-mono">{date}</time>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl tracking-tight font-bold"
      >
        {title}
      </motion.h1>
    </header>
  );
}
