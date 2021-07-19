import Head from "next/head";
import "tailwindcss/tailwind.css";
import { ContentsLayout } from "../components/layouts/contents/ContentsLayout";
import { FooterMenu } from "../components/layouts/FooterMenu";
import { Header } from "../components/layouts/Header";
import { Profile } from "../components/layouts/Profile";

export default function Home() {
  return (
    <div>
      <Head>
        <title>biet-new</title>
        <meta name="Connect with people who are dating foreigners " content="Connect for SNS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Profile />
      <ContentsLayout />
      <FooterMenu />
    </div>
  );
}
