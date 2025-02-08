import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navigation } from '@/app/components/navigation';
import { Providers } from '@/app/components/providers';
import { Inter } from 'next/font/google';
import { Locale, isValidLocale } from '@/i18n/types';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

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
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
