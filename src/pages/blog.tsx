import { NextPage } from "next";
import Head from "next/head";

import { Layout } from "../layouts/Layout";

const Blog: NextPage = () => {
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
      <Layout title="Blog">
        
      </Layout>
    </div>
  );
};

export default Blog;
