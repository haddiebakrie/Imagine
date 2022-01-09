import type { FC } from "react";
import Button from "@mui/material/Button";
import LogoGrid from "./LogoGrid";
import { IText } from "../../types/text";
import { useAppSelector } from "../../redux/hooks";
import { selectLanguageState } from "../../redux/slices/system-slice";
import MainCard from "../layout/MainCard";
import Link from "next/link";

const text: IText[] = [
  { en: "NextJS Image Editor!", pt: "Editor de Imagens feito com NextJS" },
  {
    en: "Crop, compress and convert images",
    pt: "Corta, comprime e converte imagens",
  },
  {
    en: "Upload a new image!",
    pt: "Carregar uma imagem!",
  },
];

const Intro: FC = () => {
  const language = useAppSelector(selectLanguageState);

  return (
    <MainCard
      title={text[0][language]}
      subtitle={text[1][language]}
      action={
        <Link href="/image-upload" passHref>
          <Button variant="contained" color="primary" fullWidth size="large">
            {text[2][language]}
          </Button>
        </Link>
      }
    >
      <LogoGrid />
    </MainCard>
  );
};

export default Intro;
