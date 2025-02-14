export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  locale: string;
};

export type BlogPostHeaderProps = {
  title: string;
  date: string;
  excerpt?: string;
};
