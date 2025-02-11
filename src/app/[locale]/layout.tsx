import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { Providers } from '@/components/providers';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { isValidLocale } from '@/i18n/utils';
import type { Locale } from '@/types/common';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const homeT = await getTranslations({ locale, namespace: 'HomePage' });

  const title = t('title');
  const description = t('description');
  const subtitle = homeT('subtitle');

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og?title=Tim%20Lee&subtitle=${encodeURIComponent(subtitle)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=Tim%20Lee&subtitle=${encodeURIComponent(subtitle)}`],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={inter.className}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BackgroundGradient />
          </NextIntlClientProvider>
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
