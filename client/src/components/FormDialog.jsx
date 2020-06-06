import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import QRcode from "./QRcode";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthApi from "../utils/createContext";

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { adminId } = useContext(AuthApi);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        QR Code
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">My QR Code</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please keep a copy of the QR Image
          </DialogContentText>
          <QRcode adminId={adminId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
