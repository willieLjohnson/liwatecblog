import type Author from "./author";

type PostType = {
  video: string;
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
  morePosts: PostType[];
};

export default PostType;
