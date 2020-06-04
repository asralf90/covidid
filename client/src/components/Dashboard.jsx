import React, { useContext } from "react";
import AuthApi from "../utils/createContext";
import { signout } from "../api/auth-api";

export default function Dashboard() {
  //handle logout
  const { setAuth } = useContext(AuthApi);
  const handleLogout = async () => {
    const res = await signout();
    setAuth(res.data.auth);
  };

  return (
    <div>
      <p>Welcome!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
