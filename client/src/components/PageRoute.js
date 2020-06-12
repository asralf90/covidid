import React from "react";
import TablePage from "./TablePage";
import Settings from "./Settings";
import { Route, Switch } from "react-router-dom";
import QRPage from "./QRPage";

export default function PageRoute({ userdata, customerdata }) {
  return (
    <div>
      <Switch>
        <Route
          path="/dashboard"
          render={(props) => (
            <TablePage {...props} customerdata={customerdata} />
          )}
        />
        <Route
          path="/qr"
          render={(props) => <QRPage {...props} userdata={userdata} />}
        />
        <Route path="/settings" component={Settings} exact />
      </Switch>
    </div>
  );
}
