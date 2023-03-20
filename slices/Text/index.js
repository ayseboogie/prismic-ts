import React from "react";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { Bounded } from "../../components/Bounded";

/**
 * @typedef {import("@prismicio/client").Content.TextSlice} TextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextSlice>} TextProps
 * @param { TextProps }
 */
const Text = ({ slice }) => (
  <Bounded>
    {prismicH.isFilled.richText(slice.primary.text) && (
      <div className="text-sm md:text-lg tracking-widest m-auto max-w-2xl lg:max-w-4xl py-6 md:py-16 text-black">
        <PrismicRichText field={slice.primary.text} />
      </div>
    )}
  </Bounded>
);

export default Text;
