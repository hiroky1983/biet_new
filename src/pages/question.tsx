import Head from "next/head";
import "tailwindcss/tailwind.css";
import { SubHeader } from "../layouts/header/SubHeader";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "../layouts/Layout";
import { TabMenu } from "../layouts/contents/TabMenu";
import { NextPage } from "next";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
  },
});

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
