import React from "react";
import TablePage from "./TablePage";
import Settings from "./Settings";
import { Route, Switch } from "react-router-dom";
import QRPage from "./QRPage";

export default function PageRoute() {
  return (
    <div>
      <Switch>
        <Route path="/dashboard" component={TablePage} exact />
        <Route path="/qr" component={QRPage} exact />
        <Route path="/settings" component={Settings} exact />
      </Switch>
    </div>
  );
}
