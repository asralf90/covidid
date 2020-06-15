import React, { useContext } from "react";
// import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AuthApi from "../utils/createContext";

export default function DrawerHeader({ collapsed }) {
  const { value } = useContext(AuthApi);
  return (
    <div
      style={{
        padding: collapsed ? 8 : 16,
        transition: "0.3s",
        textAlign: "center",
        position: "relative",
        top: "-20px",
      }}
    >
      <Avatar
        src="https://3.bp.blogspot.com/-g0xDCbB8zLQ/Toxm5r7KzBI/AAAAAAAAAF8/C7VdGxUJPdc/s320/daniyui.jpg"
        style={{
          width: collapsed ? 48 : 60,
          height: collapsed ? 48 : 60,
          transition: "0.3s",
          position: "relative",
          marginLeft: "74px",
        }}
      />
      <div style={{ paddingBottom: 16 }} />
      <Typography variant={"h6"} noWrap>
        Danial Asraf
      </Typography>
      <Typography color={"textSecondary"} noWrap gutterBottom>
        {value}
      </Typography>
      {/* <Typography color={"textSecondary"} noWrap gutterBottom>
        ID : {id}
      </Typography> */}
      {/* <Typography color={"textSecondary"}>Joined : {joindate}</Typography> */}
      <Divider />
    </div>
  );
}
