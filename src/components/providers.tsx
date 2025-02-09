'use client';

import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';

import { useMounted } from '@/hooks/useMounted';

export function Providers({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </ThemeProvider>
  );
}
