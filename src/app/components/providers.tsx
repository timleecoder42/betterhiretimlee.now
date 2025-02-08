'use client';

import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </ThemeProvider>
  );
}
