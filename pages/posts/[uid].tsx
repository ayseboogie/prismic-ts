import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { HorizontalDivider } from "@/components/HorizontalDivider";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export type LatestPostProps = InferGetStaticPropsType<typeof getStaticProps>;

const LatestPost = ({ post }: LatestPostProps) => {
  const date = prismicH.asDate(
    post.data.publish_date ? post.data.publish_date : undefined
  );

  const headerTitle = `${prismicH.asText(post.data.title)} | Prismic Hookup`;

  return (
    <li>
      <Head>
        <title>{headerTitle}</title>
        <meta name="author" content="Ayse Boogie" />
      </Head>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicLink document={post}>
          <PrismicText field={post.data.title} />
        </PrismicLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {date && dateFormatter.format(date)}
      </p>
    </li>
  );
};

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
const Post = ({ post, latestPosts, navigation }: PostProps) => {
  const date = prismicH.asDate(
    post.data.publish_date ? post.data.publish_date : undefined
  );

  const headerTitle = `${prismicH.asText(post.data.title)} | Prismic Hookup`;

  return (
    <Layout navigation={navigation} uid={post.uid}>
      <Head>
        <title>{headerTitle}</title>
      </Head>
      <Bounded>
        <PrismicLink
          href="/posts"
          className="font-semibold tracking-tight text-slate-400"
        >
          &larr; Back to posts
        </PrismicLink>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={post.data.title} />
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {date && dateFormatter.format(date)}
          </p>
        </Bounded>
        <SliceZone slices={post.data.slices} components={components} />
      </article>
      {latestPosts.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest posts
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestPosts.map((post) => (
                  <LatestPost
                    key={post.id}
                    post={post}
                    latestPosts={[]}
                    navigation={navigation}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
};

export default Post;

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const uid = params?.uid ? params.uid.toString() : "";
  const post = await client.getByUID("post", uid);
  const latestPosts = await client.getAllByType("post", {
    limit: 3,
    orderings: [
      { field: "my.post.publish_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");

  return {
    props: {
      post,
      latestPosts,
      navigation,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();
  const posts = await client.getAllByType("post");

  return {
    paths: posts.map((post) => prismicH.asLink(post)),
    fallback: false,
  };
}
