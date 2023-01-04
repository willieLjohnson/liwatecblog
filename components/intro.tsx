import Socials from "./socials";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mt-3 m-2 mr-0">
      <h1 className="text-[4rem] md:text-[5rem] hover:animate-pulse font-extrabold tracking-loose leading-tight flex-col justify-center">
        <span className="text-[0rem] invisible md:visible md:text-[5rem]">
          ~
        </span>
        \^/
      </h1>
      <Socials
        className="md:justify-self-end tracking-widest rounded-xl transition-all md:self-end px-0 pb-[0.15rem] md:mt-5 text-5xl"
        buttonClasses="border-b-0 text-[2.4rem] p-2 m-2 md:text-[2.6rem] lg:text-[3rem]"
      />
    </section>
  );
};

export default Intro;
