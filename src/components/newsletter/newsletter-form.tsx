'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import {
  formVariants,
  messageVariants,
  buttonVariants,
  statusVariants,
} from '@/components/newsletter/newsletter-form.variants';
import { FormStatus } from '@/components/newsletter/types';
import {
  newsletterSchema,
  type NewsletterFormData,
  NewsletterErrorCode,
} from '@/lib/validations/newsletter';

export function NewsletterForm() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>(FormStatus.Idle);
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setStatus(FormStatus.Idle);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.Loading);

    try {
      // Client-side validation
      const result = newsletterSchema.safeParse({ email, locale });
      if (!result.success) {
        const errorCode = result.error.errors[0]?.message;
        setStatus(FormStatus.Error);
        setMessage(t(`errors.${errorCode}`));
        setTimeout(resetForm, 5000);
        return;
      }

      const formData: NewsletterFormData = { email: result.data.email, locale: result.data.locale };
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(FormStatus.Success);
        setEmail('');
        setMessage(''); // Clear any existing error message
      } else {
        setStatus(FormStatus.Error);
        setMessage(t(`errors.${data.code}`));
      }
    } catch {
      setStatus(FormStatus.Error);
      setMessage(t(`errors.${NewsletterErrorCode.UnknownError}`));
    }

    // Reset status and message after 5 seconds
    setTimeout(resetForm, 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      variants={formVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: 0.4 }}
      noValidate
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="relative w-full">
          <input
            type="email"
            name="email"
            placeholder={t('newsletterPlaceholder')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
            required
            disabled={status === FormStatus.Loading || status === FormStatus.Success}
          />
          <div className="h-4 relative">
            <AnimatePresence>
              {message && status === FormStatus.Error && (
                <motion.div
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute top-1 inset-x-0 text-sm text-center text-red-600 dark:text-red-400"
                >
                  <p className="px-2 break-words">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          type="submit"
          variants={buttonVariants}
          initial={FormStatus.Idle}
          whileHover={status === FormStatus.Idle ? 'hover' : undefined}
          whileTap={status === FormStatus.Idle ? 'tap' : undefined}
          animate={status}
          disabled={status === FormStatus.Loading || status === FormStatus.Success}
          className="w-full sm:w-[220px] relative px-4 py-3 text-white rounded-full shadow-sm font-medium overflow-hidden group whitespace-nowrap flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient" />
          <AnimatePresence mode="wait">
            {status === FormStatus.Loading ? (
              <motion.span
                key="loading"
                variants={statusVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative inline-flex items-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('loading')}
              </motion.span>
            ) : status === FormStatus.Success ? (
              <motion.span
                key="success"
                variants={statusVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t('success')}
              </motion.span>
            ) : (
              <motion.span
                key="subscribe"
                variants={statusVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                {t('subscribe')}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.form>
  );
}
