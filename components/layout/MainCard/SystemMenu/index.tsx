import type { FC } from "react";
import Menu from "@mui/material/Menu";
import ThemeMenuItem from "./ThemeMenuItem";
import LanguageMenuItem from "./LanguageMenuItem";

interface IProps {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  onClose: () => void;
}

const SystemMenu: FC<IProps> = ({ anchorEl, open, onClose }) => (
  <Menu
    id="system-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    MenuListProps={{
      "aria-labelledby": "index-settings-button",
    }}
  >
    <ThemeMenuItem />
    <LanguageMenuItem />
  </Menu>
);

export default SystemMenu;
