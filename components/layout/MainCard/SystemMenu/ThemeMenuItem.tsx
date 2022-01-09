import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  changeTheme,
  selectDarkThemeState,
} from "../../../../redux/slices/system-slice";

const ThemeMenuItem: FC = () => {
  const darkTheme = useAppSelector(selectDarkThemeState);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(changeTheme());
  };

  return (
    <MenuItem onClick={handleChange}>
      <ListItemText>
        <DarkModeRoundedIcon />
      </ListItemText>
      <ListItemIcon>
        <Switch checked={darkTheme} />
      </ListItemIcon>
    </MenuItem>
  );
};

export default ThemeMenuItem;
