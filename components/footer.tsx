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
            "flex flex-row items-center justify-around p-6",
            containerClasses
          )}
        >
          <h3 className="text-[1.5rem] font-bold tracking-wider leading-loose text-center lg:mb-0">
            Design, Create, Play, Repeat
          </h3>
          <div className="flex flex-row justify-center items-center">
            <SubscribeButton className="px-8 mb-0 py-4" />
          </div>
          <Socials
            className={cn(
              "p-2 pt-0 flex flex-row justify-between",
              socialsClasses
            )}
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
