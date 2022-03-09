import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
interface PopUpProps {
  popUpText: string;
  
}

const PopUpNotification = ({ popUpText}: PopUpProps) => {
  const [openPopUp, setPopUp] = React.useState(true);
  const [popUpInfo, setPopUpInfo] = React.useState(popUpText);

  

  const closePopUp = () => {
    setPopUp(!openPopUp);
  };
  React.useEffect(() => {
    setPopUpInfo(popUpText);
    if (popUpText) {
      setPopUp(true);
    }
  }, [popUpText]);

  return (
    <div>
      <Dialog onClose={closePopUp} open={openPopUp}>
        <DialogTitle>{popUpInfo}</DialogTitle>
        <DialogActions>
          <Button onClick={closePopUp}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUpNotification;
