import Head from "next/head";
import { ContentsLayout } from "../layouts/contents/ContentsLayout";
import { Profile } from "../layouts/profile/Profile";
import { Layout } from "../layouts/Layout";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { login, logout, selectUser } from "../lib/auth";
import Auth from "./auth";
import router from "next/router";


const Home: NextPage = () => {
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
          <Layout title={router.pathname}>
            <div className="flex-col">
              <Profile />
              <ContentsLayout />
            </div>
          </Layout>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
