import CropRotateIcon from "@mui/icons-material/CropRotate";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ChangeEvent, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeOutput,
  changeQuality,
  selectImageState,
  toggleCropperOpen,
} from "../../redux/slices/image-slice";
import { selectLanguageState } from "../../redux/slices/system-slice";
import type { tOutput } from "../../types/image-state";
import type { IText } from "../../types/text";
import ImageCropper from "./ImageCropper";

const OUTPUT_ARR: tOutput[] = ["png", "jpeg", "webp"];

const text: IText[] = [
  { en: "Crop", pt: "Cortar" },
  { en: "Quality", pt: "Qualidade" },
  { en: "Output", pt: "Tipo" },
  { en: "Choose the image output type", pt: "Escolhe o tipo de image" },
];

const ControlGrid: FC = () => {
  const { image, loading, cropperOpen, output, quality } =
    useAppSelector(selectImageState);
  const language = useAppSelector(selectLanguageState);
  const dispatch = useAppDispatch();

  const handleCropper = () => {
    dispatch(toggleCropperOpen());
  };

  const handleQuality = (q: number) => {
    dispatch(changeQuality(q));
  };

  const handleQualityChange = (_: Event, value: number | number[]) => {
    const q = value as number;
    handleQuality(q);
  };

  const handleOutputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeOutput(e.target.value as tOutput));
  };

  return (
    <Grid
      item
      sm={12}
      md={5}
      lg={4}
      xl={3}
      container
      spacing={1}
      direction="column"
      justifyContent="center"
    >
      <Grid item>
        <Button
          onClick={handleCropper}
          fullWidth
          startIcon={<CropRotateIcon />}
          size="small"
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          {text[0][language]}
        </Button>
        {image && (
          <ImageCropper image={image} loading={loading} open={cropperOpen} />
        )}
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{text[1][language]}</Typography>
        <Slider
          step={1}
          max={100}
          min={10}
          disabled={loading}
          size="small"
          onChange={handleQualityChange}
          value={quality}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <TextField
          id="select-output"
          select
          fullWidth
          disabled={loading}
          label={text[2][language]}
          size="small"
          value={output}
          onChange={handleOutputChange}
          helperText={text[3][language]}
        >
          {OUTPUT_ARR.map((o, i) => (
            <MenuItem key={`${o}-${i}`} value={o}>
              {o.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ControlGrid;
