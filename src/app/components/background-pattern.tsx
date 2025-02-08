'use client';

export function BackgroundPattern() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      {/* Decorative blobs */}
      <div className="fixed -top-40 -right-40 w-[40vw] h-[40vw] bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob -z-10" />
      <div className="fixed -bottom-40 -left-40 w-[40vw] h-[40vw] bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000 -z-10" />
    </>
  );
}
