import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  url: string;
  img?: string;
};

const Social = ({ title, url, img }: Props) => {
  return (
    <Link
      href={url}
      className={cn(
        "border-b-4 hover:border-r-4 hover:border-t-2 hover:border-l-4 hover:border-b-8",
        {
          "border-black font-extrabold hover:border-red-600 p-5  pt-1 pb-1 hover:text-red-700 drop-shadow-xl duration-200 transition-all":
            title,
        }
      )}
    >
      {img ? (
        <Image
          src={img}
          alt={`Image of ${title}`}
          className={cn("shadow-sm w-full", {
            "hover:shadow-lg transition-shadow duration-200": title,
          })}
          width={100}
          height={100}
        />
      ) : (
        <>{title}</>
      )}
    </Link>
  );
};

export default Social;
