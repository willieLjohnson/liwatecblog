import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import HoverButton from "./hover-button";
import { GITHUB, LIWATEC, TWITTER, YOUTUBE } from "../lib/constants";

type Props = {
  className: string;
};

const Socials = ({ className }: Props) => {
  return (
    <h4 className={cn("text-center text-lg  md:pl-8 space-x-5", className)}>
      <HoverButton title="TW" url={TWITTER} />
      <HoverButton title="YT" url={YOUTUBE} />
      <HoverButton title="GH" url={GITHUB} />
      <HoverButton title="LTSC" url={LIWATEC} />
    </h4>
  );
};

export default Socials;
