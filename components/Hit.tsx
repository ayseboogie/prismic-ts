import * as prismicH from "@prismicio/helpers";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { PrismicText } from "@prismicio/react";
import React from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type HitProps = {
  hit: any;
};

export default function Hit({ hit }: HitProps) {
  const date = prismicH.asDate(hit.publish_date || undefined);

  return (
    <div className="pt-8 pb-8">
      <Link href={hit.slug ?? ""}>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
          <div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
            <img
              src={hit.featured_image.url ?? ""}
              alt={hit.featured_image.alt ?? ""}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:col-span-2">
            <Heading>
              <PrismicText field={hit.title} />
            </Heading>
            <p className="font-serif italic tracking-tighter text-slate-500">
              {date && dateFormatter.format(date)}
            </p>
            <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
              {hit.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
