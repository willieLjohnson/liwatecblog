import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import markdownToHtml from "../lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import cn from "classnames";
import { type Series, type Game } from "../interfaces/post";
import { Markdown } from "./markdown-text";
import { Frame } from "./frames";

type Props = {
  video?: string;
  clip?: string;
  game?: Game;
  series?: Series;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  video,
  clip,
  game,
  series,
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        {video || clip || game ? (
          <div className="mx-0">
            <Frame
              title={title || undefined}
              video={video || undefined}
              game={game || undefined}
              clip={clip || undefined}
            />
          </div>
        ) : (
          <CoverImage
            className="hover:scale-110"
            slug={slug}
            title={title}
            src={coverImage}
          />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug hover:drop-shadow-xl hover:shadow-red-200 hover:border-2 rounded-xl transition-all duration-200 ">
        <Link
          as={`/posts/${slug}`}
          href={`https://www.youtube.com/${video}`}
          className="hover:underline"
        >
          {title}
        </Link>
        {series ? series.name : <></>}
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p>
        <Markdown content={excerpt} />
      </p>
    </div>
  );
};

type Params = {
  params: {
    title: string;
    coverImage: string;
    date: string;
    excerpt: string;
    author: string;
    slug: string;
    video?: string;
    game?: Game;
    clip?: string;
    series?: Series;
  };
};

export async function getStaticProps({ params }: Params) {
  const excerpt = await markdownToHtml(params.excerpt || "");
  return {
    props: {
      ...params,
      excerpt,
    },
  };
}

export default PostPreview;
