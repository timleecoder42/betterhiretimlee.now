import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tim Lee - Full Stack Developer',
  description:
    'Personal portfolio and blog of Tim Lee, a Full Stack Developer specializing in modern web technologies and AI tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
