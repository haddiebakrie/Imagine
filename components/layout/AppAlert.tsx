import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { desmissAlert, selectAlertState } from "../../redux/slices/image-slice";

const AppAlert: FC = () => {
  const [open, setOpen] = useState(false);
  const alert = useAppSelector(selectAlertState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(desmissAlert());
    }, 500);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        severity={alert?.severety ?? "error"}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
