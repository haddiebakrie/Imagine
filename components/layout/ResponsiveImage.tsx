import { styled } from "@mui/material/styles";

const ResponsiveImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  maxHeight: "50vh",
  borderRadius: theme.shape.borderRadius,
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "60vh",
  },
  [theme.breakpoints.down("xs")]: {
    maxHeight: "75vh",
  },
}));

export default ResponsiveImage;
