import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import { Bounded } from "./Bounded";
import { NavItem } from "./NavItem";
import { NavigationDocument } from "@/.slicemachine/prismicio";
import React from "react";

export type HeaderProps = {
  navigation: NavigationDocument;
  uid: string;
};
export const Header = ({ navigation, uid }: HeaderProps) => {
  const capitalizedTitle = uid
    ? uid.charAt(0).toUpperCase() + uid.slice(1)
    : null;
  return (
    <Bounded>
      <div className="grid grid-cols-1 justify-items-center gap-10">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem>
              <PrismicLink href="/">
                <PrismicText field={navigation.data.homepage_label} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => {
              console.log("item ", <PrismicRichText field={item.label} />);
              return (
                <NavItem key={prismicH.asText(item.label)}>
                  <PrismicLink field={item.link}>
                    <PrismicRichText field={item.label} />
                  </PrismicLink>
                </NavItem>
              );
            })}
          </ul>
        </nav>
        <div className="font-bold text-5xl">{capitalizedTitle}</div>
      </div>
    </Bounded>
  );
};
