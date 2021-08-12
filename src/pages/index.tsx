import Head from "next/head";
import { ContentsLayout } from "../layouts/contents/ContentsLayout";
import { Header } from "../layouts/header/Header";
import { Profile } from "../layouts/profile/Profile";
import { Layout } from "../layouts/Layout";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { login, logout, selectUser } from "../lib/auth";
import Auth from "./auth";

  const Home: NextPage = ()  =>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const unSub = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch(
            login({
              uid: authUser.uid,
              photoUrl: authUser.photoURL,
              displayName: authUser.displayName,
            })
          );
        } else {
          dispatch(logout());
        }
      });
      return () => {
        unSub();
      };
    }, [dispatch]);
    
  return (
    <>
    {user.uid ? (
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
      </> ) : (
        <Auth />
      )}
    </>
  );
}

export default  Home;