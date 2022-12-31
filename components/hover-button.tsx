import cn from "classnames";
import Link from "next/link";

type Props = {
  title: string;
  url: string;
  img?: string;
};

const HoverButton = ({ title, url, img }: Props) => {
  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        "border-b-4 hover:border-r-4 hover:border-t-2 hover:border-l-4 hover:border-b-8",
        {
          "border-black font-extrabold hover:border-red-600 p-5 pt-1 pb-1 hover:text-red-700 drop-shadow-xl duration-200 transition-all":
            title,
        }
      )}
    >
      <i className="fas fa-heart"></i> {title}
    </Link>
  );
};

export default HoverButton;
