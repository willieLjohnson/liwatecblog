import { type Game } from "../interfaces/post";
import cn from "classnames";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  clip?: string;
  video?: string;
  game?: Game;
  cover?: string;
  width?: string;
  height?: string;
  containerHeight?: string;
};

export const Frame = ({
  title,
  clip,
  video,
  cover,
  game,
  width,
  height,
  containerHeight = "h-[30rem]",
}: Props) => {
  const gotVideo = video !== undefined;
  const gotGame = game !== undefined;
  const gotClip = clip !== undefined;
  const gotCover = cover !== undefined;

  let frame: ReactJSXElement;
  console.log(cover);
  if (gotCover) {
    frame = <CoverImage title={title} src={cover} />;
  } else if (gotVideo) {
    frame = (
      <iframe
        width={width}
        height={height}
        className={cn("shadow-xl pt-0 w-full sm:h-full rounded-md", {
          "hover:shadow-lg transition-shadow duration-200": title,
        })}
        src={`https://www.youtube.com/embed/${video}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else if (gotGame) {
    containerHeight = "h-[40rem]";
    frame = (
      <iframe
        width={width}
        height={670}
        className={cn("shadow-xl pt-0 w-full rounded-md", {
          "hover:shadow-lg transition-shadow duration-200": title,
        })}
        src={game.src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
        <a href={game.href}>{title}</a>
      </iframe>
    );
  } else if (gotClip) {
    frame = (
      <iframe
        width={width}
        height={height}
        className={cn("shadow-xl pt-0 w-full rounded-md", {
          "hover:shadow-lg transition-shadow duration-200": title,
        })}
        src={clip}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }
  return <div className={`${containerHeight} w-full rounded-md`}>{frame}</div>;
};
