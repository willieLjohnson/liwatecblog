import { GITHUB, LIWATEC, TWITTER, YOUTUBE } from "../lib/constants";
import Gif from "./image";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between md:mb-6 md:mt-3 m-2">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Log.
      </h1>
      <h4 className="text-center md:self-end md:text-left text-lg md:mt-5 md:pl-8">
        <a
          href={TWITTER}
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          TW
        </a>
        {" - "}
        <a
          href={YOUTUBE}
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          YT
        </a>
        {" - "}
        <a
          href={GITHUB}
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          GH
        </a>
        {" - "}
        <a
          href={LIWATEC}
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          LTSC
        </a>
      </h4>
    </section>
  );
};

export default Intro;
