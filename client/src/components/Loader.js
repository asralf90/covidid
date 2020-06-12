import React from "react";
import Loader from "react-loader-spinner";

//--Loader Types-- e.g. "Bars"
// Audio
// Ball-Triangle
// Bars
// Circles
// Grid
// Heart
// Oval
// Puff
// Rings
// TailSpin
// ThreeDots

export default function Default({ type, color }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Loader type={type} color={color} height={100} width={100} />
    </div>
  );
}
