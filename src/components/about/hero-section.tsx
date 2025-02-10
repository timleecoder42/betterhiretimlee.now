'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { AnimatedText } from '@/components/ui/animated-text';
import { CONTACT_EMAIL } from '@/constants/config';

export function HeroSection() {
  const t = useTranslations('About');
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
      <motion.div
        style={{ opacity, scale }}
        className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 py-12 lg:py-20"
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-4 lg:mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 font-medium inline-flex items-center"
            >
              <span className="hidden lg:block w-12 h-[2px] bg-blue-500 dark:bg-blue-400 mr-6" />
              {t('greeting')}
            </motion.span>
          </motion.div>

          <motion.div className="overflow-hidden relative mb-6 lg:mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text"
              >
                {t('title')}
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, delay: 0.6 }}
                className="inline-block text-blue-600 dark:text-blue-400 ml-2 origin-bottom"
              >
                .
              </motion.span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -left-12 top-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full origin-left hidden lg:block"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-lg lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-8 lg:mb-12 space-y-4 lg:space-y-6 px-4 lg:px-0"
          >
            <AnimatedText text={t('description')} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 lg:px-0"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${CONTACT_EMAIL}`}
              className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('contactMe')}
                <svg
                  className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"
                style={{ zIndex: 0 }}
              />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center items-center px-8 lg:px-0"
        >
          <div className="relative w-[240px] sm:w-[280px] lg:w-[400px] aspect-square">
            <motion.div
              initial={{ rotate: 3 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl rotate-6 scale-95 opacity-20 blur-xl"
              animate={{ rotate: 6 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            />
            <motion.div
              initial={{ rotate: 3 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              whileTap={{ scale: 1.02, rotate: 0 }}
              animate={{ rotate: 3 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                mass: 1,
              }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
            >
              <Image
                src="/timleecoder42.jpg"
                alt="Tim Lee"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
