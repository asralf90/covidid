import React from "react";
import QRCode from "./QRcode";

function QRPage({ userdata }) {
  return (
    <div>
      <QRCode userdata={userdata} />
    </div>
  );
}

export default QRPage;
