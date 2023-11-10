import { useTheme } from "@mui/material/styles";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import SvgIcon from "@mui/material/SvgIcon";
import type { FC } from "react";

const LogoContrast: FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  const color = theme.palette.primary.contrastText;

  return (
    <SvgIcon {...props} fill="none" viewBox="0 0 150 150">
      <path stroke={color} strokeWidth={4} d="M38 83h100" />
      <path
        fill={color}
        d="M73.9648 96.8984V136h-5.1025V96.8984h5.1025Zm12.5684 0v4.2436H56.3208v-4.2436h30.2124Zm26.2108 29.2186c0-.913-.143-1.719-.43-2.417-.268-.716-.752-1.36-1.45-1.933-.68-.573-1.629-1.119-2.846-1.639-1.2-.519-2.722-1.047-4.566-1.584-1.933-.573-3.6791-1.209-5.2367-1.907-1.5576-.716-2.8914-1.531-4.0014-2.444-1.1101-.913-1.9605-1.96-2.5513-3.142-.5908-1.181-.8862-2.533-.8862-4.055 0-1.522.3133-2.927.9399-4.216.6266-1.289 1.5218-2.408 2.6856-3.3571 1.1816-.9668 2.587-1.7188 4.2163-2.2559 1.6288-.5371 3.4468-.8057 5.4518-.8057 2.936 0 5.425.564 7.466 1.6919 2.059 1.11 3.625 2.5688 4.699 4.3778 1.075 1.79 1.612 3.706 1.612 5.747h-5.157c0-1.468-.313-2.766-.94-3.894-.626-1.146-1.575-2.041-2.846-2.686-1.271-.662-2.883-.994-4.834-.994-1.844 0-3.366.278-4.5656.833-1.1995.555-2.0947 1.307-2.6856 2.256-.5729.949-.8593 2.032-.8593 3.249 0 .824.1701 1.576.5102 2.256.3581.663.9042 1.28 1.6382 1.853.752.573 1.7009 1.101 2.8471 1.585 1.163.483 2.551.949 4.162 1.396 2.22.627 4.136 1.325 5.747 2.095 1.612.77 2.936 1.638 3.975 2.605 1.056.949 1.835 2.032 2.336 3.249.519 1.2.779 2.561.779 4.082 0 1.594-.322 3.035-.967 4.324-.644 1.289-1.566 2.39-2.766 3.303-1.199.914-2.641 1.621-4.324 2.122-1.665.483-3.527.725-5.585.725-1.809 0-3.59-.251-5.3447-.752-1.7367-.501-3.3211-1.253-4.7534-2.256-1.4144-1.002-2.5513-2.238-3.4107-3.706-.8414-1.486-1.2622-3.205-1.2622-5.156h5.1563c0 1.343.2596 2.498.7788 3.464.5192.949 1.2264 1.737 2.1216 2.364.913.626 1.9425 1.092 3.0883 1.396 1.164.287 2.372.43 3.626.43 1.808 0 3.339-.251 4.592-.752 1.253-.501 2.202-1.218 2.846-2.149.663-.931.994-2.032.994-3.303ZM38.675 65.725C30.5 61.825 24.65 53.9 23.75 44.5H20C21.275 59.9 34.15 72 49.875 72c.575 0 1.1-.05 1.65-.075L42 62.375l-3.325 3.35ZM50.125 12c-.575 0-1.1.05-1.65.1L58 21.625l3.325-3.325C69.5 22.175 75.35 30.1 76.25 39.5H80C78.725 24.1 65.85 12 50.125 12ZM60 47h5V27H45v5h15v15Zm-20 5V22h-5v5h-5v5h5v25h25v5h5v-5h5v-5H40Z"
      />
      <path stroke={color} strokeWidth={4} d="M2 2h146v146H2z" />
    </SvgIcon>
  );
};

export default LogoContrast;