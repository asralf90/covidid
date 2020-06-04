import React, { useState } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "./utils/createContext";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
