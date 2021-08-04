import Head from "next/head";
import "tailwindcss/tailwind.css";
import { ContentsLayout } from "../components/layouts/contents/ContentsLayout";
import { MobileFooterMenu } from "../components/layouts/footer/MobileFooterMenu";
import { Header } from "../components/layouts/header/Header";
import { Profile } from "../components/layouts/Profile";
import { BrowserFooterMenu } from "../components/layouts/footer/BrowserFooterMenu";
import { Layout } from "../components/layouts/Layout";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>biet-new</title>
        <meta
          lang="ja"
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <div className="flex-col">
          <Profile />
          <ContentsLayout />
        </div>
      </Layout>
    </>
  );
}
