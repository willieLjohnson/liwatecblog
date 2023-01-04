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
    return typeof series.prev !== "undefined";
  };
  const hasNext = (): boolean => {
    return typeof series.next !== "undefined";
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
    let classes = "flex flex-col justify-center text-center";
    if (hasNext() && hasPrev()) {
      return cn("lg:flex-row justify-between", [classes, className]);
    } else {
      return cn("md:flex-row justify-center", [classes, className]);
    }
  };

  return <div className={flexClasses()}>{Links()}</div>;
};
