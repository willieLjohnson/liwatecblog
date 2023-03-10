import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { type Post } from "../interfaces/post";
import { truncateString } from "../pages/posts/[slug]";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let post: Post = {} as Post;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      post[field] = realSlug;
      post[
        "history"
      ] = `https://github.com/willieLjohnson/liwatecblog/commits/main/_posts/${realSlug}.md`;
    }
    if (field === "content") {
      post[field] = content;
      post["excerpt"] = truncateString(content, 400);
    }
    if (field === "video") {
      const video = data[field];
      post["ogImage"] = post["ogImage"] = {
        url: `https://i.ytimg.com/vi/${video}/hqdefault.jpg`,
      };
      post["coverImage"] = `https://i.ytimg.com/vi/${video}/hqdefault.jpg`;
    }
    if (typeof data[field] !== "undefined") {
      post[field] = data[field];
    }
  });
  return post;
}

export function getAllPosts(fields: string[] = []): Post[] {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
