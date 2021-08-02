import Head from "next/head";
import { VFC } from "react";
import "tailwindcss/tailwind.css";
import { SubHeader } from "../components/layouts/header/SubHeader";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "../components/layouts/Layout";
import { TabMenu } from "../components/layouts/contents/TabMenu";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
  },
});

const Question: VFC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
          {/* <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="質問する"></Tab>
              <Tab label="質問を見る"></Tab>
            </Tabs>
            <PostCard />
          </Paper> */}
          <TabMenu  />
        </div>
      </Layout>
    </>
  );
};

export default Question;
