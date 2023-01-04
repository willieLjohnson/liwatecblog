import cn from "classnames";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title?: string;
  url: string;
  img?: string;
  className?: string;
  icon?: IconProp;
};

const HoverButton = ({ title, url, img, className, icon }: Props) => {
  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        `hover:scale-110 hover:animate-pulse ease-out ${className}`,
        {
          "border-black font-extrabold hover:border-red-600 border-solid p-3 hover:text-red-700  duration-200 transition-all":
            title,
        }
      )}
    >
      {icon ? <FontAwesomeIcon size="lg" icon={icon} /> : <></>}
      {title ? (
        <span className="bg-black text-white p-[0.5rem] px-[0.8rem] rounded-md text-[2.4rem]">
          {title ?? ""}
        </span>
      ) : (
        <></>
      )}
    </Link>
  );
};

export default HoverButton;
