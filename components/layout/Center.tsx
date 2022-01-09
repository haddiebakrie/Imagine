import type { FC, ReactNode } from "react";
import Grid from "@mui/material/Grid";

interface IProps {
  children: ReactNode;
}

const Center: FC<IProps> = ({ children }) => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", width: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xl={6} lg={6} md={7} sm={9} xs={11}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Center;
