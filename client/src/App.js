import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "./utils/createContext";
import { hasSignned, signin } from "./api/auth-api";

//custom localstorage hooks
const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

function App() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      //local storage
      setValue(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await signin({ email, password });
    if (res.data.auth) {
      setAuth(true);
    }
    //console.log(res);
  };

  const readSession = async () => {
    const result = await hasSignned();
    //result.data.auth
    const { data } = result;
    const { auth } = data;
    if (auth) {
      setAuth(true);
    }
    console.log(result);
  };

  useEffect(() => {
    readSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthApi.Provider
      value={{
        auth,
        setAuth,
        handleOnChange,
        handleSignIn,
        email,
        password,
        value,
      }}
    >
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
