import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { BLOG_DESC, BLOG_NAME } from "../lib/constants";
import { type Post } from "../interfaces/post";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { truncateString } from "./posts/[slug]";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
          <meta property="og:title" content={BLOG_NAME} key="title" />
          <meta
            property="og:description"
            content={truncateString(
              BLOG_DESC + "\n" + heroPost.title + "\n" + heroPost.excerpt,
              296
            )}
            key="description"
          />

          <meta name="twitter:title" content={BLOG_NAME} key="twitterTitle" />
          <meta name="twitter:card" content="summary_large_image" key="card" />
          <meta
            name="twitter:description"
            content={BLOG_DESC}
            key="twitterDescription"
          />
          <meta name="twitter:site" content="willieliwa" key="twitterSite" />
          {heroPost.video ? (
            <>
              <meta
                property="og:url"
                content={`http://www.youtube.com/watch?v=${heroPost.video}`}
              ></meta>
              <meta property="og:type" content="video.episode"></meta>
              <meta
                property="og:video"
                content={`http://www.youtube.com/watch?v=${heroPost.video}`}
              ></meta>
              <meta
                name="twitter:player"
                content={`http://www.youtube.com/watch?v=${heroPost.video}`}
              />
              <meta name="twitter:player:width" content="360" />
              <meta name="twitter:player:height" content="200" />
              <meta
                property="og:video:type"
                content="application/x-shockwave-flash"
              ></meta>
              <meta property="og:video:width" content="398"></meta>
              <meta property="og:video:height" content="264"></meta>
              <meta property="og:site_name" content="youtube"></meta>
              <meta
                property="og:image"
                content={`${heroPost.ogImage.url}`}
                key="ogImage"
              />
              <meta
                name="twitter:image"
                content={`${heroPost.ogImage.url}`}
                key="twitterImage"
              />
            </>
          ) : (
            <>
              <meta property="og:type" content="article" key="type" />
              <meta
                name="twitter:image"
                content={`https://www.willieliwa.com/${heroPost.ogImage.url}`}
                key="twitterImage"
              />
              <meta
                property="og:url"
                content={`https://www.willieliwa.com/posts/${heroPost.slug}`}
                key="url"
              />
              <meta
                property="og:image"
                content={`https://www.willieliwa.com/${heroPost.ogImage}`}
                key="ogImage"
              />
            </>
          )}
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "video",
    "series",
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "content",
  ]);

  return {
    props: { allPosts },
  };
};
