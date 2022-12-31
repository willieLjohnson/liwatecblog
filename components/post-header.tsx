import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";
import cn from "classnames";

type Props = {
  title: string;
  coverImage: string;
  video?: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, video, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {video ? (
          <div className="mx-0 mb-9 flex flex-col items-center">
            <iframe
              width="1920"
              height="1080"
              className={cn("shadow-xl pt-0 w-full sm:h-96 lg:h-screen", {
                "hover:shadow-lg transition-shadow duration-200": title,
              })}
              src={`https://www.youtube.com/embed/${video}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <CoverImage title={title} src={coverImage} />
        )}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
