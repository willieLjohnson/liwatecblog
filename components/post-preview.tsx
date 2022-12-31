import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import markdownToHtml from "../lib/markdownToHtml";
import { useEffect, useState } from "react";
import markdownStyles from "./markdown-styles.module.css";
import cn from "classnames";

type Props = {
  video?: string;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  video,
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        {video ? (
          <div className="mx-0">
            <iframe
              width="1920"
              height="1080"
              className={cn("shadow-sm w-full", {
                "hover:shadow-lg transition-shadow duration-200  max-h-96":
                  slug,
              })}
              src={`https://www.youtube.com/embed/${video}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <CoverImage slug={slug} title={title} src={coverImage} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href={`https://www.youtube.com/${video}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Avatar name={author.name} picture={author.picture} />
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
    vide: string;
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
