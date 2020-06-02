import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Generator from "./components/Generator";
import CheckIn from "./components/CheckIn";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Generator} exact />
      <Route path="/checkin" component={CheckIn} exact />
    </Switch>
  );
}

export default Routes;
