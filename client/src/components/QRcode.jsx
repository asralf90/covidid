import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { v4 as uuid } from "uuid";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function QRGenerator() {
  //   const adminId = uuid();
  const [adminId] = useState(uuid());

  const [qrcode, setQrcode] = useState({
    value: "",
    copied: false,
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Typography align="center" variant="caption" paragraph="true">
        Admin ID : {adminId}
        <CopyToClipboard
          text={adminId}
          onCopy={() => setQrcode({ ...qrcode, copied: true })}
        >
          <Button onClick={handleClick}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
        {/* {qrcode.copied ? <span style={{ color: "red" }}> Copied.</span> : null} */}
        {qrcode.copied ? (
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              ID Copied!
            </Alert>
          </Snackbar>
        ) : null}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <QRCode
          value={`http://localhost:3000/${adminId}`}
          size={150}
          bgColor={"#fff"}
          fgColor={"#45046a"}
        />
      </div>
    </div>
  );
}
