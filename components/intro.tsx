import { GITHUB, LIWATEC, TWITTER, YOUTUBE } from "../lib/constants";
import Social from "./social";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mb-6 md:mt-3 m-2">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Log.
      </h1>
      <h4 className="text-center md:self-end text-lg md:mt-5 md:pl-8 space-x-5">
        <Social title="TW" url={TWITTER} />
        <Social title="YT" url={YOUTUBE} />
        <Social title="GH" url={GITHUB} />
        <Social title="LTSC" url={LIWATEC} />
      </h4>
    </section>
  );
};

export default Intro;
