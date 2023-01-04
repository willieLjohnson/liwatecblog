import PostPreview from "./post-preview";
import { type Post } from "../interfaces/post";

type Props = {
  className?: string;
  posts: Post[];
};

const MoreStories = ({ className, posts }: Props) => {
  return (
    <section>
      <div className="relative">
        <h2 className="p-0 m-0 bg-transparent text-center text-8xl animate-bounce font-extrabold absolute left-1/2 -translate-x-1/2 -top-16">
          V
        </h2>
      </div>
      <div className="mb-16 border-2 border-transparent"> </div>
      <div className="space-y-0 bg-transparent p-3 rounded-xl m-5 mt-0 mb-10 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        <h2 className="p-0 m-0 bg-transparent">More Posts</h2>
      </div>
      <div
        className={`${className} grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32`}
      >
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            video={post.video || ""}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
