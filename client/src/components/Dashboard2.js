import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DrawerHeader from "./DrawerHeader";
import DrawerContent from "./DrawerContent";
import React, { useState, useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ToggleMenu from "./ToggleMenu";
import Loader from "./Loader";
import axios from "axios";
import AuthApi from "../utils/createContext";
import moment from "moment";
import PageRoute from "./PageRoute";
// import DataApi from "../utils/createContext";

const m = moment();
const today = m.format("LL");

function refresh() {
  setTimeout(function () {
    window.location.reload();
  }, 100);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  listContainer: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: "-70px",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard2() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { value } = useContext(AuthApi);

  //get user and customer api
  const [userData, setUserData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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

    // console.log(cust.customer_info);
    // console.log(cust.count);
    setCustomerData(cust.customer_info);
    setIsFetching(true);
  };

  useEffect(() => {
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const username = value.slice(0, value.search("@"));

  return (
    <Fragment>
      {isFetching ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dashboard {today}
              </Typography>

              <IconButton color="inherit" onClick={refresh}>
                <RefreshIcon />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <ToggleMenu />
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            anchor="left"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <DrawerHeader email={userData.email} />
            <DrawerContent />
          </Drawer>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.appBarSpacer} />
            <PageRoute customerdata={customerData} userdata={userData} />
          </main>
        </div>
      ) : (
        <Loader type={"Bars"} color={"#9370DB"} />
      )}
    </Fragment>
  );
}
