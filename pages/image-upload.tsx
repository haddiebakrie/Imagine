import type { NextPage } from "next";
import { Fragment } from "react";
import Head from "next/head";
import Center from "../components/layout/Center";
import Upload from "../components/Upload";

const ImageUpload: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>TugaScript Image Editor | Image Upload</title>
      </Head>
      <Center>
        <Upload />
      </Center>
    </Fragment>
  );
};

export default ImageUpload;
