import React from "react";
import TablePage from "./TablePage";
import ChartPage from "./ChartPage";
// import Settings from "./Settings";
import AccountPage from "./AccountPage";
import { Route, Switch } from "react-router-dom";
import QRPage from "./QRPage";

export default function PageRoute({
  userdata,
  customerdata,
  customercount,
  momentdate,
}) {
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
          path="/chart"
          render={(props) => (
            <ChartPage
              {...props}
              customercount={customercount}
              momentdate={momentdate}
            />
          )}
        />
        <Route
          path="/qr"
          render={(props) => <QRPage {...props} userdata={userdata} />}
        />
        {/* <Route path="/settings" component={AccountPage} exact /> */}
        <Route
          path="/settings"
          render={(props) => <AccountPage {...props} userdata={userdata} />}
        />
      </Switch>
    </div>
  );
}
