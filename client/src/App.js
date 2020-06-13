import React, { useState, useEffect, useMemo } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "./utils/createContext";
import { hasSignned, signin, signup, signout } from "./api/auth-api";
import useStateWithLocalStorage from "./utils/customLocalStorageHooks";
import { v4 as uuid } from "uuid";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const joindate = new Date();
  const adminId = useMemo(() => uuid(), []);
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
    setMsg(res.data.message);
    setOpen(true);
    // console.log(res);
  };

  const handleLogout = async () => {
    const res = await signout();
    const localStorageKey = "myValueInLocalStorage";
    localStorage.removeItem(localStorageKey);
    setAuth(res.data.auth);
    setMsg(res.data.message);
  };

  const handleCreateUserAccount = async (e) => {
    e.preventDefault();

    /* eslint-disable no-unused-vars */
    const res = await signup({
      joindate,
      email,
      password,
      adminId,
    });
    if (res.data.auth) {
      setAuth(true);
    }
    // console.log(res);
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
        handleLogout,
        handleCreateUserAccount,
        email,
        password,
        value,
        msg,
        open,
        setOpen,
      }}
    >
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}
