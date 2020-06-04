import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import CheckIn from "./components/CheckIn";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import AuthApi from "./utils/createContext";

function Routes() {
  return (
    <Switch>
      <RouteRegistration path="/" component={CreateAccount} exact />
      <RouteRegistration path="/signin" component={SignIn} exact />
      <Route path="/checkin/:adminId" component={CheckIn} exact />
      <RouteProtected path="/dashboard/:adminId" component={Dashboard} exact />
    </Switch>
  );
}

const RouteRegistration = ({ component: Component, ...rest }) => {
  const authApi = useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authApi.auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard/:adminId" />
        )
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const authApi = useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        authApi.auth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default Routes;
