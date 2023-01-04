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
            "flex flex-col lg:flex-row items-center lg:justify-between p-6",
            containerClasses
          )}
        >
          <h3 className="text-[2rem] font-bold tracking-wider text-center text-3xl">
            Design, Create, Play, Repeat
          </h3>
          <Socials
            className="md:justify-self-end scale-75 bg-transparent tracking-widest md:self-end pb-[0.35rem] md:mt-5 text-5xl"
            buttonClasses="border-b-0"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
