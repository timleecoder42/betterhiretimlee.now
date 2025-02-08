'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Project } from '@/lib/github';

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
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('Projects');

  return (
    <motion.div
      variants={item}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className="relative"
        style={{ aspectRatio: '2/1' }}
        onClick={() => project.demoUrl && window.open(project.demoUrl, '_blank')}
      >
        <div className="absolute inset-0 cursor-pointer">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          {/* Overlay with hover text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
            {project.demoUrl && (
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium flex items-center gap-2">
                {t('visitDemo')}
                <ExternalLink className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative min-w-0">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-1 pr-12">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex-none text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none" />
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none text-sm font-mono px-2 py-1 -my-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-300"
          >
            {t('viewCode')}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations('Projects');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </>
  );
}
