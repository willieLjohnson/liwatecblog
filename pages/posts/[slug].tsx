import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import PostFooter from "../../components/post-footer";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import { type Post } from "../../interfaces/post";
import { SeriesBar } from "../../components/series";
import Error404 from "../404";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";

type Props = {
  post: Post;
  allPosts?: Post[];
  preview?: boolean;
};

export function truncateString(
  str: string,
  num: number,
  newLine: boolean = true
): string {
  if (str === undefined) {
    return "";
  }
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "..." + (newLine ? "\n" : "");
}

export default function Post({ post, allPosts, preview }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <Error404 />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <article className="mb-32">
            <Head>
              <title>{post.title}</title>
              <meta property="og:title" content={post.title} key="title" />
              <meta
                property="og:description"
                content={truncateString(post.excerpt, 296)}
                key="description"
              />

              <meta
                name="twitter:title"
                content={post.title}
                key="twitterTitle"
              />
              <meta
                name="twitter:card"
                content="summary_large_image"
                key="card"
              />
              <meta
                name="twitter:description"
                content={truncateString(post.excerpt, 196)}
                key="twitterDescription"
              />
              <meta
                name="twitter:site"
                content="willieliwa"
                key="twitterSite"
              />

              {post.video ? (
                <>
                  <meta
                    property="og:url"
                    content={`http://www.youtube.com/watch?v=${post.video}`}
                  ></meta>
                  <meta property="og:type" content="video.episode"></meta>
                  <meta
                    property="og:video"
                    content={`http://www.youtube.com/watch?v=${post.video}`}
                  ></meta>
                  <meta
                    name="twitter:player"
                    content={`http://www.youtube.com/watch?v=${post.video}`}
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
                    content={`${post.ogImage.url}`}
                    key="ogImage"
                  />
                  <meta
                    name="twitter:image"
                    content={`${post.ogImage.url}`}
                    key="twitterImage"
                  />
                </>
              ) : (
                <>
                  <meta property="og:type" content="article" key="type" />
                  <meta
                    name="twitter:image"
                    content={`https://www.willieliwa.com/${post.ogImage.url}`}
                    key="twitterImage"
                  />
                  <meta
                    property="og:url"
                    content={`https://www.willieliwa.com/posts/${post.slug}`}
                    key="url"
                  />
                  <meta
                    property="og:image"
                    content={`https://www.willieliwa.com/${post.ogImage}`}
                    key="ogImage"
                  />
                </>
              )}
            </Head>
            <PostHeader
              title={post.title}
              video={post.video}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              series={post.series}
            />
            <PostBody content={post.content} />
            <PostFooter post={post} />
            <>
              {post.series ? (
                <SeriesBar
                  className="flex flex-row lg:justify-center lg:space-x-28 my-4"
                  series={post.series}
                />
              ) : (
                <></>
              )}
            </>
          </article>
        )}
        <MoreStories posts={[allPosts[2], allPosts[3]]} />
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
    allPosts?: Post[];
  };
};

export async function getStaticProps({ params }: Params) {
  const allPosts = getAllPosts([
    "slug",
    "video",
    "series",
    "title",
    "excerpt",
    "date",
    "updated",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "history",
  ]);
  const post = getPostBySlug(params.slug, [
    "video",
    "series",
    "title",
    "excerpt",
    "date",
    "updated",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "history",
  ]);

  return {
    props: {
      allPosts: allPosts,
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts: Post[] = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
