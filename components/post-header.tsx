import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";
import { type Game, type Series } from "../interfaces/post";
import { SeriesBar } from "./series";
import { Frame } from "./frames";

type Props = {
  title: string;
  series?: Series;
  coverImage: string;
  video?: string;
  game?: Game;
  clip?: string;
  date: string;
  author: Author;
  width?: string;
  height?: string;
  containerHeight?: string;
};

const PostHeader = ({
  title,
  series,
  coverImage,
  video,
  game,
  clip,
  date,
  width = "1080",
  height = "720",
  containerHeight = "h-[5rem]",
}: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0 flex flex-col justify-between">
        {video || game || clip ? (
          <Frame
            title={title}
            clip={clip}
            game={game}
            video={video}
            width={width}
            height={height}
            containerHeight={containerHeight}
          />
        ) : (
          <CoverImage title={title} src={coverImage} />
        )}
        {series ? (
          <SeriesBar className="mt-5 text-[1.3rem]" series={series} />
        ) : (
          <></>
        )}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
