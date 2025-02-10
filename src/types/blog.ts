export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  locale: string;
}

export interface BlogPostHeaderProps {
  title: string;
  date: string;
  excerpt?: string;
}
