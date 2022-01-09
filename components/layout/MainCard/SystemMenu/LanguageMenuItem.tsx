import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import MenuItem from "@mui/material/MenuItem";
import type { FC } from "react";
import { useState, Fragment } from "react";
import UkIcon from "./icons/EnIcon";
import PtIcon from "./icons/PtIcon";
import LanguageMenuCollapse from "./LanguageMenuCollapse";
import { useAppSelector } from "../../../../redux/hooks";
import { selectLanguageState } from "../../../../redux/slices/system-slice";

const LanguageMenuItem: FC = () => {
  const [open, setOpen] = useState(false);
  const language = useAppSelector(selectLanguageState);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <MenuItem onClick={handleOpen}>
        <ListItemText>
          {language === "en" ? <UkIcon /> : <PtIcon />}
        </ListItemText>
        <ListItemIcon>
          {open ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
        </ListItemIcon>
      </MenuItem>
      <LanguageMenuCollapse open={open} />
    </Fragment>
  );
};

export default LanguageMenuItem;
