import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import PostFooter from "../../components/post-footer";
import MoreStories from "../../components/more-stories";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import Link from "next/link";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export function truncateString(str: string, num: number): string {
  if (str === undefined) {
    return "";
  }
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
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
                property="og:image"
                content={`https://www.willieliwa.com/${post.ogImage}`}
                key="ogImage"
              />
              <meta property="og:type" content="article" key="type" />
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
                name="twitter:image"
                content={`https://www.willieliwa.com/${post.ogImage.url}`}
                key="twitterImage"
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
                  <meta
                    property="og:title"
                    content="vanilla ice ninja rap - go ninja, go ninja go!"
                  ></meta>
                  <meta property="og:type" content="video"></meta>
                  <meta
                    property="og:video"
                    content={`http://www.youtube.com/v/${post.video}?version=3&autohide=1`}
                  ></meta>
                  <meta
                    property="og:video:type"
                    content="application/x-shockwave-flash"
                  ></meta>
                  <meta property="og:video:width" content="398"></meta>
                  <meta property="og:video:height" content="264"></meta>
                  <meta property="og:site_name" content="youtube"></meta>
                </>
              ) : (
                <meta
                  property="og:url"
                  content={`https://www.willieliwa.com/posts/${post.slug}`}
                  key="url"
                />
              )}
            </Head>
            <PostHeader
              title={post.title}
              video={post.video}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
            <PostFooter post={post} />
          </article>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "video",
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
    "morePosts",
  ]);
  const content = await markdownToHtml(post.content || "");
  const excerpt = await markdownToHtml(post.excerpt || "");

  return {
    props: {
      post: {
        ...post,
        content,
        excerpt,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
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
