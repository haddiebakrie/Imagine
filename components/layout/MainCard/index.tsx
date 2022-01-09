import type { FC, ReactNode, ReactChild } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Header from "./Header";

interface IProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  action: ReactChild;
}

const MainCard: FC<IProps> = ({ children, action, ...rest }) => (
  <Card sx={{ marginTop: "1em", marginBottom: "1em" }}>
    <Header {...rest} />
    <CardContent>{children}</CardContent>
    <CardActions>{action}</CardActions>
  </Card>
);

export default MainCard;
