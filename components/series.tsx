import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import HoverButton from "./hover-button";
import { GITHUB, LIWATEC, TWITTER, YOUTUBE } from "../lib/constants";
import { Series } from "../interfaces/post";
import { ReactNode } from "react";

type Props = {
  series: Series;
  className?: string;
};

export const SeriesBar = ({ series, className }: Props) => {
  const hasPrev = (): boolean => {
    return series.prev !== undefined;
  };
  const hasNext = (): boolean => {
    return series.next !== undefined;
  };

  const Links = (): ReactNode[] => {
    let links: ReactNode[] = [];
    if (hasPrev()) {
      links.push(
        <Link href={`/posts/${series.prev}`}>
          {"<>-"} [ Part {series.id} : {series.prev}
          {" ] <<<"}
        </Link>
      );
    }
    if (hasNext()) {
      links.push(
        <Link href={`/posts/${series.next}`}>
          {">>> [ "}
          Part {series.id + 2} : {series.next} ] {"-<>"}
        </Link>
      );
    }
    return links;
  };

  const flexClasses = () => {
    let classes = "flex flex-col flex-end";
    if (hasNext() && hasPrev()) {
      return cn("lg:flex-row justify-between text-center", [
        classes,
        className,
      ]);
    } else if (hasNext()) {
      return cn("md:flex-row justify-end", [classes, className]);
    } else {
      return cn("md:flex-row justify-center text-center", [classes, className]);
    }
  };

  return <div className={flexClasses()}>{Links()}</div>;
};
