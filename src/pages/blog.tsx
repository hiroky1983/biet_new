import Head from "next/head";
import { VFC } from "react";
import "tailwindcss/tailwind.css";
import { BrowserFooterMenu } from "../layouts/footer/BrowserFooterMenu";
import { MobileFooterMenu } from "../layouts/footer/MobileFooterMenu";
import { SubHeader } from "../layouts/header/SubHeader";

const Blog: VFC = () => {
  return (
    <div>
      <Head>
        <title>biet-new</title>
        <meta
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SubHeader title="Blog" />
      <div className="flex">
        <div className="hidden lg:flex">
          <BrowserFooterMenu />
        </div>
      </div>
      <div className="block lg:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};

export default Blog;
