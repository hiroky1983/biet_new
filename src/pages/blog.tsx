import Head from "next/head";
import { FC } from "react";
import "tailwindcss/tailwind.css";
import { BrowserFooterMenu } from "../components/layouts/BrowserFooterMenu";
import { MobileFooterMenu } from "../components/layouts/MobileFooterMenu";

const Blog: FC = () => {
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
      <div className="h-screen">
        <p>工事中・・・</p>
      </div>
      <div className="flex">
        <div className="flex lg:hidden">
          <BrowserFooterMenu />
        </div>
      </div>
      <div className="hidden lg:block">
        <MobileFooterMenu />
      </div>
    </div>
  );
};

export default Blog;
