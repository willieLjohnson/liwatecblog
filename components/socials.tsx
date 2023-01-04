import cn from "classnames";
import HoverButton from "./hover-button";
import { GITHUB, LIWATEC, REDDIT, TWITTER, YOUTUBE } from "../lib/constants";
type Props = {
  className: string;
  buttonClasses?: string;
};

const Socials = ({ className, buttonClasses }: Props) => {
  return (
    <h4
      className={cn(
        "text-center text-lg flex flex-row justify-between space-x-[2rem]",
        className
      )}
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
      <HoverButton className={`${buttonClasses}`} title="LTSC" url={LIWATEC} />
    </h4>
  );
};

export default Socials;
