import Head from "next/head";
import { VFC } from "react";
import "tailwindcss/tailwind.css";
import { BrowserFooterMenu } from "../components/layouts/footer/BrowserFooterMenu";
import { MobileFooterMenu } from "../components/layouts/footer/MobileFooterMenu";
import { SubHeader } from "../components/layouts/header/SubHeader";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { PostCard } from "../components/layouts/contents/PostCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Question: VFC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>biet-new</title>
        <meta
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SubHeader title="Question" />
      <div className="flex">
        <div className="hidden lg:flex">
          <BrowserFooterMenu />
        </div>
        <div className=" w-full h-screen">
          <Paper className={classes.root}>
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
          </Paper>
        </div>
      </div>
      <div className="block lg:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};

export default Question;
