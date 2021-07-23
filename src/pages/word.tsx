import Head from "next/head";
import { VFC } from "react";
import "tailwindcss/tailwind.css";
import { BrowserFooterMenu } from "../components/layouts/footer/BrowserFooterMenu";
import { MobileFooterMenu } from "../components/layouts/footer/MobileFooterMenu";
import { SubHeader } from "../components/layouts/header/SubHeader";

const Word: VFC = () => {
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
      <SubHeader title="Word" />
      <div className="h-screen">
        <p>工事中・・・</p>
      </div>
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

export default Word;
