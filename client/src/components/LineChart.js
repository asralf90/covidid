import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
// import "../styles.css";
// import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

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
    height: 500,
  },
}));

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "No. of Check-In",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(147,111,219,0.4)",
      borderColor: "rgba(147,111,219,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(147,111,219,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(147,111,219,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 12, 45, 23, 53],
    },
  ],
};

export default function LineChart({ title }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Fragment>
      {/* <Paper> */}
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        align="center"
      >
        {title}
      </Typography>
      {/* <article className="canvas-container"> */}
      <Line data={data} />
      {/* </article> */}
      {/* </Paper> */}
    </Fragment>
  );
}
