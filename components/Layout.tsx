import { Footer } from "./Footer";
import * as React from "react";
import { NavigationDocument } from "@/.slicemachine/prismicio";
import { Header } from "@/components/Header";

export type LayoutConstantsProps = {
  navigation: NavigationDocument;
  children: React.ReactNode;
  uid: string;
};
export const Layout = ({ navigation, uid, children }: LayoutConstantsProps) => {
  const showFooter = uid === "home" || uid === "posts";

  return (
    <div className="bg-blue-100	 min-h-screen">
      <Header navigation={navigation} uid={uid} />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
