import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  context: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function CardInfo({ customercount, momentdate }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Fragment>
      <Paper className={fixedHeightPaper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Total No. of Check-Ins
        </Typography>
        <Typography component="p" variant="h4">
          {customercount}
        </Typography>
        <Typography color="textSecondary" className={classes.context}>
          as of {momentdate}
        </Typography>
      </Paper>
    </Fragment>
  );
}
