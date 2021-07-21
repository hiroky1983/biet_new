import Head from "next/head";
import "tailwindcss/tailwind.css";
import { ContentsLayout } from "../components/layouts/contents/ContentsLayout";
import { MobileFooterMenu } from "../components/layouts/MobileFooterMenu";
import { Header } from "../components/layouts/Header";
import { Profile } from "../components/layouts/Profile";
import { BrowserFooterMenu } from "../components/layouts/BrowserFooterMenu";

export default function Home() {
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
      <Header />
      <div className="flex">
        <div className="flex lg:hidden">
          <BrowserFooterMenu />
        </div>
        <div className="flex-col">
          <Profile />
          <ContentsLayout />
        </div>
      </div>
      <div className="hidden lg:block">
        <MobileFooterMenu />
      </div>
    </div>
  );
}
