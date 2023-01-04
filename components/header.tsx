import Link from "next/link";
import Socials from "./socials";

const Header = () => {
  return (
    <h2 className="flex flex-row items-center justify-between text-5xl md:text-7xl  font-extrabold tracking-tight md:tracking-wide leading-loose lg:mb-[2rem] mt-4">
      <Link
        href="/"
        className="lg:pb-[1.5rem] pb-[1rem] text-[3.5rem] items-center hover:underline flex flex-row self-center"
      >
        {"<~"} <div className="p-0">\^/</div>
      </Link>
      <Socials
        className=" bg-[#eeeeee55] p-[0.25rem] lg:p-[0.25rem] lg:px-[1rem] lg:rounded-[3rem] px-5 rounded-[3rem] space-x-[2rem] md:space-x-[3rem] lg:space-x-[4rem] transition-all items-center text-5xl"
        buttonClasses="text-[2rem] md:text-[2.6rem] lg:text-[3rem]"
      />
    </h2>
  );
};

export default Header;
