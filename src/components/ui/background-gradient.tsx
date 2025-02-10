'use client';

export function BackgroundGradient() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30" />
      {/* Decorative blobs */}
      <div className="fixed -top-40 -right-40 w-[40vw] h-[40vw] bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-80 animate-blob -z-10" />
      <div className="fixed -bottom-40 -left-40 w-[40vw] h-[40vw] bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 dark:opacity-80 animate-blob animation-delay-2000 -z-10" />
    </>
  );
}
