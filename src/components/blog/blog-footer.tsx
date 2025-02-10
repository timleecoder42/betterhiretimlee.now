import { useTranslations } from 'next-intl';

export function BlogFooter() {
  const t = useTranslations('Blog');

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 italic">
      {t('footer')}
    </div>
  );
}
