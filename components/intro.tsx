import Socials from "./socials";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mt-3 m-2 mr-0">
      <h1 className="text-4xl md:text-[5rem] hover:animate-pulse font-extrabold tracking-loose leading-tight">
        ~ \^/
      </h1>
      <Socials
        className="md:justify-self-end bg-transparent tracking-widest md:self-end px-0 pb-[0.2rem] md:mt-5 text-5xl scale-90"
        buttonClasses="border-b-0"
      />
    </section>
  );
};

export default Intro;
