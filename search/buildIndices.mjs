// require("dotenv").config();
// const algoliasearch = require("algoliasearch");

import algoliasearch from "algoliasearch";
import * as Prismic from "@prismicio/client";
import fetch from "node-fetch";
import * as prismicH from "@prismicio/helpers";

const repoName = "prismic-ts";
const accessToken =
  "MC5aQnZIb0JBQUFDQUFoaDMw.77-9eCzvv73vv70MNz3vv73vv73vv71T77-977-977-977-977-9IO-_vSnvv73vv70s77-977-9AO-_vUTvv73vv73vv73vv70";
export const prismicClient = Prismic.createClient(repoName, {
  fetch,
  accessToken,
});

// Init Algolia client
// const client = algoliasearch(
//   process.env.ALGOLIA_APP_ID, // Those variables are coming from your .env file!
//   process.env.ALGOLIA_ADMIN_KEY
// );
const client = algoliasearch(
  "QPK9HZ88FU", // Those variables are coming from your .env file!
  "30682b12291f783492d32b6796e29aeb"
);

// QPK9HZ88FU
// 30682b12291f783492d32b6796e29aeb

// Here we need to create our index & we'll go like so:
// 1. Getting posts from your API
// 2. Creating index records for each post
// 3. Sending index records to Algolia

// 1. Getting posts from your API
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

// Create a standardized record function helper
const createRecord = (post, excerpt) => ({
  objectID: post.uid,
  slug: `${post.type}s/${post.uid}`,
  uid: post.uid,
  title: post.data.title,
  publish_date: post.data.publish_date,
  featured_image: post.data.featured_image,
  excerpt: excerpt,
});

// 2. Creating index records for each post
allPosts.map((post) => {
  const excerpt = getExcerpt(post.data.slices);
  records.push(createRecord(post, excerpt));
});

// 3. Sending index records to Algolia
const index = client.initIndex("EXAMPLE_POSTS"); // this will be the name of our index
index.replaceAllObjects(records, {}).then(() => {
  console.info(
    `Algolia Search: Successfully saved ${records.length} objects to index "EXAMPLE_POSTS"`
  );
});
