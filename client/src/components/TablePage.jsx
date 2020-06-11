import React from "react";
import MaterialTable from "material-table";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function TablePage({ data }) {
  const classes = useStyles();

  console.log(data);

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid>
          <MaterialTable
            columns={[
              { title: "Customer Name", field: "fullname" },
              { title: "Phone No.", field: "phone", type: "string" },
              { title: "Address", field: "address" },
              { title: "Check-In Date", field: "updated", type: "datetime" }, //Data type: 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
            ]}
            // data={[
            //   // {
            //   //   no: "1",
            //   //   name: "Danial",
            //   //   phoneno: "08033399081",
            //   //   address: "Shah Alam",
            //   //   date: 34,
            //   // },
            // ]}
            data={data}
            title="Customer Infomation"
            options={{
              exportButton: true,
              filtering: true,
            }}
          />
        </Grid>
      </Container>
    </div>
  );
}
