import React, { useEffect } from "react";
import { Layout } from "../layouts/Layout";
import { TabMenu } from "../layouts/contents/TabMenu";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../lib/auth";
import { auth } from "../../firebase";
import Auth from "./auth";

const Question: NextPage = () => {
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
          <Layout title="Question">
            <div className="w-full">
              <TabMenu />
            </div>
          </Layout>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Question;
