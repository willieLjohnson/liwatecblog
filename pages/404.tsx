import Alert from "../components/alert";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import Socials from "../components/socials";
import { SubscribeButton } from "../components/subscribe-button";
import { type Post } from "../interfaces/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  allPosts?: Post[];
};

export default function Error404({ allPosts }: Props) {
  return (
    <Container>
      <Header />
      <div className="text-[3.5rem] flex flex-col items-center text-center justify-between space-y-14">
        <h3 className="font-bold tracking-wider leading-loose text-center lg:text-center m-5 mb-0 lg:w-full">
          Coming Soon <FontAwesomeIcon icon="cog" spin />
          <Socials
            className="bg-transparent tracking-widest md:self-center pb-[0.35rem] md:mt-5 text-5xl"
            buttonClasses="border-b-0"
          />
        </h3>
        <h1 className="animate-pulse">Please subscribe! 🙏</h1>
        <div className="flex flex-row justify-between space-x-24">
          <h1 className="animate-spin">:D</h1>
          <h1 className="animate-bounce">xD</h1>
          <h1 className="animate-ping">:O</h1>
        </div>
        <Container>
          <div>{allPosts && <MoreStories posts={allPosts} />}</div>
        </Container>
      </div>
    </Container>
  );
}
