import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { BlogFooter } from '@/components/blog/blog-footer';
import { BlogPostHeader } from '@/components/blog/blog-post-header';
import type { BlogPost } from '@/types/blog';

type MDXComponentProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  title?: string;
  href?: string;
  src?: string;
  alt?: string;
};

const components = {
  h1: ({ className = '', ...props }: MDXComponentProps) => (
    <h1 className={`mb-6 text-2xl font-bold tracking-tight sm:text-3xl ${className}`} {...props} />
  ),
  h2: ({ className = '', ...props }: MDXComponentProps) => (
    <h2
      className={`mb-4 mt-12 text-xl font-bold tracking-tight sm:text-2xl ${className}`}
      {...props}
    />
  ),
  h3: ({ className = '', ...props }: MDXComponentProps) => (
    <h3
      className={`mb-4 mt-8 text-lg font-bold tracking-tight sm:text-xl ${className}`}
      {...props}
    />
  ),
  h4: ({ className = '', ...props }: MDXComponentProps) => (
    <h4
      className={`mb-4 mt-6 text-base font-bold tracking-tight sm:text-lg ${className}`}
      {...props}
    />
  ),
  p: ({ className = '', ...props }: MDXComponentProps) => (
    <p
      className={`mb-6 leading-relaxed text-gray-600 dark:text-gray-300 ${className}`}
      {...props}
    />
  ),
  ul: ({ className = '', ...props }: MDXComponentProps) => (
    <ul className={`mb-6 list-disc space-y-2 pl-6 ${className}`} {...props} />
  ),
  ol: ({ className = '', ...props }: MDXComponentProps) => (
    <ol className={`mb-6 list-decimal space-y-2 pl-6 ${className}`} {...props} />
  ),
  li: ({ className = '', ...props }: MDXComponentProps) => (
    <li className={`text-gray-600 dark:text-gray-300 ${className}`} {...props} />
  ),
  a: ({ className = '', href = '', ...props }: MDXComponentProps) => {
    const isExternal = href.startsWith('http');
    return (
      <a
        className={`font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary/100 ${className}`}
        href={href}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...props}
      />
    );
  },
  code: ({ className = '', ...props }: MDXComponentProps) => {
    // If className contains a language (e.g., "language-typescript"), it's a code block
    const isCodeBlock = className?.includes('language-');

    return (
      <code
        className={`rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200 ${isCodeBlock ? 'block w-full' : ''} ${className}`}
        {...props}
      />
    );
  },
  pre: ({ className = '', ...props }: MDXComponentProps) => (
    <pre
      className={`mb-6 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800 ${className}`}
      {...props}
    />
  ),
  img: ({
    src,
    alt = '',
    className = '',
    ...props
  }: MDXComponentProps & { src?: string; alt?: string }) => (
    <div className="relative mb-6 aspect-[16/9]">
      <Image
        src={src || ''}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw"
        className={`rounded-lg object-cover ${className}`}
        {...props}
      />
    </div>
  ),
  blockquote: ({ className = '', ...props }: MDXComponentProps) => (
    <blockquote
      className={`mb-6 border-l-4 border-primary/50 pl-4 italic text-gray-600 dark:text-gray-300 ${className}`}
      {...props}
    />
  ),
  hr: ({ className = '', ...props }: MDXComponentProps) => (
    <hr className={`my-8 border-t border-gray-200 dark:border-gray-700 ${className}`} {...props} />
  ),
};

export function BlogPost({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen w-full">
      <article className="container mx-auto max-w-3xl px-4 py-32 sm:py-40">
        <BlogPostHeader title={post.title} date={post.date} />
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          <MDXRemote source={post.content} components={components} />
        </div>
        <BlogFooter />
      </article>
    </div>
  );
}
