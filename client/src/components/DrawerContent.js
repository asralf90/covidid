import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
//check icon name from below website
//https://material.io/resources/icons/?style=round

const list = [
  {
    primaryText: "Check-In Info",
    icon: "backup_table",
    routeName: "/dashboard",
  },
  {
    primaryText: "Chart",
    icon: "bar_chart",
    routeName: "/chart",
  },
  {
    primaryText: "QR Code",
    icon: "qr_code",
    routeName: "/qr",
  },
  // {
  //   primaryText: "Recent",
  //   icon: "schedule",
  // },
  // {
  //   primaryText: "Offline",
  //   icon: "offline_pin",
  // },
  // {
  //   primaryText: "Uploads",
  //   icon: "publish",
  // },
  // {
  //   primaryText: "Backups",
  //   icon: "backup",
  // },
  // {
  //   primaryText: "Trash",
  //   icon: "delete",
  // },
];

const DrawerContent = () => (
  <List>
    {list.map(({ primaryText, icon, routeName }, i) => (
      //ListItem key={primaryText} selected={i === 0} button>
      <NavLink
        to={routeName}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <ListItem key={primaryText} button>
          <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon>
          <ListItemText
            primary={primaryText}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </NavLink>
    ))}

    <Divider style={{ margin: "12px 0" }} />
    <NavLink
      to="/settings"
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <ListItem button>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText
          primary={"Settings & Account"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </NavLink>
  </List>
);

// NavContentEx.propTypes = {};
// NavContentEx.defaultProps = {};

export default DrawerContent;
