import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import ToggleMenu from "./ToggleMenu";
import axios from "axios";
import AuthApi from "../utils/createContext";
import TablePage from "../components/TablePage";
import FormDialog from "./FormDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const { value } = useContext(AuthApi);

  const [userData, setUserData] = useState({});

  const readData = async () => {
    const result = await axios.post(`/auth/getemail/${value}`);
    console.log(result);
    // console.log(result.data.user[0]._id);
    const { data } = result;
    const { user } = data;

    let newCustomerData = {};

    user.forEach((cData) => {
      newCustomerData = {
        joindate: cData.word,
        email: cData.email,
        adminId: cData.adminId,
        _id: cData._id,
      };
    });

    console.log(newCustomerData);
    setUserData(newCustomerData);
  };

  useEffect(() => {
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <AccountCircleIcon />
          <Typography color="inherit" noWrap>
            {userData.email}
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
          <ToggleMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <TablePage />
        <FormDialog />
      </main>
    </div>
  );
}
