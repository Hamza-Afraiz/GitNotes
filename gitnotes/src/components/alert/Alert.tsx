import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react'
import Snackbar from "@mui/material/Snackbar";
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  interface SnackProps{
      openModal :boolean;
      handleCloseModal:any;
      
      
  }
  export const Snack=({openModal,handleCloseModal}:SnackProps)=>{
      return (
        <Snackbar
        open={openModal}
        autoHideDuration={6000}
        onClose={handleCloseModal}
      >
        <Alert
          onClose={handleCloseModal}
          severity="success"
          sx={{ width: "100%" }}
        >
          User Logged In!
        </Alert>
      </Snackbar>
          
      )
  }