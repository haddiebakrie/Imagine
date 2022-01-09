import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Intro from "../components/Intro";
import Center from "../components/layout/Center";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>TugaScript Image Editor | Getting Started</title>
      </Head>
      <Center>
        <Intro />
      </Center>
    </Fragment>
  );
};

export default Home;
