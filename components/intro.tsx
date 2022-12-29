import Socials from "./socials";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mb-6 md:mt-3 m-2">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Log.
      </h1>
      <Socials />
    </section>
  );
};

export default Intro;
