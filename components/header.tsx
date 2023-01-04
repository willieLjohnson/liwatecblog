import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-5xl md:text-7xl bg-transparent font-extrabold tracking-tight pl-0 ml-0 md:tracking-wide leading-loose lg:mb-12  mt-4">
      <Link href="/" className="hover:underline">
        {"<~"} \^/
      </Link>
    </h2>
  );
};

export default Header;
