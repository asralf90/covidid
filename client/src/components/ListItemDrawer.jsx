import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { NavLink } from "react-router-dom";

export default function ListItemDrawer() {
  return (
    <div>
      <NavLink
        to="/dashboard"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink
        to="/qrcode"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <ListItem button>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Dictionary" />
        </ListItem>
      </NavLink>
    </div>
  );
}
