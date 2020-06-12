import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";

export default function AfterSubmission() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CheckCircleIcon color="primary" />
      <Typography variant={"h6"}>Form successfully submitted!</Typography>
    </div>
  );
}
