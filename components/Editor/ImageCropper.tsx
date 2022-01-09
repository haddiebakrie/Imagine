import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { ChangeEvent, FC } from "react";
import { Fragment, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetCropperState,
  selectCropperState,
  setCrop,
  setCropArea,
  setRatio,
  setRotation,
  setZoom,
} from "../../redux/slices/cropper-slice";
import {
  setCroppedImage,
  toggleCropperOpen,
} from "../../redux/slices/image-slice";
import { IImage } from "../../types/image-interface";
import LogoContrast from "../layout/LogoContrast";
import { IMark } from "../../types/mark-interface";
import MenuItem from "@mui/material/MenuItem";

interface IProps {
  open: boolean;
  image: IImage;
  loading: boolean;
}

enum ClassesEnum {
  APPBAR = "cropper-appbar",
  NAV_ICON = "cropper-nav-icon",
  NAV_TITLE = "cropper-nav-title",
  NAV_BTN = "cropper-nav-button",
  DIV = "cropper-div",
  CONTAINER = "cropper-container",
  LOADING = "cropper-loading",
}

const MARKS: IMark[] = [
  { label: "9:16", value: 9 / 16 },
  { label: "2:3", value: 2 / 3 },
  { label: "1", value: 1 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
];

const CropperDialog = styled(Dialog)(({ theme }) => ({
  [`& .${ClassesEnum.APPBAR}`]: {
    marginBottom: "10em",
    backgroundColor: theme.palette.primary.main,
  },
  [`& .${ClassesEnum.NAV_ICON}`]: {
    height: "1.75em",
    width: "auto",
    color: "transparent",
  },
  [`& .${ClassesEnum.NAV_TITLE}`]: {
    margin: "0 auto",
    fontWeight: 300,
  },
  [`& .${ClassesEnum.NAV_BTN}`]: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.grey[400],
    },
  },
  [`& .${ClassesEnum.DIV}`]: {
    position: "relative",
    width: "100%",
    height: "70vh",
    background: "#333",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  [`& .${ClassesEnum.CONTAINER}`]: {
    borderRadius: theme.shape.borderRadius,
  },
  [`& .${ClassesEnum.LOADING}`]: {
    marginBottom: "1em",
  },
}));

const ImageCropper: FC<IProps> = ({ open, image, loading }) => {
  const dispatch = useAppDispatch();
  const cropper = useAppSelector(selectCropperState);

  const handleCropComplete = useCallback(
    (_, croppedAreaPixels: Area): void => {
      dispatch(setCropArea(croppedAreaPixels));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cropper]
  );

  const handleComplete = useCallback((): void => {
    if (!cropper.croppedAreaPixels) return;

    if (image) dispatch(setCroppedImage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropper, image]);

  const handleClose = useCallback((): void => {
    dispatch(toggleCropperOpen());
    dispatch(resetCropperState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCrop = (crop: Point): void => {
    dispatch(setCrop(crop));
  };

  const handleRatio = (ratio: number): void => {
    dispatch(setRatio(ratio));
  };

  const handleRatioChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 1;
    handleRatio(val);
  };

  const handleZoom = (zoom: number): void => {
    dispatch(setZoom(zoom));
  };

  const handleZoomChange = (_: Event, value: number | number[]): void => {
    const zoom = value as number;
    handleZoom(zoom);
  };

  const handleRotation = (rotation: number): void => {
    dispatch(setRotation(rotation));
  };

  const handleRotationChange = (_: Event, value: number | number[]): void => {
    const rotation = value as number;
    handleRotation(rotation);
  };

  return (
    <CropperDialog open={open} fullScreen onClose={handleClose}>
      <AppBar className={ClassesEnum.APPBAR} color="primary">
        <Toolbar>
          <LogoContrast className={ClassesEnum.NAV_ICON} />
          <Typography variant="h6" className={ClassesEnum.NAV_TITLE}>
            Cropper
          </Typography>
          <IconButton
            className={ClassesEnum.NAV_BTN}
            onClick={handleClose}
            disabled={loading}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Toolbar />
        <div className={ClassesEnum.DIV}>
          <Cropper
            classes={{
              containerClassName: ClassesEnum.CONTAINER,
            }}
            image={image.url}
            crop={cropper.crop}
            rotation={cropper.rotation}
            zoom={cropper.zoom}
            aspect={cropper.ratio}
            onCropChange={handleCrop}
            onRotationChange={handleRotation}
            onCropComplete={handleCropComplete}
            onZoomChange={handleZoom}
          />
        </div>
        <Grid container direction="column" spacing={1}>
          <Grid container item spacing={2}>
            <Grid item>
              <AspectRatioIcon />
            </Grid>
            <Grid item xs>
              <TextField
                id="select-output"
                select
                fullWidth
                disabled={loading}
                label="Ratio"
                size="small"
                value={cropper.ratio}
                onChange={handleRatioChange}
              >
                {MARKS.map((o) => (
                  <MenuItem key={o.label} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <ZoomInRoundedIcon />
            </Grid>
            <Grid item xs>
              <Slider
                min={1}
                max={3}
                step={0.001}
                value={cropper.zoom}
                onChange={handleZoomChange}
                aria-labelledby="slide"
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <RotateRightRoundedIcon />
            </Grid>
            <Grid item xs>
              <Slider
                min={0}
                max={360}
                step={0.1}
                value={cropper.rotation}
                onChange={handleRotationChange}
                aria-labelledby="slide"
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          {loading ? (
            <Grid item xs={12}>
              <LinearProgress
                color="secondary"
                className={ClassesEnum.LOADING}
              />
            </Grid>
          ) : (
            <Fragment>
              <Grid item xs={6}>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={handleClose}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleComplete}
                  fullWidth
                >
                  Ok
                </Button>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </DialogActions>
    </CropperDialog>
  );
};

export default ImageCropper;
