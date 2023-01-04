import type Author from "./author";

export type Series = {
  name: string;
  id: number;
  next?: string;
  prev?: string;
};

export type Post = {
  video: string;
  series?: Series;
  slug: string;
  title: string;
  date: string;
  updated: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  history: string;
};
