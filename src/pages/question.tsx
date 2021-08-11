import Head from "next/head";
import { SubHeader } from "../layouts/header/SubHeader";

import React from "react";
import { Layout } from "../layouts/Layout";
import { TabMenu } from "../layouts/contents/TabMenu";
import { NextPage } from "next";

const Question: NextPage = () => {
  return (
    <>
      <Head>
        <title>biet-new</title>
        <meta
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SubHeader title="Question" />
      <Layout>
        <div className="w-full">
          <TabMenu  />
        </div>
      </Layout>
    </>
  );
};

export default Question;
