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
import moment from "moment";

const m = moment();
const today = m.format("LL");

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
  const [userData2, setUserData2] = useState([]);

  const readData = async () => {
    const fetchUserInfo = await axios.post(`/auth/getemail/${value}`);

    console.log(fetchUserInfo);
    // console.log(result.data.user[0]._id);
    const { data } = fetchUserInfo;
    const { user } = data;

    let newUserData = {};

    user.forEach((cData) => {
      newUserData = {
        joindate: cData.word,
        email: cData.email,
        adminId: cData.adminId,
        _id: cData._id,
      };
    });

    // console.log(newUserData);
    setUserData(newUserData);

    const fetchCustomerInfo = await axios.post(
      `/customerinfo/getcustomer/${fetchUserInfo.data.user[0].adminId}`
    );

    // console.log(fetchCustomerInfo);

    const cust = fetchCustomerInfo.data;

    console.log(cust.customer_info);
    setUserData2(cust.customer_info);
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
            Dashboard {today}
          </Typography>
          <AccountCircleIcon />
          <Typography color="inherit" noWrap align="right">
            {userData.email}
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />]]]]]'''''
            </Badge> */}
          </IconButton>
          <ToggleMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <FormDialog adminId={userData.adminId} />
        <TablePage data={userData2} />
      </main>
    </div>
  );
}
