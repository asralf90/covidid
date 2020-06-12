import React from "react";
import Loader from "react-loader-spinner";

export default function Default({ color }) {
  return (
    <div>
      <Loader type="Bars" color={color} height={100} width={100} />
    </div>
  );
}
