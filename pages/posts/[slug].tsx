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
                property="og:url"
                content={`https://www.willieliwa.com/posts/${post.slug}`}
                key="url"
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
            </Head>
            <PostHeader
              title={post.title}
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
    "title",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "history",
    "morePosts",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
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
