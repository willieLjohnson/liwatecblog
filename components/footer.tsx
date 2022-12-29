import Container from "./container";
import Socials from "./socials";

type Props = {
  className: string;
};

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center p-5">
          <h3 className=" lg:text-[1.5rem] font-bold tracking-wider leading-loose text-center lg:text-center mb-10 lg:mb-0 lg:w-1/2">
            Design, Create, Play, Repeat
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:w-1/2">
            <a
              href="https://www.twitter.com/liwawil"
              className="mx-3 bg-red-500 hover:bg-blue-500 shadow-red-400 shadow-sm hover:text-red-100 hover:py-4 hover:px-10 hover:shadow-md hover:shadow-blue-500 text-white font-extrabold py-3 px-12 lg:px-8 duration-200 transition-all mb-6 lg:mb-0"
            >
              Subscribe
            </a>
          </div>
          <Socials className="lg:w-1/2 p-2 pt-0" />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
