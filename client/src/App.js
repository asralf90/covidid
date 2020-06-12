import React, { useState, useEffect, useMemo } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "./utils/createContext";
import { hasSignned, signin, signup, signout } from "./api/auth-api";
import useStateWithLocalStorage from "./utils/customLocalStorageHooks";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function App() {
  const [auth, setAuth] = useState(false);
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
      readData();
      setAuth(true);
    }
    //console.log(res);
  };

  const handleLogout = async () => {
    const res = await signout();
    const localStorageKey = "myValueInLocalStorage";
    localStorage.removeItem(localStorageKey);
    setAuth(res.data.auth);
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

  //get user and customer api
  const [userData, setUserData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const readData = async () => {
    const fetchUserInfo = await axios.post(`/auth/getemail/${value}`);

    console.log(fetchUserInfo);
    // console.log(result.data.user[0]._id);
    const { data } = fetchUserInfo;
    const { user } = data;

    let newUserData = {};

    user.forEach((cData) => {
      newUserData = {
        joindate: cData.word,
        email: cData.email,
        adminId: cData.adminId,
        _id: cData._id,
      };
    });

    // console.log(newUserData);
    setUserData(newUserData);

    const fetchCustomerInfo = await axios.post(
      `/customerinfo/getcustomer/${fetchUserInfo.data.user[0].adminId}`
    );

    // console.log(fetchCustomerInfo);

    const cust = fetchCustomerInfo.data;

    // console.log(cust.customer_info);
    // console.log(cust.count);
    setCustomerData(cust.customer_info);
    setIsFetching(true);
  };

  useEffect(() => {
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const username = value.slice(0, value.search("@"));

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
        userData,
        customerData,
        isFetching,
      }}
    >
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}
