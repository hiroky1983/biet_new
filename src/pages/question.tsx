import Head from "next/head";
import { SubHeader } from "../layouts/header/SubHeader";

import React from "react";
import { Layout } from "../layouts/Layout";
import { TabMenu } from "../layouts/contents/TabMenu";
import { NextPage } from "next";

const Question: NextPage = () => {
  return (
    <>
      <Layout title="Question">
        <div className="w-full">
          <TabMenu  />
        </div>
      </Layout>
    </>
  );
};

export default Question;
