import type { FC } from "react";
import MainCard from "../layout/MainCard";
import { IText } from "../../types/text";
import { useAppSelector } from "../../redux/hooks";
import { selectLanguageState } from "../../redux/slices/system-slice";
import CompleteButton from "./CompleteButton";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ImageGrid from "./ImageGrid";
import ControlGrid from "./ControlGrid";

const FullHeightGrid = styled(Grid)({
  height: "100%",
  width: "100%",
});

const text: IText[] = [
  { en: "Image Editor", pt: "Editor de Imagem" },
  {
    en: "Crop, compress & convert",
    pt: "Corta, comprime e converte",
  },
];

const Editor: FC = () => {
  const language = useAppSelector(selectLanguageState);
  return (
    <MainCard
      title={text[0][language]}
      subtitle={text[1][language]}
      action={<CompleteButton />}
    >
      <FullHeightGrid container spacing={1}>
        <ImageGrid />
        <ControlGrid />
      </FullHeightGrid>
    </MainCard>
  );
};

export default Editor;
