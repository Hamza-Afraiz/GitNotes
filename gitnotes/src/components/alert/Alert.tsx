import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);
interface SnackProps {
  LogInNotification: boolean;
  CloseLogInNotification: any;
}
export const Snack = ({ LogInNotification, CloseLogInNotification }: SnackProps) => {
  return (
    <Snackbar
      open={LogInNotification}
      autoHideDuration={6000}
      onClose={CloseLogInNotification}
    >
      <Alert
        onClose={CloseLogInNotification}
        severity="success"
        sx={{ width: "100%" }}
      >
        User Logged In!
      </Alert>
    </Snackbar>
  );
};
