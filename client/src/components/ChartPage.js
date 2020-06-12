import React from "react";
import Grid from "@material-ui/core/Grid";
import CardInfo from "./CardInfo";

export default function ChartPage({ customercount, momentdate }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardInfo customercount={customercount} momentdate={momentdate} />
        </Grid>
        <Grid item xs={6}>
          <CardInfo />
        </Grid>
      </Grid>
    </div>
  );
}
