import Link from "next/link";
import cn from "classnames";

type Props = {
  className?: string;
};
export const SubscribeButton = ({ className }: Props) => {
  return (
    <Link
      href="https://www.twitter.com/liwawil"
      className={cn(
        "motion-safe:animate-bounce hover:animate-none transition-all bg-red-500 hover:bg-blue-500 shadow-red-400 shadow-sm hover:text-red-100 hover:py-4 hover:px-10 hover:shadow-md hover:shadow-blue-500 text-white font-extrabold duration-200",
        className
      )}
    >
      Subscribe
    </Link>
  );
};
