import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import Logo from "../layout/Logo";

const BigLogo = styled(Logo)(({ theme }) => ({
  fontSize: "20rem",
  color: "transparent",
  [theme.breakpoints.down("sm")]: {
    fontSize: "15rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "10rem",
  },
}));

const LogoGrid: FC = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <BigLogo />
      </Grid>
    </Grid>
  );
};

export default LogoGrid;
