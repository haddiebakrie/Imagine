import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeLanguage } from "../../../../redux/slices/system-slice";
import type { tLang } from "../../../../types/system-state-interface";
import UkIcon from "./icons/EnIcon";
import PtIcon from "./icons/PtIcon";

interface IProps {
  open: boolean;
}

const LanguageMenuCollapse: FC<IProps> = ({ open }) => {
  const dispach = useAppDispatch();

  const handleChange = (lang: tLang) => {
    dispach(changeLanguage(lang));
  };

  return (
    <Collapse in={open}>
      <MenuItem onClick={() => handleChange("en")}>
        <UkIcon />
      </MenuItem>
      <MenuItem onClick={() => handleChange("pt")}>
        <PtIcon />
      </MenuItem>
    </Collapse>
  );
};

export default LanguageMenuCollapse;
