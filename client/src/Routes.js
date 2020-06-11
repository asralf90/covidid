import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import CheckIn from "./components/CheckIn";
import Dashboard2 from "./components/Dashboard2";
import SignIn from "./components/SignIn";
import AuthApi from "./utils/createContext";
import Error from "./components/Error";

function Routes() {
  return (
    <Switch>
      <RouteRegistration path="/" component={SignIn} exact />
      <RouteRegistration path="/signup" component={CreateAccount} exact />
      <Route path="/checkin/:adminId" component={CheckIn} exact />
      <RouteProtected path="/dashboard" component={Dashboard2} exact />

      {/* <Route path="/dashboard" component={Dashboard} exact /> */}
      <Route component={Error} />
    </Switch>
  );
}

const RouteRegistration = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default Routes;
