import { CMS_NAME } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Log.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <a
          href="https://www.twitter.com/xillioneur"
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          TW
        </a>
        {" - "}
        <a
          href="https://www.youtube.com/@wLiwa"
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          YT
        </a>
        {" - "}
        <a
          href="https://www.github.com/willieljohnson"
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          GH
        </a>
        {" - "}
        <a
          href="https://www.liwatec.xyz"
          className="font-semibold hover:underline hover:text-blue-600 hover:font-extrabold duration-200 transition-colors"
        >
          LTSC
        </a>
      </h4>
    </section>
  );
};

export default Intro;
