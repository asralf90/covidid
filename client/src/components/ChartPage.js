import React from "react";
import Grid from "@material-ui/core/Grid";
import CardInfo from "./CardInfo";
import LineChart from "./LineChart";

export default function ChartPage({
  customercount,
  momentdate,
  customerchart,
}) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            customercount={customerchart}
            momentdate={momentdate}
            title="Today"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            customercount={customercount}
            momentdate={momentdate}
            title="Month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            customercount={customercount}
            momentdate={momentdate}
            title="Monthly Average"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            customercount={customercount}
            momentdate={momentdate}
            title="Total"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item xs={8}>
          <LineChart
            // width={50}
            // height={50}
            options={{ maintainAspectRatio: false }}
            title="No. of Check-In"
          />
        </Grid>
      </Grid>
    </div>
  );
}
