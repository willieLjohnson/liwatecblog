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

type Props = {
  allPosts?: Post[];
};

export default function Error404({ allPosts }: Props) {
  return (
    <Container>
      <Header />
      <div className="text-[3.5rem] flex flex-col items-center text-center justify-between space-y-14">
        <h3 className="font-bold tracking-wider leading-loose text-center lg:text-center m-5 mb-0 lg:w-full">
          Cooming Soon...!
        </h3>
        <SubscribeButton className="p-8 px-10 text-2xl" />
        <Socials className="m-[3rem] w-1/2 text-[3rem] p-0  [&>*]:p-10" />
        <Container>
          <div>{allPosts && <MoreStories posts={allPosts} />}</div>
        </Container>
      </div>
    </Container>
  );
}
