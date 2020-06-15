import React, { useContext, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DataApi from "../utils/createContext";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function TablePage({ customerdata }) {
  const classes = useStyles();

  const { readData, isFetching } = useContext(DataApi);

  useEffect(() => {
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {isFetching ? (
        <div>
          <Container maxWidth="lg" className={classes.container}>
            <Grid>
              <MaterialTable
                columns={[
                  { title: "Customer Name", field: "fullname" },
                  { title: "Phone No.", field: "phone", type: "string" },
                  { title: "Address", field: "address" },
                  { title: "Date", field: "updated", type: "date" }, //Data type: 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
                  { title: "Time", field: "updated", type: "time" },
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
                data={customerdata}
                title="Check-In Information"
                options={{
                  exportButton: true,
                  filtering: true,
                }}
              />
            </Grid>
          </Container>
        </div>
      ) : (
        <Loader type={"Bars"} color={"#9370DB"} />
      )}
    </Fragment>
  );
}
