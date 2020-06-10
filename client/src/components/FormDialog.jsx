import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import QRcode from "./QRcode";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Tooltip from "@material-ui/core/Tooltip";
import SocialShare from "./SocialShare";

export default function FormDialog({ adminId }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="QR Code" arrow>
        <Button variant="contained" color="default" onClick={handleClickOpen}>
          <CropFreeIcon />
          QR Code
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">My QR Code</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Please keep a copy of the QR Image
          </DialogContentText> */}
          <QRcode adminId={adminId} />
          <SocialShare adminId={adminId} />
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
