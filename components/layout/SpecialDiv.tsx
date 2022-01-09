import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

const SpecialDiv: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    currentwidth: number;
  }
> = (props) => <div {...props} />;

export default SpecialDiv;
