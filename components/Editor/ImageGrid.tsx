import type { FC } from "react";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentImageState } from "../../redux/slices/image-slice";
import ResponsiveImage from "../layout/ResponsiveImage";

const ImageGrid: FC = () => {
  const image = useAppSelector(selectCurrentImageState);
  return (
    <Grid
      item
      sm={12}
      md={7}
      lg={8}
      xl={9}
      container
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        {image && <ResponsiveImage src={image.url} alt="uploaded image" />}
      </Grid>
    </Grid>
  );
};

export default ImageGrid;
