import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import type { FC, MouseEvent } from "react";
import { Fragment, useState } from "react";
import SystemMenu from "./SystemMenu";

interface IProps {
  title: string;
  subtitle: string;
}

const Header: FC<IProps> = ({ title, subtitle }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardHeader
      title={title}
      subheader={subtitle}
      action={
        <Fragment>
          <IconButton
            id="index-settings-button"
            aria-haspopup="true"
            aria-controls={open ? "system-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {open ? <CloseIcon /> : <SettingsIcon />}
          </IconButton>
          <SystemMenu anchorEl={anchorEl} onClose={handleClose} open={open} />
        </Fragment>
      }
    />
  );
};

export default Header;
