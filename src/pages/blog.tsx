import { Center, Heading } from "@chakra-ui/layout";
import { NextPage } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react-transition-group/node_modules/@types/react";
import { auth } from "../../firebase";

import { Layout } from "../layouts/Layout";
import { login, logout, selectUser } from "../lib/auth";

const Blog: NextPage = () => {

  return (
    <div>
      <Layout title="Blog">
        <Center>
          <Heading>coming soon....</Heading>
        </Center>
      </Layout>
    </div>
  );
};

export default Blog;
