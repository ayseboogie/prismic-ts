import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "@/components/Heading";
import { format } from "date-fns";

const findFirstImage = (slices: any[]) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

const getExcerpt = (slices: any[]) => {
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

export type PostProps = {
  post: any;
};

export const Post = ({ post }: PostProps) => {
  const featuredImage =
    (prismicH.isFilled.image(post.data.featured_image) &&
      post.data.featured_image) ||
    findFirstImage(post.data.slices);
  const date = prismicH.asDate(post.data.publish_date || undefined);
  const excerpt = getExcerpt(post.data.slices);

  return (
    <li className="pt-8 pb-8">
      <PrismicLink document={post} tabIndex={-1}>
        <div className="flex flex-row justify-center	">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage field={featuredImage} className="h-32 w-auto" />
          )}
          <div className="pl-8">
            <Heading>
              <PrismicText field={post.data.title} />
            </Heading>
            <p className="font-serif italic tracking-tighter text-zinc-600">
              {date && format(date, "MM/dd/yyyy")}
            </p>
            {excerpt && (
              <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </PrismicLink>
    </li>
  );
};
