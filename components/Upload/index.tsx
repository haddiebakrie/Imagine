import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetImageState,
  selectImageState,
} from "../../redux/slices/image-slice";
import { selectLanguageState } from "../../redux/slices/system-slice";
import type { IText } from "../../types/text";
import ImageUpload from "./ImageUpload";
import MainCard from "../layout/MainCard";
import ResponsiveImage from "../layout/ResponsiveImage";

const text: IText[] = [
  { en: "Image Uploader", pt: "Carrega uma imagem" },
  {
    en: "Upload a png, jpeg or webp Image",
    pt: "Carrega uma imagem png, jpeg ou webp",
  },
  { en: "Edit", pt: "Editar" },
  { en: "Delete", pt: "Eliminar" },
];

const Upload: FC = () => {
  const language = useAppSelector(selectLanguageState);
  const { image, loading } = useAppSelector(selectImageState);
  const dispatch = useAppDispatch();
  const disabled = !image || loading;

  const handleClick = () => {
    dispatch(resetImageState());
  };

  return (
    <MainCard
      title={text[0][language]}
      subtitle={text[1][language]}
      action={
        <Grid container spacing={1}>
          <Grid item md={8} sm={6}>
            <Link href="/image-editor" passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={disabled}
              >
                {text[2][language]}
              </Button>
            </Link>
          </Grid>
          <Grid item md={4} sm={6}>
            <Button
              variant="contained"
              color="error"
              disabled={disabled}
              fullWidth
              size="large"
              onClick={handleClick}
            >
              {text[3][language]}
            </Button>
          </Grid>
        </Grid>
      }
    >
      {image ? (
        <ResponsiveImage src={image.url} alt="uploaded image" />
      ) : (
        <ImageUpload />
      )}
    </MainCard>
  );
};

export default Upload;
