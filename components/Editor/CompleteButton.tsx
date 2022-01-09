import { saveAs } from "file-saver";
import type { FC } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckIcon from "@mui/icons-material/Check";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  saveCompressedImage,
  selectImageState,
} from "../../redux/slices/image-slice";
import { selectLanguageState } from "../../redux/slices/system-slice";
import type { IText } from "../../types/text";
import Link from "next/link";

const text: IText[] = [
  { en: "Loading...", pt: "A carregar..." },
  { en: "Download", pt: "Descarregar" },
  { en: "Complete", pt: "Completo" },
  { en: "Cancel", pt: "Cancelar" },
];

const CompleteButton: FC = () => {
  const language = useAppSelector(selectLanguageState);
  const { image, loading, output, quality } = useAppSelector(selectImageState);
  const dispatch = useAppDispatch();
  const rightType =
    image && quality === 100 && image.file.type.split("/")[1] === output;

  const downloadImage = () => {
    if (rightType) {
      saveAs(image.file, `edited-image.${output}`);
      return;
    }

    dispatch(saveCompressedImage());
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={8} sm={6}>
        <Button
          fullWidth
          size="large"
          color="primary"
          variant={rightType ? "contained" : "outlined"}
          disabled={!image || loading}
          startIcon={
            loading ? (
              <HourglassTopIcon />
            ) : rightType ? (
              <DownloadIcon />
            ) : (
              <CheckIcon />
            )
          }
          onClick={downloadImage}
        >
          {loading
            ? text[0][language]
            : rightType
            ? text[1][language]
            : text[2][language]}
        </Button>
      </Grid>
      <Grid item md={4} sm={6}>
        <Link href="/image-upload" passHref>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="error"
            disabled={loading}
          >
            {text[3][language]}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default CompleteButton;
