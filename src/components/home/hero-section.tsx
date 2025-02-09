'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import React from 'react';

import { PatternOverlay } from '@/components/ui/background-pattern';

export function HeroSection() {
  const t = useTranslations('HomePage');
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Retrigger animation when navigating back to the page
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <PatternOverlay />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center"
        style={{ y: contentY }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 mb-8"
        >
          {t('title')
            .split('Tim Lee')
            .map((part, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i}>{part}</span>
              ) : (
                <React.Fragment key={i}>
                  {part}
                  <span className="whitespace-nowrap">Tim Lee</span>
                </React.Fragment>
              )
            )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
