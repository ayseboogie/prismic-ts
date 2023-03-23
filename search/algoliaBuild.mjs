import algoliasearch from "algoliasearch";
import * as Prismic from "@prismicio/client";
import fetch from "node-fetch";
import * as prismicH from "@prismicio/helpers";

const repoName = "prismic-ts";
// prismic main access token
const accessToken =
  "MC5aQnlCZkJBQUFDSUFvNF9s.77-9MzkY77-9UO-_vTnvv73vv73vv73vv73vv70977-9Ye-_ve-_ve-_ve-_ve-_vWfvv73vv73vv71477-977-9I--_vWBN";
export const prismicClient = Prismic.createClient(repoName, {
  fetch,
  accessToken,
});

// algolia app id
// algolia api key
const client = algoliasearch("2E4QQHBM14", "ff8a7d002d8e0852607d5d79aa210ded");

const allPosts = await prismicClient.getAllByType("post", {
  orderings: [{ field: "my.post.publish_date", direction: "desc" }],
});

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "text")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

const records = [];

const createRecord = (post, excerpt) => ({
  objectID: post.uid,
  slug: `${post.type}s/${post.uid}`,
  uid: post.uid,
  title: post.data.title,
  publish_date: post.data.publish_date,
  featured_image: post.data.featured_image,
  excerpt: excerpt,
});

allPosts.map((post) => {
  const excerpt = getExcerpt(post.data.slices);
  records.push(createRecord(post, excerpt));
});

// whatever you want index name to be here
const index = client.initIndex("EXAMPLE_POSTS");
index.replaceAllObjects(records, {}).then(() => {
  console.info(
    `Algolia Search: Successfully saved ${records.length} objects to index "EXAMPLE POSTS"`
  );
});
