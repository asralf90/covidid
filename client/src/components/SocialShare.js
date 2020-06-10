import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {
  EmailShareButton,
  FacebookShareButton,
  //   FacebookMessengerShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  //   FacebookMessengerIcon,
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  LineIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
    margin: theme.spacing(1, 1),
  },
  div: {
    textAlign: "center",
  },
}));

export default function SocialShare({ adminId }) {
  const classes = useStyles();
  const shareUrl = `http://localhost:3000/checkin/${adminId}`;
  const title = "Check-In Form";

  return (
    <div className={classes.div}>
      <div className={classes.root}>
        <Tooltip title="Facebook" arrow>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Tooltip>
      </div>

      {/* <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div> */}

      <div className={classes.root}>
        <Tooltip title="Twitter" arrow>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Tooltip>
      </div>

      <div className={classes.root}>
        <Tooltip title="Telegram" arrow>
          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </Tooltip>
      </div>

      <div className={classes.root}>
        <Tooltip title="WhatsApp" arrow>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Tooltip>
      </div>

      <div className={classes.root}>
        <Tooltip title="LinkedIn" arrow>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </Tooltip>
      </div>

      <div className={classes.root}>
        <Tooltip title="Line" arrow>
          <LineShareButton url={shareUrl} title={title}>
            <LineIcon size={32} round />
          </LineShareButton>
        </Tooltip>
      </div>

      <div className={classes.root}>
        <Tooltip title="Email" arrow>
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Tooltip>
      </div>
    </div>
  );
}
