import Head from "next/head";
import { FC } from "react";
import "tailwindcss/tailwind.css";
import { FooterMenu } from "../components/layouts/FooterMenu";
import { Header } from "../components/layouts/Header";

const Word: FC = () => {
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
      <div className="h-screen">

      <p>工事中・・・</p>
      </div>
      <FooterMenu />
    </div>
  );
};

export default Word;
