'use client';

import { ArrowUpRightIcon, CameraIcon } from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ExperienceCardProps {
  icon: React.ReactNode;
  title: string;
  period: string;
  description: string;
  details: string[];
  gradient: string;
  iconGradient?: string;
  company?: {
    name: string;
    logo?: string;
    link?: string;
  };
  projectLink?: string;
}

function ExperienceCard({
  icon,
  title,
  period,
  description,
  details,
  gradient,
  iconGradient,
  company,
  projectLink,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
      />
      <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-700/50 overflow-hidden">
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <span
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                company?.logo
                  ? 'bg-white dark:bg-gray-700'
                  : iconGradient || gradient.replace('10', '90')
              } ${company?.logo ? '' : 'text-white'}`}
            >
              {company?.logo ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-6 h-6 sm:w-8 sm:h-8"
                >
                  <Image src={company.logo} alt={company.name} fill className="object-contain" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                >
                  {icon}
                </motion.div>
              )}
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {company && (
                  <>
                    {company.link ? (
                      <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      >
                        {company.name}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {company.name}
                      </span>
                    )}
                    <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                  </>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">{period}</span>
                {projectLink && (
                  <>
                    <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                    <a
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <span className="border-b border-gray-500/0 group-hover/link:border-gray-500/100 dark:border-gray-400/0 dark:group-hover/link:border-gray-400/100 transition-colors">
                        View Project
                      </span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pl-0 sm:pl-16">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {details.map((detail, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 2 }}
                  className="text-gray-600 dark:text-gray-300 flex items-start sm:items-center gap-3 group/item"
                >
                  <span className="mt-1.5 sm:mt-0 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-500/80 to-blue-600/80 dark:from-blue-400/80 dark:to-blue-500/80 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                  <span className="text-sm sm:text-base group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors">
                    {detail}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperiencesSection() {
  const t = useTranslations('About');
  const { scrollYProgress } = useScroll();

  const experiences = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path
            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t('currentRole'),
      period: '2025 — Present',
      description: t('currentRoleDescription'),
      details: [
        t('experienceDetails.buildingApps'),
        t('experienceDetails.leveragingAI'),
        t('experienceDetails.exploring'),
      ],
      gradient: 'bg-gradient-to-br from-blue-500/10 to-purple-600/10',
      iconGradient: 'bg-gradient-to-br from-blue-500/90 to-purple-600/90',
    },
    {
      icon: <CameraIcon className="w-6 h-6" />,
      title: t('previousRole'),
      period: '2023 — 2024',
      description: t('previousRoleDescription'),
      details: [
        t('experienceDetails.previousRole.detail1'),
        t('experienceDetails.previousRole.detail2'),
        t('experienceDetails.previousRole.detail3'),
      ],
      gradient: 'bg-gradient-to-br from-emerald-500/10 to-green-600/10',
      iconGradient: 'bg-gradient-to-br from-emerald-500/90 to-green-600/90',
      company: {
        name: 'MugglePay',
        link: 'https://x.com/paymuggle',
      },
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t('earlyRole'),
      period: '2022 — 2023',
      description: t('earlyRoleDescription'),
      details: [
        t('experienceDetails.earlyRole.detail1'),
        t('experienceDetails.earlyRole.detail2'),
        t('experienceDetails.earlyRole.detail3'),
      ],
      gradient: 'bg-gradient-to-br from-orange-500/10 to-red-600/10',
      iconGradient: 'bg-gradient-to-br from-orange-500/90 to-red-600/90',
      company: {
        name: 'Zolplay',
        link: 'https://zolplay.com/',
        logo: '/zolplay.png',
      },
      projectLink: 'https://zolplay.com/portfolios/nexus',
    },
  ];

  return (
    <section className="pt-16 sm:pt-24 lg:pt-32 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-20"
      >
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.h2
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
                {t('experiences')}
              </span>
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -25]) }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              {t('experiencesDescription')}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full"
        >
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
