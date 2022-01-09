import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useEffectOnce } from "react-use";
import Editor from "../components/Editor";
import Center from "../components/layout/Center";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentImageState } from "../redux/slices/image-slice";

const ImageEditor: NextPage = () => {
  const image = useAppSelector(selectCurrentImageState);
  const router = useRouter();

  useEffectOnce(() => {
    if (!image) {
      router.push("/image-upload");
      return;
    }
  });

  return (
    <Fragment>
      <Head>
        <title>TugaScript Image Editor | Image Editor</title>
      </Head>
      <Center>
        <Editor />
      </Center>
    </Fragment>
  );
};

export default ImageEditor;
