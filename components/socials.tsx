import cn from "classnames";
import HoverButton from "./hover-button";
import { GITHUB, REDDIT, TWITTER, YOUTUBE } from "../lib/constants";
type Props = {
  className: string;
  buttonClasses?: string;
};

const Socials = ({ className, buttonClasses }: Props) => {
  return (
    <h4
      className={cn(`${className} text-center flex flex-row justify-between`)}
    >
      <HoverButton
        className={buttonClasses}
        icon={["fab", "twitter"]}
        url={TWITTER}
      />
      <HoverButton
        className={buttonClasses}
        icon={["fab", "youtube"]}
        url={YOUTUBE}
      />
      <HoverButton
        className={buttonClasses}
        icon={["fab", "github"]}
        url={GITHUB}
      />
      <HoverButton
        className={buttonClasses}
        icon={["fab", "reddit"]}
        url={REDDIT}
      />
    </h4>
  );
};

export default Socials;
