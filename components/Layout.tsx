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
  return (
    <div className="bg-violet-300	 min-h-screen">
      <Header navigation={navigation} uid={uid} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
