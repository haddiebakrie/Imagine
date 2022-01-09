import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import { useMeasure } from "react-use";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectImageState,
  setAlert,
  setImage,
} from "../../redux/slices/image-slice";

interface IProps {
  className?: string;
}

enum ClassesEnum {
  ROOT = "image-upload-root",
  ROOT_POINTER = "image-upload-root-pointer",
  ICON_CONTAINER = "image-upload-icon-container",
  ICON = "image-upload-icon",
  IMAGE_BOX = "image-box",
}

const SpecialDiv: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    currentwidth: number;
  }
> = (props) => <div {...props} />;

const ImageUploadDiv = styled(SpecialDiv)(({ theme, currentwidth }) => ({
  [`&.${ClassesEnum.ROOT}`]: {
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    height: currentwidth / (16 / 9),
    backgroundColor: theme.palette.primary.light,
  },
  [`&.${ClassesEnum.ROOT_POINTER}`]: {
    cursor: "pointer",
  },
  [`& .${ClassesEnum.ICON_CONTAINER}`]: {
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.75,
    padding: "0.5em 0.5em 0.3em 0.5em",
    borderRadius: 50,
  },
  [`& .${ClassesEnum.ICON}`]: {
    fontSize: "3.25rem",
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.75rem",
    },
  },
  [`& .${ClassesEnum.IMAGE_BOX}`]: {
    height: "auto",
    width: "100%",
  },
}));

const ACCEPTED_FILES = "image/jpeg, image/png, image/webp";

const ImageUpload: FC<IProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { image, loading } = useAppSelector(selectImageState);
  const [ref, measures] = useMeasure();
  const disabled = loading || !!image;
  console.log(measures.width);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_FILES,
    maxFiles: 1,
    onDrop: (acceptedFiles, fileRejection): void => {
      if (fileRejection.length > 0) {
        dispatch(
          setAlert({
            severety: "error",
            message: "Please upload a valid image",
          })
        );
        return;
      }

      const funcImage = acceptedFiles[0];

      let safe = false;
      for (const type of ACCEPTED_FILES.split(", ")) {
        if (type === funcImage.type) safe = true;
      }

      if (!safe) {
        dispatch(
          setAlert({
            severety: "error",
            message: "Please upload a valid image",
          })
        );
        return;
      }

      dispatch(setImage(funcImage));
    },
  });

  return (
    <div ref={ref as any}>
      <ImageUploadDiv
        className={clsx(ClassesEnum.ROOT, className, {
          [ClassesEnum.ROOT_POINTER]: !disabled,
        })}
        {...getRootProps()}
        currentwidth={measures.width}
      >
        <input disabled={disabled} {...getInputProps()} />
        <div>
          <AddPhotoAlternateIcon className={ClassesEnum.ICON} />
        </div>
      </ImageUploadDiv>
    </div>
  );
};

export default ImageUpload;
