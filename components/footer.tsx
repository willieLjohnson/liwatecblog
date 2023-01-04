import cn from "classnames";
import Container from "./container";
import Socials from "./socials";
import { SubscribeButton } from "./subscribe-button";

type Props = {
  footerClasses?: string;
  containerClasses?: string;
  socialsClasses?: string;
};

export const Footer = ({
  footerClasses,
  containerClasses,
  socialsClasses,
}: Props) => {
  return (
    <footer
      className={cn(
        "bg-neutral-50 border-t border-neutral-200 bg-transparent",
        footerClasses
      )}
    >
      <Container>
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center lg:justify-between p-[1rem]",
            containerClasses
          )}
        >
          <h3 className="text-[3rem] font-bold  text-center text-3xl">
            Design, Create, Play, Repeat
          </h3>
          <Socials
            className=" bg-[#eeeeee55] p-[0.25rem] lg:p-[0.25rem] lg:px-[1rem] lg:rounded-[3rem] px-5 rounded-[3rem] space-x-[2rem] md:space-x-[3rem] lg:space-x-[4rem] transition-all items-center text-5xl"
            buttonClasses="text-[2rem] md:text-[2.6rem] lg:text-[3rem]"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
