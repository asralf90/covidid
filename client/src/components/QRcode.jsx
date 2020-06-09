import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function QRGenerator({ adminId }) {
  const [qrcode, setQrcode] = useState({
    value: "",
    copied: false,
  });

  const downloadQR = () => {
    const canvas = document.getElementById("qrc");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR_" + adminId + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  //const hostname = window.location.hostname;

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

  // console.log(adminId, password);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <QRCode
          id="qrc"
          // value={`http://${hostname}/checkin/${adminId}`}
          value={`http://localhost:3000/checkin/${adminId}`}
          size={150}
          bgColor={"#fff"}
          fgColor={"#45046a"}
          level={"H"}
          includeMargin={false}
        />
        <Button fullWidth onClick={downloadQR}>
          <GetAppIcon /> Download
        </Button>
      </div>
      <Typography align="center" variant="caption" paragraph="true">
        <a
          href={`http://localhost:3000/checkin/${adminId}`}
        >{`http://localhost:3000/checkin/${adminId}`}</a>
        <CopyToClipboard
          text={`http://localhost:3000/checkin/${adminId}`}
          onCopy={() => setQrcode({ ...qrcode, copied: true })}
        >
          <Button onClick={handleClick}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
        {/* {qrcode.copied ? <span style={{ color: "red" }}> Copied.</span> : null} */}
        {qrcode.copied ? (
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Form URL Copied to Clipboard!
            </Alert>
          </Snackbar>
        ) : null}
      </Typography>
    </div>
  );
}
