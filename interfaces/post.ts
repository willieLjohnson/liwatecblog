import type Author from "./author";

export type Series = {
  name: string;
  id: number;
  next: string;
  prev: string;
};

export type Game = {
  src: string;
  href: string;
};

export type Post = {
  video: string;
  game: Game;
  clip: string;
  series: Series;
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
