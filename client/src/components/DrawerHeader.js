import React from "react";
// import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const DrawerHeader = ({ collapsed, email }) => (
  <>
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
        {email}
      </Typography>
      <Typography color={"textSecondary"}>Date Joined : June 2020</Typography>
    </div>
    <Divider />
  </>
);

// NavHeaderEx.propTypes = {
//   collapsed: PropTypes.bool
// };
// NavHeaderEx.defaultProps = {
//   collapsed: false
// };

export default DrawerHeader;
