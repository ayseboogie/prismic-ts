import Head from "next/head";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";
import Script from "next/script";
import algoliasearch from "algoliasearch";
import Hit from "@/components/Hit";
import { Bounded } from "@/components/Bounded";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";

const APP_ID = `${process.env.REACT_APP_ALGOLIA_APP_ID}`;
const API_KEY = `${process.env.REACT_APP_ALGOLIA_ADMIN_KEY}`;

const searchClient = algoliasearch(APP_ID, API_KEY);

console.log("app id ", API_KEY);
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page({ page, posts, navigation }: PageProps) {
  return (
    <>
      <Head>
        <title>Prismic Typescript</title>
        <meta name="description" content="Created by AyseBoogie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Prismic Preview */}
      <Script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=prismic-ts"
      />
      <Layout navigation={navigation} uid={page.uid}>
        <main>
          {page.uid === "posts" && (
            <Bounded size="widest">
              <InstantSearch
                searchClient={searchClient} // this is the Algolia client
                indexName="EXAMPLE_POSTS" // this is your index name
              >
                <SearchBox
                  classNames={{
                    form: "relative rounded-md shadow-sm flex-1 flex justify-center",
                    submitIcon: "h-4 w-6",
                    input: "w-10/12 h-9 rounded pl-2",
                  }}
                />
                <Hits hitComponent={Hit} />
                {/*<Pagination />*/}
              </InstantSearch>
            </Bounded>
          )}
          <SliceZone slices={page.data.slices} components={components} />
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });
  //    ^ Automatically contains references to document types
  // Page document from the CMS.
  const uid = params?.path?.[params.path?.length - 1] || "home";
  const page = await client.getByUID("page", uid);

  const posts = await client.getAllByType("post", {
    orderings: [{ field: "my.post.publish_date", direction: "desc" }],
  });

  const navigation = await client.getSingle("navigation");

  // Pass the document as prop to our page.
  return {
    props: {
      navigation,
      page,
      posts,
    },
  };
}

// This function tells Next.js which URLs to accept.
// Each Page document from the CMS will be given a URL.
export async function getStaticPaths() {
  // Client used to fetch CMS content.
  const client = createClient();

  // Page documents from the CMS.
  const pages = await client.getAllByType("page");
  // URL paths for each Page document from the CMS.
  return {
    paths: pages.map((page: any) => ({
      params: {
        path: page.uid === "home" ? [] : [page.uid],
      },
    })),
    fallback: false,
  };
}
