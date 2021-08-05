import Head from "next/head";
import "tailwindcss/tailwind.css";
import { ContentsLayout } from "../layouts/contents/ContentsLayout";
import { Header } from "../layouts/header/Header";
import { Profile } from "../layouts/Profile";
import { Layout } from "../layouts/Layout";

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
