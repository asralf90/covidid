import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import ShareIcon from "@material-ui/icons/Share";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import SocialShare from "./SocialShare";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
  },
}));

export default function QRGenerator({ userdata }) {
  const classes = useStyles();

  const [qrcode, setQrcode] = useState({
    value: "",
    copied: false,
  });

  const [share, setShare] = useState(false);

  const handleFormDialog = () => {
    setShare(true);
  };

  const handleCloseForm = () => {
    setShare(false);
  };

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

  const adminId = userdata.adminId;

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Tooltip title="Open new tab to URL Form" arrow>
              <NavLink
                to={`/checkin/${adminId}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
                target="_blank"
              >
                <QRCode
                  id="qrc"
                  // value={`http://${hostname}/checkin/${adminId}`}
                  value={`http://localhost:3000/checkin/${adminId}`}
                  size={300}
                  bgColor={"#fff"}
                  fgColor={"#45046a"}
                  level={"H"}
                  includeMargin={true}
                />
              </NavLink>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Tooltip title="Download QR code" arrow>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ width: "250px" }}
                className={classes.margin}
                onClick={downloadQR}
              >
                <GetAppIcon /> Download
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Tooltip title="Share" arrow>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ width: "250px" }}
                className={classes.margin}
                onClick={handleFormDialog}
              >
                <ShareIcon /> Share
              </Button>
            </Tooltip>
            <Dialog
              open={share}
              onClose={handleCloseForm}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Share</DialogTitle>
              <DialogContent>
                <SocialShare adminId={adminId} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseForm} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>

        <Typography
          align="center"
          variant="caption"
          paragraph="true"
          className={classes.margin}
        >
          <Tooltip title="Copy to clipboard" arrow>
            <CopyToClipboard
              text={`http://localhost:3000/checkin/${adminId}`}
              onCopy={() => setQrcode({ ...qrcode, copied: true })}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ width: "250px" }}
                className={classes.margin}
                onClick={handleClick}
              >
                <FileCopyIcon /> Copy to Clipboard
              </Button>
            </CopyToClipboard>
          </Tooltip>

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
    </div>
  );
}
