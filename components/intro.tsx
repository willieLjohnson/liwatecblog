import Socials from "./socials";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mt-3 mb-0 m-2">
      <h1 className="pb-[0.7rem] text-[4rem] md:text-[5rem] hover:animate-pulse font-extrabold tracking-loose leading-tight flex-col justify-center items-center">
        <span className="text-[0rem] invisible md:visible md:text-[5rem]">
          ~
        </span>
        \^/
      </h1>
      <Socials
        className="space-x-[3rem] py-[0rem] md:justify-self-end tracking-widest rounded-xl transition-all px-0 p-[0.15rem] "
        buttonClasses="border-b-0 text-[2.4rem] p-2 m-2 pb-0 mb-0 md:text-[3rem] lg:text-[4rem]"
      />
    </section>
  );
};

export default Intro;
